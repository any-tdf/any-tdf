## 为什么没有继续加载？

请检查 `loading`、`finished`、`error`、`disabled` 是否阻断了触发。如果列表内容较短，也可以在数据渲染后调用 `check()`。

## `finished` 和 `hasMore` 有什么区别？

本组件使用 `finished = true` 表示没有更多数据，等价于 `hasMore = false`。

## 加载失败如何重试？

把 `error` 设置为 `true` 后会显示失败内容。用户点击默认失败内容时，会以 `isRetry = true` 触发 `onLoad`。
