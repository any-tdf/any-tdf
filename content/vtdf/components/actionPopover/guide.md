## 使用

ActionPopover 操作气泡用于在触发元素附近弹出，提供与当前场景相关的操作动作，适合更紧凑的交互场景。

## 说明

ActionPopover 操作气泡通过 triggerRef 绑定触发元素，弹出位置会根据 inlineDirection 或视口位置自动调整。

## 反转色

ActionPopover 支持 inverse 反转色，用于让亮暗模式对调，默认不反转。

## 布局

通过 layout 控制操作项布局，支持 v（纵向）、 h（横向）、 grid（宫格）、 ring（环形）。宫格列数可通过 gridColumns 设置。

## 环形布局

当 layout 设置为 ring 时，操作项会以环形方式排布在触发元素周围。环形布局仅支持图标操作项，需要通过 ringActions 传入。

环形形状通过 ringShape 控制，支持以下值：

- auto：根据操作项数量自动判断，≤3 个为 1/4 圆，≤5 个为半圆，>5 个为全圆
- quarter：1/4 圆
- half：半圆
- full：全圆

环形布局会根据触发元素在视口中的位置自动判断展开方向。例如，触发元素在左上角时，环形会向右下方展开。

可通过 ringRadius 自定义环形半径，ringItemSize 设置操作项尺寸。

## actions

ActionPopover 的 actions 属性是一个数组，数组中的每一项都是一个对象，对象属性参考 Action Props。
