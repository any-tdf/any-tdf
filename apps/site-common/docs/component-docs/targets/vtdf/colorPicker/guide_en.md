## Use Cases

ColorPicker is used for selecting colors, supporting OKLCH, RGB, and HEX color modes. It's suitable for theme customization, color configuration, and similar scenarios.

## Color Modes

ColorPicker supports three color modes:

- **OKLCH**: A modern color space based on human perception, providing more uniform color transitions and a larger color gamut.
- **RGB**: Traditional red-green-blue color mode, the most familiar color representation for developers.
- **HEX**: Hexadecimal color representation, commonly used in CSS styles.

Use the `modes` property to configure supported modes. The first mode in the array is the initial display mode.

## Initial Color

ColorPicker supports three formats for initial color values:

```javascript
// OKLCH format
value = { l: 0.7, c: 0.15, h: 250 };

// RGB format
value = [255, 100, 50];

// HEX format
value = '#FF6432';
```

The initial value format should match `modes[0]` to ensure type consistency.

If no initial color is provided, ColorPicker will automatically use the current theme color as default:

- Light mode: Uses `--color-primary` theme color
- Dark mode: Uses `--color-dark` theme color

## Display Modes

ColorPicker supports two display modes:

### Popup Mode (Default)

Control visibility with the `visible` property. The color picker displays as a popup. Use the `@close` event to receive the selected color when closed.

```vue
<script setup lang="ts">
import { ref } from 'vue';

const visible = ref(false);

const handleClose = (colors: string[]) => {
	console.log(colors);
	visible.value = false;
};
</script>

<template>
	<ColorPicker v-model:visible="visible" @close="handleClose" />
</template>
```

### Direct Display Mode

Set `popup` to `null` to embed the color picker directly in the page. Use the `@change` event to receive real-time color updates.

```vue
<script setup lang="ts">
const handleChange = (colors: string[]) => {
	console.log(colors);
};
</script>

<template>
	<ColorPicker :popup="null" @change="handleChange" />
</template>
```

## Return Data

ColorPicker returns color data as a string array containing the current color in each mode:

```javascript
colors = [
	'#FF6432', // HEX format
	'rgb(255, 100, 50)', // RGB format
	'oklch(0.700 0.150 250.0)' // OKLCH format
];
```

## Copy Feature

Color values in the preview area can be copied by clicking. A notification appears on successful copy. Use `showCopy` to control the copy feature visibility and the `@copy` event to listen for copy results.

## Custom Styling

- Use `panelHeight` and `sliderHeight` to adjust the color panel and slider heights.
- Use `radius` to set border radius size.
- Use `injClass` to inject custom CSS class names.
- Use `tab` to customize the Tab switch styling.

## Notes

In Popup mode, ColorPicker is built on top of the Popup component, so you can pass Popup configuration through the `popup` property to adjust popup styling.

For single-mode usage, set `modes` to an array containing only one mode. The mode switch Tab will not be displayed in this case.
