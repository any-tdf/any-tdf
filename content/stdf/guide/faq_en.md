## Q: Why isn't there a rasterization component?

A: Using CSS Flexbox directly can easily and quickly achieve rasterization layout. There is no need to introduce additional components to achieve rasterization layout. Moreover, using Tailwind CSS to write will be very concise.

## Q: Some components require props to be of type string, but passing number types is completely normal?

A: Because these Props inside the component are used as keys of an Object, strictly speaking, they should be passed in as String type. If a number is passed in, it will also be converted to String. Therefore, passing in Number or String types are both acceptable. When type checking is enabled, there will be a type error. Although it can still function normally, it is recommended to pass in the specified types.

## Q: Why does the theme have both light (primary) and dark colors?

A: STDF's theme system adopts a dual theme color design to achieve optimal visual effects in both light and dark modes. The primary color is used in light mode, while the dark color is used in dark mode. The reason for this design is that the same color appears differently on light and dark backgrounds. To ensure good contrast and readability in both modes, two theme colors need to be configured separately. For example, a blue that looks comfortable on a white background might appear too harsh or lack sufficient contrast on a black background. By configuring separate light and dark theme colors, we can ensure the application provides the best user experience in any mode.

## Q: Why does the global theme configure radius, but components also have their own radius configuration?

A: Global radius (`--radius-box`, `--radius-form`, `--radius-small`) ensures overall style consistency, while component `radius` props allow overrides for special cases. For example: avatars need circular shape, buttons inside large-radius cards need smaller corners, etc. Components use global values by default, and override when specified.
