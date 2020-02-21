---
sidebar: auto
title: Spring
---
<h1>Spring</h1>

## 介绍
<p>&nbsp;&nbsp;&nbsp;&nbsp;Spring框架是由于软件开发的复杂性而创建的。Spring使用的是基本的JavaBean来完成以前只可能由EJB完成的事情。然而，Spring的用途不仅仅限于服务器端的开发。从简单性、可测试性和松耦合性角度而言，绝大部分Java应用都可以从Spring中受益。</P>

## 作用
<p>
◆目的：解决企业应用开发的复杂性
</p>
<p>
◆功能：使用基本的JavaBean代替EJB，并提供了更多的企业应用功能
</p>
<p>
◆范围：任何Java应用
</p>
<p>
Spring是一个轻量级控制反转(IoC)和面向切面(AOP)的容器框架。
</p>

## Spring的核心

<p>&nbsp;&nbsp;&nbsp;&nbsp;Spring的核心是ioc和aop,ioc是控制反转、aop是面向切面编程、ioc降低了耦合度；可以把依赖关系注入到配置文件中，使用配置文件进行注入或使用@Bean。aop是面向切面可以做方法的的前置增强、后置增强、添加日志或者事务</p>

## IOC
<p>&nbsp;&nbsp;&nbsp;&nbsp;IoC 全称为 Inversion of Control，翻译为 “控制反转”，它还有一个别名为 DI（Dependency Injection）,即依赖注入。
</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;Ioc是一种面向对象思想，从原先应用主动获取改为ioc为应用创建不再需要自己去创建，只需把你要需要创建的东西交给ioc由ioc来创建，等应用程序需要的时候告诉ioc，ioc再给应用程序，从而实现降低应用程序中的耦合度，也从主动行为改成了被动行为创建对象交给ioc容器处理，控制颠倒过来了，这也是控制反转的由来。
</p>
<p>&nbsp;&nbsp;&nbsp;&nbsp;依赖注入是ioc容器运行期间，动态获取依赖关系进行注入到对象中；依赖注入和控制反转是从不同的角度描述的同一件事情,指通过引入Ioc容器，利用依赖关系注入方式，实现对象之间的解耦。
</p>

### IOC原理

<p>&nbsp;&nbsp;&nbsp;&nbsp;ioc容器通过java的反射机制+xml配置文件,当web容器（tomcat）启动的时候全局bean会去xml中的配置文件中查找需要扫描的包下的所有类，并根据使用的注解，进行封装成全局的bean容器中进行管理，初始化完成之后bean的容器，bean的id以及bean实例化的对象的信息会存在于容器中，在service中调用另一个beanid可以获取到bean的详情信息，如果bean存在会返回该bean的实例。
</p>

### Bean定义

<p>&nbsp;&nbsp;&nbsp;&nbsp;在Spring中，那些组成应用程序的主体由Spring IOC容器所管理的对象，被称为bean。Bean是由ioc容器初始化、装配及管理的对象，初次之外，bean就与应用程序中的其他对象没有任何区别了。
</p>

### 创建bean
<p>这里介绍三种常见的创建方式：自动装配、Bena、xml来创建如下：</p>

::: tip 方式一：
使用@Component来创建bean,该注解可以传一个参数value，用来指定要创建的bean的名称，默认使用类名并且首字母小写。
以下代码演示了如何使用@Component创建一个bean：
:::

```java
@Component
public class SuperObject {
  public void method(){
    //Business
  }
}
```

```java
@Component
public class SonObject implements SuperObject{
  @Override
  public void method(){
    //Business
  }
}
```

::: tip 方式二：
通过@Configuration、@Bean注解来实现
:::

```java
@Configuration
public class ObjectConfig {
  @Bean
  public void method(){
    //Business
  }
}
```

::: tip 方式三：
通过xml进行实现，首先创建一个<beans></beans>在beans中创建一个bean的子标签，bean标签中有两个属性id和class，id声明bean的名称，class属性则是用来指定要创建的类（包含包名）。
:::

```java
@Configuration
<?xml version="1.0" encoding="UTF-8" ?>
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:util="http://www.springframework.org/schema/util"
       xsi:schemaLocation="http://www.springframework.org/schema/beans
       http://www.springframework.org/schema/beans/spring-beans.xsd">

    <bean id="method" class="com.java.config"/>
</beans>
}
```

### Bena 作用域
|类别	    |说明|
| -------------|:-------------:|
|singleton|	在Spring IoC容器中仅存在一个Bean实例，Bean以单例方式存在，默认值|
|prototype|	每次从容器中调用Bean时，都返回一个新的实例，即每次调用getBean()时，相当于执行new XxxBean()|
|request	|每次HTTP请求都会创建一个新的Bean，该该作用域仅适用于WebApplicationContext环境|
|session	| 同一个HTTP Session共享一个Bean，不同Session使用不同Bean，仅适用于WebApplicationContext环境|
|globalSession|	一般用于Portlet应用环境，该作用域仅适用于WebApplicationContext环境|
Bean的五种作用域中，request、session和globalSession 三种作用域只在基于web的应用中使用（不必关心所采用的是什么web应用框架）,只能用在基于 web 的 Spring ApplicationContext 环境。

### 怎么设置作用域
<h3>以singleton为例</h3>
<h4>singleton唯一 bean 实例，当一个 bean 的作用域为 singleton，那么Spring IoC容器中只会存在一个共享的 bean 实例，并且所有对 bean 的请求，只要 id 与该 bean 定义相匹配，则只会返回bean的同一实例。</h4>

<p>&nbsp;&nbsp;&nbsp;&nbsp;singleton 是单例类型(对应于单例模式)，就是在创建起容器时就同时自动创建了一个bean的对象，不管你是否使用，但我们可以指定Bean节点的 lazy-init=”true” 来延迟初始化bean，这时候，只有在第一次获取bean时才会初始化bean，即第一次请求该bean时才初始化。 每次获取到的对象都是同一个对象。注意，singleton 作用域是Spring中的缺省作用域。要在XML中将 bean 定义成 singleton 。
</p>

<p>可以这样配置：</p>

``` java
<bean id="ServiceImpl" class="cn.csdn.service.ServiceImpl" scope="singleton">
```
<p>也可以通过 @Scope 注解（它可以显示指定bean的作用范围。）的方式</p>

``` java
@Service
@Scope("singleton")
public class ServiceImpl{
  //Business
}
```


### bean的生命周期
<p>Spring Bean是Spring应用中最最重要的部分了。所以来看看Spring容器在初始化一个bean的时候会做那些事情，顺序是怎样的，在容器关闭的时候，又会做哪些事情。</p>

```
1、Spring启动，查找并加载需要被Spring管理的bean，进行Bean的实例化
2、Bean实例化后对将Bean的引入和值注入到Bean的属性中
3、如果Bean实现了BeanNameAware接口的话，Spring将Bean的Id传递给setBeanName()方法
4、如果Bean实现了BeanFactoryAware接口的话，Spring将调用setBeanFactory()方法，将BeanFactory容器实例传入
5、如果Bean实现了ApplicationContextAware接口的话，Spring将调用Bean的setApplicationContext()方法，将bean所在应用上下文引用传入进来。
6、如果Bean实现了BeanPostProcessor接口，Spring就将调用他们的postProcessBeforeInitialization()方法。
7、如果Bean 实现了InitializingBean接口，Spring将调用他们的afterPropertiesSet()方法。类似的，如果bean使用init-method声明了初始化方法，该方法也会被调用
8、如果Bean 实现了BeanPostProcessor接口，Spring就将调用他们的postProcessAfterInitialization()方法。
此时，Bean已经准备就绪，可以被应用程序使用了。他们将一直驻留在应用上下文中，直到应用上下文被销毁。
9、如果bean实现了DisposableBean接口，Spring将调用它的destory()接口方法，同样，如果bean使用了destory-method 声明销毁方法，该方法也会被调用。

```


### IocDemo下载地址
<a href="https://github.com/superman-yuan/demo.git">https://github.com/superman-yuan/demo.git</a>

## AOP
<p>&nbsp;&nbsp;&nbsp;&nbsp;AOP是Spring框架面向切面的编程思想，AOP采用一种称为"横切"的技术，将涉及多业务流程的通用功能抽取并单独封装形成独立切面，在合适的时机将这些切面横向切入到业务流程指定的位置中。
</p>

### AOP原理
<p>&nbsp;&nbsp;&nbsp;&nbsp;AOP采用是JVM中的动态代理机制，动态代理分为CGLib、JDK，什么是动态代理？简单理解一下，程序运行时由Java反射机制动态生成动态代理，不需要手动编写它的源代码，可以简化编程工作。采用了Java中最常见的设计模式代理模式。什么是代理模式呢？用一个经典的案例来解说一下：假如有一辆正在行驶的汽车，有一天司机突然想记录一下今天行驶的时间这个时候就用到了代理模式，首先把正在行驶的汽车作为目标方法，代理目标方法在开始行驶时记录一个当前时间，在结束行驶时记录一个结束时间，最后用结束时间减去开始时间；这个过程称为代理模式。
</p>

## Spring常用注解

## 总结
<p>
&nbsp;&nbsp;&nbsp;&nbsp;Spring给复杂的J2EE开发带来了春天。它的核心是轻量级的IoC容器，它的目标是为J2EE应用提供了全方位的整合框架，在Spring框架下实现多个子框架的组合，这些子框架之间可以彼此独立，也可以使用其它的框架方案加以代替，Spring希望为企业应用提供一站式（one-stopshop）的解决方案。
</p>
