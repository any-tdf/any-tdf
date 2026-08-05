## AI Skill

### Introduction

VTDF provides an AI Skill that follows the open Agent Skills format. It helps coding agents use exact VTDF component APIs, Vue 3 patterns, Tailwind CSS 4 themes, icons, internationalization, and scaffolding conventions. The Skill loads offline references on demand, so an ordinary VTDF project does not need the complete Monorepo.

This Skill is an Agent knowledge package, not an application runtime dependency. Do not run `bun add vtdf-skill`.

### Repository Information

- Skill name: `vtdf`
- Explicit invocation: `$vtdf`
- GitHub repository: `https://github.com/any-tdf/any-tdf`
- Skill directory: `packages/skills/vtdf-skill/vtdf`
- Format: `SKILL.md`, `references/`, `scripts/`, `data/`, and optional `agents/openai.yaml`

The directory name matches `name: vtdf` in `SKILL.md`, so Agent Skills-compatible clients can discover it directly.

### Install In Codex

Invoke the built-in installer in Codex:

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill/vtdf
```

The installer downloads the complete GitHub subdirectory. Use `$vtdf` in the next task. Reload or restart the client if it does not show the newly installed Skill immediately.

### Generic Agent Installation

For clients that support the standard project scope, copy the Skill to `.agents/skills`:

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p your-project/.agents/skills
cp -R any-tdf/packages/skills/vtdf-skill/vtdf your-project/.agents/skills/
```

Copy it to `~/.agents/skills/` for user-wide reuse. If a client uses another search directory, copy the complete `vtdf` directory rather than only `SKILL.md`; otherwise, component references and the theme script will be unavailable.

### Component Documentation Pipeline

Component references are generated from the official documentation source rather than maintained as a separate manual copy:

```text
apps/site-common/docs/component-docs
  -> content/vtdf/components
  -> packages/skills/vtdf-skill/vtdf/references/components
```

Each component detail combines its English guide, API, FAQ, and version documents. The AI reads `references/components.md` first and then loads only the required `references/components/<nav>.md` files. This gives component APIs a traceable source without loading the entire documentation set.

The repository's `generate:skills:check` command compares the generated files. It fails when component documentation changes without a matching Skill regeneration.

### Usage

```text
$vtdf Build a Vue 3 login page with VTDF Button, Toast, and Form, and verify every component API.
```

```text
$vtdf Generate a random VTDF theme and return both the @plugin and @theme blocks.
```

The Skill first checks the installed VTDF version and then loads only the relevant references. For component work, it must read each detail file instead of inferring props, emits, slots, public methods, or composables from a component name.

### Theme Generation

The Skill bundles `scripts/generate-theme.mjs` for built-in presets, custom OKLCH colors, and seeded random themes. The AI resolves the script relative to `SKILL.md`; it does not depend on repository paths in the user's project.

```text
$vtdf Generate the complete theme configuration from the ANYTDF preset.
```

The output can contain `@plugin "vtdf/theme/plugin"`, `@theme`, or JSON.

### Maintenance

Run from the Monorepo root:

```sh
bun run --filter vtdf-skill generate
bun run --filter vtdf-skill test
```

Process all three component libraries with:

```sh
bun run generate:skills
bun run generate:skills:check
```
