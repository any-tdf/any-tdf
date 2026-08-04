## Swiper Props

| Name                | Type                                                  | Default       | Required | Description                                     |
| ------------------- | ----------------------------------------------------- | ------------- | -------- | ----------------------------------------------- |
| data                | `(SwiperImg\|SwiperComponent)[]`                      | `[]`          | Y        | Data.                                           |
| interval            | `number`                                              | `4`           | N        | Interval time (seconds).                        |
| duration            | `number`                                              | `1000`        | N        | Transition duration (milliseconds).             |
| autoplay            | `boolean`                                             | `true`        | N        | Whether to autoplay.                            |
| lazyplay            | `boolean`                                             | `true`        | N        | Whether to lazy load.                           |
| initActive          | `number`                                              | `0`           | N        | Initial active index.                           |
| indicatePosition    | `'inner'\|'out'\|null`                                | `'inner'`     | N        | Indicator position.                             |
| indicateAlign       | `'center'\|'right'\|'left'`                           | `'center'`    | N        | Indicator alignment.                            |
| indicateStyle       | `'point'\|'line'\|'pointLine'\|'longLine'`            | `'pointLine'` | N        | Indicator style.                                |
| indicateRadius      | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`        | N        | Indicator border radius style.                  |
| indicateInjClass    | `string`                                              | `''`          | N        | Indicator injected class.                       |
| indicateColor       | `string`                                              | `''`          | N        | Indicator color.                                |
| indicateActiveColor | `string`                                              | `''`          | N        | Active indicator color.                         |
| aspectRatio         | `[number,number]`                                     | `[16, 9]`     | N        | Container aspect ratio.                         |
| containerWidth      | `number`                                              | `0`           | N        | Container width.                                |
| px                  | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'24'`      | `'0'`         | N        | Container horizontal padding.                   |
| py                  | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'\|'12'`                  | `'0'`         | N        | Container vertical padding.                     |
| translateX          | `number`                                              | `0`           | N        | Inactive container X-axis translation.          |
| translateZ          | `number`                                              | `0`           | N        | Inactive container Z-axis translation.          |
| rotateX             | `number`                                              | `0`           | N        | Inactive container X-axis rotation.             |
| rotateY             | `number`                                              | `0`           | N        | Inactive container Y-axis rotation.             |
| rotateZ             | `number`                                              | `0`           | N        | Inactive container Z-axis rotation.             |
| activeInjClass      | `string`                                              | `''`          | N        | Active container injected class.                |
| notActiveInjClass   | `string`                                              | `''`          | N        | Inactive container injected class.              |
| radius              | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'` | `'xl'`        | N        | Container inner area border radius.             |
| triggerLong         | `number`                                              | `30`          | N        | Slide distance percentage that always triggers. |
| notTriggerLong      | `number`                                              | `10`          | N        | Slide distance percentage that never triggers.  |
| triggerSpeed        | `number`                                              | `0.5`         | N        | Slide speed coefficient that triggers.          |
| innerInjClass       | `string`                                              | `''`          | N        | Container inner element injected class.         |

## Swiper Events

| Name     | Type                        | Parameters              | Description                              |
| -------- | --------------------------- | ----------------------- | ---------------------------------------- |
| onclick  | `(current: number) => void` | current - clicked index | Triggered when clicking container image. |
| onchange | `(current: number) => void` | current - current index | Triggered when active container changes. |

## SwiperImg

```javascript
type SwiperImg = { type: 'img', url: string };
```

## SwiperComponent

```javascript
type SwiperComponent = { type: 'component', component: Component };
```
