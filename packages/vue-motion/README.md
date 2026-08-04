# @any-tdf/vue-motion

`@any-tdf/vue-motion` is an independent Vue animation toolkit used by VTDF. It provides Vue bindings and framework-neutral functions modeled after Svelte easing, transition, animate, and motion APIs.

## Install

```sh
bun add @any-tdf/vue-motion vue
```

Vue is required for the Vue bindings. The easing and transition functions can be imported independently.

## Usage

```vue
<script setup lang="ts">
import { Transition } from '@any-tdf/vue-motion/vue';
</script>

<template>
	<Transition :visible="true" transition="fly" :params="{ y: 24, duration: 300 }">
		<div>Content</div>
	</Transition>
</template>
```

```ts
import { cubicOut } from '@any-tdf/vue-motion/easing';
import { spring } from '@any-tdf/vue-motion/motion';
```

## Public modules

- `@any-tdf/vue-motion/easing`: easing functions.
- `@any-tdf/vue-motion/transition`: transition functions.
- `@any-tdf/vue-motion/animate`: FLIP animation helpers.
- `@any-tdf/vue-motion/motion`: spring and tweened values.
- `@any-tdf/vue-motion/vue`: Vue components and composables.

## Development

The bilingual documentation app lives beside the package source in `packages/vue-motion/docs`.

```sh
bun run --filter @any-tdf/vue-motion check
bun run --filter @any-tdf/vue-motion test
bun run --filter @any-tdf/vue-motion build
bun run --filter @any-tdf/vue-motion-site dev
```

## Links

- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/vue-motion)
- [Issues](https://github.com/any-tdf/any-tdf/issues)
- [VTDF](https://vtdf.dev)

## License

`@any-tdf/vue-motion` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
