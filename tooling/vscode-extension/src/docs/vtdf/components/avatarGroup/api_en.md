## AvatarGroup Props

| Name      | Type                                                      | Default   | Required | Description                                   |
| --------- | --------------------------------------------------------- | --------- | -------- | --------------------------------------------- |
| data      | `Avatar[]`                                                | `[]`      | N        | Array of Avatar Props data.                   |
| radius    | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`    | N        | Border radius style.                          |
| size      | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`    | N        | Avatar frame size.                            |
| compact   | `number`                                                  | `5`       | N        | Compactness level, higher means more compact. |
| lineWidth | `'0'\|'1'\|'2'\|'3'\|'4'\|'8'`                            | `'3'`     | N        | Border width.                                 |
| reverse   | `boolean`                                                 | `false`   | N        | Whether to reverse the order.                 |
| max       | `number`                                                  | `10`      | N        | Maximum number of avatars to display.         |
| top       | `'totle'\|'add'\|null`\|Vue Slot                          | `'totle'` | N        | Top layer content.                            |
| injClass  | `string`                                                  | `''`      | N        | Injected CSS class name.                      |

## AvatarGroup Events

| Name  | Type         | Params | Description                          |
| ----- | ------------ | ------ | ------------------------------------ |
| click | `() => void` | -      | Triggered when avatar group clicked. |
