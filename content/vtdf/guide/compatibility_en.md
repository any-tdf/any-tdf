> VTDF 3.0.0-alpha.0 is based on Vue 3.5 and Tailwind CSS v4.

## Vue

VTDF is built on Vue 3.5 and requires Vue 3.5 or later. If your target browsers require polyfills in the Vue ecosystem, please include them in your project setup.

## Event Syntax

VTDF only supports Vue event listeners. In templates, use events such as `@change`, `@click`, and `@close`; callback props such as `onChange` and lowercase aliases such as `onclick` are no longer supported.

## Tailwind CSS

According to [Browser Support](https://tailwindcss.com/docs/browser-support), the styles within the VTDF component library already support modern browsers. If you encounter any issues, please refer to [Can I Use](https://caniuse.com).

## Special Considerations

- The loading and swiper components implement lazy animation and lazy carousel for performance optimization using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If you need this feature, please make sure your browser supports IntersectionObserver. You can check compatibility at [Can I Use](https://caniuse.com/intersectionobserver).
