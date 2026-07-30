import {
	builtInIconGalleryList,
	builtInIconLibraryLabelMap,
	builtInIconLibraryList,
	getSvgRenderableNodes,
	resolveBuiltInSvg,
	resolveSvgNodeKey,
	resolveSvgRootAttrs,
	type BuiltInIconLibrary,
	type SvgData,
	type SvgRenderableNodeData,
	type SvgRootAttrs
} from '@any-tdf/common/svg';

type GalleryIcon = {
	rootAttrs: SvgRootAttrs;
	nodes: readonly SvgRenderableNodeData[];
};

type GalleryRow = {
	key: string;
	icons: Record<BuiltInIconLibrary, GalleryIcon>;
};

const createGalleryIcon = (key: string, library: BuiltInIconLibrary): GalleryIcon => {
	const svg = resolveBuiltInSvg(key, library);
	return {
		rootAttrs: resolveSvgRootAttrs({ svg }),
		nodes: getSvgRenderableNodes(svg)
	};
};

const createGalleryIcons = (key: string): Record<BuiltInIconLibrary, GalleryIcon> =>
	Object.fromEntries(builtInIconLibraryList.map((library) => [library, createGalleryIcon(key, library)])) as Record<
		BuiltInIconLibrary,
		GalleryIcon
	>;

const iconRows: readonly GalleryRow[] = builtInIconGalleryList.map((item) => ({
	key: item.key,
	icons: createGalleryIcons(item.key)
}));

const renderSvgNode = (node: SvgRenderableNodeData, index: number) => {
	const key = resolveSvgNodeKey(node, index);
	if (node.type === 'path') {
		return (
			<path
				key={key}
				d={node.d}
				className={node.className}
				fill={node.fill}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeLinecap={node.strokeLinecap}
				strokeLinejoin={node.strokeLinejoin}
				strokeDasharray={node.strokeDasharray}
				strokeDashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				fillRule={node.fillRule}
				clipRule={node.clipRule}
				opacity={node.opacity}
			/>
		);
	}
	if (node.type === 'circle') {
		return (
			<circle
				key={key}
				cx={node.cx}
				cy={node.cy}
				r={node.r}
				className={node.className}
				fill={node.fill}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeDasharray={node.strokeDasharray}
				strokeDashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				opacity={node.opacity}
			/>
		);
	}
	if (node.type === 'rect') {
		return (
			<rect
				key={key}
				x={node.x}
				y={node.y}
				width={node.width}
				height={node.height}
				rx={node.rx}
				ry={node.ry}
				className={node.className}
				fill={node.fill}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeDasharray={node.strokeDasharray}
				strokeDashoffset={node.strokeDashoffset}
				pathLength={node.pathLength}
				opacity={node.opacity}
			/>
		);
	}
	if (node.type === 'line') {
		return (
			<line
				key={key}
				x1={node.x1}
				y1={node.y1}
				x2={node.x2}
				y2={node.y2}
				className={node.className}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeLinecap={node.strokeLinecap}
				opacity={node.opacity}
			/>
		);
	}
	if (node.type === 'polyline') {
		return (
			<polyline
				key={key}
				points={node.points}
				className={node.className}
				fill={node.fill}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeLinecap={node.strokeLinecap}
				strokeLinejoin={node.strokeLinejoin}
				opacity={node.opacity}
			/>
		);
	}
	if (node.type === 'polygon') {
		return (
			<polygon
				key={key}
				points={node.points}
				className={node.className}
				fill={node.fill}
				stroke={node.stroke}
				strokeWidth={node.strokeWidth}
				strokeLinejoin={node.strokeLinejoin}
				opacity={node.opacity}
			/>
		);
	}
	return null;
};

const BuiltInSvg = ({ svg }: { svg: SvgData }) => {
	const rootAttrs = resolveSvgRootAttrs({ svg });
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			className="size-8"
			viewBox={rootAttrs.viewBox}
			fill={rootAttrs.fill}
			stroke={rootAttrs.stroke}
			strokeWidth={rootAttrs.strokeWidth}
			aria-hidden="true"
		>
			{getSvgRenderableNodes(svg).map(renderSvgNode)}
		</svg>
	);
};

const BuiltInIconGallery = () => {
	return (
		<div className="not-prose my-6 overflow-x-auto rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-950">
			<table className="w-full min-w-max border-collapse text-left text-sm">
				<thead className="bg-gray-50 text-gray-700 dark:bg-gray-900 dark:text-gray-200">
					<tr>
						<th className="px-4 py-3 font-semibold">Key</th>
						{builtInIconLibraryList.map((library) => (
							<th key={library} className="px-4 py-3 text-center font-semibold">
								{builtInIconLibraryLabelMap[library]}
							</th>
						))}
					</tr>
				</thead>
				<tbody className="divide-y divide-gray-200 dark:divide-gray-800">
					{iconRows.map((item) => (
						<tr key={item.key}>
							<td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-700 dark:text-gray-200">{item.key}</td>
							{builtInIconLibraryList.map((library) => (
								<td key={library} className="px-4 py-3">
									<div className="flex items-center justify-center text-gray-900 dark:text-gray-100">
										<BuiltInSvg svg={resolveBuiltInSvg(item.key, library)} />
									</div>
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
};

export default BuiltInIconGallery;
