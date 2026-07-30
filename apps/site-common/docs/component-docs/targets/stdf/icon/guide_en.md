> Starting from v1.1.0, STDF supports using icons via [Iconify](https://iconify.design).

## Usage

Refer to [Icon](https://stdf.dev/guide/icon).

## Icon Names

When a Snippet is passed, it indicates that the icon internally uses the passed element for rendering. Other strings like 'ri-home-line' use the corresponding SVG icon in symbol.svg for rendering. When using iconify, the name follows Iconify's icon naming convention, such as 'solar--cat-broken'.

## Icon Colors

Through the `state` property, you can set the icon's state color, supporting five states: `theme` (theme color), `success`, `warning`, `error`, and `info`. If `state` is not passed, the icon color will inherit from the parent text color. To implement custom colors, you can use `iconify-color`, or use CSS injection or Snippet rendering, configuring light and dark modes separately in injClass or Snippet. Please refer to the examples.

## Icon Size

The default icon size is 24px. When width or height is passed, the icon will set the width and height according to the passed value. Otherwise, the width and height are set using the size property, i.e., the `size` property has lower priority than `width` and `height`.

## Color Priority

Color priority: Snippet > injClass > state > default.

## Offset

European and West Asian typography has a baseline, while East Asian text does not have a baseline. Refer to [MDN](https://developer.mozilla.org/en-US/docs/Glossary/baseline). However, due to differences in various systems and fonts, icons and text may not align vertically when arranged together. This can be fine-tuned through offset. Or some icons may need offset during layout to maintain visual balance due to differences in visual center of gravity.

## CSS Injection

Through the injClass parameter, you can inject CSS class names (not limited to Tailwind CSS) into the outer element inside the component, which provides more customization possibilities for component styles. Since CSS injection happens last, if the outermost element already has CSS properties of the same type, injClass will take precedence, which is also why custom icon colors can be implemented through injClass.

## Snippet

You can place any element (even the Icon component itself), mainly used for custom icons or custom icon colors, such as placing custom SVG into the Icon component. Please note the relationship between SVG's viewBox, height, width and the display property. At this point, the icon content depends on the passed element, and parameters like name, size, state in Props will all become ineffective. Using Snippet provides more customization possibilities for component content.

## Global Icon SVG Path Injection

STDF Icon component uses SVG file path configuration, suitable for one-time global SVG symbol path configuration, or when the application is deployed on a server non-root path. Generally configured in the application entry such as `App.svelte` or `+layout.svelte` using Context, for example:

```svelte
<!-- App.svelte/+layout.svelte -->
<script>
	import { setContext } from 'svelte'; // Import setContext

	setContext('STDF-global-icon-svg-path', 'webapps/svelte_demo/fonts/symbol.svg'); // Set svg file path
</script>
```
