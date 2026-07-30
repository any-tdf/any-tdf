## Cell Props

| Name         | Type                                                      | Default     | Required | Description                  |
| ------------ | --------------------------------------------------------- | ----------- | -------- | ---------------------------- |
| title        | `string`                                                  | `''`        | N        | Title.                       |
| detail       | `string`                                                  | `''`        | N        | Right detail.                |
| left         | `null`\|[`Icon`](/components?nav=icon&tab=1)              | `null`      | N        | Leftmost content.            |
| right        | `null\|'arrow'\|CellRight`                                | `'arrow'`   | N        | Rightmost content.           |
| subTitle     | `string`                                                  | `''`        | N        | Left subtitle.               |
| info         | `string`                                                  | `''`        | N        | Right secondary info.        |
| line         | `boolean`                                                 | `false`     | N        | Show bottom divider.         |
| bg           | `'surface'\|'gray'\|'theme'\|'white'`                     | `'surface'` | N        | Background style.            |
| my           | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'4'`       | N        | Vertical margin.             |
| mx           | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`       | N        | Horizontal margin.           |
| radius       | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N        | Border radius style.         |
| switchActive | `boolean`                                                 | `false`     | N        | Switch state.                |
| shadow       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'xs'`      | N        | Shadow style.                |
| injClass     | `string`                                                  | `''`        | N        | Inject CSS class name.       |
| love         | `boolean`                                                 | `false`     | N        | Enable care version.         |
| clickAll     | `boolean`                                                 | `true`      | N        | Click entire row to trigger. |

## Cell Events

| Name    | Type         | Params | Description                                                |
| ------- | ------------ | ------ | ---------------------------------------------------------- |
| onClick | `() => void` | -      | Click callback                                             |
| onclick | `() => void` | -      | Click callback Lowercase event alias compatible with STDF. |

## Cell Children

| Name        | Type      | Params | Description        |
| ----------- | --------- | ------ | ------------------ |
| leftChild   | ReactNode | -      | Leftmost content.  |
| rightChild  | ReactNode | -      | Rightmost content. |
| detailChild | ReactNode | -      | Detail content.    |

## CellGroup Props

| Name   | Type                                                      | Default | Required | Description        |
| ------ | --------------------------------------------------------- | ------- | -------- | ------------------ |
| my     | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'4'`   | N        | Vertical margin.   |
| mx     | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`   | N        | Horizontal margin. |
| radius | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`    | N        | Border radius.     |
| shadow | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'xs'`  | N        | Shadow style.      |

## CellGroup Children

| Name     | Type      | Params | Description                                      |
| -------- | --------- | ------ | ------------------------------------------------ |
| children | ReactNode | -      | Cell Group content, usually multiple Cell items. |

## CellRight

```javascript
type CellRight = {
	type: 'switch' | 'icon';
	switch?: Switch;
	icon?: Icon;
};
```
