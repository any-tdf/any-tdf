## 2.0.2 <font size=1>2026-06-04</font>

- Fixed TimePicker component, please see [TimePicker](https://stdf.design/components?nav=timePicker&tab=4).

## 2.0.1 <font size=1>2026-01-23</font>

- Component directory updates: AvatarGroup and ButtonGroup moved to dedicated directories with updated export paths.
- Feedback component rename: `FeedbackContainer` renamed to `Feedback`, with updated imports and usage.
- Icon build update: switched to `@any-tdf/vite-plugin-svg-symbol`, removed `rollup-plugin-stdf-icon` dependency.

## 2.0.0 <font size=1>2026-01-22</font>

- New components: [Accordion](https://stdf.design/components?nav=accordion&tab=0), [ActionPopover](https://stdf.design/components?nav=actionPopover&tab=0), [Alert](https://stdf.design/components?nav=alert&tab=0), [AvatarGroup](https://stdf.design/components?nav=avatarGroup&tab=0), [ButtonGroup](https://stdf.design/components?nav=buttonGroup&tab=0), [Card](https://stdf.design/components?nav=card&tab=0), [CharRoll](https://stdf.design/components?nav=charRoll&tab=0), [CodeInput](https://stdf.design/components?nav=codeInput&tab=0), [ColorPicker](https://stdf.design/components?nav=colorPicker&tab=0), [CountDown](https://stdf.design/components?nav=countDown&tab=0), [Feedback](https://stdf.design/components?nav=feedback&tab=0), [FullKeyboard](https://stdf.design/components?nav=fullKeyboard&tab=0), [ImageList](https://stdf.design/components?nav=imageList&tab=0), [ImagePreview](https://stdf.design/components?nav=imagePreview&tab=0), [List](https://stdf.design/components?nav=list&tab=0), [Signature](https://stdf.design/components?nav=signature&tab=0), [Tag](https://stdf.design/components?nav=tag&tab=0), [Tooltip](https://stdf.design/components?nav=tooltip&tab=0).
- New capability: [Feedback](https://stdf.design/components?nav=feedback&tab=0) API (toast, showAlert, dialog, modal, loading).
- Optimized components: [ActionSheet](https://stdf.design/components?nav=actionSheet&tab=4), [AsyncPicker](https://stdf.design/components?nav=asyncPicker&tab=4), [Avatar](https://stdf.design/components?nav=avatar&tab=4), [Badge](https://stdf.design/components?nav=badge&tab=4), [BottomSheet](https://stdf.design/components?nav=bottomSheet&tab=4), [Button](https://stdf.design/components?nav=button&tab=4), [Calendar](https://stdf.design/components?nav=calendar&tab=4), [Cell](https://stdf.design/components?nav=cell&tab=4), [CellGroup](https://stdf.design/components?nav=cell&tab=4), [Form](https://stdf.design/components?nav=form&tab=4), [Icon](https://stdf.design/components?nav=icon&tab=4), [IndexBar](https://stdf.design/components?nav=indexBar&tab=4), [Input](https://stdf.design/components?nav=input&tab=4), [NoticeBar](https://stdf.design/components?nav=noticeBar&tab=4), [NumKeyboard](https://stdf.design/components?nav=numKeyboard&tab=4), [Pagination](https://stdf.design/components?nav=pagination&tab=4), [Picker](https://stdf.design/components?nav=picker&tab=4), [Placeholder](https://stdf.design/components?nav=placeholder&tab=4), [Popup](https://stdf.design/components?nav=popup&tab=4), [Progress](https://stdf.design/components?nav=progress&tab=4), [Skeleton](https://stdf.design/components?nav=skeleton&tab=4), [Slider](https://stdf.design/components?nav=slider&tab=4), [Stepper](https://stdf.design/components?nav=stepper&tab=4), [Steps](https://stdf.design/components?nav=steps&tab=4), [Swiper](https://stdf.design/components?nav=swiper&tab=4), [Switch](https://stdf.design/components?nav=switch&tab=4), [Tabs](https://stdf.design/components?nav=tabs&tab=4), [TimePicker](https://stdf.design/components?nav=timePicker&tab=4), [Toast](https://stdf.design/components?nav=toast&tab=4).
- Breaking change: `theme` switching upgraded to Tailwind CSS plugin `stdf/theme` with `data-theme` attribute, 42 built-in themes provided by plugin, more configurable options supported, removed old JS theme objects, see [Theme Guide](https://stdf.design/guide/theme).
- Breaking change: `mode` switching upgraded to `data-mode` attribute, removed `darkMode`, added `switchMode` and `getMode`, see [Theme Guide](https://stdf.design/guide/theme).
- New methods: `stdf/theme` exports `switchTheme`, `switchMode`, `getTheme`, `getMode`, `generateColorScale` methods.
- Site optimization: Refactored homepage, theme generator, color guide pages to adapt to new theme and mode switching.
- Upgrade guide: For upgrading from v1 to v2, please see [Upgrade Guide](https://stdf.design/guide/upgrade).

## 1.2.0 <font size=1>2025-11-07</font>

- Enhanced Input component, please see [Input](https://stdf.design/components?nav=input&tab=4).
- Added Form component, please see [Form](https://stdf.design/components?nav=form&tab=0)

## 1.1.1 <font size=1>2025-05-31</font>

- Fixed Avatar component, please see [Avatar](https://stdf.design/components?nav=avatar&tab=4).
- Optimized NoticeBar component, please see [NoticeBar](https://stdf.design/components?nav=noticeBar&tab=4).
- Optimized Stepper component, please see [Stepper](https://stdf.design/components?nav=stepper&tab=4).

## 1.1.0 <font size=1>2025-05-26</font>

- Enhanced Button component, please see [Button](https://stdf.design/components?nav=button&tab=4).
- Enhanced Icon component, support Iconify, built-in svg, please see [Guide - Icon](https://stdf.design/guide/icon) and [Icon](https://stdf.design/components?nav=icon&tab=4).
- Fixed Avatar component, please see [Avatar](https://stdf.design/components?nav=avatar&tab=4).
- Optimized NoticeBar component, please see [NoticeBar](https://stdf.design/components?nav=noticeBar&tab=4).

## 1.0.8 <font size=1>2025-05-04</font>

- Fixed Grids component, please see [Grids](https://stdf.design/components?nav=grids&tab=4).

## 1.0.7 <font size=1>2025-04-30</font>

- Fixed some type errors.
- Fixed `id_ID` language file error.

## 1.0.6 <font size=1>2025-04-27</font>

- Fixed Input component, please see [Input](https://stdf.design/components?nav=input&tab=4).

## 1.0.5 <font size=1>2025-04-27</font>

- Fixed Input component, please see [Input](https://stdf.design/components?nav=input&tab=4).

## 1.0.4 <font size=1>2025-04-26</font>

- Enhanced Input component, please see [Input](https://stdf.design/components?nav=input&tab=4).
- Enhanced Button component, please see [Button](https://stdf.design/components?nav=button&tab=4).
- Added missing language files.
- Fixed type export error.

## 1.0.3 <font size=1>2025-04-07</font>

- Full support for Svelte v5, Tailwind CSS v4, and TypeScript, including libraries, demos, create-stdf, and site.
- Rebuilt the library according to Svelte official CLI [sv create](https://svelte.dev/docs/cli/sv-create).
- Enhanced NavBar component, please see [NavBar](https://stdf.design/components?nav=navBar&tab=4).
- Fixed Cell component, please see [Cell](https://stdf.design/components?nav=cell&tab=4).
- Enhanced NumKeyboard component, please see [NumKeyboard](https://stdf.design/components?nav=numKeyboard&tab=4).
- Rewrote Checkbox, Radio, etc. components, modified some component APIs, please check when upgrading.
- Added type to document component API.
- Following Tailwind CSS v4, the color system of document site, theme generator, component library, etc. uses oklch, refer to [Tailwind CSS](https://tailwindcss.com/docs/colors).

## 1.0.0 <font size=1>2025-04-07</font>

- Upgrade to 1.x version, refactor project structure.
