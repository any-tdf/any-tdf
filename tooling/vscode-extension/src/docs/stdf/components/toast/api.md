## Toast Props

| 名称             | 类型                                                                | 默认值       | 必传 | 说明                                                                                              |
| ---------------- | ------------------------------------------------------------------- | ------------ | ---- | ------------------------------------------------------------------------------------------------- |
| message          | `string`                                                            | `''`         | N    | 提示内容。                                                                                        |
| visible          | `boolean`                                                           | `false`      | N    | 是否显示。                                                                                        |
| duration         | `number`                                                            | `2000`       | N    | 显示时长，为 0 时提示不会自动关闭，单位：ms。                                                     |
| position         | `'center'\|'top'\|'bottom'`                                         | `'center'`   | N    | 显示位置。                                                                                        |
| py               | `'0'\|'10'\|'20'\|'40'\|'60'\|'80'`                                 | `'20'`       | N    | 顶部和底部显示时距离顶部或底部的距离，position 为 'center' 时不生效。                             |
| radius           | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`           | `''`         | N    | 圆角风格。                                                                                        |
| transitionType   | `'scale'\|'fly'\|'fade'\|'slide'\|'blur'\|null`                     | `'scale'`    | N    | 动画类型。                                                                                        |
| transitionParams | [`Transition`](https://svelte.dev/docs/svelte/svelte-transition)    | `{}`         | N    | 动画参数，其中 duration 默认 300。                                                                |
| outDuration      | `number`                                                            | `0`          | N    | 退出动画时间，单位：ms。                                                                          |
| easeType         | [`SvelteEasingProps`](https://svelte.dev/docs/svelte/svelte-easing) | `'cubicOut'` | N    | 进入动画缓动函数，对应 [svelte/easing](https://svelte.dev/docs/svelte/svelte-easing) 的缓动函数。 |
| easeOutType      | [`SvelteEasingProps`](https://svelte.dev/docs/svelte/svelte-easing) | `'cubicOut'` | N    | 退出动画缓动函数，对应 svelte/easing 的缓动函数。                                                 |
| type             | `'success'\|'error'\|'warning'\|'info'\|'loading'\|'icon'\|null`    | `null`       | N    | 提示图标类型。                                                                                    |
| mask             | [`Mask`](https://stdf.dev/components?nav=mask&tab=1)                | `{}`         | N    | 遮罩层参数。                                                                                      |
| loading          | [`Loading`](https://stdf.dev/components?nav=loading&tab=1)          | `{}`         | N    | 加载组件参数，仅 type 为 `'loading'` 时生效。                                                     |
| icon             | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)                | `{}`         | N    | 图标组件参数，仅 type 为非 `'loading'` 且非 `null` 时生效。                                       |
| zIndex           | `number`                                                            | `1000`       | N    | z-index。                                                                                         |
| clickable        | `boolean`                                                           | `false`      | N    | 是否允许点击穿透。                                                                                |
| dynamicFixed     | `boolean`                                                           | `true`       | N    | 是否动态固定。                                                                                    |

## Toast Events

| 名称    | 类型         | 参数 | 描述             |
| ------- | ------------ | ---- | ---------------- |
| onclose | `() => void` | -    | 提示关闭时触发。 |

## Toast Snippets

| 名称     | 类型                                                                | 参数 | 说明                 |
| -------- | ------------------------------------------------------------------- | ---- | -------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入时渲染提示内容。 |
