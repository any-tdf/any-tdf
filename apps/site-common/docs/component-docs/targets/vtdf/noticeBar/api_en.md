## NoticeBar Props

| Name      | Type                                                      | Default    | Required | Description                                   |
| --------- | --------------------------------------------------------- | ---------- | -------- | --------------------------------------------- |
| textList  | `string[]`                                                | `[]`       | Y        | Array of announcement contents.               |
| leftIcon  | `'volume'\|null`\|[`Icon`](/components?nav=icon&tab=0)    | `'volume'` | N        | Left content.                                 |
| rightIcon | `'close'\|'arrow'\|null`                                  | `'close'`  | N        | Right content.                                |
| space     | `number`                                                  | `100`      | N        | Space between announcements in px.            |
| speed     | `number`                                                  | `30`       | N        | Horizontal scrolling speed in px/s.           |
| vertical  | `boolean`                                                 | `false`    | N        | Whether to scroll vertically.                 |
| duration  | `100\|300\|500\|700\|1000`                                | `500`      | N        | Vertical scrolling transition duration in ms. |
| interval  | `number`                                                  | `4`        | N        | Vertical scrolling interval time in seconds.  |
| injClass  | `string`                                                  | `''`       | N        | Injected CSS class name.                      |
| radius    | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`       | N        | Border radius style.                          |

## NoticeBar Events

| Name        | Type         | Params | Description                           |
| ----------- | ------------ | ------ | ------------------------------------- |
| click-right | `() => void` | -      | Triggered when right area is clicked. |

## NoticeBar Children

| Name       | Type     | Params | Description                           |
| ---------- | -------- | ------ | ------------------------------------- |
| leftChild  | Vue Slot | -      | Renders left content area if passed.  |
| rightChild | Vue Slot | -      | Renders right content area if passed. |
