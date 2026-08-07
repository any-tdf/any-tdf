## Why does it stop loading?

Check whether `loading`, `finished`, `error`, or `disabled` is blocking the trigger. If the list is short, call `check()` after rendering data.

## Why does it load continuously when the content is shorter than one screen?

The component checks once on mount according to `immediateCheck`, and re-checks automatically after blocking states such as `loading` clear. As long as the sentinel stays within the boundary, `onLoad` keeps firing, which prevents a short list from stalling on one screen. Set `immediateCheck={false}` if the initial check is not wanted.

## How is `finished` different from `hasMore`?

This component uses `finished = true` to mean no more data, equivalent to `hasMore = false`.

## How does retry work?

Set `error` to `true` to show the error state. Clicking the default error content calls `onLoad` with `isRetry = true`. With a custom `errorChild`, bind `detail.retry` to your own retry button.

## How do I load at the top?

Set `direction="up"` and place the component at the top of the list. Scrolling near the top triggers `onLoad`. After prepending history data, adjust `scrollTop` to keep the reading position so it does not immediately retrigger at the top.
