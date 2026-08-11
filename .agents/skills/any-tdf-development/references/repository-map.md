# Repository Map

Use this map to find the owning source before editing related copies.

## Ownership

| Area                           | Owning paths                                                                          | Required companions                                                   |
| ------------------------------ | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------- |
| Shared component behavior      | `packages/common/src/derived`, `packages/common/src/types`, `packages/common/src/svg` | Common tests plus all affected framework adapters and Demos           |
| Themes and locales             | `packages/common/src/theme`, `packages/common/src/lang`                               | Framework exports, site theme behavior, skill theme data when changed |
| Svelte library                 | `packages/stdf/src/lib`                                                               | `apps/stdf-demo`, STDF docs, package tests                            |
| React library                  | `packages/rtdf/src/lib`                                                               | `apps/rtdf-demo`, RTDF docs, package tests                            |
| Vue library                    | `packages/vtdf/src/lib`                                                               | `apps/vtdf-demo`, VTDF docs, package tests                            |
| Shared site behavior           | `apps/site-common/src`, `apps/site-common/assets`                                     | Three framework sites and shared parity checks                        |
| Framework sites                | `apps/stdf-site`, `apps/rtdf-site`, `apps/vtdf-site`                                  | Matching site verification and browser scenarios                      |
| Framework Demos                | `apps/stdf-demo`, `apps/rtdf-demo`, `apps/vtdf-demo`                                  | Matching parity, SSR, route, and browser checks                       |
| Project portal                 | `apps/any-tdf-site`                                                                   | Portal `check`, build, and responsive interaction coverage            |
| Component documentation source | `apps/site-common/docs/component-docs`                                                | Generated `content/{stdf,rtdf,vtdf}/components`                       |
| Guide content                  | `content/{stdf,rtdf,vtdf}/guide`                                                      | Matching framework site routes and navigation                         |
| Project generator              | `packages/create-any-tdf`                                                             | Template verification and generated version fallback                  |
| Build plugins                  | `packages/vite-plugin-md-ts`, `packages/vite-plugin-svg-symbol`                       | Package-local tests and packaging checks                              |
| Motion and confetti            | `packages/{react,vue}-{motion,confetti}`                                              | Paired-package parity and fixed version groups                        |
| VS Code extension              | `extensions/vscode-extension`                                                         | Generated API docs and menu data from content/site-common             |
| Framework AI skills            | `packages/skills/{stdf,rtdf,vtdf}-skill`                                              | Generated component references, theme data, and package validation    |
| Repository automation          | `scripts`, `.github/workflows`, `.changeset`                                          | Root automation tests and structural checks                           |

## Generated Outputs

- Generate component docs from `apps/site-common/docs/component-docs` with:

  ```sh
  bun run --filter @any-tdf/site-common docs:generate
  ```

- Generate `apps/vtdf-demo/src/componentRoutes.ts` with:

  ```sh
  bun run scripts/generate-vtdf.mjs
  ```

- Generate `packages/create-any-tdf/src/generatedVersions.js` with:

  ```sh
  bun run sync:versions
  ```

- Generate VS Code menu data after building site-common with:

  ```sh
  bun run --filter @any-tdf/site-common build
  bun run --filter stdf-vscode-extension menu
  ```

- VS Code API docs use `content/{stdf,rtdf,vtdf}/components` as their source and are staged under the extension only during packaging. Do not commit or maintain `extensions/vscode-extension/src/docs`.

- Generate a framework skill bundle with its workspace scripts:

  ```sh
  bun run --filter stdf-skill generate:components
  bun run --filter stdf-skill generate:themes
  ```

  Replace `stdf-skill` with `rtdf-skill` or `vtdf-skill` as needed.

- Use `bun run generate` only when the task requires the complete root generation pipeline. Inspect every resulting file before keeping it.
