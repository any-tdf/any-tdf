<div align="center">

[![CI](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/ci.yml)
[![Release](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml/badge.svg)](https://github.com/any-tdf/any-tdf/actions/workflows/release.yml)
[![GitHub license](https://img.shields.io/github/license/any-tdf/any-tdf?logo=github)](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)

# Any TDF

하나의 디자인 시스템, 세 가지 프레임워크 네이티브 구현.

**S**imple • **T**iny • **D**esign • **F**ast

[English](../README.md) • [简体中文](./README_zh_CN.md) • [繁體中文](./README_zh_TW.md) • [日本語](./README_ja_JP.md) • [한국어](./README_ko_KR.md) • [Español](./README_es_ES.md) • [Русский](./README_ru_RU.md) • [Français](./README_fr_FR.md) • [Deutsch](./README_de_DE.md) • [Italiano](./README_it_IT.md)

</div>

## 소개

Any TDF 는 Svelte, React, Vue 를 위한 모바일 Web 컴포넌트 제품군입니다. STDF, RTDF, VTDF 는 컴포넌트 계약, 테마, 로케일 데이터, 문서, 디자인 원칙을 공유하면서 각 프레임워크의 네이티브 렌더링, 이벤트, 슬롯, 구성 방식을 유지합니다.

## 제품

| 라이브러리 | 프레임워크    | npm                                          | 문서와 Demo                  |
| ---------- | ------------- | -------------------------------------------- | ---------------------------- |
| STDF       | Svelte 5      | [`stdf`](https://www.npmjs.com/package/stdf) | [stdf.dev](https://stdf.dev) |
| RTDF       | React 18 / 19 | [`rtdf`](https://www.npmjs.com/package/rtdf) | [rtdf.dev](https://rtdf.dev) |
| VTDF       | Vue 3.5       | [`vtdf`](https://www.npmjs.com/package/vtdf) | [vtdf.dev](https://vtdf.dev) |

## 특징

- 프레임워크 네이티브 API 를 제공하는 60 개의 정렬된 모바일 컴포넌트.
- Tailwind CSS v4 테마, 다크 모드, 런타임 테마 전환, 사용자 정의 테마.
- 60 개 이상의 내장 로케일과 중국어 및 영어 컴포넌트 문서.
- TypeScript 우선 내보내기, SSR, 선택적 가져오기, 공통 접근성 동작.
- 통합 스캐폴딩 CLI, 오프라인 AI Skill, 컴포넌트 API 용 VS Code 확장.
- STDF, RTDF, VTDF 간 차이를 방지하는 계약 및 시각적 검사.

## 설치

프로젝트 프레임워크에 맞는 구현을 선택합니다.

```sh
bun add stdf svelte tailwindcss
bun add rtdf react react-dom tailwindcss
bun add vtdf vue tailwindcss
```

테마 설정, 가져오기, 컴포넌트, 마이그레이션 안내는 각 공식 사이트를 참고하세요.

## 스캐폴딩

지원되는 프레임워크의 TypeScript 프로젝트를 생성합니다.

```sh
bun create any-tdf@latest
```

`create-any-tdf` 는 Tailwind CSS v4 또는 UnoCSS, 아이콘, 테마 옵션을 지원하는 Vite 및 SvelteKit 템플릿을 제공합니다.

## Demo 와 공식 사이트

- [STDF 문서와 모바일 Demo](https://stdf.dev)
- [RTDF 문서와 모바일 Demo](https://rtdf.dev)
- [VTDF 문서와 모바일 Demo](https://vtdf.dev)

## Monorepo 개발

저장소는 Bun Workspaces, Turborepo, Changesets, 단일 루트 잠금 파일을 사용합니다. 의존성은 저장소 루트에서만 설치합니다.

```sh
bun install --frozen-lockfile
bun run check
bun run test
bun run build
bun run verify
```

프레임워크별 사이트와 Demo 를 함께 실행합니다.

```sh
bun run dev:stdf
bun run dev:rtdf
bun run dev:vtdf
```

개발에는 Bun 1.3.14 이상과 Node.js 24 이상이 필요합니다.

## 저장소 구조

- `apps`: 문서 사이트, 컴포넌트 Demo, 공통 사이트 코드, 런타임 문서.
- `packages`: 공통 코어, 프레임워크 UI, Motion, Confetti, AI Skill.
- `content`: 생성된 STDF, RTDF, VTDF 컴포넌트와 가이드.
- `tooling`: `create-any-tdf` 와 Any TDF VS Code 확장.
- `scripts`: 저장소 전체 생성, 검증, 패키징, 릴리스 도구.

## 피드백

버그와 기능 요청은 [GitHub Issues](https://github.com/any-tdf/any-tdf/issues), 질문과 아이디어는 [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) 를 이용하세요.

## 기여자

전체 목록은 [기여자 그래프](https://github.com/any-tdf/any-tdf/graphs/contributors) 에서 확인할 수 있습니다. 컴포넌트, 문서, 도구, 테스트, 번역 기여를 환영합니다.

## 후원자

프로젝트를 지원하는 [sbscan](https://github.com/sbscan), [MuGuiLin](https://github.com/MuGuiLin), [yuedanlabs](https://github.com/yuedanlabs) 에 감사드립니다.

## 라이선스

Any TDF 는 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 로 배포됩니다.

## Star History

[![Star History Chart](https://api.star-history.com/svg?repos=any-tdf/any-tdf&type=Timeline)](https://github.com/any-tdf/any-tdf)
