## Introduction

The functional feedback API allows you to use Toast, Dialog, Modal, Alert, and Loading components through function calls anywhere (including non-React component code).

This is particularly useful in the following scenarios:

- Encapsulating global request interceptors
- Displaying prompts in utility functions
- Showing feedback based on async operation results

## Differences from Component Style

| Feature              | Functional API | Component Style                                         |
| -------------------- | -------------- | ------------------------------------------------------- |
| Usage Location       | Any JS/TS code | Only React component JSX                                |
| Custom Content       | Text only      | Supports ReactNode                                      |
| Controlled State     | Not supported  | Controlled props (for example `visible` with callbacks) |
| State Management     | Automatic      | Manual                                                  |
| Complex Interactions | Limited        | Fully supported                                         |

## When to Use Functional API

**Recommended for Functional API:**

- Simple text prompts
- Request success/failure feedback
- Confirmation operations (delete, submit, etc.)
- Global loading state

**Recommended for Component Style:**

- Custom content needed (icons, buttons, layouts)
- Complex interaction logic
- Fine-grained control over display state

## Multiple Instances

Toast and Alert support displaying multiple instances simultaneously, automatically stacking:

```typescript
// Rapid consecutive calls will stack
toast.success('First');
toast.info('Second');
toast.warning('Third');
```

Dialog, Modal, and Loading are singleton mode - new calls will replace previous ones.

## Working with Promises

Dialog and Modal return Promises, making them convenient to use with async/await:

```typescript
async function handleDelete() {
	const confirmed = await dialog.confirm('Confirm delete?');
	if (!confirmed) return;

	loading.show('Deleting...');
	await deleteApi();
	loading.hide();

	toast.success('Deleted successfully');
}
```

## Language Configuration

The functional API does not rely on React Context by default. For manual setting:

```typescript
import { setFeedbackLang } from 'rtdf';
import { en_US } from 'rtdf/lang';

setFeedbackLang(en_US);
```

## Mixed Usage

Functional API and component style can be mixed in the same project:

```tsx
import { useState } from 'react';
import { Toast, dialog, loading } from 'rtdf';

function Example() {
	const [showCustomToast, setShowCustomToast] = useState(false);

	const handleAction = async () => {
		const confirmed = await dialog.confirm('Confirm action?');
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
					<span>Custom content</span>
				</div>
			</Toast>

			<button onClick={handleAction}>Execute Action</button>
			<button onClick={() => setShowCustomToast(true)}>Show Custom Toast</button>
		</>
	);
}
```
