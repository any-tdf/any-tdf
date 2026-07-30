import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingRadialDotDelayMultipliers,
	resolveLoadingRadialLineStyle,
	resolveLoadingRadialDotRowClass,
	resolveLoadingRadialDotStyle,
	resolveLoadingRadialOscillateCss,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundDotClass
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_29',
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
			const css = resolveLoadingRadialOscillateCss({ scope: 'rtdf_loading_1_29' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_29' }, [
					h(
						'div',
						{ class: resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size }) },
						loadingRadialDotDelayMultipliers.map((item, i) =>
							h(
								'div',
								{
									key: i,
									class: resolveLoadingRadialDotRowClass(),
									style: parseStyle(resolveLoadingRadialLineStyle(i, speed))
								},
								[
									h('div', {
										class: resolveLoadingRoundDotClass({
											bgClass: loadingClassState.bgClass,
											className: 'dot',
											size: 'sm'
										}),
										style: parseStyle(
											resolveLoadingRadialDotStyle({
												color: customColor[0],
												delayMultiplier: item,
												speed
											})
										)
									})
								]
							)
						)
					)
				])
			]);
		};
	}
});
