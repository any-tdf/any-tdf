## 为什么不自动把 `refreshing` 改回 `false`？

PullRefresh 只负责手势和状态展示，数据请求由业务层处理。请求结束后，需要外部把 `refreshing` 设置为 `false`。

## 为什么下拉没有触发？

请确认滚动容器已经在顶部，组件没有被禁用，也没有处于刷新中。嵌套滚动场景建议显式传入 `scrollTarget`。另外，手势开始后如果先横向滑动，方向锁会判定为横向手势，本次不会触发刷新。

## 为什么下拉超过阈值后越拉越费力？

这是内置的阻尼曲线：`threshold` 以内距离与手势成正比，超过后按二分之一衰减，超过两倍 `threshold` 后按四分之一衰减。需要限制最大距离时设置 `maxDistance`。

## 如何避免浏览器自带的下拉刷新冲突？

给滚动容器或页面根节点添加 `overscroll-behavior: contain`（Tailwind 类 `overscroll-contain`），阻止滚动链穿透到浏览器默认手势。

## 桌面端可以体验吗？

可以。除了触摸手势，组件也支持按住鼠标左键向下拖拽，交互规则一致。

## 可以和 InfiniteScroll 一起使用吗？

可以。PullRefresh 负责顶部刷新，InfiniteScroll 负责边界加载，二者可以组合在同一个列表内容外层。
