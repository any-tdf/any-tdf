## 3.0.0-alpha.0 <font size=1>2026-07-27</font>

- 破坏性升级：调整发布包目录结构，主题、多语言、类型和工具方法统一通过 `stdf`、`stdf/theme`、`stdf/lang`、`stdf/types`、`stdf/utils` 暴露。
- Tailwind CSS 配置收口：应用侧只需要扫描 `@source "../node_modules/stdf/dist";`，不再需要扫描公共包目录。
- 脚手架更新：Tailwind 模板只显式安装和配置 `stdf`。
- 文档更新：快速开始、兼容性和升级指南已切换到 `3.0.0` 版本说明。

## 2.0.2 <font size=1>2026-06-04</font>

- 修复 TimePicker 组件，详见 [时间选择器 TimePicker](https://stdf.dev/components?nav=timePicker&tab=4)。

## 2.0.1 <font size=1>2026-01-23</font>

- 组件目录调整：AvatarGroup 和 ButtonGroup 独立目录并修正导出路径。
- 反馈组件更名： `FeedbackContainer` 更名为 `Feedback`，更新导入与引用。
- 图标构建更新：改用 `@any-tdf/vite-plugin-svg-symbol`，移除 `rollup-plugin-stdf-icon` 依赖。

## 2.0.0 <font size=1>2026-01-22</font>

- 新增组件： [手风琴 Accordion](https://stdf.dev/components?nav=accordion&tab=0)、 [操作气泡 ActionPopover](https://stdf.dev/components?nav=actionPopover&tab=0)、 [弹窗提示 Alert](https://stdf.dev/components?nav=alert&tab=0)、 [头像组 AvatarGroup](https://stdf.dev/components?nav=avatarGroup&tab=0)、 [按钮组 ButtonGroup](https://stdf.dev/components?nav=buttonGroup&tab=0)、 [卡片 Card](https://stdf.dev/components?nav=card&tab=0)、 [字符滚动 CharRoll](https://stdf.dev/components?nav=charRoll&tab=0)、 [码输入框 CodeInput](https://stdf.dev/components?nav=codeInput&tab=0)、 [颜色选择器 ColorPicker](https://stdf.dev/components?nav=colorPicker&tab=0)、 [倒计时 CountDown](https://stdf.dev/components?nav=countDown&tab=0)、 [函数式反馈 Feedback](https://stdf.dev/components?nav=feedback&tab=0)、 [全键盘 FullKeyboard](https://stdf.dev/components?nav=fullKeyboard&tab=0)、 [图片列表 ImageList](https://stdf.dev/components?nav=imageList&tab=0)、 [图片预览 ImagePreview](https://stdf.dev/components?nav=imagePreview&tab=0)、 [列表 List](https://stdf.dev/components?nav=list&tab=0)、 [签名 Signature](https://stdf.dev/components?nav=signature&tab=0)、 [标签 Tag](https://stdf.dev/components?nav=tag&tab=0)、 [文字提示 Tooltip](https://stdf.dev/components?nav=tooltip&tab=0)。
- 新增能力：[函数式反馈 Feedback](https://stdf.dev/components?nav=feedback&tab=0) API（toast、showAlert、dialog、modal、loading）。
- 优化组件： [操作面板 ActionSheet](https://stdf.dev/components?nav=actionSheet&tab=4)、 [异步选择器 AsyncPicker](https://stdf.dev/components?nav=asyncPicker&tab=4)、 [头像 Avatar](https://stdf.dev/components?nav=avatar&tab=4)、 [徽标 Badge](https://stdf.dev/components?nav=badge&tab=4)、 [底部浮窗 BottomSheet](https://stdf.dev/components?nav=bottomSheet&tab=4)、 [按钮 Button](https://stdf.dev/components?nav=button&tab=4)、 [日历 Calendar](https://stdf.dev/components?nav=calendar&tab=4)、 [单元格 Cell](https://stdf.dev/components?nav=cell&tab=4)、 [单元格组 CellGroup](https://stdf.dev/components?nav=cell&tab=4)、 [表单 Form](https://stdf.dev/components?nav=form&tab=4)、 [图标 Icon](https://stdf.dev/components?nav=icon&tab=4)、 [索引栏 IndexBar](https://stdf.dev/components?nav=indexBar&tab=4)、 [输入框 Input](https://stdf.dev/components?nav=input&tab=4)、 [通告栏 NoticeBar](https://stdf.dev/components?nav=noticeBar&tab=4)、 [数字键盘 NumKeyboard](https://stdf.dev/components?nav=numKeyboard&tab=4)、 [分页 Pagination](https://stdf.dev/components?nav=pagination&tab=4)、 [选择器 Picker](https://stdf.dev/components?nav=picker&tab=4)、 [占位符 Placeholder](https://stdf.dev/components?nav=placeholder&tab=4)、 [弹出层 Popup](https://stdf.dev/components?nav=popup&tab=4)、 [进度条 Progress](https://stdf.dev/components?nav=progress&tab=4)、 [骨架屏 Skeleton](https://stdf.dev/components?nav=skeleton&tab=4)、 [滑块 Slider](https://stdf.dev/components?nav=slider&tab=4)、 [步进器 Stepper](https://stdf.dev/components?nav=stepper&tab=4)、 [步骤条 Steps](https://stdf.dev/components?nav=steps&tab=4)、 [轮播 Swiper](https://stdf.dev/components?nav=swiper&tab=4)、 [开关 Switch](https://stdf.dev/components?nav=switch&tab=4)、 [标签页 Tabs](https://stdf.dev/components?nav=tabs&tab=4)、 [时间选择器 TimePicker](https://stdf.dev/components?nav=timePicker&tab=4)、 [轻提示 Toast](https://stdf.dev/components?nav=toast&tab=4)。
- 破坏性升级：`theme` 切换方式升级为 Tailwind CSS 插件 `stdf/theme` 与 `data-theme` 属性，内置 42 套主题由插件提供，支持更多可配置项，移除旧的 JS 主题对象，详见 [主题指南](https://stdf.dev/guide/theme)。
- 破坏性升级：`mode` 切换方式升级为 `data-mode` 属性，移除 `darkMode`，新增 `switchMode` 与 `getMode`，详见 [主题指南](https://stdf.dev/guide/theme)。
- 新增方法：`stdf/theme` 导出 `switchTheme`、`switchMode`、`getTheme`、`getMode`、`generateColorScale` 方法。
- 站点优化：重构首页、主题生成器、颜色指南等页面，适配新的主题与模式切换方式。
- 升级指南：此版本对应历史 v1 到 v2 迁移，当前升级指南面向 v2 到 v3。

## 1.2.0 <font size=1>2025-11-07</font>

- 增强 Input 组件，详见 [Input](https://stdf.dev/components?nav=input&tab=4)。
- 新增 Form 组件，详见 [Form](https://stdf.dev/components?nav=form&tab=0)

## 1.1.1 <font size=1>2025-05-31</font>

- 修复 Avatar 组件，详见 [Avatar](https://stdf.dev/components?nav=avatar&tab=4)。
- 优化 NoticeBar 组件，详见 [NoticeBar](https://stdf.dev/components?nav=noticeBar&tab=4)。
- 优化 Stepper 组件，详见 [Stepper](https://stdf.dev/components?nav=stepper&tab=4)。

## 1.1.0 <font size=1>2025-05-26</font>

- 增强 Button 组件，详见 [Button](https://stdf.dev/components?nav=button&tab=4)。
- 增强 Icon 组件，支持 Iconify，组件内置 svg，详见 [指南 - 图标](https://stdf.dev/guide/icon) 和 [Icon](https://stdf.dev/components?nav=icon&tab=4)。
- 修复 Avatar 组件，详见 [Avatar](https://stdf.dev/components?nav=avatar&tab=4)。
- 优化 NoticeBar 组件，详见 [NoticeBar](https://stdf.dev/components?nav=noticeBar&tab=4)。

## 1.0.8 <font size=1>2025-05-04</font>

- 修复 Grids 组件，详见 [Grids](https://stdf.dev/components?nav=grids&tab=4)。

## 1.0.7 <font size=1>2025-04-30</font>

- 修复部分类型错误。
- 修复 `id_ID` 语言文件错误。

## 1.0.6 <font size=1>2025-04-27</font>

- 修复 Input 组件，详见 [Input](https://stdf.dev/components?nav=input&tab=4)。

## 1.0.5 <font size=1>2025-04-27</font>

- 修复 Input 组件，详见 [Input](https://stdf.dev/components?nav=input&tab=4)。

## 1.0.4 <font size=1>2025-04-26</font>

- 增强 Input 组件，详见 [Input](https://stdf.dev/components?nav=input&tab=4)。
- 增强 Button 组件，详见 [Button](https://stdf.dev/components?nav=button&tab=4)。
- 补充遗漏的语言文件。
- 修复类型导出错误。

## 1.0.3 <font size=1>2025-04-07</font>

- 完整支持 Svelte v5、Tailwind CSS v4 与 TypeScript，包括库、示例、create-any-tdf、站点。
- 按照 Svelte 官方 CLI [sv create](https://svelte.dev/docs/cli/sv-create) 重构库文件。
- 增强 NavBar 组件，详见 [NavBar](https://stdf.dev/components?nav=navBar&tab=4)。
- 修复 Cell 组件，详见 [Cell](https://stdf.dev/components?nav=cell&tab=4)。
- 增强 NumKeyboard 组件，详见 [NumKeyboard](https://stdf.dev/components?nav=numKeyboard&tab=4)。
- 重写 Checkbox、Radio 等组件，修改部分组件 API，升级时请注意检查。
- 文档组件 API 增加类型。
- 跟随 Tailwind CSS v4，文档站点、主题生成器、组件库等颜色系统统一使用 oklch，参考 [Tailwind CSS](https://tailwindcss.com/docs/colors)。

## 1.0.0 <font size=1>2025-04-07</font>

- 升级至 1.x 版本，重构项目结构。
