<script setup lang="ts">
import { ref } from 'vue';
import { Button, Cell, dialog, loading, modal, showAlert, toast } from 'vtdf';

const loadingToastId = ref('');

const wait = (duration: number) => new Promise<void>((resolve) => setTimeout(resolve, duration));

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

const showToastLoading = () => {
	loadingToastId.value = toast.loading('Loading...');
};

const hideToastLoading = () => {
	if (loadingToastId.value) {
		toast.hide(loadingToastId.value);
		loadingToastId.value = '';
	}
};

const showMultipleToasts = () => {
	toast.success('First toast');
	setTimeout(() => toast.info('Second toast'), 500);
	setTimeout(() => toast.warning('Third toast'), 1000);
};

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
		await wait(1500);
		loading.hide();
		toast.success('Deleted successfully');
	}
};

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

const simulateRequest = async () => {
	loading.show('Requesting...');
	await wait(1500);
	loading.hide();
	if (Math.random() > 0.3) {
		toast.success('Request successful');
	} else {
		toast.error('Request failed, please retry');
	}
};

const simulateFormSubmit = async () => {
	const confirmed = await dialog.confirm('Are you sure to submit the form?', 'Submit Confirmation');
	if (!confirmed) {
		toast.info('Submission cancelled');
		return;
	}
	loading.show('Submitting...');
	await wait(2000);
	loading.hide();
	await modal.info('Form submitted successfully! Thank you for your feedback.', 'Success');
};
</script>

<template>
	<div class="py-4">
		<div class="mb-4 px-4 text-sm font-medium text-gray-500">Toast</div>
		<Cell title="Basic usage" @click="showToast" />
		<Cell title="Success" @click="showToastSuccess" />
		<Cell title="Error" @click="showToastError" />
		<Cell title="Warning" @click="showToastWarning" />
		<Cell title="Info" @click="showToastInfo" />
		<Cell title="Loading" @click="showToastLoading" />
		<div v-if="loadingToastId" class="px-4 py-2">
			<Button @click="hideToastLoading" fill="line" size="sm">Close toast</Button>
		</div>
		<Cell title="Multiple toasts stacked" @click="showMultipleToasts" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Alert</div>
		<Cell title="Basic usage" @click="showAlertBasic" />
		<Cell title="Success" @click="showAlertSuccess" />
		<Cell title="Error" @click="showAlertError" />
		<Cell title="Warning" @click="showAlertWarning" />
		<Cell title="Info" @click="showAlertInfo" />
		<Cell title="Multiple alerts stacked" @click="showMultipleAlerts" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Dialog</div>
		<Cell title="Basic usage" @click="showDialogBasic" />
		<Cell title="Confirm dialog" @click="showDialogConfirm" />
		<Cell title="Delete confirmation (with Loading)" @click="showDialogDelete" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Modal</div>
		<Cell title="Basic usage" @click="showModalBasic" />
		<Cell title="Info modal" @click="showModalInfo" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Loading</div>
		<Cell title="Basic usage" @click="showLoadingBasic" />
		<Cell title="With message" @click="showLoadingWithMessage" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Combined Examples</div>
		<Cell title="Simulate network request" @click="simulateRequest" />
		<Cell title="Form submit flow" @click="simulateFormSubmit" />
	</div>
</template>
