## NavBar Props

| Name       | Type                                                                 | Default                       | Required | Description                                                                         |
| ---------- | -------------------------------------------------------------------- | ----------------------------- | -------- | ----------------------------------------------------------------------------------- |
| title      | `string`                                                             | Current language navBar.title | N        | Title text.                                                                         |
| titleAlign | `'left'\|'center'\|'right'`                                          | `'left'`                      | N        | Title alignment.                                                                    |
| left       | `'back'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `'back'`                      | N        | Left content, `'back'` for back icon, `null` for no content, otherwise render icon. |
| rights     | [`Icon[]`](https://stdf.dev/components?nav=icon&tab=1)               | `[]`                          | N        | Right content array of Icon Props, recommend no more than 3 icons.                  |
| line       | `boolean`                                                            | `true`                        | N        | Whether to show bottom divider line.                                                |
| injClass   | `string`                                                             | `''`                          | N        | Inject CSS class name.                                                              |
| love       | `boolean`                                                            | `false`                       | N        | Whether to enable care version.                                                     |

## NavBar Events

| Name         | Type                      | Parameters                 | Description                         |
| ------------ | ------------------------- | -------------------------- | ----------------------------------- |
| onclickLeft  | `() => void`              | -                          | Triggered when clicking left icon.  |
| onclickRight | `(index: number) => void` | index - Clicked icon index | Triggered when clicking right icon. |

## NavBar Snippets

| Name       | Type                                                                | Parameters | Description                     |
| ---------- | ------------------------------------------------------------------- | ---------- | ------------------------------- |
| titleChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Renders title area when passed. |
| leftChild  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Renders left area when passed.  |
| rightChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Renders right area when passed. |
