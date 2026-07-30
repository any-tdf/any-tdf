import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorSvgSpinStyle,
	resolveLoadingSpinnerSvgClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor0Svg } from '@any-tdf/common/svg/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_0',
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
			return h(Fragment, null, [
				h('div', { class: 'rtdf_loading_1_0' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'center', size }) }, [
						h(
							'svg',
							{
								viewBox: loadingOneColor0Svg.viewBox,
								class: resolveLoadingSpinnerSvgClass(loadingClassState.textClass),
								style: parseStyle(resolveLoadingOneColorSvgSpinStyle({ customColor, speed }))
							},
							[
								h('circle', {
									cx: loadingOneColor0Svg.trackCircle.cx,
									cy: loadingOneColor0Svg.trackCircle.cy,
									r: loadingOneColor0Svg.trackCircle.r,
									'stroke-width': loadingOneColor0Svg.trackCircle.strokeWidth,
									fill: loadingOneColor0Svg.trackCircle.fill,
									class: loadingOneColor0Svg.trackCircle.className,
									stroke: loadingOneColor0Svg.trackCircle.stroke
								}),
								h('circle', {
									cx: loadingOneColor0Svg.carCircle.cx,
									cy: loadingOneColor0Svg.carCircle.cy,
									r: loadingOneColor0Svg.carCircle.r,
									'stroke-width': loadingOneColor0Svg.carCircle.strokeWidth,
									class: loadingOneColor0Svg.carCircle.className,
									stroke: loadingOneColor0Svg.carCircle.stroke,
									fill: loadingOneColor0Svg.carCircle.fill,
									'stroke-dashoffset': loadingOneColor0Svg.carCircle.strokeDashoffset,
									'stroke-dasharray': loadingOneColor0Svg.carCircle.strokeDasharray,
									'stroke-linecap': loadingOneColor0Svg.carCircle.strokeLinecap
								})
							]
						)
					])
				])
			]);
		};
	}
});
