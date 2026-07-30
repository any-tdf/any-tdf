# stdf-skill

`stdf-skill` 是给 AI 代理使用的 STDF 技能包。它把 STDF 的组件、主题、色彩、国际化、脚手架和图标方案整理成可按需读取的 Skill 资料，并提供一个主题生成脚本。

## 内容

- `skill/SKILL.md`：Skill 入口，触发名为 `$stdf`。
- `skill/references/`：STDF 专题资料。
- `skill/references/components/`：每个组件的离线详情，包含对应组件的指南、API、FAQ 和版本文档。
- `skill/scripts/generate-theme.mjs`：生成 `@plugin "stdf/theme"` 与 `@theme` 配置。
- `skill/data/themes.json`：从 STDF 主题插件抽取的 42 套内置主题。

## 手动安装

本包不自动写入用户目录。安装后可以把 `skill` 目录复制或链接到 AI 工具支持的 Skills 目录，并命名为 `stdf`。

```sh
bun add stdf-skill
```

Codex 示例：

```sh
mkdir -p ~/.codex/skills
cp -R skill ~/.codex/skills/stdf
```

## 主题脚本

```sh
bun skill/scripts/generate-theme.mjs --preset STDF --format both
bun skill/scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun skill/scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

可用格式：`plugin`、`theme`、`both`、`json`。

## 维护

```sh
bun run generate:components
bun run generate:themes
bun run validate
```

`stdf-skill` 的维护脚本需要 Node.js 18.18 或更高版本，不需要在目标项目中加载 Svelte 运行时。

## 相关链接

- [STDF 官网](https://stdf.dev)
- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill)
- [问题反馈](https://github.com/any-tdf/any-tdf/issues)

## 开源协议

`stdf-skill` 基于根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE) 发布。
