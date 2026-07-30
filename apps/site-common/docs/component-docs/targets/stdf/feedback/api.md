## 初始化

在使用函数式 API 之前，需要在应用根布局中添加 `Feedback` 组件：

```svelte
<!-- +layout.svelte -->
<script>
    import { Feedback } from 'stdf';
    let { children } = $props();
</script>

{@render children()}
<Feedback />
```

## toast 函数

轻提示函数，用于显示简短的提示信息。

### 基础调用

| 方法             | 类型                         | 说明                            |
| ---------------- | ---------------------------- | ------------------------------- |
| `toast(message)` | `(string) => string`         | 显示文本提示，返回 toast ID     |
| `toast(options)` | `(ToastFnOptions) => string` | 显示带配置的提示，返回 toast ID |

### 快捷方法

| 方法                               | 类型                           | 说明                   |
| ---------------------------------- | ------------------------------ | ---------------------- |
| `toast.success(message, options?)` | `(string, options?) => string` | 成功提示               |
| `toast.error(message, options?)`   | `(string, options?) => string` | 错误提示               |
| `toast.warning(message, options?)` | `(string, options?) => string` | 警告提示               |
| `toast.info(message, options?)`    | `(string, options?) => string` | 信息提示               |
| `toast.loading(message, options?)` | `(string, options?) => string` | 加载提示（不自动关闭） |
| `toast.hide(id?)`                  | `(string?) => void`            | 关闭指定或最新的 toast |
| `toast.clear()`                    | `() => void`                   | 清除所有 toast         |

### ToastFnOptions

| 名称     | 类型                                                     | 默认值     | 说明                                                |
| -------- | -------------------------------------------------------- | ---------- | --------------------------------------------------- |
| message  | `string`                                                 | `''`       | 提示内容                                            |
| duration | `number`                                                 | `2000`     | 显示时长，0 为不自动关闭，单位：ms                  |
| position | `'center'\|'top'\|'bottom'`                              | `'center'` | 显示位置                                            |
| type     | `'success'\|'error'\|'warning'\|'info'\|'loading'\|null` | `null`     | 提示图标类型                                        |
| 其他     | -                                                        | -          | 支持 Toast 组件的其他 Props（除 visible、children） |

## showAlert 函数

弹窗提示函数，用于显示通知类消息。使用 `showAlert` 命名以避免与 `window.alert` 冲突。

### 基础调用

| 方法                 | 类型                         | 说明                            |
| -------------------- | ---------------------------- | ------------------------------- |
| `showAlert(message)` | `(string) => string`         | 显示文本提示，返回 alert ID     |
| `showAlert(options)` | `(AlertFnOptions) => string` | 显示带配置的提示，返回 alert ID |

### 快捷方法

| 方法                                   | 类型                           | 说明                   |
| -------------------------------------- | ------------------------------ | ---------------------- |
| `showAlert.success(message, options?)` | `(string, options?) => string` | 成功提示               |
| `showAlert.error(message, options?)`   | `(string, options?) => string` | 错误提示               |
| `showAlert.warning(message, options?)` | `(string, options?) => string` | 警告提示               |
| `showAlert.info(message, options?)`    | `(string, options?) => string` | 信息提示               |
| `showAlert.hide(id?)`                  | `(string?) => void`            | 关闭指定或最新的 alert |
| `showAlert.clear()`                    | `() => void`                   | 清除所有 alert         |

### AlertFnOptions

| 名称     | 类型                                          | 默认值  | 说明                                                |
| -------- | --------------------------------------------- | ------- | --------------------------------------------------- |
| message  | `string`                                      | `''`    | 提示内容                                            |
| title    | `string`                                      | `''`    | 标题                                                |
| duration | `number`                                      | `3000`  | 显示时长，0 为不自动关闭，单位：ms                  |
| position | `'top'\|'bottom'`                             | `'top'` | 显示位置                                            |
| type     | `'success'\|'error'\|'warning'\|'info'\|null` | `null`  | 提示类型                                            |
| 其他     | -                                             | -       | 支持 Alert 组件的其他 Props（除 visible、children） |

## dialog 函数

对话框函数，用于需要用户确认的场景。返回 Promise。

### 基础调用

| 方法              | 类型                                         | 说明                         |
| ----------------- | -------------------------------------------- | ---------------------------- |
| `dialog(options)` | `(DialogFnOptions) => Promise<DialogResult>` | 显示对话框，返回用户操作结果 |

### 快捷方法

| 方法                              | 类型                                    | 说明                     |
| --------------------------------- | --------------------------------------- | ------------------------ |
| `dialog.confirm(content, title?)` | `(string, string?) => Promise<boolean>` | 确认对话框，返回是否确认 |
| `dialog.close()`                  | `() => void`                            | 关闭当前对话框           |

### DialogFnOptions

| 名称          | 类型     | 默认值   | 说明                                                                                                    |
| ------------- | -------- | -------- | ------------------------------------------------------------------------------------------------------- |
| title         | `string` | `''`     | 标题                                                                                                    |
| content       | `string` | `''`     | 内容                                                                                                    |
| primaryText   | `string` | `'确定'` | 主按钮文字                                                                                              |
| secondaryText | `string` | `'取消'` | 次按钮文字                                                                                              |
| 其他          | -        | -        | 支持 Dialog 组件的其他 Props（除 visible、onprimary、onsecondary、onclose、contentChild、primaryChild） |

### DialogResult

| 值            | 说明             |
| ------------- | ---------------- |
| `'primary'`   | 用户点击了主按钮 |
| `'secondary'` | 用户点击了次按钮 |
| `'close'`     | 用户关闭了对话框 |

## modal 函数

弹框函数，用于信息展示或单按钮确认场景。返回 Promise。

### 基础调用

| 方法             | 类型                                       | 说明                       |
| ---------------- | ------------------------------------------ | -------------------------- |
| `modal(options)` | `(ModalFnOptions) => Promise<ModalResult>` | 显示弹框，返回用户操作结果 |

### 快捷方法

| 方法                          | 类型                                        | 说明         |
| ----------------------------- | ------------------------------------------- | ------------ |
| `modal.info(content, title?)` | `(string, string?) => Promise<ModalResult>` | 信息弹框     |
| `modal.close()`               | `() => void`                                | 关闭当前弹框 |

### ModalFnOptions

| 名称    | 类型     | 默认值       | 说明                                                             |
| ------- | -------- | ------------ | ---------------------------------------------------------------- |
| title   | `string` | `''`         | 标题                                                             |
| content | `string` | `''`         | 内容                                                             |
| btnText | `string` | `'我知道了'` | 按钮文字                                                         |
| 其他    | -        | -            | 支持 Modal 组件的其他 Props（除 visible、onclose、contentChild） |

### ModalResult

| 值          | 说明           |
| ----------- | -------------- |
| `'confirm'` | 用户点击了按钮 |
| `'close'`   | 用户关闭了弹框 |

## loading 函数

加载函数，用于显示全局加载状态。

### 方法

| 方法                    | 类型                         | 说明             |
| ----------------------- | ---------------------------- | ---------------- |
| `loading.show()`        | `() => void`                 | 显示加载         |
| `loading.show(message)` | `(string) => void`           | 显示带文字的加载 |
| `loading.show(options)` | `(LoadingFnOptions) => void` | 显示带配置的加载 |
| `loading.hide()`        | `() => void`                 | 隐藏加载         |

### LoadingFnOptions

| 名称    | 类型     | 默认值  | 说明                          |
| ------- | -------- | ------- | ----------------------------- |
| message | `string` | `''`    | 加载提示文字                  |
| type    | `string` | `'1_0'` | Loading 类型                  |
| 其他    | -        | -       | 支持 Loading 组件的其他 Props |

## 使用限制

函数式 API 为了简化调用，无法支持组件的全部功能：

| 不支持的功能       | 说明                                                             |
| ------------------ | ---------------------------------------------------------------- |
| **Snippet**        | 无法传递 `children`、`contentChild`、`primaryChild` 等自定义内容 |
| **双向绑定**       | 无法使用 `bind:visible` 进行状态同步                             |
| **复杂自定义内容** | 无法在提示中插入自定义组件或复杂布局                             |

如需使用完整功能，请直接使用对应的组件：[Toast](https://stdf.dev/components?nav=toast&tab=1)、[Dialog](https://stdf.dev/components?nav=dialog&tab=1)、[Modal](https://stdf.dev/components?nav=modal&tab=1)、[Alert](https://stdf.dev/components?nav=alert&tab=1)、[Loading](https://stdf.dev/components?nav=loading&tab=1)。
