## 使用

ActionSheet 操作面板一般从页面底部弹出，提供与当前场景相关的操作动作。此操作一般不会携带数据，不用担心误触，默认不显示取消操作项，允许点击遮罩关闭。
如需在触发元素附近弹出，请使用 ActionPopover 操作气泡。

## 说明

ActionSheet 操作面板是在 Popup 基础上封装的，通过预先定义一些 Popup 的 Props 实现，因此可以通过传入 Popup 的属性来实现不同的效果。比如示例中通过设置 popup 的 radius 改变圆角风格。

## actions

ActionSheet 的 actions 属性是一个数组，数组中的每一项都是一个对象，对象属性参考 Action Props。

## Radio、ActionSheet、IndexBar、Picker、AsyncPicker 区别

Radio、Checkbox、ActionSheet、IndexBar、Picker、AsyncPicker 组件本质都是给出一系列数据，让用户进行数据选择或执行一些操作，但在使用上有一些区别：

- Radio 一般用于单选数据，数据量固定且较少，需要在 UI 界面上直接展示选项，方便用户在界面交互时对备选数据有个概览，比如性别选择。
- Checkbox 使用场景类似 Radio，但是可以多选。
- ActionSheet 一般用于选择之后立即执行一些操作，选项固定且较少，但不需要在 UI 界面上直接展示选项，比如做一些删除、修改等操作。
- IndexBar 一般用于选择单条数据，数据量非常大的动态数据，且已经对数据进行了分类索引，一般会用整个页面来展示。
- Picker 一般用于选择单条或多条数据，数据量较大或无法确定长度的动态数据，或用于一些联动数据的选择。**无论是否联动，数据在传入时已经是确定的。**
- AsyncPicker 一般用于选择多条数据，下级数据是根据上级数据动态获取的，比如服务端接口单次只返回一级数据，需要根据用户选择的一级数据再次请求接口获取下级数据。
