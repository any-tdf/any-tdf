## Loading Props

| Name          | Type                                                                                           | Default | Required | Description                                                     |
| ------------- | ---------------------------------------------------------------------------------------------- | ------- | -------- | --------------------------------------------------------------- |
| type          | `string`                                                                                       | `'1_0'` | N        | Type number.                                                    |
| height        | `'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'20'\|'28'\|'36'\|'48'\|'56'\|'64'\|'72'\|'80'\|'96'\|'full'` | `'8'`   | N        | Container height.                                               |
| width         | `'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'20'\|'28'\|'36'\|'48'\|'56'\|'64'\|'72'\|'80'\|'96'\|'full'` | `'8'`   | N        | Container width.                                                |
| theme         | `boolean`                                                                                      | `false` | N        | Whether to use theme color, only works for monochrome.          |
| inverse       | `boolean`                                                                                      | `false` | N        | Whether to use contrast color, only works for mono/dual colors. |
| customColor   | `string[]`                                                                                     | `[]`    | N        | Custom color array.                                             |
| lazyAnimation | `boolean`                                                                                      | `true`  | N        | Whether to enable lazy animation.                               |
| speed         | `number`                                                                                       | `1`     | N        | Animation speed, base value is 1.                               |
