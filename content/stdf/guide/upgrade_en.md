# STDF v2 to v3 Upgrade Guide

STDF 3.0.0-alpha.0 is the alpha version of a breaking release. This version changes the package layout and public entry points: theme, locale, types, utilities, and UI component capabilities are exported from the `stdf` package. Application code does not need to install or import `@any-tdf/common` directly.

## Core Changes

- The only public package to install is `stdf`.
- Components are imported from `stdf`.
- Theme APIs are imported from `stdf/theme`.
- Locale APIs are imported from `stdf/lang`.
- Types are imported from `stdf/types`.
- Tailwind CSS only needs to scan `stdf/dist`.
- Direct public usage of shared package paths is no longer supported.

## 1. Upgrade Dependency

```sh
bun add stdf@3.0.0-alpha.0
```

If your `package.json` lists `@any-tdf/common` directly, remove it. `@any-tdf/common` may still be installed as an internal implementation dependency, but application projects should not depend on it explicitly.

## 2. Update Tailwind CSS Sources

Old syntax:

```css
@source "../node_modules/stdf/dist";
@source "../node_modules/@any-tdf/common/dist";
```

v3 syntax:

```css
@source "../node_modules/stdf/dist";
```

The STDF 3.0.0-alpha.0 package output includes the class sources needed by components and shared capabilities, so there is no extra shared package directory to scan.

## 3. Update Theme Plugin Path

If your project still uses the shared theme plugin:

```css
@plugin "@any-tdf/common/theme" {
	name: 'STDF, Sage, GoldWood';
}
```

Change it to:

```css
@plugin "stdf/theme" {
	name: 'STDF, Sage, GoldWood';
}
```

## 4. Update Code Imports

| Old Import              | v3 Import    |
| ----------------------- | ------------ |
| `@any-tdf/common/theme` | `stdf/theme` |
| `@any-tdf/common/lang`  | `stdf/lang`  |
| `@any-tdf/common/types` | `stdf/types` |
| `@any-tdf/common/utils` | `stdf/utils` |

Example:

```ts
import { switchMode, switchTheme, themes } from 'stdf/theme';
import { zh_CN } from 'stdf/lang';
import type { ThemeOptions } from 'stdf/theme';
```

Components still come from the main entry:

```svelte
<script lang="ts">
	import { Button, Toast } from 'stdf';
</script>
```

## 5. Unsupported Compatibility Paths

The following user-side patterns are no longer compatibility targets:

- Importing theme, locale, types, or utilities directly from `@any-tdf/common/*`.
- Scanning `../node_modules/@any-tdf/common/dist` in application CSS.
- Using `@plugin "@any-tdf/common/theme"` in application CSS.
- Depending on internal shared package folders such as `derived`, `svg`, or other implementation paths.

If you previously depended on shared package internals, migrate to the components, theme APIs, locale APIs, types, and utilities exposed by `stdf`.

## Migration Checklist

- [ ] Upgrade `stdf` to `^3.0.0`.
- [ ] Remove direct `@any-tdf/common` declarations from project dependencies.
- [ ] Remove `@source "../node_modules/@any-tdf/common/dist";` from CSS.
- [ ] Change the theme plugin to `@plugin "stdf/theme"`.
- [ ] Replace `@any-tdf/common/*` imports with `stdf/*` imports.
- [ ] Run the project and verify themes, dark mode, locale behavior, and common components.
