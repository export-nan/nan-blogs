---
title: Ability 能力模块
order: 2
tag:
  - harmonyOS
---

## UIAbility UI组件

- UIAbility组件是系统调度的基本单元，为应用提供绘制界面的窗口。一个应用可以包含一个或多个UIAbility组件
- 每一个UIAbility组件实例都会在最近任务列表中显示一个对应的任务。
- 如果开发者希望在任务视图中看到一个任务，则建议使用一个UIAbility，多个页面的方式。
- 如果开发者希望在任务视图中看到多个任务，或者需要同时开启多个窗口，则建议使用多个UIAbility开发不同的模块功能。

在module.json5配置文件的abilities标签中声明UIAbility的名称、入口、标签等相关信息

```json5
{
  {
    "module": {
      "abilities": [
        {
          "name": "EntryAbility", // UIAbility组件的名称
          "srcEntry": "./ets/entryability/EntryAbility.ets", // UIAbility组件的代码路径
          "description": "$string:EntryAbility_desc", // UIAbility组件的描述信息
          "icon": "$media:icon", // UIAbility组件的图标
          "label": "$string:EntryAbility_label", // UIAbility组件的标签
          "startWindowIcon": "$media:icon", // UIAbility组件启动页面图标资源文件的索引
          "startWindowBackground": "$color:start_window_background", // UIAbility组件启动页面背景颜色资源文件的索引
        }
      ]
    }
  }
}
```

## UIAbility 生命周期

该模块可以控制应用UI组件的生命周期，包括应用的启动、切换至后台/前台、销毁等。在应用切换状态时，系统会调用对于的回调方法

![生命周期与回调函数](./images/harmony-UIAbility-life-cycle.png)

```ts
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit'; // 引入HarmonyOS AbilityKit模块， 用来提供Ability相关能力
import { hilog } from '@kit.PerformanceAnalysisKit'; // 引入HarmonyOS PerformanceAnalysisKit模块， 用来提供日志
import { window } from '@kit.ArkUI'; // 引入ArkUI模块，用来提供UI相关能力

// 定义一个Entry Ability，继承自UIAbility，用来配置应用的生命周期能力
export default class EntryAbility extends UIAbility {
  /**
   * Create状态为在应用加载过程中，UIAbility实例创建完成时触发，系统会调用onCreate()回调。
   * 可以在该回调中进行页面初始化操作，例如变量定义资源加载等，用于后续的UI展示。
   */ 
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void

  /**
   * UIAbility实例创建完成之后，在进入Foreground之前，系统会创建一个WindowStage。
   * WindowStage创建完成后会进入onWindowStageCreate()回调，可以在该回调中设置UI加载、设置WindowStage的事件订阅。
   * 在onWindowStageCreate()回调中通过loadContent()方法设置应用要加载的页面，并根据需要调用on('windowStageEvent')方法订阅WindowStage的事件（获焦/失焦、可见/不可见）。
   */ 
  onWindowStageCreate(windowStage: window.WindowStage): void 

  /**
   * onForeground()回调，在UIAbility的UI可见之前，如UIAbility切换至前台时触发。
   * 可以在onForeground()回调中申请系统需要的资源，或者重新申请在onBackground()中释放的资源。
   */
  onForeground(): void

  /**
   * onBackground()回调，在UIAbility的UI完全不可见之后，如UIAbility切换至后台时候触发。
   * 可以在onBackground()回调中释放UI不可见时无用的资源，或者在此回调中执行较为耗时的操作，例如状态保存等。
   */
  onBackground(): void

  /**
   * 在WindowStage销毁前执行，此时WindowStage可以使用
   */
  onWindowStageDestroy(windowStage: window.WindowStage): void

  /**
   * Destroy状态在UIAbility实例销毁时触发。
   * 可以在onDestroy()回调中进行系统资源的释放、数据的保存等操作。
   */
  onDestroy(): void
}
```

当应用的UIAbility实例已创建，且UIAbility配置为singleton启动模式时，再次调用startAbility()方法启动该UIAbility实例时，只会进入该UIAbility的onNewWant()回调，不会进入其onCreate()和onWindowStageCreate()生命周期回调。应用可以在该回调中更新要加载的资源和数据等，用于后续的UI展示。

## 启动模式

### singleton启动模式

singleton启动模式为单实例模式，也是默认情况下的启动模式。每次调用startAbility()方法时，如果应用进程中该类型的UIAbility实例已经存在，则复用系统中的UIAbility实例。系统中只存在唯一一个该UIAbility实例，即在最近任务列表中只存在一个该类型的UIAbility实例。

配置singleton启动模式时，需要在module.json5文件中配置如下参数：

```json
{
  "module": {
    "abilities": [
      {
        "launchType": "singleton", // 设置为单例模式
      }
    ]
  }
}
```

### multiton启动模式

multiton启动模式为多实例模式，每次调用startAbility()方法时，都会在应用进程中创建一个新的该类型UIAbility实例。即在最近任务列表中可以看到有多个该类型的UIAbility实例。这种情况下可以将UIAbility配置为multiton（多实例模式）。

配置multiton启动模式时，需要在module.json5文件中配置如下参数：

```json
{
  "module": {
    "abilities": [
      {
        "launchType": "multiton", // 设置为多实例模式
      }
    ]
  }
}
```

### specified启动模式

specified启动模式为指定实例模式，针对一些特殊场景使用（例如文档应用中每次新建文档希望都能新建一个文档实例，重复打开一个已保存的文档希望打开的都是同一个文档实例）。

配置specified启动模式时，需要在module.json5文件中配置如下参数：

```json
{
  "module": {
    "abilities": [
      {
        "launchType": "specified", // 设置为指定实例模式
      }
    ]
  }
}
```

## UIAbility的页面加载

UIAbility的页面加载是通过WindowStage的loadContent()方法实现的，loadContent()方法接收两个参数，第一个参数为页面路径，第二个参数为回调函数。

```ts
import { UIAbility } from '@kit.AbilityKit';
import { window } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent('pages/Index', (err, data) => {
      // 可以通过err.code判断页面加载是否成功，通过data获取页面加载的数据
    });
  }
}
```

## UIAbility的上下文信息

该信息为UIAbilityContext类的实例，UIAbilityContext类拥有abilityInfo、currentHapModuleInfo等属性。通过UIAbilityContext可以获取UIAbility的相关配置信息，如包代码路径、Bundle名称、Ability名称和应用程序需要的环境状态等属性信息，以及可以获取操作UIAbility实例的方法（如startAbility()、connectServiceExtensionAbility()、terminateSelf()等）

UIAbility的上下文信息可以通过this.context对象获取

```ts
import { UIAbility, AbilityConstant, Want } from '@kit.AbilityKit';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 获取UIAbility实例的上下文
    let context = this.context;
    // ...
  }
}
```

在页面中可以通过getContext(this)方法获取UIAbility实例的上下文

```ts
import { common } from '@kit.AbilityKit';

@Entry
@Component
struct Page_EventHub {
  private context = getContext(this) as common.UIAbilityContext;
}
```

## UIAbility组件与UI的数据同步

### 使用EventHub进行数据通信

在基类Context中，提供了EventHub对象，可用于在UIAbility组件实例内通信。使用EventHub实现UIAbility与UI之间的数据通信需要先获取EventHub对象

在UIAbility中调用eventHub.on()方法注册一个自定义事件“event1”，eventHub.on()有如下两种调用方式，使用其中一种即可。

```ts
import { UIAbility, Context, Want, AbilityConstant } from '@kit.AbilityKit';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 获取eventHub
    let eventhub = this.context.eventHub;
    // 执行订阅操作
    eventhub.on('event1', (argOne: Context, argTwo: Context):void);
   
  }
}
```

在UI中通过eventHub.emit()方法触发该事件，在触发事件的同时，根据需要传入参数信息。

```ts
import { common } from '@kit.AbilityKit';

@Entry
@Component
struct Page_EventHub {
  private context = getContext(this) as common.UIAbilityContext;

  eventHubFunc(): void {
    // 不带参数触发自定义“event1”事件
    this.context.eventHub.emit('event1');
    // 带1个参数触发自定义“event1”事件
    this.context.eventHub.emit('event1', 1);
    // 带2个参数触发自定义“event1”事件
    this.context.eventHub.emit('event1', 2, 'test');
  }
}
```

在自定义事件“event1”使用完成后，可以根据需要调用eventHub.off()方法取消该事件的订阅。

```ts
import { UIAbility } from '@kit.AbilityKit';

export default class EntryAbility extends UIAbility {
  onDestroy(): void {
    this.context.eventHub.off('event1');
  }
}
```

## 启动应用内的UIAbility

当一个应用内包含多个UIAbility时，如果我们要从EntryAbility的页面中启动FuncAbility时，我们可以在EntryAbility中通过调用context.startAbility()方法启动UIAbility

```ts
import { common, Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Page_UIAbilityComponentsInteractive {
  private context = getContext(this) as common.UIAbilityContext;

  startFuncAbility(): viod{
    // context为Ability对象的成员，在非Ability对象内部调用需要
    // 将Context对象传递过去
    let wantInfo: Want = {
      deviceId: '', // deviceId为空表示本设备
      bundleName: 'com.samples.stagemodelabilitydevelop', // 为待启动应用的Bundle名称
      moduleName: 'entry', // moduleName非必选, 在待启动的UIAbility属于不同的Module时添加
      abilityName: 'FuncAbilityA', // 为待启动的Ability名称
      parameters: { // 自定义信息
        info: '来自EntryAbility Page_UIAbilityComponentsInteractive页面'
      },
    };

    /**
     * context.startAbility() 方法用于启动一个另外一个UIAbility
     * context为调用方UIAbility的UIAbilityContext
     * */ 
    this.context.startAbility(wantInfo).then(() => {
      // 成功时...
    }).catch((error: BusinessError) => {
      // 失败时...
    });
  }
  // ...
}
```

在FuncAbility的onCreate()或者onNewWant()生命周期回调文件中接收EntryAbility传递过来的参数。

```ts
import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';

export default class FuncAbilityA extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    /**
     * 可以通过获取传递过来的want参数的parameters来获取拉起方UIAbility的PID、Bundle Name等信息。
     */ 
    let funcAbilityWant = want;
    let info = funcAbilityWant?.parameters?.info;
  }
}
```

在FuncAbility业务完成之后，如需要停止当前UIAbility实例，在FuncAbility中通过调用terminateSelf()方法实现。

```ts
import { common } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';

@Entry
@Component
struct Page_FromStageModel {
  build() {
    Column() {
      Button('FuncAbilityB')
        .onClick(() => {
          let context: common.UIAbilityContext = getContext(this) as common.UIAbilityContext; // UIAbilityContext
          // context为需要停止的UIAbility实例的AbilityContext
          context.terminateSelf((err) => {
            // 可以通过err.code判断停止是否成功
          });
          /**
           * 调用terminateSelf()方法停止当前UIAbility实例时，会保留该实例的快照（Snapshot），在最近任务列表中仍能查看到该实例任务。
           * 如不需要保留该实例的快照，可以在其对应UIAbility的module.json5配置文件中，将abilities标签的removeMissionAfterTerminate字段配置为true。
          */
        })
    }
  }
}
```

### UIAbility间的数据通信

当希望在被启动的FuncAbility完成相关业务后，能将结果返回时，我们可以在EntryAbility中调用startAbilityForResult()接口启动FuncAbility，异步回调中的data用于接收FuncAbility停止自身后返回给EntryAbility的信息。

```ts
import { common, Want } from '@kit.AbilityKit';
import { BusinessError } from '@kit.BasicServicesKit';

@Entry
@Component
struct Page_UIAbilityComponentsInteractive {
  private context = getContext(this) as common.UIAbilityContext;

  startFuncAbility(): viod{
    // wantI启动的FuncAbility的want信息
    context.startAbilityForResult(want).then((data) => {
      if (data?.resultCode === RESULT_CODE) {
        // 解析被调用方UIAbility返回的信息
        let info = data.want?.parameters?.info;
      }
    }).catch((err: BusinessError) => {
      // 失败时...
    });
  }
  // ...
}
```

在FuncAbility停止自身时，需要调用terminateSelfWithResult()方法，入参abilityResult为FuncAbility需要返回给EntryAbility的信息。

```ts
import { common, Want } from '@kit.AbilityKit';

@Entry
@Component
struct Page_FuncAbilityA {
  private context = getContext(this) as common.UIAbilityContext;

  endFuncAbility(resultCode: string, parameters: Want['parameters']) {
    let abilityResult: common.AbilityResult = {
      resultCode, // ya
      want: {
        deviceId: '', // deviceId为空表示本设备
        bundleName: 'com.samples.stagemodelabilitydevelop',
        moduleName: 'entry', // moduleName非必选
        abilityName: 'FuncAbilityA',
        parameters
      }
    };

    this.context.terminateSelfWithResult(abilityResult, (err) => {
      if (err.code) {
        // 停止自身失败
        return;
      }
    });
    
  }
  
  //...
}
```

### 启动指定的页面

一个UIAbility可以对应多个页面，当在EntryAbility的页面中启动FuncAbility的指定页面时，可以通过want的parameters字段传递页面参数。

```ts
//...
let want: Want = {
  //...
  parameters: { // 自定义参数传递页面信息
    routerName: 'PageA'
  }
};
//...
```

#### 冷启动

当FuncAbility实例处于完全关闭状态下被启动，这需要完整地加载和初始化UIAbility实例的代码、资源等。

在目标UIAbility的onCreate()生命周期回调中，接收调用方传过来的参数。然后在目标UIAbility的onWindowStageCreate()生命周期回调中，解析EntryAbility传递过来的want参数，获取到需要加载的页面信息url，传入windowStage.loadContent()方法。

```ts
import { AbilityConstant, Want, UIAbility } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window, UIContext } from '@kit.ArkUI';

const DOMAIN_NUMBER: number = 0xFF00;
const TAG: string = '[EntryAbility]';

export default class EntryAbility extends UIAbility {
  funcAbilityWant: Want | undefined = undefined;
  uiContext: UIContext | undefined = undefined;

  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    // 接收调用方UIAbility传过来的参数
    this.funcAbilityWant = want;
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    let url = 'pages/Index';
    if (this.funcAbilityWant?.parameters?.router && this.funcAbilityWant.parameters.router === 'PageA') {
      url = 'pages/Page_ColdStartUp';
    }
    windowStage.loadContent(url, (err, data) => {
      // ...
    });
  }
}
```

#### 热启动

当FunUIAbility实例已经启动并在前台运行过，由于某些原因切换到后台，再次启动该UIAbility实例时，可以快速恢复UIAbility实例的状态。这时再次启动不会重新走初始化逻辑，只会直接触发onNewWant()生命周期方法。为了实现跳转到指定页面，需要在onNewWant()中解析参数进行处理。


```ts
import { hilog } from '@kit.PerformanceAnalysisKit';
import { Want, UIAbility } from '@kit.AbilityKit';
import { window, UIContext } from '@kit.ArkUI';

export default class EntryAbility extends UIAbility {
  uiContext: UIContext | undefined = undefined;

  /**
   * 在onWindowStageCreate()生命周期回调中，通过调用getUIContext()接口获取UI上下文实例UIContext对象。 
   */ 
  onWindowStageCreate(windowStage: window.WindowStage): void {
    windowStage.loadContent(url, (err, data) => {
      if (err.code)  return;
      let windowClass: window.Window;
      windowStage.getMainWindow((err, data) => {
        if (err.code) return;
        windowClass = data;
        this.uiContext = windowClass.getUIContext();
      });
    });
  }

  /**
   * 在onNewWant()回调中解析调用方传递过来的want参数。
   * 通过调用UIContext中的getRouter()方法获取Router对象，并进行指定页面的跳转
   */
  onNewWant(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    if (want?.parameters?.router && want.parameters.router === 'funcA') {
      let funcAUrl = 'pages/Page_HotStartUp';
      if (this.uiContext) {
        let router: Router = this.uiContext.getRouter();
        router.pushUrl({
          url: funcAUrl
        }).catch((err: BusinessError) => {
          // 跳转失败
        });
      }
    }
  }
}
```

:::warning
当被调用方UIAbility组件启动模式设置为multiton启动模式时，每次启动都会创建一个新的实例，那么onNewWant()回调就不会被用到。
:::

## ExtensionAbility组件

- ExtensionAbility组件是基于特定场景（例如服务卡片、输入法等）提供的应用组件，以便满足更多的使用场景。
- 所有类型的ExtensionAbility组件均不能被应用直接启动，而是由相应的系统管理服务拉起，以确保其生命周期受系统管控，使用时拉起，使用完销毁。
- ExtensionAbility组件的调用方无需关心目标ExtensionAbility组件的生命周期。
- ExtensionAbility组件派生至系统提供的ExtensionAbility类，通过重写onCreate()/onDestroy()方法实现组件的初始化和销毁逻辑。

如注册一个InputMethodExtensionAbility组件

在module.json5文件中声明InputMethodExtensionAbility组件

```json5
{
  "module": {
    "extensionAbilities": [
      {
        "name": "EntryBackupAbility", // 组件名称
        "srcEntry": "./ets/entrybackupability/EntryBackupAbility.ets", // 组件入口文件
        "type": "backup", // 组件类型
        "exported": false,
        "metadata": [
          {
            "name": "ohos.extension.backup",
            "resource": "$profile:backup_config"
          }
        ],
      }
    ]
  }
}
```

创建一个EntryBackupAbility.ets文件，对InputMethodExtensionAbility进行派生，并实现onCreate()和onDestroy()方法

```ts
import { Want } from '@kit.AbilityKit';
import { InputMethodExtensionAbility } from '@kit.IMEKit';

export default class InputDemoService extends InputMethodExtensionAbility {
  onCreate(want: Want): void {
    // 初始化窗口并注册对输入法框架的事件监听
  }

  onDestroy(): void {
    // 销毁窗口并去注册事件监听
  }
}
```

相关的API参考[ExtensionAbility](https://developer.huawei.com/consumer/cn/doc/harmonyos-guides-V5/extensionability-overview-V5#%E5%AE%9E%E7%8E%B0%E6%8C%87%E5%AE%9A%E7%B1%BB%E5%9E%8B%E7%9A%84extensionability%E7%BB%84%E4%BB%B6)