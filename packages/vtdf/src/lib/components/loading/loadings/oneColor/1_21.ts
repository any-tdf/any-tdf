import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapePositionCss,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorShapeStyle,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_21',
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
			const css = resolveLoadingFourShapePositionCss({
				scope: 'rtdf_loading_1_21',
				containerDurationBase: 1.2,
				mode: 'quarters',
				shapeDurationBase: 0.6
			});
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_21' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'loadingRelative', size }),
							style: parseStyle(resolveLoadingShapeContainerStyle({ variant: '1_21', speed }))
						},
						[
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundHalf',
									index: 0,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundHalf',
									index: 1,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundHalf',
									index: 2,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundHalf',
									index: 3,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(resolveLoadingOneColorShapeStyle({ variant: '1_21', customColor, speed }))
							})
						]
					)
				])
			]);
		};
	}
});
