## 说明

由于移动端横向显示内容有限，Radio 默认为纵向布局，横向布局建议只用作简单使用。当选项较多、内容较长或显示内容较多时建议使用纵向布局，

Radio 通过 value 传入一个值作为内部 Radio 的初始标识符；而当 RadioItem 被点击时，Radio 通过 onchange 事件，可以获取到当前 value，即当前选定 RadioItem 的 name。

## icon && iconChecked

Radio Props 的 icon 默认值 `'default'` 会按照 Remix Icon 的 ri-checkbox-blank-circle-line 以 Icon 组件形式渲染；传入 `null` 表示未选中选项图标区域不显示内容；也可以传入 Icon Props，未选中选项图标区域将会以传入的参数以 Icon 组件形式渲染。

iconChecked 与 icon 逻辑一样，对应的是选中选项的图标区域内容。

## Radio Snippets

当传入 radioChild 时，Radio 的每条 RadioItem 的内容区域将会使用 radioChild 的内容区域，可结合 Radio 的 onchange 事件获取到的 value，自由设计选中与未选中的效果。

注：虽然有 Tailwind 写样式比较方便，但过多的自定义将会失去使用组件库的意义。

## 点击区域优化

为了优化体验，RadioItem 整个区域都可以点击，将会激活与之对应的 value，不仅仅只可以点击文字或图标区域。

## ActionSheet、Picker、Radio

ActionSheet、Picker、Radio 三者都是给出数据，让用户进行数据选择或执行一些操作，但何时使用哪个组件呢？

- Radio 一般用于单选数据，数据量固定且较少，需要在 UI 界面上直接展示选项，方便用户在界面交互时对多条数据有个概览，比如性别选择。
- ActionSheet 一般用于选择之后立即执行一些操作，选项固定且较少，但不需要在 UI 界面上直接展示选项，比如做一些删除、修改等操作。
- Picker 一般用于选择单条或多条数据，数据量较大或无法确定长度的动态数据，或用于一些联动数据的选择，比如省市区选择。
