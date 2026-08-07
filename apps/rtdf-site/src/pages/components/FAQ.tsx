import { useEffect, useMemo, useState } from 'react';
import { mdTextToHljs } from '../../utils';
import { loadComponentDoc } from './mdDocs';
import { useAppContext } from '../../store/appStore';

type FAQProps = {
	guide?: string;
};

const FAQ = ({ guide = 'button' }: FAQProps) => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [loading, setLoading] = useState(true);
	const [guideText, setGuideText] = useState<string | null>(null);

	useEffect(() => {
		const getMdStrFunc = async (nav: string) => {
			setLoading(true);
			const mdStr = await loadComponentDoc(nav, `FAQ${isZh ? '' : '_en'}.md`);
			setGuideText(mdStr === null ? null : mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="')));
			setLoading(false);
		};
		void getMdStrFunc(guide);
	}, [guide, isZh]);

	// 固定 { __html } 对象引用，避免重渲染时 innerHTML 被重写导致滚动位置丢失
	const innerHtml = useMemo(() => ({ __html: guideText ?? '' }), [guideText]);

	return (
		<>
			<p className="mb-4 text-xs text-black/40 dark:text-white/30">
				{isZh
					? '注：请将开发中遇到的问题或想法提到 GitHub Issue，后续会筛选出有代表性的问题整理在此处。'
					: 'Note: Please raise any issues or ideas encountered in development to GitHub Issue, and then select representative issues to organize here.'}
			</p>
			<article className="prose dark:prose-invert prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal max-w-none overflow-x-auto pb-12">
				{loading ? isZh ? '请等待...' : 'Please wait...' : <div dangerouslySetInnerHTML={innerHtml} />}
			</article>
			<div className="flex gap-2 pb-8 text-xs">
				<a
					href={'https://github.com/any-tdf/any-tdf/edit/main/content/rtdf/components/' + guide + '/FAQ' + (isZh ? '' : '_en') + '.md'}
					target="_blank"
					className="text-primary dark:text-dark flex"
					rel="noreferrer"
				>
					<span className="mr-1 h-4 w-4">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-4 w-4" style={{ fill: 'currentColor' }}>
							<path d="M12.8995 6.85431L17.1421 11.0969L7.24264 20.9964H3V16.7538L12.8995 6.85431ZM14.3137 5.44009L16.435 3.31877C16.8256 2.92825 17.4587 2.92825 17.8492 3.31877L20.6777 6.1472C21.0682 6.53772 21.0682 7.17089 20.6777 7.56141L18.5563 9.68273L14.3137 5.44009Z" />
						</svg>
					</span>
					{isZh ? '在 GitHub 上编辑' : 'Edit on GitHub'}
				</a>
			</div>
		</>
	);
};

export default FAQ;
