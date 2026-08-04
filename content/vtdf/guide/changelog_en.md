## 0.0.1-alpha.1 <font size=1>2026-08-04</font>

- Reduce npm package output by removing source maps, localized README files, and nonessential files.
- Keep shared SVG icon data embedded in common without bundling the four icon sets used only by the demo.
- Consolidate the release build pipeline and expand packaging and standalone installation checks.

## 0.0.1-alpha.0 <font size=1>2026-07-27</font>

- First VTDF alpha release, based on Vue 3.5 and Tailwind CSS v4.
- Provides 61 mobile components aligned with the STDF public API, themes, locales, and demo routes.
- Bundles shared runtime code so applications do not need to install `@any-tdf/common` directly.
- Adds SSR, bilingual demo, browser interaction, and package export verification.
