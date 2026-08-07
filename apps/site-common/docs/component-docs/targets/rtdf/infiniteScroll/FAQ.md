## 为什么没有继续加载？

请检查 `loading`、`finished`、`error`、`disabled` 是否阻断了触发。如果列表内容较短，也可以在数据渲染后调用 `check()`。

## 为什么内容不足一屏时会连续加载？

组件挂载时会按 `immediateCheck` 立即检测一次，且 `loading` 等阻塞状态解除后会自动复检。只要占位元素仍在边界内就会继续触发 `onLoad`，这能避免短列表停在一屏不加载。不需要初始检测时设置 `immediateCheck={false}`。

## `finished` 和 `hasMore` 有什么区别？

本组件使用 `finished = true` 表示没有更多数据，等价于 `hasMore = false`。

## 加载失败如何重试？

把 `error` 设置为 `true` 后会显示失败内容。用户点击默认失败内容时，会以 `isRetry = true` 触发 `onLoad`。自定义 `errorChild` 时，可以通过 `detail.retry` 绑定自己的重试按钮。

## 顶部加载如何使用？

设置 `direction="up"` 并把组件放在列表顶部，滚动到顶部附近即触发 `onLoad`。前置插入历史数据后建议调整 `scrollTop` 保持阅读位置，避免停留在顶部立即再次触发。
