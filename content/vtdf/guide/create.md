# create-any-tdf

统一的 STDF、RTDF、VTDF TypeScript 项目创建工具。

## 使用

```sh
bun create any-tdf my-app -f svelte -t sktt -b lucide
bun create any-tdf my-app -f react -t vrut -b phosphor
bun create any-tdf my-app -f vue -t vrtt -b tabler
```

## 参数

| 参数                           | 默认值               | 说明                                                                                                         |
| ------------------------------ | -------------------- | ------------------------------------------------------------------------------------------------------------ |
| `-f / --framework`             | 非交互模式必填       | `svelte`、`react` 或 `vue`。                                                                                 |
| `-t / --template`              | 当前框架的第一个模板 | 按 framework 筛选后的模板名称。                                                                              |
| `-l / --language`              | `en_US`              | 提示语言。                                                                                                   |
| `-i / --icon-usage`            | `svg-symbol`         | `svg-symbol`、`iconify`、`both` 或 `none`。兼容旧值 `any-tdf-icon`。                                         |
| `-m / --theme-mode`            | `multi`              | `single`、`multi` 或 `all`。                                                                                 |
| `-b / --built-in-icon-library` | `default`            | `default`、`remix`、`lucide`、`phosphor`、`tabler`、`iconoir` 或 `reicon`。同时支持 `--builtInIconLibrary`。 |
| `-p / --package-manager`       | `bun`                | `bun`、`npm`、`pnpm` 或 `yarn`。                                                                             |

`default` 会按当前组件默认值初始化为 `remix`。

## 模板

| 框架          | 模板                           |
| ------------- | ------------------------------ |
| Svelte / STDF | `sktt`、`skut`、`vstt`、`vsut` |
| React / RTDF  | `vrtt`、`vrut`                 |
| Vue / VTDF    | `vrtt`、`vrut`                 |

所有模板都是 TypeScript 项目。Tailwind CSS v4 和 UnoCSS 都支持。
