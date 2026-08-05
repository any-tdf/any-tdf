# STDF 2.x 升级到 3.x 迁移指南

本文以 `2.0.2` 和当前 `3.0.0-alpha.2` 为基准，说明已有 STDF 项目升级后需要处理的改动。

STDF 3.x 将主题、语言、类型、工具方法、SVG 数据和组件的框架无关逻辑整理到了内部公共层，但应用仍然只需要依赖 `stdf`。这次升级中需要重点检查以下 3 项：

1. 使用 `stdf/source.css` 注册 Tailwind CSS 扫描源。
2. 将内置默认主题名从 `STDF` 改为 `ANYTDF`。
3. 更新自定义语言包的 `LangProps` 结构。

STDF 2.x 已经基于 Svelte 5 和 Tailwind CSS 4，因此从 2.x 升级时，不需要仅为 STDF 再迁移一次 Svelte 或 Tailwind CSS。常用组件名称、事件、Snippet 和大部分 Props 也保持兼容。

## 1. 升级依赖

3.x 仍处于 alpha 阶段时，使用 `alpha` 标签安装：

```sh
bun add stdf@alpha
```

稳定版发布后，可以改为：

```sh
bun add stdf@^3
```

`@any-tdf/common` 是 STDF 3.x 的内部依赖。业务项目不需要直接安装或导入它，也不要在 `package.json` 中手动固定它的版本。

如果项目曾跟随早期 3.x alpha 示例显式安装过该包，可以移除这条直接依赖：

```sh
bun remove @any-tdf/common
```

## 2. 更新 Tailwind CSS 扫描入口

这是升级后必须修改的项目配置。

### 2.x 写法

```css
@import 'tailwindcss';

@source '../node_modules/stdf/**/*.svelte';
```

### 3.x 写法

```css
@import 'tailwindcss';
@import 'stdf/source.css';
```

`stdf/source.css` 会同时注册 STDF 组件产物和内部公共产物。这样 Tailwind CSS 才能发现两部分代码中使用的 class，避免生产构建后出现样式缺失。

如果项目中存在以下 STDF 专用扫描配置，也统一替换为 `@import 'stdf/source.css';`：

```css
@source '../node_modules/stdf/dist';
@source '../node_modules/@any-tdf/common/dist';
```

项目自身的 `@source` 配置不受影响，只需要移除指向 STDF 或 `@any-tdf/common` 的手动路径。

## 3. 将默认主题名改为 ANYTDF

3.x 将第一套内置主题的名称从 `STDF` 改为 `ANYTDF`。它的主题色保持一致，但名称变化会影响主题插件配置、`data-theme`、运行时切换值和本地持久化数据。

### 主题插件

2.x：

```css
@plugin "stdf/theme" {
	name: 'STDF, Sage, GoldWood';
}
```

3.x：

```css
@plugin "stdf/theme" {
	name: 'ANYTDF, Sage, GoldWood';
}
```

### 运行时与 HTML

2.x：

```ts
switchTheme('STDF');
```

```html
<html data-theme="STDF"></html>
```

3.x：

```ts
switchTheme('ANYTDF');
```

```html
<html data-theme="ANYTDF"></html>
```

如果项目把主题名保存到了 `localStorage`、服务端用户配置或 URL 参数中，也要把旧值迁移为 `ANYTDF`。例如：

```ts
import { switchTheme } from 'stdf/theme';

const savedTheme = localStorage.getItem('theme_color');
const theme = savedTheme === 'STDF' ? 'ANYTDF' : (savedTheme ?? 'ANYTDF');

localStorage.setItem('theme_color', theme);
switchTheme(theme);
```

其他内置主题名和自定义主题名不受影响。以下公开路径也没有变化：

```ts
import { getMode, getTheme, switchMode, switchTheme, themes } from 'stdf/theme';
```

`switchTheme` 在 3.x 中还可以直接接收 `ThemeConfig` 或 `ThemeProps` 对象，但已有的字符串调用方式仍然可用。

## 4. 使用 ConfigProvider 管理全局配置

3.x 新增 `ConfigProvider`，用于统一配置语言和组件内置图标库。原来的 `setContext('STDF_lang', locale)` 方式仍然兼容，但新项目和希望统一全局配置入口的项目建议改用 `ConfigProvider`。

### 2.x 写法

```svelte
<script lang="ts">
	import { setContext } from 'svelte';
	import { Feedback, setFeedbackLang } from 'stdf';
	import { en_US } from 'stdf/lang';

	setContext('STDF_lang', en_US);
	setFeedbackLang(en_US);
</script>

<slot />
<Feedback />
```

### 3.x 写法

```svelte
<script lang="ts">
	import type { Snippet } from 'svelte';
	import { ConfigProvider, Feedback } from 'stdf';
	import { en_US } from 'stdf/lang';

	let { children }: { children: Snippet } = $props();
</script>

<ConfigProvider locale={en_US} builtInIconLibrary="remix">
	{@render children()}
	<Feedback />
</ConfigProvider>
```

`ConfigProvider` 会同步函数式反馈 API 使用的语言，因此不需要再额外调用 `setFeedbackLang`。

如果项目使用 `toast`、`showAlert`、`dialog`、`modal` 或 `loading`，仍然需要在应用中挂载一次 `<Feedback />`。`ConfigProvider` 只提供配置，不会代替反馈容器。

语言配置仍遵循 Svelte Context 的初始化语义。运行时更换 `locale` 后，已挂载的普通组件需要重新挂载或刷新页面；函数式反馈 API 使用的语言会由 `ConfigProvider` 同步更新。

## 5. 更新自定义语言包

内置语言包仍然从 `stdf/lang` 导入，直接使用 `zh_CN`、`en_US` 等内置对象时不需要修改：

```ts
import { en_US, zh_CN } from 'stdf/lang';
```

如果项目维护了完整的自定义 `LangProps` 对象，需要调整以下字段：

| 变更       | 字段                                                  | 说明                           |
| ---------- | ----------------------------------------------------- | ------------------------------ |
| 移除       | `common.slotEmpty`                                    | 不再属于公共语言配置。         |
| 移除       | `common.loading`                                      | 加载文案由对应组件管理。       |
| 移除       | `common.noMoreData`                                   | 无更多数据文案由对应组件管理。 |
| 新增，必填 | `signature.clearText`、`signature.confirmText`        | Signature 操作文案。           |
| 新增，必填 | `imagePreview.loadFailedText`                         | ImagePreview 加载失败文案。    |
| 新增，必填 | `imageList.uploadFailedText`、`imageList.pendingText` | ImageList 状态文案。           |
| 新增，可选 | `pullRefresh.*`                                       | PullRefresh 状态文案。         |
| 新增，可选 | `infiniteScroll.*`                                    | InfiniteScroll 状态文案。      |

`common` 在 3.x 中只保留：

```ts
common: {
	noData: string;
	done: string;
}
```

推荐基于当前内置语言包覆盖需要定制的部分，这样后续新增字段时更容易升级：

```ts
import { zh_CN, type LangProps } from 'stdf/lang';

export const locale: LangProps = {
	...zh_CN,
	common: {
		...zh_CN.common,
		noData: '暂时没有内容'
	},
	signature: {
		clearText: '清除',
		confirmText: '保存'
	},
	imagePreview: {
		loadFailedText: '图片加载失败'
	},
	imageList: {
		uploadFailedText: '图片上传失败',
		pendingText: '等待上传'
	},
	pullRefresh: {
		pullingText: '下拉刷新',
		canReleaseText: '释放立即刷新',
		refreshingText: '刷新中……',
		successText: '刷新成功'
	},
	infiniteScroll: {
		loadingText: '加载中……',
		finishedText: '没有更多了',
		errorText: '加载失败，点击重试'
	}
};
```

## 6. 组件内置图标库

3.x 统一了组件内部 SVG，并提供 `remix`、`lucide`、`phosphor`、`tabler`、`iconoir` 和 `reicon` 6 套内置图标库。默认使用 `remix`，不需要配置即可保持原有风格。

如需切换，可以通过 `ConfigProvider` 设置：

```svelte
<ConfigProvider builtInIconLibrary="lucide">
	<App />
</ConfigProvider>
```

图标库列表、标签和类型从新的 `stdf/svg` 入口导入：

```ts
import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from 'stdf/svg';
```

此配置只影响 STDF 组件内部的图标。业务代码中已有的 `<Icon type="symbol">`、`<Icon type="iconify">`、`path` 配置和 SVG Symbol 文件不需要因此修改。

## 7. 公开导入路径与组件 API

2.x 的公开导入路径在 3.x 中继续有效：

| 用途              | 导入路径          | 是否需要修改       |
| ----------------- | ----------------- | ------------------ |
| 组件与函数式反馈  | `stdf`            | 否                 |
| 主题              | `stdf/theme`      | 否                 |
| 语言              | `stdf/lang`       | 否                 |
| 类型              | `stdf/types`      | 否                 |
| 工具方法          | `stdf/utils`      | 否                 |
| Tailwind CSS 扫描 | `stdf/source.css` | 3.x 新增，必须引入 |
| 内置 SVG 数据     | `stdf/svg`        | 3.x 新增，按需使用 |

不要从 `@any-tdf/common/*` 导入业务 API。这个包属于内部实现，不是 STDF 应用的公开入口。

对比 `2.0.2` 与当前 3.x 的公开组件类型后，没有发现需要批量重命名的既有组件 Props。以下变化为兼容性放宽，不要求修改已有代码：

- `IndexBar` 的 `data` 和 `height` 改为可选。
- `NoticeBar` 的 `textList` 改为可选。
- `Pagination` 的 `total` 改为可选。
- 新增通用动画类型 `AnimationEasingProps`，原 `SvelteEasingProps` 仍然保留。

3.x 还新增了以下组件能力：

- `ConfigProvider`：统一配置语言和组件内置图标库。
- [PullRefresh](/components?nav=pullRefresh&tab=0)：下拉刷新。
- [InfiniteScroll](/components?nav=infiniteScroll&tab=0)：无限滚动与加载重试。

虽然公开 Props 大体兼容，但 3.x 重构了组件内部实现。如果项目使用 CSS 选择器依赖组件内部 DOM 层级，或对内部 class、完整 HTML 快照做了断言，需要重新检查这些非公开实现细节。通过公开 Props、Snippet 和 `injClass` 定制的代码通常不需要调整。

## 8. 更新脚手架命令

`create-stdf` 已整合为 `create-any-tdf`。这不会影响已有项目运行，但 README、团队文档或初始化脚本中的旧命令应更新。

2.x：

```sh
bun create stdf@latest
```

3.x：

```sh
bun create any-tdf@alpha stdf-app -f svelte
```

不要为了升级已有项目重新运行脚手架。脚手架只用于创建新项目，已有项目按本文逐项修改即可。

## 迁移检查清单

- [ ] 将 `stdf` 升级到 3.x，并保持 Svelte 5、Tailwind CSS 4。
- [ ] 在入口 CSS 中引入 `stdf/source.css`，删除 STDF 专用的手动 `@source` 路径。
- [ ] 将内置主题名 `STDF` 改为 `ANYTDF`。
- [ ] 迁移 `localStorage`、服务端配置或 URL 中持久化的 `STDF` 主题值。
- [ ] 如果使用完整自定义语言包，更新 `LangProps` 字段。
- [ ] 根据需要使用 `ConfigProvider` 统一语言和内置图标库。
- [ ] 使用函数式反馈 API 时，确认应用中仍然只挂载一个 `<Feedback />`。
- [ ] 检查依赖组件内部 DOM 或 class 的自定义样式与测试。
- [ ] 执行项目的类型检查、构建和关键页面回归测试。

相关文档：[快速上手](/guide)、[主题配置](/guide/theme)、[国际化](/guide/internation)、[图标](/guide/icon)和[函数式反馈](/guide/feedback)。
