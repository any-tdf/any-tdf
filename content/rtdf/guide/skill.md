## AI Skill

### 介绍

RTDF 提供符合开放 Agent Skills 格式的 AI Skill，帮助编码代理使用准确的 RTDF 组件 API、React 用法、Tailwind CSS 4 主题、图标、国际化和脚手架约定。Skill 会按需加载离线资料，普通 RTDF 项目不需要同时克隆整个 Monorepo。

这个 Skill 是 Agent 知识包，不是应用运行时依赖。不要执行 `bun add rtdf-skill`。

### 仓库信息

- Skill 名称：`rtdf`
- 显式触发：`$rtdf`
- GitHub 仓库：`https://github.com/any-tdf/any-tdf`
- Skill 目录：`packages/skills/rtdf-skill/rtdf`
- 格式：`SKILL.md`、`references/`、`scripts/`、`data/` 和可选的 `agents/openai.yaml`

目录名与 `SKILL.md` 中的 `name: rtdf` 保持一致，可被兼容 Agent Skills 的客户端直接识别。

### Codex 安装

在 Codex 中调用内置安装器：

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill/rtdf
```

安装器会从 GitHub 子目录下载完整 Skill。安装完成后，在下一轮任务中使用 `$rtdf`；如果客户端没有立即显示新 Skill，请重新加载或重启客户端。

### 通用 Agent 安装

支持标准项目级目录的客户端，可以把 Skill 放到项目的 `.agents/skills`：

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p your-project/.agents/skills
cp -R any-tdf/packages/skills/rtdf-skill/rtdf your-project/.agents/skills/
```

用户级共享可以复制到 `~/.agents/skills/`。如果客户端使用其他搜索目录，也应复制完整的 `rtdf` 目录，不要只复制 `SKILL.md`，否则组件资料和主题脚本无法使用。

### 与组件文档的关联

组件资料由正式文档源生成，不是单独手写：

```text
apps/site-common/docs/component-docs
  -> content/rtdf/components
  -> packages/skills/rtdf-skill/rtdf/references/components
```

每个组件详情会合并对应的英文指南、API、FAQ 和版本文档。AI 先读取 `references/components.md` 索引，再只加载任务涉及的 `references/components/<nav>.md`，因此组件 API 有明确来源，同时避免一次加载全部文档。

仓库的 `generate:skills:check` 会逐文件校验这条链路。组件文档更新但 Skill 未重新生成时，检查会失败。

实现相关的英文指南会从 `content/rtdf/guide` 自动同步到 Skill 的 `references/guides`，包含快速开始、兼容性、主题、图标、国际化、脚手架、反馈、工具函数和 Vite 插件。指南索引记录组件库版本。

### 使用方式

```text
$rtdf 使用 RTDF 的 Button、Toast 和 Form 编写一个 React 登录页，并核对每个组件的 API。
```

```text
$rtdf Generate a random RTDF theme and return both the @plugin and @theme blocks.
```

Skill 会先确认项目中的 RTDF 版本，再读取任务所需资料。涉及组件时必须读取对应详情文件，不应根据组件名称猜测 Props、回调、Children、Render Function 或公开方法。

### 主题生成

Skill 内置 `scripts/generate-theme.mjs`，支持内置主题、自定义 OKLCH 主色和随机主题。AI 会相对于 `SKILL.md` 定位脚本，不依赖用户项目中存在仓库路径。

```text
$rtdf 使用 ANYTDF 预设生成完整主题配置。
```

生成结果可包含 `@plugin "rtdf/theme/plugin"`、`@theme` 或 JSON。

### 安装与更新

推荐使用 `skills` 工具管理安装来源及更新。`skills` 工具通过 npm 运行，但组件库 Skill 本身从 GitHub 下载，不是 npm 包。

```sh
npx skills add https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill/rtdf -a codex
npx skills update rtdf -p
```

上面的命令安装和更新项目级 Skill。用户级安装添加 `-g`，更新使用 `npx skills update rtdf -g`。其他客户端按实际情况选择 `-a`，例如 `claude-code` 或 `cursor`。

工具记录来源仓库、子目录及内容哈希。组件资料、指南或脚本发生变化都会影响整个 Skill 目录的哈希，不需要发布 npm 或同步提高组件库版本。保留安装工具的锁文件；项目级锁文件可随项目提交。安装工具创建的符号链接指向本地副本，仍需要执行更新命令。

手工复制或通过 `$skill-installer` 下载的是本地快照，不会自动跟随 GitHub 更新。更新时从同一来源获取完整目录，保留本地定制，并替换旧目录，避免残留已删除的文件。不要假定重复运行安装器可以覆盖已有目录。若直接链接到维护中的本地仓库，拉取仓库后即可读取更新后的文件。

Codex 会自动识别本地 Skill 的变化；没有显示更新时可重启 Codex。其他客户端的搜索目录和刷新行为以其文档为准。当前对话已经读取的旧说明可能仍在上下文中，验证新说明时应重新读取 Skill，或开始新任务。`SKILL.md` 的 `metadata.version` 只是自定义信息，不会自动拉取远程文件，也不保证刷新对话上下文。

参考：[Agent Skills 规范](https://agentskills.io/specification)、[Codex Skill 加载说明](https://learn.chatgpt.com/docs/build-skills)、[skills 工具](https://github.com/vercel-labs/skills)。

### 维护

维护者从 Monorepo 根目录运行：

```sh
bun run --filter rtdf-skill generate
bun run --filter rtdf-skill test
```

处理全部 3 个组件库时运行：

```sh
bun run generate:skills
bun run generate:skills:check
```
