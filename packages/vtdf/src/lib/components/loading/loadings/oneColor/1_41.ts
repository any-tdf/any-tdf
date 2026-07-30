import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOrbitalScaleCss,
	resolveLoadingTimedStyle,
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
	name: 'Loading1_41',
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
			const css = resolveLoadingOrbitalScaleCss({
				scope: 'rtdf_loading_1_41',
				targetClass: 'container'
			});
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_41' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeCenter', size }) }, [
						h('div', {
							class: resolveLoadingRoundedElementClass({
								bgClass: loadingClassState.bgClass,
								className: 'container absolute left-2.5 top-2.5',
								size: 'lg'
							}),
							style: parseStyle(
								resolveLoadingTimedStyle({
									color: customColor[0],
									colorProperty: 'background-color',
									durationBase: 1.5,
									speed,
									includeDelay: false
								})
							)
						}),
						h('div', {
							class: resolveLoadingRoundedElementClass({
								bgClass: loadingClassState.bgClass,
								className: 'container absolute left-2.5 top-2.5',
								size: 'lg'
							}),
							style: parseStyle(
								resolveLoadingTimedStyle({
									color: customColor[0],
									colorProperty: 'background-color',
									durationBase: 1.5,
									speed,
									delayBase: 0.75
								})
							)
						})
					])
				])
			]);
		};
	}
});
