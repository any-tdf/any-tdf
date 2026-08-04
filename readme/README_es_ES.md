<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

Un sistema de diseño. Tres implementaciones nativas para cada framework.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## Introducción

Any TDF es una familia de componentes web móviles para Svelte, React y Vue. STDF, RTDF y VTDF comparten contratos de componentes, temas, datos de idioma, documentación y principios de diseño, conservando el renderizado, los eventos, los slots y la composición nativos de cada framework.

## Productos

| Biblioteca | Framework | npm                                          | Documentación y Demo         |
| ---------- | --------- | -------------------------------------------- | ---------------------------- |
| STDF       | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF       | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF       | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Características

- 60 componentes móviles alineados con API nativas de cada framework.
- STDF, RTDF y VTDF se basan en Tailwind CSS y admiten modo oscuro, cambio de tema en ejecución y temas personalizados.
- Más de 60 paquetes de idioma integrados y documentación de componentes en chino e inglés.
- Exportaciones TypeScript, SSR, importación bajo demanda y accesibilidad compartida.
- CLI de creación unificada, AI Skills sin conexión y extensión de VS Code para consultar API.
- Pruebas de contratos y visuales que evitan diferencias entre STDF, RTDF y VTDF.

## Instalación

Elige la implementación para tu framework:

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

Consulta el sitio correspondiente para configurar temas, importaciones, componentes y migraciones.

## Creación de proyectos

Crea un proyecto TypeScript para cualquier framework compatible:

```sh
bun create any-tdf@alpha
```

`create-any-tdf` ofrece plantillas Vite y SvelteKit con Tailwind CSS o UnoCSS, además de opciones de iconos y temas.

## Demo y sitios web

- [Documentación y Demo móvil de STDF](https://stdf.dev)
- [Documentación y Demo móvil de RTDF](https://rtdf.dev)
- [Documentación y Demo móvil de VTDF](https://vtdf.dev)

## Desarrollo del Monorepo

El repositorio usa Bun Workspaces, Turborepo, Changesets y un único archivo de bloqueo raíz. Instala dependencias solamente desde la raíz.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Ejecuta el portal Any TDF o, conjuntamente, el sitio y la Demo de cada framework:

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

El desarrollo requiere Bun 1.3.14 o posterior y Node.js 24 o posterior.

## Estructura del repositorio

- `apps`: sitios de documentación, Demos y código compartido de sitios.
- `packages`: núcleo común, bibliotecas de componentes, Motion y Confetti con documentación dentro de cada paquete, AI Skills y `create-any-tdf`.
- `content`: contenido generado de componentes y guías de STDF, RTDF y VTDF.
- `extensions`: la extensión Any TDF para VS Code.
- `scripts`: utilidades globales de generación, validación, empaquetado y publicación.

## Comentarios

Usa [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) para errores y propuestas, y [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) para preguntas e ideas.

## Colaboradores

Consulta el [gráfico de colaboradores](https://github.com/any-tdf/any-tdf/graphs/contributors). Agradecemos contribuciones a componentes, documentación, herramientas, pruebas y traducciones.

## Patrocinadores

Gracias a [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin) y [yuedanlabs](https://github.com/yuedanlabs) por apoyar el proyecto.

## Licencia

Any TDF se publica bajo la [Licencia MIT](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
