# STDF 2.x to 3.x Migration Guide

This guide compares `2.0.2` with the current `3.0.0-alpha.2` release and covers the changes required in an existing STDF application.

STDF 3.x moves framework-neutral themes, locales, types, utilities, SVG data, and component logic into an internal shared layer. Applications still depend only on `stdf`. Pay particular attention to these three migration items:

1. Register Tailwind CSS sources through `stdf/source.css`.
2. Rename the built-in default theme from `STDF` to `ANYTDF`.
3. Update the `LangProps` shape of full custom locales.

STDF 2.x already requires Svelte 5 and Tailwind CSS 4, so upgrading from 2.x does not require another Svelte or Tailwind CSS migration solely for STDF. Existing component names, events, snippets, and most props remain compatible.

## 1. Upgrade the Dependency

While 3.x is in alpha, install it through the `alpha` tag:

```sh
bun add stdf@alpha
```

After the stable release, use:

```sh
bun add stdf@^3
```

`@any-tdf/common` is an internal dependency of STDF 3.x. Applications do not need to install or import it directly, and should not pin its version in `package.json`.

If your project explicitly installed the package while following an early 3.x alpha example, remove that direct dependency:

```sh
bun remove @any-tdf/common
```

## 2. Update the Tailwind CSS Source Entry

This project configuration change is required after the upgrade.

### 2.x

```css
@import 'tailwindcss';

@source '../node_modules/stdf/**/*.svelte';
```

### 3.x

```css
@import 'tailwindcss';
@import 'stdf/source.css';
```

`stdf/source.css` registers both the STDF component output and its internal shared output. Tailwind CSS can then detect classes from both packages and will not drop required styles from production builds.

Replace these STDF-specific sources as well if they appear in your project:

```css
@source '../node_modules/stdf/dist';
@source '../node_modules/@any-tdf/common/dist';
```

Your application's own `@source` configuration is unaffected. Remove only manual paths that point to STDF or `@any-tdf/common`.

## 3. Rename the Default Theme to ANYTDF

3.x renames the first built-in theme from `STDF` to `ANYTDF`. Its colors stay the same, but the name affects theme plugin options, `data-theme`, runtime values, and persisted user settings.

### Theme Plugin

2.x:

```css
@plugin "stdf/theme" {
	name: 'STDF, Sage, GoldWood';
}
```

3.x:

```css
@plugin "stdf/theme" {
	name: 'ANYTDF, Sage, GoldWood';
}
```

### Runtime and HTML

2.x:

```ts
switchTheme('STDF');
```

```html
<html data-theme="STDF"></html>
```

3.x:

```ts
switchTheme('ANYTDF');
```

```html
<html data-theme="ANYTDF"></html>
```

Migrate the old value if your project stores theme names in `localStorage`, a server-side user preference, or a URL parameter:

```ts
import { switchTheme } from 'stdf/theme';

const savedTheme = localStorage.getItem('theme_color');
const theme = savedTheme === 'STDF' ? 'ANYTDF' : (savedTheme ?? 'ANYTDF');

localStorage.setItem('theme_color', theme);
switchTheme(theme);
```

Other built-in theme names and custom theme names are unchanged. The public theme import remains the same:

```ts
import { getMode, getTheme, switchMode, switchTheme, themes } from 'stdf/theme';
```

In 3.x, `switchTheme` can also receive a `ThemeConfig` or `ThemeProps` object directly. Existing string calls remain supported.

## 4. Manage Global Configuration with ConfigProvider

3.x adds `ConfigProvider` to configure the locale and built-in component icon library in one place. The previous `setContext('STDF_lang', locale)` approach remains compatible, but new applications and applications that want a single global configuration entry should prefer `ConfigProvider`.

### 2.x

```svelte
<script lang="ts">
	import { setContext } from 'svelte';
	import { Feedback, setFeedbackLang } from 'stdf';
	import { en_US } from 'stdf/lang';

	setContext('STDF_lang', en_US);
	setFeedbackLang(en_US);
</script>

<slot />
<Feedback />
```

### 3.x

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ConfigProvider, Feedback } from 'stdf';
	import { en_US } from 'stdf/lang';

	let { children }: { children: Snippet } = $props();
</script>

<ConfigProvider locale={en_US} builtInIconLibrary="remix">
	{@render children()}
	<Feedback />
</ConfigProvider>
```

`ConfigProvider` synchronizes the locale used by the functional feedback API, so a separate `setFeedbackLang` call is unnecessary.

Applications that call `toast`, `showAlert`, `dialog`, `modal`, or `loading` must still mount exactly one `<Feedback />`. `ConfigProvider` supplies configuration; it does not replace the feedback container.

Locale configuration still follows Svelte Context initialization semantics. After changing `locale` at runtime, already-mounted regular components must be remounted or the page refreshed. The functional feedback API locale is synchronized by `ConfigProvider`.

## 5. Update Full Custom Locales

Built-in locales are still imported from `stdf/lang`. No change is required when using `zh_CN`, `en_US`, or another built-in object directly:

```ts
import { en_US, zh_CN } from 'stdf/lang';
```

If your project maintains a complete custom `LangProps` object, update these fields:

| Change          | Field                                                 | Description                                              |
| --------------- | ----------------------------------------------------- | -------------------------------------------------------- |
| Removed         | `common.slotEmpty`                                    | No longer part of common locale configuration.           |
| Removed         | `common.loading`                                      | Loading copy is now owned by the relevant component.     |
| Removed         | `common.noMoreData`                                   | End-of-data copy is now owned by the relevant component. |
| Added, required | `signature.clearText`, `signature.confirmText`        | Signature action labels.                                 |
| Added, required | `imagePreview.loadFailedText`                         | ImagePreview load failure text.                          |
| Added, required | `imageList.uploadFailedText`, `imageList.pendingText` | ImageList status text.                                   |
| Added, optional | `pullRefresh.*`                                       | PullRefresh state text.                                  |
| Added, optional | `infiniteScroll.*`                                    | InfiniteScroll state text.                               |

In 3.x, `common` contains only:

```ts
common: {
	noData: string;
	done: string;
}
```

Prefer extending a current built-in locale and overriding only the fields you customize. This makes future locale additions easier to adopt:

```ts
import { en_US, type LangProps } from 'stdf/lang';

export const locale: LangProps = {
	...en_US,
	common: {
		...en_US.common,
		noData: 'Nothing here yet'
	},
	signature: {
		clearText: 'Clear',
		confirmText: 'Save'
	},
	imagePreview: {
		loadFailedText: 'Image failed to load'
	},
	imageList: {
		uploadFailedText: 'Image upload failed',
		pendingText: 'Waiting to upload'
	},
	pullRefresh: {
		pullingText: 'Pull to refresh',
		canReleaseText: 'Release to refresh',
		refreshingText: 'Refreshing…',
		successText: 'Refresh complete'
	},
	infiniteScroll: {
		loadingText: 'Loading…',
		finishedText: 'No more items',
		errorText: 'Load failed. Click to retry.'
	}
};
```

## 6. Built-in Component Icon Libraries

3.x unifies internal component SVGs and provides six built-in icon libraries: `remix`, `lucide`, `phosphor`, `tabler`, `iconoir`, and `reicon`. The default is `remix`, so no configuration is required to retain the familiar style.

Switch the library through `ConfigProvider` when needed:

```svelte
<ConfigProvider builtInIconLibrary="lucide">
	<App />
</ConfigProvider>
```

Import the library list, labels, and types from the new `stdf/svg` entry:

```ts
import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from 'stdf/svg';
```

This setting affects only icons rendered internally by STDF components. Existing `<Icon type="symbol">`, `<Icon type="iconify">`, `path` settings, and SVG Symbol assets in application code do not need to change.

## 7. Public Imports and Component APIs

The public 2.x import paths remain valid in 3.x:

| Purpose                            | Import            | Change Required      |
| ---------------------------------- | ----------------- | -------------------- |
| Components and functional feedback | `stdf`            | No                   |
| Themes                             | `stdf/theme`      | No                   |
| Locales                            | `stdf/lang`       | No                   |
| Types                              | `stdf/types`      | No                   |
| Utilities                          | `stdf/utils`      | No                   |
| Tailwind CSS sources               | `stdf/source.css` | New in 3.x; required |
| Built-in SVG data                  | `stdf/svg`        | New in 3.x; optional |

Do not import application APIs from `@any-tdf/common/*`. It is an internal implementation package, not the public STDF application entry.

A comparison of the public component types in `2.0.2` and the current 3.x release found no existing props that require a bulk rename. These compatibility changes only relax requirements and do not require edits to existing code:

- `IndexBar` now makes `data` and `height` optional.
- `NoticeBar` now makes `textList` optional.
- `Pagination` now makes `total` optional.
- The shared `AnimationEasingProps` type is new, while `SvelteEasingProps` remains available.

3.x also adds these component capabilities:

- `ConfigProvider`: provides the locale and built-in component icon library.
- [PullRefresh](/components?nav=pullRefresh&tab=0): pull-to-refresh behavior.
- [InfiniteScroll](/components?nav=infiniteScroll&tab=0): infinite loading and retry behavior.

Although the public props are broadly compatible, 3.x refactors component internals. Recheck any CSS selectors or tests that depend on a component's private DOM hierarchy, internal classes, or full HTML snapshots. Customization through public props, snippets, and `injClass` usually requires no changes.

## 8. Update Scaffolding Commands

`create-stdf` has been consolidated into `create-any-tdf`. This does not affect an existing application's runtime, but old commands in READMEs, team documentation, or initialization scripts should be updated.

2.x:

```sh
bun create stdf@latest
```

3.x:

```sh
bun create any-tdf@alpha stdf-app -f svelte
```

Do not rerun the scaffold to upgrade an existing application. Apply the migration steps in this guide to the current project instead.

## Migration Checklist

- [ ] Upgrade `stdf` to 3.x while keeping Svelte 5 and Tailwind CSS 4.
- [ ] Import `stdf/source.css` in the entry CSS and remove STDF-specific manual `@source` paths.
- [ ] Rename the built-in `STDF` theme to `ANYTDF`.
- [ ] Migrate persisted `STDF` values in `localStorage`, server-side settings, or URLs.
- [ ] Update `LangProps` fields when using a full custom locale.
- [ ] Adopt `ConfigProvider` for the locale and built-in icon library when useful.
- [ ] Keep exactly one `<Feedback />` mounted when using functional feedback APIs.
- [ ] Recheck styles and tests that depend on private component DOM or classes.
- [ ] Run the application's type check, production build, and critical-page regression tests.

Related documentation: [Quick Start](/guide), [Theme](/guide/theme), [Internationalization](/guide/internation), [Icon](/guide/icon), and [Functional Feedback](/guide/feedback).
