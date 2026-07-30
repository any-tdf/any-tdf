# VTDF Icons

Use this reference for the VTDF `Icon` component and icon asset setup.

## SVG Symbol Mode

The default `Icon` type is `symbol`. It uses SVG symbol sprites to reduce HTTP requests and allow CSS control over size and color.

Use SVG symbol mode for small, mostly single-color SVG icons. Avoid using it for large or complex multi-color illustrations.

VTDF provides `@any-tdf/vite-plugin-svg-symbol` to merge SVG folders into symbol files.

```sh
bun add @any-tdf/vite-plugin-svg-symbol -D
```

Vite example:

```ts
import svgSymbol from '@any-tdf/vite-plugin-svg-symbol';
import tailwindcss from '@tailwindcss/vite';
import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite-plus';

export default defineConfig({
	plugins: [vue(), tailwindcss(), svgSymbol([{ inFile: 'src/lib/svgs', outFile: 'public/symbols', fileName: 'symbol' }])]
});
```

If multiple symbol files are generated, pass the matching path to the VTDF `Icon` component or provide a global path through `ConfigProvider`.

## Iconify Mode

VTDF also supports `type="iconify"` and `type="iconify-color"`.

Install the Tailwind CSS 4 Iconify plugin and only the icon sets needed by the project:

```sh
bun add @iconify/tailwind4 -D
bun add @iconify-json/solar -D
bun add @iconify-json/carbon -D
```

Configure entry CSS:

```css
@plugin "@iconify/tailwind4" {
	prefixes: solar, carbon;
}
```

Use with VTDF:

```vue
<script setup lang="ts">
import { Icon } from 'vtdf';
</script>

<template>
	<Icon type="iconify" name="solar--cat-broken" />
</template>
```

Use `iconify` for single-color mask icons whose color should follow text color. Use `iconify-color` for multi-color icons where text color and theme color should not override the icon.

## Built-In Component Icons

Some VTDF components use built-in SVG icons internally. The default built-in icon library is `remix`; `lucide`, `phosphor`, `tabler`, `iconoir`, and `reicon` are also supported. Configure `builtInIconLibrary` on `ConfigProvider` when a project needs a different built-in icon set.

## Selection Guide

- Use direct SVG files only for large, complex, or standalone images.
- Use SVG symbol sprites for local small icons that should share size and color behavior.
- Use Iconify when the project needs broad icon libraries.
- Combining SVG symbol sprites and Iconify in one VTDF project is valid.
