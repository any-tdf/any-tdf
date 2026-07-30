## Snippet

When children is passed in, the percentage content will no longer use the default percentage text, but will render using the passed in children.

## overflowPercent

When percentPosition is set to `'inner'` and the percentage value is low, the percentage text may overflow. overflowPercent is the overflow threshold - when the percentage is less than this value, the percentage text will be placed on the right side of the progress bar.

## CSS Injection

The injClass and trackInjClass parameters can be used to inject CSS class names (not limited to Tailwind CSS) into the active progress bar and track bar elements inside the component. This provides more customization possibilities for component styling. The example demonstrates customizing progress bar colors through injClass and trackInjClass.

If the injected class is not taking effect, try adding "!" before the class name. See [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier) for reference.
