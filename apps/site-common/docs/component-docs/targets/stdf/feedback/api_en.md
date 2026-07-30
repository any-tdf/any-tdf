## Initialization

Before using the functional API, add the `Feedback` component to your app's root layout:

```svelte
<!-- +layout.svelte -->
<script>
    import { Feedback } from 'stdf';
    let { children } = $props();
</script>

{@render children()}
<Feedback />
```

## toast Function

Toast function for displaying brief prompt messages.

### Basic Calls

| Method           | Type                         | Description                               |
| ---------------- | ---------------------------- | ----------------------------------------- |
| `toast(message)` | `(string) => string`         | Show text toast, returns toast ID         |
| `toast(options)` | `(ToastFnOptions) => string` | Show toast with options, returns toast ID |

### Shortcut Methods

| Method                             | Type                           | Description                      |
| ---------------------------------- | ------------------------------ | -------------------------------- |
| `toast.success(message, options?)` | `(string, options?) => string` | Success toast                    |
| `toast.error(message, options?)`   | `(string, options?) => string` | Error toast                      |
| `toast.warning(message, options?)` | `(string, options?) => string` | Warning toast                    |
| `toast.info(message, options?)`    | `(string, options?) => string` | Info toast                       |
| `toast.loading(message, options?)` | `(string, options?) => string` | Loading toast (won't auto-close) |
| `toast.hide(id?)`                  | `(string?) => void`            | Close specific or latest toast   |
| `toast.clear()`                    | `() => void`                   | Clear all toasts                 |

### ToastFnOptions

| Name     | Type                                                     | Default    | Description                                                     |
| -------- | -------------------------------------------------------- | ---------- | --------------------------------------------------------------- |
| message  | `string`                                                 | `''`       | Toast content                                                   |
| duration | `number`                                                 | `2000`     | Display duration, 0 for no auto-close, unit: ms                 |
| position | `'center'\|'top'\|'bottom'`                              | `'center'` | Display position                                                |
| type     | `'success'\|'error'\|'warning'\|'info'\|'loading'\|null` | `null`     | Toast icon type                                                 |
| others   | -                                                        | -          | Supports other Toast component Props (except visible, children) |

## showAlert Function

Alert function for displaying notification messages. Named `showAlert` to avoid conflict with `window.alert`.

### Basic Calls

| Method               | Type                         | Description                               |
| -------------------- | ---------------------------- | ----------------------------------------- |
| `showAlert(message)` | `(string) => string`         | Show text alert, returns alert ID         |
| `showAlert(options)` | `(AlertFnOptions) => string` | Show alert with options, returns alert ID |

### Shortcut Methods

| Method                                 | Type                           | Description                    |
| -------------------------------------- | ------------------------------ | ------------------------------ |
| `showAlert.success(message, options?)` | `(string, options?) => string` | Success alert                  |
| `showAlert.error(message, options?)`   | `(string, options?) => string` | Error alert                    |
| `showAlert.warning(message, options?)` | `(string, options?) => string` | Warning alert                  |
| `showAlert.info(message, options?)`    | `(string, options?) => string` | Info alert                     |
| `showAlert.hide(id?)`                  | `(string?) => void`            | Close specific or latest alert |
| `showAlert.clear()`                    | `() => void`                   | Clear all alerts               |

### AlertFnOptions

| Name     | Type                                          | Default | Description                                                     |
| -------- | --------------------------------------------- | ------- | --------------------------------------------------------------- |
| message  | `string`                                      | `''`    | Alert content                                                   |
| title    | `string`                                      | `''`    | Title                                                           |
| duration | `number`                                      | `3000`  | Display duration, 0 for no auto-close, unit: ms                 |
| position | `'top'\|'bottom'`                             | `'top'` | Display position                                                |
| type     | `'success'\|'error'\|'warning'\|'info'\|null` | `null`  | Alert type                                                      |
| others   | -                                             | -       | Supports other Alert component Props (except visible, children) |

## dialog Function

Dialog function for scenarios requiring user confirmation. Returns Promise.

### Basic Calls

| Method            | Type                                         | Description                             |
| ----------------- | -------------------------------------------- | --------------------------------------- |
| `dialog(options)` | `(DialogFnOptions) => Promise<DialogResult>` | Show dialog, returns user action result |

### Shortcut Methods

| Method                            | Type                                    | Description                               |
| --------------------------------- | --------------------------------------- | ----------------------------------------- |
| `dialog.confirm(content, title?)` | `(string, string?) => Promise<boolean>` | Confirm dialog, returns whether confirmed |
| `dialog.close()`                  | `() => void`                            | Close current dialog                      |

### DialogFnOptions

| Name          | Type     | Default     | Description                                                                                                         |
| ------------- | -------- | ----------- | ------------------------------------------------------------------------------------------------------------------- |
| title         | `string` | `''`        | Title                                                                                                               |
| content       | `string` | `''`        | Content                                                                                                             |
| primaryText   | `string` | `'Confirm'` | Primary button text                                                                                                 |
| secondaryText | `string` | `'Cancel'`  | Secondary button text                                                                                               |
| others        | -        | -           | Supports other Dialog component Props (except visible, onprimary, onsecondary, onclose, contentChild, primaryChild) |

### DialogResult

| Value         | Description                   |
| ------------- | ----------------------------- |
| `'primary'`   | User clicked primary button   |
| `'secondary'` | User clicked secondary button |
| `'close'`     | User closed the dialog        |

## modal Function

Modal function for information display or single-button confirmation scenarios. Returns Promise.

### Basic Calls

| Method           | Type                                       | Description                            |
| ---------------- | ------------------------------------------ | -------------------------------------- |
| `modal(options)` | `(ModalFnOptions) => Promise<ModalResult>` | Show modal, returns user action result |

### Shortcut Methods

| Method                        | Type                                        | Description         |
| ----------------------------- | ------------------------------------------- | ------------------- |
| `modal.info(content, title?)` | `(string, string?) => Promise<ModalResult>` | Info modal          |
| `modal.close()`               | `() => void`                                | Close current modal |

### ModalFnOptions

| Name    | Type     | Default    | Description                                                                  |
| ------- | -------- | ---------- | ---------------------------------------------------------------------------- |
| title   | `string` | `''`       | Title                                                                        |
| content | `string` | `''`       | Content                                                                      |
| btnText | `string` | `'Got it'` | Button text                                                                  |
| others  | -        | -          | Supports other Modal component Props (except visible, onclose, contentChild) |

### ModalResult

| Value       | Description             |
| ----------- | ----------------------- |
| `'confirm'` | User clicked the button |
| `'close'`   | User closed the modal   |

## loading Function

Loading function for displaying global loading state.

### Methods

| Method                  | Type                         | Description               |
| ----------------------- | ---------------------------- | ------------------------- |
| `loading.show()`        | `() => void`                 | Show loading              |
| `loading.show(message)` | `(string) => void`           | Show loading with text    |
| `loading.show(options)` | `(LoadingFnOptions) => void` | Show loading with options |
| `loading.hide()`        | `() => void`                 | Hide loading              |

### LoadingFnOptions

| Name    | Type     | Default | Description                            |
| ------- | -------- | ------- | -------------------------------------- |
| message | `string` | `''`    | Loading message text                   |
| type    | `string` | `'1_0'` | Loading type                           |
| others  | -        | -       | Supports other Loading component Props |

## Limitations

The functional API cannot support all component features for simplified calling:

| Unsupported Feature        | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Snippet**                | Cannot pass `children`, `contentChild`, `primaryChild` and other custom content |
| **Two-way Binding**        | Cannot use `bind:visible` for state synchronization                             |
| **Complex Custom Content** | Cannot insert custom components or complex layouts in prompts                   |

For full functionality, please use the corresponding components directly: [Toast](https://stdf.dev/components?nav=toast&tab=1), [Dialog](https://stdf.dev/components?nav=dialog&tab=1), [Modal](https://stdf.dev/components?nav=modal&tab=1), [Alert](https://stdf.dev/components?nav=alert&tab=1), [Loading](https://stdf.dev/components?nav=loading&tab=1).
