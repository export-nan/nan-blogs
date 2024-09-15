---
title: GO的基本命令
order: 2
category:
  - GO
---

## 常用命令

- 编译并生成可执行文件

```shell
  go build main.go
```

- 编译为（二进制）并运行

```shell
  go run main.go
```

- 管理依赖

```shell
  go mod init <project name> # 初始化项目: 创建go.mod文件 (包管理工具)
  go mod tidy # 整理依赖: 添加缺失的模块并删除无用的模块
  go mod download # 下载依赖包到本地
  go mod verify # 验证依赖是否正确
```

- 下载并安装依赖依赖

```shell
  go get -u github.com/gin-gonic/gin # 下载依赖
  go get -u github.com/gin-gonic/gin@v1.7.4 # 下载指定版本的依赖
```

- 编译与安装包

```shell
  go install github.com/gin-gonic/gin # 编译并安装包
```

- 删除源码包和管理源码包里编译生成的文件

```shell
  go clean -modcache # 删除源码包
  go clean -i # 删除管理源码包里编译生成的文件
```

- 查看 go 的环境变量

```shell
  go env
```

- 格式化代码

```shell
  go fmt main.go
```

- 查看Go的当前版本

```shell
  go version
```

- 查看Go工具

```shell
  go tool
```

- 查看包的文档

```shell
  go doc fmt
```
