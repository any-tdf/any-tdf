## NoticeBar Props

| Name      | Type                                                                   | Default    | Required | Description                                   |
| --------- | ---------------------------------------------------------------------- | ---------- | -------- | --------------------------------------------- |
| textList  | `string[]`                                                             | `[]`       | Y        | Array of announcement contents.               |
| leftIcon  | `'volume'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=0) | `'volume'` | N        | Left content.                                 |
| rightIcon | `'close'\|'arrow'\|null`                                               | `'close'`  | N        | Right content.                                |
| space     | `number`                                                               | `100`      | N        | Space between announcements in px.            |
| speed     | `number`                                                               | `30`       | N        | Horizontal scrolling speed in px/s.           |
| vertical  | `boolean`                                                              | `false`    | N        | Whether to scroll vertically.                 |
| duration  | `100\|300\|500\|700\|1000`                                             | `500`      | N        | Vertical scrolling transition duration in ms. |
| interval  | `number`                                                               | `4`        | N        | Vertical scrolling interval time in seconds.  |
| injClass  | `string`                                                               | `''`       | N        | Injected CSS class name.                      |

## NoticeBar Events

| Name         | Type         | Params | Description                           |
| ------------ | ------------ | ------ | ------------------------------------- |
| onclickRight | `() => void` | -      | Triggered when right area is clicked. |

## NoticeBar Snippets

| Name       | Type                                                                | Params | Description                           |
| ---------- | ------------------------------------------------------------------- | ------ | ------------------------------------- |
| leftChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Renders left content area if passed.  |
| rightChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Renders right content area if passed. |
