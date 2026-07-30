## BottomSheet and Popup

In STDF's design philosophy, both BottomSheet and Popup are floating interactions within the interface, generally used for secondary operation scenarios on the page, and share some similarities in component usage. **However, Popup is a concept of "layer", while BottomSheet is a concept of "window"**.

As a popup layer, Popup generally should not involve complex interaction steps. By default, clicking the mask layer can close it, but you can customize parameters such as popup position, size, transition animation, direction, and style. **Emphasizes style over logic.**

As a bottom window, BottomSheet can only pop up from the bottom. The "floating" aspect is reflected in the ability to control its fixed height by sliding its internal header area. The difference between a "window" and a "layer" is that BottomSheet has its own header area, which can be customized with content and dispatches events like close, back, and slide similar to window interactions. It can be used for relatively complex interaction scenarios, and by default, clicking the mask cannot close it. **Emphasizes logic over style.**

## Fixed Height

The height of BottomSheet is determined by stayHeightList, which is an array of integers between 0-100. It divides the display height of BottomSheet on the page into several levels based on page height percentage. When sliding stops, BottomSheet will automatically stay at the closest level height. stayHeightIndex indicates the initial fixed height index, which, combined with stayHeightList, determines the initial height of BottomSheet.

## Slide to Close

When sliding ends, if BottomSheet's position relative to the page height percentage is lower than closeHeight, BottomSheet will automatically close. closeHeight defaults to 0, meaning sliding to close is not allowed.

## Events

BottomSheet supports monitoring close, back, and fixed height change events through onclose/onback/onheightChange, while the onclickMask event is triggered when clicking the mask layer, even if maskClosable is false.
