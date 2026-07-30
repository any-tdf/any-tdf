import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
	resolveLoadingTwoColorBorderDurationStyle,
	resolveLoadingTwoColorClassState
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading2_2',
	props: {
		theme: { type: Boolean, default: false },
		inverse: { type: Boolean, default: false },
		size: { type: String, default: 'w-8 h-8' },
		customColor: { type: Array as PropType<string[]>, default: () => [] },
		speed: { type: Number, default: 1 }
	},
	setup(props: LoadingAnimationProps) {
		return () => {
			const { inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 } = props;
			const loadingClassState = resolveLoadingTwoColorClassState({ inverse });
			const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_2_2' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_2_2' }, [
					h('div', {
						class: resolveLoadingBorderElementClass({
							kind: 'doubleSpinnerRing',
							size,
							colorClass: loadingClassState.spinBorderClass
						}),
						style: parseStyle(resolveLoadingTwoColorBorderDurationStyle({ customColor, durationBase: 2, speed }))
					})
				])
			]);
		};
	}
});
