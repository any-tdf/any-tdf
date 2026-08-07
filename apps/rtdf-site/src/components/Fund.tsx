import { useEffect, useRef, useState } from 'react';
import { useAppContext } from '../store/appStore';

const Fund = () => {
	const { lang, setIsShowFund } = useAppContext();
	const isZh = lang === 'zh_CN';
	const [showWeChatPay, setShowWeChatPay] = useState(false);
	const [showAlipayPay, setShowAlipayPay] = useState(false);

	// 判断是否是桌面设备
	const isDeskDevice = window.innerWidth >= 768;

	const panelRef = useRef<HTMLDivElement>(null);
	const closeBtnRef = useRef<HTMLButtonElement>(null);

	// 关闭弹窗
	const closeFundFun = () => {
		setIsShowFund(false);
	};

	useEffect(() => {
		// 记录打开弹窗前的焦点元素，打开后将焦点移入弹窗内的关闭按钮
		const prevActiveEl = document.activeElement as HTMLElement | null;
		closeBtnRef.current?.focus();
		// 键盘事件：Escape 关闭弹窗，Tab/Shift+Tab 将焦点圈禁在弹窗内
		const keydownFun = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				e.preventDefault();
				setIsShowFund(false);
				return;
			}
			if (e.key !== 'Tab') return;
			const panelEl = panelRef.current;
			if (!panelEl) return;
			const focusableEls = Array.from(panelEl.querySelectorAll<HTMLElement>('a[href], button:not([disabled])')).filter(
				(el) => el.offsetParent !== null
			);
			if (focusableEls.length === 0) return;
			const firstEl = focusableEls[0];
			const lastEl = focusableEls[focusableEls.length - 1];
			const activeInPanel = panelEl.contains(document.activeElement);
			if (e.shiftKey && (!activeInPanel || document.activeElement === firstEl)) {
				e.preventDefault();
				lastEl.focus();
			} else if (!e.shiftKey && (!activeInPanel || document.activeElement === lastEl)) {
				e.preventDefault();
				firstEl.focus();
			}
		};
		window.addEventListener('keydown', keydownFun);
		return () => {
			window.removeEventListener('keydown', keydownFun);
			// 关闭后将焦点还给触发元素
			prevActiveEl?.focus();
		};
	}, [setIsShowFund]);

	return (
		<div
			className="animate-cmdk-fade fixed left-0 top-0 flex h-screen w-screen flex-col justify-center bg-black/20 backdrop-blur"
			style={{ zIndex: 1000 }}
			onClick={() => {
				setIsShowFund(false);
			}}
		>
			<div
				ref={panelRef}
				role="dialog"
				aria-modal="true"
				aria-label={isZh ? '支持' : 'Support'}
				className="site-modal-viewport-width mx-auto max-w-md rounded-xl bg-white p-4 shadow-lg md:w-200 md:max-w-none md:p-8 dark:bg-gray-950"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex justify-between">
					<div className="text-xl font-bold">{isZh ? '支持' : 'Support'}</div>
					<div className="flex items-center gap-2">
						<div className="h-8">
							<a href="https://github.com/any-tdf/any-tdf" target="_blank" rel="noreferrer">
								<img src="https://img.shields.io/github/stars/any-tdf/any-tdf?logo=github&label=stars&color=000" alt="GitHub" />
							</a>
						</div>
						<button ref={closeBtnRef} className="site-header-action" type="button" aria-label={isZh ? '关闭' : 'Close'} onClick={closeFundFun}>
							×
						</button>
					</div>
				</div>
				{isDeskDevice || (!showWeChatPay && !showAlipayPay) ? (
					<div className="mt-2 text-xs text-gray-500 md:mt-8">
						<p>
							{isZh
								? 'RTDF 是一个免费、开源、简单易用且精心打造的组件库。我们在组件设计开发、工具配套、文档建设等方面倾注了大量心血。如果 RTDF 为您带来了便利，希望您能给个 star 或打赏以示支持，感谢您的厚爱！'
								: 'RTDF is a free, open-source, easy-to-use, and carefully crafted component library. We have devoted tremendous effort to component design, development tools, and documentation. If RTDF has helped you, please consider showing your support with a star or donation. Thank you for your love!'}
						</p>
						<p className="text-md mt-2 font-bold">
							{isZh ? '无论如何，RTDF 都将怀着热爱继续前行！' : 'No matter what, RTDF will keep moving forward with love!'}
						</p>
					</div>
				) : null}
				<div
					className={`grid ${showWeChatPay || showAlipayPay ? 'grid-cols-1' : 'grid-cols-2'} mt-4 gap-2 text-center md:mt-10 md:grid-cols-4`}
				>
					{/* coffee */}
					{isDeskDevice || (!showWeChatPay && !showAlipayPay) ? (
						<div className="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10">
							<div className="mx-auto h-8 w-6">
								<img className="h-full w-full object-cover" src="/assets/fund/coffee.svg" alt="coffee" />
							</div>
							<a className="mx-2 block md:hidden" href="https://www.buymeacoffee.com/dufu1991" target="_blank" rel="noreferrer">
								<div className="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
								<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}</div>
							</a>
							<a
								className="fund-hover-panel absolute inset-1 hidden bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
								href="https://www.buymeacoffee.com/dufu1991"
								target="_blank"
								rel="noreferrer"
							>
								<div className="text-center font-bold after:content-['_↗']">Buy Me a Coffee</div>
								<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}</div>
							</a>
						</div>
					) : null}
					{/* paypal */}
					{isDeskDevice || (!showWeChatPay && !showAlipayPay) ? (
						<div className="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10">
							<div className="mx-auto h-8 w-8">
								<img className="h-full w-full object-cover" src="/assets/fund/paypal.svg" alt="paypal" />
							</div>
							<a className="mx-2 block md:hidden" href="https://paypal.me/dufu1991" target="_blank" rel="noreferrer">
								<div className="text-center font-bold after:content-['_↗']">PayPal</div>
								<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}</div>
							</a>
							<a
								className="fund-hover-panel absolute inset-1 hidden bg-white px-1 py-12 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950"
								href="https://paypal.me/dufu1991"
								target="_blank"
								rel="noreferrer"
							>
								<div className="text-center font-bold after:content-['_↗']">PayPal</div>
								<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐非中国地区使用' : 'Recommended for Non-China Regions'}</div>
							</a>
						</div>
					) : null}
					{/* wechat */}
					{isDeskDevice || !showAlipayPay ? (
						<div className="group flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10">
							<div className={`mx-auto h-8 w-10${showWeChatPay ? ' hidden' : ''}`}>
								<img className="h-full w-full object-cover" src="/assets/fund/wechat_pay.svg" alt="wechat" />
							</div>
							<div
								className="mx-2 block md:hidden"
								onClick={() => {
									setShowWeChatPay(!showWeChatPay);
								}}
							>
								{showWeChatPay ? (
									<>
										<div className="mt-1">
											<img className="mx-auto w-3/5 object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
										</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '微信扫一扫' : 'WeChat Scan'}</div>
									</>
								) : (
									<>
										<div className="text-center font-bold after:content-['_↗']">{isZh ? '微信赞赏' : 'WeChat Reward'}</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}</div>
									</>
								)}
							</div>
							<button
								onClick={() => {
									setShowWeChatPay(!showWeChatPay);
								}}
								className={`fund-hover-panel absolute inset-1 hidden cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950${
									showWeChatPay ? ' opacity-95' : ''
								}`}
								type="button"
							>
								{showWeChatPay ? (
									<>
										<div className="mt-0.5">
											<img className="fund-qr-image mx-auto object-cover" src="/assets/fund/wp_code.png" alt="wechat" />
										</div>
										<div className="mt-0.5 text-xs text-gray-500">{isZh ? '微信扫一扫' : 'WeChat Scan'}</div>
									</>
								) : (
									<>
										<div className="mt-12 text-center font-bold after:content-['_↗']">{isZh ? '微信赞赏' : 'WeChat Reward'}</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}</div>
									</>
								)}
							</button>
						</div>
					) : null}
					{/* alipay */}
					{isDeskDevice || !showWeChatPay ? (
						<div className="group mx-auto flex w-full flex-col justify-center rounded-lg border border-black/10 py-1 md:relative md:w-40 md:py-12 dark:border-white/10">
							<div className={`mx-auto h-8 w-8${showAlipayPay ? ' hidden' : ''}`}>
								<img className="h-full w-full object-cover" src="/assets/fund/alipay.svg" alt="alipay" />
							</div>
							<div
								className="mx-2 block md:hidden"
								onClick={() => {
									setShowAlipayPay(!showAlipayPay);
								}}
							>
								{showAlipayPay ? (
									<>
										<div className="m-1">
											<img className="mx-auto w-3/5 object-cover" src="/assets/fund/ap_code.png" alt="alipay" />
										</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '支付宝扫一扫' : 'Alipay Scan'}</div>
									</>
								) : (
									<>
										<div className="text-center font-bold after:content-['_↗']">{isZh ? '支付宝收款' : 'Alipay Payment'}</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}</div>
									</>
								)}
							</div>
							<button
								onClick={() => {
									setShowAlipayPay(!showAlipayPay);
								}}
								className={`fund-hover-panel absolute inset-1 hidden cursor-pointer bg-white px-1 opacity-0 transition-all duration-500 group-hover:opacity-95 group-focus-within:opacity-95 md:block dark:bg-gray-950${
									showAlipayPay ? ' opacity-95' : ''
								}`}
								type="button"
							>
								{showAlipayPay ? (
									<>
										<div className="mt-0.5">
											<img className="fund-qr-image mx-auto object-cover" src="/assets/fund/ap_code.png" alt="wechat" />
										</div>
										<div className="mt-0.5 text-xs text-gray-500">{isZh ? '支付宝扫一扫' : 'Alipay Scan'}</div>
									</>
								) : (
									<>
										<div className="mt-12 text-center font-bold after:content-['_↗']">{isZh ? '支付宝收款' : 'Alipay Payment'}</div>
										<div className="mt-1 text-xs text-gray-500">{isZh ? '推荐中国地区使用' : 'Recommended for China Regions'}</div>
									</>
								)}
							</button>
						</div>
					) : null}
				</div>
				<div className="mt-4 text-xs text-gray-500 md:mt-8">
					{isZh
						? '欢迎在捐赠留言中附上您的 GitHub 或其他社交账号链接，RTDF 将在项目仓库和官网中展示感谢！'
						: 'Feel free to include your GitHub or other social media links in the donation message. RTDF will gratefully acknowledge your support on our repository and website!'}
				</div>
			</div>
		</div>
	);
};

export default Fund;
