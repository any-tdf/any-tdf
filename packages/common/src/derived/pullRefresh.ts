import { joinClasses } from './helpers.js';
import type { PullRefreshChangeDetail, PullRefreshStatus } from '../types/index.js';

export type PullRefreshStyleValue = {
	height?: string;
	transform?: string;
	transitionDuration?: string;
};

export type PullRefreshDerivedOptions = {
	animationDuration?: number;
	canReleaseText?: string;
	contentClass?: string;
	disabled?: boolean;
	distance?: number;
	headClass?: string;
	headHeight?: number;
	injClass?: string;
	pullingText?: string;
	refreshing?: boolean;
	refreshingText?: string;
	status?: PullRefreshStatus;
	successText?: string;
	threshold?: number;
};

export type PullRefreshDerived = {
	contentClass: string;
	contentStyleString: string;
	contentStyleValue: PullRefreshStyleValue;
	defaultText: string;
	distance: number;
	headClass: string;
	headStyleString: string;
	headStyleValue: PullRefreshStyleValue;
	progress: number;
	rootClass: string;
	status: PullRefreshStatus;
	trackClass: string;
};

export type ResolvePullRefreshGestureOptions = {
	currentX: number;
	currentY: number;
	startX: number;
	startY: number;
};

export type ResolvePullRefreshDistanceOptions = {
	deltaY: number;
	pullFactor?: number;
};

export type ResolvePullRefreshReleaseActionOptions = {
	disabled?: boolean;
	distance?: number;
	headHeight?: number;
	refreshing?: boolean;
	threshold?: number;
};

export type PullRefreshReleaseAction = {
	nextDistance: number;
	nextStatus: PullRefreshStatus;
	shouldRefresh: boolean;
};

export type ResolvePullRefreshCompletionActionOptions = {
	headHeight?: number;
	showSuccess?: boolean;
};

export const pullRefreshDefaultTexts = {
	pullingText: '下拉刷新',
	canReleaseText: '释放立即刷新',
	refreshingText: '刷新中...',
	successText: '刷新成功'
};

const normalizeNumber = (value: number | undefined, fallback: number) => {
	if (typeof value !== 'number' || Number.isNaN(value)) return fallback;
	return value;
};

export const resolvePullRefreshProgress = ({ distance = 0, threshold = 60 }: { distance?: number; threshold?: number } = {}) => {
	const safeThreshold = Math.max(1, normalizeNumber(threshold, 60));
	return Math.max(0, distance) / safeThreshold;
};

export const resolvePullRefreshStatus = ({
	disabled = false,
	distance = 0,
	refreshing = false,
	status,
	threshold = 60
}: Pick<PullRefreshDerivedOptions, 'disabled' | 'distance' | 'refreshing' | 'status' | 'threshold'> = {}): PullRefreshStatus => {
	if (disabled) return 'normal';
	if (refreshing) return 'refreshing';
	if (status === 'refreshing' || status === 'success') return status;
	if (distance <= 0) return 'normal';
	return resolvePullRefreshProgress({ distance, threshold }) >= 1 ? 'canRelease' : 'pulling';
};

export const resolvePullRefreshGestureIntent = ({ currentX, currentY, startX, startY }: ResolvePullRefreshGestureOptions) => {
	const deltaX = currentX - startX;
	const deltaY = currentY - startY;
	return {
		deltaX,
		deltaY,
		isPullDown: deltaY > 0 && Math.abs(deltaY) > Math.abs(deltaX),
		isHorizontal: Math.abs(deltaX) > Math.abs(deltaY)
	};
};

export const resolvePullRefreshDistance = ({ deltaY, pullFactor = 1 }: ResolvePullRefreshDistanceOptions) => {
	const safeFactor = Math.max(0.01, normalizeNumber(pullFactor, 1));
	return Math.max(0, deltaY * safeFactor);
};

export const resolvePullRefreshCanStart = ({
	disabled = false,
	refreshing = false,
	scrollTop = 0
}: { disabled?: boolean; refreshing?: boolean; scrollTop?: number } = {}) => !disabled && !refreshing && scrollTop <= 0;

export const resolvePullRefreshReleaseAction = ({
	disabled = false,
	distance = 0,
	headHeight = 50,
	refreshing = false,
	threshold = 60
}: ResolvePullRefreshReleaseActionOptions = {}): PullRefreshReleaseAction => {
	const shouldRefresh = !disabled && !refreshing && resolvePullRefreshProgress({ distance, threshold }) >= 1;
	return {
		nextDistance: shouldRefresh ? Math.max(0, normalizeNumber(headHeight, 50)) : 0,
		nextStatus: shouldRefresh ? 'refreshing' : 'normal',
		shouldRefresh
	};
};

export const resolvePullRefreshCompletionAction = ({
	headHeight = 50,
	showSuccess = true
}: ResolvePullRefreshCompletionActionOptions = {}): PullRefreshReleaseAction => ({
	nextDistance: showSuccess ? Math.max(0, normalizeNumber(headHeight, 50)) : 0,
	nextStatus: showSuccess ? 'success' : 'normal',
	shouldRefresh: false
});

export const resolvePullRefreshChangeDetail = ({
	status,
	distance = 0,
	threshold = 60
}: {
	status: PullRefreshStatus;
	distance?: number;
	threshold?: number;
}): PullRefreshChangeDetail => ({
	status,
	distance,
	progress: resolvePullRefreshProgress({ distance, threshold })
});

export const resolvePullRefreshHeadStyleValue = ({
	height = 50,
	animationDuration = 300
}: { height?: number; animationDuration?: number } = {}): PullRefreshStyleValue => ({
	height: `${Math.max(0, normalizeNumber(height, 50))}px`,
	transitionDuration: `${Math.max(0, normalizeNumber(animationDuration, 300))}ms`
});

export const resolvePullRefreshContentStyleValue = ({
	distance = 0,
	animationDuration = 300
}: { distance?: number; animationDuration?: number } = {}): PullRefreshStyleValue => ({
	transform: `translate3d(0, ${Math.max(0, distance)}px, 0)`,
	transitionDuration: `${Math.max(0, normalizeNumber(animationDuration, 300))}ms`
});

export const pullRefreshStyleToString = (style: PullRefreshStyleValue) =>
	Object.entries(style)
		.filter(([, value]) => value !== undefined && value !== '')
		.map(([key, value]) => `${key.replace(/[A-Z]/g, (char) => `-${char.toLowerCase()}`)}: ${value};`)
		.join(' ');

export const resolvePullRefreshDefaultText = ({
	canReleaseText = pullRefreshDefaultTexts.canReleaseText,
	pullingText = pullRefreshDefaultTexts.pullingText,
	refreshingText = pullRefreshDefaultTexts.refreshingText,
	status = 'normal',
	successText = pullRefreshDefaultTexts.successText
}: Pick<PullRefreshDerivedOptions, 'canReleaseText' | 'pullingText' | 'refreshingText' | 'status' | 'successText'> = {}) => {
	if (status === 'canRelease') return canReleaseText;
	if (status === 'refreshing') return refreshingText;
	if (status === 'success') return successText;
	return pullingText;
};

export const resolvePullRefreshDerived = ({
	animationDuration = 300,
	canReleaseText,
	contentClass = '',
	disabled = false,
	distance = 0,
	headClass = '',
	headHeight = 50,
	injClass = '',
	pullingText,
	refreshing = false,
	refreshingText,
	status,
	successText,
	threshold = 60
}: PullRefreshDerivedOptions = {}): PullRefreshDerived => {
	const nextStatus = resolvePullRefreshStatus({ disabled, distance, refreshing, status, threshold });
	const safeDistance =
		nextStatus === 'refreshing' || nextStatus === 'success' ? Math.max(0, normalizeNumber(headHeight, 50)) : Math.max(0, distance);
	const headStyleValue = resolvePullRefreshHeadStyleValue({ height: headHeight, animationDuration });
	const contentStyleValue = resolvePullRefreshContentStyleValue({ distance: safeDistance, animationDuration });

	return {
		contentClass: joinClasses(['relative transition-transform will-change-transform', contentClass]),
		contentStyleString: pullRefreshStyleToString(contentStyleValue),
		contentStyleValue,
		defaultText: resolvePullRefreshDefaultText({ canReleaseText, pullingText, refreshingText, status: nextStatus, successText }),
		distance: safeDistance,
		headClass: joinClasses([
			'absolute inset-x-0 top-0 flex items-center justify-center overflow-hidden text-sm text-text-primary/60 dark:text-text-dark/60 transition-all',
			headClass
		]),
		headStyleString: pullRefreshStyleToString(headStyleValue),
		headStyleValue,
		progress: resolvePullRefreshProgress({ distance: safeDistance, threshold }),
		rootClass: joinClasses(['relative overflow-hidden', disabled ? 'pointer-events-none opacity-60' : '', injClass]),
		status: nextStatus,
		trackClass: 'relative'
	};
};

export const resolvePullRefreshStateOptions = ({
	props,
	distance = 0,
	status
}: { props?: PullRefreshDerivedOptions; distance?: number; status?: PullRefreshStatus } = {}) => ({
	...props,
	distance,
	status
});
