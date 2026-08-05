## AI Skill

### Introduction

STDF provides an AI Skill that follows the open Agent Skills format. It helps coding agents use exact STDF component APIs, Svelte 5 patterns, Tailwind CSS 4 themes, icons, internationalization, and scaffolding conventions. The Skill loads offline references on demand, so an ordinary STDF project does not need the complete Monorepo.

This Skill is an Agent knowledge package, not an application runtime dependency. Do not run `bun add stdf-skill`.

### Repository Information

- Skill name: `stdf`
- Explicit invocation: `$stdf`
- GitHub repository: `https://github.com/any-tdf/any-tdf`
- Skill directory: `packages/skills/stdf-skill/stdf`
- Format: `SKILL.md`, `references/`, `scripts/`, `data/`, and optional `agents/openai.yaml`

The directory name matches `name: stdf` in `SKILL.md`, so Agent Skills-compatible clients can discover it directly.

### Install In Codex

Invoke the built-in installer in Codex:

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill/stdf
```

The installer downloads the complete GitHub subdirectory. Use `$stdf` in the next task. Reload or restart the client if it does not show the newly installed Skill immediately.

### Generic Agent Installation

For clients that support the standard project scope, copy the Skill to `.agents/skills`:

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p your-project/.agents/skills
cp -R any-tdf/packages/skills/stdf-skill/stdf your-project/.agents/skills/
```

Copy it to `~/.agents/skills/` for user-wide reuse. If a client uses another search directory, copy the complete `stdf` directory rather than only `SKILL.md`; otherwise, component references and the theme script will be unavailable.

### Component Documentation Pipeline

Component references are generated from the official documentation source rather than maintained as a separate manual copy:

```text
apps/site-common/docs/component-docs
  -> content/stdf/components
  -> packages/skills/stdf-skill/stdf/references/components
```

Each component detail combines its English guide, API, FAQ, and version documents. The AI reads `references/components.md` first and then loads only the required `references/components/<nav>.md` files. This gives component APIs a traceable source without loading the entire documentation set.

The repository's `generate:skills:check` command compares the generated files. It fails when component documentation changes without a matching Skill regeneration.

### Usage

```text
$stdf Build a Svelte 5 login page with STDF Button, Toast, and Form, and verify every component API.
```

```text
$stdf Generate a random STDF theme and return both the @plugin and @theme blocks.
```

The Skill first checks the installed STDF version and then loads only the relevant references. For component work, it must read each detail file instead of inferring props, events, snippets, or public methods from a component name.

### Theme Generation

The Skill bundles `scripts/generate-theme.mjs` for built-in presets, custom OKLCH colors, and seeded random themes. The AI resolves the script relative to `SKILL.md`; it does not depend on repository paths in the user's project.

```text
$stdf Generate the complete theme configuration from the ANYTDF preset.
```

The output can contain `@plugin "stdf/theme"`, `@theme`, or JSON.

### Maintenance

Run from the Monorepo root:

```sh
bun run --filter stdf-skill generate
bun run --filter stdf-skill test
```

Process all three component libraries with:

```sh
bun run generate:skills
bun run generate:skills:check
```
