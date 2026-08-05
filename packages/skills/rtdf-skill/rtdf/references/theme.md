# RTDF Theme And Mode

Use this reference for dark mode, multi-theme mode, and runtime switching.

## Dark Mode

RTDF dark mode is driven by `data-mode` on the `html` element. Configure Tailwind CSS 4 with:

```css
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

Switch mode at runtime:

```ts
import { getMode, switchMode } from 'rtdf/theme';

switchMode('primary');
switchMode('dark');

const currentMode = getMode();
```

`switchMode('primary')` means light mode. `switchMode('dark')` means dark mode.

## Multi-Theme Mode

RTDF themes are CSS variables scoped by `[data-theme="<name>"]`. Use the Tailwind CSS 4 plugin from RTDF in entry CSS:

```css
@plugin "rtdf/theme/plugin" {
	name: 'ANYTDF, Nintendo, Ocean, Forest';
}
```

Load all built-in themes:

```css
@plugin "rtdf/theme/plugin" {
	all: true;
}
```

Switch theme at runtime:

```ts
import { getTheme, switchTheme } from 'rtdf/theme';

switchTheme('Nintendo');
const currentTheme = getTheme();
```

The built-in default theme key is currently `ANYTDF`. Use `ANYTDF` in CSS `name` lists and runtime theme switching.

## Custom Theme Plugin Block

In custom themes, `color-primary` and `color-dark` are base colors. The RTDF theme plugin calculates 50, 100, 200, 300, 400, 500, default 600, 700, 800, 900, and 950.

```css
@plugin "rtdf/theme/plugin" {
	name: 'MyTheme';

	color-primary: oklch(0.52 0.24 35);
	color-dark: oklch(0.72 0.18 250);

	color-bg-base: oklch(0.97 0.01 35);
	color-bg-surface: oklch(0.99 0.005 35);
	color-bg-overlay: oklch(0.96 0.005 35);
	color-bg-highlight: oklch(0.98 0.008 35);
	color-bg-base-dark: oklch(0.15 0.01 250);
	color-bg-surface-dark: oklch(0.22 0.008 250);
	color-bg-overlay-dark: oklch(0.19 0.007 250);
	color-bg-highlight-dark: oklch(0.08 0.005 250);

	color-text-primary: oklch(0.15 0.01 35);
	color-text-dark: oklch(0.92 0.03 250);
	color-text-on-primary: oklch(0.88 0.04 35);
	color-text-on-dark: oklch(0.19 0.05 250);

	color-success: oklch(0.65 0.18 155);
	color-warning: oklch(0.72 0.18 45);
	color-error: oklch(0.55 0.24 15);
	color-info: oklch(0.55 0.18 260);

	radius-box: 1.5rem;
	radius-form: 0.5rem;
	radius-small: calc(infinity * 1px);
}
```

Keys in the plugin block do not use the `--` prefix.

## Single-Theme Mode

If the project does not need dynamic theme switching, define variables directly in `@theme`. This mode does not require `data-theme`.

```css
@theme {
	--color-primary: oklch(0.467 0.296 264.886);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-success: oklch(0.704 0.142 167.084);
	--radius-box: 0.75rem;
}
```

## Default Variables In Multi-Theme Mode

When using `@plugin "rtdf/theme/plugin"`, still define a default `@theme` block. Tailwind needs default variables to generate utilities such as `bg-primary` and `text-dark`. The plugin then overrides those variables under `[data-theme="<name>"]`.

Use `scripts/generate-theme.mjs --preset ANYTDF --format both` from the skill root to generate both the plugin block and the default `@theme` block.
