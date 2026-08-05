# rtdf-skill

`rtdf-skill` 是面向 AI Agent 的 RTDF Skill 源码包。它遵循开放的 Agent Skills 目录格式，并额外提供 Codex 的 `agents/openai.yaml` 元数据。Skill 会按需加载 RTDF 的组件、主题、色彩、图标、国际化和脚手架资料，不是应用运行时依赖。

## 目录结构

- `rtdf/SKILL.md`：Skill 入口，名称和目录名均为 `rtdf`，可使用 `$rtdf` 显式触发。
- `rtdf/agents/openai.yaml`：Codex 展示信息和默认提示。
- `rtdf/references/`：按主题拆分的离线资料。
- `rtdf/references/components/`：每个组件独立的英文指南、API、FAQ 和版本文档。
- `rtdf/scripts/generate-theme.mjs`：可移植的 RTDF 主题生成脚本。
- `rtdf/data/themes.json`：从共享主题源码生成的 42 套内置主题。

## 组件文档关联

组件资料不是手工维护的副本。生成链路如下：

```text
apps/site-common/docs/component-docs
  -> content/rtdf/components
  -> packages/skills/rtdf-skill/rtdf/references/components
```

`apps/site-common/docs/component-docs` 是组件文档源。站点生成器先生成 RTDF 站点使用的 `content/rtdf/components`，Skill 生成器再把每个组件的 `guide_en.md`、`api_en.md`、`FAQ_en.md` 和 `version_en.md` 合并成单独的离线详情文件。AI 先读取组件索引，再只加载任务涉及的组件详情，避免把全部组件文档放入上下文。

根级 `generate:skills:check` 和 Skill 测试会逐文件比较生成结果，组件文档更新后未同步 Skill 会直接失败。

## 推荐安装

### Codex

在 Codex 中直接调用内置安装器：

```text
$skill-installer Install https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill/rtdf
```

安装器会从 GitHub 子目录安装并使用目录名 `rtdf`。安装后在下一轮任务中使用 `$rtdf`。

### 通用 Agent Skills 客户端

项目级安装适合团队随仓库共享：

```sh
mkdir -p .agents/skills
cp -R /path/to/any-tdf/packages/skills/rtdf-skill/rtdf .agents/skills/
```

用户级安装适合在多个项目中复用：

```sh
mkdir -p ~/.agents/skills
cp -R /path/to/any-tdf/packages/skills/rtdf-skill/rtdf ~/.agents/skills/
```

若客户端使用其他 Skill 搜索目录，把完整的 `rtdf` 目录复制到该目录即可，不要只复制 `SKILL.md`。

## 维护与验证

从 Monorepo 根目录运行：

```sh
bun run --filter rtdf-skill generate
bun run --filter rtdf-skill test
```

也可以统一处理 3 个组件库：

```sh
bun run generate:skills
bun run generate:skills:check
```

维护脚本需要 Node.js 18.18 或更高版本。安装后的 Skill 不需要加载 React 运行时即可读取资料或运行主题脚本。

## 相关链接

- [RTDF 官网](https://rtdf.dev)
- [源码](https://github.com/any-tdf/any-tdf/tree/main/packages/skills/rtdf-skill)
- [问题反馈](https://github.com/any-tdf/any-tdf/issues)

`rtdf-skill` 遵循根目录的 [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE)。
