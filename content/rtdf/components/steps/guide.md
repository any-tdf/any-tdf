## 说明

Steps 默认为横向布局，由于移动端横向显示内容有限，横向布局建议只用作简单使用。当步骤较多、标题较长或显示内容较多时建议使用纵向布局。

> 横向布局只显示标题与步骤栏区域，即使传入了 desc 等其他参数也不会显示。

## current

从 1 开始的实际步骤序号，组件内部对应 steps 的索引值 +1。

## finishStep

每一步的 Props 支持传入 finishStep，格式与 step 相同，用于一些场景下更准确细致地表达已经完成的步骤，请参考示例。

## 步骤栏区域

步骤栏区域 bar 可以传入三种情况，type 为 `'string'` 将直接显示字符，建议单个字符；type 为 `'image'` 将显示图片，可以传入图片的相对路径或绝对路径，组件内部将其转换为 img 标签的 src 属性；type 为 `'icon'` 将显示图标，根据传入的 [Icon Props](/components?nav=icon&tab=1) 进行渲染。

## injReactNode

step 和 finishStep 支持通过 injReactNode 注入 ReactNode，Steps 内部将其渲染至步骤区域底部。`injComponent` 作为兼容旧命名保留，请参考示例。

## 补充

Tip：表示时间线的业务场景也是可以使用 Steps 组件。
