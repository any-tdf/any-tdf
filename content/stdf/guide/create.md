# create-any-tdf

`create-any-tdf` 通过 `-f svelte` 创建 STDF 项目，默认模板为 `sktt`，所有模板均使用 TypeScript。

## 使用

```sh
bun create any-tdf my-app -f svelte -t sktt -b lucide
bun create any-tdf my-app -f svelte -t vstt -b tabler
```

## 参数

| 参数                           | 默认值                                   | 说明                                                                                                         |
| ------------------------------ | ---------------------------------------- | ------------------------------------------------------------------------------------------------------------ |
| `-f / --framework`             | 非交互模式必填                           | `svelte`、`react` 或 `vue`。                                                                                 |
| `-t / --template`              | 当前框架的第一个模板                     | 按 framework 筛选后的模板名称。                                                                              |
| `-l / --language`              | `en_US`                                  | 提示语言。                                                                                                   |
| `-i / --icon-usage`            | `svg-symbol`                             | `svg-symbol`、`iconify`、`both` 或 `none`。兼容旧值 `any-tdf-icon`。                                         |
| `-m / --theme-mode`            | `multi`                                  | `single`、`multi` 或 `all`。                                                                                 |
| `-b / --built-in-icon-library` | `default`                                | `default`、`remix`、`lucide`、`phosphor`、`tabler`、`iconoir` 或 `reicon`。同时支持 `--builtInIconLibrary`。 |
| `-p / --package-manager`       | 自动识别调用所用包管理器，未识别时为 bun | bun、npm、pnpm 或 yarn。                                                                                     |

`default` 会按当前组件默认值初始化为 `remix`。

## 模板

| 模板 | 技术栈                                            |
| ---- | ------------------------------------------------- |
| sktt | SvelteKit、Tailwind CSS 4、TypeScript，默认模板。 |
| skut | SvelteKit、UnoCSS、TypeScript。                   |
| vstt | Vite、Svelte、Tailwind CSS 4、TypeScript。        |
| vsut | Vite、Svelte、UnoCSS、TypeScript。                |

所有模板都是 TypeScript 项目。Tailwind CSS v4 和 UnoCSS 都支持。
