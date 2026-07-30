## AI Skill

### Introduction

STDF provides an AI Agent Skill that helps compatible coding agents understand STDF projects more accurately. It bundles offline knowledge for STDF component APIs, component guides, theme configuration, the color system, icons, internationalization, and scaffolding, so the agent does not need the full STDF repository when the user project only installs the npm `stdf` package.

This Skill does not need to be installed from npm and should not be added as an application runtime dependency. The recommended installation path is the STDF GitHub repository or a direct copy into the Skill directory used by your Agent tool.

### Repository Information

- GitHub repository: `https://github.com/any-tdf/any-tdf`
- Skill path: `packages/skills/stdf-skill/skill`
- Skill name: `stdf`
- Trigger command: `$stdf`

### Codex Installation

If you use Codex with GitHub Skill installation support, ask Codex to run:

```txt
Install the STDF skill from https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill/skill
```

If you use the local Skill installer script, install it by repository and path:

```sh
python ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo any-tdf/any-tdf \
  --path packages/skills/stdf-skill/skill \
  --name stdf
```

After installation, restart Codex or reload Skills according to your Codex client.

### Generic Agent Installation

Different Agent tools use different Skill directory names. If your tool supports folder-based Skills, copy the STDF Skill directory into that tool's Skills directory and name the folder `stdf`.

Using the default Codex directory as an example:

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p ~/.codex/skills/stdf
cp -R any-tdf/packages/skills/stdf-skill/skill/. ~/.codex/skills/stdf/
```

If your Agent tool does not provide a standard Skill mechanism, provide `packages/skills/stdf-skill/skill/SKILL.md` as the entry instructions and keep the `references` and `scripts` directories next to it.

### Usage

After installation, trigger the Skill in an STDF project with `$stdf`:

```txt
$stdf Build a Svelte 5 login page with STDF Button, Toast, and Form.
```

```txt
$stdf Generate a random STDF theme and show both @plugin "stdf/theme" and @theme output.
```

When the AI uses this Skill, it reads `SKILL.md` first, then loads the relevant files from `references` for components, theme, color, icons, internationalization, or scaffolding. For component APIs, the agent should read the bundled offline component detail files instead of guessing props.

### Theme Generation Script

The Skill includes a theme generation script. After installing it to `~/.codex/skills/stdf`, run:

```sh
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --preset STDF --format both
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

The script follows the STDF theme algorithm to generate 50 to 950 scales for `color-primary` and `color-dark`, and can output `@plugin "stdf/theme"`, `@theme`, or JSON.

### Use Cases

- Help AI choose the correct STDF components in a project.
- Help AI check component props, events, and snippets.
- Help AI configure Tailwind CSS 4, dark mode, and multi-theme mode.
- Help AI generate or tune STDF themes.
- Help AI follow STDF icon, internationalization, and scaffolding conventions.

### Notes

- The Skill is an Agent knowledge package, not an application dependency.
- Do not run `bun add stdf-skill`.
- Normal projects only need runtime dependencies such as `stdf`, `@tailwindcss/vite`, and `tailwindcss`.
- To update from GitHub, copy or reinstall the Skill directory again.
