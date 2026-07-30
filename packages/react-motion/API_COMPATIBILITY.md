# React Motion 与 Svelte API 兼容说明

`@any-tdf/react-motion` 参考 Svelte 5.56.3 的 `svelte/easing`、`svelte/transition`、`svelte/animate` 和 `svelte/motion`。核心目标是保持同名函数、同名参数和相近的动画行为，同时提供适合 React 的 Hook 和组件用法。

## 已实现 API

| Svelte 模块         | 已实现 API                                                                                                                                                                                                                                                                                                                                                                           | React Motion 入口                  |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ---------------------------------- |
| `svelte/easing`     | `backIn`、`backInOut`、`backOut`、`bounceIn`、`bounceInOut`、`bounceOut`、`circIn`、`circInOut`、`circOut`、`cubicIn`、`cubicInOut`、`cubicOut`、`elasticIn`、`elasticInOut`、`elasticOut`、`expoIn`、`expoInOut`、`expoOut`、`linear`、`quadIn`、`quadInOut`、`quadOut`、`quartIn`、`quartInOut`、`quartOut`、`quintIn`、`quintInOut`、`quintOut`、`sineIn`、`sineInOut`、`sineOut` | `@any-tdf/react-motion/easing`     |
| `svelte/transition` | `blur`、`crossfade`、`draw`、`fade`、`fly`、`scale`、`slide`                                                                                                                                                                                                                                                                                                                         | `@any-tdf/react-motion/transition` |
| `svelte/animate`    | `flip`                                                                                                                                                                                                                                                                                                                                                                               | `@any-tdf/react-motion/animate`    |
| `svelte/motion`     | `Spring`、`Tween`、`spring`、`tweened`、`prefersReducedMotion`                                                                                                                                                                                                                                                                                                                       | `@any-tdf/react-motion/motion`     |

## 使用方式差异

- Svelte 使用 `transition:`、`in:`、`out:` 和 `animate:` 指令。React Motion 使用 `Transition` 组件、`useTransition` Hook、`FlipGroup` 组件和 `useFlipList` Hook。
- `transition` 函数的参数名沿用 Svelte，例如 `fly` 支持 `delay`、`duration`、`easing`、`x`、`y` 和 `opacity`。
- `Transition` 支持 HTML 和 SVG 元素，`draw` 可以用于支持 `getTotalLength()` 的 SVG 节点，例如 `path` 和 `polyline`。
- Svelte 的 transition 在编译器里管理 DOM 插入和移除。React Motion 通过 `visible`、`shouldRender` 和 `status` 管理进入、退出与卸载。
- Svelte 的 deferred transition 可以直接通过 `crossfade` 与 `send` / `receive` 配对。React 中需要在 ref 回调或组件逻辑中调用 `send(node, params)()` 和 `receive(node, params)()`。

## Motion 边界

- `Spring` 和 `Tween` 保留 `current`、`target`、`set()` 和静态 `of()`。在 React 中，推荐优先使用 `useSpring` 和 `useTween`，因为它们会触发组件重新渲染。
- `Spring.of()` 和 `Tween.of()` 在 Svelte 中绑定到 effect root。React Motion 中它们只会读取创建时的返回值，不会自动订阅 React 状态；需要响应 React 状态变化时，请使用 `useSpring(target, options)` 或 `useTween(target, options)`。
- 旧 store 风格的 `spring()` 和 `tweened()` 保留 `subscribe()`、`set()` 和 `update()`，用于兼容 Svelte store 用法或非 React 场景。`spring()` 遵循 Svelte 旧 store 语义：`hard` 和 `soft` 生效，`instant` 和 `preserveMomentum` 不影响旧 store。
- `Spring` class 遵循 Svelte 5 class 语义：`instant` 和 `preserveMomentum` 生效，`hard` 和 `soft` 是旧 store 选项，不会让 class 立即完成。
- `tweened()` 在初始值为 `undefined` 或 `null` 时会像 Svelte 一样立即设置第一个目标值，避免从空值执行插值。
- `prefersReducedMotion` 暴露 `current` 和 `subscribe()`；React 中可使用 `usePrefersReducedMotion()`。

## 验证范围

- Easing Visualiser demo 对照 `https://svelte.dev/playground/easing?version=5.56.3` 的官方示例源码：保留 `sine`、`quad`、`cubic`、`quart`、`quint`、`expo`、`circ`、`back`、`elastic`、`bounce` 十组 easing，保留 `Ease In`、`Ease Out`、`Ease In Out` 三种类型，曲线采样为 `0..1000`，横纵跟踪线、marker 路径、曲线默认 morph 时长和播放逻辑与官方示例对齐。
- Demo 颜色使用 React 官方主题色，而不是 Svelte 官方橙色，这是站点品牌层面的差异。
- `bun test` 锁定 easing 名称、transition 参数、`crossfade` fallback 行为、`flip` 参数、motion 参数、旧 store / 新 class 选项边界和基础插值行为。
- `bun run build` 验证包类型和产物。
- `bun run docs:build` 验证包内双语文档站和交互 demo 能通过真实 React 和 Vite 构建。
