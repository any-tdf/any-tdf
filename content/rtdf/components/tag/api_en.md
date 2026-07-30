## Tag Props

| Name     | Type                                                        | Default   | Required | Description                                              |
| -------- | ----------------------------------------------------------- | --------- | -------- | -------------------------------------------------------- |
| text     | `string`                                                    | `''`      | N        | Tag text.                                                |
| state    | `'theme'\|'success'\|'warning'\|'error'\|'info'\|'neutral'` | `'theme'` | N        | State type, neutral uses softer monochrome alpha colors. |
| fill     | `'base'\|'line'\|'light'`                                   | `'base'`  | N        | Fill style.                                              |
| size     | `'xs'\|'sm'\|'md'\|'lg'`                                    | `'md'`    | N        | Size.                                                    |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`   | `'sm'`    | N        | Border radius.                                           |
| mark     | `boolean`                                                   | `false`   | N        | Whether mark style.                                      |
| closable | `boolean`                                                   | `false`   | N        | Whether closable.                                        |
| disabled | `boolean`                                                   | `false`   | N        | Whether disabled.                                        |
| injClass | `string`                                                    | `''`      | N        | Injected CSS class.                                      |

## Tag Events

| Name    | Type         | Parameters | Description                                                               |
| ------- | ------------ | ---------- | ------------------------------------------------------------------------- |
| onClick | `() => void` | -          | Triggered when tag clicked.                                               |
| onclick | `() => void` | -          | Triggered when tag clicked. Lowercase event alias compatible with STDF.   |
| onClose | `() => void` | -          | Triggered when close clicked.                                             |
| onclose | `() => void` | -          | Triggered when close clicked. Lowercase event alias compatible with STDF. |

## Tag Children

| Name     | Type      | Parameters | Description         |
| -------- | --------- | ---------- | ------------------- |
| children | ReactNode | -          | Custom tag content. |
