# RTDF

React mobile web component library based on Tailwind CSS and the any-tdf design system.

RTDF follows the STDF component design and API shape as closely as React allows. Framework-specific Svelte features, such as Svelte transition functions and snippets, are mapped to React props, React nodes, render functions, and Provider-based configuration.

## Install

```bash
bun add rtdf@0.0.1-alpha.0 react react-dom tailwindcss
```

The published package exports theme, locale, types, utilities, and UI components from `rtdf`.

## Usage

Import the component styles once in your app entry.

```tsx
import 'rtdf/style.css';
```

Use components from the root entry or the `components` subpath.

```tsx
import { Button, ConfigProvider } from 'rtdf';
import { en_US } from 'rtdf/lang';

const App = () => (
	<ConfigProvider locale={en_US} theme="ANYTDF" mode="primary">
		<Button fill="solid">RTDF</Button>
	</ConfigProvider>
);
```

```tsx
import { Button } from 'rtdf/components';
```

## Theme

RTDF exposes the Tailwind CSS theme plugin through `rtdf/theme`.

```css
@import 'tailwindcss';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));

@plugin "rtdf/theme" {
	all: true;
}
```

Switch theme and light or dark mode at runtime.

```ts
import { switchMode, switchTheme } from 'rtdf/theme';

switchTheme('ANYTDF');
switchMode('dark');
```

`ConfigProvider` calls the same theme and mode APIs when `theme` or `mode` changes.

## Locale

React does not use Svelte context, so RTDF exposes locale through `ConfigProvider`.

```tsx
import { ConfigProvider } from 'rtdf';
import { zh_CN } from 'rtdf/lang';

const App = () => <ConfigProvider locale={zh_CN}>{/* app */}</ConfigProvider>;
```

## Exports

- `rtdf`: all public components, feedback APIs, theme, locale, and types.
- `rtdf/components`: component-only entry.
- `rtdf/types`: public TypeScript types.
- `rtdf/theme`: theme plugin, built-in themes, and runtime theme helpers.
- `rtdf/theme/plugin`: Tailwind CSS plugin subpath.
- `rtdf/lang`: built-in locale objects.
- `rtdf/utils`: shared utility functions.
- `rtdf/style.css`: global component styles and Tailwind CSS theme declarations.

## Development

```bash
bun install
bun run dev
bun run build
bun run build:lib
```

Component mode scripts are generated for every menu component, for example:

```bash
bun run button
bun run button_en
```
