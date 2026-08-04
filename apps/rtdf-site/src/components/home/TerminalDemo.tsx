import { useEffect, useRef, useState } from 'react';
import codeGroupSvgData from '../../utils/code-group-svg-data';

type Command = {
	cmd: string;
	output: string;
	delay: number;
	isDevOutput?: boolean;
};

type TerminalDemoProps = {
	lang?: 'zh_CN' | 'en_US';
};

const packageManagers = ['bun', 'npm', 'pnpm', 'yarn'] as const;
type PackageManager = (typeof packageManagers)[number];
const packageManagerLabels: Record<PackageManager, string> = {
	bun: 'Bun',
	npm: 'npm',
	pnpm: 'pnpm',
	yarn: 'Yarn'
};

const getManagerIcon = (manager: PackageManager) => codeGroupSvgData.find((item) => item.name === manager)?.svg || '';

const highlightCommand = (command: string) => {
	const keywords = ['bun', 'npm', 'pnpm', 'yarn', 'cd', 'create', 'install', 'i', 'run', 'dev'];
	return command
		.split(' ')
		.map((part, index) => {
			if (index === 0 || keywords.includes(part)) return `<span class="text-primary dark:text-dark">${part}</span>`;
			if (part.startsWith('any-tdf@') || part === 'react') return `<span class="text-cyan-600 dark:text-cyan-400">${part}</span>`;
			if (part.startsWith('my-')) return `<span class="text-amber-600 dark:text-amber-400">${part}</span>`;
			return `<span class="text-gray-700 dark:text-gray-300">${part}</span>`;
		})
		.join(' ');
};

const TerminalDemo = ({ lang = 'zh_CN' }: TerminalDemoProps) => {
	const isZh = lang === 'zh_CN';

	const getCommands = (manager: PackageManager): Command[] => {
		const createCommand = {
			bun: 'bun create any-tdf@alpha my-rtdf -f react',
			npm: 'npm create any-tdf@alpha my-rtdf -f react',
			pnpm: 'pnpm create any-tdf@alpha my-rtdf -f react',
			yarn: 'yarn create any-tdf@alpha my-rtdf -f react'
		};
		const installCommand = { bun: 'bun i', npm: 'npm i', pnpm: 'pnpm i', yarn: 'yarn' };
		const devCommand = { bun: 'bun dev', npm: 'npm run dev', pnpm: 'pnpm dev', yarn: 'yarn dev' };

		return [
			{ cmd: createCommand[manager], output: isZh ? '正在创建 RTDF 项目……' : 'Creating RTDF project...', delay: 480 },
			{ cmd: 'cd my-rtdf', output: '', delay: 160 },
			{ cmd: installCommand[manager], output: isZh ? '安装依赖中……' : 'Installing dependencies...', delay: 560 },
			{ cmd: devCommand[manager], output: 'http://localhost:5173/', delay: 360, isDevOutput: true }
		];
	};

	const [activeManager, setActiveManager] = useState<PackageManager>('bun');
	const [currentStep, setCurrentStep] = useState(0);
	const [currentText, setCurrentText] = useState('');
	const [showOutput, setShowOutput] = useState(false);
	const [showCursor, setShowCursor] = useState(true);
	const [isAnimating, setIsAnimating] = useState(false);
	const [hasStarted, setHasStarted] = useState(false);
	const [completedCommands, setCompletedCommands] = useState<Array<Pick<Command, 'cmd' | 'output' | 'isDevOutput'>>>([]);
	const commands = getCommands(activeManager);

	const typingTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
	const cursorTimerRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
	const stepTimerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
	// 用 ref 跟踪最新的步骤状态，避免闭包捕获旧值
	const stateRef = useRef({ currentStep, commands });
	stateRef.current = { currentStep, commands };

	const stopStepTimers = () => {
		if (typingTimerRef.current) clearInterval(typingTimerRef.current);
		if (stepTimerRef.current) clearTimeout(stepTimerRef.current);
	};

	const typeCommand = (text: string, onComplete: () => void) => {
		let index = 0;
		setCurrentText('');
		setShowOutput(false);
		typingTimerRef.current = setInterval(() => {
			if (index < text.length) {
				setCurrentText((prev) => prev + text[index]);
				index += 1;
				return;
			}
			if (typingTimerRef.current) clearInterval(typingTimerRef.current);
			onComplete();
		}, 42);
	};

	const nextStep = () => {
		const { currentStep: step, commands: cmds } = stateRef.current;
		if (step >= cmds.length) {
			setIsAnimating(false);
			return;
		}

		const command = cmds[step];
		typeCommand(command.cmd, () => {
			setShowOutput(true);
			stepTimerRef.current = setTimeout(() => {
				setCompletedCommands((prev) => [...prev, command]);
				setCurrentStep(step + 1);
				stateRef.current.currentStep = step + 1;
				setCurrentText('');
				setShowOutput(false);
				nextStep();
			}, command.delay);
		});
	};

	const replay = () => {
		stopStepTimers();
		setCompletedCommands([]);
		setCurrentStep(0);
		stateRef.current.currentStep = 0;
		setCurrentText('');
		setShowOutput(false);
		setIsAnimating(true);
		nextStep();
	};

	const switchManager = (manager: PackageManager) => {
		if (manager === activeManager) return;
		setActiveManager(manager);
		stateRef.current.commands = getCommands(manager);
		replay();
	};

	useEffect(() => {
		cursorTimerRef.current = setInterval(() => setShowCursor((prev) => !prev), 530);
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting && !hasStarted) {
					setHasStarted(true);
					replay();
				}
			},
			{ threshold: 0.25 }
		);
		const section = document.getElementById('terminal-demo');
		if (section) observer.observe(section);
		return () => {
			observer.disconnect();
			stopStepTimers();
			if (cursorTimerRef.current) clearInterval(cursorTimerRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [hasStarted]);

	return (
		<section id="terminal-demo" className="terminal-demo">
			<div className="terminal-manager-bar">
				<div className="terminal-manager-tabs">
					{packageManagers.map((manager) => (
						<button
							key={manager}
							className={activeManager === manager ? 'active' : ''}
							onClick={() => switchManager(manager)}
							type="button"
						>
							<span className="terminal-manager-icon" aria-hidden="true" dangerouslySetInnerHTML={{ __html: getManagerIcon(manager) }} />
							<span className="terminal-manager-name">{packageManagerLabels[manager]}</span>
						</button>
					))}
				</div>
				<button className="terminal-replay" onClick={replay} disabled={isAnimating} type="button">
					↻ {isZh ? '重播' : 'Replay'}
				</button>
			</div>

			<div className="terminal-command-log" aria-live="polite">
				{completedCommands.map((command) => (
					<div className="terminal-command-entry" key={command.cmd}>
						<div className="terminal-command-line">
							<span>$</span>
							<span dangerouslySetInnerHTML={{ __html: highlightCommand(command.cmd) }} />
						</div>
						{command.output ? (
							command.isDevOutput ? (
								<div className="terminal-output">
									<span>READY</span> {command.output}
								</div>
							) : (
								<div className="terminal-output">{command.output}</div>
							)
						) : null}
					</div>
				))}

				{currentStep < commands.length ? (
					<div className="terminal-command-entry">
						<div className="terminal-command-line">
							<span>$</span>
							<span dangerouslySetInnerHTML={{ __html: highlightCommand(currentText) }} />
							<span className={`terminal-cursor${showCursor ? ' visible' : ''}`}></span>
						</div>
						{showOutput && commands[currentStep]?.output ? <div className="terminal-output">{commands[currentStep].output}</div> : null}
					</div>
				) : (
					<div className="terminal-ready">
						<span>✓ READY</span>
						<span>http://localhost:5173/</span>
					</div>
				)}
			</div>
		</section>
	);
};

export default TerminalDemo;
