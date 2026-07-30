## Basic Usage

The Card component is a versatile container component used to organize content within a card container with rounded corners, shadow, and border. Simply pass the content to be displayed as the default Snippet.

## Background Type

The Card component provides three background types:

- **surface**: Surface background (default), white in light mode, dark gray in dark mode
- **gray**: Gray transparent background, slightly distinguishes from the page background
- **theme**: Theme transparent background, with a subtle theme color

For more custom backgrounds, you can inject custom CSS class names through the `injClass` property.

## Preset Areas

The Card component provides three preset areas:

- **header**: Header area, typically used for displaying titles, action buttons, etc.
- **children**: Main content area, used for displaying the primary content of the card
- **footer**: Footer area, typically used for displaying action buttons, statistics, etc.

All three areas are optional and can be flexibly combined according to actual needs.

## Divider Lines

By default, divider lines are displayed between the header and body content, and between the body content and footer. You can control whether to show divider lines through the `headerLine` and `footerLine` properties.

## Radius Configuration

The `radius` property can be used to configure the border radius of the card, supporting various options from `none` (no radius) to `full` (fully rounded).

## Shadow Configuration

The `shadow` property can be used to configure the shadow effect of the card, supporting various options from `none` (no shadow) to `2xl` (extra large shadow). The shadow will automatically adjust to a suitable style in dark mode.

## Padding Configuration

- Use the `p` property to uniformly set padding for the body content area in all four directions
- Use the `px` and `py` properties to separately set horizontal and vertical padding
- When `px` or `py` is set, the `p` property will not take effect

## Border Configuration

- Use the `border` property to configure border style: `solid`, `dashed`, `dotted`
- Use the `borderWidth` property to configure border thickness
- When `border` is `none`, border-related configurations will not take effect

## Clickable Card

When an `onclick` event handler is provided, the card will render as a `button` element with clickable interaction.

## CSS Injection

The Card component provides multiple CSS injection properties to inject custom styles into different areas:

- `injClass`: Inject styles into the card container
- `headerClass`: Inject styles into the header area
- `bodyClass`: Inject styles into the body content area
- `footerClass`: Inject styles into the footer area

If the injected class name does not take effect, add a `!` before the class name, as demonstrated in the [Tailwind Important Modifier](https://tailwindcss.com/docs/configuration#important-modifier).
