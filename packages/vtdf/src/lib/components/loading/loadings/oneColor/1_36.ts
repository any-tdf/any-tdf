import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeSlowStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor36Svg } from '@any-tdf/common/svg/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_36',
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
			const css = resolveLoadingStrokeTravelCss({ scope: 'rtdf_loading_1_36', endOffset: 100 });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_36' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size }) }, [
						h(
							'svg',
							{
								class: resolveLoadingLayoutClass({ kind: 'svgFullSized', size }),
								x: '0px',
								y: '0px',
								viewBox: loadingOneColor36Svg.viewBox,
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
									'stroke-width': loadingOneColor36Svg.path.strokeWidth,
									pathLength: loadingOneColor36Svg.path.pathLength,
									d: loadingOneColor36Svg.path.d
								}),
								h('path', {
									class: resolveLoadingSvgStrokeClass({
										className: 'car',
										strokeClass: loadingClassState.strokeClass
									}),
									fill: 'none',
									style: parseStyle(resolveLoadingOneColorStrokeSlowStyle({ customColor, speed })),
									'stroke-width': loadingOneColor36Svg.path.strokeWidth,
									pathLength: loadingOneColor36Svg.path.pathLength,
									d: loadingOneColor36Svg.path.d
								})
							]
						)
					])
				])
			]);
		};
	}
});
