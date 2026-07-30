## Introduction

The functional feedback API allows you to use Toast, Dialog, Modal, Alert, and Loading components through function calls anywhere (including non-Vue component code).

This is particularly useful in the following scenarios:

- Encapsulating global request interceptors
- Displaying prompts in utility functions
- Showing feedback based on async operation results

## Differences from Component Style

| Feature              | Functional API | Component Style                                        |
| -------------------- | -------------- | ------------------------------------------------------ |
| Usage Location       | Any JS/TS code | Only Vue component Vue SFC                             |
| Custom Content       | Text only      | Supports Vue Slot                                      |
| Controlled State     | Not supported  | Controlled props (for example `visible` with `@close`) |
| State Management     | Automatic      | Manual                                                 |
| Complex Interactions | Limited        | Fully supported                                        |

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

The functional API does not rely on Vue Context by default. For manual setting:

```typescript
import { setFeedbackLang } from 'vtdf';
import { en_US } from 'vtdf/lang';

setFeedbackLang(en_US);
```

## Mixed Usage

Functional API and component style can be mixed in the same project:

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { Toast, dialog, loading } from 'vtdf';

const showCustomToast = ref(false);

const handleAction = async () => {
	const confirmed = await dialog.confirm('Confirm action?');
	if (confirmed) {
		loading.show();
		await doSomething();
		loading.hide();
	}
};
</script>

<template>
	<Toast v-model:visible="showCustomToast" @close="showCustomToast = false">
		<div class="flex items-center gap-2">
			<CustomIcon />
			<span>Custom content</span>
		</div>
	</Toast>

	<button @click="handleAction">Execute Action</button>
	<button @click="showCustomToast = true">Show Custom Toast</button>
</template>
```
