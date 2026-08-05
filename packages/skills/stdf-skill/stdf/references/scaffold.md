# create-any-tdf Scaffolding

Use this reference when creating an STDF application with `create-any-tdf`.

## Recommended Command

```sh
bun create any-tdf@alpha my-app -f svelte
```

Direct creation with options:

```sh
bun create any-tdf@alpha my-app -f svelte -t sktt -l zh_CN -i iconify -m multi -b lucide
```

## Options

| Option                          | Default                          | Meaning                                       |
| ------------------------------- | -------------------------------- | --------------------------------------------- |
| positional                      | -                                | Project name                                  |
| `-f`, `--framework`             | required in non-interactive mode | Framework, use `svelte` for STDF              |
| `-t`, `--template`              | `sktt`                           | Template preset                               |
| `-l`, `--language`              | `en_US`                          | Prompt language                               |
| `-i`, `--icon-usage`            | `svg-symbol`                     | Icon setup, legacy `any-tdf-icon` is accepted |
| `-m`, `--theme-mode`            | `multi`                          | Theme mode                                    |
| `-b`, `--built-in-icon-library` | `default`                        | Initial built-in icon library                 |

## Template Presets

| Preset | Template                              | Status |
| ------ | ------------------------------------- | ------ |
| `sktt` | SvelteKit + Tailwind + TypeScript     | Ready  |
| `skut` | SvelteKit + UnoCSS + TypeScript       | Ready  |
| `vstt` | Vite + Svelte + Tailwind + TypeScript | Ready  |
| `vsut` | Vite + Svelte + UnoCSS + TypeScript   | Ready  |

## Icon Usage Presets

| Preset       | Meaning                                                      |
| ------------ | ------------------------------------------------------------ |
| `svg-symbol` | Use `@any-tdf/vite-plugin-svg-symbol` for SVG symbol sprites |
| `iconify`    | Use Iconify with Tailwind CSS 4 or UnoCSS                    |
| `both`       | Configure both SVG symbol sprites and Iconify                |
| `none`       | Leave icon setup manual                                      |

## Theme Mode Presets

| Preset   | Meaning                                                     |
| -------- | ----------------------------------------------------------- |
| `single` | Initial `ANYTDF` theme only, with custom themes added later |
| `multi`  | Built-in `ANYTDF`, `Sage`, and `GoldWood` themes            |
| `all`    | All 42 built-in themes                                      |

## Built-in Icon Library Presets

`default`, `remix`, `lucide`, `phosphor`, `tabler`, `iconoir`, and `reicon` are supported. `default` writes the current default library, `remix`, into generated projects.
