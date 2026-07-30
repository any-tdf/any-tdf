## Description

The FullKeyboard component is a full-featured virtual keyboard that supports letter, number, and symbol input. It uses a QWERTY layout and is suitable for scenarios requiring complete text input.

## Keyboard Style

Set the keyboard style via `type`:

- `button` (default): Button style with shadow, border radius, and spacing
- `block`: Block style without shadow, no radius, compact layout

## Keyboard Mode

Set the keyboard mode via `mode`:

- `letter`: Letters only
- `letterNumber`: Letters + Numbers
- `full` (default): Letters + Numbers + Symbols, switchable

## Keys

The FullKeyboard component contains the following types of keys:

- **Letter keys**: a-z, 26 letters arranged in QWERTY layout
- **Number keys**: 0-9, displayed in `letterNumber` and `full` modes
- **Symbol keys**: Displayed by switching via the 123 button in `full` mode
- **Shift key**: Toggles uppercase/lowercase, background highlights when active
- **Delete key**: Deletes the last input character
- **Space key**: Inputs a space
- **Done key**: Confirms input and closes the keyboard
- **Close key**: Only closes the keyboard without triggering the done event
- **123/ABC toggle key**: Switches between letter and number/symbol layouts in `full` mode

## doneDisabled

When `doneDisabled` is set to `true`, the done button will be disabled. In this case, the done button text will become semi-transparent and cannot be clicked. This can be used to dynamically control the business flow based on input content, such as validating whether the input length meets requirements.

## Keyboard Height

When using the keyboard on mobile devices, it is important to consider the height of the keyboard as it may cover areas on the page where input content needs to be displayed. The FullKeyboard component automatically calculates the keyboard height when it opens and dispatches it through the `onOpen` event. Developers can use this value to handle the keyboard covering issue.

The keyboard height dynamically changes based on `mode` and `preview` parameters:

- `letter` mode has a lower base height
- `letterNumber` and `full` modes have increased height due to the additional number row
- Enabling `preview` adds the preview area height

## CSS Injection

CSS class names (not limited to Tailwind CSS) can be injected into three parts of FullKeyboard through `injClass` related parameters, allowing for more customization possibilities:

- `panelClass`: Injected to affect the keyboard panel
- `keyClass`: Injected to affect all keys
- `doneClass`: Injected to affect the done key

If the injected class does not take effect, please prepend "!" to the class name being injected. You can refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier) for more information.

## preview

When `preview` is set to `true`, an input preview area will be displayed at the top of the keyboard, showing the current input content in real-time. This is very useful for scenarios where you need to confirm the input content. `previewMask` can display the preview content as dot masks, suitable for password input scenarios.

## popup

FullKeyboard is built on top of the Popup component with predefined Popup Props. Different effects can be achieved by passing in Popup properties. For example, you can change the transition animation and background transparency by setting `popup`.

If you don't need to use a popup, you can set `popup` to `null`, and the FullKeyboard will be displayed directly on the page without appearing as a popup.
