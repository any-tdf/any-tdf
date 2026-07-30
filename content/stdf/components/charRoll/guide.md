## 基本用法

通过 `value` 属性设置要显示的值，可以是数字或字符串。组件默认会自动开始滚动动画。

## 预设字符集

通过 `preset` 属性选择预设的字符集：

- `'number'`：数字 0-9（默认）
- `'letter'`：大小写字母 A-Za-z
- `'letterUpper'`：大写字母 A-Z
- `'letterLower'`：小写字母 a-z
- `'alphanumeric'`：字母数字混合
- `'hex'`：十六进制 0-9a-f
- `'hexUpper'`：十六进制大写 0-9A-F
- `'binary'`：二进制 01
- `'octal'`：八进制 0-7

## 自定义字符集

通过 `charSet` 属性可以完全自定义滚动的字符集，优先级高于 `preset`。适用于表情符号、中文字符等特殊场景。

注意：对于组合字符（如 7⃣ 等由多个 Unicode 码点组成的字符），建议使用单一码点的字符，以避免字符拆分问题。

## 金额格式

通过 `separator` 属性开启千分位分隔符，通过 `decimal` 属性设置小数位数。可以结合 `prefix` 和 `suffix` 属性添加货币符号和单位。

## 滚动方向

通过 `direction` 属性设置滚动方向：

- `'up'`：向上滚动（默认）
- `'down'`：向下滚动

## 循环圈数

通过 `loops` 属性设置动画滚动的圈数。增加圈数可以让动画更加华丽，适合抽奖、老虎机等场景。

## 错开动画

通过 `stagger` 属性设置每个字符的动画延迟时间（毫秒），可以产生波浪式的动画效果。设置为 `0` 则所有字符同时滚动。

## 手动控制

设置 `autoStart` 为 `false` 可以禁用自动开始。通过 `bind:this` 获取组件实例后，可以调用以下方法手动控制动画：

- `start()`：开始动画
- `pause()`：暂停动画（自动对齐到完整字符位置）
- `reset()`：重置动画

## 循环播放

设置 `loop` 为 `true` 可以开启循环播放，通过 `loopInterval` 设置循环间隔时间。

## 缓动函数

滚动动画的缓动类型由 `easing` 属性决定，默认值为 `cubicOut`，可选值有 31 个（一个线性动画 `linear` 与下面 30 种非线性动画），具体值可参考 [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing)，具体非线性动效可参考 [ease visualiser](https://svelte.dev/examples/easing)。动画持续时间由 `duration` 属性决定。

| ease    | in        | out        | inOut        |
| ------- | --------- | ---------- | ------------ |
| back    | backIn    | backOut    | backInOut    |
| bounce  | bounceIn  | bounceOut  | bounceInOut  |
| circ    | circIn    | circOut    | circInOut    |
| cubic   | cubicIn   | cubicOut   | cubicInOut   |
| elastic | elasticIn | elasticOut | elasticInOut |
| expo    | expoIn    | expoOut    | expoInOut    |
| quad    | quadIn    | quadOut    | quadInOut    |
| quart   | quartIn   | quartOut   | quartInOut   |
| quint   | quintIn   | quintOut   | quintInOut   |
| sine    | sineIn    | sineOut    | sineInOut    |

其中 `backOut` 会产生回弹效果，`elasticOut` 会产生弹性效果，`bounceOut` 会产生弹跳效果，适合老虎机、抽奖等需要视觉冲击力的场景。

## 自定义样式

组件提供丰富的样式配置：

- `height`：字符高度（像素）
- `fontSize`：字体大小
- `fontWeight`：字体粗细
- `bg`：背景色
- `radius`：圆角
- `gap`：字符间距

## 事件回调

- `onstart`：动画开始时触发
- `oncomplete`：动画完成时触发
- `onchange`：值变化时触发

## CSS 注入

通过 `injClass` 参数可以向组件容器注入 CSS 类名，通过 `charClass` 可以向每个字符容器注入 CSS 类名。

## 自定义渲染

通过 `children` Snippet 可以完全自定义每个字符的渲染内容。Snippet 接收两个参数：

- `char`：当前字符
- `index`：字符索引
