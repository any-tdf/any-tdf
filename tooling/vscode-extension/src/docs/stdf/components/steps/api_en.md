## Steps Props

| Name      | Type                                                      | Default | Required | Description                                       |
| --------- | --------------------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| steps     | `StepsItem[]`                                             | `[]`    | Y        | Array composed of step Props or finishStep Props. |
| current   | `number`                                                  | `1`     | N        | Current step number.                              |
| radius    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`  | N        | Border radius style.                              |
| barBorder | `boolean`                                                 | `true`  | N        | Whether the icon has a border.                    |
| vertical  | `boolean`                                                 | `false` | N        | Whether to use vertical layout.                   |

## StepsItem Props

| Name       | Type              | Default | Required | Description                                                                |
| ---------- | ----------------- | ------- | -------- | -------------------------------------------------------------------------- |
| step       | `StepsStep`       | `{}`    | Y        | Step parameters.                                                           |
| finishStep | `StepsFinishStep` | `{}`    | N        | Completed step parameters.                                                 |
| height     | `number`          | `0`     | N        | Step height for vertical layout, usually auto-calculated by the component. |

## step Props && StepsFinishStep Props

| Name         | Type                                                          | Default | Required | Description                             |
| ------------ | ------------------------------------------------------------- | ------- | -------- | --------------------------------------- |
| title        | `string`                                                      | `''`    | Y        | Step title.                             |
| bar          | `StepsStepBarIcon \| StepsStepBarImage \| StepsStepBarString` | `{}`    | N        | Step area content.                      |
| desc         | `string`                                                      | `''`    | N        | Step description content.               |
| injComponent | `Component`                                                   | -       | N        | Inject Svelte component into step area. |

## StepsStepBarIcon Props

| Name    | Type                                                 | Default | Required | Description                             |
| ------- | ---------------------------------------------------- | ------- | -------- | --------------------------------------- |
| type    | `'icon'`                                             | `{}`    | Y        | Used when step area content is an icon. |
| content | [`Icon`](https://stdf.dev/components?nav=icon&tab=1) | `-`     | Y        | Icon parameters.                        |

## StepsStepBarImage Props

| Name    | Type      | Default | Required | Description                              |
| ------- | --------- | ------- | -------- | ---------------------------------------- |
| type    | `'image'` | `{}`    | Y        | Used when step area content is an image. |
| content | `string`  | `-`     | Y        | Image path.                              |

## StepsStepBarString Props

| Name    | Type       | Default | Required | Description                              |
| ------- | ---------- | ------- | -------- | ---------------------------------------- |
| type    | `'string'` | `{}`    | Y        | Used when step area content is a string. |
| content | `string`   | `-`     | Y        | String content.                          |
