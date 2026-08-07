---
'@any-tdf/common': minor
'stdf': minor
'rtdf': minor
'vtdf': minor
---

Enhance PullRefresh and InfiniteScroll interaction and APIs across all frameworks.

PullRefresh: add the `maxDistance` prop, apply a damping curve to pull distance beyond `threshold`, remove transition lag while tracking the finger, add a gesture direction lock (horizontal swipes are ignored and dragging back past the start point cancels the pull), support mouse drag on desktop, and announce head status with `aria-live`.

InfiniteScroll: pass a `detail` parameter (`{ status, retry }`) to custom state content, add IntersectionObserver-based detection to every framework, re-check automatically after blocking states clear, fix named slot rendering in VTDF, and announce status with `aria-live`.
