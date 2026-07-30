<script setup lang="ts">
import { ref } from 'vue';
import { Button, Cell, dialog, loading, modal, showAlert, toast } from 'vtdf';

const loadingToastId = ref('');

const wait = (duration: number) => new Promise<void>((resolve) => setTimeout(resolve, duration));

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

const showToastLoading = () => {
	loadingToastId.value = toast.loading('加载中……');
};

const hideToastLoading = () => {
	if (loadingToastId.value) {
		toast.hide(loadingToastId.value);
		loadingToastId.value = '';
	}
};

const showMultipleToasts = () => {
	toast.success('第一条提示');
	setTimeout(() => toast.info('第二条提示'), 500);
	setTimeout(() => toast.warning('第三条提示'), 1000);
};

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

const showDialogBasic = async () => {
	const result = await dialog({
		title: '提示',
		content: '这是一个对话框，点击按钮查看返回结果',
		primaryText: '确定',
		secondaryText: '取消'
	});
	toast(`您点击了：${result}`);
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
		loading.show('删除中……');
		await wait(1500);
		loading.hide();
		toast.success('删除成功');
	}
};

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

const showLoadingBasic = () => {
	loading.show();
	setTimeout(() => {
		loading.hide();
		toast.success('加载完成');
	}, 2000);
};

const showLoadingWithMessage = () => {
	loading.show('正在处理……');
	setTimeout(() => {
		loading.hide();
		toast.success('处理完成');
	}, 2000);
};

const simulateRequest = async () => {
	loading.show('请求中……');
	await wait(1500);
	loading.hide();
	if (Math.random() > 0.3) {
		toast.success('请求成功');
	} else {
		toast.error('请求失败，请重试');
	}
};

const simulateFormSubmit = async () => {
	const confirmed = await dialog.confirm('确定要提交表单吗？', '提交确认');
	if (!confirmed) {
		toast.info('已取消提交');
		return;
	}
	loading.show('提交中……');
	await wait(2000);
	loading.hide();
	await modal.info('表单提交成功！感谢您的反馈。', '提交成功');
};
</script>

<template>
	<div class="py-4">
		<div class="mb-4 px-4 text-sm font-medium text-gray-500">Toast 轻提示</div>
		<Cell title="基础用法" @click="showToast" />
		<Cell title="成功提示" @click="showToastSuccess" />
		<Cell title="失败提示" @click="showToastError" />
		<Cell title="警告提示" @click="showToastWarning" />
		<Cell title="信息提示" @click="showToastInfo" />
		<Cell title="加载提示" @click="showToastLoading" />
		<div v-if="loadingToastId" class="px-4 py-2">
			<Button @click="hideToastLoading" fill="line" size="sm">关闭加载提示</Button>
		</div>
		<Cell title="多个 Toast 堆叠" @click="showMultipleToasts" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Alert 弹窗提示</div>
		<Cell title="基础用法" @click="showAlertBasic" />
		<Cell title="成功提示" @click="showAlertSuccess" />
		<Cell title="失败提示" @click="showAlertError" />
		<Cell title="警告提示" @click="showAlertWarning" />
		<Cell title="信息提示" @click="showAlertInfo" />
		<Cell title="多个 Alert 堆叠" @click="showMultipleAlerts" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Dialog 对话框</div>
		<Cell title="基础用法" @click="showDialogBasic" />
		<Cell title="确认对话框" @click="showDialogConfirm" />
		<Cell title="删除确认（含 Loading）" @click="showDialogDelete" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Modal 弹框</div>
		<Cell title="基础用法" @click="showModalBasic" />
		<Cell title="信息弹框" @click="showModalInfo" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">Loading 加载</div>
		<Cell title="基础用法" @click="showLoadingBasic" />
		<Cell title="带文字提示" @click="showLoadingWithMessage" />

		<div class="mb-4 mt-8 px-4 text-sm font-medium text-gray-500">综合示例</div>
		<Cell title="模拟网络请求" @click="simulateRequest" />
		<Cell title="表单提交流程" @click="simulateFormSubmit" />
	</div>
</template>
