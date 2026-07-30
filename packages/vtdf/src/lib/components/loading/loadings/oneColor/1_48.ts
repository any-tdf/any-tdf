import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingSwingDotOpacities,
	resolveLoadingHalfTurnSwingCss,
	resolveLoadingSwingDotStyle,
	resolveLoadingSwingLineClass,
	resolveLoadingSwingLineStyle,
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
	name: 'Loading1_48',
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
			const css = resolveLoadingHalfTurnSwingCss({ scope: 'rtdf_loading_1_48' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_48' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'relativeRotatedFlexCenter', size }) }, [
						loadingSwingDotOpacities.map((item, i) =>
							h(Fragment, { key: i }, [
								h(
									'div',
									{
										class: resolveLoadingSwingLineClass(),
										style: parseStyle(resolveLoadingSwingLineStyle(i, speed))
									},
									[
										h('div', {
											class: resolveLoadingRoundedElementClass({
												bgClass: loadingClassState.bgClass,
												size: 'quarter'
											}),
											style: parseStyle(
												resolveLoadingSwingDotStyle({
													color: customColor[0],
													opacity: item,
													index: i
												})
											)
										})
									]
								)
							])
						)
					])
				])
			]);
		};
	}
});
