## VS Code 插件

### 介绍

RTDF 使用统一的 VS Code 插件 [Any TDF for VS Code](https://marketplace.visualstudio.com/items?itemName=any-tdf.any-tdf-vscode-extension)，用于在使用 RTDF 开发时提供组件 API 提示与属性补全。

此插件同时支持 STDF、RTDF、VTDF。打开文件时，插件会从当前文件所在目录向上查找 `package.json`，检测包内是否依赖 `stdf`、`rtdf` 或 `vtdf`，并根据当前文件类型自动启用对应组件库能力。

### 安装

在 VS Code 插件中搜索 `Any TDF for VS Code` 点击安装，或到 VS Code 插件市场安装 [Any TDF for VS Code](https://marketplace.visualstudio.com/items?itemName=any-tdf.any-tdf-vscode-extension)。

如果工作区打开的是仓库子目录也可以正常使用。只要当前 `.tsx` 或 `.jsx` 文件向上能找到包含 `rtdf` 的 `package.json`，插件就会启用 RTDF 提示。

### 功能

光标悬浮于 RTDF 组件名称上时显示。

- 此组件 API。
- 直接打开 RTDF 官网此组件的示例、API、指南、版本。
- 直接打开 RTDF 此组件源码。

![TIP](/assets/vscode/tip.png)

或者

![TIP](/assets/vscode/tip2.png)

在组件开始标签内输入空格或关键字时，会根据当前组件的 API 文档提示属性、事件和子内容。

```tsx
<Button fi
```

以上只是示例，所有 RTDF 组件都会读取对应的 API 文档生成补全项。输入 `fi` 可过滤出 `fill` 等属性，输入 `on` 可过滤出 `onClick` 等事件。

### 配置

默认显示的 API 为简体中文，可到 VS Code 的设置页开启英文 API。

新配置项为 `AnyTDF.English`。旧的 `RTDF.English` 仍会兼容读取，但建议迁移到统一配置。

![SETTING](/assets/vscode/setting.png)
