import { useMemo } from 'react';
import { builtInIconLibraryLabelMap, builtInIconLibraryList, type BuiltInIconLibrary } from '@any-tdf/common/svg';
import { switchTheme, themes } from 'rtdf/theme';
import { safeSetStorage } from '../../utils/storage';

type ThemeSwitchProps = {
	currentColor: string;
	builtInIconLibrary: BuiltInIconLibrary;
	lang: 'zh_CN' | 'en_US';
	onChange?: (themeName: string) => void;
	onIconLibraryChange?: (library: BuiltInIconLibrary) => void;
};

const themeLabels: Record<string, string> = {
	ANYTDF: 'ANYTDF',
	Nintendo: '红蓝天堂',
	Ocean: '海蓝金沙',
	Forest: '翠林暖棕',
	Sunset: '橙霞蓝天',
	Cherry: '粉樱翠影',
	Twilight: '暮紫粉霞',
	Amber: '琥珀紫韵',
	Mint: '薄荷玫红',
	Coral: '珊瑚碧蓝',
	Slate: '石墨暖棕',
	Emerald: '翡翠丹霞',
	Crimson: '绯红碧波',
	Navy: '藏蓝珊瑚',
	Olive: '橄榄紫烟',
	Plum: '梅紫青翠',
	Cyan: '青碧暖橙',
	Tangerine: '蜜橘深蓝',
	Sage: '草绿粉紫',
	Berry: '浆紫嫩绿',
	Wine: '酒红翠青',
	IKEA: '宜家蓝黄',
	Ferrari: '法拉红金',
	Tiffany: '蒂芙蓝白',
	Pepsi: '百事蓝红',
	Spotify: '声田绿米',
	Netflix: '奈飞红白',
	Hermes: '爱马橙棕',
	CocaCola: '可乐红白',
	Starbucks: '星巴绿棕',
	McDonalds: '金拱红黄',
	Gucci: '古驰绿红',
	Chanel: '香奈黑米',
	Rolex: '劳力绿金',
	LouisVuitton: '路威棕金',
	Mastercard: '万事红橙',
	Sepia: '泛黄记忆',
	GoldWood: '金色森林',
	CyberNeon: '赛博霓虹',
	Aurora: '极光幻夜',
	Terracotta: '陶青梦境',
	Sakura: '靛蓝樱花'
};

const parseOklch = (color: string) => {
	const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
	if (!match) return { l: 0.5, c: 0.15, h: 0 };
	return {
		l: parseFloat(match[1]),
		c: parseFloat(match[2]),
		h: parseFloat(match[3])
	};
};

const ThemeSwitch: React.FC<ThemeSwitchProps> = ({ currentColor, builtInIconLibrary, lang, onChange, onIconLibraryChange }) => {
	const isZh = lang === 'zh_CN';

	const themeOptions = useMemo(() => {
		return themes.map((item) => {
			const primary = parseOklch(item['color-primary']);
			const dark = parseOklch(item['color-dark']);
			return {
				name: item.name,
				label: isZh ? themeLabels[item.name] || item.name : item.name,
				primary: item['color-primary'],
				dark: item['color-dark'],
				bgLight: `oklch(0.975 ${(primary.c * 0.05).toFixed(3)} ${primary.h.toFixed(1)})`,
				bgDark: `oklch(0.15 ${(dark.c * 0.08).toFixed(3)} ${dark.h.toFixed(1)})`
			};
		});
	}, [isZh]);

	const selectColorFunc = (event: React.MouseEvent, themeName: string) => {
		event.stopPropagation();
		safeSetStorage(localStorage, 'theme_color', themeName);
		switchTheme(themeName);
		onChange?.(themeName);
	};

	const selectBuiltInIconLibraryFunc = (event: React.MouseEvent, library: BuiltInIconLibrary) => {
		event.stopPropagation();
		onIconLibraryChange?.(library);
	};

	return (
		<div className="my-2">
			<div className="grid grid-cols-3 gap-1">
				{themeOptions.map((item) => (
					<button
						key={item.name}
						className={`flex cursor-pointer items-center gap-1.5 rounded-sm border px-1.5 py-1 transition-all ${
							currentColor === item.name ? 'border-primary dark:border-dark' : 'border-gray-100 dark:border-gray-700'
						}`}
						onClick={(event) => selectColorFunc(event, item.name)}
						type="button"
					>
						<div className="flex h-5 w-7 shrink-0 overflow-hidden rounded-sm border border-black/5 dark:border-white/5">
							<div className="relative flex-1" style={{ backgroundColor: item.bgLight }}>
								<div className="absolute bottom-0.5 left-0.5 h-2 w-2 rounded-xs" style={{ backgroundColor: item.primary }} />
							</div>
							<div className="relative flex-1" style={{ backgroundColor: item.bgDark }}>
								<div className="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-xs" style={{ backgroundColor: item.dark }} />
							</div>
						</div>
						<div
							className={`min-w-0 flex-1 truncate text-left text-xs font-normal ${currentColor === item.name ? 'text-primary dark:text-dark font-medium' : ''}`}
						>
							{item.label}
						</div>
					</button>
				))}
			</div>

			<div className="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
				<div className="mb-2 text-xs font-medium text-black/50 dark:text-white/50">{isZh ? '内置图标' : 'Built-in icons'}</div>
				<div className="grid grid-cols-2 gap-1">
					{builtInIconLibraryList.map((item) => {
						const label = builtInIconLibraryLabelMap[item];
						return (
							<button
								key={item}
								type="button"
								className={`cursor-pointer rounded-sm border px-3 py-1.5 text-xs transition-all ${
									builtInIconLibrary === item
										? 'border-primary bg-primary/10 text-primary dark:border-dark dark:bg-dark/10 dark:text-dark'
										: 'border-gray-100 text-black/70 dark:border-gray-700 dark:text-white/70'
								}`}
								aria-label={isZh ? `切换为 ${label} 内置图标` : `Switch to ${label} built-in icons`}
								onClick={(event) => selectBuiltInIconLibraryFunc(event, item)}
							>
								{label}
							</button>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default ThemeSwitch;
