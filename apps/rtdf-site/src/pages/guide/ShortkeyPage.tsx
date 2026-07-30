import { useAppContext } from '../../store/appStore';

const ShortkeyPage = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	return (
		<>
			<article className="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto hidden max-w-full pb-8 md:block">
				{isZh ? (
					<>
						<h2>全站</h2>
						<ul>
							<li>
								唤起或关闭组件快速搜索框：<b>⌘ + K（Ctrl + K）</b>。
							</li>
							<li>快速搜索显示时：上下方向键切换选项，回车键选择，ESC 键聚焦输入框或关闭。</li>
						</ul>
						<h2>组件页面</h2>
						<ul>
							<li>上下方向键切换组件，左右方向键切换选项卡。</li>
						</ul>
					</>
				) : (
					<>
						<h2>The whole website</h2>
						<ul>
							<li>
								Call up or close the component quick search box: <b>⌘ + K（Ctrl + K）</b>.
							</li>
							<li>
								When the quick search is displayed: use the up and down arrow keys to switch options, the enter key to select, and the ESC
								key to focus the input box or close it.
							</li>
						</ul>
						<h2>Componenst page</h2>
						<ul>
							<li>Use the up and down arrow keys to switch components, and the left and right arrow keys to switch tabs.</li>
						</ul>
					</>
				)}
			</article>

			<article className="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark block max-w-5xl pb-12 md:hidden">
				<p>{isZh ? '快捷键仅用于桌面端。' : 'Keyboard shortcuts are only available on the desktop site.'}</p>
			</article>
		</>
	);
};

export default ShortkeyPage;
