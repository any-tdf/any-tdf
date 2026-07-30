## Use Cases

ButtonGroup is used to combine multiple related actions together, commonly seen in toolbars, action panels, etc.

## Two Usage Methods

ButtonGroup supports two usage methods:

### 1. Items Array Mode

Pass button configuration array through the `items` prop. Each button item supports `text`, `icon`, `disabled`, and `onclick` properties.

### 2. Children Custom Mode

When you need to fully customize button content, use the `children` Snippet.

## fill + state Combination

ButtonGroup's `fill` and `state` props can be used together:

- `base`/`lineState`/`textState`/`colorLight`: Follow `state` changes
- `line`/`lineLight`/`text`: Colorless mode, not affected by `state`

## Divider

The divider height between buttons is controlled by the `dividerHeight` prop:

- `full`: 100% height
- `mid`: 60% height (default)
- `short`: 30% height

The divider color automatically follows the button text color.

## Disable Buttons

You can disable individual buttons by setting the `disabled` property in the `items` array.
