import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingBorderElementClass,
	resolveLoadingClipRotatePulseCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBaseStyle,
	resolveLoadingOneColorBorderBaseStyle,
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
	name: 'Loading1_14',
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
			const css = resolveLoadingClipRotatePulseCss({ scope: 'rtdf_loading_1_14' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_14' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeCenter', size }) }, [
						h('div', {
							class: resolveLoadingBorderElementClass({
								kind: 'clipPulseRing',
								colorClass: loadingClassState.borderClass
							}),
							style: parseStyle(resolveLoadingOneColorBorderBaseStyle({ customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingRoundedElementClass({
								bgClass: loadingClassState.bgClass,
								className: 'absolute left-1/4 top-1/4 loading2',
								size: 'half'
							}),
							style: parseStyle(resolveLoadingOneColorBaseStyle({ customColor, speed }))
						})
					])
				])
			]);
		};
	}
});
