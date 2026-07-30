## value, startValue, endValue, minRange, maxRange

When passing in value, startValue, and endValue, please make sure it is between minRange and maxRange.

## step

When passing in step, please try to ensure that (maxRange - minRange) / step is an integer, and consider the accuracy of each step. The step size is too small may cause the slider unable to slide to the required value quickly, thus affecting the user experience.

## showSteps

When showSteps is enabled, step markers will be displayed on the slider track, suitable for scenarios with clear step selections. The number of steps is determined by (maxRange - minRange) / step + 1.

## stepsStyle

There are two step marker styles:

- **block**: Step markers on a continuous track, markers overlay on top of the track
- **break**: Track is broken by step markers, the track is divided into multiple separate segments

Both styles follow the radius property for border radius.

## stepLabels

By passing a stepLabels array, the Slider can display custom step labels instead of just handling numeric values. When the slider moves to a step position, the tip will show the corresponding label text instead of the numeric value.

The array length should match the number of steps, which is (maxRange - minRange) / step + 1. For example:

```svelte
<!-- Speed selector -->
<Slider step={25} showSteps stepLabels={['Very Slow', 'Slow', 'Medium', 'Fast', 'Very Fast']} />

<!-- Percentage selector -->
<Slider step={20} showSteps stepLabels={['0%', '20%', '40%', '60%', '80%', '100%']} />
```

This makes the Slider suitable for more scenarios, such as volume levels, brightness adjustment, speed selection, rating scales, etc.

## Layout

The Slider component does not set external margins, please set it yourself when laying out the page.

## Snippet

When passing in Snippet, the area representing the progress of the Slider will render using Snippet, refer to the example.
