## Form Props

| Name           | Type                                                          | Default | Required | Description                                                         |
| -------------- | ------------------------------------------------------------- | ------- | -------- | ------------------------------------------------------------------- |
| form           | `FormItemProps[]`                                             | -       | Y        | Form configuration array.                                           |
| submitText     | `string`                                                      | -       | N        | Submit button text.                                                 |
| submitButton   | [`ButtonProps`](https://stdf.dev/components?nav=button&tab=1) | -       | N        | Submit button configuration.                                        |
| resetText      | `string`\|`null`                                              | `null`  | N        | Reset button text, pass null to hide.                               |
| resetButton    | [`ButtonProps`](https://stdf.dev/components?nav=button&tab=1) | -       | N        | Reset button configuration.                                         |
| submitChildren | `Snippet`                                                     | -       | N        | Custom submit button content.                                       |
| resetChildren  | `Snippet`                                                     | -       | N        | Custom reset button content.                                        |
| space          | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'`                                | `'0'`   | N        | Vertical spacing between form items.                                |
| card           | [`CardProps`](https://stdf.dev/components?nav=card&tab=1)     | -       | N        | Card configuration, uses Card component to wrap form when provided. |
| onchange       | `(data: Record<string, FormValueProps>) => void`              | -       | N        | Triggered when any form item value changes.                         |
| onsubmit       | `(data: Record<string, FormValueProps>) => void`              | -       | N        | Triggered when form is submitted.                                   |
| onreset        | `() => void`                                                  | -       | N        | Triggered when form is reset.                                       |

## Form Events

| Name     | Type                                             | Parameters                              | Description                                 |
| -------- | ------------------------------------------------ | --------------------------------------- | ------------------------------------------- |
| onchange | `(data: Record<string, FormValueProps>) => void` | data - current values of all form items | Triggered when any form item value changes. |
| onsubmit | `(data: Record<string, FormValueProps>) => void` | data - current values of all form items | Triggered when form is submitted.           |
| onreset  | `() => void`                                     | -                                       | Triggered when form is reset.               |

## Form Snippets

| Name           | Type                                                                | Parameters | Description                   |
| -------------- | ------------------------------------------------------------------- | ---------- | ----------------------------- |
| submitChildren | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Custom submit button content. |
| resetChildren  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -          | Custom reset button content.  |

## FormItemProps

Common configuration for form items:

| Name      | Type      | Description       |
| --------- | --------- | ----------------- |
| type      | `string`  | Form item type.   |
| name      | `string`  | Form item name.   |
| label     | `string`  | Form item label.  |
| required  | `boolean` | Whether required. |
| initValue | `any`     | Initial value.    |

Supported form item types and configurations:

### input

Text input.

| Name  | Type      | Description             |
| ----- | --------- | ----------------------- |
| type  | `'input'` | Type identifier.        |
| input | `object`  | Input component config. |

### numKeyboard

Number keyboard.

| Name        | Type            | Description                   |
| ----------- | --------------- | ----------------------------- |
| type        | `'numKeyboard'` | Type identifier.              |
| numKeyboard | `object`        | NumKeyboard component config. |
| input       | `object`        | Input component config.       |

### fullKeyboard

Full keyboard.

| Name         | Type             | Description                    |
| ------------ | ---------------- | ------------------------------ |
| type         | `'fullKeyboard'` | Type identifier.               |
| fullKeyboard | `object`         | FullKeyboard component config. |
| input        | `object`         | Input component config.        |

### timePicker

Time picker.

| Name       | Type           | Description                  |
| ---------- | -------------- | ---------------------------- |
| type       | `'timePicker'` | Type identifier.             |
| timePicker | `object`       | TimePicker component config. |
| input      | `object`       | Input component config.      |

### actionSheet

Action sheet.

| Name        | Type            | Description                   |
| ----------- | --------------- | ----------------------------- |
| type        | `'actionSheet'` | Type identifier.              |
| actionSheet | `object`        | ActionSheet component config. |
| input       | `object`        | Input component config.       |

### calendar

Date picker.

| Name     | Type         | Description                |
| -------- | ------------ | -------------------------- |
| type     | `'calendar'` | Type identifier.           |
| calendar | `object`     | Calendar component config. |
| input    | `object`     | Input component config.    |

### picker

Picker.

| Name   | Type       | Description              |
| ------ | ---------- | ------------------------ |
| type   | `'picker'` | Type identifier.         |
| picker | `object`   | Picker component config. |
| input  | `object`   | Input component config.  |

When Picker uses multiple mode, Form returns FormPickerValue with multipleSelected as the selected items list.

### colorPicker

Color picker.

| Name        | Type            | Description                   |
| ----------- | --------------- | ----------------------------- |
| type        | `'colorPicker'` | Type identifier.              |
| colorPicker | `object`        | ColorPicker component config. |
| input       | `object`        | Input component config.       |

### checkbox

Checkbox group.

| Name     | Type         | Description                |
| -------- | ------------ | -------------------------- |
| type     | `'checkbox'` | Type identifier.           |
| checkbox | `object`     | Checkbox component config. |

### radio

Radio group.

| Name  | Type      | Description             |
| ----- | --------- | ----------------------- |
| type  | `'radio'` | Type identifier.        |
| radio | `object`  | Radio component config. |

### slider

Slider.

| Name   | Type       | Description              |
| ------ | ---------- | ------------------------ |
| type   | `'slider'` | Type identifier.         |
| slider | `object`   | Slider component config. |

### switch

Switch.

| Name   | Type       | Description              |
| ------ | ---------- | ------------------------ |
| type   | `'switch'` | Type identifier.         |
| switch | `object`   | Switch component config. |

### stepper

Stepper.

| Name    | Type        | Description               |
| ------- | ----------- | ------------------------- |
| type    | `'stepper'` | Type identifier.          |
| stepper | `object`    | Stepper component config. |

## FormValueProps

Form value type is `Record<string, FormValueProps>`, where FormValueProps is a union type of all form item values:

| Form Item Type | Value Type             |
| -------------- | ---------------------- |
| input          | `string`               |
| numKeyboard    | `string`               |
| fullKeyboard   | `string`               |
| timePicker     | `FormTimePickerValue`  |
| actionSheet    | `FormActionSheetValue` |
| calendar       | `FormCalendarValue`    |
| picker         | `FormPickerValue`      |
| colorPicker    | `FormColorPickerValue` |
| checkbox       | `string[]`             |
| radio          | `string`               |
| slider         | `FormSliderValue`      |
| switch         | `boolean`              |
| stepper        | `number`               |
