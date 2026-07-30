## Usage Scenario

The Picker component is used to select one or more pieces of data from a large amount of dynamic data that may have an unspecified length. The data source for the Picker component can be static data or dynamic data.

## Incoming Data

When there is no multi-level linkage, the incoming data `datas` is an array. Each item in the array is an object, and the properties of the object reference the `PickerDatas Props`. The `data` is the data for each column, and the data for each column is an array.

When there is multi-level linkage, the incoming data structure will be completely different from non-linked structures. You need to pass in a multi-level array that the Picker component processes automatically. Refer to the example for details.

Note: When using multi-level linkage, make sure to specify the data hierarchy before passing in the data and ensure that the hierarchy of each data is the same. If any data is missing, please fill it in with empty data or other data to ensure uniformity.

## Return Data

The Picker component returns two sets of data. One is an array of selected data from multiple columns, and the other is an array of indexes of the selected data from multiple columns. Please select the data sets to use according to your needs.

Each item in `items` has the same data structure as in the input data, which is also convenient for developers to use directly.

## Usage Optimization

In actual development, the data used for the Picker is usually obtained dynamically, often through an interface. Usually, we need to loop through the incoming data to enable the Picker component to function properly. However, this is a cumbersome and unnecessary process. Therefore, some optimization has been made to the input parameters of the Picker component to enable developers to directly pass in the data returned by the interface without undergoing a looping process.

When there is no multi-level linkage:

- You can customize the `label` property name for the column data passed in through the `PickerDatas Props` with `labelKey`. If not passed in, it defaults to `'label'`. See the example for details.

When there is multi-level linkage:

- You can customize each level's `label` property name with `linkageLabelKeys`. If not passed in, it defaults to `'label'`. See the example for details.
- You can customize the `children` property name for the upper and lower level data with `linkageChildrenKey`. If not passed in, it defaults to `'children'`. See the example for details.

## Special Instructions

When using multi-level linkage, make sure to specify the data hierarchy before passing in the data. The lengths of `linkageInitIndexs`, `linkageShowRows`, `linkageFlexs`, `linkageAligns`, and `linkageLabelKeys` must be the same as the data hierarchy.

## Description

The Picker selector is based on Popup and encapsulated by predefining some Popup Props, so different effects can be achieved by passing in Popup attributes. For example, changing the rounded corner style by setting the `radius` of `popup`.

If you don't need to use a popup, you can set `popup` to `null`, and the Picker will be displayed directly on the page. You can set the display area height percentage with the `height` property.

## Differences Between Radio, ActionSheet, IndexBar, Picker, and AsyncPicker

Radio, Checkbox, ActionSheet, IndexBar, Picker, and AsyncPicker components are essentially used to provide a series of data for users to choose from or to perform certain operations. However, there are some differences in usage:

- Radio is generally used for single-choice data. The amount of data is fixed and relatively small, and options need to be displayed directly in the UI interface to facilitate the user to have an overview of the options during UI interaction, for example, gender selection.
- Checkbox has a similar usage scenario to radio, but allows multiple selections.
- ActionSheet is generally used for immediate execution of certain operations after selection. The options are fixed and relatively small, but do not need to be displayed directly in the UI interface, for example, performing some delete or modification operations.
- IndexBar is generally used to select a single piece of data from a large amount of dynamic data that has already been categorized and indexed, and a whole page is usually used for display.
- Picker is generally used to select one or more pieces of data from dynamic data with a larger quantity or an undefined length, or for the selection of some linked data. The data is determined when it is passed in, regardless of whether there is linkage or not.
- AsyncPicker is generally used to select multiple pieces of data. The next-level data is obtained dynamically based on the upper-level data. For example, the server interface only returns one level of data at a time, and it is necessary to request the interface again to obtain the next-level data based on the upper-level data selected by the user.
