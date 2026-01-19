<template><div><p>Header（文件头）
作用：提供文件的元数据，供内核快速校验文件格式和运行环境。
关键字段：
magic：标识文件类型（32位为 0xfeedface，64位为 0xfeedfacf）110。
cputype/cpusubtype：指定CPU架构（如ARM/x86、arm64/armv7）510。
filetype：文件类型（可执行文件MH_EXECUTE、动态库MH_DYLIB等）58。
ncmds/sizeofcmds：Load Commands的数量和总大小810。
flags：动态链接标志（如MH_NOUNDEFS禁止未定义符号）19。
意义：内核通过Header判断文件是否合法，并确定如何解析后续内容。
📜 Load Commands（加载命令）
作用：描述Data区域的布局、依赖库、入口地址等关键加载信息，指导内核和动态链接器工作310。
核心命令类型：
LC_SEGMENT_64：定义段（如__TEXT、__DATA）的内存映射（虚拟地址、文件偏移、权限）78。
LC_LOAD_DYLIB：声明依赖的动态库（如Foundation.framework）910。
LC_SYMTAB：定位符号表和字符串表（用于函数/变量名解析）39。
LC_MAIN：指定程序入口（如main函数地址）9。
意义：充当“蓝图”，告诉系统如何将文件数据加载到内存并初始化执行环境。
💾 Data（数据区）
作用：存储实际代码、数据及元信息，按Load Commands的描述映射到内存310。
核心段与节（Section）：
__TEXT段：只读代码段
__text：函数二进制代码。
__cstring：常量字符串13。
__DATA段：可读写数据段
__data：初始化的全局变量。
__objc_classlist：Objective-C类列表19。
__LINKEDIT段：链接信息
符号表、重定位信息、代码签名等310。
意义：程序运行的实体内容，包含所有可执行指令和运行时所需数据。</p>
</div></template>


