---
name: stdf-commit-style
description: "Use when creating, planning, or reviewing git commits in the STDF repository. Follow the repository's scoped commit history style with English subjects like [stdf]Fix Input component, split unrelated changes, and avoid generic Conventional Commits unless preserving external contributor commits."
---

# STDF Commit Style

## Core Rule

Use the STDF repository commit style when committing in this project:

```text
[scope]English commit subject
```

Keep the subject as one line. Use English for the commit subject. Do not add a commit body unless the user asks for details or the change is unusually risky.

## Scope Selection

Choose the narrowest scope from the changed files:

- `[stdf]`: `packages/stdf` component library source, component types, theme, language files, package release changes.
- `[demo]`: `packages/stdf/src/routes` demo pages, example startup commands, demo-only behavior.
- `[doc]`: `docs`, `readme`, `README`, guide text, component documentation, changelog text.
- `[create]`: `packages/create` scaffolding CLI, templates, create package releases.
- `[vscode]`: `packages/vscode-extension` extension code, assets, changelog, extension release changes.
- `[ci]`: `.github`, workflow, release automation, deployment automation.
- `[site]`: documentation site release-only commits.
- `[icon]`: icon plugin package or icon-specific documentation.
- `[md]`: markdown plugin package or markdown-plugin-only documentation.

If one commit changes unrelated scopes, split it. If a small support file change clearly belongs to a feature, keep it with that feature's scope. If no scope is clear, use a plain English subject such as `Update README file`.

## Wording

Use short English action phrases:

- `Fix ...`
- `Add ...`
- `Update ...`
- `Optimize ...`
- `Remove ...`
- `Release ...`
- `Document ...`
- `Change ...`
- `Improve ...`
- `Enhance ...`

Use release wording like:

```text
[stdf]Release 2.0.1
[create]Release 0.3.0
[vscode]Release 1.2.0
```

Use fix wording like:

```text
[stdf]Fix Input component
[demo]Fix demo theme sync in docs site
[doc]Fix NoticeBar version docs
```

Use update wording like:

```text
[doc]Update component docs
[ci]Update STDF release workflow
[create]Update create-stdf to 0.2.11
```

## Formatting Details

- Prefer ASCII square brackets: `[doc]`, not `【doc】`.
- Do not put a space between `]` and the English subject.
- Keep English words and numbers separated by spaces inside the subject, for example `Release 2.0.1` and `Update STDF files`.
- Do not use `feat:`, `fix:`, or `chore:` for normal local commits in this repo.
- Do not mention implementation trivia unless it is the user-facing change.
- Avoid overly long subjects. If the change has several independent effects, split commits instead of writing a long combined subject.

## Commit Workflow

1. Inspect `git status --short` and the relevant diffs.
2. Preserve unrelated user changes. Do not stage files outside the chosen commit group.
3. Group changes by scope and behavior.
4. Generate one STDF-style subject per group.
5. Run the relevant verification command before committing when practical. Use `bun` for package commands.
6. Stage only the intended files and commit with the generated one-line subject.

## Examples By Change

- Component bug fix in `packages/stdf/src/lib/components/timePicker`: `[stdf]Fix TimePicker date column reactive loop`
- Demo route adjustment in `packages/stdf/src/routes/timePicker`: `[demo]Optimize TimePicker demo`
- Documentation text update in `docs/mds/components/timePicker`: `[doc]Update TimePicker docs`
- Create template update in `packages/create/templates`: `[create]Update create-stdf template`
- GitHub Actions change: `[ci]Update release workflow`
