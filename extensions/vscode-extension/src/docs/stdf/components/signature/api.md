## Signature Props

| 名称              | 类型                                                      | 默认值   | 必传 | 说明                                   |
| ----------------- | --------------------------------------------------------- | -------- | ---- | -------------------------------------- |
| aspectRatio       | `[number, number]`                                        | `[3, 1]` | N    | 画板宽高比                             |
| direction         | `'top' \| 'bottom' \| 'left' \| 'right'`                  | `'top'`  | N    | 方向标记，用于横屏签名时标识上下方向   |
| lineWidth         | `number`                                                  | `3`      | N    | 画笔粗细（像素）                       |
| lineColor         | `string`                                                  | -        | N    | 画笔颜色，不设置则自动适配亮暗模式     |
| bgColor           | `string`                                                  | -        | N    | 画板背景色，不设置则自动适配亮暗模式   |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`     | N    | 画板圆角，使用主题配置                 |
| showDirectionMark | `boolean`                                                 | `true`   | N    | 是否显示方向标记                       |
| showButtons       | `boolean`                                                 | `true`   | N    | 是否显示操作按钮                       |
| clearText         | `string`                                                  | `'清空'` | N    | 清空按钮文字                           |
| confirmText       | `string`                                                  | `'确认'` | N    | 确认按钮文字                           |
| clearButton       | [`Button`](https://stdf.dev/components?nav=button&tab=1)  | `{}`     | N    | 清空按钮参数                           |
| confirmButton     | [`Button`](https://stdf.dev/components?nav=button&tab=1)  | `{}`     | N    | 确认按钮参数                           |
| imageType         | `'png' \| 'jpeg' \| 'webp'`                               | `'png'`  | N    | 导出图片格式                           |
| imageQuality      | `number`                                                  | `0.92`   | N    | 导出图片质量（0-1，仅 jpeg/webp 有效） |
| injClass          | `string`                                                  | `''`     | N    | 注入 CSS 类                            |
| canvasClass       | `string`                                                  | `''`     | N    | 画布注入 CSS 类                        |

## SignatureResult

| 名称      | 类型                                     | 说明            |
| --------- | ---------------------------------------- | --------------- |
| dataUrl   | `string`                                 | Base64 图片数据 |
| direction | `'top' \| 'bottom' \| 'left' \| 'right'` | 方向标记        |
| isEmpty   | `boolean`                                | 是否为空签名    |

## Signature Events

| 名称        | 类型                                | 参数             | 说明           |
| ----------- | ----------------------------------- | ---------------- | -------------- |
| onclear     | `() => void`                        | -                | 清空时触发     |
| onconfirm   | `(result: SignatureResult) => void` | result: 签名结果 | 确认时触发     |
| ondrawStart | `() => void`                        | -                | 开始绘制时触发 |
| ondrawEnd   | `() => void`                        | -                | 结束绘制时触发 |

## Signature Methods

| 名称         | 类型                            | 说明             |
| ------------ | ------------------------------- | ---------------- |
| clear        | `() => void`                    | 清空画布         |
| getSignature | `() => SignatureResult \| null` | 获取签名数据     |
| isEmpty      | `() => boolean`                 | 判断签名是否为空 |
