---
sidebar: auto
title: Java源码
---

<h1>Java源码</h1>

## HashMap
1、hashMap组成: 数组+链表/红黑树，其中当链表的长度大于8时，链表会转换成红黑树，当红黑树的大小，小于6时会转化成链表。

2、hashMap，允许null值，不同于hashTable，是线程不安全的；load factor（影响因子）0.75 ，是均衡了时间和空间损耗算出来的值，较高的值会减少空间的开销（扩容减少，数组大小增长速度变慢），但增加了查找成本（hash 冲突增加，链表长度变长），不扩容的条件：数组容量>需要的数组大小/load factor。

3、如果很多数据需要存储到HashMap中，可以在HashMap最开始的时候就设置成足够大小的，这样可以防止在其过程中不断的扩容导致性能的消耗。

4、HashMap本身是线程不安全的，如果想它编程线程安全的，可以自己在外部加锁，或者通过Collections#sychronizedMap来实现线程安全，Collections#sychronizedMap是在每个方法上加上synchronized锁。
当HashMap，put值时的流程图如下：
<img :src="$withBase('/imgs/hashMap.png')" alt="hashMap流程图">>

5、链表长度设成8的初始值，是通过泊松分布概率函数，得出链表长度是8的时候，出现的概率是0.00000006，不到千万分之一，所以正常情况下，链表的长度不可能达到8，而且一旦到达8的时候，肯定是hash算法出现了问题，在这种情况下为了让hashmap依然有较高的查询速度，所以会让链表转换成红黑树。

6、红黑树新增节点过程：
* 首先判断新增的节点在红黑树上是不是已经存在，判断手段可以使用：判断是否实现了comparable接口，如果没有实现可以使用* equals进行判断；如果实现了Comparable接口，可以使用compareTo进行判断。
* 新增的节点如果已经在红黑树上，直接返回；不在的话判断新增节点是在当前节点的左边还是右边，左边值小，右边值大。
* 自旋递归1和2步，直到当前节点的左边或者右边的节点为空时，暂停自旋，当前节点就是新增节点的父节点。
* 把新增节点放到当前节点的左边或右边为空的地方，并与当前节点建立父子节点关系；
* 进行着色和旋转，结束。

```java
//入参 h：key 的hash值
final TreeNode<K,V> putTreeVal(HashMap<K,V> map, Node<K,V>[] tab,
                               int h, K k, V v) {
    Class<?> kc = null;
    boolean searched = false;
    //找到根节点
    TreeNode<K,V> root = (parent != null) ? root() : this;
    //自旋
    for (TreeNode<K,V> p = root;;) {
        int dir, ph; K pk;
        // p hash 值大于 h，说明 p 在 h 的右边
        if ((ph = p.hash) > h)
            dir = -1;
        // p hash 值小于 h，说明 p 在 h 的左边
        else if (ph < h)
            dir = 1;
        //要放进去key在当前树中已经存在了(equals来判断)
        else if ((pk = p.key) == k || (k != null && k.equals(pk)))
            return p;
        //自己实现的Comparable的话，不能用hashcode比较了，需要用compareTo
        else if ((kc == null &&
                  //得到key的Class类型，如果key没有实现Comparable就是null
                  (kc = comparableClassFor(k)) == null) ||
                  //当前节点pk和入参k不等
                 (dir = compareComparables(kc, k, pk)) == 0) {
            if (!searched) {
                TreeNode<K,V> q, ch;
                searched = true;
                if (((ch = p.left) != null &&
                     (q = ch.find(h, k, kc)) != null) ||
                    ((ch = p.right) != null &&
                     (q = ch.find(h, k, kc)) != null))
                    return q;
            }
            dir = tieBreakOrder(k, pk);
        }

        TreeNode<K,V> xp = p;
        //找到和当前hashcode值相近的节点(当前节点的左右子节点其中一个为空即可)
        if ((p = (dir <= 0) ? p.left : p.right) == null) {
            Node<K,V> xpn = xp.next;
            //生成新的节点
            TreeNode<K,V> x = map.newTreeNode(h, k, v, xpn);
            //把新节点放在当前子节点为空的位置上
            if (dir <= 0)
                xp.left = x;
            else
                xp.right = x;
            //当前节点和新节点建立父子，前后关系
            xp.next = x;
            x.parent = x.prev = xp;
            if (xpn != null)
                ((TreeNode<K,V>)xpn).prev = x;
            //balanceInsertion 对红黑树进行着色或旋转，以达到更多的查找效率，着色或旋转的几种场景如下
            //着色：新节点总是为红色；如果新节点的父亲是黑色，则不需要重新着色；如果父亲是红色，那么必须通过重新着色或者旋转的方法，再次达到红黑树的5个约束条件
            //旋转： 父亲是红色，叔叔是黑色时，进行旋转
            //如果当前节点是父亲的右节点，则进行左旋
            //如果当前节点是父亲的左节点，则进行右旋
          
            //moveRootToFront 方法是把算出来的root放到根节点上
            moveRootToFront(tab, balanceInsertion(root, x));
            return null;
        }
    }
}
```

7、Hashmap查找主要分为：
* 根据hash算法定位数组的索引位置，equals判断当前节点是否是我们需要寻找的key，是的话直接返回。
* 不是的话，判断当前节点有无Next节点，有的话判断是链表类型，还是红黑树类型。
* 分别走链表和红黑树不同类型的查找方法。
```java
// 采用自旋方式从链表中查找 key，e 初始为为链表的头节点
do {
    // 如果当前节点 hash 等于 key 的 hash，并且 equals 相等，当前节点就是我们要找的节点
    // 当 hash 冲突时，同一个 hash 值上是一个链表的时候，我们是通过 equals 方法来比较 key 是否相等的
    if (e.hash == hash &&
        ((k = e.key) == key || (key != null && key.equals(k))))
        return e;
        // 否则，把当前节点的下一个节点拿出来继续寻找
} while ((e = e.next) != null);
```

<p>持续跟新中。。。。。。。。</p>