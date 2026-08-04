<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

One design system. Three native framework implementations.

**S**imple • **T**iny • **D**esign • **F**ast

[English](./README.md) • [简体中文](./readme/README_zh_CN.md) • [繁體中文](./readme/README_zh_TW.md) • [日本語](./readme/README_ja_JP.md) • [한국어](./readme/README_ko_KR.md) • [Español](./readme/README_es_ES.md) • [Русский](./readme/README_ru_RU.md) • [Français](./readme/README_fr_FR.md) • [Deutsch](./readme/README_de_DE.md) • [Italiano](./readme/README_it_IT.md)

</div>

## Introduction

Any TDF is a mobile web component family for Svelte, React, and Vue. STDF, RTDF, and VTDF share component contracts, themes, locale data, documentation, and design principles while retaining native rendering, events, slots, and composition patterns for each framework.

## Products

| Library | Framework | npm                                          | Documentation and Demo       |
| ------- | --------- | -------------------------------------------- | ---------------------------- |
| STDF    | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF    | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF    | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Features

- 60 aligned mobile components with framework-native APIs.
- STDF, RTDF, and VTDF are all built on Tailwind CSS, with dark mode, runtime theme switching, and custom themes.
- More than 60 built-in locale packages and Chinese and English component documentation.
- TypeScript-first exports, SSR support, on-demand imports, and shared accessibility behavior.
- A unified scaffolding CLI, offline AI Skills, and a VS Code extension for component APIs.
- Shared contract and visual checks that prevent STDF, RTDF, and VTDF from drifting apart.

## Installation

Choose the implementation for your framework:

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

See the corresponding website for theme setup, imports, components, and migration guides.

## Scaffolding

Create a TypeScript project for any supported framework:

```sh
bun create any-tdf@alpha
```

The `create-any-tdf` CLI provides Vite and SvelteKit templates with Tailwind CSS or UnoCSS and configurable icon and theme options.

## Demo and websites

- [STDF documentation and mobile Demo](https://stdf.dev)
- [RTDF documentation and mobile Demo](https://rtdf.dev)
- [VTDF documentation and mobile Demo](https://vtdf.dev)

## Monorepo development

The repository uses Bun Workspaces, Turborepo, Changesets, and a single root lockfile. Install dependencies only from the repository root.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Run the Any TDF portal, or a framework website and Demo together:

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

Development requires Bun 1.3.14 or newer and Node.js 24 or newer.

## Repository structure

- `apps`: documentation websites, component Demos, and shared site code.
- `packages`: shared core, framework component libraries, motion and confetti runtimes with package-local documentation, AI Skills, and `create-any-tdf`.
- `content`: generated STDF, RTDF, and VTDF component and guide content.
- `extensions`: the Any TDF VS Code extension.
- `scripts`: repository-wide generation, validation, packaging, and release utilities.

## Feedback

Use [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) for bugs and feature requests, and [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) for questions and ideas.

## Contributors

See the complete [contributor graph](https://github.com/any-tdf/any-tdf/graphs/contributors). Contributions to components, documentation, tooling, tests, and translations are welcome.

## Sponsors

Thanks to [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin), and [yuedanlabs](https://github.com/yuedanlabs) for supporting the project.

## License

Any TDF is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
