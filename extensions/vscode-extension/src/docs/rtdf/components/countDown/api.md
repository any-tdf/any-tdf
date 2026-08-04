## CountDown Props

| 名称        | 类型      | 默认值       | 必传 | 说明                     |
| ----------- | --------- | ------------ | ---- | ------------------------ |
| time        | `number`  | `0`          | N    | 倒计时总时长，单位毫秒。 |
| format      | `string`  | `'HH:mm:ss'` | N    | 时间格式化字符串。       |
| autoStart   | `boolean` | `true`       | N    | 是否自动开始倒计时。     |
| millisecond | `boolean` | `false`      | N    | 是否开启毫秒级渲染。     |
| injClass    | `string`  | `''`         | N    | 注入 CSS 名称。          |

## CountDown Events

| 名称     | 类型                           | 参数                | 说明                                          |
| -------- | ------------------------------ | ------------------- | --------------------------------------------- |
| onFinish | `() => void`                   | -                   | 倒计时结束时触发。                            |
| onfinish | `() => void`                   | -                   | 倒计时结束时触发。 兼容 STDF 的小写事件别名。 |
| onChange | `(timeData: TimeData) => void` | timeData - 时间数据 | 倒计时变化时触发。                            |
| onchange | `(timeData: TimeData) => void` | timeData - 时间数据 | 倒计时变化时触发。 兼容 STDF 的小写事件别名。 |

## CountDown Methods

通过 `ref` 获取组件实例后可调用以下方法：

| 方法名 | 参数            | 说明         |
| ------ | --------------- | ------------ |
| start  | -               | 开始倒计时。 |
| pause  | -               | 暂停倒计时。 |
| reset  | `time?: number` | 重置倒计时。 |

## CountDown Children

| 名称     | 类型                                               | 参数                | 说明                   |
| -------- | -------------------------------------------------- | ------------------- | ---------------------- |
| children | `ReactNode \| ((timeData: TimeData) => ReactNode)` | timeData - 时间数据 | 自定义倒计时显示内容。 |

## TimeData 类型

| 属性         | 类型     | 说明   |
| ------------ | -------- | ------ |
| days         | `number` | 天数。 |
| hours        | `number` | 小时。 |
| minutes      | `number` | 分钟。 |
| seconds      | `number` | 秒数。 |
| milliseconds | `number` | 毫秒。 |

## format 格式说明

| 格式 | 说明         |
| ---- | ------------ |
| DD   | 天数         |
| HH   | 小时（补零） |
| mm   | 分钟（补零） |
| ss   | 秒数（补零） |
| SSS  | 毫秒（3 位） |
| SS   | 毫秒（2 位） |
| S    | 毫秒（1 位） |
