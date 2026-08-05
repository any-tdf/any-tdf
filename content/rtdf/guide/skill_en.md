## AI Skill

### Introduction

RTDF provides an AI Skill that follows the open Agent Skills format. It helps coding agents use exact RTDF component APIs, React patterns, Tailwind CSS 4 themes, icons, internationalization, and scaffolding conventions. The Skill loads offline references on demand, so an ordinary RTDF project does not need the complete Monorepo.

This Skill is an Agent knowledge package, not an application runtime dependency. Do not run `bun add rtdf-skill`.

### Repository Information

- Skill name: `rtdf`
- Explicit invocation: `$rtdf`
- GitHub repository: `https://github.com/any-tdf/any-tdf`
- Skill directory: `packages/skills/rtdf-skill/rtdf`
- Format: `SKILL.md`, `references/`, `scripts/`, `data/`, and optional `agents/openai.yaml`

The directory name matches `name: rtdf` in `SKILL.md`, so Agent Skills-compatible clients can discover it directly.

### Install In Codex

Invoke the built-in installer in Codex:

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill/rtdf
```

The installer downloads the complete GitHub subdirectory. Use `$rtdf` in the next task. Reload or restart the client if it does not show the newly installed Skill immediately.

### Generic Agent Installation

For clients that support the standard project scope, copy the Skill to `.agents/skills`:

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p your-project/.agents/skills
cp -R any-tdf/packages/skills/rtdf-skill/rtdf your-project/.agents/skills/
```

Copy it to `~/.agents/skills/` for user-wide reuse. If a client uses another search directory, copy the complete `rtdf` directory rather than only `SKILL.md`; otherwise, component references and the theme script will be unavailable.

### Component Documentation Pipeline

Component references are generated from the official documentation source rather than maintained as a separate manual copy:

```text
apps/site-common/docs/component-docs
  -> content/rtdf/components
  -> packages/skills/rtdf-skill/rtdf/references/components
```

Each component detail combines its English guide, API, FAQ, and version documents. The AI reads `references/components.md` first and then loads only the required `references/components/<nav>.md` files. This gives component APIs a traceable source without loading the entire documentation set.

The repository's `generate:skills:check` command compares the generated files. It fails when component documentation changes without a matching Skill regeneration.

### Usage

```text
$rtdf Build a React login page with RTDF Button, Toast, and Form, and verify every component API.
```

```text
$rtdf Generate a random RTDF theme and return both the @plugin and @theme blocks.
```

The Skill first checks the installed RTDF version and then loads only the relevant references. For component work, it must read each detail file instead of inferring props, callbacks, children behavior, render functions, or public methods from a component name.

### Theme Generation

The Skill bundles `scripts/generate-theme.mjs` for built-in presets, custom OKLCH colors, and seeded random themes. The AI resolves the script relative to `SKILL.md`; it does not depend on repository paths in the user's project.

```text
$rtdf Generate the complete theme configuration from the ANYTDF preset.
```

The output can contain `@plugin "rtdf/theme/plugin"`, `@theme`, or JSON.

### Maintenance

Run from the Monorepo root:

```sh
bun run --filter rtdf-skill generate
bun run --filter rtdf-skill test
```

Process all three component libraries with:

```sh
bun run generate:skills
bun run generate:skills:check
```
