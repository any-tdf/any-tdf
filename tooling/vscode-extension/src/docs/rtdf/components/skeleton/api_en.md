## Skeleton Props

| Name      | Type                                                                   | Default   | Required | Description                                                                                                          |
| --------- | ---------------------------------------------------------------------- | --------- | -------- | -------------------------------------------------------------------------------------------------------------------- |
| type      | `'div'\|'p'\|'img'\|'video'\|'code'\|'qrcode'\|'barcode'`              | `'div'`   | N        | Type of skeleton.                                                                                                    |
| width     | `'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'24'\|'32'\|'48'\|'64'\|'96'\|'full'` | `'6'`     | N        | Width.                                                                                                               |
| height    | `'1'\|'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'24'\|'32'\|'48'\|'64'\|'96'`    | `'6'`     | N        | Height.                                                                                                              |
| radius    | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`              | `''`      | N        | Border radius style.                                                                                                 |
| space     | `'0.5'\|'1'\|'2'\|'4'\|'8'`                                            | `'1'`     | N        | Padding.                                                                                                             |
| padding   | `'0.5'\|'1'\|'2'\|'4'\|'8'`                                            | -         | N        | Alias for padding, compatible with the legacy STDF docs naming. It takes priority over space when both are provided. |
| lines     | `number`                                                               | `3`       | N        | Number of lines, only takes effect when type is p.                                                                   |
| iconRatio | `number`                                                               | `0.6`     | N        | Internal icon ratio, only takes effect when type is img, video, code, qrcode, or barcode.                            |
| effect    | `'pulse'\|'wave'\|'breathe'\|'none'`                                   | `'pulse'` | N        | Animation effect.                                                                                                    |
| bg        | `'gray'\|'theme'`                                                      | `'gray'`  | N        | Background color.                                                                                                    |
| injClass  | `string`                                                               | `''`      | N        | Injected CSS class name.                                                                                             |
