## Basic Usage

Set the total countdown time in milliseconds via the `time` prop. The component will automatically start the countdown by default.

## Custom Format

Use the `format` prop to set the display format with the following placeholders:

- `DD`: Days
- `HH`: Hours (zero-padded)
- `mm`: Minutes (zero-padded)
- `ss`: Seconds (zero-padded)
- `SSS`: Milliseconds (3 digits)
- `SS`: Milliseconds (2 digits)
- `S`: Milliseconds (1 digit)

If the format doesn't include `DD`, the days will be automatically added to the hours.

## Millisecond Rendering

Enable millisecond rendering with the `millisecond` prop. This makes the component update at a higher frequency.

Note: Enabling millisecond rendering increases performance overhead. Use it according to your actual needs.

## Manual Control

Set `autoStart` to `false` to disable auto-start. Get the component instance via `bind:this` to manually control the countdown:

- `start()`: Start the countdown
- `pause()`: Pause the countdown
- `reset(time?)`: Reset the countdown, optionally with a new time

## Custom Style

Use the `children` Snippet to fully customize the countdown display. The Snippet receives a `TimeData` object with `days`, `hours`, `minutes`, `seconds`, and `milliseconds` properties.

## Event Callbacks

- `onfinish`: Triggered when the countdown ends
- `onchange`: Triggered on time change, with the current `TimeData` object as parameter

## Page Visibility Handling

The component uses `requestAnimationFrame` for precise timing and listens for page visibility changes. When the page goes to the background, the countdown automatically calibrates to ensure accuracy.

## CSS Injection

Use the `injClass` prop to inject CSS class names into the CountDown component for more custom styling options.
