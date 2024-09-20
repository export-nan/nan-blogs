---
title: 方舟字节码
order: 1
tag:
  - harmonyOS
---


## 常用指令

这里只梳理了一些常用的指令，具体指令可以参考官方文档
[方舟字节码基本原理](https://gitee.com/openharmony/docs/blob/master/zh-cn/application-dev/quick-start/arkts-bytecode-fundamentals.md#https://gitee.com/link?target=https%3A%2F%2F262.ecma-international.org%2F12.0%2F%23sec-tonumber)

### 寄存器指令

| 指令 | 用途 | 参数 |
|-----|----|-----|
| mov vA, vB | 将寄存器B中的内容复制到寄存器A中 | A, B：寄存器索引 |
| lda vA | 将寄存器A中的内容存放到acc中 | A：寄存器索引 |
| sta vA | 将acc中的内容存放到寄存器A中 | 默认入参：acc, A：寄存器索引 |
| ldai vA | 将整型字面量A存放到acc中 | A：常量字面量 |
| fldai vA | 将双精度浮点型字面量A存放到acc中 | 默认入参：acc, A：寄存器索引 |
| ldtrue | 将true加载进acc | 默认入参：acc |
| ldfalse | 将false加载进acc | 默认入参：acc |
| ldnull | 将null加载进acc | 默认入参：acc |
| ldundefined | 将undefined加载进acc | 默认入参：acc |
| definefunc RR, @AAAA, +BB | 创建方法A的函数对象，并将其存放到acc中 | R：方舟运行时内部使用的8位保留数字，A：method id，B：方法A的形参数量 |

### 运算操作指令

| 指令 | 用途 | 参数 |
|-----|----|-----|
| add2 R, vA | 计算A + acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| sub2 R, vA | 计算A - acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| mul2 R, vA | 计算A * acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| div2 R, vA | 计算A / acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| mod2 R, vA | 计算A % acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| add2 R, vA | 计算A ** acc（A的acc次方，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| inc RR | 计算acc + 1，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字 |
| dec RR | 计算acc - 1，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字 |
| dec RR | 计算acc - 1，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字 |

### 比较运算指令

| 指令 | 用途 | 参数 |
|-----|----|-----|
| eq R, vA | 计算A == acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| noteq R, vA | 计算A != acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| less R, vA | 计算A < acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| lesseq R, vA | 计算A <= acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| greater R, vA | 计算A > acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| greatereq R, vA | 计算A >= acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| and2 R, vA | 计算A & acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| or2 R, vA | 计算A \| acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| xor2 R, vA | 计算A ^ acc，并将计算结果存放到acc中 | 默认入参：acc：操作数，R：方舟运行时内部使用的8位保留数字，A：操作数 |
| istrue | 计算acc == true，并将计算结果存放到acc中 | 默认入参：acc |
| isfalse | 计算acc == false，并将计算结果存放到acc中 | 默认入参：acc |
| isfalse | 计算acc == false，并将计算结果存放到acc中 | 默认入参：acc |
| isin RR, vAA | 计算A in acc，并将计算结果存放到acc中 | 默认入参：acc：对象，R：方舟运行时内部使用的8位保留数字，A：对象|
| instanceof RR, vAA | 计算A instanceof acc，并将计算结果存放到acc中 | 默认入参：acc：对象，R：方舟运行时内部使用的8位保留数字，A：对象|
| strictnoteq RR, vAA | 计算acc !== A，并将计算结果存放到acc中 | 默认入参：acc：对象，R：方舟运行时内部使用的8位保留数字，A：对象|
| stricteq RR, vAA | 计算acc === A，并将计算结果存放到acc中 | 默认入参：acc：对象，R：方舟运行时内部使用的8位保留数字，A：对象|

### 类型转换

| 指令 | 用途 | 参数 |
|-----|----|-----|
| tonumber R | 以acc作为参数，执行ToNumber，将结果存放到acc中 | 默认入参：acc，R：内部使用的8位保留数字 |
| tonumeric R | 以acc作为参数，执行ToNumeric，将结果存放到acc中 | 默认入参：acc，R：内部使用的8位保留数字 |

### 流程控制指令

| 指令 | 用途 | 参数 |
|-----|----|-----|
| jmp +A | 无条件跳转到分支A | A：有符号的分支偏移量 |
| jeqz +A | 计算acc == 0，如果为真，则跳转到分支A | 默认入参：acc, 值, A：有符号的分支偏移量 |
| jnez +A | 计算acc != 0，如果为真，则跳转到分支A | 默认入参：acc, 值, A：有符号的分支偏移量 |
| callarg1 RR, vAA | 以A作为参数，调用acc中存放的函数对象，并将结果存放到acc中 | 默认入参：acc：函数对象，R：方舟运行时内部使用的8位保留数字，A：参数 |
| callargs2 RR, vAA, vBB | 以A，B作为参数，调用acc中存放的函数对象，并将结果存放到acc中 | 默认入参：acc：函数对象，R：方舟运行时内部使用的8位保留数字，A, B：参数 |

### 词法环境控制

| 指令 | 用途 | 参数 |
|-----|----|-----|
| newlexenvwithname +AA, @BBBB | 使用索引B对应的字面量数组中所存放的词法变量名称，创建一个具有A个槽位的词法环境，将这个词法环境存放到acc中，并进入该词法环境 | A：词法环境中的槽位数量，B：literal id |
| stmodulevar +AA | 将acc中的值存放到槽位号为A的模块变量中 | 默认入参：acc：值, A：槽位号 |
| ldlexvar +A, +B | 将A个层次外的词法环境的B号槽位上的值存放到acc中 | A：词法环境层级，B：槽位号 |
| stlexvar +A, +B | 将acc中的值存放到A个层次外的词法环境的B号槽位上 | A：词法环境层级，B：槽位号 |

## 示例

### 函数声明

:::tip

```ts
function funNAN(a: number, b: number, ......num: number[]){
  ......
}
```

:::

```text
L_ESSlotNumberAnnotation:
  u32 slotNumberIdx { 0x3 }
.function any &library.Index&1.0.0.funNAN(any a0, any a1, any a2, any a3, any a4, any a5) <static> {
  mov v0, a0        ## v0 <-- a0 函数本身（FunctionObject）
  mov v1, a1        ## v1 <-- a1 new.target（NewTarget）
  mov v2, a2        ## v2 <-- a2 this（this）
  mov v3, a3        ## v3 <-- a3 参数1     
  mov v4, a4        ## v3 <-- a3 参数2
  mov v5, a5        ## v5 <-- a5 参数3
  copyrestargs 0x2  ## acc <-- rest 将从索引 2 开始往后的参数的数组副本rest存放到acc中。
  sta v5            ## acc --> v5 将acc中的值存放到v5中，也就是将rest存放到v5中。
  ......
}
```

### 简单的加法运算

:::tip

```ts
function addNAN(a: number, b: number, ): number{
  return a + b
}
```
:::

```text
.function any &library.Index&1.0.0.addAN(any a0, any a1, any a2, any a3, any a4, any a5) <static> {
  ......
  mov v3, a3      ## v3 <-- a3  
  mov v4, a4      ## v4 <-- a4
  lda v3          ## acc <-- v3 
  sta v6          ## acc --> v6        这个时候v6的值是a3的值
  lda v4          ## acc <-- v4        
  add2 0x0, v6    ## acc <-- acc + v6  0X0: 方舟运行时内部使用的8位保留数字
  return          ## return acc       
}
```

### 简单的条件判断

:::tip

```ts
function ifNAN(isTrue: boolean): number{
  if(isTrue){
    return 1000
  }else{
    return 2000
  }
}
```

:::

```text
.function any &library.Index&1.0.0.ifNAN(any a0, any a1, any a2, any a3) <static> {
  ......
  mov v3, a3            ## v3 <-- a3
  lda v3                ## acc <-- v3
  isfalse               ## acc <-- acc == false
  jnez jump_label_0     ## acc != false 跳转到jump_label_0
  ldai 0x3e8            ## acc <-- 1000
  return                ## return acc
  jmp jump_label_1      ## 跳转到jump_label_1
jump_label_0:           
  ldai 0x7d0            ## acc <-- 2000
  return                ## return acc
jump_label_1:
  ldundefined           ## acc <-- undefined
  returnundefined       ## return undefined
}
```

### 简单的循环

:::tip

```ts
function loopNAN(maxNum: number): number{
  let i:number = 0
  while(i>=maxNum){
    i++
  }
  ......
}
```

:::

```text
.function any &library.Index&1.0.0.loopNAN(any a0, any a1, any a2, any a3) <static> {
  ......
  mov v3, a3              ## v3 <-- a3
  ldai 0x0                ## acc <-- 0
  sta v4                  ## acc --> v4
jump_label_1:
  lda v4                  ## acc <-- v4
  sta v6                  ## acc --> v6
  lda v3                  ## acc <-- v3
  lesseq 0x0, v6          ## acc <-- acc <= v6 0x0: 方舟运行时内部使用的8位保留数字
  jeqz jump_label_0       ## acc == false 跳转到jump_label_0
  lda v4                  ## acc <-- v4
  sta v6                  ## acc --> v6
  lda v6                  ## acc <-- v6
  tonumeric 0x1           ## acc <-- tonumeric(acc)  tonumeric:转数值操作，它返回转换为 Number 或 BigInt 的值。0x1: 方舟运行时内部使用的8位保留数字
  sta v6                  ## acc --> v6
  lda v6                  ## acc <-- v6
  inc 0x2                 ## acc <-- acc + 1  0x2: 方舟运行时内部使用的8位保留数字
  sta v4                  ## acc --> v4
  lda v6                  ## acc <-- v6
  jmp jump_label_1        ## 跳转到jump_label_1
jump_label_0:
  ......                     ## 结束循环
}
```

### 方法间的互相调用

:::tip

```ts
function addNAN(a:number,b:number):number{
  return a+b
}

function getNumNAN():number{
  return addNAN(100, 200)
}

```

:::

```text
L_ESSlotNumberAnnotation:
  u32 slotNumberIdx { 0x2 }
.function any &library.Index&1.0.0.addFun(any a0, any a1, any a2, any a3, any a4) <static> {
  ......
  ldlexvar 0x1, 0x0        ## acc <-- lexvar(1, 0) 从 1 个层次外的的词法环境的 0 号槽位上取出值放到acc中
  sta v6                   ## acc --> v6
  ......                 
  lda v6                   ## acc <-- v6
  callargs2 0x0, v7, v8    ## acc <-- call(acc, v7, v8) 调用acc上的方法，传人v7, v8两个参数
  return
}

L_ESSlotNumberAnnotation:
  u32 slotNumberIdx { 0x1 }
.function any &library.Index&1.0.0.addNAN(any a0, any a1, any a2, any a3, any a4) <static> {
  ......
}

L_ESSlotNumberAnnotation:
  u32 slotNumberIdx { 0x2 }
.function any &library.Index&1.0.0.func_main_0(any a0, any a1, any a2) <static> {
  newlexenvwithname 0x1, { 3 [ i32:1, string:"addNAN", i32:0, ]}           ## 创建一个带有一个槽位的词法环境，并进入这个词法环境
  ...... 
  definefunc 0x0, &library.Index&1.0.0.numberNAN:(any,any,any), 0x0        ## acc <-- new funcObj(numberNAN, 0) 创建一个numberNAN的方法对象，形参数量为0
  stmodulevar 0x0                                                          ## acc --> modulevar 0 将acc中的值存放到槽位号为 0 的模块变量中。
  definefunc 0x1, &library.Index&1.0.0.addNAN:(any,any,any,any,any), 0x2   ## acc <-- new funcObj(addNAN, 2) 创建一个addNAN的方法对象，形参数量为2
  sta v3                                                                   ## acc --> v3
  lda v3                                                                   ## acc <-- v3
  stlexvar 0x0, 0x0                                                        ## acc --> lexvar(0, 0) 将acc中的值存放到 0 个层次外的的词法环境的 0 号槽位上
  ......
}

L_ESSlotNumberAnnotation:
  u32 slotNumberIdx { 0x3 }
.function any &library.Index&1.0.0.numberNAN(any a0, any a1, any a2) <static> { 
  newlexenvwithname 0x2, { 5 [ i32:2, string:"4newTarget", i32:0, string:"this", i32:1, ]}  ## 创建一个带有两个槽位的词法环境，并进入这个词法环境
  mov v0, a0                                                                                
  lda a1                                                                                    ## acc <-- a1   new.target（NewTarget）
  stlexvar 0x0, 0x0                                                                         ## acc --> lexvar(0, 0) 将acc中的值存放到 0 个层次外的的词法环境的 0 号槽位上
  lda a2                                                                                    ## acc <-- a2   this
  stlexvar 0x0, 0x1                                                                         ## acc --> lexvar(0, 1) 将acc中的值存放到 0 个层次外的的词法环境的 1 号槽位上
  definefunc 0x0, &library.Index&1.0.0.addFun:(any,any,any,any,any), 0x2                    ## acc <-- new funcObj(addFun, 2) 创建一个addFun的方法对象，形参数量为2
  sta v3                                                                                    ## acc --> v3
  lda v3                                                                                    ## acc <-- v3
  sta v5                                                                                    ## acc --> v5 
  ......
  lda v5                                                                                    ## acc <-- v5
  callargs2 0x1, v6, v7                                                                     ## acc <-- call(acc, v6, v7) 调用acc上的方法，传人v6, v7两个参数
  return                                                                                    ## return acc
}
```
