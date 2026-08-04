# RTDF

React mobile web component library based on Tailwind CSS and the any-tdf design system.

RTDF follows the STDF component design and API shape as closely as React allows. Framework-specific Svelte features, such as Svelte transition functions and snippets, are mapped to React props, React nodes, render functions, and Provider-based configuration.

## Install

```bash
bun add rtdf react react-dom tailwindcss
```

`rtdf` supports React. Tailwind CSS is an optional peer when the packaged stylesheet is sufficient, and is required when using the theme plugin in an application stylesheet. `@any-tdf/common` is installed automatically as a runtime dependency.

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
- `rtdf/style.css`: global component styles, Tailwind CSS theme declarations, and source registration for `@any-tdf/common`.
- `rtdf/source.css`: Tailwind CSS source registration for RTDF and its transitive `@any-tdf/common` dependency.

## Development

Development is managed from the Any TDF Monorepo root with Bun:

```sh
bun install
bun run dev:rtdf
bun run --filter rtdf check
bun run --filter rtdf test
bun run --filter rtdf build
```

## Links

- [Documentation and Demo](https://rtdf.dev)
- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/rtdf)
- [Issues](https://github.com/any-tdf/any-tdf/issues)

## License

`rtdf` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
