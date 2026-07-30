## Alert Props

| 名称             | 类型                                            | 默认值       | 必传 | 说明                                                                   |
| ---------------- | ----------------------------------------------- | ------------ | ---- | ---------------------------------------------------------------------- |
| visible          | `boolean`                                       | `false`      | N    | 是否显示，支持受控 props。                                             |
| title            | `string`                                        | `''`         | N    | 标题。                                                                 |
| message          | `string`                                        | `''`         | N    | 消息内容。                                                             |
| duration         | `number`                                        | `3000`       | N    | 显示时长（ms），设为 0 不自动关闭。                                    |
| position         | `'top'\|'bottom'`                               | `'top'`      | N    | 显示位置。                                                             |
| py               | `'0'\|'10'\|'20'\|'40'\|'60'\|'80'`             | `'20'`       | N    | 距离顶部/底部的距离。                                                  |
| type             | `'success'\|'error'\|'warning'\|'info'\|null`   | `null`       | N    | 提示类型。                                                             |
| showIcon         | `boolean`                                       | `true`       | N    | 是否显示类型图标。                                                     |
| icon             | [`Icon`](/components?nav=icon&tab=1)            | `{}`         | N    | 自定义图标配置。                                                       |
| closable         | `boolean`                                       | `true`       | N    | 是否显示关闭按钮。                                                     |
| inverse          | `boolean`                                       | `true`       | N    | 是否反转色，开启后亮色模式使用深色背景。                               |
| card             | [`Card`](/components?nav=card&tab=1)            | `{}`         | N    | Card 组件配置。                                                        |
| transitionType   | `'scale'\|'fly'\|'fade'\|'slide'\|'blur'\|null` | `'fly'`      | N    | 过渡动画类型，与 VTDF 内置 transition 命名一致。                       |
| transitionParams | `object`                                        | `{}`         | N    | 动画参数，对应 transition 各函数的参数，进入动画的 duration 默认 300。 |
| outDuration      | `number`                                        | `300`        | N    | 退出动画时间（ms）。                                                   |
| easeType         | EasingProps                                     | `'cubicOut'` | N    | 进入动画缓动函数，VTDF 内置 easing 函数集。                            |
| easeOutType      | EasingProps                                     | `'cubicOut'` | N    | 退出动画缓动函数，VTDF 内置 easing 函数集。                            |
| zIndex           | `number`                                        | `1000`       | N    | z-index 层级。                                                         |
| clickable        | `boolean`                                       | `true`       | N    | 是否允许穿透点击下方内容。                                             |
| injClass         | `string`                                        | `''`         | N    | 注入 CSS 名称。                                                        |

## Alert Events

| 名称  | 类型         | 参数 | 描述         |
| ----- | ------------ | ---- | ------------ |
| close | `() => void` | -    | 关闭时触发。 |

## Alert Children

| 名称     | 类型       | 参数 | 说明             |
| -------- | ---------- | ---- | ---------------- |
| children | `Vue Slot` | -    | 自定义内容区域。 |
