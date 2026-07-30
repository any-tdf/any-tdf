## Description

In component library development, satisfying both customization and ease of use is always a trade-off.

As a frequently used component in mobile applications, Cell supports many use cases, which is why it has quite a few Props and customization options.

## Snippet

Cell component supports three Snippet: leftChild, rightChild and detailChild. When leftChild is provided, the leftmost content of Cell will be rendered by the leftChild, refer to examples for customizing left images; when rightChild is provided, the rightmost content will be rendered by rightChild, refer to examples for customizing right images; when detailChild is provided, the right detail content will be rendered by detailChild, refer to examples for customizing right detail content.

## left & right

The left parameter supports Icon Props, which will be rendered using STDF's Icon component.

Considering that arrows are commonly used in the right area of Cell, the default right parameter is set to `'arrow'`, displaying an arrow.

right also supports Icon Props. Given that switches are frequently used on the right side, to distinguish between Switch Props and other Icon Props, right includes a type attribute (options are `'icon'` and `'switch'`) to differentiate between Icon and Switch components.

Optimization: When right is set to switch, clicking anywhere in the Cell area will toggle the Switch state.

For specific Icon Props and Switch Props, please refer to the corresponding component APIs.

## clickAll

Considering mobile interaction friendliness, Cell triggers events by default when clicking anywhere in the row. However, for diverse scenarios, you can disable this feature by setting clickAll parameter to false. This restricts event triggering to specific areas, like in examples where it's used with Switch component to only trigger events when clicking the Switch.

## switchActive

switchActive value only takes effect when right's type is switch, indicating the switch state. Note that in this case, the Cell's internal Switch active state is determined by switchActive, **please do not pass active inside switch again**.

## Bottom Divider

Mainly used in combinations, when there are gaps between Cells, you can use the line parameter to control whether to display the bottom divider.

## Combination Usage

Cell component supports combination usage by passing Cells to CellGroup. To avoid affecting the layout, pay attention to configuring individual Cell's my, mx, radius, shadow, line parameters, please refer to examples.

## Customization

Using vertical and horizontal margin parameters and top/bottom border radius parameters, you can configure various Cell styles. If these still don't meet your needs, you can use injected CSS (injClass) to achieve more custom styles, please refer to examples.

## Swipe Actions

Cell component supports swipe actions by passing an action array through the `swipeActions` parameter. Maximum 4 action items are supported.

Each action item supports `text`, `icon`, `state` (background color state), and `onclick` (click callback) properties. `state` supports preset values `'theme'`, `'success'`, `'warning'`, `'error'`, `'info'` or custom color values.

Set `swipeOpen` to `true` to initially open the swipe actions. Actions automatically close after clicking an action item.
