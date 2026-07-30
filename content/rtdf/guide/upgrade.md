# RTDF v2 升级到 v3 指南

RTDF 3.0.0-alpha.0 是破坏性版本的 alpha 版本。本次升级调整了包目录和公开入口：主题、多语言、类型、工具方法和 UI 组件能力都从 `rtdf` 这一套包导出。应用代码不需要、也不应该直接安装或引用 `@any-tdf/common`。

## 核心变化

- 公开安装包只有 `rtdf`。
- 组件从 `rtdf` 导入。
- 主题能力从 `rtdf/theme` 导入。
- 多语言能力从 `rtdf/lang` 导入。
- 类型从 `rtdf/types` 导入。
- Tailwind CSS 只需要扫描 `rtdf/dist`。
- 旧的公共包直连路径不再作为用户 API 兼容。

## 1. 升级依赖

```sh
bun add rtdf@3.0.0-alpha.0
```

如果项目的 `package.json` 里直接写了 `@any-tdf/common`，请移除它。`@any-tdf/common` 仍然可能作为内部实现依赖被包管理器安装，但业务项目不要显式依赖它。

## 2. 更新 Tailwind CSS 扫描源

旧写法：

```css
@source "../node_modules/rtdf/dist";
@source "../node_modules/@any-tdf/common/dist";
```

v3 写法：

```css
@source "../node_modules/rtdf/dist";
```

RTDF 3.0.0-alpha.0 的发布产物已经包含组件和公共能力需要扫描的 class 来源，不需要额外扫描公共包目录。

## 3. 更新主题插件路径

如果项目仍在使用公共包主题插件：

```css
@plugin "@any-tdf/common/theme" {
	name: 'RTDF, Sage, GoldWood';
}
```

请改为：

```css
@plugin "rtdf/theme" {
	name: 'RTDF, Sage, GoldWood';
}
```

## 4. 更新代码导入

| 旧导入                  | v3 导入      |
| ----------------------- | ------------ |
| `@any-tdf/common/theme` | `rtdf/theme` |
| `@any-tdf/common/lang`  | `rtdf/lang`  |
| `@any-tdf/common/types` | `rtdf/types` |
| `@any-tdf/common/utils` | `rtdf/utils` |

示例：

```ts
import { switchMode, switchTheme, themes } from 'rtdf/theme';
import { zh_CN } from 'rtdf/lang';
import type { ThemeOptions } from 'rtdf/theme';
```

组件仍然从主入口导入：

```tsx
import { Button, Toast } from 'rtdf';

const App = () => <Button>提交</Button>;
```

## 5. 不再兼容的使用方式

以下写法不再作为用户侧兼容目标：

- 从 `@any-tdf/common/*` 直接导入主题、多语言、类型或工具方法。
- 在应用 CSS 中扫描 `../node_modules/@any-tdf/common/dist`。
- 在应用 CSS 中使用 `@plugin "@any-tdf/common/theme"`。
- 在业务代码里依赖公共包内部的 `derived`、`svg` 或其他实现目录。

如果之前依赖了公共包内部能力，请改为使用 `rtdf` 暴露的组件、主题、多语言、类型和工具方法。

## 迁移检查清单

- [ ] 将 `rtdf` 升级到 `3.0.0-alpha.0`。
- [ ] 从项目依赖中移除直接声明的 `@any-tdf/common`。
- [ ] 删除 CSS 中的 `@source "../node_modules/@any-tdf/common/dist";`。
- [ ] 将主题插件改为 `@plugin "rtdf/theme"`。
- [ ] 将 `@any-tdf/common/*` 导入改为 `rtdf/*` 导入。
- [ ] 重新运行项目，检查主题、暗色模式、多语言和常用组件。
