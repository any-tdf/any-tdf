type ComponentProps = {
	highlightedCode?: string;
};

const Component = ({ highlightedCode = '' }: ComponentProps) => {
	return (
		<article className="prose max-w-none text-sm dark:prose-invert [&_.hljs]:!bg-transparent">
			<pre>
				<code className="hljs" dangerouslySetInnerHTML={{ __html: highlightedCode }} />
			</pre>
		</article>
	);
};

export default Component;
