# Any TDF for VS Code

[English](https://github.com/any-tdf/any-tdf/blob/main/extensions/vscode-extension/README.md)

为 STDF、RTDF、VTDF 组件提供悬浮提示和代码补全。

## 支持功能

- 从当前文件向上查找最近的 `package.json`，仅在声明 `stdf`、`rtdf` 或 `vtdf` 依赖时启用对应组件库。
- 悬浮组件时展示内置 API 文档、当前版本、最新版本、示例、指南和源码链接。
- 按框架语法补全组件属性、事件、子内容、Snippet 和 Vue 插槽。
- 通过 `AnyTDF.English` 设置切换中文或英文 API 文档。
- 覆盖 `CellGroup`、`CheckboxItem`、`Grid`、`RadioItem`、`Tab`、`TabContent` 和各组件库实际导出的 `Avatars` 等子组件。

## 语言支持

语言服务不属于本工程，本扩展不会内置相关代码。扩展清单仅声明以下官方扩展依赖，由 VS Code 负责安装和管理：

- STDF：[Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- VTDF：[Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

RTDF 使用 VS Code 内置的 JavaScript 和 TypeScript 语言支持。

## 启用条件

扩展仅在当前 Svelte、JSX、TSX 或 Vue 文件属于对应 TDF 组件库的依赖包时启用。扩展会向上查找最近的匹配 `package.json`，因此支持 Monorepo 和嵌套包结构。

## 配置

将 `AnyTDF.English` 设置为 `true` 后，内置 API 文档将使用英文。默认使用简体中文。

从 STDF for VS Code 升级的用户仍可继续使用旧配置 `STDF.English`。如果同时明确配置两个选项，将优先使用 `AnyTDF.English`。

## 从 STDF for VS Code 升级

Any TDF for VS Code 继续使用 Marketplace ID [`STDF.stdf-vscode-extension`](https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension)。原有用户会通过正常插件更新获得统一的 STDF、RTDF、VTDF 支持。

## 隐私

本扩展不收集遥测数据。扩展仅会读取离当前文件最近的工作区 `package.json`，以识别当前 TDF 组件库，并访问公开的 npm Registry 元数据接口以展示最新版本。

## 开源协议

Any TDF for VS Code 基于根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 发布。
