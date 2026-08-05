## 介绍

感谢你使用并关注 VTDF。

VTDF 是 Any TDF monorepo 中面向 Vue 3 的组件库。仓库还包含共享核心、STDF、RTDF、三个框架的 Demo 与文档站、构建工具、项目生成器、VS Code 扩展和离线 AI Skills。我们欢迎组件、文档、测试、工具、示例及翻译方面的贡献。

## 反馈问题与参与讨论

- 提交前请先搜索现有的 [GitHub Issues](https://github.com/any-tdf/any-tdf/issues) 和 [GitHub Discussions](https://github.com/any-tdf/any-tdf/discussions)，确认问题或提案没有被重复记录。
- 可复现的 Bug 和明确的功能需求请提交到 GitHub Issues；使用问题、较大的设计提案和实现思路请优先在 GitHub Discussions 中讨论。
- 报告 Bug 时，请注明受影响的包及版本、Vue 和浏览器版本、运行环境、最小复现、实际结果与预期结果。界面问题请尽量附上截图或录屏。

## 了解仓库结构

| 路径                                                | 职责                                                 |
| --------------------------------------------------- | ---------------------------------------------------- |
| `packages/common`                                   | 框架无关的状态推导、主题、语言、SVG 数据和公共类型。 |
| `packages/vtdf`                                     | Vue 组件渲染、生命周期、事件、slots 和组合式逻辑。   |
| `packages/stdf`、`packages/rtdf`                    | Svelte 和 React 的框架原生实现。                     |
| `apps/vtdf-demo`                                    | VTDF 组件 Demo、交互、SSR 和框架一致性验证。         |
| `apps/vtdf-site`                                    | VTDF 文档站实现。                                    |
| `apps/site-common`                                  | 三个文档站的共享代码及组件文档源文件。               |
| `content/vtdf/guide`                                | VTDF 指南内容，包括当前页面。                        |
| `content/vtdf/components`                           | 由共享组件文档源生成的站点内容，请勿直接修改。       |
| `packages/create-any-tdf`、`packages/vite-plugin-*` | 项目生成器和构建插件。                               |
| `packages/*-motion`、`packages/*-confetti`          | React 和 Vue 的动效及彩带包。                        |
| `packages/skills`、`extensions`、`scripts`          | 离线 AI Skills、VS Code 扩展及仓库级工具。           |

框架无关的行为应优先放在 `packages/common`。Vue 专属的 DOM、生命周期、事件、slots、组合式逻辑和渲染应保留在 `packages/vtdf`。如果修改会影响共享组件行为，请同时检查 STDF、RTDF 和 VTDF 的实现、Demo、文档及一致性验证。

## 本地开发

仓库使用 Bun Workspaces、Turborepo、Changesets 和单一根锁文件。开始前请安装 Git、Bun 1.3.14 或更高版本，以及 Node.js 24 或更高版本。

所有安装和任务命令都应在仓库根目录执行：

```sh
git clone https://github.com/any-tdf/any-tdf.git
cd any-tdf
bun install --frozen-lockfile
bun run dev:vtdf
```

`bun run dev:vtdf` 会同时启动 VTDF 文档站和 Demo：

- 文档站：`http://localhost:5553`
- Demo：`http://localhost:8886`

查看 Demo 时，建议将浏览器开发者工具切换为移动端模式。也可以使用 [在线 VTDF Demo](https://stackblitz.com/github/any-tdf/any-tdf?startScript=dev%3Avtdf) 调试。

## 修改代码和文档

### 组件与 Demo

- 先确认改动属于 `packages/common` 还是 `packages/vtdf`，并优先复用仓库中已有的实现模式。
- 修改可观察的组件行为时，请同步更新 `apps/vtdf-demo` 中对应的 Demo 和验证脚本。
- 涉及共享能力时，应保持三个框架的公共能力和行为一致，同时保留各框架原生的 API。

### 文档与生成内容

- 组件文档的源文件位于 `apps/site-common/docs/component-docs`。通用内容放在 `shared`，VTDF 专属内容放在 `targets/vtdf`。
- `content/vtdf/components` 是生成结果，请勿直接编辑。修改组件文档后运行：

```sh
bun run --filter @any-tdf/site-common docs:generate
bun run docs:check
```

- 指南内容位于 `content/vtdf/guide`，需要同时维护中文 `.md` 和英文 `_en.md` 文件。
- 修改生成器或生成源时，请额外运行 `bun run generate:check`，并检查所有生成差异。

### Changeset

如果改动影响公共 npm 包的行为、API、依赖或包内容，请在仓库根目录运行 `bun run changeset`。Changeset 摘要使用英文，并按实际归属选择包：共享行为选择 `@any-tdf/common`，Vue 专属实现选择 `vtdf`。仅修改站点、Demo、测试或仓库文档通常不需要 Changeset。

## 验证修改

优先运行与改动范围最接近的检查。VTDF 组件改动通常至少需要执行：

```sh
bun run --filter vtdf check
bun run --filter vtdf test
bun run --filter @any-tdf/vtdf-demo check
bun run --filter @any-tdf/vtdf-demo verify:workspace
bun run --filter @any-tdf/vtdf-site check
bun run --filter @any-tdf/vtdf-site verify:site
```

修改 `packages/common` 时，还应运行该包的 `check` 和 `test`，并验证所有受影响的框架 Demo。涉及浏览器交互或布局时，请运行对应 workspace 的 `verify:browser`。跨多个区域的修改在提交前应视范围补充执行 `bun run check`、`bun run test` 和 `bun run verify`。

## 提交 Pull Request

1. Fork [Any TDF](https://github.com/any-tdf/any-tdf)，从最新的 `main` 分支创建功能分支。
2. 保持 Pull Request 聚焦于一个问题或一组紧密相关的改动，不要混入无关格式化或生成差异。
3. 同步更新需要的测试、Demo、中英文档和 Changeset，并完成与改动范围匹配的验证。
4. 在 Pull Request 描述中说明改动原因、影响范围和实际运行的验证命令；界面改动请附上截图或录屏。
5. 关联对应的 Issue 或 Discussion。通过 CI 和 Review 后，维护者会合并改动并按发布流程处理版本。
