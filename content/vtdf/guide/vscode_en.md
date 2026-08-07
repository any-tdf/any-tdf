## VS Code Plugin

### Introduction

VTDF uses the unified VS Code extension [Any TDF for VS Code](https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension), which provides component API hovers and attribute completions when developing with VTDF.

The extension supports STDF, RTDF, and VTDF in one package. When a file is opened, it searches upward from the current file directory for `package.json`, detects whether the package uses `stdf`, `rtdf`, or `vtdf`, and enables the matching component library based on the current file type.

### Installation

Search for `Any TDF for VS Code` in the VS Code extension marketplace and click install, or install [Any TDF for VS Code](https://marketplace.visualstudio.com/items?itemName=STDF.stdf-vscode-extension) from the marketplace.

It also works when the opened workspace is not the package root. As long as the current `.vue` file can find a parent `package.json` containing `vtdf`, VTDF support is enabled.

### Features

When hovering over the name of a VTDF component, the following information will be displayed:

- The API of this component.
- The demo, API, guide, and version page of this component on the VTDF site.
- The source code of this component.

![TIP](/assets/vscode/tip.png)

or

![TIP](/assets/vscode/tip2.png)

When typing inside a component start tag, the extension provides completions for props, events, and slots from that component's API docs.

```vue
<Button fi
```

This is only an example. Every VTDF component uses its own API docs to generate completion items. Typing `fi` can filter props like `fill`, and typing `on` can filter events like `@click` and `@update:value`. String props are inserted as `prop=""`, non-string props are inserted as `:prop=""`, and events are inserted as `@event=""`.

### Configuration

The default API display is in Simplified Chinese. You can enable English API in the VS Code settings.

The new configuration key is `AnyTDF.English`.

![SETTING](/assets/vscode/setting.png)
