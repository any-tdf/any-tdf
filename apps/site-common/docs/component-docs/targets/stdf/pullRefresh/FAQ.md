## 为什么不自动把 `refreshing` 改回 `false`？

PullRefresh 只负责手势和状态展示，数据请求由业务层处理。请求结束后，需要外部把 `refreshing` 设置为 `false`。

## 为什么下拉没有触发？

请确认滚动容器已经在顶部，组件没有被禁用，也没有处于刷新中。嵌套滚动场景建议显式传入 `scrollTarget`。

## 可以和 InfiniteScroll 一起使用吗？

可以。PullRefresh 负责顶部刷新，InfiniteScroll 负责边界加载，二者可以组合在同一个列表内容外层。
