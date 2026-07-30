## Alert Props

| Name             | Type                                            | Default      | Required | Description                                                             |
| ---------------- | ----------------------------------------------- | ------------ | -------- | ----------------------------------------------------------------------- |
| visible          | `boolean`                                       | `false`      | N        | Whether to show, supports controlled props.                             |
| title            | `string`                                        | `''`         | N        | Title.                                                                  |
| message          | `string`                                        | `''`         | N        | Message content.                                                        |
| duration         | `number`                                        | `3000`       | N        | Display duration (ms), set to 0 to disable auto close.                  |
| position         | `'top'\|'bottom'`                               | `'top'`      | N        | Display position.                                                       |
| py               | `'0'\|'10'\|'20'\|'40'\|'60'\|'80'`             | `'20'`       | N        | Distance from top/bottom.                                               |
| type             | `'success'\|'error'\|'warning'\|'info'\|null`   | `null`       | N        | Alert type.                                                             |
| showIcon         | `boolean`                                       | `true`       | N        | Whether to show type icon.                                              |
| icon             | [`Icon`](/components?nav=icon&tab=1)            | `{}`         | N        | Custom icon configuration.                                              |
| closable         | `boolean`                                       | `true`       | N        | Whether to show close button.                                           |
| inverse          | `boolean`                                       | `true`       | N        | Whether to use inverse colors, uses dark background in light mode.      |
| card             | [`Card`](/components?nav=card&tab=1)            | `{}`         | N        | Card component configuration.                                           |
| transitionType   | `'scale'\|'fly'\|'fade'\|'slide'\|'blur'\|null` | `'fly'`      | N        | Transition animation type, aligned with VTDF built-in transition names. |
| transitionParams | `object`                                        | `{}`         | N        | Transition parameters, enter duration defaults to 300.                  |
| outDuration      | `number`                                        | `300`        | N        | Out animation duration (ms).                                            |
| easeType         | EasingProps                                     | `'cubicOut'` | N        | In animation easing function, VTDF includes built-in easing functions.  |
| easeOutType      | EasingProps                                     | `'cubicOut'` | N        | Out animation easing function, VTDF includes built-in easing functions. |
| zIndex           | `number`                                        | `1000`       | N        | z-index level.                                                          |
| clickable        | `boolean`                                       | `true`       | N        | Whether to allow click-through to content below.                        |
| injClass         | `string`                                        | `''`         | N        | Inject CSS class name.                                                  |

## Alert Events

| Name  | Type         | Params | Description            |
| ----- | ------------ | ------ | ---------------------- |
| close | `() => void` | -      | Triggered when closed. |

## Alert Children

| Name     | Type       | Params | Description          |
| -------- | ---------- | ------ | -------------------- |
| children | `Vue Slot` | -      | Custom content area. |
