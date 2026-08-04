# VTDF alpha 版本指南

VTDF 0.0.1-alpha.0 是首个 alpha 预发布版本。本版本确立了包目录和公开入口：主题、多语言、类型、工具方法和 UI 组件能力都从 `vtdf` 这一套包导出。应用代码不需要、也不应该直接安装或引用 `@any-tdf/common`。

## 核心变化

- 公开安装包只有 `vtdf`。
- 组件从 `vtdf` 导入。
- 主题能力从 `vtdf/theme` 导入。
- 多语言能力从 `vtdf/lang` 导入。
- 类型从 `vtdf/types` 导入。
- Tailwind CSS 只需要扫描 `vtdf/dist`。
- 旧的公共包直连路径不再作为用户 API 兼容。

## 1. 安装依赖

```sh
bun add vtdf@0.0.1-alpha.0
```

如果项目的 `package.json` 里直接写了 `@any-tdf/common`，请移除它。`@any-tdf/common` 仍然可能作为内部实现依赖被包管理器安装，但业务项目不要显式依赖它。

## 2. 更新 Tailwind CSS 扫描源

旧写法：

```css
@source "../node_modules/vtdf/dist";
@source "../node_modules/@any-tdf/common/dist";
```

当前写法：

```css
@source "../node_modules/vtdf/dist";
```

VTDF 0.0.1-alpha.0 的发布产物已经包含组件和公共能力需要扫描的 class 来源，不需要额外扫描公共包目录。

## 3. 更新主题插件路径

如果项目仍在使用公共包主题插件：

```css
@plugin "@any-tdf/common/theme" {
	name: 'VTDF, Sage, GoldWood';
}
```

请改为：

```css
@plugin "vtdf/theme" {
	name: 'VTDF, Sage, GoldWood';
}
```

## 4. 更新代码导入

| 旧导入                  | 当前导入     |
| ----------------------- | ------------ |
| `@any-tdf/common/theme` | `vtdf/theme` |
| `@any-tdf/common/lang`  | `vtdf/lang`  |
| `@any-tdf/common/types` | `vtdf/types` |
| `@any-tdf/common/utils` | `vtdf/utils` |

示例：

```ts
import { switchMode, switchTheme, themes } from 'vtdf/theme';
import { zh_CN } from 'vtdf/lang';
import type { ThemeOptions } from 'vtdf/theme';
```

组件仍然从主入口导入：

```vue
<script setup lang="ts">
import { Button, Toast } from 'vtdf';
</script>
```

## 5. 不再兼容的使用方式

以下写法不再作为用户侧兼容目标：

- 从 `@any-tdf/common/*` 直接导入主题、多语言、类型或工具方法。
- 在应用 CSS 中扫描 `../node_modules/@any-tdf/common/dist`。
- 在应用 CSS 中使用 `@plugin "@any-tdf/common/theme"`。
- 在业务代码里依赖公共包内部的 `derived`、`svg` 或其他实现目录。

如果之前依赖了公共包内部能力，请改为使用 `vtdf` 暴露的组件、主题、多语言、类型和工具方法。

## 迁移检查清单

- [ ] 安装 `vtdf@0.0.1-alpha.0`。
- [ ] 从项目依赖中移除直接声明的 `@any-tdf/common`。
- [ ] 删除 CSS 中的 `@source "../node_modules/@any-tdf/common/dist";`。
- [ ] 将主题插件改为 `@plugin "vtdf/theme"`。
- [ ] 将 `@any-tdf/common/*` 导入改为 `vtdf/*` 导入。
- [ ] 重新运行项目，检查主题、暗色模式、多语言和常用组件。
