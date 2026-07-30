## 使用场景

Alert 组件用于展示卡片式的弹窗提示，适用于需要更丰富内容展示的通知场景，如操作反馈、系统通知等。

## 设计理念与场景区分

在 STDF 的反馈体系中，Toast、Alert、Modal、Dialog 都用于向用户传达信息，但侧重点不同。

- **Toast**：轻量、非阻断，关注短时提示与状态反馈，适合操作后即时反馈。
- **Alert**：卡片式通知，强调信息呈现与可读性，支持标题、图标、操作按钮，适合通知类提醒或较丰富的提示内容。
- **Modal**：强提醒、弱交互，通常是单按钮确认或阅读确认，适合需要用户明确知悉但交互简单的场景。
- **Dialog**：强提醒、强交互，通常需要用户做选择或确认，适合涉及决策的流程或风险操作。

## 提示类型

通过 `type` 属性设置不同的提示类型：

- `'success'`：成功提示，绿色图标
- `'error'`：错误提示，红色图标
- `'warning'`：警告提示，橙色图标
- `'info'`：信息提示，蓝色图标
- `null`：无类型，不显示默认图标

## 显示位置

默认从顶部滑入，设置 `position` 为 `'bottom'` 可从底部滑入。通过 `py` 属性调整距离顶部/底部的距离。

## 自动关闭

默认 3 秒后自动关闭，通过 `duration` 属性调整显示时长。设置为 `0` 则不自动关闭，需手动关闭。

## 过渡动画

通过 `transitionType` 属性设置过渡动画，支持 [svelte/transition](https://svelte.dev/docs/svelte/svelte-transition) 的所有适用于普通 DOM 元素的动画函数：

- `'fly'`：飞入动画（默认），从顶部/底部滑入
- `'scale'`：缩放动画
- `'fade'`：淡入动画
- `'slide'`：展开动画
- `'blur'`：模糊动画
- `null`：无动画

## 动画参数

通过 `transitionParams` 属性设置动画参数，其中 `duration` 表示进入的动画时间（默认 300ms）。

transitionParams 具体支持的参数请参考 [svelte/transition](https://svelte.dev/docs/svelte/svelte-transition)。

例如，可以自定义 fly 动画的 Y 值：

```svelte
<Alert transitionType="fly" transitionParams={{ y: 200, delay: 100 }} />
```

考虑到用户体验，提示信息出现时有一个较短的动画（默认 300ms），能引起用户的注意力；而提示信息展示完后可以通过 `outDuration` 属性设置退出的动画时间（默认 300ms）。

退出动画只允许设置动画时长，其他参数会沿用进入动画的参数，保证动画效果「从哪里来回哪里去」。

## 缓动函数

通过 `easeType` 属性设置进入动画的缓动函数，`easeOutType` 设置退出动画的缓动函数，支持 [svelte/easing](https://svelte.dev/docs/svelte/svelte-easing) 的所有缓动函数：

- `'linear'`：线性
- `'cubicOut'`：三次方缓出（默认）
- `'bounceOut'`：弹跳缓出
- `'elasticOut'`：弹性缓出
- `'backOut'`：回弹缓出
- 更多缓动函数请参考 svelte/easing 文档

例如，使用弹性缓动效果：

```svelte
<Alert easeType="elasticOut" easeOutType="elasticOut" />
```

## 自定义卡片样式

通过 `card` 属性传递 Card 组件的配置，可自定义阴影、圆角、边框等样式。

## 自定义内容

通过 `children` Snippet 可完全自定义提示内容，实现更复杂的交互效果。

## 穿透点击

默认允许点击穿透（`clickable` 为 `true`），即提示显示时可以点击下方内容。设置为 `false` 可阻止穿透。

## injClass

通过 `injClass` 参数可以向组件外层容器注入 CSS 名称。

若注入的 class 没生效，请在注入的 class 名称前添加"!"，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
