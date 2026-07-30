## value、startValue、endValue、minRange、maxRange

传入 value、startValue、endValue 时，请确保在 minRange 与 maxRange 之间。

## step

传入 step 时，请尽量保证 (maxRange - minRange) / step 为整数，且考虑每一步的精度问题，太小可能导致无法快速滑动到需要的值，从而影响用户体验。

## showSteps

开启 showSteps 后，滑条轨道上会显示档位标记，适用于有明确档位选择的场景。档位数量由 (maxRange - minRange) / step + 1 决定。档位位置与 step 值保持一致，滑块松开后会自动吸附到最近的档位。

## stepsStyle

档位样式有两种：

- **block**：连续线条上的档位块，档位标记覆盖在轨道上方
- **break**：被档位隔断的线条，轨道被分割为多个独立的线段

两种样式的圆角都跟随 radius 属性。

## stepLabels

通过传入 stepLabels 数组，可以让 Slider 不仅仅处理数值，还能显示自定义的档位标签。当滑块滑动到某个档位时，tip 会显示对应的标签文本而非数值。

数组的长度应与档位数量一致，即 (maxRange - minRange) / step + 1。例如：

```svelte
<!-- 速度选择器 -->
<Slider step={25} showSteps stepLabels={['极慢', '慢', '中', '快', '极快']} />

<!-- 百分比选择器 -->
<Slider step={20} showSteps stepLabels={['0%', '20%', '40%', '60%', '80%', '100%']} />
```

这使得 Slider 可以用于更多场景，如音量等级、亮度调节、速度选择、评分等级等。

## 布局

Slider 未设置外部间距，请在页面布局时自行设置。

## Snippet

当传入 Snippet 时，Slider 的进度区域会使用 Snippet 渲染，参考示例。
