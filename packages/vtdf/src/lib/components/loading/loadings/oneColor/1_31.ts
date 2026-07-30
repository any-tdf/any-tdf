import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingBarDelayMultipliers,
	resolveLoadingBarGrowCss,
	resolveLoadingTimedStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingBarItemClass
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_31',
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
			const css = resolveLoadingBarGrowCss({ scope: 'rtdf_loading_1_31' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_31' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexBetween', size }) }, [
						loadingBarDelayMultipliers.map((item, index) =>
							h(Fragment, { key: index }, [
								h('div', {
									class: resolveLoadingBarItemClass(loadingClassState.bgClass),
									style: parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background-color',
											durationBase: 1,
											speed,
											delayBase: 1,
											delaySpeed: 1,
											delayMultiplier: item
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
