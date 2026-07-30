> STDF 3.0.0-alpha.0 基于 Svelte v5 与 Tailwind CSS v4。

## Svelte

市面上能看到的浏览器版本基本都已经支持了 Svelte v5，旧版的 IE 浏览器需要 Polyfills，不过移动端没有 IE，况且微软也已经放弃了 IE，所以这里不做讨论。

## Tailwind CSS

参考 [Browser Support](https://tailwindcss.com/docs/browser-support)，STDF 组件库内已有样式都支持现代浏览器。有问题请参考 [Can I Use](https://caniuse.com)。

## 特殊情况

- Loading 与 Swiper 组件内为优化性能实现懒轮播和懒动画，使用了 [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API)，如果需要此功能，请确保浏览器支持 IntersectionObserver。此处查看 [Can I Use](https://caniuse.com/intersectionobserver)。
