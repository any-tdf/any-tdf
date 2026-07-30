import { useEffect, useState } from 'react';
import { mdTextToHljs } from '../../utils';
import { loadComponentDoc } from './mdDocs';
import { useAppContext } from '../../store/appStore';

type GuideProps = {
	guide?: string;
};

const Guide = ({ guide = 'button' }: GuideProps) => {
	const { lang, themeMode, sysTheme } = useAppContext();
	const isZh = lang === 'zh_CN';
	const theme = themeMode === 'auto' ? (sysTheme === 'dark' ? 'dark' : 'light') : themeMode;

	const [loading, setLoading] = useState(true);
	const [guideText, setGuideText] = useState<string | null>(null);

	useEffect(() => {
		const getMdStrFunc = async (nav: string) => {
			setLoading(true);
			const mdStr = await loadComponentDoc(nav, `guide${isZh ? '' : '_en'}.md`);
			setGuideText(
				mdStr === null
					? null
					: mdTextToHljs(
							mdStr
								.replace(/<img src="/g, `<img class="w-full md:w-1/2${theme === 'dark' ? ' invert' : ''}" src="./assets/images/guide/`)
								.replace(/<a href="/g, '<a target="_blank" href="')
						)
			);
			setLoading(false);
		};
		void getMdStrFunc(guide);
	}, [guide, isZh, theme]);

	return (
		<>
			<article className="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal max-w-none overflow-x-auto pb-12">
				{loading ? isZh ? '请等待...' : 'Please wait...' : <div dangerouslySetInnerHTML={{ __html: guideText ?? '' }} />}
			</article>
			<div className="flex gap-2 pb-8 text-xs">
				<a
					href={'https://github.com/any-tdf/any-tdf/edit/main/content/rtdf/components/' + guide + '/guide' + (isZh ? '' : '_en') + '.md'}
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

export default Guide;
