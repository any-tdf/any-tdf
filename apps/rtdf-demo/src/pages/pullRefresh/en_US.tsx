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
		time: `Updated ${index + 1} minutes ago`
	}));

const PullRefreshDemo = () => {
	const [items, setItems] = useState(createItems('Activity', 1));
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
	const [boxItems, setBoxItems] = useState(createItems('Activity', 1, 10));
	const [boxLoading, setBoxLoading] = useState(false);
	const [boxFinished, setBoxFinished] = useState(false);

	const refreshData = () => {
		setRefreshing(true);
		window.setTimeout(() => {
			const nextCount = refreshCount + 1;
			setRefreshCount(nextCount);
			setItems(createItems(`Refresh ${nextCount}`, nextCount * 10));
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
			setBoxItems((current) => createItems('Refreshed', current.length + 1, 10));
			setBoxFinished(false);
			setBoxRefreshing(false);
		}, 900);
	};

	const loadBoxMore = () => {
		setBoxLoading(true);
		window.setTimeout(() => {
			setBoxItems((current) => {
				const nextItems = [...current, ...createItems('Loaded', current.length + 1, 6)];
				if (nextItems.length >= 28) setBoxFinished(true);
				return nextItems;
			});
			setBoxLoading(false);
		}, 900);
	};

	return (
		<div className="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
				<div className="text-base font-bold">Basic usage</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">
					Pull from the top of the list and release to refresh. On desktop, drag down with the mouse.
				</div>
			</div>
			<PullRefresh
				refreshing={refreshing}
				successText="Refresh complete"
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
				Status: {changeDetail.status}, progress: {changeDetail.progress.toFixed(2)}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">Damping and max distance</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				Beyond the threshold the pull distance is damped, maxDistance caps the distance, and the content tracks the finger without animation
				lag.
			</div>
			<PullRefresh refreshing={dampRefreshing} threshold={60} maxDistance={90} onRefresh={refreshDamped} onChange={setDampDetail}>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">Pull distance is capped at 90px</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						Distance: {dampDetail.distance}px, progress: {dampDetail.progress.toFixed(2)}
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">Custom head</div>
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
						<span>Keep pulling {Math.round(Math.min(1, detail.progress) * 100)}%</span>
					</div>
				)}
				canReleaseChild={() => (
					<div className="inline-flex items-center gap-2 font-medium text-success">
						<span className="inline-block rotate-180 text-base">↓</span>
						<span>Release to refresh</span>
					</div>
				)}
				refreshingChild={() => (
					<div className="inline-flex items-center gap-2 text-primary dark:text-dark">
						<Loading type="1_12" width="6" height="6" theme />
						<span>Syncing data</span>
					</div>
				)}
				successChild={() => <div className="text-success">Sync complete</div>}
			>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">The arrow rotates with progress</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						Read status, distance, and progress from the snippet detail parameter.
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">Success tip and duration</div>
			<PullRefresh refreshing={tipRefreshing} successText="Latest content recommended" successDuration={1500} onRefresh={refreshTip}>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">Success text stays for 1.5s</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						Use successText with successDuration to control how long the success state stays.
					</div>
				</div>
			</PullRefresh>

			<div className="mx-4 mt-8 text-lg font-bold">Nested scroll container</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				Pull to refresh inside the container and load more at the bottom by pointing scrollTarget at the container.
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

			<div className="mx-4 mt-8 text-lg font-bold">Disabled</div>
			<PullRefresh disabled>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">Refresh unavailable</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						Use this when permissions, offline state, or page rules block refresh.
					</div>
					<div className="mt-3">
						<Button disabled>Refresh disabled</Button>
					</div>
				</div>
			</PullRefresh>
		</div>
	);
};

export default PullRefreshDemo;
