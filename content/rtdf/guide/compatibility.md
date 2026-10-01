> RTDF 0.0.1 基于 React 18/19 和 Tailwind CSS 4。

## React

RTDF 基于 React 构建，需配合 React 18 或 React 19 使用。对于旧版浏览器，如果 React 生态本身需要 Polyfills，请根据项目目标浏览器自行补齐。

## 事件与状态绑定

RTDF 使用 React 风格事件名，例如 `onChange`、`onClick` 和 `onClose`。小写兼容别名只在部分组件中存在，例如 PullRefresh 的 `onrefresh`、`onchange`，以及 Input 的 `onkeydown`，请以对应组件 API 为准。不能将 STDF 的小写事件写法直接用于所有 RTDF 组件。

React 项目通过 Props 和回调维护组件状态，自定义内容使用 ReactNode 或组件声明的渲染函数。Svelte 的 `bind:` 和 Snippet、Vue 的 `v-model` 和 Slots 不适用于 React JSX。

## Tailwind CSS

Tailwind CSS 4 的浏览器基线为 Chrome 111 及以上、Safari 16.4 及以上、Firefox 128 及以上，详见官方[浏览器兼容性文档](https://tailwindcss.com/docs/compatibility#browser-support)。JavaScript Polyfills 不能代替 Tailwind CSS 4 所依赖的 CSS 特性。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
