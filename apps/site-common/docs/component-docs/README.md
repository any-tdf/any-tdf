# Shared Component Docs

This directory is the source of truth for STDF and RTDF component Markdown.

## Layout

- `shared/<component>/<file>.md`: used by both STDF and RTDF.
- `targets/stdf/<component>/<file>.md`: STDF-only override.
- `targets/rtdf/<component>/<file>.md`: RTDF-only override.

Target overrides take precedence over shared files. Generated output is written
back to the existing docs paths:

- `content/stdf/components`
- `content/rtdf/components`
- `content/vtdf/components`

Those existing paths stay stable for the docs sites, VS Code extensions, and AI
Skill packages.

## Commands

Run from `site-common`:

```bash
bun run docs:generate
bun run docs:check
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
