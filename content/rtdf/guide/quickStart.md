> 提示：所有代码或命令可以双击选定词，三击选定行。

## 1. 使用 create-any-tdf（推荐）

<!-- :::code-groups -->
<!-- bun -->

```sh
bun create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- npm -->

```sh
npm create any-tdf@latest rtdf-app -f react
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create any-tdf@latest rtdf-app -f react
```

<!-- ::: -->

如果需要指定模板、提示语言、图标方案、主题模式和初始内置图标库，可以直接传入参数：

```sh
bun create any-tdf@latest rtdf-app -f react -t vrtt -l zh_CN -i iconify -m multi -b lucide
```

## 2. 自行搭建（已有项目可跳到本节）

2.1 安装 RTDF

```sh
bun add rtdf@0.0.0-alpha.0
```

2.2 安装 Tailwind CSS 与 Vite 插件。

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/guides/vite) 配置 Tailwind CSS。

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm i tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- npm -->

```sh
npm i tailwindcss @tailwindcss/vite -D
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add tailwindcss @tailwindcss/vite -D
```

<!-- ::: -->

2.3 在项目的入口 CSS 文件中引入 Tailwind CSS，设置暗黑模式，添加初始颜色变量，**使用 `@source` 指令指定 Tailwind 自动检测 RTDF 组件**。

以下为 RTDF 默认主题色，请根据自己的需要进行修改。可参考 [RTDF 指南：色彩](/guide/color)。

```css
/* app.css */
@import 'tailwindcss';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	/* 主题色 */
	--color-primary-50: oklch(0.979 0.01 267.36);
	--color-primary-100: oklch(0.95 0.024 270.343);
	--color-primary-200: oklch(0.847 0.074 271.188);
	--color-primary-300: oklch(0.741 0.13 272.232);
	--color-primary-400: oklch(0.634 0.193 271.595);
	--color-primary-500: oklch(0.536 0.252 268.66);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.397 0.26 264.877);
	--color-primary-800: oklch(0.331 0.221 264.833);
	--color-primary-900: oklch(0.26 0.178 264.428);
	--color-primary-950: oklch(0.192 0.13 266.64);

	--color-dark-50: oklch(0.995 0.012 101.474);
	--color-dark-100: oklch(0.986 0.025 97.107);
	--color-dark-200: oklch(0.965 0.059 95.884);
	--color-dark-300: oklch(0.938 0.089 92.952);
	--color-dark-400: oklch(0.91 0.114 89.711);
	--color-dark-500: oklch(0.88 0.136 86.375);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.71 0.137 75.734);
	--color-dark-800: oklch(0.58 0.118 70.166);
	--color-dark-900: oklch(0.449 0.097 65.209);
	--color-dark-950: oklch(0.321 0.074 62.379);

	/* 功能色 */
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);

	/* 扩展色 */
	--color-Twitter: oklch(0.703 0.149 235.059);
	--color-React: oklch(0.702 0.194 38.137);
	--color-Starbucks: oklch(0.482 0.107 161.212);

	/* 中性色 */
	--color-black: oklch(0 0 0);
	--color-white: oklch(1 0 0);
	--color-gray-50: oklch(0.961 0 0);
	--color-gray-100: oklch(0.925 0 0);
	--color-gray-200: oklch(0.845 0 0);
	--color-gray-300: oklch(0.767 0 0);
	--color-gray-400: oklch(0.683 0 0);
	--color-gray-500: oklch(0.6 0 0);
	--color-gray-600: oklch(0.51 0 0);
	--color-gray-700: oklch(0.42 0 0);
	--color-gray-800: oklch(0.321 0 0);
	--color-gray-900: oklch(0.218 0 0);
	--color-gray-950: oklch(0.159 0 0);
	--color-transparent: transparent;

	/* 背景色变量 - 亮色模式 */
	--color-bg-base: oklch(1 0 0);
	--color-bg-surface: oklch(0.98 0 0);
	--color-bg-overlay: oklch(0.99 0 0);
	--color-bg-highlight: oklch(0.99 0 0);

	/* 背景色变量 - 暗色模式 */
	--color-bg-base-dark: oklch(0.15 0 0);
	--color-bg-surface-dark: oklch(0.2 0 0);
	--color-bg-overlay-dark: oklch(0.12 0 0);
	--color-bg-highlight-dark: oklch(0.08 0 0);

	/* 文字颜色变量 */
	--color-text-primary: oklch(0.15 0 0);
	--color-text-dark: oklch(0.95 0 0);
	--color-text-on-primary: oklch(1 0 0);
	--color-text-on-dark: oklch(0.1 0 0);

	/* 圆角变量 */
	--radius-box: 0.5rem;
	--radius-form: 0.25rem;
	--radius-small: calc(infinity * 1px);
}
@source "../node_modules/rtdf/dist";
```

2.4 在 React 文件中引入并使用。

```tsx
import { Button } from 'rtdf';

const App = () => <Button>点击我</Button>;
```

2.5 启动项目。

<!-- :::code-groups -->
<!-- bun -->

```sh
bun dev
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm dev
```

<!-- :: -->
<!-- npm -->

```sh
npm run dev
```

<!-- :: -->
<!-- yarn -->

```sh
yarn dev
```

<!-- ::: -->
