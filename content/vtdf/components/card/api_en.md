## Card Props

| Name        | Type                                                      | Default     | Required | Description                                                      |
| ----------- | --------------------------------------------------------- | ----------- | -------- | ---------------------------------------------------------------- |
| bg          | `'surface'\|'gray'\|'theme'`                              | `'surface'` | N        | Background type: solid/gray transparent/theme transparent.       |
| radius      | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N        | Border radius size, uses CSS variable `--radius-box` by default. |
| shadow      | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'sm'`      | N        | Shadow size.                                                     |
| border      | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'none'`    | N        | Border style.                                                    |
| borderWidth | `'0'\|'1'\|'2'\|'4'`                                      | `'1'`       | N        | Border width (effective when border is not none).                |
| mx          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`       | N        | Horizontal margin.                                               |
| my          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`       | N        | Vertical margin.                                                 |
| p           | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'4'`       | N        | Body padding (effective when px and py are not set).             |
| px          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | -           | N        | Body horizontal padding (overrides p when set).                  |
| py          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | -           | N        | Body vertical padding (overrides p when set).                    |
| overflow    | `boolean`                                                 | `true`      | N        | Whether to clip overflow (maintains rounded corner clip).        |
| headerLine  | `boolean`                                                 | `true`      | N        | Whether to show divider line between header and body.            |
| footerLine  | `boolean`                                                 | `true`      | N        | Whether to show divider line between body and footer.            |
| injClass    | `string`                                                  | `''`        | N        | Injected CSS class for card container, can customize bg.         |
| headerClass | `string`                                                  | `''`        | N        | Injected CSS class for header area.                              |
| bodyClass   | `string`                                                  | `''`        | N        | Injected CSS class for body area.                                |
| footerClass | `string`                                                  | `''`        | N        | Injected CSS class for footer area.                              |

## Card Events

| Name  | Type         | Params | Description                     |
| ----- | ------------ | ------ | ------------------------------- |
| click | `() => void` | -      | Triggered when card is clicked. |

## Card Children

| Name     | Type     | Params | Description          |
| -------- | -------- | ------ | -------------------- |
| header   | Vue Slot | -      | Card header content. |
| children | Vue Slot | -      | Card body content.   |
| footer   | Vue Slot | -      | Card footer content. |
