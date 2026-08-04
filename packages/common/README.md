<div align="center">

[![npm Publish Status](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![npm alpha](https://img.shields.io/npm/v/@any-tdf/common?tag=alpha&logo=npm&label=alpha&style=for-the-badge&color=aeb5f4&logoColor=DCE4FD&labelColor=010319)](https://www.npmjs.com/package/@any-tdf/common)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github&style=for-the-badge&color=B9C46A&logoColor=F3F3CB&labelColor=161901)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

<h1>@any-tdf/common</h1>

![](https://img.shields.io/badge/-TypeScript-%233178c6?logo=typescript&logoColor=ffffff)
![](https://img.shields.io/badge/-Tailwind%20CSS-%2300a6f4?logo=tailwindcss&logoColor=ffffff)
![](https://img.shields.io/badge/-Alpha-%23f59e0b)

<p>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/README.md">English</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_zh_CN.md">简体中文</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_zh_TW.md">繁體中文</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_ja_JP.md">日本語</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_ko_KR.md">한국어</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_es_ES.md">Español</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_fr_FR.md">Français</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_de_DE.md">Deutsch</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_it_IT.md">Italiano</a>
  <span> • </span>
  <a href="https://github.com/any-tdf/any-tdf/blob/main/packages/common/readme/README_ru_RU.md">Русский</a>
</p>

</div>

# Introduction

`@any-tdf/common` is the framework-agnostic shared foundation for the `any-tdf` component ecosystem. It contains derived component state helpers, shared SVG data, Tailwind CSS theme utilities, runtime theme switching, language packs, TypeScript types, and small platform utilities.

The package is currently published on the `alpha` channel. APIs may still change while React, Svelte, Vue, and other framework packages finish aligning on the shared contracts.

# Features

- Framework-agnostic component derivation helpers for state, classes, styles, and render metadata.
- Shared SVG data and built-in icon library mapping.
- Tailwind CSS theme plugin, color scale utilities, and runtime theme switching helpers.
- 60+ language packs used by `any-tdf` UI packages.
- TypeScript-first source code and generated declaration files.
- No framework runtime dependency.

# Installation

```sh
bun add @any-tdf/common@alpha
```

```sh
pnpm add @any-tdf/common@alpha
```

```sh
npm install @any-tdf/common@alpha
```

# Exports

```ts
import { resolveButtonClass, en_US } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

Available entry points:

- `@any-tdf/common`
- `@any-tdf/common/derived`
- `@any-tdf/common/derived/*`
- `@any-tdf/common/svg`
- `@any-tdf/common/svg/*`
- `@any-tdf/common/theme`
- `@any-tdf/common/theme/plugin`
- `@any-tdf/common/theme/runtime`
- `@any-tdf/common/lang`
- `@any-tdf/common/types`
- `@any-tdf/common/utils`
- `@any-tdf/common/source.css`, which registers the published `dist` files as Tailwind CSS sources.

# Development

```sh
bun install
bun test
bun run build
```

# Publishing

Package versions are managed with Changesets. After a version PR is merged, the npm publish workflow validates a Bun-generated TGZ and publishes it in dependency order:

```sh
bun run publish:npm:check
```

# Links

- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/common)
- [Issues](https://github.com/any-tdf/any-tdf/issues)
- [Any TDF](https://github.com/any-tdf/any-tdf)

# License

`@any-tdf/common` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
