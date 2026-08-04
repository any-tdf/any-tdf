<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

一套设计系统，三套框架原生实现。

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## 项目介绍

Any TDF 是面向 Svelte、React 和 Vue 的移动端 Web 组件家族。STDF、RTDF 和 VTDF 共享组件契约、主题、多语言数据、文档与设计原则，同时保留各个框架原生的渲染、事件、插槽和组合方式。

## 产品

| 组件库 | 框架   | npm 包                                       | 文档与 Demo                  |
| ------ | ------ | -------------------------------------------- | ---------------------------- |
| STDF   | Svelte | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF   | React  | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF   | Vue    | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## 特性

- 60 个保持一致的移动端组件，并提供框架原生 API。
- STDF、RTDF 和 VTDF 均基于 Tailwind CSS，支持暗色模式、运行时主题切换和自定义主题。
- 内置 60 多种语言包，并提供中英文组件文档。
- TypeScript 优先，支持 SSR、按需引入和共享的无障碍行为。
- 提供统一脚手架、离线 AI Skill 和组件 API VS Code 扩展。
- 通过共享契约和视觉检查防止 STDF、RTDF 与 VTDF 产生功能漂移。

## 安装

根据项目框架选择对应实现：

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

主题配置、导入方式、组件说明和迁移指南请查看对应官网。

## 脚手架

创建任意受支持框架的 TypeScript 项目：

```sh
bun create any-tdf@alpha
```

`create-any-tdf` 提供 Vite 和 SvelteKit 模板，可选择 Tailwind CSS 或 UnoCSS，并支持图标库与主题配置。

## Demo 与官网

- [STDF 文档与移动端 Demo](https://stdf.dev)
- [RTDF 文档与移动端 Demo](https://rtdf.dev)
- [VTDF 文档与移动端 Demo](https://vtdf.dev)

## Monorepo 开发

仓库使用 Bun Workspaces、Turborepo、Changesets 和唯一根锁文件。依赖只能从仓库根目录安装。

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

启动 Any TDF 综合站，或同时启动某一框架的官网和 Demo：

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

开发环境需要 Bun 1.3.14 或更高版本，以及 Node.js 24 或更高版本。

## 仓库结构

- `apps`：文档官网、组件 Demo 和站点共享代码。
- `packages`：公共核心、框架组件库、Motion、Confetti 及其包内文档、AI Skill 和 `create-any-tdf`。
- `content`：生成后的 STDF、RTDF、VTDF 组件及指南内容。
- `extensions`：Any TDF VS Code 扩展。
- `scripts`：全仓生成、验证、打包和发布工具。

## 反馈

请使用 [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) 提交缺陷和功能建议，使用 [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) 交流问题与想法。

## 贡献者

完整名单请查看 [贡献者图谱](https://github.com/any-tdf/any-tdf/graphs/contributors)。欢迎参与组件、文档、工具、测试和翻译。

## 赞助者

感谢 [sbscan](https://github.com/sbscan)、[MuGuiLin](https://github.com/MuGuiLin) 和 [yuedanlabs](https://github.com/yuedanlabs) 对项目的支持。

## 开源协议

Any TDF 基于 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 开源。

## Star 历史

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
