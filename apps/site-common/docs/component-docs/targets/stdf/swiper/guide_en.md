## data

The type field in the input data supports 'img' and 'component'. For 'img' type, you need to provide an image URL. For 'component' type, you need to provide a single-file component. The Swiper will render corresponding content based on the type.

## interval && duration

For convenience, note that the interval time is in seconds while the transition duration is in milliseconds. Also note that the transition duration must be less than the interval time.

## indicateStyle

This parameter configures the indicator style. When `indicateStyle` is set to `longLine`, the active indicator will show the interval progress during the Swiper's dwell time. Please refer to the examples.

## indicateInjClass

This parameter allows you to inject CSS class names (not limited to Tailwind CSS) into the indicator area. For example, you can remove the default gradient background with transparency as shown in the examples.

If the injected class doesn't take effect, add "!" before the class name. Please refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## aspectRatio && containerWidth && px && py

If containerWidth is not provided or set to 0, the Swiper will use the page width as the component area width by default. The height of this area will be calculated using containerWidth and aspectRatio.

Note that aspectRatio only determines the container's aspect ratio. The aspect ratio of the inner display area will match aspectRatio only when px and py are equal.

## Inactive Container Offset and Rotation

By setting offset values in X and Z directions and rotation angles around X, Y, and Z axes, inactive containers can be offset and rotated along corresponding axes to achieve special transition effects. Please refer to the examples.

Note that offset values are in pixels (px) while rotation angles are in degrees (deg).

## activeInjClass && notActiveInjClass

By injecting classes into active and inactive containers, you can apply different styles to containers in different states.

## radius && innerInjClass

These parameters control the border radius and class injection for the inner container area. Please refer to the examples.

## onclick Event

Click events only work when images are provided. For components, events are determined by the provided component itself.

## Swipe Events

When a finger or other touch device finishes sliding within the Swiper container, the Swiper will determine whether to trigger a switch based on the sliding distance and velocity. If triggered, it will switch to the previous or next container according to the sliding direction.

- When the sliding distance is less than a certain threshold, switching will never be triggered.
- When the sliding distance is greater than a certain threshold, switching will always be triggered.
- When the sliding distance is between these two thresholds, switching will be determined by the sliding velocity - if the velocity exceeds a certain coefficient, switching will be triggered.

The thresholds and velocity coefficient for these three scenarios can be customized through triggerLong, notTriggerLong, and triggerSpeed parameters. Both triggerLong and notTriggerLong are percentages representing the sliding distance as a percentage of container width; triggerSpeed is a decimal between 0-1 representing the velocity coefficient.

## lazyplay

When Swiper auto-plays, there are a series of transition animations. Considering device performance and animation frame rate issues when there are many simultaneous transitions on a page, Swiper enables lazy playback by default - meaning the Swiper component **will pause auto-play when not in the viewport**. Of course, you can configure this individually.

The following two images show performance monitoring comparisons in an extreme case where 30+ Swipers are playing simultaneously on the same page in a desktop browser.

- Performance monitor when lazy playback is disabled, showing 30+ sets of transitions occurring simultaneously.
  <img src="lazyplay_no.png" style="width: 100%;" alt="lazyplay_no" title="Performance monitor with lazy playback disabled">

- Performance monitor when lazy playback is enabled, showing only 3-4 sets of transitions occurring simultaneously.
  <img src="lazyplay_yes.png" style="width: 100%;" alt="lazyplay_yes" title="Performance monitor with lazy playback enabled">
