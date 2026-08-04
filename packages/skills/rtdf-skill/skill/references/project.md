# RTDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- RTDF targets React 18 or React 19.
- RTDF expects Tailwind CSS 4.
- Use `bun` commands by default.
- Package import: `rtdf`.
- Theme runtime helpers import: `rtdf/theme`.
- Tailwind CSS theme plugin path: `rtdf/theme/plugin`.
- Locale imports: `rtdf/lang`.

## Create A Project

Recommended:

```sh
bun create any-tdf@alpha my-app -f react
```

Manual Vite React project setup:

```sh
bun create vite my-app --template react-ts
cd my-app
bun add rtdf
bun add tailwindcss @tailwindcss/vite -D
```

## Required Entry CSS

In the application entry CSS, import Tailwind, configure dark mode, declare theme variables, and point Tailwind source detection at RTDF component classes:

```css
@import 'tailwindcss';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));

@theme {
	--color-primary: oklch(0.467 0.296 264.886);
	--color-dark: oklch(0.845 0.153 80.597);
	--color-success: oklch(0.704 0.142 167.084);
	--color-warning: oklch(0.558 0.154 47.186);
	--color-error: oklch(0.564 0.223 28.46);
	--color-info: oklch(0.482 0.14 261.518);
	--radius-box: 0.5rem;
	--radius-form: 0.25rem;
	--radius-small: calc(infinity * 1px);
}

@source "../node_modules/rtdf/dist";
```

For production work, use the complete color variables from `references/theme.md` or generate them with `skill/scripts/generate-theme.mjs`.

## Basic Component Usage

```tsx
import { Button } from 'rtdf';

const App = () => <Button>Click me</Button>;

export default App;
```

## Implementation Notes

- Keep RTDF app-wide theme variables in the project entry CSS file.
- Use `@source "../node_modules/rtdf/dist";` so Tailwind CSS 4 can detect RTDF package classes.
- Do not introduce arbitrary Tailwind value classes when a shared token is appropriate.
