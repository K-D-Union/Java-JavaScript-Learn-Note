---
sidebar: auto
title: TypeScript
---
# TypeScript

<<<<<<< HEAD
## 参考说明
::: tip 说明
本篇博客由慕课网视频[TypeScript －系统入门到项目实战](https://coding.imooc.com/class/412.html)(Dell-Lee)阅读整理而来，观看视频请支持正版。
:::

=======
>>>>>>> 更新TypeScript栏
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
基础类型：`number`、`string`、`bollean`、`null`、`undefined`、`symbol`、`void`
```ts
const count: number = 123
const name: String = 'haochyk'
...
```
对象类型：
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
