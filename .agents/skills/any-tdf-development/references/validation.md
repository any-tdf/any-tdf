# Validation Routing

Choose the smallest command set that proves the changed behavior. Run commands from the repository root.

## Scope Matrix

| Changed scope                        | Start with                                                                                    | Expand when needed                                                             |
| ------------------------------------ | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| `packages/common`                    | `bun run --filter @any-tdf/common test` and `bun run --filter @any-tdf/common check`          | Run affected STDF, RTDF, and VTDF Demo parity checks                           |
| `packages/stdf`                      | `bun run --filter stdf check` and `bun run --filter stdf test`                                | `bun run --filter @any-tdf/stdf-demo verify:workspace`                         |
| `packages/rtdf`                      | `bun run --filter rtdf check` and `bun run --filter rtdf test`                                | `bun run --filter @any-tdf/rtdf-demo verify:workspace`                         |
| `packages/vtdf`                      | `bun run --filter vtdf check` and `bun run --filter vtdf test`                                | `bun run --filter @any-tdf/vtdf-demo verify:workspace`                         |
| One framework Demo                   | `bun run --filter @any-tdf/<framework>-demo check` and `verify:workspace`                     | Run its `verify:browser` for interaction or rendering changes                  |
| `apps/site-common` or shared site UI | `bun run --filter @any-tdf/site-common check`, `test`, and `verify:sites`                     | Run `docs:check` for docs and `verify:ui` for cross-site layout behavior       |
| One framework site                   | Run its workspace `check` and `verify:site`                                                   | Run its `verify:browser` for navigation, theme, layout, or interaction changes |
| `apps/any-tdf-site`                  | `bun run --filter @any-tdf/any-tdf-site check` and `build`                                    | Use browser inspection for responsive or interactive behavior                  |
| Component docs source                | `bun run --filter @any-tdf/site-common docs:check`                                            | Run matching site and skill generation checks                                  |
| `packages/create-any-tdf`            | `bun run --filter create-any-tdf verify:templates` and `test`                                 | Run packaging checks for published output changes                              |
| VS Code extension                    | `bun run --filter stdf-vscode-extension test` and `files:check`                               | Run `verify:package` when packaging changes                                    |
| Framework AI skill                   | `bun run --filter <framework>-skill test`                                                     | Regenerate references or theme data before retesting                           |
| Root scripts or release metadata     | Run the nearest `bun test <test-file>` plus `bun run verify:structure` or `verify:references` | Run `bun run publish:npm:check` only for release or package-output risk        |

## Cross-Cutting Checks

- Run `bun run generate:check` after changing a generator or any generator input.
- Run `bun run format:check` and `bun run lint` after broad source changes.
- Run `bun run verify:routes` after changing Demo routes or their generated manifest.
- Run `bun run verify:browser` only for broad or cross-framework browser behavior; it is intentionally expensive.
- Run `bun run check`, `bun run test`, and `bun run verify` for broad changes spanning multiple ownership areas or when preparing a release-quality handoff.

## Reporting

- Never claim a check passed unless it was executed successfully.
- Report the exact command and the first actionable failure.
- If a broad command fails because of an unrelated pre-existing issue, preserve the failure output and verify the changed workspace narrowly.
