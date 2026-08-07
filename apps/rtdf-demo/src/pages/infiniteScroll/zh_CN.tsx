import { useRef, useState } from 'react';
import { Button, InfiniteScroll, Loading } from 'rtdf/components';
import type { InfiniteScrollRef } from 'rtdf/types';

type DemoItem = {
	id: number;
	title: string;
	desc: string;
};

const createItems = (start: number, count = 10): DemoItem[] =>
	Array.from({ length: count }, (_, index) => ({
		id: start + index,
		title: `订单记录 ${start + index}`,
		desc: `第 ${start + index} 条数据来自分页接口。`
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

	// 自定义状态内容 Custom status content
	const [customItems, setCustomItems] = useState(createItems(101, 8));
	const [customLoading, setCustomLoading] = useState(false);
	const [customFinished, setCustomFinished] = useState(false);
	const [customError, setCustomError] = useState(false);
	const [customFailedOnce, setCustomFailedOnce] = useState(false);

	const loadCustomMore = (isRetry: boolean) => {
		setCustomLoading(true);
		setCustomError(false);
		window.setTimeout(() => {
			if (!customFailedOnce && !isRetry && customItems.length >= 16) {
				setCustomFailedOnce(true);
				setCustomLoading(false);
				setCustomError(true);
				return;
			}
			setCustomItems((current) => {
				const nextItems = [...current, ...createItems(current.length + 1, 4)];
				if (nextItems.length >= 28) setCustomFinished(true);
				return nextItems;
			});
			setCustomLoading(false);
		}, 900);
	};

	// 嵌套滚动容器 Nested scroll container
	const boxRef = useRef<HTMLDivElement>(null);
	const [boxItems, setBoxItems] = useState(createItems(201, 10));
	const [boxLoading, setBoxLoading] = useState(false);
	const [boxFinished, setBoxFinished] = useState(false);

	const loadBoxMore = () => {
		setBoxLoading(true);
		window.setTimeout(() => {
			setBoxItems((current) => {
				const nextItems = [...current, ...createItems(current.length + 1, 6)];
				if (nextItems.length >= 30) setBoxFinished(true);
				return nextItems;
			});
			setBoxLoading(false);
		}, 900);
	};

	// 顶部加载 Load older at the top
	const upBoxRef = useRef<HTMLDivElement>(null);
	const [upItems, setUpItems] = useState(createItems(301, 10));
	const [upLoading, setUpLoading] = useState(false);
	const [upFinished, setUpFinished] = useState(false);

	const loadUpMore = () => {
		setUpLoading(true);
		window.setTimeout(() => {
			setUpItems((current) => {
				const nextItems = [...createItems(current[0].id - 6, 6), ...current];
				if (nextItems.length >= 28) setUpFinished(true);
				return nextItems;
			});
			setUpLoading(false);
			// 前置数据后保持阅读位置，避免停留在顶部立即再次触发
			// Keep the reading position after prepending so it does not retrigger immediately
			if (upBoxRef.current) upBoxRef.current.scrollTop = 120;
		}, 900);
	};

	// 手动检测 Manual check
	const [manualItems, setManualItems] = useState(createItems(401, 16));
	const [manualLoading, setManualLoading] = useState(false);
	const [manualFinished, setManualFinished] = useState(false);
	const manualRef = useRef<InfiniteScrollRef>(null);

	const loadManualMore = () => {
		setManualLoading(true);
		window.setTimeout(() => {
			setManualItems((current) => {
				const nextItems = [...current, ...createItems(current.length + 1, 6)];
				if (nextItems.length >= 40) setManualFinished(true);
				return nextItems;
			});
			setManualLoading(false);
		}, 900);
	};

	const removeAndCheck = () => {
		setManualItems((current) => current.slice(6));
		setManualFinished(false);
		manualRef.current?.check();
	};

	return (
		<div className="min-h-screen bg-bg-base pb-10 text-text-primary dark:bg-bg-base-dark dark:text-text-dark">
			<div className="mx-4 mt-4 rounded-md bg-bg-surface p-4 text-sm dark:bg-bg-surface-dark">
				<div className="text-base font-bold">基础用法</div>
				<div className="mt-1 text-text-primary/60 dark:text-text-dark/60">滚动到底部附近时触发加载，外部控制 loading 和 finished。</div>
				<div className="mt-3">
					<Button size="auto" injClass="px-4" onClick={() => setFailNext(true)}>
						下一次加载失败
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

			<div className="mx-4 mt-8 text-lg font-bold">自定义状态内容</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				snippet 的 detail 参数提供 status 和 retry，错误内容可直接绑定重试。
			</div>
			<div className="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				{customItems.map((item) => (
					<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div className="font-medium">{item.title}</div>
						<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
					</div>
				))}
			</div>
			<InfiniteScroll
				loading={customLoading}
				finished={customFinished}
				error={customError}
				onLoad={loadCustomMore}
				loadingChild={() => (
					<div className="inline-flex min-h-12 items-center gap-2 text-primary dark:text-dark">
						<Loading type="1_12" width="6" height="6" theme />
						<span>正在努力加载...</span>
					</div>
				)}
				finishedChild={() => (
					<div className="inline-flex min-h-12 items-center text-text-primary/40 dark:text-text-dark/40">— 已经到底啦 —</div>
				)}
				errorChild={(detail) => (
					<div className="inline-flex min-h-12 items-center gap-3">
						<span className="text-error">网络异常，加载失败</span>
						<Button size="auto" injClass="px-4" onClick={detail.retry}>
							点击重试
						</Button>
					</div>
				)}
			/>

			<div className="mx-4 mt-8 text-lg font-bold">嵌套滚动容器</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				通过 scrollTarget 指定滚动容器，容器内滚动到底部附近触发加载。
			</div>
			<div ref={boxRef} className="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				{boxItems.map((item) => (
					<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div className="font-medium">{item.title}</div>
						<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
					</div>
				))}
				<InfiniteScroll loading={boxLoading} finished={boxFinished} scrollTarget={boxRef} offset={100} onLoad={loadBoxMore} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">顶部加载</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				direction 为 up 时，滚动到顶部附近加载更早的数据，适合聊天记录场景。
			</div>
			<div ref={upBoxRef} className="mx-4 mt-4 h-96 overflow-y-auto overscroll-contain rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				<InfiniteScroll
					loading={upLoading}
					finished={upFinished}
					scrollTarget={upBoxRef}
					direction="up"
					offset={60}
					immediateCheck={false}
					onLoad={loadUpMore}
				/>
				{upItems.map((item) => (
					<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div className="font-medium">{item.title}</div>
						<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
					</div>
				))}
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">手动检测</div>
			<div className="mx-4 mt-1 text-sm text-text-primary/60 dark:text-text-dark/60">
				数据或容器尺寸变化后，可通过组件暴露的 check 方法主动检测。
			</div>
			<div className="mx-4 mt-3">
				<Button size="auto" injClass="px-4" onClick={removeAndCheck}>
					删除前 6 条并检测
				</Button>
			</div>
			<div className="mx-4 mt-4 overflow-hidden rounded-md bg-bg-surface dark:bg-bg-surface-dark">
				{manualItems.map((item) => (
					<div key={item.id} className="border-b border-black/5 px-4 py-3 last:border-b-0 dark:border-white/10">
						<div className="font-medium">{item.title}</div>
						<div className="mt-1 text-xs text-text-primary/50 dark:text-text-dark/50">{item.desc}</div>
					</div>
				))}
			</div>
			<InfiniteScroll ref={manualRef} loading={manualLoading} finished={manualFinished} immediateCheck={false} onLoad={loadManualMore} />
		</div>
	);
};

export default InfiniteScrollDemo;
