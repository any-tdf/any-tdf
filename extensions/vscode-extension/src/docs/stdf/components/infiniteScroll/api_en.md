## InfiniteScroll Props

| Name           | Type                                                                 | Default                                                 | Required | Description                                                             |
| -------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| loading        | `boolean`                                                            | `false`                                                 | N        | Whether loading is active. Controlled state.                            |
| finished       | `boolean`                                                            | `false`                                                 | N        | Whether there is no more data.                                          |
| error          | `boolean`                                                            | `false`                                                 | N        | Whether loading failed.                                                 |
| disabled       | `boolean`                                                            | `false`                                                 | N        | Disable scroll loading.                                                 |
| offset         | `number`                                                             | `300`                                                   | N        | Boundary distance that triggers loading, in pixels.                     |
| direction      | `'up' \| 'down'`                                                     | `'down'`                                                | N        | Watch the top or the bottom.                                            |
| immediateCheck | `boolean`                                                            | `true`                                                  | N        | Whether to check immediately after mount.                               |
| loadingText    | `string`                                                             | `'Loading...'`                                          | N        | Default loading text.                                                   |
| finishedText   | `string`                                                             | `'No more data'`                                        | N        | Default finished text.                                                  |
| errorText      | `string`                                                             | `'Failed to load, click to retry'`                      | N        | Default error text.                                                     |
| loadingIcon    | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) \| `null` | `{ type: '1_0', width: '4', height: '4', theme: true }` | N        | Loading icon props for the loading state. Pass `null` to hide the icon. |
| scrollTarget   | `HTMLElement \| Window \| string \| null`                            | `null`                                                  | N        | Custom scroll container.                                                |
| injClass       | `string`                                                             | `''`                                                    | N        | CSS class injected into root.                                           |
| textClass      | `string`                                                             | `''`                                                    | N        | CSS class injected into the status text.                                |

## InfiniteScroll Events

| Name   | Type                         | Parameters                        | Description                                  |
| ------ | ---------------------------- | --------------------------------- | -------------------------------------------- |
| onload | `(isRetry: boolean) => void` | `isRetry` - whether it is a retry | Called when the trigger distance is reached. |

## InfiniteScroll Snippets

| Name          | Type                | Parameters | Description                  |
| ------------- | ------------------- | ---------- | ---------------------------- |
| children      | `Snippet<[detail]>` | `detail`   | Fully custom status content. |
| loadingChild  | `Snippet<[detail]>` | `detail`   | Loading content.             |
| finishedChild | `Snippet<[detail]>` | `detail`   | Finished content.            |
| errorChild    | `Snippet<[detail]>` | `detail`   | Error content.               |

## InfiniteScrollSlotDetail

| Name   | Type                                           | Description                                   |
| ------ | ---------------------------------------------- | --------------------------------------------- |
| status | `'idle' \| 'loading' \| 'finished' \| 'error'` | Current status.                               |
| retry  | `() => void`                                   | Trigger `onload` again with `isRetry = true`. |

## Methods

| Name  | Type         | Description                                              |
| ----- | ------------ | -------------------------------------------------------- |
| check | `() => void` | Actively check whether the current position should load. |
