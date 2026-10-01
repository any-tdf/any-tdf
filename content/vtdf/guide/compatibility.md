> VTDF 0.0.1 基于 Vue 3.5 和 Tailwind CSS 4。

## Vue

VTDF 基于 Vue 3.5 构建，需配合 Vue 3.5 及以上版本使用。对于旧版浏览器，如果 Vue 生态本身需要 Polyfills，请根据项目目标浏览器自行补齐。

## 事件写法

模板中使用 Vue 事件监听写法，例如 `@change`、`@click` 和 `@close`，状态绑定使用对应组件声明的 `v-model` 或具名模型。使用 Vue 渲染函数时，应使用对应的 Vue 事件监听属性；请以 VTDF API 为准，避免直接照搬 React 的回调 Props。

## Tailwind CSS

Tailwind CSS 4 的浏览器基线为 Chrome 111 及以上、Safari 16.4 及以上、Firefox 128 及以上，详见官方[浏览器兼容性文档](https://tailwindcss.com/docs/compatibility#browser-support)。JavaScript Polyfills 不能代替 Tailwind CSS 4 所依赖的 CSS 特性。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
