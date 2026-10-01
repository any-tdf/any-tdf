> STDF 3.0.0 基于 Svelte 5 和 Tailwind CSS 4。

## Svelte

STDF 需要 Svelte 5。应用应使用满足下方 Tailwind CSS 4 基线的现代浏览器，Internet Explorer 不满足该基线。

组件事件使用 API 中声明的小写回调 Props，例如 `onclick` 和 `onchange`；状态绑定使用对应的 `bind:` 属性，自定义内容使用 Snippet。不要直接照搬 React 的事件名或 Vue 的插槽语法。

## Tailwind CSS

Tailwind CSS 4 的浏览器基线为 Chrome 111 及以上、Safari 16.4 及以上、Firefox 128 及以上，详见官方[浏览器兼容性文档](https://tailwindcss.com/docs/compatibility#browser-support)。JavaScript Polyfills 不能代替 Tailwind CSS 4 所依赖的 CSS 特性。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
