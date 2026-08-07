## Why doesn't it keep loading?

Check whether `loading`, `finished`, `error`, or `disabled` is blocking the trigger. If the list is short, you can also call `check()` after the data renders.

## Why does it load continuously when the content is shorter than one screen?

The component checks once on mount according to `immediateCheck`, and re-checks automatically after blocking states such as `loading` clear. As long as the sentinel stays within the boundary, `onload` keeps firing, which prevents a short list from stalling on one screen. Set `immediateCheck={false}` if the initial check is not wanted.

## What is the difference between `finished` and `hasMore`?

This component uses `finished = true` to indicate there is no more data, equivalent to `hasMore = false`.

## How do I retry after a failure?

Set `error` to `true` to show the failure content. Clicking the default error content triggers `onload` with `isRetry = true`. With a custom `errorChild`, bind `detail.retry` to your own retry button.

## How do I load at the top?

Set `direction="up"` and place the component at the top of the list. Scrolling near the top triggers `onload`. After prepending history data, adjust `scrollTop` to keep the reading position so it does not immediately retrigger at the top.
