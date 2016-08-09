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
