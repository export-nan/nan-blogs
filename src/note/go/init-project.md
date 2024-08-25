---
title: 初始化项目
order: -2
category:
  - GO
---

## 初始化项目

新建一个文件夹作为`项目根目录`，进入该文件夹，执行以下命令

```shell
go mod init test
```

在这里我们将当前`项目的名称`定为test,
上面的代码会在当前文件夹下生成一个 go.mod 文件，该文件用于管理项目依赖。

``` FileTree
./
└── go.mod
```

在go.mod 文件中，我们能看到以下内容：

``` go
module test // 指定当前项目的名称

go 1.20 // 指定当前项目的 Go 版本
```

## 创建一个包

在Go中我们通常用`文件`或`文件目录`来表示一个包，比如我们在`项目根目录`下新建一个命名为`calculator的目录`，我们可以将当前这个`目录`看做为一个包，及我们建立了一个包名为calculator的包

``` FileTree
./
├── calculator (d) // calculator包
└── go.mod
```

在Go包中我们可能有很多具体功能的`模块`, 我们可以用`文件`来表示他们，在`calculator目录`下新建一个文件，命名为`logic.go`的文件，及我们在`calculator`包下新建了一个名为`logic`的模块

``` FileTree
./
├── calculator (d) // calculator包
│   └── logic.go
└── go.mod
```

在`logic.go`文件中，我们写入以下内容：

``` go
package calculator // 表示当前模块属于calculator包

/*
  1. func -> 声明函数（function）的关键字
  2. Add -> 函数名, 在Go语言中需要被公共调用的方法需要大驼峰命名，可以理解为 public Add
  3. 类型定义 -> Go语言中类型定义放在变量后面
  4. (a, b int) -> 函数的参数列表，多个参数之间用逗号隔开， 在调用时需要按照顺序传入
  5. int -> 函数的返回值类型，Go语言中函数只能有一个返回值，多个返回值需要用括号包裹起来
*/

func Add(a int, b int) int {
  return a + b
}
```

## 程序的入口

在Go中，我们通常用`main`包来作为程序的入口，在`项目根目录`下新建一个文件夹，命名为`main.go`的文件

``` FileTree
./
├── calculator (d) // calculator包
│   └── logic.go
├── main.g // main包
└── go.mod
```

在main.go文件中，我们写入以下内容：

``` go
package main // 表示当前模块属于main包

import (
  "fmt"
  "test/calculator" // 导入我们刚刚创建的包 <项目名>/<包名>
)

/*
* 1、main函数是程序的入口, 会在程序启动时自动被调用
* 2、只有在main包中才能使用main函数
* 3、一个文件中只允许有一个main函数
* 4、一个目录下不推荐多个main方法
*/ 
func main() {
  fmt.Println("Hello World")
  var result = calculator.Add(1, 2)
  fmt.Println(result)
}

```

## 包的概念

在Go中，包（Package）是组织代码的基本单位，它将相关的代码组织在一起，方便管理和复用。包可以包含多个文件，每个文件可以定义多个函数、类型、变量等。包还可以包含一个`init`函数，该函数会在包被导入时自动执行。

```go

package calculator // 表示当前模块属于calculator包

import "fmt"

func init(a int, b int) int { // init函数会在包被导入时自动执行
  fmt.Println("init")
}
```

在Go中，包的命名通常使用小写字母，并且不包含下划线或大写字母。包的名称应该简洁明了，能够描述包的功能或用途。例如，`fmt`包提供了格式化输入输出的功能，`net/http`包提供了HTTP客户端和服务器功能。

在相同的包之间互相引用方法，可以直接, 如在`calculator`包中我们新jian建一个`words.go`模块，并使用`logic.go`模块中的`Add`方法

``` FileTree
  ./
  ├── calculator (d) // calculator包
  │   ├── logic.go
  │   └── words.go
  ├── main.g // main包
  └── go.mod
```

在`words.go`文件中，我们需要使用`logic.go`模块中的`Add`方法时，我们可以直接使用，无需引用

``` go
package calculator // 表示当前模块属于calculator包

import "fmt"

func PrintWords() {
  var resoult = Add(1, 2) // 因为他们所属同一个包，所以可以直接使用，无需引用
  fmt.Println(resoult)
}
```

在不同的包之间互相引用方法，需要使用`包名.方法名`的方式，如我们在`main.go`模块中引用`calculator`包中的`Add`方法

``` go
package main // 表示当前模块属于main包

import (
  "fmt"
  "test/calculator" // 导入我们刚刚创建的包 <项目名>/<包名>
)

func main() {
  fmt.Println("Hello World")
  var result = calculator.Add(1, 2) // <包名>/<公开的方法名>
  fmt.Println(result)
}
```
