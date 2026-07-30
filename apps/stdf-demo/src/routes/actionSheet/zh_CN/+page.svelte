<!-- ActionSheet Demo -->
<script lang="ts">
	import { Cell, ActionSheet, Toast } from 'stdf';
	import { type ActionProps } from 'stdf/types';

	let visible1 = $state(false);
	let visible2 = $state(false);
	let visible3 = $state(false);
	let visible4 = $state(false);
	let visible5 = $state(false);
	let visible6 = $state(false);
	let visible7 = $state(false);
	let visible8 = $state(false);
	let visible9 = $state(false);
	let visible10 = $state(false);
	let visible11 = $state(false);
	let visible12 = $state(false);

	const actions: ActionProps[] = [{ content: '选项一' }, { content: '选项二' }, { content: '选项三' }];

	const actions1: ActionProps[] = [
		{ content: '常规选项' },
		{ content: '主题选项', style: 'theme' },
		{ content: '成功选项', style: 'success' },
		{ content: '警告选项', style: 'warning' },
		{ content: '错误选项', style: 'error' },
		{ content: '信息选项', style: 'info' },
		{ content: '禁用选项', style: 'warning', disabled: true }
	];
	const actions2: ActionProps[] = [
		{ content: '选项一' },
		{ content: '选项二', desc: '这里是描述信息' },
		{ content: '选项三', style: 'error', desc: '这里是描述信息' }
	];
	const actions3: ActionProps[] = [
		{ content: '火女', showImg: true, imgSrc: '/assets/images/dota_火女.png', imgRadius: 'sm' },
		{ content: '小牛', showImg: true, imgSrc: '/assets/images/dota_小牛.png', imgRadius: 'sm' },
		{ content: '水人', showImg: true, imgSrc: '/assets/images/dota_水人.png', imgRadius: 'sm' }
	];
	const actions4: ActionProps[] = [
		{ content: 'Apple', showImg: true, imgSrc: '/assets/logos/apple.png', imgRadius: 'none' },
		{ content: 'Google', showImg: true, imgSrc: '/assets/logos/google.png', imgRadius: 'none' },
		{ content: 'Microsoft', showImg: true, imgSrc: '/assets/logos/microsoft.png', imgRadius: 'none' },
		{ content: 'Adobe', showImg: true, imgSrc: '/assets/logos/adobe.png', imgRadius: 'none' },
		{ content: 'Figma', showImg: true, imgSrc: '/assets/logos/figma.png', imgRadius: 'none' }
	];

	let toastVisible1 = $state(false);
	let toastVisible2 = $state(false);
	let toastVisible3 = $state(false);
	let index = $state(0);
	let item = $state({ content: '' });
	const clickActionFunc = (i: number, action: ActionProps) => {
		index = i;
		item = action;
		toastVisible3 = true;
	};
</script>

<div class="py-4">
	<Cell title="基础用法" onclick={() => (visible1 = true)} />
	<ActionSheet bind:visible={visible1} {actions} />

	<Cell title="有取消操作且点击遮罩不可关闭" onclick={() => (visible2 = true)} />
	<ActionSheet bind:visible={visible2} {actions} showCancel popup={{ maskClosable: false }} />

	<Cell title="不同样式" onclick={() => (visible3 = true)} />
	<ActionSheet bind:visible={visible3} actions={actions1} />

	<Cell title="带标题和描述信息" onclick={() => (visible4 = true)} />
	<ActionSheet bind:visible={visible4} actions={actions2} title="这里是标题，可以简要说明以下操作。" />

	<Cell title="顶部来点圆角" onclick={() => (visible5 = true)} />
	<ActionSheet bind:visible={visible5} {actions} popup={{ radius: 'xl' }} />

	<Cell title="两侧有间距" onclick={() => (visible6 = true)} />
	<ActionSheet bind:visible={visible6} {actions} popup={{ radius: 'xl', px: '2' }} />

	<Cell title="监听关闭事件" onclick={() => (visible7 = true)} />
	<ActionSheet bind:visible={visible7} {actions} onclose={() => (toastVisible1 = true)} />
	<Toast bind:visible={toastVisible1} message="关闭了 ActionSheet！" />

	<Cell title="监听取消事件" onclick={() => (visible8 = true)} />
	<ActionSheet bind:visible={visible8} {actions} showCancel oncancel={() => (toastVisible2 = true)} />
	<Toast bind:visible={toastVisible2} message="点击了取消！" />

	<Cell title="监听选项点击事件" onclick={() => (visible9 = true)} />
	<ActionSheet bind:visible={visible9} {actions} onclickAction={clickActionFunc} />
	<Toast bind:visible={toastVisible3} message={`点击了第 ${index + 1} 项，${item.content}！`} />

	<Cell title="点击选项不关闭" onclick={() => (visible10 = true)} />
	<ActionSheet bind:visible={visible10} {actions} actionClosable={false} />

	<Cell title="选项带图片" onclick={() => (visible11 = true)} />
	<ActionSheet bind:visible={visible11} actions={actions3} />

	<Cell title="选项左对齐" onclick={() => (visible12 = true)} />
	<ActionSheet bind:visible={visible12} actions={actions4} align="left" />
</div>
