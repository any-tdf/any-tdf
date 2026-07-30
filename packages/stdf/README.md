# stdf

`stdf` is the Svelte implementation of the Any TDF mobile web component system. It provides the shared Any TDF component set through Svelte 5 components, snippets, actions, transitions, themes, locale objects, types, and utilities.

## Install

```sh
bun add stdf@alpha svelte tailwindcss
```

`stdf` requires Svelte 5 and Tailwind CSS v4.

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

@plugin "stdf/theme" {
	all: true;
}
```

## Public modules

- `stdf`: components, feedback APIs, themes, locales, types, and utilities.
- `stdf/theme`: built-in themes and runtime theme helpers.
- `stdf/theme/plugin`: Tailwind CSS v4 theme plugin.
- `stdf/lang`: built-in locale objects.
- `stdf/types`: public TypeScript types.
- `stdf/utils`: shared component utilities.

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
