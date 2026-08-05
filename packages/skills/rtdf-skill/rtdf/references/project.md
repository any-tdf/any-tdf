# RTDF Project Setup

Use this reference for installation, entry CSS, and minimal usage.

## Stack

- RTDF targets React 18 or React 19.
- RTDF expects Tailwind CSS 4 when the application builds its theme CSS.
- Use `bun` commands by default.
- Package import: `rtdf`.
- Theme runtime helpers: `rtdf/theme`.
- Tailwind theme plugin: `rtdf/theme/plugin`.
- Locale imports: `rtdf/lang`.
- Tailwind source registration: `rtdf/source.css`.

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

Import Tailwind and `rtdf/source.css`, then configure dark mode. The package source file registers RTDF and its shared dependency without hard-coded `node_modules` paths:

```css
@import 'tailwindcss';
@import 'rtdf/source.css';

@custom-variant dark (&:where([data-mode=dark], [data-mode=dark] *):not(:where([data-mode=light], [data-mode=light] *):not([data-mode=dark], [data-mode=dark] *)));
```

Append a complete theme configuration generated from the skill root. Do not replace it with an abbreviated token block because RTDF components use the full primary, dark, background, text, functional, neutral, and radius namespaces.

```sh
bun scripts/generate-theme.mjs --preset ANYTDF --format both
```

If the application consumes the package's prebuilt CSS instead of compiling RTDF classes with Tailwind, import `rtdf/style.css` once in the application entry and preserve the project's existing theme strategy.

## Basic Component Usage

```tsx
import { Button } from 'rtdf';

const App = () => <Button>Click me</Button>;

export default App;
```

## Implementation Notes

- Keep RTDF app-wide theme variables in the project entry CSS file.
- Import `rtdf/source.css` instead of hard-coding paths into `node_modules` when the application compiles its own Tailwind CSS.
- Do not introduce arbitrary Tailwind value classes when a shared token is appropriate.
