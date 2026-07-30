import type { PaginationProps } from '../../types';
import { forwardRef, useState, useEffect, useMemo } from 'react';
import Page from './page';
import SecondPageNext from './secondPageNext';
import SecondPagePre from './secondPagePre';
import { zh_CN } from '../../lang';
import { useConfig } from '../config-provider';
import {
	resolvePaginationDerived,
	resolvePaginationEllipsisToggleAction,
	resolvePaginationNavigateAction,
	resolvePaginationNextOmitSyncAction,
	resolvePaginationSelectAction,
	resolvePaginationStateOptions
} from '@any-tdf/common/derived/pagination';
import { arrowLeftSvg, arrowRightSvg, moreSmallSvg, moreSvg } from '@any-tdf/common/svg/common';
import { SvgIcon } from '../utils/SvgIcon';

const Pagination = forwardRef<HTMLDivElement, PaginationProps>(
	(
		{
			total = 0,
			pageSize = 10,
			current = 1,
			maxShowPage = 7,
			radius = '',
			type = 'bold',
			bg = 'gray',
			pageCol = 3,
			showNextOmitPage = false,
			showPreOmitPage = false,
			injClass = '',
			noDataText: noDataTextProp,
			onePageText: onePageTextProp,
			continuous = false,
			onChange,
			onNext,
			onPre
		},
		ref
	) => {
		const [internalCurrent, setInternalCurrent] = useState(current);
		const [internalShowNextOmitPage, setInternalShowNextOmitPage] = useState(showNextOmitPage);
		const [internalShowPreOmitPage, setInternalShowPreOmitPage] = useState(showPreOmitPage);
		const { locale } = useConfig();
		const paginationLang = locale?.pagination || zh_CN.pagination;
		const commonLang = locale?.common || zh_CN.common;
		// 公共派生层接收分页 props 和内部状态，组件层只保留状态同步与事件派发。
		// The common derivation layer receives pagination props and internal state; this component only keeps state sync and event dispatch.
		const paginationState = useMemo(
			() =>
				resolvePaginationDerived(
					resolvePaginationStateOptions({
						props: {
							total,
							pageSize,
							maxShowPage,
							radius,
							type,
							bg,
							injClass,
							noDataText: noDataTextProp,
							onePageText: onePageTextProp
						},
						current: internalCurrent,
						showNextOmitPage: internalShowNextOmitPage,
						showPreOmitPage: internalShowPreOmitPage,
						defaults: { common: commonLang, pagination: paginationLang }
					})
				),
			[
				bg,
				commonLang,
				injClass,
				internalCurrent,
				internalShowNextOmitPage,
				internalShowPreOmitPage,
				maxShowPage,
				noDataTextProp,
				onePageTextProp,
				pageSize,
				paginationLang,
				radius,
				total,
				type
			]
		);

		useEffect(() => {
			setInternalCurrent(current);
		}, [current]);

		useEffect(() => {
			setInternalShowNextOmitPage(showNextOmitPage);
		}, [showNextOmitPage]);

		useEffect(() => {
			setInternalShowPreOmitPage(showPreOmitPage);
		}, [showPreOmitPage]);

		useEffect(() => {
			const action = resolvePaginationNextOmitSyncAction({
				totalPage: paginationState.totalPage,
				maxShowPage,
				showNextOmitPage: internalShowNextOmitPage
			});
			if (action.shouldSync) setInternalShowNextOmitPage(action.nextShowNextOmitPage);
		}, [paginationState.totalPage, maxShowPage, internalShowNextOmitPage]);

		// 点击后省略号事件
		// click next ellipsis event
		const clickNextEllipsisFunc = () => {
			const action = resolvePaginationEllipsisToggleAction({
				pageCount: paginationState.nextEllipsisPages.length,
				visible: internalShowNextOmitPage
			});
			if (action.shouldToggle) setInternalShowNextOmitPage(action.nextVisible);
		};

		// 点击前省略号事件
		// click pre ellipsis event
		const clickPreEllipsisFunc = () => {
			const action = resolvePaginationEllipsisToggleAction({
				pageCount: paginationState.preEllipsisPages.length,
				visible: internalShowPreOmitPage
			});
			if (action.shouldToggle) setInternalShowPreOmitPage(action.nextVisible);
		};

		const applyCurrentAction = (action: ReturnType<typeof resolvePaginationSelectAction>) => {
			if (!action.shouldChange) return false;
			setInternalCurrent(action.nextCurrent);
			setInternalShowNextOmitPage(action.nextShowNextOmitPage);
			setInternalShowPreOmitPage(action.nextShowPreOmitPage);
			return true;
		};

		// 点击下一页
		// click next page
		const nextFunc = () => {
			// 公共 action 只返回页码状态，事件派发留在组件内。
			// Shared action only returns pagination state; event dispatch stays in the component.
			const action = resolvePaginationNavigateAction({
				current: internalCurrent,
				totalPage: paginationState.totalPage,
				direction: 'next'
			});
			if (!applyCurrentAction(action)) return;
			onNext?.(action.nextCurrent);
			onChange?.(action.nextCurrent);
		};

		// 点击上一页
		// click pre page
		const preFunc = () => {
			const action = resolvePaginationNavigateAction({
				current: internalCurrent,
				totalPage: paginationState.totalPage,
				direction: 'pre'
			});
			if (!applyCurrentAction(action)) return;
			onPre?.(action.nextCurrent);
			onPre?.(action.nextCurrent);
			onChange?.(action.nextCurrent);
		};

		// 点击页码
		// click page
		const clickItemFunc = (index: number) => {
			const action = resolvePaginationSelectAction(index);
			if (applyCurrentAction(action)) onChange?.(action.nextCurrent);
		};

		// 点击省略页码事件
		// click second page item event
		const clickSecondPageItemFunc = (index: number) => {
			const action = resolvePaginationSelectAction(index);
			if (applyCurrentAction(action)) onChange?.(action.nextCurrent);
		};

		// 渲染省略号内容
		// render ellipsis content
		const renderEllipsis = (showOmit: boolean, className: string, onClick: () => void) => {
			return (
				<button type="button" className={className} onClick={() => !continuous && onClick()}>
					{showOmit ? (
						<>
							{/* 公共 SVG 数据在 common 中维护，组件层只负责渲染图标。 / Shared SVG data lives in common; the component layer only renders the icon. */}
							<SvgIcon svg={moreSvg} width={20} height={20} className={paginationState.iconClass} />
						</>
					) : (
						<SvgIcon svg={moreSmallSvg} width={20} height={20} className={paginationState.mutedIconClass} />
					)}
				</button>
			);
		};

		return (
			<div ref={ref} className={paginationState.rootClass}>
				<button
					type="button"
					className={paginationState.preButtonClass}
					disabled={!paginationState.canPre}
					onClick={preFunc}
					aria-label="pre"
				>
					<SvgIcon svg={arrowLeftSvg} width={20} height={20} className={paginationState.iconClass} />
				</button>

				{paginationState.showNoData ? (
					<div className={paginationState.textClass}>{paginationState.texts.noDataText}</div>
				) : paginationState.showOnePage ? (
					<div className={paginationState.textClass}>{paginationState.texts.onePageText}</div>
				) : paginationState.showAllPages ? (
					paginationState.allPageItems.map((item) => (
						<Page key={item.page} active={item.active} type={type} radius={radius} onClick={() => !continuous && clickItemFunc(item.page)}>
							{item.page}
						</Page>
					))
				) : (
					<>
						<Page active={paginationState.firstPageItem.active} type={type} radius={radius} onClick={() => !continuous && clickItemFunc(1)}>
							1
						</Page>

						{paginationState.showPreEllipsis &&
							renderEllipsis(internalShowPreOmitPage, paginationState.preEllipsisClass, clickPreEllipsisFunc)}

						{paginationState.leadingPageItems.map((item) => (
							<Page
								key={item.page}
								active={item.active}
								type={type}
								radius={radius}
								onClick={() => !continuous && clickItemFunc(item.page)}
							>
								{item.page}
							</Page>
						))}

						{paginationState.middlePageItems.length > 0 &&
							paginationState.middlePageItems.map((item) => (
								<Page
									key={item.page}
									active={item.active}
									type={type}
									radius={radius}
									onClick={() => !continuous && clickItemFunc(item.page)}
								>
									{item.page}
								</Page>
							))}

						{paginationState.trailingPageItems.map((item) => (
							<Page
								key={item.page}
								active={item.active}
								type={type}
								radius={radius}
								onClick={() => !continuous && clickItemFunc(item.page)}
							>
								{item.page}
							</Page>
						))}

						{paginationState.showNextEllipsis &&
							renderEllipsis(internalShowNextOmitPage, paginationState.nextEllipsisClass, clickNextEllipsisFunc)}

						<Page
							active={paginationState.lastPageItem.active}
							type={type}
							radius={radius}
							onClick={() => !continuous && clickItemFunc(paginationState.totalPage)}
						>
							{paginationState.totalPage}
						</Page>
					</>
				)}

				<button
					type="button"
					className={paginationState.nextButtonClass}
					disabled={!paginationState.canNext}
					onClick={nextFunc}
					aria-label="next"
				>
					<SvgIcon svg={arrowRightSvg} width={20} height={20} className={paginationState.iconClass} />
				</button>

				{internalShowNextOmitPage ? (
					<SecondPageNext
						pageCol={pageCol}
						pages={paginationState.nextEllipsisPages}
						type={type}
						radius={radius}
						bg={bg}
						onClickItem={clickSecondPageItemFunc}
						maxShowPage={maxShowPage}
					/>
				) : null}
				{internalShowPreOmitPage ? (
					<SecondPagePre
						pageCol={pageCol}
						pages={paginationState.preEllipsisPages}
						type={type}
						radius={radius}
						bg={bg}
						onClickItem={clickSecondPageItemFunc}
						maxShowPage={maxShowPage}
					/>
				) : null}
			</div>
		);
	}
);

Pagination.displayName = 'Pagination';

export default Pagination;
