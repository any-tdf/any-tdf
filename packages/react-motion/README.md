# @any-tdf/react-motion

`@any-tdf/react-motion` is an independent React animation package inspired by Svelte animation APIs. It keeps familiar function names, parameter names, and runtime behavior while exposing React components and hooks.

## Install

```bash
bun add @any-tdf/react-motion
```

The React bindings work in React applications. The easing, transition, animate, and imperative motion modules can also be imported without mounting a React component.

## Usage

### Easing

```tsx
import { cubicOut } from '@any-tdf/react-motion/easing';

const easing = cubicOut;
```

### Transition

```tsx
import { Transition } from '@any-tdf/react-motion/react';

export const Panel = ({ open }: { open: boolean }) => (
	<Transition visible={open} transition="fly" params={{ y: 24, duration: 300 }}>
		<div>Content</div>
	</Transition>
);
```

### Motion

```tsx
import { useTween } from '@any-tdf/react-motion/motion';

export const Progress = ({ value }: { value: number }) => {
	const { current } = useTween(value, { duration: 400 });

	return <progress value={current} max={100} />;
};
```

## API

| Module     | Import                             | Includes                                                                                |
| ---------- | ---------------------------------- | --------------------------------------------------------------------------------------- |
| Easing     | `@any-tdf/react-motion/easing`     | 31 Svelte easing functions                                                              |
| Transition | `@any-tdf/react-motion/transition` | `blur`, `crossfade`, `draw`, `fade`, `fly`, `scale`, `slide`                            |
| Animate    | `@any-tdf/react-motion/animate`    | `flip`, `FlipGroup`, `useFlipList`                                                      |
| Motion     | `@any-tdf/react-motion/motion`     | `Spring`, `Tween`, `spring`, `tweened`, `useSpring`, `useTween`, `prefersReducedMotion` |
| React      | `@any-tdf/react-motion/react`      | `Transition`, `useTransition`                                                           |

See the [API compatibility notes](https://github.com/any-tdf/any-tdf/blob/main/packages/react-motion/API_COMPATIBILITY.md) for the complete alignment details.

## Documentation Site

The bilingual documentation site lives in `packages/react-motion/docs` and includes a Svelte Playground-style Easing Visualiser demo.

```bash
bun run --filter @any-tdf/react-motion-site dev
```

## Development

```bash
bun test
bun run build
bun run --filter @any-tdf/react-motion-site build
```

The documentation site is not included in the npm package.

## Links

- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/react-motion)
- [Issues](https://github.com/any-tdf/any-tdf/issues)
- [RTDF](https://rtdf.dev)

## License

`@any-tdf/react-motion` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
