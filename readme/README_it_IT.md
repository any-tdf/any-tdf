<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

Un design system. Tre implementazioni native per i framework.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## Introduzione

Any TDF è una famiglia di componenti web mobile per Svelte, React e Vue. STDF, RTDF e VTDF condividono contratti dei componenti, temi, dati di lingua, documentazione e principi di design, mantenendo rendering, eventi, slot e composizione nativi di ogni framework.

## Prodotti

| Libreria | Framework | npm                                          | Documentazione e Demo        |
| -------- | --------- | -------------------------------------------- | ---------------------------- |
| STDF     | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF     | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF     | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Funzionalità

- 60 componenti mobile allineati con API native per ogni framework.
- STDF, RTDF e VTDF sono tutti basati su Tailwind CSS e supportano modalità scura, cambio tema a runtime e temi personalizzati.
- Oltre 60 pacchetti lingua integrati e documentazione dei componenti in cinese e inglese.
- Esportazioni TypeScript, SSR, importazioni su richiesta e comportamento di accessibilità condiviso.
- CLI unificata, AI Skills offline ed estensione VS Code per consultare le API.
- Test contrattuali e visivi impediscono divergenze tra STDF, RTDF e VTDF.

## Installazione

Scegli l’implementazione per il tuo framework:

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

Consulta il sito corrispondente per temi, importazioni, componenti e migrazioni.

## Creazione del progetto

Crea un progetto TypeScript per qualsiasi framework supportato:

```sh
bun create any-tdf@latest
```

`create-any-tdf` offre template Vite e SvelteKit con Tailwind CSS o UnoCSS e opzioni per icone e temi.

## Demo e siti web

- [Documentazione e Demo mobile STDF](https://stdf.dev)
- [Documentazione e Demo mobile RTDF](https://rtdf.dev)
- [Documentazione e Demo mobile VTDF](https://vtdf.dev)

## Sviluppo del Monorepo

Il repository usa Bun Workspaces, Turborepo, Changesets e un unico lockfile nella radice. Installa le dipendenze solo dalla radice.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Avvia il portale Any TDF oppure il sito e la Demo di un framework insieme:

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

Lo sviluppo richiede Bun 1.3.14 o successivo e Node.js 24 o successivo.

## Struttura del repository

- `apps`: siti di documentazione, Demo e codice condiviso dei siti.
- `packages`: nucleo condiviso, librerie di componenti, Motion e Confetti con documentazione interna al pacchetto, AI Skills e `create-any-tdf`.
- `content`: componenti e guide STDF, RTDF e VTDF generati.
- `extensions`: l’estensione Any TDF per VS Code.
- `scripts`: strumenti globali di generazione, validazione, pacchettizzazione e rilascio.

## Feedback

Usa [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) per errori e richieste, e [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) per domande e idee.

## Collaboratori

Consulta il [grafico dei collaboratori](https://github.com/any-tdf/any-tdf/graphs/contributors). Sono benvenuti contributi a componenti, documentazione, strumenti, test e traduzioni.

## Sponsor

Grazie a [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin) e [yuedanlabs](https://github.com/yuedanlabs) per il supporto al progetto.

## Licenza

Any TDF è pubblicato con [licenza MIT](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
