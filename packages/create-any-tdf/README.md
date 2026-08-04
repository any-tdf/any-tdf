# create-any-tdf

Unified scaffolding CLI for creating STDF, RTDF, and VTDF TypeScript projects.

`create-any-tdf` is the project generator for the Any TDF component family. It creates framework-native starter applications without requiring this Monorepo at runtime.

## Usage

```sh
bun create any-tdf@alpha
bun create any-tdf my-app -f svelte -t sktt -b lucide
bun create any-tdf my-app -f react -t vrut -b phosphor
bun create any-tdf my-app -f vue -t vrtt -b tabler
```

The CLI requires Node.js 20.19 or newer, or Node.js 22.12 or newer. Generated projects may use Bun, npm, pnpm, or Yarn, while this repository uses Bun for development and verification. Yarn users need Yarn Berry (>= 2): the Svelte and Vue templates declare `npm:` alias dependencies that Yarn classic (1.x) cannot install — use Yarn Berry, or pick npm, pnpm, or Bun instead.

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
| `--local-packages`             | disabled                         | Workspace root containing local STDF, RTDF, VTDF, and shared packages. Intended for repository validation.        |

`default` initializes the generated project with the current component default, `remix`.

## Templates

| Framework     | Templates                      |
| ------------- | ------------------------------ |
| Svelte / STDF | `sktt`, `skut`, `vstt`, `vsut` |
| React / RTDF  | `vrtt`, `vrut`                 |
| Vue / VTDF    | `vrtt`, `vrut`                 |

All templates are TypeScript projects. Tailwind CSS and UnoCSS are both supported.

## Local source validation

The CLI only writes registry versions that really exist. Until the current alpha packages are published, validate the templates against this repository with:

```sh
bun run verify:templates
```

For one project, pass the workspace root explicitly:

```sh
bun run dist/index.js ../my-app -f react -t vrtt --local-packages ../..
```

## Links

- [STDF](https://stdf.dev)
- [RTDF](https://rtdf.dev)
- [VTDF](https://vtdf.dev)
- [Source](https://github.com/any-tdf/any-tdf/tree/main/packages/create-any-tdf)
- [Issues](https://github.com/any-tdf/any-tdf/issues)

## License

`create-any-tdf` is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
