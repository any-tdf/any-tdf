## Picker Props

| Name               | Type                                           | Default                                    | Required | Description                                                |
| ------------------ | ---------------------------------------------- | ------------------------------------------ | -------- | ---------------------------------------------------------- |
| visible            | `boolean`                                      | `false`                                    | N        | Whether to show the picker.                                |
| datas              | `PickerDatas[]\|PickerDataChild[]`             | `[]`                                       | Y        | All column data, refer to Picker datas Props.              |
| autoScrollToLast   | `boolean`                                      | `true`                                     | N        | Whether to automatically scroll to the last selected item. |
| cancelText         | `string`                                       | Current language picker.defaultCancel      | N        | Cancel button text.                                        |
| confirmText        | `string`                                       | Current language picker.defaultConfirm     | N        | Confirm button text.                                       |
| title              | `string`                                       | Current language picker.defaultTitle       | N        | Title text.                                                |
| isLinkage          | `boolean`                                      | `false`                                    | N        | Whether to enable multi-level linkage.                     |
| linkageInitIndexs  | `number[]`                                     | `[]`                                       | N        | Initial selected indexes for multi-level linkage.          |
| linkageShowRows    | `number[]`                                     | `[]`                                       | N        | Number of rows to display for each column in linkage mode. |
| linkageFlexs       | `number[]`                                     | `[]`                                       | N        | Width of each column in linkage mode.                      |
| linkageAligns      | `('left'\|'center'\|'right')[]`                | `[]`                                       | N        | Alignment of each column in linkage mode.                  |
| linkageLabelKeys   | `string[]`                                     | `[]`                                       | N        | Custom label keys for each column in linkage mode.         |
| linkageChildrenKey | `string`                                       | `'children'`                               | N        | Custom children key for parent-child data in linkage mode. |
| height             | `number`                                       | `30`                                       | N        | Height percentage of display area when not using popup.    |
| popup              | [`Popup`](/components?nav=popup&tab=1)\|`null` | `{}`                                       | N        | Popup parameters. Pass `null` to display without popup.    |
| multiple           | `boolean`                                      | `false`                                    | N        | Whether to enable multiple selection mode.                 |
| multipleIcon       | [`Icon`](/components?nav=icon&tab=1)           | `{ name: 'ri-checkbox-circle-line', ... }` | N        | Icon for unselected state in multiple mode.                |
| multipleIconActive | [`Icon`](/components?nav=icon&tab=1)           | `{ name: 'ri-checkbox-circle-fill', ... }` | N        | Icon for selected state in multiple mode.                  |
| multipleSelected   | `PickerMultipleItem[]`                         | `[]`                                       | N        | Selected items array in multiple mode (bindable).          |

## Picker Events

| Name            | Type                                                             | Parameters                                                                      | Description                                        |
| --------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------- | -------------------------------------------------- |
| close           | `() => void`                                                     |                                                                                 | Triggered when closing.                            |
| cancel          | `() => void`                                                     |                                                                                 | Triggered when clicking cancel.                    |
| confirm         | `(items: { [key: string]: string }[], indexs: number[]) => void` | items - Array of selected column data;<br />indexs - Array of selected indexes. | Triggered when clicking confirm.                   |
| multiple-change | `(selected: PickerMultipleItem[]) => void`                       | selected - Selected items array in multiple mode.                               | Triggered when selection changes in multiple mode. |

## PickerDatas Props

| Name         | Type                          | Default    | Required | Description                              |
| ------------ | ----------------------------- | ---------- | -------- | ---------------------------------------- |
| data         | `{ [key: string]: string }[]` | `[]`       | Y        | Column data.                             |
| showRow      | `3`\|`5`\|`7`                 | `5`        | N        | Number of rows to display.               |
| initIndex    | `number`                      | `0`        | N        | Initial selected index.                  |
| useAnimation | `boolean`                     | `true`     | N        | Whether to use animation when scrolling. |
| labelKey     | `string`                      | `'label'`  | N        | Custom label key.                        |
| flex         | `number`                      | `1`        | N        | Column width in multi-column mode.       |
| align        | `'left'\|'center'\|'right'`   | `'center'` | N        | Column alignment in multi-column mode.   |

## PickerDataChild Props

| Name          | Type                                   | Default   | Required | Description       |
| ------------- | -------------------------------------- | --------- | -------- | ----------------- |
| children      | `PickerDatas[]`                        | `[]`      | Y        | Child data.       |
| [key: string] | `string\|PickerDataChild[]\|undefined` | `'label'` | N        | Custom label key. |

## PickerMultipleItem

| Name   | Type                          | Description                                           |
| ------ | ----------------------------- | ----------------------------------------------------- |
| indexs | `number[]`                    | Array of selected indexes for each column.            |
| items  | `{ [key: string]: string }[]` | Array of selected item data for each column.          |
| label  | `string`                      | Display text of selected items (concatenated labels). |
