## CharRoll Props

| 名称         | 类型                                                                | 默认值       | 必传 | 说明                                            |
| ------------ | ------------------------------------------------------------------- | ------------ | ---- | ----------------------------------------------- |
| value        | `string \| number`                                                  | `''`         | N    | 显示的值。                                      |
| duration     | `number`                                                            | `1000`       | N    | 动画持续时间，单位：ms。                        |
| delay        | `number`                                                            | `0`          | N    | 动画延迟时间，单位：ms。                        |
| stagger      | `number`                                                            | `50`         | N    | 每个字符的错开延迟，单位：ms。                  |
| direction    | `'up' \| 'down'`                                                    | `'up'`       | N    | 滚动方向。                                      |
| height       | `number`                                                            | `40`         | N    | 字符高度，单位：px。                            |
| separator    | `boolean`                                                           | `false`      | N    | 是否显示千分位分隔符。                          |
| decimal      | `number`                                                            | `-`          | N    | 小数位数。                                      |
| prefix       | `string`                                                            | `''`         | N    | 前缀。                                          |
| suffix       | `string`                                                            | `''`         | N    | 后缀。                                          |
| charSet      | `string`                                                            | `-`          | N    | 自定义字符集，优先级高于 preset。               |
| preset       | `CharRollPreset`                                                    | `'number'`   | N    | 预设字符集。                                    |
| loops        | `number`                                                            | `1`          | N    | 循环圈数。                                      |
| autoStart    | `boolean`                                                           | `true`       | N    | 是否自动开始动画。                              |
| loop         | `boolean`                                                           | `false`      | N    | 是否循环播放。                                  |
| loopInterval | `number`                                                            | `3000`       | N    | 循环间隔，单位：ms。                            |
| easing       | EasingProps                                                         | `'cubicOut'` | N    | 缓动函数，共 31 个值，VTDF 内置 easing 函数集。 |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`           | `'sm'`       | N    | 圆角样式。                                      |
| bg           | `'none' \| 'surface' \| 'gray' \| 'theme'`                          | `'none'`     | N    | 背景色。                                        |
| gap          | `'0' \| '1' \| '2' \| '3' \| '4'`                                   | `'1'`        | N    | 字符间距。                                      |
| fontSize     | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'xl'`       | N    | 字体大小。                                      |
| fontWeight   | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                      | `'bold'`     | N    | 字体粗细。                                      |
| injClass     | `string`                                                            | `''`         | N    | 注入 CSS 类。                                   |
| charClass    | `string`                                                            | `''`         | N    | 字符容器 CSS 类。                               |

## CharRoll Events

| 名称     | 类型                      | 参数          | 说明             |
| -------- | ------------------------- | ------------- | ---------------- |
| start    | `() => void`              | -             | 动画开始时触发。 |
| complete | `() => void`              | -             | 动画完成时触发。 |
| change   | `(value: string) => void` | value: 当前值 | 值变化时触发。   |

## CharRoll Children

| 名称     | 类型     | 参数                        | 说明             |
| -------- | -------- | --------------------------- | ---------------- |
| children | Vue Slot | char: string, index: number | 自定义字符渲染。 |

## CharRoll Methods

通过 `ref` 获取组件实例，可调用以下方法：

| 方法    | 说明                               |
| ------- | ---------------------------------- |
| start() | 开始动画。                         |
| pause() | 暂停动画，自动对齐到完整字符位置。 |
| reset() | 重置动画。                         |

## CharRollPreset

| 值               | 字符集       | 说明               |
| ---------------- | ------------ | ------------------ |
| `'number'`       | `0123456789` | 数字（默认）。     |
| `'letter'`       | `A-Za-z`     | 大小写字母。       |
| `'letterUpper'`  | `A-Z`        | 大写字母。         |
| `'letterLower'`  | `a-z`        | 小写字母。         |
| `'alphanumeric'` | `0-9A-Za-z`  | 字母数字混合。     |
| `'hex'`          | `0-9a-f`     | 十六进制（小写）。 |
| `'hexUpper'`     | `0-9A-F`     | 十六进制（大写）。 |
| `'binary'`       | `01`         | 二进制。           |
| `'octal'`        | `0-7`        | 八进制。           |

## SmallAreaRadius

```typescript
type SmallAreaRadius = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full' | '';
```

## EasingProps

```typescript
type EasingProps =
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
