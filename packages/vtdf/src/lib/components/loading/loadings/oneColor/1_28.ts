import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingEightRadialDelayMultipliers,
	resolveLoadingRadialDotPulseCss,
	resolveLoadingRadialDotRowClass,
	resolveLoadingRadialEightTransformStyle,
	resolveLoadingRoundDotClass,
	resolveLoadingTimedStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_28',
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
			const css = resolveLoadingRadialDotPulseCss({ scope: 'rtdf_loading_1_28' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_28' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeFlexCenter', size }) }, [
						loadingEightRadialDelayMultipliers.map((item, i) =>
							h(Fragment, { key: i }, [
								h(
									'div',
									{
										class: resolveLoadingRadialDotRowClass(),
										style: parseStyle(resolveLoadingRadialEightTransformStyle(i))
									},
									[
										h('div', {
											class: resolveLoadingRoundDotClass({
												bgClass: loadingClassState.bgClass,
												className: 'dot',
												size: 'sm'
											}),
											style: parseStyle(
												resolveLoadingTimedStyle({
													color: customColor[0],
													colorProperty: 'background-color',
													durationBase: 1,
													speed,
													delayMultiplier: item
												})
											)
										})
									]
								)
							])
						)
					])
				])
			]);
		};
	}
});
