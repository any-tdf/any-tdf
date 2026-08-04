## ColorPicker Props

| 名称         | 类型                                                           | 默认值                    | 必传 | 说明                            |
| ------------ | -------------------------------------------------------------- | ------------------------- | ---- | ------------------------------- |
| visible      | `boolean`                                                      | `false`                   | N    | 是否显示。                      |
| value        | `OklchColor \| [number, number, number] \| string`             | 主题色                    | N    | 颜色值，未传入时使用主题颜色。  |
| modes        | `('oklch' \| 'rgb' \| 'hex')[]`                                | `['oklch', 'rgb', 'hex']` | N    | 支持的模式，第一个为初始模式。  |
| showPreview  | `boolean`                                                      | `true`                    | N    | 是否显示颜色预览。              |
| showInputs   | `boolean`                                                      | `true`                    | N    | 是否显示输入框。                |
| showCopy     | `boolean`                                                      | `true`                    | N    | 是否显示复制功能。              |
| panelHeight  | `number`                                                       | `160`                     | N    | 颜色面板高度。                  |
| sliderHeight | `number`                                                       | `24`                      | N    | 滑动条高度。                    |
| radius       | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`      | `'md'`                    | N    | 圆角大小。                      |
| injClass     | `string`                                                       | `''`                      | N    | 注入 CSS 类名。                 |
| popup        | [`Popup`](https://stdf.dev/components?nav=popup&tab=1)\|`null` | `{}`                      | N    | 弹出层参数，`null` 时直接展示。 |
| tab          | [`Tab`](https://stdf.dev/components?nav=tabs&tab=1)            | `{}`                      | N    | Tab 配置。                      |

## ColorPicker Events

| 名称     | 类型                         | 参数                                  | 描述                             |
| -------- | ---------------------------- | ------------------------------------- | -------------------------------- |
| onchange | `(colors: string[]) => void` | colors - 当前颜色值数组（各模式格式） | 颜色变化时触发（直接显示模式）。 |
| onclose  | `(colors: string[]) => void` | colors - 当前颜色值数组（各模式格式） | 关闭时触发（Popup 模式）。       |
| oncopy   | `(text: string) => void`     | text - 复制的文本                     | 复制颜色值时触发。               |

## OklchColor 类型

| 名称 | 类型     | 说明               |
| ---- | -------- | ------------------ |
| l    | `number` | 亮度，范围 0-1。   |
| c    | `number` | 彩度，范围 0-0.4。 |
| h    | `number` | 色相，范围 0-360。 |

## ColorPickerValue 类型

ColorPicker 支持三种格式的颜色值输入：

| 格式  | 类型                                  | 示例                          | 说明                     |
| ----- | ------------------------------------- | ----------------------------- | ------------------------ |
| OKLCH | `{ l: number, c: number, h: number }` | `{ l: 0.7, c: 0.15, h: 250 }` | OKLCH 颜色空间对象格式。 |
| RGB   | `[number, number, number]`            | `[255, 100, 50]`              | RGB 数组格式。           |
| HEX   | `string`                              | `'#FF6432'`                   | 十六进制字符串格式。     |

## 返回值格式

onchange 和 onclose 回调返回的 colors 数组包含当前颜色在各模式下的字符串表示：

| 索引 | 模式  | 格式示例                   |
| ---- | ----- | -------------------------- |
| 0    | HEX   | `#FF6432`                  |
| 1    | RGB   | `rgb(255, 100, 50)`        |
| 2    | OKLCH | `oklch(0.700 0.150 250.0)` |
