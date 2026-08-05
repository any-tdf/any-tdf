import { useEffect } from 'react';
import ApiPlayground from '../components/home/ApiPlayground';
import ApiRichness from '../components/home/ApiRichness';
import ComponentsGrid from '../components/home/ComponentsGrid';
import HeroComponentPreview from '../components/home/HeroComponentPreview';
import MobileAdvantages from '../components/home/MobileAdvantages';
import StatCounter from '../components/home/StatCounter';
import TechStack from '../components/home/TechStack';
import TerminalDemo from '../components/home/TerminalDemo';
import ThemeSystem from '../components/home/ThemeSystem';
import { useReveal } from '../hooks/animations';
import { bottomInfo, descList, thinkGithub, ugly } from '../data/homeData';
import { useAppContext } from '../store/appStore';

const Home = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	useEffect(() => {
		document.title = `RTDF - ${isZh ? 'React 移动 Web 组件库' : 'React mobile Web component library'}`;
		const meta = document.querySelector('meta[name="description"]');
		meta?.setAttribute(
			'content',
			isZh
				? 'RTDF 是基于 React 与 Tailwind CSS 的移动 Web 组件库。'
				: 'RTDF is a mobile Web component library based on React and Tailwind CSS.'
		);
	}, [isZh]);

	const heading1Ref = useReveal<HTMLDivElement>();
	const featureGridRef = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 60 });
	const heading2Ref = useReveal<HTMLDivElement>();
	const heading3Ref = useReveal<HTMLDivElement>();
	const heading4Ref = useReveal<HTMLDivElement>();
	const heading5Ref = useReveal<HTMLDivElement>();
	const noticeGridRef = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 60 });
	const heading6Ref = useReveal<HTMLDivElement>();
	const communityGridRef = useReveal<HTMLDivElement>({ selector: ':scope > *', stagger: 90 });

	return (
		<div className="site-home">
			<div className="site-home-rail">
				<section className="site-hero">
					<div className="site-hero-copy">
						<div className="site-eyebrow">React · Tailwind CSS · Mobile</div>
						<h1 className="site-hero-title">RTDF</h1>
						<p className="site-hero-description">
							{isZh ? (
								<>
									基于{' '}
									<a className="site-hero-tech-link" href="https://react.dev" target="_blank" rel="noreferrer">
										React
									</a>{' '}
									与{' '}
									<a className="site-hero-tech-link" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
										Tailwind CSS
									</a>{' '}
									构建的移动 Web 组件系统，清晰、完整、轻量。
								</>
							) : (
								<>
									A clear, complete, lightweight mobile Web component system built with{' '}
									<a className="site-hero-tech-link" href="https://react.dev" target="_blank" rel="noreferrer">
										React
									</a>{' '}
									and{' '}
									<a className="site-hero-tech-link" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
										Tailwind CSS
									</a>
									.
								</>
							)}
						</p>
						<div className="site-button-row">
							<a className="site-button site-button-primary" href="/guide">
								{isZh ? '开始使用' : 'Get started'} →
							</a>
							<a className="site-button site-button-transparent" href="/components?nav=button&tab=0">
								{isZh ? '浏览组件' : 'Explore components'}
							</a>
							<a className="site-button site-button-transparent" href="https://demo.rtdf.dev" target="_blank" rel="noreferrer">
								Demo ↗
							</a>
						</div>
					</div>

					<div className="site-hero-visual" aria-label={isZh ? 'RTDF 组件预览' : 'RTDF component preview'}>
						<HeroComponentPreview />
					</div>
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading1Ref}>
						<div className="site-section-index">01</div>
						<div>
							<div className="site-section-kicker">POSITIONING</div>
							<h2 className="site-section-title">
								{isZh ? '简单、轻量、可组合的移动组件底座' : 'A simple, tiny, composable mobile foundation'}
							</h2>
							<p className="site-section-description">
								{isZh
									? '保留 RTDF 现有能力，但用更明确的信息层级展示产品定位。界面强调结构、边界和内容密度，不依赖大面积阴影。'
									: 'The existing RTDF capabilities, presented with stronger hierarchy, structural boundaries, and less visual noise.'}
							</p>
						</div>
					</div>
					<div className="site-feature-grid" ref={featureGridRef}>
						{descList.map((item, index) => (
							<article className="site-feature-card" key={item.title}>
								<div className="flex items-baseline gap-2 font-mono">
									<span className="text-xs text-(--site-text-muted)">0{index + 1} /</span>
									<strong className="text-sm font-bold tracking-widest text-(--site-accent)">{item.title.toUpperCase()}</strong>
								</div>
								<h3>{isZh ? item.titleZh : item.title}</h3>
								<p>{isZh ? item.desc : item.descEn}</p>
							</article>
						))}
					</div>
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading2Ref}>
						<div className="site-section-index">02</div>
						<div>
							<div className="site-section-kicker">QUICK START</div>
							<h2 className="site-section-title">
								{isZh ? '一个命令，建立可运行的组件工程' : 'One command to a working component project'}
							</h2>
							<p className="site-section-description">
								{isZh
									? '从脚手架到构建工具，保持路径清晰并提供可直接复制的命令。'
									: 'A direct path from scaffolding to build tools, with copy-ready commands.'}
							</p>
						</div>
					</div>
					<TerminalDemo lang={isZh ? 'zh_CN' : 'en_US'} />
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading3Ref}>
						<div className="site-section-index">03</div>
						<div>
							<div className="site-section-kicker">THEME SYSTEM</div>
							<h2 className="site-section-title">
								{isZh ? '亮暗模式与 42 套主题使用同一组语义' : 'Light, dark, and 42 themes with shared semantics'}
							</h2>
							<p className="site-section-description">
								{isZh
									? '站点保持克制的中性背景，当前主题只负责链接、按钮、焦点和局部光效；组件演示继续展示完整主题能力。'
									: 'The site keeps neutral surfaces while the selected theme drives links, actions, focus states, and component previews.'}
							</p>
						</div>
					</div>
					<div className="site-panel overflow-hidden">
						<ThemeSystem />
					</div>
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading4Ref}>
						<div className="site-section-index">04</div>
						<div>
							<div className="site-section-kicker">COMPONENT SYSTEM</div>
							<h2 className="site-section-title">
								{isZh ? '从 API 到移动交互的完整组件体验' : 'A complete component experience from API to mobile interaction'}
							</h2>
							<p className="site-section-description">
								{isZh
									? '保留可交互演示、能力统计和组件索引，并将每个模块放入统一的技术面板。'
									: 'Interactive demos, capability metrics, and the component index inside one coherent technical system.'}
							</p>
						</div>
					</div>
					<div className="mb-6 site-panel overflow-hidden">
						<StatCounter />
					</div>
					<div className="site-split site-component-system-split">
						<div className="site-panel overflow-hidden">
							<ApiPlayground />
						</div>
						<div className="site-panel overflow-hidden">
							<ApiRichness lang={isZh ? 'zh_CN' : 'en_US'} />
						</div>
					</div>
					<div className="mt-6 site-panel overflow-hidden">
						<MobileAdvantages lang={isZh ? 'zh_CN' : 'en_US'} />
					</div>
					<div className="mt-6 site-panel overflow-hidden">
						<TechStack lang={isZh ? 'zh_CN' : 'en_US'} />
					</div>
					<div className="mt-6 site-panel overflow-hidden">
						<ComponentsGrid />
					</div>
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading5Ref}>
						<div className="site-section-index">05</div>
						<div>
							<div className="site-section-kicker">BEFORE YOU START</div>
							<h2 className="site-section-title">{isZh ? '使用前须知' : 'Things to know before you start'}</h2>
							<p className="site-section-description">
								{isZh
									? '明确项目边界与依赖，让采用和维护都更可预期。'
									: 'Clear boundaries and dependencies make adoption and maintenance predictable.'}
							</p>
						</div>
					</div>
					<div className="site-feature-grid site-notice-grid" ref={noticeGridRef}>
						{ugly.data.map((item, index) => (
							<article className="site-feature-card site-notice-card" key={item.p}>
								<div className="font-mono text-xs text-(--site-accent)">NOTICE / 0{index + 1}</div>
								<p>{isZh ? item.p : item.p_en}</p>
							</article>
						))}
					</div>
				</section>

				<section className="site-section">
					<div className="site-section-heading" ref={heading6Ref}>
						<div className="site-section-index">06</div>
						<div>
							<div className="site-section-kicker">COMMUNITY</div>
							<h2 className="site-section-title">{isZh ? '由社区持续建设' : 'Built continuously by the community'}</h2>
							<p className="site-section-description">
								{isZh
									? '感谢所有贡献者和赞助者，让 RTDF 保持开放并持续迭代。'
									: 'Thanks to every contributor and sponsor keeping RTDF open and evolving.'}
							</p>
						</div>
					</div>
					<div className="site-split" ref={communityGridRef}>
						<div className="site-panel p-6">
							<div className="mb-4 font-mono text-xs text-(--site-text-muted)">CONTRIBUTORS</div>
							<a href="https://github.com/any-tdf/any-tdf/graphs/contributors" target="_blank" rel="noreferrer">
								<img src="https://contrib.nn.ci/api?repo=any-tdf/any-tdf&cols=7" alt={isZh ? 'RTDF 贡献者' : 'RTDF contributors'} />
							</a>
						</div>
						<div className="site-panel p-6">
							<div className="mb-4 font-mono text-xs text-(--site-text-muted)">SPONSORS / GITHUB</div>
							<div className="flex flex-wrap gap-3">
								{thinkGithub.map((item) => (
									<a href={`https://github.com/${item.name}`} target="_blank" title={item.name} key={item.name} rel="noreferrer">
										<img
											className="size-12 rounded-full border border-(--site-divider)"
											src={`https://avatars.githubusercontent.com/${item.name}`}
											alt={item.name}
										/>
									</a>
								))}
							</div>
						</div>
					</div>
				</section>

				<footer className="site-footer">
					<div className="site-footer-grid">
						{bottomInfo.map((group) => (
							<div key={group.title}>
								<h3 className="mb-3 text-sm font-bold">{isZh ? group.title : group.title_en}</h3>
								<div className="flex flex-col gap-2 text-sm">
									{group.list.map((link) => (
										<a
											href={link.link}
											target={link._blank ? '_blank' : '_self'}
											key={link.title}
											rel={link._blank ? 'noreferrer' : undefined}
										>
											{isZh ? link.title : link.title_en}
										</a>
									))}
								</div>
							</div>
						))}
					</div>
					<div className="mt-12 flex flex-wrap justify-between gap-3 border-t border-(--site-divider) pt-5 font-mono text-xs text-(--site-text-muted)">
						<span>RTDF DESIGN · MADE BY DUFU</span>
						<span>React / Tailwind CSS / MIT</span>
					</div>
				</footer>
			</div>
		</div>
	);
};

export default Home;
