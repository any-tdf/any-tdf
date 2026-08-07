<script lang="ts">
	import { builtInIconLibraryLabelMap, builtInIconLibraryList, defaultBuiltInIconLibrary, type BuiltInIconLibrary } from '@any-tdf/common/svg';
	import { switchTheme, themes as stdfThemes } from 'stdf/theme';

	// 读取存储的语言，存储被禁用时返回 null
	const getStoredLang = () => {
		try {
			return sessionStorage.getItem('lang');
		} catch {
			return null;
		}
	};
	const isZh = getStoredLang() === 'zh_CN';

	// 主题中文名称映射
	const themeLabels: Record<string, string> = {
		ANYTDF: 'STDF',
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

	// 解析 oklch 颜色获取色相
	const parseOklch = (color: string) => {
		const match = color.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
		if (!match) return { l: 0.5, c: 0.15, h: 0 };
		return { l: parseFloat(match[1]), c: parseFloat(match[2]), h: parseFloat(match[3]) };
	};

	// 从内置主题生成显示数据
	const themes = stdfThemes.map((t) => {
		const p = parseOklch(t['color-primary']);
		const d = parseOklch(t['color-dark']);
		return {
			name: t.name,
			label: t.name === 'ANYTDF' ? 'STDF' : isZh ? themeLabels[t.name] || t.name : t.name,
			primary: t['color-primary'],
			dark: t['color-dark'],
			bgLight: `oklch(0.975 ${(p.c * 0.05).toFixed(3)} ${p.h.toFixed(1)})`,
			bgDark: `oklch(0.15 ${(d.c * 0.08).toFixed(3)} ${d.h.toFixed(1)})`
		};
	});

	let {
		currentColor,
		builtInIconLibrary = defaultBuiltInIconLibrary,
		onIconLibraryChange
	}: {
		currentColor: string;
		builtInIconLibrary?: BuiltInIconLibrary;
		onIconLibraryChange?: (library: BuiltInIconLibrary) => void;
	} = $props();

	const selectColorFunc = (e: MouseEvent, themeName: string) => {
		// 阻止冒泡
		// Prevent bubbling
		e.stopPropagation();
		currentColor = themeName;
		try {
			localStorage.setItem('theme_color', themeName);
		} catch {
			// 存储不可用时忽略写入失败
		}
		switchTheme(themeName);
	};

	const selectBuiltInIconLibrary = (e: MouseEvent, library: BuiltInIconLibrary) => {
		e.stopPropagation();
		onIconLibraryChange?.(library);
	};
</script>

<div class="my-2">
	<div class="grid grid-cols-3 gap-1">
		{#each themes as item (item.name)}
			<button
				class="flex items-center gap-1.5 border px-1.5 py-1 {currentColor === item.name
					? 'border-primary dark:border-dark'
					: 'border-gray-100 dark:border-gray-700'} cursor-pointer rounded-sm transition-all"
				onclick={(e) => selectColorFunc(e, item.name)}
			>
				<!-- 主题色块预览 -->
				<div class="flex h-5 w-7 shrink-0 overflow-hidden rounded-sm border border-black/5 dark:border-white/5">
					<!-- 左半部分：亮色背景 + 主题色 -->
					<div class="relative flex-1" style="background-color: {item.bgLight}">
						<div class="absolute bottom-0.5 left-0.5 h-2 w-2 rounded-xs" style="background-color: {item.primary}"></div>
					</div>
					<!-- 右半部分：暗色背景 + 暗色主题色 -->
					<div class="relative flex-1" style="background-color: {item.bgDark}">
						<div class="absolute bottom-0.5 right-0.5 h-2 w-2 rounded-xs" style="background-color: {item.dark}"></div>
					</div>
				</div>
				<div
					class="min-w-0 flex-1 truncate text-left text-xs font-normal {currentColor === item.name
						? 'text-primary dark:text-dark font-medium'
						: ''}"
				>
					{item.label}
				</div>
			</button>
		{/each}
	</div>

	<div class="mt-3 border-t border-black/10 pt-3 dark:border-white/10">
		<div class="mb-2 text-xs font-medium text-black/50 dark:text-white/50">{isZh ? '内置图标' : 'Built-in icons'}</div>
		<div class="grid grid-cols-2 gap-1">
			{#each builtInIconLibraryList as item (item)}
				{@const label = builtInIconLibraryLabelMap[item]}
				<button
					type="button"
					class="cursor-pointer rounded-sm border px-3 py-1.5 text-xs transition-all {builtInIconLibrary === item
						? 'border-primary bg-primary/10 text-primary dark:border-dark dark:bg-dark/10 dark:text-dark'
						: 'border-gray-100 text-black/70 dark:border-gray-700 dark:text-white/70'}"
					aria-label={isZh ? `切换为 ${label} 内置图标` : `Switch to ${label} built-in icons`}
					onclick={(event) => selectBuiltInIconLibrary(event, item)}
				>
					{label}
				</button>
			{/each}
		</div>
	</div>
</div>
