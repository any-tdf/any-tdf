## NoticeBar Props

| 名称      | 类型                                                      | 默认值     | 必传 | 说明                          |
| --------- | --------------------------------------------------------- | ---------- | ---- | ----------------------------- |
| textList  | `string[]`                                                | `[]`       | Y    | 通告内容组成的数组。          |
| leftIcon  | `'volume'\|null`\|[`Icon`](/components?nav=icon&tab=0)    | `'volume'` | N    | 左侧内容。                    |
| rightIcon | `'close'\|'arrow'\|null`                                  | `'close'`  | N    | 右侧内容。                    |
| space     | `number`                                                  | `100`      | N    | 通告间距，单位是 px。         |
| speed     | `number`                                                  | `30`       | N    | 横向滚动速度，单位是 px/s。   |
| vertical  | `boolean`                                                 | `false`    | N    | 是否垂直滚动。                |
| duration  | `100\|300\|500\|700\|1000`                                | `500`      | N    | 垂直滚动过渡时间，单位是 ms。 |
| interval  | `number`                                                  | `4`        | N    | 垂直滚动间隔时间，单位是 s。  |
| injClass  | `string`                                                  | `''`       | N    | 注入 CSS 名称。               |
| radius    | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`       | N    | 圆角风格。                    |

## NoticeBar Events

| 名称        | 类型         | 参数 | 描述               |
| ----------- | ------------ | ---- | ------------------ |
| click-right | `() => void` | -    | 点击右侧区域触发。 |

## NoticeBar Children

| 名称       | 类型     | 参数 | 说明                     |
| ---------- | -------- | ---- | ------------------------ |
| leftChild  | Vue Slot | -    | 传入时渲染左侧内容区域。 |
| rightChild | Vue Slot | -    | 传入时渲染右侧内容区域。 |
