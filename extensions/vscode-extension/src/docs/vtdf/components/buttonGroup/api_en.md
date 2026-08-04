## ButtonGroup Props

| Name          | Type                                                                          | Default   | Required | Description                                     |
| ------------- | ----------------------------------------------------------------------------- | --------- | -------- | ----------------------------------------------- |
| items         | `ButtonGroupItemProps[]`                                                      | `[]`      | N        | Button items array.                             |
| fill          | `'base'\|'line'\|'lineLight'\|'lineState'\|'text'\|'textState'\|'colorLight'` | `'base'`  | N        | Fill mode.                                      |
| state         | `'theme'\|'success'\|'warning'\|'error'\|'info'`                              | `'theme'` | N        | Status color.                                   |
| radius        | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`                     | `'sm'`    | N        | Border radius style.                            |
| size          | `'full'\|'big'\|'md'\|'sm'\|'auto'`                                           | `'big'`   | N        | Size.                                           |
| border        | `'solid'\|'dashed'\|'dotted'`                                                 | `'solid'` | N        | Border style.                                   |
| dividerHeight | `'full'\|'mid'\|'short'`                                                      | `'mid'`   | N        | Divider height. full(100%)/mid(60%)/short(30%). |
| heightOut     | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'2'`     | N        | Button outer height.                            |
| heightIn      | `'0'\|'1'\|'2'\|'3'\|'4'`                                                     | `'3'`     | N        | Button height.                                  |
| injClass      | `string`                                                                      | `''`      | N        | Inject CSS class name.                          |

## ButtonGroupItemProps

| Name     | Type                                 | Default | Required | Description         |
| -------- | ------------------------------------ | ------- | -------- | ------------------- |
| text     | `string`                             | -       | N        | Button text.        |
| icon     | [`Icon`](/components?nav=icon&tab=1) | `null`  | N        | Icon props.         |
| disabled | `boolean`                            | `false` | N        | Whether to disable. |

## ButtonGroup Events

| Name  | Type                                                  | Parameters                                         | Description                              |
| ----- | ----------------------------------------------------- | -------------------------------------------------- | ---------------------------------------- |
| click | `(index: number, item: ButtonGroupItemProps) => void` | `index` - button index<br />`item` - button config | Triggered when a button item is clicked. |

## ButtonGroup Children

| Name     | Type     | Parameters | Description                                 |
| -------- | -------- | ---------- | ------------------------------------------- |
| children | Vue Slot | -          | Custom content (replaces items array mode). |
