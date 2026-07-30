## CharRoll Props

| Property     | Type                                                                | Default      | Required | Description                                                                    |
| ------------ | ------------------------------------------------------------------- | ------------ | -------- | ------------------------------------------------------------------------------ |
| value        | `string \| number`                                                  | `''`         | N        | Value to display.                                                              |
| duration     | `number`                                                            | `1000`       | N        | Animation duration in ms.                                                      |
| delay        | `number`                                                            | `0`          | N        | Animation delay in ms.                                                         |
| stagger      | `number`                                                            | `50`         | N        | Stagger delay per character in ms.                                             |
| direction    | `'up' \| 'down'`                                                    | `'up'`       | N        | Scroll direction.                                                              |
| height       | `number`                                                            | `40`         | N        | Character height in px.                                                        |
| separator    | `boolean`                                                           | `false`      | N        | Show thousand separator.                                                       |
| decimal      | `number`                                                            | `-`          | N        | Decimal places.                                                                |
| prefix       | `string`                                                            | `''`         | N        | Prefix.                                                                        |
| suffix       | `string`                                                            | `''`         | N        | Suffix.                                                                        |
| charSet      | `string`                                                            | `-`          | N        | Custom character set, priority over preset.                                    |
| preset       | `CharRollPreset`                                                    | `'number'`   | N        | Preset character set.                                                          |
| loops        | `number`                                                            | `1`          | N        | Number of loops.                                                               |
| autoStart    | `boolean`                                                           | `true`       | N        | Auto start animation.                                                          |
| loop         | `boolean`                                                           | `false`      | N        | Loop animation.                                                                |
| loopInterval | `number`                                                            | `3000`       | N        | Loop interval in ms.                                                           |
| easing       | EasingProps                                                         | `'cubicOut'` | N        | Easing function, 31 values available, RTDF includes built-in easing functions. |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`           | `'sm'`       | N        | Border radius.                                                                 |
| bg           | `'none' \| 'surface' \| 'gray' \| 'theme'`                          | `'none'`     | N        | Background color.                                                              |
| gap          | `'0' \| '1' \| '2' \| '3' \| '4'`                                   | `'1'`        | N        | Character gap.                                                                 |
| fontSize     | `'xs' \| 'sm' \| 'base' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl'` | `'xl'`       | N        | Font size.                                                                     |
| fontWeight   | `'normal' \| 'medium' \| 'semibold' \| 'bold'`                      | `'bold'`     | N        | Font weight.                                                                   |
| injClass     | `string`                                                            | `''`         | N        | Inject CSS class.                                                              |
| charClass    | `string`                                                            | `''`         | N        | Character container CSS class.                                                 |

## CharRoll Events

| Event      | Type                      | Parameters           | Description                                                                     |
| ---------- | ------------------------- | -------------------- | ------------------------------------------------------------------------------- |
| onStart    | `() => void`              | -                    | Triggered when animation starts.                                                |
| onstart    | `() => void`              | -                    | Triggered when animation starts. Lowercase event alias compatible with STDF.    |
| onComplete | `() => void`              | -                    | Triggered when animation completes.                                             |
| oncomplete | `() => void`              | -                    | Triggered when animation completes. Lowercase event alias compatible with STDF. |
| onChange   | `(value: string) => void` | value: current value | Triggered when value changes.                                                   |
| onchange   | `(value: string) => void` | value: current value | Triggered when value changes. Lowercase event alias compatible with STDF.       |

## CharRoll Children

| Name     | Type      | Parameters                  | Description              |
| -------- | --------- | --------------------------- | ------------------------ |
| children | ReactNode | char: string, index: number | Custom character render. |

## CharRoll Methods

Get component instance via `ref` to call these methods:

| Method  | Description                                                |
| ------- | ---------------------------------------------------------- |
| start() | Start animation.                                           |
| pause() | Pause animation, auto snap to complete character position. |
| reset() | Reset animation.                                           |

## CharRollPreset

| Value            | Character Set | Description                   |
| ---------------- | ------------- | ----------------------------- |
| `'number'`       | `0123456789`  | Numbers (default).            |
| `'letter'`       | `A-Za-z`      | Upper and lower case letters. |
| `'letterUpper'`  | `A-Z`         | Uppercase letters.            |
| `'letterLower'`  | `a-z`         | Lowercase letters.            |
| `'alphanumeric'` | `0-9A-Za-z`   | Alphanumeric.                 |
| `'hex'`          | `0-9a-f`      | Hexadecimal (lowercase).      |
| `'hexUpper'`     | `0-9A-F`      | Hexadecimal (uppercase).      |
| `'binary'`       | `01`          | Binary.                       |
| `'octal'`        | `0-7`         | Octal.                        |

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
