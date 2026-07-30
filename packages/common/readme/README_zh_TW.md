<div align="center">

# @any-tdf/common

`any-tdf` 元件生態的跨框架共享基礎包。

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# 介紹

`@any-tdf/common` 是 `any-tdf` 元件生態的共享基礎包，提供跨框架的元件派生狀態、類名計算、樣式資料、 SVG 圖示資料、 Tailwind CSS v4 主題工具、執行期主題切換、多語言包、型別定義與工具函式。

目前套件定位為 `alpha` 版本。 React 、 Svelte 、 Vue 等框架包在對齊共享協議時， API 仍可能調整。

# 安裝

```sh
bun add @any-tdf/common@alpha
```

# 使用

```ts
import { resolveButtonClass, zh_TW } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# 模組

- `@any-tdf/common/derived`：元件派生狀態與類名計算。
- `@any-tdf/common/svg`：共享 SVG 資料與內建圖示庫映射。
- `@any-tdf/common/theme`：主題設定、 Tailwind CSS v4 插件與執行期切換工具。
- `@any-tdf/common/lang`：多語言包。
- `@any-tdf/common/types`：共享 TypeScript 型別。
- `@any-tdf/common/utils`：平台與通用工具函式。

# 開發

```sh
bun install
bun test
bun run build
```

# 發布

`main` 分支的 `package.json` 變更後，工作流會先比較 `version` 欄位。只有版本號變更時才會執行測試、建置與發布。目前發布到 npm 的 `alpha` 標籤。

# 協議

本專案基於根目錄的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 開源。
