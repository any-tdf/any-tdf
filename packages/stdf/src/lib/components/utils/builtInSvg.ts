import { getContext } from 'svelte';
import { defaultBuiltInIconLibrary, resolveBuiltInSvg, type BuiltInIconLibrary } from '@any-tdf/common/svg';

export const builtInIconLibraryContextKey = 'STDF-built-in-icon-library';

type BuiltInIconLibraryContext = BuiltInIconLibrary | (() => BuiltInIconLibrary);

export const resolveContextBuiltInIconLibrary = (contextValue?: BuiltInIconLibraryContext): BuiltInIconLibrary => {
	if (typeof contextValue === 'function') return contextValue();
	return contextValue || defaultBuiltInIconLibrary;
};

export const useBuiltInSvgResolver = () => {
	const contextValue = getContext<BuiltInIconLibraryContext | undefined>(builtInIconLibraryContextKey);
	return (key: string) => resolveBuiltInSvg(key, resolveContextBuiltInIconLibrary(contextValue));
};
