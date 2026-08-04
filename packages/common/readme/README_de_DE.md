<div align="center">

# @any-tdf/common

Framework-unabhaengige gemeinsame Grundlage fuer das `any-tdf` Komponenten-Oekosystem.

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# Einfuehrung

`@any-tdf/common` ist das gemeinsame Basispaket fuer das `any-tdf` Oekosystem. Es enthaelt abgeleiteten Komponentenstatus, Klassenberechnung, Stildaten, SVG-Daten, Tailwind CSS Theme-Werkzeuge, Runtime-Theme-Umschaltung, Sprachpakete, Typen und Hilfsfunktionen.

Das Paket wird derzeit im `alpha` Kanal veroeffentlicht. APIs koennen sich aendern, solange die gemeinsamen Vertraege stabilisiert werden.

# Installation

```sh
bun add @any-tdf/common@alpha
```

# Nutzung

```ts
import { resolveButtonClass, de_DE } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# Module

- `@any-tdf/common/derived`: abgeleiteter Komponentenstatus und Klassen-Helper.
- `@any-tdf/common/svg`: gemeinsame SVG-Daten und integrierte Icon-Maps.
- `@any-tdf/common/theme`: Theme-Konfiguration, Tailwind CSS Plugin und Runtime-Helper.
- `@any-tdf/common/lang`: Sprachpakete.
- `@any-tdf/common/types`: gemeinsame TypeScript Typen.
- `@any-tdf/common/utils`: Plattform- und allgemeine Hilfsfunktionen.

# Entwicklung

```sh
bun install
bun test
bun run build
```

# Lizenz

Dieses Projekt steht unter der [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
