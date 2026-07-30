## Usage Scenarios

The AsyncPicker component is similar to Picker's multi-level linkage, but it's designed to handle scenarios where child-level data needs to be queried from the server based on parent-level selections. For example: after selecting province-level data, dynamically query corresponding city-level data, and after selecting city-level data, dynamically query corresponding district-level data, and so on.

## How to Use

Using AsyncPicker is slightly more complex compared to Picker's multi-level linkage because the data isn't passed in all at once but is obtained dynamically through APIs. Therefore, developers need to handle the data themselves.

By monitoring the onnext and onprev methods, update the current column's new data and dynamically bind it to the component internally. Additionally, you need to dynamically bind whether the current column is the first level (lastLevel) or the last level (firstLevel).

When the data is at the last level, the right button will trigger the onconfirm method, returning the selected data; when the data is not at the last level, the right button will trigger the onnext method, returning the index of the current selection.

## Return Data

The AsyncPicker component ultimately returns two items: an array of items containing the selected multi-column data, and an array of indexs containing the indices of the selected multi-column data. Please choose according to your needs.

The structure of each item in items matches the structure of the input data, making it convenient for developers to use directly.

## Usage Optimization

In actual development, AsyncPicker data is usually obtained dynamically, typically through APIs. Generally, we need to process the input data through loops to make it work with the AsyncPicker component. However, this is a cumbersome and unnecessary process. Therefore, STDF has optimized the AsyncPicker component's input parameters, allowing developers to directly pass in API response data without loop processing.

- You can dynamically bind labelKey for each data set to customize the label property name for each column's data. If not provided, it defaults to 'label'. Please refer to the examples.

## Notes

AsyncPicker is built on top of Popup by pre-defining some Popup Props. Therefore, different effects can be achieved by passing in Popup properties. For example, in the demo, the border radius style is changed by setting the popup's radius.

If you don't need to use a popup, you can set `popup` to `null`, and the AsyncPicker will be displayed directly on the page. You can set the display area height percentage with the `height` property.

The loading display in AsyncPicker during data loading is built on top of the Loading component. Different effects can be achieved by passing in Loading properties. For example, in the demo, a different loading effect is achieved by setting some loading parameters.

## Differences between Radio, ActionSheet, IndexBar, Picker, and AsyncPicker

Radio, Checkbox, ActionSheet, IndexBar, Picker, and AsyncPicker components essentially all provide a series of data for users to select or perform operations, but there are some differences in their usage:

- Radio is generally used for single-selection data with fixed and fewer options, requiring direct display of options in the UI interface for users to have an overview during interaction, such as gender selection.
- Checkbox is similar to Radio in usage scenarios but allows multiple selections.
- ActionSheet is generally used when immediate actions need to be executed after selection, with fixed and fewer options, but doesn't need to display options directly in the UI interface, such as delete or modify operations.
- IndexBar is generally used for selecting single data items from very large dynamic datasets that have been categorized with indexes, typically using an entire page for display.
- Picker is generally used for selecting single or multiple data items from large or variable-length dynamic datasets, or for selecting linked data. **Whether linked or not, the data is determined when passed in.**
- AsyncPicker is generally used for selecting multiple data items where child-level data is dynamically obtained based on parent-level selections, such as when server APIs return only one level of data at a time and require additional requests based on user selections to obtain child-level data.
