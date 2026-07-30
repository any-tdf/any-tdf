import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingBarDelayMultipliers,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingVerticalJumpCss,
	resolveLoadingVerticalJumpRowClass,
	resolveLoadingOneColorClassState,
	resolveLoadingRoundDotClass
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_43',
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
			const css = resolveLoadingVerticalJumpCss({ scope: 'rtdf_loading_1_43' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_43' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size }) }, [
						h('div', { class: resolveLoadingVerticalJumpRowClass() }, [
							loadingBarDelayMultipliers.map((item, index) =>
								h(Fragment, { key: index }, [
									h('div', {
										class: resolveLoadingRoundDotClass({
											bgClass: loadingClassState.bgClass,
											className: 'dot',
											size: 'sm'
										}),
										style: parseStyle(
											resolveLoadingColorDurationDelayStyle({
												color: customColor[0],
												durationBase: 1,
												speed,
												delayMultiplier: item
											})
										)
									})
								])
							)
						])
					])
				])
			]);
		};
	}
});
