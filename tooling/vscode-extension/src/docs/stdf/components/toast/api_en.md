## Toast Props

| Name             | Type                                                                | Default      | Required | Description                                                                                                           |
| ---------------- | ------------------------------------------------------------------- | ------------ | -------- | --------------------------------------------------------------------------------------------------------------------- |
| message          | `string`                                                            | `''`         | N        | Toast content.                                                                                                        |
| visible          | `boolean`                                                           | `false`      | N        | Whether to show the toast.                                                                                            |
| duration         | `number`                                                            | `2000`       | N        | Display duration in ms. Toast won't auto-close if set to 0.                                                           |
| position         | `'center'\|'top'\|'bottom'`                                         | `'center'`   | N        | Display position.                                                                                                     |
| py               | `'0'\|'10'\|'20'\|'40'\|'60'\|'80'`                                 | `'20'`       | N        | Distance from top/bottom when position is 'top'/'bottom'. Ignored for 'center'.                                       |
| radius           | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`           | `''`         | N        | Border radius style.                                                                                                  |
| transitionType   | `'scale'\|'fly'\|'fade'\|'slide'\|'blur'\|null`                     | `'scale'`    | N        | Animation type.                                                                                                       |
| transitionParams | [`Transition`](https://svelte.dev/docs/svelte/svelte-transition)    | `{}`         | N        | Animation parameters, default duration is 300.                                                                        |
| outDuration      | `number`                                                            | `0`          | N        | Exit animation duration in ms.                                                                                        |
| easeType         | [`SvelteEasingProps`](https://svelte.dev/docs/svelte/svelte-easing) | `'cubicOut'` | N        | In animation easing function, corresponds to [svelte/easing](https://svelte.dev/docs/svelte/svelte-easing) functions. |
| easeOutType      | [`SvelteEasingProps`](https://svelte.dev/docs/svelte/svelte-easing) | `'cubicOut'` | N        | Out animation easing function, corresponds to svelte/easing functions.                                                |
| type             | `'success'\|'error'\|'warning'\|'info'\|'loading'\|'icon'\|null`    | `null`       | N        | Toast icon type.                                                                                                      |
| mask             | [`Mask`](https://stdf.dev/components?nav=mask&tab=1)                | `{}`         | N        | Mask layer parameters.                                                                                                |
| loading          | [`Loading`](https://stdf.dev/components?nav=loading&tab=1)          | `{}`         | N        | Loading component parameters, only works when type is `'loading'`.                                                    |
| icon             | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)                | `{}`         | N        | Icon component parameters, only works when type is not `'loading'` and not `null`.                                    |
| zIndex           | `number`                                                            | `1000`       | N        | z-index value.                                                                                                        |
| clickable        | `boolean`                                                           | `false`      | N        | Whether to allow click through.                                                                                       |
| dynamicFixed     | `boolean`                                                           | `true`       | N        | Whether to use dynamic fixed positioning.                                                                             |

## Toast Events

| Name    | Type         | Parameters | Description                         |
| ------- | ------------ | ---------- | ----------------------------------- |
| onclose | `() => void` | -          | Triggered when the toast is closed. |

## Toast Snippets

| Name     | Type                                                                | Parameters | Description                        |
| -------- | ------------------------------------------------------------------- | ---------- | ---------------------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Renders toast content when passed. |
