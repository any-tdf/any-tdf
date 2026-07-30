# RTDF Color System

Use this reference when designing or reviewing RTDF colors, including content from the documentation site's non-Markdown color page.

## Color Groups

RTDF color system has four groups:

- Theme colors: `primary` for light mode and `dark` for dark mode.
- Functional colors: `success`, `warning`, `error`, and `info`.
- Neutral colors: black, white, gray 50 to 950, and transparent.
- Extended colors: optional decorative or supporting colors with aliases.

## Theme Colors

Theme colors are the most frequently used brand or accent colors. RTDF intentionally separates light-mode and dark-mode theme colors:

- `primary` is optimized for light surfaces.
- `dark` is optimized for dark surfaces.

RTDF recommends using different hues for light and dark mode when it improves visual clarity. Matching hues are allowed if the product needs strict brand consistency.

## Gradient Palette

RTDF follows Tailwind color naming:

- `primary-50` to `primary-500` are lighter than the base color.
- `primary` is the default 600 color.
- `primary-700` to `primary-950` are darker than the base color.
- The same pattern applies to `dark`.

The generator algorithm uses OKLCH. Lighter steps increase lightness and reduce chroma. Darker steps reduce lightness and slightly increase chroma. Hue shifts by small steps based on warm or cool hue ranges.

## Background Colors

Use four background levels in each mode:

- `bg-base`: page base background.
- `bg-surface`: card or container surface.
- `bg-overlay`: popup, modal, or floating layer background.
- `bg-highlight`: selected or highlighted element background.
- `bg-base-dark`, `bg-surface-dark`, `bg-overlay-dark`, and `bg-highlight-dark`: dark-mode equivalents.

## Text Colors

Use four text color variables:

- `text-primary`: text on light backgrounds.
- `text-dark`: text on dark backgrounds.
- `text-on-primary`: text on `primary`.
- `text-on-dark`: text on `dark`.

Check contrast when custom colors are generated manually. The theme generator evaluates contrast for `primary` on white and `dark` on black.

## Functional Colors

Functional colors are semantic state colors:

- `success`: positive, completed, or confirmed states.
- `warning`: caution or reminder states.
- `error`: failure, destructive, or dangerous states.
- `info`: neutral help or information states.

Random theme generation uses hue ranges close to green for success, orange for warning, red for error, and blue for info.

## Neutral And Opacity Usage

Neutral variables include black, white, gray 50 to 950, and transparent. For transparent overlays, use OKLCH alpha syntax such as `oklch(0 0 0 / 0.5)` or Tailwind opacity utilities backed by theme variables.

## Extended Colors

Extended colors are optional. Use them for decorative, supporting, brand, mood, or scene-specific accents. Prefer aliases such as `blue`, `purple`, `brand`, or domain names over anonymous names such as `extend0`.

In `@theme`, extended colors are simple CSS variables:

```css
@theme {
	--color-blue: oklch(0.6 0.2 250);
	--color-purple: oklch(0.6 0.2 300);
}
```

## Generator Script

Use the bundled script for reliable theme output:

```sh
bun skill/scripts/generate-theme.mjs --preset ANYTDF --format both
bun skill/scripts/generate-theme.mjs --random --seed 1 --name MyTheme --format plugin
bun skill/scripts/generate-theme.mjs --primary "oklch(0.52 0.24 35)" --dark "oklch(0.72 0.18 250)" --format both
```
