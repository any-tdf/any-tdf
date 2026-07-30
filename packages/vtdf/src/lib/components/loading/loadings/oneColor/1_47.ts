import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingThreeDotDelayMultipliers,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingThreeDotPulseCss,
	resolveLoadingThreeDotPulseRowClass,
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
	name: 'Loading1_47',
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
			const css = resolveLoadingThreeDotPulseCss({ scope: 'rtdf_loading_1_47' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_47' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexColumnCenter', size }) }, [
						h('div', { class: resolveLoadingThreeDotPulseRowClass() }, [
							loadingThreeDotDelayMultipliers.map((item, index) =>
								h(Fragment, { key: index }, [
									h('div', {
										class: resolveLoadingRoundDotClass({
											bgClass: loadingClassState.bgClass,
											className: 'dot'
										}),
										style: parseStyle(
											resolveLoadingColorDurationDelayStyle({
												color: customColor[0],
												durationBase: 1.3,
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
