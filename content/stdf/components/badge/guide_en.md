## Usage

The `Badge` component is usually placed in the upper right corner of the content, so when used conventionally, please pass the main content as the default Snippet. Since the `Badge` is positioned relative to the main content, it will not affect the layout of the main content.

However, for some special components, such as `Cell`, the `Badge` may be placed in a specific position within the component. In this case, you can use the `isInner` attribute to position the `Badge` as an inner element, with the placement determined by the component itself. See the example for reference.

## `offsetY` and `offsetX`

By default, the `Badge` component is positioned relative to the upper right corner of the main content, and the left and top offsets are half the width and height of the `Badge`, respectively. However, due to the uncertainty and complexity of the internal content, `offsetY` and `offsetX` can be used to adjust the position of the `Badge` based on the original position, in order to meet more requirements.

## Leaf-shaped Corner Radius

When `radius` is set to `'leaf'`, the corner style of the `Badge` is leaf-shaped, and the direction of the leaves is associated with the current position.

## Injecting CSS

The `injClass` parameter can be used to inject custom CSS class names (not limited to Tailwind CSS) into the `Badge` component, which allows for further customization of the component's appearance. For example, the example uses `injClass` to customize the background color and border of the `Badge`.

If the injected class name does not take effect, add a `!` before the class name, as demonstrated in the [Tailwind Important Modifier](https://tailwindcss.com/docs/configuration#important-modifier).
