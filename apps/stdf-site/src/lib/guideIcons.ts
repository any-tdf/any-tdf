import {
	Blocks,
	BookOpen,
	BrainCircuit,
	Braces,
	CircleArrowUp,
	CircleEllipsis,
	CircleQuestionMark,
	FileText,
	GitPullRequest,
	Goal,
	Image as ImageIcon,
	Info,
	Keyboard,
	Languages,
	MessageCircleReply,
	MonitorCheck,
	Palette,
	Pipette,
	Puzzle,
	Rocket,
	Shapes,
	Telescope,
	Terminal,
	Wrench
} from '@lucide/svelte';

export const guideCategoryIconMap = {
	常规: BookOpen,
	设计: Palette,
	工具: Wrench,
	其他: CircleEllipsis
};

export const guideItemIconMap = {
	'quick-start': Rocket,
	theme: Palette,
	icon: Shapes,
	feedback: MessageCircleReply,
	internation: Languages,
	faq: CircleQuestionMark,
	contribution: GitPullRequest,
	compatibility: MonitorCheck,
	upgrade: CircleArrowUp,
	color: Pipette,
	logo: ImageIcon,
	skill: BrainCircuit,
	utils: Braces,
	vscode: Blocks,
	create: Terminal,
	'icon-plugin': Puzzle,
	md: FileText,
	shortkey: Keyboard,
	about: Info,
	milestone: Goal,
	future: Telescope
};
