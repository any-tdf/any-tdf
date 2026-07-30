# create-any-tdf

`create-any-tdf` 是统一的 any-tdf 脚手架命令。创建 RTDF React 项目时需要选择 `react` framework：

```sh
bun create any-tdf@latest my-app -f react
```

快速创建默认等价于 `vrtt`、`svg-symbol`、`multi`、`default` 内置图标库和 `bun`。`default` 会按当前默认值初始化为 `remix`。

创建 Tailwind CSS v4 项目：

```sh
bun create any-tdf@latest my-app -f react -t vrtt -l zh_CN -i both -m all -b lucide
```

创建 UnoCSS 项目：

```sh
bun create any-tdf@latest my-app -f react -t vrut -l zh_CN -i both -m all -b lucide
```

## 模板预设

| 简写   | 模板                                        | 描述          |
| ------ | ------------------------------------------- | ------------- |
| `vrtt` | Vite & React & Tailwind CSS v4 & TypeScript | 默认          |
| `vrut` | Vite & React & UnoCSS & TypeScript          | 仅 TypeScript |

## 命令选项

| 命令                           | 默认           | 描述                                              |
| ------------------------------ | -------------- | ------------------------------------------------- |
| `-`                            | -              | 项目名称，可以直接输入。                          |
| `-f / --framework`             | 非交互模式必填 | `svelte`、`react` 或 `vue`。RTDF 使用 `react`。   |
| `-t / --template`              | `vrtt`         | 要使用的模板。                                    |
| `-l / --language`              | `en_US`        | 提示语言。                                        |
| `-i / --icon-usage`            | `svg-symbol`   | 图标使用方式，兼容旧值 `any-tdf-icon`。           |
| `-m / --theme-mode`            | `multi`        | 主题模式。                                        |
| `-b / --built-in-icon-library` | `default`      | 初始内置图标库，同时支持 `--builtInIconLibrary`。 |

## 图标使用方式

| 简写         | 描述                                                                                                 |
| ------------ | ---------------------------------------------------------------------------------------------------- |
| `svg-symbol` | 使用 `@any-tdf/vite-plugin-svg-symbol` 管理 SVG 图标。                                               |
| `iconify`    | 使用 Iconify 图标集。Tailwind CSS v4 使用 `@iconify/tailwind4`，UnoCSS 使用 `@unocss/preset-icons`。 |
| `both`       | 同时配置 SVG Symbol 和 Iconify。                                                                     |
| `none`       | 不配置图标方案，后续自行接入。                                                                       |

生成的示例项目也支持在主题面板中切换 RTDF 内置图标库。

## 内置图标库

| 简写       | 描述                             |
| ---------- | -------------------------------- |
| `default`  | 使用 RTDF 默认值，当前为 Remix。 |
| `remix`    | Remix Icon。                     |
| `lucide`   | Lucide。                         |
| `phosphor` | Phosphor Icons。                 |
| `tabler`   | Tabler Icons。                   |
| `iconoir`  | Iconoir。                        |
| `reicon`   | Reicon。                         |

## 主题模式

| 简写     | 描述                                       |
| -------- | ------------------------------------------ |
| `single` | 只生成基础 ANYTDF 主题，后续可自行扩展。   |
| `multi`  | 生成 ANYTDF、Sage、GoldWood 3 个内置主题。 |
| `all`    | 生成全部 42 个内置主题。                   |
