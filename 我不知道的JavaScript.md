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
