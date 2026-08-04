## ColorPicker Props

| Name         | Type                                                      | Default                   | Required | Description                          |
| ------------ | --------------------------------------------------------- | ------------------------- | -------- | ------------------------------------ |
| visible      | `boolean`                                                 | `false`                   | N        | Whether to show (Popup mode).        |
| value        | `OklchColor \| [number, number, number] \| string`        | Theme color primary/dark  | N        | Color value in oklch/rgb/hex format. |
| modes        | `('oklch' \| 'rgb' \| 'hex')[]`                           | `['oklch', 'rgb', 'hex']` | N        | Supported modes, first is initial.   |
| showPreview  | `boolean`                                                 | `true`                    | N        | Whether to show color preview area.  |
| showPanel    | `boolean`                                                 | `true`                    | N        | Whether to show color panel.         |
| showInputs   | `boolean`                                                 | `true`                    | N        | Whether to show input fields.        |
| showCopy     | `boolean`                                                 | `true`                    | N        | Whether to show copy feature.        |
| panelHeight  | `number`                                                  | `160`                     | N        | Color panel height (pixels).         |
| sliderHeight | `number`                                                  | `24`                      | N        | Slider height (pixels).              |
| radius       | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `'md'`                    | N        | Border radius size.                  |
| injClass     | `string`                                                  | `''`                      | N        | Injected CSS class.                  |
| popup        | [`Popup`](/components?nav=popup&tab=1)\|`null`            | `{}`                      | N        | Popup params, `null` for inline.     |
| tab          | [`Tab`](/components?nav=tabs&tab=1)                       | `{}`                      | N        | Tab config params.                   |

## ColorPicker Events

| Name   | Type                         | Parameters                  | Description                   |
| ------ | ---------------------------- | --------------------------- | ----------------------------- |
| change | `(colors: string[]) => void` | colors - Color values array | Triggered when color changes. |
| close  | `(colors: string[]) => void` | colors - Color values array | Triggered when popup closed.  |
| copy   | `(text: string) => void`     | text - Copied text          | Triggered when copied.        |

## OklchColor Type

| Name | Type     | Description           |
| ---- | -------- | --------------------- |
| l    | `number` | Lightness, range 0-1. |
| c    | `number` | Chroma, range 0-0.4.  |
| h    | `number` | Hue, range 0-360.     |

## ColorPickerValue Type

ColorPicker supports three color value input formats:

| Format | Type                                  | Example                       | Description          |
| ------ | ------------------------------------- | ----------------------------- | -------------------- |
| OKLCH  | `{ l: number, c: number, h: number }` | `{ l: 0.7, c: 0.15, h: 250 }` | OKLCH object format. |
| RGB    | `[number, number, number]`            | `[255, 100, 50]`              | RGB array format.    |
| HEX    | `string`                              | `'#FF6432'`                   | Hex string format.   |

## Return Value Format

The colors array returned by the `change` and `close` events contains each mode's string representation:

| Index | Mode  | Format Example             |
| ----- | ----- | -------------------------- |
| 0     | HEX   | `#FF6432`                  |
| 1     | RGB   | `rgb(255, 100, 50)`        |
| 2     | OKLCH | `oklch(0.700 0.150 250.0)` |
