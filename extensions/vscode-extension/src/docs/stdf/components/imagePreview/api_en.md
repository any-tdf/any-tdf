## ImagePreview Props

| Name               | Type                                                 | Default    | Required | Description                                         |
| ------------------ | ---------------------------------------------------- | ---------- | -------- | --------------------------------------------------- |
| visible            | `boolean`                                            | `false`    | N        | Whether to show, supports two-way binding.          |
| images             | `string[] \| ImagePreviewItemProps[]`                | `[]`       | N        | Image list, can be URL array or image object array. |
| current            | `number`                                             | `0`        | N        | Current image index, supports two-way binding.      |
| loop               | `boolean`                                            | `true`     | N        | Whether to loop switch.                             |
| swipeDuration      | `number`                                             | `300`      | N        | Switch animation duration in ms.                    |
| minScale           | `number`                                             | `0.5`      | N        | Minimum scale ratio.                                |
| maxScale           | `number`                                             | `3`        | N        | Maximum scale ratio.                                |
| closePosition      | `'tl'\|'tr'\|'bl'\|'br'`                             | `'tr'`     | N        | Close button position.                              |
| showNavigation     | `boolean`                                            | `true`     | N        | Whether to show prev/next navigation icons.         |
| navigationPosition | `'center' \| 'bottom'`                               | `'center'` | N        | Navigation icons vertical position.                 |
| maskClosable       | `boolean`                                            | `false`    | N        | Whether to close on mask click.                     |
| showIndex          | `boolean`                                            | `true`     | N        | Whether to show index.                              |
| indicatorType      | `'dot' \| 'number' \| null`                          | `'number'` | N        | Indicator type.                                     |
| zIndex             | `number`                                             | `1000`     | N        | z-index level.                                      |
| duration           | `number`                                             | `300`      | N        | Enter animation duration in ms.                     |
| outDuration        | `number`                                             | `200`      | N        | Exit animation duration in ms.                      |
| mask               | [`Mask`](https://stdf.dev/components?nav=mask&tab=1) | `{}`       | N        | Mask layer parameters.                              |
| icon               | [`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `{}`       | N        | Close icon parameters.                              |

## ImagePreviewItemProps

| Name      | Type     | Default | Required | Description        |
| --------- | -------- | ------- | -------- | ------------------ |
| url       | `string` | -       | Y        | Image URL.         |
| thumbnail | `string` | -       | N        | Thumbnail URL.     |
| alt       | `string` | -       | N        | Image description. |

## ImagePreview Events

| Name     | Type                      | Parameters           | Description                     |
| -------- | ------------------------- | -------------------- | ------------------------------- |
| onchange | `(index: number) => void` | index: current index | Triggered when switching image. |
| onclose  | `() => void`              | -                    | Triggered when closed.          |
| onscale  | `(scale: number) => void` | scale: scale ratio   | Triggered when scaling.         |

## ImagePreview Snippets

| Name         | Type                                                                | Parameters     | Description           |
| ------------ | ------------------------------------------------------------------- | -------------- | --------------------- |
| children     | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item, index    | Custom content.       |
| loadingChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -              | Custom loading.       |
| errorChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -              | Custom error.         |
| indexChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | current, total | Custom index display. |
