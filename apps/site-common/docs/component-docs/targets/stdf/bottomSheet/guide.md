## BottomSheet 与 Popup

在 STDF 的设计思路内，BottomSheet 与 Popup 都属于界面内的浮动交互，一般用于页面内的二级操作场景，在组件使用上有一些相似之处。**但弹出层 Popup 是「层」的概念，而底部浮窗 BottomSheet 是「窗」的概念**。

Popup 作为弹出层，内部一般不宜做比较复杂步骤的交互，默认点击遮罩层就可以关闭，但可以自定义弹出的位置、大小、过渡动画、方向、样式等多项参数。**重样式轻逻辑。**

BottomSheet 作为底部浮窗，就只能从底部弹出。「浮」体现在可以通过滑动其内部的头部区域来控制其固定高度；而「窗」区别于「层」的是，BottomSheet 有自己的头部区域，可以自定义头部内容，并派发出关闭、返回、滑动等类似窗口交互的事件，可以用于一些相对复杂的交互场景，默认点击遮罩不可关闭。**重逻辑轻样式。**

## 固定高度

BottomSheet 的高度由 stayHeightList 决定，stayHeightList 是由多个 0-100 正整数组成的数组，将 BottomSheet 在页面上的显示高度按照页面高度百分比划分成几个档位，当滑动停止时，BottomSheet 会自动停留在最接近的一个档位高度。stayHeightIndex 表示初始固定高度索引，结合 stayHeightList 决定 BottomSheet 的初始高度。

## 滑动关闭

当滑动结束时 BottomSheet 位置相对于页面高度的百分比数值低于 closeHeight 时 BottomSheet 将自动关闭。closeHeight 默认为 0，即不允许滑动关闭。

## 事件

BottomSheet 支持通过 onclose/onback/onheightChange 来监听关闭、返回、固定高度变化事件，而 onclickMask 事件则是点击遮罩层时触发，即使 maskClosable 为 false 也会触发。
