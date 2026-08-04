## AccordionItem Props

| Name     | Type                                                 | Default     | Required | Description       |
| -------- | ---------------------------------------------------- | ----------- | -------- | ----------------- |
| title    | `string`                                             | -           | Y        | Title.            |
| content  | `string`                                             | `''`        | N        | Content text.     |
| disabled | `boolean`                                            | `false`     | N        | Whether disabled. |
| icon     | [`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `undefined` | N        | Title left icon.  |

## Accordion Props

| Name               | Type                                                      | Default   | Required | Description                                          |
| ------------------ | --------------------------------------------------------- | --------- | -------- | ---------------------------------------------------- |
| items              | `AccordionItemProps[]`                                    | `[]`      | N        | Accordion items data.                                |
| activeIndex        | `number \| number[]`                                      | -         | N        | Active index, number for single, array for multiple. |
| multiple           | `boolean`                                                 | `false`   | N        | Whether to allow multiple items to expand.           |
| radius             | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `'md'`    | N        | Border radius style.                                 |
| border             | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'solid'` | N        | Border style.                                        |
| divider            | `boolean`                                                 | `true`    | N        | Whether to show divider.                             |
| expandIcon         | `'arrow'\|'plus'\|null`                                   | `'arrow'` | N        | Expand icon type.                                    |
| iconPosition       | `'left'\|'right'`                                         | `'right'` | N        | Expand icon position.                                |
| transitionDuration | `number`                                                  | `300`     | N        | Transition duration (ms).                            |
| injClass           | `string`                                                  | `''`      | N        | Injected CSS class name.                             |
| titleClass         | `string`                                                  | `''`      | N        | Title area injected CSS.                             |
| contentClass       | `string`                                                  | `''`      | N        | Content area injected CSS.                           |

## Accordion Events

| Name     | Type                                               | Params                                 | Description                             |
| -------- | -------------------------------------------------- | -------------------------------------- | --------------------------------------- |
| onchange | `(index: number \| number[] \| undefined) => void` | Current active index (single/multiple) | Triggered when expand/collapse changes. |

## Accordion Snippets

| Name     | Type                                                 | Params                      | Description          |
| -------- | ---------------------------------------------------- | --------------------------- | -------------------- |
| children | `Snippet<[item: AccordionItemProps, index: number]>` | Current item data and index | Custom content area. |
