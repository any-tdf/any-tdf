## Popup Props

| 名称               | 类型                                                                               | 默认值       | 必传 | 说明                                                                                         |
| ------------------ | ---------------------------------------------------------------------------------- | ------------ | ---- | -------------------------------------------------------------------------------------------- |
| visible            | `boolean`                                                                          | `false`      | N    | 是否显示。                                                                                   |
| size               | `number`                                                                           | `40`         | N    | 弹出层大小，值为 0 时由内部元素决定。                                                        |
| position           | `'center'\|'top'\|'bottom'\|'left'\|'right'`                                       | `'bottom'`   | N    | 显示位置。                                                                                   |
| duration           | `number`                                                                           | `450`        | N    | 出现动画过渡时间，单位：ms。                                                                 |
| outDuration        | `number`                                                                           | `240`        | N    | 退出动画过渡时间，单位：ms。                                                                 |
| easeType           | [`SvelteEasing`](https://svelte.dev/docs#run-time-svelte-easing)                   | `'cubicOut'` | N    | 出现动画，共 31 个值，参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)。 |
| easeOutType        | [`SvelteEasing`](https://svelte.dev/docs#run-time-svelte-easing)                   | `'cubicOut'` | N    | 退出动画，共 31 个值，参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)。 |
| px                 | `'0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'8'\|'10'\|'12'\|'16'\|'20'`                   | `'0'`        | N    | 左右间距。                                                                                   |
| py                 | `'0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'8'\|'10'\|'12'\|'16'\|'24'\|'32'\|'48'\|'64'` | `'0'`        | N    | 上下间距。                                                                                   |
| mask               | [`Mask`](https://stdf.dev/components?nav=mask&tab=1)                               | `{}`         | N    | 遮罩层参数。                                                                                 |
| maskClosable       | `boolean`                                                                          | `true`       | N    | 点击遮罩层是否关闭。                                                                         |
| radiusPosition     | `'auto'\|'all'\|'top'\|'bottom'\|'left'\|'right'\|'none'`                          | `'auto'`     | N    | 圆角位置。                                                                                   |
| radius             | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`                          | `''`         | N    | 圆角大小。                                                                                   |
| transitionDistance | `number`                                                                           | `0`          | N    | 动画距离，当弹出层大小由内部元素决定时生效。                                                 |
| transparent        | `boolean`                                                                          | `false`      | N    | 背景是否透明。                                                                               |
| zIndex             | `number`                                                                           | `600`        | N    | z-index。                                                                                    |
| dynamicFixed       | `boolean`                                                                          | `true`       | N    | 是否动态固定。                                                                               |
| hideScrollbar      | `boolean`                                                                          | `false`      | N    | 是否隐藏滚动区域滚动条。                                                                     |

## Popup Events

| 名称        | 类型         | 参数 | 描述                                                        |
| ----------- | ------------ | ---- | ----------------------------------------------------------- |
| onclickMask | `() => void` | -    | 点击弹出层遮罩时触发，即使 maskClosable 为 false 也会触发。 |
| onclose     | `() => void` | -    | 弹出层关闭时触发。                                          |

## Popup Snippets

| 名称     | 类型                                                                | 参数 | 说明         |
| -------- | ------------------------------------------------------------------- | ---- | ------------ |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | Popup 内容。 |

## SvelteEasing

```javascript
type SvelteEasing =
    | 'backIn'
    | 'backInOut'
    | 'backOut'
    | 'bounceIn'
    | 'bounceInOut'
    | 'bounceOut'
    | 'circIn'
    | 'circInOut'
    | 'circOut'
    | 'cubicIn'
    | 'cubicInOut'
    | 'cubicOut'
    | 'elasticIn'
    | 'elasticInOut'
    | 'elasticOut'
    | 'expoIn'
    | 'expoInOut'
    | 'expoOut'
    | 'linear'
    | 'quadIn'
    | 'quadInOut'
    | 'quadOut'
    | 'quartIn'
    | 'quartInOut'
    | 'quartOut'
    | 'quintIn'
    | 'quintInOut'
    | 'quintOut'
    | 'sineIn'
    | 'sineInOut'
    | 'sineOut';
```
