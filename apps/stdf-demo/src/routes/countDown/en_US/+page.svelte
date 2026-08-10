<!-- CountDown Demo -->
<script lang="ts">
	import { CountDown, Button, Toast } from 'stdf';
	import type { TimeData } from 'stdf/types';

	let countDownRef: { start: () => void; pause: () => void; reset: (time?: number) => void };
	let countDownRef2: { start: () => void; pause: () => void; reset: (time?: number) => void };

	let showToast = $state(false);

	// Flip clock state
	let currentTime = $state({ hours: 1, minutes: 29, seconds: 59 });
	let prevTime = $state({ hours: 1, minutes: 29, seconds: 59 });
	let flipState = $state({ hours: false, minutes: false, seconds: false });

	const handleTimeChange = (data: TimeData) => {
		// Save old value first
		prevTime = { ...currentTime };
		// Update current value
		currentTime = { hours: data.hours, minutes: data.minutes, seconds: data.seconds };

		// Trigger flip animation
		if (data.seconds !== prevTime.seconds) {
			flipState.seconds = true;
			setTimeout(() => (flipState.seconds = false), 600);
		}
		if (data.minutes !== prevTime.minutes) {
			flipState.minutes = true;
			setTimeout(() => (flipState.minutes = false), 600);
		}
		if (data.hours !== prevTime.hours) {
			flipState.hours = true;
			setTimeout(() => (flipState.hours = false), 600);
		}
	};
</script>

<div class="pb-4 pt-1">
	<div class="mx-4 mt-8 text-lg font-bold">Basic Usage</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Countdown</span>
		<CountDown time={30 * 1000} />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Format</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Hours Minutes Seconds</span>
		<CountDown time={30 * 60 * 60 * 1000} format="HH:mm:ss" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">With Days</span>
		<CountDown time={2 * 24 * 60 * 60 * 1000 + 30 * 60 * 1000} format="DD days HH:mm:ss" />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Seconds Only</span>
		<CountDown time={90 * 1000} format="ss seconds" />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Millisecond Rendering</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Milliseconds</span>
		<CountDown time={30 * 1000} format="ss:SSS" millisecond />
	</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Full Milliseconds</span>
		<CountDown time={30 * 1000} format="HH:mm:ss:SSS" millisecond />
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Manual Control</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Countdown</span>
		<CountDown time={60 * 1000} autoStart={false} bind:this={countDownRef} format="mm:ss" />
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => countDownRef?.start()}>Start</Button>
		<Button size="sm" fill="line" onclick={() => countDownRef?.pause()}>Pause</Button>
		<Button size="sm" fill="line" onclick={() => countDownRef?.reset()}>Reset</Button>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Style</div>
	<div class="p-4">
		<CountDown time={24 * 60 * 60 * 1000}>
			{#snippet children(timeData: TimeData)}
				<div class="flex items-center gap-1">
					<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
						{String(timeData.hours).padStart(2, '0')}
					</span>
					<span class="text-primary dark:text-dark">:</span>
					<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
						{String(timeData.minutes).padStart(2, '0')}
					</span>
					<span class="text-primary dark:text-dark">:</span>
					<span class="rounded bg-primary px-2 py-1 text-white dark:bg-dark dark:text-black">
						{String(timeData.seconds).padStart(2, '0')}
					</span>
				</div>
			{/snippet}
		</CountDown>
	</div>
	<div class="p-4">
		<CountDown time={2 * 60 * 60 * 1000 + 30 * 60 * 1000}>
			{#snippet children(timeData: TimeData)}
				<div class="flex items-center gap-2">
					<div class="flex flex-col items-center">
						<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
							{String(timeData.hours).padStart(2, '0')}
						</span>
						<span class="mt-1 text-xs text-gray-500">HR</span>
					</div>
					<span class="text-xl font-bold text-gray-400">:</span>
					<div class="flex flex-col items-center">
						<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
							{String(timeData.minutes).padStart(2, '0')}
						</span>
						<span class="mt-1 text-xs text-gray-500">MIN</span>
					</div>
					<span class="text-xl font-bold text-gray-400">:</span>
					<div class="flex flex-col items-center">
						<span class="rounded-lg bg-linear-to-b from-gray-700 to-gray-900 px-3 py-2 text-xl font-bold text-white shadow-lg">
							{String(timeData.seconds).padStart(2, '0')}
						</span>
						<span class="mt-1 text-xs text-gray-500">SEC</span>
					</div>
				</div>
			{/snippet}
		</CountDown>
	</div>
	<div class="p-4">
		<CountDown time={90 * 60 * 1000} onchange={handleTimeChange}>
			{#snippet children(timeData: TimeData)}
				{@const values = [
					{ current: currentTime.hours, prev: prevTime.hours, key: 'hours', flip: flipState.hours },
					{ current: currentTime.minutes, prev: prevTime.minutes, key: 'minutes', flip: flipState.minutes },
					{ current: currentTime.seconds, prev: prevTime.seconds, key: 'seconds', flip: flipState.seconds }
				]}
				<div class="flex items-center gap-4">
					{#each values as item, i (item.key)}
						<div class="flip-clock relative h-18 w-16">
							<!-- Top static layer -->
							<div class="absolute left-0 top-0 h-9 w-full overflow-hidden rounded-t-lg stdf-demo-flip-top">
								<div class="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
									{String(item.current).padStart(2, '0')}
								</div>
							</div>
							<!-- Bottom static layer -->
							<div class="absolute bottom-0 left-0 h-9 w-full overflow-hidden rounded-b-lg stdf-demo-flip-bottom">
								<div class="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
									{String(item.flip ? item.prev : item.current).padStart(2, '0')}
								</div>
							</div>
							<!-- Flip animation layers -->
							{#if item.flip}
								<div class="flip-down absolute left-0 top-0 z-10 h-9 w-full overflow-hidden rounded-t-lg stdf-demo-flip-top">
									<div class="flex h-18 w-full items-center justify-center font-mono text-5xl font-bold text-white">
										{String(item.prev).padStart(2, '0')}
									</div>
								</div>
								<div class="flip-up absolute bottom-0 left-0 z-10 h-9 w-full overflow-hidden rounded-b-lg stdf-demo-flip-bottom">
									<div class="flex h-18 w-full -translate-y-9 items-center justify-center font-mono text-5xl font-bold text-white">
										{String(item.current).padStart(2, '0')}
									</div>
								</div>
							{/if}
							<!-- Center divider line -->
							<div class="absolute left-0 right-0 top-1/2 z-20 h-0.5 -translate-y-1/2 bg-black"></div>
						</div>
						{#if i < 2}
							<div class="flex flex-col gap-2.5">
								<div class="h-2 w-2 rounded-full bg-gray-600"></div>
								<div class="h-2 w-2 rounded-full bg-gray-600"></div>
							</div>
						{/if}
					{/each}
				</div>
			{/snippet}
		</CountDown>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Custom Style with Milliseconds</div>
	<div class="p-4">
		<CountDown time={30 * 1000} millisecond>
			{#snippet children(timeData: TimeData)}
				<div class="flex items-center gap-1 text-lg font-bold">
					<span class="text-primary dark:text-dark">{String(timeData.seconds).padStart(2, '0')}</span>
					<span class="text-gray-400">.</span>
					<span class="text-sm text-gray-500">{String(timeData.milliseconds).padStart(3, '0')}</span>
				</div>
			{/snippet}
		</CountDown>
	</div>

	<div class="mx-4 mt-8 text-lg font-bold">Finish Callback</div>
	<div class="flex items-center justify-between p-4">
		<span class="text-gray-600 dark:text-gray-400">Ends in 3 seconds</span>
		<CountDown
			time={3 * 1000}
			autoStart={false}
			bind:this={countDownRef2}
			onfinish={() => {
				showToast = true;
			}}
		/>
	</div>
	<div class="flex gap-2 p-4">
		<Button size="sm" onclick={() => countDownRef2?.start()}>Start</Button>
		<Button size="sm" fill="line" onclick={() => countDownRef2?.reset()}>Reset</Button>
	</div>
</div>

<Toast bind:visible={showToast} message="Countdown finished!" />

<style>
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
</style>
