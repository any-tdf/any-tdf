# @any-tdf/vue-confetti

Vue 3 port of `svelte-confetti@2.3.2`.

The component renders pure HTML and CSS animation markup. It does not use canvas, timers for animation frames, or runtime physics. The goal is API and visual behavior parity with `svelte-confetti`, with `className`, Vue `class`, and Vue `style` passthrough for integration.

## Install

```sh
bun add @any-tdf/vue-confetti vue
```

Vue 3.5 or newer is required. The component is SSR-friendly and has no canvas or runtime physics dependency.

```vue
<script setup lang="ts">
import { Confetti } from '@any-tdf/vue-confetti';
</script>

<template>
	<Confetti rounded :amount="100" />
</template>
```

## Documentation

The standalone Vue documentation app lives in `apps/runtime-docs/vue-confetti` in the Any TDF Monorepo.

```sh
bun install
bun run --filter @any-tdf/vue-confetti-site dev
bun run --filter @any-tdf/vue-confetti-site build
```

The site mirrors the demo structure and API coverage from `svelte-confetti@2.3.2`, with Chinese and English content.

## Props

| Prop                      | Default       | Description                                                                            |
| ------------------------- | ------------- | -------------------------------------------------------------------------------------- |
| `size`                    | `10`          | Maximum size in pixels for each confetti piece.                                        |
| `x`                       | `[-0.5, 0.5]` | Horizontal range multiplier. `[-1, 1]` means up to `200px` left and right.             |
| `y`                       | `[0.25, 1]`   | Vertical range multiplier. Negative values move downward, positive values move upward. |
| `duration`                | `2000`        | Animation duration for each piece in milliseconds.                                     |
| `infinite`                | `false`       | Loops the animation indefinitely. Overrides `iterationCount`.                          |
| `delay`                   | `[0, 50]`     | Random delay range for each piece in milliseconds.                                     |
| `colorRange`              | `[0, 360]`    | HSL hue range used when `colorArray` is empty.                                         |
| `colorArray`              | `[]`          | CSS color values to pick from randomly. Supports gradients and image backgrounds.      |
| `amount`                  | `50`          | Number of confetti pieces. Large values can affect performance.                        |
| `iterationCount`          | `1`           | CSS `animation-iteration-count`; accepts numbers, `infinite`, `initial`, or `inherit`. |
| `fallDistance`            | `"100px"`     | CSS distance each piece falls after the burst.                                         |
| `rounded`                 | `false`       | Renders circular pieces.                                                               |
| `cone`                    | `false`       | Shapes the burst as a cone.                                                            |
| `noGravity`               | `false`       | Uses a constant-speed explosion without the falling stage.                             |
| `xSpread`                 | `0.15`        | Horizontal spread from `0` to `1`. Lower values keep peak and end X positions closer.  |
| `destroyOnComplete`       | `true`        | Removes the markup after finite animations complete on the client.                     |
| `disableForReducedMotion` | `false`       | Disables animation when `prefers-reduced-motion` is active.                            |
| `className`               | `""`          | Extra class name for the holder element.                                               |
| `style`                   | `undefined`   | Extra inline styles for the holder element.                                            |

## Notes

- The CSS trajectory, timing variables, gravity behavior, cone behavior, reduced-motion behavior, and default values are based on `svelte-confetti@2.3.2`.
- The component is SSR-friendly. Server rendering outputs the same holder and piece markup; client-side cleanup only runs after mount.
- Random piece values are generated from prop values, not array prop identities, so parent re-renders with equivalent inline ranges do not restart the burst.

## Links

- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/vue-confetti)
- [Issues](https://github.com/any-tdf/any-tdf/issues)
- [VTDF](https://vtdf.dev)

## License

`@any-tdf/vue-confetti` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
