## Use Cases

Alert component displays card-style popup notifications, suitable for scenarios requiring richer content presentation, such as operation feedback and system notifications.

## Design Philosophy and Use Case Differences

In STDF, Toast, Alert, Modal, and Dialog all provide user feedback, but they emphasize different interaction levels.

- **Toast**: Lightweight, non-blocking, focused on short status feedback for quick actions.
- **Alert**: Card-style notification emphasizing content readability, suitable for richer notices with title, icon, or actions.
- **Modal**: Strong awareness with minimal interaction, often a single confirm or acknowledgment.
- **Dialog**: Strong awareness with decision-making, usually primary/secondary actions for confirmations or risky flows.

## Alert Types

Set different alert types via `type` property:

- `'success'`: Success alert with green icon
- `'error'`: Error alert with red icon
- `'warning'`: Warning alert with orange icon
- `'info'`: Info alert with blue icon
- `null`: No type, no default icon displayed

## Display Position

By default slides in from the top. Set `position` to `'bottom'` to slide in from the bottom. Adjust distance from top/bottom via `py` property.

## Auto Close

Automatically closes after 3 seconds by default. Adjust display duration via `duration` property. Set to `0` to disable auto close and require manual closing.

## Transition Animation

Set transition animation via `transitionType` property, supports all [svelte/transition](https://svelte.dev/docs/svelte/svelte-transition) functions applicable to regular DOM elements:

- `'fly'`: Fly-in animation (default), slides in from top/bottom
- `'scale'`: Scale animation
- `'fade'`: Fade-in animation
- `'slide'`: Slide animation
- `'blur'`: Blur animation
- `null`: No animation

## Animation Parameters

Set animation parameters via `transitionParams` property, where `duration` represents the enter animation duration (default 300ms).

For supported parameters in transitionParams, please refer to [svelte/transition](https://svelte.dev/docs/svelte/svelte-transition).

For example, you can customize the Y value for fly animation:

```svelte
<Alert transitionType="fly" transitionParams={{ y: 200, delay: 100 }} />
```

For better user experience, the alert appears with a short animation (default 300ms) to catch user attention. You can set the exit animation duration via `outDuration` property (default 300ms).

Exit animation only allows setting the duration. Other parameters will inherit from the enter animation to ensure the animation effect "goes back to where it came from".

## Easing Functions

Set the easing function for enter animation via `easeType` property, and `easeOutType` for exit animation. Supports all [svelte/easing](https://svelte.dev/docs/svelte/svelte-easing) easing functions:

- `'linear'`: Linear
- `'cubicOut'`: Cubic ease-out (default)
- `'bounceOut'`: Bounce ease-out
- `'elasticOut'`: Elastic ease-out
- `'backOut'`: Back ease-out
- For more easing functions, refer to svelte/easing documentation

For example, using elastic easing effect:

```svelte
<Alert easeType="elasticOut" easeOutType="elasticOut" />
```

## Custom Card Style

Pass Card component configuration via `card` property to customize shadow, radius, border, and other styles.

## Custom Content

Use `children` Snippet to fully customize alert content for more complex interactions.

## Click-through

Click-through is enabled by default (`clickable` is `true`), meaning content below can be clicked while the alert is displayed. Set to `false` to prevent click-through.

## injClass

Inject CSS class names to the component's outer container via `injClass` parameter.

If the injected class doesn't take effect, add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
