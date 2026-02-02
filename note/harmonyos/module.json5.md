---
title: 工程配置
order: 1
tag:
  - harmonyOS
---

## module.json5 模块配置

用来配置模块当前模块的信息，包括模块名称、类型、描述、设备类型、入口、模块能力等。

```json5
{
  "module": {
    "name": "entry", //模块名称
    "type": "entry", //模块类型
    "description": "$string:module_desc", // 模块描述
    "mainElement": "EntryAbility", 
    "deviceTypes": [ // 可用设备类型
      "phone",
      "tablet",
      "2in1"
    ],
    "deliveryWithInstall": true, 
    "installationFree": false,
    "pages": "$profile:main_pages", // 主页面
    "abilities": [ // 模块能力
      {
        "name": "EntryAbility", // 模块名称
        "srcEntry": "./ets/Content/EntryAbility.ets", // 模块入口
        "description": "$string:EntryAbility_desc", // 模块描述
        "icon": "$media:layered_image", // 模块图标
        "label": "$string:EntryAbility_label", // 模块标签
        "startWindowIcon": "$media:startIcon", // 启动图标
        "startWindowBackground": "$color:start_window_background", // 启动背景
        "exported": true,
        "skills": [
          {
            "entities": [
              "entity.system.home"
            ],
            "actions": [
              "action.system.home"
            ]
          }
        ]
      }
    ],
    "extensionAbilities": [ // 扩展能力
      {
        "name": "EntryBackupAbility", // 模块名称
        "srcEntry": "./ets/Content/EntryBackupAbility.ets", // 模块入口
        "type": "backup", // 模块类型 
        "exported": false, // 是否导出
        "metadata": [ // 模块元数据
          {
            "name": "ohos.extension.backup",
            "resource": "$profile:backup_config"
          }
        ]
      },
      {
        "description": "inputMethod", // 模块描述
        "icon": "$media:foreground", // 模块图标
        "name": "InputMethodExtAbility", // 模块名称
        "srcEntry": "./ets/InputMethodExtensionAbility/InputMethodService.ts", // 模块入口
        "type": "inputMethod", // 模块类型 输入法模块
        "exported": false // 是否导出
      }
    ]
  }
}
```
