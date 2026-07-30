> RTDF 3.0.0-alpha.0 基于 React 18/19 与 Tailwind CSS v4。

## React

RTDF 基于 React 构建，需配合 React 18 或 React 19 使用。对于旧版浏览器，如果 React 生态本身需要 Polyfills，请根据项目目标浏览器自行补齐。

## STDF 事件别名

RTDF 推荐使用 React 风格事件名，例如 `onChange`、`onClick`、`onClose`。为了降低从 STDF 迁移到 RTDF 的成本，组件也保留了 STDF 风格的小写事件别名，例如 `onchange`、`onclick`、`onclose`。如果同一个事件同时传入两种写法，组件会同时触发它们。

## Tailwind CSS

参考 [Browser Support](https://tailwindcss.com/docs/browser-support)，RTDF 组件库内已有样式都支持现代浏览器。有问题请参考 [Can I Use](https://caniuse.com)。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
