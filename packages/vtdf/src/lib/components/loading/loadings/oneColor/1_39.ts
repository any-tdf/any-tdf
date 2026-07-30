import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingLayoutClass,
	loadingOrbitSliceIndexes,
	resolveLoadingOrbitalScaleCss,
	resolveLoadingOrbitSliceClass,
	resolveLoadingOrbitSliceRowClass,
	resolveLoadingOrbitSliceRowStyle,
	resolveLoadingOrbitSliceStyle,
	resolveLoadingOneColorClassState
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_39',
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
			const css = resolveLoadingOrbitalScaleCss({ scope: 'rtdf_loading_1_39' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_39' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexColumnItemsCenter', size }) }, [
						loadingOrbitSliceIndexes.map((item, index) =>
							h(Fragment, { key: index }, [
								h(
									'div',
									{
										class: resolveLoadingOrbitSliceRowClass(),
										style: parseStyle(resolveLoadingOrbitSliceRowStyle())
									},
									[
										h('div', {
											class: resolveLoadingOrbitSliceClass(loadingClassState.bgClass),
											style: parseStyle(
												resolveLoadingOrbitSliceStyle({
													color: customColor[0],
													index: item,
													speed
												})
											)
										}),
										h('div', {
											class: resolveLoadingOrbitSliceClass(loadingClassState.bgClass),
											style: parseStyle(
												resolveLoadingOrbitSliceStyle({
													color: customColor[0],
													index: item,
													phase: 'trailing',
													speed
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
