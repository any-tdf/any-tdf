import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapePositionCss,
	resolveLoadingTwoColorClassState,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass,
	resolveLoadingTwoColorShapeStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading2_4',
	props: {
		theme: { type: Boolean, default: false },
		inverse: { type: Boolean, default: false },
		size: { type: String, default: 'w-8 h-8' },
		customColor: { type: Array as PropType<string[]>, default: () => [] },
		speed: { type: Number, default: 1 }
	},
	setup(props: LoadingAnimationProps) {
		return () => {
			const { inverse = false, size = 'w-8 h-8', customColor = [], speed = 1 } = props;
			const loadingClassState = resolveLoadingTwoColorClassState({ inverse });
			const css = resolveLoadingFourShapePositionCss({ scope: 'rtdf_loading_2_4' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_2_4' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'loadingRelative', size }),
							style: parseStyle(resolveLoadingShapeContainerStyle({ variant: '2_4', speed }))
						},
						[
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundThird',
									index: 0,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(
									resolveLoadingTwoColorShapeStyle({
										variant: '2_4',
										index: 0,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundThird',
									index: 1,
									bgClass: loadingClassState.secondaryBgClass
								}),
								style: parseStyle(
									resolveLoadingTwoColorShapeStyle({
										variant: '2_4',
										index: 1,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundThird',
									index: 2,
									bgClass: loadingClassState.bgClass
								}),
								style: parseStyle(
									resolveLoadingTwoColorShapeStyle({
										variant: '2_4',
										index: 0,
										customColor,
										speed
									})
								)
							}),
							h('div', {
								class: resolveLoadingShapePieceClass({
									variant: 'roundThird',
									index: 3,
									bgClass: loadingClassState.secondaryBgClass
								}),
								style: parseStyle(
									resolveLoadingTwoColorShapeStyle({
										variant: '2_4',
										index: 1,
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
