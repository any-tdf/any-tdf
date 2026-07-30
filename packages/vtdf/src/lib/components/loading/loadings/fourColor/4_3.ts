import { defineComponent, Fragment, h, type PropType } from 'vue';
import {
	resolveLoadingFourShapePositionCss,
	resolveLoadingFourColorShapeStyle,
	resolveLoadingShapeContainerClass,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass
} from '@any-tdf/common/derived/loading';
import { parseStyle } from '../../../utils/style';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading4_3',
	props: {
		theme: { type: Boolean, default: false },
		inverse: { type: Boolean, default: false },
		size: { type: String, default: 'w-8 h-8' },
		customColor: { type: Array as PropType<string[]>, default: () => [] },
		speed: { type: Number, default: 1 }
	},
	setup(props: LoadingAnimationProps) {
		return () => {
			const { size = 'w-8 h-8', customColor = [], speed = 1 } = props;
			const css = resolveLoadingFourShapePositionCss({
				scope: 'rtdf_loading_4_3',
				containerDurationBase: 1.2,
				mode: 'quarters',
				shapeDurationBase: 0.6
			});
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_4_3' }, [
					h(
						'div',
						{
							class: resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size }),
							style: parseStyle(resolveLoadingShapeContainerStyle({ variant: '4_3', speed }))
						},
						[
							h('div', {
								class: resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 0 }),
								style: parseStyle(
									resolveLoadingFourColorShapeStyle({
										variant: '4_3',
										index: 0,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 1 }),
								style: parseStyle(
									resolveLoadingFourColorShapeStyle({
										variant: '4_3',
										index: 1,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 2 }),
								style: parseStyle(
									resolveLoadingFourColorShapeStyle({
										variant: '4_3',
										index: 2,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3 }),
								style: parseStyle(
									resolveLoadingFourColorShapeStyle({
										variant: '4_3',
										index: 3,
										customColor,
										speed
									})
								)
							})
						]
					)
				])
			]);
		};
	}
});
