## Introduction

Thank you for using and supporting STDF.

STDF is the Svelte component library in the Any TDF monorepo. The repository also contains the shared foundation, RTDF, VTDF, framework Demos and documentation sites, build tooling, the project generator, the VS Code extension, and offline AI Skills. Contributions to components, documentation, tests, tooling, examples, and translations are welcome.

## Report Issues and Join Discussions

- Search existing [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) and [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions) before opening a new report or proposal.
- Use GitHub Issues for reproducible bugs and concrete feature requests. Use GitHub Discussions for usage questions, larger design proposals, and implementation ideas.
- A bug report should identify the affected package and version, Svelte and browser versions, runtime environment, minimal reproduction, actual result, and expected result. Include screenshots or a recording for visual issues when possible.

## Understand the Repository

| Path                                                | Responsibility                                                                   |
| --------------------------------------------------- | -------------------------------------------------------------------------------- |
| `packages/common`                                   | Framework-neutral state derivation, themes, locales, SVG data, and public types. |
| `packages/stdf`                                     | Svelte rendering, lifecycle, events, bindings, and snippets.                     |
| `packages/rtdf`, `packages/vtdf`                    | Framework-native React and Vue implementations.                                  |
| `apps/stdf-demo`                                    | STDF component Demos, interactions, SSR, and parity validation.                  |
| `apps/stdf-site`                                    | The STDF documentation site.                                                     |
| `apps/site-common`                                  | Shared code for all three sites and the component documentation sources.         |
| `content/stdf/guide`                                | STDF guide content, including this page.                                         |
| `content/stdf/components`                           | Generated site content; do not edit it directly.                                 |
| `packages/create-any-tdf`, `packages/vite-plugin-*` | The project generator and build plugins.                                         |
| `packages/*-motion`, `packages/*-confetti`          | React and Vue motion and confetti packages.                                      |
| `packages/skills`, `extensions`, `scripts`          | Offline AI Skills, the VS Code extension, and repository tooling.                |

Framework-neutral behavior belongs in `packages/common`. Svelte-specific DOM access, lifecycle, events, bindings, and rendering belong in `packages/stdf`. When shared component behavior changes, inspect the STDF, RTDF, and VTDF implementations, Demos, documentation, and parity checks together.

## Local Development

The repository uses Bun Workspaces, Turborepo, Changesets, and one root lockfile. Install Git, Bun 1.3.14 or later, and Node.js 24 or later before starting.

Run installation and task commands from the repository root:

```sh
git clone https://github.com/any-tdf/any-tdf.git
cd any-tdf
bun install --frozen-lockfile
bun run dev:stdf
```

`bun run dev:stdf` starts the STDF documentation site and Demo together:

- Documentation site: `http://localhost:5555`
- Demo: `http://localhost:8888`

Switch the browser developer tools to mobile mode when viewing the Demo. You can also use the [online STDF Demo](https://stackblitz.com/github/any-tdf/any-tdf?startScript=dev%3Astdf).

## Change Code and Documentation

### Components and Demos

- Decide whether the change belongs in `packages/common` or `packages/stdf`, and reuse an existing repository pattern when possible.
- Update the corresponding Demo and validation scripts in `apps/stdf-demo` when observable component behavior changes.
- Shared capabilities should stay aligned across the three frameworks while each package preserves its framework-native API.

### Documentation and Generated Content

- Component documentation sources live in `apps/site-common/docs/component-docs`. Put common content in `shared` and STDF-only content in `targets/stdf`.
- `content/stdf/components` is generated output and must not be edited directly. After changing component documentation, run:

```sh
bun run --filter @any-tdf/site-common docs:generate
bun run docs:check
```

- Guide content lives in `content/stdf/guide`. Keep the Chinese `.md` and English `_en.md` files in sync.
- Run `bun run generate:check` after changing a generator or its inputs, and inspect every generated diff.

### Changesets

Run `bun run changeset` from the repository root when a change affects the behavior, API, dependencies, or package contents of a public npm package. Write the Changeset summary in English and select packages by actual ownership: choose `@any-tdf/common` for shared behavior and `stdf` for Svelte-specific implementation. Site-only, Demo-only, test-only, and repository documentation changes usually do not need a Changeset.

## Validate Changes

Start with the checks closest to the changed scope. A typical STDF component change should run at least:

```sh
bun run --filter stdf check
bun run --filter stdf test
bun run --filter @any-tdf/stdf-demo check
bun run --filter @any-tdf/stdf-demo verify:workspace
bun run --filter @any-tdf/stdf-site check
bun run --filter @any-tdf/stdf-site verify:site
```

Changes to `packages/common` should also run that package's `check` and `test`, followed by every affected framework Demo. Run the relevant workspace's `verify:browser` for browser interactions or layout changes. For broader changes, add `bun run check`, `bun run test`, and `bun run verify` as appropriate before submitting.

## Submit a Pull Request

1. Fork [Any TDF](https://github.com/any-tdf/any-tdf) and create a feature branch from the latest `main` branch.
2. Keep the Pull Request focused on one issue or one closely related change set. Do not include unrelated formatting or generated churn.
3. Update the required tests, Demos, bilingual documentation, and Changeset, then run the checks that match the changed scope.
4. Explain the reason, affected scope, and commands actually run in the Pull Request description. Include screenshots or a recording for visual changes.
5. Link the relevant Issue or Discussion. Maintainers will merge the change after CI and review pass, then handle versions through the release workflow.
