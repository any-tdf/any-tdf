import { useEffect, useMemo, useState } from 'react';
import { mdTextToHljs } from '../../utils';
import { loadComponentDoc } from './mdDocs';
import { useAppContext } from '../../store/appStore';

type VersionProps = {
	guide?: string;
};

const Version = ({ guide = 'button' }: VersionProps) => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';

	const [loading, setLoading] = useState(true);
	const [guideText, setGuideText] = useState<string | null>(null);

	//提取字符中以‘[!tag’开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getTags = (str: string) => {
		return str.match(/\[!tag[^\]]+\]/g);
	};

	//提取字符中以‘[!issue‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getIssues = (str: string) => {
		return str.match(/\[!issue[^\]]+\]/g);
	};

	//提取字符中以‘[!contribute‘开头且以‘]’结尾的所有字符串，组成数组，并返回数组
	const getContributes = (str: string) => {
		return str.match(/\[!contribute[^\]]+\]/g);
	};

	// 传入 tag 类型和 index，返回对应的 emoji
	const spanTextFun = (type: string, index: string) => {
		if (type === 'O') {
			return '👏';
		}
		if (type === 'A') {
			return '💪';
		}
		switch (index) {
			case '1':
				return '👊';
			case '2':
				return '✊';
			case '3':
				return '👎';
			default:
				return '👎';
		}
	};

	//替换 Markdown 中的标签
	const mdTextToHljsFun = (input: string) => {
		let string = input;
		//替换 tag
		const tagList = getTags(string);
		if (tagList) {
			tagList.forEach((item) => {
				const arr = item.split('|');
				const span = `<span class="mr-1">${spanTextFun(arr[1], arr[2])}</span>`;
				string = string.replace(item, span);
			});
		}
		//替换 issue
		const issueList = getIssues(string);
		if (issueList) {
			issueList.forEach((item) => {
				const arr = item.split('|');
				const span = `<span><a class="size-4 translate-y-0.5 rounded-full overflow-hidden inline-flex items-center justify-center" href="https://github.com/${
					arr[1]
				}" target="_blank"><img class="w-full h-full" src="https://avatars.githubusercontent.com/${
					arr[1]
				}" title="${isZh ? '感谢' : 'Thanks'} ${arr[1]} ${isZh ? '提出 Issue' : 'raise an Issue'}" alt=""></a></span>`;
				string = string.replace(item, span);
			});
		}
		//替换 contribute
		const contributeList = getContributes(string);
		if (contributeList) {
			contributeList.forEach((item) => {
				const arr = item.split('|');
				const span = `<span><a class="size-4 translate-y-0.5 rounded-full overflow-hidden inline-flex items-center justify-center" href="https://github.com/${
					arr[1]
				}" target="_blank"><img class="w-full h-full" src="https://avatars.githubusercontent.com/${
					arr[1]
				}" title="${isZh ? '感谢' : 'Thanks'} ${arr[1]} ${isZh ? '贡献代码' : 'contribute code'}" alt=""></a></span>`;
				string = string.replace(item, span);
			});
		}
		return string;
	};

	useEffect(() => {
		const getMdStrFunc = async (nav: string) => {
			setLoading(true);
			const mdStr = await loadComponentDoc(nav, `version${isZh ? '' : '_en'}.md`);
			if (mdStr === null) {
				setGuideText(null);
			} else {
				const guideTextStr = mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="'));
				setGuideText(mdTextToHljsFun(guideTextStr));
			}
			setLoading(false);
		};
		void getMdStrFunc(guide);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [guide, isZh]);

	// 固定 { __html } 对象引用，避免重渲染时 innerHTML 被重写导致滚动位置丢失
	const innerHtml = useMemo(() => ({ __html: guideText ?? '' }), [guideText]);

	return (
		<>
			<div className="mb-4 max-w-5xl text-xs text-black/40 dark:text-white/30">
				{isZh
					? '注：👊、✊、👎 分别表示严重、一般、轻微三个等级的 BUG，👏 表示优化，💪 表示新增。描述后面的头像表示此项的提出者或贡献者，感谢他们。'
					: 'Note: 👊, ✊, and 👎 represent three levels of severity for bugs, with 👊 being the most severe and 👎 the least severe. 👏 means optimization, and 💪 means new feature. The avatar after the description represents the proposer or contributor of the item. We thank them for their contributions. '}
			</div>
			<article className="prose dark:prose-invert prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal max-w-none overflow-x-auto pb-12">
				{loading ? isZh ? '请等待...' : 'Please wait...' : <div dangerouslySetInnerHTML={innerHtml} />}
			</article>
			<div className="flex gap-2 pb-8 text-xs">
				<a
					href={'https://github.com/any-tdf/any-tdf/edit/main/content/rtdf/components/' + guide + '/version' + (isZh ? '' : '_en') + '.md'}
					className="text-primary dark:text-dark flex"
					target="_blank"
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

export default Version;
