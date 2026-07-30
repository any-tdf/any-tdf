## 基础用法

InfiniteScroll 用于页面滚动接近边界时加载更多数据。组件采用受控状态，外部通过 `loading`、`finished`、`error` 控制展示和触发条件。

默认文案优先使用组件文案 props，其次读取 `ConfigProvider` 的 `locale.infiniteScroll`，最后使用内置默认文案。加载中图标由 `loadingIcon` 配置，参数与 Loading 组件一致。

## 触发规则

- `direction` 为 `down` 时，距离底部小于等于 `offset` 会触发 `onLoad`。
- `direction` 为 `up` 时，距离顶部小于等于 `offset` 会触发 `onLoad`。
- `loading`、`finished`、`error`、`disabled` 任一为真时，不会重复触发。
- `error` 状态内容点击后，会以 `isRetry = true` 重新触发 `onLoad`。

## 主动检测

组件通过 ref 暴露 `check()` 方法，适合在数据变更、Tab 切换、弹层显示或容器尺寸变化后主动检测当前位置。

## 自定义内容

默认会展示加载中、加载完成和加载失败文案。也可以使用 `loadingChild`、`finishedChild`、`errorChild` 自定义状态内容。
