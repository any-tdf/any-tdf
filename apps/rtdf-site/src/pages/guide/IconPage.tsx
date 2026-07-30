import { useEffect, useState } from 'react';
import { mdTextToHljs, groupIconMdPlugin } from '../../utils';
import BuiltInIconGallery from './BuiltInIconGallery';
import { useAppContext } from '../../store/appStore';

const guideDocs = import.meta.glob('../../../../../content/rtdf/guide/*.md');

const builtInIconGalleryMarker = '<!-- built-in-icon-gallery -->';

const IconPage = () => {
	const { lang } = useAppContext();
	const isZh = lang === 'zh_CN';
	const [htmlParts, setHtmlParts] = useState<string[]>([]);

	useEffect(() => {
		const load = async () => {
			const filePath = Object.keys(guideDocs).find((key) => key.endsWith(`/guide/icon${isZh ? '' : '_en'}.md`));
			if (!filePath) {
				setHtmlParts([]);
				return;
			}
			const mod = (await guideDocs[filePath]()) as { default: string };
			const hljsText = groupIconMdPlugin(mdTextToHljs(mod.default).replace(/<a href="/g, '<a target="_blank" href="'));
			setHtmlParts(hljsText.split(builtInIconGalleryMarker));
		};
		void load();
	}, [isZh]);

	const showBuiltInIconGallery = htmlParts.length > 1;

	return (
		<article className="prose dark:prose-invert prose-strong:text-primary dark:prose-strong:text-dark mx-auto max-w-full pb-8">
			{showBuiltInIconGallery ? (
				<>
					<div dangerouslySetInnerHTML={{ __html: htmlParts[0] }} />
					<BuiltInIconGallery />
					<div dangerouslySetInnerHTML={{ __html: htmlParts.slice(1).join(builtInIconGalleryMarker) }} />
				</>
			) : (
				<div dangerouslySetInnerHTML={{ __html: htmlParts[0] ?? '' }} />
			)}
		</article>
	);
};

export default IconPage;
