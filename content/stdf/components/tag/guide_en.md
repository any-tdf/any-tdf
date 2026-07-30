## State Types

The Tag component controls the color state through the `state` property, consistent with the Button component, supporting six states: `theme`, `success`, `warning`, `error`, `info`, and `neutral`. neutral uses softer monochrome alpha colors.

## Fill Styles

The `fill` property can be used to set the fill style of the tag:

- `base`: Solid style with background color fill
- `line`: Outlined style with transparent background and border
- `light`: Light style with light background

## Mark Style

When the `mark` property is `true`, the tag has a right angle on the left and a semi-circle on the right, commonly used for product labels and similar scenarios.

## Closable Tags

Setting the `closable` property displays a close button. Clicking the close button triggers the `onclose` event. Usually needs to be combined with state management to implement dynamic tag deletion.

## Custom Content

In addition to using the `text` property to set text, you can also pass custom content such as icons and images through the `children` Snippet.

## CSS Injection

The `injClass` parameter allows you to inject CSS class names into the Tag component (not limited to Tailwind CSS), providing more customization possibilities. The examples demonstrate gradient backgrounds and shadows through `injClass`.

If the injected class doesn't take effect, add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
