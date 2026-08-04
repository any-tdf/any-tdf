import { useEffect, useMemo, useState } from 'react';
import { Button, ButtonGroup, Calendar, Cell, ConfigProvider, Icon, Tabs } from 'rtdf/components';
import { en_US, zh_CN } from 'rtdf/lang';
/* RTDF_THEME_IMPORT */
import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from 'rtdf/svg';

const builtInIconLibraryStorageKey = 'built_in_icon_library';
const initialBuiltInIconLibrary = '__RTDF_BUILT_IN_ICON_LIBRARY__' as BuiltInIconLibrary;

const isBuiltInIconLibrary = (library: string | null): library is BuiltInIconLibrary =>
	typeof library === 'string' && (builtInIconLibraryList as readonly string[]).includes(library);

const getStoredBuiltInIconLibrary = (): BuiltInIconLibrary => {
	const storedLibrary = localStorage.getItem(builtInIconLibraryStorageKey);
	return isBuiltInIconLibrary(storedLibrary) ? storedLibrary : initialBuiltInIconLibrary;
};

const App = () => {
	const [mode, setMode] = useState<'dark' | 'primary'>(sessionStorage.getItem('mode') === 'dark' ? 'dark' : 'primary');
	const [lang, setLang] = useState<'zh_CN' | 'en_US'>(localStorage.getItem('lang') === 'en_US' ? 'en_US' : 'zh_CN');
	const [builtInIconLibrary, setBuiltInIconLibrary] = useState<BuiltInIconLibrary>(getStoredBuiltInIconLibrary);
	const [percent, setPercent] = useState(20);
	const [visible, setVisible] = useState(false);
	const isZh = lang === 'zh_CN';
	const locale = isZh ? zh_CN : en_US;
	useEffect(() => {
		const noop = () => {};
		document.body.addEventListener('touchstart', noop);
		return () => document.body.removeEventListener('touchstart', noop);
	}, []);

	/* RTDF_THEME_STATE */

	const changeBuiltInIconLibraryFunc = (nextLibrary: BuiltInIconLibrary) => {
		setBuiltInIconLibrary(nextLibrary);
		localStorage.setItem(builtInIconLibraryStorageKey, nextLibrary);
	};

	const builtInIconLibraryItems = useMemo(
		() =>
			builtInIconLibraryList.map((item) => ({
				text: builtInIconLibraryLabelMap[item],
				onClick: () => changeBuiltInIconLibraryFunc(item)
			})),
		[]
	);

	const toggleModeFun = () => {
		setMode((prev) => {
			const nextMode = prev === 'dark' ? 'primary' : 'dark';
			sessionStorage.setItem('mode', nextMode);
			return nextMode;
		});
	};

	const toggleLangFun = () => {
		setLang((prev) => {
			const nextLang = prev === 'zh_CN' ? 'en_US' : 'zh_CN';
			localStorage.setItem('lang', nextLang);
			return nextLang;
		});
	};

	const reduceFunc = () => {
		setPercent((prev) => Math.max(prev - 10, 0));
	};

	const increaseFunc = () => {
		setPercent((prev) => Math.min(prev + 10, 100));
	};

	return (
		<ConfigProvider locale={locale} theme={activeTheme} mode={mode} builtInIconLibrary={builtInIconLibrary}>
			<main className="mx-auto min-h-screen max-w-md bg-bg-base text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
				<div className="flex items-center justify-center gap-3 pt-10 text-center">
					<a className="flex w-10 flex-col items-center" href="https://vite.dev" target="_blank" rel="noreferrer">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-purple text-sm font-bold text-white">V</div>
					</a>
					<a className="flex w-10 flex-col items-center" href="https://react.dev" target="_blank" rel="noreferrer">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-cyan text-sm font-bold text-white">R</div>
					</a>
					<a className="flex w-10 flex-col items-center" href="https://tailwindcss.com" target="_blank" rel="noreferrer">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue text-sm font-bold text-white">T</div>
					</a>
					<a className="flex w-10 flex-col items-center" href="https://rtdf.dev" target="_blank" rel="noreferrer">
						<div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-text-on-primary dark:bg-dark dark:text-text-on-dark">
							RT
						</div>
					</a>
				</div>

				<div className="my-6 text-center text-xs">
					{isZh ? (
						<>
							<p>这是 Vite、React、Tailwind CSS、TypeScript 与 RTDF 构建的模板。</p>
							<p className="mt-2">点击上方 LOGO 了解更多。</p>
						</>
					) : (
						<>
							<p>This is a template using Vite, React, Tailwind CSS, TypeScript, and RTDF.</p>
							<p className="mt-2">Click the logo above to learn more.</p>
						</>
					)}
				</div>

				<div className="my-6">
					<Cell
						title={isZh ? '暗模式' : 'Dark mode'}
						right={{ type: 'switch', switch: { active: mode === 'dark' } }}
						onClick={toggleModeFun}
					/>
				</div>

				<div className="my-6 px-4">
					<div className="mb-3 text-center text-sm font-bold">
						{isZh ? '当前进度' : 'Current progress'}: {percent}%
					</div>
					<div className="h-2 overflow-hidden rounded-full bg-black/10 dark:bg-white/10">
						<div className="h-full rounded-full bg-primary transition-all dark:bg-dark" style={{ width: `${percent}%` }} />
					</div>
				</div>

				<div className="mb-8">
					<ButtonGroup
						fill="lineState"
						items={[
							{ text: '-10', onClick: reduceFunc },
							{ text: '+10', onClick: increaseFunc },
							{ text: isZh ? '重置' : 'Reset', onClick: () => setPercent(20) }
						]}
					/>
				</div>

				<div className="my-6">
					<Button fill="lineState" onClick={() => setVisible(true)}>
						{isZh ? '日历' : 'Calendar'}
					</Button>
				</div>
				<Calendar visible={visible} onClose={() => setVisible(false)} />

				{/* RTDF_ICON_EXAMPLES */}

				<div className="my-6">
					<Button onClick={toggleLangFun}>{isZh ? '切换语言' : 'Toggle language'}</Button>
				</div>

				{/* RTDF_THEME_CONTROL */}

				<div className="my-6 px-4">
					<div className="mb-3 text-center text-sm font-bold">
						{isZh ? '内置图标库' : 'Built-in icons'}: {builtInIconLibraryLabelMap[builtInIconLibrary]}
					</div>
					<ButtonGroup fill="lineState" heightIn="0" size="full" items={builtInIconLibraryItems} />
				</div>
			</main>
		</ConfigProvider>
	);
};

export default App;
