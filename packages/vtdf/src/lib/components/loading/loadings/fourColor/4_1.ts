import { defineComponent, Fragment, h, type PropType } from 'vue';
import {
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingFourColorShapeStyle,
	resolveLoadingShapeContainerClass,
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
	name: 'Loading4_1',
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
			const css = resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_4_1' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_4_1' }, [
					h('div', { class: resolveLoadingShapeContainerClass({ kind: 'rotatedCorner', size }) }, [
						h('div', {
							class: resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 0 }),
							style: parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 0, customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 1 }),
							style: parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 1, customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2 }),
							style: parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 2, customColor, speed }))
						}),
						h('div', {
							class: resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 3 }),
							style: parseStyle(resolveLoadingFourColorShapeStyle({ variant: '4_1', index: 3, customColor, speed }))
						})
					])
				])
			]);
		};
	}
});
