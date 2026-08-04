<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

Ein Designsystem. Drei native Framework-Implementierungen.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## Einführung

Any TDF ist eine Familie mobiler Webkomponenten für Svelte, React und Vue. STDF, RTDF und VTDF teilen Komponentenverträge, Themes, Sprachdaten, Dokumentation und Designprinzipien, behalten aber Rendering, Events, Slots und Komposition des jeweiligen Frameworks bei.

## Produkte

| Bibliothek | Framework | npm                                          | Dokumentation und Demo       |
| ---------- | --------- | -------------------------------------------- | ---------------------------- |
| STDF       | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF       | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF       | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Funktionen

- 60 abgestimmte mobile Komponenten mit nativen Framework-APIs.
- STDF, RTDF und VTDF basieren alle auf Tailwind CSS und unterstützen Dark Mode, Theme-Wechsel zur Laufzeit und eigene Themes.
- Mehr als 60 integrierte Sprachpakete sowie chinesische und englische Komponentendokumentation.
- TypeScript-Exporte, SSR, bedarfsgesteuerte Imports und gemeinsames Barrierefreiheitsverhalten.
- Einheitliche CLI, Offline-AI-Skills und eine VS Code Erweiterung für Komponenten-APIs.
- Vertrags- und visuelle Tests verhindern Abweichungen zwischen STDF, RTDF und VTDF.

## Installation

Wähle die Implementierung für dein Framework:

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

Theme-Konfiguration, Imports, Komponenten und Migrationen sind auf der jeweiligen Website beschrieben.

## Projekt erstellen

Erstelle ein TypeScript-Projekt für jedes unterstützte Framework:

```sh
bun create any-tdf@alpha
```

`create-any-tdf` bietet Vite- und SvelteKit-Vorlagen mit Tailwind CSS oder UnoCSS sowie Optionen für Icons und Themes.

## Demo und Websites

- [STDF Dokumentation und mobile Demo](https://stdf.dev)
- [RTDF Dokumentation und mobile Demo](https://rtdf.dev)
- [VTDF Dokumentation und mobile Demo](https://vtdf.dev)

## Monorepo-Entwicklung

Das Repository verwendet Bun Workspaces, Turborepo, Changesets und eine einzige Lockdatei im Stammverzeichnis. Installiere Abhängigkeiten nur dort.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Starte das Any TDF Portal oder Website und Demo eines Frameworks gemeinsam:

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

Für die Entwicklung sind Bun 1.3.14 oder neuer und Node.js 24 oder neuer erforderlich.

## Repository-Struktur

- `apps`: Dokumentationsseiten, Komponenten-Demos und gemeinsamer Site-Code.
- `packages`: gemeinsamer Kern, Komponentenbibliotheken, Motion und Confetti mit paketlokaler Dokumentation, AI Skills und `create-any-tdf`.
- `content`: generierte STDF-, RTDF- und VTDF-Komponenten und Anleitungen.
- `extensions`: die Any TDF Erweiterung für VS Code.
- `scripts`: repositoryweite Werkzeuge für Generierung, Prüfung, Paketierung und Veröffentlichung.

## Feedback

Nutze [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) für Fehler und Funktionswünsche sowie [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) für Fragen und Ideen.

## Mitwirkende

Die vollständige Liste findest du im [Mitwirkenden-Diagramm](https://github.com/any-tdf/any-tdf/graphs/contributors). Beiträge zu Komponenten, Dokumentation, Werkzeugen, Tests und Übersetzungen sind willkommen.

## Sponsoren

Vielen Dank an [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin) und [yuedanlabs](https://github.com/yuedanlabs) für die Unterstützung.

## Lizenz

Any TDF wird unter der [MIT-Lizenz](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) veröffentlicht.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
