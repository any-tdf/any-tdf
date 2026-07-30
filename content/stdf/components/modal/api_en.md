## Modal Props

| Name       | Type                                                     | Default                        | Required | Description                |
| ---------- | -------------------------------------------------------- | ------------------------------ | -------- | -------------------------- |
| visible    | `boolean`                                                | `false`                        | N        | Whether to show the modal. |
| title      | `string`                                                 | Current language modal.title   | N        | Title text.                |
| titleAlign | `'left'\|'center'\|'right'`                              | `'center'`                     | N        | Title alignment.           |
| content    | `string`                                                 | Current language modal.content | N        | Content text.              |
| showIcon   | `boolean`                                                | `false`                        | N        | Whether to show icon.      |
| icon       | [`Icon`](https://stdf.dev/components?nav=dialog&tab=1)   | `{}`                           | N        | Icon props.                |
| showBtn    | `boolean`                                                | `true`                         | N        | Whether to show button.    |
| btnText    | `string`                                                 | Current language modal.btnText | N        | Button text.               |
| button     | [`Button`](https://stdf.dev/components?nav=dialog&tab=1) | `{}`                           | N        | Button props.              |
| popup      | [`Popup`](https://stdf.dev/components?nav=dialog&tab=1)  | `{}`                           | N        | Popup props.               |

## Modal Events

| Name    | Type         | Parameters | Description                  |
| ------- | ------------ | ---------- | ---------------------------- |
| onclose | `() => void` | -          | Triggered when modal closes. |

## Modal Snippets

| Name         | Type                                                                | Parameters | Description                              |
| ------------ | ------------------------------------------------------------------- | ---------- | ---------------------------------------- |
| contentChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Render the content when it is passed in. |
