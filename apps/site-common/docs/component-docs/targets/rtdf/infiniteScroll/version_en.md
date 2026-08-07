## 3.0.0

- [!tag|A|0|] Added InfiniteScroll with up and down detection, finished state, error retry, custom status content, and the `check()` method.
- [!tag|A|0|] Added the `detail` parameter to state content render props, providing `status` and `retry`.
- [!tag|O|0|] Automatically re-checks after blocking states clear, and IntersectionObserver triggers checks when content height changes.
- [!tag|O|0|] Added `aria-live` announcements to the status area.
