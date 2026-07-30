## 使用场景

手风琴组件用于展示可折叠的内容面板，常见于 FAQ、设置页面、内容分组等场景。

## 展开模式

默认单选模式，同一时间只能展开一项。设置 `multiple` 为 `true` 可开启多选模式，允许多项同时展开。

## 展开图标

通过 `expandIcon` 属性控制展开图标类型：

- `'arrow'`：箭头图标（默认），展开时旋转 90 度
- `'plus'`：加号图标，展开时旋转 45 度变成叉号
- `null`：不显示展开图标

通过 `iconPosition` 属性控制展开图标位置，可选 `'left'` 或 `'right'`（默认）。

## 分割线

默认显示分割线，设置 `divider` 为 `false` 可隐藏分割线。

## 禁用项

在 `items` 数组中设置 `disabled` 为 `true` 可禁用某项，禁用项无法展开/折叠。

## 自定义内容

通过 `children` Snippet 可自定义内容区域的渲染，Snippet 接收当前项数据和索引作为参数。

## injClass

通过 `injClass` 参数可以向组件外层容器注入 CSS 名称，`titleClass` 和 `contentClass` 分别用于标题和内容区域。

若注入的 class 没生效，请在注入的 class 名称前添加"!"，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
