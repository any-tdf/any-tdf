## Slider Props

| Name       | Type                                                      | Default   | Required | Description                                                                                                  |
| ---------- | --------------------------------------------------------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------ |
| value      | `number`                                                  | `40`      | N        | Current value.                                                                                               |
| step       | `number`                                                  | `1`       | N        | Step size.                                                                                                   |
| minRange   | `number`                                                  | `0`       | N        | Minimum selectable value.                                                                                    |
| maxRange   | `number`                                                  | `100`     | N        | Maximum selectable value.                                                                                    |
| isRange    | `boolean`                                                 | `false`   | N        | Whether it's a range selection.                                                                              |
| startValue | `number`                                                  | `20`      | N        | Start value for range selection.                                                                             |
| endValue   | `number`                                                  | `60`      | N        | End value for range selection.                                                                               |
| showTip    | `'always'\|'never'\|'touch'`                              | `'touch'` | N        | Tip display mode.                                                                                            |
| showSteps  | `boolean`                                                 | `false`   | N        | Whether to show step markers.                                                                                |
| stepsStyle | `'block'\|'break'`                                        | `'block'` | N        | Step marker style. block shows markers on continuous track, break shows track segments separated by markers. |
| stepLabels | `string[]`                                                | `[]`      | N        | Step label array for displaying custom text instead of numbers in the tip.                                   |
| radius     | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N        | Border radius style.                                                                                         |
| lineBlock  | `boolean`                                                 | `false`   | N        | Whether the slider is a line block.                                                                          |
| disabled   | `boolean`                                                 | `false`   | N        | Whether it's disabled.                                                                                       |
| readonly   | `boolean`                                                 | `false`   | N        | Whether it's read-only.                                                                                      |

## Slider Events

| Name     | Type                                                                                                                                  | Parameters                                                                                                                                                         | Description                   |
| -------- | ------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------------------------- |
| onchange | `(value: number, valueRange?: [number, number], label?: string \| number, labelRange?: [string \| number, string \| number]) => void` | value - Current value; valueRange - Value array for range selection; label - Current label (if stepLabels provided); labelRange - Label array for range selection. | Triggered when value changes. |

## Slider Snippets

| Name     | Type                                                                | Parameters | Description                                  |
| -------- | ------------------------------------------------------------------- | ---------- | -------------------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Content to be rendered in the progress area. |
