## Why isn't `refreshing` set back to `false` automatically?

PullRefresh only handles the gesture and state display. The data request belongs to the business layer, which must set `refreshing` to `false` when the request finishes.

## Why doesn't pulling trigger a refresh?

Make sure the scroll container is at the top, the component is not disabled, and it is not already refreshing. For nested scrolling, pass `scrollTarget` explicitly. Also, if the gesture starts horizontally, the direction lock treats it as a horizontal gesture and the pull is ignored.

## Why does pulling feel heavier past the threshold?

That is the built-in damping curve: within `threshold` the distance follows the finger, beyond it the extra distance is halved, and beyond twice the `threshold` it is quartered. Set `maxDistance` to cap the distance.

## How do I avoid conflicts with the browser's native pull-to-refresh?

Add `overscroll-behavior: contain` (Tailwind class `overscroll-contain`) to the scroll container or page root so the scroll chain does not leak into the browser's default gesture.

## Can I try it on desktop?

Yes. In addition to touch gestures, you can hold the left mouse button and drag down with the same interaction rules.

## Can it be used with InfiniteScroll?

Yes. PullRefresh handles top refresh and InfiniteScroll handles boundary loading. They can be composed around the same list content.
