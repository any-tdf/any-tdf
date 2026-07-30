## BottomSheet Props

| Name            | Type                                                      | Default                        | Required | Description                                                            |
| --------------- | --------------------------------------------------------- | ------------------------------ | -------- | ---------------------------------------------------------------------- |
| visible         | `boolean`                                                 | `false`                        | N        | Whether to display.                                                    |
| title           | `string`                                                  | Current lang bottomSheet.title | N        | Title.                                                                 |
| titleAlign      | `'left'\|'center'\|'right'`                               | `'left'`                       | N        | Title alignment.                                                       |
| showBackIcon    | `boolean`                                                 | `false`                        | N        | Whether to show back icon.                                             |
| closeContent    | `'downIcon'\|'closeIcon'\|''\|string`                     | `'downIcon'`                   | N        | Close area content.                                                    |
| showDivider     | `boolean`                                                 | `true`                         | N        | Whether to show divider.                                               |
| duration        | `number`                                                  | `450`                          | N        | Transition animation appear time, unit: ms.                            |
| outDuration     | `number`                                                  | `240`                          | N        | Transition animation exit time, unit: ms.                              |
| mask            | [`Mask`](https://stdf.dev/components?nav=mask&tab=1)      | `{}`                           | N        | Mask parameters.                                                       |
| maskClosable    | `boolean`                                                 | `false`                        | N        | Whether to close when clicking mask.                                   |
| zIndex          | `number`                                                  | `600`                          | N        | z-index.                                                               |
| stayHeightList  | `number[]`                                                | `[10, 50, 90]`                 | N        | Fixed height list.                                                     |
| stayHeightIndex | `number`                                                  | `1`                            | N        | Initial fixed height index.                                            |
| closeHeight     | `number`                                                  | `0`                            | N        | Auto close when position is lower than this height after sliding ends. |
| radius          | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`                           | N        | Border radius style.                                                   |

## BottomSheet Events

| Name           | Type                       | Parameters              | Description                                                  |
| -------------- | -------------------------- | ----------------------- | ------------------------------------------------------------ |
| onclose        | `() => void`               | -                       | Triggered when popup closes.                                 |
| onclickMask    | `() => void`               | -                       | Triggered when clicking mask, even if maskClosable is false. |
| onback         | `() => void`               | -                       | Triggered when clicking left back icon.                      |
| onheightChange | `(height: number) => void` | height - Current height | Triggered when sliding ends.                                 |

## BottomSheet Snippets

| Name     | Type                                                                | Parameters | Description          |
| -------- | ------------------------------------------------------------------- | ---------- | -------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | BottomSheet content. |
