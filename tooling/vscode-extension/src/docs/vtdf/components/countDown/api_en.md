## CountDown Props

| Name        | Type      | Default      | Required | Description                           |
| ----------- | --------- | ------------ | -------- | ------------------------------------- |
| time        | `number`  | `0`          | N        | Total countdown time in milliseconds. |
| format      | `string`  | `'HH:mm:ss'` | N        | Time format string.                   |
| autoStart   | `boolean` | `true`       | N        | Whether to auto start.                |
| millisecond | `boolean` | `false`      | N        | Enable millisecond rendering.         |
| injClass    | `string`  | `''`         | N        | Injected CSS class.                   |

## CountDown Events

| Name   | Type                           | Parameters           | Description                    |
| ------ | ------------------------------ | -------------------- | ------------------------------ |
| finish | `() => void`                   | -                    | Triggered when countdown ends. |
| change | `(timeData: TimeData) => void` | timeData - Time data | Triggered on time change.      |

## CountDown Methods

Call these methods via `ref` reference:

| Method | Parameters      | Description      |
| ------ | --------------- | ---------------- |
| start  | -               | Start countdown. |
| pause  | -               | Pause countdown. |
| reset  | `time?: number` | Reset countdown. |

## CountDown Children

| Name     | Type                                             | Parameters           | Description               |
| -------- | ------------------------------------------------ | -------------------- | ------------------------- |
| children | `Vue Slot \| ((timeData: TimeData) => Vue Slot)` | timeData - Time data | Custom countdown display. |

## TimeData Type

| Property     | Type     | Description   |
| ------------ | -------- | ------------- |
| days         | `number` | Days.         |
| hours        | `number` | Hours.        |
| minutes      | `number` | Minutes.      |
| seconds      | `number` | Seconds.      |
| milliseconds | `number` | Milliseconds. |

## Format Tokens

| Token | Description             |
| ----- | ----------------------- |
| DD    | Days                    |
| HH    | Hours (zero-padded)     |
| mm    | Minutes (zero-padded)   |
| ss    | Seconds (zero-padded)   |
| SSS   | Milliseconds (3 digits) |
| SS    | Milliseconds (2 digits) |
| S     | Milliseconds (1 digit)  |
