<script lang="ts">
	import { fade } from 'svelte/transition';
	import { page } from '$app/state';
	import { Tabs } from 'stdf';
	import { currentThemeStore } from '../../store';
	// @ts-expect-error - beautify-qrcode 缺少类型定义。
	import { encodeData, rendererLine } from 'beautify-qrcode';

	interface Props {
		currentTab?: number;
		onclickTab?: (index: number) => void;
	}

	let { currentTab = 0, onclickTab }: Props = $props();
	const isZh = localStorage.getItem('lang') === 'zh_CN';
	const tabList = [
		{ zh: '示例', en: 'Demo' },
		{ zh: 'API', en: 'API' },
		{ zh: '指南', en: 'Guide' },
		{ zh: 'FAQ', en: 'FAQ' },
		{ zh: '版本', en: 'Version' }
	];
	const tabLabels = tabList.map((item) => ({ text: isZh ? item.zh : item.en }));

	let nav = $derived(page.url.searchParams.get('nav') ?? 'button');
	let navClassName = $derived(nav.slice(0, 1).toUpperCase() + nav.slice(1));
	let demoBaseUrl = $derived(import.meta.env.DEV ? `${location.protocol}//${location.hostname}:8888/` : 'https://demo.stdf.dev/');
	let demoUrl = $derived(`${demoBaseUrl}${nav}/${isZh ? 'zh_CN' : 'en_US'}`);
	let sourceUrl = $derived(`https://github.com/any-tdf/any-tdf/blob/main/packages/stdf/src/lib/components/${nav}/${navClassName}.svelte`);
	let stackblitzUrl = $derived(
		`https://stackblitz.com/github/any-tdf/any-tdf?file=apps%2Fstdf-demo%2Fsrc%2Froutes%2F${nav}%2F${isZh ? 'zh_CN' : 'en_US'}%2F%2Bpage.svelte&startScript=dev%3Astdf`
	);
	let previewQrOpen = $state(false);
	let previewQrSvg = $state('');

	const openPreviewQr = () => {
		const qrcode = encodeData({ text: demoUrl, isSpace: false });
		const color = $currentThemeStore === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
		previewQrSvg = rendererLine(qrcode, {
			posType: 2,
			otherColor: color,
			posColor: color
		});
		previewQrOpen = true;
	};

	const selectTab = (index: number) => {
		currentTab = index;
		onclickTab?.(index);
	};
</script>

<div class="tab-shell">
	<div class="tab-control" role="group" aria-label={isZh ? '组件文档类型' : 'Component documentation type'}>
		<Tabs
			active={currentTab}
			transition={false}
			onchange={selectTab}
			tab={{
				labels: tabLabels,
				mx: '0',
				radius: 'sm',
				injClass: 'component-doc-tabs',
				tabInjClass: 'component-doc-tab',
				activeTabInjClass: 'component-doc-tab-active'
			}}
		/>
	</div>
	<div class="tab-tools">
		<div
			class="tab-preview-action"
			onmouseenter={openPreviewQr}
			onmouseleave={() => (previewQrOpen = false)}
			onfocusin={openPreviewQr}
			onfocusout={() => (previewQrOpen = false)}
		>
			<a href={demoUrl} target="_blank" rel="noreferrer">Demo ↗</a>
			{#if previewQrOpen}
				<div class="tab-preview-qr" transition:fade={{ duration: 160 }}>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<div class="tab-preview-qr-code">{@html previewQrSvg}</div>
					<div>{isZh ? '扫码打开移动端预览' : 'Scan to open mobile preview'}</div>
				</div>
			{/if}
		</div>
		<a href={sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>
		<a href={stackblitzUrl} target="_blank" rel="noreferrer">StackBlitz ↗</a>
	</div>
</div>
