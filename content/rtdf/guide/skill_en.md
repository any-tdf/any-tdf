## AI Skill

### Introduction

RTDF provides an AI Agent Skill package that helps compatible coding agents understand RTDF projects more accurately. The Skill bundles offline knowledge for RTDF component APIs, component guides, theme configuration, the color system, icons, internationalization, and scaffolding, so the agent does not need the full RTDF repository when the user project only installs the npm `rtdf` package.

### Package Information

- Package name: `rtdf-skill`
- Skill name: `rtdf`
- Trigger command: `$rtdf`
- Directory: `packages/rtdf-skill`

### Install In Codex

`rtdf-skill` is an Agent knowledge package, not an application runtime dependency. Do not run `bun add rtdf-skill` in ordinary RTDF projects.

Inside this repository, copy the Skill directory to the Codex Skills directory:

```sh
mkdir -p ~/.codex/skills
cp -R packages/rtdf-skill/skill ~/.codex/skills/rtdf
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
- `skill/scripts/generate-theme.mjs`: Generates `@plugin "rtdf/theme"` and `@theme` config.
- `skill/data/themes.json`: 42 shared built-in themes.

### Maintenance Commands

When component docs or theme data changes, regenerate and validate the Skill:

```sh
cd packages/rtdf-skill
bun run generate:components
bun run generate:themes
bun run validate
bun run test:theme
```
