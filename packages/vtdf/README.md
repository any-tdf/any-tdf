# vtdf

`vtdf` is the Vue implementation of the Any TDF mobile web component system. It maps the shared Any TDF component contracts to Vue 3 components, props, emits, slots, themes, locale objects, types, and utilities.

## Install

```sh
bun add vtdf@alpha vue tailwindcss
```

`vtdf` requires Vue 3.5 or newer and Tailwind CSS v4.

## Usage

```vue
<script setup lang="ts">
import { Button } from 'vtdf';
</script>

<template>
	<Button fill="solid">VTDF</Button>
</template>
```

Configure Tailwind CSS with the VTDF theme plugin:

```css
@import 'tailwindcss';

@plugin "vtdf/theme/plugin" {
	all: true;
}
```

## Public modules

- `vtdf`: components, feedback APIs, themes, locales, types, and utilities.
- `vtdf/components`: component-only exports.
- `vtdf/theme`: built-in themes and runtime theme helpers.
- `vtdf/theme/plugin`: Tailwind CSS v4 theme plugin.
- `vtdf/lang`: built-in locale objects.
- `vtdf/types`: public TypeScript types.
- `vtdf/utils`: shared component utilities.
- `vtdf/style.css`: component styles.

## Development

Development is managed from the Any TDF Monorepo root with Bun:

```sh
bun install
bun run dev:vtdf
bun run --filter vtdf check
bun run --filter vtdf test
bun run --filter vtdf build
```

## Links

- [Documentation and Demo](https://vtdf.dev)
- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/vtdf)
- [Issues](https://github.com/any-tdf/any-tdf/issues)

## License

`vtdf` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
