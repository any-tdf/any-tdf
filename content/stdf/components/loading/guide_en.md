## Type

There are currently four types of Loading, which are monochrome, bicolor, quadricolor, and other. They can be distinguished by the first value of the `type`, such as `1_0`, `2_0`, `4_0`, `o_0`. The second value represents the identification number of this type.

More Loading types will be gradually added in future versions, and your feedback is welcome.

## Size

The size of the Loading container is determined by `height` and `width`. Most Loading components will automatically fill the given container, except for a few that require a fixed size. Please adjust the size according to your needs.

## Theme Color

When using the monochrome mode, the `theme` can be used to control whether to use the theme color. The color will automatically adapt to light and dark mode. Please refer to the example.

## Contrast Color

Usually, the color scheme of the website is light, and Loading will use dark colors. However, in some scenarios, such as toast components where the background color is opposite in light and dark mode, or default button background colors that are darker, you can use `inverse` to control the color scheme to make it opposite to the light and dark mode of the website. Please refer to the example.

## Custom Color

When you need to pass in custom colors, you can use `customColor` to pass in an array of colors. The length of the array is the same as the first value of the Loading `type`. For example, `1_0` requires passing in one color, `2_0` requires passing in two colors, and `4_0` requires passing in four colors. Please refer to the example.

Note: When using custom colors, `theme` and `inverse` will not take effect.

## Default Colors for Quadricolor

When using the quadricolor mode, the default colors used inside Loading are red (#DA1414), green (#11BB8D), purple (#7356BF), and yellow (#FFC043), which correspond to the STDF color system's error, success, purple, and yellow respectively. If you need to customize the colors, please pass in a `customColor` array of length 4. Please refer to the example.

## Animation Speed

The animation speed of Loading can be controlled by `speed`, with a base of 1 indicating normal speed. The larger the value of `speed`, the faster the animation speed. Please use a value greater than 0, but it is not recommended to use a too large a value, otherwise it may cause the animation to be too fast, which will increase power consumption and affect the user experience.

For some Loading animations that have special continuity between elements, the value of `speed` may be ignored and use the default value.

## Lazy Animation

Loading comes with a series of transition animations. In extreme cases, when there are a large number of transition effects on the page, considering device performance and animation frame rate issues, Loading uses `lazyAnimation` to enable lazy animation by default, which means that the Loading component **will pause the animation when it is not in the visible range on the page**. Of course, you can also set it individually.

## Acknowledgments

Some of the animation inspirations are from [德育处主任](https://gitee.com/k21vin/front-end-data-visualization/tree/master/src/views/Native/PureCSS/pages/Loading/components) and [LDRS](https://uiball.com/ldrs). Special thanks go to them.
