import { useCallback, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
import hljs from 'highlight.js';
import Menu from '../../components/Menu';
import Tabs from '../../components/Tabs';
import { useAppContext } from '../../store/appStore';
import { menuList, type MenuList, type MenuListChild } from '../../data/menuList';
import Api from './Api';
import Component from './Component';
import FAQ from './FAQ';
import Guide from './Guide';
import Version from './Version';

const sourceModulesZh = import.meta.glob('../../../../../apps/rtdf-demo/src/pages/**/zh_CN.tsx', {
	query: '?raw',
	import: 'default'
});
const sourceModulesEn = import.meta.glob('../../../../../apps/rtdf-demo/src/pages/**/en_US.tsx', {
	query: '?raw',
	import: 'default'
});

const menuChildList = menuList.flatMap((group: MenuList) => group.childs);

const ComponentsPage = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { lang, isShowNav, setIsShowNav, isCmdK, currentColor, themeMode, sysTheme } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [currentNav, setCurrentNav] = useState<MenuListChild>(menuChildList[0]);
	const [currentTab, setCurrentTab] = useState(0);
	const [highlightedCode, setHighlightedCode] = useState('');
	const [loading, setLoading] = useState(true);
	const [isShowIframe, setIsShowIframe] = useState(true);
	const [menuChange, setMenuChange] = useState(true);
	const docRootRef = useRef<HTMLDivElement | null>(null);
	const [outline, setOutline] = useState<SiteOutlineItem[]>([]);
	const [activeId, setActiveId] = useState('');
	const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false);

	const loadSource = useCallback(
		async (nav: string) => {
			setLoading(true);
			const sources = isZh ? sourceModulesZh : sourceModulesEn;
			const sourcePath = Object.keys(sources).find((key) => key.includes(`/pages/${nav}/`));
			if (!sourcePath) {
				setHighlightedCode('');
				setLoading(false);
				return;
			}
			const source = ((await sources[sourcePath]()) as string)
				.replace(/from ['"]\.\.\/\.\.\/lib\/components['"]/g, "from 'rtdf/components'")
				.replace(/from ['"]\.\.\/\.\.\/lib\/types['"]/g, "from 'rtdf/types'");
			setHighlightedCode(hljs.highlight(source, { language: 'typescript', ignoreIllegals: true }).value);
			setLoading(false);
		},
		[isZh]
	);

	const navigateToState = useCallback(
		(nav: string, tab: number) => {
			void navigate(`/components?nav=${nav}&tab=${tab}`);
		},
		[navigate]
	);

	const selectMenu = useCallback(
		async (item: MenuListChild) => {
			setIsShowNav(false);
			setMenuChange(false);
			setCurrentNav(item);
			navigateToState(item.nav, currentTab);
			await loadSource(item.nav);
			setMenuChange(true);
		},
		[currentTab, loadSource, navigateToState, setIsShowNav]
	);

	const selectTab = useCallback(
		(index: number) => {
			setCurrentTab(index);
			setMobileOutlineOpen(false);
			setIsShowIframe(false);
			window.setTimeout(() => setIsShowIframe(true), 10);
			navigateToState(currentNav.nav, index);
		},
		[currentNav.nav, navigateToState]
	);

	// 挂载时从 URL query 读取初始状态
	useEffect(() => {
		const navParam = new URLSearchParams(location.search).get('nav');
		const tabParam = Number(new URLSearchParams(location.search).get('tab') ?? 0);
		const nextNav = menuChildList.find((item) => item.nav === navParam) ?? menuChildList[0];
		const nextTab = Number.isNaN(tabParam) ? 0 : Math.min(Math.max(tabParam, 0), 4);
		setCurrentNav(nextNav);
		setCurrentTab(nextTab);
		void loadSource(nextNav.nav);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// 文档目录（tab !== 0 时）
	useEffect(() => {
		const root = docRootRef.current;
		if (!root || currentTab === 0) {
			setOutline([]);
			setActiveId('');
			return;
		}

		let stopOutline = () => undefined as void;
		const refresh = () => {
			stopOutline();
			setOutline(buildSiteOutline(root));
			stopOutline = observeActiveSiteOutline(root, (id) => setActiveId(id));
		};
		queueMicrotask(refresh);
		const observer = new MutationObserver(refresh);
		observer.observe(root, { childList: true, subtree: true });
		return () => {
			observer.disconnect();
			stopOutline();
		};
	}, [currentTab, currentNav, menuChange]);

	// 键盘导航：←→ 切 tab、↑↓ 切组件
	useEffect(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (isCmdK) return;
			if (event.code === 'ArrowLeft' && currentTab > 0) selectTab(currentTab - 1);
			if (event.code === 'ArrowRight' && currentTab < 4) selectTab(currentTab + 1);
			if (event.code === 'ArrowUp' || event.code === 'ArrowDown') {
				event.preventDefault();
				const currentIndex = menuChildList.findIndex((item) => item.nav === currentNav.nav);
				const nextIndex = event.code === 'ArrowUp' ? currentIndex - 1 : currentIndex + 1;
				if (nextIndex >= 0 && nextIndex < menuChildList.length) void selectMenu(menuChildList[nextIndex]);
			}
		};
		window.addEventListener('keydown', handleKeydown);
		return () => window.removeEventListener('keydown', handleKeydown);
	}, [currentNav.nav, currentTab, isCmdK, selectMenu, selectTab]);

	const resolvedMode = themeMode === 'auto' ? sysTheme : themeMode;
	const demoBaseUrl = import.meta.env.DEV ? `${window.location.protocol}//${window.location.hostname}:8887/` : 'https://demo.rtdf.dev/';
	const demoUrl = `${demoBaseUrl}${currentNav.nav}/${isZh ? 'zh_CN' : 'en_US'}?channel=iframe&theme=${currentColor}&darkMode=${resolvedMode}&lang=${
		isZh ? 'zh_CN' : 'en_US'
	}`;
	const standaloneDemoUrl = `${demoBaseUrl}${currentNav.nav}/${isZh ? 'zh_CN' : 'en_US'}`;

	return (
		<>
			<div className="site-doc-toolbar">
				<button className="site-header-action" onClick={() => setIsShowNav(!isShowNav)} type="button">
					☰ {isZh ? '组件目录' : 'Components'}
				</button>
				{currentTab === 0 ? (
					<a className="site-header-action" href={standaloneDemoUrl} target="_blank" rel="noreferrer">
						{isZh ? '打开预览' : 'Open preview'} ↗
					</a>
				) : (
					<button
						className="site-header-action"
						onClick={() => setMobileOutlineOpen(!mobileOutlineOpen)}
						disabled={outline.length === 0}
						type="button"
					>
						{isZh ? '本页目录' : 'On this page'} {outline.length > 0 ? '⌄' : ''}
					</button>
				)}
			</div>

			<div className="site-component-layout">
				<aside className={`site-sidebar${isShowNav ? ' is-open' : ''}`}>
					<Menu menuList={menuList} currentNav={currentNav.nav} onMenuClick={(item) => void selectMenu(item)} showIcons />
				</aside>

				<main className="site-component-main">
					<header className="component-heading">
						<div className="component-heading-copy">
							<div className="component-title-row" data-component-title-row>
								<h1>{isZh ? currentNav.title : currentNav.title_en}</h1>
								<p>{isZh ? currentNav.tip : currentNav.tip_en}</p>
							</div>
						</div>
					</header>

					<div className="component-tabs">
						<Tabs currentTab={currentTab} onChange={selectTab} />
					</div>

					{currentTab === 0 ? (
						<div className="site-component-stage">
							<div className="site-component-code">
								{loading ? (
									<div className="p-6 text-sm text-(--site-text-muted)">{isZh ? '正在加载示例源码……' : 'Loading example source...'}</div>
								) : (
									<Component highlightedCode={highlightedCode} />
								)}
							</div>
							<div className="site-component-preview" data-site-component-preview>
								{isShowIframe ? <iframe title="RTDF component demo" id="iframe-id" src={demoUrl}></iframe> : null}
							</div>
						</div>
					) : (
						<div className="component-doc-layout">
							<div className="component-doc-content" ref={docRootRef}>
								{menuChange ? (
									currentTab === 1 ? (
										<Api api={currentNav.nav} />
									) : currentTab === 2 ? (
										<Guide guide={currentNav.nav} />
									) : currentTab === 3 ? (
										<FAQ guide={currentNav.nav} />
									) : (
										<Version guide={currentNav.nav} />
									)
								) : null}
							</div>
							<aside className="component-outline" aria-label={isZh ? '本页目录' : 'On this page'}>
								{outline.length > 0 ? (
									<>
										<h2 className="site-outline-title">{isZh ? '本页目录' : 'On this page'}</h2>
										{outline.map((item) => (
											<a
												className={`site-outline-link${activeId === item.id ? ' is-active' : ''}`}
												data-level={item.level}
												href={`#${item.id}`}
												key={item.id}
											>
												{item.title}
											</a>
										))}
									</>
								) : null}
							</aside>
						</div>
					)}
				</main>
			</div>

			{mobileOutlineOpen && outline.length > 0 ? (
				<div className="mobile-component-outline">
					<div className="mb-2 flex items-center justify-between">
						<strong>{isZh ? '本页目录' : 'On this page'}</strong>
						<button className="site-header-action" onClick={() => setMobileOutlineOpen(false)} type="button">
							×
						</button>
					</div>
					{outline.map((item) => (
						<a
							className={`site-outline-link${activeId === item.id ? ' is-active' : ''}`}
							data-level={item.level}
							href={`#${item.id}`}
							onClick={() => setMobileOutlineOpen(false)}
							key={item.id}
						>
							{item.title}
						</a>
					))}
				</div>
			) : null}
		</>
	);
};

export default ComponentsPage;
