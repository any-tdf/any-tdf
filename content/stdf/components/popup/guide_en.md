## Popup vs. BottomSheet

In the STDF design philosophy, both BottomSheet and Popup are floating interactions within the interface, generally used for secondary operations within a page. There are some similarities in the use of the components. However, the Popup is a "layer" concept, while the BottomSheet is a "window" concept.

As a pop-up layer, the Popup is generally not suitable for complex step-by-step interactions. Clicking the mask layer should close the Popup by default, but you can customize the position, size, transition animation, direction, style, and other parameters of the Popup. **The emphasis is on style rather than logic.**

As a bottom floating window, the BottomSheet can only be popped up from the bottom. The "floating" means that its fixed height can be controlled by sliding its inner header area. Unlike the Popup's "layer" concept, the BottomSheet has its own header area, which allows custom header content and dispatches close, return, slide, and other window-like interactive events. It can be used for relatively complex interaction scenarios, and by default, clicking the mask cannot close the BottomSheet. **The emphasis is on logic rather than style.**

## size

The size of the popup is determined by the size property, which represents the percentage of the entire page size. When the position is top, bottom or center, it represents the proportion of the popup's height to the viewport height. When the position is left or right, it represents the proportion of the popup's width to the viewport width. When the value is 0, the size of the popup is no longer fixed, but determined by the width or height of the internal elements.

## Animation

The transition animation type when the Popup appears and exits is determined by the easeType property, with a default value of cubicOut. There are 31 optional values (including a linear animation and 30 non-linear animations), specifically documented at [svelte/easing](https://svelte.dev/docs#run-time-svelte-easing), and the specific non-linear effects can be seen at the [ease visualizer](https://svelte.dev/examples/easing). The duration of the animation appearing and exiting is determined by the duration and outDuration properties.

| ease    | in        | out        | inOut        |
| ------- | --------- | ---------- | ------------ |
| back    | backIn    | backOut    | backInOut    |
| bounce  | bounceIn  | bounceOut  | bounceInOut  |
| circ    | circIn    | circOut    | circInOut    |
| cubic   | cubicIn   | cubicOut   | cubicInOut   |
| elastic | elasticIn | elasticOut | elasticInOut |
| expo    | expoIn    | expoOut    | expoInOut    |
| quad    | quadIn    | quadOut    | quadInOut    |
| quart   | quartIn   | quartOut   | quartInOut   |
| quint   | quintIn   | quintOut   | quintInOut   |
| sine    | sineIn    | sineOut    | sineInOut    |

## Spacing

When the position of the popup layer is top, bottom, or center, and the width of the popup layer takes up the entire viewport, you can use the `px` prop to set the left and right spacing. When the position of the popup layer is left or right, and the height of the popup layer takes up the entire viewport, you can use the `py` prop to set the top and bottom spacing. Please refer to the example.

## Transition Distance

When the size of the popup layer content is not certain, or a large amount of content is expected (such as displaying agreements dynamically), it is recommended to use a fixed size to limit the size of the popup layer, allowing the internal elements to scroll. In this case, when the popup layer appears, it will move from outside the visible area of the page into the visible area, and the distance moved will be the size of the popup layer.

When the width and height of the popup layer content are determined, you can set the `size` of the popup layer to 0, and the size will be determined by the internal elements. However, the component cannot obtain the width and height of the popup layer in advance, which causes the animation effect to not be executed. In this case, transitionDistance needs to be provided externally to specify the width or height of the popup layer (height needs to be provided for the top and bottom positions, while width needs to be provided for the left and right positions) to fix the animation distance, in pixels. It doesn't need to be exact, as long as the animation distance is appropriate.

Note that when the position of the popup layer is center, the animation effect is scaling, so `transitionDistance` does not need to be provided regardless of the size of the popup layer.

## Background Color

The background color of the popup layer will automatically adapt to the light and dark background. When `transparent` is set to true, the background color of the popup layer will be transparent, which can satisfy needs where no background color is required.

## Events

By default, clicking on the mask of the popup layer will close it. If this function is not required, you can set `maskClosable` to false. Additionally, `onclose` is supported to listen for the exit event of the popup layer, while `onclickMask` is triggered when the mask layer is clicked. Even if `maskClosable` is set to false, this event will still be triggered.

## Optimization

Popup has also been optimized to dynamically update the page height and the position of the popup layer relative to the page with `dynamicFixed` set to true when scrolling the page in mobile versions of Safari, Chrome, or other browsers. However, this scroll listener will have a slight performance loss. If this feature is not needed in your project (such as when using a controllable webview), you can set `dynamicFixed` to false to disable it.
