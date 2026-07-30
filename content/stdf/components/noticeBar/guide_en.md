## Description

When placed horizontally, regardless of the number of content items, NoticeBar will automatically scroll horizontally if the total length of all content plus the spacing between them exceeds the container width. Otherwise, it will not scroll.

When placed vertically, it will automatically scroll vertically if there is more than one content item. Single content items that are too long will overflow.

## leftIcon and rightIcon

The left area (leftIcon), besides the default speaker icon, can display other icons by passing Icon Props. It can also be customized with any content through the leftChild Snippet. The right area (rightIcon) only allows three states: close, arrow, or hidden. It can also be customized through the rightChild Snippet. Please refer to the examples.

## onclickRight Event

When clicking the right area, if rightIcon is set to close, it will close the current notice bar. Whether rightIcon is set to close or arrow, it will dispatch the onclickRight event, which can be listened to implement custom business logic.

## CSS Injection

Through the injClass parameter, you can inject CSS class names (not limited to Tailwind CSS) into the component's outermost element. This provides more possibilities for custom styling. In the example, injClass is used to implement custom background and text colors.

If the injected class doesn't take effect, please add "!" before the class name. You can refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
