## AI Skill

### 介绍

STDF 提供了一个面向 AI Agent 的 Skill，用于让支持 Skill 的编码代理更准确地理解 STDF 项目。它会把 STDF 的组件 API、组件指南、主题配置、色彩系统、图标、国际化和脚手架说明打包成离线资料，避免 AI 在只有 npm `stdf` 包的项目里找不到仓库文档。

这个 Skill 不需要通过 npm 安装，也不应该作为项目运行时依赖添加。推荐从 STDF 的 GitHub 仓库安装或复制到 Agent 工具的 Skill 目录。

### 仓库信息

- GitHub 仓库：`https://github.com/any-tdf/any-tdf`
- Skill 路径：`packages/skills/stdf-skill/skill`
- Skill 名称：`stdf`
- 触发命令：`$stdf`

### Codex 安装

如果你使用的是支持安装 GitHub Skill 的 Codex，可以直接让 Codex 执行：

```txt
Install the STDF skill from https://github.com/any-tdf/any-tdf/tree/main/packages/skills/stdf-skill/skill
```

如果你使用的是本地 Skill 安装脚本，也可以按仓库和路径安装：

```sh
python ~/.codex/skills/.system/skill-installer/scripts/install-skill-from-github.py \
  --repo any-tdf/any-tdf \
  --path packages/skills/stdf-skill/skill \
  --name stdf
```

安装后重启 Codex，或者按你的 Codex 客户端要求重新加载 Skills。

### 通用 Agent 安装

不同 Agent 工具的 Skill 目录名称可能不同。若你的工具支持文件夹形式的 Skill，可以把 STDF Skill 目录复制到该工具的 Skills 目录，并将目录命名为 `stdf`。

以 Codex 默认目录为例：

```sh
git clone --depth 1 https://github.com/any-tdf/any-tdf.git
mkdir -p ~/.codex/skills/stdf
cp -R any-tdf/packages/skills/stdf-skill/skill/. ~/.codex/skills/stdf/
```

如果你的 Agent 工具没有标准 Skill 机制，可以把 `packages/skills/stdf-skill/skill/SKILL.md` 作为入口说明，把 `references` 和 `scripts` 目录作为同级资料提供给 Agent。

### 使用方式

安装后，在 STDF 项目里用 `$stdf` 触发：

```txt
$stdf 帮我用 STDF 的 Button、Toast 和 Form 写一个 Svelte 5 登录页。
```

```txt
$stdf Generate a random STDF theme and show both @plugin "stdf/theme" and @theme output.
```

AI 使用这个 Skill 时会优先读取 `SKILL.md`，再按任务需要读取 `references` 中的组件、主题、色彩、图标、国际化和脚手架资料。涉及组件 API 时，应该读取离线组件详情，不要猜测组件参数。

### 主题生成脚本

Skill 内置主题生成脚本。安装到 `~/.codex/skills/stdf` 后，可以这样运行：

```sh
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --preset STDF --format both
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun ~/.codex/skills/stdf/scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```

脚本会按 STDF 主题算法生成 `color-primary` 和 `color-dark` 的 50 到 950 色阶，并可输出 `@plugin "stdf/theme"`、`@theme` 或 JSON。

### 适用场景

- 让 AI 在 STDF 项目里选择正确组件。
- 让 AI 查询组件 API、事件和 Snippet。
- 让 AI 配置 Tailwind CSS 4、亮暗模式和多主题。
- 让 AI 生成或调整 STDF 主题。
- 让 AI 使用 STDF 图标、国际化和脚手架约定。

### 注意事项

- Skill 是给 Agent 使用的知识包，不是应用依赖。
- 不需要执行 `bun add stdf-skill`。
- 普通项目只需要安装 `stdf`、`@tailwindcss/vite`、`tailwindcss` 等运行时依赖。
- 如果从 GitHub 更新 Skill，请重新复制或重新安装 Skill 目录。
