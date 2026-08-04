import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { createSiteLanguageUrl, getSiteNavigationState, siteHeaderIconPaths, sitePaths } from '@any-tdf/site-common/site';
import ModeSwitch from './ModeSwitch';
import RtdfLogo from './RtdfLogo';
import ThemeSwitch from './ThemeSwitch';
import { useAppContext } from '../store/appStore';

const HeaderIcon = ({ name }: { name: keyof typeof siteHeaderIconPaths }) => (
	<svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d={siteHeaderIconPaths[name]} />
	</svg>
);

type HeaderProps = {
	showLeftNav?: boolean;
	onclickCmdK?: () => void;
};

const Header = ({ showLeftNav = false, onclickCmdK }: HeaderProps) => {
	const location = useLocation();
	const { lang, setIsShowFund, showThemeSwitch, setShowThemeSwitch } = useAppContext();
	const [mobileOpen, setMobileOpen] = useState(false);
	const [mobileThemeOpen, setMobileThemeOpen] = useState(false);
	const [versionOpen, setVersionOpen] = useState(false);
	const themePanelRef = useRef<HTMLDivElement | null>(null);
	const versionPanelRef = useRef<HTMLDivElement | null>(null);

	const isZh = lang === 'zh_CN';
	const currentRoute = location.pathname;
	const { isGuide, isComponents, isGenerator } = getSiteNavigationState(currentRoute);

	// 点击外部或按下 Escape 时关闭面板
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			if (!themePanelRef.current?.contains(event.target as Node)) setShowThemeSwitch(false);
			if (!versionPanelRef.current?.contains(event.target as Node)) setVersionOpen(false);
		};
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				setShowThemeSwitch(false);
				setVersionOpen(false);
			}
		};
		document.addEventListener('click', handleClick);
		document.addEventListener('keydown', handleKeydown);
		return () => {
			document.removeEventListener('click', handleClick);
			document.removeEventListener('keydown', handleKeydown);
		};
	}, [setShowThemeSwitch]);

	const switchLang = () => {
		window.location.href = createSiteLanguageUrl(window.location.href, isZh ? 'zh_CN' : 'en_US');
	};

	const toggleTheme = (event: React.MouseEvent) => {
		event.stopPropagation();
		setVersionOpen(false);
		setShowThemeSwitch(!showThemeSwitch);
	};

	const toggleVersion = (event: React.MouseEvent) => {
		event.stopPropagation();
		setShowThemeSwitch(false);
		setVersionOpen(!versionOpen);
	};

	return (
		<header className="site-header" data-has-sidebar={showLeftNav || undefined}>
			<div className="site-header-inner">
				<div className="flex min-w-0 items-center gap-3">
					<a href="/" className="site-brand" aria-label={isZh ? 'RTDF 首页' : 'RTDF home'}>
						<span className="site-brand-mark">
							<RtdfLogo className="size-full" />
						</span>
						<span className="site-brand-name">RTDF</span>
					</a>
					<div className="relative" ref={versionPanelRef}>
						<button
							className="site-status site-version-trigger"
							type="button"
							onClick={toggleVersion}
							aria-haspopup="menu"
							aria-expanded={versionOpen}
							aria-controls="site-version-menu"
						>
							<span>0.0 · ALPHA</span>
							<svg className="site-version-chevron" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
								<path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41Z" />
							</svg>
						</button>
						{versionOpen ? (
							<div id="site-version-menu" className="site-popover site-version-popover" role="menu">
								<div className="site-version-current">
									<div>
										<div className="site-version-number">0.0.x</div>
										<div className="site-version-meta">Alpha</div>
									</div>
									<span className="site-version-current-label">{isZh ? '当前版本' : 'Current'}</span>
								</div>
								<a className="site-version-link" href="/guide/changelog" role="menuitem">
									<span>{isZh ? '更新日志' : 'Changelog'}</span>
									<span aria-hidden="true">→</span>
								</a>
							</div>
						) : null}
					</div>
				</div>

				<nav className="site-header-nav" aria-label={isZh ? '主导航' : 'Main navigation'}>
					<button
						className="site-search-trigger"
						onClick={() => onclickCmdK?.()}
						type="button"
						aria-label={isZh ? '搜索文档' : 'Search docs'}
					>
						<span>{isZh ? '搜索文档' : 'Search docs'}</span>
						<span className="site-search-key" aria-hidden="true">
							⌘ K
						</span>
					</button>
					<a className={`site-header-link${isGuide ? ' is-active' : ''}`} aria-current={isGuide ? 'page' : undefined} href="/guide">
						{isZh ? '指南' : 'Guide'}
					</a>
					<a
						className={`site-header-link${isComponents ? ' is-active' : ''}`}
						aria-current={isComponents ? 'page' : undefined}
						href={sitePaths.components}
					>
						{isZh ? '组件' : 'Components'}
					</a>
					<div className="relative" ref={themePanelRef}>
						<button
							className="site-header-action"
							onClick={toggleTheme}
							type="button"
							aria-expanded={showThemeSwitch}
							aria-current={isGenerator ? 'page' : undefined}
						>
							{isZh ? '主题' : 'Theme'}
						</button>
						{showThemeSwitch ? (
							<div className="site-popover site-theme-popover">
								<div className="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
									<div>
										<div className="text-sm font-bold">{isZh ? '界面主题' : 'Interface theme'}</div>
										<div className="text-xs text-(--site-text-muted)">{isZh ? '模式与内置颜色' : 'Mode and built-in colors'}</div>
									</div>
									<ModeSwitch />
								</div>
								<ThemeSwitch vertical />
								<a
									href={sitePaths.generator}
									className="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
								>
									<span className="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
										<svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
										</svg>
									</span>
									<span className="min-w-0 flex-1">
										<span className="block text-sm font-medium">{isZh ? '创建新主题' : 'Create theme'}</span>
										<span className="block text-xs text-(--site-text-muted)">{isZh ? '打开主题生成器' : 'Open theme generator'}</span>
									</span>
									<span className="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">
										→
									</span>
								</a>
							</div>
						) : null}
					</div>
					<button className="site-header-action" onClick={() => setIsShowFund(true)} type="button">
						{isZh ? '支持' : 'Support'}
					</button>
					<button
						className="site-header-action site-header-icon-action site-language-action"
						onClick={switchLang}
						type="button"
						aria-label={isZh ? '切换到英文' : 'Switch to Chinese'}
						title={isZh ? '切换到英文' : 'Switch to Chinese'}
					>
						<HeaderIcon name="language" />
					</button>
					<a
						className="site-header-action site-header-icon-action"
						href="https://github.com/any-tdf/any-tdf"
						target="_blank"
						rel="noreferrer"
						aria-label="GitHub"
						title="GitHub"
					>
						<HeaderIcon name="github" />
					</a>
				</nav>

				<button
					className="site-mobile-menu-button"
					onClick={() => {
						setMobileOpen(!mobileOpen);
						setMobileThemeOpen(false);
					}}
					type="button"
					aria-label={isZh ? '打开导航菜单' : 'Open navigation menu'}
					aria-expanded={mobileOpen}
				>
					<span aria-hidden="true">{mobileOpen ? '×' : '☰'}</span>
				</button>

				{mobileOpen ? (
					<div className="site-popover right-4 top-14 lg:hidden">
						{mobileThemeOpen ? (
							<>
								{/* 主题二级面板 */}
								<div className="mb-3 flex items-center justify-between gap-3 border-b border-(--site-divider) pb-3">
									<button className="site-header-action" onClick={() => setMobileThemeOpen(false)} type="button">
										{isZh ? '← 返回' : '← Back'}
									</button>
									<div className="text-sm font-bold">{isZh ? '界面主题' : 'Interface theme'}</div>
									<ModeSwitch />
								</div>
								<ThemeSwitch vertical />
								<a
									href={sitePaths.generator}
									className="group mt-3 flex items-center gap-2 border-t border-(--site-divider) pt-3 text-(--site-text) no-underline"
								>
									<span className="flex size-7 shrink-0 items-center justify-center border border-(--site-divider) text-(--site-accent)">
										<svg className="size-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
											<path d="M11 11V7H13V11H17V13H13V17H11V13H7V11H11ZM12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z" />
										</svg>
									</span>
									<span className="min-w-0 flex-1">
										<span className="block text-sm font-medium">{isZh ? '创建新主题' : 'Create theme'}</span>
										<span className="block text-xs text-(--site-text-muted)">{isZh ? '打开主题生成器' : 'Open theme generator'}</span>
									</span>
									<span className="text-(--site-accent) transition-transform group-hover:translate-x-1" aria-hidden="true">
										→
									</span>
								</a>
							</>
						) : (
							<>
								<div className="site-mobile-menu-nav mb-3">
									<a className="site-header-link" href="/guide">
										{isZh ? '指南' : 'Guide'}
									</a>
									<a className="site-header-link" href={sitePaths.components}>
										{isZh ? '组件' : 'Components'}
									</a>
									<button className="site-header-action" onClick={() => setMobileThemeOpen(true)} type="button">
										{isZh ? '主题' : 'Theme'} ›
									</button>
									<a className="site-header-link" href={sitePaths.generator}>
										{isZh ? '主题生成器' : 'Theme generator'}
									</a>
									<button className="site-header-action" onClick={() => onclickCmdK?.()} type="button">
										{isZh ? '搜索' : 'Search'}
									</button>
									<button className="site-header-action" onClick={() => setIsShowFund(true)} type="button">
										{isZh ? '支持' : 'Support'}
									</button>
								</div>
								<div className="mt-3 flex justify-between border-t border-(--site-divider) pt-3">
									<button className="site-header-action" onClick={switchLang} type="button">
										{isZh ? 'English' : '简体中文'}
									</button>
									<a className="site-header-action" href="https://github.com/any-tdf/any-tdf" target="_blank" rel="noreferrer">
										GitHub ↗
									</a>
								</div>
							</>
						)}
					</div>
				) : null}
			</div>
		</header>
	);
};

export default Header;
