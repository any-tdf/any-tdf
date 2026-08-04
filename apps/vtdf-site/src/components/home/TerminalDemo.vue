<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue';
import codeGroupSvgData from '../../utils/code-group-svg-data';

const props = withDefaults(
	defineProps<{
		lang?: 'zh_CN' | 'en_US';
	}>(),
	{
		lang: 'zh_CN'
	}
);

type Command = {
	cmd: string;
	output: string;
	delay: number;
	isDevOutput?: boolean;
};

const isZh = computed(() => props.lang === 'zh_CN');
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
		bun: 'bun create any-tdf@alpha my-vtdf -f vue',
		npm: 'npm create any-tdf@alpha my-vtdf -f vue',
		pnpm: 'pnpm create any-tdf@alpha my-vtdf -f vue',
		yarn: 'yarn create any-tdf@alpha my-vtdf -f vue'
	};
	const installCommand = { bun: 'bun i', npm: 'npm i', pnpm: 'pnpm i', yarn: 'yarn' };
	const devCommand = { bun: 'bun dev', npm: 'npm run dev', pnpm: 'pnpm dev', yarn: 'yarn dev' };

	return [
		{ cmd: createCommand[manager], output: isZh.value ? '正在创建 VTDF 项目……' : 'Creating VTDF project...', delay: 480 },
		{ cmd: 'cd my-vtdf', output: '', delay: 160 },
		{ cmd: installCommand[manager], output: isZh.value ? '安装依赖中……' : 'Installing dependencies...', delay: 560 },
		{ cmd: devCommand[manager], output: 'http://localhost:5173/', delay: 360, isDevOutput: true }
	];
};

const highlightCommand = (command: string) => {
	const keywords = ['bun', 'npm', 'pnpm', 'yarn', 'cd', 'create', 'install', 'i', 'run', 'dev'];
	return command
		.split(' ')
		.map((part, index) => {
			if (index === 0 || keywords.includes(part)) return `<span class="text-primary dark:text-dark">${part}</span>`;
			if (part.startsWith('any-tdf@') || part === 'vue') return `<span class="text-cyan-600 dark:text-cyan-400">${part}</span>`;
			if (part.startsWith('my-')) return `<span class="text-amber-600 dark:text-amber-400">${part}</span>`;
			return `<span class="text-gray-700 dark:text-gray-300">${part}</span>`;
		})
		.join(' ');
};

const activeManager = ref<PackageManager>('bun');
const currentStep = ref(0);
const currentText = ref('');
const showOutput = ref(false);
const showCursor = ref(true);
const isAnimating = ref(false);
const hasStarted = ref(false);
const completedCommands = ref<Array<Pick<Command, 'cmd' | 'output' | 'isDevOutput'>>>([]);
const commands = computed(() => getCommands(activeManager.value));
let typingTimer: ReturnType<typeof setInterval> | undefined;
let cursorTimer: ReturnType<typeof setInterval> | undefined;
let stepTimer: ReturnType<typeof setTimeout> | undefined;

const stopStepTimers = () => {
	if (typingTimer) clearInterval(typingTimer);
	if (stepTimer) clearTimeout(stepTimer);
};

const typeCommand = (text: string, onComplete: () => void) => {
	let index = 0;
	currentText.value = '';
	showOutput.value = false;
	typingTimer = setInterval(() => {
		if (index < text.length) {
			currentText.value += text[index];
			index += 1;
			return;
		}
		if (typingTimer) clearInterval(typingTimer);
		onComplete();
	}, 42);
};

const nextStep = () => {
	if (currentStep.value >= commands.value.length) {
		isAnimating.value = false;
		return;
	}

	const command = commands.value[currentStep.value];
	typeCommand(command.cmd, () => {
		showOutput.value = true;
		stepTimer = setTimeout(() => {
			completedCommands.value = [...completedCommands.value, command];
			currentStep.value += 1;
			currentText.value = '';
			showOutput.value = false;
			nextStep();
		}, command.delay);
	});
};

const replay = () => {
	stopStepTimers();
	completedCommands.value = [];
	currentStep.value = 0;
	currentText.value = '';
	showOutput.value = false;
	isAnimating.value = true;
	nextStep();
};

const switchManager = (manager: PackageManager) => {
	if (manager === activeManager.value) return;
	activeManager.value = manager;
	replay();
};

let observer: IntersectionObserver | null = null;

onMounted(() => {
	cursorTimer = setInterval(() => (showCursor.value = !showCursor.value), 530);
	observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting && !hasStarted.value) {
				hasStarted.value = true;
				replay();
			}
		},
		{ threshold: 0.25 }
	);
	const section = document.getElementById('terminal-demo');
	if (section) observer.observe(section);
});

onBeforeUnmount(() => {
	stopStepTimers();
	if (cursorTimer) clearInterval(cursorTimer);
	observer?.disconnect();
});
</script>

<template>
	<section id="terminal-demo" class="terminal-demo">
		<div class="terminal-manager-bar">
			<div class="terminal-manager-tabs">
				<button
					v-for="manager in packageManagers"
					:key="manager"
					:class="{ active: activeManager === manager }"
					type="button"
					@click="switchManager(manager)"
				>
					<span class="terminal-manager-icon" aria-hidden="true" v-html="getManagerIcon(manager)"></span>
					<span class="terminal-manager-name">{{ packageManagerLabels[manager] }}</span>
				</button>
			</div>
			<button class="terminal-replay" type="button" :disabled="isAnimating" @click="replay">↻ {{ isZh ? '重播' : 'Replay' }}</button>
		</div>

		<div class="terminal-command-log" aria-live="polite">
			<div v-for="command in completedCommands" :key="command.cmd" class="terminal-command-entry">
				<div class="terminal-command-line"><span>$</span><span v-html="highlightCommand(command.cmd)"></span></div>
				<template v-if="command.output">
					<div v-if="command.isDevOutput" class="terminal-output"><span>READY</span> {{ command.output }}</div>
					<div v-else class="terminal-output">{{ command.output }}</div>
				</template>
			</div>

			<div v-if="currentStep < commands.length" class="terminal-command-entry">
				<div class="terminal-command-line">
					<span>$</span><span v-html="highlightCommand(currentText)"></span
					><span class="terminal-cursor" :class="{ visible: showCursor }"></span>
				</div>
				<div v-if="showOutput && commands[currentStep]?.output" class="terminal-output">{{ commands[currentStep].output }}</div>
			</div>
			<div v-else class="terminal-ready"><span>✓ READY</span><span>http://localhost:5173/</span></div>
		</div>
	</section>
</template>
