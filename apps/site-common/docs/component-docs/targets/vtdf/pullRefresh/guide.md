## 基础用法

PullRefresh 用于页面顶部明确刷新数据的场景。组件采用受控状态，外部通过 `refreshing` 表示刷新中，通过 `refresh` 事件触发数据请求。

默认文案优先使用组件文案 props，其次读取 `ConfigProvider` 的 `locale.pullRefresh`，最后使用内置默认文案。刷新中图标由 `loadingIcon` 配置，参数与 Loading 组件一致。

## 交互规则

- 只有滚动容器在顶部时，下拉手势才会进入刷新判断。
- 手势开始后先锁定方向：横向滑动不触发刷新，竖直下拉才进入刷新流程，回拖到起点以下会取消本次下拉。
- 下拉距离等于手势距离乘以 `pullFactor`，超过 `threshold` 后按阻尼曲线衰减（越拉越费力），可通过 `maxDistance` 限制最大下拉距离。
- 跟随手指阶段内容无过渡动画，保证跟手；释放回弹、进入刷新和成功收尾按 `animationDuration` 过渡。
- 下拉距离达到 `threshold` 后释放，会触发 `refresh`。
- `refreshing` 从 `true` 变为 `false` 后，如果设置了 `successText`，会按 `successDuration` 显示成功状态。
- 桌面端支持按住鼠标左键向下拖拽，行为与触摸一致。
- 头部状态区域带有 `aria-live`，状态文案变化会被辅助技术播报。

## 自定义内容

默认头部会显示下拉、释放、刷新中和成功文案。也可以通过 `normalChild`、`pullingChild`、`canReleaseChild`、`refreshingChild`、`successChild` 具名 slot 自定义各状态内容，slot 的 `detail` 参数提供 `status`、`distance` 和 `progress`，可用于驱动进度环、箭头旋转等动画。

## 滚动容器

默认会向上查找最近的滚动容器。复杂页面可以传入 `scrollTarget` 指定滚动容器，常用于弹层、Tab 内容区或嵌套滚动区域。

嵌套滚动场景建议给滚动容器加上 `overscroll-behavior: contain`（Tailwind 类 `overscroll-contain`），避免触发浏览器自带的下拉刷新或滚动链穿透。PullRefresh 与 InfiniteScroll 可以组合在同一个滚动容器内，分别负责顶部刷新和底部加载。
