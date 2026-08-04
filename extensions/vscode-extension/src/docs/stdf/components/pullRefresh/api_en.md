## PullRefresh Props

| Name              | Type                                                                 | Default                                                 | Required | Description                                                                |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | -------- | -------------------------------------------------------------------------- |
| refreshing        | `boolean`                                                            | `false`                                                 | N        | Whether refresh is active. Controlled state.                               |
| disabled          | `boolean`                                                            | `false`                                                 | N        | Disable pull refresh.                                                      |
| headHeight        | `number`                                                             | `50`                                                    | N        | Header height in pixels.                                                   |
| threshold         | `number`                                                             | `60`                                                    | N        | Distance required before release can refresh.                              |
| pullFactor        | `number`                                                             | `1`                                                     | N        | Ratio from gesture distance to pull distance.                              |
| successDuration   | `number`                                                             | `500`                                                   | N        | Success state duration in milliseconds.                                    |
| animationDuration | `number`                                                             | `300`                                                   | N        | Rebound and state animation duration in milliseconds.                      |
| pullingText       | `string`                                                             | `'Pull to refresh'`                                     | N        | Default pulling text.                                                      |
| canReleaseText    | `string`                                                             | `'Release to refresh'`                                  | N        | Default release text.                                                      |
| refreshingText    | `string`                                                             | `'Refreshing...'`                                       | N        | Default refreshing text.                                                   |
| successText       | `string`                                                             | `'Refresh complete'`                                    | N        | Default success text.                                                      |
| loadingIcon       | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) \| `null` | `{ type: '1_0', width: '4', height: '4', theme: true }` | N        | Loading icon props for the refreshing state. Pass `null` to hide the icon. |
| scrollTarget      | `HTMLElement \| Window \| string \| null`                            | `null`                                                  | N        | Custom scroll container.                                                   |
| injClass          | `string`                                                             | `''`                                                    | N        | CSS class injected into root.                                              |
| headClass         | `string`                                                             | `''`                                                    | N        | CSS class injected into header.                                            |
| contentClass      | `string`                                                             | `''`                                                    | N        | CSS class injected into content container.                                 |

## PullRefresh Events

| Name      | Type                                        | Parameters                      | Description                                           |
| --------- | ------------------------------------------- | ------------------------------- | ----------------------------------------------------- |
| onrefresh | `() => void`                                | -                               | Triggered after release reaches the threshold.        |
| onchange  | `(detail: PullRefreshChangeDetail) => void` | `detail` - current state detail | Triggered when status, distance, or progress changes. |

## PullRefresh Snippets

| Name            | Type                | Parameters | Description                  |
| --------------- | ------------------- | ---------- | ---------------------------- |
| children        | `Snippet`           | -          | Default content.             |
| normalChild     | `Snippet<[detail]>` | `detail`   | Normal state content.        |
| pullingChild    | `Snippet<[detail]>` | `detail`   | Pulling state content.       |
| canReleaseChild | `Snippet<[detail]>` | `detail`   | Release-ready state content. |
| refreshingChild | `Snippet<[detail]>` | `detail`   | Refreshing state content.    |
| successChild    | `Snippet<[detail]>` | `detail`   | Success state content.       |

## PullRefreshChangeDetail

| Name     | Type                                                                 | Description                               |
| -------- | -------------------------------------------------------------------- | ----------------------------------------- |
| status   | `'normal' \| 'pulling' \| 'canRelease' \| 'refreshing' \| 'success'` | Current status.                           |
| distance | `number`                                                             | Current pull distance in pixels.          |
| progress | `number`                                                             | Current progress, `distance / threshold`. |
