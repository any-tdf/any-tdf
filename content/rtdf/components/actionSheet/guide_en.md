## Usage

ActionSheet is a panel that pops up from the bottom of the page and provides operation actions related to the current scene. This operation generally does not carry data, so there is no need to worry about accidental touch. The cancel operation item is not displayed by default and clicking the mask can close it.
For inline popups near the trigger, use ActionPopover.

## Description

ActionSheet is encapsulated based on Popup. By predefining some Props of Popup, different effects can be achieved by passing Popup's properties. For example, in the example, the radius style is changed by setting the radius of popup.

## Actions

The actions property of ActionSheet is an array, and each item in the array is an object. The properties of the object refer to Action Props.

## Differences between Radio, ActionSheet, IndexBar, Picker, and AsyncPicker

Radio, Checkbox, ActionSheet, IndexBar, Picker, and AsyncPicker components essentially provide a series of data for users to select or perform operations, but there are some differences in their usage:

- Radio is generally used for single selection data with fixed and small amount of options that need to be displayed directly on the UI interface, making it convenient for users to have an overview of alternative data during interface interaction, such as gender selection.
- Checkbox has similar usage scenarios to Radio, but allows multiple selections.
- ActionSheet is generally used for immediate operations after selection, with fixed and few options that don't need to be displayed directly on the UI interface, such as delete or modify operations.
- IndexBar is generally used to select a single piece of data from a very large dynamic dataset that has been categorized with indexes, usually displayed on an entire page.
- Picker is generally used to select single or multiple pieces of data from large or uncertain length dynamic datasets, or for linked data selection. **Whether linked or not, the data is determined when passed in.**
- AsyncPicker is generally used to select multiple pieces of data where lower-level data is dynamically obtained based on upper-level data, such as when a server interface only returns one level of data at a time and needs to request the interface again based on the user's first-level selection to get the next level of data.
