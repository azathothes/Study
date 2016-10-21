### array , slice , 与map的定义
* * * *
#### array:
可以利用 array 在列表中进行多个值的排序，或者使用更加灵活的：slice。字典或哈希类型同样可以使用，在 Go 中叫做 map。

数组长度也是数组类型的一部分，所以[5]int和[10]int是属于不同类型的。
数组长度最大为 2Gb。
array 由 [n]<type> 定义，n 标示 array 的长度，而 <type> 标示希望存储的内容的类型。对 array 的元素赋值或索引是由方括号完成的：
var arr [10]int
大小是类型的一部分。由于不同的大小是不同的类型，因此不能改变大小。数组array同样是值类型的。
可以像这样声明一个数组：var a [3]int，如果不使用零来初始化它，则用复合声明：a := [3]int{1, 2, 3} 也可以简写为 a := [...]int{1, 2, 3}，Go 会自动统计元素
的个数。

或者：							↓索引 		↓索引
var arrKeyValue = [5]string{3: "Chris", 4: "Ron"}


#### slice:
切片（slice）是对数组一个连续片段的引用（该数组称之为相关数组，通常是匿名的），所以切片是一个引用类型。
和数组不同的是，切片的长度可以在运行时修改。
slice 与 array 接近，但是在新的元素加入的时候可以增加长度。slice 总是指向底层的
一个 array。slice 是一个指向 array 的指针，这是其与 array 不同的地方；slice 是引用
类型，这意味着当赋值某个 slice 到另外一个变量，两个引用会指向同一个 array。
 因为切片是引用，所以它们不需要使用额外的内存并且比使用数组更有效率，所以在 Go 代码中 切片比数组更常用。


声明切片的格式是： var identifier []type（不需要说明长度）。
一个切片在未初始化之前默认为 nil，长度为 0。
切片的初始化格式是：var slice1 []type = arr1[start:end]。
这表示 slice1 是由数组 arr1 从 start 索引到 end-1 索引之间的元素构成的子集

或者通过：
sl := make([]int , 10)
创建了一个保存有 10 个元素的 slice。
给定一个 array 或者其他 slice，一个新 slice 通过 a[I:J] 的方式创建。

函数 append 向 slice s 追加零值或其他 x 值，并且返回追加后的新的、与 s
有相同类型的 slice。如果 s 没有足够的容量存储追加的值，append 分配一
个足够大的、新的 slice 来存放原有 slice 的元素和追加的值。因此，返回
的 slice 可能指向不同的底层 array。

函数 copy 从源 slice src 复制元素到目标 dst，并且返回复制的元素的个
数。源和目标可能重ඏ。元素复制的数量是 len(src) 和 len(dst) 中的最
小值。

#### map:
在 Go 中有 map 类型。map 可以认为是一个用字符串做索引的数组（在其最简单的形式下）。
map[<from type>]<to type>													  ↓索引
留意，当只需要声明一个 map 的时候，使用 make 的形式：monthdays := make(map[string]int)
向 map 增加元素，可以这样做：
monthdays["Undecim"] = 30

检查元素是否存在，可以使用下面的方式：
var value int
var present bool
value, present = monthdays["Jan"] ← 如果存在，present 则有值 true
或者更接近 Go 的方式：
v, ok := monthdays["Jan"] ← “逗号 ok”形式

也可以从 map 中移除元素：
delete(monthdays, "Mar") 

当对 array、slice、string 或者 map 循环遍历的时候，range 会帮助你，每次调用，它
都会返回一个键和对应的值。
可以使用 for 循环构造 map：						
for key, value := range map1 {
    ...
}
第一个返回值 key 是 map 中的 key 值，第二个返回值则是该 key 对应的 value 值；这两个都是仅 for 循环内部可见的局部变量。

如果只想获取 key，你可以这么使用：

for key := range map1 {
    fmt.Printf("key is: %d\n", key)
}

map 默认是无序的，不管是按照 key 还是按照 value 默认都不排序

* * * *

你可能想要定义一个结构体，但是也可以定义一个已经存在的类型的别名.如：type IZ int
这里并不是真正意义上的别名，因为使用这种方法定义之后的类型可以拥有更多的特性，且在类型转换时必须显式转换。
当你在使用某个类型时，你可以给它起另一个名字，例如：type test_int int 然后你就可以在你的代码中使用新的名字（用于简化名称或解决名称冲突）。
实际上，类型别名得到的新类型并非和原类型完全相同，新类型不会拥有原类型所附带的方法.
* * * *
具有相同底层类型的变量之间可以相互转换.
* * * *
如果存在 init 函数的话，则对该函数进行定义（这是一个特殊的函数，每个含有该函数的包都会首先执行这个函数）。
* * * *
### Go 程序的执行（程序启动）顺序如下：

1.按顺序导入所有被 main 包引用的其它包，然后在每个包中执行如下流程：
2.如果该包又导入了其它的包，则从第一步开始递归执行，但是每个包只会被导入一次。
3.然后以相反的顺序在每个包中初始化常量和变量，如果该包含有 init 函数的话，则调用该函数。
4.在完成这一切之后，main 也执行同样的过程，最后调用 main 函数开始执行程序。

* * * *
反斜杠 \ 可以在常量表达式中作为多行的连接符使用。

在每遇到一个新的常量块或单个常量声明时， iota 都会重置为 0（ 简单地讲，每遇到一次 const 关键字，iota 就重置为 0 ）。

变量除了可以在全局声明中初始化，也可以在 init 函数中初始化。这是一类非常特殊的函数，它不能够被人为调用，而是在每个包完成初始化后自动执行，并且执行优先级比 main 函数高。

应该尽可能地使用 float64，因为 math 包中所有有关数学运算的函数都会要求接收这个类型。

在格式化字符串里，%d 用于格式化整数（%x 和 %X 用于格式化 16 进制表示的数字），%g 用于格式化浮点型（%f 输出浮点数，%e 输出科学计数表示法），%0d 用于规定输出定长的整数，其中开头的数字 0 是必须的。

%n.mg 用于表示数字 n 并精确到小数点后 m 位，除了使用 g 之外，还可以使用 e 或者 f，例如：使用格式化字符串 %5.2e 来输出 3.4 的结果为 3.40e+00。

byte 类型是 uint8 的别名，对于只占用 1 个字节的传统 ASCII 编码的字符来说，完全没有问题。例如：var ch byte = 'A'；字符使用单引号括起来。


包 unicode 包含了一些针对测试字符的非常有用的函数（其中 ch 代表字符）：
判断是否为字母：unicode.IsLetter(ch)
判断是否为数字：unicode.IsDigit(ch)
判断是否为空白符号：unicode.IsSpace(ch)

字符串是 UTF-8 字符的一个序列（当字符为 ASCII 码时则占用 1 个字节，其它字符根据需要占用 2-4 个字节）。

字符串的内容（纯字节）可以通过标准索引法来获取，在中括号 [] 内写入索引，索引从 0 开始计数：
字符串 str 的第 1 个字节：str[0]
第 i 个字节：str[i - 1]
最后 1 个字节：str[len(str)-1]
需要注意的是，这种转换方案只对纯 ASCII 码的字符串有效。

字符串拼接符 +；拼接的简写形式 += 也可以用于字符串

Go 中使用 strings 包来完成对字符串的主要操作。

HasPrefix 判断字符串 s 是否以 prefix 开头：
strings.HasPrefix(s, prefix string) bool

HasSuffix 判断字符串 s 是否以 suffix 结尾：
strings.HasSuffix(s, suffix string) bool

Contains 判断字符串 s 是否包含 substr：
strings.Contains(s, substr string) bool

Index 返回字符串 str 在字符串 s 中的索引（str 的第一个字符的索引），-1 表示字符串 s 不包含字符串 str：
strings.Index(s, str string) int

LastIndex 返回字符串 str 在字符串 s 中最后出现位置的索引（str 的第一个字符的索引），-1 表示字符串 s 不包含字符串 str：
strings.LastIndex(s, str string) int

如果 ch 是非 ASCII 编码的字符，建议使用以下函数来对字符进行定位：
strings.IndexRune(s string, ch int) int

Replace 用于将字符串 str 中的前 n 个字符串 old 替换为字符串 new，并返回一个新的字符串，如果 n = -1 则替换所有字符串 old 为字符串 new：
strings.Replace(str, old, new, n) string

Count 用于计算字符串 str 在字符串 s 中出现的非重叠次数：
strings.Count(s, str string) int

Repeat 用于重复 count 次字符串 s 并返回一个新的字符串：
strings.Repeat(s, count int) string

ToLower 将字符串中的 Unicode 字符全部转换为相应的小写字符：
strings.ToLower(s) string

ToUpper 将字符串中的 Unicode 字符全部转换为相应的大写字符：
strings.ToUpper(s) string

可以使用 strings.TrimSpace(s) 来剔除字符串开头和结尾的空白符号；
如果想要剔除指定字符，则可以使用 strings.Trim(s, "cut") 来将开头和结尾的 cut 去除掉。该函数的第二个参数可以包含任何字符。
如果只想剔除开头或者结尾的字符串，则可以使用 TrimLeft 或者 TrimRight 来实现。

strings.Fields(s) 将会利用 1 个或多个空白符号来作为动态长度的分隔符将字符串分割成若干小块，并返回一个 slice，如果字符串只包含空白符号，则返回一个长度为 0 的 slice。

strings.Split(s, sep) 用于自定义分割符号来对指定字符串进行分割，同样返回 slice。
因为这 2 个函数都会返回 slice，所以习惯使用 for-range 循环来对其进行处理。

函数 strings.NewReader(str) 用于生成一个 Reader 并读取字符串中的内容，然后返回指向该 Reader 的指针，从其它类型读取内容的函数还有：
Read() 从 []byte 中读取内容。
ReadByte() 和 ReadRune() 从字符串中读取下一个 byte 或者 rune。

与字符串相关的类型转换都是通过 strconv 包实现的。

针对从数字类型转换到字符串，Go 提供了以下函数：
strconv.Itoa(i int) string 返回数字 i 所表示的字符串类型的十进制数。
strconv.FormatFloat(f float64, fmt byte, prec int, bitSize int) string 将 64 位浮点型的数字转换为字符串，其中 fmt 表示格式（其值可以是 'b'、'e'、'f' 或 'g'），prec 表示精度，bitSize 则使用 32 表示 float32，用 64 表示 float64。

针对从字符串类型转换为数字类型，Go 提供了以下函数：
strconv.Atoi(s string) (i int, err error) 将字符串转换为 int 型。
strconv.ParseFloat(s string, bitSize int) (f float64, err error) 将字符串转换为 float64 型。
利用多返回值的特性，这些函数会返回 2 个值，第 1 个是转换后的结果（如果转换成功），第 2 个是可能出现的错误，因此，我们一般使用以下形式来进行从字符串到其它类型的转换：
val, err = strconv.Atoi(s)

time 包为我们提供了一个数据类型 time.Time（作为值使用）以及显示和测量时间和日期的功能函数。

符号 * 可以放在一个指针前，如*intP，那么它将得到这个指针指向地址上所存储的值；
这被称为反引用（或者内容或者间接引用）操作符；另一种说法是指针转移。
p = &i 		← 获取 i 的地址
*p = 8 		← 修改 i 的值

Go 有指针，但是没有指针运算。你不能用指针变量遍历字符串的各个字节.

内存分配
Go 同样也垃圾收集，也就是说无须担心内存分配和回收。Go 有两个内存分配原语，new 和 make。
用 new 分配内存：
	内建函数 new 本质上说跟其他语言中的同名函数功能一样：new(T) 分配了零值填充
	的 T 类型的内存空间，并且返回其地址，一个 *T 类型的值。

用 make 分配内存：
内建函数 make(T, args) 与 new(T) 有着不同的功能。它只能创建
slice，map 和 channel，并且返回一个有初始值（非零）的 T 类型，而不是 *T。

构造函数与复合声明
f := File{fd, name, nil, 0} ← Create a new File


Go 提供了下面这些条件结构和分支结构：
if-else 结构
switch 结构
select 结构，用于 channel 的选择

可以使用迭代或循环结构来重复执行一次或多次某段代码（任务）：
for (range) 结构

一些如 break 和 continue 这样的关键字可以用于中途改变循环的状态。
此外，你还可以使用 return 来结束某个函数的执行，或使用 goto 和标签来调整程序的执行位置。
Go 完全省略了 if、switch 和 for 结构中条件语句两侧的括号。

Go 语言的函数经常使用两个返回值来表示执行是否成功：返回某个值以及 true 表示成功；返回零值（或 nil）和 false 表示失败。当不使用 true 或 false 的时候，也可以使用一个 error 类型的变量来代替作为第二个返回值：成功执行的话，error 的值为 nil，否则就会包含相应的错误信息。

习惯用法
if err := file.Chmod(0664); err !=nil {
    fmt.Println(err)
    return err
}


相比较 C 和 Java 等其它语言而言，Go 语言中的 switch 结构使用上更加灵活。它接受任意形式的表达式：
switch var1 {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
switch k {
    case 4: fmt.Println("was <= 4"); fallthrough;
}
变量 var1 可以是任何类型，而 val1 和 val2 则可以是同类型的任意值。类型不被局限于常量或整数，但必须是相同的类型；或者最终结果为相同类型的表达式。前花括号 { 必须和 switch 关键字在同一行。

您可以同时测试多个可能符合条件的值，使用逗号分割它们，例如：case val1, val2, val3。

每一个 case 分支都是唯一的，从上至下逐一测试，直到匹配为止。

一旦成功地匹配到每个分支，在执行完相应代码后就会退出整个 switch 代码块，也就是说您不需要特别使用 break 语句来表示结束。

程序也不会自动地去执行下一个分支的代码。如果在执行完每个分支的代码后，还希望继续执行后续分支的代码，可以使用 fallthrough 关键字来达到目的。

switch 语句的第二种形式是不提供任何被判断的值（实际上默认为判断是否为 true），然后在每个 case 分支中进行测试不同的条件。当任一分支的测试结果为 true 时，该分支的代码会被执行。
例如：
switch {
    case i < 0:
        f1()
    case i == 0:
        f2()
    case i > 0:
        f3()
}

switch 语句的第三种形式是包含一个初始化语句：
switch initialization {
    case val1:
        ...
    case val2:
        ...
    default:
        ...
}
这种形式可以非常优雅地进行条件判断：
switch result := calculate(); {
    case result < 0:
        ...
    case result > 0:
        ...
    default:
        // 0
}

1:
for i:=0;i<10;i++{
	//todo here
}
2:
for i<10{
	i++;
	//todo here
}
3:
for{
	//todo here
}

4.for-range 结构
这是 Go 特有的一种的迭代结构,可以迭代任何一个集合,包括数组和 map.
一般形式为：for index, value := range array { }
要注意的是，value 始终为集合中对应索引的值拷贝，因此它一般只具有只读性质，对它所做的任何修改都不会影响到集合中原有的值.

break 与 continue
1个 break 的作用范围为该语句出现后的最内部的结构，它可以被用于任何形式的 for 循环（计数器、条件判断等）。但在 switch 或 select 语句中，break 语句的作用结果是跳过整个代码块，执行后续的代码。
关键字 continue 只能被用于 for 循环中。

标签与 goto
for、switch 或 select 语句都可以配合标签（label）形式的标识符使用，即某一行第一个以冒号（:）结尾的单词.
应当只使用正序的标签（标签位于 goto 语句之后），但注意标签和 goto 语句之间不能出现定义新变量的语句，否则会导致编译失败。



函数

不支持 嵌套(nested),重载(overload)和默认参数(default parameter)。

1 函数可以绑定到特定的类型上。这叫做 接收者。有接收者的函数被称作 method。
Go 里面有三种类型的函数：
普通的带有名字的函数
匿名函数或者lambda函数
方法 Methods

在 Go 语言中，结构体就像是类的一种简化形式，那么面向对象程序员可能会问：类的方法在哪里呢？
在 Go 中有一个概念，它和方法有着同样的名字，并且大体上意思相同：
Go 方法是作用在接收者（receiver）上的一个函数，接收者是某种类型的变量。因此方法是一种特殊类型的函数。

接收者类型可以是（几乎）任何类型，不仅仅是结构体类型：任何类型都可以有方法，甚至可以是函数类型，可以是 int、bool、string 或数组的别名类型。
但是接收者不能是一个接口类型，因为接口是一个抽象定义，但是方法却是具体实现

一个类型加上它的方法等价于面向对象中的一个类。一个重要的区别是：在 Go 中，类型的代码和绑定在它上面的方法的代码可以不放置在一起，
它们可以存在在不同的源文件，唯一的要求是：它们必须是同一个包的。

类型 T（或 *T）上的所有方法的集合叫做类型 T（或 *T）的方法集。

类型和作用在它上面定义的方法必须在同一个包里定义，这就是为什么不能在 int、float 或类似这些的类型上定义方法。

函数和方法的区别：
函数将变量作为参数：Function1(recv)
方法在变量上被调用：recv.Method1()

在接收者是指针时，方法可以改变接收者的值（或状态），
这点函数也可以做到（当参数作为指针传递，即通过引用调用时，函数也可以改变参数的状态）。

当一个匿名类型被内嵌在结构体中时，匿名类型的可见方法也同样被内嵌，这在效果上等同于外层类型 继承 了这些方法：将父类型放在子类型中来实现亚型。
这个机制提供了一种简单的方式来模拟经典面向对象语言中的子类和继承相关的效果，也类似 Ruby 中的混入（mixin）。



函数可以将其他函数调用作为它的参数，只要这个被调用函数的返回值个数、返回值类型和返回值的顺序与调用函数所需求的实参是一致的，例如：

假设 f1 需要 3 个参数 f1(a, b, c int)，同时 f2 返回 3 个参数 f2(a, b int) (int, int, int)，就可以这样调用 f1：f1(f2(a, b))

函数是一等值（first-class value）：它们可以赋值给变量，就像 add := binOp 一样。
这个变量知道自己指向的函数的签名，所以给它赋一个具有不同签名的函数值是不可能的。
函数值（functions value）之间可以相互比较：如果它们引用的是相同的函数或者都是 nil 的话，则认为它们是相同的函数。

空白符用来匹配一些不需要的值，然后丢弃掉.

传递变长参数

如果函数的最后一个参数是采用 ...type 的形式，那么这个函数就可以处理一个变长的参数，这个长度可以为 0，这样的函数称为变参函数。
func myFunc(a, b, arg ...int) {}

关键字 defer 允许我们推迟到函数返回之前（或任意位置执行 return 语句之后）一刻才执行某个语句或函数（为什么要在返回之后才执行这些语句？因为 return 语句同样可以包含一些操作，而不是单纯地返回某个值）。

关键字 defer 的用法类似于面向对象编程语言 Java 和 C# 的 finally 语句块，它一般用于释放某些已分配的资源。

func function1() {
    fmt.Printf("In function1 at the top\n")
    defer function2()
    fmt.Printf("In function1 at the bottom!\n")
}

使用 defer 的语句同样可以接受参数。
当有多个 defer 行为被注册时，它们会以逆序执行（类似栈，即后进先出）

内置函数。

名称				说明
close	    		用于管道通信
len、cap			len用于返回某个类型的长度或数量（字符串、数组、切片、map 和管道）；cap 是容量的意思，用于返回某个类型的最大容量（只能用于切片和 map）
new、make			new和 make 均是用于分配内存：new 用于值类型和用户定义的类型，如自定义结构，make 用户内置引用类型（切片、map 和管道）。它们的用法就像是函数，但是将类型作为参数：new(type)、make(type)。new(T) 分配类型 T 的零值并返回其地址，也就是指向类型 T 的指针（详见第 10.1 节）。它也可以被用于基本类型：v := new(int)。make(T) 返回类型 T 的初始化之后的值，因此它比 new 进行更多的工作（详见第 7.2.3/4 节、第 8.1.1 节和第 14.2.1 节）new() 是一个函数，不要忘记它的括号
copy、append		用于复制和连接切片
panic、recover		两者均用于错误处理机制
print、println		底层打印函数，在部署环境中建议使用 fmt 包
complex、real imag	用于创建和操作复数

函数作为值:
就像其他在 Go 中的其他东西一样，函数也是值而已。它们可以像下面这样赋值给变量：
匿名函数:
func main() {

	a := func() { ← 定义一个匿名函数，并且赋值给 a
	println("Hello")
	} 
	a() ← 调用函数
}

回调
由于函数也是值，所以可以很容易的传递到其他函数里，然后可以作为回调。


将函数作为参数：
func callback(y int, f func(int, int)) {
    f(y, 2) // this becomes Add(1, 2)
}

当我们不希望给函数起名字的时候，可以使用匿名函数，例如：func(x, y int) int { return x + y }。
这样的一个函数不能够独立存在，但可以被赋值于某个变量，即保存函数的地址到变量中，然后通过变量名对函数进行调用。

匿名函数同样被称之为闭包（函数式语言的术语）：它们被允许调用定义在其它环境下的变量。
闭包可使得某个函数捕捉到一些外部状态，例如：函数被创建时的状态。
另一种表示方式为：一个闭包继承了函数所声明时的作用域。
这种状态（作用域内的变量）都被共享到闭包的环境中，因此这些变量可以在闭包中被操作，直到被销毁。

应用闭包：将函数作为返回值。









Go 没有像 Java 那样的异常机制，例如你无法像在 Java 中那样抛出一个异常。作为替
代，它使用了恐慌和恢复（panic-and-recover）机制。一定要记得，这应当作为最后的
手段被使用，你的代码中应当没有，或者很少的令人恐慌的东西。


Panic
是一个内建函数，可以中断原有的控制流程，进入一个令人恐慌的流程中。当函
数 F 调用 panic，函数 F 的执行被中断，并且 F 中的延迟函数会正常执行，然
后 F 返回到调用它的地方。在调用的地方，F 的行为就像调用了 panic。这一过
程继续向上，直到程序崩溃时的所有 goroutine 返回。
恐慌可以直接调用 panic 产生。也可以由运行时错误产生，例如访问越界的数
组。
Recover
是一个内建的函数，可以让进入令人恐慌的流程中的 goroutine 恢复过来。recover
仅在延迟函数中有效。
在正常的执行过程中，调用 recover 会返回 nil 并且没有其他任何效果。如果
当前的 goroutine 陷入恐慌，调用 recover 可以捕获到 panic 的输入值，并且恢
复正常的执行。
func throwsPanic(f func()) (b bool) {

de fer func() {
	i f x := recover() ; x != nil {
		b = true
	}
}()
	f();
	return; 
}

包
像 fmt、os 等这样具有常用功能的内置包在 Go 语言中有 150 个以上，它们被称为标准库，大部分(一些底层的除外)内置于 Go 本身。
archive/tar 和 /zip-compress：压缩(解压缩)文件功能。
fmt-io-bufio-path/filepath-flag:
	fmt: 提供了格式化输入输出功能。
	io: 提供了基本输入输出功能，大多数是围绕系统功能的封装。
	bufio: 缓冲输入输出功能的封装。
	path/filepath: 用来操作在当前系统中的目标文件名路径。
	flag: 对命令行参数的操作。　　
strings-strconv-unicode-regexp-bytes:
	strings: 提供对字符串的操作。
	strconv: 提供将字符串转换为基础类型的功能。
	unicode: 为 unicode 型的字符串提供特殊的功能。
	regexp: 正则表达式功能。
	bytes: 提供对字符型分片的操作。
	intndex/suffixarray: 子字符串快速查询。
math-math/cmath-math/big-math/rand-sort:
	math: 基本的数学函数。
	math/cmath: 对复数的操作。
	math/rand: 伪随机数生成。
	sort: 为数组排序和自定义集合。
	math/big: 大数的实现和计算。 　　
container-/list-ring-heap: 实现对集合的操作。
	list: 双链表。
time-log:
	time: 日期和时间的基本操作。
	log: 记录程序运行时产生的日志,我们将在后面的章节使用它。
	encoding/json-encoding/xml-text/template:
	encoding/json: 读取并解码和写入并编码 JSON 数据。
	encoding/xml:简单的 XML1.0 解析器,有关 JSON 和 XML 的实例请查阅第 12.9/10 章节。
	text/template:生成像 HTML 一样的数据与文本混合的数据驱动模板（参见第 15.7 节）。
net-net/http-html:（参见第 15 章）
	net: 网络数据的基本操作。
	http: 提供了一个可扩展的 HTTP 服务器和基础客户端，解析 HTTP 请求和回复。
	html: HTML5 解析器。
runtime: Go 程序运行时的交互操作，例如垃圾回收和协程创建。
	reflect: 实现通过程序运行时反射，让程序操作任意类型的变量。

目前已经有许多非常好的外部库，如：

MySQL(GoMySQL), PostgreSQL(go-pgsql), MongoDB (mgo, gomongo), CouchDB (couch-go), ODBC (godbcl), Redis (redis.go) and SQLite3 (gosqlite) database drivers
SDL bindings
XML-RPC(go-xmlrpc)
Twitter(twitterstream)
OAuth libraries(GoAuth)


构建。在 $GOPATH 下建立一个目录，复制到这个目录.
% mkdir $GOPATH/src/even
% cp even.go $GOPATH/src/even
% go build
% go install


定义自己的类型
Go 通过类型别名（alias types）和结构体的形式支持用户自定义类型，或者叫定制类型。创建更加复杂的类型需要用到 struct 关键字。

结构体也是值类型，因此可以通过 new 函数来创建。


type NameAge struct{
	name string  //不导出
	age  int     //不导出
}

func main() {
a := new(NameAge)
a.name = "Pete" ; a.age = 42
fmt.Printf("%v\n", a)
}

结构字段
之前已经提到结构中的项目被称为field。
如果省略字段的名字，可以创建匿名字段，例如：
struct {
T1 ← 字段名字是 T1
*T2 ← 字段名字是 T2
P.T3 ← 字段名字是 T3
x, y int ← 字段名字是 x 和 y
}
注意首字母大写的字段可以被导出，也就是说，在其他包中可以进行读写。字段名以小写字母开头是当前包的私有的。

结构体定义：
结构体定义的一般方式如下：

type identifier struct {
    field1 type1
    field2 type2
    ...
}

type T struct {a, b int} 也是合法的语法，它更适用于简单的结构体。
结构体的字段可以是任何类型，甚至是结构体本身，也可以是函数或者接口。可以声明结构体类型的一个变量，然后像下面这样给它的字段赋值：

var s T
s.a = 5
s.b = 8

数组可以看作是一种结构体类型，不过它使用下标而不是具名的字段。

声明 var t T 也会给 t 分配内存，并零值化内存，但是这个时候 t 是类型T。


在 Go 语言中（.）叫 选择器（selector）。无论变量是一个结构体类型还是一个结构体类型指针，都使用同样的 选择器符（selector-notation） 来引用结构体的字段：

type myStruct struct { i int }
var v myStruct    // v是结构体类型变量
var p *myStruct   // p是指向一个结构体类型变量的指针
v.i
p.i

var a = new(T)
a.name = 'ok'

var b = &T{name:'ok'}

带标签的结构体
结构体中的字段除了有名字和类型外，还可以有一个可选的标签（tag）：它是一个附属于字段的字符串，可以是文档或其他的重要标记。
标签的内容不可以在一般的编程中使用，只有包 reflect 能获取它。
type TagType struct { // tags
    field1 bool   "An important answer"
    field2 string "The name of the thing"
    field3 int    "How much there are"
}

匿名字段和内嵌结构体
结构体可以包含一个或多个 匿名（或内嵌）字段，即这些字段没有显式的名字，只有字段的类型是必须的，此时类型就是字段的名字。
匿名字段本身可以是一个结构体类型，即 结构体可以包含内嵌结构体。

可以粗略地将这个和面向对象语言中的继承概念相比较，随后将会看到它被用来模拟类似继承的行为。
Go 语言中的继承是通过内嵌或组合来实现的，所以可以说，在 Go 语言中，相比较于继承，组合更受青睐。

通过类型 outer.int 的名字来获取存储在匿名字段中的数据，
于是可以得出一个结论：在一个结构体中对于每一种数据类型只能有一个匿名字段。




接口
定义结构和结构的方法
type S struct{ i int}
func (p *S) Get() int { return p.i }
func (p *S) Put(v int) { p.i = v }

也可以定义接口类型，仅仅是方法的集合。这里定义了一个有两个方法的接口 I：
type I interface{
Get() int
Put(int)
}

在 switch 之外使用 (type) 是非法的。类型判断不是唯一的运行时得到类型的方法。
为了在运行时得到类型，同样可以使用 “comma, ok” 来判断一个接口类型是否实现了
某个特定接口：
if t, ok := something.(I) ; ok {
// 对于某些实现了接口 I 的
// t 是其所拥有的类型
}

为了在运行时得到类型，同样可以使用 “comma, ok” 来判断一个接口类型是否实现了
某个特定接口：
if t, ok := something.(I) ; ok {
	// 对于某些实现了接口 I 的
	// t 是其所拥有的类型
}

方法就是有接收者的函数.
可以在任意类型上定义方法（除了非本地类型，包括内建类型：int 类型不能有方法）。
然而可以新建一个拥有方法的整数类型。

不能定义新的方法在非本地类型上。

接口定义为一个方法的集合。方法包含实际的代码。换句话说，一个接口就是定义，而方法就是实现。因此，接收者不能定义为接口类型。

《接收者类型必须是 T 或 *T，这里的 T 是类型名。T 叫做接收者基础类型或
简称基础类型。基础类型一定不能使指针或接口类型，并且定义在与方法
相同的包中。》









































































