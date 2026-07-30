## Design Philosophy and Use Case Differences

In RTDF, Toast, Alert, Modal, and Dialog all provide user feedback, but they emphasize different interaction levels.

- **Toast**: Lightweight, non-blocking, focused on short status feedback for quick actions.
- **Alert**: Card-style notification emphasizing content readability, suitable for richer notices with title, icon, or actions.
- **Modal**: Strong awareness with minimal interaction, often a single confirm or acknowledgment.
- **Dialog**: Strong awareness with decision-making, usually primary/secondary actions for confirmations or risky flows.

## Display Position

By default, the toast appears in the center of the screen. You can also set its position using the `position` prop. When position is set to `top` or `bottom`, you can use the `py` prop to set the distance from the top or bottom.

## Animation

Toast uses `scale` animation by default. You can set other animation types through the `transitionType` prop and configure animation parameters via `transitionParams`, where `duration` represents the entry animation time.

transitionParams supports parameters aligned with the transition type, such as `duration`, `delay`, `x`, `y`, `opacity`, `start`, and `amount`, depending on the component implementation.

For better user experience, the toast appears with a short animation (default 300ms) to catch user attention. Since toast messages generally need to close quickly after display, the exit animation is 0ms by default. However, you can set the exit animation duration using the `outDuration` prop.

The exit animation only allows setting the duration, while other parameters inherit from the entry animation to ensure the animation effect "returns where it came from".

## Easing Functions

Set the easing function for enter animation via `easeType` property, and `easeOutType` for exit animation. Supports the RTDF easing list:

- `'linear'`: Linear
- `'cubicOut'`: Cubic ease-out (default)
- `'bounceOut'`: Bounce ease-out
- `'elasticOut'`: Elastic ease-out
- `'backOut'`: Back ease-out
- For more easing functions, refer to the list below

For example, using elastic easing effect:

```tsx
<Toast easeType="elasticOut" />
```

## Display Duration

The default display duration is 2000ms, which can be customized using the `duration` prop. When `duration` is 0, the toast won't close automatically.

Note: Since there is an entry animation duration (default 300ms or custom value), `duration` cannot be less than the entry animation duration, otherwise the toast would close before fully appearing 😭.

## type

Toast internally sets corresponding icons for four types: `'success'|'error'|'warning'|'info'` through the `type` prop, and the icon color follows the functional color in the [Color System](/guide/color). You can also pass `'loading'` and `'icon'` to customize display content with loading and icon components, or pass `null` to display no icon. Please refer to examples.

## ReactNode

By default, Toast can accept any content as the prompt message through the `children` prop.

## Optimization

Since mobile Safari, Chrome, and some other browsers dynamically show/hide toolbars or address bars when scrolling (unnecessarily), causing page height to change dynamically, Toast has been optimized for this situation. When dynamicFixed is true, the page height updates dynamically while scrolling, and correspondingly, Toast's internal elements' positions relative to the page update dynamically.

Of course, this scroll monitoring causes slight performance overhead. If your project doesn't need this feature (e.g., when used in a controlled webview), you can disable it by setting dynamicFixed to false.
