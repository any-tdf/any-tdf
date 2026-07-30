## 基础用法

PullRefresh 用于页面顶部明确刷新数据的场景。组件采用受控状态，外部通过 `refreshing` 表示刷新中，通过 `onRefresh` 触发数据请求。

默认文案优先使用组件文案 props，其次读取 `ConfigProvider` 的 `locale.pullRefresh`，最后使用内置默认文案。刷新中图标由 `loadingIcon` 配置，参数与 Loading 组件一致。

## 交互规则

- 只有滚动容器在顶部时，下拉手势才会进入刷新判断。
- 横向滑动、禁用状态、刷新中状态不会重复触发刷新。
- 下拉距离达到 `threshold` 后释放，会触发 `onRefresh`。
- `refreshing` 从 `true` 变为 `false` 后，如果设置了 `successText`，会按 `successDuration` 显示成功状态。

## 自定义内容

默认头部会显示下拉、释放、刷新中和成功文案。也可以通过 `normalChild`、`pullingChild`、`canReleaseChild`、`refreshingChild`、`successChild` 自定义各状态内容。

## 滚动容器

默认会向上查找最近的滚动容器。复杂页面可以传入 `scrollTarget` 指定滚动容器，常用于弹层、Tab 内容区或嵌套滚动区域。
