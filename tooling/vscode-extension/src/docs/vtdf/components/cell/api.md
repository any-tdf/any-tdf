## Cell Props

| 名称         | 类型                                                      | 默认值      | 必传 | 说明                   |
| ------------ | --------------------------------------------------------- | ----------- | ---- | ---------------------- |
| title        | `string`                                                  | `''`        | N    | 标题。                 |
| detail       | `string`                                                  | `''`        | N    | 右侧详情。             |
| left         | `null`\|[`Icon`](/components?nav=icon&tab=1)              | `null`      | N    | 最左侧内容。           |
| right        | `null\|'arrow'\|CellRight`                                | `'arrow'`   | N    | 最右侧内容。           |
| subTitle     | `string`                                                  | `''`        | N    | 左侧次级标题。         |
| info         | `string`                                                  | `''`        | N    | 右侧次级信息。         |
| line         | `boolean`                                                 | `false`     | N    | 是否显示底部分割线。   |
| bg           | `'surface'\|'gray'\|'theme'\|'white'`                     | `'surface'` | N    | 背景风格。             |
| my           | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'4'`       | N    | 上下间距。             |
| mx           | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`       | N    | 左右间距。             |
| radius       | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`        | N    | 圆角风格。             |
| switchActive | `boolean`                                                 | `false`     | N    | 开关状态。             |
| shadow       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'xs'`      | N    | 阴影风格。             |
| injClass     | `string`                                                  | `''`        | N    | 注入 CSS 名称。        |
| love         | `boolean`                                                 | `false`     | N    | 是否开启关爱版。       |
| clickAll     | `boolean`                                                 | `true`      | N    | 是否点击整行触发事件。 |

## Cell Events

| 名称  | 类型         | 参数 | 描述     |
| ----- | ------------ | ---- | -------- |
| click | `() => void` | -    | 点击触发 |

## Cell Children

| 名称        | 类型     | 参数 | 说明          |
| ----------- | -------- | ---- | ------------- |
| leftChild   | Vue Slot | -    | 最左侧内容。  |
| rightChild  | Vue Slot | -    | 最右侧内容。  |
| detailChild | Vue Slot | -    | Detail 内容。 |

## CellGroup Props

| 名称   | 类型                                                      | 默认值 | 必传 | 说明       |
| ------ | --------------------------------------------------------- | ------ | ---- | ---------- |
| my     | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'4'`  | N    | 上下间距。 |
| mx     | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'2'`  | N    | 左右间距。 |
| radius | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`   | N    | 圆角风格。 |
| shadow | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'`             | `'xs'` | N    | 阴影风格。 |

## CellGroup Children

| 名称     | 类型     | 参数 | 说明                               |
| -------- | -------- | ---- | ---------------------------------- |
| children | Vue Slot | -    | Cell Group 内容，一般是多个 Cell。 |

## CellRight

```javascript
type CellRight = {
    type: 'switch' | 'icon',
    switch?: Switch,
    icon?: Icon,
};
```
