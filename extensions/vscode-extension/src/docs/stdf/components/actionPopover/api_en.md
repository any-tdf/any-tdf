## ActionPopover Props

| Name            | Type                                               | Default                                 | Required | Description                                                                    |
| --------------- | -------------------------------------------------- | --------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| visible         | `boolean`                                          | `false`                                 | N        | Whether to show the action popover.                                            |
| title           | `string`                                           | `''`                                    | N        | Title text.                                                                    |
| titleAlign      | `'left'\|'center'\|'right'`                        | `'center'`                              | N        | Title alignment.                                                               |
| actions         | `Action[]`                                         | `[]`                                    | Y        | Menu options array composed of Action Props.                                   |
| showCancel      | `boolean`                                          | `false`                                 | N        | Whether to show cancel button.                                                 |
| cancelText      | `string`                                           | Current language actionSheet.cancelText | N        | Cancel button text.                                                            |
| actionClosable  | `boolean`                                          | `true`                                  | N        | Whether to close when clicking an option.                                      |
| align           | `'left'\|'center'\|'right'`                        | `'center'`                              | N        | Content alignment.                                                             |
| inverse         | `boolean`                                          | `false`                                 | N        | Whether to enable inverse colors.                                              |
| layout          | `'v'\|'h'\|'grid'\|'ring'`                         | `'v'`                                   | N        | Action layout: v for vertical, h for horizontal, grid for grid, ring for ring. |
| gridColumns     | `2\|3\|4`                                          | `3`                                     | N        | Grid columns, supports 2, 3, 4, only works when layout is grid.                |
| triggerRef      | `HTMLElement\|null`                                | `null`                                  | N        | Trigger element reference.                                                     |
| inlineAlign     | `'left'\|'center'\|'right'`                        | `'center'`                              | N        | Horizontal alignment.                                                          |
| inlineDirection | `'auto'\|'up'\|'down'`                             | `'auto'`                                | N        | Popup direction, auto detects based on trigger element position.               |
| inlineOffset    | `number`                                           | `8`                                     | N        | Gap between popup panel and trigger element.                                   |
| inlineShadow    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`      | `'md'`                                  | N        | Shadow size of popup panel.                                                    |
| inlineRadius    | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|''` | `''`                                    | N        | Border radius of popup panel, empty string for default radius.                 |
| ringActions     | `RingAction[]`                                     | `[]`                                    | N        | Ring layout actions, only works when layout is ring.                           |
| ringRadius      | `number`                                           | `0`                                     | N        | Ring radius, 0 for auto calculation.                                           |
| ringItemSize    | `number`                                           | `44`                                    | N        | Ring action item size (width and height).                                      |
| ringShape       | `'auto'\|'full'\|'half'\|'quarter'`                | `'auto'`                                | N        | Ring shape, auto detects based on action count.                                |

## ActionPopover Events

| Name          | Type                                      | Parameters                                      | Description                                                           |
| ------------- | ----------------------------------------- | ----------------------------------------------- | --------------------------------------------------------------------- |
| onclose       | `() => void`                              | -                                               | Triggered when closing.                                               |
| oncancel      | `() => void`                              | -                                               | Triggered when clicking cancel button.                                |
| onclickAction | `(index: number, action: Action) => void` | index - Click index; action - Click option data | Triggered when clicking an option, even if the option does not close. |

## Action Props

| Name      | Type                                                       | Default    | Required | Description                                                                                          |
| --------- | ---------------------------------------------------------- | ---------- | -------- | ---------------------------------------------------------------------------------------------------- |
| content   | `string`                                                   | `''`       | Y        | Option content.                                                                                      |
| style     | `'normal'\|'theme'\|'success'\|'warning'\|'error'\|'info'` | `'normal'` | N        | Option style, supports normal, theme, success, warning, error, info. theme adapts to light and dark. |
| disabled  | `boolean`                                                  | `false`    | N        | Whether to disable the option, can be used with style.                                               |
| desc      | `string`                                                   | `''`       | N        | Option description.                                                                                  |
| icon      | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `null`     | N        | Option icon, takes priority over image.                                                              |
| showImg   | `boolean`                                                  | `false`    | N        | Whether to show image.                                                                               |
| imgRadius | `'none'\|'sm'\|'full'\|'lg'`                               | `'full'`   | N        | Image border radius.                                                                                 |
| imgSrc    | `string`                                                   | `''`       | N        | Image source URL.                                                                                    |

## RingAction Props

| Name     | Type                                                       | Default    | Required | Description                    |
| -------- | ---------------------------------------------------------- | ---------- | -------- | ------------------------------ |
| icon     | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | -          | Y        | Action item icon.              |
| style    | `'normal'\|'theme'\|'success'\|'warning'\|'error'\|'info'` | `'normal'` | N        | Action item style.             |
| disabled | `boolean`                                                  | `false`    | N        | Whether to disable the action. |
