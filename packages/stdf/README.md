# stdf

`stdf` is the Svelte implementation of the Any TDF mobile web component system, built on Tailwind CSS. It provides the shared Any TDF component set through Svelte components, snippets, actions, transitions, themes, locale objects, types, and utilities.

## Install

```sh
bun add stdf svelte tailwindcss
```

`stdf` requires Svelte and Tailwind CSS.

## Usage

Import components directly from the package:

```svelte
<script lang="ts">
	import { Button } from 'stdf';
</script>

<Button fill="solid">STDF</Button>
```

Configure Tailwind CSS with the STDF theme plugin:

```css
@import 'tailwindcss';
@import 'stdf/source.css';

@plugin "stdf/theme" {
	all: true;
}
```

## Public modules

- `stdf`: components, feedback APIs, themes, locales, types, and utilities.
- `stdf/theme`: built-in themes and runtime theme helpers.
- `stdf/theme/plugin`: Tailwind CSS theme plugin.
- `stdf/lang`: built-in locale objects.
- `stdf/types`: public TypeScript types.
- `stdf/utils`: shared component utilities.
- `stdf/source.css`: Tailwind CSS source registration for STDF and `@any-tdf/common`.

## Development

Development is managed from the Any TDF Monorepo root with Bun:

```sh
bun install
bun run dev:stdf
bun run --filter stdf check
bun run --filter stdf test
bun run --filter stdf build
```

## Links

- [Documentation and Demo](https://stdf.dev)
- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/stdf)
- [Issues](https://github.com/any-tdf/any-tdf/issues)

## License

`stdf` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
