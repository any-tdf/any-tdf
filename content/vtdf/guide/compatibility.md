> VTDF 0.0.1-alpha.0 基于 Vue 3.5 与 Tailwind CSS v4。

## Vue

VTDF 基于 Vue 3.5 构建，需配合 Vue 3.5 及以上版本使用。对于旧版浏览器，如果 Vue 生态本身需要 Polyfills，请根据项目目标浏览器自行补齐。

## 事件写法

VTDF 只支持 Vue 官方事件监听写法。模板中请使用 `@change`、`@click`、`@close` 等事件，不再支持 `onChange`、`onclick` 这类回调 Prop 或小写别名。

## Tailwind CSS

参考 [Browser Support](https://tailwindcss.com/docs/browser-support)，VTDF 组件库内已有样式都支持现代浏览器。有问题请参考 [Can I Use](https://caniuse.com)。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
