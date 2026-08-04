## ProgressLoop Props

| 名称          | 类型                                 | 默认值  | 必传 | 说明                               |
| ------------- | ------------------------------------ | ------- | ---- | ---------------------------------- |
| percent       | `number`                             | `66`    | N    | 百分比。                           |
| strokeWidth   | `number`                             | `2`     | N    | 圆环宽度。                         |
| butt          | `boolean`                            | `false` | N    | 端点是否直角。                     |
| reverse       | `boolean`                            | `false` | N    | 是否反向（逆时针）。               |
| duration      | `'150'\|'300'\|'500'\|'700'\|'1000'` | `'300'` | N    | 动画过渡时间。                     |
| gradient      | `[string,string]\|null`              | `[]`    | N    | 渐变色，开始色与结束色组成的数组。 |
| injClass      | `String`                             | `''`    | N    | 激活进度环注入 Class 名称。        |
| trackInjClass | `String`                             | `''`    | N    | 轨道环注入 Class 名称。            |

## ProgressLoop Snippets

| 名称     | 类型                                                                | 参数 | 说明                 |
| -------- | ------------------------------------------------------------------- | ---- | -------------------- |
| children | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 传入时渲染文字内容。 |
