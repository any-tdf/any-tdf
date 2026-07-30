import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingDualRingDelayDivisors,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingMidpointPulseCss,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundedElementClass
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_50',
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
			const css = resolveLoadingMidpointPulseCss({ scope: 'rtdf_loading_1_50' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_50' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeCenter', size }) }, [
						loadingDualRingDelayDivisors.map((item, index) =>
							h(Fragment, { key: index }, [
								h('div', {
									class: resolveLoadingRoundedElementClass({
										bgClass: loadingClassState.bgClass,
										className: 'dot absolute left-0 top-0',
										size: 'full'
									}),
									style: parseStyle(
										resolveLoadingColorDurationDelayStyle({
											color: customColor[0],
											durationBase: 2,
											speed,
											delayDivisor: item
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
