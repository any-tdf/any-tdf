## Badge Props

| Name     | Type                                                              | Default | Required | Description                                                         |
| -------- | ----------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| text     | `string`                                                          | `''`    | N        | Badge text content.                                                 |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''\|'leaf'` | `'sm'`  | N        | Border radius style.                                                |
| isLeft   | `boolean`                                                         | `false` | N        | Whether to position on the left (only works when isInner is false). |
| isShow   | `boolean`                                                         | `true`  | N        | Whether to show the badge.                                          |
| offsetY  | `number`                                                          | `0`     | N        | Vertical offset (only works when isInner is false).                 |
| offsetX  | `number`                                                          | `0`     | N        | Horizontal offset (only works when isInner is false).               |
| isInner  | `boolean`                                                         | `false` | N        | Whether to position inside.                                         |
| injClass | `string`                                                          | `''`    | N        | Injected CSS class name.                                            |

## Badge Snippets

| Name     | Type                                                                | Params | Description                                             |
| -------- | ------------------------------------------------------------------- | ------ | ------------------------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Content for relative positioning when isInner is false. |
