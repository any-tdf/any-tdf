## 使用场景

ColorPicker 颜色选择器用于让用户选择颜色，支持 OKLCH、RGB、HEX 三种颜色模式。适用于主题定制、颜色配置等场景。

## 颜色模式

ColorPicker 支持三种颜色模式：

- **OKLCH**：基于人眼感知的现代颜色空间，提供更均匀的颜色过渡和更大的色域范围。
- **RGB**：传统的红绿蓝颜色模式，开发者最熟悉的颜色表示方式。
- **HEX**：十六进制颜色表示，常用于 CSS 样式。

通过 `modes` 属性可以配置支持的模式，数组中的第一个模式为初始显示模式。

## 初始颜色

ColorPicker 支持三种格式的初始颜色值：

```javascript
// OKLCH 格式
value = { l: 0.7, c: 0.15, h: 250 };

// RGB 格式
value = [255, 100, 50];

// HEX 格式
value = '#FF6432';
```

传入的初始值格式应与 `modes[0]` 对应，以确保类型一致性。

如果不传入初始颜色，ColorPicker 会自动使用当前主题颜色作为默认值：

- 浅色模式：使用 `--color-primary` 主题色
- 深色模式：使用 `--color-dark` 主题色

## 显示模式

ColorPicker 支持两种显示模式：

### Popup 模式（默认）

通过 `visible` 属性控制显示隐藏，颜色选择器会以弹出层形式展示。关闭时通过 `onclose` 回调返回选中的颜色。

```svelte
<ColorPicker bind:visible={visible} onclose={(colors) => console.log(colors)} />
```

### 直接显示模式

将 `popup` 设置为 `null`，颜色选择器会直接嵌入页面显示。颜色变化时通过 `onchange` 回调实时返回。

```svelte
<ColorPicker popup={null} onchange={(colors) => console.log(colors)} />
```

## 返回数据

ColorPicker 返回的颜色数据是一个字符串数组，包含当前颜色在各模式下的表示：

```javascript
colors = [
	'#FF6432', // HEX 格式
	'rgb(255, 100, 50)', // RGB 格式
	'oklch(0.700 0.150 250.0)' // OKLCH 格式
];
```

## 复制功能

预览区域的颜色值支持点击复制，复制成功后会显示提示。可通过 `showCopy` 属性控制是否显示复制功能，通过 `oncopy` 回调监听复制事件。

## 自定义样式

- 通过 `panelHeight` 和 `sliderHeight` 可以调整颜色面板和滑动条的高度。
- 通过 `radius` 可以设置圆角大小。
- 通过 `injClass` 可以注入自定义 CSS 类名。
- 通过 `tab` 可以自定义 Tab 切换的样式。

## 说明

ColorPicker 选择器在 Popup 模式下是基于 Popup 组件封装的，因此可以通过 `popup` 属性传入 Popup 的配置来调整弹出层样式。

如果只需要单一模式，可以将 `modes` 设置为只包含一个模式的数组，此时不会显示模式切换 Tab。
