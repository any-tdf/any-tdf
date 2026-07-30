import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingBorderElementClass,
	resolveLoadingTwoColorClassState,
	resolveLoadingTwoColorSolidBorderStyle,
	resolveLoadingTwoColorTransparentBorderDurationStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading2_1',
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
			return h(Fragment, null, [
				h('div', { class: 'rtdf_loading_2_1' }, [
					h(
						'div',
						{
							class: resolveLoadingBorderElementClass({
								kind: 'nestedSpinnerOuter',
								size,
								colorClass: loadingClassState.innerBorderClass
							}),
							style: parseStyle(
								resolveLoadingTwoColorTransparentBorderDurationStyle({
									color: customColor[1],
									speed
								})
							)
						},
						[
							h('div', {
								class: resolveLoadingBorderElementClass({
									kind: 'nestedSpinnerInner',
									colorClass: loadingClassState.outerBorderClass
								}),
								style: parseStyle(resolveLoadingTwoColorSolidBorderStyle(customColor[0]))
							})
						]
					)
				])
			]);
		};
	}
});
