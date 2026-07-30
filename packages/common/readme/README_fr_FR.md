<div align="center">

# @any-tdf/common

Base partagee et independante du framework pour l'ecosysteme de composants `any-tdf`.

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# Introduction

`@any-tdf/common` est le paquet de base partage pour l'ecosysteme `any-tdf`. Il fournit l'etat derive des composants, le calcul des classes, les donnees de style, les donnees SVG, les outils de theme Tailwind CSS v4, le changement de theme au runtime, les packs de langue, les types et les utilitaires.

Le paquet est actuellement publie sur le canal `alpha`. Les API peuvent encore changer pendant la stabilisation des contrats partages.

# Installation

```sh
bun add @any-tdf/common@alpha
```

# Utilisation

```ts
import { resolveButtonClass, fr_FR } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# Modules

- `@any-tdf/common/derived`: etat derive et helpers de classes.
- `@any-tdf/common/svg`: donnees SVG partagees et cartes d'icones integrees.
- `@any-tdf/common/theme`: configuration de theme, plugin Tailwind CSS v4 et helpers runtime.
- `@any-tdf/common/lang`: packs de langue.
- `@any-tdf/common/types`: types TypeScript partages.
- `@any-tdf/common/utils`: utilitaires de plateforme et generaux.

# Developpement

```sh
bun install
bun test
bun run build
```

# Licence

Ce projet est publié sous [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
