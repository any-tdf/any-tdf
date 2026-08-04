## Icon Props

| Name     | Type                                             | Default              | Required | Description                                                    |
| -------- | ------------------------------------------------ | -------------------- | -------- | -------------------------------------------------------------- |
| type     | `'iconify'\|'iconify-color'\|'symbol'`           | `'symbol'`           | N        | Icon type.                                                     |
| name     | `string`                                         | `''`                 | N        | Icon name.                                                     |
| size     | `number`                                         | `24`                 | N        | Icon size.                                                     |
| width    | `number`                                         | `0`                  | N        | Icon width.                                                    |
| height   | `number`                                         | `0`                  | N        | Icon height.                                                   |
| state    | `'theme'\|'success'\|'warning'\|'error'\|'info'` | -                    | N        | Icon state color, invalid when type is `iconify-color`.        |
| opacity  | `number`                                         | `1`                  | N        | Icon opacity.                                                  |
| y        | `number`                                         | `0`                  | N        | Vertical offset.                                               |
| injClass | `string`                                         | `''`                 | N        | Injected CSS class name.                                       |
| path     | `string`                                         | `'fonts/symbol.svg'` | N        | Project path for symbol.svg file, valid when type is `symbol`. |

## Icon Snippets

| Name     | Type                                                                | Parameters | Description                                            |
| -------- | ------------------------------------------------------------------- | ---------- | ------------------------------------------------------ |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Custom content, usually Icon component or SVG element. |
