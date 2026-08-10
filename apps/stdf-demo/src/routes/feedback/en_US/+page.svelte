<!-- Feedback Demo -->
<script lang="ts">
	import { Cell, Button } from 'stdf';
	import { toast, showAlert, dialog, modal, loading } from 'stdf';

	// Toast examples
	const showToast = () => {
		toast('This is a toast message');
	};

	const showToastSuccess = () => {
		toast.success('Operation successful');
	};

	const showToastError = () => {
		toast.error('Operation failed');
	};

	const showToastWarning = () => {
		toast.warning('Warning message');
	};

	const showToastInfo = () => {
		toast.info('Info message');
	};

	let loadingToastId = '';
	const showToastLoading = () => {
		loadingToastId = toast.loading('Loading...');
	};

	const hideToastLoading = () => {
		if (loadingToastId) {
			toast.hide(loadingToastId);
			loadingToastId = '';
		}
	};

	const showMultipleToasts = () => {
		toast.success('First toast');
		setTimeout(() => toast.info('Second toast'), 500);
		setTimeout(() => toast.warning('Third toast'), 1000);
	};

	// Alert examples
	const showAlertBasic = () => {
		showAlert('This is an alert message');
	};

	const showAlertSuccess = () => {
		showAlert.success('Operation successful', { title: 'Success' });
	};

	const showAlertError = () => {
		showAlert.error('Operation failed', { title: 'Error' });
	};

	const showAlertWarning = () => {
		showAlert.warning('Please note', { title: 'Warning' });
	};

	const showAlertInfo = () => {
		showAlert.info('This is an info message', { title: 'Info' });
	};

	const showMultipleAlerts = () => {
		showAlert.success('First alert');
		setTimeout(() => showAlert.info('Second alert'), 500);
		setTimeout(() => showAlert.warning('Third alert'), 1000);
	};

	// Dialog examples
	const showDialogBasic = async () => {
		const result = await dialog({
			title: 'Notice',
			content: 'This is a dialog. Click a button to see the result',
			primaryText: 'Confirm',
			secondaryText: 'Cancel'
		});
		toast(`You clicked: ${result}`);
	};

	const showDialogConfirm = async () => {
		const confirmed = await dialog.confirm('Are you sure to proceed?', 'Confirmation');
		if (confirmed) {
			toast.success('You clicked confirm');
		} else {
			toast.info('You clicked cancel');
		}
	};

	const showDialogDelete = async () => {
		const confirmed = await dialog.confirm('This action cannot be undone. Are you sure to delete?', 'Delete Confirmation');
		if (confirmed) {
			loading.show('Deleting...');
			// Simulate delete operation
			await new Promise(resolve => setTimeout(resolve, 1500));
			loading.hide();
			toast.success('Deleted successfully');
		}
	};

	// Modal examples
	const showModalBasic = async () => {
		await modal({
			title: 'Notice',
			content: 'This is a single-button modal',
			btnText: 'Got it'
		});
		toast('Modal closed');
	};

	const showModalInfo = async () => {
		await modal.info('Operation completed. Please check the result.', 'Done');
	};

	// Loading examples
	const showLoadingBasic = () => {
		loading.show();
		setTimeout(() => {
			loading.hide();
			toast.success('Loading complete');
		}, 2000);
	};

	const showLoadingWithMessage = () => {
		loading.show('Processing...');
		setTimeout(() => {
			loading.hide();
			toast.success('Processing complete');
		}, 2000);
	};

	// Combined example: simulate request
	const simulateRequest = async () => {
		loading.show('Requesting...');

		// Simulate network request
		await new Promise(resolve => setTimeout(resolve, 1500));

		loading.hide();

		// Random success or failure
		if (Math.random() > 0.3) {
			toast.success('Request successful');
		} else {
			toast.error('Request failed, please retry');
		}
	};

	// Combined example: form submit
	const simulateFormSubmit = async () => {
		const confirmed = await dialog.confirm('Are you sure to submit the form?', 'Submit Confirmation');

		if (!confirmed) {
			toast.info('Submission cancelled');
			return;
		}

		loading.show('Submitting...');
		await new Promise(resolve => setTimeout(resolve, 2000));
		loading.hide();

		await modal.info('Form submitted successfully! Thank you for your feedback.', 'Success');
	};
</script>

<div class="py-4">
	<!-- Toast examples -->
	<div class="mb-4 px-4 text-sm font-medium text-gray-500">Toast</div>
	<Cell title="Basic usage" onclick={showToast} />
	<Cell title="Success" onclick={showToastSuccess} />
	<Cell title="Error" onclick={showToastError} />
	<Cell title="Warning" onclick={showToastWarning} />
	<Cell title="Info" onclick={showToastInfo} />
	<Cell title="Loading" onclick={showToastLoading} />
	{#if loadingToastId}
		<div class="px-4 py-2">
			<Button onclick={hideToastLoading} fill="line" size="sm">Close toast</Button>
		</div>
	{/if}
	<Cell title="Multiple toasts stacked" onclick={showMultipleToasts} />

	<!-- Alert examples -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Alert</div>
	<Cell title="Basic usage" onclick={showAlertBasic} />
	<Cell title="Success" onclick={showAlertSuccess} />
	<Cell title="Error" onclick={showAlertError} />
	<Cell title="Warning" onclick={showAlertWarning} />
	<Cell title="Info" onclick={showAlertInfo} />
	<Cell title="Multiple alerts stacked" onclick={showMultipleAlerts} />

	<!-- Dialog examples -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Dialog</div>
	<Cell title="Basic usage" onclick={showDialogBasic} />
	<Cell title="Confirm dialog" onclick={showDialogConfirm} />
	<Cell title="Delete confirmation (with Loading)" onclick={showDialogDelete} />

	<!-- Modal examples -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Modal</div>
	<Cell title="Basic usage" onclick={showModalBasic} />
	<Cell title="Info modal" onclick={showModalInfo} />

	<!-- Loading examples -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Loading</div>
	<Cell title="Basic usage" onclick={showLoadingBasic} />
	<Cell title="With message" onclick={showLoadingWithMessage} />

	<!-- Combined examples -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Combined Examples</div>
	<Cell title="Simulate network request" onclick={simulateRequest} />
	<Cell title="Form submit flow" onclick={simulateFormSubmit} />
</div>
