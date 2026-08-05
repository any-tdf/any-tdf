import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Tabs as RtdfTabs } from 'rtdf/components';
import { encodeData, rendererLine } from 'beautify-qrcode';
import { useAppContext } from '../store/appStore';

type TabsProps = {
	currentTab?: number;
	onChange?: (index: number) => void;
};

const tabList = [
	{ zh: '示例', en: 'Demo' },
	{ zh: 'API', en: 'API' },
	{ zh: '指南', en: 'Guide' },
	{ zh: 'FAQ', en: 'FAQ' },
	{ zh: '版本', en: 'Version' }
];

const sourceExtMap: Record<string, 'ts' | 'tsx'> = {
	calendar: 'ts',
	feedback: 'ts',
	grids: 'ts',
	numKeyboard: 'ts',
	placeholder: 'ts',
	skeleton: 'ts',
	timePicker: 'ts'
};

const Tabs = ({ currentTab = 0, onChange }: TabsProps) => {
	const location = useLocation();
	const { lang, themeMode, sysTheme } = useAppContext();
	const isZh = lang === 'zh_CN';
	const tabLabels = tabList.map((item) => ({ text: isZh ? item.zh : item.en }));

	const nav = new URLSearchParams(location.search).get('nav') ?? 'button';
	const demoBaseUrl = import.meta.env.DEV ? `${window.location.protocol}//${window.location.hostname}:8887/` : 'https://demo.rtdf.dev/';
	const demoUrl = `${demoBaseUrl}${nav}/${isZh ? 'zh_CN' : 'en_US'}`;
	const sourceExt = sourceExtMap[nav] || 'tsx';
	const sourceUrl = `https://github.com/any-tdf/any-tdf/blob/main/packages/rtdf/src/lib/components/${nav}/index.${sourceExt}`;
	const stackblitzUrl = `https://stackblitz.com/github/any-tdf/any-tdf?file=apps%2Frtdf-demo%2Fsrc%2Fpages%2F${nav}%2F${isZh ? 'zh_CN' : 'en_US'}.tsx&startScript=dev%3Artdf`;

	const [previewQrOpen, setPreviewQrOpen] = useState(false);
	const [previewQrSvg, setPreviewQrSvg] = useState('');

	const resolvedMode = themeMode === 'auto' ? sysTheme : themeMode;

	const openPreviewQr = () => {
		const qrcode = encodeData({ text: demoUrl, isSpace: false });
		const color = resolvedMode === 'dark' ? 'var(--color-dark)' : 'var(--color-primary)';
		setPreviewQrSvg(rendererLine(qrcode, { posType: 2, otherColor: color, posColor: color }));
		setPreviewQrOpen(true);
	};

	const selectTab = (index: number) => {
		onChange?.(index);
	};

	return (
		<div className="tab-shell">
			<div className="tab-control" role="group" aria-label={isZh ? '组件文档类型' : 'Component documentation type'}>
				<RtdfTabs
					active={currentTab}
					transition={false}
					onChange={selectTab}
					tab={{
						labels: tabLabels,
						mx: '0',
						radius: 'sm',
						injClass: 'component-doc-tabs',
						tabInjClass: 'component-doc-tab',
						activeTabInjClass: 'component-doc-tab-active'
					}}
				/>
			</div>
			<div className="tab-tools">
				<div
					className="tab-preview-action"
					onMouseEnter={openPreviewQr}
					onMouseLeave={() => setPreviewQrOpen(false)}
					onFocus={openPreviewQr}
					onBlur={() => setPreviewQrOpen(false)}
				>
					<a href={demoUrl} target="_blank" rel="noreferrer">
						Demo ↗
					</a>
					{previewQrOpen ? (
						<div className="tab-preview-qr">
							<div className="tab-preview-qr-code" dangerouslySetInnerHTML={{ __html: previewQrSvg }}></div>
							<div>{isZh ? '扫码打开移动端预览' : 'Scan to open mobile preview'}</div>
						</div>
					) : null}
				</div>
				<a href={sourceUrl} target="_blank" rel="noreferrer">
					Source ↗
				</a>
				<a href={stackblitzUrl} target="_blank" rel="noreferrer">
					StackBlitz ↗
				</a>
			</div>
		</div>
	);
};

export default Tabs;
