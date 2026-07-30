## 亮暗模式

### 配置

使用 Tailwind CSS 的暗模式配置，请在项目入口 CSS 文件中做如下 `@custom-variant` 配置，参考 [Dark Mode](https://tailwindcss.com/docs/dark-mode)。

```css
@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

> 此配置支持嵌套模式切换，可以在暗色区域内嵌入亮色区域，反之亦然。

### 切换

VTDF 将切换亮暗模式的方法置于 VTDF 的 NPM 包中，本质上是通过修改 `html` 标签的 `data-mode` 属性实现切换。

```javascript
// 引入 switchMode，传入 'primary' 切换为亮模式，传入 'dark' 切换为暗模式。
import { switchMode } from 'vtdf/theme';

// 切换为亮模式
switchMode('primary');

// 切换为暗模式
switchMode('dark');
```

也可以使用 `getMode` 方法获取当前模式：

```javascript
import { getMode } from 'vtdf/theme';

// 获取当前模式，返回 'primary' 或 'dark'
const currentMode = getMode();
```

## 多主题模式

### 介绍

VTDF 支持多主题切换，主题支持切换[颜色系统](/guide/color)、圆角、背景色、文字颜色等配置。本质原理是将一些属性设置为 CSS 变量，通过修改 `data-theme` 属性实现主题切换。

### 配置

VTDF 使用 Tailwind CSS 4 的 `@plugin` 语法定义主题。在项目入口 CSS 文件中使用 `@plugin "vtdf/theme"` 语法定义主题。

#### 使用内置主题

VTDF 内置了 42 套精心设计的主题，只需传入主题名称即可使用：

```css
/* 使用单个内置主题 */
@plugin "vtdf/theme" {
	name: 'Nintendo';
}
```

如果需要使用多个内置主题（支持动态切换），使用逗号分隔主题名称：

```css
/* 使用多个内置主题（逗号分隔） */
@plugin "vtdf/theme" {
	name: 'Nintendo, Ocean, Forest';
}
```

如果需要同时使用所有 42 套内置主题，使用 `all: true`：

```css
/* 加载所有 42 套内置主题 */
@plugin "vtdf/theme" {
	all: true;
}
```

#### 自定义主题

自定义主题时，**`color-primary` 和 `color-dark` 只需传入基础色值**，插件会自动计算完整的颜色梯度（50-950）。背景色和文字色需要手动配置。

```css
@plugin "vtdf/theme" {
	name: 'MyTheme';

	/* primary 和 dark 只需传入基础色，插件自动计算 50-950 梯度 */
	color-primary: oklch(0.52 0.24 35);
	color-dark: oklch(0.72 0.18 250);

	/* 背景色 */
	color-bg-base: oklch(0.97 0.01 35);
	color-bg-surface: oklch(0.99 0.005 35);
	color-bg-overlay: oklch(0.96 0.005 35);
	color-bg-highlight: oklch(0.98 0.008 35);
	color-bg-base-dark: oklch(0.15 0.01 250);
	color-bg-surface-dark: oklch(0.22 0.008 250);
	color-bg-overlay-dark: oklch(0.19 0.007 250);
	color-bg-highlight-dark: oklch(0.08 0.005 250);

	/* 文字色 */
	color-text-primary: oklch(0.15 0.01 35);
	color-text-dark: oklch(0.92 0.03 250);
	color-text-on-primary: oklch(0.88 0.04 35);
	color-text-on-dark: oklch(0.19 0.05 250);

	/* 功能色 */
	color-success: oklch(0.65 0.18 155);
	color-warning: oklch(0.72 0.18 45);
	color-error: oklch(0.55 0.24 15);
	color-info: oklch(0.55 0.18 260);

	/* 圆角 */
	radius-box: 1.5rem;
	radius-form: 0.5rem;
	radius-small: calc(infinity * 1px);
}
```

> **注意**：键名不需要 `--` 前缀，插件会自动添加。

> 可到<a href="/guide/generator" target="_blank">主题生成器</a>快速选择颜色并生成配置文件。

### 单主题模式

如果你的项目**不需要切换主题**，只需要在 `@theme` 中配置 CSS 变量即可，无需使用 `@plugin "vtdf/theme"`：

```css
@theme {
	/* 主题色 */
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-50: oklch(0.967 0.0296 264.886);
	/* ... 其他 primary 梯度色 ... */

	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-50: oklch(0.98 0.0153 80.597);
	/* ... 其他 dark 梯度色 ... */

	/* 背景色、文字色、功能色、圆角等 */
	/* ... */
}
```

这种方式下，CSS 变量直接生效，无需设置 `data-theme` 属性。

### 多主题模式的默认主题

使用多主题时，需要在 `@theme` 中声明**默认主题**的 CSS 变量。这些变量有两个作用：

1. **生成工具类**：Tailwind 需要这些变量来生成对应的工具类（如 `bg-primary`、`text-dark` 等）
2. **作为默认值**：当 `html` 标签没有 `data-theme` 属性时，使用这些默认值

> **注意**：`@plugin "vtdf/theme"` 生成的主题变量会通过 `[data-theme="xxx"]` 选择器覆盖 `@theme` 中的默认值。

```css
@theme {
	/* 默认主题变量 - 当没有 data-theme 属性时生效 */
	--color-primary-50: oklch(0.967 0.0296 264.886);
	--color-primary-100: oklch(0.917 0.0444 264.886);
	--color-primary-200: oklch(0.817 0.1036 264.886);
	--color-primary-300: oklch(0.717 0.1628 264.886);
	--color-primary-400: oklch(0.617 0.222 264.886);
	--color-primary-500: oklch(0.547 0.2664 264.886);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.387 0.2812 264.886);
	--color-primary-800: oklch(0.317 0.2516 264.886);
	--color-primary-900: oklch(0.267 0.222 264.886);
	--color-primary-950: oklch(0.187 0.1776 264.886);

	--color-dark-50: oklch(0.98 0.0153 80.597);
	--color-dark-100: oklch(0.95 0.02295 80.597);
	--color-dark-200: oklch(0.88 0.05355 80.597);
	--color-dark-300: oklch(0.78 0.08415 80.597);
	--color-dark-400: oklch(0.68 0.11475 80.597);
	--color-dark-500: oklch(0.58 0.1377 80.597);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.765 0.14535 80.597);
	--color-dark-800: oklch(0.695 0.13005 80.597);
	--color-dark-900: oklch(0.645 0.11475 80.597);
	--color-dark-950: oklch(0.565 0.0918 80.597);

	/* 背景色 */
	--color-bg-base: oklch(0.967 0.0148 264.9);
	--color-bg-surface: oklch(0.985 0.005 80.6);
	--color-bg-overlay: oklch(0.955 0.005 80.6);
	--color-bg-highlight: oklch(0.98 0.0089 264.9);
	--color-bg-base-dark: oklch(0.15 0.0122 80.6);
	--color-bg-surface-dark: oklch(0.22 0.0092 95.6);
	--color-bg-overlay-dark: oklch(0.19 0.0077 80.6);
	--color-bg-highlight-dark: oklch(0.08 0.0061 80.6);

	/* 文字颜色 */
	--color-text-primary: oklch(0.144 0.0148 264.886);
	--color-text-dark: oklch(0.917 0.03825 80.597);
	--color-text-on-primary: oklch(0.883 0.04284 80.597);
	--color-text-on-dark: oklch(0.189 0.05032 264.886);

	/* 功能色 */
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.153 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);

	/* 圆角 */
	--radius-box: 0.75rem;
	--radius-form: 0.5rem;
	--radius-small: 0.25rem;
}
```

### 主题变量说明

#### 内置主题

使用内置主题时，只需传入主题名称，所有颜色值由插件自动计算生成。

#### 自定义主题

| 变量名            | 说明                                           |
| ----------------- | ---------------------------------------------- |
| `name`            | 主题名称，用于 `data-theme` 属性切换           |
| `color-primary`   | 亮色模式主题基础色（自动生成 50-950 梯度）     |
| `color-dark`      | 暗色模式主题基础色（自动生成 50-950 梯度）     |
| `color-bg-*`      | 背景色（base, surface, overlay, highlight）    |
| `color-bg-*-dark` | 暗色模式背景色                                 |
| `color-text-*`    | 文字颜色（primary, dark, on-primary, on-dark） |
| `color-success`   | 成功状态色                                     |
| `color-warning`   | 警告状态色                                     |
| `color-error`     | 错误状态色                                     |
| `color-info`      | 信息状态色                                     |
| `radius-box`      | 容器圆角                                       |
| `radius-form`     | 表单元素圆角                                   |
| `radius-small`    | 小元素圆角                                     |

以下变量由插件根据 `color-primary` 和 `color-dark` 自动计算生成，无需手动指定：

- `color-primary-*` / `color-dark-*`（50-950 梯度）

Tailwind v4 推荐使用 oklch 颜色模式，参考 [Using CSS variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables)。

### 切换

引入 NPM 包中的 `switchTheme` 方法切换主题，传入主题名称即可。

```javascript
// 引入切换主题方法
import { switchTheme } from 'vtdf/theme';

// 切换主题为 Nintendo
switchTheme('Nintendo');

// 切换主题为 MyTheme
switchTheme('MyTheme');
```

也可以使用 `getTheme` 方法获取当前主题：

```javascript
import { getTheme } from 'vtdf/theme';

// 获取当前主题名称
const currentTheme = getTheme();
```

### HTML 中使用

主题切换通过 `data-theme` 属性实现：

```html
<!-- 默认主题 -->
<html>
	<!-- 使用 Nintendo 主题 -->
	<html data-theme="Nintendo">
		<!-- 使用自定义主题 -->
		<html data-theme="MyTheme"></html>
	</html>
</html>
```

## 内置主题

VTDF 内置了 42 套精心设计的主题，可直接使用：

| 主题名       | 中文名   | 主题名     | 中文名   |
| ------------ | -------- | ---------- | -------- |
| VTDF         | VTDF     | Nintendo   | 红蓝天堂 |
| Ocean        | 海蓝金沙 | Forest     | 翠林暖棕 |
| Sunset       | 橙霞蓝天 | Cherry     | 粉樱翠影 |
| Twilight     | 暮紫粉霞 | Amber      | 琥珀紫韵 |
| Mint         | 薄荷玫红 | Coral      | 珊瑚碧蓝 |
| Slate        | 石墨暖棕 | Emerald    | 翡翠丹霞 |
| Crimson      | 绯红碧波 | Navy       | 藏蓝珊瑚 |
| Olive        | 橄榄紫烟 | Plum       | 梅紫青翠 |
| Cyan         | 青碧暖橙 | Tangerine  | 蜜橘深蓝 |
| Sage         | 草绿粉紫 | Berry      | 浆紫嫩绿 |
| Wine         | 酒红翠青 | IKEA       | 宜家蓝黄 |
| Ferrari      | 法拉红金 | Tiffany    | 蒂芙蓝白 |
| Pepsi        | 百事蓝红 | Spotify    | 声田绿米 |
| Netflix      | 奈飞红白 | Hermes     | 爱马橙棕 |
| CocaCola     | 可乐红白 | Starbucks  | 星巴绿棕 |
| McDonalds    | 金拱红黄 | Gucci      | 古驰绿红 |
| Chanel       | 香奈黑米 | Rolex      | 劳力绿金 |
| LouisVuitton | 路威棕金 | Mastercard | 万事红橙 |

## 总结

### 亮暗模式

使用 VTDF NPM 包中的 `switchMode` 方法，传入 `'primary'` 或 `'dark'` 切换亮暗模式。

### 单主题模式

如果不需要切换主题，只需在 `@theme` 中配置 CSS 变量即可，无需使用 `@plugin`。

### 多主题模式

1. 在 `@theme` 中配置**默认主题** CSS 变量（用于生成工具类，并作为无 `data-theme` 时的默认值）
2. 使用 `@plugin "vtdf/theme"` 定义可切换的主题：
   - 使用内置主题：传入 `name: "ThemeName"` 即可
   - 使用多个内置主题：逗号分隔，如 `name: "Nintendo, Ocean, Forest"`
   - 使用所有内置主题：传入 `all: true`
   - 自定义主题：只需传入基础色，插件自动计算完整色阶
3. 使用 `switchTheme` 方法传入主题名称切换主题
