<div align="center">

# @any-tdf/common

Base condivisa e indipendente dal framework per l'ecosistema di componenti `any-tdf`.

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# Introduzione

`@any-tdf/common` e il pacchetto base condiviso per l'ecosistema `any-tdf`. Include stato derivato dei componenti, calcolo delle classi, dati di stile, dati SVG, strumenti tema per Tailwind CSS, cambio tema a runtime, pacchetti lingua, tipi e utility.

Il pacchetto e attualmente pubblicato nel canale `alpha`. Le API possono cambiare mentre i contratti condivisi vengono stabilizzati.

# Installazione

```sh
bun add @any-tdf/common@alpha
```

# Uso

```ts
import { resolveButtonClass, it_IT } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# Moduli

- `@any-tdf/common/derived`: stato derivato e helper per classi.
- `@any-tdf/common/svg`: dati SVG condivisi e mappe icone integrate.
- `@any-tdf/common/theme`: configurazione tema, plugin Tailwind CSS e helper runtime.
- `@any-tdf/common/lang`: pacchetti lingua.
- `@any-tdf/common/types`: tipi TypeScript condivisi.
- `@any-tdf/common/utils`: utility di piattaforma e generali.

# Sviluppo

```sh
bun install
bun test
bun run build
```

# Licenza

Questo progetto è rilasciato sotto [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
