import { useState } from 'react';
import { Button, PullRefresh } from 'rtdf/components';
import type { PullRefreshChangeDetail } from 'rtdf/types';

type DemoItem = {
	id: number;
	title: string;
	time: string;
};

const createItems = (prefix: string, start = 1): DemoItem[] =>
	Array.from({ length: 8 }, (_, index) => ({
		id: start + index,
		title: `${prefix} ${start + index}`,
		time: `Updated ${index + 1} minutes ago`
	}));

const PullRefreshDemo = () => {
	const [items, setItems] = useState(createItems('Activity', 1));
	const [refreshing, setRefreshing] = useState(false);
	const [customRefreshing, setCustomRefreshing] = useState(false);
	const [changeDetail, setChangeDetail] = useState<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
	const [refreshCount, setRefreshCount] = useState(0);

	const refreshData = () => {
		setRefreshing(true);
		window.setTimeout(() => {
			const nextCount = refreshCount + 1;
			setRefreshCount(nextCount);
			setItems(createItems(`Refresh ${nextCount}`, nextCount * 10));
			setRefreshing(false);
		}, 900);
	};

	const refreshCustom = () => {
		setCustomRefreshing(true);
		window.setTimeout(() => {
			setCustomRefreshing(false);
		}, 900);
	};

	return (
		<div className="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
				<div className="text-base font-bold">Basic usage</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">
					Pull from the top of the list and release to refresh data explicitly.
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

			<div className="mx-4 mt-8 text-lg font-bold">Custom head</div>
			<PullRefresh
				refreshing={customRefreshing}
				headHeight={64}
				threshold={72}
				onRefresh={refreshCustom}
				pullingChild={(detail) => <div className="text-primary dark:text-dark">Keep pulling {Math.round(detail.progress * 100)}%</div>}
				canReleaseChild={() => <div className="font-medium text-success">Release to refresh</div>}
				refreshingChild={() => <div className="text-primary dark:text-dark">Syncing data</div>}
				successChild={() => <div className="text-success">Sync complete</div>}
			>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">Custom state content</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
						Render props can display different content for each state.
					</div>
				</div>
			</PullRefresh>

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
