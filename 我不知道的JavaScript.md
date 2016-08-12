>我不知道的JavaScript
1.选择页面上的所有元素。只能在console调试工具中使用$$函数，它会返回当前页面的所有anchor（链接）元素。

2.可以使用数字类型的toString方法进行十进制到16进制的转换。其实可以用它进行任意进制的转换.
	(30).toString();   // "30"
	(30).toString(10); // "30"
	(30).toString(16); // "1e" 16进制
	(30).toString(2); // "11110" 二进制
	(30).toString(36); // "u" 36 是最大允许的进制

3.可以将~~视为parseInt的简写：
	var a = 12.34, // ~~a = 12
    b = -1231.8754, // ~~b = -1231
    c = 3213.000001 // ~~c = 3213

	~~a == parseInt(a, 10); // true
	~~b == parseInt(b, 10); // true
	~~c == parseInt(c, 10); // true

4.Javascript异步编程的3(4)种方法
一、回调函数
二、事件监听
三、Promises对象

5.如何来确定JS对象的具体类型呢？
使用typeof运算符确定其基本类型(number,object,function,undefined)。如果typeof运算符返回object我们再使用instanceof来确定该对象是否属于某个具体类型。

o instanceof Type：判断对象o是否属于Type类型
如果要判断一个对象是否为某个具体类（子类）的实例，可以看该对象的constructor属性。

ES5 特性
		获取给丁{{对象}}的prototype对象 Object.getPrototypeOf(o)
		为了判断一个对象是否包含自定义属性而不是原型链上的属性， 我们需要使用继承自 Object.prototype 的 hasOwnProperty 方法。
		JavaScript 不会保护 hasOwnProperty 被非法占用，因此如果一个对象碰巧存在这个属性， 就需要使用外部的 hasOwnProperty 函数来获取正确的结果。
		({}).hasOwnProperty.call(foo, 'bar');

		和 in 操作符一样，for in 循环同样在查找对象属性时遍历原型链上的所有属性。

	在五种不同的情况下 ，this 指向的各不相同。

	 全局范围内

	 this;
	 当在全部范围内使用 this，它将会指向全局对象。

	 foo();
	 这里 this 也会指向全局对象。

	 ES5




	 注意: 在严格模式下（strict mode），不存在全局变量。 这种情况下 this 将会是 undefined。





	 方法调用

	 test.foo();
	 这个例子中，this 指向 test 对象。

	 调用构造函数

	 new foo();
	 如果函数倾向于和 new 关键词一块使用，则我们称这个函数是 构造函数。 在函数内部，this 指向新创建的对象。

	 显式的设置 this

	 function foo(a, b, c) {}

	 var bar = {};
	 foo.apply(bar, [1, 2, 3]); // 数组将会被扩展，如下所示
	 foo.call(bar, 1, 2, 3); // 传递到foo的参数是：a = 1, b = 2, c = 3
	 当使用 Function.prototype 上的 call 或者 apply 方法时，函数内的 this 将会被 显式设置为函数调用的第一个参数。

=======================================================

加法运算符会触发三种类型转换：

转换为原始值

转换为数字

转换为字符串


面向对象编程，五大原则分别是：

The Single Responsibility Principle（单一职责SRP）
The Open/Closed Principle（开闭原则OCP）
The Liskov Substitution Principle（里氏替换原则LSP）
The Interface Segregation Principle（接口分离原则ISP）
The Dependency Inversion Principle（依赖反转原则DIP）

单一职责的描述如下：
A class should have only one reason to change
类发生更改的原因应该只有一个

开闭原则的描述是：
Software entities (classes, modules, functions, etc.) should be open for extension but closed for modification.
软件实体（类，模块，方法等等）应当对扩展开放，对修改关闭，即软件实体应当在不修改的前提下扩展。


执行上下文（Execution Contexts）
可以定义执行上下文堆栈是一个数组：
ECStack = [];
每次进入function (即使function被递归调用或作为构造函数) 的时候或者内置的eval函数工作的时候，这个堆栈都会被压入。

当进入funtion函数代码(所有类型的funtions)的时候，ECStack被压入新元素。需要注意的是，具体的函数代码不包括内部函数(inner functions)代码。

变量对象（Variable Object）
如果变量与执行上下文相关，那变量自己应该知道它的数据存储在哪里，并且知道如何访问。这种机制称为变量对象(variable object)。

变量对象(缩写为VO)是一个与执行上下文相关的特殊对象，它存储着在上下文中声明的以下内容：
    变量 (var, 变量声明);
    函数声明 (FunctionDeclaration, 缩写为FD);
    函数的形参

全局上下文中的变量对象:
	当访问全局对象的属性时通常会忽略掉前缀，这是因为全局对象是不能通过名称直接访问的。不过我们依然可以通过全局上下文的this来访问全局对象，同样也可以递归引用自身。
	因此，回到全局上下文中的变量对象——在这里，变量对象就是全局对象自己：

函数上下文中的变量对象
在函数执行上下文中，VO是不能直接访问的，此时由活动对象(activation object,缩写为AO)扮演VO的角色。
活动对象是在进入函数上下文时刻被创建的，它通过函数的arguments属性初始化。

ex:
function test(a, b) {
  var c = 10;
  function d() {}
  var e = function _e() {};
  (function x() {});
}
 
test(10); // call
当进入带有参数10的test函数上下文时，AO表现为如下：

AO(test) = {
  a: 10,
  b: undefined,
  c: undefined,
  d: <reference to FunctionDeclaration "d">
  e: undefined
};
注意，AO里并不包含函数“x”。这是因为“x” 是一个函数表达式(FunctionExpression, 缩写为 FE) 而不是函数声明，函数表达式不会影响VO。


变量声明在顺序上跟在函数声明和形式参数声明之后，进入上下文阶段，变量声明不会干扰VO中已经存在的同名函数声明或形式参数声明.

	关于变量:任何时候，变量只能通过使用var关键字才能声明。

this:
	定义	
	this是执行上下文中的一个属性：

activeExecutionContext = {
  VO: {...}, //virable object
  this: thisValue
};

this是进入上下文时确定，在一个函数代码中，这个值在每一次完全不同。
##调用函数的方式影响了调用的上下文中的this值，没有别的什么

为了充分理解this值的确定，需要详细分析其内部类型之一——引用类型（Reference type）。

在一个函数上下文中，this由调用者提供，由调用函数的方式来决定。如果调用括号()的左边是引用类型的值，this将设为引用类型值的base对象（base object），在其他情况下（与引用类型不同的任何其它属性），这个值为null。不过，实际不存在this的值为null的情况，因为当this的值为null的时候，其值会被隐式转换为全局对象。

