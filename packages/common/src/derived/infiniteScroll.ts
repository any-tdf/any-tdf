import { joinClasses } from './helpers.js';
import type { InfiniteScrollDirection, InfiniteScrollSlotDetail, InfiniteScrollStatus } from '../types/index.js';

export type { InfiniteScrollStatus };

export type InfiniteScrollDerivedOptions = {
	direction?: InfiniteScrollDirection;
	disabled?: boolean;
	error?: boolean;
	errorText?: string;
	finished?: boolean;
	finishedText?: string;
	injClass?: string;
	loading?: boolean;
	loadingText?: string;
	textClass?: string;
};

export type InfiniteScrollDerived = {
	ariaBusy: boolean | undefined;
	defaultText: string;
	errorButtonClass: string;
	rootClass: string;
	showContent: boolean;
	status: InfiniteScrollStatus;
	textClass: string;
};

export type ResolveInfiniteScrollShouldLoadOptions = {
	disabled?: boolean;
	distance?: number;
	error?: boolean;
	finished?: boolean;
	loading?: boolean;
	offset?: number;
	visible?: boolean;
};

export type ResolveInfiniteScrollDistanceOptions = {
	clientHeight: number;
	direction?: InfiniteScrollDirection;
	scrollHeight: number;
	scrollTop: number;
};

export const infiniteScrollDefaultTexts = {
	loadingText: '加载中...',
	finishedText: '没有更多了',
	errorText: '加载失败，点击重试'
};

const normalizeNumber = (value: number | undefined, fallback: number) => {
	if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
	return value;
};

export const resolveInfiniteScrollDistance = ({
	clientHeight,
	direction = 'down',
	scrollHeight,
	scrollTop
}: ResolveInfiniteScrollDistanceOptions) => {
	if (direction === 'up') return Math.max(0, scrollTop);
	return Math.max(0, scrollHeight - scrollTop - clientHeight);
};

export const resolveInfiniteScrollRootMargin = ({
	direction = 'down',
	offset = 300
}: { direction?: InfiniteScrollDirection; offset?: number } = {}) => {
	const safeOffset = Math.max(0, normalizeNumber(offset, 300));
	return direction === 'up' ? `${safeOffset}px 0px 0px 0px` : `0px 0px ${safeOffset}px 0px`;
};

export const resolveInfiniteScrollDetail = ({
	status = 'idle',
	retry
}: {
	status?: InfiniteScrollStatus;
	retry: () => void;
}): InfiniteScrollSlotDetail => ({ status, retry });

export const resolveInfiniteScrollShouldLoad = ({
	disabled = false,
	distance = Number.POSITIVE_INFINITY,
	error = false,
	finished = false,
	loading = false,
	offset = 300,
	visible = true
}: ResolveInfiniteScrollShouldLoadOptions = {}) => {
	if (!visible || disabled || loading || finished || error) return false;
	return distance <= Math.max(0, normalizeNumber(offset, 300));
};

export const resolveInfiniteScrollStatus = ({
	error = false,
	finished = false,
	loading = false
}: Pick<InfiniteScrollDerivedOptions, 'error' | 'finished' | 'loading'> = {}): InfiniteScrollStatus => {
	if (loading) return 'loading';
	if (error) return 'error';
	if (finished) return 'finished';
	return 'idle';
};

export const resolveInfiniteScrollDefaultText = ({
	errorText = infiniteScrollDefaultTexts.errorText,
	finishedText = infiniteScrollDefaultTexts.finishedText,
	loadingText = infiniteScrollDefaultTexts.loadingText,
	status = 'idle'
}: {
	errorText?: string;
	finishedText?: string;
	loadingText?: string;
	status?: InfiniteScrollStatus;
} = {}) => {
	if (status === 'loading') return loadingText;
	if (status === 'error') return errorText;
	if (status === 'finished') return finishedText;
	return '';
};

export const resolveInfiniteScrollDerived = ({
	disabled = false,
	error = false,
	errorText,
	finished = false,
	finishedText,
	injClass = '',
	loading = false,
	loadingText,
	textClass = ''
}: InfiniteScrollDerivedOptions = {}): InfiniteScrollDerived => {
	const status = resolveInfiniteScrollStatus({ error, finished, loading });
	const defaultText = resolveInfiniteScrollDefaultText({ errorText, finishedText, loadingText, status });
	return {
		ariaBusy: loading ? true : undefined,
		defaultText,
		errorButtonClass: 'inline-flex min-h-12 items-center justify-center px-4 text-sm text-error',
		rootClass: joinClasses([
			'flex min-h-12 items-center justify-center py-3 text-center',
			disabled ? 'pointer-events-none opacity-60' : '',
			injClass
		]),
		showContent: status !== 'idle' && defaultText.length > 0,
		status,
		textClass: joinClasses([
			'inline-flex min-h-12 items-center justify-center gap-2 px-4 text-sm text-text-primary/60 dark:text-text-dark/60',
			textClass
		])
	};
};

export const resolveInfiniteScrollStateOptions = ({ props }: { props?: InfiniteScrollDerivedOptions } = {}) => ({ ...props });
