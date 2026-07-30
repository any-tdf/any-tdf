## Description

Due to limited horizontal display space on mobile devices, Radio defaults to vertical layout. Horizontal layout is recommended only for simple use cases. When there are multiple options, longer content, or more display content, vertical layout is recommended.

Radio accepts a value prop as the initial identifier for internal Radio items. When a RadioItem is clicked, Radio can get the current value through the onchange event, which is the name of the currently selected RadioItem.

## icon && iconChecked

The default value `'default'` for Radio Props' icon will render as an Icon component using Remix Icon's ri-checkbox-blank-circle-line. Passing `null` means no content will be displayed in the unchecked option's icon area. You can also pass Icon Props, and the unchecked option's icon area will render as an Icon component with the passed parameters.

iconChecked follows the same logic as icon, corresponding to the icon area content of the selected option.

## Radio Snippets

When radioChild is passed, the content area of each RadioItem in Radio will use the content area of radioChild. You can freely design the selected and unselected effects by combining with the value obtained from Radio's onchange event.

Note: Although Tailwind makes styling convenient, too much customization will defeat the purpose of using a component library.

## Click Area Optimization

To optimize the user experience, the entire area of RadioItem is clickable and will activate its corresponding value, not just the text or icon areas.

## ActionSheet, Picker, Radio

ActionSheet, Picker, and Radio all provide data for users to select or perform operations, but when should each component be used?

- Radio is generally used for single-selection data with a fixed and small number of options that need to be directly displayed on the UI interface, allowing users to have an overview of multiple data points during interface interaction, such as gender selection.
- ActionSheet is generally used when actions need to be executed immediately after selection, with fixed and fewer options that don't need to be directly displayed on the UI interface, such as delete or modify operations.
- Picker is generally used for selecting single or multiple data points with a large amount of data or dynamic data of uncertain length, or for selecting linked data, such as province-city-district selection.
