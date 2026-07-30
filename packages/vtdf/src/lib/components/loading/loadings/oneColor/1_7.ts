import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingTwoDotIndexes,
	resolveLoadingTwoDotElasticCss,
	resolveLoadingTwoDotElasticDotClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBaseStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_7',
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
			const css = resolveLoadingTwoDotElasticCss({ scope: 'rtdf_loading_1_7' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_7' }, [
					h(
						'div',
						{ class: resolveLoadingLayoutClass({ kind: 'flexCenter', size }) },
						loadingTwoDotIndexes.map((dotIndex) =>
							h('div', {
								key: dotIndex,
								class: resolveLoadingTwoDotElasticDotClass({
									bgClass: loadingClassState.bgClass,
									index: dotIndex
								}),
								style: parseStyle(resolveLoadingOneColorBaseStyle({ customColor, speed }))
							})
						)
					)
				])
			]);
		};
	}
});
