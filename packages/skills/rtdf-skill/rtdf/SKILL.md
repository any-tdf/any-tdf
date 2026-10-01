---
name: rtdf
description: Build, review, and troubleshoot RTDF React applications using exact component APIs, themes, icons, localization, and scaffolding. Use when the project uses rtdf or the user requests RTDF; exclude generic React work without RTDF.
---

# RTDF

Use this skill to produce working RTDF code without guessing its public API. RTDF is the React implementation of the Any TDF mobile web component system and uses Tailwind CSS 4, OKLCH theme variables, `data-mode`, and `data-theme`.

## Workflow

1. Confirm that the target uses `rtdf` and inspect its installed version and existing project conventions.
2. Load only the references required for the task.
3. For each indexed component involved, open the component index and the matching detail file before writing props, callbacks, children, render functions, methods, or imports.
   For `ConfigProvider`, read the internationalization reference and its generated guide; it is not listed in the component index. For other unindexed exports, inspect the installed package declarations before use.
4. Implement with React patterns already used by the target project.
5. Run the narrowest relevant project check or test, then report any version or documentation mismatch.

The bundled component references represent the repository snapshot that produced this skill. If a project pins an older RTDF release, read the component detail's version section and preserve the installed release contract. When working inside the Any TDF monorepo, generated documentation and package source take precedence if they reveal a newer change; update the owning documentation source and regenerate the skill instead of hand-editing generated component files.

For the current documentation version, compatibility, functional feedback, utility exports, and Vite Markdown integration, use [the guide index](references/guides.md). These Skill directories are distributed from GitHub, not npm. Updating the component dependency does not update an installed Skill copy.

## Operating Rules

- Follow the target project's package manager; use `bun` for a new project or this monorepo.
- Do not guess RTDF component props, callbacks, children behavior, render functions, exposed methods, or exports.
- Preserve the target project's React conventions and public component behavior.
- Prefer arrow functions unless the target project has a stronger local convention.
- For Tailwind CSS 4, avoid arbitrary size and color classes. Put reusable values in CSS variables or shared project CSS.
- Keep theme and color decisions in public CSS rather than component-local class workarounds.

## Reference Routing

- For installation, entry CSS, dependencies, and Tailwind source registration, read [project setup](references/project.md).
- For component selection or exact APIs, read [the component index](references/components.md), then open `references/components/<nav>.md` for every selected component.
- For dark mode, multi-theme mode, the Tailwind theme plugin, `@theme`, and runtime switching, read [theme and mode](references/theme.md).
- For color semantics and generated palettes, read [the color system](references/color.md).
- For the `Icon` component, SVG symbols, and Iconify, read [icons](references/icons.md).
- For `ConfigProvider` and locale presets, read [internationalization](references/i18n.md).
- For `create-any-tdf` templates and CLI options, read [scaffolding](references/scaffold.md).
- For installing or refreshing this Skill, read [Skill updates](references/updates.md). Do not check the network or update installed Skills during ordinary component work.
- For an exact built-in theme record, inspect `data/themes.json` only after reading the theme reference.

## Theme Generation

Resolve `scripts/generate-theme.mjs` relative to this `SKILL.md` file and run it from the skill root. Do not assume that the user's application contains the script.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
bun scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

Prefer `@plugin "rtdf/theme"` for new switchable-theme configuration while preserving the supported path already used by an existing project. Use `@theme` for single-theme variables and for the default variables Tailwind CSS needs to generate utilities.
