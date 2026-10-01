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

## 更新机制

这些目录不发布到 npm，`package.json` 仅用于私有工作区维护。推荐通过 `skills` 工具安装 GitHub 子目录，后续按项目级或用户级更新：

```sh
npx skills update stdf rtdf vtdf -p
npx skills update stdf rtdf vtdf -g
```

只能更新该工具追踪的安装。手工复制和 `$skill-installer` 下载不会自动同步远程仓库；更新时需要获取完整目录并保留本地定制。目录的内容哈希用于判断变化，无需提高组件库或私有工作区的版本。详见各 Skill 的 README 和 `references/updates.md`。

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

实现相关的英文指南也从 `content/{stdf,rtdf,vtdf}/guide` 同步到各 Skill 的 `references/guides`，指南索引记录对应组件库版本。生成检查可以阻止指南更新但 Skill 未同步的情况。

各 Skill 的 `test` 还会验证目录名、Frontmatter、引用路径、Codex 元数据、组件索引、主题数据和主题生成脚本。
