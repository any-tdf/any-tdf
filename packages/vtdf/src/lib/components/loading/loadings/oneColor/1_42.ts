import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingWobbleRotations,
	resolveLoadingWobbleContainerStyle,
	resolveLoadingWobbleCss,
	resolveLoadingWobbleDotStyle,
	resolveLoadingWobbleRotationClass,
	resolveLoadingWobbleRotationStyle,
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
	name: 'Loading1_42',
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
			const css = resolveLoadingWobbleCss({ scope: 'rtdf_loading_1_42' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_42' }, [
					h(
						'div',
						{
							class: resolveLoadingLayoutClass({ kind: 'containerRelativeInlineBlock', size }),
							style: parseStyle(resolveLoadingWobbleContainerStyle(speed))
						},
						loadingWobbleRotations.map((item) =>
							h(
								'div',
								{
									key: item,
									class: resolveLoadingWobbleRotationClass(),
									style: parseStyle(resolveLoadingWobbleRotationStyle(item))
								},
								[
									h('div', {
										class: resolveLoadingRoundedElementClass({
											bgClass: loadingClassState.bgClass,
											className: 'dot absolute left-0 top-0',
											size: 'zeroFullWidth'
										}),
										style: parseStyle(resolveLoadingWobbleDotStyle({ color: customColor[0], speed }))
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
