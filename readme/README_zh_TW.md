<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

一套設計系統，三套框架原生實作。

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## 專案介紹

Any TDF 是面向 Svelte、React 和 Vue 的行動端 Web 元件家族。STDF、RTDF 和 VTDF 共用元件契約、主題、多語言資料、文件與設計原則，同時保留各框架原生的渲染、事件、插槽和組合方式。

## 產品

| 元件庫 | 框架   | npm 套件                                     | 文件與 Demo                  |
| ------ | ------ | -------------------------------------------- | ---------------------------- |
| STDF   | Svelte | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF   | React  | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF   | Vue    | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## 特色

- 60 個保持一致的行動端元件，並提供框架原生 API。
- STDF、RTDF 和 VTDF 均基於 Tailwind CSS，支援深色模式、執行時主題切換和自訂主題。
- 內建 60 多種語言套件，並提供中英文元件文件。
- TypeScript 優先，支援 SSR、按需匯入和共用的無障礙行為。
- 提供統一鷹架、離線 AI Skill 和元件 API VS Code 擴充功能。
- 透過共用契約和視覺檢查防止 STDF、RTDF 與 VTDF 產生功能漂移。

## 安裝

依照專案框架選擇對應實作：

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

主題設定、匯入方式、元件說明和遷移指南請查看對應官網。

## 鷹架

建立任一支援框架的 TypeScript 專案：

```sh
bun create any-tdf@latest
```

`create-any-tdf` 提供 Vite 和 SvelteKit 模板，可選擇 Tailwind CSS 或 UnoCSS，並支援圖示庫與主題設定。

## Demo 與官網

- [STDF 文件與行動端 Demo](https://stdf.dev)
- [RTDF 文件與行動端 Demo](https://rtdf.dev)
- [VTDF 文件與行動端 Demo](https://vtdf.dev)

## Monorepo 開發

倉庫使用 Bun Workspaces、Turborepo、Changesets 和唯一根鎖定檔。相依套件只能從倉庫根目錄安裝。

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

啟動 Any TDF 綜合站，或同時啟動某一框架的官網和 Demo：

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

開發環境需要 Bun 1.3.14 或更高版本，以及 Node.js 24 或更高版本。

## 倉庫結構

- `apps`：文件官網、元件 Demo 和站點共用程式碼。
- `packages`：公共核心、框架元件庫、Motion、Confetti 及其套件內文件、AI Skill 和 `create-any-tdf`。
- `content`：產生後的 STDF、RTDF、VTDF 元件及指南內容。
- `extensions`：Any TDF VS Code 擴充功能。
- `scripts`：全倉產生、驗證、打包和發布工具。

## 回饋

請使用 [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) 提交缺陷和功能建議，使用 [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) 交流問題與想法。

## 貢獻者

完整名單請查看 [貢獻者圖譜](https://github.com/any-tdf/any-tdf/graphs/contributors)。歡迎參與元件、文件、工具、測試和翻譯。

## 贊助者

感謝 [sbscan](https://github.com/sbscan)、[MuGuiLin](https://github.com/MuGuiLin) 和 [yuedanlabs](https://github.com/yuedanlabs) 對專案的支持。

## 開源協議

Any TDF 基於 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 開源。

## Star 歷史

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
