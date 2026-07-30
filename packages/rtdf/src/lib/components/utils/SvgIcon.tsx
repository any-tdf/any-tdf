import type { SvgData, SvgNodeData } from '@any-tdf/common/svg';
import {
	getSvgNodes,
	isSvgCircleNode,
	isSvgLineNode,
	isSvgPathNode,
	isSvgPolygonNode,
	isSvgPolylineNode,
	isSvgRectNode,
	resolveBuiltInSvgFromData,
	resolveSvgNodeKey,
	resolveSvgRootAttrs
} from '@any-tdf/common/svg';
import type { SVGAttributes } from 'react';
import { useConfig } from '../config-provider';

type SvgIconProps = SVGAttributes<SVGSVGElement> & {
	svg: SvgData;
	width?: string | number;
	height?: string | number;
	className?: string;
	fill?: string;
	stroke?: string;
	strokeWidth?: string | number;
	ariaHidden?: boolean;
};

const renderNode = (node: SvgNodeData, index: number) => {
	const key = resolveSvgNodeKey(node, index);
	if (isSvgPathNode(node)) {
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
	if (isSvgCircleNode(node)) {
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
	if (isSvgRectNode(node)) {
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
	if (isSvgLineNode(node)) {
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
	if (isSvgPolylineNode(node)) {
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
	if (isSvgPolygonNode(node)) {
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

// SVG 数据来自 common，事件和可访问性语义仍由具体组件决定。
// SVG data comes from common while events and accessibility semantics stay in each component.
export const SvgIcon: React.FC<SvgIconProps> = ({
	svg,
	width = '1em',
	height = '1em',
	className = '',
	fill,
	stroke,
	strokeWidth,
	ariaHidden = true,
	...svgProps
}) => {
	const { builtInIconLibrary } = useConfig();
	const resolvedSvg = resolveBuiltInSvgFromData(svg, builtInIconLibrary);
	const rootAttrs = resolveSvgRootAttrs({ svg: resolvedSvg, fill, stroke, strokeWidth });
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width={width}
			height={height}
			viewBox={rootAttrs.viewBox}
			className={className}
			fill={rootAttrs.fill}
			stroke={rootAttrs.stroke}
			strokeWidth={rootAttrs.strokeWidth}
			aria-hidden={ariaHidden}
			{...svgProps}
		>
			{getSvgNodes(resolvedSvg).map(renderNode)}
		</svg>
	);
};
