---
name: any-tdf-development
description: Guide implementation, fixes, reviews, documentation, generation, and validation in the Any TDF monorepo across the shared core, STDF/Svelte, RTDF/React, VTDF/Vue, demos, sites, tooling, AI skill bundles, and the VS Code extension. Use for any development task inside this repository, especially cross-framework parity changes, generated files, package boundaries, or choosing efficient verification commands. Trigger explicitly with $any-tdf-development.
---

# Any TDF Development

Apply repository-specific ownership, generation, and validation rules without repeatedly rediscovering the monorepo.

## Start Every Task

1. Work from the repository root and use `bun` for package and script commands.
2. Run `git status --short` before editing and preserve unrelated user changes.
3. Locate the nearest implementation, test, Demo, documentation, and package manifest with `rg` or `rg --files`.
4. Read [references/repository-map.md](references/repository-map.md) when a change crosses workspaces or touches generated content.
5. Read [references/validation.md](references/validation.md) before choosing verification commands.

## Respect Ownership Boundaries

- Put framework-neutral state derivation, pure helpers, themes, locales, shared SVG data, and public shared types in `packages/common`.
- Keep DOM access, lifecycle, events, bindings, slots, children, hooks, and framework rendering inside `packages/stdf`, `packages/rtdf`, or `packages/vtdf`.
- Inspect the matching STDF, RTDF, and VTDF implementations before changing shared component behavior. Preserve framework-native APIs while keeping public capability and behavior aligned.
- Update the matching Demo, documentation, parity checks, SSR checks, and interaction tests when observable component behavior changes.
- Keep Tailwind CSS v4 values in public CSS variables or shared CSS. Do not introduce arbitrary size or color classes.
- Prefer arrow functions and `async`/`await`. Do not add defensive fallbacks for fields whose API contract already defines them.
- Keep Chinese text valid UTF-8, use Chinese punctuation in Chinese sentences, and place one space between Chinese and English words or numbers.

## Edit Sources, Then Regenerate

- Never edit a file marked `@generated` or `Do not edit directly`.
- Edit component documentation under `apps/site-common/docs/component-docs`, then generate `content/{stdf,rtdf,vtdf}/components`.
- Generate the VTDF Demo route manifest with `bun run scripts/generate-vtdf.mjs`.
- Synchronize package-version fallbacks with `bun run sync:versions`; never hand-edit generated version files.
- Build `@any-tdf/site-common` before regenerating VS Code menu data.
- Regenerate framework AI skill component references and theme data with their package-local scripts when their source data changes.
- Inspect generated diffs before keeping them. Do not mix unrelated generated churn into the task.

## Implement in Small Slices

1. Identify the owning source and its nearest tests.
2. Search for an existing equivalent before introducing a new pattern.
3. Implement the smallest coherent change in the owning layer.
4. Propagate only the required framework, Demo, site, documentation, and generated updates.
5. Run narrow validation first, then expand only when the dependency surface or risk requires it.
6. Review `git diff` and `git status --short` before reporting completion.

## Handle Public Package Changes

- Add a Changeset for a publishable package behavior, API, dependency, or package-content change unless the user explicitly excludes release metadata.
- Write Changeset summaries in English and select packages by actual ownership. Use `@any-tdf/common` for shared behavior and a framework package only for framework-specific rendering or APIs.
- Keep fixed version groups aligned. Do not edit versions or `bun.lock` manually.
- Do not publish, release, deploy, or push unless the user explicitly requests that external action.

## Report Clearly

- State which ownership layer changed and whether parity work was required.
- List generated outputs separately from hand-edited sources.
- Report only commands that actually ran, including failures or skipped high-cost checks.
