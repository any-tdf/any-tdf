## Introduction

Thank you for using VTDF.

Below are guidelines for submitting feedback or code to VTDF. Please take a few minutes to read through this content before submitting an issue or PR to VTDF.

## Issue Guidelines

- When encountering a problem, please first confirm whether this issue has already been recorded or fixed in existing issues.
- When submitting an issue, please use concise language to describe the problem encountered, and include the environment and steps to reproduce the issue.

## Local Development

The repository uses Bun Workspaces with one root lockfile. Install Git, Bun 1.3.14 or later, and Node.js 24 or later before starting.

Run all installation and task commands from the repository root:

```sh
git clone git@github.com:any-tdf/any-tdf.git
cd any-tdf
bun install --frozen-lockfile
bun run dev:vtdf
```

After the development server starts, open `http://localhost:8886` and switch the browser developer tools to mobile mode.

The VTDF component source is in `packages/vtdf/src/lib/components`, and its Demo is in `apps/vtdf-demo`. The development server updates as you modify the source.

Before submitting a PR, run these commands from the repository root:

```sh
bun run check
bun run test
```

Use [VTDF Demo](https://stackblitz.com/github/any-tdf/any-tdf?startScript=dev%3Avtdf) for online debugging if you do not want to set up the repository locally.

## Submit PR

If you are submitting your first Pull Request on GitHub, you can read the following two articles to learn:

- [First Contribution to Open Source](https://github.com/firstcontributions/first-contributions/blob/main/translations/README.zh-cn.md)
- [如何优雅地在 GitHub 上贡献代码](https://segmentfault.com/a/1190000000736629)

### Process

- Please first fork the [Any TDF](https://github.com/any-tdf/any-tdf) repository, then sync the latest code from the main repository if you already have a fork.
- Clone your repository to your local machine.
- Modify the component source code and verify it.
- (Optional) Update the Chinese and English documentation in `content/vtdf/components`. Depending on the change, you may need to update the API, FAQ, guide, or version documents. Add a tag for version changes; see the [VTDF version tags](https://github.com/any-tdf/any-tdf/blob/main/content/vtdf/components/button/version.md?plain=1).
- If the change affects a published package, run `bun run changeset` to add a Changeset.
- Install dependencies with Bun at the repository root and verify the Demo with `bun run dev:vtdf`.
- Submit the modified content to your repository, then submit a Pull Request to the main repository.
- Pull Request will be merged into the main repository after being reviewed, and a new version will be released.

### Notes

When submitting a Pull Request, please note the following:

- Keep your PR small, generally one PR solves a single component file, solves a single problem, or adds a single function, so that it is easier to review.
- When adding a new component or modifying an existing component, remember to verify it in the Demo to ensure the stability of the code.
- Please add a suitable description in the PR, if there is an associated Issue, please note it.
