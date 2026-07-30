## ImageList Props

| 名称         | 类型                                                       | 默认值      | 必传 | 说明                     |
| ------------ | ---------------------------------------------------------- | ----------- | ---- | ------------------------ |
| value        | `ImageListItemProps[]`                                     | `[]`        | N    | 图片列表，支持双向绑定。 |
| columns      | `3 \| 4 \| 5`                                              | `4`         | N    | 每行数量。               |
| max          | `number`                                                   | `9`         | N    | 最大数量。               |
| maxSize      | `number`                                                   | `10`        | N    | 单张最大大小，单位：MB。 |
| accept       | `string`                                                   | `'image/*'` | N    | 接受的文件类型。         |
| multiple     | `boolean`                                                  | `true`      | N    | 是否支持多选。           |
| disabled     | `boolean`                                                  | `false`     | N    | 是否禁用。               |
| readonly     | `boolean`                                                  | `false`     | N    | 是否只读。               |
| deletable    | `boolean`                                                  | `true`      | N    | 是否可删除。             |
| previewable  | `boolean`                                                  | `true`      | N    | 是否可预览。             |
| gap          | `'0' \| '1' \| '2' \| '3' \| '4'`                          | `'2'`       | N    | 间距。                   |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`  | `''`        | N    | 圆角。                   |
| aspectRatio  | `[number, number]`                                         | `[1, 1]`    | N    | 宽高比。                 |
| uploadText   | `string`                                                   | `''`        | N    | 上传按钮文字。           |
| loading      | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) | `{}`        | N    | 加载组件参数。           |
| icon         | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `{}`        | N    | 上传图标参数。           |
| deleteIcon   | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `{}`        | N    | 删除图标参数。           |
| injClass     | `string`                                                   | `''`        | N    | 注入 CSS 类。            |
| itemInjClass | `string`                                                   | `''`        | N    | 项注入 CSS 类。          |

## ImageListItemProps

| 名称      | 类型                                               | 默认值 | 必传 | 说明         |
| --------- | -------------------------------------------------- | ------ | ---- | ------------ |
| id        | `string \| number`                                 | -      | Y    | 唯一标识。   |
| url       | `string`                                           | -      | N    | 图片地址。   |
| file      | `File`                                             | -      | N    | 文件对象。   |
| status    | `'pending' \| 'uploading' \| 'success' \| 'error'` | -      | N    | 上传状态。   |
| message   | `string`                                           | -      | N    | 状态信息。   |
| thumbnail | `string`                                           | -      | N    | 缩略图地址。 |

## ImageList Events

| 名称          | 类型                                                | 参数                           | 描述                 |
| ------------- | --------------------------------------------------- | ------------------------------ | -------------------- |
| onadd         | `(files: File[]) => void`                           | files: 文件列表                | 添加文件时触发。     |
| ondelete      | `(item: ImageListItemProps, index: number) => void` | item: 图片项，index: 索引      | 删除时触发。         |
| onretry       | `(item: ImageListItemProps, index: number) => void` | item: 图片项，index: 索引      | 重试时触发。         |
| onpreview     | `(item: ImageListItemProps, index: number) => void` | item: 图片项，index: 索引      | 预览时触发。         |
| onexceed      | `(files: File[], max: number) => void`              | files: 文件列表，max: 最大数量 | 超出数量限制时触发。 |
| onoversized   | `(file: File, maxSize: number) => void`             | file: 文件，maxSize: 最大大小  | 超出大小限制时触发。 |
| onclickUpload | `() => void`                                        | -                              | 点击上传按钮时触发。 |

## ImageList Methods

| 名称     | 参数            | 返回值 | 说明                               |
| -------- | --------------- | ------ | ---------------------------------- |
| addFiles | `files: File[]` | -      | 添加文件，供外部调用触发文件添加。 |

## ImageList Snippets

| 名称        | 类型                                                                | 参数        | 说明             |
| ----------- | ------------------------------------------------------------------- | ----------- | ---------------- |
| uploadChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -           | 自定义上传按钮。 |
| itemChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item, index | 自定义每项。     |
| statusChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item        | 自定义状态显示。 |
