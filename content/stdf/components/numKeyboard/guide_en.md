## Description

The NumKeyboard component is a virtual numeric keyboard used for inputting integers or decimals. It uses a grid layout, with two layout options: 3\*4 or 4\*4. If the completion key is not displayed, there will only be 3 columns; otherwise, there will be 4 columns.

## Keys

The NumKeyboard component has 5 types of keys: digits 0-9, delete, decimal point, completion, and close. Digits 0-9 and delete are required, while completion, delete, and close are optional.

The priority of optional keys is as follows: completion > decimal point > close. Therefore, if both the decimal point and close keys need to be displayed, the close button will not be shown, as the close key has a lower priority than the decimal point. If the close button needs to be forcibly shown, the display of the decimal point will need to be disabled. Please refer to the example.

## Reverse

Normally, on mobile devices, we are accustomed to the layout of the numeric keyboard being arranged from top to bottom. However, on traditional physical keyboards, the numeric keypad is arranged from bottom to top. To accommodate the usage habits of certain industries, the NumKeyboard component provides a reverse parameter. When reverse is set to true, the numeric keyboard will be arranged from bottom to top.

## doneDisabled

When doneDisabled is set to true, the completion button will be disabled. In this case, the completion button will appear grayed out and cannot be clicked. This can be used to dynamically control the business flow based on the input content.

## Key Text Size

The key text size will dynamically adjust according to the height of the key.

## Keyboard Height

When using the keyboard on a mobile device, it is important to consider the height of the keyboard. The keyboard may cover the area where input content needs to be displayed on the page. Therefore, the NumKeyboard component automatically calculates the height of the keyboard when it is opened and dispatches it through the onopen event. Developers can use this value to handle the issue of keyboard covering content.

## CSS Injection

The injClass parameter can be used to inject CSS class names (not limited to Tailwind CSS) into three parts of the NumKeyboard. This allows for more customization possibilities for the component's style. In the example, custom background color and text color are achieved through injClass.

After the panelClass is injected, it will affect the keyboard panel. After the keyClass is injected, it will affect all keys. After the doneClass is injected, it will affect the completion key.

If the injected class does not take effect, please prepend "!" to the class name being injected. You can refer to the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier) for more information.

## preview

When `preview` is set to `true`, an input preview area will be displayed at the top of the keyboard, showing the current input content in real-time. This is very useful for scenarios where you need to confirm the input content. `previewMask` can display the preview content as dot masks.

## Popup

The NumKeyboard is built on top of the Popup component. Different effects can be achieved by passing in Popup properties. For example, in the example, the transition animation and background transparency are changed by setting popup.

If you don't need to use a popup, you can set `popup` to `null`, and the NumKeyboard will be displayed directly on the page.
