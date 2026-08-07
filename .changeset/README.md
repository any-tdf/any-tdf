# Changeset scope guide

Changesets are the source of stable package versions and dependency updates. Select packages by the actual scope of a change.

Packages whose current version contains `-alpha` use direct prerelease increments and must not be listed in a Changeset. Increment only the alpha counter, run `bun run sync:versions` when `@any-tdf/common` changes, and refresh `bun.lock` with Bun. This repository intentionally avoids global Changesets prerelease mode because stable packages share the same Workspace.

Write every Changeset summary in English so the version pull request remains readable.

- Use `@any-tdf/common` for component state derivation, shared behavior, themes, languages, SVG data, and public types used by STDF, RTDF, and VTDF.
- Use `stdf` only for Svelte rendering, events, snippets, or Svelte-specific package output.
- Use `rtdf` only for React rendering, events, composition, or React-specific package output.
- Use `vtdf` only for Vue rendering, events, slots, or Vue-specific package output.
- Select all affected packages when one feature changes both the shared core and one or more framework adapters.
- Use the motion, confetti, Skill, or CLI package name for changes isolated to those packages.

Do not describe a framework-specific implementation as a common component change. The GitHub Release workflow creates one Release per published package, uses the exact `package-name@version` coordinate for its title and tag, and labels the notes according to these scopes.
