## Usage

The Mask component is usually used in combination with other components such as Toast, BottomSheet or Popup to block out the underlying content, highlight the pop-up content or prevent user interaction.

## Animation

The animation effect of the mask is fade, which can be referred to [svelte/transition/fade](https://svelte.dev/docs/svelte/svelte-transition#fade).

Normally, the mask is placed below other interactive components, so considering the smoothness of appearance and disappearance, there is a short animation (default 150ms) when the mask appears, generally the same length as the content. After the content is displayed, it is generally necessary to close quickly, so the exit animation is 0ms by default, but of course, the exit animation time can also be set through the `outDuration` attribute.

## Click-through

The Mask can be set whether it can be clicked through by the `clickable` attribute. When it is set to `true`, clicking the mask will not trigger the `onclickMask` event.

## Inverse

Usually, the page color is in light color scheme, and the Mask uses a black background color. When the page uses a dark mode, the Mask will use a white background color. However, in some special scenarios, the background color is precisely opposite to the page (light/dark). The color can be controlled via `inverse` attribute to make it exactly opposite to the page's light/dark colors. Please refer to the example for details.

The Mask can be set whether to invert the color by using the `inverse` attribute. When it is set to `true`, the mask background color is white.

## zIndex

The mask layer is positioned fixed relative to the browser window, and the default `z-index` is 500, which can be set via the `zIndex` attribute.

The components that use the Mask include Toast, Popup, BottomSheet, etc., and these components also have default z-index as shown in the table below. If these components are displayed at the same time, please pay attention to the layer relationship.

The default `z-index` of components that use the Mask are as follows:

| Component   | zIndex |
| ----------- | ------ |
| BottomSheet | 600    |
| Popup       | 600    |
| Toast       | 1000   |
