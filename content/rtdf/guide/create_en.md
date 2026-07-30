# create-any-tdf

`create-any-tdf` is the unified any-tdf scaffolding command. Select the `react` framework to create an RTDF React project:

```sh
bun create any-tdf@latest my-app -f react
```

The quick command defaults to `vrtt`, `svg-symbol`, `multi`, `default` built-in icon library, and `bun`. `default` initializes the project with the current default, `remix`.

Create a Tailwind CSS v4 project:

```sh
bun create any-tdf@latest my-app -f react -t vrtt -l en_US -i both -m all -b lucide
```

Create an UnoCSS project:

```sh
bun create any-tdf@latest my-app -f react -t vrut -l en_US -i both -m all -b lucide
```

## Template Presets

| Short name | Template                                    | Description     |
| ---------- | ------------------------------------------- | --------------- |
| `vrtt`     | Vite & React & Tailwind CSS v4 & TypeScript | Default         |
| `vrut`     | Vite & React & UnoCSS & TypeScript          | TypeScript only |

## Options

| Option                         | Default                          | Description                                                          |
| ------------------------------ | -------------------------------- | -------------------------------------------------------------------- |
| `-`                            | -                                | Project name, passed directly.                                       |
| `-f / --framework`             | required in non-interactive mode | `svelte`, `react`, or `vue`. Use `react` for RTDF.                   |
| `-t / --template`              | `vrtt`                           | Template to use.                                                     |
| `-l / --language`              | `en_US`                          | Prompt language.                                                     |
| `-i / --icon-usage`            | `svg-symbol`                     | Icon usage mode. Also accepts legacy `any-tdf-icon`.                 |
| `-m / --theme-mode`            | `multi`                          | Theme mode.                                                          |
| `-b / --built-in-icon-library` | `default`                        | Initial built-in icon library. Also supports `--builtInIconLibrary`. |

## Icon Usage

| Short name   | Description                                                                                           |
| ------------ | ----------------------------------------------------------------------------------------------------- |
| `svg-symbol` | Use `@any-tdf/vite-plugin-svg-symbol` for SVG symbols.                                                |
| `iconify`    | Use Iconify icon sets. Tailwind CSS v4 uses `@iconify/tailwind4`; UnoCSS uses `@unocss/preset-icons`. |
| `both`       | Configure both SVG Symbol and Iconify.                                                                |
| `none`       | Do not configure an icon solution. Configure it later.                                                |

The generated demo also supports switching RTDF built-in icon libraries from the theme panel.

## Built-in Icon Library

| Short name | Description                        |
| ---------- | ---------------------------------- |
| `default`  | Use RTDF default, currently Remix. |
| `remix`    | Remix Icon.                        |
| `lucide`   | Lucide.                            |
| `phosphor` | Phosphor Icons.                    |
| `tabler`   | Tabler Icons.                      |
| `iconoir`  | Iconoir.                           |
| `reicon`   | Reicon.                            |

## Theme Mode

| Short name | Description                                              |
| ---------- | -------------------------------------------------------- |
| `single`   | Generate only the baseline ANYTDF theme.                 |
| `multi`    | Generate the ANYTDF, Sage, and GoldWood built-in themes. |
| `all`      | Generate all 42 built-in themes.                         |
