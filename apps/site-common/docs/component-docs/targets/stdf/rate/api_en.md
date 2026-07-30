## Rate Props

| Name      | Type                                                                         | Default     | Required | Description                                |
| --------- | ---------------------------------------------------------------------------- | ----------- | -------- | ------------------------------------------ |
| value     | `number`                                                                     | `4`         | N        | Selected value.                            |
| total     | `number`                                                                     | `5`         | N        | Total score.                               |
| width     | `number`                                                                     | `24`        | N        | Width of single content (px).              |
| height    | `number`                                                                     | `24`        | N        | Height of single content (px).             |
| opacity   | `'0.05'\|'0.1'\|'0.2'\|'0.3'\|'0.4'\|'0.5'\|'0.6'\|'0.7'\|'0.8'\|'0.9'\|'1'` | `0.2`       | N        | Opacity of unselected content.             |
| space     | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                                               | `'3'`       | N        | Content spacing.                           |
| half      | `boolean`                                                                    | `false`     | N        | Whether to allow half selection.           |
| zero      | `boolean`                                                                    | `false`     | N        | Whether to allow 0 score.                  |
| vertical  | `boolean`                                                                    | `false`     | N        | Whether to enable vertical half selection. |
| disabled  | `boolean`                                                                    | `false`     | N        | Whether to disable.                        |
| readonly  | `boolean`                                                                    | `false`     | N        | Whether it's read-only.                    |
| custom    | `boolean`                                                                    | `false`     | N        | Whether to use custom content.             |
| animation | `'current'\|'active'\|null`                                                  | `'current'` | N        | Click animation type.                      |

## Rate Events

| Name    | Type                      | Parameters            | Description         |
| ------- | ------------------------- | --------------------- | ------------------- |
| onclick | `(value: number) => void` | value - Current value | Triggered on click. |

## Rate Snippets

| Name     | Type                                                                | Parameters | Description                              |
| -------- | ------------------------------------------------------------------- | ---------- | ---------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Will be used as single content for Rate. |
