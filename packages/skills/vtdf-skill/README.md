# vtdf-skill

`vtdf-skill` 是给 AI 代理使用的 VTDF 技能包。它把 VTDF 的组件、主题、色彩、国际化、脚手架和图标方案整理成可按需读取的 Skill 资料，并提供一个主题生成脚本。

## 内容

- `skill/SKILL.md`：Skill 入口，触发名为 `$vtdf`。
- `skill/references/`：VTDF 专题资料。
- `skill/references/components/`：每个组件的离线详情，包含对应组件的指南、API、FAQ 和版本文档。
- `skill/scripts/generate-theme.mjs`：生成 `@plugin "vtdf/theme/plugin"` 与 `@theme` 配置。
- `skill/data/themes.json`：从共享主题插件抽取的 42 套内置主题。

## 本地安装

该 Skill 随源码仓库维护，不发布到 npm。克隆仓库后，可以把 `skill` 目录复制或链接到 AI 工具支持的 Skills 目录，并命名为 `vtdf`。

```sh
mkdir -p ~/.codex/skills
cp -R packages/skills/vtdf-skill/skill ~/.codex/skills/vtdf
```

## 开发

```sh
bun run generate:components
bun run generate:themes
bun run validate
bun run test:theme
```

`vtdf-skill` 的维护脚本需要 Node.js 18.18 或更高版本，不需要在目标项目中加载 Vue 运行时。

## 相关链接

- [VTDF 官网](https://vtdf.dev)
- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill)
- [问题反馈](https://github.com/any-tdf/any-tdf/issues)

## 开源协议

`vtdf-skill` 遵循根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)。
