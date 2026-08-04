## Popup Props

| Name               | Type                                                                               | Default      | Required | Description                                                                         |
| ------------------ | ---------------------------------------------------------------------------------- | ------------ | -------- | ----------------------------------------------------------------------------------- |
| visible            | `boolean`                                                                          | `false`      | N        | Whether to show the popup.                                                          |
| size               | `number`                                                                           | `40`         | N        | Popup size. When value is 0, size is determined by inner elements.                  |
| position           | `'center'\|'top'\|'bottom'\|'left'\|'right'`                                       | `'bottom'`   | N        | Display position.                                                                   |
| duration           | `number`                                                                           | `450`        | N        | Enter animation transition duration in ms.                                          |
| outDuration        | `number`                                                                           | `240`        | N        | Exit animation transition duration in ms.                                           |
| easeType           | `EasingProps`                                                                      | `'cubicOut'` | N        | Enter animation type, 31 values available, VTDF includes built-in easing functions. |
| easeOutType        | `EasingProps`                                                                      | `'cubicOut'` | N        | Exit animation type, 31 values available, VTDF includes built-in easing functions.  |
| px                 | `'0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'8'\|'10'\|'12'\|'16'\|'20'`                   | `'0'`        | N        | Horizontal padding.                                                                 |
| py                 | `'0'\|'1'\|'2'\|'3'\|'4'\|'5'\|'6'\|'8'\|'10'\|'12'\|'16'\|'24'\|'32'\|'48'\|'64'` | `'0'`        | N        | Vertical padding.                                                                   |
| mask               | [`Mask`](/components?nav=mask&tab=1)                                               | `{}`         | N        | Mask layer parameters.                                                              |
| maskClosable       | `boolean`                                                                          | `true`       | N        | Whether clicking mask layer closes popup.                                           |
| radiusPosition     | `'auto'\|'all'\|'top'\|'bottom'\|'left'\|'right'\|'none'`                          | `'auto'`     | N        | Border radius position.                                                             |
| radius             | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''`                          | `''`         | N        | Border radius size.                                                                 |
| transitionDistance | `number`                                                                           | `0`          | N        | Animation distance when popup size is determined by inner elements.                 |
| transparent        | `boolean`                                                                          | `false`      | N        | Whether background is transparent.                                                  |
| zIndex             | `number`                                                                           | `600`        | N        | z-index value.                                                                      |
| dynamicFixed       | `boolean`                                                                          | `true`       | N        | Whether to use dynamic fixed positioning.                                           |
| hideScrollbar      | `boolean`                                                                          | `false`      | N        | Whether to hide scrollbar in scroll area.                                           |

## Popup Events

| Name       | Type         | Params | Description                                                        |
| ---------- | ------------ | ------ | ------------------------------------------------------------------ |
| click-mask | `() => void` | -      | Triggered when clicking mask layer, even if maskClosable is false. |
| close      | `() => void` | -      | Triggered when popup closes.                                       |

## Popup Children

| Name     | Type     | Parameters | Description    |
| -------- | -------- | ---------- | -------------- |
| children | Vue Slot | -          | Popup content. |

## EasingProps

```javascript
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
