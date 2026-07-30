## Basic Usage

InfiniteScroll loads more data when the scroll position approaches an edge. It is controlled by `loading`, `finished`, and `error`.

Default text uses component text props first, then `ConfigProvider` `locale.infiniteScroll`, then built-in fallback text. The loading icon is configured by `loadingIcon`, using the same props as the Loading component.

## Trigger Rules

- With `direction` set to `down`, `onLoad` is triggered when distance to bottom is less than or equal to `offset`.
- With `direction` set to `up`, `onLoad` is triggered when distance to top is less than or equal to `offset`.
- `loading`, `finished`, `error`, or `disabled` blocks repeated loading.
- Clicking the error content retries with `isRetry = true`.

## Manual Check

The component exposes `check()` through ref. Call it after data changes, tab switches, overlay display, or container size changes.

## Custom Content

The default UI shows loading, finished, and error text. Use `loadingChild`, `finishedChild`, and `errorChild` for custom status content.
