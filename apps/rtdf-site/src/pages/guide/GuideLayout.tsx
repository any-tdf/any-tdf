import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { buildSiteOutline, observeActiveSiteOutline, type SiteOutlineItem } from '@any-tdf/site-common/outline';
import Menu from '../../components/Menu';
import { guideMenuList, type GuideMenuChild } from '../../data/menuList';
import { useAppContext } from '../../store/appStore';
import ColorPage from './ColorPage';
import IconPage from './IconPage';
import LogoPage from './LogoPage';
import ShortkeyPage from './ShortkeyPage';
import MdPage from './MdPage';

const flatMenuList = guideMenuList.flatMap((group) => group.childs);

// 无 doc 字段的条目对应的 mds/guide 文件名
const specialDocMap: Record<string, string> = {
	create: 'create',
	'icon-plugin': 'iconPlugin',
	md: 'mdPlugin'
};
const getGuideNavFromPath = (pathname: string) => pathname.split('/').filter(Boolean)[1] ?? 'quick-start';

const GuideLayout = () => {
	const location = useLocation();
	const navigate = useNavigate();
	const { lang, isShowNav, setIsShowNav } = useAppContext();
	const isZh = lang === 'zh_CN';

	const contentRootRef = useRef<HTMLDivElement | null>(null);
	const [outline, setOutline] = useState<SiteOutlineItem[]>([]);
	const [activeId, setActiveId] = useState('');
	const [mobileOutlineOpen, setMobileOutlineOpen] = useState(false);

	const path = location.pathname;
	const guideNav = getGuideNavFromPath(path);
	const currentNav: GuideMenuChild = flatMenuList.find((item) => item.nav === guideNav) ?? flatMenuList[0];

	// 路由变化时收起移动端目录
	useEffect(() => {
		setMobileOutlineOpen(false);
	}, [path]);

	// 文档目录
	useEffect(() => {
		const contentRoot = contentRootRef.current;
		if (!contentRoot) return;
		const refreshOutline = () => {
			setOutline(buildSiteOutline(contentRoot));
			return observeActiveSiteOutline(contentRoot, (id) => setActiveId(id));
		};
		let stopOutline = refreshOutline();
		const observer = new MutationObserver(() => {
			stopOutline();
			stopOutline = refreshOutline();
		});
		observer.observe(contentRoot, { childList: true, subtree: true });
		return () => {
			observer.disconnect();
			stopOutline();
		};
	}, [currentNav.nav]);

	const selectMenu = (item: GuideMenuChild) => {
		setIsShowNav(false);
		void navigate(`/guide${item.nav === 'quick-start' ? '' : `/${item.nav}`}`);
	};

	const currentDoc = currentNav.doc ?? specialDocMap[currentNav.nav];
	const editUrl = `https://github.com/any-tdf/any-tdf/edit/main/content/rtdf/guide/${currentDoc}${isZh ? '' : '_en'}.md`;

	const renderPage = () => {
		switch (currentNav.nav) {
			case 'color':
				return <ColorPage />;
			case 'logo':
				return <LogoPage />;
			case 'shortkey':
				return <ShortkeyPage />;
			case 'icon':
				return <IconPage />;
			case 'quick-start':
				return <MdPage doc="quickStart" groupIcon="after" pb12 />;
			case 'theme':
				return <MdPage doc="theme" pb12 />;
			case 'utils':
				return <MdPage doc="utils" pb12 />;
			case 'create':
				return <MdPage doc="create" groupIcon="after" />;
			case 'icon-plugin':
				return <MdPage doc="iconPlugin" groupIcon="before" />;
			case 'md':
				return <MdPage doc="mdPlugin" groupIcon="before" />;
			case 'contribution':
				return <MdPage doc="contribution" groupIcon="after" />;
			default:
				return <MdPage doc={currentNav.doc ?? currentNav.nav} />;
		}
	};

	return (
		<>
			<div className="site-doc-toolbar">
				<button className="site-header-action" onClick={() => setIsShowNav(!isShowNav)} type="button">
					☰ {isZh ? '目录' : 'Menu'}
				</button>
				<button
					className="site-header-action"
					onClick={() => setMobileOutlineOpen(!mobileOutlineOpen)}
					disabled={outline.length === 0}
					type="button"
				>
					{isZh ? '本页目录' : 'On this page'} {outline.length > 0 ? '⌄' : ''}
				</button>
			</div>

			<div className="site-doc-layout">
				<aside className={`site-sidebar${isShowNav ? ' is-open' : ''}`}>
					<Menu menuList={guideMenuList} currentNav={currentNav.nav} onMenuClick={selectMenu} showNum={false} showIcons iconSet="guide" />
				</aside>

				<main className="site-doc-main">
					<div className="site-doc-main-inner is-wide" ref={contentRootRef}>
						{renderPage()}
					</div>

					{!['color', 'logo', 'shortkey'].includes(currentNav.nav) ? (
						<div className="mt-10 flex flex-wrap items-center gap-3 border-t border-(--site-divider) pt-5 text-sm">
							<a className="text-(--site-accent)" href={editUrl} target="_blank" rel="noreferrer">
								{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'} ↗
							</a>
						</div>
					) : null}
				</main>

				<aside className="site-outline" aria-label={isZh ? '本页目录' : 'On this page'}>
					{outline.length > 0 ? (
						<>
							<h2 className="site-outline-title">{isZh ? '本页目录' : 'On this page'}</h2>
							{outline.map((item) => (
								<a
									className={`site-outline-link${activeId === item.id ? ' is-active' : ''}`}
									data-level={item.level}
									aria-current={activeId === item.id ? 'location' : undefined}
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

			{mobileOutlineOpen && outline.length > 0 ? (
				<div className="mobile-outline-panel">
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

export default GuideLayout;
