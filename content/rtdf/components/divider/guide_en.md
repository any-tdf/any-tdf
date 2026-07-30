## Injecting CSS

As Divider uses element borders to create the line effect, the injClass passed in will only affect the corresponding properties, such as the border property affecting the line and the text property affecting the text in the horizontal divider.

## Available Options

Passing in values other than the available options will be treated as the default parameters.

## Prop Types

For some Props such as px, py, weight, mx, they are clearly numbers, why use string types? It is mainly because the optional parameters passed in to the component are used as object keys inside, so they must be strings. Besides, it should be more convenient to write '' instead of {} when passing values to the component! Of course, you can also insist on passing in numbers, but it will report an error when type checking is enabled.
