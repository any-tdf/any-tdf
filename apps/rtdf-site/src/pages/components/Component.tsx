import { useMemo } from 'react';

type ComponentProps = {
	highlightedCode?: string;
};

const Component = ({ highlightedCode = '' }: ComponentProps) => {
	// 固定 { __html } 对象引用，避免 React 在重渲染时重写 innerHTML 导致代码滚动位置丢失
	const innerHtml = useMemo(() => ({ __html: highlightedCode }), [highlightedCode]);
	return (
		<article className="prose max-w-none text-sm dark:prose-invert [&_.hljs]:!bg-transparent">
			<pre>
				<code className="hljs" dangerouslySetInnerHTML={innerHtml} />
			</pre>
		</article>
	);
};

export default Component;
