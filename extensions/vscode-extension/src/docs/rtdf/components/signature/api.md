## Signature Props

| 名称              | 类型                                                      | 默认值      | 必传 | 说明                                   |
| ----------------- | --------------------------------------------------------- | ----------- | ---- | -------------------------------------- |
| aspectRatio       | `[number, number]`                                        | `[3, 1]`    | N    | 画板宽高比                             |
| direction         | `'top' \| 'bottom' \| 'left' \| 'right'`                  | `'top'`     | N    | 方向标记，用于横屏签名时标识上下方向   |
| lineWidth         | `number`                                                  | `3`         | N    | 画笔粗细（像素）                       |
| lineColor         | `string`                                                  | `'#000000'` | N    | 画笔颜色                               |
| bgColor           | `string`                                                  | `'#ffffff'` | N    | 画板背景色                             |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N    | 画板圆角，使用主题配置                 |
| showDirectionMark | `boolean`                                                 | `true`      | N    | 是否显示方向标记                       |
| showButtons       | `boolean`                                                 | `true`      | N    | 是否显示操作按钮                       |
| clearText         | `string`                                                  | `'清空'`    | N    | 清空按钮文字                           |
| confirmText       | `string`                                                  | `'确认'`    | N    | 确认按钮文字                           |
| clearButton       | [`Button`](/components?nav=button&tab=1)                  | `{}`        | N    | 清空按钮参数                           |
| confirmButton     | [`Button`](/components?nav=button&tab=1)                  | `{}`        | N    | 确认按钮参数                           |
| imageType         | `'png' \| 'jpeg' \| 'webp'`                               | `'png'`     | N    | 导出图片格式                           |
| imageQuality      | `number`                                                  | `0.92`      | N    | 导出图片质量（0-1，仅 jpeg/webp 有效） |
| injClass          | `string`                                                  | `''`        | N    | 注入 CSS 类                            |
| canvasClass       | `string`                                                  | `''`        | N    | 画布注入 CSS 类                        |

## SignatureResult

| 名称      | 类型                                     | 说明            |
| --------- | ---------------------------------------- | --------------- |
| dataUrl   | `string`                                 | Base64 图片数据 |
| direction | `'top' \| 'bottom' \| 'left' \| 'right'` | 方向标记        |
| isEmpty   | `boolean`                                | 是否为空签名    |

## Signature Events

| 名称        | 类型                                | 参数             | 说明                                      |
| ----------- | ----------------------------------- | ---------------- | ----------------------------------------- |
| onClear     | `() => void`                        | -                | 清空时触发                                |
| onclear     | `() => void`                        | -                | 清空时触发 兼容 STDF 的小写事件别名。     |
| onConfirm   | `(result: SignatureResult) => void` | result: 签名结果 | 确认时触发                                |
| onconfirm   | `(result: SignatureResult) => void` | result: 签名结果 | 确认时触发 兼容 STDF 的小写事件别名。     |
| onDrawStart | `() => void`                        | -                | 开始绘制时触发                            |
| ondrawStart | `() => void`                        | -                | 开始绘制时触发 兼容 STDF 的小写事件别名。 |
| onDrawEnd   | `() => void`                        | -                | 结束绘制时触发                            |
| ondrawEnd   | `() => void`                        | -                | 结束绘制时触发 兼容 STDF 的小写事件别名。 |

## Signature Methods

| 名称         | 类型                                                            | 说明                           |
| ------------ | --------------------------------------------------------------- | ------------------------------ |
| clear        | `() => void`                                                    | 清空画布                       |
| getSignature | `(rotation?: 0 \| 90 \| 180 \| 270) => SignatureResult \| null` | 获取签名数据，可按角度旋转导出 |
| isEmpty      | `() => boolean`                                                 | 判断签名是否为空               |
