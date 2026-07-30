## Default style

In the practical application of mobile web, the use of large theme color buttons is relatively high, because of its prominence and brand attributes, it is very suitable for guiding users to operate. Therefore, STDF does not follow the gray border button of the mainstream component library as the default style, but uses a large theme color to fill the button, which should reduce the amount of writing code when using it. The rest of the styles are basically in accordance with Tailwind's style rules, but some options are classified and limited, and the incoming optional values ​​will be processed according to the default values.

## Fill pattern

Fill modes include:

- `base`: Solid fill button (default), background color follows state color
- `line`: Linear button (ghost button), colorless border, black/white text
- `lineLight`: Linear light button, light border
- `lineState`: Linear state button, border and text color follow state color
- `text`: Plain text button, colorless text
- `textState`: Text state button, text color follows state color
- `colorLight`: Light background button, light background + state color text

Among them, `base`, `lineState`, `textState`, and `colorLight` will change color following the `state` parameter, while `line`, `lineLight`, and `text` are colorless modes, not affected by `state`.

## Status color

The status color corresponds to the four functional colors of success, warning, error, and information of the STDF color system. Please make sure that the corresponding color values ​​have been configured in the Tailwind configuration file tailwind.config.js. Of course, you can also configure it flexibly according to your project.

## Size

The button size is full and big for block-level elements, md, sm, and xs for inline elements. When auto, the button width is determined by the width of the inner element.

## Border style

The border style will only take effect if the fill mode (fill) is `line`, `lineLight`, or `lineState`.

## CSS injection

Through the injClass parameter, you can inject CSS names (not limited to Tailwind CSS) to the button element inside the component, which will allow more customization possibilities for component styles. In the example, injClass implements custom colors.

If the injected class does not take effect, please add "!" before the injected class name, please refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## Button group

The button group feature has been extracted to the [ButtonGroup](/components?nav=buttonGroup&tab=0) component, which supports two ways of use: `items` array or `children` customization.

## With icon or loading

Through the icon parameter, you can inject an icon into the content area of the Button component, the parameter is the Props of the Icon component; through the loading parameter, you can inject a loading into the content area of the Button component, the parameter is the Props of the Loading component. When loading is passed in, the button is disabled by default, which can be controlled by the disabledLoading parameter. Please refer to the example.
