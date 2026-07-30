import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeBaseStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor26Svg } from '@any-tdf/common/svg/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_26',
	props: {
		theme: { type: Boolean, default: false },
		inverse: { type: Boolean, default: false },
		size: { type: String, default: 'w-8 h-8' },
		customColor: { type: Array as PropType<string[]>, default: () => [] },
		speed: { type: Number, default: 1 }
	},
	setup(props: LoadingAnimationProps) {
		return () => {
			const { theme = false, inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 } = props;
			const loadingClassState = resolveLoadingOneColorClassState({ theme, inverse });
			const css = resolveLoadingStrokeTravelCss({
				scope: 'rtdf_loading_1_26',
				endOffset: 100,
				includeFillNone: true,
				includeTransition: true
			});
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_26' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'center' }) }, [
						h(
							'svg',
							{
								class: resolveLoadingLayoutClass({ kind: 'svgOrigin', size }),
								x: '0px',
								y: '0px',
								viewBox: loadingOneColor26Svg.viewBox,
								height: loadingOneColor26Svg.height,
								width: loadingOneColor26Svg.width,
								preserveAspectRatio: 'xMidYMid meet'
							},
							[
								h('path', {
									class: resolveLoadingSvgStrokeClass({
										className: 'opacity-10',
										strokeClass: loadingClassState.strokeClass
									}),
									fill: 'none',
									style: parseStyle(resolveLoadingOneColorStrokeStyle({ customColor })),
									'stroke-width': loadingOneColor26Svg.path.strokeWidth,
									pathLength: loadingOneColor26Svg.path.pathLength,
									d: loadingOneColor26Svg.path.d
								}),
								h('path', {
									class: resolveLoadingSvgStrokeClass({
										className: 'car',
										strokeClass: loadingClassState.strokeClass
									}),
									fill: 'none',
									style: parseStyle(resolveLoadingOneColorStrokeBaseStyle({ customColor, speed })),
									'stroke-width': loadingOneColor26Svg.path.strokeWidth,
									pathLength: loadingOneColor26Svg.path.pathLength,
									d: loadingOneColor26Svg.path.d
								})
							]
						)
					])
				])
			]);
		};
	}
});
