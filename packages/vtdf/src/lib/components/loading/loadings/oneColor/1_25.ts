import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingStrokeTravelCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingOneColorStrokeTravelStyle,
	resolveLoadingSvgStrokeClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor25Svg } from '@any-tdf/common/svg/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_25',
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
				scope: 'rtdf_loading_1_25',
				dasharray: '25, 75',
				includeLineCap: false,
				includeTransition: true
			});
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_25' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'center' }) }, [
						h(
							'svg',
							{
								class: resolveLoadingLayoutClass({ kind: 'svgOriginWillChange', size }),
								viewBox: loadingOneColor25Svg.viewBox
							},
							[
								h('rect', {
									class: resolveLoadingSvgStrokeClass({
										className: loadingOneColor25Svg.trackRect.className,
										strokeClass: loadingClassState.strokeClass
									}),
									style: parseStyle(resolveLoadingOneColorStrokeStyle({ customColor })),
									x: loadingOneColor25Svg.trackRect.x,
									y: loadingOneColor25Svg.trackRect.y,
									fill: loadingOneColor25Svg.trackRect.fill,
									'stroke-width': loadingOneColor25Svg.trackRect.strokeWidth,
									width: loadingOneColor25Svg.trackRect.width,
									height: loadingOneColor25Svg.trackRect.height
								}),
								h('rect', {
									class: resolveLoadingSvgStrokeClass({
										className: loadingOneColor25Svg.carRect.className,
										strokeClass: loadingClassState.strokeClass
									}),
									style: parseStyle(resolveLoadingOneColorStrokeTravelStyle({ customColor, speed })),
									x: loadingOneColor25Svg.carRect.x,
									y: loadingOneColor25Svg.carRect.y,
									fill: loadingOneColor25Svg.carRect.fill,
									'stroke-width': loadingOneColor25Svg.carRect.strokeWidth,
									width: loadingOneColor25Svg.carRect.width,
									height: loadingOneColor25Svg.carRect.height,
									pathLength: loadingOneColor25Svg.carRect.pathLength
								})
							]
						)
					])
				])
			]);
		};
	}
});
