## TabBar Props

| 名称              | 类型            | 默认值  | 必传 | 说明                        |
| ----------------- | --------------- | ------- | ---- | --------------------------- |
| labels            | `TabBarLabel[]` | `[]`    | Y    | 选项卡内容组。              |
| active            | `number`        | `0`     | N    | 激活的选项卡索引值。        |
| line              | `boolean`       | `false` | N    | 底部是否显示线条。          |
| lineW             | `number`        | `4`     | N    | 线条占当前 Tab 宽度的比例。 |
| love              | `boolean`       | `false` | N    | 是否开启关爱版。            |
| injClass          | `string`        | `''`    | N    | TabBar 外层注入 CSS。       |
| tabInjClass       | `string`        | `''`    | N    | 单项 Tab 注入 CSS。         |
| activeTabInjClass | `string`        | `''`    | N    | 激活的 Tab 注入 CSS。       |
| activeInjClass    | `string`        | `''`    | N    | 底部线条注入 CSS。          |

## TabBarLabel Props

| 名称       | 类型                                 | 默认值 | 必传 | 说明               |
| ---------- | ------------------------------------ | ------ | ---- | ------------------ |
| text       | `string`                             | `''`   | N    | 选项卡文字。       |
| icon       | [`Icon`](/components?nav=icon&tab=1) | -      | N    | 选项卡图标。       |
| activeIcon | [`Icon`](/components?nav=icon&tab=1) | -      | N    | 激活的选项卡图标。 |

## TabBar Events

| 名称   | 类型                       | 参数                            | 描述                 |
| ------ | -------------------------- | ------------------------------- | -------------------- |
| change | `(active: number) => void` | `active` - 激活的 TabBar 索引值 | 点击 TabBar 时触发。 |
