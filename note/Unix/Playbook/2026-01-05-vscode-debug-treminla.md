---
title: 关于 vscode Javascript debug Treminla 运行调试无法进入调试状态的问题
date: 2026-01-05
category: 
  - 日常记录
---

今天在用 vscode 的 Javascript debug Treminla 调试新项目的时候没办法进入调试状态，我卸载了重装依旧没有办法排除问题
表现为:

对代码

```js
// test.js
const a = 1
debugger
console.log(a)
```

执行

```sh
node ./test.js
```

会直接打印出 `1` 而不会进入调试状态

## 排查

先掉用 `node --inspect-brk ./test.js` 然后打开 chrome 浏览器，输入 `chrome://inspect`，发现调试正常，说明是 vscode 的问题

直接在 vscode 的 Javascript debug Treminla 中运行`node -e  'debugger;console.log('hit');'`, 发现打印出 `hit`，没有进入调试状态，定位为 vscode 的 Javascript debug Treminla 无法连接到 node 的调试端口, 去翻阅 vscode 的 debug 配置文件，发现 其中有提到它是通过在环境变量中将NODE_OPTIONS指向一个vscode的调试脚本，然后通过这个脚本实现了调试功能，但是这个脚本似乎有问题，导致无法连接到 node 的调试端口

先看看现在的环境是怎么样的

```sh
$ env | grep NODE 
> NODE_OPTIONS= --require "/Users/nan/Library/Application Support/Code/User/workspaceStorage/74f21fa01b970c11113dd6ef2de0c1ea/ms-vscode.js-debug/bootloader.js"  --require "/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/ms-vscode.js-debug/src/bootloader.js"  --inspect-publish-uid=http
VSCODE_GIT_ASKPASS_NODE=/Applications/Visual Studio Code.app/Contents/Frameworks/Code Helper (Plugin).app/Contents/MacOS/Code Helper (Plugin)
```

这里可以看到，NODE_OPTIONS指向了两个文件，前面这个很明显是一个跟随项目的缓存文件，由于我不同的项目之间有点可以调试，有的不可以调试，于是将可调试的项目对于的这个文件内容覆盖到不可调试的项目文件上，然后重启 vscode，发现可以调试了，确定为这个文件损坏导致的

于是我清空所有的文件

```sh
rm -rf "/Users/nan/Library/Application Support/Code/User/workspaceStorage/"
```
