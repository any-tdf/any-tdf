## Swiper Props

| 名称                | 类型                                                  | 默认值        | 必传 | 说明                         |
| ------------------- | ----------------------------------------------------- | ------------- | ---- | ---------------------------- |
| data                | `(SwiperImg\|SwiperComponent)[]`                      | `[]`          | Y    | 数据。                       |
| interval            | `number`                                              | `4`           | N    | 间隔时间（秒）。             |
| duration            | `number`                                              | `1000`        | N    | 过渡时间（毫秒）。           |
| autoplay            | `boolean`                                             | `true`        | N    | 是否自动播放。               |
| lazyplay            | `boolean`                                             | `true`        | N    | 是否懒轮播。                 |
| initActive          | `number`                                              | `0`           | N    | 初始激活索引。               |
| indicatePosition    | `'inner'\|'out'\|null`                                | `'inner'`     | N    | 指示器位置。                 |
| indicateAlign       | `'center'\|'right'\|'left'`                           | `'center'`    | N    | 指示器对齐方式。             |
| indicateStyle       | `'point'\|'line'\|'pointLine'\|'longLine'`            | `'pointLine'` | N    | 指示器样式。                 |
| indicateRadius      | `'none'\|'xs'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'full'` | `'sm'`        | N    | 指示器圆角风格。             |
| indicateInjClass    | `string`                                              | `''`          | N    | 指示器注入 Class。           |
| indicateColor       | `string`                                              | `''`          | N    | 指示器颜色。                 |
| indicateActiveColor | `string`                                              | `''`          | N    | 指示器激活颜色。             |
| aspectRatio         | `[number,number]`                                     | `[16, 9]`     | N    | 容器宽高比。                 |
| containerWidth      | `number`                                              | `0`           | N    | 容器宽度。                   |
| px                  | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'\|'12'\|'16'\|'24'`      | `'0'`         | N    | 容器横向内边距。             |
| py                  | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'\|'12'`                  | `'0'`         | N    | 容器纵向内边距。             |
| translateX          | `number`                                              | `0`           | N    | 未激活容器 X 方向偏移值。    |
| translateZ          | `number`                                              | `0`           | N    | 未激活容器 Z 方向偏移值。    |
| rotateX             | `number`                                              | `0`           | N    | 未激活容器 X 轴旋转值。      |
| rotateY             | `number`                                              | `0`           | N    | 未激活容器 Y 轴旋转值。      |
| rotateZ             | `number`                                              | `0`           | N    | 未激活容器 Z 轴旋转值。      |
| activeInjClass      | `string`                                              | `''`          | N    | 激活容器注入 Class。         |
| notActiveInjClass   | `string`                                              | `''`          | N    | 未激活容器注入 Class。       |
| radius              | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'` | `'xl'`        | N    | 容器内部区域圆角。           |
| triggerLong         | `number`                                              | `30`          | N    | 始终触发的滑动距离百分比。   |
| notTriggerLong      | `number`                                              | `10`          | N    | 始终不触发的滑动距离百分比。 |
| triggerSpeed        | `number`                                              | `0.5`         | N    | 触发的滑动速度系数。         |
| innerInjClass       | `string`                                              | `''`          | N    | 容器内部元素注入 Class。     |

## Swiper Events

| 名称   | 类型                        | 参数                 | 描述                     |
| ------ | --------------------------- | -------------------- | ------------------------ |
| click  | `(current: number) => void` | current - 点击索引值 | 点击容器内图片时触发。   |
| change | `(current: number) => void` | current - 当前索引值 | 当前激活容器变化时触发。 |

## SwiperImg

```javascript
type SwiperImg = { type: 'img', url: string };
```

## SwiperComponent

```javascript
type SwiperComponent = { type: 'component', component: Component };
```
