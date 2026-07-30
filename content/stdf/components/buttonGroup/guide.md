## 使用场景

ButtonGroup 用于将多个相关操作组合在一起，常见于工具栏、操作面板等场景。

## 两种使用方式

ButtonGroup 支持两种使用方式：

### 1. items 数组模式

通过 `items` 属性传入按钮配置数组，每个按钮项支持 `text`、`icon`、`disabled`、`onclick` 属性。

### 2. children 自定义模式

当需要完全自定义按钮内容时，可以使用 `children` Snippet。

## fill + state 组合

ButtonGroup 的 `fill` 和 `state` 属性可以组合使用：

- `base`/`lineState`/`textState`/`colorLight`：跟随 `state` 变化
- `line`/`lineLight`/`text`：为无色模式，不受 `state` 影响

## 分割线

按钮之间的分割线高度通过 `dividerHeight` 属性控制：

- `full`：100% 高度
- `mid`：60% 高度（默认）
- `short`：30% 高度

分割线颜色会自动跟随按钮文字颜色。

## 禁用按钮

可以在 `items` 数组中单独设置某个按钮的 `disabled` 属性来禁用它。
