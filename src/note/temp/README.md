# 智谷后台管理项目

## B端管理部分
面向商家的管理系统部分，基于Ant Design Pro的B端管理系统

### 技术栈
vue3: [https://vuejs.org/](https://vuejs.org/)  
Ant Design Pro: [https://pro.antdv.com/docs/getting-started](https://pro.antdv.com/docs/getting-started)

## 后端部分
基于midway编写的node服务端系统

### 技术栈
Midway: [http://www.midwayjs.org/](http://www.midwayjs.org/) 
数据库: mysql

### 快速开始

#### 环境配置
1. 安装node, 版本大于`14V`:
  [https://nodejs.org/en/](https://nodejs.org/en/)

2. 安装pnpm:
  [https://pnpm.io/zh/installation](https://pnpm.io/zh/installation)

3. 安装docker,(可选，主要用于搭建数据库环境):
  [https://www.docker.com/](https://www.docker.com/)

### 快速开始
1. 启动数据库（如果使用docker可以直接运行项目下develop中的docker-compose.yaml)
```shell
$ docker compose -f "develop/docker-compose.yaml" up -d --build 
```
2. 安装依赖包
```shell
pnpm --filter service install
```
3. 运行项目
```shell
pnpm --filter service dev
```





## 项目进度

### 登录：  
- [x] UI 前端页面
  - 登陆表单 (账号，密码)，登陆按钮  
  - 登陆跳转  
  
- [x] WEB 前端登陆状态保持 
  - 内存保持 pinia  
  - 本地保存 
  
- [X] API 后端登陆接口
  - 账号密码校验
  - 第一个用户默认注册
  
- [X] token 令牌发布与验证
  - 登陆token令牌发布
  - authorizatiom校验中间价

### 首页:  
- [ ] UI 首页布局 
  - 左右栏式布局
  - ant Design vue主题

### 游客信息
- [ ] UI 列表页 
  - 筛选，搜索
  - 表格(用户名，手机号, 性别, 生日, 详细信息按钮)

- [ ] API 获取游客列表接口 
  - retrue(用户名，手机号, 性别, 生日)

- [ ] UI 游客详细信息页
  - 用户信息（用户头像，用户名，手机号，性别，生日，收集五彩石进度，神兽进度，打印证书按钮）

- [ ] API 获取游客详细信息接口
  - retrue(用户头像url，用户名，性别，生日，手机号，收集五彩石进度，神兽进度)

- [ ] UI 打印证书弹框
  - 证书(用户头像url，用户名，收集五彩石进度，神兽进度)
  
### 区域管理
- [ ] UI 列表页
  - 添加按钮, 搜索
  - 表格:区域信息(区域ID, 区域名称, 删除区域按钮、修改区域按钮，添加beacon按钮)
  - 二级表格:beacon列表(UUID:32(复制按钮), major:4~5(复制按钮), minor:4~5(复制按钮)，删除beacon按钮)

- [ ] UI 添加区域弹框
  - 表单(区域名称)

- [ ] UI 修改区域弹框 
  - 弹框(区域名称)

- [ ] UI 删除区域弹框 
  - 询问是否确认删除

- [ ] UI 删除beacon弹框 
  - 询问是否确认删除

- [ ] API 区域管理
  - 获取区域信息(可搜)
  - 添加区域
  - 删除区域
  - 修改区域
  - 添加beacon
  - 删除beacon



### 彩石管理
- [ ] UI 列表页
  - 添加
  - 表格(名称, 区域ID, 区域名称, 等待时间长, 修改, 删除)

- [ ] UI 添加彩石弹框
  - 表单(名称, 区域选择(下拉框), 等待时间长)
  - 提交按钮

- [ ] UI 修改彩石弹框
  - 表单(名称, 区域选择(下拉框), 等待时间长)
  - 提交按钮

- [ ] UI 删除彩石弹框
  - 询问是否确认删除

- [ ] API 彩石管理
  - 获取彩石信息列表
  - 添加彩石
  - 修改彩石
  - 删除彩石

### 神兽管理
- [ ] UI 列表页
  - 添加按钮
  - 表格(名称，描述，立绘，模型URL，修改按钮，删除按钮)

- [ ] UI 添加神兽弹框
  - 表单(名称，描述，立绘(上传图片)，模型URL(上传模型))
  - 提交
  
- [ ] UI 修改神兽弹框
  - 表单(名称，描述，立绘(上传图片)，模型URL(上传模型))
  - 提交

- [ ] UI 删除神兽弹框
  - 询问是否确认删除

- [ ] API 神兽管理
  - 获取神兽信息列表
  - 添加神兽
  - 修改神兽
  - 删除神兽

### 场次管理
- [ ]UI 列表页
  - 添加按钮
  - 表格(名称，开始时间，结束时间，参与人数，修改按钮，删除按钮)

- [ ]UI 添加场次弹框
- 表单(名称，开始时间，结束时间)
- 提交

- [ ] UI 修改场次弹框
  - 表单(名称，开始时间，结束时间)
  - 提交

- [ ] UI 删除场次弹框
  - 询问是否确认删除

- [ ] API 场次管理
  - 获取场次信息列表
  - 添加场次
  - 修改场次
  - 删除场次