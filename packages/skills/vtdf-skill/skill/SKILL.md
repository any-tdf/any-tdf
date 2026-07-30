---
name: vtdf
description: Expert guidance for building, modifying, and reviewing VTDF projects. Use when the user mentions VTDF, vtdf.dev, Vue 3 mobile UI components, Tailwind CSS 4 theme configuration, VTDF components, VTDF color themes, VTDF dark mode, create-any-tdf scaffolding, VTDF Icon usage, VTDF i18n, or asks to generate or configure a VTDF theme. Trigger explicitly with $vtdf.
---

# VTDF

Use this skill for VTDF engineering tasks. VTDF is a Vue 3 mobile web component library built around Tailwind CSS 4, OKLCH theme variables, dark mode via `data-mode`, and multi-theme switching via `data-theme`.

## Operating Rules

- Prefer `bun` for package management and commands.
- Use Vue 3 patterns already present in the target project.
- Do not guess VTDF component props, events, slots, exposed methods, or exported helpers. Read component docs first, then source if needed.
- For Tailwind CSS 4, avoid arbitrary value classes such as `[12px]`, `[1rem]`, or `[#fff]`. Define shared values in CSS variables or project CSS.
- Put theme and color decisions in public CSS, not scattered component-local class hacks.
- For Chinese user-facing text, keep valid UTF-8 and put spaces between Chinese characters and English words or numbers.

## Reference Routing

- Project setup, dependencies, entry CSS, and `@source`: read `references/project.md`.
- Component selection and exact component API or guide details: read `references/components.md`, then read the matching `references/components/<nav>.md`.
- Dark mode, multi-theme mode, `@plugin "vtdf/theme/plugin"`, `@theme`, and runtime switching: read `references/theme.md`.
- Color system and theme generator concepts: read `references/color.md`.
- Icon component, SVG symbol sprites, and Iconify: read `references/icons.md`.
- Internationalization with `ConfigProvider`: read `references/i18n.md`.
- `create-any-tdf` templates and CLI options: read `references/scaffold.md`.

## Theme Generation

Use `skill/scripts/generate-theme.mjs` when the user asks to generate a theme, randomize a theme, convert a primary and dark color into VTDF theme config, or inspect a preset:

```sh
bun skill/scripts/generate-theme.mjs --preset ANYTDF --format both
bun skill/scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun skill/scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

Prefer `@plugin "vtdf/theme/plugin"` for multi-theme projects. Prefer `@theme` only for single-theme baseline variables or the default variables required by Tailwind utility generation.
