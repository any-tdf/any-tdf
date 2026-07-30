import { useEffect, useRef, useState } from 'react';
import codeGroupSvgData from '../utils/code-group-svg-data';
import { useAppContext } from '../store/appStore';

// 将 codeGroupSvgData 随机打乱
const randomCodeGroupSvgData = [...codeGroupSvgData].sort(() => Math.random() - 0.5);

const Clis = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [showCli, setShowCli] = useState(0);
	const [isClicked, setIsClicked] = useState(false);
	const [isHover, setIsHover] = useState(false);
	const [textCli, setTextCli] = useState('_');
	const intervalTimeRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const timesRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const showCliRef = useRef(0);
	showCliRef.current = showCli;

	// 写一个函数，模拟打字效果，传入一段文字，返回一个打字效果的函数
	const typeWriter = (text: string, speed: number = 150) => {
		let number = 0;
		if (timesRef.current) clearInterval(timesRef.current);
		timesRef.current = setInterval(() => {
			number++;
			if (number >= text.length) {
				number = 0;
				setTextCli(text);
				if (timesRef.current) clearInterval(timesRef.current);
			} else {
				setTextCli(text.slice(0, number) + '_');
			}
		}, speed);
	};

	// 动画
	const animationFun = () => {
		if (intervalTimeRef.current) clearInterval(intervalTimeRef.current);
		typeWriter(randomCodeGroupSvgData[showCliRef.current].cli);
		// 每 6 秒切换一次
		intervalTimeRef.current = setInterval(() => {
			const next = showCliRef.current === codeGroupSvgData.length - 1 ? 0 : showCliRef.current + 1;
			setShowCli(next);
			showCliRef.current = next;
			setTextCli('_');
			setTimeout(() => {
				typeWriter(randomCodeGroupSvgData[next].cli);
			}, 300);
		}, 6000);
	};

	useEffect(() => {
		animationFun();
		const handleVisibilityChange = () => {
			if (document.visibilityState === 'visible') {
				animationFun();
			} else {
				if (intervalTimeRef.current) clearInterval(intervalTimeRef.current);
				if (timesRef.current) clearInterval(timesRef.current);
			}
		};
		window.addEventListener('visibilitychange', handleVisibilityChange);
		return () => {
			window.removeEventListener('visibilitychange', handleVisibilityChange);
			if (intervalTimeRef.current) clearInterval(intervalTimeRef.current);
			if (timesRef.current) clearInterval(timesRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="inline-flex justify-center">
			<div className="bg-primary/5 dark:bg-dark/10 rounded-l-full text-xs">
				<div
					className="mr-2 flex h-7 items-center gap-1 pl-3"
					dangerouslySetInnerHTML={{ __html: randomCodeGroupSvgData[showCli].svg }}
				></div>
			</div>
			<button
				type="button"
				onMouseEnter={() => setIsHover(true)}
				onMouseLeave={() => setIsHover(false)}
				className="bg-primary/5 dark:bg-dark/10 relative inline-flex cursor-copy items-center justify-center rounded-r-full py-1 pr-3"
				onClick={async () => {
					await navigator.clipboard.writeText(randomCodeGroupSvgData[showCli].cli);
					setIsClicked(true);
					setTimeout(() => {
						setIsClicked(false);
					}, 2000);
				}}
			>
				<code className="text-primary dark:text-dark text-sm opacity-80">{textCli}</code>
				<div
					className={`bg-primary dark:bg-dark rounded-xs absolute -top-3 left-1/2 size-3 -translate-x-1/2 rotate-45 transition-all ${
						isHover ? '-translate-y-1/2 opacity-100' : '-translate-y-4 opacity-0'
					}`}
				></div>
				<div
					className={`bg-primary dark:bg-dark absolute -top-8 left-1/2 -translate-x-1/2 text-nowrap rounded-sm px-2 py-1 text-xs text-white transition-all dark:text-black ${
						isHover ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
					}`}
				>
					{isZh ? (isClicked ? '已复制' : '复制') : isClicked ? 'Copied' : 'Copy'}
				</div>
			</button>
		</div>
	);
};

export default Clis;
