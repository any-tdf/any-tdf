## Icon Props

| Name      | Type                                             | Default              | Required | Description                                                    |
| --------- | ------------------------------------------------ | -------------------- | -------- | -------------------------------------------------------------- |
| type      | `'iconify'\|'iconify-color'\|'symbol'`           | `'symbol'`           | N        | Icon type.                                                     |
| name      | `string`                                         | `''`                 | N        | Icon name.                                                     |
| size      | `number`                                         | `24`                 | N        | Icon size.                                                     |
| width     | `number`                                         | `0`                  | N        | Icon width.                                                    |
| height    | `number`                                         | `0`                  | N        | Icon height.                                                   |
| state     | `'theme'\|'success'\|'warning'\|'error'\|'info'` | -                    | N        | Icon state color, invalid when type is `iconify-color`.        |
| theme     | `boolean`                                        | `false`              | N        | Whether to use theme color when state is empty.                |
| opacity   | `number`                                         | `1`                  | N        | Icon opacity.                                                  |
| alpha     | `number`                                         | -                    | N        | Alias for icon opacity.                                        |
| y         | `number`                                         | `0`                  | N        | Vertical offset.                                               |
| top       | `number`                                         | -                    | N        | Alias for vertical offset.                                     |
| injClass  | `string`                                         | `''`                 | N        | Injected CSS class name.                                       |
| className | `string`                                         | `''`                 | N        | Standard Vue CSS class name, merged with injClass.             |
| path      | `string`                                         | `'fonts/symbol.svg'` | N        | Project path for symbol.svg file, valid when type is `symbol`. |
| ariaLabel | `string`                                         | -                    | N        | Accessible label for the icon.                                 |

## Icon Children

| Name     | Type     | Parameters | Description                                            |
| -------- | -------- | ---------- | ------------------------------------------------------ |
| children | Vue Slot | -          | Custom content, usually Icon component or SVG element. |

## Icon Events

| Name  | Type         | Parameters | Description             |
| ----- | ------------ | ---------- | ----------------------- |
| click | `() => void` | -          | Triggered when clicked. |
