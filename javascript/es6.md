# ES6重要的新特性

## let命令
ES6的let用来声明该作用域内的变量，该变量在且仅在该作用域内有效。
```javascript
{
  let a = 10;
  var b = 1;
}
a // ReferenceError: a is not defined.
b // 1
```
### **运用：**
在for循环中使用let来代替var，以达到不污染全局作用域的目的。

### **注意：**
1.与var变量声明变量不同，let命令不存在变量提升，所以在使用let声明的变量的时候，必须先声明，否则会报错。

2.暂时性死区(temporal dead zone)：只要块级作用域内存在let命令，它所声明的变量就“绑定”（binding）这个区域，不再受外部的影响。
```javascript
var tmp = 123;
if (true) {
  tmp = 'abc'; // ReferenceError
  let tmp;
}
```
虽然外部已经声明了tmp变量，当内部作用域存在tmp变量的let声明，在let声明之前会形成暂时性死区，任何可能的对tmp的读取或者赋值都会报错。

>ES6明确规定，如果区块中存在let和const命令，这个区块对这些命令声明的变量，从一开始就形成了封闭作用域。凡是在声明之前就使用这些变量，就会报错。

3.不能重复声明。

#

## const命令
const声明一个只读的常量。一旦声明，常量的值就不能改变。
const的作用域与let命令相同：只在声明所在的块级作用域内有效。
const命令声明的常量也是不提升，同样存在暂时性死区，只能在声明的位置后面使用。


>在ES6中：let命令、const命令、class命令声明的全局变量，不属于顶层对象的属性。

#

## 解构
ES6 允许按照一定模式，从数组和对象中提取值，对变量进行赋值，这被称为解构（Destructuring）。

```javascript
let [a, b, c] = [1, 2, 3];
let [foo, [[bar], baz]] = [1, [[2], 3]];
```

如果解构不成功，变量的值就等于undefined。以下两种情况都属于解构不成功，foo的值都会等于undefined。

```javascript
let [foo] = [];
let [bar, foo] = [1];
```
如果等号的右边不是数组，或者严格地说，不是可遍历的结构，那么将会报错。

对于 Set 结构，也可以使用数组的解构赋值。
```javascript
let [x, y, z] = new Set(['a', 'b', 'c']);
```

解构赋值允许指定默认值。
```javascript
let [foo = true] = [];
foo // true

let [x, y = 'b'] = ['a']; // x='a', y='b'
let [x, y = 'b'] = ['a', undefined]; // x='a', y='b'
```
注意，ES6 内部使用严格相等运算符（===），判断一个位置是否有值。所以，如果一个数组成员不严格等于undefined，默认值是不会生效的。

解构不仅可以用于数组，还可以用于对象。对象的解构与数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由它的位置决定；而对象的属性没有次序，变量必须与属性同名，才能取到正确的值。

```javascript
let { bar, foo } = { foo: "aaa", bar: "bbb" };
foo // "aaa"
bar // "bbb"

let { baz } = { foo: "aaa", bar: "bbb" };
baz // undefined
```

### 用途
1. 交换变量的值
2. 从函数返回多个值
3. 函数参数的定义
4. 函数参数的默认值
5. 遍历结构
6. 输入模块的指定方法

## 字符串的扩展
### 字符串新增方法
>```codePointAt()```

JavaScript内部，字符以UTF-16的格式储存，每个字符固定为2个字节。对于那些需要4个字节储存的字符（Unicode码点大于0xFFFF的字符），JavaScript会认为它们是两个字符。

ES6提供了codePointAt方法，能够正确处理4个字节储存的字符，返回一个字符的码点。

codePointAt方法的参数，是字符在字符串中的位置（从0开始）。

codePointAt方法会正确返回32位的UTF-16字符的码点。对于那些两个字节储存的常规字符，它的返回结果与charCodeAt方法相同。

codePointAt方法返回的是码点的十进制值，如果想要十六进制的值，可以使用toString方法转换一下。

>字符串的遍历器接口

ES6为字符串添加了遍历器接口，使得字符串可以被for...of循环遍历。
同时可以识别大于0xFFFF的码点，传统的for循环无法识别这样的码点。

>includes(), startsWith(), endsWith()

JavaScript只有indexOf方法，可以用来确定一个字符串是否包含在另一个字符串中。ES6又提供了三种新方法。

* includes()：返回布尔值，表示是否找到了参数字符串。

* startsWith()：返回布尔值，表示参数字符串是否在源字符串的头部。

* endsWith()：返回布尔值，表示参数字符串是否在源字符串的尾部。


>模板字符串

模板字符串（template string）是增强版的字符串，用反引号（`）标识。它可以当作普通字符串使用，也可以用来定义多行字符串，或者在字符串中嵌入变量。

```javascript
// 普通字符串
`In JavaScript '\n' is a line-feed.`

// 多行字符串
`In JavaScript this is
 not legal.`

console.log(`string text line 1
string text line 2`);

// 字符串中嵌入变量
var name = "Bob", time = "today";
`Hello ${name}, how are you ${time}?`
//大括号内部可以放入任意的JavaScript表达式，可以进行运算，以及引用对象属性和调用函数。
```

## 数值的拓展

ES6 提供了二进制和八进制数值的新的写法，分别用前缀0b（或0B）和0o（或0O）表示。

从 ES5 开始，在严格模式之中，八进制就不再允许使用前缀0表示，ES6 进一步明确，要使用前缀0o表示。

如果要将0b和0o前缀的字符串数值转为十进制，要使用```Number()```方法。

ES6在Number对象上，新提供了Number.isFinite()和Number.isNaN()两个方法。

* Number.isFinite()用来检查一个数值是否为有限的（finite）。
* Number.isNaN()用来检查一个值是否为NaN。

>Math对象的扩展

ES6在Math对象上新增了17个与数学相关的方法。所有这些方法都是静态方法，只能在Math对象上调用。

* Math.trunc方法用于去除一个数的小数部分，返回整数部分。对于非数值，Math.trunc内部使用Number方法将其先转为数值。对于空值和无法截取整数的值，返回NaN。
* Math.sign方法用来判断一个数到底是正数、负数、还是零。它会返回五种值。参数为正数，返回+1;参数为负数，返回-1；参数为0，返回0；参数为-0，返回-0;其他值，返回NaN。



1.for-of 循环 
for (var value of myArray) {
 console.log(value);
}

for-of 循环不仅支持数组，还支持大多数类数组对象，例如 DOM NodeList 对象。
for-of 循环也支持字符串遍历.
它同样支持 Map 和 Set 对象遍历。

Map 对象稍有不同：内含的数据由键值对组成，所以你需要使用解构（destructuring）
来将键值对拆解为两个独立的变量：
for (var [key, value] of phoneBookMap) {
 console.log(key + "'s phone number is: " + value);
}
