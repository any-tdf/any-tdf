## Signature Props

| Name              | Type                                                      | Default     | Required | Description                                                  |
| ----------------- | --------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------ |
| aspectRatio       | `[number, number]`                                        | `[3, 1]`    | N        | Canvas aspect ratio                                          |
| direction         | `'top' \| 'bottom' \| 'left' \| 'right'`                  | `'top'`     | N        | Direction mark for identifying orientation in landscape mode |
| lineWidth         | `number`                                                  | `3`         | N        | Line width in pixels                                         |
| lineColor         | `string`                                                  | -           | N        | Line color, auto adapts to light/dark mode if not set        |
| bgColor           | `string`                                                  | -           | N        | Background color, auto adapts to light/dark mode if not set  |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N        | Canvas border radius using theme config                      |
| showDirectionMark | `boolean`                                                 | `true`      | N        | Whether to show direction mark                               |
| showButtons       | `boolean`                                                 | `true`      | N        | Whether to show action buttons                               |
| clearText         | `string`                                                  | `'Clear'`   | N        | Clear button text                                            |
| confirmText       | `string`                                                  | `'Confirm'` | N        | Confirm button text                                          |
| clearButton       | [`Button`](https://stdf.dev/components?nav=button&tab=1)  | `{}`        | N        | Clear button parameters                                      |
| confirmButton     | [`Button`](https://stdf.dev/components?nav=button&tab=1)  | `{}`        | N        | Confirm button parameters                                    |
| imageType         | `'png' \| 'jpeg' \| 'webp'`                               | `'png'`     | N        | Export image format                                          |
| imageQuality      | `number`                                                  | `0.92`      | N        | Export image quality (0-1, only for jpeg/webp)               |
| injClass          | `string`                                                  | `''`        | N        | Inject CSS class                                             |
| canvasClass       | `string`                                                  | `''`        | N        | Canvas inject CSS class                                      |

## SignatureResult

| Name      | Type                                     | Description                |
| --------- | ---------------------------------------- | -------------------------- |
| dataUrl   | `string`                                 | Base64 image data          |
| direction | `'top' \| 'bottom' \| 'left' \| 'right'` | Direction mark             |
| isEmpty   | `boolean`                                | Whether signature is empty |

## Signature Events

| Name        | Type                                | Parameters               | Description                   |
| ----------- | ----------------------------------- | ------------------------ | ----------------------------- |
| onclear     | `() => void`                        | -                        | Triggered when cleared        |
| onconfirm   | `(result: SignatureResult) => void` | result: signature result | Triggered when confirmed      |
| ondrawStart | `() => void`                        | -                        | Triggered when drawing starts |
| ondrawEnd   | `() => void`                        | -                        | Triggered when drawing ends   |

## Signature Methods

| Name         | Type                            | Description                 |
| ------------ | ------------------------------- | --------------------------- |
| clear        | `() => void`                    | Clear canvas                |
| getSignature | `() => SignatureResult \| null` | Get signature data          |
| isEmpty      | `() => boolean`                 | Check if signature is empty |
