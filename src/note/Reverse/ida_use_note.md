# IDA使用笔记

## 调试错误

- Please run IDA with elevated permissions for local debugging. Another solution is to run mac_server and use localhost as the remote computer name.

这个错误是因为IDA在本地调试时需要 elevated permissions（ elevated permissions 是指管理员权限），但是IDA在本地调试时默认是没有 elevated permissions 的，所以会报错。
解决办法有两种：

1. 运行IDA时使用 elevated permissions
2. 使用MacOS/dbgsrv/mac_server_arm，将hostname名设置为localhost