import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingCornerDotIndexes,
	resolveLoadingCornerDotStyle,
	resolveLoadingCornerTravelCss,
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
	name: 'Loading1_9',
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
			const css = resolveLoadingCornerTravelCss({ scope: 'rtdf_loading_1_9' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_9' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeCenter', size }) }, [
						loadingCornerDotIndexes.map((i, index) =>
							h(Fragment, { key: index }, [
								h('div', {
									class: resolveLoadingRoundedElementClass({
										bgClass: loadingClassState.bgClass,
										className: 'absolute loading',
										size: 'third'
									}),
									style: parseStyle(resolveLoadingCornerDotStyle({ color: customColor[0], index: i, speed }))
								})
							])
						)
					])
				])
			]);
		};
	}
});
