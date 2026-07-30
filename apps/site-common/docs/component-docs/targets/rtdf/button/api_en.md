## Button Props

| Name            | Type                                                                          | Default   | Required | Description                                                                                     |
| --------------- | ----------------------------------------------------------------------------- | --------- | -------- | ----------------------------------------------------------------------------------------------- |
| fill            | `'base'\|'line'\|'lineLight'\|'lineState'\|'text'\|'textState'\|'colorLight'` | `'base'`  | N        | Fill mode. base/lineState/textState/colorLight follow state, line/lineLight/text are colorless. |
| state           | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N        | Status color, theme means following theme color.                                                |
| radius          | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                     | `'sm'`    | N        | Border radius style.                                                                            |
| size            | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N        | Size.                                                                                           |
| border          | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N        | Border style.                                                                                   |
| line            | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N        | Alias for border style.                                                                         |
| heightOut       | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N        | Button outer height.                                                                            |
| heightIn        | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N        | Button height.                                                                                  |
| injClass        | `string`                                                                      | `''`      | N        | Inject CSS class name.                                                                          |
| love            | `boolean`                                                                     | `false`   | N        | Whether to enable care version.                                                                 |
| group           | `boolean`                                                                     | `false`   | N        | Whether used inside ButtonGroup, disabling default click opacity feedback.                      |
| disabled        | `boolean`                                                                     | `false`   | N        | Whether to disable.                                                                             |
| customSize      | `boolean`                                                                     | `false`   | N        | Whether to use custom size.                                                                     |
| customWidth     | `number`                                                                      | `0`       | N        | Custom width.                                                                                   |
| customHeight    | `number`                                                                      | `0`       | N        | Custom height.                                                                                  |
| icon            | [`Icon`](/components?nav=icon&tab=1)\|`null`                                  | `null`    | N        | Icon props.                                                                                     |
| iconPosition    | `'left'\|'right'`                                                             | `'left'`  | N        | Icon position.                                                                                  |
| loading         | [`Loading`](/components?nav=loading&tab=1)\|`null`                            | `null`    | N        | Loading props.                                                                                  |
| disabledLoading | `boolean`                                                                     | `false`   | N        | Whether to disable when loading.                                                                |
| type            | `'button'\|'reset'\|'submit'`                                                 | `button`  | N        | The default behavior of the button.                                                             |

## Button Events

| Name    | Type         | Parameters | Description                                                     |
| ------- | ------------ | ---------- | --------------------------------------------------------------- |
| onClick | `() => void` | -          | Triggered on click.                                             |
| onclick | `() => void` | -          | Triggered on click. Lowercase event alias compatible with STDF. |

## Button Children

| Name     | Type      | Parameters | Description     |
| -------- | --------- | ---------- | --------------- |
| children | ReactNode | -          | Button content. |
