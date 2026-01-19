# LLDB 常用命令

## 基础启动与信息

```sh
## 启动 LLDB 并加载程序
$ lldb <program>

## 启动程序运行
(lldb) run
(lldb) r

## 带参数运行程序
(lldb) process launch -- <args>

## 退出 LLDB
(lldb) quit
(lldb) q
```

## 断点（Breakpoints）

```sh
## 在函数名处设置断点
(lldb) breakpoint set --name main
(lldb) b main

## 在当前文件第 42 行设置断点
(lldb) b 42
(lldb) b src/main.rs:42

## 查看断点列表
(lldb) breakpoint list
(lldb) br l

## 禁用断点 1
(lldb) breakpoint disable 1
(lldb) br dis 1

## 删除断点 1
(lldb) breakpoint delete 1
(lldb) br del 1

## 删除所有断点
(lldb) br del

## 用正则表达式匹配设置断点
(lldb) breakpoint set -r "func.*name" 

## 条件断点
(lldb) breakpoint set --condition "i == 5"
```

## 程序执行控制

```sh
## 启动运行
(lldb) run 
(lldb) r

## 继续执行
(lldb) continue
(lldb) c

## 执行下一行（不进入函数）
(lldb) next 
(lldb) n

## 单步执行（进入函数）
(lldb) step
(lldb) s

## 执行到当前函数返回
(lldb) finish
(lldb) f

## 跳出当前函数
(lldb) thread step-out

## 杀掉当前进程
(lldb) process kill
```

## 状态与堆栈查看

```sh
## 查看线程状态
(lldb) thread list
(lldb) tl

## 切换到指定线程
(lldb) thread select <id>
(lldb) ts <id>

## 查看当前栈帧信息
(lldb) frame info
(lldb) fi

## 打印调用栈
(lldb) bt
(lldb) thread backtrace

## 切换到上/下一个栈帧
(lldb) up
(lldb) down

## 显示当前作用域变量
(lldb) frame variable
(lldb) fr v

## 查看指定变量值
(lldb) fr v <name>
```

## 表达式与内存查看

```sh
## 求值并打印表达式（例如 p a + 3）
(lldb) expr <expr>
(lldb) p <expr>

## 修改变量值
(lldb) expr var = 42

## 读取内存
(lldb) memory read <address>
(lldb) mem read <address>

## 写入内存
(lldb) memory write <address> <value>
(lldb) mem write <address> <value>

## 反汇编当前函数
(lldb) disassemble
(lldb) disas

## 查看所有寄存器
(lldb) register read
(lldb) reg read

## 查看寄存器 x0 的值
(lldb) register read x0
(lldb) reg read x0

## 修改寄存器值
(lldb) register write x0 0x1234
(lldb) reg write x0 0x1234
```

## 源码与位置查看

```sh
## 显示源码附近行
(lldb) list
(lldb) l

## 查看特定文件的代码
(lldb) list <file>:<line>

## 查看加载的模块（类似 info sharedlibrary）
(lldb) image list

## 查找符号信息
(lldb) image lookup -s <symbol>

## 地址反查函数名和文件行号
(lldb) image lookup -v --address <addr>
```
