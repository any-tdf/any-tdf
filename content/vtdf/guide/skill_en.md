## AI Skill

### Introduction

VTDF provides an AI Agent Skill package that helps compatible coding agents understand VTDF projects more accurately. The Skill bundles offline knowledge for VTDF component APIs, component guides, theme configuration, the color system, icons, internationalization, and scaffolding, so the agent does not need the full VTDF repository when the user project only installs the npm `vtdf` package.

### Package Information

- Package name: `vtdf-skill`
- Skill name: `vtdf`
- Trigger command: `$vtdf`
- Directory: `packages/vtdf-skill`

### Install In Codex

`vtdf-skill` is an Agent knowledge package, not an application runtime dependency. Do not run `bun add vtdf-skill` in ordinary VTDF projects.

Inside this repository, copy the Skill directory to the Codex Skills directory:

```sh
mkdir -p ~/.codex/skills
cp -R packages/vtdf-skill/skill ~/.codex/skills/vtdf
```

### Contents

- `skill/SKILL.md`: Skill entry and reference routing.
- `skill/references/project.md`: Project setup, entry CSS, and dependencies.
- `skill/references/components.md`: Component index.
- `skill/references/components/`: Offline component documentation with English guide, API, FAQ, and version information.
- `skill/references/theme.md`: Dark mode, multi-theme mode, and runtime switching.
- `skill/references/color.md`: Color system and theme generation.
- `skill/references/icons.md`: SVG Symbol and Iconify icon setup.
- `skill/references/i18n.md`: `ConfigProvider` internationalization.
- `skill/references/scaffold.md`: `create-any-tdf` scaffolding.
- `skill/scripts/generate-theme.mjs`: Generates `@plugin "vtdf/theme"` and `@theme` config.
- `skill/data/themes.json`: 42 shared built-in themes.

### Maintenance Commands

When component docs or theme data changes, regenerate and validate the Skill:

```sh
cd packages/vtdf-skill
bun run generate:components
bun run generate:themes
bun run validate
bun run test:theme
```
