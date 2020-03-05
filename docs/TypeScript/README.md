---
sidebar: auto
title: TypeScript
---
# TypeScript

## 参考说明
::: tip 说明
本篇博客由慕课网视频[TypeScript －系统入门到项目实战](https://coding.imooc.com/class/412.html)(Dell-Lee)阅读整理而来，观看视频请支持正版。
:::

## 介绍

`TypeScript`是`JavaScript`的超集，拥有静态代码类型。`TypeScript`可以编译成普通`JavaScript`代码然后再去运行。
<br />
js 中的类型为动态类型，可以随意的变：

```js
let b = 123;
b = "123";
```

ts 对应的是静态类型：

```ts
let b: number = 123;
b = 456;
```

相对于 JavaScript 优势：
<br />

1. 开发过程中，发现潜在问题。
   <br />
2. 更友好的编辑器自动提示。
   <br />
3. 代码语意更清晰易懂。

## TypeScript 基础环境搭建
### 安装Node
首先安装`n`模块：
```sh
sudo npm install -g n
```
升级`node.js`到稳定最新版本：
```sh
sudo  n stable
```
升级到最新版：
```sh
sudo n latest
```
升级到指定版本：
```sh
sudo  n vxx.xx.xx
```
### 更改VScode配置
打开VSCode更改quote -> single，tab  -> 2，Format On Save -> true
### 安装VScode插件
插件应用市场搜索`Prettier`并安装
```sh
npm install typescript@3.6.4 -g
npm install -g ts-node
```
运行`ts`文件
```sh
ts-node xx.ts
```
## 静态类型的深度理解
&emsp;&emsp;静态类型的变量不仅类型不能修改，而且意味着这个变量的属性和方法基本已经确定了。正是因为这样，我们在编辑器使用静态类型的时候会给我们很好的语法提示。
## 基础类型和对象类型
### 基础类型
基础类型：`number`、`string`、`bollean`、`null`、`undefined`、`symbol`、`void`
```ts
const count: number = 123
const name: String = 'haochyk'
...
```
### 对象类型
对象类型：`{}`、`Class`、`function`、`[]`
```ts
const developers: {
   name: string,
   age: number,
} = {
   name: 'haochyk',
   age: 21,
}
const numbers: number[] = [1, 2, 3]
class Person {}
const haochyk: Person = new Person()
const getTotal: () => number = () => {
   return 123
}
const date = new Date()
```
### 其他的case
在实际工作中我们经常会遇到这种情况，一个`JSON`字符串转`JSON`对象：
```ts
const rowData = '{"name": "haochyk"}'
const newData = JSON.parse(rowData)
```
但是这种情况我们使用编辑器将鼠标放置在`newData`上我们会发现`ts`无法推断出`newData`的类型，结果为`any`，像这种使用内置函数方法的情况，我们可以这样处理：
```ts
interface Person = {
   name: 'string';
}
const rowData = '{"name": "haochyk"}'
const newData: Person = JSON.parse(rowData)
```
另外一种情况，我们声明了一个变量，初始变量类型为`number`类型，但是我后面就是想将变量类型修改为`string`，这是个我们可以这样使用：
```ts
let count: number | string = 1
count  = '1'
```
## 类型注解和类型推断
### 类型注解（`type annotation`）
显示的声明一个变量数据类型的写法我们称之为类型注解
```ts
let count: number
count = 123
```
### 类型推断（`type inference`）
TS会自动的去尝试分析变量的类型
```ts
let count = 123
```
如果 `TS` 能够自动分析变量类型，我们就什么都不需要做了。反之，我们就需要使用类型注解。
## 函数相关类型
&emsp;&emsp;首先我们收一下TS的几种定义函数的方式和JS是一样的
```js
function hello () {}
const hello = function () {}
const hello = () => {}
```
我们在写函数类型的时候：
```ts
function add (first: number, second: number) {
   return first + second
}
```
函数的入参我们需要声明类型，TS会根据入参的类型推断出返回结果的类型。
但是有时候我们也需要声明函数的返回值类型，比如以下这种情况：
```ts
function add (first: number, second: number) {
   return first + second + ''
}
const total = add(1, 2)
```
这种是由于我们笔误导致我们期望与实际不符，这是就会报错，所以我们应该修改为这种的进行双重校验：
```ts
function add (first: number, second: number): number {
   return first + second
}
//或
const add: (first: number, second: number) => number = (first, second) => {
   return first + second
}
const total = add(1, 2)
```
另外，还有几种常用的函数返回值类型：
`void`通过字面意思，我们大致就可以理解它的意思：空白，即没有返回值
```ts
function sayHello (): void {
   console.log('hello')
}
```
`never`这个字面意思可能就不是很容易理解，它的意思是函数永远不会执行到最后,我们通过代码来看：
```ts
function errorEmiter (): never {
   while (true) {}
   return true
}
//或
function errorEmiter (): never {
   throw new Error()
   return true
}
```
还有一种我们常用的就是函数参数对象类型的解构：
```ts
function add ({ first, second }): { first: number, second: number } {
   return first + second
}
const total = add(1, 2)
```
## 数组和元组
在`TS`中数组是和`JS`中是一样的，比如我们声明一个数组：
``` ts
const numberArr = [1, 2, 3]
```
在`TS`中我们同样可以声明数组每一项类型（基础类型和对象类型），首先我们来看基础类型：
### 基础类型
TS中我们可以使用任意基础类型来约束数组内容，见如下代码：
``` ts
const numberArr: number[] = [1, 2, 3] // 同样这种情况不定义数组类型也是可以的，TS会自动帮助我们推断出数组类型为number
const stringArr: string[] = ['1', '2', '3']
```
当我们数组中的内容多一项少一项或者某一项的内容类型不是我们约束的类型的话，都会飘红。
但是在很多应用场景中数组内不仅有`number`类型还会有其他类型的值，比如说：`string`，那我们应该如何来约定数组类型呢：
``` ts
const arr: (string ｜ number) = [1, '2', 3]
```
### 对象类型
同样我们也可以使用对象类型来约束数组内容，比如：
``` ts
const objectArr: { name: string, age: number }[] = [
   {
      name: 'haochyk',
      age: 18,
   },
]
```
如果我们的对象内容非常多的话，这样写代码就显的非常不美观了，我们可以使用类型别名(`type alias`)来解决这个问题：
``` ts
type User = {
   name: string;
   age: number;
}
const objectArr: User[] = [
   {
      name: 'haochyk',
      age: 18,
   },
]
```
值得我们注意的是`class`类，`TS`不会强制要求必须返回实例对象，所以只要数据内容格式一致都是被允许的，比如以下这种写法：
``` ts
class User = {
   name: string;
   age: number;
}
const objectArr: User[] = [
   new User(),
   {
      name: 'haochyk',
      age: 18,
   },
]
```
### 元组
我们首先说下什么是元组，元组（`tuple`）可以看作是数组的拓展，它表示已知元素数量和类型的数组。我们通过一个实例来了解下到底什么是元组，以及元组的应用场景是什么：
首先我们来看如何声明一个元组：
``` ts
const userInfo: [string, string, number] = ['haochy', 'male', 18]
```
数组也可以满足这种情况我们为什么要使用元组呢，比如以下这种情况:
数组中的长度是固定的，也就是我们是知道数组具体有几项内容，也知道数组每一项的类型，比如说数组的第一项是名称，第二项是性别，第三项是年龄，当然前两项肯定是`string`类型，最后一项为`number`，用数组可以这样声明：
``` ts
const userInfo: ( string | number )[] = ['haochy', 'male', 18]
```
但是这样声明我们就控制不了数组内具体每一项的类型了，第一项我们可以修改成`number`类型，它不会报错，这样其实是不符合我们的预期的，所以元组就来了，它可以帮助我们做到这一点，来约束住数组的每一项：
接下来我们来看下元组的应用场景，大致有：读取`excel`导出的文件、`csv`文件再转换为`js`的时候，使用元组比较好管理，像读取`csv`文件转为`js`的数据结构为这种类型：
``` js
[
   ['haochyk', 'male', 18],
]
```
这个时候我们怎么来定义它的类型呢，可以这样来定义：
``` ts
const userInfoList: [string, string, number][] = [
   ['haochyk', 'male', 18],
]
```
## Interface接口
首先我看来看一段代码，我们通过代码来讲解interface的具体知识点。
``` ts
function getPersonName (person: { name: string }) {
   console.log(person.name)
}
function setPersonName (person: { name: string }, name: string) {
   person.name = name
}
```
上面两个简单的方法我们可以看出person参数后的类型定义我们需要重复的写两边，这个时候我们将重复的类型定义用interface接口的形式抽离出来：
``` ts
interface Person {
   name: string;
   age: number;
}
function getPersonName (person: Person): void {
   console.log(person.name)
}
function setPersonName (person: Person, name: string): void {
   person.name = name
}
```
当然还有另外一种方法可以实现相通的效果就是使用类型定义：`type alias`:
``` ts
type Person = {
   name: string;
   age: number;
}
function getPersonName (person: Person): void {
   console.log(person.name)
}
function setPersonName (person: Person, name: string): void {
   person.name = name
}
```
`interface`和`type`类似但又不完全相同，不同点就是interface只能代表一个函数或者一个对象，它不能代表一个基础类型：
``` ts
type Person = string
interface Person {
   name: string;
   age: number;
}
```
::: tip 提示
在`TypeScript`里面一个通用型的规范就是：如果能用接口来表述一个别名的话我们就用接口的方式，实在不行我们才用类型别名
:::
在有些情况下我们不需要传递`age`属性该怎么办，我们不传递`age`参数`ts`又会报错，我们可以这样来写：
``` ts
interface Person {
   readyonly name: string;
   age?: number;
}
```
这样的意思就是`age`属性可有可无，还有一个修饰符：`readonly`意思为属性只读。
这里值得我们注意的一点就是，如果我们传递参数的时候，多传递了一个`sex`属性：
``` ts
interface Person {
   name: string;
   age: number;
}
function getPersonName (person: Person): void {
   console.log(person.name)
}
function setPersonName (person: Person, name: string): void {
   person.name = name
}
const person = {
   name: 'haochyk',
   sex: 'male',
}
// 不会报错
getPersonName(person)
// 报错
getPersonName({
   name: 'haochyk',
   sex: 'male',
})
```
这是因为，我们如果直接使用字面量的形式传参的话，`ts`会进行强校验，必须严格符合参数的类型定义，而如果我们使用缓存的形式，则不会，只要有类型定义该有的东西即可，多出一点东西也是可以的。
如果我们只是确定参数对象有`name`属性，我们不确定有其他属性的时候我们可以这样来写：
``` ts
interface Person {
   readyonly name: string;
   age?: number;
   [propName: string]: any;
}
```
接口里不仅可以存这样的属性和它的类型还可以存方法，比如我们定义`say`方法返回值的类型为`string`：
``` ts
interface Person {
   readyonly name: string;
   age?: number;
   [propName: string]: any;
   say(): string;
}
```
`Class`类是可以应用接口的，当一个类去应用接口时必须拥有接口里的属性，举个例子：
``` ts
class user implements Person {
   name = 'haochy';
   say () {
      return 'hello'
   }
}
```
接口之间还可以互相继承，如下面这个例子：
``` ts
interface Teacher extends Person {
   teach(): string
}
const teacher = {
   name: 'haochyk',
   age: 18,
   say () {
      return 'hello'
   },
   teach () {
      return 'TypeScript'
   }s
}
setPersonName(teacher, 'haochyk')
```
接口继承它会拥有`Person`接口下所有的属性和方法，同时还必须得有自己的属性或方法。
接口自身除了可以定义属性、方法之外，其实它自身还可以定义函数：
``` ts
interface SayHi {
   (word: string): string
}
const say: SayHi = (word) => {
   return word
}
```
同样`interface`还可以定义数组这样的索引类型，当我们去写这种接口的时候，`ts`最终会把把文件编译成js，但是最终编译后的`js`内并没有`interface`。
::: danger 注意
其实，`interface`就是在我们开发过程中`TypeScript`帮助我们做语法提示的一个工具。真正编译的时候会将这部分内容剔除掉。
:::
## 类的定义与继承
`TypeScript`中的类其实和`JavaScript`、`ES6`中的类很类似，不过在它的基础上`TypeScript`提供了更多的特性.
我们先看一个最基础的类：
``` ts
class Person {
   name = 'haochyk';
   getName () {
      console.log(this.name)
   }
}
```
有了类之后我们可以通过类来创建一个实例，比如说：
``` ts
class Person {
   name = 'haochyk';
   getName () {
      return this.name
   }
}
const person = new Person()
```
到这里我们就说了如何去定义一个类，以及如何在类里去定义方法。
接着我们来说下类的继承：(在`ES6`里写类的继承其实是和`TypeScript`里是一样的)
``` ts
class Person {
   name = 'haochyk';
   getName () {
      return this.name
   }
}
class Teacher extends Person {
   getTeacherName () {
      return 'hao'
   }
}
const teacher = new Teacher()
console.log(teacher.getName()) // haochyk
console.log(teacher.getTeacherName()) // hao
```
继承的意思就是，子类不仅可以使用父类的方法还可以使用自己的方法。
类还有一个概念叫做重写，即在子类和父类中的同名方法，子类中的方法会覆盖掉父类中的方法，如果想要调用父类中的方法，我们可以使用`super`，例如：
``` ts
class Teacher extends Person {
   getName () {
      return super.getName() + '1'
   }
}
console.log(teacher.getName()) // haochyk1
```
这同样也是`super`在开发中常用的应用场景：子类重写父类方法，如果需要调用父类方法可以使用`super`
## 类中的访问类型和构造器
### 访问类型
什么是访问类型？我们在`ts`中定义一个类，我们实例化这个类，访问以及修改这个实例中的属性都是可以的，因为`ts`中类的属性默认是`public`访问类型。
访问类型分为三种：`private`、`protected`、`public`。<br />
* `private`： 仅在类内允许被调用
* `protected`：类内或者继承的子类中允许被调用
* `public`：类内外都可以允许被调用
我们通过代码来看下这三个的区别：<br />
首先`private`：
``` ts
class Person {
   private name = 'haochyk'
   say () {
      return this.name // 允许访问
   }
}
const person = new Person()
console.log(person.name) // ts报错
```
`public`：
``` ts
class Person {
   public name = 'haochyk'
   say () {
      return this.name // 允许访问
   }
}
const person = new Person()
console.log(person.name) // 允许访问
```
`protected`：
``` ts
class Person {
   protected name = 'haochyk'
   say () {
      return this.name // 允许访问
   }
}
class Teacher {
   teacherSay () {
      return this.name // 允许访问
   }
}
const person = new Person()
console.log(person.name) // ts报错
```
### 构造器 (constructor)
老样子，我们先来定义一个类：
``` ts
class Person {
   public name: string
   constructor (name: string) {
      this.name = name
   }
}
const person = new Person('haochyk')
console.log(person.name) // haochyk
```
`constructor`这个方法会在类被实例化的时候自动执行，并且将实例化的参数传递给`constructor`这个方法。
以上例子是比较传统的写法，我们先定义一个属性，然后在构造器中给属性赋值，`ts`提供了一个更简单的方法，这两种写法是等价的：
``` ts
class Person {
   constructor (public name: string) {}
}
const person = new Person('haochyk')
console.log(person.name) // haochyk
```
如果继承中，子类要使用构造器，需要使用`super`，这时`super`是一个方法，它代表父类的构造函数，同时需要将父类构造函数需要的参数传递给`super`方法，即便父类没有构造器，子类也需要调用一个参数为空的`super()`，代码如下：
``` ts
class Person {
   constructor (public name: string) {}
}
class Teacher {
   constructor (public age: number) {
      super('haochyk')
   }
}
const teacher = new Teacher(18)
console.log(teacher.name) // haochyk
console.log(teacher.age) // 18
```
## Setter和Getter
我们首先来说下`getter`和`setter`的作用是：其实是为了保护类的私有属性，对私有属性的一个加密，我们通过代码来看下：
``` ts
class Demo {
   constructor (private _name: string) {}
   get name () {
      return this._name + 'a48dsi39xls2'
   }
   set setName (name: string) {
      this._name = name
   }
}
const demo = new Demo('haocyk')
console.log(demo.name) // 'haocyka48dsi39xls2'
demo.setName('haochyk')
```
然后我们再来说一下如何使用`TypeScript`来实现一个单例模式（一个类只能被实例化一次）:chestnut:：
``` ts
class Demo {
   private static instance: Demo;
   private constructor () {}
   static getInstance () {
      if (!this.instance) {
         this.instance = new Demo()
      }
      return this.instance
   }
}
const demo = Demo.getInstance()
```
&emsp;&emsp;首先我们要做的第一件事情就是控制住类的构造函数不能在外部调用，所以我们把类的构造函数设置成私有属性，这个时候该如何实例化一个类呢:thinking:，我们在类中定义一个方法提供给外部使用，由于我们没办法实例化类该怎么调用实例化类上的方法，所以我们要用`static`，直接将方法挂载到类上而不是挂载到实例化对象上，这样我们就可以通过`demo.getInstance()`来实例化`demo`这个类了，但是换句话说了，这样还不是照样可以无限实例化类嘛:cold_sweat:，实例化出来的对象指针还都不是一样的，我们接着往下看，我们在类上在通过`static`的方式挂载一个属性，将它设置为私有属性，在`getInstance`方法中判断，如果是初始化第一次实例化这个类，我们就讲实例化对象绑定在这个`instance`属性上，最后返回出去，如果有的话，我们直接将`instance`返回出去，这样我们就实现了一个最简单的单例模式:100:。
## 抽象类
&emsp;&emsp;抽象类的概念就是将类里面公用的东西提炼出来，在组成一个抽象类，抽象类里不仅可以有抽象方法还可以有具体的属性和方法，他与`interface`不同的是，`interface`是将接口中公用的东西提炼出来，而抽象类针对的是类，抽象类不能直接被实例化，但是他可以被继承，我们来看一个例子:chestnut:：
``` ts
abstract class Gemo {
   abstract getArea(): number //因为每个图形的具体实现面积的方法是不一样的，但是他们共同点是都应该有这个方法，所以我们把它修改为抽象方法，一旦你讲这个方法定义为抽象方法就以为你不能写方法的实现，你只能定义下这个方法
}
class Circle extends Gemo {
   getArea () {
      return 123
   }
}
class Square extends Gemo {
   getArea () {
      return 456
   }
}
class Triangle extends Gemo {
   getArea () {
      return 789
   }
}
const demo = Demo.getInstance()
```
