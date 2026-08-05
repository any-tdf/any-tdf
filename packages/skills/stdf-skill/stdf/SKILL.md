---
name: stdf
description: Build, modify, review, and troubleshoot STDF projects with exact offline component documentation. Use for STDF or stdf.dev, Svelte 5 mobile UI, Tailwind CSS 4 setup, component APIs, themes and dark mode, icons, i18n, or create-any-tdf scaffolding. Do not use for generic Svelte work that has no STDF dependency.
---

# STDF

Use this skill to produce working STDF code without guessing its public API. STDF is the Svelte 5 implementation of the Any TDF mobile web component system and uses Tailwind CSS 4, OKLCH theme variables, `data-mode`, and `data-theme`.

## Workflow

1. Confirm that the target uses `stdf` and inspect its installed version and existing project conventions.
2. Load only the references required for the task.
3. For every component involved, open the component index and the matching detail file before writing props, events, snippets, methods, or imports.
4. Implement with Svelte 5 patterns already used by the target project.
5. Run the narrowest relevant project check or test, then report any version or documentation mismatch.

The bundled component references represent the repository snapshot that produced this skill. If a project pins an older STDF release, read the component detail's version section and preserve the installed release contract. When working inside the Any TDF monorepo, generated documentation and package source take precedence if they reveal a newer change; update the owning documentation source and regenerate the skill instead of hand-editing generated component files.

## Operating Rules

- Prefer `bun` for package management and commands.
- Do not guess STDF component props, events, snippets, actions, exposed methods, or exports.
- Preserve the target project's Svelte 5 conventions and public component behavior.
- For Tailwind CSS 4, avoid arbitrary size and color classes. Put reusable values in CSS variables or shared project CSS.
- Keep theme and color decisions in public CSS rather than component-local class workarounds.

## Reference Routing

- For installation, entry CSS, dependencies, and `stdf/source.css`, read [project setup](references/project.md).
- For component selection or exact APIs, read [the component index](references/components.md), then open `references/components/<nav>.md` for every selected component.
- For dark mode, multi-theme mode, `@plugin "stdf/theme"`, `@theme`, and runtime switching, read [theme and mode](references/theme.md).
- For color semantics and generated palettes, read [the color system](references/color.md).
- For the `Icon` component, SVG symbols, and Iconify, read [icons](references/icons.md).
- For `STDF_lang` and locale presets, read [internationalization](references/i18n.md).
- For `create-any-tdf` templates and CLI options, read [scaffolding](references/scaffold.md).
- For an exact built-in theme record, inspect `data/themes.json` only after reading the theme reference.

## Theme Generation

Resolve `scripts/generate-theme.mjs` relative to this `SKILL.md` file and run it from the skill root. Do not assume that the user's application contains the script.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
bun scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

Prefer `@plugin "stdf/theme"` for switchable themes. Use `@theme` for single-theme variables and for the default variables Tailwind CSS needs to generate utilities.
