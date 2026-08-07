## 3.0.0

- [!tag|A|0|] 新增 InfiniteScroll 组件，支持上下方向检测、加载完成、加载失败重试、自定义状态内容和 `check()` 方法。
- [!tag|A|0|] 状态内容 render props 新增 `detail` 参数，提供 `status` 和 `retry`。
- [!tag|O|0|] 阻塞状态解除后自动复检，配合 IntersectionObserver 在内容高度变化时也能触发检测。
- [!tag|O|0|] 状态区域增加 `aria-live` 播报。
