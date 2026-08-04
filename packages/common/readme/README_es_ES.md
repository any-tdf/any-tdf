<div align="center">

# @any-tdf/common

Base compartida y agnostica del framework para el ecosistema de componentes `any-tdf`.

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md) • [Русский](./README_ru_RU.md)

</div>

# Introduccion

`@any-tdf/common` es el paquete base compartido para el ecosistema `any-tdf`. Incluye estados derivados de componentes, calculo de clases, datos de estilo, datos SVG, herramientas de tema para Tailwind CSS, cambio de tema en runtime, paquetes de idioma, tipos y utilidades.

El paquete se publica actualmente en el canal `alpha`. Las API pueden cambiar mientras se estabilizan los contratos compartidos.

# Instalacion

```sh
bun add @any-tdf/common@alpha
```

# Uso

```ts
import { resolveButtonClass, es_ES } from '@any-tdf/common';
import anytdfThemePlugin from '@any-tdf/common/theme/plugin';
import { switchTheme } from '@any-tdf/common/theme/runtime';
```

# Modulos

- `@any-tdf/common/derived`: estado derivado y helpers de clases.
- `@any-tdf/common/svg`: datos SVG compartidos y mapas de iconos integrados.
- `@any-tdf/common/theme`: configuracion de tema, plugin de Tailwind CSS y helpers de runtime.
- `@any-tdf/common/lang`: paquetes de idioma.
- `@any-tdf/common/types`: tipos TypeScript compartidos.
- `@any-tdf/common/utils`: utilidades de plataforma y generales.

# Desarrollo

```sh
bun install
bun test
bun run build
```

# Licencia

Este proyecto está publicado bajo la [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
