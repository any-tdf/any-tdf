# Any TDF for VS Code

Hover and completion support for STDF, RTDF, and VTDF components.

## Features

- Detects the nearest `package.json` and enables the matching library only when it declares `stdf`, `rtdf`, or `vtdf`.
- Shows bundled component API documentation, installed and latest package versions, demos, guides, and source links on hover.
- Completes component properties, events, children, snippets, and Vue slots with framework-specific syntax.
- Supports Chinese and English API documentation through the `AnyTDF.English` setting.
- Covers public child components such as `CellGroup`, `CheckboxItem`, `Grid`, `RadioItem`, `Tab`, `TabContent`, and `Avatars` where exported.

## Language support

Language services remain external to this project. The extension manifest declares the official dependencies below so VS Code can install and manage them:

- STDF: [Svelte for VS Code](https://marketplace.visualstudio.com/items?itemName=svelte.svelte-vscode)
- VTDF: [Vue - Official](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

RTDF uses the JavaScript and TypeScript language support built into VS Code.

## Activation

The extension is active only when the current Svelte, JSX, TSX, or Vue file belongs to a package that depends on the corresponding TDF library. Monorepos and nested packages are supported by searching upward for the nearest matching `package.json`.

## License

Any TDF for VS Code is released under the [MIT License](https://github.com/any-tdf/any-tdf/blob/main/LICENSE).
