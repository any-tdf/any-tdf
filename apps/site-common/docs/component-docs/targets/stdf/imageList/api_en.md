## ImageList Props

| Name         | Type                                                       | Default     | Required | Description                           |
| ------------ | ---------------------------------------------------------- | ----------- | -------- | ------------------------------------- |
| value        | `ImageListItemProps[]`                                     | `[]`        | N        | Image list, supports two-way binding. |
| columns      | `3 \| 4 \| 5`                                              | `4`         | N        | Number of columns per row.            |
| max          | `number`                                                   | `9`         | N        | Maximum count.                        |
| maxSize      | `number`                                                   | `10`        | N        | Maximum size per image in MB.         |
| accept       | `string`                                                   | `'image/*'` | N        | Accepted file types.                  |
| multiple     | `boolean`                                                  | `true`      | N        | Whether to allow multiple selection.  |
| disabled     | `boolean`                                                  | `false`     | N        | Whether disabled.                     |
| readonly     | `boolean`                                                  | `false`     | N        | Whether readonly.                     |
| deletable    | `boolean`                                                  | `true`      | N        | Whether deletable.                    |
| previewable  | `boolean`                                                  | `true`      | N        | Whether previewable.                  |
| gap          | `'0' \| '1' \| '2' \| '3' \| '4'`                          | `'2'`       | N        | Gap between items.                    |
| radius       | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'\|''`  | `''`        | N        | Border radius.                        |
| aspectRatio  | `[number, number]`                                         | `[1, 1]`    | N        | Aspect ratio.                         |
| uploadText   | `string`                                                   | `''`        | N        | Upload button text.                   |
| loading      | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) | `{}`        | N        | Loading component parameters.         |
| icon         | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `{}`        | N        | Upload icon parameters.               |
| deleteIcon   | [`Icon`](https://stdf.dev/components?nav=icon&tab=1)       | `{}`        | N        | Delete icon parameters.               |
| injClass     | `string`                                                   | `''`        | N        | Inject CSS class.                     |
| itemInjClass | `string`                                                   | `''`        | N        | Item inject CSS class.                |

## ImageListItemProps

| Name      | Type                                               | Default | Required | Description        |
| --------- | -------------------------------------------------- | ------- | -------- | ------------------ |
| id        | `string \| number`                                 | -       | Y        | Unique identifier. |
| url       | `string`                                           | -       | N        | Image URL.         |
| file      | `File`                                             | -       | N        | File object.       |
| status    | `'pending' \| 'uploading' \| 'success' \| 'error'` | -       | N        | Upload status.     |
| message   | `string`                                           | -       | N        | Status message.    |
| thumbnail | `string`                                           | -       | N        | Thumbnail URL.     |

## ImageList Events

| Name          | Type                                                | Parameters                   | Description                           |
| ------------- | --------------------------------------------------- | ---------------------------- | ------------------------------------- |
| onadd         | `(files: File[]) => void`                           | files: file list             | Triggered when files added.           |
| ondelete      | `(item: ImageListItemProps, index: number) => void` | item: image, index           | Triggered when deleted.               |
| onretry       | `(item: ImageListItemProps, index: number) => void` | item: image, index           | Triggered when retry.                 |
| onpreview     | `(item: ImageListItemProps, index: number) => void` | item: image, index           | Triggered when preview.               |
| onexceed      | `(files: File[], max: number) => void`              | files: file list, max: limit | Triggered when count exceeded.        |
| onoversized   | `(file: File, maxSize: number) => void`             | file: file, maxSize: limit   | Triggered when size exceeded.         |
| onclickUpload | `() => void`                                        | -                            | Triggered when upload button clicked. |

## ImageList Methods

| Name     | Parameters      | Return | Description                            |
| -------- | --------------- | ------ | -------------------------------------- |
| addFiles | `files: File[]` | -      | Add files, for external file addition. |

## ImageList Snippets

| Name        | Type                                                                | Parameters  | Description            |
| ----------- | ------------------------------------------------------------------- | ----------- | ---------------------- |
| uploadChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -           | Custom upload button.  |
| itemChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item, index | Custom item.           |
| statusChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | item        | Custom status display. |
