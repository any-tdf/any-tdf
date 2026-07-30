import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	loadingHalfFlowSections,
	resolveLoadingHalfFlowContainerStyle,
	resolveLoadingHalfFlowCss,
	resolveLoadingHalfFlowOverlayClass,
	resolveLoadingHalfFlowPieceRootClass,
	resolveLoadingHalfFlowPieceStyle,
	resolveLoadingHalfFlowWrapClass,
	resolveLoadingHalfFlowWrapStyle,
	resolveLoadingOneColorBackgroundColorStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_33',
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
			const css = resolveLoadingHalfFlowCss({ scope: 'vtdf_loading_1_33' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'vtdf_loading_1_33' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'containerRelativeFlexColumn', size }),
							style: parseStyle(resolveLoadingHalfFlowContainerStyle(speed))
						},
						loadingHalfFlowSections.map((section) =>
							h(
								'div',
								{
									key: section,
									class: resolveLoadingHalfFlowWrapClass(),
									style: parseStyle(resolveLoadingHalfFlowWrapStyle(section))
								},
								[
									h('div', {
										class: resolveLoadingHalfFlowOverlayClass(loadingClassState.bgClass),
										style: parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))
									}),
									h('div', {
										class: resolveLoadingHalfFlowPieceRootClass({
											section,
											bgClass: loadingClassState.bgClass
										}),
										style: parseStyle(resolveLoadingHalfFlowPieceStyle({ color: customColor[0], section, speed }))
									})
								]
							)
						)
					)
				])
			]);
		};
	}
});
