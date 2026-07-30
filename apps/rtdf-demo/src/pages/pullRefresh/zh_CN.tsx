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
		time: `刚刚更新 ${index + 1} 分钟前`
	}));

const PullRefreshDemo = () => {
	const [items, setItems] = useState(createItems('动态', 1));
	const [refreshing, setRefreshing] = useState(false);
	const [customRefreshing, setCustomRefreshing] = useState(false);
	const [changeDetail, setChangeDetail] = useState<PullRefreshChangeDetail>({ status: 'normal', distance: 0, progress: 0 });
	const [refreshCount, setRefreshCount] = useState(0);

	const refreshData = () => {
		setRefreshing(true);
		window.setTimeout(() => {
			const nextCount = refreshCount + 1;
			setRefreshCount(nextCount);
			setItems(createItems(`刷新 ${nextCount}`, nextCount * 10));
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
				<div className="text-base font-bold">基础用法</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">下拉列表顶部后释放，触发明确的数据刷新。</div>
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

			<div className="mx-4 mt-8 text-lg font-bold">自定义头部</div>
			<PullRefresh
				refreshing={customRefreshing}
				headHeight={64}
				threshold={72}
				onRefresh={refreshCustom}
				pullingChild={(detail) => <div className="text-primary dark:text-dark">继续下拉 {Math.round(detail.progress * 100)}%</div>}
				canReleaseChild={() => <div className="font-medium text-success">释放刷新</div>}
				refreshingChild={() => <div className="text-primary dark:text-dark">正在同步数据</div>}
				successChild={() => <div className="text-success">同步完成</div>}
			>
				<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 dark:bg-bg-surface-dark">
					<div className="font-medium">自定义状态内容</div>
					<div className="mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">可以通过 render prop 根据状态展示不同内容。</div>
				</div>
			</PullRefresh>

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
