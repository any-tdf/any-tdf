## AI Skill

### 介绍

STDF 提供符合开放 Agent Skills 格式的 AI Skill，帮助编码代理使用准确的 STDF 组件 API、Svelte 5 用法、Tailwind CSS 4 主题、图标、国际化和脚手架约定。Skill 会按需加载离线资料，普通 STDF 项目不需要同时克隆整个 Monorepo。

这个 Skill 是 Agent 知识包，不是应用运行时依赖。不要执行 `bun add stdf-skill`。

### 仓库信息

- Skill 名称：`stdf`
- 显式触发：`$stdf`
- GitHub 仓库：`https://github.com/any-tdf/any-tdf`
- Skill 目录：`packages/skills/stdf-skill/stdf`
- 格式：`SKILL.md`、`references/`、`scripts/`、`data/` 和可选的 `agents/openai.yaml`

目录名与 `SKILL.md` 中的 `name: stdf` 保持一致，可被兼容 Agent Skills 的客户端直接识别。

### Codex 安装

在 Codex 中调用内置安装器：

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill/stdf
```

安装器会从 GitHub 子目录下载完整 Skill。安装完成后，在下一轮任务中使用 `$stdf`；如果客户端没有立即显示新 Skill，请重新加载或重启客户端。

### 通用 Agent 安装

支持标准项目级目录的客户端，可以把 Skill 放到项目的 `.agents/skills`：

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p your-project/.agents/skills
cp -R any-tdf/packages/skills/stdf-skill/stdf your-project/.agents/skills/
```

用户级共享可以复制到 `~/.agents/skills/`。如果客户端使用其他搜索目录，也应复制完整的 `stdf` 目录，不要只复制 `SKILL.md`，否则组件资料和主题脚本无法使用。

### 与组件文档的关联

组件资料由正式文档源生成，不是单独手写：

```text
apps/site-common/docs/component-docs
  -> content/stdf/components
  -> packages/skills/stdf-skill/stdf/references/components
```

每个组件详情会合并对应的英文指南、API、FAQ 和版本文档。AI 先读取 `references/components.md` 索引，再只加载任务涉及的 `references/components/<nav>.md`，因此组件 API 有明确来源，同时避免一次加载全部文档。

仓库的 `generate:skills:check` 会逐文件校验这条链路。组件文档更新但 Skill 未重新生成时，检查会失败。

### 使用方式

```text
$stdf 使用 STDF 的 Button、Toast 和 Form 编写一个 Svelte 5 登录页，并核对每个组件的 API。
```

```text
$stdf Generate a random STDF theme and return both the @plugin and @theme blocks.
```

Skill 会先确认项目中的 STDF 版本，再读取任务所需资料。涉及组件时必须读取对应详情文件，不应根据组件名称猜测 Props、事件、Snippet 或公开方法。

### 主题生成

Skill 内置 `scripts/generate-theme.mjs`，支持内置主题、自定义 OKLCH 主色和随机主题。AI 会相对于 `SKILL.md` 定位脚本，不依赖用户项目中存在仓库路径。

```text
$stdf 使用 ANYTDF 预设生成完整主题配置。
```

生成结果可包含 `@plugin "stdf/theme"`、`@theme` 或 JSON。

### 维护

维护者从 Monorepo 根目录运行：

```sh
bun run --filter stdf-skill generate
bun run --filter stdf-skill test
```

处理全部 3 个组件库时运行：

```sh
bun run generate:skills
bun run generate:skills:check
```
