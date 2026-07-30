import { useEffect, useRef, useState } from 'react';
import { Badge, Input, Button, Checkbox } from 'rtdf/components';
import hljs from 'highlight.js';
import { useAppContext } from '../../store/appStore';

const CURSOR_MARKER = '​​​';
const cursorHtml = '<span class="animate-blink text-primary dark:text-dark font-bold">|</span>';

type CodeStep =
	| { add: string; preview?: string }
	| { moveTo: string; preview?: string }
	| { replace: { from: string; to: string }; preview?: string }
	| { insertInside: { tag: string; content?: string; append?: string }; preview?: string }
	| { insertAt: number; add: string; preview?: string };

const CodePlayground = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	// 代码步骤 - 先搭组件骨架，再写 JSX 结构，最后填充状态逻辑
	const codeSteps: CodeStep[] = [
		// 1: 先写 import
		{ add: `import { useState } from 'react';\nimport { Input, Button, Checkbox } from 'rtdf/components';\n\n`, preview: 'scriptTag' },
		// 2: 写组件骨架
		{ add: `export default () => {\n  return (\n    <div>\n    </div>\n  );\n};`, preview: 'structure' },
		// 3: 光标移动到 div
		{ moveTo: 'div', preview: 'structure' },
		// 4-6: 在 div 内部写 JSX 结构
		{
			insertInside: { tag: '<div>', content: `\n      <Input placeholder="${isZh ? '添加待办...' : 'Add todo...'}" />` },
			preview: 'input'
		},
		{ insertInside: { tag: '<div>', append: `\n      <Button fill="line">${isZh ? '添加' : 'Add'}</Button>` }, preview: 'button' },
		{
			insertInside: { tag: '<div>', append: `\n      <Checkbox />\n      <p>${isZh ? '剩余待办' : 'remaining'}</p>` },
			preview: 'checkboxEmpty'
		},
		// 7: 在 return 前写状态定义
		{
			replace: {
				from: `  return (`,
				to: `  const [todos] = useState([\n    { name: '0', label: '${isZh ? '学习 React' : 'Learn React'}' },\n    { name: '1', label: '${isZh ? '使用 RTDF' : 'Use RTDF'}' }\n  ]);\n  const [checkeds, setCheckeds] = useState(['1']);\n\n  return (`
			},
			preview: 'data'
		},
		// 8: 写 remaining 计算
		{
			replace: { from: `\n\n  return (`, to: `\n\n  const remaining = todos.length - checkeds.length;\n\n  return (` },
			preview: 'derived'
		},
		// 9: 光标下移到 Checkbox
		{ moveTo: 'Checkbox', preview: 'derived' },
		// 10: 绑定 Checkbox 数据
		{
			replace: { from: '<Checkbox />', to: '<Checkbox data={todos} checkeds={checkeds} onChange={setCheckeds} />' },
			preview: 'bindCheckbox'
		},
		// 11: 光标下移到 p 标签
		{ moveTo: 'p', preview: 'bindCheckbox' },
		// 12: 绑定剩余数量
		{
			replace: { from: `<p>${isZh ? '剩余待办' : 'remaining'}</p>`, to: `<p>{remaining} ${isZh ? '项待办' : 'left'}</p>` },
			preview: 'complete'
		}
	];

	const [currentStep, setCurrentStep] = useState(0);
	const [displayedCode, setDisplayedCode] = useState('');
	const [cursorPosition, setCursorPosition] = useState(0);
	const [currentPreview, setCurrentPreview] = useState('');
	const [isComplete, setIsComplete] = useState(false);
	const codeAreaRef = useRef<HTMLDivElement | null>(null);

	// 预览状态
	const [todos, setTodos] = useState([
		{ name: '0', label: isZh ? '学习 React' : 'Learn React' },
		{ name: '1', label: isZh ? '使用 RTDF' : 'Use RTDF' }
	]);
	const [checkeds, setCheckeds] = useState(['1']);
	const [input, setInput] = useState('');
	const remaining = todos.length - checkeds.length;

	// 打字机内部状态（用 ref 避免闭包捕获旧值）
	const stepRef = useRef(0);
	const charRef = useRef(0);
	const baseCodeRef = useRef('');
	const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const typeNextCharRef = useRef<() => void>(() => {});

	function addTodo() {
		if (!input.trim()) return;
		setTodos((prev) => [...prev, { name: String(prev.length), label: input }]);
		setInput('');
	}

	function scrollToBottom() {
		codeAreaRef.current?.scrollTo({ top: codeAreaRef.current.scrollHeight, behavior: 'smooth' });
	}

	// 滚动到顶部
	function scrollToTop() {
		codeAreaRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
	}

	// 重播函数
	function replay() {
		if (timeoutRef.current) clearTimeout(timeoutRef.current);
		stepRef.current = 0;
		charRef.current = 0;
		baseCodeRef.current = '';
		setCurrentStep(0);
		setDisplayedCode('');
		setCursorPosition(0);
		setCurrentPreview('');
		setIsComplete(false);
		setTodos([
			{ name: '0', label: isZh ? '学习 React' : 'Learn React' },
			{ name: '1', label: isZh ? '使用 RTDF' : 'Use RTDF' }
		]);
		setCheckeds(['1']);
		setInput('');
		timeoutRef.current = setTimeout(() => typeNextCharRef.current(), 100);
	}

	useEffect(() => {
		typeNextCharRef.current = () => {
			const stepIndex = stepRef.current;
			const charIndex = charRef.current;

			if (stepIndex >= codeSteps.length) {
				setIsComplete(true);
				return;
			}

			const step = codeSteps[stepIndex];
			const schedule = (fn: () => void, delay: number) => {
				timeoutRef.current = setTimeout(fn, delay);
			};
			const nextStep = (delay: number) => {
				schedule(() => {
					stepRef.current += 1;
					setCurrentStep(stepRef.current);
					charRef.current = 0;
					typeNextCharRef.current();
				}, delay);
			};

			// 处理光标移动（不添加内容，只移动光标）
			if ('moveTo' in step) {
				const target = step.moveTo;

				if (target === 'script') {
					scrollToTop();
					// 找到闭合标签前的换行符位置，光标移动到那里
					const closeTag = '<' + '/script>';
					const closeIdx = baseCodeRef.current.indexOf(closeTag);
					if (closeIdx !== -1) {
						const newlineBeforeClose = baseCodeRef.current.lastIndexOf('\n', closeIdx - 1);
						setCursorPosition(newlineBeforeClose >= 0 ? newlineBeforeClose : closeIdx);
						setDisplayedCode(baseCodeRef.current);
					}
				} else {
					// 移动到指定文本位置
					scrollToBottom();
					const targetIdx = baseCodeRef.current.indexOf('<' + target);
					if (targetIdx !== -1) {
						setCursorPosition(targetIdx);
						setDisplayedCode(baseCodeRef.current);
					}
				}

				if (step.preview) setCurrentPreview(step.preview);
				nextStep(800);
				return;
			}

			// 处理替换操作（保留原内容，逐字替换）
			if ('replace' in step && step.replace) {
				const { from, to } = step.replace;
				const idx = baseCodeRef.current.indexOf(from);

				if (idx === -1) {
					nextStep(0);
					return;
				}

				if (charIndex < to.length) {
					const before = baseCodeRef.current.slice(0, idx);
					const after = baseCodeRef.current.slice(idx + from.length);
					const typedText = to.slice(0, charIndex + 1);
					// 如果还没打完，显示已打的部分 + 原内容剩余部分（如果有）
					const remainingOld = from.slice(Math.min(charIndex + 1, from.length));
					setDisplayedCode(before + typedText + remainingOld + after);
					setCursorPosition(idx + charIndex + 1);
					charRef.current += 1;
					schedule(() => typeNextCharRef.current(), 50);
				} else {
					baseCodeRef.current = baseCodeRef.current.slice(0, idx) + to + baseCodeRef.current.slice(idx + from.length);
					setDisplayedCode(baseCodeRef.current);
					if (step.preview) setCurrentPreview(step.preview);
					nextStep(800);
				}
				return;
			}

			// 处理在标签内部插入（先找到位置，再逐字输入）
			if ('insertInside' in step && step.insertInside) {
				const { tag, content, append } = step.insertInside;
				const addText = content || append || '';
				const tagIdx = baseCodeRef.current.indexOf(tag);

				if (tagIdx === -1) {
					stepRef.current += 1;
					setCurrentStep(stepRef.current);
					schedule(() => typeNextCharRef.current(), 0);
					return;
				}

				// 找到闭合标签的位置（提取标签名）
				const tagNameMatch = tag.match(/^<(\w+)/);
				const tagName = tagNameMatch ? tagNameMatch[1] : 'script';
				const closeTag = '</' + tagName + '>';
				const closeIdx = baseCodeRef.current.indexOf(closeTag);
				// 插入位置：在闭合标签前的换行符之前，保持闭合标签在独立行
				const newlineBeforeClose = baseCodeRef.current.lastIndexOf('\n', closeIdx - 1);
				const insertPos = newlineBeforeClose >= 0 ? newlineBeforeClose : closeIdx;

				if (charIndex === 0) {
					scrollToTop();
					setCursorPosition(insertPos);
				}

				if (charIndex < addText.length) {
					const before = baseCodeRef.current.slice(0, insertPos);
					const after = baseCodeRef.current.slice(insertPos);
					const typedText = addText.slice(0, charIndex + 1);
					setDisplayedCode(before + typedText + after);
					// 如果当前字符是换行，光标留在换行前
					const lastChar = typedText[typedText.length - 1];
					setCursorPosition(lastChar === '\n' ? insertPos + charIndex : insertPos + charIndex + 1);
					charRef.current += 1;
					schedule(() => typeNextCharRef.current(), 40);
				} else {
					baseCodeRef.current = before_concat(baseCodeRef.current, insertPos, addText);
					setDisplayedCode(baseCodeRef.current);
					if (step.preview) setCurrentPreview(step.preview);
					nextStep(1000);
				}
				return;
			}

			// 处理在指定位置插入（script 部分速度更慢）
			if ('insertAt' in step && step.insertAt !== undefined && typeof step.insertAt === 'number') {
				const insertPos: number = step.insertAt;
				const addText = step.add;

				if (charIndex === 0) {
					scrollToTop();
					setCursorPosition(insertPos);
				}

				if (charIndex < addText.length) {
					const before = baseCodeRef.current.slice(0, insertPos);
					const after = baseCodeRef.current.slice(insertPos);
					setDisplayedCode(before + addText.slice(0, charIndex + 1) + after);
					setCursorPosition(insertPos + charIndex + 1);
					charRef.current += 1;
					schedule(() => typeNextCharRef.current(), 40); // script 部分放慢
				} else {
					baseCodeRef.current = before_concat(baseCodeRef.current, insertPos, addText);
					setDisplayedCode(baseCodeRef.current);
					if (step.preview) setCurrentPreview(step.preview);
					nextStep(1000);
				}
				return;
			}

			// 正常末尾添加
			const addText = (step as { add: string }).add;
			if (charIndex < addText.length) {
				setDisplayedCode(baseCodeRef.current + addText.slice(0, charIndex + 1));
				setCursorPosition(baseCodeRef.current.length + charIndex + 1);
				charRef.current += 1;
				scrollToBottom();
				schedule(() => typeNextCharRef.current(), 50); // 放慢速度
			} else {
				baseCodeRef.current = baseCodeRef.current + addText;
				setDisplayedCode(baseCodeRef.current);
				if (step.preview) setCurrentPreview(step.preview);
				nextStep(1000); // 步骤间停顿更长
			}
		};

		// 在 insertPos 处插入文本后的完整代码
		function before_concat(code: string, insertPos: number, addText: string) {
			return code.slice(0, insertPos) + addText + code.slice(insertPos);
		}

		timeoutRef.current = setTimeout(() => typeNextCharRef.current(), 100);
		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const highlightedCode = (() => {
		if (!displayedCode) return `<div class="bg-primary/5 dark:bg-dark/5 -mx-4 px-4">${cursorHtml}</div>`;

		const showCursor = !isComplete;

		// 在光标位置插入标记
		let codeWithCursor = displayedCode;
		if (showCursor) {
			codeWithCursor = displayedCode.slice(0, cursorPosition) + CURSOR_MARKER + displayedCode.slice(cursorPosition);
		}

		// 高亮代码
		let highlighted = hljs.highlight(codeWithCursor, { language: 'typescript', ignoreIllegals: true }).value;

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
	})();

	return (
		<section className="relative overflow-hidden py-12">
			<div className="relative z-10 mx-auto">
				<div className="mb-12 text-center">
					<div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary dark:border-dark/20 dark:bg-dark/5 dark:text-dark">
						<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
							<path d="M24 12L18.3431 17.6569L16.9289 16.2426L21.1716 12L16.9289 7.75736L18.3431 6.34315L24 12ZM2.82843 12L7.07107 16.2426L5.65685 17.6569L0 12L5.65685 6.34315L7.07107 7.75736L2.82843 12ZM9.78845 21H7.66009L14.2116 3H16.3399L9.78845 21Z" />
						</svg>
						<span>{isZh ? '开发体验' : 'Developer Experience'}</span>
					</div>

					<h2 className="mb-4 bg-linear-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-3xl font-bold text-transparent md:text-4xl dark:from-white dark:via-gray-300 dark:to-white">
						{isZh ? '写得少，做得多' : 'Write Less, Do More'}
					</h2>
					<p className="mx-auto max-w-2xl text-base opacity-70">
						{isZh
							? '使用 RTDF 组件，几行代码即可构建完整功能。'
							: 'Build complete features with just a few lines of code using RTDF components.'}
					</p>
				</div>

				<div className="mx-auto w-full max-w-screen-2xl">
					<div className="grid gap-6 lg:grid-cols-5">
						{/* 左侧：代码编辑器 */}
						<div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-2xl lg:col-span-3 dark:border-gray-700 dark:bg-gray-900">
							<div className="flex items-center gap-2 border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
								<div className="flex gap-1.5">
									<div className="size-3 rounded-full bg-red-400 dark:bg-red-500"></div>
									<div className="size-3 rounded-full bg-yellow-400 dark:bg-yellow-500"></div>
									<div className="size-3 rounded-full bg-green-400 dark:bg-green-500"></div>
								</div>
								<div className="flex-1 text-center text-xs text-gray-500 dark:text-gray-400">Todo.tsx</div>
							</div>
							<div ref={codeAreaRef} className="prose dark:prose-invert h-105 max-w-none overflow-auto bg-gray-50 p-4 dark:bg-gray-900">
								<pre className="!m-0 !bg-transparent text-xs leading-5">
									<code className="hljs !bg-transparent" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
								</pre>
							</div>
							<div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-1.5 text-xs text-gray-500 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">
								<span className="flex items-center gap-1">
									<span className={`size-2 rounded-full ${isComplete ? 'bg-primary dark:bg-dark' : 'bg-green-500'}`}></span>
									{isComplete ? (isZh ? '已完成' : 'Complete') : isZh ? '输入中...' : 'Typing...'}
								</span>
								<div className="flex items-center gap-3">
									{isComplete ? (
										<button
											onClick={replay}
											className="flex items-center gap-1 rounded px-2 py-0.5 text-primary transition hover:bg-primary/10 dark:text-dark dark:hover:bg-dark/10"
											type="button"
										>
											<svg className="size-3" viewBox="0 0 24 24" fill="currentColor">
												<path d="M5.46257 4.43262C7.21556 2.91688 9.5007 2 12 2C17.5228 2 22 6.47715 22 12C22 14.1361 21.3302 16.1158 20.1892 17.7406L17 12H20C20 7.58172 16.4183 4 12 4C9.84982 4 7.89777 4.84827 6.46023 6.22842L5.46257 4.43262ZM18.5374 19.5674C16.7844 21.0831 14.4993 22 12 22C6.47715 22 2 17.5228 2 12C2 9.86386 2.66979 7.88416 3.8108 6.25944L7 12H4C4 16.4183 7.58172 20 12 20C14.1502 20 16.1022 19.1517 17.5398 17.7716L18.5374 19.5674Z" />
											</svg>
											{isZh ? '重播' : 'Replay'}
										</button>
									) : null}
									<span>
										{isZh ? '步骤' : 'Step'} {Math.min(currentStep + 1, codeSteps.length)}/{codeSteps.length}
									</span>
								</div>
							</div>
						</div>

						{/* 右侧：实时预览 */}
						<div className="flex flex-col overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-2xl lg:col-span-2 dark:border-gray-700/50 dark:bg-gray-900">
							<div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
								<div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
									<svg className="size-4" viewBox="0 0 24 24" fill="currentColor">
										<path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM11 11V17H13V11H11ZM11 7V9H13V7H11Z" />
									</svg>
									{isZh ? '预览' : 'Preview'}
								</div>
								<Badge text="Live" />
							</div>
							<div className="flex flex-1 items-center justify-center bg-gray-100 p-6 dark:bg-gray-800/50">
								<div className="w-full max-w-xs rounded-xl bg-white p-4 shadow-lg transition-all duration-300 dark:bg-gray-900">
									{currentPreview === 'scriptTag' ? (
										<div className="text-center text-sm text-gray-400">{isZh ? '准备中...' : 'Preparing...'}</div>
									) : currentPreview === 'input' ? (
										<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
									) : currentPreview === 'button' ? (
										<>
											<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
											<div className="mt-2">
												<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
											</div>
										</>
									) : currentPreview === 'checkboxEmpty' ? (
										<>
											<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
											<div className="mt-2">
												<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
											</div>
											<div className="mt-3 text-center text-sm text-gray-400">{isZh ? '( 待绑定数据 )' : '( Waiting for data )'}</div>
										</>
									) : currentPreview === 'structure' ||
									  currentPreview === 'import' ||
									  currentPreview === 'data' ||
									  currentPreview === 'derived' ? (
										<>
											<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
											<div className="mt-2">
												<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
											</div>
											<div className="mt-3 text-center text-sm text-gray-400">{isZh ? '( 待绑定数据 )' : '( Waiting for data )'}</div>
											<p className="mt-2 text-sm text-gray-400">{isZh ? '剩余待办' : 'remaining'}</p>
										</>
									) : currentPreview === 'bindCheckbox' ? (
										<>
											<Input placeholder={isZh ? '添加待办...' : 'Add todo...'} />
											<div className="mt-2">
												<Button fill="line">{isZh ? '添加' : 'Add'}</Button>
											</div>
											<div className="mt-3">
												<Checkbox data={todos} checkeds={checkeds} onChange={setCheckeds} />
											</div>
											<p className="mt-2 text-sm text-gray-400">{isZh ? '剩余待办' : 'remaining'}</p>
										</>
									) : currentPreview === 'complete' || isComplete ? (
										<>
											<Input value={input} onChange={setInput} placeholder={isZh ? '添加待办...' : 'Add todo...'} />
											<div className="mt-2">
												<Button fill="line" onClick={addTodo}>
													{isZh ? '添加' : 'Add'}
												</Button>
											</div>
											<div className="mt-3">
												<Checkbox data={todos} checkeds={checkeds} onChange={setCheckeds} />
											</div>
											<p className="mt-2 text-sm text-gray-500">
												{remaining} {isZh ? '项待办' : 'left'}
											</p>
										</>
									) : (
										<div className="text-center text-sm text-gray-400">{isZh ? '等待代码...' : 'Waiting for code...'}</div>
									)}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default CodePlayground;
