# Functional Feedback

RTDF provides functional API for 5 feedback components, allowing you to use them anywhere (including non-React component code) through function calls.

## Initialization

Before using the functional API, add the `Feedback` component to your app's root layout:

```tsx
import { Feedback } from 'rtdf';

const App = () => (
	<>
		<Routes />
		<Feedback />
	</>
);
```

## Toast

```typescript
import { toast } from 'rtdf';

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
import { dialog } from 'rtdf';

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
import { modal } from 'rtdf';

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
import { showAlert } from 'rtdf';

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
import { loading } from 'rtdf';

loading.show();
loading.show('Loading...');
loading.show({ message: 'Processing...', type: '1_0' });

loading.hide();
```

## Practical Examples

### Using in Request Wrapper

```typescript
// utils/request.ts
import { toast, loading } from 'rtdf';

export async function request(url: string) {
	loading.show('Loading...');
	const res = await fetch(url);
	loading.hide();

	if (!res.ok) {
		toast.error('Request failed');
		throw new Error('Request failed');
	}

	return res.json();
}
```

### Delete Confirmation

```typescript
import { toast, dialog, loading } from 'rtdf';

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
- **ConfigProvider Compatible**: Automatically gets language configuration from app ConfigProvider

## Limitations

The functional API cannot support all component features for simplified calling:

| Unsupported Feature        | Description                                                                     |
| -------------------------- | ------------------------------------------------------------------------------- |
| **Render Props**           | Cannot pass `children`, `contentChild`, `primaryChild` and other custom content |
| **Controlled Visible**     | Cannot use `visible` with `onClose` for state synchronization                   |
| **Complex Custom Content** | Cannot insert custom components or complex layouts in prompts                   |

## Usage Recommendations

- **Functional API**: Suitable for simple scenarios like plain text prompts, simple confirmation dialogs, global request interceptors
- **Component Style**: Use original components when custom content or complex interactions are needed

```tsx
import { useState } from 'react';
import { Toast } from 'rtdf';

const Demo = () => {
	const [visible, setVisible] = useState(false);

	return (
		<>
			{/* Use component style for custom content */}
			<button onClick={() => setVisible(true)}>Show</button>

			<Toast visible={visible} onClose={() => setVisible(false)}>
				<div className="flex items-center gap-2">
					<CustomIcon />
					<span>Custom content</span>
				</div>
			</Toast>
		</>
	);
};
```

Both approaches can be mixed in the same project. Choose the most suitable method based on specific scenarios.
