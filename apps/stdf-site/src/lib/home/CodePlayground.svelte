<script lang="ts">
	import { onMount } from 'svelte';
	import { Badge, Input, Button, Checkbox } from 'stdf';
	import hljs from 'highlight.js';
	// @ts-expect-error - highlightjs-svelte 缺少类型定义
	import hljs_svelte from 'highlightjs-svelte/dist/index.mjs';
	hljs_svelte(hljs);

	const isZh = localStorage.getItem('lang') === 'zh_CN';

	// 代码步骤 - 先写空 script，再写 HTML，最后填充 script 逻辑
	const codeSteps = [
		// 1: 先写空的 script 标签
		{ add: `<script lang="ts">\n<${'/'}script>`, preview: 'scriptTag' },
		// 2-4: 写 HTML 结构
		{ add: `\n\n<Input placeholder="${isZh ? '添加待办...' : 'Add todo...'}" />`, preview: 'input' },
		{ add: `\n<Button fill="line">${isZh ? '添加' : 'Add'}</Button>`, preview: 'button' },
		{ add: `\n<Checkbox />`, preview: 'checkboxEmpty' },
		{ add: `\n<p>${isZh ? '剩余待办' : 'remaining'}</p>`, preview: 'structure' },
		// 6: 光标移动到 script 内部（不添加内容，只移动光标）
		{ moveTo: 'script', preview: 'structure' },
		// 7: 在 script 内部写 import
		{ insertInside: { tag: '<script lang="ts">', content: `\n  import { Input, Button, Checkbox } from 'stdf';` }, preview: 'import' },
		// 8: 写数据定义
		{
			insertInside: {
				tag: '<script lang="ts">',
				append: `\n\n  let todos = $state([\n    { name: '0', label: '${isZh ? '学习 Svelte' : 'Learn Svelte'}' },\n    { name: '1', label: '${isZh ? '使用 STDF' : 'Use STDF'}' }\n  ]);\n  let checkeds = $state(['1']);`
			},
			preview: 'data'
		},
		// 9: 写 $derived 计算剩余数量
		{
			insertInside: { tag: '<script lang="ts">', append: `\n  let remaining = $derived(todos.length - checkeds.length);` },
			preview: 'derived'
		},
		// 10: 光标下移到 Checkbox
		{ moveTo: 'Checkbox', preview: 'derived' },
		// 11: 绑定 Checkbox 数据
		{ replace: { from: '<Checkbox />', to: '<Checkbox data={todos} bind:checkeds />' }, preview: 'bindCheckbox' },
		// 12: 光标下移到 p 标签
		{ moveTo: 'p', preview: 'bindCheckbox' },
		// 13: 绑定剩余数量
		{
			replace: { from: `<p>${isZh ? '剩余待办' : 'remaining'}</p>`, to: `<p>{remaining} ${isZh ? '项待办' : 'left'}</p>` },
			preview: 'complete'
		}
	];

	let currentStep = $state(0);
	let charIndex = $state(0);
	let displayedCode = $state('');
	let baseCode = ''; // 已完成步骤的代码
	let cursorPosition = $state(0); // 光标位置
	let codeAreaRef = $state<HTMLDivElement | null>(null);
	let currentPreview = $state('');

	// 预览状态
	let todos = $state([
		{ name: '0', label: isZh ? '学习 Svelte' : 'Learn Svelte' },
		{ name: '1', label: isZh ? '使用 STDF' : 'Use STDF' }
	]);
	let checkeds = $state(['1']);
	let input = $state('');
	let remaining = $derived(todos.length - checkeds.length);

	function addTodo() {
		if (!input.trim()) return;
		todos.push({ name: String(todos.length), label: input });
		input = '';
	}

	let isComplete = $state(false);

	// 重播函数
	function replay() {
		currentStep = 0;
		charIndex = 0;
		displayedCode = '';
		baseCode = '';
		cursorPosition = 0;
		currentPreview = '';
		isComplete = false;
		todos = [
			{ name: '0', label: isZh ? '学习 Svelte' : 'Learn Svelte' },
			{ name: '1', label: isZh ? '使用 STDF' : 'Use STDF' }
		];
		checkeds = ['1'];
		input = '';
		setTimeout(() => typeNextChar(), 100);
	}

	function scrollToBottom() {
		if (codeAreaRef) {
			codeAreaRef.scrollTo({ top: codeAreaRef.scrollHeight, behavior: 'smooth' });
		}
	}

	let typeNextChar: () => void;

	// 滚动到顶部
	function scrollToTop() {
		if (codeAreaRef) {
			codeAreaRef.scrollTo({ top: 0, behavior: 'smooth' });
		}
	}

	onMount(() => {
		typeNextChar = () => {
			if (currentStep >= codeSteps.length) {
				isComplete = true;
				return;
			}

			const step = codeSteps[currentStep];

			// 处理光标移动（不添加内容，只移动光标）
			if ('moveTo' in step) {
				const target = step.moveTo;

				if (target === 'script') {
					scrollToTop();
					// 找到闭合标签前的换行符位置，光标移动到那里
					const closeTag = '<' + '/script>';
					const closeIdx = baseCode.indexOf(closeTag);
					if (closeIdx !== -1) {
						const newlineBeforeClose = baseCode.lastIndexOf('\n', closeIdx - 1);
						cursorPosition = newlineBeforeClose >= 0 ? newlineBeforeClose : closeIdx;
						displayedCode = baseCode;
					}
				} else {
					// 移动到指定文本位置
					scrollToBottom();
					const targetIdx = baseCode.indexOf('<' + target);
					if (targetIdx !== -1) {
						cursorPosition = targetIdx;
						displayedCode = baseCode;
					}
				}

				if (step.preview) currentPreview = step.preview;
				setTimeout(() => {
					currentStep++;
					charIndex = 0;
					typeNextChar();
				}, 800);
				return;
			}

			// 处理替换操作（保留原内容，逐字替换）
			if ('replace' in step && step.replace) {
				const { from, to } = step.replace;
				const idx = baseCode.indexOf(from);

				if (idx === -1) {
					currentStep++;
					charIndex = 0;
					typeNextChar();
					return;
				}

				if (charIndex < to.length) {
					const before = baseCode.slice(0, idx);
					const after = baseCode.slice(idx + from.length);
					const typedText = to.slice(0, charIndex + 1);
					// 如果还没打完，显示已打的部分 + 原内容剩余部分（如果有）
					const remainingOld = from.slice(Math.min(charIndex + 1, from.length));
					displayedCode = before + typedText + remainingOld + after;
					cursorPosition = idx + charIndex + 1;
					charIndex++;
					setTimeout(typeNextChar, 50);
				} else {
					baseCode = baseCode.slice(0, idx) + to + baseCode.slice(idx + from.length);
					displayedCode = baseCode;
					if (step.preview) currentPreview = step.preview;
					setTimeout(() => {
						currentStep++;
						charIndex = 0;
						typeNextChar();
					}, 800);
				}
				return;
			}

			// 处理在标签内部插入（先找到位置，再逐字输入）
			if ('insertInside' in step && step.insertInside) {
				const { tag, content, append } = step.insertInside;
				const addText = content || append || '';
				const tagIdx = baseCode.indexOf(tag);

				if (tagIdx === -1) {
					currentStep++;
					typeNextChar();
					return;
				}

				// 找到闭合标签的位置（提取标签名）
				const tagNameMatch = tag.match(/^<(\w+)/);
				const tagName = tagNameMatch ? tagNameMatch[1] : 'script';
				const closeTag = '</' + tagName + '>';
				const closeIdx = baseCode.indexOf(closeTag);
				// 插入位置：在闭合标签前的换行符之前，保持闭合标签在独立行
				const newlineBeforeClose = baseCode.lastIndexOf('\n', closeIdx - 1);
				const insertPos = newlineBeforeClose >= 0 ? newlineBeforeClose : closeIdx;

				if (charIndex === 0) {
					scrollToTop();
					cursorPosition = insertPos;
				}

				if (charIndex < addText.length) {
					const before = baseCode.slice(0, insertPos);
					const after = baseCode.slice(insertPos);
					const typedText = addText.slice(0, charIndex + 1);
					displayedCode = before + typedText + after;
					// 如果当前字符是换行，光标留在换行前
					const lastChar = typedText[typedText.length - 1];
					cursorPosition = lastChar === '\n' ? insertPos + charIndex : insertPos + charIndex + 1;
					charIndex++;
					setTimeout(typeNextChar, 40);
				} else {
					baseCode = displayedCode;
					if (step.preview) currentPreview = step.preview;
					setTimeout(() => {
						currentStep++;
						charIndex = 0;
						typeNextChar();
					}, 1000);
				}
				return;
			}

			// 处理在指定位置插入（script 部分速度更慢）
			if ('insertAt' in step && step.insertAt !== undefined && typeof step.insertAt === 'number') {
				const insertPos: number = step.insertAt;
				const addText = step.add as string;

				if (charIndex === 0) {
					scrollToTop();
					cursorPosition = insertPos;
				}

				if (charIndex < addText.length) {
					const before = baseCode.slice(0, insertPos);
					const after = baseCode.slice(insertPos);
					displayedCode = before + addText.slice(0, charIndex + 1) + after;
					cursorPosition = insertPos + charIndex + 1;
					charIndex++;
					setTimeout(typeNextChar, 40); // script 部分放慢
				} else {
					baseCode = displayedCode;
					if (step.preview) currentPreview = step.preview;
					setTimeout(() => {
						currentStep++;
						charIndex = 0;
						typeNextChar();
					}, 1000);
				}
				return;
			}

			// 正常末尾添加
			const addText = step.add;
			if (charIndex < addText.length) {
				displayedCode = baseCode + addText.slice(0, charIndex + 1);
				cursorPosition = displayedCode.length;
				charIndex++;
				scrollToBottom();
				setTimeout(typeNextChar, 50); // 放慢速度
			} else {
				baseCode = displayedCode;
				if (step.preview) currentPreview = step.preview;
				setTimeout(() => {
					currentStep++;
					charIndex = 0;
					typeNextChar();
				}, 1000); // 步骤间停顿更长
			}
		};

		typeNextChar();
	});

	const CURSOR_MARKER = '\u200B\u200B\u200B';
	const cursorHtml = '<span class="animate-blink text-primary dark:text-dark font-bold">|</span>';

	const highlightedCode = $derived(() => {
		if (!displayedCode) return `<div class="bg-primary/5 dark:bg-dark/5 -mx-4 px-4">${cursorHtml}</div>`;

		const showCursor = !isComplete;

		// 在光标位置插入标记
		let codeWithCursor = displayedCode;
		if (showCursor) {
			codeWithCursor = displayedCode.slice(0, cursorPosition) + CURSOR_MARKER + displayedCode.slice(cursorPosition);
		}

		// 高亮代码
		let highlighted = hljs.highlight(codeWithCursor, { language: 'svelte', ignoreIllegals: true }).value;

		// 替换标记为光标
		if (showCursor) {
			highlighted = highlighted.replace(CURSOR_MARKER, cursorHtml);
		}

		// 分割成行，高亮光标所在行
		const lines = highlighted.split('\n');
		const textBeforeCursor = displayedCode.slice(0, cursorPosition);
		const cursorLineIndex = textBeforeCursor.split('\n').length - 1;

		return lines
			.map((line, lineIndex) => {
				if (showCursor && lineIndex === cursorLineIndex) {
					return `<div class="bg-primary/5 dark:bg-dark/5 -mx-4 px-4">${line || ' '}</div>`;
				}
				return `<div>${line || ' '}</div>`;
			})
			.join('');
	});
</script>

<section class="relative overflow-hidden py-12">
	<div class="relative z-10 mx-auto">
		<div class="mb-12 text-center">
			<div
				class="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark"
			>
				<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
					<path
						d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z"
					/>
				</svg>
				<span>{isZh ? '开发体验' : 'Developer Experience'}</span>
			</div>

			<h2
				class="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white"
			>
				{isZh ? '写得少，做得多' : 'Write Less, Do More'}
			</h2>
			<p class="mx-auto max-w-2xl text-base opacity-70">
				{isZh
					? '使用 STDF 组件，几行代码即可构建完整功能。'
					: 'Build complete features with just a few lines of code using STDF components.'}
			</p>
		</div>

		<div class="mx-auto w-full max-w-screen-2xl">
			<div class="grid gap-6 lg:grid-cols-5">
				<!-- 左侧：代码编辑器 -->
				<div
					class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl lg:col-span-3 dark:border-gray-700 dark:bg-gray-900"
				>
					<div class="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
						<div class="flex gap-1.5">
							<div class="size-3 rounded-full bg-red-400 dark:bg-red-500"></div>
							<div class="size-3 rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
							<div class="size-3 rounded-full bg-green-400 dark:bg-green-500"></div>
						</div>
						<div class="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">Todo.svelte</div>
					</div>
					<div bind:this={codeAreaRef} class="prose dark:prose-invert h-105 max-w-none overflow-auto bg-gray-50 p-4 dark:bg-gray-900">
						<pre class="!m-0 !bg-transparent text-xs leading-5"><code class="hljs !bg-transparent">{@html highlightedCode()}</code></pre>
					</div>
					<div
						class="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-1.5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
					>
						<span class="flex items-center gap-1">
							<span class="size-2 rounded-full {isComplete ? 'bg-primary dark:bg-dark' : 'bg-green-500'}"></span>
							{isComplete ? (isZh ? '已完成' : 'Complete') : isZh ? '输入中...' : 'Typing...'}
						</span>
						<div class="flex items-center gap-3">
							{#if isComplete}
								<button
									onclick={replay}
									class="flex items-center gap-1 rounded px-2 py-0.5 text-primary transition hover:bg-primary/10 dark:text-dark dark:hover:bg-dark/10"
								>
									<svg class="size-3" viewBox="0 0 24 24" fill="currentColor">
										<path
											d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z"
										/>
									</svg>
									{isZh ? '重播' : 'Replay'}
								</button>
							{/if}
							<span>{isZh ? '步骤' : 'Step'} {Math.min(currentStep + 1, codeSteps.length)}/{codeSteps.length}</span>
						</div>
					</div>
				</div>

				<!-- 右侧：实时预览 -->
				<div
					class="flex flex-col overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-2xl lg:col-span-2 dark:border-gray-700/50 dark:bg-gray-900"
				>
					<div
						class="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
					>
						<div class="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
							<svg class="size-4" viewBox="0 0 24 24" fill="currentColor">
								<path
									d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z"
								/>
							</svg>
							{isZh ? '预览' : 'Preview'}
						</div>
						<Badge text="Live" />
					</div>
					<div class="flex flex-1 items-center justify-center bg-gray-100 p-6 dark:bg-gray-800/50">
						<div class="w-full max-w-xs rounded-xl bg-white p-4 shadow-lg transition-all duration-300 dark:bg-gray-900">
							{#if currentPreview === 'scriptTag'}
								<div class="text-center text-sm text-gray-400">{isZh ? '准备中...' : 'Preparing...'}</div>
							{:else if currentPreview === 'input'}
								<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
							{:else if currentPreview === 'button'}
								<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
								<div class="mt-2">
									<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
								</div>
							{:else if currentPreview === 'checkboxEmpty'}
								<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
								<div class="mt-2">
									<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
								</div>
								<div class="mt-3 text-center text-sm text-gray-400">{isZh ? '( 待绑定数据 )' : '( Waiting for data )'}</div>
							{:else if currentPreview === 'structure' || currentPreview === 'import' || currentPreview === 'data' || currentPreview === 'derived'}
								<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
								<div class="mt-2">
									<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
								</div>
								<div class="mt-3 text-center text-sm text-gray-400">{isZh ? '( 待绑定数据 )' : '( Waiting for data )'}</div>
								<p class="mt-2 text-sm text-gray-400">{isZh ? '剩余待办' : 'remaining'}</p>
							{:else if currentPreview === 'bindCheckbox'}
								<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
								<div class="mt-2">
									<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
								</div>
								<div class="mt-3">
									<Checkbox data={todos} bind:checkeds />
								</div>
								<p class="mt-2 text-sm text-gray-400">{isZh ? '剩余待办' : 'remaining'}</p>
							{:else if currentPreview === 'complete' || isComplete}
								<Input bind:value={input} placeholder={isZh ? '添加待办...' : 'Add todo...'} />
								<div class="mt-2">
									<Button fill="line" onclick={addTodo}>{isZh ? '添加' : 'Add'}</Button>
								</div>
								<div class="mt-3">
									<Checkbox data={todos} bind:checkeds />
								</div>
								<p class="mt-2 text-sm text-gray-500">{remaining} {isZh ? '项待办' : 'left'}</p>
							{:else}
								<div class="text-center text-sm text-gray-400">{isZh ? '等待代码...' : 'Waiting for code...'}</div>
							{/if}
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</section>
