import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingExploreLineDelayMultipliers,
	resolveLoadingExploreCenterLineStyle,
	resolveLoadingExploreLineClass,
	resolveLoadingExploreLineCss,
	resolveLoadingExploreLineStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_32',
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
			const css = resolveLoadingExploreLineCss({ scope: 'rtdf_loading_1_32' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_32' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeCenter', size }) }, [
						h('div', {
							class: resolveLoadingExploreLineClass({
								bgClass: loadingClassState.bgClass,
								kind: 'center'
							}),
							style: parseStyle(resolveLoadingExploreCenterLineStyle({ color: customColor[0], speed }))
						}),
						...loadingExploreLineDelayMultipliers.map((delayMultiplier) =>
							h('div', {
								key: delayMultiplier,
								class: resolveLoadingExploreLineClass({
									bgClass: loadingClassState.bgClass,
									kind: 'trail'
								}),
								style: parseStyle(resolveLoadingExploreLineStyle({ color: customColor[0], delayMultiplier, speed }))
							})
						)
					])
				])
			]);
		};
	}
});
