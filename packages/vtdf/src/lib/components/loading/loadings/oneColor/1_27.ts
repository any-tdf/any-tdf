import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingSixDotDelayMultipliers,
	resolveLoadingOrbitSpinContainerStyle,
	resolveLoadingOrbitSpinCss,
	resolveLoadingOrbitSpinDotClass,
	resolveLoadingOrbitSpinDotStyle,
	resolveLoadingOrbitSpinInnerStyle,
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
	name: 'Loading1_27',
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
			const css = resolveLoadingOrbitSpinCss({ scope: 'rtdf_loading_1_27' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_27' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size }),
							style: parseStyle(resolveLoadingOrbitSpinContainerStyle(speed))
						},
						loadingSixDotDelayMultipliers.map((delayMultiplier) =>
							h(
								'div',
								{
									key: delayMultiplier,
									class: resolveLoadingOrbitSpinDotClass(),
									style: parseStyle(resolveLoadingOrbitSpinDotStyle({ delayMultiplier, speed }))
								},
								[
									h('div', {
										class: resolveLoadingRoundDotClass({
											bgClass: loadingClassState.bgClass,
											size: 'sm'
										}),
										style: parseStyle(
											resolveLoadingOrbitSpinInnerStyle({
												color: customColor[0],
												delayMultiplier,
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
