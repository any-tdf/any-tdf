import { switchTheme, themes } from 'rtdf/theme';
import { useAppContext } from '../store/appStore';
import { themeLabels } from '../data/homeData';

type ThemeSwitchProps = {
	/** 横排还是竖排 */
	vertical?: boolean;
};

const ThemeSwitch = ({ vertical = false }: ThemeSwitchProps) => {
	const { lang, currentColor, setCurrentColor } = useAppContext();
	const isZh = lang === 'zh_CN';

	const selectColorFunc = (e: React.MouseEvent, themeName: string) => {
		// 阻止冒泡
		e.stopPropagation();
		setCurrentColor(themeName);
		localStorage.setItem('theme_color', themeName);
		switchTheme(themeName);
	};

	return (
		<div
			className={`${vertical ? 'theme-switch-grid max-h-60 gap-1 overflow-y-auto sm:max-h-none' : 'flex flex-row flex-wrap gap-2'} my-2`}
		>
			{themes.map((item) => (
				<button
					key={item.name}
					className={`theme-switch-option flex items-center gap-1.5 border px-2 py-1 ${
						currentColor === item.name
							? 'border-primary dark:border-dark'
							: 'border-black/10 hover:border-primary/30 dark:border-white/10 dark:hover:border-dark/30'
					} cursor-pointer rounded-sm transition-colors`}
					onClick={(e) => selectColorFunc(e, item.name)}
					type="button"
				>
					{/* 双色展示：左侧浅背景+亮色，右侧深背景+暗色 */}
					<div className="flex h-4 w-6 shrink-0 overflow-hidden rounded-sm">
						<div className="flex w-1/2 items-center justify-center bg-gray-100">
							<div className="size-2.5 rounded-full" style={{ background: item['color-primary'] }}></div>
						</div>
						<div className="flex w-1/2 items-center justify-center bg-gray-800">
							<div className="size-2.5 rounded-full" style={{ background: item['color-dark'] }}></div>
						</div>
					</div>
					<div className="flex-1 truncate whitespace-nowrap text-left text-xs font-normal">
						{isZh ? themeLabels[item.name] || item.name : item.name}
					</div>
				</button>
			))}
		</div>
	);
};

export default ThemeSwitch;
