## 介绍

函数式反馈 API 允许你在任意位置（包括非 React 组件代码）通过函数调用使用 Toast、Dialog、Modal、Alert、Loading 这 5 种反馈组件。

这在以下场景中特别有用：

- 封装全局请求拦截器
- 工具函数中显示提示
- 需要根据异步操作结果显示反馈

## 与组件式的区别

| 特性       | 函数式 API      | 组件式                                    |
| ---------- | --------------- | ----------------------------------------- |
| 使用位置   | 任意 JS/TS 代码 | 仅 React 组件 JSX                         |
| 自定义内容 | 仅支持文本      | 支持 ReactNode                            |
| 受控状态   | 不支持          | 支持受控 props（例如 `visible` 配合回调） |
| 状态管理   | 自动管理        | 手动管理                                  |
| 复杂交互   | 有限            | 完全支持                                  |

## 何时使用函数式 API

**推荐使用函数式 API：**

- 简单的文本提示
- 请求成功/失败反馈
- 确认操作（删除、提交等）
- 全局加载状态

**推荐使用组件式：**

- 需要自定义内容（图标、按钮、布局）
- 复杂的交互逻辑
- 需要精细控制显示状态

## 多实例处理

Toast 和 Alert 支持同时显示多个实例，会自动堆叠显示：

```typescript
// 快速连续调用，会堆叠显示
toast.success('第一条');
toast.info('第二条');
toast.warning('第三条');
```

Dialog、Modal 和 Loading 是单例模式，新调用会替换之前的。

## 与 Promise 配合

Dialog 和 Modal 返回 Promise，可以方便地与 async/await 配合：

```typescript
async function handleDelete() {
	const confirmed = await dialog.confirm('确定删除？');
	if (!confirmed) return;

	loading.show('删除中...');
	await deleteApi();
	loading.hide();

	toast.success('删除成功');
}
```

## 语言配置

函数式 API 默认不依赖 React Context，如果需要手动设置语言，可以使用：

```typescript
import { setFeedbackLang } from 'rtdf';
import { en_US } from 'rtdf/lang';

setFeedbackLang(en_US);
```

## 混合使用

函数式 API 和组件式可以在同一项目中混合使用：

```tsx
import { useState } from 'react';
import { Toast, dialog, loading } from 'rtdf';

function Example() {
	const [showCustomToast, setShowCustomToast] = useState(false);

	const handleAction = async () => {
		const confirmed = await dialog.confirm('确定执行？');
		if (confirmed) {
			loading.show();
			await doSomething();
			loading.hide();
		}
	};

	return (
		<>
			<Toast visible={showCustomToast} onClose={() => setShowCustomToast(false)}>
				<div className="flex items-center gap-2">
					<CustomIcon />
					<span>自定义内容</span>
				</div>
			</Toast>

			<button onClick={handleAction}>执行操作</button>
			<button onClick={() => setShowCustomToast(true)}>显示自定义 Toast</button>
		</>
	);
}
```
