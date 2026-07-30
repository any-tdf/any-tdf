import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingThreeDotIndexes,
	resolveLoadingDotFadeScaleCss,
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
	name: 'Loading1_10',
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
			const css = resolveLoadingDotFadeScaleCss({ scope: 'rtdf_loading_1_10' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_10' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexBetween', size }) }, [
						loadingThreeDotIndexes.map((i, index) =>
							h(Fragment, { key: index }, [
								h('div', {
									class: resolveLoadingRoundDotClass({
										bgClass: loadingClassState.bgClass,
										className: 'loading'
									}),
									style: parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background',
											durationBase: 1,
											speed,
											delayBase: 1,
											delaySpeed: 1,
											delayMultiplier: i === 1 ? -0.3 : 0,
											webkit: true
										})
									)
								})
							])
						)
					])
				])
			]);
		};
	}
});
