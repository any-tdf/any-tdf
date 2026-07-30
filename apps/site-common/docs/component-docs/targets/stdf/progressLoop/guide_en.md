## Progress loop size and width

The size of the progress loop, ProgressLoop, is determined by the width of the outer container. The component uses an SVG rendering with a canvas size of 24\*24, which fills the parent container. The width, strokeWidth, theoretically supports any value between 0 to 12, but when the width is too large, the circular ring may not be aesthetically pleasing.

## Snippet

When children is passed in, the percentage content no longer uses the default percentage text, but uses the passed children to render.

## CSS injection

The injClass and trackInjClass parameters can be used to inject CSS names (not limited to Tailwind CSS) into the activating progress ring and track ring elements inside the component. This will provide more possibilities for customizing the component style. In the example, custom progress loop colors are achieved using injClass and trackInjClass.

If the injected class is not effective, add "!" before the class name. For the reference, please see the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
