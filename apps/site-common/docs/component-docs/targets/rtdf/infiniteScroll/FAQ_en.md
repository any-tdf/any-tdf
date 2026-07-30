## Why does it stop loading?

Check whether `loading`, `finished`, `error`, or `disabled` is blocking the trigger. If the list is short, call `check()` after rendering data.

## How is `finished` different from `hasMore`?

This component uses `finished = true` to mean no more data, equivalent to `hasMore = false`.

## How does retry work?

Set `error` to `true` to show the error state. Clicking the default error content calls `onLoad` with `isRetry = true`.
