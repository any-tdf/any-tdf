## Mask Props

| Name         | Type                                                                 | Default  | Required | Description                                  |
| ------------ | -------------------------------------------------------------------- | -------- | -------- | -------------------------------------------- |
| visible      | `boolean`                                                            | `false`  | N        | Whether to show the mask.                    |
| opacity      | `'0.1'\|'0.2'\|'0.3'\|'0.4'\|'0.5'\|'0.6'\|'0.7'\|'0.8'\|'0.9'\|'1'` | `'0.5'`  | N        | Opacity of the mask.                         |
| duration     | `number`                                                             | `150`    | N        | Duration of the show animation in ms.        |
| outDuration  | `number`                                                             | `0`      | N        | Duration of the hide animation in ms.        |
| inverse      | `boolean`                                                            | `false`  | N        | Whether to invert the mask background color. |
| clickable    | `boolean`                                                            | `false`  | N        | Whether the mask is click-through.           |
| backdropBlur | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'`                 | `'none'` | N        | Backdrop blur level.                         |
| zIndex       | `number`                                                             | `500`    | N        | z-index value.                               |

## Mask Events

| Name        | Type         | Parameters | Description                                                                                                         |
| ----------- | ------------ | ---------- | ------------------------------------------------------------------------------------------------------------------- |
| onClickMask | `() => void` | -          | Triggered when clicking the mask. Not triggered when clickable is true.                                             |
| onclickMask | `() => void` | -          | Triggered when clicking the mask. Not triggered when clickable is true. Lowercase event alias compatible with STDF. |

## Mask Children

| Name     | Type      | Parameters | Description   |
| -------- | --------- | ---------- | ------------- |
| children | ReactNode | -          | Mask content. |
