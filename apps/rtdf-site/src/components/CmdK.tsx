import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { menuList, type MenuList, type MenuListChild } from '../data/menuList';
import { useAppContext } from '../store/appStore';

//数组二级组成新数组
const ArrChildFun = (arr: MenuList[]) => {
	const newArr: MenuListChild[] = [];
	for (let e = 0; e < arr.length; e++) {
		newArr.push(...arr[e].childs);
	}
	return newArr;
};

const menuChildList: MenuListChild[] = ArrChildFun(menuList); //展开的菜单列表，全部

//从 localStorage 读取最近使用的列表，读取或解析失败时回退为空数组并移除损坏的值
const getLatelyListFun = (): MenuListChild[] => {
	try {
		const latelyListStr = localStorage.getItem('latelyList');
		const list = latelyListStr ? JSON.parse(latelyListStr) : [];
		return Array.isArray(list) ? list : [];
	} catch {
		try {
			localStorage.removeItem('latelyList');
		} catch {
			//localStorage 不可用时忽略
		}
		return [];
	}
};

const CmdK = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { lang, isCmdK, setIsCmdK } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [cmdKValue, setCmdKValue] = useState(''); //cmd+k 搜索框的值
	const [currentIndex, setCurrentIndex] = useState(0); //当前选中的索引
	const [currentTab, setCurrentTab] = useState(0); //当前选中的 tab
	const [cmdFocus, setCmdFocus] = useState(false); //cmd+k 搜索框是否获取焦点
	const cmdKInputRef = useRef<HTMLInputElement | null>(null); //cmd+k 搜索框的 dom
	const cmdKPanelRef = useRef<HTMLDivElement | null>(null); //cmd+k 面板的 dom
	const [latelyList, setLatelyList] = useState<MenuListChild[]>(getLatelyListFun); //最近使用的列表
	const [isDemoShake, setIsDemoShake] = useState(false); //是否显示 demo 抖动动画
	const [isGuideShake, setIsGuideShake] = useState(false); //是否显示 guide 抖动动画

	const cmdKList = useMemo(
		() => (cmdKValue === '' ? latelyList : menuChildList.filter((item) => item.alias.indexOf(cmdKValue.toLowerCase()) > -1)),
		[cmdKValue, latelyList]
	); //cmd+k 搜索框的列表
	const currentMenu = cmdKList[currentIndex]; //当前选中的菜单

	// 打开 cmd+k 时，聚焦搜索框并重置状态
	useEffect(() => {
		if (isCmdK) {
			setCmdFocus(true);
			setCurrentIndex(0);
			setCurrentTab(0);
			setTimeout(() => {
				cmdKInputRef.current?.focus();
			}, 0);
		}
	}, [isCmdK]);

	// 将选中的菜单加入最近使用列表（最多 3 条）
	const pushLatelyList = (item: MenuListChild) => {
		setLatelyList((prev) => {
			let next: MenuListChild[];
			if (prev.length > 0 && prev[0]?.nav) {
				const index = prev.findIndex((lately) => lately.nav === item.nav);
				if (index > -1) {
					next = [item, ...prev.filter((lately) => lately.nav !== item.nav)];
				} else {
					next = [item, ...prev];
				}
			} else {
				next = [item];
			}
			if (next.length > 3) {
				next.pop();
			}
			if (next.length > 0 && next[0]?.nav) {
				localStorage.setItem('latelyList', JSON.stringify(next));
			}
			return next;
		});
	};

	const gotoMenu = (nav: string, tab: number) => {
		setIsCmdK(false);
		setCmdFocus(false);
		setCmdKValue('');
		void navigate(`/components?nav=${nav}&tab=${tab}`);
		if (location.pathname.includes('/components')) {
			setTimeout(() => {
				window.location.reload();
			}, 10);
		}
	};

	//点击搜索框的事件
	const clickCmdKFun = (item: MenuListChild, index: number) => {
		pushLatelyList(item);
		gotoMenu(item.nav, index);
	};

	//关闭 cmd+k 搜索框
	const closeCmdKFun = () => {
		setIsCmdK(false);
		setCmdFocus(false);
	};

	//cmd+k 搜索框的键盘事件
	useEffect(() => {
		const cmdKFun = (e: KeyboardEvent) => {
			// 判断是 Windows 还是 Mac，cmd+k 在 Windows 下是 ctrl+k，监听 e.ctrlKey，Mac 监听 metaKey
			const isMac = /macintosh|mac os x/i.test(navigator.userAgent);
			const isWindows = /windows|win32/i.test(navigator.userAgent);

			//按下 cmd+k 触发事件
			if (e.key === 'k' && ((isMac && e.metaKey) || (isWindows && e.ctrlKey))) {
				setLatelyList(getLatelyListFun());
				if (isCmdK) {
					setIsCmdK(false);
					setCmdFocus(false);
				} else {
					setIsCmdK(true);
					setCmdFocus(true);
					setCmdKValue('');
					setCurrentIndex(0);
					setCurrentTab(0);
					setTimeout(() => {
						cmdKInputRef.current?.focus();
					}, 0);
				}
				e.preventDefault();
			}
			//按下 esc 触发事件
			if (isCmdK && e.key === 'Escape') {
				// 阻止默认事件
				e.preventDefault();
				//如果搜索框没有获取焦点，按下 esc 获取焦点并选定搜索框的值
				if (!cmdFocus) {
					setCmdFocus(true);
					setTimeout(() => {
						cmdKInputRef.current?.focus();
						cmdKInputRef.current?.select();
					}, 0);
				} else {
					setIsCmdK(false);
					setCmdFocus(false);
				}
			}

			//显示 cmd+k 搜索框时，按下上下键触发事件
			if (isCmdK && (e.key === 'ArrowUp' || e.key === 'ArrowDown')) {
				//阻止默认事件，防止下层滚动
				e.preventDefault();
				setCmdFocus(false);
				cmdKInputRef.current?.blur();
				if (e.key === 'ArrowUp') {
					if (currentIndex === 0 && currentTab === 0) {
						setIsDemoShake(true);
						setTimeout(() => {
							setIsDemoShake(false);
						}, 820);
						return;
					}
					if (currentTab === 0) {
						setCurrentIndex(currentIndex === 0 ? cmdKList.length - 1 : currentIndex - 1);
						setCurrentTab(2);
					} else {
						setCurrentTab(currentTab - 1);
					}
				}
				if (e.key === 'ArrowDown') {
					if (currentIndex === cmdKList.length - 1 && currentTab === 2) {
						setIsGuideShake(true);
						setTimeout(() => {
							setIsGuideShake(false);
						}, 820);
						return;
					}
					if (currentTab === 2) {
						setCurrentIndex(currentIndex === cmdKList.length - 1 ? 0 : currentIndex + 1);
						setCurrentTab(0);
					} else {
						setCurrentTab(currentTab + 1);
					}
				}
			}
			//显示 cmd+k 搜索框时，按下回车键触发事件
			if (isCmdK && e.key === 'Enter' && currentMenu) {
				pushLatelyList(currentMenu);
				gotoMenu(currentMenu.nav, currentTab);
			}
			//显示 cmd+k 搜索框时，按下 Tab 键将焦点圈禁在面板内
			if (isCmdK && e.key === 'Tab') {
				const focusableEls = cmdKPanelRef.current?.querySelectorAll<HTMLElement>('input, button');
				if (focusableEls && focusableEls.length > 0) {
					const firstEl = focusableEls[0];
					const lastEl = focusableEls[focusableEls.length - 1];
					if (!cmdKPanelRef.current?.contains(document.activeElement)) {
						//焦点不在面板内时，聚焦到第一个可聚焦元素
						e.preventDefault();
						firstEl.focus();
					} else if (e.shiftKey && document.activeElement === firstEl) {
						e.preventDefault();
						lastEl.focus();
					} else if (!e.shiftKey && document.activeElement === lastEl) {
						e.preventDefault();
						firstEl.focus();
					}
				}
			}
		};
		window.addEventListener('keydown', cmdKFun);
		return () => window.removeEventListener('keydown', cmdKFun);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isCmdK, cmdFocus, currentIndex, currentTab, cmdKList, currentMenu]);

	if (!isCmdK) return null;

	return (
		<div
			className="animate-cmdk-fade fixed left-0 top-0 flex h-screen w-screen flex-col bg-black/20 pt-20 text-left backdrop-blur-sm"
			style={{ zIndex: 10000 }}
			onClick={closeCmdKFun}
		>
			<div
				ref={cmdKPanelRef}
				role="dialog"
				aria-modal="true"
				aria-label={isZh ? '组件搜索' : 'Component search'}
				className="site-modal-viewport-width animate-cmdk-scale mx-auto max-w-lg rounded-xl bg-white shadow-lg dark:bg-black"
				onClick={(e) => e.stopPropagation()}
			>
				<div className="flex items-center border-b border-black/10 px-4 py-3 text-sm text-gray-500 dark:border-white/10">
					<div className="">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="16" height="16" style={{ fill: 'currentColor' }}>
							<path fill="none" d="M0 0h24v24H0z" />
							<path d="M11 2c4.968 0 9 4.032 9 9s-4.032 9-9 9-9-4.032-9-9 4.032-9 9-9zm0 16c3.867 0 7-3.133 7-7 0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7zm8.485.071l2.829 2.828-1.415 1.415-2.828-2.829 1.414-1.414z" />
						</svg>
					</div>
					<div className="grow px-3 text-gray-800 dark:text-gray-200">
						<input
							ref={cmdKInputRef}
							value={cmdKValue}
							onChange={(e) => setCmdKValue(e.target.value)}
							role="combobox"
							aria-expanded="true"
							aria-controls="cmdk-listbox"
							aria-activedescendant={cmdKList.length > 0 ? `cmdk-option-${currentIndex}-${currentTab}` : undefined}
							className="caret-primary dark:caret-dark focus:outline-hidden w-full placeholder:text-black/20 dark:bg-black dark:placeholder:text-white/30"
							type="text"
							placeholder={isZh ? '请输入组件关键字' : 'Please enter the component keyword'}
						/>
					</div>
					<div className="rounded-sm border border-black/10 px-2 py-1 text-xs font-bold dark:border-white/10">ESC</div>
				</div>
				<div id="cmdk-listbox" role="listbox" className="overflow-y-auto px-6 pb-6" style={{ maxHeight: `${(document.documentElement.clientHeight * 3) / 4}px` }}>
					{cmdKValue === '' ? (
						<div className="mt-2 text-xs text-black/50 dark:text-white/30">
							{latelyList.length === 0
								? isZh
									? `最近无搜索，请输入关键字搜索。`
									: `No recent searches, please enter a keyword to search.`
								: isZh
									? `最近搜索 ${latelyList.length} 条结果`
									: `Recent search ${latelyList.length} results`}
						</div>
					) : null}
					{cmdKValue !== '' ? (
						cmdKList.length === 0 ? (
							<div className="mt-2 text-xs text-black/50 dark:text-white/30">{isZh ? '没有搜索到结果' : 'No results found'}</div>
						) : (
							<div className="mt-2 text-xs text-black/50 dark:text-white/30">
								{isZh
									? `搜索到包含 "${cmdKValue}" 的 ${cmdKList.length} 条结果`
									: `Found ${cmdKList.length} results containing "${cmdKValue}"`}
							</div>
						)
					) : null}
					{cmdKList.map((item, index) => (
						<div key={`${item.nav}-${index}`}>
							<div className="flex items-center">
								<div className={`cmdk-result-title w-1/3 shrink-0 mr-2${index === currentIndex ? ' cmdk-result-active' : ''}`}>
									{isZh ? item?.title : item?.title_en}
								</div>
								<div className="w-full dark:border-white/10">
									<button
										className={`cmdk-nav-button my-1 flex w-full cursor-pointer justify-between rounded-sm border border-transparent py-1 pl-2${
											index === currentIndex && currentTab === 0 ? ' cmdk-nav-active' : ''
										}${isDemoShake && index === 0 ? ' animate-shake' : ''}`}
										id={`cmdk-option-${index}-0`}
										role="option"
										aria-selected={index === currentIndex && currentTab === 0}
										onClick={() => clickCmdKFun(item, 0)}
										type="button"
									>
										<div>{isZh ? '示例' : 'Demo'}</div>
										<div>
											<svg
												className={index === currentIndex && currentTab === 0 ? 'fill-primary dark:fill-dark' : 'fill-gray-500'}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<path fill="none" d="M0 0h24v24H0z" />
												<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
											</svg>
										</div>
									</button>
									<button
										className={`cmdk-nav-button my-1 flex w-full cursor-pointer justify-between rounded-sm border border-transparent py-1 pl-2${
											index === currentIndex && currentTab === 1 ? ' cmdk-nav-active' : ''
										}`}
										id={`cmdk-option-${index}-1`}
										role="option"
										aria-selected={index === currentIndex && currentTab === 1}
										onClick={() => clickCmdKFun(item, 1)}
										type="button"
									>
										<div>API</div>
										<div>
											<svg
												className={index === currentIndex && currentTab === 1 ? 'fill-primary dark:fill-dark' : 'fill-gray-500'}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<path fill="none" d="M0 0h24v24H0z" />
												<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
											</svg>
										</div>
									</button>
									<button
										className={`cmdk-nav-button my-1 flex w-full cursor-pointer justify-between rounded-sm border border-transparent py-1 pl-2${
											index === currentIndex && currentTab === 2 ? ' cmdk-nav-active' : ''
										}${isGuideShake && index === cmdKList.length - 1 ? ' animate-shake' : ''}`}
										id={`cmdk-option-${index}-2`}
										role="option"
										aria-selected={index === currentIndex && currentTab === 2}
										onClick={() => clickCmdKFun(item, 2)}
										type="button"
									>
										<div>{isZh ? '指南' : 'Guide'}</div>
										<div>
											<svg
												className={index === currentIndex && currentTab === 2 ? 'fill-primary dark:fill-dark' : 'fill-gray-500'}
												xmlns="http://www.w3.org/2000/svg"
												viewBox="0 0 24 24"
												width="24"
												height="24"
											>
												<path fill="none" d="M0 0h24v24H0z" />
												<path d="M12.172 12L9.343 9.172l1.414-1.415L15 12l-4.243 4.243-1.414-1.415z" />
											</svg>
										</div>
									</button>
								</div>
							</div>
							<div className="h-px bg-black/5 dark:bg-white/10"></div>
						</div>
					))}
				</div>
				<div className="flex gap-4 border-t border-black/10 px-4 py-2 text-xs opacity-60 dark:border-white/10">
					<div className="flex gap-1">
						<div className="rounded-xs flex size-4 flex-col items-center justify-center bg-black/10 p-0.5 dark:bg-white/30">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-black dark:fill-white">
								<path d="M19.0003 13.9999L19.0004 5.00003L17.0004 5L17.0003 11.9999L6.82845 12L10.7782 8.05027L9.36396 6.63606L3 13L9.36396 19.364L10.7782 17.9498L6.8284 14L19.0003 13.9999Z" />
							</svg>
						</div>
						{isZh ? '选择' : 'Select'}
					</div>
					<div className="flex gap-1">
						<div className="rounded-xs flex size-4 flex-col items-center justify-center bg-black/10 p-0.5 dark:bg-white/30">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-black dark:fill-white">
								<path d="M12.9999 16.1716L18.3638 10.8076L19.778 12.2218L11.9999 20L4.22168 12.2218L5.63589 10.8076L10.9999 16.1716V4H12.9999V16.1716Z" />
							</svg>
						</div>
						{isZh ? '向下' : 'Down'}
					</div>
					<div className="flex gap-1">
						<div className="rounded-xs flex size-4 flex-col items-center justify-center bg-black/10 p-0.5 dark:bg-white/30">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="fill-black dark:fill-white">
								<path d="M12.9999 7.82843V20H10.9999V7.82843L5.63589 13.1924L4.22168 11.7782L11.9999 4L19.778 11.7782L18.3638 13.1924L12.9999 7.82843Z" />
							</svg>
						</div>
						{isZh ? '向上' : 'Up'}
					</div>
					<div className="flex gap-1">
						<div className="rounded-xs bg-black/10 px-1 text-xs dark:bg-white/30">Esc</div>
						{isZh ? '关闭' : 'Close'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CmdK;
