## Usage scenarios

The Stepper component is generally used in scenarios where data needs to be incrementally increased or decreased, such as selecting the quantity of goods, adding or subtracting points, progress bars, etc. If there are significant adjustments to the data volume, it is recommended to use the NumKeyboard or Input components.

## Async State

The Stepper component supports asynchronous state, generally used to display the Stepper's value more reasonably during interactions with the server. It can be enabled by setting the async property. At this time, you can use the asyncLoading property to set whether to display the Loading state internally. Of course, you can also freely set the display position and method of Loading. Please refer to the example.

To prevent accidental user touches during the asynchronous state, the increase and decrease buttons will be automatically disabled until the asynchronous state ends.

## Fixed Width

The width parameter can be used to set the fixed width of the number area, optimizing the visual discomfort caused by the change in the width of the number area when the number changes. It is recommended that this fixed value be the maximum width that the number may cause.

## CSS Injection

The injClass parameter allows you to inject CSS class names (not limited to Tailwind CSS) into different parts of the component: the outer container, the increase/decrease buttons, and the number area. This provides more possibilities for customizing the component's style. In the example, custom styles for different positions are implemented through injection.

If the injected class doesn't take effect, try adding "!" before the class name. You can refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier) for more information.
