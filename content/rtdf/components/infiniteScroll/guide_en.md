## Basic Usage

InfiniteScroll loads more data when the scroll position approaches an edge. It is controlled by `loading`, `finished`, and `error`.

Default text uses component text props first, then `ConfigProvider` `locale.infiniteScroll`, then built-in fallback text. The loading icon is configured by `loadingIcon`, using the same props as the Loading component.

## Trigger Rules

- With `direction` set to `down`, `onLoad` is triggered when distance to bottom is less than or equal to `offset`.
- With `direction` set to `up`, `onLoad` is triggered when distance to top is less than or equal to `offset`.
- Besides listening to scroll events, the component observes its own sentinel element with IntersectionObserver, so content height changes that bring the sentinel into the boundary also trigger a check.
- While any of `loading`, `finished`, `error`, or `disabled` is true, loading does not fire again. Once all of them clear, the component re-checks automatically so a changed list does not stall at the boundary.
- Clicking the error content triggers `onLoad` again with `isRetry = true`.

## Manual Check

The component exposes `check()` through ref. Call it after data changes, tab switches, overlay display, or container size changes.

## Custom Content

The default UI shows loading, finished, and error text. Use `loadingChild`, `finishedChild`, and `errorChild` render props for custom status content. The render prop `detail` parameter provides `status` and `retry`, and `retry` can be bound directly to a custom retry button. Passing `children` takes over the status content completely.
