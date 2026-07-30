## Overview

The Form component is used to quickly build complete form pages, supporting various form item types. Configure the `form` array to define form items.

## Supported Form Item Types

The Form component supports the following 13 form item types:

1. **input** - Text input
2. **numKeyboard** - Number keyboard
3. **fullKeyboard** - Full keyboard
4. **timePicker** - Time picker
5. **actionSheet** - Action sheet
6. **calendar** - Date picker
7. **picker** - Picker
8. **colorPicker** - Color picker
9. **checkbox** - Checkbox group
10. **radio** - Radio group
11. **slider** - Slider
12. **switch** - Switch
13. **stepper** - Stepper

## Card Layout

- **radius**: Border radius size
- **shadow**: Shadow effect
- **mx**、**px**: Margins
- **space**: Spacing between form items

## Button Configuration

- **submitText** / **resetText**: Custom button text
- **submitButton** / **resetButton**: Custom button styles
- **submitChildren** / **resetChildren**: Custom button content
- **resetText={null}**: Hide reset button

## Events

- **onchange**: Triggered when form item value changes
- **onsubmit**: Triggered on submit
- **onreset**: Triggered on reset

## Notes

1. **name Uniqueness**: Each form item's `name` must be unique
2. **Required Flag**: `required: true` displays a red asterisk, but the component does not include validation logic
3. **Initial Value**: `initValue` must match the correct type for each form item
4. **Sub-component Configuration**: Sub-components can be customized through configuration objects like `input`, `picker`, etc.
5. **Return Value Types**: Different form items return different types of data
6. **Multi Selection Display**: When Calendar uses multiple mode or Picker uses multiple mode, Form shows selected values as Tag style chips and supports removing them
