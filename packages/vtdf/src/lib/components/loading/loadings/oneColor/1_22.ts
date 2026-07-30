import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingCircularStretchCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorColorStyle,
	resolveLoadingOrbitCarStyle,
	resolveLoadingOrbitContainerStyle,
	resolveLoadingStretchSvgClass
} from '@any-tdf/common/derived/loading';
import { loadingOneColor22Svg } from '@any-tdf/common/svg/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_22',
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
			const css = resolveLoadingCircularStretchCss({ scope: 'rtdf_loading_1_22' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_22' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'center', size }),
							style: parseStyle(resolveLoadingOrbitContainerStyle({ speed }))
						},
						[
							h(
								'svg',
								{
									class: resolveLoadingStretchSvgClass(loadingClassState.textClass),
									viewBox: loadingOneColor22Svg.viewBox,
									style: parseStyle(resolveLoadingOneColorColorStyle({ customColor }))
								},
								[
									h('circle', {
										class: loadingOneColor22Svg.trackCircle.className,
										stroke: loadingOneColor22Svg.trackCircle.stroke,
										cx: loadingOneColor22Svg.trackCircle.cx,
										cy: loadingOneColor22Svg.trackCircle.cy,
										r: loadingOneColor22Svg.trackCircle.r,
										fill: loadingOneColor22Svg.trackCircle.fill
									}),
									h('circle', {
										class: loadingOneColor22Svg.carCircle.className,
										style: parseStyle(resolveLoadingOrbitCarStyle({ speed })),
										stroke: loadingOneColor22Svg.carCircle.stroke,
										cx: loadingOneColor22Svg.carCircle.cx,
										cy: loadingOneColor22Svg.carCircle.cy,
										r: loadingOneColor22Svg.carCircle.r,
										fill: loadingOneColor22Svg.carCircle.fill
									})
								]
							)
						]
					)
				])
			]);
		};
	}
});
