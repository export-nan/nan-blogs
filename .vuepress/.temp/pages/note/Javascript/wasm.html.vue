<template><div><h1 id="webassembly" tabindex="-1"><a class="header-anchor" href="#webassembly"><span>WebAssembly</span></a></h1>
<h2 id="webassembly-工作原理" tabindex="-1"><a class="header-anchor" href="#webassembly-工作原理"><span>WebAssembly 工作原理</span></a></h2>
<p>WebAssembly 一门低级的类汇编语言，它为诸如 C++ 和 Rust 等拥有低级的内存模型语言提供了可调用js Api 的能力，同时提供了一个可直接执行在底层虚拟机的环境，这使得它可以兼容目前主流的浏览器的同时拥有较高的执行效率。</p>
<p>WebAssembly 提供了两个主要能力</p>
<ul>
<li>wat 为诸如 C++ 和 Rust 等拥有低级的内存模型语言提供了一个编译目标，我们只需要为源语言设计到wat格式的编译器，就可以实现任何语言到 WebAssembly 的映射，wat编译器会将.wat代码编译为.wasm</li>
<li>wasm 为 js 提供了一个可直接执行在底层虚拟机的环境，这使得它可以兼容目前主流的浏览器的同时拥有较高的执行效率。</li>
</ul>
<p>AssemblyScript可以将ts编译为wat格式的代码，然后使用wat编译器将wat代码编译为wasm代码。</p>
<h2 id="webassembly-内存-memory" tabindex="-1"><a class="header-anchor" href="#webassembly-内存-memory"><span>WebAssembly 内存（Memory）</span></a></h2>
<p>WebAssembly 的 内存 是一个线性内存模型，它类似于传统计算机中的堆（Heap），用于存储动态分配的数据。它是通过一块连续的内存区域来表示的，所有的 WebAssembly 程序在运行时都会分配和访问这块内存。</p>
<p>主要特性：<br>
线性内存：WebAssembly 内存是一块线性的内存空间，它不像传统的堆那样被操作系统管理，而是由 WebAssembly 引擎进行管理。程序可以在这块内存上进行读写。</p>
<p>大小可动态调整：WebAssembly 内存的大小是可以动态增长的。你可以通过 memory.grow() 指令来扩展内存，但内存的大小是有限制的，不能无限增长。</p>
<p>不可直接操作堆栈：与传统堆栈（如 C 语言的栈）不同，WebAssembly 的内存没有栈和堆的概念。所有的内存都是线性分配的，因此你需要手动管理内存分配和回收，像在堆上分配内存一样操作。</p>
<p>类似于堆：</p>
<ul>
<li>动态分配：WebAssembly 的内存类似于传统堆内存，用于动态分配数据，比如数组、对象等。</li>
<li>手动管理：需要通过 WebAssembly 提供的 API 或者更高层的语言来管理内存（例如使用 malloc 和 free）。</li>
</ul>
<h2 id="webassembly-表-tables" tabindex="-1"><a class="header-anchor" href="#webassembly-表-tables"><span>WebAssembly 表（Tables）</span></a></h2>
<p>WebAssembly 的 表 是一种数据结构，通常用于存储函数指针或者类似的数据。表在某些情况下可以用来模拟函数指针数组、虚拟表（vtable）等。</p>
<p>主要特性：<br>
函数表：表的最常见用途是存储函数指针（即函数的引用）。例如，在使用 WebAssembly 时，你可以将函数作为元素存储在表中，并通过索引来调用它们。</p>
<p>访问方式：表中的元素可以通过索引进行访问，这类似于访问数组中的元素。表也可以增长，元素的数量可以动态调整。</p>
<p>类似于堆或栈？<br>
类似于函数指针数组：在某种程度上，表可以类比于一种特殊的堆结构（比如存储函数指针的堆）。不过，表通常是用于存储特定类型的元素（如函数指针、对象引用等），而堆是通用的内存分配区域。</p>
<p>不像栈：与栈不同，表没有先进后出的特性，它是通过索引直接访问的，类似于数组</p>
</div></template>


