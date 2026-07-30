import { useRef, useState } from 'react';
import { Button, CountDown, Toast } from 'rtdf/components';
import type { CountDownRef } from 'rtdf/components';
import type { TimeData } from 'rtdf/types';

function CountDownZh() {
	const countDownRef = useRef<CountDownRef | null>(null);
	const countDownRef2 = useRef<CountDownRef | null>(null);
	const [toastVisible, setToastVisible] = useState(false);

	const [currentTime, setCurrentTime] = useState({ hours: 1, minutes: 29, seconds: 59 });
	const [prevTime, setPrevTime] = useState({ hours: 1, minutes: 29, seconds: 59 });
	const [flipState, setFlipState] = useState({ hours: false, minutes: false, seconds: false });

	const handleTimeChange = (data: TimeData) => {
		setPrevTime(currentTime);
		setCurrentTime({ hours: data.hours, minutes: data.minutes, seconds: data.seconds });

		if (data.seconds !== prevTime.seconds) {
			setFlipState((prev) => ({ ...prev, seconds: true }));
			setTimeout(() => setFlipState((prev) => ({ ...prev, seconds: false })), 600);
		}
		if (data.minutes !== prevTime.minutes) {
			setFlipState((prev) => ({ ...prev, minutes: true }));
			setTimeout(() => setFlipState((prev) => ({ ...prev, minutes: false })), 600);
		}
		if (data.hours !== prevTime.hours) {
			setFlipState((prev) => ({ ...prev, hours: true }));
			setTimeout(() => setFlipState((prev) => ({ ...prev, hours: false })), 600);
		}
	};

	const flipValues = [
		{ current: currentTime.hours, prev: prevTime.hours, key: 'hours', flip: flipState.hours },
		{ current: currentTime.minutes, prev: prevTime.minutes, key: 'minutes', flip: flipState.minutes },
		{ current: currentTime.seconds, prev: prevTime.seconds, key: 'seconds', flip: flipState.seconds }
	];

	return (
		<div className="pb-4 pt-1">
			<div className="mx-4 mt-8 text-lg font-bold">基础用法</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">倒计时</span>
				<CountDown time={30 * 1000} />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">自定义格式</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">时分秒</span>
				<CountDown time={30 * 60 * 60 * 1000} format="HH:mm:ss" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">带天数</span>
				<CountDown time={2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000} format="DD 天 HH:mm:ss" />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">仅秒数</span>
				<CountDown time={90 * 1000} format="ss 秒" />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">毫秒级渲染</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">毫秒</span>
				<CountDown time={30 * 1000} format="ss:SSS" millisecond />
			</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">完整毫秒</span>
				<CountDown time={30 * 1000} format="HH:mm:ss:SSS" millisecond />
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">手动控制</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">倒计时</span>
				<CountDown time={60 * 1000} autoStart={false} ref={countDownRef} format="mm:ss" />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => countDownRef.current?.start()}>
					开始
				</Button>
				<Button size="sm" fill="lineState" onClick={() => countDownRef.current?.pause()}>
					暂停
				</Button>
				<Button size="sm" fill="lineState" onClick={() => countDownRef.current?.reset()}>
					重置
				</Button>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">自定义样式</div>
			<div className="p-4">
				<CountDown time={24 * 60 * 60 * 1000}>
					{(timeData: TimeData) => (
						<div className="flex items-center gap-1">
							<span className="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
								{String(timeData.hours).padStart(2, '0')}
							</span>
							<span className="text-primary dark:text-dark">:</span>
							<span className="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
								{String(timeData.minutes).padStart(2, '0')}
							</span>
							<span className="text-primary dark:text-dark">:</span>
							<span className="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
								{String(timeData.seconds).padStart(2, '0')}
							</span>
						</div>
					)}
				</CountDown>
			</div>
			<div className="p-4">
				<CountDown time={2 * 60 * 60 * 1000 + 30 * 60 * 1000}>
					{(timeData: TimeData) => (
						<div className="flex items-center gap-2">
							<div className="flex flex-col items-center">
								<span className="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
									{String(timeData.hours).padStart(2, '0')}
								</span>
								<span className="mt-1 text-xs text-gray-500">时</span>
							</div>
							<span className="text-xl font-bold text-gray-400">:</span>
							<div className="flex flex-col items-center">
								<span className="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
									{String(timeData.minutes).padStart(2, '0')}
								</span>
								<span className="mt-1 text-xs text-gray-500">分</span>
							</div>
							<span className="text-xl font-bold text-gray-400">:</span>
							<div className="flex flex-col items-center">
								<span className="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
									{String(timeData.seconds).padStart(2, '0')}
								</span>
								<span className="mt-1 text-xs text-gray-500">秒</span>
							</div>
						</div>
					)}
				</CountDown>
			</div>
			<div className="p-4">
				<CountDown time={90 * 60 * 1000} onChange={handleTimeChange}>
					{() => (
						<div className="flex items-center gap-4">
							{flipValues.map((item, index) => (
								<div key={item.key} className="flex items-center gap-4">
									<div className="relative h-18 w-16 flip-clock">
										<div className="absolute left-0 top-0 h-9 w-full overflow-hidden rounded-t-lg bg-linear-to-b from-neutral-700 to-neutral-800">
											<div className="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
												{String(item.current).padStart(2, '0')}
											</div>
										</div>
										<div className="absolute bottom-0 left-0 h-9 w-full overflow-hidden rounded-b-lg bg-linear-to-b from-neutral-900 to-black">
											<div className="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
												{String(item.flip ? item.prev : item.current).padStart(2, '0')}
											</div>
										</div>
										{item.flip ? (
											<>
												<div className="absolute left-0 top-0 z-10 h-9 w-full overflow-hidden rounded-t-lg bg-linear-to-b from-neutral-700 to-neutral-800 flip-down">
													<div className="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
														{String(item.prev).padStart(2, '0')}
													</div>
												</div>
												<div className="absolute bottom-0 left-0 z-10 h-9 w-full overflow-hidden rounded-b-lg bg-linear-to-b from-neutral-900 to-black flip-up">
													<div className="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
														{String(item.current).padStart(2, '0')}
													</div>
												</div>
											</>
										) : null}
										<div className="absolute left-0 right-0 top-1/2 z-20 h-0.5 -translate-y-1/2 bg-black" />
									</div>
									{index < 2 ? (
										<div className="flex flex-col gap-2.5">
											<div className="h-2 w-2 rounded-full bg-gray-600" />
											<div className="h-2 w-2 rounded-full bg-gray-600" />
										</div>
									) : null}
								</div>
							))}
						</div>
					)}
				</CountDown>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">带毫秒的自定义样式</div>
			<div className="p-4">
				<CountDown time={30 * 1000} millisecond>
					{(timeData: TimeData) => (
						<div className="flex items-center gap-1 text-lg font-bold">
							<span className="text-primary dark:text-dark">{String(timeData.seconds).padStart(2, '0')}</span>
							<span className="text-gray-400">.</span>
							<span className="text-sm text-gray-500">{String(timeData.milliseconds).padStart(3, '0')}</span>
						</div>
					)}
				</CountDown>
			</div>

			<div className="mx-4 mt-8 text-lg font-bold">倒计时结束回调</div>
			<div className="flex items-center justify-between p-4">
				<span className="text-gray-600 dark:text-gray-400">3 秒后结束</span>
				<CountDown time={3 * 1000} autoStart={false} ref={countDownRef2} onFinish={() => setToastVisible(true)} />
			</div>
			<div className="flex gap-2 p-4">
				<Button size="sm" onClick={() => countDownRef2.current?.start()}>
					开始倒计时
				</Button>
				<Button size="sm" fill="lineState" onClick={() => countDownRef2.current?.reset()}>
					重置
				</Button>
			</div>

			<Toast visible={toastVisible} message="倒计时结束！" onClose={() => setToastVisible(false)} />

			<style>{`
				.flip-clock {
					perspective: 300px;
				}
				.flip-down {
					transform-origin: bottom center;
					animation: flipDown 0.3s ease-in forwards;
				}
				.flip-up {
					transform-origin: top center;
					transform: rotateX(90deg);
					animation: flipUp 0.3s ease-out 0.3s forwards;
				}
				@keyframes flipDown {
					0% {
						transform: rotateX(0deg);
					}
					100% {
						transform: rotateX(-90deg);
					}
				}
				@keyframes flipUp {
					0% {
						transform: rotateX(90deg);
					}
					100% {
						transform: rotateX(0deg);
					}
				}
			`}</style>
		</div>
	);
}

export default CountDownZh;
