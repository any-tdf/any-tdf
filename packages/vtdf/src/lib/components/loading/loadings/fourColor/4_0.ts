import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingDoubleRotateCss,
	resolveLoadingFourColorBorderDurationStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading4_0',
	props: {
		theme: { type: Boolean, default: false },
		inverse: { type: Boolean, default: false },
		size: { type: String, default: 'w-8 h-8' },
		customColor: { type: Array as PropType<string[]>, default: () => [] },
		speed: { type: Number, default: 1 }
	},
	setup(props: LoadingAnimationProps) {
		return () => {
			const { size = 'w-8 h-8', customColor = [], speed = 1 } = props;
			const css = resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_4_0' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_4_0' }, [
					h('div', {
						class: resolveLoadingBorderElementClass({ kind: 'doubleSpinnerRing', size }),
						style: parseStyle(resolveLoadingFourColorBorderDurationStyle({ customColor, durationBase: 2, speed }))
					})
				])
			]);
		};
	}
});
