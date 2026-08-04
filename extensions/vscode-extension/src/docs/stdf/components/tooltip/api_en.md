## Tooltip Props

| Name         | Type                                                      | Default   | Required | Description                            |
| ------------ | --------------------------------------------------------- | --------- | -------- | -------------------------------------- |
| content      | `string`                                                  | `''`      | N        | Tooltip content text.                  |
| position     | `'top'\|'bottom'\|'left'\|'right'`                        | `'top'`   | N        | Display position.                      |
| visible      | `boolean`                                                 | `false`   | N        | Whether visible, supports `$bindable`. |
| delay        | `number`                                                  | `0`       | N        | Show delay in milliseconds.            |
| hideDelay    | `number`                                                  | `0`       | N        | Hide delay in milliseconds.            |
| arrow        | `boolean`                                                 | `true`    | N        | Whether to show arrow.                 |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N        | Border radius style.                   |
| state        | `'theme'\|'success'\|'warning'\|'error'\|'info'\|'black'` | `'black'` | N        | Color scheme.                          |
| maxWidth     | `number`                                                  | `200`     | N        | Maximum width in pixels.               |
| zIndex       | `number`                                                  | `800`     | N        | z-index level.                         |
| disabled     | `boolean`                                                 | `false`   | N        | Whether disabled.                      |
| injClass     | `string`                                                  | `''`      | N        | Inject CSS class name.                 |
| contentClass | `string`                                                  | `''`      | N        | Content area CSS class name.           |

## Tooltip Snippets

| Name           | Type                                                                | Params | Description                             |
| -------------- | ------------------------------------------------------------------- | ------ | --------------------------------------- |
| children       | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Trigger element.                        |
| contentSnippet | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -      | Custom content (priority over content). |

## Tooltip Events

| Name   | Type         | Params | Description                     |
| ------ | ------------ | ------ | ------------------------------- |
| onshow | `() => void` | -      | Callback triggered when shown.  |
| onhide | `() => void` | -      | Callback triggered when hidden. |
