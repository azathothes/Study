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


## 函数的拓展

>函数参数的默认值

ES6 允许为函数的参数设置默认值，即直接写在参数定义的后面。
```javascript
function log(x, y = 'World') {
  console.log(x, y);
}

log('Hello') // Hello World
log('Hello', 'China') // Hello China
log('Hello', '') // Hello
```

参数默认值可以与解构赋值的默认值，结合起来使用。只有当函数的参数是一个对象时，变量才会通过解构赋值而生成。如果函数调用时参数不是对象，变量就不会生成，从而报错。

>作用域

一旦设置了参数的默认值，函数进行声明初始化时，参数会形成一个单独的作用域（context）。等到初始化结束，这个作用域就会消失。这种语法行为，在不设置参数默认值时，是不会出现的。

```javascript
var x = 1;

function f(x, y = x) {
  console.log(y);
}

f(2) // 2
```

上面代码中，参数y的默认值等于变量x。**调用函数f时**，参数形成一个单独的作用域。在这个作用域里面，默认值变量x指向第一个参数x，而不是全局变量x，所以输出是2。

>rest参数

ES6 引入 rest 参数（形式为“...变量名”），用于获取函数的多余参数，这样就不需要使用arguments对象了。rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。rest 参数中的变量代表一个数组，所以数组特有的方法都可以用于这个变量。

注意，rest 参数之后不能再有其他参数（即只能是最后一个参数），否则会报错。

函数的length属性，不包括 rest 参数。

>扩展运算符

扩展运算符（spread）是三个点（...）。它好比 rest 参数的逆运算，将一个数组转为用逗号分隔的参数序列。

### 扩展运算符的应用

1. 合并数组

扩展运算符提供了数组合并的新写法。
```javascript
// ES5
[1, 2].concat(more)
// ES6
[1, 2, ...more]

var arr1 = ['a', 'b'];
var arr2 = ['c'];
var arr3 = ['d', 'e'];

// ES5的合并数组
arr1.concat(arr2, arr3);
// [ 'a', 'b', 'c', 'd', 'e' ]

// ES6的合并数组
[...arr1, ...arr2, ...arr3]
// [ 'a', 'b', 'c', 'd', 'e' ]
```
2. 与解构赋值结合

扩展运算符可以与解构赋值结合起来，用于生成数组。
```javascript
// ES5
a = list[0], rest = list.slice(1)
// ES6
[a, ...rest] = list
```


3. 函数的返回值

JavaScript的函数只能返回一个值，如果需要返回多个值，只能返回数组或对象。扩展运算符提供了解决这个问题的一种变通方法。
```javascript
var dateFields = readDateFields(database);
var d = new Date(...dateFields);
```
上面代码从数据库取出一行数据，通过扩展运算符，直接将其传入构造函数Date。

4. 字符串

扩展运算符还可以将字符串转为真正的数组。
```javascript
[...'hello']
// [ "h", "e", "l", "l", "o" ]
```
5. 实现了Iterator接口的对象

任何Iterator接口的对象，都可以用扩展运算符转为真正的数组。
```javascript
var nodeList = document.querySelectorAll('div');
var array = [...nodeList];
```
上面代码中，querySelectorAll方法返回的是一个nodeList对象。它不是数组，而是一个类似数组的对象。这时，扩展运算符可以将其转为真正的数组，原因就在于NodeList对象实现了Iterator接口。

对于那些没有部署Iterator接口的类似数组的对象，扩展运算符就无法将其转为真正的数组。

6. Map和Set结构，Generator函数

**扩展运算符内部调用的是数据结构的Iterator接口**，因此只要具有Iterator接口的对象，都可以使用扩展运算符，比如Map结构。
```javascript
let map = new Map([
  [1, 'one'],
  [2, 'two'],
  [3, 'three'],
]);

let arr = [...map.keys()]; // [1, 2, 3]
```
Generator函数运行后，返回一个遍历器对象，因此也可以使用扩展运算符。
```javascript
var go = function*(){
  yield 1;
  yield 2;
  yield 3;
};

[...go()] // [1, 2, 3]
```
上面代码中，变量go是一个Generator函数，执行后返回的是一个遍历器对象，对这个遍历器对象执行扩展运算符，就会将内部遍历得到的值，转为一个数组。

如果对没有iterator接口的对象，使用扩展运算符，将会报错。

>严格模式

从ES5开始，函数内部可以设定为严格模式。《ECMAScript 2016标准》做了一点修改，规定只要函数参数使用了**默认值、解构赋值、或者扩展运算符**，那么函数内部就不能显式设定为严格模式，否则会报错。

原因是函数内部的严格模式，同时适用于函数体代码和函数参数代码。只有从函数体代码之中，才能知道参数代码是否应该以严格模式执行，但是参数代码却应该先于函数体代码执行。

>箭头函数

ES6允许使用“箭头”（=>）定义函数。如果箭头函数不需要参数或需要多个参数，就使用一个圆括号代表参数部分。

```javascript
var f = () => 5;
// 等同于
var f = function () { return 5 };

var sum = (num1, num2) => num1 + num2;
// 等同于
var sum = function(num1, num2) {
  return num1 + num2;
};
```

箭头函数有几个使用注意点。

1. 函数体内的this对象，就是定义时所在的对象，而不是使用时所在的对象。

2. 不可以当作构造函数，也就是说，不可以使用new命令，否则会抛出一个错误。

3. 不可以使用arguments对象，该对象在函数体内不存在。如果要用，可以用Rest参数代替。

4. 不可以使用yield命令，因此箭头函数不能用作Generator函数。










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
