# Any TDF AI Skills

本目录维护 STDF、RTDF 和 VTDF 的 3 个独立 Agent Skills。每个 Skill 都使用开放的 `SKILL.md` 目录格式，并提供 Codex 的可选 UI 元数据。

结构以 [Agent Skills specification](https://agentskills.io/specification) 为跨客户端兼容基线，并按照 [Codex Skills 文档](https://developers.openai.com/plugins/build/skills) 增加 `agents/openai.yaml`。Codex 专属元数据不会影响其他 Agent Skills 客户端读取核心 Skill。

| Skill | 框架     | 可安装目录                        | 显式触发 |
| ----- | -------- | --------------------------------- | -------- |
| STDF  | Svelte 5 | `packages/skills/stdf-skill/stdf` | `$stdf`  |
| RTDF  | React    | `packages/skills/rtdf-skill/rtdf` | `$rtdf`  |
| VTDF  | Vue 3    | `packages/skills/vtdf-skill/vtdf` | `$vtdf`  |

## 一次安装全部 Skill

在 Codex 中调用 `$skill-installer`，并提供 3 个 GitHub 子目录：

```text
$skill-installer Install these three skills from any-tdf/any-tdf:
- packages/skills/stdf-skill/stdf
- packages/skills/rtdf-skill/rtdf
- packages/skills/vtdf-skill/vtdf
```

通用 Agent Skills 客户端可以从已克隆仓库复制到项目级目录：

```sh
mkdir -p your-project/.agents/skills
cp -R packages/skills/stdf-skill/stdf your-project/.agents/skills/
cp -R packages/skills/rtdf-skill/rtdf your-project/.agents/skills/
cp -R packages/skills/vtdf-skill/vtdf your-project/.agents/skills/
```

## 文档生成链路

```text
apps/site-common/docs/component-docs
  -> content/{stdf,rtdf,vtdf}/components
  -> packages/skills/*-skill/*/references/components
```

Skill 中的组件详情是站点英文指南、API、FAQ 和版本文档的离线组合。运行以下命令生成或检查 3 套资料：

```sh
bun run generate:skills
bun run generate:skills:check
```

各 Skill 的 `test` 还会验证目录名、Frontmatter、引用路径、Codex 元数据、组件索引、主题数据和主题生成脚本。
