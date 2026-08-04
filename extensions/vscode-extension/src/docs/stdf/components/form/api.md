## Form Props

| 名称           | 类型                                                          | 默认值 | 必传 | 说明                                     |
| -------------- | ------------------------------------------------------------- | ------ | ---- | ---------------------------------------- |
| form           | `FormItemProps[]`                                             | -      | Y    | 表单配置项数组。                         |
| submitText     | `string`                                                      | -      | N    | 提交按钮文字。                           |
| submitButton   | [`ButtonProps`](https://stdf.dev/components?nav=button&tab=1) | -      | N    | 提交按钮配置。                           |
| resetText      | `string`\|`null`                                              | `null` | N    | 重置按钮文字，传入 null 时不显示。       |
| resetButton    | [`ButtonProps`](https://stdf.dev/components?nav=button&tab=1) | -      | N    | 重置按钮配置。                           |
| submitChildren | `Snippet`                                                     | -      | N    | 自定义提交按钮内容。                     |
| resetChildren  | `Snippet`                                                     | -      | N    | 自定义重置按钮内容。                     |
| space          | `'0'\|'1'\|'2'\|'4'\|'6'\|'8'`                                | `'0'`  | N    | 表单项垂直间距。                         |
| card           | [`CardProps`](https://stdf.dev/components?nav=card&tab=1)     | -      | N    | 卡片配置，传入后使用 Card 组件包裹表单。 |
| onchange       | `(data: Record<string, FormValueProps>) => void`              | -      | N    | 表单项值变化时触发。                     |
| onsubmit       | `(data: Record<string, FormValueProps>) => void`              | -      | N    | 提交时触发。                             |
| onreset        | `() => void`                                                  | -      | N    | 重置时触发。                             |

## Form Events

| 名称     | 类型                                             | 参数                      | 说明                 |
| -------- | ------------------------------------------------ | ------------------------- | -------------------- |
| onchange | `(data: Record<string, FormValueProps>) => void` | data - 所有表单项的当前值 | 表单项值变化时触发。 |
| onsubmit | `(data: Record<string, FormValueProps>) => void` | data - 所有表单项的当前值 | 提交时触发。         |
| onreset  | `() => void`                                     | -                         | 重置时触发。         |

## Form Snippets

| 名称           | 类型                                                                | 参数 | 说明                 |
| -------------- | ------------------------------------------------------------------- | ---- | -------------------- |
| submitChildren | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 自定义提交按钮内容。 |
| resetChildren  | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -    | 自定义重置按钮内容。 |

## FormItemProps

表单项通用配置：

| 名称      | 类型      | 说明         |
| --------- | --------- | ------------ |
| type      | `string`  | 表单项类型。 |
| name      | `string`  | 表单项名称。 |
| label     | `string`  | 表单项标题。 |
| required  | `boolean` | 是否必填。   |
| initValue | `any`     | 初始值。     |

支持的表单项类型及配置：

### input

文本输入框。

| 名称  | 类型      | 说明             |
| ----- | --------- | ---------------- |
| type  | `'input'` | 类型标识。       |
| input | `object`  | Input 组件配置。 |

### numKeyboard

数字键盘。

| 名称        | 类型            | 说明                   |
| ----------- | --------------- | ---------------------- |
| type        | `'numKeyboard'` | 类型标识。             |
| numKeyboard | `object`        | NumKeyboard 组件配置。 |
| input       | `object`        | Input 组件配置。       |

### fullKeyboard

全键盘。

| 名称         | 类型             | 说明                    |
| ------------ | ---------------- | ----------------------- |
| type         | `'fullKeyboard'` | 类型标识。              |
| fullKeyboard | `object`         | FullKeyboard 组件配置。 |
| input        | `object`         | Input 组件配置。        |

### timePicker

时间选择器。

| 名称       | 类型           | 说明                  |
| ---------- | -------------- | --------------------- |
| type       | `'timePicker'` | 类型标识。            |
| timePicker | `object`       | TimePicker 组件配置。 |
| input      | `object`       | Input 组件配置。      |

### actionSheet

操作面板。

| 名称        | 类型            | 说明                   |
| ----------- | --------------- | ---------------------- |
| type        | `'actionSheet'` | 类型标识。             |
| actionSheet | `object`        | ActionSheet 组件配置。 |
| input       | `object`        | Input 组件配置。       |

### calendar

日期选择器。

| 名称     | 类型         | 说明                |
| -------- | ------------ | ------------------- |
| type     | `'calendar'` | 类型标识。          |
| calendar | `object`     | Calendar 组件配置。 |
| input    | `object`     | Input 组件配置。    |

### picker

选择器。

| 名称   | 类型       | 说明              |
| ------ | ---------- | ----------------- |
| type   | `'picker'` | 类型标识。        |
| picker | `object`   | Picker 组件配置。 |
| input  | `object`   | Input 组件配置。  |

当 Picker 使用 multiple 模式时，Form 返回值为 FormPickerValue，其中 multipleSelected 为已选项列表。

### colorPicker

颜色选择器。

| 名称        | 类型            | 说明                   |
| ----------- | --------------- | ---------------------- |
| type        | `'colorPicker'` | 类型标识。             |
| colorPicker | `object`        | ColorPicker 组件配置。 |
| input       | `object`        | Input 组件配置。       |

### checkbox

复选框组。

| 名称     | 类型         | 说明                |
| -------- | ------------ | ------------------- |
| type     | `'checkbox'` | 类型标识。          |
| checkbox | `object`     | Checkbox 组件配置。 |

### radio

单选框组。

| 名称  | 类型      | 说明             |
| ----- | --------- | ---------------- |
| type  | `'radio'` | 类型标识。       |
| radio | `object`  | Radio 组件配置。 |

### slider

滑块。

| 名称   | 类型       | 说明              |
| ------ | ---------- | ----------------- |
| type   | `'slider'` | 类型标识。        |
| slider | `object`   | Slider 组件配置。 |

### switch

开关。

| 名称   | 类型       | 说明              |
| ------ | ---------- | ----------------- |
| type   | `'switch'` | 类型标识。        |
| switch | `object`   | Switch 组件配置。 |

### stepper

步进器。

| 名称    | 类型        | 说明               |
| ------- | ----------- | ------------------ |
| type    | `'stepper'` | 类型标识。         |
| stepper | `object`    | Stepper 组件配置。 |

## FormValueProps

表单值类型为 `Record<string, FormValueProps>`，其中 FormValueProps 是所有表单项值的联合类型：

| 表单项类型   | 值类型                 |
| ------------ | ---------------------- |
| input        | `string`               |
| numKeyboard  | `string`               |
| fullKeyboard | `string`               |
| timePicker   | `FormTimePickerValue`  |
| actionSheet  | `FormActionSheetValue` |
| calendar     | `FormCalendarValue`    |
| picker       | `FormPickerValue`      |
| colorPicker  | `FormColorPickerValue` |
| checkbox     | `string[]`             |
| radio        | `string`               |
| slider       | `FormSliderValue`      |
| switch       | `boolean`              |
| stepper      | `number`               |
