## 使用场景

Stepper 组件一般用于需要对数据进行逐步增减操作的场景，比如商品数量选择、积分加减、进度条等，如果数据量调整较大，建议使用 NumKeyboard 或 Input 组件。

## 异步状态

Stepper 组件支持异步状态，一般用于与服务端交互过程中更加合理地显示 Stepper 的值。通过设置 async 属性开启，此时可通过 asyncLoading 属性设置内部是否显示 Loading 状态，当然也可以自由设置 Loading 的显示位置和方式，请参考示例。

异步状态时为防止用户误触，增减按钮将会自动禁用，直到异步状态结束。

## 固定宽度

通过 width 参数可以设置数字区域的固定宽度，优化数字变化时数字区域宽度变化带来的视觉不适，建议这个固定值为数字变化时可能造成的最大宽度。

## CSS 注入

通过 injClass 参数可以分别向组件的外部、增减按钮、数字区域注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过注入实现了自定义不同位置的样式。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
