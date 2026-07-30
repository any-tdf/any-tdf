## Usage Scenarios

The Switch component for mobile devices is generally used in conjunction with the Cell component. The right parameter of the Cell component supports passing Switch Props. Please refer to the Cell API for more details.

Of course, it can also be used independently.

## injClass

The injClass parameter allows you to inject CSS class names (not limited to Tailwind CSS) into the outermost element of the component, providing more customization possibilities for the component's style. Since CSS injection occurs at the end, if the outermost element already has CSS properties with the same attributes, the injClass will take precedence. This is also the reason why injClass can be used to customize the switch color.

## inside & Snippet

The inside parameter determines the content displayed inside the switch. The default value is an empty string, which displays nothing. If the string 'state' is passed, it will represent the switch state with a vertical line and a circle. If an array of two strings is passed, the first and second items will display the internal text for the off and on states respectively; it's recommended to pass a single character. If the string 'loading' is passed, it will render with a Loading icon and supports passing Loading Props. If falseChild and trueChild are passed, they will render the internal content of the switch when it's off and on respectively. Please refer to the examples.

## Special Note

When used within the Cell component, the active state of the Switch is determined by the switchActive prop of the Cell. **Please do not pass active again inside the switch.**
