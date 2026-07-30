## Basic Usage

List is used to render structured list content. Use the `itemChild` Vue Slot to define each item layout.

## Spacing, Padding, and Radius

- Use `gap` to control the spacing between list items.
- Use `mx` and `my` to control the outer margins of the list.
- Use `itemPx` and `itemPy` to control item padding.
- Use `itemRadius` to control item radius.

Set `divider` to `true` to enable dividers. Dividers can be used together with gaps, and you can set `gap` to `0` for a tighter layout.

## Transition Animations

List uses `slideRight` by default. Use `transition` to switch animation types, and set it to `null` to disable transitions. Use `transitionDelay` to control per-item delay.

Transitions apply on both enter and leave states:

- `slideRight`: Slide in or out from the right.
- `slideUp`: Slide in or out from below.
- `fadeScale`: Fade and scale in or out.
- `stagger`: Alternating slide in and out by index.

## Batch Selection

Set `batchSelectable` to show batch selection controls:

- `batchMode`: Batch selection mode with two-way binding.
- `batchSelected`: Selected key array with two-way binding.
- `batchActions`: Batch action button configuration.
- `@batch-change`: Triggered when selection changes.
- `@batch-action`: Triggered when a batch action button is clicked.

## Swipe Actions

List supports swipe actions on the right side, up to 4 items.

- `swipeActions`: Swipe action button configuration.
- `swipeHint`: Hint display mode, supports `none`, `first`, `all`.
- `swipeThreshold`: Swipe trigger threshold (pixels).

`SwipeActionProps` supports `icon`, `text`, and `bgColor`. `bgColor` supports `theme`, `success`, `warning`, `error`, `info`, and `primary` is an alias of `theme`. Listen to `@swipe-action` when a swipe action button is clicked.

## Click Feedback and Arrow

- `clickable`: Enables click feedback.
- `arrow`: Shows the right arrow indicator.
- `@click-item`: Triggered when a list item is clicked.

## Custom Header and Footer

Use `headerChild` and `footerChild` Children to add custom content at the top and bottom of the list.

## Empty State Handling

List does not render empty states. Handle empty data rendering outside the component.
