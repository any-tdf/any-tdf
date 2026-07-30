import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingAlphaBorderDurationStyle,
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
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
	name: 'Loading1_20',
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
			const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_1_20' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_20' }, [
					h('div', {
						class: resolveLoadingBorderElementClass({
							kind: 'doubleSpinnerRing',
							size,
							colorClass: loadingClassState.doubleSpinBorderClass
						}),
						style: parseStyle(
							resolveLoadingAlphaBorderDurationStyle({
								color: customColor[0],
								durationBase: 2,
								speed,
								fullBorder: true
							})
						)
					})
				])
			]);
		};
	}
});
