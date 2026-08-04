<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

Un système de design. Trois implémentations natives pour les frameworks.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## Introduction

Any TDF est une famille de composants web mobiles pour Svelte, React et Vue. STDF, RTDF et VTDF partagent les contrats de composants, les thèmes, les données de langue, la documentation et les principes de design, tout en conservant le rendu, les événements, les slots et la composition propres à chaque framework.

## Produits

| Bibliothèque | Framework | npm                                          | Documentation et Demo        |
| ------------ | --------- | -------------------------------------------- | ---------------------------- |
| STDF         | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF         | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF         | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Fonctionnalités

- 60 composants mobiles alignés avec des API natives pour chaque framework.
- STDF, RTDF et VTDF reposent tous sur Tailwind CSS et prennent en charge le mode sombre, le changement de thème à l’exécution et les thèmes personnalisés.
- Plus de 60 langues intégrées et une documentation des composants en chinois et en anglais.
- Exports TypeScript, SSR, imports à la demande et comportements d’accessibilité partagés.
- CLI unifié, AI Skills hors ligne et extension VS Code pour consulter les API.
- Tests contractuels et visuels empêchant les divergences entre STDF, RTDF et VTDF.

## Installation

Choisissez l’implémentation correspondant à votre framework :

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

Consultez le site correspondant pour les thèmes, les imports, les composants et les migrations.

## Création de projet

Créez un projet TypeScript pour tout framework pris en charge :

```sh
bun create any-tdf@alpha
```

`create-any-tdf` fournit des modèles Vite et SvelteKit avec Tailwind CSS ou UnoCSS, ainsi que des options d’icônes et de thèmes.

## Demo et sites

- [Documentation et Demo mobile STDF](https://stdf.dev)
- [Documentation et Demo mobile RTDF](https://rtdf.dev)
- [Documentation et Demo mobile VTDF](https://vtdf.dev)

## Développement du Monorepo

Le dépôt utilise Bun Workspaces, Turborepo, Changesets et un seul fichier de verrouillage à la racine. Installez les dépendances uniquement depuis la racine.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Lancez le portail Any TDF, ou le site et la Demo d’un framework ensemble :

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

Le développement nécessite Bun 1.3.14 ou une version ultérieure et Node.js 24 ou une version ultérieure.

## Structure du dépôt

- `apps` : sites de documentation, Demos et code de site partagé.
- `packages` : cœur partagé, bibliothèques de composants, Motion et Confetti avec leur documentation locale, AI Skills et `create-any-tdf`.
- `content` : composants et guides STDF, RTDF et VTDF générés.
- `extensions` : l’extension Any TDF pour VS Code.
- `scripts` : outils globaux de génération, validation, empaquetage et publication.

## Retours

Utilisez [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) pour les erreurs et demandes, et [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) pour les questions et idées.

## Contributeurs

Consultez le [graphe des contributeurs](https://github.com/any-tdf/any-tdf/graphs/contributors). Les contributions aux composants, à la documentation, aux outils, aux tests et aux traductions sont les bienvenues.

## Sponsors

Merci à [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin) et [yuedanlabs](https://github.com/yuedanlabs) pour leur soutien.

## Licence

Any TDF est publié sous [licence MIT](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
