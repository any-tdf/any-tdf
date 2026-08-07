## InfiniteScroll Props

| Name           | Type                                                                        | Default                                                 | Required | Description                                                             |
| -------------- | --------------------------------------------------------------------------- | ------------------------------------------------------- | -------- | ----------------------------------------------------------------------- |
| loading        | `boolean`                                                                   | `false`                                                 | N        | Whether loading is active. Controlled state.                            |
| finished       | `boolean`                                                                   | `false`                                                 | N        | Whether there is no more data.                                          |
| error          | `boolean`                                                                   | `false`                                                 | N        | Whether loading failed.                                                 |
| disabled       | `boolean`                                                                   | `false`                                                 | N        | Disable scroll loading.                                                 |
| offset         | `number`                                                                    | `300`                                                   | N        | Edge distance that triggers loading, in pixels.                         |
| direction      | `'up' \| 'down'`                                                            | `'down'`                                                | N        | Detect top or bottom.                                                   |
| immediateCheck | `boolean`                                                                   | `true`                                                  | N        | Whether to check immediately after mount.                               |
| loadingText    | `string`                                                                    | `'Loading...'`                                          | N        | Default loading text.                                                   |
| finishedText   | `string`                                                                    | `'No more data'`                                        | N        | Default finished text.                                                  |
| errorText      | `string`                                                                    | `'Load failed, click to retry'`                         | N        | Default error text.                                                     |
| loadingIcon    | [`Loading`](/components?nav=loading&tab=1) \| `null`                        | `{ type: '1_0', width: '4', height: '4', theme: true }` | N        | Loading icon props for the loading state. Pass `null` to hide the icon. |
| scrollTarget   | `HTMLElement \| Window \| RefObject<HTMLElement \| null> \| string \| null` | `null`                                                  | N        | Custom scroll container.                                                |
| injClass       | `string`                                                                    | `''`                                                    | N        | CSS class injected into root.                                           |
| textClass      | `string`                                                                    | `''`                                                    | N        | CSS class injected into status text.                                    |

## InfiniteScroll Events

| Name   | Type                         | Parameters                                 | Description                                                                              |
| ------ | ---------------------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| onLoad | `(isRetry: boolean) => void` | `isRetry` - whether this is an error retry | Called when the trigger distance is reached.                                             |
| onload | `(isRetry: boolean) => void` | `isRetry` - whether this is an error retry | Called when the trigger distance is reached. Lowercase event alias compatible with STDF. |

## InfiniteScroll Children

| Name          | Type                                                             | Parameters | Description                  |
| ------------- | ---------------------------------------------------------------- | ---------- | ---------------------------- |
| children      | `ReactNode \| ((detail: InfiniteScrollSlotDetail) => ReactNode)` | `detail`   | Fully custom status content. |
| loadingChild  | `ReactNode \| ((detail: InfiniteScrollSlotDetail) => ReactNode)` | `detail`   | Loading content.             |
| finishedChild | `ReactNode \| ((detail: InfiniteScrollSlotDetail) => ReactNode)` | `detail`   | Finished content.            |
| errorChild    | `ReactNode \| ((detail: InfiniteScrollSlotDetail) => ReactNode)` | `detail`   | Error content.               |

## InfiniteScrollSlotDetail

| Name   | Type                                           | Description                                   |
| ------ | ---------------------------------------------- | --------------------------------------------- |
| status | `'idle' \| 'loading' \| 'finished' \| 'error'` | Current status.                               |
| retry  | `() => void`                                   | Trigger `onLoad` again with `isRetry = true`. |

## Ref Methods

| Name  | Type         | Description                                          |
| ----- | ------------ | ---------------------------------------------------- |
| check | `() => void` | Manually checks whether loading should be triggered. |
