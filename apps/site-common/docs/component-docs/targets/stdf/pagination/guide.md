## 设计思路

私以为，分页不应该是上滑加载下一页，这种交互会让用户无心理预期而产生不适，所以 STDF 的分页组件交互默认满足以下几个条件：

- 页码变化事件必须是用户主动触发。
- 无论何时都须同时显示上一页、下一页、首页、尾页、当前页，用户对全部数据有预期且可直接点击跳转到这些关键页码。
- 移动端横向显示区域有限，即便如此，也可以通过点击省略页码跳转到任意页码。

当然，你也可以配置为**连续模式**，即只允许点击上一页、下一页，比如一些后端接口必须根据上一页数据查询下一页数据的情况。但这样无疑会降低用户体验。

> To be in charge, the user must be informed. When, for example, the user initiates an operation, immediate feedback confirms that the operation is being carried out, and (eventually) then it’s finished… This communication should be brief, direct, and expressed in the user’s vocabulary rather than the programmer’s. (Apple Human Interface Guidelines)

## 事件监听

Pagination 组件对外暴露了三个事件：onchange、onnext、onpre，分别对应页码变化、下一页、上一页。onnext 和 onpre 事件都会触发 onchange 事件，请按需监听。

## total

Pagination 组件内将不显示 total 数据，请根据具体业务决定是否在页面内显示。

## current

current 为当前页码，内部默认从 1 开始计数，外部也可传入一个初始页码。

## maxShowPage

maxShowPage 表示最大显示页码数，即算上首页、尾页、显示页、省略号等在内一起算的数量，可选值为 5、7、9、11。此数值越大同时显示的页码越多，但也会导致单项宽度变小，影响用户操作，请根据具体业务决定。

## 省略页码

当总页码数大于 maxShowPage 时，就会有省略页码，省略页码分为前省略页码和后省略页码。当总页码数不是很多时，同时只会省略前后页码中的一个，当总页码数很多时，同时会省略前后页码。

所有省略的页码都可以通过点击省略号展开，展开区域支持上下滚动，且支持通过 pageCol 属性控制每行显示的页码数量。**并支持点击任意页码跳转到该页码。**

如果担心用户首次使用时无法知晓此交互，可以根据具体业务，比如用户首次使用时且总页码数大于 maxShowPage 时，通过传入 showNextOmitPage 默认将后省略页码展开，加以引导。

## type

type 表示高亮页码类型，可选值为 border、block、bold。border 表示高亮页码为边框，block 表示高亮页码为块，bold 表示高亮页码加粗且弱化其他页码。

## CSS 注入

通过 injClass 参数可以向组件内部外层注入 CSS 名称（不仅限于 Tailwind CSS），这将使组件样式有更多自定义可能性，示例中通过 injClass 实现了自定义圆角风格、两边间距、阴影等。

若注入的 CSS 没生效，请在注入的 CSS 名称前添加“!” ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
