---
title: java学习笔记
order: 0
tag:
  - harmonyOS
---

## java 生态

### Build 工具

Gradle 用于构建项目

### .jar

.jar 文件是 Java 的归档文件格式，全称为 Java ARchive。它通常用于打包多个 Java 类文件、相关的元数据以及资源（如图像、配置文件）到一个单独的文件中。要查看 .jar 文件的内容，可以使用以下命令：

```sh
jar tf <filename>.jar
```

这会列出 .jar 文件中的所有文件和目录。如果需要提取 .jar 文件的内容，可以使用：

```sh
jar xf <filename>.jar
```
