<div align="center">

# @any-tdf/common

`any-tdf` 组件生态的跨框架共享基础包。

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# 介绍

`@any-tdf/common` 是 `any-tdf` 组件生态的共享基础包，提供跨框架的组件派生状态、类名计算、样式数据、 SVG 图标数据、 Tailwind CSS 主题工具、运行时主题切换、多语言包、类型定义和工具函数。

当前包定位为 `alpha` 版本。 React 、 Svelte 、 Vue 等框架包在对齐共享协议时， API 仍可能调整。

# 安装

```sh
bun add @any-tdf/common@alpha
```

# 使用

```ts
import { resolveButtonClass, zh_CN } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# 模块

- `@any-tdf/common/derived`：组件派生状态和类名计算。
- `@any-tdf/common/svg`：共享 SVG 数据和内置图标库映射。
- `@any-tdf/common/theme`：主题配置、 Tailwind CSS 插件和运行时切换工具。
- `@any-tdf/common/lang`：多语言包。
- `@any-tdf/common/types`：共享 TypeScript 类型。
- `@any-tdf/common/utils`：平台与通用工具函数。

# 开发

```sh
bun install
bun test
bun run build
```

# 发布

`main` 分支的 `package.json` 变化后，工作流会先比较 `version` 字段。只有版本号变化时才会执行测试、构建和发布。当前发布到 npm 的 `alpha` 标签。

# 协议

本项目基于根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 开源。
