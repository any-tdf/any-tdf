## Why does `refreshing` not reset automatically?

PullRefresh handles gestures and visual states only. Data loading belongs to the application, so reset `refreshing` to `false` after the request finishes.

## Why does pulling not trigger refresh?

Make sure the scroll container is at the top, the component is not disabled, and it is not already refreshing. Pass `scrollTarget` explicitly for nested scrolling.

## Can it be used with InfiniteScroll?

Yes. PullRefresh handles top refresh, while InfiniteScroll handles edge loading. They can wrap the same list content.
