# Functional Feedback

STDF provides functional API for 5 feedback components, allowing you to use them anywhere (including non-Svelte component code) through function calls.

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

## Toast

```typescript
import { toast } from 'stdf';

// Basic usage
toast('Message content');
toast({ message: 'Message', duration: 2000 });

// Shortcut methods
toast.success('Success');
toast.error('Error');
toast.warning('Warning');
toast.info('Info');
toast.loading('Loading...');

// Manual close
const id = toast.loading('Uploading...');
toast.hide(id); // Close specific Toast
toast.clear(); // Clear all Toasts
```

## Dialog

```typescript
import { dialog } from 'stdf';

// Basic usage, returns Promise
const result = await dialog({
	title: 'Title',
	content: 'Content',
	primaryText: 'Confirm',
	secondaryText: 'Cancel'
});
// result: 'primary' | 'secondary' | 'close'

// Confirm dialog shortcut
const confirmed = await dialog.confirm('Are you sure to delete?', 'Delete Confirmation');
// confirmed: boolean

// Manual close
dialog.close();
```

## Modal

```typescript
import { modal } from 'stdf';

// Basic usage
const result = await modal({
	title: 'Title',
	content: 'Content',
	btnText: 'Got it'
});
// result: 'confirm' | 'close'

// Info modal shortcut
await modal.info('Operation completed', 'Notice');

// Manual close
modal.close();
```

## Alert

Use `showAlert` to avoid conflict with browser's native `window.alert`:

```typescript
import { showAlert } from 'stdf';

// Basic usage
showAlert('Message content');
showAlert({ message: 'Message', title: 'Title', type: 'success' });

// Shortcut methods
showAlert.success('Success');
showAlert.error('Error');
showAlert.warning('Warning');
showAlert.info('Info');

// Manual close
const id = showAlert.info('New message');
showAlert.hide(id);
showAlert.clear();
```

## Loading

```typescript
import { loading } from 'stdf';

loading.show();
loading.show('Loading...');
loading.show({ message: 'Processing...', type: '1_0' });

loading.hide();
```

## Practical Examples

### Using in Request Wrapper

```typescript
// utils/request.ts
import { toast, loading } from 'stdf';

export async function request(url: string) {
	loading.show('Loading...');

	try {
		const res = await fetch(url);
		loading.hide();

		if (!res.ok) {
			toast.error('Request failed');
			throw new Error('Request failed');
		}

		return res.json();
	} catch (e) {
		loading.hide();
		toast.error('Network error');
		throw e;
	}
}
```

### Delete Confirmation

```typescript
import { toast, dialog, loading } from 'stdf';

async function deleteItem(id: string) {
	const confirmed = await dialog.confirm('Are you sure to delete this record?', 'Delete Confirmation');

	if (confirmed) {
		loading.show('Deleting...');
		await fetch(`/api/items/${id}`, { method: 'DELETE' });
		loading.hide();
		toast.success('Deleted successfully');
		return true;
	}

	return false;
}
```

## Features

- **Stack Display**: Multiple Toasts/Alerts are stacked vertically, each with independent timing
- **Promise Support**: Dialog and Modal return Promise, supporting async/await syntax
- **Type Safe**: Full TypeScript type support
- **Context Compatible**: Automatically gets language configuration from app Context

## Limitations

The functional API cannot support all component features for simplified calling:

| Unsupported Feature        | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Snippet**                | Cannot pass `children`, `contentChild`, `primaryChild` and other custom content |
| **Two-way Binding**        | Cannot use `bind:visible` for state synchronization                             |
| **Complex Custom Content** | Cannot insert custom components or complex layouts in prompts                   |

## Usage Recommendations

- **Functional API**: Suitable for simple scenarios like plain text prompts, simple confirmation dialogs, global request interceptors
- **Component Style**: Use original components when custom content or complex interactions are needed

```svelte
<script>
    import { Toast } from 'stdf';
    let showToast = $state(false);
</script>

<!-- Use component style for custom content -->
<button onclick={() => showToast = true}>Show</button>

<Toast bind:visible={showToast}>
    <div class="flex items-center gap-2">
        <CustomIcon />
        <span>Custom content</span>
    </div>
</Toast>
```

Both approaches can be mixed in the same project. Choose the most suitable method based on specific scenarios.
