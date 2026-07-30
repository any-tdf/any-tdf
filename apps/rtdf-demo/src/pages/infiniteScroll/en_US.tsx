import { useState } from 'react';
import { Button, InfiniteScroll } from 'rtdf/components';

type DemoItem = {
	id: number;
	title: string;
	desc: string;
};

const createItems = (start: number, count = 10): DemoItem[] =>
	Array.from({ length: count }, (_, index) => ({
		id: start + index,
		title: `Order record ${start + index}`,
		desc: `Item ${start + index} came from a paged API.`
	}));

const InfiniteScrollDemo = () => {
	const [items, setItems] = useState(createItems(1, 12));
	const [loading, setLoading] = useState(false);
	const [finished, setFinished] = useState(false);
	const [error, setError] = useState(false);
	const [failNext, setFailNext] = useState(false);

	const loadMore = (isRetry: boolean) => {
		setLoading(true);
		setError(false);
		window.setTimeout(() => {
			if (failNext && !isRetry) {
				setLoading(false);
				setError(true);
				setFailNext(false);
				return;
			}
			setItems((current) => {
				const nextItems = [...current, ...createItems(current.length + 1, 8)];
				if (nextItems.length >= 36) setFinished(true);
				return nextItems;
			});
			setLoading(false);
		}, 900);
	};

	return (
		<div className="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
				<div className="text-base font-bold">Basic usage</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">
					Loading is triggered near the bottom, while loading and finished are controlled externally.
				</div>
				<div className="mt-3">
					<Button size="sm" onClick={() => setFailNext(true)}>
						Fail next load
					</Button>
				</div>
			</div>
			<div className="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				{items.map((item) => (
					<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div className="font-medium">{item.title}</div>
						<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
					</div>
				))}
			</div>
			<InfiniteScroll
				loading={loading}
				finished={finished}
				error={error}
				loadingIcon={{ type: '1_17', width: '8', height: '4' }}
				onLoad={loadMore}
			/>
		</div>
	);
};

export default InfiniteScrollDemo;
