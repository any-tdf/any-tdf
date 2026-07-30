## Avatar Props

| Name     | Type                                                      | Default  | Required | Description                        |
| -------- | --------------------------------------------------------- | -------- | -------- | ---------------------------------- |
| image    | `string`                                                  | `''`     | N        | Image path.                        |
| alt      | `string`                                                  | `''`     | N        | Alt text, single char recommended. |
| icon     | [`Icon`](/components?nav=icon&tab=1)                      | `{}`     | N        | Alternative icon.                  |
| altSize  | `'xs'\|'sm'\|'md'\|'lg'\|'xl'`                            | `'md'`   | N        | Alt text size.                     |
| radius   | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''` | `'sm'`   | N        | Border radius style.               |
| size     | `'xs'\|'sm'\|'base'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'md'`   | N        | Avatar frame size.                 |
| imgSize  | `'s'\|'m'\|'l'`                                           | `'l'`    | N        | Avatar image size.                 |
| line     | `'none'\|'solid'\|'dashed'\|'dotted'`                     | `'none'` | N        | Border style.                      |
| injClass | `string`                                                  | `''`     | N        | Injected CSS class name.           |

## Avatar Events

| Name  | Type         | Params | Description         |
| ----- | ------------ | ------ | ------------------- |
| click | `() => void` | -      | Triggered on click. |
