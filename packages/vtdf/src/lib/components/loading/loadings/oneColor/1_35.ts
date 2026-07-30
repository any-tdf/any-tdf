import { defineComponent, Fragment, h, type PropType } from 'vue';
import { parseStyle } from '../../../utils/style';
import {
	resolveLoadingTimedStyle,
	resolveLoadingHorizontalShuttleCss,
	resolveLoadingLayoutClass,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorBackgroundColorStyle,
	resolveLoadingTrackBarClass,
	resolveLoadingTrackOverlayClass,
	resolveLoadingTrackShellStyle
} from '@any-tdf/common/derived/loading';

type LoadingAnimationProps = {
	theme?: boolean;
	inverse?: boolean;
	size?: string;
	customColor?: string[];
	speed?: number;
};

export default defineComponent({
	name: 'Loading1_35',
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
			const css = resolveLoadingHorizontalShuttleCss({ scope: 'rtdf_loading_1_35' });
			return h(Fragment, null, [
				css ? h('style', null, [css]) : null,
				h('div', { class: 'rtdf_loading_1_35' }, [
					h('div', { class: resolveLoadingLayoutClass({ kind: 'flexColumn', size }) }, [
						h(
							'div',
							{
								class: resolveLoadingLayoutClass({ kind: 'trackShell', size }),
								style: parseStyle(resolveLoadingTrackShellStyle())
							},
							[
								h('div', {
									class: resolveLoadingTrackOverlayClass(loadingClassState.bgClass),
									style: parseStyle(resolveLoadingOneColorBackgroundColorStyle({ customColor }))
								}),
								h('div', {
									class: resolveLoadingTrackBarClass(loadingClassState.bgClass),
									style: parseStyle(
										resolveLoadingTimedStyle({
											color: customColor[0],
											colorProperty: 'background-color',
											durationBase: 2,
											speed,
											includeDelay: false
										})
									)
								})
							]
						)
					])
				])
			]);
		};
	}
});
