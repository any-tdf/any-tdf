# VTDF Alpha Release Guide

VTDF 0.0.1-alpha.0 is the first alpha prerelease. This release establishes the package layout and public entry points: theme, locale, types, utilities, and UI component capabilities are exported from the `vtdf` package. Application code does not need to install or import `@any-tdf/common` directly.

## Core Changes

- The only public package to install is `vtdf`.
- Components are imported from `vtdf`.
- Theme APIs are imported from `vtdf/theme`.
- Locale APIs are imported from `vtdf/lang`.
- Types are imported from `vtdf/types`.
- Tailwind CSS only needs to scan `vtdf/dist`.
- Direct public usage of shared package paths is no longer supported.

## 1. Install Dependency

```sh
bun add vtdf@0.0.1-alpha.0
```

If your `package.json` lists `@any-tdf/common` directly, remove it. `@any-tdf/common` may still be installed as an internal implementation dependency, but application projects should not depend on it explicitly.

## 2. Update Tailwind CSS Sources

Old syntax:

```css
@source "../node_modules/vtdf/dist";
@source "../node_modules/@any-tdf/common/dist";
```

Current syntax:

```css
@source "../node_modules/vtdf/dist";
```

The VTDF 0.0.1-alpha.0 package output includes the class sources needed by components and shared capabilities, so there is no extra shared package directory to scan.

## 3. Update Theme Plugin Path

If your project still uses the shared theme plugin:

```css
@plugin "@any-tdf/common/theme" {
	name: 'VTDF, Sage, GoldWood';
}
```

Change it to:

```css
@plugin "vtdf/theme" {
	name: 'VTDF, Sage, GoldWood';
}
```

## 4. Update Code Imports

| Old Import              | Current Import |
| ----------------------- | -------------- |
| `@any-tdf/common/theme` | `vtdf/theme`   |
| `@any-tdf/common/lang`  | `vtdf/lang`    |
| `@any-tdf/common/types` | `vtdf/types`   |
| `@any-tdf/common/utils` | `vtdf/utils`   |

Example:

```ts
import { switchMode, switchTheme, themes } from 'vtdf/theme';
import { zh_CN } from 'vtdf/lang';
import type { ThemeOptions } from 'vtdf/theme';
```

Components still come from the main entry:

```vue
<script setup lang="ts">
import { Button, Toast } from 'vtdf';
</script>
```

## 5. Unsupported Compatibility Paths

The following user-side patterns are no longer compatibility targets:

- Importing theme, locale, types, or utilities directly from `@any-tdf/common/*`.
- Scanning `../node_modules/@any-tdf/common/dist` in application CSS.
- Using `@plugin "@any-tdf/common/theme"` in application CSS.
- Depending on internal shared package folders such as `derived`, `svg`, or other implementation paths.

If you previously depended on shared package internals, migrate to the components, theme APIs, locale APIs, types, and utilities exposed by `vtdf`.

## Migration Checklist

- [ ] Install `vtdf@0.0.1-alpha.0`.
- [ ] Remove direct `@any-tdf/common` declarations from project dependencies.
- [ ] Remove `@source "../node_modules/@any-tdf/common/dist";` from CSS.
- [ ] Change the theme plugin to `@plugin "vtdf/theme"`.
- [ ] Replace `@any-tdf/common/*` imports with `vtdf/*` imports.
- [ ] Run the project and verify themes, dark mode, locale behavior, and common components.
