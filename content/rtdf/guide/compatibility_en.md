> RTDF 3.0.0-alpha.0 is based on React 18/19 and Tailwind CSS v4.

## React

RTDF is built on React and requires React 18 or React 19. If your target browsers require polyfills in the React ecosystem, please include them in your project setup.

## STDF Event Aliases

RTDF recommends React-style event names such as `onChange`, `onClick`, and `onClose`. To reduce migration cost from STDF to RTDF, components also keep STDF-style lowercase event aliases such as `onchange`, `onclick`, and `onclose`. If both names are provided for the same event, the component calls both handlers.

## Tailwind CSS

According to [Browser Support](https://tailwindcss.com/docs/browser-support), the styles within the RTDF component library already support modern browsers. If you encounter any issues, please refer to [Can I Use](https://caniuse.com).

## Special Considerations

- The loading and swiper components implement lazy animation and lazy carousel for performance optimization using [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API). If you need this feature, please make sure your browser supports IntersectionObserver. You can check compatibility at [Can I Use](https://caniuse.com/intersectionobserver).
