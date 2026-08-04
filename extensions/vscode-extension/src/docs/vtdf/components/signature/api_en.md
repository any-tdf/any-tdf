## Signature Props

| Name              | Type                                                      | Default     | Required | Description                                                  |
| ----------------- | --------------------------------------------------------- | ----------- | -------- | ------------------------------------------------------------ |
| aspectRatio       | `[number, number]`                                        | `[3, 1]`    | N        | Canvas aspect ratio                                          |
| direction         | `'top' \| 'bottom' \| 'left' \| 'right'`                  | `'top'`     | N        | Direction mark for identifying orientation in landscape mode |
| lineWidth         | `number`                                                  | `3`         | N        | Line width in pixels                                         |
| lineColor         | `string`                                                  | `'#000000'` | N        | Line color                                                   |
| bgColor           | `string`                                                  | `'#ffffff'` | N        | Background color                                             |
| radius            | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N        | Canvas border radius using theme config                      |
| showDirectionMark | `boolean`                                                 | `true`      | N        | Whether to show direction mark                               |
| showButtons       | `boolean`                                                 | `true`      | N        | Whether to show action buttons                               |
| clearText         | `string`                                                  | `'Clear'`   | N        | Clear button text                                            |
| confirmText       | `string`                                                  | `'Confirm'` | N        | Confirm button text                                          |
| clearButton       | [`Button`](/components?nav=button&tab=1)                  | `{}`        | N        | Clear button parameters                                      |
| confirmButton     | [`Button`](/components?nav=button&tab=1)                  | `{}`        | N        | Confirm button parameters                                    |
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

| Name       | Type                                | Parameters               | Description                   |
| ---------- | ----------------------------------- | ------------------------ | ----------------------------- |
| clear      | `() => void`                        | -                        | Triggered when cleared        |
| confirm    | `(result: SignatureResult) => void` | result: signature result | Triggered when confirmed      |
| draw-start | `() => void`                        | -                        | Triggered when drawing starts |
| draw-end   | `() => void`                        | -                        | Triggered when drawing ends   |

## Signature Methods

| Name         | Type                                                            | Description                                           |
| ------------ | --------------------------------------------------------------- | ----------------------------------------------------- |
| clear        | `() => void`                                                    | Clear canvas                                          |
| getSignature | `(rotation?: 0 \| 90 \| 180 \| 270) => SignatureResult \| null` | Get signature data, optionally exported with rotation |
| isEmpty      | `() => boolean`                                                 | Check if signature is empty                           |
