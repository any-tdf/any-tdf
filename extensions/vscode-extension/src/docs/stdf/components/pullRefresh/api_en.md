## PullRefresh Props

| Name              | Type                                                                 | Default                                                 | Required | Description                                                                                   |
| ----------------- | -------------------------------------------------------------------- | ------------------------------------------------------- | -------- | --------------------------------------------------------------------------------------------- |
| refreshing        | `boolean`                                                            | `false`                                                 | N        | Whether refresh is active. Controlled state.                                                  |
| disabled          | `boolean`                                                            | `false`                                                 | N        | Disable pull refresh.                                                                         |
| headHeight        | `number`                                                             | `50`                                                    | N        | Header height in pixels.                                                                      |
| threshold         | `number`                                                             | `60`                                                    | N        | Distance required before release can refresh, and the knee point of damping. In pixels.       |
| pullFactor        | `number`                                                             | `1`                                                     | N        | Ratio from gesture distance to pull distance.                                                 |
| maxDistance       | `number`                                                             | `0`                                                     | N        | Maximum pull distance in pixels. `0` means unlimited (damping still applies).                 |
| successDuration   | `number`                                                             | `500`                                                   | N        | Success state duration in milliseconds.                                                       |
| animationDuration | `number`                                                             | `300`                                                   | N        | Rebound and state animation duration in milliseconds. No animation while tracking the finger. |
| pullingText       | `string`                                                             | `'Pull to refresh'`                                     | N        | Default pulling text.                                                                         |
| canReleaseText    | `string`                                                             | `'Release to refresh'`                                  | N        | Default release text.                                                                         |
| refreshingText    | `string`                                                             | `'Refreshing...'`                                       | N        | Default refreshing text.                                                                      |
| successText       | `string`                                                             | `'Refresh complete'`                                    | N        | Default success text.                                                                         |
| loadingIcon       | [`Loading`](https://stdf.dev/components?nav=loading&tab=1) \| `null` | `{ type: '1_0', width: '4', height: '4', theme: true }` | N        | Loading icon props for the refreshing state. Pass `null` to hide the icon.                    |
| scrollTarget      | `HTMLElement \| Window \| string \| null`                            | `null`                                                  | N        | Custom scroll container.                                                                      |
| injClass          | `string`                                                             | `''`                                                    | N        | CSS class injected into root.                                                                 |
| headClass         | `string`                                                             | `''`                                                    | N        | CSS class injected into header.                                                               |
| contentClass      | `string`                                                             | `''`                                                    | N        | CSS class injected into content container.                                                    |

## PullRefresh Events

| Name      | Type                                        | Parameters                    | Description                                           |
| --------- | ------------------------------------------- | ----------------------------- | ----------------------------------------------------- |
| onrefresh | `() => void`                                | -                             | Triggered when released at or past threshold.         |
| onchange  | `(detail: PullRefreshChangeDetail) => void` | `detail` - current state info | Triggered when status, distance, or progress changes. |

## PullRefresh Snippets

| Name            | Type                | Parameters | Description               |
| --------------- | ------------------- | ---------- | ------------------------- |
| children        | `Snippet`           | -          | Default content.          |
| normalChild     | `Snippet<[detail]>` | `detail`   | Content at normal state.  |
| pullingChild    | `Snippet<[detail]>` | `detail`   | Content while pulling.    |
| canReleaseChild | `Snippet<[detail]>` | `detail`   | Content at canRelease.    |
| refreshingChild | `Snippet<[detail]>` | `detail`   | Content while refreshing. |
| successChild    | `Snippet<[detail]>` | `detail`   | Content at success.       |

## PullRefreshChangeDetail

| Name     | Type                                                                 | Description                               |
| -------- | -------------------------------------------------------------------- | ----------------------------------------- |
| status   | `'normal' \| 'pulling' \| 'canRelease' \| 'refreshing' \| 'success'` | Current status.                           |
| distance | `number`                                                             | Current pull distance in pixels.          |
| progress | `number`                                                             | Current progress, `distance / threshold`. |
