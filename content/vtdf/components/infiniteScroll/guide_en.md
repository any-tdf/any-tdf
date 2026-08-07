## Basic Usage

InfiniteScroll loads more data when the page scrolls near a boundary. The component is controlled: `loading`, `finished`, and `error` are managed externally.

Default text uses component text props first, then `ConfigProvider` `locale.infiniteScroll`, then built-in fallback text. The loading icon is configured by `loadingIcon`, using the same props as the Loading component.

## Trigger Rules

- With `direction` set to `down`, `load` is emitted when the distance to the bottom is less than or equal to `offset`.
- With `direction` set to `up`, `load` is emitted when the distance to the top is less than or equal to `offset`.
- Besides listening to scroll events, the component observes its own sentinel element with IntersectionObserver, so content height changes that bring the sentinel into the boundary also trigger a check.
- While any of `loading`, `finished`, `error`, or `disabled` is true, loading does not fire again. Once all of them clear, the component re-checks automatically so a changed list does not stall at the boundary.
- Clicking the error content emits `load` again with `isRetry = true`.

## Active Check

The component exposes a `check()` method through ref, useful after data changes, tab switches, overlay display, or container resizing.

## Custom Content

Default text is shown for loading, finished, and error states. Use the `loadingChild`, `finishedChild`, and `errorChild` named slots to customize state content. The slot `detail` parameter provides `status` and `retry`, and `retry` can be bound directly to a custom retry button. Passing the default slot takes over the status content completely.
