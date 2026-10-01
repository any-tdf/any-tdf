> 提示：所有代码或命令可以双击选定词，三击选定行。

## 1. 使用 create-any-tdf（推荐）

<!-- :::code-groups -->
<!-- bun -->

```sh
bun create any-tdf vtdf-app -f vue
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm create any-tdf vtdf-app -f vue
```

<!-- :: -->
<!-- npm -->

```sh
npm create any-tdf vtdf-app -- -f vue
```

<!-- :: -->
<!-- yarn -->

```sh
yarn create any-tdf vtdf-app -f vue
```

<!-- ::: -->

如果需要指定模板、提示语言、图标方案、主题模式和初始内置图标库，可以直接传入参数：

```sh
bun create any-tdf vtdf-app -f vue -t vrtt -l zh_CN -i iconify -m multi -b lucide
```

## 2. 自行搭建（已有项目可跳到本节）

本节以已有的 Vite Vue 3.5 项目为例。新项目可使用上方脚手架；已有项目仍需安装对应框架运行时，`vtdf` 不会代替它。

2.1 安装 VTDF

<!-- :::code-groups -->
<!-- bun -->

```sh
bun add vtdf
```

<!-- :: -->
<!-- pnpm -->

```sh
pnpm add vtdf
```

<!-- :: -->
<!-- npm -->

```sh
npm install vtdf
```

<!-- :: -->
<!-- yarn -->

```sh
yarn add vtdf
```

<!-- ::: -->

2.2 安装 Tailwind CSS 与 Vite 插件。

参考 [Tailwind CSS 文档](https://tailwindcss.com/docs/installation/using-vite) 配置 Tailwind CSS。

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

在 `vite.config.ts` 中同时注册框架插件与 Tailwind CSS 插件：

```ts
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
	plugins: [vue(), tailwindcss()]
});
```

2.3 在入口 CSS 中引入 Tailwind CSS 和 `vtdf/source.css`，配置暗黑模式并声明初始主题变量。该扫描入口同时注册 VTDF 和内部公共代码，避免构建后缺少样式。

以下为 VTDF 默认主题色，请根据自己的需要进行修改。可参考 [VTDF 指南：色彩](/guide/color)。

```css
/* app.css */
@import 'tailwindcss';
@import 'vtdf/style.css';
@import 'vtdf/source.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=primary], [data-mode=primary] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	--color-primary-50: oklch(0.97 0.044 276.886);
	--color-primary-100: oklch(0.886 0.086 274.886);
	--color-primary-200: oklch(0.802 0.128 272.886);
	--color-primary-300: oklch(0.718 0.17 270.886);
	--color-primary-400: oklch(0.635 0.212 268.886);
	--color-primary-500: oklch(0.551 0.254 266.886);
	--color-primary: oklch(0.467 0.296 264.886);
	--color-primary-700: oklch(0.413 0.316 262.886);
	--color-primary-800: oklch(0.359 0.326 260.886);
	--color-primary-900: oklch(0.304 0.326 258.886);
	--color-primary-950: oklch(0.25 0.326 256.886);
	--color-dark-50: oklch(0.97 0.023 68.597);
	--color-dark-100: oklch(0.949 0.045 70.597);
	--color-dark-200: oklch(0.928 0.066 72.597);
	--color-dark-300: oklch(0.907 0.088 74.597);
	--color-dark-400: oklch(0.887 0.11 76.597);
	--color-dark-500: oklch(0.866 0.131 78.597);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-dark-700: oklch(0.696 0.168 82.597);
	--color-dark-800: oklch(0.547 0.168 84.597);
	--color-dark-900: oklch(0.399 0.168 86.597);
	--color-dark-950: oklch(0.25 0.168 88.597);
	--color-bg-base: oklch(0.967 0.015 264.9);
	--color-bg-surface: oklch(0.985 0.005 80.6);
	--color-bg-overlay: oklch(0.955 0.005 80.6);
	--color-bg-highlight: oklch(0.98 0.009 264.9);
	--color-bg-base-dark: oklch(0.15 0.012 80.6);
	--color-bg-surface-dark: oklch(0.22 0.009 95.6);
	--color-bg-overlay-dark: oklch(0.19 0.008 80.6);
	--color-bg-highlight-dark: oklch(0.08 0.006 80.6);
	--color-text-primary: oklch(0.144 0.015 264.9);
	--color-text-dark: oklch(0.917 0.038 80.6);
	--color-text-on-primary: oklch(0.883 0.043 80.6);
	--color-text-on-dark: oklch(0.189 0.05 264.9);
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.153 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);
	--radius-box: 0.75rem;
	--radius-form: 0.5rem;
	--radius-small: 0.25rem;
}
```

以上为共享的 ANYTDF 预设变量。`vtdf/style.css` 还提供组件全局样式与动画，仅引入扫描入口不会提供这些样式。请在应用入口（src/main.ts）中引入这份 CSS，整个应用只需引入一次。定制方式见[主题配置](/guide/theme)。

```ts
import './app.css';
```

2.4 在 Vue 文件中引入并使用。

```vue
<script setup lang="ts">
import { Button } from 'vtdf';
</script>

<template>
	<Button>点击我</Button>
</template>
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
