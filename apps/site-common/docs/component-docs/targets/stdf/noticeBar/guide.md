## 说明

当横向放置时，不论内容有几条，只要所有内容加上内容之间的间隔长度之和超过容器宽度，NoticeBar 将会自动横向滚动，否则不滚动。

垂直放置时，内容超过一条时将会自动垂直滚动，单条内容过长将会溢出显示。

## leftIcon 与 rightIcon

左侧区域 leftIcon 除了默认的小喇叭图标，可以传入 Icon Props 实现其他图标显示，还可以自定义任何内容，通过 leftChild 这个 Snippet 实现，而右侧区域 rightIcon 只允许关闭、箭头、不显示三种情况，也可以通过 rightChild 这个 Snippet 实现自定义内容，请参考示例。

## onclickRight 事件

当点击右侧区域时，如果 rightIcon 为 close 会关闭当前通告栏；而 rightIcon 无论是 close 还是 arrow 都会派发 onclickRight 事件，可以通过监听该事件来实现自定义的业务逻辑。

## CSS 注入

通过 injClass 参数可以向组件内部最外层元素注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义背景色与文字颜色。

若注入的 class 没生效，请在注入的 class 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
