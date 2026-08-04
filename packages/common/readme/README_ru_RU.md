<div align="center">

# @any-tdf/common

Framework-agnostic shared foundation for the `any-tdf` component ecosystem.

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# Overview

`@any-tdf/common` is the shared foundation package for the `any-tdf` component ecosystem. It provides derived component state, class helpers, style data, SVG icon data, Tailwind CSS theme tools, runtime theme switching, language packs, types, and utilities.

The package is currently published on the `alpha` channel. APIs may change while the framework packages align on shared contracts.

# Installation

```sh
bun add @any-tdf/common@alpha
```

# Usage

```ts
import { resolveButtonClass, ru_RU } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# Modules

- `@any-tdf/common/derived`: derived component state and class helpers.
- `@any-tdf/common/svg`: shared SVG data and built-in icon maps.
- `@any-tdf/common/theme`: theme config, Tailwind CSS plugin, and runtime helpers.
- `@any-tdf/common/lang`: language packs.
- `@any-tdf/common/types`: shared TypeScript types.
- `@any-tdf/common/utils`: platform and general utilities.

# Development

```sh
bun install
bun test
bun run build
```

# License

Проект распространяется по [лицензии MIT](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
