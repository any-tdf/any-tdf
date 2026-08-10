<script lang="ts">
	import { onMount } from 'svelte';
	import { fly, fade } from 'svelte/transition';
	import { isShowFundStore } from '../../store';

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	let showWeChatPay = $state(false);
	let showAlipayPay = $state(false);

	// 判断是否是桌面设备
	const isDeskDeviceFunc = () => {
		return window.innerWidth >= 768;
	};
	const isDeskDevice = isDeskDeviceFunc();

	let overlayEl: HTMLDivElement;
	let panelEl: HTMLDivElement;
	let closeBtnEl: HTMLButtonElement;

	// 关闭弹窗
	const closeFundFunc = () => {
		isShowFundStore.set(false);
	};

	// 获取弹窗面板内所有可见的可聚焦元素
	const getFocusableFunc = () => {
		if (!panelEl) return [];
		return Array.from(panelEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter((el) => el.offsetParent !== null);
	};

	// 键盘事件：Escape 关闭弹窗，Tab/Shift+Tab 将焦点圈禁在弹窗内
	const keydownFunc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			e.preventDefault();
			closeFundFunc();
			return;
		}
		if (e.key !== 'Tab') return;
		const focusableEls = getFocusableFunc();
		if (focusableEls.length === 0) return;
		const firstEl = focusableEls[0];
		const lastEl = focusableEls[focusableEls.length - 1];
		const activeInPanel = panelEl?.contains(document.activeElement);
		if (e.shiftKey && (!activeInPanel || document.activeElement === firstEl)) {
			e.preventDefault();
			lastEl.focus();
		} else if (!e.shiftKey && (!activeInPanel || document.activeElement === lastEl)) {
			e.preventDefault();
			firstEl.focus();
		}
	};

	// 点击遮罩（弹窗面板以外区域）关闭弹窗
	const clickFunc = (e: MouseEvent) => {
		if (e.target === overlayEl) closeFundFunc();
	};

	onMount(() => {
		// 记录打开弹窗前的焦点元素，打开后将焦点移入弹窗内的关闭按钮
		const prevActiveEl = document.activeElement as HTMLElement | null;
		closeBtnEl?.focus();
		return () => {
			// 关闭后将焦点还给触发元素
			prevActiveEl?.focus();
		};
	});
</script>

<svelte:window onkeydown={keydownFunc} onclick={clickFunc} />

<div
	bind:this={overlayEl}
	transition:fade
	class="fixed left-0 top-0 flex h-screen w-screen flex-col justify-center bg-black/20 backdrop-blur"
	style="z-index: 1000"
>
	<div
		bind:this={panelEl}
		in:fly={{ y: -400 }}
		role="dialog"
		aria-modal="true"
		aria-label={isZh ? '支持' : 'Support'}
		class="site-fund-panel mx-auto max-w-md overflow-y-auto rounded-xl bg-white p-4 shadow-lg md:w-200 md:max-w-none md:p-8 dark:bg-gray-950"
	>
		<div class="flex justify-between">
			<div class="text-xl font-bold">{isZh ? '支持' : 'Support'}</div>
			<div class="flex items-center gap-2">
				<div class="h-8">
					<a href="https://github.com/any-tdf/any-tdf" target="_blank">
						<img src="https://img.shields.io/github/stars/any-tdf/any-tdf?logo=github&label=stars&color=000" alt="GitHub" />
					</a>
				</div>
				<button
					bind:this={closeBtnEl}
					class="site-header-action"
					type="button"
					aria-label={isZh ? '关闭' : 'Close'}
					onclick={closeFundFunc}
				>
					×
				</button>
			</div>
		</div>
		{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
			<div class="mt-2 text-xs text-gray-500 md:mt-8">
				<p>
					{isZh
						? 'STDF 是一个免费、开源、简单易用且精心打造的组件库。我们在组件设计开发、工具配套、文档建设等方面倾注了大量心血。如果 STDF 为您带来了便利，希望您能给个 star 或打赏以示支持，感谢您的厚爱！'
						: 'STDF is a free, open-source, easy-to-use, and carefully crafted component library. We have devoted tremendous effort to component design, development tools, and documentation. If STDF has helped you, please consider showing your support with a star or donation. Thank you for your love!'}
				</p>
				<p class="text-md mt-2 font-bold">
					{isZh ? '无论如何，STDF 都将怀着热爱继续前行！' : 'No matter what, STDF will keep moving forward with love!'}
				</p>
			</div>
		{/if}
		<div class="grid {showWeChatPay || showAlipayPay ? 'grid-cols-1' : 'grid-cols-2'}  mt-4 gap-2 text-center md:mt-10 md:grid-cols-4">
			<!-- coffee -->
			{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
				<div
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-6">
						<img class="h-full w-full object-cover" src="/assets/fund/coffee.svg" alt="coffee" />
					</div>
					<a class="mx-2 block md:hidden" href="https://www.buymeacoffee.com/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
					<a
						class="absolute inset-1 hidden h-[95%] w-[95%] bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
						href="https://www.buymeacoffee.com/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
				</div>
			{/if}
			<!-- paypal -->
			{#if isDeskDevice || (!showWeChatPay && !showAlipayPay)}
				<div
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-8">
						<img class="h-full w-full object-cover" src="/assets/fund/paypal.svg" alt="paypal" />
					</div>
					<a class="mx-2 block md:hidden" href="https://paypal.me/dufu1991" target="_blank">
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
					<a
						class="absolute inset-1 hidden h-[95%] w-[95%] bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
						href="https://paypal.me/dufu1991"
						target="_blank"
					>
						<div class="text-center font-bold after:content-['_↗']">PayPal</div>
						<div class="mt-1 text-xs text-gray-500">
							{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}
						</div>
					</a>
				</div>
			{/if}
			<!-- wechat -->
			{#if isDeskDevice || !showAlipayPay}
				<div
					class="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-10" class:hidden={showWeChatPay}>
						<img class="h-full w-full object-cover" src="/assets/fund/wechat_pay.svg" alt="wechat" />
					</div>
					<div
						class="mx-2 block md:hidden"
						onclick={() => {
							showWeChatPay = !showWeChatPay;
						}}
					>
						{#if showWeChatPay}
							<div class="mt-1">
								<img class="mx-auto w-3/5 object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '微信扫一扫' : 'WeChat Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗']">
								{isZh ? '微信赞赏' : 'WeChat Reward'}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</div>
					<button
						onclick={() => {
							showWeChatPay = !showWeChatPay;
						}}
						class="absolute inset-1 hidden h-[95%] w-[95%] cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
						class:opacity-95={showWeChatPay}
					>
						{#if showWeChatPay}
							<div class="mt-0.5">
								<img class="mx-auto w-[70%] object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
							</div>
							<div class="mt-0.5 text-xs text-gray-500">
								{isZh ? '微信扫一扫' : 'WeChat Scan'}
							</div>
						{:else}
							<div class="mt-12 text-center font-bold after:content-['_↗']">
								{isZh ? '微信赞赏' : 'WeChat Reward'}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</button>
				</div>
			{/if}
			<!-- alipay -->
			{#if isDeskDevice || !showWeChatPay}
				<div
					class="group mx-auto flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10"
				>
					<div class="mx-auto h-8 w-8" class:hidden={showAlipayPay}>
						<img class="h-full w-full object-cover" src="/assets/fund/alipay.svg" alt="alipay" />
					</div>
					<div
						class="mx-2 block md:hidden"
						onclick={() => {
							showAlipayPay = !showAlipayPay;
						}}
					>
						{#if showAlipayPay}
							<div class="m-1">
								<img class="mx-auto w-3/5 object-cover" src="/assets/fund/ap_code.png" alt="alipay" />
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '支付宝扫一扫' : 'Alipay Scan'}
							</div>
						{:else}
							<div class="text-center font-bold after:content-['_↗']">
								{isZh ? '支付宝收款' : 'Alipay Payment'}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</div>
					<button
						onclick={() => {
							showAlipayPay = !showAlipayPay;
						}}
						class="absolute inset-1 hidden h-[95%] w-[95%] cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
						class:opacity-95={showAlipayPay}
					>
						{#if showAlipayPay}
							<div class="mt-0.5">
								<img class="mx-auto w-[70%] object-cover" src="/assets/fund/ap_code.png" alt="wechat" />
							</div>
							<div class="mt-0.5 text-xs text-gray-500">
								{isZh ? '支付宝扫一扫' : 'Alipay Scan'}
							</div>
						{:else}
							<div class="mt-12 text-center font-bold after:content-['_↗']">
								{isZh ? '支付宝收款' : 'Alipay Payment'}
							</div>
							<div class="mt-1 text-xs text-gray-500">
								{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}
							</div>
						{/if}
					</button>
				</div>
			{/if}
		</div>
		<div class="mt-4 text-xs text-gray-500 md:mt-8">
			{isZh
				? '欢迎在捐赠留言中附上您的 GitHub 或其他社交账号链接，STDF 将在项目仓库和官网中展示感谢！'
				: 'Feel free to include your GitHub or other social media links in the donation message. STDF will gratefully acknowledge your support on our repository and website!'}
		</div>
	</div>
</div>
