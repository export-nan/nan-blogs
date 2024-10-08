---
title: 关键字与标识符
order: 4
category:
  - GO
---

## 标识符规范

go语言中的标识符严格区分大小写。标识符中只能使用字母、数字和下划线，并且不能以数字开头。关键字与预定义标识符`不能作为标识符使用。

go语言中常用的标识符的命名规范：
| 场景 | 命名规范 | 示例 |
| --- | --- | --- |
| 项目名 | 全部小写字母，中横线隔开 | hello-world |
| 包名 | 包名与目录名保持一致, 全部小写, 简单明了<br> 不能使用下划线, 不能用`标准库`名称 | calculator |
| 模块名 | 小写蛇形命名法 | user_info.go |
| 常量 | 大写蛇形命名法 | HTTP_PORT |
| 变量/函数/结构体 | 驼峰命名法, 严格区分大小写 | userName/UserName |
| 接口 | 驼峰命名法 + er后缀 | Reader |

在go语言中需要暴露到包外使用的标识符都必须以大写字母开头，不需要暴露的标识符都应以小写字母开头。

## 关键字与预定义标识符

Go 语言中有 25 个关键字
| 关键字 | 作用    | 关键字 | 作用    | 关键字 | 作用    | 关键字 | 作用    | 关键字 | 作用    |
| ----- | ------- | ------ | ------- | ------ | ------- | ------ | ------- | ------ | ------- |
| var | 声明变量 | func   | 声明函数 | const  | 声明常量 | import | 导入包  | package | 声明包  |
| if | 条件语句 | else   | 条件语句 | switch | 条件语句 | case   | 条件语句 | default | 默认条件语句 |
| for | 循环语句 | break  | 循环语句 | continue | 循环语句 | range | 遍历 | defer | 延迟执行 |
| return | 返回值 | type | 声明类型 | struct | 声明结构体 | interface | 声明接口 | map | 声明映射 |
| chan | 声明通道 | goto | 跳转语句 | select | 选择语句 | go | 并发执行 | fallthrough | 跳过本次分支 |

除了以上介绍的这些关键字，Go 语言还有 36 个预定义标识符，其中包含了基本类型的名称和一些基本的内置函数

| 标识符 | 作用 | 标识符 | 作用 | 标识符 | 作用 | 标识符 | 作用 | 标识符 | 作用 | 标识符 | 作用 |
| ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- | ----- | --- |
| append | 向切片追加元素 | bool | 布尔类型 | byte | 无符号8位整数 | cap | 返回切片、映射、通道的容量 | close | 关闭通道 | complex | 复数 |
| complex64 | 64位复杂数 | complex128 | 128位复杂数 | uint16 | 无符号16位整数 | copy | 复制切片或数组 | false | 布尔值(假) | float32 | 32位浮点数 |
| float64 | 64位浮点数 | imag | 返回复数的虚部 | int | 有符号32位整数 | int8 | 有符号8位整数 | int16 | 有符号16位整数 | uint32 | 无符号32位整数 |
| int32 | 有符号32位整数 | int64 | 有符号64位整数 | iota | 常量生成器 | len | 返回切片、字符串、数组的长度 | make | 创建切片、映射或通道 | new | 分配内存并返回指向新分配的零值的指针 |
| nil | 空值 | panic | 引发运行时错误 | uint64 | 无符号64位整数 | print | 打印到标准输出 | println | 打印到标准输出并换行 | real | 返回复数的实部 |
| recover | 从panic中恢复 | string | 字符串 | true | 布尔值真 | uint | 无符号整数（平台相关位数） | uint8 | 无符号8位整数 | uintptr | 无符号整数，用作指针的底层类型 |


