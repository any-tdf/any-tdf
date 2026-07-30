## 概述

Form 组件用于快速构建完整的表单页面，支持多种表单项类型。通过配置 `form` 数组来定义表单项。

## 支持的表单项类型

Form 组件支持以下 13 种表单项类型：

1. **input** - 文本输入框
2. **numKeyboard** - 数字键盘
3. **fullKeyboard** - 全键盘
4. **timePicker** - 时间选择器
5. **actionSheet** - 操作面板
6. **calendar** - 日期选择器
7. **picker** - 选择器
8. **colorPicker** - 颜色选择器
9. **checkbox** - 复选框组
10. **radio** - 单选框组
11. **slider** - 滑块
12. **switch** - 开关
13. **stepper** - 步进器

## 卡片布局

设置 `card` 属性可开启卡片布局，适合移动端界面。支持自定义：

- **radius**：圆角大小
- **shadow**：阴影效果
- **mx**、**px**：边距
- **space**：表单项间距

## 按钮配置

- **submitText** / **resetText**：自定义按钮文字
- **submitButton** / **resetButton**：自定义按钮样式
- **submitChildren** / **resetChildren**：自定义按钮内容
- **resetText={null}**：隐藏重置按钮

## 事件

- **onchange**：表单项值变化时触发
- **onsubmit**：提交时触发
- **onreset**：重置时触发

## 注意事项

1. **name 唯一性**：每个表单项的 `name` 必须唯一
2. **必填标识**：`required: true` 会显示红色星号，但组件不包含验证逻辑
3. **初始值**：`initValue` 需要对应表单项的正确类型
4. **子组件配置**：可通过 `input`、`picker` 等配置对象定制子组件行为
5. **返回值类型**：不同表单项返回不同类型的数据
6. **多选展示**：当 Calendar 使用 multiple 模式或 Picker 使用 multiple 模式时，Form 会使用 Tag 组件样式展示已选值，支持点击删除同步更新
