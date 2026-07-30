<!-- Feedback Demo -->
<script lang="ts">
	import { Cell, Button } from 'stdf';
	import { toast, showAlert, dialog, modal, loading } from 'stdf';

	// Toast 示例
	const showToast = () => {
		toast('这是一条轻提示');
	};

	const showToastSuccess = () => {
		toast.success('操作成功');
	};

	const showToastError = () => {
		toast.error('操作失败');
	};

	const showToastWarning = () => {
		toast.warning('警告提示');
	};

	const showToastInfo = () => {
		toast.info('信息提示');
	};

	let loadingToastId = '';
	const showToastLoading = () => {
		loadingToastId = toast.loading('加载中...');
	};

	const hideToastLoading = () => {
		if (loadingToastId) {
			toast.hide(loadingToastId);
			loadingToastId = '';
		}
	};

	const showMultipleToasts = () => {
		toast.success('第一条提示');
		setTimeout(() => toast.info('第二条提示'), 500);
		setTimeout(() => toast.warning('第三条提示'), 1000);
	};

	// Alert 示例
	const showAlertBasic = () => {
		showAlert('这是一条弹窗提示');
	};

	const showAlertSuccess = () => {
		showAlert.success('操作成功', { title: '成功' });
	};

	const showAlertError = () => {
		showAlert.error('操作失败', { title: '错误' });
	};

	const showAlertWarning = () => {
		showAlert.warning('请注意', { title: '警告' });
	};

	const showAlertInfo = () => {
		showAlert.info('这是一条信息', { title: '提示' });
	};

	const showMultipleAlerts = () => {
		showAlert.success('第一条提示');
		setTimeout(() => showAlert.info('第二条提示'), 500);
		setTimeout(() => showAlert.warning('第三条提示'), 1000);
	};

	// Dialog 示例
	const showDialogBasic = async () => {
		const result = await dialog({
			title: '提示',
			content: '这是一个对话框，点击按钮查看返回结果',
			primaryText: '确定',
			secondaryText: '取消'
		});
		toast(`您点击了: ${result}`);
	};

	const showDialogConfirm = async () => {
		const confirmed = await dialog.confirm('确定要执行此操作吗？', '操作确认');
		if (confirmed) {
			toast.success('您选择了确定');
		} else {
			toast.info('您选择了取消');
		}
	};

	const showDialogDelete = async () => {
		const confirmed = await dialog.confirm('此操作不可恢复，确定要删除吗？', '删除确认');
		if (confirmed) {
			loading.show('删除中...');
			// 模拟删除操作
			await new Promise(resolve => setTimeout(resolve, 1500));
			loading.hide();
			toast.success('删除成功');
		}
	};

	// Modal 示例
	const showModalBasic = async () => {
		await modal({
			title: '提示',
			content: '这是一个单按钮弹框',
			btnText: '知道了'
		});
		toast('弹框已关闭');
	};

	const showModalInfo = async () => {
		await modal.info('操作已完成，请查看结果', '完成');
	};

	// Loading 示例
	const showLoadingBasic = () => {
		loading.show();
		setTimeout(() => {
			loading.hide();
			toast.success('加载完成');
		}, 2000);
	};

	const showLoadingWithMessage = () => {
		loading.show('正在处理...');
		setTimeout(() => {
			loading.hide();
			toast.success('处理完成');
		}, 2000);
	};

	// 综合示例：模拟请求
	const simulateRequest = async () => {
		loading.show('请求中...');

		// 模拟网络请求
		await new Promise(resolve => setTimeout(resolve, 1500));

		loading.hide();

		// 随机成功或失败
		if (Math.random() > 0.3) {
			toast.success('请求成功');
		} else {
			toast.error('请求失败，请重试');
		}
	};

	// 综合示例：表单提交
	const simulateFormSubmit = async () => {
		const confirmed = await dialog.confirm('确定要提交表单吗？', '提交确认');

		if (!confirmed) {
			toast.info('已取消提交');
			return;
		}

		loading.show('提交中...');
		await new Promise(resolve => setTimeout(resolve, 2000));
		loading.hide();

		await modal.info('表单提交成功！感谢您的反馈。', '提交成功');
	};
</script>

<div class="py-4">
	<!-- Toast 示例 -->
	<div class="mb-4 px-4 text-sm font-medium text-gray-500">Toast 轻提示</div>
	<Cell title="基础用法" onclick={showToast} />
	<Cell title="成功提示" onclick={showToastSuccess} />
	<Cell title="失败提示" onclick={showToastError} />
	<Cell title="警告提示" onclick={showToastWarning} />
	<Cell title="信息提示" onclick={showToastInfo} />
	<Cell title="加载提示" onclick={showToastLoading} />
	{#if loadingToastId}
		<div class="px-4 py-2">
			<Button onclick={hideToastLoading} fill="line" size="sm">关闭加载提示</Button>
		</div>
	{/if}
	<Cell title="多个 Toast 堆叠" onclick={showMultipleToasts} />

	<!-- Alert 示例 -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Alert 弹窗提示</div>
	<Cell title="基础用法" onclick={showAlertBasic} />
	<Cell title="成功提示" onclick={showAlertSuccess} />
	<Cell title="失败提示" onclick={showAlertError} />
	<Cell title="警告提示" onclick={showAlertWarning} />
	<Cell title="信息提示" onclick={showAlertInfo} />
	<Cell title="多个 Alert 堆叠" onclick={showMultipleAlerts} />

	<!-- Dialog 示例 -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Dialog 对话框</div>
	<Cell title="基础用法" onclick={showDialogBasic} />
	<Cell title="确认对话框" onclick={showDialogConfirm} />
	<Cell title="删除确认（含 Loading）" onclick={showDialogDelete} />

	<!-- Modal 示例 -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Modal 弹框</div>
	<Cell title="基础用法" onclick={showModalBasic} />
	<Cell title="信息弹框" onclick={showModalInfo} />

	<!-- Loading 示例 -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Loading 加载</div>
	<Cell title="基础用法" onclick={showLoadingBasic} />
	<Cell title="带文字提示" onclick={showLoadingWithMessage} />

	<!-- 综合示例 -->
	<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">综合示例</div>
	<Cell title="模拟网络请求" onclick={simulateRequest} />
	<Cell title="表单提交流程" onclick={simulateFormSubmit} />
</div>
