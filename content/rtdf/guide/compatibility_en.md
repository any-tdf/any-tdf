> RTDF 0.0.1 uses React 18/19 and Tailwind CSS 4.

## React

RTDF is built on React and requires React 18 or React 19. If your target browsers require polyfills in the React ecosystem, please include them in your project setup.

## Events and State Binding

RTDF uses React-style event names such as `onChange`, `onClick`, and `onClose`. Only some components expose lowercase compatibility aliases, such as PullRefresh's `onrefresh` and `onchange`, and Input's `onkeydown`. Check each component API; STDF-style lowercase events cannot be applied to every RTDF component.

React applications manage component state through props and callbacks. Custom content uses ReactNode or the render functions declared by each component. Svelte bindings and snippets, and Vue models and slots, do not apply to React JSX.

## Tailwind CSS

Tailwind CSS 4 targets Chrome 111+, Safari 16.4+, and Firefox 128+. See the official [browser compatibility documentation](https://tailwindcss.com/docs/compatibility#browser-support). JavaScript polyfills do not replace support for the CSS features used by Tailwind CSS 4.

## Special Considerations

- The loading and swiper components implement lazy animation and lazy carousel for performance optimization using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If you need this feature, please make sure your browser supports IntersectionObserver. You can check compatibility at [Can I Use](https://caniuse.com/intersectionobserver).
