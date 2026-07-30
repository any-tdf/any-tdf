## Steps Props

| Name      | Type                                                      | Default | Required | Description                                       |
| --------- | --------------------------------------------------------- | ------- | -------- | ------------------------------------------------- |
| steps     | `StepsItem[]`                                             | `[]`    | Y        | Array composed of step Props or finishStep Props. |
| current   | `number`                                                  | `1`     | N        | Current step number.                              |
| radius    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`  | N        | Border radius style.                              |
| barBorder | `boolean`                                                 | `true`  | N        | Whether the icon has a border.                    |
| vertical  | `boolean`                                                 | `false` | N        | Whether to use vertical layout.                   |
| injClass  | `string`                                                  | `''`    | N        | Injected CSS class name.                          |

## StepsItem Props

| Name       | Type              | Default | Required | Description                                                                |
| ---------- | ----------------- | ------- | -------- | -------------------------------------------------------------------------- |
| step       | `StepsStep`       | `{}`    | Y        | Step parameters.                                                           |
| finishStep | `StepsFinishStep` | `{}`    | N        | Completed step parameters.                                                 |
| height     | `number`          | `0`     | N        | Step height for vertical layout, usually auto-calculated by the component. |

## step Props && StepsFinishStep Props

| Name         | Type                                                          | Default | Required | Description                                                         |
| ------------ | ------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| title        | `string`                                                      | `''`    | Y        | Step title.                                                         |
| bar          | `StepsStepBarIcon \| StepsStepBarImage \| StepsStepBarString` | `{}`    | N        | Step area content.                                                  |
| desc         | `string`                                                      | `''`    | N        | Step description content.                                           |
| injVue Slot  | `Vue Slot`                                                    | -       | N        | Inject Vue Slot into step area.                                     |
| injComponent | `Vue Slot \| (() => Vue Slot)`                                | -       | N        | Inject content into the step area with legacy naming compatibility. |

## StepsStepBarIcon Props

| Name    | Type                                 | Default | Required | Description                             |
| ------- | ------------------------------------ | ------- | -------- | --------------------------------------- |
| type    | `'icon'`                             | `{}`    | Y        | Used when step area content is an icon. |
| content | [`Icon`](/components?nav=icon&tab=1) | `-`     | Y        | Icon parameters.                        |

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
