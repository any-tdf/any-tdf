## Introduction

The functional feedback API allows you to use Toast, Dialog, Modal, Alert, and Loading components through function calls anywhere (including non-Svelte component code).

This is particularly useful in the following scenarios:

- Encapsulating global request interceptors
- Displaying prompts in utility functions
- Showing feedback based on async operation results

## Differences from Component Style

| Feature              | Functional API | Component Style                 |
| -------------------- | -------------- | ------------------------------- |
| Usage Location       | Any JS/TS code | Only Svelte component templates |
| Custom Content       | Text only      | Supports Snippet                |
| Two-way Binding      | Not supported  | Supports `bind:visible`         |
| State Management     | Automatic      | Manual                          |
| Complex Interactions | Limited        | Fully supported                 |

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

The functional API automatically gets language configuration from the app's Context (`STDF_lang`). For manual setting:

```typescript
import { setFeedbackLang } from 'stdf';
import { en_US } from 'stdf/lang';

setFeedbackLang(en_US);
```

## Mixed Usage

Functional API and component style can be mixed in the same project:

```svelte
<script>
    import { Toast, dialog, loading } from 'stdf';

    let showCustomToast = $state(false);

    async function handleAction() {
        // Using functional API
        const confirmed = await dialog.confirm('Confirm action?');
        if (confirmed) {
            loading.show();
            await doSomething();
            loading.hide();
        }
    }
</script>

<!-- Use component style when custom content is needed -->
<Toast bind:visible={showCustomToast}>
    <div class="flex items-center gap-2">
        <CustomIcon />
        <span>Custom content</span>
    </div>
</Toast>

<button onclick={handleAction}>Execute Action</button>
<button onclick={() => showCustomToast = true}>Show Custom Toast</button>
```
