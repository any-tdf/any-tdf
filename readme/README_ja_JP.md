<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

1 つのデザインシステム、3 つのフレームワークネイティブ実装。

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## はじめに

Any TDF は、Svelte、React、Vue 向けのモバイル Web コンポーネントファミリーです。STDF、RTDF、VTDF はコンポーネント契約、テーマ、ロケールデータ、ドキュメント、デザイン原則を共有しながら、各フレームワーク固有のレンダリング、イベント、スロット、コンポジションを維持します。

## 製品

| ライブラリ | フレームワーク | npm                                          | ドキュメントと Demo          |
| ---------- | -------------- | -------------------------------------------- | ---------------------------- |
| STDF       | Svelte 5       | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF       | React 18 / 19  | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF       | Vue 3.5        | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## 特長

- フレームワークネイティブ API を備えた 60 個の統一モバイルコンポーネント。
- Tailwind CSS v4 テーマ、ダークモード、実行時テーマ切り替え、カスタムテーマ。
- 60 以上の組み込みロケールと、中国語・英語のコンポーネントドキュメント。
- TypeScript ファーストのエクスポート、SSR、オンデマンドインポート、共通アクセシビリティ動作。
- 統一 CLI、オフライン AI Skill、コンポーネント API 用 VS Code 拡張。
- STDF、RTDF、VTDF の差異を防ぐ契約テストとビジュアルテスト。

## インストール

利用するフレームワークに合わせて選択してください。

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

テーマ設定、インポート、コンポーネント、移行ガイドは各公式サイトで確認できます。

## スキャフォールディング

対応フレームワークの TypeScript プロジェクトを作成します。

```sh
bun create any-tdf@latest
```

`create-any-tdf` は、Tailwind CSS v4 または UnoCSS、アイコン、テーマを設定できる Vite と SvelteKit テンプレートを提供します。

## Demo と公式サイト

- [STDF ドキュメントとモバイル Demo](https://stdf.dev)
- [RTDF ドキュメントとモバイル Demo](https://rtdf.dev)
- [VTDF ドキュメントとモバイル Demo](https://vtdf.dev)

## Monorepo 開発

このリポジトリは Bun Workspaces、Turborepo、Changesets、単一のルートロックファイルを使用します。依存関係はルートからのみインストールします。

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

各フレームワークのサイトと Demo を同時に起動します。

```sh
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

開発には Bun 1.3.14 以降と Node.js 24 以降が必要です。

## リポジトリ構成

- `apps`：ドキュメントサイト、コンポーネント Demo、共通サイトコード、ランタイムドキュメント。
- `packages`：共通コア、フレームワーク UI、Motion、Confetti、AI Skill。
- `content`：生成された STDF、RTDF、VTDF のコンポーネントとガイド。
- `tooling`：`create-any-tdf` と Any TDF VS Code 拡張。
- `scripts`：リポジトリ全体の生成、検証、パッケージ、リリースツール。

## フィードバック

不具合や機能要望は [GitHub Issues](https://github.com/any-tdf/any-tdf/issues)、質問やアイデアは [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) を利用してください。

## コントリビューター

完全な一覧は [コントリビューターグラフ](https://github.com/any-tdf/any-tdf/graphs/contributors) で確認できます。コンポーネント、ドキュメント、ツール、テスト、翻訳への貢献を歓迎します。

## スポンサー

プロジェクトを支援してくださる [sbscan](https://github.com/sbscan)、[MuGuiLin](https://github.com/MuGuiLin)、[yuedanlabs](https://github.com/yuedanlabs) に感謝します。

## ライセンス

Any TDF は [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) で公開されています。

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
