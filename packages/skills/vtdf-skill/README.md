# vtdf-skill

`vtdf-skill` 是面向 AI Agent 的 VTDF Skill 源码包。它遵循开放的 Agent Skills 目录格式，并额外提供 Codex 的 `agents/openai.yaml` 元数据。Skill 会按需加载 VTDF 的组件、主题、色彩、图标、国际化和脚手架资料，不是应用运行时依赖，也不发布到 npm。目录中的 `package.json` 是私有工作区维护配置。

## 目录结构

- `vtdf/SKILL.md`：Skill 入口，名称和目录名均为 `vtdf`，可使用 `$vtdf` 显式触发。
- `vtdf/agents/openai.yaml`：Codex 展示信息和默认提示。
- `vtdf/references/`：按主题拆分的离线资料。
- `vtdf/references/components/`：每个组件独立的英文指南、API、FAQ 和版本文档。
- `vtdf/scripts/generate-theme.mjs`：可移植的 VTDF 主题生成脚本。
- `vtdf/data/themes.json`：从共享主题源码生成的 42 套内置主题。

## 组件文档关联

组件资料不是手工维护的副本。生成链路如下：

```text
apps/site-common/docs/component-docs
  -> content/vtdf/components
  -> packages/skills/vtdf-skill/vtdf/references/components
```

`apps/site-common/docs/component-docs` 是组件文档源。站点生成器先生成 VTDF 站点使用的 `content/vtdf/components`，Skill 生成器再把每个组件的 `guide_en.md`、`api_en.md`、`FAQ_en.md` 和 `version_en.md` 合并成单独的离线详情文件。AI 先读取组件索引，再只加载任务涉及的组件详情，避免把全部组件文档放入上下文。

实现相关的英文站点指南也会从 `content/vtdf/guide` 生成到 `vtdf/references/guides`，覆盖快速开始、兼容性、主题、图标、国际化、脚手架、反馈、工具函数和 Vite 插件。指南索引记录组件库版本，便于判断资料适用范围。

根级 `generate:skills:check` 和 Skill 测试会逐文件比较生成结果，组件文档更新后未同步 Skill 会直接失败。

## 推荐安装

### Codex

在 Codex 中直接调用内置安装器：

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill/vtdf
```

安装器会从 GitHub 子目录安装并使用目录名 `vtdf`。安装后在下一轮任务中使用 `$vtdf`。

### 通用 Agent Skills 客户端

项目级安装适合团队随仓库共享：

```sh
mkdir -p .agents/skills
cp -R /path/to/any-tdf/packages/skills/vtdf-skill/vtdf .agents/skills/
```

用户级安装适合在多个项目中复用：

```sh
mkdir -p ~/.agents/skills
cp -R /path/to/any-tdf/packages/skills/vtdf-skill/vtdf ~/.agents/skills/
```

若客户端使用其他 Skill 搜索目录，把完整的 `vtdf` 目录复制到该目录即可，不要只复制 `SKILL.md`。

## 安装与更新

推荐使用 `skills` 工具管理安装来源及更新。`skills` 工具通过 npm 运行，但组件库 Skill 本身从 GitHub 下载，不是 npm 包。

```sh
npx skills add https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill/vtdf -a codex
npx skills update vtdf -p
```

上面的命令安装和更新项目级 Skill。用户级安装添加 `-g`，更新使用 `npx skills update vtdf -g`。其他客户端按实际情况选择 `-a`，例如 `claude-code` 或 `cursor`。

工具记录来源仓库、子目录及内容哈希。组件资料、指南或脚本发生变化都会影响整个 Skill 目录的哈希，不需要发布 npm 或同步提高组件库版本。保留安装工具的锁文件；项目级锁文件可随项目提交。安装工具创建的符号链接指向本地副本，仍需要执行更新命令。

手工复制或通过 `$skill-installer` 下载的是本地快照，不会自动跟随 GitHub 更新。更新时从同一来源获取完整目录，保留本地定制，并替换旧目录，避免残留已删除的文件。不要假定重复运行安装器可以覆盖已有目录。若直接链接到维护中的本地仓库，拉取仓库后即可读取更新后的文件。

Codex 会自动识别本地 Skill 的变化；没有显示更新时可重启 Codex。其他客户端的搜索目录和刷新行为以其文档为准。当前对话已经读取的旧说明可能仍在上下文中，验证新说明时应重新读取 Skill，或开始新任务。`SKILL.md` 的 `metadata.version` 只是自定义信息，不会自动拉取远程文件，也不保证刷新对话上下文。

参考：[Agent Skills 规范](https://agentskills.io/specification)、[Codex Skill 加载说明](https://learn.chatgpt.com/docs/build-skills)、[skills 工具](https://github.com/vercel-labs/skills)。

## 维护与验证

从 Monorepo 根目录运行：

```sh
bun run --filter vtdf-skill generate
bun run --filter vtdf-skill test
```

也可以统一处理 3 个组件库：

```sh
bun run generate:skills
bun run generate:skills:check
```

维护脚本需要 Node.js 18.18 或更高版本。安装后的 Skill 不需要加载 Vue 运行时即可读取资料或运行主题脚本。

## 相关链接

- [VTDF 官网](https://vtdf.dev)
- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/skills/vtdf-skill)
- [问题反馈](https://github.com/any-tdf/any-tdf/issues)

`vtdf-skill` 遵循根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)。
