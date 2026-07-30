import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingFourShapeTranslateStyle,
	resolveLoadingOneColorClassState,
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
	name: 'Loading1_18',
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
			const css = resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_1_18' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_18' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'rotatedCorner', size }) }, [
						h('div', {
							class: resolveLoadingShapePieceClass({
								variant: 'cornerThird',
								index: 0,
								bgClass: loadingClassState.bgClass
							}),
							style: parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({
								variant: 'cornerThird',
								index: 1,
								bgClass: loadingClassState.bgClass
							}),
							style: parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({
								variant: 'cornerThird',
								index: 2,
								bgClass: loadingClassState.bgClass
							}),
							style: parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({
								variant: 'cornerThird',
								index: 3,
								bgClass: loadingClassState.bgClass
							}),
							style: parseStyle(resolveLoadingFourShapeTranslateStyle({ customColor, speed }))
						})
					])
				])
			]);
		};
	}
});
