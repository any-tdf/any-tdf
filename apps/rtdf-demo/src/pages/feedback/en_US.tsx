import { useState } from 'react';
import { Button, Cell, dialog, loading, modal, showAlert, toast } from 'rtdf/components';

function FeedbackEn() {
	const [loadingToastId, setLoadingToastId] = useState('');

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
		const id = toast.loading('Loading...');
		setLoadingToastId(id);
	};

	const hideToastLoading = () => {
		if (!loadingToastId) return;
		toast.hide(loadingToastId);
		setLoadingToastId('');
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
			await new Promise((resolve) => setTimeout(resolve, 1500));
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
		await new Promise((resolve) => setTimeout(resolve, 1500));
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
		await new Promise((resolve) => setTimeout(resolve, 2000));
		loading.hide();
		await modal.info('Form submitted successfully! Thank you for your feedback.', 'Success');
	};

	return (
		<div className="py-4">
			<div className="mb-4 px-4 text-sm font-medium text-gray-500">Toast</div>
			<Cell title="Basic usage" onClick={showToast} />
			<Cell title="Success" onClick={showToastSuccess} />
			<Cell title="Error" onClick={showToastError} />
			<Cell title="Warning" onClick={showToastWarning} />
			<Cell title="Info" onClick={showToastInfo} />
			<Cell title="Loading" onClick={showToastLoading} />
			{loadingToastId ? (
				<div className="px-4 py-2">
					<Button onClick={hideToastLoading} fill="line" size="sm">
						Close toast
					</Button>
				</div>
			) : null}
			<Cell title="Multiple toasts stacked" onClick={showMultipleToasts} />

			<div className="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Alert</div>
			<Cell title="Basic usage" onClick={showAlertBasic} />
			<Cell title="Success" onClick={showAlertSuccess} />
			<Cell title="Error" onClick={showAlertError} />
			<Cell title="Warning" onClick={showAlertWarning} />
			<Cell title="Info" onClick={showAlertInfo} />
			<Cell title="Multiple alerts stacked" onClick={showMultipleAlerts} />

			<div className="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Dialog</div>
			<Cell title="Basic usage" onClick={showDialogBasic} />
			<Cell title="Confirm dialog" onClick={showDialogConfirm} />
			<Cell title="Delete confirmation (with Loading)" onClick={showDialogDelete} />

			<div className="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Modal</div>
			<Cell title="Basic usage" onClick={showModalBasic} />
			<Cell title="Info modal" onClick={showModalInfo} />

			<div className="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Loading</div>
			<Cell title="Basic usage" onClick={showLoadingBasic} />
			<Cell title="With message" onClick={showLoadingWithMessage} />

			<div className="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Combined Examples</div>
			<Cell title="Simulate network request" onClick={simulateRequest} />
			<Cell title="Form submit flow" onClick={simulateFormSubmit} />
		</div>
	);
}

export default FeedbackEn;
