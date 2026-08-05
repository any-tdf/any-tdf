# Shared Component Docs

This directory is the source of truth for STDF, RTDF, and VTDF component Markdown.

## Layout

- `shared/<component>/<file>.md`: used by STDF, RTDF, and VTDF unless a target override exists.
- `targets/stdf/<component>/<file>.md`: STDF-only override.
- `targets/rtdf/<component>/<file>.md`: RTDF-only override.
- `targets/vtdf/<component>/<file>.md`: VTDF-only override.

Target overrides take precedence over shared files. Generated output is written
back to the existing docs paths:

- `content/stdf/components`
- `content/rtdf/components`
- `content/vtdf/components`

Those existing paths stay stable for the docs sites, VS Code extensions, and AI
Skill packages.

## AI Skill Pipeline

The framework Skill bundles are generated from the English component outputs:

```text
apps/site-common/docs/component-docs
  -> content/<framework>/components
  -> packages/skills/<framework>-skill/<framework>/references/components
```

Each component detail bundles `guide_en.md`, `api_en.md`, `FAQ_en.md`, and
`version_en.md`. Keep edits in this source directory, generate the target docs,
and then regenerate the Skill bundles. Do not edit generated Skill component
files directly.

## Commands

Run from `site-common`:

```bash
bun run docs:generate
bun run docs:check
```

Run the complete Skill generation or freshness check from the repository root:

```bash
bun run generate:skills
bun run generate:skills:check
```

Use `bun run docs:init -- --force` only when rebuilding this source directory
from the current generated STDF and RTDF docs.

## Template Syntax

Markdown files may use target variables:

```md
Import from `{{packageName}}`.
Open {{siteUrl}}.
```

Target-only blocks are also supported:

```md
<!-- @if target=stdf -->

Svelte-only content.

<!-- @endif -->
<!-- @if target=rtdf -->

React-only content.

<!-- @endif -->
```
