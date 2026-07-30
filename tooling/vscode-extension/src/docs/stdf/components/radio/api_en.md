## Radio Props

| Name         | Type                                                                    | Default     | Required | Description                            |
| ------------ | ----------------------------------------------------------------------- | ----------- | -------- | -------------------------------------- |
| data         | `RadioItem[]`                                                           | `[]`        | Y        | Option data.                           |
| layout       | `'v'\|'h'\|'inline'`                                                    | `'v'`       | N        | Layout mode.                           |
| value        | `string`                                                                | `''`        | N        | Selected value.                        |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                                    | `'r'`       | N        | Position of option content area.       |
| icon         | `'default'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area. |
| iconChecked  | `'default'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.   |

## Radio Events

| Name     | Type                      | Parameters                        | Description                                                |
| -------- | ------------------------- | --------------------------------- | ---------------------------------------------------------- |
| onchange | `(value: string) => void` | value - Selected Radio identifier | Triggered when RadioItem is clicked (Radio value changes). |

## Radio Snippets

| Name       | Type                                                                                       | Parameters         | Description                            |
| ---------- | ------------------------------------------------------------------------------------------ | ------------------ | -------------------------------------- |
| radioChild | [`Snippet<[{ item: RadioItem }]>`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item - Option data | Used when customizing the option area. |

## RadioItem Props

| Name         | Type                                                                    | Default     | Required | Description                                   |
| ------------ | ----------------------------------------------------------------------- | ----------- | -------- | --------------------------------------------- |
| name         | `string`                                                                | `''`        | Y        | Identifier, corresponds to Radio Props value. |
| label        | `string`                                                                | `''`        | N        | Option content.                               |
| layout       | `'v'\|'h'\|'inline'`                                                    | `'v'`       | N        | Layout mode.                                  |
| textPosition | `'l'\|'r'\|'t'\|'b'`                                                    | `'r'`       | N        | Position of option content area.              |
| icon         | `'default'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `'default'` | N        | Content of unchecked option icon area.        |
| iconChecked  | `'default'\|null`\|[`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `'default'` | N        | Content of checked option icon area.          |
| checked      | `boolean`                                                               | `false`     | N        | Whether checked.                              |

## RadioItem Events

| Name    | Type                     | Parameters                     | Description             |
| ------- | ------------------------ | ------------------------------ | ----------------------- |
| onclick | `(name: string) => void` | name - Clicked item identifier | Triggered when clicked. |

## RadioItem Snippets

| Name     | Type                                                                | Parameters | Description          |
| -------- | ------------------------------------------------------------------- | ---------- | -------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Option area content. |
