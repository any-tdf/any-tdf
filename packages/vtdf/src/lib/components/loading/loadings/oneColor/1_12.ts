import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingClimbingDotStepIndexes,
	resolveLoadingClimbingDotBallStyle,
	resolveLoadingClimbingDotCss,
	resolveLoadingClimbingDotStepRootClass,
	resolveLoadingClimbingDotStepStyle,
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
	name: 'Loading1_12',
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
			const css = resolveLoadingClimbingDotCss({ scope: 'rtdf_loading_1_12' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_12' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'loadingRelativeBox', size }) }, [
						h('div', {
							class: resolveLoadingRoundedElementClass({
								bgClass: loadingClassState.bgClass,
								className: 'absolute ball',
								size: 'none'
							}),
							style: parseStyle(resolveLoadingClimbingDotBallStyle({ color: customColor[0], speed }))
						}),
						...loadingClimbingDotStepIndexes.map((stepIndex) =>
							h('div', {
								key: stepIndex,
								class: resolveLoadingClimbingDotStepRootClass({
									stepIndex,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(resolveLoadingClimbingDotStepStyle({ color: customColor[0], speed }))
							})
						)
					])
				])
			]);
		};
	}
});
