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
上面两个简单的方法我们可以看出person参数后的类型定义我们需要重复的写两遍，这个时候我们将重复的类型定义用interface接口的形式抽离出来：
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
   age?: number;
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
   }
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
&emsp;&emsp;抽象类的概念就是将类里面公用的东西提炼出来，再组成一个抽象类，抽象类里不仅可以有抽象方法还可以有具体的属性和方法，他与`interface`不同的是，`interface`是将接口中公用的东西提炼出来，而抽象类针对的是类，抽象类不能直接被实例化，但是他可以被继承，我们来看一个例子:chestnut:：
``` ts
abstract class Gemo {
   abstract getArea(): number //因为每个图形的具体实现面积的方法是不一样的，但是他们共同点是都应该有这个方法，所以我们把它修改为抽象方法，一旦你将这个方法定义为抽象方法就以为你不能写方法的实现，你只能定义下这个方法
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
## TypeScript中的配置文件
&emsp;首先我们都知道在初始化`TypeScript`项目的时候我们需要使用命令：
```sh
ts --init
```
&emsp;使用命令初始化项目后，我们的文件夹中会多出一个`tsconfig.json`文件，这个就是`TypeScript`项目的配置文件。我们知道给他人提供代码的时候需要我们将`ts`文件转成`js`文件，这个编译过程需要使用命令：
```sh
tsc demo.ts
```
如果我们`tsc`后面指定了具体文件其实是不会走我们项目中的`tsconfig.json`文件的，反之，直接使用`tsc`，后面不跟任何内容是会走配置文件的，它会默认将根目录下的所有内容进行编译生成对应的`js`文件。那，如果我们想指定编译文件，而不想全部编译，我们可以在`tsconfig.json`文件内做一些修改：
```json
{
   "file": ["demo.ts"]
}
```
或者你也可以使用`exclude`和`include`来实现同样的功能：
```json
{
   "include": [
      "./demo.ts"
   ],
   "exclude": [
      "./demo1.ts",
   ]
}
```
当然也可以接收正则表达式来匹配文件，接着我们来看下配置文件中的`compilerOptions`配置项，我们列举几个常用的配置项来讲解：
::: warning 注意
`ts-node`底层其实会走配置文件的。
:::
```json
/* 编译配置项 */
"compilerOptions": {
   "allowJs": true,                       /* 是否编译js文件 */
   "checkJs": true,                       /* 是否检测js语法问题 */
   "sourceMap": true,                     /* 是否生成sourceMap文件 */
   "outDir": "./build",                        /* 编译后文件的存放位置 */
   "rootDir": "./",                       /* 需要编译的文件目录 */
   "removeComments": true,                /* 编译后去除注释 */
   "strict": true,                           /* 启用所有严格类型检查选项 */
   "noImplicitAny": true,                 /* 不能隐式定义any，必须显式得定义 */
   "strictNullChecks": true,              /* 对null值的严格检验 */
   "strictFunctionTypes": true,           /* 方法参数必须定义类型 */
   /* Additional Checks */
   "noUnusedLocals": true,                /* 对多余代码的一个检测，比如声明了一个变量没有地方使用 */
   "noUnusedParameters": true,            /* 与上雷同，此配置针对方法的参数 */
}
```
## 联合类型和类型保护
首先我们来说下什么是联合类型，我们声明两个接口：
```ts
interface Bird {
   fly: boolean;
   sing: () => {};
}
interface Dog {
   fly: boolean;
   bark: () => {};
}
function trainAnimal (animal: Bird | Dog) {
   animal.sing()
}
```
这个时候我们在调用`animal`参数时，`ts`只会给我们提示`fly`属性，而不会提示其他的方法，这就是联合类型，只会提示共有的属性和方法，当我们调用`animal`参数的`sing`方法的时候，`ts`会发出警告，因为如果我们`Dog`类型的话其实是没有`sing`方法的，我们如何来规避这种警告呢，我们需要使用类型保护，类型保护的方式有很多种，我们来简单介绍几个：
### 断言
```ts
interface Bird {
   fly: boolean;
   sing: () => {};
}
interface Dog {
   fly: boolean;
   bark: () => {};
}
function trainAnimal (animal: Bird | Dog) {
   if (animal.fly) {
      (animal as Bird).sing()
   } else {
      (animal as Dog).bark()
   }
}
```
### in
```ts
function trainAnimal (animal: Bird | Dog) {
   if ('sing' in animal) {
      animal.sing()
   } else {
      animal.bark()
   }
}
```
### typeof
```ts
function add (first: string | Number, second: string | Number) {
   if (typeof first === 'string' || typeof second === 'string') {
      return `${first}${second}`
   }
   return first + second
}
```
### instanceof
```ts
class Number {
   count: number;
}
function add (first: object | Number, second: object | Number) {
   if (first instanceof Number && second instanceof Number) {
      return first.count + second.count
   }
   return 0
}
```
::: warning 注意
此处要使用`class`类的形式，因为`interface`不具备`instanceof`方法
:::
## Enum 枚举类型
我们在开发实际过程当中都会有这种情况：
```js
const Status = {
   OFFLINE: 0,
   ONLINE: 1,
   DELETED: 2,
}
function getResult (status) {
   if (status === Status.OFFLINE) {
      return 'offline'
   } else if (status === Status.ONLINE) {
      return 'online'
   } else if (status === Status.DELETED) {
      return 'deleted'
   }
   return 'error'
}
const result = getResult(Status.OFFLINE)
```
我们可以使用`ts`来更优雅的实现：
```ts
enum Status {
   OFFLINE,
   ONLINE,
   DELETED,
}
function getResult (status) {
   if (status === Status.OFFLINE) {
      return 'offline'
   } else if (status === Status.ONLINE) {
      return 'online'
   } else if (status === Status.DELETED) {
      return 'deleted'
   }
   return 'error'
}
const result = getResult(Status.OFFLINE)
```
这样也可以实现上面用`js`实现的效果，这是因为，`ts`中的`enum`枚举类型，默认会给第一项定义为`0`，依次递增，如果我们想更改默认值，我们可以这样来修改：
```ts
enum Status {
   OFFLINE = 1,
   ONLINE,
   DELETED,
}
```
这样的话，分别代表的就是`1`、`2`、`3`，如果我们将`ONLINE`的值修改为`4`，那么`DELETED`的值将为`5`。我们不仅可以正向查询还可以反向查询：
```ts
Status.OFFLINE === Status[0]
```
## 函数泛型
&emsp;泛型，泛指的类型（`generic`），泛型的使用场景：我们不确定方法定义的时候参数的类型，当我们使用函数的时候我们参数的类型，这个时候我们可以在函数参数中使用泛型，我们在函数当中使用泛型的时候，需要在函数名的后面使用尖括号的形式定义下泛型，通常我们使用`T`也就是`type`的缩写，不仅可以定义一个泛型还可以定义多个泛型，使用逗号隔开即可，我们先来看一个在函数中使用泛型的一个例子：
```ts
function join<T, P> (first: T, second: P) {
   return `${first}${second}`
}
const result = join<string, string> (1, '1')
```
泛型不仅可以在函数的参数中使用，还可以作为函数的返回结果使用：
```ts
function join<T, P> (first: T, second: P): T {}
```
数组中使用泛型，以下两种情况是等价的：
```ts
function join<T> (first: T[]) {
   return first
}
// or
function join<T> (first: Arrary<T>) {
   return first
}
const result = join<string> (['123'])
```
::: warning 注意
如果在调用函数的时候没有写前面的具体类型，它也不会报错，这是因为`ts`底层会做类型推断
:::
## 类中的泛型以及泛型类型
&emsp;&emsp;假设我们有一个类，类中接收一个`data`的数组作为参数，数组的每一项我们暂且定为`string`类型，我们这是可以写成`constructor (private data: string[]) {}`，那以后需求变更，数组内容不仅可以是`string`类型还可以是`number`类型，这时我们就需要修改为`constructor (private data: string[] | number[]) {}`，那以后我们可能支持更多类型的值，这时我们就需要写更长的联合类型，从而使我们的代码看起来非常的繁琐，为了解决这个问题我们可以使用类中的泛型，其实它不仅仅解决这种问题，在`TypeScript`中编写复杂代码很多时候我们需要使用泛型来解决灵活性上的问题。<br />
&emsp;&emsp;接着我们来看下类中泛型的定义：
```ts
class DataManager<T> {
   constructor (private data: T[]) {}
   getName (index: number): T {
      return this.data[index]
   }
}
const data = new DataManager<string, number>(['1'])
```
&emsp;&emsp;类中定义泛型，需要在类名后加一对尖括号，内容为`T`，我们来解释下这段代码的意思：这个类中的构造函数接收一个`data`的参数，每一项内容我们定义为泛型`T`，接下来有一个`getName`的方法来获取指定数组中的每一项，参数`index`自然是一个`number`类型，返回结果我们暂时不确定，但是肯定是泛型`T`，所以我们就将`getName`的返回结果定义为`T`，这样就解决了我们上面复杂的联合类型的问题。<br />
&emsp;&emsp;接下来我们再更改下需求，我现在想让`data`这个数组中的每一项都有一个`name`属性，那我们应该来怎么约束泛型呢，我们可以定义一个`interface`接口，接下来我们通过代码来实现下：
```ts
interface Item {
   name: string;
}
class DataManager<T extends Item> {
   constructor (private data: T[]) {}
   getName (index: number): string {
      return this.data[index].name
   }
}
const data = new DataManager([{
   name: 'haochyk',
}])
```
&emsp;&emsp;同样我们可以借助`extends`让泛型在具体类型的对应上面来做一些约束，比如我只想让泛型类型为`number`或者`string`，我们可以使用`extends`这样来写：
```ts
class DataManager<T extends number | string> {
   constructor (private data: T[]) {}
   getName (index: number): string {
      return this.data[index];
   }
}
const data = new DataManager<string>(['1'])
```
&emsp;&emsp;泛型还可以作为`type`的声明，比如用泛型还可以声明些类型，那如何使用泛型作为一个具体的类型注解，看以下示例：
```ts
const hello = function <T>(param) => {
   return param
}
const func: <T>(param: T) => T = hello
```
## 命名空间（nameSpace）
&emsp;&emsp;`namespace`的一个好处就是给我们一个类似模块化开发的方式让我们能尽少得去声明全局变量，或者说把一组相关的内容封装到一起去对外提供统一的暴露接口：
之前我们都是在`node`环境下运行代码，现在我们换成在浏览器下运行我们的代码，首先我们执行命令：`npm init -y`来初始化一个项目，接着我们再执行`tes -init`命令来初始化下`typescript`，现在我们再根目录下新建一个`src`目录，并新建一个叫做`page`的`js`文件，再在根目录下新建一个`index`的`html`文件，文件内容我们尽量从简，只是做一个简单的演示，接着我们来修改下`ts`的配置文件：将`rootDir`注释打开，内容修改为`./src`,并且将`outDir`注释也打开，内容修改为`./dist`，到这我们项目的基本框架就搭建起来了，然后我们在我们的`page.ts`文件中写一些东西，这里使用面向对象的写法来写：
```ts
class Header {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is header'
      document.body.appendChild(eleE)
   }
}

class Content {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is content'
      document.body.appendChild(eleE)
   }
}

class Footer {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is footer'
      document.body.appendChild(eleE)
   }
}

class Page {
   constructor () {
      new Header()
      new Content()
      new Footer()
   }
}
```
&emsp;&emsp;之后我们再我们的`index.html`中引入`./dist/page.js`文件，并且实例化下`page`类，从新打包编译下，这时候我们打开i`ndex.html`页面就可以看到页面上已经有内容了，这里顺带提下，我们每次修改代码都需要重新执行`tsc`命令来打包编译`ts`文件，这里我们可以使用命令`tsc -w`来进行一个监听。回到浏览器的页面上的控制台我们来看，这个时候你会发现`Header`、`Content`、`Footer`、`Page`这些都是全局体变量，其实我们再项目开发的时候要尽量的去避免声明全局变量，这个时候我们可以使用`namespcae`来解决这个问题，回到我们的`page.ts`文件中我们来做下修改：
```ts
namespace Home {
   class Header {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is header'
         document.body.appendChild(eleE)
      }
   }

   class Content {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is content'
         document.body.appendChild(eleE)
      }
   }

   class Footer {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is footer'
         document.body.appendChild(eleE)
      }
   }

   export class Page {
      constructor () {
         new Header()
         new Content()
         new Footer()
      }
   }
}
```
到这就解决了全局变量的问题，全局变量只剩下了一个`Page`，这是符合我们预期的，这时我们还应该修改下我们的`index.html`文件，因为之前的调用方式是直接实例化`Page`类，现在有了命名空间，我们需要修改成`new Home.Page()`。
::: warning 注意
在`page.ts`文件中我们需要将使用的`page`类使用`export`导出
:::
::: tip 说明
完整demo地址：<a href="https://github.com/SuperLuckyYU/Ts-namespace-demo" target="_black">https://github.com/SuperLuckyYU/Ts-namespace-demo</a>
:::
&emsp;&emsp;我们接着上面写的`demo`来说，现在我们再写一个命名空间，名字叫做`Components`，我们将之前之前写在`page.ts`中的具体方法实现抽离到`Components`命名空间中去，然后在`page.ts`中去使用，这时，我们新建一个`components.ts`文件：
```ts
// components.ts
namespace Components {
   export class Header {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is header'
         document.body.appendChild(eleE)
      }
   }

   export class Content {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is content'
         document.body.appendChild(eleE)
      }
   }

   export class Footer {
      constructor () {
         const eleE = document.createElement('div')
         eleE.innerText = 'This is footer'
         document.body.appendChild(eleE)
      }
   }
}
// page.ts
namespace Home {
   export class Page {
      constructor () {
         new Components.Header()
         new Components.Content()
         new Components.Footer()
      }
   }
}
```
&emsp;&emsp;到现在为止代码是无法运行的，因为打包会生成两份js文件，分别为：`page.js`、`components.js`文件，需要我们再`index.html`文件中引入我们的`components.js`文件，我们也可以将所有的打包文件统一合并到一个`js`文件中去，我们修改下`ts`的配置文件：
```json
"module": "amd",
"outFile": "./dist/page.js",
```
&emsp;&emsp;这时我们在`index.html`中只需要引入一个`js`文件即可。回过头来看我们的`page.ts`我们会发现命名空间之间的引入非常的不直观，我们可以声明下命名空间之间的依赖声明：
```ts
///<reference path='./components.ts' />
namespace Home {
   export class Page {
      constructor () {
         new Components.Header()
         new Components.Content()
         new Components.Footer()
      }
   }
}
```
命名空间中还可以暴露`interface`语法：
```ts
// components.ts
namespace Components {
   exports interface User {
      name: string;
   }
}

// page.ts
namespace Home {
   export class Page {
      user: Components.User = {
         name: 'haochyk'
      }
      constructor () {
         new Components.Header()
         new Components.Content()
         new Components.Footer()
      }
   }
}
```
在命名空间中还可以使用子的命名空间：
```ts
// components.ts
namespace Components {
   exports namespace SubComponents {
      exports class Test {}
   }
}
```
## Import对应的模块化-缺代码
我们可以通过`es6`的`import`和`export`语法在`TypeScript`中做模块化的组织：
```ts
// page.ts
import { Header, Content, Footer } from './components.ts'
export default class Page {
   constructor () {
      new Header()
      new Content()
      new Footer()
   }
}
// components.js
export class Header {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is header'
      document.body.appendChild(eleE)
   }
}

export class Content {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is content'
      document.body.appendChild(eleE)
   }
}

export class Footer {
   constructor () {
      const eleE = document.createElement('div')
      eleE.innerText = 'This is footer'
      document.body.appendChild(eleE)
   }
}
```
&emsp;&emsp;这时我们来看下打包后的`page.js`文件内容你会发现被打包成了`AMD`规范的模块化代码了，这个时候我们是没办法直接在浏览器上跑起来的，因为`AMD`这种规范的代码浏览器是没办法识别的，浏览器需要有解析的工具才能帮助我们识别`define`这种语法，之所以会变成`AMD`语法的代码是因为我们在`ts`的配置文件中将`module`修改为了`amd`，如果想让浏览器支持，需要我们在入口文件也就是`index.html`中引入`require.js`做兼容，然后对`index.html`做下修改：
```js
require(['page'], function (page) {
   new page.default()
})
```
&emsp;&emsp;现在我们可以看到现在的代码编译过后需要引入各种像`require`这种库相对来说比较麻烦，实际上在用`TypeScript`做前端代码编写的时候一般我们会在项目中引入`webpack`来帮助我们对代码做进一步的编译，这时我们就不需要引入`require`这些步骤了，`webpack`它可以做的更完善。
## 使用Parcel打包TS代码
&emsp;&emsp;`Parcel`是和`Webpack`相类似的一个打包工具，但是它不需要做过多额外的配置，之前我们使用`import`的时候需要引入`require`这种方式是比较麻烦的，使用`parcel`则会变得非常简单，在我们的入口文件`index.html`中直接引入`ts`文件，然后安装`parcel`，执行命令：`npm install parcel@next -D`，接着我们再`package.json`中写一个`script`命令：`test: parcel ./src/index.html`，它会帮助你自动起一个服务器，打开服务器地址你就会发现，代码正常运行了，这是因为它将我们的`ts`文件进行了编译，编译成了浏览器可以执行的`js`文件








