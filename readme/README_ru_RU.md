<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![npm Publish](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/publish-npm.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

Одна дизайн-система. Три нативные реализации для разных фреймворков.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## Введение

Any TDF — семейство мобильных веб-компонентов для Svelte, React и Vue. STDF, RTDF и VTDF используют общие контракты компонентов, темы, локализации, документацию и принципы дизайна, сохраняя нативный рендеринг, события, слоты и композицию каждого фреймворка.

## Продукты

| Библиотека | Фреймворк | npm                                          | Документация и Demo          |
| ---------- | --------- | -------------------------------------------- | ---------------------------- |
| STDF       | Svelte    | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF       | React     | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF       | Vue       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## Возможности

- 60 согласованных мобильных компонентов с нативными API фреймворков.
- STDF, RTDF и VTDF основаны на Tailwind CSS и поддерживают тёмный режим, смену темы во время работы и пользовательские темы.
- Более 60 встроенных локализаций и документация компонентов на китайском и английском.
- Экспорт на TypeScript, SSR, импорт по требованию и общие правила доступности.
- Единый CLI, автономные AI Skills и расширение VS Code для просмотра API компонентов.
- Контрактные и визуальные тесты, предотвращающие расхождения STDF, RTDF и VTDF.

## Установка

Выберите реализацию для своего фреймворка:

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

Настройка тем, импорты, компоненты и миграции описаны на соответствующих сайтах.

## Создание проекта

Создайте TypeScript-проект для любого поддерживаемого фреймворка:

```sh
bun create any-tdf@latest
```

`create-any-tdf` предоставляет шаблоны Vite и SvelteKit с Tailwind CSS или UnoCSS, а также настройками значков и тем.

## Demo и сайты

- [Документация и мобильная Demo STDF](https://stdf.dev)
- [Документация и мобильная Demo RTDF](https://rtdf.dev)
- [Документация и мобильная Demo VTDF](https://vtdf.dev)

## Разработка Monorepo

Репозиторий использует Bun Workspaces, Turborepo, Changesets и единый корневой lock-файл. Устанавливайте зависимости только из корня репозитория.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

Запустите портал Any TDF либо сайт и Demo выбранного фреймворка вместе:

```sh
bun run dev:any-tdf
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

Для разработки требуются Bun 1.3.14 или новее и Node.js 24 или новее.

## Структура репозитория

- `apps`: сайты документации, Demo компонентов и общий код сайтов.
- `packages`: общее ядро, библиотеки компонентов, Motion и Confetti с документацией внутри пакетов, AI Skills и `create-any-tdf`.
- `content`: сгенерированные компоненты и руководства STDF, RTDF и VTDF.
- `extensions`: расширение Any TDF для VS Code.
- `scripts`: общие утилиты генерации, проверки, упаковки и выпуска.

## Обратная связь

Используйте [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) для ошибок и предложений, а [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) — для вопросов и идей.

## Участники

Полный список доступен в [графике участников](https://github.com/any-tdf/any-tdf/graphs/contributors). Мы приветствуем вклад в компоненты, документацию, инструменты, тесты и переводы.

## Спонсоры

Благодарим [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin) и [yuedanlabs](https://github.com/yuedanlabs) за поддержку проекта.

## Лицензия

Any TDF распространяется по [лицензии MIT](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
