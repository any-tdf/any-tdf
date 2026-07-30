import { defineComponent, Fragment, h, type PropType } from 'vue';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingBorderTransparentDurationStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';
import { parseStyle } from '../../../utils/style';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_3',
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
			return h(Fragment, null, [
				h('div', { class: 'rtdf_loading_1_3' }, [
					h('div', {
						class: resolveLoadingBorderElementClass({
							kind: 'splitSpinnerRing',
							size,
							colorClass: loadingClassState.splitRingClass
						}),
						style: parseStyle(
							resolveLoadingBorderTransparentDurationStyle({
								color: customColor[0],
								durationBase: 1,
								speed,
								transparentSides: ['border-top-color', 'border-bottom-color']
							})
						)
					})
				])
			]);
		};
	}
});
