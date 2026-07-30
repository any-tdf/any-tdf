<script lang="ts">
	import { onDestroy, onMount } from 'svelte';
	import codeGroupSvgData from '../../utils/code-group-svg-data';

	interface Props {
		lang?: 'zh_CN' | 'en_US';
	}

	type Command = {
		cmd: string;
		output: string;
		delay: number;
		isDevOutput?: boolean;
	};

	let { lang = 'zh_CN' }: Props = $props();
	let isZh = $derived(lang === 'zh_CN');
	const packageManagers = ['bun', 'npm', 'pnpm', 'yarn'] as const;
	type PackageManager = (typeof packageManagers)[number];
	const packageManagerLabels: Record<PackageManager, string> = {
		bun: 'Bun',
		npm: 'npm',
		pnpm: 'pnpm',
		yarn: 'Yarn'
	};

	const getManagerIcon = (manager: PackageManager) => codeGroupSvgData.find((item) => item.name === manager)?.svg || '';

	const getCommands = (manager: PackageManager): Command[] => {
		const createCommand = {
			bun: 'bun create any-tdf@latest my-stdf -f svelte',
			npm: 'npm create any-tdf@latest my-stdf -f svelte',
			pnpm: 'pnpm create any-tdf@latest my-stdf -f svelte',
			yarn: 'yarn create any-tdf@latest my-stdf -f svelte'
		};
		const installCommand = { bun: 'bun i', npm: 'npm i', pnpm: 'pnpm i', yarn: 'yarn' };
		const devCommand = { bun: 'bun dev', npm: 'npm run dev', pnpm: 'pnpm dev', yarn: 'yarn dev' };

		return [
			{ cmd: createCommand[manager], output: isZh ? '正在创建 STDF 项目……' : 'Creating STDF project...', delay: 480 },
			{ cmd: 'cd my-stdf', output: '', delay: 160 },
			{ cmd: installCommand[manager], output: isZh ? '安装依赖中……' : 'Installing dependencies...', delay: 560 },
			{ cmd: devCommand[manager], output: 'http://localhost:5173/', delay: 360, isDevOutput: true }
		];
	};

	const highlightCommand = (command: string) => {
		const keywords = ['bun', 'npm', 'pnpm', 'yarn', 'cd', 'create', 'install', 'i', 'run', 'dev'];
		return command
			.split(' ')
			.map((part, index) => {
				if (index === 0 || keywords.includes(part)) return `<span class="text-primary dark:text-dark">${part}</span>`;
				if (part.startsWith('any-tdf@') || part === 'svelte') return `<span class="text-cyan-600 dark:text-cyan-400">${part}</span>`;
				if (part.startsWith('my-')) return `<span class="text-amber-600 dark:text-amber-400">${part}</span>`;
				return `<span class="text-gray-700 dark:text-gray-300">${part}</span>`;
			})
			.join(' ');
	};

	let activeManager = $state<PackageManager>('bun');
	let currentStep = $state(0);
	let currentText = $state('');
	let showOutput = $state(false);
	let showCursor = $state(true);
	let isAnimating = $state(false);
	let hasStarted = $state(false);
	let completedCommands = $state<Array<Pick<Command, 'cmd' | 'output' | 'isDevOutput'>>>([]);
	let commands = $derived(getCommands(activeManager));
	let typingTimer: ReturnType<typeof setInterval> | undefined;
	let cursorTimer: ReturnType<typeof setInterval> | undefined;
	let stepTimer: ReturnType<typeof setTimeout> | undefined;

	const stopStepTimers = () => {
		if (typingTimer) clearInterval(typingTimer);
		if (stepTimer) clearTimeout(stepTimer);
	};

	const typeCommand = (text: string, onComplete: () => void) => {
		let index = 0;
		currentText = '';
		showOutput = false;
		typingTimer = setInterval(() => {
			if (index < text.length) {
				currentText += text[index];
				index += 1;
				return;
			}
			if (typingTimer) clearInterval(typingTimer);
			onComplete();
		}, 42);
	};

	const nextStep = () => {
		if (currentStep >= commands.length) {
			isAnimating = false;
			return;
		}

		const command = commands[currentStep];
		typeCommand(command.cmd, () => {
			showOutput = true;
			stepTimer = setTimeout(() => {
				completedCommands = [...completedCommands, command];
				currentStep += 1;
				currentText = '';
				showOutput = false;
				nextStep();
			}, command.delay);
		});
	};

	const replay = () => {
		stopStepTimers();
		completedCommands = [];
		currentStep = 0;
		currentText = '';
		showOutput = false;
		isAnimating = true;
		nextStep();
	};

	const switchManager = (manager: PackageManager) => {
		if (manager === activeManager) return;
		activeManager = manager;
		replay();
	};

	onMount(() => {
		cursorTimer = setInterval(() => (showCursor = !showCursor), 530);
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasStarted) {
					hasStarted = true;
					replay();
				}
			},
			{ threshold: 0.25 }
		);
		const section = document.getElementById('terminal-demo');
		if (section) observer.observe(section);
		return () => observer.disconnect();
	});

	onDestroy(() => {
		stopStepTimers();
		if (cursorTimer) clearInterval(cursorTimer);
	});
</script>

<section id="terminal-demo" class="terminal-demo">
	<div class="terminal-manager-bar">
		<div class="terminal-manager-tabs">
			{#each packageManagers as manager (manager)}
				<button class:active={activeManager === manager} onclick={() => switchManager(manager)} type="button">
					<span class="terminal-manager-icon" aria-hidden="true">{@html getManagerIcon(manager)}</span>
					<span class="terminal-manager-name">{packageManagerLabels[manager]}</span>
				</button>
			{/each}
		</div>
		<button class="terminal-replay" onclick={replay} disabled={isAnimating} type="button">
			↻ {isZh ? '重播' : 'Replay'}
		</button>
	</div>

	<div class="terminal-command-log" aria-live="polite">
		{#each completedCommands as command (command.cmd)}
			<div class="terminal-command-entry">
				<div class="terminal-command-line"><span>$</span><span>{@html highlightCommand(command.cmd)}</span></div>
				{#if command.output}
					{#if command.isDevOutput}
						<div class="terminal-output"><span>READY</span> {command.output}</div>
					{:else}
						<div class="terminal-output">{command.output}</div>
					{/if}
				{/if}
			</div>
		{/each}

		{#if currentStep < commands.length}
			<div class="terminal-command-entry">
				<div class="terminal-command-line">
					<span>$</span><span>{@html highlightCommand(currentText)}</span><span class:visible={showCursor} class="terminal-cursor"></span>
				</div>
				{#if showOutput && commands[currentStep]?.output}
					<div class="terminal-output">{commands[currentStep].output}</div>
				{/if}
			</div>
		{:else}
			<div class="terminal-ready"><span>✓ READY</span><span>http://localhost:5173/</span></div>
		{/if}
	</div>
</section>
