## Use Cases

The Accordion component is used to display collapsible content panels, commonly seen in FAQ, settings pages, content grouping and other scenarios.

## Expand Mode

Default is single selection mode, only one item can be expanded at a time. Set `multiple` to `true` to enable multiple selection mode, allowing multiple items to expand simultaneously.

## Expand Icon

Control the expand icon type through the `expandIcon` property:

- `'arrow'`: Arrow icon (default), rotates 90 degrees when expanded
- `'plus'`: Plus icon, rotates 45 degrees to become an X when expanded
- `null`: No expand icon

Control the expand icon position through the `iconPosition` property, options are `'left'` or `'right'` (default).

## Divider

Dividers are shown by default. Set `divider` to `false` to hide dividers.

## Disabled Item

Set `disabled` to `true` in the `items` array to disable an item. Disabled items cannot be expanded/collapsed.

## Custom Content

Use the `children` Snippet to customize the content area rendering. The Snippet receives the current item data and index as parameters.

## injClass

The `injClass` parameter allows injecting CSS class names to the outer container. `titleClass` and `contentClass` are used for the title and content areas respectively.

If the injected class doesn't take effect, please add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
