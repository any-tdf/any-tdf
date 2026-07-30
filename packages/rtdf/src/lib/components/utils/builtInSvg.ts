import { resolveBuiltInSvg } from '@any-tdf/common/svg';
import { useConfig } from '../config-provider';

export const useBuiltInSvgResolver = () => {
	const { builtInIconLibrary } = useConfig();
	return (key: string) => resolveBuiltInSvg(key, builtInIconLibrary);
};
