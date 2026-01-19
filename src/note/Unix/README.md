---
title: 操作系统常用DOS命令合集
date: 2022-02-13
category:
  - 操作系统
---

# 操作系统常用DOS命令合集

## 文件管理

```sh
# 进入文件夹
$ cd [文件目录]

# 创建文件
$ touch [文件名]

# 创建新目录
$ mkdir [目录名]

# 移除文件 
$ rm [文件路径]

# 删除目录
$ rm -rf [目录路径]

# 移动或更改 文件/目录 名称
$ mv [原目标] [目标位置]

# 复制文件
$ cp [原目标] [目标位置]

# 显示文件内容
$ cat [文件名]

# 显示文件类型
$ file [文件名]

# 提升文件权限
$ chmod +x [文件名]

```

## 创建SSH密钥

用于创建SSH密钥对

```shell
ssh-keygen -t [ras] -C [email]
```

设置为当前用户登陆密钥

```shell
cat ~/.ssh/id_rsa.pub >> ~/.ssh/authorized_keys
```

常见的分布式集群，通常由多台机器构成，为了便于操作管理，通过ssh方式启动集群代理，需要在多个服务器上进行ssh免登录配置。将第一台机器上的authorized_keys复制到第二台机器上。

```shell
scp authorized_keys root@192.168.56.101:~/.ssh
```
