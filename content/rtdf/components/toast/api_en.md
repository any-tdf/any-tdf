## Toast Props

| Name             | Type                                                             | Default      | Required | Description                                                                        |
| ---------------- | ---------------------------------------------------------------- | ------------ | -------- | ---------------------------------------------------------------------------------- |
| message          | `string`                                                         | `''`         | N        | Toast content.                                                                     |
| visible          | `boolean`                                                        | `false`      | N        | Whether to show the toast.                                                         |
| duration         | `number`                                                         | `2000`       | N        | Display duration in ms. Toast won't auto-close if set to 0.                        |
| position         | `'center'\|'top'\|'bottom'`                                      | `'center'`   | N        | Display position.                                                                  |
| py               | `'0'\|'10'\|'20'\|'40'\|'60'\|'80'`                              | `'20'`       | N        | Distance from top/bottom when position is 'top'/'bottom'. Ignored for 'center'.    |
| radius           | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`        | `''`         | N        | Border radius style.                                                               |
| transitionType   | `'scale'\|'fly'\|'fade'\|'slide'\|'blur'\|null`                  | `'scale'`    | N        | Animation type.                                                                    |
| transitionParams | `object`                                                         | `{}`         | N        | Animation parameters, default duration is 300.                                     |
| outDuration      | `number`                                                         | `0`          | N        | Exit animation duration in ms.                                                     |
| easeType         | EasingProps                                                      | `'cubicOut'` | N        | In animation easing function, RTDF includes built-in easing functions.             |
| easeOutType      | EasingProps                                                      | `'cubicOut'` | N        | Out animation easing function, RTDF includes built-in easing functions.            |
| type             | `'success'\|'error'\|'warning'\|'info'\|'loading'\|'icon'\|null` | `null`       | N        | Toast icon type.                                                                   |
| mask             | [`Mask`](/components?nav=mask&tab=1)                             | `{}`         | N        | Mask layer parameters.                                                             |
| loading          | [`Loading`](/components?nav=loading&tab=1)                       | `{}`         | N        | Loading component parameters, only works when type is `'loading'`.                 |
| icon             | [`Icon`](/components?nav=icon&tab=1)                             | `{}`         | N        | Icon component parameters, only works when type is not `'loading'` and not `null`. |
| zIndex           | `number`                                                         | `1000`       | N        | z-index value.                                                                     |
| clickable        | `boolean`                                                        | `false`      | N        | Whether to allow click through.                                                    |
| dynamicFixed     | `boolean`                                                        | `true`       | N        | Whether to use dynamic fixed positioning.                                          |

## Toast Events

| Name    | Type         | Parameters | Description                                                                     |
| ------- | ------------ | ---------- | ------------------------------------------------------------------------------- |
| onClose | `() => void` | -          | Triggered when the toast is closed.                                             |
| onclose | `() => void` | -          | Triggered when the toast is closed. Lowercase event alias compatible with STDF. |

## Toast Children

| Name     | Type      | Parameters | Description                        |
| -------- | --------- | ---------- | ---------------------------------- |
| children | ReactNode | -          | Renders toast content when passed. |
