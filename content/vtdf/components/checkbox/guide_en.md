## Description

Due to limited horizontal display space on mobile devices, Checkbox defaults to vertical layout, with horizontal layout recommended only for simple use cases. When there are multiple options, long content, or rich display content, vertical layout is recommended. When an option within Checkbox is clicked, you can get the array of selected `name` identifiers through the `@change` event.

## icon && iconChecked

The default value `'default'` for Checkbox Props' icon will render as an Icon component following Remix Icon's checkbox-line style; passing `null` means no content will be displayed in the unchecked option's icon area; you can also pass Icon Props, and the unchecked option's icon area will be rendered as an Icon component with the passed parameters.

iconChecked follows the same logic as icon, corresponding to the icon area content for checked options.

## Checkbox Vue Slot

When passing the checkboxChild Vue Slot, the option area will be rendered with the passed Vue Slot content, allowing free design of checked and unchecked effects, data logic handling, etc.

> Although Tailwind makes styling convenient, too much customization will defeat the purpose of using a component library.

## Click Area Optimization

To optimize the user experience, the entire CheckboxItem area is clickable and will activate its corresponding option, not just the text or icon areas.
