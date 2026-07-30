## AI Skill

### 介绍

VTDF 已提供面向 AI Agent 的 Skill 包，用于让支持 Skill 的编码代理更准确地理解 VTDF 项目。这个 Skill 会把 VTDF 的组件 API、组件指南、主题配置、色彩系统、图标、国际化和脚手架说明打包成离线资料，避免 AI 在只有 npm `vtdf` 包的项目里找不到仓库文档。

### 包位置

- 包名：`vtdf-skill`
- Skill 名称：`vtdf`
- 触发命令：`$vtdf`
- 目录：`packages/vtdf-skill`

### 安装到 Codex

`vtdf-skill` 是给 Agent 使用的知识包，不是应用运行时依赖。普通项目不要执行 `bun add vtdf-skill`。

在仓库内可以把 Skill 目录复制到 Codex 的 Skills 目录：

```sh
mkdir -p ~/.codex/skills
cp -R packages/vtdf-skill/skill ~/.codex/skills/vtdf
```

### 包含内容

- `skill/SKILL.md`：Skill 入口和资料路由。
- `skill/references/project.md`：项目搭建、入口 CSS 和依赖说明。
- `skill/references/components.md`：组件索引。
- `skill/references/components/`：组件离线文档，包含英文指南、API、FAQ 和版本信息。
- `skill/references/theme.md`：亮暗模式、多主题和运行时切换。
- `skill/references/color.md`：色彩系统和主题生成说明。
- `skill/references/icons.md`：SVG Symbol 和 Iconify 图标方案。
- `skill/references/i18n.md`：`ConfigProvider` 国际化说明。
- `skill/references/scaffold.md`：`create-any-tdf` 脚手架说明。
- `skill/scripts/generate-theme.mjs`：生成 `@plugin "vtdf/theme"` 和 `@theme` 配置。
- `skill/data/themes.json`：42 套共享内置主题数据。

### 维护命令

组件文档或主题数据更新后，可以重新生成 Skill 资料：

```sh
cd packages/vtdf-skill
bun run generate:components
bun run generate:themes
bun run validate
bun run test:theme
```
