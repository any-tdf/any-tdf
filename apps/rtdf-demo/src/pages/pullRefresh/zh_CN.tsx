import { useRef, useState } from 'react';
import { Button, InfiniteScroll, Loading, PullRefresh } from 'rtdf/components';
import type { PullRefreshChangeDetail } from 'rtdf/types';

type DemoItem = {
	id: number;
	title: string;
	time: string;
};

const createItems = (prefix: string, start = 1, count = 8): DemoItem[] =>
	Array.from({ length: count }, (_, index) => ({
		id: start + index,
		title: `${prefix} ${start + index}`,
		time: `刚刚更新 ${index + 1} 分钟前`
	}));

const PullRefreshDemo = () => {
	const [items, setItems] = useState(createItems('动态', 1));
	const [refreshing, setRefreshing] = useState(false);
	const [dampRefreshing, setDampRefreshing] = useState(false);
	const [customRefreshing, setCustomRefreshing] = useState(false);
	const [tipRefreshing, setTipRefreshing] = useState(false);
	const [boxRefreshing, setBoxRefreshing] = useState(false);
	const [refreshCount, setRefreshCount] = useState(0);
	const [changeDetail, setChangeDetail] = useState<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
	const [dampDetail, setDampDetail] = useState<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });

	// 嵌套滚动容器 Combined scroll container
	const boxRef = useRef<HTMLDivElement>(null);
	const [boxItems, setBoxItems] = useState(createItems('动态', 1, 10));
	const [boxLoading, setBoxLoading] = useState(false);
	const [boxFinished, setBoxFinished] = useState(false);

	const refreshData = () => {
		setRefreshing(true);
		window.setTimeout(() => {
			const nextCount = refreshCount + 1;
			setRefreshCount(nextCount);
			setItems(createItems(`刷新 ${nextCount}`, nextCount * 10));
			setRefreshing(false);
		}, 900);
	};

	const refreshDamped = () => {
		setDampRefreshing(true);
		window.setTimeout(() => setDampRefreshing(false), 900);
	};

	const refreshCustom = () => {
		setCustomRefreshing(true);
		window.setTimeout(() => setCustomRefreshing(false), 900);
	};

	const refreshTip = () => {
		setTipRefreshing(true);
		window.setTimeout(() => setTipRefreshing(false), 900);
	};

	const refreshBox = () => {
		setBoxRefreshing(true);
		window.setTimeout(() => {
			setBoxItems((current) => createItems('刷新', current.length + 1, 10));
			setBoxFinished(false);
			setBoxRefreshing(false);
		}, 900);
	};

	const loadBoxMore = () => {
		setBoxLoading(true);
		window.setTimeout(() => {
			setBoxItems((current) => {
				const nextItems = [...current, ...createItems('加载', current.length + 1, 6)];
				if (nextItems.length >= 28) setBoxFinished(true);
				return nextItems;
			});
			setBoxLoading(false);
		}, 900);
	};

	return (
		<div className="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
				<div className="text-base font-bold">基础用法</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">
					下拉列表顶部后释放，触发明确的数据刷新，桌面端可按住鼠标向下拖拽。
				</div>
			</div>
			<PullRefresh
				refreshing={refreshing}
				successText="刷新完成"
				loadingIcon={{ type: '1_17', width: '8', height: '4' }}
				onRefresh={refreshData}
				onChange={setChangeDetail}
			>
				<div className="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
					{items.map((item) => (
						<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
							<div className="font-medium">{item.title}</div>
							<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.time}</div>
						</div>
					))}
				</div>
			</PullRefresh>
			<div className="mx-4 mt-3 text-xs text-text-primary/50 dark:text-text-dark/50">
				当前状态：{changeDetail.status}，进度：{changeDetail.progress.toFixed(2)}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">阻尼与最大距离</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				超过 threshold 后下拉距离会按阻尼曲线衰减，maxDistance 限制最大下拉距离，跟随手指过程无动画延迟。
			</div>
			<PullRefresh refreshing={dampRefreshing} threshold={60} maxDistance={90} onRefresh={refreshDamped} onChange={setDampDetail}>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">下拉距离被限制在 90px 以内</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						当前距离：{dampDetail.distance}px，进度：{dampDetail.progress.toFixed(2)}
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">自定义头部</div>
			<PullRefresh
				refreshing={customRefreshing}
				headHeight={64}
				threshold={72}
				onRefresh={refreshCustom}
				pullingChild={(detail) => (
					<div className="inline-flex items-center gap-2 text-primary dark:text-dark">
						<span className="inline-block text-base" style={{ transform: `rotate(${Math.min(1, detail.progress) * 180}deg)` }}>
							↓
						</span>
						<span>继续下拉 {Math.round(Math.min(1, detail.progress) * 100)}%</span>
					</div>
				)}
				canReleaseChild={() => (
					<div className="inline-flex items-center gap-2 font-medium text-success">
						<span className="inline-block rotate-180 text-base">↓</span>
						<span>释放刷新</span>
					</div>
				)}
				refreshingChild={() => (
					<div className="inline-flex items-center gap-2 text-primary dark:text-dark">
						<Loading type="1_12" width="6" height="6" theme />
						<span>正在同步数据</span>
					</div>
				)}
				successChild={() => <div className="text-success">同步完成</div>}
			>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">箭头随进度旋转</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						通过 snippet 的 detail 参数读取 status、distance 和 progress。
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">成功提示与时长</div>
			<PullRefresh refreshing={tipRefreshing} successText="已为你推荐最新内容" successDuration={1500} onRefresh={refreshTip}>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">成功文案展示 1.5 秒</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						successText 配合 successDuration 控制成功态停留时长。
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">嵌套滚动容器</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				容器内下拉刷新，滚动到底部加载更多，通过 scrollTarget 指定滚动容器。
			</div>
			<div ref={boxRef} className="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				<PullRefresh refreshing={boxRefreshing} scrollTarget={boxRef} onRefresh={refreshBox}>
					<div className="overflow-hidden">
						{boxItems.map((item) => (
							<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
								<div className="font-medium">{item.title}</div>
								<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.time}</div>
							</div>
						))}
					</div>
					<InfiniteScroll loading={boxLoading} finished={boxFinished} scrollTarget={boxRef} offset={100} onLoad={loadBoxMore} />
				</PullRefresh>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">禁用状态</div>
			<PullRefresh disabled>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">当前不可刷新</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">用于权限、离线或当前页面不允许刷新时。</div>
					<div className="mt-3">
						<Button disabled>刷新不可用</Button>
					</div>
				</div>
			</PullRefresh>
		</div>
	);
};

export default PullRefreshDemo;
