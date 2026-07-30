## 介绍

感谢你使用 VTDF。

以下是关于向 VTDF 提交反馈或代码的指南。在向 VTDF 提交 issue 或者 PR 之前，请先花几分钟时间阅读以下内容。

## Issue 规范

- 遇到问题时，请先确认这个问题是否已经在 issue 中有记录或者已被修复。
- 提 issue 时，请用简短的语言描述遇到的问题，并添加出现问题时的环境和复现步骤。

## 本地开发

仓库使用 Bun Workspaces 和单一根锁文件。开始前请安装 Git、Bun 1.3.14 或更高版本，以及 Node.js 24 或更高版本。

所有安装和任务命令都在仓库根目录执行：

```sh
git clone git@github.com:any-tdf/any-tdf.git
cd any-tdf
bun install --frozen-lockfile
bun run dev:vtdf
```

启动成功后，可在浏览器中打开 `http://localhost:8886` 查看 Demo，请将浏览器开发者工具切换为移动端模式。

VTDF 组件源码位于 `packages/vtdf/src/lib/components`，对应的 Demo 位于 `apps/vtdf-demo`。修改源码后，开发服务器会实时更新。

提交 PR 前，请在仓库根目录执行：

```sh
bun run check
bun run test
```

如果不想本地开发，可以使用 [VTDF Demo](https://stackblitz.com/github/any-tdf/any-tdf?startScript=dev%3Avtdf) 进行在线调试。

## 提交 PR

如果你是第一次在 GitHub 上提 Pull Request，可以阅读下面这两篇文章来学习：

- [第一次参与开源](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### 流程

- 请先 fork 一份 [Any TDF](https://github.com/any-tdf/any-tdf) 代码到自己的仓库，如果已经 fork 过，请同步主仓库的最新代码。
- 克隆你的仓库至本地。
- 修改组件源码并验证通过。
- 「可选」补充此次修改的中英文档，文档位于 `content/vtdf/components` 目录下。根据具体修改内容可能需要修改 API、FAQ、Guide、Version 等文档。对 Version 的修改请增加 Tag，具体参考 [VTDF Version Tag](https://github.com/any-tdf/any-tdf/blob/main/content/vtdf/components/button/version.md?plain=1)。
- 如果修改会影响发布包，请执行 `bun run changeset` 添加 Changeset。
- 在仓库根目录使用 Bun 安装依赖，并通过 `bun run dev:vtdf` 验证 Demo。
- 提交修改内容至你的仓库，然后提 Pull Request 到主仓库。
- Pull Request 会在 Review 通过后被合并到主仓库，后续发布新版。

### 注意事项

在提交 Pull Request 时，请注意：

- 保持你的 PR 足够小，一般一个 PR 只解决单个组件文件，解决单个问题或添加单个功能，以便于 Review。
- 当新增组件或者修改原有组件时，记得在 Demo 中验证通过，保证代码的稳定。
- 在 PR 中请添加合适的描述，如果有关联 Issue，请注明一下。
