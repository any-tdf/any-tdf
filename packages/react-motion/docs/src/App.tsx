import { useEffect, useMemo, useState } from 'react';
import Activity from 'lucide-react/dist/esm/icons/activity.mjs';
import Atom from 'lucide-react/dist/esm/icons/atom.mjs';
import BookOpen from 'lucide-react/dist/esm/icons/book-open.mjs';
import ChartNoAxesCombined from 'lucide-react/dist/esm/icons/chart-no-axes-combined.mjs';
import Code2 from 'lucide-react/dist/esm/icons/code-2.mjs';
import Package from 'lucide-react/dist/esm/icons/package.mjs';
import Rocket from 'lucide-react/dist/esm/icons/rocket.mjs';
import Sparkles from 'lucide-react/dist/esm/icons/sparkles.mjs';
import TableProperties from 'lucide-react/dist/esm/icons/table-properties.mjs';
import type { LucideIcon } from 'lucide-react';
import { EasingVisualiser } from './demos/EasingVisualiser';
import {
	apiContent,
	defaultLocale,
	demoContent,
	homeContent,
	locales,
	navItems,
	pageKeys,
	quickStartContent,
	uiText,
	type Locale,
	type PageKey
} from './content';

type Route = {
	locale: Locale;
	page: PageKey;
};
type ThemeMode = 'auto' | 'light' | 'dark';
type ResolvedTheme = Exclude<ThemeMode, 'auto'>;
type ThemeState = {
	mode: ThemeMode;
	resolved: ResolvedTheme;
};

const isLocale = (value: string): value is Locale => locales.includes(value as Locale);
const isPageKey = (value: string): value is PageKey => pageKeys.includes(value as PageKey);
const themeModes: ThemeMode[] = ['auto', 'light', 'dark'];
const themeStorageKey = 'react-motion-theme';
const actionIcons: Partial<Record<PageKey, LucideIcon>> = {
	'quick-start': Rocket,
	'demo/easing': ChartNoAxesCombined
};
const featureIcons = [Sparkles, Code2, Activity] as const;
const exampleIcons = [Sparkles, Package, Activity] as const;

const isThemeMode = (value: string): value is ThemeMode => themeModes.includes(value as ThemeMode);

const parseRoute = (pathname: string): Route => {
	const parts = pathname.split('/').filter(Boolean);
	const locale = isLocale(parts[0]) ? parts[0] : defaultLocale;
	const pagePath = parts.slice(isLocale(parts[0]) ? 1 : 0).join('/') || 'home';
	const page = isPageKey(pagePath) ? pagePath : 'home';
	return { locale, page };
};

const hrefFor = (locale: Locale, page: PageKey) => `/${locale}${page === 'home' ? '' : `/${page}`}`;
const getSystemTheme = (): ResolvedTheme => (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
const getInitialThemeState = (): ThemeState => {
	const stored = window.localStorage.getItem(themeStorageKey);
	const mode = stored && isThemeMode(stored) ? stored : 'auto';
	return {
		mode,
		resolved: mode === 'auto' ? getSystemTheme() : mode
	};
};

const App = () => {
	const [route, setRoute] = useState<Route>(() => parseRoute(window.location.pathname));
	const [theme, setTheme] = useState<ThemeState>(getInitialThemeState);
	const labels = uiText[route.locale];
	const otherLocale: Locale = route.locale === 'zh' ? 'en' : 'zh';
	const currentHref = hrefFor(route.locale, route.page);

	useEffect(() => {
		if (window.location.pathname !== currentHref) {
			window.history.replaceState(null, '', currentHref);
		}

		const syncRoute = () => setRoute(parseRoute(window.location.pathname));
		window.addEventListener('popstate', syncRoute);
		return () => window.removeEventListener('popstate', syncRoute);
	}, [currentHref]);

	useEffect(() => {
		const media = window.matchMedia('(prefers-color-scheme: dark)');
		const applyTheme = () => {
			const resolved: ResolvedTheme = theme.mode === 'auto' ? (media.matches ? 'dark' : 'light') : theme.mode;
			document.documentElement.dataset.theme = resolved;
			document.documentElement.dataset.themeMode = theme.mode;
			document.documentElement.style.colorScheme = resolved;
			window.localStorage.setItem(themeStorageKey, theme.mode);
			setTheme((currentTheme) => (currentTheme.resolved === resolved ? currentTheme : { ...currentTheme, resolved }));
		};

		applyTheme();

		if (theme.mode !== 'auto') return;
		media.addEventListener('change', applyTheme);
		return () => media.removeEventListener('change', applyTheme);
	}, [theme.mode]);

	useEffect(() => {
		document.documentElement.lang = route.locale === 'zh' ? 'zh-CN' : 'en';
		document.title = `${labels.brand} - ${navItems[route.locale].find((item) => item.key === route.page)?.label ?? labels.brand}`;
	}, [labels.brand, route.locale, route.page]);

	const navigate = (locale: Locale, page: PageKey) => {
		const nextHref = hrefFor(locale, page);
		window.history.pushState(null, '', nextHref);
		setRoute({ locale, page });
	};

	const page = useMemo(() => {
		if (route.page === 'quick-start') return <QuickStart locale={route.locale} />;
		if (route.page === 'api') return <ApiPage locale={route.locale} />;
		if (route.page === 'demo/easing') return <DemoPage locale={route.locale} />;
		return <HomePage locale={route.locale} navigate={navigate} />;
	}, [route.locale, route.page]);

	return (
		<div className="site-shell">
			<header className="site-header">
				<a
					className="brand"
					href={hrefFor(route.locale, 'home')}
					onClick={(event) => handleLinkClick(event, () => navigate(route.locale, 'home'))}
				>
					<span className="brand-mark" aria-hidden="true">
						<Atom size={20} strokeWidth={2.2} />
					</span>
					<span className="brand-copy">
						<strong>{labels.brand}</strong>
						<small>{labels.tagline}</small>
					</span>
				</a>

				<nav className="main-nav" aria-label="Primary">
					{navItems[route.locale].map((item) => (
						<a
							key={item.key}
							className={item.key === route.page ? 'active' : ''}
							href={hrefFor(route.locale, item.key)}
							onClick={(event) => handleLinkClick(event, () => navigate(route.locale, item.key))}
						>
							{item.label}
						</a>
					))}
				</nav>

				<div className="header-actions">
					<label className="theme-control">
						<span>{labels.theme}</span>
						<select
							value={theme.mode}
							aria-label={labels.theme}
							onChange={(event) => setTheme({ mode: event.currentTarget.value as ThemeMode, resolved: theme.resolved })}
						>
							{themeModes.map((mode) => (
								<option key={mode} value={mode}>
									{labels.themeOptions[mode]}
								</option>
							))}
						</select>
					</label>
					<a
						className="language-link"
						href={hrefFor(otherLocale, route.page)}
						onClick={(event) => handleLinkClick(event, () => navigate(otherLocale, route.page))}
					>
						{labels.language}
					</a>
				</div>
			</header>

			{page}
		</div>
	);
};

const handleLinkClick = (event: React.MouseEvent<HTMLAnchorElement>, navigate: () => void) => {
	event.preventDefault();
	navigate();
};

const InlineCode = ({ text }: { text: string }) => <code>{text}</code>;

const HomePage = ({ locale, navigate }: { locale: Locale; navigate: (locale: Locale, page: PageKey) => void }) => {
	const content = homeContent[locale];

	return (
		<main className="page-content">
			<section className="hero-section">
				<div className="hero-copy">
					<p className="eyebrow">@any-tdf/react-motion</p>
					<h1>{content.title}</h1>
					<p>{content.description}</p>
					<div className="action-row">
						{content.actions.map((action) => {
							const ActionIcon = actionIcons[action.key];
							return (
								<a
									key={action.key}
									href={hrefFor(locale, action.key)}
									onClick={(event) => handleLinkClick(event, () => navigate(locale, action.key))}
								>
									{ActionIcon ? <ActionIcon className="button-icon" size={17} strokeWidth={2.2} aria-hidden="true" /> : null}
									<span>{action.label}</span>
								</a>
							);
						})}
					</div>
				</div>
				<div className="curve-preview" aria-hidden="true">
					<svg viewBox="0 0 320 220">
						<path d="M22 180 C60 170 82 160 112 118 S180 20 226 78 275 176 298 42" />
						<circle cx="226" cy="78" r="8" />
					</svg>
				</div>
			</section>

			<section className="feature-grid" aria-label="Features">
				{content.features.map((feature, index) => {
					const FeatureIcon = featureIcons[index] ?? Sparkles;
					return (
						<article key={feature.title} className="feature-card">
							<span className="feature-icon" aria-hidden="true">
								<FeatureIcon size={21} strokeWidth={2.1} />
							</span>
							<h2>{feature.title}</h2>
							<p>{renderInlineCode(feature.text)}</p>
						</article>
					);
				})}
			</section>
		</main>
	);
};

const QuickStart = ({ locale }: { locale: Locale }) => {
	const content = quickStartContent[locale];
	const labels = uiText[locale];

	return (
		<main className="page-content narrow">
			<section className="doc-section">
				<div className="section-heading">
					<BookOpen className="section-icon" size={28} strokeWidth={2.1} aria-hidden="true" />
					<h1>{content.title}</h1>
				</div>
				<p>{renderInlineCode(content.intro)}</p>
			</section>

			<section className="doc-section">
				<h2 className="icon-heading">
					<Package className="heading-icon" size={20} strokeWidth={2.1} aria-hidden="true" />
					<span>{labels.install}</span>
				</h2>
				<pre>
					<code>{content.install}</code>
				</pre>
			</section>

			<section className="doc-section">
				<h2 className="icon-heading">
					<Code2 className="heading-icon" size={20} strokeWidth={2.1} aria-hidden="true" />
					<span>{labels.imports}</span>
				</h2>
				<div className="example-list">
					{content.examples.map((example, index) => {
						const ExampleIcon = exampleIcons[index] ?? Code2;
						return (
							<article key={example.title} className="example-block">
								<h3 className="example-title">
									<ExampleIcon className="heading-icon" size={18} strokeWidth={2.1} aria-hidden="true" />
									<span>{example.title}</span>
								</h3>
								<pre>
									<code>{example.code}</code>
								</pre>
							</article>
						);
					})}
				</div>
			</section>
		</main>
	);
};

const ApiPage = ({ locale }: { locale: Locale }) => {
	const content = apiContent[locale];

	return (
		<main className="page-content narrow">
			<section className="doc-section">
				<div className="section-heading">
					<TableProperties className="section-icon" size={28} strokeWidth={2.1} aria-hidden="true" />
					<h1>{content.title}</h1>
				</div>
				<p>{renderInlineCode(content.intro)}</p>
			</section>

			<section className="doc-section">
				<div className="api-table-wrap">
					<table className="api-table">
						<thead>
							<tr>
								<th>Svelte</th>
								<th>React Motion</th>
								<th>Import</th>
							</tr>
						</thead>
						<tbody>
							{content.rows.map((row) => (
								<tr key={row[0]}>
									<td>
										<InlineCode text={row[0]} />
									</td>
									<td>{row[1]}</td>
									<td>
										<InlineCode text={row[2]} />
									</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</section>

			<section className="doc-section">
				<ul className="note-list">
					{content.notes.map((note) => (
						<li key={note}>{renderInlineCode(note)}</li>
					))}
				</ul>
			</section>
		</main>
	);
};

const DemoPage = ({ locale }: { locale: Locale }) => {
	const content = demoContent[locale];

	return (
		<main className="page-content demo-page">
			<section className="doc-section">
				<div className="section-heading compact-heading">
					<ChartNoAxesCombined className="section-icon" size={24} strokeWidth={2.1} aria-hidden="true" />
					<h1>{content.title}</h1>
				</div>
				<p>{renderInlineCode(content.intro)}</p>
			</section>
			<EasingVisualiser locale={locale} />
		</main>
	);
};

const renderInlineCode = (text: string) => {
	const parts = text.split(/(`[^`]+`)/g);
	return parts.map((part, index) => {
		if (part.startsWith('`') && part.endsWith('`')) {
			return <code key={`${part}-${index}`}>{part.slice(1, -1)}</code>;
		}
		return part;
	});
};

export default App;
