# 函数式反馈

RTDF 提供了 5 种反馈组件的函数式调用方式，可以在任意位置（包括非 React 组件代码）通过函数调用使用这些组件。

## 初始化

在使用函数式 API 之前，需要在应用根布局中添加 `Feedback` 组件：

```tsx
import { Feedback } from 'rtdf';

const App = () => (
	<>
		<Routes />
		<Feedback />
	</>
);
```

## Toast 轻提示

```typescript
import { toast } from 'rtdf';

// 基础用法
toast('消息内容');
toast({ message: '消息', duration: 2000 });

// 快捷方法
toast.success('成功');
toast.error('失败');
toast.warning('警告');
toast.info('提示');
toast.loading('加载中...');

// 手动关闭
const id = toast.loading('上传中...');
toast.hide(id); // 关闭指定 Toast
toast.clear(); // 清除所有 Toast
```

## Dialog 对话框

```typescript
import { dialog } from 'rtdf';

// 基础用法，返回 Promise
const result = await dialog({
	title: '标题',
	content: '内容',
	primaryText: '确定',
	secondaryText: '取消'
});
// result: 'primary' | 'secondary' | 'close'

// 确认框快捷方法
const confirmed = await dialog.confirm('确定删除吗？', '删除确认');
// confirmed: boolean

// 手动关闭
dialog.close();
```

## Modal 弹框

```typescript
import { modal } from 'rtdf';

// 基础用法
const result = await modal({
	title: '标题',
	content: '内容',
	btnText: '我知道了'
});
// result: 'confirm' | 'close'

// 信息提示快捷方法
await modal.info('操作完成', '提示');

// 手动关闭
modal.close();
```

## Alert 弹窗提示

使用 `showAlert` 避免与浏览器原生 `window.alert` 冲突：

```typescript
import { showAlert } from 'rtdf';

// 基础用法
showAlert('消息内容');
showAlert({ message: '消息', title: '标题', type: 'success' });

// 快捷方法
showAlert.success('成功');
showAlert.error('失败');
showAlert.warning('警告');
showAlert.info('提示');

// 手动关闭
const id = showAlert.info('新消息');
showAlert.hide(id);
showAlert.clear();
```

## Loading 加载

```typescript
import { loading } from 'rtdf';

loading.show();
loading.show('加载中...');
loading.show({ message: '处理中...', type: '1_0' });

loading.hide();
```

## 实际应用示例

### 在请求封装中使用

```typescript
// utils/request.ts
import { toast, loading } from 'rtdf';

export async function request(url: string) {
	loading.show('加载中...');
	const res = await fetch(url);
	loading.hide();

	if (!res.ok) {
		toast.error('请求失败');
		throw new Error('Request failed');
	}

	return res.json();
}
```

### 删除确认

```typescript
import { toast, dialog, loading } from 'rtdf';

async function deleteItem(id: string) {
	const confirmed = await dialog.confirm('确定删除这条记录吗？', '删除确认');

	if (confirmed) {
		loading.show('删除中...');
		await fetch(`/api/items/${id}`, { method: 'DELETE' });
		loading.hide();
		toast.success('删除成功');
		return true;
	}

	return false;
}
```

## 特性说明

- **堆叠显示**：多个 Toast/Alert 同时显示时会上下堆叠，各自独立计时关闭
- **Promise 支持**：Dialog 和 Modal 返回 Promise，支持 async/await 语法
- **类型安全**：完整的 TypeScript 类型支持
- **ConfigProvider 兼容**：自动从应用 ConfigProvider 获取语言配置

## 使用限制

函数式 API 为了简化调用，无法支持组件的全部功能：

| 不支持的功能       | 说明                                                             |
| ------------------ | ---------------------------------------------------------------- |
| **render props**   | 无法传递 `children`、`contentChild`、`primaryChild` 等自定义内容 |
| **受控 visible**   | 无法通过 `visible` 与 `onClose` 进行状态同步                     |
| **复杂自定义内容** | 无法在提示中插入自定义组件或复杂布局                             |

## 使用建议

- **函数式 API**：适合简单场景，如纯文本提示、简单确认框、全局请求拦截等
- **组件式写法**：需要自定义内容、复杂交互时，仍应使用原组件

```tsx
import { useState } from 'react';
import { Toast } from 'rtdf';

const Demo = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			{/* 需要自定义内容时，使用组件式写法 */}
			<button onClick={() => setVisible(true)}>显示</button>

			<Toast visible={visible} onClose={() => setVisible(false)}>
				<div className="flex items-center gap-2">
					<CustomIcon />
					<span>自定义内容</span>
				</div>
			</Toast>
		</>
	);
};
```

两种方式可以在同一项目中混合使用，根据具体场景选择最合适的方式。
