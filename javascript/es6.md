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
