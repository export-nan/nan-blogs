# 智能指针

## RefCell的工作原理

我们知道RefCell是一个运行时检查的借用检查器，它可以在运行时检查是否违反了借用规则。

我们先来看一下rust源码中RefCell的定义

```rs
pub struct RefCell<T: ?Sized> {
  value: UnsafeCell<T>,
  borrow: Cell<usize>,
}
```

看上去很奇怪是不是？它只有一个borrow计数器，那么它是如何维护记录 borrow_mut 状态的？
实践出真理，直接上代码用 LLDB debug 看看

```rs
fn main() {
    let v = [5, 6, 7];
    let RI = RefCell::new(v);
    println!("p1");
    {
        let RII = RI.borrow();
        println!("p2");
    }
    println!("p3");
    {
        let RII = RI.borrow_mut();
        println!("p4");
    }
    println!("p5");
}
```

我们在println的地方打上断点，看看borrow计数器是如何变化的。

```sh
$ p &RI 
(core::cell::RefCell<alloc::vec::Vec<int, alloc::alloc::Global> > *) 0x000000016fdfd430
## p1
$ memory read &RI
0x16fdfd440: 00 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00  
0x16fdfd450: 00 41 e0 4b 01 00 00 00 03 00 00 00 00 00 00 00  
## p2
$ memory read &RI
0x16fdfd440: 01 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00  
0x16fdfd450: 00 41 e0 4b 01 00 00 00 03 00 00 00 00 00 00 00  
## p3
$ memory read &RI
0x16fdfd440: 00 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00  
0x16fdfd450: 00 41 e0 4b 01 00 00 00 03 00 00 00 00 00 00 00  
## p4
$ memory read &RI
0x16fdfd440: ff ff ff ff ff ff ff ff 03 00 00 00 00 00 00 00  
0x16fdfd450: 00 41 e0 4b 01 00 00 00 03 00 00 00 00 00 00 00  
## p5
$memory read &RI
0x16fdfd440: 00 00 00 00 00 00 00 00 03 00 00 00 00 00 00 00  
0x16fdfd450: 00 41 e0 4b 01 00 00 00 03 00 00 00 00 00 00 00  
```

很明显 0x16fdfd448 开始后面是一个数组的的胖指针结构，长度为3，指向0x000000014be04100
前面的 8 字节就是 borrow 计数器，初始值为0，每次borrow时加1，离开作用阈时减1。
比较有趣的是，在 borrow_mut 时，borrow 计数器的值变成了`ff ff ff ff ff ff ff ff`。

:::tip
在内存上的数据存储分为大端序和小端序，这里的指针和borrow计数器都是小端序存储的。简单的理解就是将数据反过来储存，既 int(0x0000000000000003) 存储为 03 00 00 00 00 00 00 00
:::

我们来根据源码看一下rust是如何实现这里的

```rs
const UNUSED: BorrowCounter = 0;
...
impl<'b> BorrowRefMut<'b> {
    #[inline]
    const fn new(borrow: &'b Cell<BorrowCounter>) -> Option<BorrowRefMut<'b>> {
        ...
        // 检查borrow计数器是否为0，即是否没有borrow
        match borrow.get() {
            // 如果borrow计数器为0，说明没有borrow，我们可以borrow_mut
            UNUSED => {
                // 我们将borrow计数器减1，变成-1, 
                // 由于usize是2的补码表示，所以-1就是`ff ff ff ff ff ff ff ff`                
                borrow.replace(UNUSED - 1);
                Some(BorrowRefMut { borrow })
            }
            _ => None,
        }
    }
...
```

这里我们可以理解在borrow_mut时，它会先去检查borrow计数器是否为0，即是否没有borrow。如果没有borrow，我们就可以borrow_mut，否则就不能borrow_mut。对与borrow的实现也是类似的。

那么计数器是如何还原的呢？
答案是：Drop特征，rust为BorrowRefMut实现了Drop特征在离开作用域时，会自动调用drop方法，将borrow计数器加1。

```rs
#[rustc_const_unstable(feature = "const_ref_cell", issue = "137844")]
impl const Drop for BorrowRefMut<'_> {
    #[inline]
    fn drop(&mut self) {
        let borrow = self.borrow.get();
        debug_assert!(is_writing(borrow));
        self.borrow.replace(borrow + 1);
    }
}
```

关于drop方法的调用时机，我们可以参考[rust的官方文档](https://doc.rust-lang.org/reference/destructors.html)  
这里的rust源码摘抄自[github的rust官方源码： https://github.com/rust-lang/rust/blob/master/library/core/src/cell.rs的](https://github.com/rust-lang/rust/blob/master/library/core/src/cell.rs)

:::tip
理解原理之后我们可以在debug的时候，通过内存上borrow计数器的值改为0，来扰开borrow_mut的限制。虽然貌似没什么用
:::

## Deref

Deref 可以让智能指针像引用那样工作，这样你就可以写出同时支持智能指针和引用的代码，例如 *T
