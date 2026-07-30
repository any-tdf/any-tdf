import { useEffect, useState } from 'react';
import { mdTextToHljs, groupIconMdPlugin } from '../../utils';
import { useAppContext } from '../../store/appStore';

// 指南文档 md 文件（经 @any-tdf/vite-plugin-md-ts 转换为 HTML 字符串）
const guideDocs = import.meta.glob('../../../../../content/rtdf/guide/*.md');

type MdPageProps = {
	/** mds/guide 下的文件名（不含 _en 后缀与扩展名） */
	doc: string;
	/** code-groups 处理：after 在 mdTextToHljs 之后，before 在之前 */
	groupIcon?: 'after' | 'before';
	/** 底部留白：pb-8 还是 pb-12 */
	pb12?: boolean;
};

const MdPage = ({ doc, groupIcon, pb12 = false }: MdPageProps) => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';
	const [text, setText] = useState('');

	useEffect(() => {
		const load = async () => {
			const filePath = Object.keys(guideDocs).find((key) => key.endsWith(`/guide/${doc}${isZh ? '' : '_en'}.md`));
			if (!filePath) {
				setText('');
				return;
			}
			const mod = (await guideDocs[filePath]()) as { default: string };
			const mdStr = mod.default;
			const next =
				groupIcon === 'before'
					? mdTextToHljs(groupIconMdPlugin(mdStr).replace(/<a href="/g, '<a target="_blank" href="'))
					: groupIcon === 'after'
						? groupIconMdPlugin(mdTextToHljs(mdStr).replace(/<a href="/g, '<a target="_blank" href="'))
						: mdTextToHljs(mdStr.replace(/<a href="/g, '<a target="_blank" href="'));
			setText(next);
		};
		void load();
	}, [doc, groupIcon, isZh]);

	return (
		<article
			className={`prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark prose-table:break-all prose-td:whitespace-nowrap md:prose-td:whitespace-normal mx-auto max-w-full overflow-x-auto ${pb12 ? 'pb-12' : 'pb-8'}`}
		>
			<div dangerouslySetInnerHTML={{ __html: text }} />
		</article>
	);
};

export default MdPage;
