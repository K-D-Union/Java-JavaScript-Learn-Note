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
&emsp;静态类型的变量不仅类型不能修改，而且意味着这个变量的属性和方法基本已经确定了。正是因为这样，我们在编辑器使用静态类型的时候会给我们很好的语法提示。
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
   name: 'string',
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
&emsp;首先我们收一下TS的几种定义函数的方式和JS是一样的
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
