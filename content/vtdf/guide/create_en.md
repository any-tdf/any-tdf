# create-any-tdf

Unified scaffolding CLI for creating STDF, RTDF, and VTDF TypeScript projects.

## Usage

```sh
bun create any-tdf my-app -f svelte -t sktt -b lucide
bun create any-tdf my-app -f react -t vrut -b phosphor
bun create any-tdf my-app -f vue -t vrtt -b tabler
```

## Options

| Option                         | Default                          | Description                                                                                                       |
| ------------------------------ | -------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| `-f / --framework`             | required in non-interactive mode | `svelte`, `react`, or `vue`.                                                                                      |
| `-t / --template`              | first framework template         | Template name filtered by framework.                                                                              |
| `-l / --language`              | `en_US`                          | Prompt language.                                                                                                  |
| `-i / --icon-usage`            | `svg-symbol`                     | `svg-symbol`, `iconify`, `both`, or `none`. Also accepts legacy `any-tdf-icon`.                                   |
| `-m / --theme-mode`            | `multi`                          | `single`, `multi`, or `all`.                                                                                      |
| `-b / --built-in-icon-library` | `default`                        | `default`, `remix`, `lucide`, `phosphor`, `tabler`, `iconoir`, or `reicon`. Also supports `--builtInIconLibrary`. |
| `-p / --package-manager`       | `bun`                            | `bun`, `npm`, `pnpm`, or `yarn`.                                                                                  |

`default` initializes the generated project with the current component default, `remix`.

## Templates

| Framework     | Templates                      |
| ------------- | ------------------------------ |
| Svelte / STDF | `sktt`, `skut`, `vstt`, `vsut` |
| React / RTDF  | `vrtt`, `vrut`                 |
| Vue / VTDF    | `vrtt`, `vrut`                 |

All templates are TypeScript projects. Tailwind CSS v4 and UnoCSS are both supported.
