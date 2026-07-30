import { useState } from 'react';
import { ProgressLoop, ButtonGroup } from 'rtdf/components';

function ProgressLoopZh() {
	const [percent, setPercent] = useState(20);

	const changePercentFun = (type: string) => {
		if (type === '+10') {
			setPercent((prev) => (prev >= 100 ? 100 : prev + 10));
		} else {
			setPercent((prev) => (prev <= 0 ? 0 : prev - 10));
		}
	};

	return (
		<div>
			<div className="m-4 mt-8 text-lg font-bold">基础用法</div>
			<div className="mx-4 w-1/3">
				<ProgressLoop />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">不同宽度</div>
			<div className="mx-4 flex grow gap-4">
				<div className="flex-1">
					<ProgressLoop strokeWidth={0.5} />
				</div>
				<div className="flex-1">
					<ProgressLoop strokeWidth={1} />
				</div>
				<div className="flex-1">
					<ProgressLoop strokeWidth={6} />
				</div>
			</div>

			<div className="m-4 mt-8 text-lg font-bold">直边端点</div>
			<div className="mx-4 w-1/3">
				<ProgressLoop butt />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">逆时针方向</div>
			<div className="mx-4 w-1/3">
				<ProgressLoop reverse />
			</div>

			<div className="m-4 mt-8 text-lg font-bold">自定义颜色</div>
			<div className="m-4 flex grow gap-2">
				<div className="flex-1">
					<ProgressLoop injClass="stroke-success dark:stroke-error" />
				</div>
				<div className="flex-1">
					<ProgressLoop gradient={['#CE9FFC', '#7367F0']} />
				</div>
				<div className="flex-1">
					<ProgressLoop gradient={['#CE9FFC', '#7367F0']} reverse />
				</div>
				<div className="flex-1">
					<ProgressLoop trackInjClass="!stroke-primary/20 dark:!stroke-dark/20" />
				</div>
			</div>

			<div className="m-4 mt-8 text-lg font-bold">自定义文字</div>
			<div className="m-4 flex grow gap-2">
				<div className="flex-1">
					<ProgressLoop>
						<div className="text-center text-xs">
							<div>已完成</div>
							<div className="text-lg text-primary dark:text-dark">6666</div>
							<div>步</div>
						</div>
					</ProgressLoop>
				</div>
				<div className="flex-1">
					<ProgressLoop>
						<div className="text-center text-xs">
							<div>剩余流量</div>
							<div className="text-lg text-primary dark:text-dark">66</div>
							<div>GB</div>
						</div>
					</ProgressLoop>
				</div>
				<div className="flex-1">
					<ProgressLoop>
						<div className="text-xs">完成 2/3</div>
					</ProgressLoop>
				</div>
			</div>

			<div className="m-4 mb-1 mt-8 text-lg font-bold">过渡效果</div>
			<div className="mx-4 text-xs">不同端点、圆环宽度、方向、过渡时间、颜色</div>
			<div className="m-4 flex grow gap-2">
				<div className="flex-1">
					<ProgressLoop percent={percent} />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} butt />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} strokeWidth={4} />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} reverse />
				</div>
			</div>
			<div className="m-4 flex grow gap-2">
				<div className="flex-1">
					<ProgressLoop percent={percent} duration="150" />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} duration="500" />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} duration="1000" />
				</div>
				<div className="flex-1">
					<ProgressLoop percent={percent} gradient={['#CE9FFC', '#7367F0']} />
				</div>
			</div>
			<div className="mx-4 pb-8">
				<ButtonGroup heightIn="0" size="full">
					<button
						type="button"
						className="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black"
						onClick={() => changePercentFun('-10')}
					>
						-10
					</button>
					<button
						type="button"
						className="flex-1 border-r border-white py-2 active:opacity-80 dark:border-black"
						onClick={() => changePercentFun('+10')}
					>
						+10
					</button>
					<button type="button" className="flex-1 py-2 active:opacity-80" onClick={() => setPercent(20)}>
						重置
					</button>
				</ButtonGroup>
			</div>
		</div>
	);
}

export default ProgressLoopZh;
