import { describe, expect, test } from 'bun:test';
import {
	resolveActionPopoverActionButtonClass,
	resolveActionPopoverActionClickAction,
	resolveActionPopoverActionClickFlow,
	resolveActionPopoverActionContainerClass,
	resolveActionPopoverActionContentClass,
	resolveActionPopoverActionDisabled,
	resolveActionPopoverActionViewState,
	resolveActionPopoverActionViewStateList,
	resolveActionPopoverCloseAction,
	resolveActionPopoverDerived,
	resolveActionPopoverHideForViewportAction,
	resolveActionPopoverInlineInParams,
	resolveActionPopoverCancelAction,
	resolveActionPopoverCancelButtonClass,
	resolveActionPopoverDescClass,
	resolveActionPopoverIconInjClass,
	resolveActionPopoverIconProps,
	resolveActionPopoverIconState,
	resolveActionPopoverImageClass,
	resolveActionPopoverImageInnerClass,
	resolveActionPopoverInlineCloseCompleteAction,
	resolveActionPopoverInlinePanelStyleString,
	resolveActionPopoverInlinePanelStyleValue,
	resolveActionPopoverInlinePosition,
	resolveActionPopoverInlinePositionState,
	resolveActionPopoverInitialVisible,
	resolveActionPopoverMeasuredDimension,
	resolveActionPopoverPanelClass,
	resolveActionPopoverRenderAction,
	resolveActionPopoverRingButtonClass,
	resolveActionPopoverRingCloseCompleteAction,
	resolveActionPopoverRingFlyParams,
	resolveActionPopoverRingItemDerived,
	resolveActionPopoverRingItemDerivedList,
	resolveActionPopoverRingItemPosition,
	resolveActionPopoverRingItemStyleString,
	resolveActionPopoverRingItemStyleValue,
	resolveActionPopoverRingLayout,
	resolveActionPopoverRingPanelClass,
	resolveActionPopoverRingPanelStyleString,
	resolveActionPopoverRingPanelStyleValue,
	resolveActionPopoverRingPositionState,
	resolveActionPopoverStateOptions,
	resolveActionPopoverRestoreFromViewportAction,
	resolveActionPopoverRingTransitionDuration,
	resolveActionPopoverInlineOutParams,
	resolveActionPopoverShouldBindGlobalListeners,
	resolveActionPopoverShouldHideForViewport,
	resolveActionPopoverShouldRestoreFromViewport,
	resolveActionPopoverRingTransform,
	resolveActionPopoverThemeClasses,
	resolveActionPopoverTitleClass,
	resolveActionPopoverTriggerElement,
	resolveActionPopoverTriggerInViewport,
	resolveActionPopoverTransformOrigin,
	resolveActionPopoverVerticalDividerClass,
	resolveActionPopoverViewportAction,
	resolveActionPopoverVisible
} from '../src/derived/actionPopover';
import {
	resolveActionSheetActionButtonClass,
	resolveActionSheetActionClickAction,
	resolveActionSheetActionClickFlow,
	resolveActionSheetActionContentClass,
	resolveActionSheetActionDisabled,
	resolveActionSheetActionViewState,
	resolveActionSheetActionViewStateList,
	resolveActionSheetCancelAction,
	resolveActionSheetCancelText,
	resolveActionSheetCloseAction,
	resolveActionSheetDerived,
	resolveActionSheetDescClass,
	resolveActionSheetDividerClass,
	resolveActionSheetIconState,
	resolveActionSheetIconProps,
	resolveActionSheetImageClass,
	resolveActionSheetImageInnerClass,
	resolveActionSheetImgRadiusClass,
	resolveActionSheetInitialVisible,
	resolveActionSheetStateOptions,
	resolveActionSheetTitleClass,
	resolveActionSheetCancelGapClass,
	resolveActionSheetTransitionDistance
} from '../src/derived/actionSheet';
import {
	resolveAccordionButtonClass,
	resolveAccordionContentClass,
	resolveAccordionDerived,
	resolveAccordionDividerClass,
	resolveAccordionExpandIconState,
	resolveAccordionExpanded,
	resolveAccordionIconClass,
	resolveAccordionIconRotationClass,
	resolveAccordionIconWrapClass,
	resolveAccordionItemViewStateList,
	resolveAccordionNextActive,
	resolveAccordionPanelClass,
	resolveAccordionRootClass,
	resolveAccordionSlideParams,
	resolveAccordionStateOptions,
	resolveAccordionTitleTextClass,
	resolveAccordionToggleAction,
	resolveAccordionTitleClass
} from '../src/derived/accordion';
import {
	resolveAlertBodyClass,
	resolveAlertCardBg,
	resolveAlertCloseAction,
	resolveAlertCloseButtonClass,
	resolveAlertCloseClass,
	resolveAlertCloseFlow,
	resolveAlertContainerClass,
	resolveAlertContainerStyleString,
	resolveAlertContainerStyleValue,
	resolveAlertContentClass,
	resolveAlertContentState,
	resolveAlertCustomIconClass,
	resolveAlertDerived,
	resolveAlertInitialClosingBySelf,
	resolveAlertInitialRendered,
	resolveAlertInitialVisible,
	resolveAlertInverseBgClass,
	resolveAlertInverseTextClass,
	resolveAlertMessageClass,
	resolveAlertOutroEndAction,
	resolveAlertRadiusClass,
	resolveAlertRenderedState,
	resolveAlertShouldAutoClose,
	resolveAlertShowCustomIcon,
	resolveAlertShowTypeIcon,
	resolveAlertShouldUnmountImmediately,
	resolveAlertStateOptions,
	resolveAlertTextClass,
	resolveAlertTextContentClass,
	resolveAlertTitleClass,
	resolveAlertTypeIcon,
	resolveAlertTypeIconWrapperClass,
	resolveAlertTransitionParams
} from '../src/derived/alert';
import {
	resolveAsyncPickerDerived,
	resolveAsyncPickerInitialVisible,
	resolveAsyncPickerBackState,
	resolveAsyncPickerBodyClass,
	resolveAsyncPickerButtonLoadingClass,
	resolveAsyncPickerCloseAction,
	resolveAsyncPickerContentClipClass,
	resolveAsyncPickerHeaderClass,
	resolveAsyncPickerHeightStyleString,
	resolveAsyncPickerHeightStyleValue,
	resolveAsyncPickerInlineContentStyleString,
	resolveAsyncPickerInlineContentStyleValue,
	resolveAsyncPickerLeftAction,
	resolveAsyncPickerLeftButtonFlow,
	resolveAsyncPickerLeftButtonClass,
	resolveAsyncPickerLeftText,
	resolveAsyncPickerLoadingClass,
	resolveAsyncPickerLoading,
	resolveAsyncPickerMetrics,
	resolveAsyncPickerPopupConfig,
	resolveAsyncPickerRightAction,
	resolveAsyncPickerRightButtonFlow,
	resolveAsyncPickerRightButtonClass,
	resolveAsyncPickerRightText,
	resolveAsyncPickerSelectionResetState,
	resolveAsyncPickerSelectedItemClass,
	resolveAsyncPickerSelectedLabelClass,
	resolveAsyncPickerSelectedFlyParams,
	resolveAsyncPickerSelectedWrapClass,
	resolveAsyncPickerSelectState,
	resolveAsyncPickerStateOptions,
	resolveAsyncPickerTexts,
	resolveAsyncPickerUsePopup
} from '../src/derived/asyncPicker';
import {
	resolveBadgeClasses,
	resolveBadgeDerived,
	resolveBadgeInnerStyleString,
	resolveBadgeInnerStyleValue,
	resolveBadgeOuterStyleString,
	resolveBadgeOuterStyleValue,
	resolveBadgeStateOptions,
	resolveBadgeStyles
} from '../src/derived/badge';
import {
	resolveAvatarAltClass,
	resolveAvatarCenteredContentClass,
	resolveAvatarContentState,
	resolveAvatarDefaultIconClass,
	resolveAvatarDerived,
	resolveAvatarIconWrapClass,
	resolveAvatarIconSize,
	resolveAvatarImageClass,
	resolveAvatarImageWrapClass,
	resolveAvatarKeyboardAction,
	resolveAvatarRadiusClass,
	resolveAvatarRootClass,
	resolveAvatarSizeClass,
	resolveAvatarStateOptions
} from '../src/derived/avatar';
import {
	resolveAvatarGroupAddIconClass,
	resolveAvatarGroupAddIconWrapClass,
	resolveAvatarGroupButtonClass,
	resolveAvatarGroupDerived,
	resolveAvatarGroupFallbackClass,
	resolveAvatarGroupItemClass,
	resolveAvatarGroupItemStyleString,
	resolveAvatarGroupItemStyleValue,
	resolveAvatarGroupItemTransform,
	resolveAvatarGroupItemZIndex,
	resolveAvatarGroupKeyboardAction,
	resolveAvatarGroupLineWidthClass,
	resolveAvatarGroupRadiusClass,
	resolveAvatarGroupRootClass,
	resolveAvatarGroupSizeClass,
	resolveAvatarGroupStateOptions,
	resolveAvatarGroupTextSizeClass,
	resolveAvatarGroupTopKind,
	resolveAvatarGroupTopStyleString,
	resolveAvatarGroupTopStyleValue,
	resolveAvatarGroupTopState,
	resolveAvatarGroupTopTransform,
	resolveAvatarGroupTotalText,
	resolveAvatarGroupVisibleData
} from '../src/derived/avatarGroup';
import {
	bottomSheetDefaultScrollTopHeight,
	resolveBottomSheetActionStartTop,
	resolveBottomSheetContentHeight,
	resolveBottomSheetContentScrollClass,
	resolveBottomSheetContentStyleString,
	resolveBottomSheetContentStyleValue,
	resolveBottomSheetCloseAction,
	resolveBottomSheetCloseContentState,
	resolveBottomSheetCloseTextButtonClass,
	resolveBottomSheetCurrentTop,
	resolveBottomSheetDerived,
	resolveBottomSheetDividerClass,
	resolveBottomSheetDragHandleClass,
	resolveBottomSheetDragIndicatorClass,
	resolveBottomSheetHeaderRowClass,
	resolveBottomSheetIconButtonClass,
	resolveBottomSheetIconRadiusClass,
	resolveBottomSheetIconSvgClass,
	resolveBottomSheetInitialVisible,
	resolveBottomSheetLayerClass,
	resolveBottomSheetLayerStyleString,
	resolveBottomSheetLayerStyleValue,
	resolveBottomSheetMaskClickAction,
	resolveBottomSheetMaskClickFlow,
	resolveBottomSheetMeasuredScrollTopHeight,
	resolveBottomSheetMaxHeight,
	resolveBottomSheetMoveDistance,
	resolveBottomSheetNearestTopState,
	resolveBottomSheetInParams,
	resolveBottomSheetOutParams,
	resolveBottomSheetPanelClass,
	resolveBottomSheetPanelStyleString,
	resolveBottomSheetPanelStyleValue,
	resolveBottomSheetRenderEndAction,
	resolveBottomSheetRenderState,
	resolveBottomSheetShouldClose,
	resolveBottomSheetStartTop,
	resolveBottomSheetStateOptions,
	resolveBottomSheetStayHeight,
	resolveBottomSheetStayHeightList,
	resolveBottomSheetTitle,
	resolveBottomSheetTitleAlignClass,
	resolveBottomSheetTouchCancelAction,
	resolveBottomSheetTouchEndAction,
	resolveBottomSheetTouchEndFlow,
	resolveBottomSheetTouchStartAction,
	resolveBottomSheetTransitionDistance,
	resolveBottomSheetValidationState,
	resolveBottomSheetVisibleChangeAction,
	resolveBottomSheetWindowRadiusClass
} from '../src/derived/bottomSheet';
import {
	resolveButtonGroupDividerClass,
	resolveButtonGroupDividerColorClass,
	resolveButtonGroupDividerWrapClass,
	resolveButtonGroupDerived,
	resolveButtonGroupFillStateClass,
	resolveButtonGroupInnerClass,
	resolveButtonGroupItemClass,
	resolveButtonGroupItemClickAction,
	resolveButtonGroupItemDerivedList,
	resolveButtonGroupItemState,
	resolveButtonGroupItemStateList,
	resolveButtonGroupOuterClass,
	resolveButtonGroupRadiusClass,
	resolveButtonGroupStateOptions,
	resolveButtonGroupTextColorClass,
	resolveButtonGroupUseItems,
	resolveButtonClass,
	resolveButtonContentState,
	resolveButtonCustomStyleString,
	resolveButtonCustomStyleValue,
	resolveButtonDerived,
	resolveButtonIconState,
	resolveButtonInnerDisabled,
	resolveButtonInnerSizeClass,
	resolveButtonOuterClass,
	resolveButtonRadiusClass,
	resolveButtonStateOptions
} from '../src/derived/button';
import {
	resolveCardBodyClass,
	resolveCardBorderClass,
	resolveCardBgClass,
	resolveCardContainerClass,
	resolveCardContentState,
	resolveCardDerived,
	resolveCardDividerClass,
	resolveCardDividerVisible,
	resolveCardFooterClass,
	resolveCardHeaderClass,
	resolveCardInteractive,
	resolveCardInteractiveClass,
	resolveCardPaddingClass,
	resolveCardStateOptions
} from '../src/derived/card';
import {
	createCalendarMonthData,
	formatCalendarDate,
	formatCalendarDates,
	resolveCalendarCellRadiusClass,
	resolveCalendarCloseAction,
	resolveCalendarConfirmAction,
	resolveCalendarDateSelected,
	resolveCalendarDatesWithoutDisabled,
	resolveCalendarDerived,
	resolveCalendarDayClickFlow,
	resolveCalendarDayClickState,
	resolveCalendarDayDateString,
	resolveCalendarDayCellFromDay,
	resolveCalendarDayCellDerived,
	resolveCalendarDayInfoText,
	resolveCalendarDayInfoClass,
	resolveCalendarDayNumberClass,
	resolveCalendarDisabledMarkClass,
	resolveCalendarFooterClass,
	resolveCalendarFormattedDates,
	resolveCalendarDayNumberText,
	resolveCalendarInitialVisible,
	resolveCalendarInitialSelectedDatesAction,
	resolveCalendarInitMonthIndex,
	resolveCalendarInnerDayClass,
	resolveCalendarIsWeekend,
	resolveCalendarHeaderClass,
	resolveCalendarHeight,
	resolveCalendarModeFlags,
	resolveCalendarMonthLabel,
	resolveCalendarMonthCardProps,
	resolveCalendarMonthContainerClass,
	resolveCalendarMonthGridClass,
	resolveCalendarMonthMarkClass,
	resolveCalendarMonthScrollAction,
	resolveCalendarMonthTitleClass,
	resolveCalendarMonthTitleTextClass,
	resolveCalendarMonthViewItems,
	resolveCalendarMultipleDates,
	resolveCalendarOuterDayClass,
	resolveCalendarOuterDayStyleString,
	resolveCalendarOuterDayStyleValue,
	resolveCalendarQuickSelectLabel,
	resolveCalendarQuickSelectButtonClass,
	resolveCalendarQuickSelectFlow,
	resolveCalendarQuickSelectListClass,
	resolveCalendarQuickSelectScrollFlow,
	resolveCalendarQuickSelectScrollIndex,
	resolveCalendarQuickSelectState,
	resolveCalendarRangeBoundary,
	resolveCalendarRangeEdge,
	resolveCalendarRangeRadiusClass,
	resolveCalendarScrollClass,
	resolveCalendarScrollStyleString,
	resolveCalendarScrollStyleValue,
	resolveCalendarSelectedDateString,
	resolveCalendarSelectedSummary,
	resolveCalendarStateOptions,
	resolveCalendarSurfaceClass,
	resolveCalendarTexts,
	resolveCalendarTodayState,
	resolveCalendarTodayString,
	resolveCalendarTransitionDistance,
	resolveCalendarUsePopup,
	resolveCalendarWeekRowClass,
	resolveCalendarWeekTextClass,
	resolveCalendarWeekTexts,
	sortCalendarDates
} from '../src/derived/calendar';
import {
	formatCharRollValue,
	getCharRollAutoStartIndex,
	getCharRollCharIndex,
	getCharRollCharSetArray,
	getCharRollCurrentChar,
	getCharRollCurrentDisplayIndex,
	getCharRollRenderCount,
	getCharRollScrollOffset,
	resolveCharRollCharClass,
	resolveCharRollCharSet,
	resolveCharRollCompleteState,
	resolveCharRollDerived,
	resolveCharRollDirectClass,
	resolveCharRollDirectStyleString,
	resolveCharRollDisplayItems,
	resolveCharRollDisplayMeta,
	resolveCharRollDisplayState,
	resolveCharRollEasingFunction,
	resolveCharRollFrameAction,
	resolveCharRollFrameState,
	resolveCharRollHeightStyleString,
	resolveCharRollInitialInitialized,
	resolveCharRollPauseAction,
	resolveCharRollPauseStartIndexes,
	resolveCharRollRenderIndexes,
	resolveCharRollResetAction,
	resolveCharRollResetState,
	resolveCharRollRollItemClass,
	resolveCharRollRollItemStyleValue,
	resolveCharRollRootClass,
	resolveCharRollScrollListClass,
	resolveCharRollScrollStyleString,
	resolveCharRollStartAction,
	resolveCharRollStateOptions,
	resolveCharRollValueChangeAction
} from '../src/derived/charRoll';
import {
	resolveCheckboxClickAction,
	resolveCheckboxDerived,
	resolveCheckboxInitialCheckeds,
	resolveCheckboxItemChecked,
	resolveCheckboxItemStates,
	resolveCheckboxNextCheckeds,
	resolveCheckboxStateOptions
} from '../src/derived/checkbox';
import {
	resolveCellArrowSize,
	resolveCellCanToggleSwitch,
	resolveCellClickAction,
	resolveCellContentClass,
	resolveCellDerived,
	resolveCellDetailClass,
	resolveCellDetailTextClass,
	resolveCellGroupClass,
	resolveCellInfoClass,
	resolveCellKeyboardAction,
	resolveCellLeftContentClass,
	resolveCellLeftIconWrapClass,
	resolveCellNextSwitchActive,
	resolveCellOuterClass,
	resolveCellRightAccessoryClass,
	resolveCellRightArrowAccessoryClass,
	resolveCellRightArrowIconClass,
	resolveCellRightContentClass,
	resolveCellRightState,
	resolveCellRowClass,
	resolveCellStateOptions,
	resolveCellSubTitleClass,
	resolveCellTitleClass,
	resolveCellTitleTextClass
} from '../src/derived/cell';
import {
	normalizeCodeInputValue,
	resolveCodeInputBoxCellClass,
	resolveCodeInputButtonClass,
	resolveCodeInputBlurAction,
	resolveCodeInputCellActive,
	resolveCodeInputCellDisplayState,
	resolveCodeInputCellDisplayStateList,
	resolveCodeInputCellRadiusClass,
	resolveCodeInputCellRadiusLeftClass,
	resolveCodeInputCellRadiusRightClass,
	resolveCodeInputCellText,
	resolveCodeInputCells,
	resolveCodeInputCurrentIndex,
	resolveCodeInputCursorAnimationClass,
	resolveCodeInputCursorClass,
	resolveCodeInputDerived,
	resolveCodeInputDotClass,
	resolveCodeInputCloseAction,
	resolveCodeInputFinishAction,
	resolveCodeInputFinishedValue,
	resolveCodeInputFinishFlow,
	resolveCodeInputFocusAction,
	resolveCodeInputGutterClass,
	resolveCodeInputHasError,
	resolveCodeInputInitialFocused,
	resolveCodeInputInitialValue,
	resolveCodeInputInfoClass,
	resolveCodeInputInfoState,
	resolveCodeInputInputAction,
	resolveCodeInputLineCellClass,
	resolveCodeInputLineClass,
	resolveCodeInputAutoScrollTarget,
	resolveCodeInputNativeInputClass,
	resolveCodeInputNativeInputMode,
	resolveCodeInputRootClass,
	resolveCodeInputShowCursor,
	resolveCodeInputShouldAutoScroll,
	resolveCodeInputStateOptions,
	resolveCodeInputTextClass,
	resolveCodeInputUnderlineCursorClass
} from '../src/derived/codeInput';
import { resolveConfigProviderModeClass } from '../src/derived/configProvider';
import {
	resolveDividerDerived,
	resolveDividerHorizontalClass,
	resolveDividerLineClass,
	resolveDividerLineVisibility,
	resolveDividerStateOptions,
	resolveDividerTextClass,
	resolveDividerVerticalClass
} from '../src/derived/divider';
import {
	parseColorPickerValue,
	resolveColorPickerCloseAction,
	resolveColorPickerActiveModeIndex,
	resolveColorPickerColorStrings,
	resolveColorPickerContainerMeasureClass,
	resolveColorPickerControlDerived,
	resolveColorPickerColorFromRgb,
	resolveColorPickerCopyButtonClass,
	resolveColorPickerCopySuccessAction,
	resolveColorPickerCopyTipHideAction,
	resolveColorPickerCopyTipClass,
	resolveColorPickerDerived,
	resolveColorPickerDisplayValues,
	resolveColorPickerDisplayValueClass,
	resolveColorPickerDragAction,
	resolveColorPickerEffectiveModes,
	resolveColorPickerInitialVisible,
	resolveColorPickerInputClass,
	resolveColorPickerInputColor,
	resolveColorPickerInputKeyboardAction,
	resolveColorPickerInputNextColor,
	resolveColorPickerInputValues,
	resolveColorPickerIsDirectMode,
	resolveColorPickerLabels,
	resolveColorPickerMeasuredClientWidth,
	resolveColorPickerOutputValueFromModes,
	resolveColorPickerPanelBitmapData,
	resolveColorPickerPanelCanvasMetrics,
	resolveColorPickerPanelInteractionColor,
	resolveColorPickerPanelMarkerClass,
	resolveColorPickerPanelMarkerStyleString,
	resolveColorPickerPanelMarkerStyleValue,
	resolveColorPickerPanelMarkerLeft,
	resolveColorPickerPanelNextColor,
	resolveColorPickerPanelPixel,
	resolveColorPickerPanelPosition,
	resolveColorPickerPanelSize,
	resolveColorPickerPanelSizeStyleString,
	resolveColorPickerPanelSizeStyleValue,
	resolveColorPickerPanelWidth,
	resolveColorPickerPointerPoint,
	resolveColorPickerPopupProps,
	resolveColorPickerPreviewStyleString,
	resolveColorPickerPreviewStyleValue,
	resolveColorPickerPreviewRowClass,
	resolveColorPickerPreviewTextClass,
	resolveColorPickerRadiusClass,
	resolveColorPickerShouldSyncColor,
	resolveColorPickerSliderBitmapData,
	resolveColorPickerSliderCanvasMetrics,
	resolveColorPickerSliderCanvasStyleString,
	resolveColorPickerSliderCanvasStyleValue,
	resolveColorPickerSliderDraggingState,
	resolveColorPickerSliderHandleClass,
	resolveColorPickerSliderHandleStyleString,
	resolveColorPickerSliderHandleStyleValue,
	resolveColorPickerSliderInteractionColor,
	resolveColorPickerSliderLabelClass,
	resolveColorPickerSliderMoveAction,
	resolveColorPickerSliderNextColor,
	resolveColorPickerSliderPixel,
	resolveColorPickerSliderPosition,
	resolveColorPickerSliderRowClass,
	resolveColorPickerSliderTrackClass,
	resolveColorPickerStateOptions,
	resolveColorPickerThemeColorFromCssValue,
	resolveColorPickerThemeColorVariable,
	resolveColorPickerUpdateAction,
	resolveColorPickerWheelSize
} from '../src/derived/colorPicker';
import {
	formatCountDownTime,
	parseCountDownTime,
	resolveCountDownCanStart,
	resolveCountDownDerived,
	resolveCountDownEndTime,
	resolveCountDownPauseAction,
	resolveCountDownRemain,
	resolveCountDownRootClass,
	resolveCountDownResetAction,
	resolveCountDownResetRemain,
	resolveCountDownShouldAutoStart,
	resolveCountDownShouldEmitChange,
	resolveCountDownShouldResumeTick,
	resolveCountDownShouldSyncRemain,
	resolveCountDownStartAction,
	resolveCountDownStateOptions,
	resolveCountDownTickAction,
	resolveCountDownTimePropAction,
	resolveCountDownTimeChanged
} from '../src/derived/countDown';
import {
	resolveDialogButtonGapClass,
	resolveDialogButtonDerived,
	resolveDialogButtonFlexStyleString,
	resolveDialogButtonFlexStyleValue,
	resolveDialogButtonFill,
	resolveDialogButtonHeightIn,
	resolveDialogButtonInjClass,
	resolveDialogButtonRowClass,
	resolveDialogButtonSideClass,
	resolveDialogCloseAction,
	resolveDialogContentState,
	resolveDialogDerived,
	resolveDialogInitialVisible,
	resolveDialogPanelClass,
	resolveDialogPrimaryAction,
	resolveDialogPopupDefaults,
	resolveDialogPopupProps,
	resolveDialogSecondaryAction,
	resolveDialogSecondaryFlow,
	resolveDialogSecondaryShouldClose,
	resolveDialogStateOptions,
	resolveDialogTexts,
	resolveDialogTitleAlignClass,
	resolveDialogTitleAlignSpaceClass,
	resolveDialogTitleClass
} from '../src/derived/dialog';
import {
	formatFormColorPickerValue,
	resolveFormActionSheetChangeValue,
	resolveFormActionSheetProps,
	resolveFormActionSheetInputValue,
	resolveFormCalendarChangeValue,
	resolveFormCalendarDates,
	resolveFormCalendarKey,
	resolveFormCalendarMultiple,
	resolveFormCalendarDisplayValue,
	resolveFormCalendarTagItems,
	resolveFormCalendarValueAfterRemove,
	resolveFormChangeAction,
	resolveFormItemsChangeAction,
	resolveFormCheckboxProps,
	resolveFormClearButtonClass,
	resolveFormClearIconClass,
	resolveFormClearedPickerValue,
	resolveFormColorPickerChangeValue,
	resolveFormComponentProps,
	resolveFormCardWrapper,
	resolveFormCardWrapperClass,
	resolveFormDerived,
	resolveFormFieldHeaderClass,
	resolveFormFieldMetaClass,
	resolveFormFieldTitleClass,
	resolveFormFieldClearValue,
	resolveFormGroupClass,
	resolveFormHasTags,
	resolveFormKeyboardClickAction,
	resolveFormKeyboardClose,
	resolveFormKeyboardNextValue,
	resolveFormLegacyCardClass,
	resolveFormItemInitialValue,
	resolveFormItemRenderState,
	resolveFormItemRenderType,
	resolveFormItemPopupAction,
	resolveFormItemViewDerived,
	resolveFormItemViewStateOptions,
	resolveFormItemWithSliderRuntime,
	resolveFormItemsRenderState,
	resolveFormModelValue,
	resolveFormOpenPopupKeyboardAction,
	resolveFormPickerDatas,
	resolveFormPickerMultiple,
	resolveFormPickerMultipleChangeValue,
	resolveFormPickerConfirmValue,
	resolveFormPickerSelected,
	resolveFormPickerTagItems,
	resolveFormPickerValueAfterRemove,
	resolveFormPickerDisplayValue,
	resolveFormPlaceholder,
	resolveFormPlaceholderClass,
	resolveFormPopupAction,
	resolveFormRadioProps,
	resolveFormRequiredClass,
	resolveFormResetState,
	resolveFormRuntimeItem,
	resolveFormRuntimeItemResetPatch,
	resolveFormRuntimeItems,
	resolveFormRuntimeItemsPopup,
	resolveFormRuntimeItemsValue,
	resolveFormSelectIconClass,
	resolveFormSliderWrapperClass,
	resolveFormMultiControlClass,
	resolveFormMultiRootClass,
	resolveFormMultiTagsClass,
	resolveFormSpaceClass,
	resolveFormStateOptions,
	resolveFormSliderChangeValue,
	resolveFormSubmitText,
	resolveFormTimePickerChangeValue,
	resolveFormTimePickerInputValue
} from '../src/derived/form';
import {
	appendFeedbackQueueItem,
	popFeedbackQueueItem,
	removeFeedbackQueueItemById,
	resolveFeedbackAlertQueueViewItems,
	resolveFeedbackAlertStyleString,
	resolveFeedbackAlertStyleValue,
	resolveFeedbackAlertItemStyleString,
	resolveFeedbackAlertItemStyleValue,
	resolveFeedbackDialogConfirmOptions,
	resolveFeedbackDialogResultAction,
	resolveFeedbackId,
	resolveFeedbackInitialVisible,
	resolveFeedbackLoadingHideAction,
	resolveFeedbackLoadingRenderProps,
	resolveFeedbackLoadingContainerClass,
	resolveFeedbackLoadingMessageClass,
	resolveFeedbackLoadingShowAction,
	resolveFeedbackLoadingState,
	resolveFeedbackMessageOptions,
	resolveFeedbackModalInfoOptions,
	resolveFeedbackModalResultAction,
	resolveFeedbackQueueAfterHide,
	resolveFeedbackQueueHideAction,
	resolveFeedbackQueueShowAction,
	resolveFeedbackResetVisibilityState,
	resolveFeedbackStackOffset,
	resolveFeedbackToastQueueViewItems,
	resolveFeedbackToastStyleString,
	resolveFeedbackToastStyleValue,
	resolveFeedbackToastItemStyleString,
	resolveFeedbackToastItemStyleValue,
	resolveFeedbackTypedShortcutOptions,
	splitFeedbackDialogCallbacks,
	splitFeedbackModalCallbacks
} from '../src/derived/feedback';
import {
	resolveFullKeyboardBottomRowClass,
	resolveFullKeyboardCaseToggleAction,
	resolveFullKeyboardCloseAction,
	resolveFullKeyboardCloseEmissionAction,
	resolveFullKeyboardDerived,
	resolveFullKeyboardDoneButtonClass,
	resolveFullKeyboardFlexRowClass,
	resolveFullKeyboardFuncButtonClass,
	resolveFullKeyboardGapClass,
	resolveFullKeyboardGridRowClass,
	resolveFullKeyboardHeight,
	resolveFullKeyboardIconClass,
	resolveFullKeyboardInitialValue,
	resolveFullKeyboardInitialVisible,
	resolveFullKeyboardInnerGridRowClass,
	resolveFullKeyboardInputKey,
	resolveFullKeyboardKeyAction,
	resolveFullKeyboardKeyFlow,
	resolveFullKeyboardKeyButtonClass,
	resolveFullKeyboardKeyRadiusClass,
	resolveFullKeyboardLayoutState,
	resolveFullKeyboardNextValue,
	resolveFullKeyboardPanelClass,
	resolveFullKeyboardPreviewClass,
	resolveFullKeyboardPopupProps,
	resolveFullKeyboardPopupRadius,
	resolveFullKeyboardRootProps,
	resolveFullKeyboardShiftButtonClass,
	resolveFullKeyboardSpaceTextClass,
	resolveFullKeyboardStateOptions,
	resolveFullKeyboardSymbolModeToggleAction,
	resolveFullKeyboardSymbolToggleText,
	resolveFullKeyboardTexts,
	resolveFullKeyboardUsePopup,
	resolveFullKeyboardVisibleChangeAction,
	resolveFullKeyboardVisibleChangeFlow
} from '../src/derived/fullKeyboard';
import {
	resolveGridDerived,
	resolveGridItemClass,
	resolveGridStateOptions,
	resolveGridsContainerClass,
	resolveGridsDerived,
	resolveGridsStateOptions
} from '../src/derived/grids';
import {
	appendImageListItems,
	removeImageListItemAt,
	resolveImageListAddFilesAction,
	resolveImageListAddFilesFlow,
	resolveImageListAspectRatioStyleString,
	resolveImageListAspectRatioStyleValue,
	resolveImageListAspectRatioValue,
	resolveImageListDefaultDeleteIconProps,
	resolveImageListDerived,
	resolveImageListDefaultIconProps,
	resolveImageListDefaultLoadingProps,
	resolveImageListDeleteButtonClass,
	resolveImageListDeleteFlow,
	resolveImageListFileSelection,
	resolveImageListImageClass,
	resolveImageListImageState,
	resolveImageListInitialItems,
	resolveImageListItemFromFile,
	resolveImageListItemId,
	resolveImageListItemClass,
	resolveImageListItemViewStateList,
	resolveImageListMutationAction,
	resolveImageListPendingMessageClass,
	resolveImageListPreviewCurrent,
	resolveImageListPreviewAction,
	resolveImageListPreviewButtonClass,
	resolveImageListPreviewCloseAction,
	resolveImageListPreviewContainerClass,
	resolveImageListPreviewImages,
	resolveImageListPreviewIndex,
	resolveImageListPreviewKeyboardAction,
	resolveImageListPreviewKeyboardFlow,
	resolveImageListPreviewFlow,
	resolveImageListPreviewOpenAction,
	resolveImageListRadiusClass,
	resolveImageListRevokeUrlAction,
	resolveImageListRetryButtonClass,
	resolveImageListRetryIconClass,
	resolveImageListRetryMessageClass,
	resolveImageListRootClass,
	resolveImageListShowUploadButton,
	resolveImageListStatusOverlayClass,
	resolveImageListStatusMessage,
	resolveImageListStatusState,
	resolveImageListUploadClass,
	resolveImageListUploadText,
	resolveImageListUploadTextClass
} from '../src/derived/imageList';
import {
	normalizeImagePreviewImages,
	resolveImagePreviewAlt,
	resolveImagePreviewBodyOverflowStyle,
	resolveImagePreviewClampedScale,
	resolveImagePreviewClosePositionClass,
	resolveImagePreviewCloseAction,
	resolveImagePreviewBottomBarClass,
	resolveImagePreviewCenterNextButtonClass,
	resolveImagePreviewCenterPrevButtonClass,
	resolveImagePreviewContainerClass,
	resolveImagePreviewControlState,
	resolveImagePreviewControlButtonClass,
	resolveImagePreviewControlPanelClass,
	resolveImagePreviewControlScaleParams,
	resolveImagePreviewCustomContentClass,
	resolveImagePreviewCurrentImage,
	resolveImagePreviewDerived,
	resolveImagePreviewDistance,
	resolveImagePreviewDotListClass,
	resolveImagePreviewDotClass,
	resolveImagePreviewErrorClass,
	resolveImagePreviewErrorIconClass,
	resolveImagePreviewErrorTextClass,
	resolveImagePreviewErrorVisible,
	resolveImagePreviewHasMoved,
	resolveImagePreviewImageClass,
	resolveImagePreviewImageStyleString,
	resolveImagePreviewImageStyleValue,
	resolveImagePreviewInParams,
	resolveImagePreviewInitialRendered,
	resolveImagePreviewInitialVisible,
	resolveImagePreviewIndexNumberClass,
	resolveImagePreviewItemClass,
	resolveImagePreviewItemDisplayState,
	resolveImagePreviewItemDisplayStateList,
	resolveImagePreviewLoadingClass,
	resolveImagePreviewLoadingVisible,
	resolveImagePreviewMergedIcon,
	resolveImagePreviewNextIndex,
	resolveImagePreviewNormalizedRotation,
	resolveImagePreviewOutParams,
	resolveImagePreviewOutroEndAction,
	resolveImagePreviewOverlayClass,
	resolveImagePreviewOverlayStyleString,
	resolveImagePreviewOverlayStyleValue,
	resolveImagePreviewPointerDownState,
	resolveImagePreviewPointerFlags,
	resolveImagePreviewPointerList,
	resolveImagePreviewPointerMoveState,
	resolveImagePreviewPointerUpAction,
	resolveImagePreviewPointerUpState,
	resolveImagePreviewRenderedState,
	resolveImagePreviewLoadStatusAction,
	resolveImagePreviewRotateAction,
	resolveImagePreviewRotation,
	resolveImagePreviewRotationAnimationAction,
	resolveImagePreviewRotationResetAction,
	resolveImagePreviewShouldResetRotation,
	resolveImagePreviewShouldResetScale,
	resolveImagePreviewSlideClass,
	resolveImagePreviewSlideStyleString,
	resolveImagePreviewSlideStyleValue,
	resolveImagePreviewStateOptions,
	resolveImagePreviewSwitchAction,
	resolveImagePreviewTransformResetAction,
	resolveImagePreviewVisibleResetAction,
	resolveImagePreviewSwipeDirection
} from '../src/derived/imagePreview';
import { resolveInfiniteScrollDistance, resolveInfiniteScrollShouldLoad, resolveInfiniteScrollStatus } from '../src/derived/infiniteScroll';
import {
	resolveIconAccessibility,
	resolveIconCssSizeValue,
	resolveIconDerived,
	resolveIconifyClass,
	resolveIconifyStyleString,
	resolveIconifyStyleValue,
	resolveIconInteractive,
	resolveIconKeyboardAction,
	resolveIconStateClass,
	resolveIconStateOptions,
	resolveIconSvgSizeValue,
	resolveIconSymbolClass,
	resolveIconSymbolHref,
	resolveIconSymbolStyleString,
	resolveIconSymbolStyleValue
} from '../src/derived/icon';
import {
	resolveIndexBarBarClass,
	resolveIndexBarBarStyleString,
	resolveIndexBarBarStyleValue,
	resolveIndexBarBodyClass,
	resolveIndexBarBodyStyleString,
	resolveIndexBarBodyStyleValue,
	resolveIndexBarBubbleClass,
	resolveIndexBarBubbleTransitionParams,
	resolveIndexBarChildClass,
	resolveIndexBarCurrentFromScroll,
	resolveIndexBarDerived,
	resolveIndexBarDividerClass,
	resolveIndexBarGroupClass,
	resolveIndexBarGroupHeights,
	resolveIndexBarInitialTouchState,
	resolveIndexBarItemClass,
	resolveIndexBarItemHeight,
	resolveIndexBarItemWrapperClass,
	resolveIndexBarLongSumList,
	resolveIndexBarMeasuredClientHeight,
	resolveIndexBarMeasuredClientHeights,
	resolveIndexBarMeasuredBarHeightState,
	resolveIndexBarMeasuredHeightsState,
	resolveIndexBarScrollAction,
	resolveIndexBarScrollTop,
	resolveIndexBarTitleClass,
	resolveIndexBarTouchEndAction,
	resolveIndexBarTouchIndex,
	resolveIndexBarTouchSelectAction,
	resolveIndexBarTop
} from '../src/derived/indexBar';
import {
	keyboardPreviewDotClass,
	parseStyleString,
	resolveDevicePixelRatio,
	resolveFocusableTabIndex,
	resolveHiddenScrollbarCss,
	resolveKeyboardPreviewState,
	resolveMapValue,
	resolveRandomBase36Suffix,
	resolveViewportDimension,
	resolveViewportFallbackDimension,
	toStylePropertyName
} from '../src/derived/helpers';
import {
	normalizeInputValue,
	resolveInputAutocompleteValue,
	resolveInputBaseClass,
	resolveInputClearAction,
	resolveInputClearIconClass,
	resolveInputBlurStateAction,
	resolveInputCompositionAction,
	resolveInputContentColumnClass,
	resolveInputControlClass,
	resolveInputControlRowClass,
	resolveInputControlSlotClass,
	resolveInputCurrentValue,
	resolveInputCustomWrapperClass,
	resolveInputCustomContentKeyboardAction,
	resolveInputCustomContentClass,
	resolveInputCustomContentStyleString,
	resolveInputCustomContentStyleValue,
	resolveInputDataTextClass,
	resolveInputDerived,
	resolveInputDisplayState,
	resolveInputDisplayMinHeight,
	resolveInputDurationClass,
	resolveInputEdgeContentClass,
	resolveInputFocusAction,
	resolveInputFocusClass,
	resolveInputFocusStateAction,
	resolveInputHiddenControlClass,
	resolveInputInitialValue,
	resolveInputInlineTitleClass,
	resolveInputLineTransitionClass,
	resolveInputLineTransitionStyleString,
	resolveInputLineTransitionStyleValue,
	resolveInputMode,
	resolveInputNativeReadonly,
	resolveInputNativeType,
	resolveInputOuterClass,
	resolveInputPlaceholder,
	resolveInputPyClass,
	resolveInputRadiusClass,
	resolveInputRequiredClass,
	resolveInputEdgeRowClass,
	resolveInputSelectIconClass,
	resolveInputStateOptions,
	resolveInputTextAlignClass,
	resolveInputTextareaHeightStyle,
	resolveInputTipTextClass,
	resolveInputTitleClass,
	resolveInputValueChangeAction,
	resolveInputWrapperClass
} from '../src/derived/input';
import {
	resolveListBatchActionClass,
	resolveListBatchActionGroupClass,
	resolveListBatchActionStatus,
	resolveListBatchBarClass,
	resolveListBatchCheckedIconClass,
	resolveListBatchItemSelected,
	resolveListBatchModeAction,
	resolveListBatchOffset,
	resolveListBatchSelected,
	resolveListBatchSelectClass,
	resolveListBatchTextButtonClass,
	resolveListBatchToggleText,
	resolveListBatchUncheckedIconClass,
	resolveListCloseSwipeAction,
	resolveListContentClass,
	resolveListContentLayerClass,
	resolveListDerived,
	resolveListArrowClass,
	resolveListArrowIconClass,
	resolveListInitialBatchMode,
	resolveListInitialBatchSelected,
	resolveListInitialSwiping,
	resolveListItemClickAction,
	resolveListItemButtonClass,
	resolveListItemContentClass,
	resolveListItemDisabled,
	resolveListItemKey,
	resolveListItemKeyboardAction,
	resolveListItemSwipeOffset,
	resolveListItemTransform,
	resolveListItemTransformStyleString,
	resolveListItemTransformStyleValue,
	resolveListItemsAfterLeave,
	resolveListLimitedSwipeActions,
	resolveListRenderItems,
	resolveListRootClass,
	resolveListSelectAll,
	resolveListSwipeActionButtonClass,
	resolveListSwipeActionLayerClass,
	resolveListSwipeActionTextClass,
	resolveListSwipeActive,
	resolveListSwipeEndAction,
	resolveListSwipeEndState,
	resolveListSwipeHintClass,
	resolveListSwipeHintIconClass,
	resolveListSwipeMoveState,
	resolveListSwipeStartAction,
	resolveListShowSwipeActions,
	resolveListShowSwipeHint,
	resolveListTransitionClass,
	resolveListTransitionCss,
	resolveListTransitionStyle,
	resolveListTransitionStyleString,
	resolveListTransitionStyleValue,
	resolveListWidthStyleString,
	resolveListWidthStyleValue
} from '../src/derived/list';
import {
	resolveMaskDerived,
	resolveMaskRootClass,
	resolveMaskStateOptions,
	resolveMaskTransitionParams,
	resolveMaskZIndexStyleString,
	resolveMaskZIndexStyleValue
} from '../src/derived/mask';
import {
	getLoadingSplitRingColorClass,
	getLoadingToneColorClass,
	loadingBarDelayMultipliers,
	loadingClimbingDotStepIndexes,
	loadingCornerDotIndexes,
	loadingCubeDelayMultipliers,
	loadingDiagonalDotDelayMultipliers,
	loadingDiagonalDotPositions,
	loadingDualRingDelayDivisors,
	loadingEightRadialDelayMultipliers,
	loadingElasticDotLeftPercents,
	loadingExploreLineDelayMultipliers,
	loadingFiveDotIndexes,
	loadingFourDotIndexes,
	loadingHalfFlowSections,
	loadingPulseLineIndexes,
	loadingQuarterDelayMultipliers,
	loadingRotatingLineFrames,
	loadingSixDotDelayMultipliers,
	loadingSlideDotDelayMultipliers,
	loadingThreeDotDelayMultipliers,
	loadingThreeDotIndexes,
	loadingTwoDotIndexes,
	loadingWobbleRotations,
	resolveLoadingAlphaBorderDurationStyle,
	resolveLoadingBaseAnimationStyle,
	resolveLoadingAnimationPlayState,
	resolveLoadingAnimationTargets,
	resolveLoadingAnimationDurationStyle,
	resolveLoadingIntersectionState,
	resolveLoadingBallScaleCss,
	resolveLoadingBallScaleDotClass,
	resolveLoadingOneColorBackgroundStyle,
	resolveLoadingOneColorBackgroundColorStyle,
	resolveLoadingBarGrowCss,
	resolveLoadingBorderElementClass,
	resolveLoadingBorderCapStyle,
	resolveLoadingBorderTransparentDurationStyle,
	resolveLoadingBarItemClass,
	resolveLoadingClimbingDotBallStyle,
	resolveLoadingClimbingDotCss,
	resolveLoadingClimbingDotStepClass,
	resolveLoadingClimbingDotStepRootClass,
	resolveLoadingClimbingDotStepStyle,
	resolveLoadingClippedInnerRingStyle,
	resolveLoadingClippedRingRotateCss,
	resolveLoadingClipRotatePulseCss,
	resolveLoadingCircularStretchCss,
	resolveLoadingColorDurationDelayStyle,
	resolveLoadingColorDurationStyle,
	resolveLoadingColorStyle,
	resolveLoadingComponentName,
	resolveLoadingCornerDotStyle,
	resolveLoadingCornerTravelCss,
	resolveLoadingDotFadeScaleCss,
	resolveLoadingDotPulseCss,
	resolveLoadingDotChaseScaleDotClass,
	resolveLoadingDotChaseScaleCss,
	resolveLoadingDotChaseScaleStyle,
	resolveLoadingDurationSecond,
	resolveLoadingDescendants,
	resolveLoadingDerived,
	resolveLoadingStateOptions,
	resolveLoadingDoubleRotateCss,
	resolveLoadingCubeInnerStyle,
	resolveLoadingCubeInnerClass,
	resolveLoadingCubeMorphCss,
	resolveLoadingCubeRootClass,
	resolveLoadingCubeStyle,
	resolveLoadingElasticDotClass,
	resolveLoadingElasticDotStyle,
	resolveLoadingElasticDotsCss,
	resolveLoadingExploreCenterLineStyle,
	resolveLoadingExploreLineClass,
	resolveLoadingExploreLineCss,
	resolveLoadingExploreLineStyle,
	resolveLoadingFallingDotCss,
	resolveLoadingFourColor,
	resolveLoadingFourColorBorderDurationStyle,
	resolveLoadingFourColorDurationStyle,
	resolveLoadingFourColorShapeStyle,
	resolveLoadingFourShapePositionCss,
	resolveLoadingFourShapeTranslateCss,
	resolveLoadingFourShapeTranslateStyle,
	resolveLoadingHalfTurnSwingCss,
	resolveLoadingHorizontalZoomCss,
	resolveLoadingHorizontalShuttleCss,
	resolveLoadingIndexDelayMs,
	resolveLoadingIndexedDotStyle,
	resolveLoadingThreeDotIndexedStyle,
	resolveLoadingLinePulseCss,
	resolveLoadingLineRotateCss,
	resolveLoadingLeapFrogCss,
	resolveLoadingLeapFrogTrackClass,
	resolveLoadingLayoutClass,
	resolveLoadingMidpointPulseCss,
	resolveLoadingDiagonalDotStyle,
	resolveLoadingHalfFlowStyle,
	resolveLoadingHalfFlowContainerStyle,
	resolveLoadingHalfFlowCss,
	resolveLoadingHalfFlowOverlayClass,
	resolveLoadingHalfFlowPieceClass,
	resolveLoadingHalfFlowPieceRootClass,
	resolveLoadingHalfFlowPieceStyle,
	resolveLoadingHalfFlowWrapClass,
	resolveLoadingHalfFlowWrapStyle,
	resolveLoadingLeapFrogStyle,
	resolveLoadingOrbitSliceStyle,
	resolveLoadingOrbitCarStyle,
	resolveLoadingOrbitContainerStyle,
	resolveLoadingOrbitSpinContainerStyle,
	resolveLoadingOrbitSpinCss,
	resolveLoadingOrbitSpinDotClass,
	resolveLoadingOrbitSpinDotStyle,
	resolveLoadingOrbitSpinInnerStyle,
	resolveLoadingOrbitSliceClass,
	resolveLoadingOrbitSliceRowClass,
	resolveLoadingOrbitSliceRowStyle,
	resolveLoadingOrbitalScaleCss,
	resolveLoadingPairedPendulumBarClass,
	resolveLoadingPairedPendulumCss,
	resolveLoadingPairedPendulumDotClass,
	resolveLoadingPairedPendulumDotStyle,
	resolveLoadingPulseLineRowClass,
	resolveLoadingPulseLineTransformStyle,
	resolveLoadingPulseLineClass,
	resolveLoadingRadialDotRowClass,
	resolveLoadingRadialEightTransformStyle,
	resolveLoadingRadialDotStyle,
	resolveLoadingRadialLineStyle,
	resolveLoadingRadialOscillateCss,
	resolveLoadingRoundDotClass,
	resolveLoadingPulseScaleCss,
	resolveLoadingRadialDotPulseCss,
	resolveLoadingRotateScaleCss,
	resolveLoadingRotatingLineStyle,
	resolveLoadingRotatingLineClass,
	resolveLoadingRoundedElementClass,
	resolveLoadingSizeClass,
	resolveLoadingShapeContainerClass,
	resolveLoadingShapeContainerStyle,
	resolveLoadingShapePieceClass,
	resolveLoadingSquareSwapCss,
	resolveLoadingSquareSwapDotClass,
	resolveLoadingStreamCss,
	resolveLoadingStreamTrackClass,
	resolveLoadingStrokeTravelCss,
	resolveLoadingStrokeTravelFadeCss,
	resolveLoadingSvgStrokeClass,
	resolveLoadingSpinnerSvgClass,
	resolveLoadingStretchSvgClass,
	resolveLoadingSwingDotStyle,
	resolveLoadingSwingLineClass,
	resolveLoadingSwingLineStyle,
	resolveLoadingThreeDotPulseRowClass,
	resolveLoadingThreeDotPulseCss,
	resolveLoadingTimedStyle,
	resolveLoadingTrackBarClass,
	resolveLoadingTrackOverlayClass,
	resolveLoadingTrackShellStyle,
	resolveLoadingTwoDotElasticCss,
	resolveLoadingTwoDotElasticDotClass,
	resolveLoadingOneColorBaseStyle,
	resolveLoadingOneColorBorderBaseStyle,
	resolveLoadingOneColorBorderSlowStyle,
	resolveLoadingOneColorClassState,
	resolveLoadingOneColorColorStyle,
	resolveLoadingOneColorShapeStyle,
	resolveLoadingOneColorSlowStyle,
	resolveLoadingOneColorStrokeBaseStyle,
	resolveLoadingOneColorStrokeSlowStyle,
	resolveLoadingOneColorStrokeStyle,
	resolveLoadingOneColorStrokeTravelStyle,
	resolveLoadingOneColorSvgSpinStyle,
	resolveLoadingTwoColorShapeStyle,
	resolveLoadingVerticalJumpCss,
	resolveLoadingVerticalJumpRowClass,
	resolveLoadingWobbleDotStyle,
	resolveLoadingWobbleCss,
	resolveLoadingWobbleContainerStyle,
	resolveLoadingWobbleRotationClass,
	resolveLoadingWobbleRotationStyle,
	resolveLoadingTwoColorBorderDurationStyle,
	resolveLoadingTwoColorClassState,
	resolveLoadingTwoColorSolidBorderDurationStyle,
	resolveLoadingTwoColorSolidBorderStyle,
	resolveLoadingTwoColorTransparentBorderDurationStyle,
	resolveLoadingTwoColorTransparentBorderStyle,
	loadingLeapFrogOffsets,
	loadingOrbitSliceIndexes,
	loadingRadialDotDelayMultipliers,
	loadingSwingDotOpacities
} from '../src/derived/loading';
import {
	resolveNoticeBarAnimationSetupAction,
	resolveNoticeBarCloseDelayState,
	resolveNoticeBarCloseRequestAction,
	resolveNoticeBarDerived,
	resolveNoticeBarDurationClass,
	resolveNoticeBarHeightStyleString,
	resolveNoticeBarHeightStyleValue,
	resolveNoticeBarHorizontalItemClass,
	resolveNoticeBarHorizontalItemStyleString,
	resolveNoticeBarHorizontalItemStyleValue,
	resolveNoticeBarHorizontalStepAction,
	resolveNoticeBarHorizontalTrackClass,
	resolveNoticeBarHorizontalTrackStyleString,
	resolveNoticeBarHorizontalTrackStyleValue,
	resolveNoticeBarHorizontalViewportClass,
	resolveNoticeBarArrowIconClass,
	resolveNoticeBarIconClass,
	resolveNoticeBarLeftIconState,
	resolveNoticeBarLoopTextList,
	resolveNoticeBarMeasuredRect,
	resolveNoticeBarMeasuredRectVisible,
	resolveNoticeBarNextLeft,
	resolveNoticeBarNextVerticalIndex,
	resolveNoticeBarRadiusClass,
	resolveNoticeBarRightButtonClass,
	resolveNoticeBarRightAction,
	resolveNoticeBarRightIconState,
	resolveNoticeBarRootClass,
	resolveNoticeBarStateOptions,
	resolveNoticeBarTextListValidation,
	resolveNoticeBarVerticalStepAction,
	resolveNoticeBarVerticalInnerClass,
	resolveNoticeBarVerticalItemClass,
	resolveNoticeBarVerticalItemStyle,
	resolveNoticeBarVerticalItemStyleString,
	resolveNoticeBarVerticalItemStyleValue,
	resolveNoticeBarVerticalViewportClass,
	resolveNoticeBarVerticalTextList,
	shouldUseNoticeBarStaticTextList
} from '../src/derived/noticeBar';
import {
	resolveModalCloseAction,
	resolveModalConfirmAction,
	resolveModalContentClass,
	resolveModalContentState,
	resolveModalDerived,
	resolveModalInitialVisible,
	resolveModalPopupDefaults,
	resolveModalPopupProps,
	resolveModalStateOptions,
	resolveModalTexts,
	resolveModalTitleClass
} from '../src/derived/modal';
import {
	resolveNavBarBackSvgClass,
	resolveNavBarContainerClass,
	resolveNavBarDerived,
	resolveNavBarIconSize,
	resolveNavBarLeftButtonClass,
	resolveNavBarLeftState,
	resolveNavBarRightButtonClass,
	resolveNavBarRightWrapClass,
	resolveNavBarSpacerClass,
	resolveNavBarStateOptions,
	resolveNavBarTitle,
	resolveNavBarTitleAlignClass,
	resolveNavBarTitleWrapClass
} from '../src/derived/navBar';
import {
	resolveNumKeyboardDoneKeyClass,
	resolveNumKeyboardDoneText,
	resolveNumKeyboardCloseAction,
	resolveNumKeyboardCloseEmissionAction,
	resolveNumKeyboardDerived,
	resolveNumKeyboardGridClass,
	resolveNumKeyboardHeight,
	resolveNumKeyboardInitialValue,
	resolveNumKeyboardInitialVisible,
	resolveNumKeyboardKeyAction,
	resolveNumKeyboardKeyFlow,
	resolveNumKeyboardKeyClass,
	resolveNumKeyboardNextValue,
	resolveNumKeyboardPanelClass,
	resolveNumKeyboardPreviewClass,
	resolveNumKeyboardPopupProps,
	resolveNumKeyboardRows,
	resolveNumKeyboardShowCloseKey,
	resolveNumKeyboardStateOptions,
	resolveNumKeyboardSvgClass,
	resolveNumKeyboardUsePopup,
	resolveNumKeyboardVisibleChangeAction,
	resolveNumKeyboardZeroColClass,
	resolveNumKeyboardZeroKeyClass
} from '../src/derived/numKeyboard';
import {
	resolvePaginationAllPages,
	resolvePaginationBgClass,
	resolvePaginationDerived,
	resolvePaginationEllipsisToggleAction,
	resolvePaginationIconClass,
	resolvePaginationLeadingPages,
	resolvePaginationMiddlePageActive,
	resolvePaginationMiddlePages,
	resolvePaginationMutedIconClass,
	resolvePaginationNavButtonClass,
	resolvePaginationNavigateAction,
	resolvePaginationNextEllipsisPages,
	resolvePaginationNextOmitSyncAction,
	resolvePaginationPageClass,
	resolvePaginationPreEllipsisPages,
	resolvePaginationRadiusClass,
	resolvePaginationRootClass,
	resolvePaginationSecondPageArrowClass,
	resolvePaginationSecondPageContainerClass,
	resolvePaginationSecondPageContentClass,
	resolvePaginationSecondPageDerived,
	resolvePaginationSecondPageGridStyleString,
	resolvePaginationSecondPageGridStyleValue,
	resolvePaginationSecondPageStateOptions,
	resolvePaginationSecondPageStyleString,
	resolvePaginationSecondPageStyleValue,
	resolvePaginationShowNextEllipsis,
	resolvePaginationShowPreEllipsis,
	resolvePaginationSelectAction,
	resolvePaginationStateOptions,
	resolvePaginationTextClass,
	resolvePaginationTexts,
	resolvePaginationTotalPage,
	resolvePaginationTrailingPages
} from '../src/derived/pagination';
import {
	resolvePickerAllLevelData,
	resolvePickerCancelAction,
	resolvePickerCancelButtonClass,
	resolvePickerCloseAction,
	resolvePickerColumnRootClass,
	resolvePickerColumnStyleString,
	resolvePickerColumnStyleValue,
	resolvePickerConfirmButtonClass,
	resolvePickerConfirmAction,
	resolvePickerContentClass,
	resolvePickerContentStyleString,
	resolvePickerContentStyleValue,
	resolvePickerCurrentItems,
	resolvePickerCurrentLabel,
	resolvePickerCurrentSelection,
	resolvePickerDatasColumnData,
	resolvePickerDerived,
	resolvePickerInitialVisible,
	resolvePickerInitialState,
	resolvePickerInlineHeight,
	resolvePickerInlineHeightStyleString,
	resolvePickerInlineHeightStyleValue,
	resolvePickerLinkageScrollState,
	resolvePickerLinkageDatas,
	resolvePickerMaxShowRows,
	resolvePickerHeaderClass,
	resolvePickerMultipleButtonClass,
	resolvePickerMultipleInactiveIconClass,
	resolvePickerMultipleRemoveAction,
	resolvePickerMultipleNextSelected,
	resolvePickerMultipleSelected,
	resolvePickerMultipleSelectionState,
	resolvePickerMultipleToggleAction,
	removePickerMultipleSelectedAt,
	resolvePickerMultipleTagsClass,
	resolvePickerPopupConfig,
	resolvePickerSelectionForEmit,
	resolvePickerShowRows,
	resolvePickerStateOptions,
	resolvePickerTexts,
	resolvePickerTransitionDistance,
	resolvePickerUsePopup
} from '../src/derived/picker';
import {
	resolvePlaceholderHeightClass,
	resolvePlaceholderDerived,
	resolvePlaceholderPyClass,
	resolvePlaceholderRadiusClass,
	resolvePlaceholderRootClass,
	resolvePlaceholderShadowClass,
	resolvePlaceholderStateOptions
} from '../src/derived/placeholder';
import { resolveConditionalProps, splitButtonCallbacks, splitPopupCallbacks, splitTabCallbacks } from '../src/derived/props';
import {
	resolveSignatureButtonRowClass,
	resolveSignatureCanvasClass,
	resolveSignatureCanvasContainerClass,
	resolveSignatureCanvasDrawOptions,
	resolveSignatureCanvasSetupState,
	resolveSignatureCanvasSize,
	resolveSignatureClearAction,
	resolveSignatureClearPlan,
	resolveSignatureContainerStyleString,
	resolveSignatureContainerStyleValue,
	resolveSignatureDerived,
	resolveSignatureEmpty,
	resolveSignatureExportPlan,
	resolveSignatureImageParams,
	resolveSignatureMeasuredSize,
	resolveSignaturePointerDownAction,
	resolveSignaturePointerMoveAction,
	resolveSignaturePointerPosition,
	resolveSignaturePointerUpAction,
	resolveSignatureResult,
	resolveSignatureRootClass,
	resolveSignatureRotatedCanvasSize,
	resolveSignatureRotationRadians,
	resolveSignatureStateOptions,
	resolveSignatureTexts
} from '../src/derived/signature';
import {
	resolvePopupActualRadiusPosition,
	resolvePopupCloseAction,
	resolvePopupDerived,
	resolvePopupMaskClickAction,
	resolvePopupMaskClickFlow,
	resolvePopupMotionParams,
	resolvePopupPanelClass,
	resolvePopupRadiusClass,
	resolvePopupRenderEndAction,
	resolvePopupRenderState,
	resolvePopupScrollbarCss,
	resolvePopupSizeStyleString,
	resolvePopupSizeStyleValue,
	resolvePopupStateOptions,
	resolvePopupTransitionClass,
	resolvePopupTransitionDistance,
	resolvePopupTransitionDerived,
	resolvePopupTransitionName,
	resolvePopupTransitionParams,
	resolvePopupTransitionStateOptions,
	resolvePopupViewportSize,
	resolvePopupWrapperClass,
	resolvePopupWrapperStyleString,
	resolvePopupWrapperStyleValue
} from '../src/derived/popup';
import {
	formatProgressPercentText,
	resolveProgressBarClass,
	resolveProgressBarStyleString,
	resolveProgressBarStyleValue,
	resolveProgressBlockLabelClass,
	resolveProgressBlockLabelStyleString,
	resolveProgressBlockLabelStyleValue,
	resolveProgressDerived,
	resolveProgressDurationClass,
	resolveProgressFillClass,
	resolveProgressHeightClass,
	resolveProgressInnerTextClass,
	resolveProgressLabelPlacement,
	resolveProgressLabelState,
	resolveProgressPercentStyleValue,
	resolveProgressRadiusClass,
	resolveProgressRightLabelClass,
	resolveProgressRootClass,
	resolveProgressStateOptions,
	resolveProgressTrackClass
} from '../src/derived/progress';
import {
	resolvePullRefreshDistance,
	resolvePullRefreshGestureIntent,
	resolvePullRefreshReleaseAction,
	resolvePullRefreshStatus
} from '../src/derived/pullRefresh';
import {
	formatProgressLoopPercentText,
	progressLoopDefaultGradientId,
	resolveProgressLoopBarClass,
	resolveProgressLoopCircleLength,
	resolveProgressLoopDashOffset,
	resolveProgressLoopDerived,
	resolveProgressLoopDurationClass,
	resolveProgressLoopGradientId,
	resolveProgressLoopGradientIdSuffix,
	resolveProgressLoopGradientStopStyles,
	resolveProgressLoopGradientStopStyleString,
	resolveProgressLoopGradientStopStyleValue,
	resolveProgressLoopGradientStops,
	resolveProgressLoopHasGradient,
	resolveProgressLoopLabelClass,
	resolveProgressLoopLineCap,
	resolveProgressLoopPercentTextClass,
	resolveProgressLoopRadius,
	resolveProgressLoopRootClass,
	resolveProgressLoopStrokeValue,
	resolveProgressLoopStateOptions,
	resolveProgressLoopSvgClass,
	resolveProgressLoopTrackClass
} from '../src/derived/progressLoop';
import {
	getStepperDecreaseValue,
	getStepperIncreaseValue,
	resolveStepperButtonClass,
	resolveStepperButtonToneClass,
	resolveStepperCanDecrease,
	resolveStepperCanIncrease,
	resolveStepperDecreaseDisabled,
	resolveStepperDerived,
	resolveStepperDisabledIconClass,
	resolveStepperDisplayValue,
	resolveStepperIconClass,
	resolveStepperInitialValue,
	resolveStepperIncreaseDisabled,
	resolveStepperLoadingClass,
	resolveStepperNumberClass,
	resolveStepperNumberToneClass,
	resolveStepperRadiusClass,
	resolveStepperRootClass,
	resolveStepperStateOptions,
	resolveStepperStepAction,
	resolveStepperWidthStyleString,
	resolveStepperWidthStyleValue
} from '../src/derived/stepper';
import {
	resolveSliderAbsoluteStepMarkerStyleString,
	resolveSliderAbsoluteStepMarkerStyleValue,
	resolveSliderActiveStepMarkerClass,
	resolveSliderBlockClass,
	resolveSliderBlockLayerClass,
	resolveSliderBlockTransformStyleString,
	resolveSliderBlockTransformStyleValue,
	resolveSliderBreakMarkerClass,
	resolveSliderBreakProgressOverlayClass,
	resolveSliderBreakProgressMarkerClass,
	resolveSliderBreakProgressSegmentClass,
	resolveSliderBreakRootClass,
	resolveSliderBreakSegmentClass,
	resolveSliderBreakStepMarkerStyleString,
	resolveSliderBreakStepMarkerStyleValue,
	resolveSliderChangePayload,
	resolveSliderContinuousTrackClass,
	resolveSliderDerived,
	resolveSliderEndPositions,
	resolveSliderInitialEndValue,
	resolveSliderInitialStartValue,
	resolveSliderInitialValue,
	resolveSliderMeasuredBlockWidth,
	resolveSliderLineClass,
	resolveSliderMeasuredLayoutState,
	resolveSliderPointerMoveAction,
	resolveSliderPointerStartAction,
	resolveSliderPositionSyncAction,
	resolveSliderProgressClass,
	resolveSliderRangeMoveState,
	resolveSliderRangeStartState,
	resolveSliderRangeTrackStyle,
	resolveSliderRangeTrackStyleString,
	resolveSliderRangeTrackStyleValue,
	resolveSliderRootClass,
	resolveSliderSegmentProgressClass,
	resolveSliderSegmentProgressStyleString,
	resolveSliderSegmentProgressStyleValue,
	resolveSliderSegmentProgressWidth,
	resolveSliderSegmentRangeClass,
	resolveSliderSegmentRangeStyleString,
	resolveSliderSegmentRangeStyleValue,
	resolveSliderSegmentRangeStyle,
	resolveSliderSingleMoveState,
	resolveSliderSingleStartState,
	resolveSliderSingleTrackStyleString,
	resolveSliderSingleTrackStyleValue,
	resolveSliderSingleTrackWidth,
	resolveSliderSize,
	resolveSliderStateOptions,
	resolveSliderStepMarkerClass,
	resolveSliderStepActive,
	resolveSliderStepActiveBgClass,
	resolveSliderStepLabel,
	resolveSliderStepPositions,
	resolveSliderPositionedTipClass,
	resolveSliderTipAnchorClass,
	resolveSliderTipArrowClass,
	resolveSliderTipBubbleClass,
	resolveSliderTipClass,
	resolveSliderTipInParams,
	resolveSliderTipOutParams,
	resolveSliderTipVisible,
	resolveSliderTrackClass,
	resolveSliderValuePercent
} from '../src/derived/slider';
import {
	resolveTabAutoScroll,
	resolveTabAutoScrollAction,
	resolveTabButtonClass,
	resolveTabButtonRenderState,
	resolveTabClickAction,
	resolveTabDerived,
	resolveTabIconClass,
	resolveTabIndicatorClass,
	resolveTabIndicatorStyleString,
	resolveTabIndicatorStyleValue,
	resolveTabLineActive,
	resolveTabLineClass,
	resolveTabMeasuredSize,
	resolveTabMeasuredSizeState,
	resolveTabMetrics,
	resolveTabOverflowIndicatorStyleString,
	resolveTabOverflowIndicatorStyleValue,
	resolveTabOverflowListClass,
	resolveTabOverflowMetrics,
	resolveTabRootClass,
	resolveTabShowIndexes,
	resolveTabTextClass,
	resolveTabWidthStyleString,
	resolveTabWidthStyleValue,
	resolveTabsClickAction,
	resolveTabsDerived,
	resolveTabsHorizontal,
	resolveTabsLabelCount,
	resolveTabsMeasuredClientWidth,
	resolveTabsPositionState,
	resolveTabsShowTransitionViewport,
	resolveTabsStateOptions,
	resolveTabStateOptions,
	resolveTabsTransitionClass,
	resolveTabsTransitionMetrics,
	resolveTabsTransitionStyleString,
	resolveTabsTransitionStyleValue,
	resolveTabsVerticalContentClass,
	resolveTabsVerticalRootClass,
	resolveTabsViewportClass
} from '../src/derived/tabs';
import {
	resolveTabBarButtonClass,
	resolveTabBarClickAction,
	resolveTabBarDerived,
	resolveTabBarIconPair,
	resolveTabBarIconProps,
	resolveTabBarIndicatorMetrics,
	resolveTabBarIndicatorStyleString,
	resolveTabBarItemDerived,
	resolveTabBarItemDerivedList,
	resolveTabBarListClass,
	resolveTabBarMeasuredClientWidth,
	resolveTabBarRootStyleString,
	resolveTabBarRootStyleValue,
	resolveTabBarStateOptions,
	resolveTabBarTextClass
} from '../src/derived/tabBar';
import { resolveTabContentClass } from '../src/derived/tabContent';
import {
	resolveSwiperAutoplayGuardAction,
	resolveSwiperAutoplayTickAction,
	resolveSwiperContainerStyleString,
	resolveSwiperContainerStyleValue,
	resolveSwiperContainerClass,
	resolveSwiperContentClass,
	resolveSwiperDerived,
	resolveSwiperDragPercent,
	resolveSwiperHeight,
	resolveSwiperImageClass,
	resolveSwiperInitialActive,
	resolveSwiperInitialIndicator,
	resolveSwiperInitialStateAction,
	resolveSwiperIndicatorContainerClass,
	resolveSwiperIndicatorItemClass,
	resolveSwiperIndicatorRadiusClass,
	resolveSwiperItemClass,
	resolveSwiperItemContentState,
	resolveSwiperItemStyleString,
	resolveSwiperItemStyleValue,
	resolveSwiperItemViewStateList,
	resolveSwiperLongLineClass,
	resolveSwiperLongLineDuration,
	resolveSwiperLongLineResetAction,
	resolveSwiperLoopItems,
	resolveSwiperLoopRenderItems,
	resolveSwiperLoopResetTransition,
	resolveSwiperPointerDownAction,
	resolveSwiperPointerMoveAction,
	resolveSwiperPointerMoveDistance,
	resolveSwiperPointerEndDirection,
	resolveSwiperPointerUpAction,
	resolveSwiperRadiusClass,
	resolveSwiperRotate,
	resolveSwiperShouldAutoplay,
	resolveSwiperSlideState,
	resolveSwiperItemButtonClass,
	resolveSwiperRootClass,
	resolveSwiperTransformString,
	resolveSwiperTransitionDurationStyleString,
	resolveSwiperTransitionDurationStyleValue,
	resolveSwiperTranslateX,
	resolveSwiperTranslateZ,
	resolveSwiperWidth,
	resolveSwiperZIndex
} from '../src/derived/swiper';
import {
	resolveSwitchActiveSyncAction,
	resolveSwitchClickAction,
	resolveSwitchContentVisibilityClass,
	resolveSwitchDerived,
	resolveSwitchInsideArrayValue,
	resolveSwitchInsideState,
	resolveSwitchLoadingClass,
	resolveSwitchNextActive,
	resolveSwitchRadiusClass,
	resolveSwitchRootClass,
	resolveSwitchShouldToggle,
	resolveSwitchStateFalseMarkClass,
	resolveSwitchStateOptions,
	resolveSwitchStateIconClasses,
	resolveSwitchStateTrueMarkClass,
	resolveSwitchStretchAction,
	resolveSwitchStretchFlow,
	resolveSwitchStretchResetAction,
	resolveSwitchThumbClass,
	resolveSwitchThumbLeft,
	resolveSwitchThumbStyle,
	resolveSwitchThumbStyleString,
	resolveSwitchThumbTransform
} from '../src/derived/switch';
import {
	getRateNextValue,
	rateQuadrantIndexes,
	resolveRateActive,
	resolveRateButtonClass,
	resolveRateButtonStyleString,
	resolveRateButtonStyleValue,
	resolveRateCanInteract,
	resolveRateClickAction,
	resolveRateDerived,
	resolveRateInitialValue,
	resolveRateItems,
	resolveRateQuadrantClass,
	resolveRateQuadrantStyleString,
	resolveRateQuadrantStyleValue,
	resolveRateRootClass,
	resolveRateScaleClass,
	resolveRateStarSvgClass,
	resolveRateStarTransform,
	resolveRateStarTransformStyleString,
	resolveRateStarTransformStyleValue,
	resolveRateStateOptions,
	resolveRateValidationErrors
} from '../src/derived/rate';
import {
	resolveRadioClickAction,
	resolveRadioDerived,
	resolveRadioInitialValue,
	resolveRadioItemChecked,
	resolveRadioItemStates,
	resolveRadioNextValue,
	resolveRadioStateOptions
} from '../src/derived/radio';
import {
	resolveScrollRadioAlignClass,
	resolveScrollRadioDerived,
	resolveScrollRadioBottomMaskClass,
	resolveScrollRadioHighlightClass,
	resolveScrollRadioIndexFromScrollTop,
	resolveScrollRadioItemClass,
	resolveScrollRadioItemHeight,
	resolveScrollRadioItemHeightStyleString,
	resolveScrollRadioItemHeightStyleValue,
	resolveScrollRadioLabelClass,
	resolveScrollRadioMaskHeight,
	resolveScrollRadioMaskHeightStyleString,
	resolveScrollRadioMaskHeightStyleValue,
	resolveScrollRadioMaskLayerClass,
	resolveScrollRadioPaddedData,
	resolveScrollRadioRootClass,
	resolveScrollRadioScrollAction,
	resolveScrollRadioScrollClass,
	resolveScrollRadioScrollTop,
	resolveScrollRadioShowRows,
	resolveScrollRadioStateOptions,
	resolveScrollRadioTopMaskClass,
	resolveScrollRadioWrapperHeight,
	resolveScrollRadioWrapperHeightStyleString,
	resolveScrollRadioWrapperHeightStyleValue
} from '../src/derived/scrollRadio';
import {
	resolveSelectionCheckedIconClass,
	resolveSelectionCheckedSvgClass,
	resolveSelectionCustomIconProps,
	resolveSelectionDividerClass,
	resolveSelectionDividerVisible,
	resolveSelectionGroupClass,
	resolveSelectionIconState,
	resolveSelectionItemClass,
	resolveSelectionItemDerived,
	resolveSelectionItemRenderState,
	resolveSelectionLeadingLabelClass,
	resolveSelectionLeadingLabelVisible,
	resolveSelectionTrailingLabelClass,
	resolveSelectionTrailingLabelVisible,
	resolveSelectionUncheckedIconClass,
	resolveSelectionUncheckedSvgClass
} from '../src/derived/selection';
import {
	resolveSkeletonAnimationCss,
	resolveSkeletonClasses,
	resolveSkeletonDerived,
	resolveSkeletonDisplayState,
	resolveSkeletonIconRatioStyle,
	resolveSkeletonIconRatioStyleString,
	resolveSkeletonIconRatioStyleValue,
	resolveSkeletonIconSvgClass,
	resolveSkeletonIconWrapClass,
	resolveSkeletonParagraphClass,
	resolveSkeletonParagraphLineCount,
	resolveSkeletonParagraphLineIndexes,
	resolveSkeletonRandomLineClass,
	resolveSkeletonRandomValue,
	resolveSkeletonRandomWidthClass,
	resolveSkeletonStateOptions
} from '../src/derived/skeleton';
import {
	resolveStepsBar,
	resolveStepsBarClass,
	resolveStepsBarContentState,
	resolveStepsBarIconClass,
	resolveStepsBarImageClass,
	resolveStepsBarTextClass,
	resolveStepsBarToneClass,
	resolveStepsBarWrapperClass,
	resolveStepsCompleted,
	resolveStepsContentClass,
	resolveStepsDesc,
	resolveStepsDescClass,
	resolveStepsDerived,
	resolveStepsDotStyleValue,
	resolveStepsHasBar,
	resolveStepsHorizontalItemClass,
	resolveStepsHorizontalRootClass,
	resolveStepsIconBoxStyleValue,
	resolveStepsIconBoxStyleString,
	resolveStepsIconContent,
	resolveStepsIconRenderProps,
	resolveStepsInject,
	resolveStepsItemDerived,
	resolveStepsItemLineClass,
	resolveStepsItemLineStyleString,
	resolveStepsItemLineStyleValue,
	resolveStepsItemViewStateList,
	resolveStepsItemsDerived,
	resolveStepsLineAxisClass,
	resolveStepsLineClass,
	resolveStepsLinePositionedClass,
	resolveStepsLineStyleString,
	resolveStepsLineStyleValue,
	resolveStepsMeasuredClientHeights,
	resolveStepsMeasuredClientWidth,
	resolveStepsMeasuredHeightItemState,
	resolveStepsMeasuredHeightsState,
	resolveStepsMeasuredWidthState,
	resolveStepsRadiusClass,
	resolveStepsStateOptions,
	resolveStepsStyleString,
	resolveStepsTitle,
	resolveStepsTitleClass,
	resolveStepsTypedBar,
	resolveStepsVerticalItemClass,
	resolveStepsVerticalRootClass
} from '../src/derived/steps';
import {
	resolveTagClasses,
	resolveTagClickAction,
	resolveTagCloseAction,
	resolveTagContentState,
	resolveTagDerived,
	resolveTagKeyboardAction,
	resolveTagStateOptions
} from '../src/derived/tag';
import {
	createTimePickerRangeData,
	formatTimePickerValue,
	getTimePickerDayCount,
	padTimePickerValue,
	resolveTimePickerCancelAction,
	resolveTimePickerCancelButtonClass,
	resolveTimePickerCloseAction,
	resolveTimePickerColumnRootClass,
	resolveTimePickerColumnStyleString,
	resolveTimePickerColumnStyleValue,
	resolveTimePickerConfirmButtonClass,
	resolveTimePickerConfirmAction,
	resolveTimePickerConfirmValue,
	resolveTimePickerContentClass,
	resolveTimePickerContentStyleString,
	resolveTimePickerContentStyleValue,
	resolveTimePickerColumnVisibility,
	resolveTimePickerDayColumnRefresh,
	resolveTimePickerDayData,
	resolveTimePickerDefaultOutFormat,
	resolveTimePickerDerived,
	resolveTimePickerHourData,
	resolveTimePickerHeaderClass,
	resolveTimePickerInitialVisible,
	resolveTimePickerInitialIndex,
	resolveTimePickerInlineHeight,
	resolveTimePickerInlineHeightStyleString,
	resolveTimePickerInlineHeightStyleValue,
	resolveTimePickerMaxShowRows,
	resolveTimePickerMinuteData,
	resolveTimePickerMonthScrollAction,
	resolveTimePickerMonthData,
	resolveTimePickerNowSnapshot,
	resolveTimePickerPopupConfig,
	resolveTimePickerSafeIndex,
	resolveTimePickerSecondData,
	resolveTimePickerSelectedDayData,
	resolveTimePickerStateOptions,
	resolveTimePickerTexts,
	resolveTimePickerTipItemClass,
	resolveTimePickerTipColumnStyleString,
	resolveTimePickerTipColumnStyleValue,
	resolveTimePickerTipsClass,
	resolveTimePickerTransitionDistance,
	resolveTimePickerType,
	resolveTimePickerUsePopup,
	resolveTimePickerYearScrollAction,
	resolveTimePickerYearData
} from '../src/derived/timePicker';
import {
	resolveTooltipArrowClass,
	resolveTooltipDelayAction,
	resolveTooltipDerived,
	resolveTooltipHideCommitAction,
	resolveTooltipHideFlow,
	resolveTooltipHideForViewportAction,
	resolveTooltipInitialVisible,
	resolveTooltipInParams,
	resolveTooltipOutParams,
	resolveTooltipPanelClass,
	resolveTooltipPanelStyleString,
	resolveTooltipPanelStyleValue,
	resolveTooltipPosition,
	resolveTooltipRestoreFromViewportAction,
	resolveTooltipRadiusClass,
	resolveTooltipShowCommitAction,
	resolveTooltipShowFlow,
	resolveTooltipShowAction,
	resolveTooltipShouldBindGlobalListeners,
	resolveTooltipShouldHideForViewport,
	resolveTooltipShouldRestoreFromViewport,
	resolveTooltipStateOptions,
	resolveTooltipToggleAction,
	resolveTooltipTriggerClass,
	resolveTooltipTriggerInViewport,
	resolveTooltipVisibleSyncAction,
	resolveTooltipViewportAction,
	resolveTooltipWrapperClass
} from '../src/derived/tooltip';
import {
	normalizeTransitionBaseTransform,
	resolveFlyOutFrame,
	resolveFlyTransitionFrame,
	resolveTransitionDurationWithDelay,
	resolveTransitionProgress,
	resolveTransitionTickProgress
} from '../src/derived/transition';
import {
	resolveToastContainerClass,
	resolveToastContainerStyleString,
	resolveToastContainerStyleValue,
	resolveToastContentClass,
	resolveToastAutoCloseAction,
	resolveToastDerived,
	resolveToastInitialRendered,
	resolveToastIconFrameState,
	resolveToastOutroEndAction,
	resolveToastRadiusClass,
	resolveToastRenderAction,
	resolveToastRenderedState,
	resolveToastShouldAutoClose,
	resolveToastShouldUnmountImmediately,
	resolveToastIconState,
	resolveToastStateOptions,
	resolveToastTransitionParams,
	resolveToastTransitionClass,
	resolveToastTypeIcon,
	resolveToastVisibilityFlow
} from '../src/derived/toast';
import {
	accordionArrowRightSvg,
	arrowRightSvg,
	avatarGroupUserSvg,
	avatarUserSvg,
	builtInIconGalleryList,
	builtInIconLibraryLabelMap,
	builtInIconLibraryList,
	checkboxCheckedSvg,
	checkboxUncheckedSvg,
	closePlainSvg,
	defaultBuiltInIconLibrary,
	getNumKeyboardSvgSize,
	getSvgRenderableNodes,
	imageLineSvg,
	loadingOneColor0Svg,
	loadingOneColor22Svg,
	loadingOneColor24Svg,
	loadingOneColor25Svg,
	loadingOneColor26Svg,
	loadingOneColor36Svg,
	loadingOneColor37Svg,
	loadingOneColor38Svg,
	numKeyboardCloseSvg,
	numKeyboardDeleteSvg,
	progressLoopSvg,
	radioCheckedSvg,
	radioUncheckedSvg,
	rateStarSvg,
	reiconBuiltInIconSet,
	refreshSvg,
	resolveBuiltInIconSet,
	resolveBuiltInSvg,
	resolveBuiltInSvgFromData,
	resolveSkeletonSvgByType,
	resolveSkeletonSvg,
	resolveSvgNodeKey,
	resolveSvgNodeType,
	resolveSvgRootAttrs,
	resolveStatusSvgByType,
	resolveToastSvgByType,
	skeletonSvgByType,
	statusSvgByType,
	tagCloseSvg,
	toastSvgByType
} from '../src/svg';
import { fullKeyboardShiftSvg } from '../src/svg/fullKeyboard';

describe('resolveTagClasses', () => {
	test('returns the default tag classes', () => {
		expect(resolveTagClasses()).toEqual({
			fillClass: 'bg-primary dark:bg-dark text-white dark:text-black',
			radiusClass: 'rounded-sm',
			disabledClass: 'cursor-pointer',
			rootClass:
				'inline-flex items-center whitespace-nowrap text-sm px-2 py-0.5 bg-primary dark:bg-dark text-white dark:text-black rounded-sm cursor-pointer',
			closeClass: 'w-3.5 h-3.5 ml-1 shrink-0',
			closeButtonClass: 'w-3.5 h-3.5 ml-1 shrink-0 inline-flex items-center justify-center border-0 bg-transparent p-0',
			closeIconClass: 'h-full w-full'
		});
	});

	test('resolves line mark disabled classes without losing injected classes', () => {
		const classes = resolveTagClasses({
			state: 'warning',
			fill: 'line',
			size: 'lg',
			mark: true,
			disabled: true,
			injClass: 'custom-tag'
		});

		expect(classes.fillClass).toBe('border border-warning text-warning bg-transparent');
		expect(classes.radiusClass).toBe('rounded-l-none rounded-r-full');
		expect(classes.disabledClass).toBe('opacity-50 cursor-not-allowed');
		expect(classes.rootClass).toContain('text-base px-2.5 py-1');
		expect(classes.rootClass).toContain('custom-tag');
		expect(classes.closeClass).toBe('w-4 h-4 ml-1.5 shrink-0');
		expect(classes.closeButtonClass).toBe('w-4 h-4 ml-1.5 shrink-0 inline-flex items-center justify-center border-0 bg-transparent p-0');
		expect(classes.closeIconClass).toBe('h-full w-full');
		expect(resolveTagClickAction({ disabled: false })).toEqual({ shouldEmit: true });
		expect(resolveTagClickAction({ disabled: true })).toEqual({ shouldEmit: false });
		expect(resolveTagCloseAction({ disabled: true })).toEqual({ shouldEmit: false });
		expect(resolveTagContentState({ text: 'Tag', closable: true })).toEqual({
			showClose: true,
			showCustomContent: false,
			showText: true
		});
		expect(resolveTagContentState({ text: 'Tag', hasCustomContent: true })).toEqual({
			showClose: false,
			showCustomContent: true,
			showText: false
		});
		const tagOptions = resolveTagStateOptions({
			props: { text: 'Tag', closable: true, disabled: true },
			hasCustomContent: false
		});
		expect(tagOptions).toMatchObject({ text: 'Tag', closable: true, disabled: true, hasCustomContent: false });
		expect(resolveTagDerived(tagOptions)).toMatchObject({
			contentState: {
				showClose: true,
				showCustomContent: false,
				showText: true
			},
			focusableTabIndex: -1
		});
		expect(resolveTagKeyboardAction({ key: 'Enter', disabled: false })).toEqual({
			isActivationKey: true,
			shouldEmit: true
		});
		expect(resolveTagKeyboardAction({ key: 'Enter', disabled: true })).toEqual({
			isActivationKey: true,
			shouldEmit: false
		});
		expect(resolveTagKeyboardAction({ key: ' ', disabled: false })).toEqual({
			isActivationKey: false,
			shouldEmit: false
		});
	});
});

describe('resolveBadgeClasses', () => {
	test('returns dot badge classes by default', () => {
		expect(resolveBadgeClasses()).toEqual({
			radiusClass: 'rounded-(--radius-small)',
			sizeClass: 'h-3 w-3',
			topClass: '-top-1.5',
			sideClass: 'right-0',
			wrapperClass: 'relative',
			innerClass:
				'whitespace-nowrap px-1 text-xs text-white rounded-(--radius-small) h-3 w-3 bg-error text-center leading-4 transition-all',
			outerClass:
				'absolute -top-1.5 right-0 whitespace-nowrap px-1 text-xs text-white rounded-(--radius-small) h-3 w-3 bg-error text-center leading-4 transition-all'
		});
	});

	test('resolves left leaf text badge classes', () => {
		const classes = resolveBadgeClasses({
			text: '9',
			radius: 'leaf',
			isLeft: true,
			injClass: 'custom-badge'
		});

		expect(classes.radiusClass).toBe('rounded-full rounded-br-none');
		expect(classes.sizeClass).toBe('');
		expect(classes.topClass).toBe('-top-2');
		expect(classes.sideClass).toBe('left-0');
		expect(classes.innerClass).toContain('custom-badge');
		expect(classes.outerClass).toContain('absolute -top-2 left-0');
	});
});

describe('resolveBadgeStyles', () => {
	test('returns right-side visible transform style', () => {
		expect(resolveBadgeStyles({ offsetX: 2, offsetY: -1 })).toEqual({
			scaleStyle: 'scale(1)',
			transformStyle: 'translateX(calc(50% - 2px)) translateY(-1px) scale(1)'
		});
		expect(resolveBadgeInnerStyleValue({ offsetX: 2, offsetY: -1 })).toEqual({ transform: 'scale(1)' });
		expect(resolveBadgeInnerStyleString({ offsetX: 2, offsetY: -1 })).toBe('transform: scale(1)');
		expect(resolveBadgeOuterStyleValue({ offsetX: 2, offsetY: -1 })).toEqual({
			transform: 'translateX(calc(50% - 2px)) translateY(-1px) scale(1)'
		});
		expect(resolveBadgeOuterStyleString({ offsetX: 2, offsetY: -1 })).toBe(
			'transform: translateX(calc(50% - 2px)) translateY(-1px) scale(1)'
		);
	});

	test('returns left-side hidden transform style', () => {
		expect(resolveBadgeStyles({ isShow: false, isLeft: true, offsetX: 4, offsetY: 3 })).toEqual({
			scaleStyle: 'scale(0)',
			transformStyle: 'translateX(calc(-50% + 4px)) translateY(3px) scale(0)'
		});
	});
});

describe('resolveBadgeDerived', () => {
	test('returns bind-ready badge state for inner and outer layers', () => {
		const options = resolveBadgeStateOptions({
			props: {
				text: '8',
				radius: 'leaf',
				isLeft: true,
				isShow: false,
				offsetX: 4,
				offsetY: 3,
				isInner: true,
				injClass: 'custom-badge'
			}
		});
		expect(options).toMatchObject({ text: '8', radius: 'leaf', isLeft: true, isShow: false, isInner: true });
		const state = resolveBadgeDerived(options);

		expect(state.isInner).toBe(true);
		expect(state.classes.innerClass).toContain('custom-badge');
		expect(state.classes.outerClass).toContain('absolute -top-2 left-0');
		expect(state.innerStyleValue).toEqual({ transform: 'scale(0)' });
		expect(state.innerStyleString).toBe('transform: scale(0)');
		expect(state.outerStyleValue).toEqual({ transform: 'translateX(calc(-50% + 4px)) translateY(3px) scale(0)' });
		expect(state.outerStyleString).toBe('transform: translateX(calc(-50% + 4px)) translateY(3px) scale(0)');
	});
});

describe('async picker derived', () => {
	test('resolves popup state, metrics and navigation text', () => {
		expect(resolveAsyncPickerInitialVisible(undefined)).toBe(false);
		expect(resolveAsyncPickerInitialVisible(true)).toBe(true);
		expect(resolveAsyncPickerCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveAsyncPickerCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveAsyncPickerCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolveAsyncPickerSelectionResetState()).toEqual({ currentIndex: 0, data: [] });
		expect(resolveAsyncPickerUsePopup(null)).toBe(false);
		expect(resolveAsyncPickerUsePopup({})).toBe(true);
		expect(resolveAsyncPickerPopupConfig(null)).toEqual({ popupProps: {} });
		expect(resolveAsyncPickerPopupConfig({ position: 'bottom' })).toEqual({ popupProps: { position: 'bottom' } });
		expect(resolveAsyncPickerLoading([])).toBe(true);
		expect(resolveAsyncPickerMetrics({ showRow: 3, showSelected: true, height: 25, viewportHeight: 800, usePopup: true })).toEqual({
			rowHeight: 64,
			popupBodyHeight: 192,
			inlineHeight: 200,
			loadingHeight: 192,
			transitionDistance: 265
		});
		expect(resolveAsyncPickerHeightStyleValue(120)).toEqual({ height: 120 });
		expect(resolveAsyncPickerHeightStyleString(120)).toBe('height:120px');
		expect(resolveAsyncPickerInlineContentStyleValue({ usePopup: true, height: 120 })).toBeUndefined();
		expect(resolveAsyncPickerInlineContentStyleString({ usePopup: true, height: 120 })).toBe('');
		expect(resolveAsyncPickerInlineContentStyleValue({ usePopup: false, height: 120 })).toEqual({ height: 120 });
		expect(resolveAsyncPickerInlineContentStyleString({ usePopup: false, height: 120 })).toBe('height:120px');
		expect(resolveAsyncPickerHeaderClass()).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(resolveAsyncPickerLeftButtonClass()).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(resolveAsyncPickerRightButtonClass()).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(resolveAsyncPickerButtonLoadingClass()).toBe('p-3');
		expect(resolveAsyncPickerSelectedWrapClass()).toBe('flex w-full gap-3 overflow-x-hidden bg-bg-surface px-4 dark:bg-bg-surface-dark');
		expect(resolveAsyncPickerSelectedLabelClass()).toBe('h-8 flex-none text-center text-sm leading-8 text-black/60 dark:text-white/60');
		expect(resolveAsyncPickerSelectedItemClass()).toBe('h-8 flex-1 truncate px-1 text-center text-sm leading-8');
		expect(resolveAsyncPickerBodyClass()).toBe('bg-bg-surface dark:bg-bg-surface-dark');
		expect(resolveAsyncPickerContentClipClass()).toBe('truncate');
		expect(resolveAsyncPickerLoadingClass()).toBe('flex items-center justify-center');
		expect(resolveAsyncPickerLeftText({ firstLevel: false, cancelText: 'Cancel', prevText: 'Prev' })).toBe('Prev');
		expect(resolveAsyncPickerRightText({ lastLevel: true, confirmText: 'OK', nextText: 'Next' })).toBe('OK');
		expect(
			resolveAsyncPickerStateOptions({
				currentIndex: 1,
				data: [{ label: 'A' }, { label: 'B' }],
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title',
					defaultNext: 'Next',
					defaultPrev: 'Prev',
					defaultSelected: 'Selected'
				},
				firstLevel: false,
				indexs: [0],
				items: [{ label: 'A' }],
				lastLevel: true,
				props: {
					cancelText: 'Back',
					height: 25,
					popup: null,
					showRow: 3,
					showSelected: true,
					title: 'Pick async'
				},
				viewportHeight: 800,
				viewportWidth: 375
			})
		).toMatchObject({
			cancelText: 'Back',
			currentIndex: 1,
			data: [{ label: 'A' }, { label: 'B' }],
			firstLevel: false,
			height: 25,
			indexs: [0],
			items: [{ label: 'A' }],
			lastLevel: true,
			popup: null,
			showRow: 3,
			showSelected: true,
			title: 'Pick async',
			viewportHeight: 800,
			viewportWidth: 375
		});
		expect(
			resolveAsyncPickerTexts({
				cancelText: 'Back',
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title',
					defaultNext: 'Next',
					defaultPrev: 'Prev',
					defaultSelected: 'Selected'
				}
			})
		).toEqual({
			cancelText: 'Back',
			confirmText: 'Confirm',
			title: 'Title',
			nextText: 'Next',
			prevText: 'Prev',
			selectedText: 'Selected'
		});
	});

	test('resolves selected path changes without events', () => {
		const items = [{ label: 'A' }, { label: 'B' }];
		const indexs = [0, 1];
		expect(resolveAsyncPickerBackState({ items, indexs })).toEqual({
			items: [{ label: 'A' }],
			indexs: [0]
		});
		expect(resolveAsyncPickerSelectState({ items: [{ label: 'A' }], indexs: [0], data: [{ label: 'B' }], currentIndex: 0 })).toEqual({
			selectedItem: { label: 'B' },
			items: [{ label: 'A' }, { label: 'B' }],
			indexs: [0, 0]
		});
	});

	test('resolves button actions and selected path motion params', () => {
		const items = [{ label: 'A' }];
		const indexs = [0];
		expect(resolveAsyncPickerSelectedFlyParams({ viewportWidth: 375, duration: 300 })).toEqual({ x: 375, duration: 300 });
		expect(resolveAsyncPickerLeftAction({ isLoading: true, items, indexs })).toEqual({ type: 'none' });
		expect(resolveAsyncPickerLeftAction({ firstLevel: true, items, indexs })).toEqual({ type: 'cancel' });
		expect(resolveAsyncPickerLeftAction({ firstLevel: false, items, indexs })).toEqual({ type: 'prev', items: [], indexs: [] });
		expect(resolveAsyncPickerRightAction({ lastLevel: false, items, indexs, data: [{ label: 'B' }], currentIndex: 0 })).toEqual({
			type: 'next',
			currentIndex: 0,
			selectedItem: { label: 'B' },
			items: [{ label: 'A' }, { label: 'B' }],
			indexs: [0, 0]
		});
		expect(resolveAsyncPickerRightAction({ lastLevel: true, items, indexs, data: [{ label: 'C' }], currentIndex: 0 })).toMatchObject({
			type: 'confirm',
			items: [{ label: 'A' }, { label: 'C' }],
			indexs: [0, 0]
		});
		expect(resolveAsyncPickerLeftButtonFlow(resolveAsyncPickerLeftAction({ isLoading: true, items, indexs }))).toEqual({ type: 'none' });
		expect(resolveAsyncPickerLeftButtonFlow(resolveAsyncPickerLeftAction({ firstLevel: true, items, indexs }))).toEqual({
			type: 'cancel',
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: false }
		});
		expect(resolveAsyncPickerLeftButtonFlow(resolveAsyncPickerLeftAction({ firstLevel: false, items, indexs }))).toEqual({
			type: 'prev',
			items: [],
			indexs: [],
			resetState: { currentIndex: 0, data: [] }
		});
		expect(
			resolveAsyncPickerRightButtonFlow(
				resolveAsyncPickerRightAction({ lastLevel: false, items, indexs, data: [{ label: 'B' }], currentIndex: 0 })
			)
		).toEqual({
			type: 'next',
			currentIndex: 0,
			selectedItem: { label: 'B' },
			items: [{ label: 'A' }, { label: 'B' }],
			indexs: [0, 0],
			resetState: { currentIndex: 0, data: [] }
		});
		expect(
			resolveAsyncPickerRightButtonFlow(
				resolveAsyncPickerRightAction({ lastLevel: true, items, indexs, data: [{ label: 'C' }], currentIndex: 0 })
			)
		).toEqual({
			type: 'confirm',
			currentIndex: 0,
			selectedItem: { label: 'C' },
			items: [{ label: 'A' }, { label: 'C' }],
			indexs: [0, 0],
			resetState: { currentIndex: 0, data: [] },
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: true }
		});
	});

	test('resolves render-ready async picker state', () => {
		const state = resolveAsyncPickerDerived({
			cancelText: 'Back',
			currentIndex: 0,
			data: [{ label: 'B' }],
			defaults: {
				defaultCancel: 'Cancel',
				defaultConfirm: 'Confirm',
				defaultTitle: 'Title',
				defaultNext: 'Next',
				defaultPrev: 'Prev',
				defaultSelected: 'Selected'
			},
			firstLevel: false,
			height: 25,
			indexs: [0],
			items: [{ label: 'A' }],
			lastLevel: true,
			popup: { position: 'bottom' },
			showRow: 3,
			showSelected: true,
			viewportHeight: 800,
			viewportWidth: 375
		});

		expect(state.texts.cancelText).toBe('Back');
		expect(state.leftButtonText).toBe('Prev');
		expect(state.rightButtonText).toBe('Confirm');
		expect(state.metrics).toEqual({
			rowHeight: 64,
			popupBodyHeight: 192,
			inlineHeight: 200,
			loadingHeight: 192,
			transitionDistance: 265
		});
		expect(state.inlineHeightStyleValue).toEqual({ height: 200 });
		expect(state.inlineHeightStyleString).toBe('height:200px');
		expect(state.inlineContentStyleValue).toBeUndefined();
		expect(state.inlineContentStyleString).toBe('');
		expect(state.headerClass).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(state.leftButtonClass).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(state.rightButtonClass).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(state.selectedItemClass).toBe('h-8 flex-1 truncate px-1 text-center text-sm leading-8');
		expect(state.loadingClass).toBe('flex items-center justify-center');
		expect(state.loadingHeightStyleValue).toEqual({ height: 192 });
		expect(state.loadingHeightStyleString).toBe('height:192px');
		expect(state.popupConfig).toEqual({ popupProps: { position: 'bottom' } });
		expect(state.selectedFlyInParams).toEqual({ x: 375, duration: 500 });
		expect(state.selectedFlyOutParams).toEqual({ x: 375, duration: 300 });
		expect(state.leftAction).toEqual({ type: 'prev', items: [], indexs: [] });
		expect(state.rightAction).toEqual({
			type: 'confirm',
			currentIndex: 0,
			selectedItem: { label: 'B' },
			items: [{ label: 'A' }, { label: 'B' }],
			indexs: [0, 0]
		});
	});
});

describe('bottom sheet derived', () => {
	test('resolves stay height list and current top values', () => {
		const list = resolveBottomSheetStayHeightList([20, 60]);

		expect(list).toEqual([20, 60]);
		expect(resolveBottomSheetStayHeightList()).toEqual([10, 50, 90]);
		expect(bottomSheetDefaultScrollTopHeight).toBe(5);
		expect(resolveBottomSheetMeasuredScrollTopHeight()).toBe(5);
		expect(resolveBottomSheetMeasuredScrollTopHeight({ clientHeight: 24 })).toBe(24);
		expect(resolveBottomSheetStayHeight(list, 8)).toBe(60);
		expect(resolveBottomSheetMaxHeight(list)).toBe(60);
		expect(resolveBottomSheetStartTop(60)).toBe(40);
		expect(resolveBottomSheetCurrentTop(40, 5)).toBe(45);
		expect(resolveBottomSheetTitle(undefined, { title: 'Title' })).toBe('Title');
		expect(resolveBottomSheetTitle('Custom', { title: 'Title' })).toBe('Custom');
		expect(resolveBottomSheetCloseContentState({ closeContent: '' })).toEqual({ kind: 'none', shouldRender: false });
		expect(resolveBottomSheetCloseContentState({ closeContent: 'closeIcon' })).toEqual({
			ariaLabel: 'close',
			kind: 'closeIcon',
			shouldRender: true
		});
		expect(resolveBottomSheetCloseContentState({ closeContent: 'downIcon' })).toEqual({
			ariaLabel: 'close',
			kind: 'downIcon',
			shouldRender: true
		});
		expect(resolveBottomSheetCloseContentState({ closeContent: '完成' })).toEqual({ kind: 'text', shouldRender: true, text: '完成' });
		expect(
			resolveBottomSheetStateOptions({
				currentRender: true,
				defaults: { title: 'Title' },
				props: {
					closeContent: 'closeIcon',
					closeHeight: 5,
					duration: 300,
					iconRadius: 'full',
					outDuration: 120,
					radius: 'lg',
					stayHeightIndex: 2,
					stayHeightList: [10, 40, 80],
					title: 'Custom',
					titleAlign: 'center',
					zIndex: 700
				},
				isTouch: true,
				moveDistance: 4,
				scrollTopHeight: 8,
				startTop: 20,
				viewportHeight: 900,
				visible: true
			})
		).toMatchObject({
			closeContent: 'closeIcon',
			closeHeight: 5,
			currentRender: true,
			duration: 300,
			iconRadius: 'full',
			isTouch: true,
			moveDistance: 4,
			outDuration: 120,
			radius: 'lg',
			scrollTopHeight: 8,
			startTop: 20,
			stayHeightIndex: 2,
			stayHeightList: [10, 40, 80],
			title: 'Custom',
			titleAlign: 'center',
			viewportHeight: 900,
			visible: true,
			zIndex: 700
		});
	});

	test('clamps drag distance and snaps to the nearest stay height', () => {
		expect(
			resolveBottomSheetMoveDistance({
				currentY: 0,
				startY: 600,
				viewportHeight: 1000,
				startTop: 50,
				maxHeight: 90
			})
		).toBe(-40);

		expect(
			resolveBottomSheetNearestTopState({
				stayHeightList: [10, 50, 90],
				currentTop: 43
			})
		).toEqual({ top: 50, index: 1, height: 50 });
		expect(resolveBottomSheetTouchStartAction({ clientY: 320, currentTop: 45 })).toEqual({
			currentY: 320,
			isTouch: true,
			moveDistance: 0,
			startTop: 45,
			startY: 320
		});
		expect(
			resolveBottomSheetTouchEndAction({
				stayHeightList: [10, 50, 90],
				currentTop: 43,
				currentY: 960,
				viewportHeight: 1000,
				closeHeight: 5
			})
		).toEqual({
			height: 50,
			isTouch: false,
			moveDistance: 0,
			shouldClose: true,
			startTop: 50
		});
		expect(
			resolveBottomSheetTouchEndFlow({
				stayHeightList: [10, 50, 90],
				currentTop: 43,
				currentY: 960,
				viewportHeight: 1000,
				closeHeight: 5,
				visible: true
			})
		).toEqual({
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: true },
			height: 50,
			isTouch: false,
			moveDistance: 0,
			shouldClose: true,
			startTop: 50
		});
		expect(
			resolveBottomSheetTouchEndFlow({
				stayHeightList: [10, 50, 90],
				currentTop: 43,
				currentY: 940,
				viewportHeight: 1000,
				closeHeight: 5,
				visible: true
			}).closeAction
		).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveBottomSheetTouchCancelAction()).toEqual({ isTouch: false });
	});

	test('resolves close threshold, content height and transition distance', () => {
		expect(resolveBottomSheetShouldClose({ currentY: 960, viewportHeight: 1000, closeHeight: 5 })).toBe(true);
		expect(resolveBottomSheetShouldClose({ currentY: 940, viewportHeight: 1000, closeHeight: 5 })).toBe(false);
		expect(resolveBottomSheetContentHeight({ viewportHeight: 1000, currentTop: 40, scrollTopHeight: 48 })).toBe(552);
		expect(resolveBottomSheetTransitionDistance({ maxHeight: 90, viewportHeight: 1000 })).toBe(900);
		expect(resolveBottomSheetInParams({ transitionDistance: 900, duration: 450 })).toEqual({ y: 900, opacity: 1, duration: 450 });
		expect(resolveBottomSheetOutParams({ transitionDistance: 900, outDuration: 240 })).toEqual({ y: 900, opacity: 1, duration: 240 });
		expect(resolveBottomSheetLayerStyleValue(700)).toEqual({ zIndex: 700 });
		expect(resolveBottomSheetLayerStyleString(700)).toBe('z-index:700;');
		expect(resolveBottomSheetPanelStyleValue({ maxHeight: 90, currentTop: 10 })).toEqual({ height: '90%', top: '10%' });
		expect(resolveBottomSheetPanelStyleString({ maxHeight: 90, currentTop: 10 })).toBe('height:90%;top:10%');
		expect(resolveBottomSheetContentStyleValue(552)).toEqual({ height: '552px', overscrollBehaviorY: 'contain' });
		expect(resolveBottomSheetContentStyleString(552)).toBe('height:552px;overscroll-behavior-y: contain;');
		expect(resolveBottomSheetInitialVisible(undefined)).toBe(false);
		expect(resolveBottomSheetInitialVisible(true)).toBe(true);
		expect(resolveBottomSheetRenderState({ visible: true, outDuration: 240, currentRender: false })).toBe(true);
		expect(resolveBottomSheetRenderState({ visible: false, outDuration: 0, currentRender: true })).toBe(false);
		expect(resolveBottomSheetRenderState({ visible: false, outDuration: 240, currentRender: true })).toBe(true);
		expect(resolveBottomSheetActionStartTop()).toBe(0);
		expect(resolveBottomSheetActionStartTop(45)).toBe(45);
		expect(resolveBottomSheetCloseAction({ visible: true })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveBottomSheetCloseAction({ visible: false })).toEqual({ nextVisible: false, shouldClose: false, shouldEmitClose: false });
		expect(resolveBottomSheetCloseAction({ shouldClose: false, visible: true })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveBottomSheetCloseAction({ emitClose: false, visible: true })).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: false
		});
		expect(resolveBottomSheetMaskClickAction({ maskClosable: true })).toEqual({ shouldClose: true });
		expect(resolveBottomSheetMaskClickAction({ maskClosable: false })).toEqual({ shouldClose: false });
		expect(resolveBottomSheetMaskClickFlow({ maskClosable: true, visible: true })).toEqual({
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: true },
			shouldClose: true
		});
		expect(resolveBottomSheetMaskClickFlow({ maskClosable: false, visible: true })).toEqual({
			closeAction: { nextVisible: false, shouldClose: false, shouldEmitClose: false },
			shouldClose: false
		});
	});

	test('resolves render lifecycle actions', () => {
		expect(
			resolveBottomSheetVisibleChangeAction({ visible: true, wasVisible: false, shouldRender: false, baseStartTop: 50, outDuration: 240 })
		).toEqual({
			kind: 'open',
			nextIsClosing: false,
			nextIsTouch: false,
			nextMoveDistance: 0,
			nextShouldRender: true,
			nextStartTop: 50,
			renderEndDelayMs: 240,
			shouldApplyState: true,
			shouldRunInAnimation: true,
			shouldRunOutAnimation: false,
			shouldScheduleRenderEnd: false
		});
		expect(
			resolveBottomSheetVisibleChangeAction({
				visible: false,
				wasVisible: true,
				shouldRender: true,
				baseStartTop: 50,
				startTop: 45,
				moveDistance: 5,
				outDuration: 240
			})
		).toEqual({
			kind: 'closeAnimate',
			nextIsClosing: true,
			nextIsTouch: false,
			nextMoveDistance: 0,
			nextShouldRender: true,
			nextStartTop: 50,
			renderEndDelayMs: 240,
			shouldApplyState: true,
			shouldRunInAnimation: false,
			shouldRunOutAnimation: true,
			shouldScheduleRenderEnd: true
		});
		expect(
			resolveBottomSheetVisibleChangeAction({ visible: false, wasVisible: false, shouldRender: false, startTop: 45, moveDistance: 5 })
		).toMatchObject({
			kind: 'closedIdle',
			shouldApplyState: false,
			nextStartTop: 45,
			nextMoveDistance: 5
		});
		expect(resolveBottomSheetRenderEndAction()).toEqual({ nextIsClosing: false, nextShouldRender: false });
	});

	test('resolves classes without relying on framework templates', () => {
		expect(resolveBottomSheetWindowRadiusClass('lg')).toBe(' rounded-t-lg');
		expect(resolveBottomSheetWindowRadiusClass('unknown')).toBe('rounded-t-(--radius-box)');
		expect(resolveBottomSheetIconRadiusClass('full')).toBe('rounded-full');
		expect(resolveBottomSheetTitleAlignClass('right')).toBe('text-right');
		expect(resolveBottomSheetPanelClass({ windowRadiusClass: 'rounded-t-lg', isTouch: false })).toContain('transition-all duration-300');
		expect(resolveBottomSheetPanelClass({ windowRadiusClass: 'rounded-t-lg', isTouch: true })).not.toContain('transition-all duration-300');
		expect(resolveBottomSheetIconButtonClass('rounded-full')).toContain('rounded-full');
		expect(resolveBottomSheetLayerClass()).toBe('pointer-events-none fixed inset-0 flex h-screen w-screen flex-col justify-end px-0');
		expect(resolveBottomSheetDragHandleClass()).toBe('cursor-move touch-none select-none py-1');
		expect(resolveBottomSheetDragIndicatorClass()).toContain('mx-auto h-1 w-8');
		expect(resolveBottomSheetHeaderRowClass()).toBe('flex items-center justify-between gap-2 px-3 py-1');
		expect(resolveBottomSheetCloseTextButtonClass()).toContain('font-bold text-primary');
		expect(resolveBottomSheetDividerClass()).toBe('h-px w-full bg-black/5 dark:bg-white/10');
		expect(resolveBottomSheetContentScrollClass()).toBe('overflow-auto');
		expect(resolveBottomSheetIconSvgClass()).toBe('mx-auto block opacity-40');
	});

	test('returns validation flags for invalid state', () => {
		expect(resolveBottomSheetValidationState({ stayHeightIndex: 1, closeHeight: 0 })).toEqual({
			invalidStayHeightList: false,
			nonAscendingStayHeightList: false,
			stayHeightIndexOutOfRange: false,
			closeHeightTooLarge: false
		});
		expect(
			resolveBottomSheetValidationState({
				stayHeightList: [20, 10],
				stayHeightIndex: 4,
				closeHeight: 30
			})
		).toEqual({
			invalidStayHeightList: false,
			nonAscendingStayHeightList: true,
			stayHeightIndexOutOfRange: true,
			closeHeightTooLarge: true
		});
	});

	test('resolves render-ready bottom sheet state', () => {
		const state = resolveBottomSheetDerived({
			closeContent: '完成',
			closeHeight: 30,
			duration: 300,
			iconRadius: 'full',
			isTouch: true,
			moveDistance: 5,
			outDuration: 120,
			radius: 'lg',
			scrollTopHeight: 48,
			stayHeightIndex: 1,
			stayHeightList: [20, 60],
			titleAlign: 'right',
			viewportHeight: 1000,
			visible: true,
			zIndex: 700,
			defaults: { title: 'Title' }
		});

		expect(state.resolvedStayHeightList).toEqual([20, 60]);
		expect(state.baseStartTop).toBe(40);
		expect(state.startTop).toBe(40);
		expect(state.currentTop).toBe(45);
		expect(state.contentHeight).toBe(502);
		expect(state.contentScrollClass).toBe(resolveBottomSheetContentScrollClass());
		expect(state.closeTextButtonClass).toBe(resolveBottomSheetCloseTextButtonClass());
		expect(state.dividerClass).toBe(resolveBottomSheetDividerClass());
		expect(state.dragHandleClass).toBe(resolveBottomSheetDragHandleClass());
		expect(state.dragIndicatorClass).toBe(resolveBottomSheetDragIndicatorClass());
		expect(state.finalTitle).toBe('Title');
		expect(state.headerRowClass).toBe(resolveBottomSheetHeaderRowClass());
		expect(state.closeContentState).toEqual({ kind: 'text', shouldRender: true, text: '完成' });
		expect(state.iconSvgClass).toBe(resolveBottomSheetIconSvgClass());
		expect(state.layerClass).toBe(resolveBottomSheetLayerClass());
		expect(state.panelClass).not.toContain('transition-all duration-300');
		expect(state.panelStyleString).toBe('height:60%;top:45%');
		expect(state.contentStyleValue).toEqual({ height: '502px', overscrollBehaviorY: 'contain' });
		expect(state.layerStyleString).toBe('z-index:700;');
		expect(state.inParams).toEqual({ y: 600, opacity: 1, duration: 300 });
		expect(state.outParams).toEqual({ y: 600, opacity: 1, duration: 120 });
		expect(state.validationState.closeHeightTooLarge).toBe(true);
	});
});

describe('button group derived', () => {
	test('resolves button classes, disabled state and custom sizing', () => {
		expect(resolveButtonInnerDisabled({ disabled: true })).toBe(true);
		expect(resolveButtonInnerDisabled({ loading: {}, disabledLoading: true })).toBe(true);
		expect(resolveButtonRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveButtonGroupRadiusClass()).toBe('rounded-(--radius-form)');
		expect(resolveButtonInnerSizeClass({ size: 'sm' })).toBe('tdf-button-sm');
		expect(resolveButtonInnerSizeClass({ customSize: true })).toBe('');
		expect(resolveButtonOuterClass({ size: 'big', customSize: false, love: true })).toBe('py-2 px-4 block text-xl');
		expect(resolveButtonOuterClass({ size: 'auto' })).toBe('py-2 px-0 inline');

		const buttonClass = resolveButtonClass({
			fill: 'lineState',
			state: 'warning',
			radius: 'full',
			border: 'dashed',
			size: 'sm',
			heightIn: '1',
			injClass: 'custom-button'
		});

		expect(buttonClass).toContain('py-1 tdf-button-sm');
		expect(buttonClass).toContain('border-dashed rounded-full border border-warning !text-warning');
		expect(buttonClass).toContain('custom-button');
		expect(resolveButtonCustomStyleValue({ customSize: false })).toBeNull();
		expect(resolveButtonCustomStyleValue({ customSize: true, customWidth: 88, customHeight: 32 })).toEqual({
			width: '88px',
			height: '32px',
			padding: 0
		});
		expect(resolveButtonCustomStyleString({ customSize: true, customWidth: 88, customHeight: 32 })).toBe(
			'width:88px;height:32px;padding:0;'
		);
		expect(resolveButtonIconState({ icon: { name: 'ri-add-line' }, iconPosition: 'left', loading: { type: '1_0' } })).toEqual({
			showLoading: true,
			showLeftIcon: true,
			showRightIcon: false
		});
		expect(resolveButtonContentState({ icon: { name: 'ri-add-line' }, iconPosition: 'left', loading: { type: '1_0' } })).toEqual({
			showLoading: true,
			showLeftIcon: true,
			showRightIcon: false,
			loadingProps: { type: '1_0' },
			iconProps: { name: 'ri-add-line' }
		});
		expect(resolveButtonIconState({ icon: { name: 'ri-add-line' }, iconPosition: 'right' })).toEqual({
			showLoading: false,
			showLeftIcon: false,
			showRightIcon: true
		});
		expect(resolveButtonIconState({ icon: null, iconPosition: 'right' })).toEqual({
			showLoading: false,
			showLeftIcon: false,
			showRightIcon: false
		});

		const buttonOptions = resolveButtonStateOptions({
			props: {
				fill: 'colorLight',
				state: 'success',
				radius: 'lg',
				size: 'auto',
				border: 'dotted',
				heightOut: '1',
				heightIn: '2',
				injClass: 'button-class',
				love: true,
				disabled: false,
				loading: { type: '1_0' },
				disabledLoading: true,
				customSize: true,
				customWidth: 120,
				customHeight: 44,
				icon: { name: 'ri-check-line' },
				iconPosition: 'right'
			}
		});
		expect(buttonOptions).toMatchObject({ fill: 'colorLight', state: 'success', iconPosition: 'right' });
		const buttonState = resolveButtonDerived(buttonOptions);

		expect(buttonState.innerDisabled).toBe(true);
		expect(buttonState.outerClass).toBe('py-1 px-0 inline text-xl');
		expect(buttonState.buttonClass).toContain('py-2');
		expect(buttonState.buttonClass).toContain(
			'border-dotted rounded-lg !bg-success/10 !text-success button-class cursor-not-allowed opacity-50'
		);
		expect(buttonState.buttonStyleValue).toEqual({ width: '120px', height: '44px', padding: 0 });
		expect(buttonState.buttonStyleString).toBe('width:120px;height:44px;padding:0;');
		expect(buttonState.contentState).toEqual({
			showLoading: true,
			showLeftIcon: false,
			showRightIcon: true,
			loadingProps: { type: '1_0' },
			iconProps: { name: 'ri-check-line' }
		});
	});

	test('resolves fill, text and divider classes', () => {
		expect(resolveButtonGroupFillStateClass({ fill: 'base' })).toBe('bg-primary dark:bg-dark');
		expect(resolveButtonGroupFillStateClass({ fill: 'colorLight' })).toBe('!bg-black/10 dark:!bg-white/10 !text-black dark:!text-white');
		expect(resolveButtonGroupFillStateClass({ fill: 'lineState', state: 'warning' })).toBe('border border-warning !text-warning');
		expect(resolveButtonGroupTextColorClass({ fill: 'base' })).toBe('text-text-on-primary dark:text-text-on-dark');
		expect(resolveButtonGroupTextColorClass({ fill: 'base', state: 'error' })).toBe('text-text-on-primary');
		expect(resolveButtonGroupDividerColorClass({ fill: 'line' })).toBe('bg-text-primary/20 dark:bg-text-dark/30');
		expect(resolveButtonGroupDividerColorClass({ fill: 'textState', state: 'success' })).toBe('bg-success/30');
	});

	test('resolves wrapper, item and divider classes', () => {
		expect(resolveButtonGroupOuterClass()).toBe('py-2 px-4 block');
		expect(resolveButtonGroupOuterClass({ size: 'auto', heightOut: '1' })).toBe('py-1 px-0 inline');
		expect(resolveButtonGroupInnerClass({ fill: 'base', radiusClass: 'rounded-lg', injClass: 'custom' })).toContain(
			'bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark border-solid rounded-lg custom'
		);
		expect(resolveButtonGroupItemClass({ heightIn: '4', disabled: true })).toBe(
			'flex flex-1 items-center justify-center gap-1 py-4 cursor-not-allowed opacity-50'
		);
		expect(resolveButtonGroupDividerClass({ dividerHeight: 'short', fill: 'base' })).toBe('w-px h-1/3 bg-white/30 dark:bg-black/30');
		expect(resolveButtonGroupDividerWrapClass()).toBe('flex items-center self-stretch');
		expect(resolveButtonGroupUseItems([{ text: 'A' }])).toBe(true);
		expect(resolveButtonGroupUseItems([])).toBe(false);
		expect(resolveButtonGroupItemState({ icon: { name: 'ri-add-line' }, iconPosition: 'left', index: 0, total: 2 })).toEqual({
			showDivider: true,
			showLeftIcon: true,
			showRightIcon: false
		});
		expect(resolveButtonGroupItemState({ icon: { name: 'ri-add-line' }, iconPosition: 'right', index: 1, total: 2 })).toEqual({
			showDivider: false,
			showLeftIcon: false,
			showRightIcon: true
		});
		expect(resolveButtonGroupItemState({ icon: { name: '' }, index: 0, total: 1 })).toEqual({
			showDivider: false,
			showLeftIcon: false,
			showRightIcon: false
		});
		expect(
			resolveButtonGroupItemStateList({
				items: [
					{ text: 'A', icon: { name: 'ri-add-line' } },
					{ text: 'B', icon: { name: 'ri-arrow-right-line' }, iconPosition: 'right' }
				]
			})
		).toEqual([
			{
				item: { text: 'A', icon: { name: 'ri-add-line' } },
				showDivider: true,
				showLeftIcon: true,
				showRightIcon: false
			},
			{
				item: { text: 'B', icon: { name: 'ri-arrow-right-line' }, iconPosition: 'right' },
				showDivider: false,
				showLeftIcon: false,
				showRightIcon: true
			}
		]);
		expect(
			resolveButtonGroupItemDerivedList({
				items: [
					{ text: 'A', icon: { name: 'ri-add-line' } },
					{ text: 'B', disabled: true, icon: { name: 'ri-arrow-right-line' }, iconPosition: 'right' }
				],
				heightIn: '4',
				dividerHeight: 'short'
			})
		).toEqual([
			{
				item: { text: 'A', icon: { name: 'ri-add-line' } },
				showDivider: true,
				showLeftIcon: true,
				showRightIcon: false,
				itemClass: 'flex flex-1 items-center justify-center gap-1 py-4 active:opacity-80',
				dividerClass: 'w-px h-1/3 bg-white/30 dark:bg-black/30',
				dividerWrapClass: 'flex items-center self-stretch'
			},
			{
				item: { text: 'B', disabled: true, icon: { name: 'ri-arrow-right-line' }, iconPosition: 'right' },
				showDivider: false,
				showLeftIcon: false,
				showRightIcon: true,
				itemClass: 'flex flex-1 items-center justify-center gap-1 py-4 cursor-not-allowed opacity-50',
				dividerClass: 'w-px h-1/3 bg-white/30 dark:bg-black/30',
				dividerWrapClass: 'flex items-center self-stretch'
			}
		]);
		const buttonGroupOptions = resolveButtonGroupStateOptions({
			props: { items: [{ text: 'A' }], radius: 'lg', size: 'auto', heightOut: '1', injClass: 'custom' }
		});
		expect(buttonGroupOptions).toMatchObject({ radius: 'lg', size: 'auto', heightOut: '1' });
		expect(resolveButtonGroupDerived(buttonGroupOptions)).toMatchObject({
			radiusClass: 'rounded-lg',
			outerClass: 'py-1 px-0 inline',
			useItems: true
		});
	});

	test('resolves item click action without owning callbacks', () => {
		expect(resolveButtonGroupItemClickAction({ disabled: false })).toEqual({ shouldClick: true });
		expect(resolveButtonGroupItemClickAction({ disabled: true })).toEqual({ shouldClick: false });
	});
});

describe('avatar derived', () => {
	test('resolves avatar item classes and icon sizes', () => {
		expect(resolveAvatarSizeClass('sm')).toBe('w-10 h-10');
		expect(resolveAvatarRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveAvatarIconSize('2xl')).toBe(64);
		expect(resolveAvatarRootClass({ size: 'xs', radius: 'full', line: 'dashed', injClass: 'custom-avatar' })).toContain(
			'w-6 h-6 rounded-full custom-avatar'
		);
		expect(resolveAvatarRootClass({ line: 'dashed' })).toContain('border border-dashed');
		expect(resolveAvatarAltClass('lg')).toContain('text-6xl');
		expect(resolveAvatarImageClass('m')).toContain('h-2/3 w-2/3');
		expect(resolveAvatarIconWrapClass()).toBe('flex flex-col items-center justify-center');
		expect(resolveAvatarDefaultIconClass()).toBe('text-primary-900 dark:text-dark-900');
		expect(resolveAvatarImageWrapClass()).toBe('m-auto text-center');
		expect(resolveAvatarCenteredContentClass('text-center')).toBe(
			'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center'
		);
		expect(resolveAvatarContentState({ image: '', alt: '', hasIcon: true })).toEqual({ kind: 'icon' });
		expect(resolveAvatarContentState({ image: '', alt: '', hasIcon: false })).toEqual({ kind: 'defaultIcon' });
		expect(resolveAvatarContentState({ image: '', alt: 'AB' })).toEqual({ kind: 'alt' });
		expect(resolveAvatarContentState({ image: 'avatar.png', alt: 'AB' })).toEqual({ kind: 'image' });
		const avatarOptions = resolveAvatarStateOptions({
			props: { image: '', alt: 'AB', altSize: 'lg', size: 'xs', radius: 'full', line: 'dashed', injClass: 'custom-avatar' },
			hasIcon: false
		});
		expect(avatarOptions).toMatchObject({ image: '', alt: 'AB', altSize: 'lg', size: 'xs', hasIcon: false });
		expect(resolveAvatarDerived(avatarOptions)).toMatchObject({
			rootClass: expect.stringContaining('w-6 h-6 rounded-full custom-avatar'),
			centeredAltClass:
				'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-primary-950 dark:text-dark-950 text-center text-6xl',
			iconWrapClass: 'flex flex-col items-center justify-center',
			defaultIconClass: 'text-primary-900 dark:text-dark-900',
			imageWrapClass: 'm-auto text-center',
			iconSize: 12,
			contentState: { kind: 'alt' }
		});
		expect(resolveAvatarKeyboardAction({ key: 'Enter' })).toEqual({ shouldClick: true, shouldPreventDefault: true });
		expect(resolveAvatarKeyboardAction({ key: 'Escape' })).toEqual({ shouldClick: false, shouldPreventDefault: false });
	});
});

describe('avatar group derived', () => {
	test('resolves group item and fallback classes', () => {
		expect(resolveAvatarGroupLineWidthClass(3)).toBe('ring-3');
		expect(resolveAvatarGroupSizeClass('lg')).toBe('w-20 h-20');
		expect(resolveAvatarGroupTextSizeClass('lg')).toBe('text-4xl');
		expect(resolveAvatarGroupRadiusClass('xl')).toBe('rounded-xl');
		expect(resolveAvatarGroupItemClass({ lineWidth: 4, radius: 'full', injClass: 'custom-group' })).toContain(
			'ring-4 ring-bg-base dark:ring-bg-base-dark rounded-full custom-group'
		);
		expect(resolveAvatarGroupFallbackClass({ size: 'sm', radius: 'md', withTextColor: true })).toContain(
			'text-primary-950 dark:text-dark-950 rounded-md w-10 h-10 text-sm'
		);
		expect(resolveAvatarGroupRootClass()).toBe('w-full overflow-hidden');
		expect(resolveAvatarGroupButtonClass()).toBe('flex');
		expect(resolveAvatarGroupAddIconWrapClass()).toBe('mx-auto');
		expect(resolveAvatarGroupAddIconClass()).toBe('text-primary-950 dark:text-dark-950');
	});

	test('resolves visible data and overlap math', () => {
		expect(resolveAvatarGroupVisibleData([1, 2, 3], 2)).toEqual([1, 2]);
		expect(resolveAvatarGroupItemTransform({ compact: 4, index: 2, reverse: false })).toBe('translateX(-80%)');
		expect(resolveAvatarGroupItemTransform({ compact: 4, index: 2, reverse: true })).toBe('translateX(-130%)');
		expect(resolveAvatarGroupItemZIndex({ length: 5, index: 1, reverse: true })).toBe(3);
		expect(resolveAvatarGroupTopTransform({ compact: 4, length: 3 })).toBe('translateX(-120%)');
		expect(resolveAvatarGroupItemStyleValue({ compact: 4, index: 1, length: 3, reverse: false })).toEqual({
			transform: 'translateX(-40%)',
			zIndex: 1
		});
		expect(resolveAvatarGroupItemStyleString({ compact: 4, index: 1, length: 3, reverse: true })).toBe(
			'transform: translateX(-90%); z-index: 1'
		);
		expect(resolveAvatarGroupTopStyleValue({ compact: 4, length: 3, reverse: false })).toEqual({
			transform: 'translateX(-120%)',
			zIndex: 3
		});
		expect(resolveAvatarGroupTopStyleValue({ compact: 4, length: 3, reverse: true })).toEqual({ zIndex: 3 });
		expect(resolveAvatarGroupTopStyleString({ compact: 4, length: 3, reverse: false })).toBe('transform: translateX(-120%); z-index: 3');
		expect(resolveAvatarGroupKeyboardAction({ key: ' ' })).toEqual({ shouldClick: true, shouldPreventDefault: true });
		expect(resolveAvatarGroupKeyboardAction({ key: 'Tab' })).toEqual({ shouldClick: false, shouldPreventDefault: false });
		expect(resolveAvatarGroupTopKind('totle')).toBe('total');
		expect(resolveAvatarGroupTopKind('add')).toBe('add');
		expect(resolveAvatarGroupTopKind(null)).toBe('none');
		expect(resolveAvatarGroupTopKind(() => null)).toBe('custom');
		expect(resolveAvatarGroupTotalText(8)).toBe('+8');
		expect(resolveAvatarGroupTopState({ top: 'totle', total: 8 })).toEqual({ kind: 'total', totalText: '+8' });
		expect(resolveAvatarGroupTopState({ top: 'add', total: 8 })).toEqual({ kind: 'add', totalText: '' });
	});

	test('resolves render-ready group state', () => {
		const options = resolveAvatarGroupStateOptions({
			props: {
				data: [{ image: 'a.png' }, { image: 'b.png' }, { image: 'c.png' }],
				max: 2,
				compact: 3,
				reverse: true,
				size: 'sm',
				radius: 'lg',
				lineWidth: 1,
				top: 'totle'
			},
			total: 9
		});
		expect(options).toMatchObject({ max: 2, compact: 3, reverse: true, total: 9 });
		const state = resolveAvatarGroupDerived(options);

		expect(state.items.map((item) => item.item.image)).toEqual(['a.png', 'b.png']);
		expect(state.items[1].style).toEqual({ transform: 'translateX(-80%)', zIndex: 0 });
		expect(state.items[1].styleString).toBe('transform: translateX(-80%); z-index: 0');
		expect(state.itemClass).toContain('ring-1 ring-bg-base dark:ring-bg-base-dark rounded-lg');
		expect(state.rootClass).toBe('w-full overflow-hidden');
		expect(state.buttonClass).toBe('flex');
		expect(state.addIconWrapClass).toBe('mx-auto');
		expect(state.addIconClass).toBe('text-primary-950 dark:text-dark-950');
		expect(state.totalClass).toContain('text-primary-950 dark:text-dark-950 rounded-lg w-10 h-10 text-sm');
		expect(state.addClass).toContain('rounded-lg w-10 h-10 text-sm');
		expect(state.topState).toEqual({ kind: 'total', totalText: '+9' });
		expect(state.topStyle).toEqual({ zIndex: 2 });
		expect(state.topStyleString).toBe('z-index: 2');
	});
});

describe('card derived', () => {
	test('resolves container, spacing and section classes', () => {
		const containerClass = resolveCardContainerClass({
			bg: 'gray',
			radius: 'lg',
			shadow: 'md',
			mx: '4',
			my: '6',
			border: 'solid',
			borderWidth: '2',
			injClass: 'custom-card'
		});

		expect(resolveCardPaddingClass()).toBe('p-4');
		expect(resolveCardPaddingClass({ px: '2', py: '3' })).toBe('px-2 py-3');
		expect(resolveCardBgClass('none')).toBe('');
		expect(resolveCardBgClass('unknown')).toBe('bg-bg-surface dark:bg-bg-surface-dark');
		expect(resolveCardBorderClass({ border: 'dashed', borderWidth: '4' })).toBe(
			'border-dashed border-black/10 dark:border-white/10 border-4'
		);
		expect(containerClass).toContain('bg-black/5 dark:bg-white/5');
		expect(containerClass).toContain('rounded-lg shadow-md dark:shadow-white/10 mx-4 my-6');
		expect(containerClass).toContain('border-solid border-black/10 dark:border-white/10 border-2 custom-card');
		expect(resolveCardInteractive(() => undefined)).toBe(true);
		expect(resolveCardInteractive(undefined)).toBe(false);
		expect(resolveCardInteractiveClass('custom-card')).toBe('block text-left custom-card');
		expect(resolveCardHeaderClass('custom-header')).toBe('px-4 py-3 custom-header');
		expect(resolveCardBodyClass({ paddingClass: 'p-4', bodyClass: 'custom-body' })).toBe('p-4 custom-body');
		expect(resolveCardFooterClass('custom-footer')).toBe('px-4 py-3 custom-footer');
		expect(resolveCardDividerClass()).toBe('border-t border-black/5 dark:border-white/5');
		expect(resolveCardDividerVisible({ line: true, hasChildren: true, hasSection: true })).toBe(true);
		expect(resolveCardDividerVisible({ line: true, hasChildren: false, hasSection: true })).toBe(false);
		expect(resolveCardContentState({ hasHeader: true, hasBody: true, hasFooter: true, handler: () => undefined })).toEqual({
			isInteractive: true,
			showBody: true,
			showFooter: true,
			showFooterDivider: true,
			showHeader: true,
			showHeaderDivider: true
		});
		expect(resolveCardContentState({ hasHeader: true, hasBody: false, hasFooter: true, headerLine: false })).toEqual({
			isInteractive: false,
			showBody: false,
			showFooter: true,
			showFooterDivider: false,
			showHeader: true,
			showHeaderDivider: false
		});

		const cardOptions = resolveCardStateOptions({
			props: {
				bg: 'surface',
				radius: 'md',
				shadow: 'lg',
				mx: '1',
				my: '0',
				p: '2',
				border: 'dotted',
				borderWidth: '1',
				headerClass: 'head',
				bodyClass: 'body',
				footerClass: 'foot'
			},
			handler: () => undefined,
			hasHeader: true,
			hasBody: true,
			hasFooter: true
		});
		expect(cardOptions).toMatchObject({ bg: 'surface', radius: 'md', hasHeader: true });
		const cardState = resolveCardDerived(cardOptions);

		expect(cardState.paddingClass).toBe('p-2');
		expect(cardState.containerClass).toContain('bg-bg-surface dark:bg-bg-surface-dark rounded-md shadow-lg dark:shadow-white/10 mx-1 my-0');
		expect(cardState.containerClass).toContain('border-dotted border-black/10 dark:border-white/10 border');
		expect(cardState.interactiveClass).toContain('block text-left');
		expect(cardState.headerSlotClass).toBe('px-4 py-3 head');
		expect(cardState.bodySlotClass).toBe('p-2 body');
		expect(cardState.footerSlotClass).toBe('px-4 py-3 foot');
		expect(cardState.dividerClass).toBe('border-t border-black/5 dark:border-white/5');
		expect(cardState.contentState).toMatchObject({
			isInteractive: true,
			showHeaderDivider: true,
			showFooterDivider: true
		});
	});
});

describe('cell derived', () => {
	test('resolves cell classes and switch state branches', () => {
		expect(resolveCellOuterClass({ radius: 'lg', shadow: 'md', my: '0', mx: '4', injClass: 'custom-cell' })).toContain(
			'relative overflow-hidden my-0 mx-4 rounded-lg shadow-md'
		);
		expect(resolveCellContentClass({ bg: 'theme', clickAll: true, love: true })).toContain(
			'bg-primary/5 dark:bg-dark/5 px-3 active:bg-primary/10 dark:active:bg-dark/10 text-xl'
		);
		expect(resolveCellRowClass({ line: true, my: '0' })).toContain('border-b border-text-primary/5');
		expect(resolveCellRowClass({ line: true, my: '0', includeCursor: true, lineTone: 'black' })).toContain(
			'cursor-pointer border-b border-black/5'
		);
		expect(resolveCellTitleClass('sub')).toBe('flex flex-col text-left justify-between');
		expect(resolveCellDetailClass('info')).toBe('flex flex-col justify-between text-right');
		expect(resolveCellLeftContentClass()).toBe('flex items-center justify-between');
		expect(resolveCellRightContentClass()).toBe('flex items-center justify-between');
		expect(resolveCellLeftIconWrapClass()).toBe('mr-1 flex flex-col justify-center');
		expect(resolveCellRightAccessoryClass()).toBe('ml-1 flex flex-col justify-center');
		expect(resolveCellRightArrowAccessoryClass()).toBe('flex flex-col justify-center text-gray-700 dark:text-gray-300');
		expect(resolveCellRightArrowIconClass()).toBe('relative inline opacity-60 -top-0.5');
		expect(resolveCellTitleTextClass()).toBe('font-medium');
		expect(resolveCellSubTitleClass()).toBe('text-xs text-gray-500 dark:text-gray-400');
		expect(resolveCellDetailTextClass()).toBe('text-gray-700 dark:text-gray-300');
		expect(resolveCellInfoClass()).toBe('text-xs font-light text-gray-500 dark:text-gray-400');
		expect(resolveCellArrowSize(true)).toBe(26);
		expect(resolveCellRightState({ right: 'arrow', love: true })).toEqual({ kind: 'arrow', arrowSize: 26 });
		expect(resolveCellRightState({ right: null })).toEqual({ kind: 'none', arrowSize: 20 });
		expect(resolveCellRightState({ right: { type: 'switch', switch: { disabled: true } } })).toEqual({
			kind: 'switch',
			arrowSize: 20,
			switchProps: { disabled: true }
		});
		expect(resolveCellRightState({ right: { type: 'icon', icon: { name: 'ri-home-line' } } })).toEqual({
			kind: 'icon',
			arrowSize: 20,
			iconProps: { name: 'ri-home-line' }
		});
		expect(resolveCellCanToggleSwitch({ type: 'switch', switch: { disabled: false, async: false } })).toBe(true);
		expect(resolveCellCanToggleSwitch({ type: 'switch', switch: { async: true } })).toBe(false);
		expect(resolveCellNextSwitchActive({ active: false, right: { type: 'switch', switch: {} } })).toBe(true);
		expect(resolveCellClickAction({ clickAll: false, active: true, right: { type: 'switch', switch: {} } })).toEqual({
			shouldClick: false,
			shouldToggleSwitch: false,
			nextSwitchActive: true
		});
		expect(resolveCellClickAction({ active: false, right: { type: 'switch', switch: {} } })).toEqual({
			shouldClick: true,
			shouldToggleSwitch: true,
			nextSwitchActive: true
		});
		expect(resolveCellClickAction({ active: false, right: 'arrow' })).toEqual({
			shouldClick: true,
			shouldToggleSwitch: false,
			nextSwitchActive: false
		});
		expect(resolveCellKeyboardAction({ key: 'Enter', clickAll: true })).toEqual({
			shouldClick: true,
			shouldPreventDefault: true
		});
		expect(resolveCellKeyboardAction({ key: 'Escape', clickAll: true })).toEqual({
			shouldClick: false,
			shouldPreventDefault: false
		});
		expect(resolveCellGroupClass({ bg: 'gray', radius: 'xl', shadow: 'sm', my: '2', mx: '3' })).toContain(
			'bg-black/5 dark:bg-white/5 overflow-hidden shadow-sm'
		);

		const cellOptions = resolveCellStateOptions({
			props: {
				bg: 'theme',
				clickAll: true,
				line: true,
				lineTone: 'black',
				my: '0',
				mx: '4',
				radius: 'lg',
				shadow: 'md',
				injClass: 'custom-cell',
				love: true,
				subTitle: 'Sub',
				info: 'Info',
				right: { type: 'switch', switch: { disabled: false } }
			},
			includeCursor: true
		});
		expect(cellOptions).toMatchObject({ bg: 'theme', lineTone: 'black', includeCursor: true });
		const cellState = resolveCellDerived(cellOptions);

		expect(cellState.outerClass).toContain('relative overflow-hidden my-0 mx-4 rounded-lg shadow-md');
		expect(cellState.contentClass).toContain('bg-primary/5 dark:bg-dark/5 px-3 active:bg-primary/10 dark:active:bg-dark/10 text-xl');
		expect(cellState.rowClass).toContain('cursor-pointer border-b border-black/5');
		expect(cellState.titleClass).toBe('flex flex-col text-left justify-between');
		expect(cellState.detailClass).toBe('flex flex-col justify-between text-right');
		expect(cellState.leftContentClass).toBe('flex items-center justify-between');
		expect(cellState.rightContentClass).toBe('flex items-center justify-between');
		expect(cellState.leftIconWrapClass).toBe('mr-1 flex flex-col justify-center');
		expect(cellState.rightAccessoryClass).toBe('ml-1 flex flex-col justify-center');
		expect(cellState.rightArrowAccessoryClass).toBe('flex flex-col justify-center text-gray-700 dark:text-gray-300');
		expect(cellState.rightArrowIconClass).toBe('relative inline opacity-60 -top-0.5');
		expect(cellState.titleTextClass).toBe('font-medium');
		expect(cellState.subTitleClass).toBe('text-xs text-gray-500 dark:text-gray-400');
		expect(cellState.detailTextClass).toBe('text-gray-700 dark:text-gray-300');
		expect(cellState.infoClass).toBe('text-xs font-light text-gray-500 dark:text-gray-400');
		expect(cellState.tabIndex).toBe(0);
		expect(cellState.rightState).toEqual({
			kind: 'switch',
			arrowSize: 26,
			switchProps: { disabled: false }
		});
	});
});

describe('num keyboard derived', () => {
	test('calculates panel height from spacing, key height and preview state', () => {
		expect(resolveNumKeyboardInitialValue()).toBe('');
		expect(resolveNumKeyboardInitialValue(null)).toBe('');
		expect(resolveNumKeyboardInitialValue('123')).toBe('123');
		expect(resolveNumKeyboardInitialVisible(undefined)).toBe(true);
		expect(resolveNumKeyboardInitialVisible(undefined, false)).toBe(false);
		expect(resolveNumKeyboardInitialVisible(true)).toBe(true);
		expect(resolveNumKeyboardCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveNumKeyboardCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolveNumKeyboardCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveNumKeyboardVisibleChangeAction({ visible: true, previousVisible: undefined, clear: true, keyboardHeight: 232 })).toEqual({
			nextPreviousVisible: true,
			openHeight: 232,
			shouldClearValue: true,
			shouldEmitClose: false,
			shouldEmitOpen: true,
			shouldSkip: false
		});
		expect(resolveNumKeyboardVisibleChangeAction({ visible: true, previousVisible: true, clear: true, keyboardHeight: 232 })).toMatchObject(
			{
				shouldClearValue: false,
				shouldEmitOpen: false,
				shouldSkip: true
			}
		);
		expect(resolveNumKeyboardVisibleChangeAction({ visible: false, previousVisible: true, keyboardHeight: 232 })).toMatchObject({
			nextPreviousVisible: false,
			shouldEmitClose: true,
			shouldEmitOpen: false
		});
		expect(resolveNumKeyboardCloseEmissionAction({ shouldEmitClose: true, skipNextCloseEmission: true })).toEqual({
			nextSkipNextCloseEmission: false,
			shouldEmitClose: false,
			shouldSkipCloseEmission: true
		});
		expect(resolveNumKeyboardCloseEmissionAction({ shouldEmitClose: true, skipNextCloseEmission: false })).toEqual({
			nextSkipNextCloseEmission: false,
			shouldEmitClose: true,
			shouldSkipCloseEmission: false
		});
		expect(resolveNumKeyboardUsePopup(null)).toBe(false);
		expect(resolveNumKeyboardUsePopup({})).toBe(true);
		expect(resolveNumKeyboardDoneText(undefined, { done: 'Done' })).toBe('Done');
		expect(resolveNumKeyboardDoneText('OK', { done: 'Done' })).toBe('OK');
		expect(resolveNumKeyboardPopupProps({ visible: true, mask: { clickable: true }, position: 'bottom' }, 232)).toEqual({
			size: 0,
			mask: { opacity: '0', clickable: true },
			transitionDistance: 232,
			position: 'bottom'
		});
		expect(resolveNumKeyboardHeight()).toBe(232);
		expect(resolveNumKeyboardHeight({ preview: true })).toBe(276);
		expect(resolveNumKeyboardHeight({ type: 'block', p: '1', height: '8' })).toBe(140);
	});

	test('resolves shared keyboard preview mask state', () => {
		expect(resolveKeyboardPreviewState({ value: '123', previewMask: true })).toEqual({
			showMask: true,
			maskIndexes: [0, 1, 2],
			displayValue: '',
			dotClass: keyboardPreviewDotClass
		});
		expect(resolveKeyboardPreviewState({ value: '123', previewMask: false })).toEqual({
			showMask: false,
			maskIndexes: [],
			displayValue: '123',
			dotClass: keyboardPreviewDotClass
		});
		expect(resolveKeyboardPreviewState({ value: '', previewMask: true })).toEqual({
			showMask: false,
			maskIndexes: [],
			displayValue: '',
			dotClass: keyboardPreviewDotClass
		});
		expect(resolveRandomBase36Suffix({ random: 0.5, end: 9 })).toBe('i');
		expect(resolveFocusableTabIndex()).toBe(0);
		expect(resolveFocusableTabIndex({ disabled: true })).toBe(-1);
		expect(resolveDevicePixelRatio()).toBe(1);
		expect(resolveDevicePixelRatio({ value: 0 })).toBe(1);
		expect(resolveDevicePixelRatio({ value: 2 })).toBe(2);
		expect(resolveViewportDimension()).toBe(0);
		expect(resolveViewportDimension({ value: 320 })).toBe(320);
		expect(resolveViewportDimension({ value: null, fallback: 640 })).toBe(640);
		expect(resolveViewportFallbackDimension({ value: 0, fallback: 375 })).toBe(375);
		expect(resolveViewportFallbackDimension({ value: 812, fallback: 768 })).toBe(812);
		expect(resolveHiddenScrollbarCss({ selector: '.no-scrollbar' })).toContain('.no-scrollbar::-webkit-scrollbar');
		expect(resolveHiddenScrollbarCss({ selector: '.picker-selected-tags', includeFirefox: true })).toContain('scrollbar-width: none;');
		const namedValues = { cubicOut: 'default-ease', linear: 'linear-ease', none: '' };
		expect(resolveMapValue(namedValues, 'linear', 'cubicOut')).toBe('linear-ease');
		expect(resolveMapValue(namedValues, 'missing', 'cubicOut')).toBe('default-ease');
		expect(resolveMapValue(namedValues, 'none', 'cubicOut')).toBe('');
		expect(toStylePropertyName('-webkit-animation-duration')).toBe('WebkitAnimationDuration');
		expect(
			parseStyleString('border-color: red; border-top-color: blue; opacity: 0; color: false; background: linear-gradient(red:blue);')
		).toEqual({
			borderTopColor: 'blue',
			borderRightColor: 'red',
			borderBottomColor: 'red',
			borderLeftColor: 'red',
			opacity: '0',
			background: 'linear-gradient(red:blue)'
		});
	});

	test('resolves keyboard row order from layout direction', () => {
		expect(resolveNumKeyboardRows()).toEqual({
			topKeys: ['1', '2', '3'],
			middleKeys: ['4', '5', '6'],
			bottomKeys: ['7', '8', '9']
		});
		expect(resolveNumKeyboardRows(true)).toEqual({
			topKeys: ['7', '8', '9'],
			middleKeys: ['4', '5', '6'],
			bottomKeys: ['1', '2', '3']
		});
	});

	test('resolves key classes for regular and done keys', () => {
		const regularClass = resolveNumKeyboardKeyClass({
			key: '1',
			height: '10',
			radius: 'lg',
			keyClass: 'custom-key'
		});
		const doneClass = resolveNumKeyboardKeyClass({ key: 'done', type: 'block', height: '8' });

		expect(regularClass).toContain('bg-bg-highlight dark:bg-bg-highlight-dark');
		expect(regularClass).toContain('h-10 text-base rounded-lg custom-key');
		expect(doneClass).not.toContain('bg-bg-highlight');
		expect(doneClass).toContain('h-8 text-sm');
	});

	test('resolves zero key column spans', () => {
		expect(resolveNumKeyboardZeroColClass({ done: true, dot: true, close: true })).toBe('col-span-1');
		expect(resolveNumKeyboardZeroColClass({ done: true, dot: true, close: false })).toBe('col-span-2');
		expect(resolveNumKeyboardZeroColClass({ done: true, dot: false, close: false })).toBe('col-span-3');
		expect(resolveNumKeyboardZeroColClass({ done: false, dot: false, close: false })).toBe('col-span-2');
		expect(resolveNumKeyboardZeroColClass({ done: false, dot: true, close: false })).toBe('col-span-1');
		expect(resolveNumKeyboardZeroKeyClass({ baseClass: 'base-key', done: true, dot: false, close: false })).toBe('base-key col-span-3');
	});

	test('resolves close key visibility from layout state', () => {
		expect(resolveNumKeyboardShowCloseKey({ done: true, dot: true, close: true })).toBe(true);
		expect(resolveNumKeyboardShowCloseKey({ done: true, dot: false, close: false })).toBe(false);
		expect(resolveNumKeyboardShowCloseKey({ done: false, dot: true, close: true })).toBe(false);
		expect(resolveNumKeyboardShowCloseKey({ done: false, dot: false, close: true })).toBe(true);
	});

	test('resolves panel and grid classes', () => {
		expect(resolveNumKeyboardPanelClass({ type: 'block', p: '4', panelClass: 'custom-panel' })).toBe(
			'bg-black/5 text-center dark:bg-white/5 border-t border-gray-100 dark:border-gray-950 p-4 custom-panel'
		);
		expect(resolveNumKeyboardGridClass()).toBe('grid gap-2 grid-cols-4');
		expect(resolveNumKeyboardGridClass({ type: 'block', done: false })).toBe('grid gap-px grid-cols-3');
		expect(resolveNumKeyboardPreviewClass()).toBe(
			'mb-2 flex h-11 items-center justify-center rounded-(--radius-form) bg-bg-highlight text-xl font-semibold tracking-widest dark:bg-bg-highlight-dark'
		);
		expect(resolveNumKeyboardSvgClass()).toBe('mx-auto block fill-current');
		expect(resolveNumKeyboardDoneKeyClass({ baseClass: 'base', doneDisabled: true, doneClass: 'custom-done' })).toBe(
			'base bg-primary dark:bg-dark row-span-3 h-full text-text-on-primary dark:text-text-on-dark !opacity-50 transition-none active:!scale-100 custom-done'
		);
	});

	test('resolves render-ready keyboard state', () => {
		const options = resolveNumKeyboardStateOptions({
			props: {
				type: 'block',
				p: '1',
				space: '3',
				height: '10',
				preview: true,
				done: true,
				dot: false,
				close: true,
				doneClass: 'custom-done',
				doneText: undefined,
				keyClass: 'custom-key',
				panelClass: 'custom-panel',
				popup: { visible: true, mask: { clickable: true }, position: 'bottom' },
				radius: 'lg',
				reverse: true,
				previewMask: true
			},
			doneDisabled: true,
			defaults: { done: '完成' },
			value: '123'
		});
		expect(options).toMatchObject({
			type: 'block',
			p: '1',
			space: '3',
			height: '10',
			preview: true,
			done: true,
			dot: false,
			close: true,
			doneClass: 'custom-done',
			doneDisabled: true,
			doneText: undefined,
			defaults: { done: '完成' },
			keyClass: 'custom-key',
			panelClass: 'custom-panel',
			popup: { visible: true, mask: { clickable: true }, position: 'bottom' },
			radius: 'lg',
			reverse: true,
			value: '123',
			previewMask: true
		});
		const keyboardState = resolveNumKeyboardDerived(options);
		expect(keyboardState.usePopup).toBe(true);
		expect(keyboardState.doneText).toBe('完成');
		expect(keyboardState.keyboardHeight).toBe(216);
		expect(keyboardState.keyRows.topKeys).toEqual(['7', '8', '9']);
		expect(keyboardState.svgSize).toBe(20);
		expect(keyboardState.previewState).toEqual({
			showMask: true,
			maskIndexes: [0, 1, 2],
			displayValue: '',
			dotClass: keyboardPreviewDotClass
		});
		expect(keyboardState.showCloseKey).toBe(true);
		expect(keyboardState.panelClass).toBe(
			'bg-black/5 text-center dark:bg-white/5 border-t border-gray-100 dark:border-gray-950 p-1 custom-panel'
		);
		expect(keyboardState.previewClass).toBe(
			'mb-2 flex h-11 items-center justify-center rounded-(--radius-form) bg-bg-highlight text-xl font-semibold tracking-widest dark:bg-bg-highlight-dark'
		);
		expect(keyboardState.gridClass).toBe('grid gap-px grid-cols-4');
		expect(keyboardState.svgClass).toBe('mx-auto block fill-current');
		expect(keyboardState.keyClasses['7']).toContain('h-10 text-base custom-key');
		expect(keyboardState.zeroKeyClass).toContain('col-span-2');
		expect(keyboardState.doneKeyClass).toContain('!opacity-50 transition-none active:!scale-100 custom-done');
		expect(keyboardState.popupProps).toEqual({
			size: 0,
			mask: { opacity: '0', clickable: true },
			transitionDistance: 216,
			position: 'bottom'
		});
	});

	test('calculates next value without handling events or visibility', () => {
		expect(resolveNumKeyboardNextValue({ value: '12', key: '3' })).toBe('123');
		expect(resolveNumKeyboardNextValue({ value: '12', key: 'delete' })).toBe('1');
		expect(resolveNumKeyboardNextValue({ value: '12', key: 'done' })).toBe('12');
		expect(resolveNumKeyboardKeyAction({ value: '12', key: '3' })).toEqual({
			nextValue: '123',
			shouldUpdateValue: true,
			shouldClose: false
		});
		expect(resolveNumKeyboardKeyAction({ value: '12', key: 'delete' })).toEqual({
			nextValue: '1',
			shouldUpdateValue: true,
			shouldClose: false
		});
		expect(resolveNumKeyboardKeyAction({ value: '12', key: 'close' })).toEqual({
			nextValue: '12',
			shouldUpdateValue: false,
			shouldClose: true
		});
		expect(resolveNumKeyboardKeyAction({ value: '12', key: 'done', doneDisabled: true })).toEqual({
			nextValue: '12',
			shouldUpdateValue: false,
			shouldClose: false
		});
		expect(resolveNumKeyboardKeyFlow({ value: '12', key: '3' })).toEqual({
			nextValue: '123',
			shouldUpdateValue: true,
			shouldClose: false,
			closeAction: null
		});
		expect(resolveNumKeyboardKeyFlow({ value: '12', key: 'close', closeOptions: { emitClose: false } })).toEqual({
			nextValue: '12',
			shouldUpdateValue: false,
			shouldClose: true,
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: false }
		});
		expect(resolveNumKeyboardKeyFlow({ value: '12', key: 'done', doneDisabled: true })).toEqual({
			nextValue: '12',
			shouldUpdateValue: false,
			shouldClose: false,
			closeAction: null
		});
	});
});

describe('pagination derived', () => {
	test('resolves page ranges and ellipsis pages', () => {
		const totalPage = resolvePaginationTotalPage({ total: 95, pageSize: 10 });
		const showPreEllipsis = resolvePaginationShowPreEllipsis({ current: 6, maxShowPage: 7 });
		const showNextEllipsis = resolvePaginationShowNextEllipsis({ current: 6, totalPage, maxShowPage: 7 });
		const middlePages = resolvePaginationMiddlePages({ current: 6, totalPage, maxShowPage: 7, showPreEllipsis, showNextEllipsis });

		expect(totalPage).toBe(10);
		expect(showPreEllipsis).toBe(true);
		expect(showNextEllipsis).toBe(true);
		expect(middlePages).toEqual([5, 6, 7]);
		expect(
			resolvePaginationPreEllipsisPages({ current: 6, totalPage, maxShowPage: 7, showPreEllipsis, showNextEllipsis, middlePages })
		).toEqual([2, 3, 4]);
		expect(
			resolvePaginationNextEllipsisPages({ current: 6, totalPage, maxShowPage: 7, showPreEllipsis, showNextEllipsis, middlePages })
		).toEqual([8, 9]);
		expect(resolvePaginationLeadingPages({ current: 2, totalPage, maxShowPage: 7, showPreEllipsis: false })).toEqual([2, 3, 4, 5]);
		expect(resolvePaginationTrailingPages({ current: 9, totalPage, maxShowPage: 7, showNextEllipsis: false })).toEqual([6, 7, 8, 9]);
		expect(resolvePaginationAllPages(4)).toEqual([1, 2, 3, 4]);
		expect(resolvePaginationMiddlePageActive({ index: 1, pageLength: 3 })).toBe(true);
		expect(resolvePaginationMiddlePageActive({ index: 0, pageLength: 3 })).toBe(false);
		expect(
			resolvePaginationTexts({
				onePageText: 'Only one',
				defaults: {
					common: { noData: 'No data' },
					pagination: { defaultOnlyOnePage: 'One page' }
				}
			})
		).toEqual({ noDataText: 'No data', onePageText: 'Only one' });
	});

	test('resolves pagination state actions without events', () => {
		expect(resolvePaginationEllipsisToggleAction({ pageCount: 2, visible: false })).toEqual({
			shouldToggle: true,
			nextVisible: true
		});
		expect(resolvePaginationEllipsisToggleAction({ pageCount: 0, visible: true })).toEqual({
			shouldToggle: false,
			nextVisible: true
		});
		expect(resolvePaginationNavigateAction({ current: 2, totalPage: 4, direction: 'next' })).toEqual({
			shouldChange: true,
			nextCurrent: 3,
			nextShowNextOmitPage: false,
			nextShowPreOmitPage: false
		});
		expect(resolvePaginationNavigateAction({ current: 1, totalPage: 4, direction: 'pre' })).toEqual({
			shouldChange: false,
			nextCurrent: 1,
			nextShowNextOmitPage: false,
			nextShowPreOmitPage: false
		});
		expect(resolvePaginationSelectAction(5)).toEqual({
			shouldChange: true,
			nextCurrent: 5,
			nextShowNextOmitPage: false,
			nextShowPreOmitPage: false
		});
		expect(resolvePaginationNextOmitSyncAction({ totalPage: 5, maxShowPage: 7, showNextOmitPage: true })).toEqual({
			shouldSync: true,
			nextShowNextOmitPage: false
		});
		expect(resolvePaginationNextOmitSyncAction({ totalPage: 8, maxShowPage: 7, showNextOmitPage: true })).toEqual({
			shouldSync: false,
			nextShowNextOmitPage: true
		});
	});

	test('resolves classes and second page styles', () => {
		expect(resolvePaginationRadiusClass('lg')).toBe('rounded-lg');
		expect(resolvePaginationBgClass('theme')).toBe('bg-primary/5 dark:bg-dark/5');
		expect(resolvePaginationRootClass({ bg: 'white', radius: 'sm', injClass: 'custom-pagination' })).toBe(
			'relative flex justify-between bg-white dark:bg-gray-800 rounded-sm py-1 text-center text-sm custom-pagination'
		);
		expect(resolvePaginationPageClass({ active: true, type: 'block', radius: 'md' })).toContain('bg-primary text-text-on-primary');
		expect(resolvePaginationPageClass({ active: false, type: 'bold', radiusClass: 'rounded-lg' })).toBe(
			'flex-1 border py-2 border-transparent opacity-50 rounded-lg'
		);
		expect(resolvePaginationNavButtonClass({ enabled: true, radius: 'full' })).toContain(
			'text-primary dark:text-dark rounded-full active:scale-75'
		);
		expect(resolvePaginationTextClass()).toBe('flex-1 border border-transparent py-2');
		expect(resolvePaginationIconClass()).toBe('mx-auto block');
		expect(resolvePaginationMutedIconClass()).toBe('mx-auto block text-black/50 dark:text-white/50');
		expect(resolvePaginationSecondPageContainerClass('pre')).toContain('-translate-x-1/2');
		expect(resolvePaginationSecondPageContentClass('gray')).toContain('pagination-second-page-contents second-page-contents grid');
		expect(resolvePaginationSecondPageArrowClass('theme')).toContain('border-t-primary-50');
		expect(resolvePaginationSecondPageStyleValue({ placement: 'next', pageCol: 3, maxShowPage: 7 })).toEqual({
			width: 'calc(33.33333333333333% + 8px)',
			right: '27.77777777777778%'
		});
		expect(resolvePaginationSecondPageStyleString({ placement: 'pre', pageCol: 3, maxShowPage: 7 })).toBe(
			'width: calc(33.33333333333333% + 8px);left:27.77777777777778%;'
		);
		expect(resolvePaginationSecondPageGridStyleValue(4)).toEqual({ gridTemplateColumns: 'repeat(4, minmax(0, 1fr))' });
		expect(resolvePaginationSecondPageGridStyleString(4)).toBe('grid-template-columns: repeat(4, minmax(0, 1fr));');
	});

	test('resolves render-ready pagination state', () => {
		const options = resolvePaginationStateOptions({
			props: {
				total: 95,
				pageSize: 10,
				maxShowPage: 7,
				type: 'block',
				radius: 'md',
				bg: 'white',
				injClass: 'custom-pagination'
			},
			current: 6,
			showNextOmitPage: true,
			showPreOmitPage: false,
			defaults: {
				common: { noData: 'No data' },
				pagination: { defaultOnlyOnePage: 'One page' }
			}
		});
		expect(options).toMatchObject({
			total: 95,
			pageSize: 10,
			current: 6,
			maxShowPage: 7,
			type: 'block',
			radius: 'md',
			bg: 'white',
			injClass: 'custom-pagination',
			showNextOmitPage: true,
			showPreOmitPage: false,
			defaults: {
				common: { noData: 'No data' },
				pagination: { defaultOnlyOnePage: 'One page' }
			}
		});
		const state = resolvePaginationDerived(options);

		expect(state.totalPage).toBe(10);
		expect(state.showComplexPages).toBe(true);
		expect(state.rootClass).toContain('custom-pagination');
		expect(state.textClass).toBe('flex-1 border border-transparent py-2');
		expect(state.iconClass).toBe('mx-auto block');
		expect(state.mutedIconClass).toBe('mx-auto block text-black/50 dark:text-white/50');
		expect(state.canPre).toBe(true);
		expect(state.canNext).toBe(true);
		expect(state.middlePageItems.map(({ page, active }) => ({ page, active }))).toEqual([
			{ page: 5, active: false },
			{ page: 6, active: true },
			{ page: 7, active: false }
		]);
		expect(state.middlePageItems[1]?.className).toContain('bg-primary text-text-on-primary');
		expect(state.nextEllipsisClass).toContain('bg-primary text-text-on-primary');
		expect(state.inactivePageClass).toContain('border-transparent');
	});

	test('resolves render-ready second page popover state', () => {
		const options = resolvePaginationSecondPageStateOptions({
			props: { bg: 'theme', dropShadow: false, maxShowPage: 9, pageCol: 4, pages: [2, 3], placement: 'pre' }
		});
		const state = resolvePaginationSecondPageDerived(options);

		expect(options).toMatchObject({ bg: 'theme', dropShadow: false, maxShowPage: 9, pageCol: 4, pages: [2, 3], placement: 'pre' });
		expect(state.visible).toBe(true);
		expect(state.containerClass).not.toContain('drop-shadow-sm');
		expect(state.containerStyleValue).toEqual({
			width: 'calc(36.36363636363637% + 8px)',
			left: '22.727272727272727%'
		});
		expect(state.gridStyleString).toBe('grid-template-columns: repeat(4, minmax(0, 1fr));');
		expect(state.arrowClass).toContain('border-t-primary-50');
		expect(resolvePaginationSecondPageDerived({ placement: 'next', pages: [] }).visible).toBe(false);
	});
});

describe('progress derived', () => {
	test('resolves progress classes and percent values', () => {
		const radiusClass = resolveProgressRadiusClass('lg');
		const durationClass = resolveProgressDurationClass('500');
		const heightClass = resolveProgressHeightClass({ percentPosition: 'right', height: '3' });
		const fillClass = resolveProgressFillClass(true);

		expect(heightClass).toBe('h-3');
		expect(resolveProgressHeightClass({ percentPosition: 'inner', height: '3' })).toBe('');
		expect(radiusClass).toBe('rounded-lg');
		expect(durationClass).toBe('duration-500');
		expect(fillClass).toBe('bg-primary-300 dark:bg-dark-800');
		expect(resolveProgressRootClass()).toBe('flex items-center justify-between space-x-2');
		expect(resolveProgressRightLabelClass()).toBe('text-xs');
		expect(resolveProgressTrackClass({ heightClass, radiusClass, trackInjClass: 'custom-track' })).toContain('custom-track');
		expect(resolveProgressBarClass({ fillClass, durationClass, heightClass, radiusClass, injClass: 'custom-bar' })).toContain(
			'transition-all duration-500'
		);
		expect(resolveProgressInnerTextClass({ percent: 5, overflowPercent: 10 })).toContain('translate-x-full text-text-primary');
		expect(resolveProgressInnerTextClass({ percent: 50, overflowPercent: 10 })).toContain('text-text-on-primary');
		expect(resolveProgressBlockLabelClass({ fillClass, radiusClass, injClass: 'custom-label' })).toContain('custom-label');
		expect(resolveProgressPercentStyleValue(66)).toBe('66%');
		expect(resolveProgressBarStyleValue(66)).toEqual({ width: '66%' });
		expect(resolveProgressBarStyleString(66)).toBe('width:66%;');
		expect(resolveProgressBlockLabelStyleValue(66)).toEqual({ left: '66%' });
		expect(resolveProgressBlockLabelStyleString(66)).toBe('left:66%;');
		expect(formatProgressPercentText(66)).toBe('66%');
		expect(resolveProgressLabelPlacement('custom')).toBe('none');
		expect(resolveProgressLabelState({ percent: 24, percentPosition: 'inner' })).toEqual({
			placement: 'inner',
			shouldRender: true,
			showInner: true,
			showBlock: false,
			showRight: false,
			showCustomContent: false,
			showFallbackText: true,
			text: '24%'
		});
		expect(resolveProgressLabelState({ percent: 80, percentPosition: 'right', hasCustomContent: true })).toEqual({
			placement: 'right',
			shouldRender: true,
			showInner: false,
			showBlock: false,
			showRight: true,
			showCustomContent: true,
			showFallbackText: false,
			text: '80%'
		});
		expect(resolveProgressLabelState({ percentPosition: null })).toMatchObject({ placement: 'none', shouldRender: false });

		const progressOptions = resolveProgressStateOptions({
			props: {
				percent: 24,
				percentPosition: 'block',
				height: '3',
				radius: 'lg',
				inactive: true,
				overflowPercent: 10,
				duration: '500',
				injClass: 'custom-bar',
				trackInjClass: 'custom-track'
			},
			hasCustomContent: true
		});
		expect(progressOptions).toMatchObject({ percent: 24, percentPosition: 'block', hasCustomContent: true });
		const progressState = resolveProgressDerived(progressOptions);

		expect(progressState.heightClass).toBe('h-3');
		expect(progressState.radiusClass).toBe('rounded-lg');
		expect(progressState.durationClass).toBe('duration-500');
		expect(progressState.fillClass).toBe('bg-primary-300 dark:bg-dark-800');
		expect(progressState.rootClass).toBe('flex items-center justify-between space-x-2');
		expect(progressState.rightLabelClass).toBe('text-xs');
		expect(progressState.trackClass).toContain('custom-track');
		expect(progressState.barClass).toContain('transition-all duration-500 h-3 rounded-lg custom-bar');
		expect(progressState.innerTextClass).toContain('text-text-on-primary');
		expect(progressState.blockLabelClass).toContain('custom-bar');
		expect(progressState.barStyleValue).toEqual({ width: '24%' });
		expect(progressState.barStyleString).toBe('width:24%;');
		expect(progressState.blockLabelStyleValue).toEqual({ left: '24%' });
		expect(progressState.blockLabelStyleString).toBe('left:24%;');
		expect(progressState.labelState).toMatchObject({
			placement: 'block',
			showBlock: true,
			showCustomContent: true,
			showFallbackText: false
		});
	});
});

describe('pullRefresh derived', () => {
	test('resolves gesture intent and pull distance', () => {
		expect(resolvePullRefreshGestureIntent({ startX: 10, startY: 10, currentX: 14, currentY: 80 }).isPullDown).toBe(true);
		expect(resolvePullRefreshGestureIntent({ startX: 10, startY: 10, currentX: 90, currentY: 16 }).isHorizontal).toBe(true);
		expect(resolvePullRefreshDistance({ deltaY: 80, pullFactor: 0.5 })).toBe(40);
	});

	test('resolves status and release action', () => {
		expect(resolvePullRefreshStatus({ distance: 0 })).toBe('normal');
		expect(resolvePullRefreshStatus({ distance: 30, threshold: 60 })).toBe('pulling');
		expect(resolvePullRefreshStatus({ distance: 80, threshold: 60 })).toBe('canRelease');
		expect(resolvePullRefreshStatus({ status: 'refreshing' })).toBe('refreshing');
		expect(resolvePullRefreshReleaseAction({ distance: 80, headHeight: 50, threshold: 60 })).toEqual({
			nextDistance: 50,
			nextStatus: 'refreshing',
			shouldRefresh: true
		});
		expect(resolvePullRefreshReleaseAction({ disabled: true, distance: 80, threshold: 60 }).shouldRefresh).toBe(false);
	});
});

describe('infiniteScroll derived', () => {
	test('resolves distance by direction', () => {
		expect(resolveInfiniteScrollDistance({ direction: 'down', scrollTop: 600, clientHeight: 300, scrollHeight: 1000 })).toBe(100);
		expect(resolveInfiniteScrollDistance({ direction: 'up', scrollTop: 24, clientHeight: 300, scrollHeight: 1000 })).toBe(24);
	});

	test('resolves load guard and status', () => {
		expect(resolveInfiniteScrollShouldLoad({ distance: 120, offset: 300 })).toBe(true);
		expect(resolveInfiniteScrollShouldLoad({ distance: 320, offset: 300 })).toBe(false);
		expect(resolveInfiniteScrollShouldLoad({ distance: 120, loading: true })).toBe(false);
		expect(resolveInfiniteScrollShouldLoad({ distance: 120, finished: true })).toBe(false);
		expect(resolveInfiniteScrollShouldLoad({ distance: 120, error: true })).toBe(false);
		expect(resolveInfiniteScrollShouldLoad({ distance: 120, disabled: true })).toBe(false);
		expect(resolveInfiniteScrollStatus({ loading: true, error: true, finished: true })).toBe('loading');
		expect(resolveInfiniteScrollStatus({ error: true })).toBe('error');
		expect(resolveInfiniteScrollStatus({ finished: true })).toBe('finished');
	});
});

describe('progress loop derived', () => {
	test('resolves circle math, gradient state and classes', () => {
		const radius = resolveProgressLoopRadius(2);
		const circleLength = resolveProgressLoopCircleLength(radius);
		const hasGradient = resolveProgressLoopHasGradient(['#000', '#fff']);
		const durationClass = resolveProgressLoopDurationClass('700');

		expect(radius).toBe(11);
		expect(circleLength).toBe(2 * Math.PI * 11);
		expect(resolveProgressLoopDashOffset({ percent: 25, circleLength })).toBe(circleLength * 0.75);
		expect(hasGradient).toBe(true);
		expect(resolveProgressLoopGradientStops(['#000', '#fff'])).toEqual({ startColor: '#fff', endColor: '#000' });
		expect(resolveProgressLoopGradientStopStyleValue('#fff')).toEqual({ stopColor: '#fff' });
		expect(resolveProgressLoopGradientStopStyleString('#fff')).toBe('stop-color: #fff;');
		expect(resolveProgressLoopGradientStopStyles({ startColor: '#fff', endColor: '#000' })).toEqual({
			startStyle: { stopColor: '#fff' },
			endStyle: { stopColor: '#000' },
			startStyleString: 'stop-color: #fff;',
			endStyleString: 'stop-color: #000;'
		});
		expect(resolveProgressLoopGradientStops(['#000'])).toBeNull();
		expect(resolveProgressLoopSvgClass(true)).toBe('-rotate-90 -scale-y-100');
		expect(resolveProgressLoopTrackClass('custom-track')).toContain('custom-track');
		expect(resolveProgressLoopRootClass()).toBe('relative');
		expect(resolveProgressLoopLabelClass()).toBe('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2');
		expect(resolveProgressLoopPercentTextClass()).toBe('text-xs');
		expect(durationClass).toBe('duration-700');
		expect(resolveProgressLoopBarClass({ hasGradient: false, durationClass, injClass: 'custom-bar' })).toContain(
			'stroke-primary dark:stroke-dark transition-all duration-700'
		);
		expect(resolveProgressLoopBarClass({ hasGradient: true, durationClass })).not.toContain('stroke-primary');
		expect(resolveProgressLoopLineCap(true)).toBe('butt');
		expect(resolveProgressLoopGradientId()).toBe(progressLoopDefaultGradientId);
		expect(resolveProgressLoopGradientId('abc')).toBe('gradient_ProgressLoop_abc');
		expect(resolveProgressLoopGradientIdSuffix({ random: 0.5 })).toBe('i');
		expect(resolveProgressLoopStrokeValue({ hasGradient, gradientId: progressLoopDefaultGradientId })).toBe('url(#gradient_ProgressLoop)');
		expect(resolveProgressLoopStrokeValue({ hasGradient: false, gradientId: progressLoopDefaultGradientId })).toBeUndefined();
		expect(formatProgressLoopPercentText(66)).toBe('66%');
	});

	test('resolves render-ready progress loop state', () => {
		const options = resolveProgressLoopStateOptions({
			props: {
				butt: true,
				duration: '700',
				gradient: ['#000', '#fff'],
				injClass: 'custom-bar',
				percent: 25,
				reverse: true,
				strokeWidth: 2,
				trackInjClass: 'custom-track'
			},
			gradientIdSuffix: 'abc'
		});
		expect(options).toMatchObject({ percent: 25, gradientIdSuffix: 'abc' });
		const state = resolveProgressLoopDerived(options);

		expect(state.radius).toBe(11);
		expect(state.dashOffset).toBe(state.circleLength * 0.75);
		expect(state.gradientId).toBe('gradient_ProgressLoop_abc');
		expect(state.gradientStopStyles?.startStyle).toEqual({ stopColor: '#fff' });
		expect(state.strokeValue).toBe('url(#gradient_ProgressLoop_abc)');
		expect(state.barClass).toContain('transition-all duration-700 custom-bar');
		expect(state.trackClass).toContain('custom-track');
		expect(state.svgClass).toBe('-rotate-90 -scale-y-100');
		expect(state.rootClass).toBe('relative');
		expect(state.labelClass).toBe('absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2');
		expect(state.percentTextClass).toBe('text-xs');
		expect(state.lineCap).toBe('butt');
		expect(state.percentText).toBe('25%');
	});
});

describe('switch derived', () => {
	test('resolves classes, thumb style and next state', () => {
		const radiusClass = resolveSwitchRadiusClass('full');
		const rootClass = resolveSwitchRootClass({ active: true, disabled: false, radiusClass, injClass: 'custom-switch' });

		expect(radiusClass).toBe('rounded-full');
		expect(rootClass).toContain('bg-primary dark:bg-dark custom-switch');
		expect(resolveSwitchRootClass({ active: false, disabled: true, radiusClass })).toContain('cursor-not-allowed opacity-50');
		expect(resolveSwitchThumbClass(radiusClass)).toContain('rounded-full');
		expect(resolveSwitchThumbLeft(true)).toBe('1.625rem');
		expect(resolveSwitchThumbTransform(true)).toBe('scaleX(1.3)');
		expect(resolveSwitchThumbStyle({ active: false, isLong: false })).toEqual({ left: '0.125rem', transform: 'scaleX(1)' });
		expect(resolveSwitchThumbStyleString({ active: true, isLong: true })).toBe('left:1.625rem;transform:scaleX(1.3)');
		expect(resolveSwitchNextActive({ active: false, disabled: false, async: false })).toBe(true);
		expect(resolveSwitchNextActive({ active: false, disabled: false, async: true })).toBe(false);
		expect(resolveSwitchShouldToggle({ disabled: false, async: false })).toBe(true);
		expect(resolveSwitchClickAction({ active: false, disabled: false, async: false })).toEqual({
			nextActive: true,
			shouldChange: true,
			shouldClick: true
		});
		expect(resolveSwitchClickAction({ active: false, disabled: false, async: true })).toEqual({
			nextActive: false,
			shouldChange: false,
			shouldClick: true
		});
		expect(resolveSwitchClickAction({ active: false, disabled: true, async: false })).toEqual({
			nextActive: false,
			shouldChange: false,
			shouldClick: false
		});
		expect(resolveSwitchActiveSyncAction({ active: true, disabled: false })).toEqual({ nextActive: true, shouldSync: true });
		expect(resolveSwitchActiveSyncAction({ active: true, disabled: true })).toEqual({ nextActive: true, shouldSync: false });
		expect(resolveSwitchStretchAction({ disabled: false })).toEqual({ resetDelay: 150, shouldStretch: true });
		expect(resolveSwitchStretchAction({ disabled: true })).toEqual({ resetDelay: 150, shouldStretch: false });
		expect(resolveSwitchStretchResetAction()).toEqual({ nextIsLong: false });
		expect(resolveSwitchStretchFlow({ disabled: false })).toEqual({
			resetDelay: 150,
			shouldStretch: true,
			nextIsLong: true,
			resetNextIsLong: false
		});
		expect(resolveSwitchStretchFlow({ disabled: true })).toEqual({
			resetDelay: 150,
			shouldStretch: false,
			nextIsLong: false,
			resetNextIsLong: false
		});
		expect(resolveSwitchContentVisibilityClass(true, false)).toBe('hidden');
		expect(resolveSwitchStateIconClasses(true)).toEqual({ falseClass: 'hidden', trueClass: '' });
		expect(resolveSwitchStateTrueMarkClass()).toBe('ml-2 mt-1 h-3 w-1 rounded-full bg-text-primary/80 dark:bg-text-dark/90');
		expect(resolveSwitchStateFalseMarkClass()).toBe(
			'ml-1 mt-1 h-3 w-3 rounded-full border-2 border-text-primary/80 dark:border-text-dark/90'
		);
		expect(resolveSwitchLoadingClass()).toBe('m-0.5');
		expect(resolveSwitchInsideArrayValue(['off', 'on'], true)).toBe('on');
		expect(resolveSwitchInsideState({ inside: 'state', active: true })).toEqual({
			active: true,
			falseClass: 'hidden',
			kind: 'state',
			trueClass: ''
		});
		expect(resolveSwitchInsideState({ inside: 'loading' })).toEqual({ kind: 'loading' });
		expect(resolveSwitchInsideState({ hasTrueChild: true, hasFalseChild: true, active: true })).toEqual({
			falseClass: 'hidden',
			kind: 'children',
			trueClass: ''
		});
		expect(resolveSwitchInsideState({ inside: ['off', 'on'], active: false })).toEqual({ kind: 'array', value: 'off' });
		expect(resolveSwitchInsideState()).toEqual({ kind: 'none' });
		const switchOptions = resolveSwitchStateOptions({
			props: { disabled: false, radius: 'full', injClass: 'custom-switch', inside: 'state' },
			active: true,
			isLong: true,
			hasTrueChild: false,
			hasFalseChild: false
		});
		expect(switchOptions).toMatchObject({ active: true, disabled: false, radius: 'full', isLong: true, inside: 'state' });
		expect(resolveSwitchDerived(switchOptions)).toMatchObject({
			radiusClass: 'rounded-full',
			stateTrueMarkClass: 'ml-2 mt-1 h-3 w-1 rounded-full bg-text-primary/80 dark:bg-text-dark/90',
			stateFalseMarkClass: 'ml-1 mt-1 h-3 w-3 rounded-full border-2 border-text-primary/80 dark:border-text-dark/90',
			loadingClass: 'm-0.5',
			rootClass,
			thumbClass: expect.stringContaining('rounded-full'),
			thumbStyle: { left: '1.625rem', transform: 'scaleX(1.3)' },
			thumbStyleString: 'left:1.625rem;transform:scaleX(1.3)',
			insideState: { active: true, falseClass: 'hidden', kind: 'state', trueClass: '' }
		});
	});
});

describe('countdown derived', () => {
	test('parses and formats countdown time data', () => {
		const data = parseCountDownTime(90_061_007);
		expect(data).toEqual({ days: 1, hours: 1, minutes: 1, seconds: 1, milliseconds: 7 });
		expect(formatCountDownTime('DD HH:mm:ss.SSS', data)).toBe('01 01:01:01.007');
		expect(formatCountDownTime('HH:mm:ss.SS', data)).toBe('25:01:01.00');
	});

	test('resolves render-ready countdown state', () => {
		const options = resolveCountDownStateOptions({
			props: { format: 'mm:ss.SSS', injClass: 'custom-countdown' },
			remain: 61_007
		});
		expect(options).toEqual({ format: 'mm:ss.SSS', injClass: 'custom-countdown', remain: 61_007 });
		expect(resolveCountDownDerived(options)).toEqual({
			displayText: '01:01.007',
			rootClass: 'inline-block custom-countdown',
			timeData: { days: 0, hours: 0, minutes: 1, seconds: 1, milliseconds: 7 }
		});
	});

	test('resolves countdown timing state', () => {
		expect(resolveCountDownRemain({ endTime: 1_500, now: 1_000 })).toBe(500);
		expect(resolveCountDownRemain({ endTime: 1_000, now: 1_500 })).toBe(0);
		expect(resolveCountDownEndTime({ now: 1_000, remain: 500 })).toBe(1_500);
		expect(resolveCountDownShouldEmitChange({ nextRemain: 1_999, previousRemain: 2_000 })).toBe(true);
		expect(resolveCountDownShouldEmitChange({ nextRemain: 1_900, previousRemain: 1_999 })).toBe(false);
		expect(resolveCountDownShouldEmitChange({ millisecond: true, nextRemain: 1_900, previousRemain: 1_999 })).toBe(true);
		expect(resolveCountDownResetRemain({ newTime: 300, time: 500 })).toBe(300);
		expect(resolveCountDownResetRemain({ time: 500 })).toBe(500);
		expect(resolveCountDownCanStart({ counting: false, remain: 100 })).toBe(true);
		expect(resolveCountDownCanStart({ counting: true, remain: 100 })).toBe(false);
		expect(resolveCountDownCanStart({ counting: false, remain: 0 })).toBe(false);
		expect(resolveCountDownShouldAutoStart({ autoStart: true, time: 100 })).toBe(true);
		expect(resolveCountDownShouldAutoStart({ autoStart: false, time: 100 })).toBe(false);
		expect(resolveCountDownShouldResumeTick({ hidden: false, counting: true, rafId: null })).toBe(true);
		expect(resolveCountDownShouldResumeTick({ hidden: true, counting: true, rafId: null })).toBe(false);
		expect(resolveCountDownTimeChanged({ nextTime: 200, previousTime: 100 })).toBe(true);
		expect(resolveCountDownShouldSyncRemain({ nextTime: 200, previousTime: 100, counting: false })).toBe(true);
		expect(resolveCountDownShouldSyncRemain({ nextTime: 200, previousTime: 100, counting: true })).toBe(false);
		expect(resolveCountDownRootClass('custom-countdown')).toBe('inline-block custom-countdown');
	});

	test('resolves countdown component actions without owning timers', () => {
		expect(resolveCountDownStartAction({ counting: false, remain: 500, now: 1_000 })).toEqual({
			shouldStart: true,
			nextCounting: true,
			endTime: 1_500
		});
		expect(resolveCountDownStartAction({ counting: true, remain: 500, now: 1_000 })).toEqual({
			shouldStart: false,
			nextCounting: false,
			endTime: 0
		});
		expect(resolveCountDownTickAction({ endTime: 1_500, now: 1_000, previousRemain: 800 })).toEqual({
			nextRemain: 500,
			timeData: { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 500 },
			shouldChange: false,
			shouldContinue: true,
			shouldFinish: false,
			nextCounting: true
		});
		expect(resolveCountDownTickAction({ endTime: 1_000, now: 1_500, previousRemain: 500, millisecond: true })).toEqual({
			nextRemain: 0,
			timeData: { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 0 },
			shouldChange: true,
			shouldContinue: false,
			shouldFinish: true,
			nextCounting: false
		});
		expect(resolveCountDownPauseAction({ counting: true, endTime: 1_500, now: 1_250 })).toEqual({
			shouldPause: true,
			shouldCancelTick: true,
			nextCounting: false,
			nextRemain: 250
		});
		expect(resolveCountDownPauseAction({ counting: false, endTime: 1_500, now: 1_250 })).toEqual({
			shouldPause: false,
			shouldCancelTick: false,
			nextCounting: false,
			nextRemain: 0
		});
		expect(resolveCountDownResetAction({ newTime: 300, time: 500 })).toEqual({
			nextRemain: 300,
			timeData: { days: 0, hours: 0, minutes: 0, seconds: 0, milliseconds: 300 }
		});
		expect(resolveCountDownTimePropAction({ nextTime: 800, previousTime: 500, counting: false })).toEqual({
			nextPreviousTime: 800,
			shouldSyncRemain: true,
			nextRemain: 800
		});
		expect(resolveCountDownTimePropAction({ nextTime: 500, previousTime: 500, counting: false })).toEqual({
			nextPreviousTime: 500,
			shouldSyncRemain: false,
			nextRemain: 500
		});
	});
});

describe('input derived', () => {
	test('resolves input mode and placeholder', () => {
		expect(resolveInputInitialValue()).toBe('');
		expect(resolveInputInitialValue(null)).toBe('');
		expect(resolveInputInitialValue('abc')).toBe('abc');
		expect(resolveInputCurrentValue({ controlledValue: 'outer', internalValue: 'inner' })).toBe('outer');
		expect(resolveInputCurrentValue({ internalValue: 'inner' })).toBe('inner');
		expect(resolveInputMode('password')).toBe('text');
		expect(resolveInputMode('number')).toBe('decimal');
		expect(resolveInputMode('text', 'email')).toBe('email');
		expect(resolveInputNativeType('password')).toBe('password');
		expect(resolveInputNativeType('number')).toBe('text');
		expect(resolveInputNativeReadonly({ readonly: false, select: true })).toBe(true);
		expect(resolveInputNativeReadonly({ readonly: false, select: false })).toBe(false);
		expect(resolveInputPlaceholder({ title: '邮箱', select: false, pleaseInput: '请输入', pleaseSelect: '请选择' })).toBe('请输入 邮箱');
		expect(
			resolveInputPlaceholder({ placeholder: '自定义', title: '邮箱', select: true, pleaseInput: '请输入', pleaseSelect: '请选择' })
		).toBe('自定义');
		expect(resolveInputTextareaHeightStyle({ scrollHeight: 128 })).toBe('128px');
		expect(resolveInputTextareaHeightStyle({ scrollHeight: null })).toBe('0px');
	});

	test('normalizes decimal, numeric and textarea values', () => {
		expect(normalizeInputValue({ value: 'ab-12..3', type: 'number' })).toBe('12.3');
		expect(normalizeInputValue({ value: '-12a.3.4', type: 'decimal', negative: true })).toBe('-12.34');
		expect(normalizeInputValue({ value: '-12a3', type: 'numeric', negative: true })).toBe('-123');
		expect(normalizeInputValue({ value: 'abcdef', type: 'textarea', textareaMaxlength: 3 })).toBe('abc');
		expect(resolveInputValueChangeAction({ rawValue: '12a.3', value: '12a.3', type: 'number' })).toEqual({
			nextValue: '12.3',
			shouldCommit: true,
			shouldResizeTextarea: false
		});
		expect(
			resolveInputValueChangeAction({ rawValue: 'abcdef', value: 'abcdef', type: 'textarea', textareaMaxlength: 3, autosize: true })
		).toEqual({
			nextValue: 'abc',
			shouldCommit: true,
			shouldResizeTextarea: true
		});
		expect(resolveInputValueChangeAction({ rawValue: '拼音', value: '拼音', composing: true })).toEqual({
			nextValue: '拼音',
			shouldCommit: false,
			shouldResizeTextarea: false
		});
		expect(resolveInputClearAction()).toEqual({
			nextValue: '',
			shouldChange: true,
			shouldClear: true
		});
		expect(resolveInputFocusStateAction({ value: 'abc' })).toEqual({
			nextFocus: true,
			shouldEmitFocus: true,
			value: 'abc'
		});
		expect(resolveInputBlurStateAction({ value: 'abc' })).toEqual({
			nextFocus: false,
			shouldEmitBlur: true,
			value: 'abc'
		});
		expect(resolveInputCompositionAction({ phase: 'start' })).toEqual({ nextComposing: true, shouldCommit: false });
		expect(resolveInputCompositionAction({ phase: 'end' })).toEqual({ nextComposing: false, shouldCommit: true });
		expect(resolveInputFocusAction({ disabled: false })).toEqual({ shouldFocus: true });
		expect(resolveInputFocusAction({ disabled: true })).toEqual({ shouldFocus: false });
		expect(resolveInputCustomContentKeyboardAction({ key: 'Enter', disabled: false })).toEqual({
			isActivationKey: true,
			shouldFocus: true
		});
		expect(resolveInputCustomContentKeyboardAction({ key: ' ', disabled: true })).toEqual({
			isActivationKey: true,
			shouldFocus: false
		});
		expect(resolveInputCustomContentKeyboardAction({ key: 'Escape', disabled: false })).toEqual({
			isActivationKey: false,
			shouldFocus: false
		});
	});

	test('resolves input classes and styles', () => {
		const radiusClass = resolveInputRadiusClass({ radius: 'lg' });
		expect(radiusClass).toBe('rounded-lg');
		expect(resolveInputRadiusClass({ type: 'textarea' })).toBe('rounded-(--radius-box)');
		expect(resolveInputPyClass('4')).toBe('py-4');
		expect(resolveInputOuterClass('4')).toBe('px-2 py-4');
		expect(resolveInputDurationClass('slow')).toBe('duration-500');
		expect(resolveInputBaseClass({ inputStyle: 'block', radiusClass })).toBe('px-2 bg-text-primary/5 dark:bg-text-dark/5 rounded-lg');
		expect(resolveInputFocusClass({ inputStyle: 'block', inputState: 'warning', radiusClass })).toBe(
			'px-2 ring-2 bg-transparent ring-warning rounded-lg'
		);
		expect(
			resolveInputWrapperClass({
				hasInputChild: true,
				titlePosition: 'in',
				duration: 'fast',
				focus: true,
				inputStyle: 'block',
				radiusClass,
				inputState: 'success'
			})
		).toContain('items-start whitespace-normal duration-150 py-1 px-2 ring-2 bg-transparent ring-success rounded-lg rounded-lg');
		expect(resolveInputLineTransitionClass({ lineTransition: 'center', focus: false, inputState: 'error' })).toContain('w-0 bg-error');
		expect(resolveInputLineTransitionStyleValue('center')).toEqual({
			left: '50%',
			transform: 'translateX(-50%)',
			WebkitTransform: 'translateX(-50%)'
		});
		expect(resolveInputLineTransitionStyleString(null)).toBe('left:0;');
		expect(resolveInputTextAlignClass('right')).toBe('text-right');
		expect(resolveInputDisplayMinHeight({ type: 'textarea', rows: 3 })).toBe('4.5rem');
		expect(resolveInputCustomContentStyleValue('4.5rem')).toEqual({ minHeight: '4.5rem' });
		expect(resolveInputCustomContentStyleString('4.5rem')).toBe('min-height: 4.5rem;');
		expect(resolveInputAutocompleteValue(false)).toBe('off');
		expect(resolveInputEdgeRowClass(false)).toBe('flex px-2 justify-end');
		expect(resolveInputEdgeRowClass(true)).toBe('flex px-2 justify-between');
		expect(resolveInputTitleClass()).toBe('relative mb-1 text-sm font-semibold');
		expect(resolveInputRequiredClass('out')).toBe('text-error absolute -left-2.5 text-base');
		expect(resolveInputRequiredClass('in')).toBe('text-error absolute -left-2 text-sm');
		expect(resolveInputEdgeContentClass()).toBe('flex space-x-2 text-xs');
		expect(resolveInputContentColumnClass()).toBe('flex grow flex-col');
		expect(resolveInputInlineTitleClass()).toBe('relative text-xs text-gray-400');
		expect(resolveInputControlRowClass()).toBe('flex space-x-1');
		expect(resolveInputControlSlotClass()).toBe('w-full');
		expect(resolveInputCustomWrapperClass()).toBe('relative w-full');
		expect(resolveInputHiddenControlClass()).toBe('focus:outline-hidden pointer-events-none absolute inset-0 h-full w-full opacity-0');
		expect(resolveInputClearIconClass()).toBe('opacity-30');
		expect(resolveInputSelectIconClass()).toBe('opacity-50');
		expect(resolveInputTipTextClass()).toBe('text-xs text-gray-400');
		expect(resolveInputDataTextClass()).toBe('text-xs');
		expect(resolveInputControlClass({ inputPosition: 'right', disabled: true, textTone: 'plain' })).toContain(
			'text-black dark:text-white text-right cursor-not-allowed opacity-50'
		);
		expect(resolveInputCustomContentClass({ inputPosition: 'left', disabled: false })).toContain(
			'text-text-primary dark:text-text-dark text-left cursor-text'
		);
		expect(resolveInputDisplayState({ clear: true, value: 'abc', select: true, inputStyle: 'line' })).toEqual({
			showClearButton: true,
			showSelectIcon: true,
			showLineTransition: true
		});
		expect(resolveInputDisplayState({ clear: true, value: '', select: false, inputStyle: 'block' })).toEqual({
			showClearButton: false,
			showSelectIcon: false,
			showLineTransition: false
		});
	});

	test('resolves aggregate input view state', () => {
		const options = resolveInputStateOptions({
			props: {
				autocomplete: false,
				clear: true,
				disabled: true,
				duration: 'base',
				inputPosition: 'right',
				inputState: 'success',
				inputStyle: 'line',
				inputmode: '',
				lineTransition: 'center',
				placeholder: '',
				py: '4',
				radius: 'lg',
				readonly: false,
				rows: 3,
				select: false,
				textTone: 'plain',
				title: 'Name',
				titlePosition: 'in',
				type: 'textarea'
			},
			focus: true,
			hasInputChild: true,
			hasTip: true,
			pleaseInput: 'Please input',
			pleaseSelect: 'Please select',
			value: 'abc'
		});
		expect(options).toMatchObject({
			autocomplete: false,
			clear: true,
			disabled: true,
			duration: 'base',
			focus: true,
			hasInputChild: true,
			hasTip: true,
			inputPosition: 'right',
			inputState: 'success',
			inputStyle: 'line',
			inputmode: '',
			lineTransition: 'center',
			placeholder: '',
			pleaseInput: 'Please input',
			pleaseSelect: 'Please select',
			py: '4',
			radius: 'lg',
			readonly: false,
			rows: 3,
			select: false,
			textTone: 'plain',
			title: 'Name',
			titlePosition: 'in',
			type: 'textarea',
			value: 'abc'
		});
		const inputViewState = resolveInputDerived(options);

		expect(inputViewState.mode).toBe('text');
		expect(inputViewState.nativeInputType).toBe('text');
		expect(inputViewState.nativeReadonly).toBe(false);
		expect(inputViewState.titleClass).toBe('relative mb-1 text-sm font-semibold');
		expect(inputViewState.requiredClass).toBe('text-error absolute -left-2 text-sm');
		expect(inputViewState.inlineRequiredClass).toBe('text-error absolute -left-2 text-sm');
		expect(inputViewState.edgeContentClass).toBe('flex space-x-2 text-xs');
		expect(inputViewState.contentColumnClass).toBe('flex grow flex-col');
		expect(inputViewState.controlRowClass).toBe('flex space-x-1');
		expect(inputViewState.controlSlotClass).toBe('w-full');
		expect(inputViewState.customWrapperClass).toBe('relative w-full');
		expect(inputViewState.hiddenControlClass).toBe('focus:outline-hidden pointer-events-none absolute inset-0 h-full w-full opacity-0');
		expect(inputViewState.clearIconClass).toBe('opacity-30');
		expect(inputViewState.selectIconClass).toBe('opacity-50');
		expect(inputViewState.tipTextClass).toBe('text-xs text-gray-400');
		expect(inputViewState.dataTextClass).toBe('text-xs');
		expect(inputViewState.placeholderText).toBe('Please input Name');
		expect(inputViewState.displayMinHeight).toBe('4.5rem');
		expect(inputViewState.customContentStyleValue).toEqual({ minHeight: '4.5rem' });
		expect(inputViewState.customContentStyleString).toBe('min-height: 4.5rem;');
		expect(inputViewState.outerClass).toBe('px-2 py-4');
		expect(inputViewState.displayState).toEqual({
			showClearButton: true,
			showSelectIcon: false,
			showLineTransition: true
		});
		expect(inputViewState.autocompleteValue).toBe('off');
		expect(inputViewState.wrapperClass).toContain('items-start whitespace-normal');
		expect(inputViewState.wrapperClass).toContain('py-1');
		expect(inputViewState.lineStyleString).toBe('left:50%;transform:translateX(-50%);-webkit-transform:translateX(-50%);');
		expect(inputViewState.controlClass).toContain('text-black dark:text-white text-right cursor-not-allowed opacity-50');
		expect(inputViewState.customContentClass).toContain('text-black dark:text-white text-right cursor-not-allowed opacity-50');
		expect(inputViewState.titleRowClass).toBe('flex px-2 justify-between');
		expect(inputViewState.tipRowClass).toBe('flex px-2 justify-between');
		expect(inputViewState.focusableTabIndex).toBe(-1);
	});
});

describe('config provider derived', () => {
	test('resolves mode classes without framework state', () => {
		expect(resolveConfigProviderModeClass('dark')).toBe('dark');
		expect(resolveConfigProviderModeClass('primary')).toBe('');
		expect(resolveConfigProviderModeClass()).toBe('');
	});
});

describe('props derived', () => {
	test('splits callback props without mutating source objects', () => {
		const onClose = () => 'close';
		const popup = { onClose, radius: 'lg', size: 0 };
		expect(splitPopupCallbacks(popup)).toEqual({
			popupProps: { radius: 'lg', size: 0 },
			popupOnClose: onClose
		});
		expect(splitPopupCallbacks(null)).toEqual({
			popupProps: {},
			popupOnClose: undefined
		});

		const onClick = () => 'click';
		const button = { onClick, state: 'theme', fill: 'base' };
		expect(splitButtonCallbacks(button)).toEqual({
			buttonProps: { state: 'theme', fill: 'base' },
			buttonOnClick: onClick
		});
		expect(splitButtonCallbacks(undefined)).toEqual({
			buttonProps: {},
			buttonOnClick: undefined
		});

		const onClickTab = (index: number) => index;
		const tab = { onClickTab, labels: ['A', 'B'], mx: '0' };
		expect(splitTabCallbacks(tab)).toEqual({
			tabProps: { labels: ['A', 'B'], mx: '0' },
			tabOnClickTab: onClickTab
		});
		expect(splitTabCallbacks(null)).toEqual({
			tabProps: {},
			tabOnClickTab: undefined
		});

		const bindProps = { radius: 'lg', size: 0 };
		expect(resolveConditionalProps({ enabled: true, props: bindProps })).toBe(bindProps);
		expect(resolveConditionalProps({ enabled: false, props: bindProps })).toEqual({});
		expect(resolveConditionalProps({ enabled: true, props: null })).toEqual({});
	});
});

describe('divider derived', () => {
	test('resolves divider classes and line visibility', () => {
		expect(resolveDividerVerticalClass({ weight: '2', mx: '4', line: 'dashed', injClass: 'custom-divider' })).toBe(
			'inline border-r-2 rounded-full border-black/10 dark:border-white/20 m-4 border-dashed custom-divider'
		);
		expect(resolveDividerHorizontalClass({ px: '8', py: '0' })).toBe('flex items-center px-8 py-0');
		expect(resolveDividerLineClass({ weight: '4', line: 'dotted', injClass: 'line-class' })).toBe(
			'grow border-t-4 rounded-full border-black/10 dark:border-white/20 border-dotted line-class'
		);
		expect(resolveDividerTextClass('text-class')).toBe('mx-2 flex-none text-xs text-gray-400 text-class');
		expect(resolveDividerLineVisibility({ text: '', align: 'center' })).toEqual({
			showLeadingLine: true,
			showText: false,
			showTrailingLine: true
		});
		expect(resolveDividerLineVisibility({ text: 'Title', align: 'left' })).toEqual({
			showLeadingLine: false,
			showText: true,
			showTrailingLine: true
		});
		expect(resolveDividerLineVisibility({ text: 'Title', align: 'right' })).toEqual({
			showLeadingLine: true,
			showText: true,
			showTrailingLine: false
		});
		const dividerOptions = resolveDividerStateOptions({
			props: {
				layout: 'v',
				px: '8',
				py: '0',
				text: 'Title',
				align: 'left',
				line: 'dashed',
				mx: '4',
				weight: '2',
				injClass: 'custom-divider'
			}
		});
		expect(dividerOptions).toMatchObject({ layout: 'v', text: 'Title', align: 'left' });
		const dividerState = resolveDividerDerived(dividerOptions);

		expect(dividerState.isVertical).toBe(true);
		expect(dividerState.verticalClass).toBe(
			'inline border-r-2 rounded-full border-black/10 dark:border-white/20 m-4 border-dashed custom-divider'
		);
		expect(dividerState.horizontalClass).toBe('flex items-center px-8 py-0');
		expect(dividerState.lineClass).toBe('grow border-t-2 rounded-full border-black/10 dark:border-white/20 border-dashed custom-divider');
		expect(dividerState.textClass).toBe('mx-2 flex-none text-xs text-gray-400 custom-divider');
		expect(dividerState.lineVisibility).toEqual({
			showLeadingLine: false,
			showText: true,
			showTrailingLine: true
		});
	});
});

describe('list derived', () => {
	test('resolves key, selection and class helpers', () => {
		const data = [{ id: 'a' }, { id: 'b' }];
		const originalSelected = ['a'];
		expect(resolveListInitialBatchMode()).toBe(false);
		expect(resolveListInitialBatchMode(true)).toBe(true);
		expect(resolveListInitialBatchSelected(originalSelected)).toEqual(['a']);
		expect(resolveListInitialBatchSelected(originalSelected)).not.toBe(originalSelected);
		expect(resolveListItemKey(data[0], 0, 'id')).toBe('a');
		expect(resolveListLimitedSwipeActions([1, 2, 3, 4, 5])).toEqual([1, 2, 3, 4]);
		expect(resolveListBatchSelected(['a'], 'a')).toEqual([]);
		expect(resolveListBatchSelected(['a'], 'b')).toEqual(['a', 'b']);
		expect(resolveListBatchItemSelected(['a'], 'a')).toBe(true);
		expect(resolveListBatchItemSelected(['a'], 'b')).toBe(false);
		expect(resolveListBatchActionStatus()).toBe('theme');
		expect(resolveListBatchActionStatus('error')).toBe('error');
		expect(resolveListBatchToggleText({ batchMode: true, doneText: '完成', editText: '编辑' })).toBe('完成');
		expect(resolveListBatchToggleText({ batchMode: false, doneText: '完成', editText: '编辑' })).toBe('编辑');
		expect(resolveListSelectAll({ selected: [], data, keyField: 'id' })).toEqual(['a', 'b']);
		expect(resolveListSelectAll({ selected: ['a', 'b'], data, keyField: 'id' })).toEqual([]);
		expect(resolveListInitialSwiping()).toBe(false);
		expect(resolveListBatchModeAction({ batchMode: false })).toEqual({ nextBatchMode: true, nextSelected: [], shouldClearSelected: false });
		expect(resolveListBatchModeAction({ batchMode: true })).toEqual({ nextBatchMode: false, nextSelected: [], shouldClearSelected: true });
		expect(resolveListRootClass({ mx: '2', my: '1', injClass: 'custom' })).toBe('relative mx-2 my-1 custom');
		expect(resolveListContentClass({ gap: '4', divider: false })).toBe('flex flex-col gap-4');
		expect(resolveListItemButtonClass({ itemPx: '4', itemPy: '2', itemRadiusClass: 'rounded-md', itemInjClass: 'item' })).toBe(
			'flex w-full items-start gap-2 text-left px-4 py-2 rounded-md item'
		);
		expect(resolveListBatchBarClass()).toBe('flex items-center justify-between px-4 py-2');
		expect(resolveListBatchActionGroupClass()).toBe('flex items-center gap-4');
		expect(resolveListBatchTextButtonClass()).toBe('text-primary dark:text-dark text-sm');
		expect(resolveListBatchSelectClass()).toBe(
			'absolute inset-y-0 left-0 flex items-center justify-center bg-bg-surface dark:bg-bg-surface-dark'
		);
		expect(resolveListContentLayerClass()).toBe('relative touch-none transition-transform duration-200');
		expect(resolveListItemContentClass()).toBe('min-w-0 flex-1');
		expect(resolveListArrowClass()).toBe('shrink-0 self-center text-gray-400 dark:text-gray-500');
		expect(resolveListArrowIconClass()).toBe('');
		expect(resolveListSwipeHintClass()).toBe('absolute right-1 top-1/2 -translate-y-1/2 text-gray-300 dark:text-gray-600');
		expect(resolveListSwipeHintIconClass()).toBe('h-3 w-3');
		expect(resolveListBatchUncheckedIconClass()).toBe('h-5 w-5 text-gray-400 dark:text-gray-500');
		expect(resolveListBatchCheckedIconClass()).toBe('h-5 w-5 text-primary dark:text-dark');
		expect(resolveListItemDisabled({ clickable: true, hasClickHandler: true, batchMode: false })).toBe(false);
		expect(resolveListItemDisabled({ clickable: false, hasClickHandler: true, batchMode: false })).toBe(true);
		expect(resolveListItemDisabled({ clickable: false, hasClickHandler: false, batchMode: true })).toBe(false);
		expect(resolveListItemKeyboardAction({ key: 'Enter', clickable: true, hasClickHandler: true, batchMode: false })).toEqual({
			shouldClick: true,
			shouldPreventDefault: true
		});
		expect(resolveListItemKeyboardAction({ key: 'Escape', clickable: true, hasClickHandler: true, batchMode: false })).toEqual({
			shouldClick: false,
			shouldPreventDefault: false
		});
		expect(resolveListItemKeyboardAction({ key: 'Enter', clickable: false, hasClickHandler: true, batchMode: false })).toEqual({
			shouldClick: false,
			shouldPreventDefault: false
		});
		expect(resolveListBatchActionClass('error')).toBe('text-sm text-error');
	});

	test('resolves swipe and transition helpers', () => {
		expect(resolveListItemSwipeOffset({ a: -20 }, 'a')).toBe(-20);
		expect(resolveListItemSwipeOffset({ a: -20 }, 'b')).toBe(0);
		expect(resolveListBatchOffset({ batchMode: true, batchSelectWidth: 40 })).toBe(40);
		expect(resolveListBatchOffset({ batchMode: false, batchSelectWidth: 40 })).toBe(0);
		expect(resolveListShowSwipeActions({ hasSwipeActions: true, batchMode: false })).toBe(true);
		expect(resolveListShowSwipeActions({ hasSwipeActions: true, batchMode: true })).toBe(false);
		expect(resolveListShowSwipeHint({ hasSwipeActions: true, batchMode: false, swipeHint: 'first', index: 0 })).toBe(true);
		expect(resolveListShowSwipeHint({ hasSwipeActions: true, batchMode: false, swipeHint: 'first', index: 1 })).toBe(false);
		expect(resolveListShowSwipeHint({ hasSwipeActions: true, batchMode: false, swipeHint: 'all', index: 2 })).toBe(true);
		expect(resolveListSwipeActive(-24)).toBe(true);
		expect(resolveListSwipeActive(0)).toBe(false);
		expect(resolveListSwipeActionLayerClass({ swipeActionRadiusClass: 'rounded-md', isSwipeActive: false })).toBe(
			'absolute inset-y-0 right-0 flex overflow-hidden rounded-md opacity-0 pointer-events-none'
		);
		expect(resolveListSwipeActionButtonClass('primary')).toBe(
			'flex h-full w-16 flex-col items-center justify-center bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark'
		);
		expect(resolveListSwipeActionTextClass()).toBe('mt-1 text-xs');
		expect(
			resolveListSwipeStartAction({ hasSwipeActions: true, batchMode: false, activeSwipeKey: 'b', itemKey: 'a', clientX: 12, clientY: 20 })
		).toEqual({
			closeKey: 'b',
			isSwiping: true,
			shouldCapturePointer: true,
			shouldStart: true,
			swipeMovedDistance: 0,
			swipeMovedKey: null,
			swipeStartX: 12,
			swipeStartY: 20
		});
		expect(resolveListSwipeStartAction({ hasSwipeActions: false, itemKey: 'a', clientX: 12, clientY: 20 })).toMatchObject({
			closeKey: null,
			isSwiping: false,
			shouldCapturePointer: false,
			shouldStart: false
		});
		expect(
			resolveListSwipeMoveState({
				currentX: 70,
				currentY: 12,
				startX: 100,
				startY: 10,
				currentOffset: 0,
				swipeActionWidth: 128,
				swipeMovedDistance: 0,
				itemKey: 'a'
			})
		).toEqual({
			ignore: false,
			diffX: -30,
			diffY: 2,
			nextOffset: -30,
			nextMovedDistance: 30,
			nextMovedKey: 'a',
			nextStartX: 70
		});
		expect(resolveListSwipeEndState({ offset: -40, swipeThreshold: 30, swipeActionWidth: 128, itemKey: 'a' })).toEqual({
			shouldOpen: true,
			nextOffset: -128,
			activeSwipeKey: 'a'
		});
		expect(
			resolveListSwipeEndAction({
				offset: -40,
				swipeThreshold: 30,
				swipeActionWidth: 128,
				itemKey: 'a',
				swipeMovedKey: 'a',
				swipeOffsets: { a: -40 }
			})
		).toEqual({
			isSwiping: false,
			nextActiveSwipeKey: 'a',
			nextSwipeClickBlockKey: 'a',
			nextSwipeMovedKey: null,
			nextSwipeOffsets: { a: -128 },
			shouldBlockClick: true
		});
		expect(
			resolveListSwipeEndAction({
				offset: -10,
				swipeThreshold: 30,
				swipeActionWidth: 128,
				itemKey: 'a',
				activeSwipeKey: 'a',
				swipeOffsets: { a: -10, b: -20 }
			})
		).toEqual({
			isSwiping: false,
			nextActiveSwipeKey: null,
			nextSwipeClickBlockKey: null,
			nextSwipeMovedKey: null,
			nextSwipeOffsets: { a: 0, b: -20 },
			shouldBlockClick: false
		});
		expect(resolveListCloseSwipeAction({ swipeOffsets: { a: -20, b: -10 }, itemKey: 'a', activeSwipeKey: 'a' })).toEqual({
			nextActiveSwipeKey: null,
			nextSwipeOffsets: { a: 0, b: -10 }
		});
		expect(resolveListItemClickAction({ swipeClickBlockKey: 'a', itemKey: 'a' })).toEqual({ intent: 'ignore', closeKey: null });
		expect(resolveListItemClickAction({ activeSwipeKey: 'b', itemKey: 'a' })).toEqual({ intent: 'closeSwipe', closeKey: 'b' });
		expect(resolveListItemClickAction({ batchMode: true, itemKey: 'a' })).toEqual({ intent: 'batchSelect', closeKey: null });
		expect(resolveListItemClickAction({ itemKey: 'a', clickable: true })).toEqual({ intent: 'clickItem', closeKey: null });
		expect(resolveListItemTransform({ swipeOffset: -20, batchOffset: 40 })).toBe('translateX(20px)');
		expect(resolveListItemTransformStyleValue({ swipeOffset: -20, batchOffset: 40 })).toEqual({ transform: 'translateX(20px)' });
		expect(resolveListItemTransformStyleString({ swipeOffset: -20, batchOffset: 40 })).toBe('transform: translateX(20px);');
		expect(resolveListWidthStyleValue(40)).toEqual({ width: '40px' });
		expect(resolveListWidthStyleString(40)).toBe('width: 40px;');
		expect(resolveListTransitionClass({ prefix: 'rtdf', transition: 'slideRight', leaving: true })).toBe(
			'relative rtdf-list-leave rtdf-list-leave-slide-right'
		);
		expect(resolveListTransitionStyle({ transition: 'stagger', index: 2, transitionDelay: 50 })).toEqual({
			animationDelay: '100ms',
			staggerX: '-100px'
		});
		expect(resolveListTransitionStyleValue({ transition: undefined })).toBeUndefined();
		expect(resolveListTransitionStyleValue({ transition: 'stagger', index: 1, transitionDelay: 75, staggerVariable: '--list-x' })).toEqual({
			animationDelay: '75ms',
			'--list-x': '100px'
		});
		expect(resolveListTransitionStyleString({ transition: 'stagger', index: 1, transitionDelay: 75, staggerVariable: '--list-x' })).toBe(
			'animation-delay: 75ms; --list-x: 100px;'
		);
		expect(resolveListTransitionStyleString({ transition: undefined })).toBe('');
		expect(resolveListTransitionCss({ prefix: 'stdf' })).toContain('@keyframes stdf-list-stagger-out');
		expect(resolveListTransitionCss({ prefix: 'vtdf', staggerVariable: '--vtdf-stagger-x' })).toContain(
			'transform: translateX(var(--vtdf-stagger-x));'
		);
		const leavingItems = [
			{ key: 'a', item: { id: 'a' }, leaving: false },
			{ key: 'b', item: { id: 'b' }, leaving: true }
		];
		expect(resolveListItemsAfterLeave(leavingItems, 'b')).toEqual([{ key: 'a', item: { id: 'a' }, leaving: false }]);
	});

	test('resolves render item transition state without timers', () => {
		const a = { id: 'a', text: 'A' };
		const b = { id: 'b', text: 'B' };
		const c = { id: 'c', text: 'C' };
		const currentItems = [
			{ key: 'a', item: a, leaving: false },
			{ key: 'b', item: b, leaving: false }
		];
		const nextState = resolveListRenderItems({ currentItems, data: [c, a], keyField: 'id', transition: 'slideRight' });

		expect(nextState.items.map((item) => [item.key, item.leaving])).toEqual([
			['c', false],
			['a', false],
			['b', true]
		]);
		expect(nextState.leavingKeys).toEqual(['b']);
		expect(nextState.restoredKeys).toEqual([]);
		expect(nextState.isSame).toBe(false);

		const restoredState = resolveListRenderItems({
			currentItems: nextState.items,
			data: [b, c, a],
			keyField: 'id',
			transition: 'slideRight'
		});
		expect(restoredState.items.map((item) => [item.key, item.leaving])).toEqual([
			['b', false],
			['c', false],
			['a', false]
		]);
		expect(restoredState.restoredKeys).toEqual(['b']);

		const noTransitionState = resolveListRenderItems({ currentItems, data: [a], keyField: 'id', transition: null });
		expect(noTransitionState.items.map((item) => item.key)).toEqual(['a']);
		expect(noTransitionState.leavingKeys).toEqual([]);
	});

	test('resolves render-ready list state', () => {
		const item = { id: 'a', text: 'A' };
		const state = resolveListDerived({
			renderItems: [{ key: 'a', item, leaving: false }],
			prefix: 'rtdf',
			transition: 'stagger',
			transitionDelay: 75,
			staggerVariable: '--list-x',
			swipeActions: [{ text: 'Delete', bgColor: 'error' }],
			swipeOffsets: { a: -24 },
			batchMode: true,
			batchSelected: ['a'],
			batchSelectWidth: 40,
			clickable: false,
			hasClickHandler: true,
			gap: '4',
			mx: '2',
			my: '1',
			itemPx: '4',
			itemPy: '2',
			itemRadius: 'md',
			itemInjClass: 'item-class',
			injClass: 'root-class',
			swipeHint: 'all'
		});

		expect(state.rootClass).toBe('relative mx-2 my-1 root-class');
		expect(state.batchBarClass).toBe(resolveListBatchBarClass());
		expect(state.batchActionGroupClass).toBe(resolveListBatchActionGroupClass());
		expect(state.batchTextButtonClass).toBe(resolveListBatchTextButtonClass());
		expect(state.batchUncheckedIconClass).toBe(resolveListBatchUncheckedIconClass());
		expect(state.batchCheckedIconClass).toBe(resolveListBatchCheckedIconClass());
		expect(state.swipeHintIconClass).toBe(resolveListSwipeHintIconClass());
		expect(state.contentClass).toBe('flex flex-col gap-4 divide-y divide-black/10 dark:divide-white/10');
		expect(state.hasSwipeActions).toBe(true);
		expect(state.itemRadiusClass).toBe('rounded-md');
		expect(state.swipeActionRadiusClass).toBe('rounded-md rounded-l-none');
		expect(state.batchSelectWidth).toBe(40);
		expect(state.limitedSwipeActions).toEqual([{ text: 'Delete', bgColor: 'error' }]);
		expect(state.swipeActionWidth).toBe(64);
		expect(state.items).toHaveLength(1);

		const viewState = state.items[0];
		expect(viewState?.itemKey).toBe('a');
		expect(viewState?.swipeOffset).toBe(-24);
		expect(viewState?.batchOffset).toBe(40);
		expect(viewState?.swipeActive).toBe(true);
		expect(viewState?.showBatchSelect).toBe(true);
		expect(viewState?.batchSelected).toBe(true);
		expect(viewState?.showSwipeActions).toBe(false);
		expect(viewState?.showSwipeHint).toBe(false);
		expect(viewState?.shellClass).toBe('relative overflow-x-clip');
		expect(viewState?.batchSelectClass).toBe(resolveListBatchSelectClass());
		expect(viewState?.contentLayerClass).toBe(resolveListContentLayerClass());
		expect(viewState?.itemContentClass).toBe(resolveListItemContentClass());
		expect(viewState?.arrowClass).toBe(resolveListArrowClass());
		expect(state.arrowIconClass).toBe(resolveListArrowIconClass());
		expect(viewState?.swipeHintClass).toBe(resolveListSwipeHintClass());
		expect(viewState?.buttonClass).toBe('flex w-full items-start gap-2 text-left px-4 py-2 rounded-md item-class');
		expect(viewState?.disabled).toBe(false);
		expect(viewState?.tabIndex).toBe(0);
		expect(viewState?.transformStyle).toEqual({ transform: 'translateX(16px)' });
		expect(viewState?.transformStyleString).toBe('transform: translateX(16px);');
		expect(viewState?.batchSelectWidthStyle).toEqual({ width: '40px' });
		expect(viewState?.batchSelectWidthStyleString).toBe('width: 40px;');
		expect(viewState?.transitionClass).toBe('relative rtdf-list-transition rtdf-list-stagger');
		expect(viewState?.transitionStyle).toEqual({ animationDelay: '0ms', '--list-x': '-100px' });
		expect(viewState?.transitionStyleString).toBe('animation-delay: 0ms; --list-x: -100px;');
		expect(viewState?.swipeActions[0]).toMatchObject({
			buttonClass: 'flex h-full w-16 flex-col items-center justify-center bg-error text-white',
			index: 0,
			textClass: 'mt-1 text-xs'
		});

		const enabledState = resolveListDerived({
			renderItems: [{ key: 'a', item, leaving: false }],
			swipeActions: [{ text: 'Delete', bgColor: 'primary' }],
			swipeOffsets: { a: -24 },
			batchMode: false,
			swipeHint: 'all'
		});
		expect(enabledState.items[0]?.showSwipeActions).toBe(true);
		expect(enabledState.items[0]?.showSwipeHint).toBe(true);
		expect(enabledState.items[0]?.actionLayerClass).toContain('absolute inset-y-0 right-0 flex overflow-hidden');
	});
});

describe('code input derived', () => {
	test('normalizes non-native values by type and length', () => {
		expect(resolveCodeInputInitialValue()).toBe('');
		expect(resolveCodeInputInitialValue(null)).toBe('');
		expect(resolveCodeInputInitialValue('123')).toBe('123');
		expect(resolveCodeInputInitialFocused()).toBe(false);
		expect(resolveCodeInputInitialFocused(true)).toBe(true);
		expect(normalizeCodeInputValue({ value: '12a3', length: 3 })).toBe('12');
		expect(normalizeCodeInputValue({ value: '12a3', length: 3, type: 'text' })).toBe('12a');
		expect(normalizeCodeInputValue({ value: '12a3', length: 3, native: true })).toBe('12a3');
		expect(resolveCodeInputInputAction({ rawValue: '12a3', length: 3, type: 'number' })).toEqual({
			nextValue: '12',
			shouldEmitChange: true
		});
		expect(resolveCodeInputInputAction({ rawValue: '12a3', length: 3, type: 'text', emitChange: false })).toEqual({
			nextValue: '12a',
			shouldEmitChange: false
		});
	});

	test('resolves cell state and classes', () => {
		expect(resolveCodeInputCells(3)).toEqual([0, 1, 2]);
		expect(resolveCodeInputCellText('123', 1)).toBe('2');
		expect(resolveCodeInputCellText('123', 5)).toBeUndefined();
		expect(resolveCodeInputCellDisplayState({ value: '123', index: 0, mask: true })).toEqual({ kind: 'dot' });
		expect(resolveCodeInputCellDisplayState({ value: '123', index: 0, mask: '*' })).toEqual({ kind: 'maskText', text: '*' });
		expect(resolveCodeInputCellDisplayState({ value: '123', index: 1 })).toEqual({ kind: 'valueText', text: '2' });
		expect(
			resolveCodeInputCellDisplayState({ value: '123', index: 3, currentIndex: 3, showCursor: true, cursorStyle: 'underline' })
		).toEqual({
			kind: 'cursor',
			showUnderlineCursor: true
		});
		expect(resolveCodeInputCellDisplayState({ value: '123', index: 4, currentIndex: 3, showCursor: true })).toEqual({ kind: 'none' });
		expect(
			resolveCodeInputCellDisplayStateList({ value: '12', length: 4, currentIndex: 2, showCursor: true, cursorStyle: 'underline' })
		).toEqual([
			{ index: 0, kind: 'valueText', text: '1' },
			{ index: 1, kind: 'valueText', text: '2' },
			{ index: 2, kind: 'cursor', showUnderlineCursor: true },
			{ index: 3, kind: 'none' }
		]);
		expect(resolveCodeInputCurrentIndex('123')).toBe(3);
		expect(resolveCodeInputFinishedValue({ value: '123456', length: 4 })).toBe('1234');
		expect(resolveCodeInputFinishAction({ value: '12', length: 4, lastFinishedValue: '1234', autoClose: true })).toEqual({
			finishedValue: '',
			nextLastFinishedValue: null,
			shouldFinish: false,
			shouldClose: false
		});
		expect(resolveCodeInputFinishAction({ value: '1234', length: 4, autoClose: true })).toEqual({
			finishedValue: '1234',
			nextLastFinishedValue: '1234',
			shouldFinish: true,
			shouldClose: true
		});
		expect(resolveCodeInputFinishAction({ value: '1234', length: 4, lastFinishedValue: '1234', autoClose: true })).toEqual({
			finishedValue: '1234',
			nextLastFinishedValue: '1234',
			shouldFinish: false,
			shouldClose: false
		});
		expect(resolveCodeInputFinishFlow({ value: '1234', length: 4, autoClose: true })).toEqual({
			finishedValue: '1234',
			nextLastFinishedValue: '1234',
			shouldFinish: true,
			shouldClose: true,
			nextFocused: false,
			nextKeyboardVisible: false,
			shouldEmitClose: true,
			shouldEmitFinish: true
		});
		expect(resolveCodeInputFinishFlow({ value: '12', length: 4, autoClose: true })).toEqual({
			finishedValue: '',
			nextLastFinishedValue: null,
			shouldFinish: false,
			shouldClose: false,
			nextFocused: false,
			nextKeyboardVisible: false,
			shouldEmitClose: false,
			shouldEmitFinish: false
		});
		expect(resolveCodeInputFinishFlow({ value: '1234', length: 4, autoClose: true, emitClose: false })).toMatchObject({
			shouldClose: true,
			shouldEmitClose: false,
			shouldEmitFinish: true
		});
		expect(resolveCodeInputFocusAction({ native: true })).toEqual({ nextFocused: true, shouldEmitFocus: true, shouldFocusNative: true });
		expect(resolveCodeInputFocusAction({ emitFocus: false, native: false })).toEqual({
			nextFocused: true,
			shouldEmitFocus: false,
			shouldFocusNative: false
		});
		expect(resolveCodeInputBlurAction()).toEqual({ nextFocused: false });
		expect(resolveCodeInputCloseAction({ shouldClose: true })).toEqual({
			nextFocused: false,
			nextKeyboardVisible: false,
			shouldClose: true,
			shouldEmitClose: true
		});
		expect(resolveCodeInputCloseAction({ emitClose: false, shouldClose: true })).toEqual({
			nextFocused: false,
			nextKeyboardVisible: false,
			shouldClose: true,
			shouldEmitClose: false
		});
		expect(resolveCodeInputCloseAction({ shouldClose: false })).toEqual({
			nextFocused: false,
			nextKeyboardVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveCodeInputShowCursor({ keyboardVisible: true, currentIndex: 2, length: 4 })).toBe(true);
		expect(resolveCodeInputHasError('error')).toBe(true);
		expect(resolveCodeInputCellActive({ focused: true, index: 2, currentIndex: 2 })).toBe(true);
		expect(resolveCodeInputCellActive({ focused: false, index: 2, currentIndex: 2 })).toBe(false);
		expect(resolveCodeInputNativeInputClass()).toBe('sr-only');
		expect(resolveCodeInputNativeInputMode({ type: 'number' })).toBe('numeric');
		expect(resolveCodeInputNativeInputMode({ inputMode: 'tel', type: 'number' })).toBe('tel');
		expect(resolveCodeInputShouldAutoScroll({ autoScroll: true, keyboardVisible: true, hasContainer: true })).toBe(true);
		expect(resolveCodeInputShouldAutoScroll({ autoScroll: false, keyboardVisible: true, hasContainer: true })).toBe(false);
		expect(resolveCodeInputAutoScrollTarget({ rectBottom: 700, viewportHeight: 800, autoScroll: true, scrollY: 100 })).toBe(340);
		expect(resolveCodeInputAutoScrollTarget({ rectBottom: 300, viewportHeight: 800, autoScroll: 200, scrollY: 100 })).toBeNull();
		expect(resolveCodeInputCursorAnimationClass('pulse')).toBe('animate-pulse');
		expect(resolveCodeInputGutterClass('4')).toBe('gap-4');
		expect(resolveCodeInputButtonClass('4')).toBe('flex gap-4');
		expect(resolveCodeInputCellRadiusClass({ radius: 'lg' })).toBe('rounded-lg');
		expect(resolveCodeInputCellRadiusClass({ cellStyle: 'line', radius: 'lg' })).toBe('');
		expect(resolveCodeInputCellRadiusLeftClass({ radius: 'xl' })).toBe('rounded-l-xl');
		expect(resolveCodeInputCellRadiusRightClass({ radius: 'xl' })).toBe('rounded-r-xl');
		expect(resolveCodeInputLineCellClass('sm')).toContain('w-10 h-10 text-base');
		expect(resolveCodeInputDotClass('lg')).toContain('w-3 h-3');
		expect(resolveCodeInputTextClass({ bold: true, cellSize: 'md' })).toContain('text-2xl font-bold');
		expect(resolveCodeInputCursorClass({ cellSize: 'lg', cursorAnimationClass: 'animate-pulse' })).toBe(
			'w-0.5 bg-primary dark:bg-dark h-6 animate-pulse'
		);
		expect(resolveCodeInputUnderlineCursorClass({ box: true, cursorAnimationClass: 'animate-code-input-blink' })).toContain('bottom-2');
		expect(resolveCodeInputLineClass({ active: true })).toContain('bg-primary dark:bg-dark');
		expect(
			resolveCodeInputBoxCellClass({
				index: 1,
				length: 4,
				currentIndex: 2,
				focused: true,
				gutter: '0',
				cellBg: 'theme',
				cellBorder: 'dashed',
				radius: 'lg',
				cellSize: 'sm'
			})
		).toContain('bg-primary/5 dark:bg-dark/5 border border-dashed border-black/10 dark:border-white/10 border-l-0 w-10 h-10 text-base');
		expect(resolveCodeInputRootClass('custom-code')).toBe('relative custom-code');
		expect(resolveCodeInputInfoClass(true)).toBe('mt-2 text-sm text-error dark:text-error-dark');
		expect(resolveCodeInputInfoState({ info: 'Info' })).toEqual({ hasError: false, showInfo: true, text: 'Info' });
		expect(resolveCodeInputInfoState({ errorInfo: 'Error', info: 'Info' })).toEqual({ hasError: true, showInfo: true, text: 'Error' });
		expect(resolveCodeInputInfoState()).toEqual({ hasError: false, showInfo: false, text: '' });
		const options = resolveCodeInputStateOptions({
			props: {
				bold: true,
				cellSize: 'sm',
				cellStyle: 'line',
				cursorAnimation: 'pulse',
				cursorStyle: 'underline',
				errorInfo: 'Error',
				gutter: '4',
				info: 'Info',
				inputMode: 'tel',
				injClass: 'custom-code',
				length: 4,
				mask: false,
				type: 'number'
			},
			focused: true,
			keyboardVisible: true,
			value: '12'
		});
		expect(options).toMatchObject({
			bold: true,
			cellSize: 'sm',
			cellStyle: 'line',
			cursorAnimation: 'pulse',
			cursorStyle: 'underline',
			errorInfo: 'Error',
			focused: true,
			gutter: '4',
			info: 'Info',
			inputMode: 'tel',
			injClass: 'custom-code',
			keyboardVisible: true,
			length: 4,
			mask: false,
			type: 'number',
			value: '12'
		});
		const codeInputState = resolveCodeInputDerived(options);
		expect(codeInputState.currentIndex).toBe(2);
		expect(codeInputState.showCursor).toBe(true);
		expect(codeInputState.rootClass).toBe('relative custom-code');
		expect(codeInputState.buttonClass).toBe('flex gap-4');
		expect(codeInputState.nativeInputClass).toBe('sr-only');
		expect(codeInputState.nativeInputMode).toBe('tel');
		expect(codeInputState.infoClass).toBe('mt-2 text-sm text-error dark:text-error-dark');
		expect(codeInputState.cellDisplayStates[0]).toMatchObject({ index: 0, kind: 'valueText', text: '1' });
		expect(codeInputState.cellDisplayStates[2]).toMatchObject({ index: 2, kind: 'cursor', showUnderlineCursor: true, active: true });
		expect(codeInputState.cellDisplayStates[2]?.cellClass).toContain('w-10 h-10 text-base');
		expect(codeInputState.cellDisplayStates[2]?.lineClass).toContain('bg-error dark:bg-error-dark');
		expect(codeInputState.cellDisplayStates[2]?.underlineCursorClass).toContain('animate-pulse');
	});
});

describe('full keyboard derived', () => {
	test('calculates height, key output and next value', () => {
		expect(resolveFullKeyboardInitialValue()).toBe('');
		expect(resolveFullKeyboardInitialValue(null)).toBe('');
		expect(resolveFullKeyboardInitialValue('abc')).toBe('abc');
		expect(resolveFullKeyboardInitialVisible(undefined)).toBe(true);
		expect(resolveFullKeyboardInitialVisible(undefined, false)).toBe(false);
		expect(resolveFullKeyboardInitialVisible(true)).toBe(true);
		expect(resolveFullKeyboardCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveFullKeyboardCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolveFullKeyboardCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveFullKeyboardVisibleChangeAction({ visible: true, previousVisible: undefined, keyboardHeight: 304 })).toEqual({
			nextPreviousVisible: true,
			openHeight: 304,
			shouldEmitClose: false,
			shouldEmitOpen: true,
			shouldSkip: false
		});
		expect(resolveFullKeyboardVisibleChangeAction({ visible: true, previousVisible: true, keyboardHeight: 304 })).toMatchObject({
			shouldEmitOpen: false,
			shouldSkip: true
		});
		expect(resolveFullKeyboardVisibleChangeAction({ visible: false, previousVisible: true, keyboardHeight: 304 })).toMatchObject({
			nextPreviousVisible: false,
			shouldEmitClose: true,
			shouldEmitOpen: false
		});
		expect(resolveFullKeyboardCloseEmissionAction({ shouldEmitClose: true, skipNextCloseEmission: true })).toEqual({
			nextSkipNextCloseEmission: false,
			shouldEmitClose: false,
			shouldSkipCloseEmission: true
		});
		expect(resolveFullKeyboardCloseEmissionAction({ shouldEmitClose: true, skipNextCloseEmission: false })).toEqual({
			nextSkipNextCloseEmission: false,
			shouldEmitClose: true,
			shouldSkipCloseEmission: false
		});
		expect(
			resolveFullKeyboardVisibleChangeFlow({ visible: false, previousVisible: true, keyboardHeight: 304, skipNextCloseEmission: false })
		).toMatchObject({
			nextPreviousVisible: false,
			nextSkipNextCloseEmission: false,
			rawShouldEmitClose: true,
			shouldEmitClose: true,
			shouldSkipCloseEmission: false
		});
		expect(
			resolveFullKeyboardVisibleChangeFlow({ visible: false, previousVisible: true, keyboardHeight: 304, skipNextCloseEmission: true })
		).toMatchObject({
			nextPreviousVisible: false,
			nextSkipNextCloseEmission: false,
			rawShouldEmitClose: true,
			shouldEmitClose: false,
			shouldSkipCloseEmission: true
		});
		expect(resolveFullKeyboardUsePopup(null)).toBe(false);
		expect(resolveFullKeyboardUsePopup({})).toBe(true);
		expect(resolveFullKeyboardRootProps({ usePopup: false, visible: true, popupProps: { size: 0 } })).toEqual({});
		expect(resolveFullKeyboardRootProps({ usePopup: true, visible: true, popupProps: { size: 0, transitionDistance: 304 } })).toEqual({
			visible: true,
			size: 0,
			transitionDistance: 304
		});
		expect(resolveFullKeyboardTexts({ defaults: { common: { done: 'Done' }, fullKeyboard: { space: 'Space' } } })).toEqual({
			doneText: 'Done',
			spaceText: 'Space'
		});
		expect(resolveFullKeyboardTexts({ doneText: 'OK', defaults: { common: { done: 'Done' }, fullKeyboard: { space: 'Space' } } })).toEqual({
			doneText: 'OK',
			spaceText: 'Space'
		});
		expect(
			resolveFullKeyboardPopupProps({
				popup: { visible: true, mask: { clickable: true }, radius: 'xl', position: 'bottom' },
				transitionDistance: 304,
				type: 'block'
			})
		).toEqual({
			size: 0,
			mask: { opacity: '0', clickable: true },
			transitionDistance: 304,
			radius: 'none',
			position: 'bottom'
		});
		expect(resolveFullKeyboardHeight({ mode: 'letter' })).toBe(260);
		expect(resolveFullKeyboardHeight({ mode: 'full', preview: true })).toBe(348);
		expect(resolveFullKeyboardLayoutState({ mode: 'letter', done: false })).toMatchObject({
			bottomSymbolKeys: [],
			showDoneButton: false,
			showFullMode: false,
			showLetterMode: true,
			showLetterNumberMode: false,
			showLetterRows: true,
			showNumberRow: false,
			showSymbolRows: false,
			symbolMainRows: []
		});
		expect(resolveFullKeyboardLayoutState({ mode: 'letterNumber' })).toMatchObject({
			showLetterMode: false,
			showLetterNumberMode: true,
			showLetterRows: true,
			showNumberRow: true
		});
		expect(resolveFullKeyboardLayoutState({ mode: 'full', isSymbolMode: true })).toMatchObject({
			bottomSymbolKeys: ['>', '/', '?'],
			showBottomSymbolKeys: true,
			showFullMode: true,
			showLetterRows: false,
			showSymbolRows: true
		});
		expect(resolveFullKeyboardLayoutState({ mode: 'full', isSymbolMode: true }).symbolMainRows).toHaveLength(3);
		expect(resolveFullKeyboardKeyRadiusClass({ type: 'button', radius: 'lg' })).toBe('rounded-lg');
		expect(resolveFullKeyboardKeyRadiusClass({ type: 'block', radius: 'lg' })).toBe('');
		expect(resolveFullKeyboardInputKey('a', true)).toBe('A');
		expect(resolveFullKeyboardSymbolToggleText(true)).toBe('ABC');
		expect(resolveFullKeyboardSymbolToggleText(false)).toBe('123');
		expect(resolveFullKeyboardNextValue({ value: 'ab', key: 'c', isUpperCase: true })).toBe('abC');
		expect(resolveFullKeyboardNextValue({ value: 'ab', key: 'delete' })).toBe('a');
		expect(resolveFullKeyboardNextValue({ value: 'ab', key: 'done' })).toBe('ab');
		expect(resolveFullKeyboardKeyAction({ value: 'ab', key: 'c', isUpperCase: true })).toEqual({
			emitKey: 'C',
			nextValue: 'abC',
			shouldEmit: true,
			shouldUpdateValue: true,
			shouldClose: false
		});
		expect(resolveFullKeyboardKeyAction({ value: 'ab', key: 'delete' })).toEqual({
			emitKey: 'delete',
			nextValue: 'a',
			shouldEmit: true,
			shouldUpdateValue: true,
			shouldClose: false
		});
		expect(resolveFullKeyboardKeyAction({ value: 'ab', key: 'done' })).toEqual({
			emitKey: 'done',
			nextValue: 'ab',
			shouldEmit: true,
			shouldUpdateValue: false,
			shouldClose: true
		});
		expect(resolveFullKeyboardKeyAction({ value: 'ab', key: 'done', doneDisabled: true })).toEqual({
			emitKey: 'done',
			nextValue: 'ab',
			shouldEmit: false,
			shouldUpdateValue: false,
			shouldClose: false
		});
		expect(resolveFullKeyboardKeyFlow({ value: 'ab', key: 'c', isUpperCase: true })).toEqual({
			emitKey: 'C',
			nextValue: 'abC',
			shouldEmit: true,
			shouldUpdateValue: true,
			shouldClose: false,
			closeAction: null
		});
		expect(resolveFullKeyboardKeyFlow({ value: 'ab', key: 'done', closeOptions: { emitClose: false } })).toEqual({
			emitKey: 'done',
			nextValue: 'ab',
			shouldEmit: true,
			shouldUpdateValue: false,
			shouldClose: true,
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: false }
		});
		expect(resolveFullKeyboardKeyFlow({ value: 'ab', key: 'done', doneDisabled: true })).toEqual({
			emitKey: 'done',
			nextValue: 'ab',
			shouldEmit: false,
			shouldUpdateValue: false,
			shouldClose: false,
			closeAction: null
		});
		expect(resolveFullKeyboardCaseToggleAction(false)).toEqual({ nextUpperCase: true });
		expect(resolveFullKeyboardCaseToggleAction(true)).toEqual({ nextUpperCase: false });
		expect(resolveFullKeyboardSymbolModeToggleAction(false)).toEqual({ nextSymbolMode: true });
		expect(resolveFullKeyboardSymbolModeToggleAction(true)).toEqual({ nextSymbolMode: false });
	});

	test('resolves keyboard classes without framework templates', () => {
		expect(resolveFullKeyboardGapClass('block')).toBe('gap-px');
		expect(resolveFullKeyboardPanelClass({ type: 'button', panelClass: 'custom-panel' })).toBe(
			'select-none bg-black/5 dark:bg-white/5 p-1.5 custom-panel'
		);
		expect(resolveFullKeyboardPreviewClass('block')).toBe(
			'flex h-11 items-center justify-center bg-bg-highlight text-xl font-semibold tracking-widest dark:bg-bg-highlight-dark rounded-(--radius-form) mb-px'
		);
		expect(resolveFullKeyboardKeyButtonClass({ type: 'button', radius: 'xl', keyClass: 'custom-key', extraClass: 'flex-1' })).toContain(
			'rounded-xl flex-1'
		);
		expect(resolveFullKeyboardFuncButtonClass({ type: 'block', keyClass: 'custom-func', extraClass: 'w-12' })).toContain(
			'custom-func w-12'
		);
		expect(resolveFullKeyboardShiftButtonClass({ type: 'button', isUpperCase: true })).toContain('bg-primary/20 dark:bg-dark/20');
		expect(resolveFullKeyboardDoneButtonClass({ type: 'block', doneDisabled: true, doneClass: 'custom-done' })).toContain(
			'active:opacity-40 transition-all duration-100 opacity-50 active:scale-100 custom-done'
		);
		expect(resolveFullKeyboardGridRowClass({ type: 'button', columns: 9, px: true })).toBe('grid grid-cols-9 px-4 gap-0.5 mb-0.5');
		expect(resolveFullKeyboardInnerGridRowClass({ type: 'button', columns: 7 })).toBe('grid flex-1 grid-cols-7 gap-0.5');
		expect(resolveFullKeyboardInnerGridRowClass({ type: 'block', columns: 9 })).toBe('grid flex-1 grid-cols-9 gap-px');
		expect(resolveFullKeyboardFlexRowClass('block')).toBe('flex gap-px mb-px');
		expect(resolveFullKeyboardBottomRowClass('button')).toBe('flex gap-0.5');
		expect(resolveFullKeyboardIconClass()).toBe('fill-current');
		expect(resolveFullKeyboardSpaceTextClass()).toBe('text-sm opacity-60');
		expect(resolveFullKeyboardPopupRadius({ type: 'block', radius: 'xl' })).toBe('none');
		const options = resolveFullKeyboardStateOptions({
			props: {
				doneClass: 'custom-done',
				done: false,
				keyClass: 'custom-key',
				mode: 'full',
				panelClass: 'custom-panel',
				popup: { visible: true, mask: { clickable: true }, radius: 'xl', position: 'bottom' },
				preview: true,
				previewMask: true,
				radius: 'lg',
				type: 'button'
			},
			doneDisabled: true,
			isSymbolMode: true,
			isUpperCase: true,
			value: '123'
		});
		expect(options).toMatchObject({
			doneClass: 'custom-done',
			done: false,
			doneDisabled: true,
			isSymbolMode: true,
			isUpperCase: true,
			keyClass: 'custom-key',
			mode: 'full',
			panelClass: 'custom-panel',
			popup: { visible: true, mask: { clickable: true }, radius: 'xl', position: 'bottom' },
			preview: true,
			previewMask: true,
			radius: 'lg',
			type: 'button',
			value: '123'
		});
		const keyboardState = resolveFullKeyboardDerived(options);
		expect(keyboardState.keyboardHeight).toBe(348);
		expect(keyboardState.panelClass).toContain('custom-panel');
		expect(keyboardState.previewState).toMatchObject({ showMask: true, displayValue: '' });
		expect(keyboardState.previewState.maskIndexes).toEqual([0, 1, 2]);
		expect(keyboardState.keyButtonClass).toContain('custom-key');
		expect(keyboardState.keyButtonClass).toContain('rounded-lg');
		expect(keyboardState.iconClass).toBe('fill-current');
		expect(keyboardState.spaceTextClass).toBe('text-sm opacity-60');
		expect(keyboardState.shiftButtonClass).toContain('bg-primary/20 dark:bg-dark/20');
		expect(keyboardState.doneButtonClass).toContain('opacity-50 active:scale-100 custom-done');
		expect(keyboardState.layout.showDoneButton).toBe(false);
		expect(keyboardState.layout.showSymbolRows).toBe(true);
		expect(keyboardState.layout.bottomSymbolKeys).toEqual(['>', '/', '?']);
		expect(keyboardState.symbolToggleText).toBe('ABC');
		expect(keyboardState.popupProps).toMatchObject({ transitionDistance: 348, radius: 'xl', position: 'bottom' });
	});
});

describe('grids derived', () => {
	test('resolves grid item and container classes', () => {
		expect(resolveGridItemClass({ row: '2', col: '3' })).toBe('row-span-2 col-span-3');
		expect(resolveGridItemClass({ row: 'bad', col: 'bad' })).toBe('row-span-1 col-span-1');
		expect(resolveGridsContainerClass({ cols: '4', mx: '4', my: '1', gap: '8' })).toBe('grid grid-cols-4 mx-4 my-1 gap-8');
		expect(resolveGridsContainerClass({ cols: 'bad', mx: 'bad', my: 'bad', gap: 'bad' })).toBe('grid grid-cols-6 mx-2 my-2 gap-2');
		const gridOptions = resolveGridStateOptions({ props: { row: '2', col: '3' } });
		const gridsOptions = resolveGridsStateOptions({ props: { cols: '4', mx: '4', my: '1', gap: '8' } });
		expect(gridOptions).toEqual({ row: '2', col: '3' });
		expect(gridsOptions).toEqual({ cols: '4', mx: '4', my: '1', gap: '8' });
		expect(resolveGridDerived(gridOptions)).toEqual({ itemClass: 'row-span-2 col-span-3' });
		expect(resolveGridsDerived(gridsOptions)).toEqual({ containerClass: 'grid grid-cols-4 mx-4 my-1 gap-8' });
	});
});

describe('scroll radio derived', () => {
	test('resolves row normalization, padded data and scroll math', () => {
		const data = [{ label: 'A' }, { label: 'B' }];
		expect(resolveScrollRadioShowRows(9)).toBe(5);
		expect(resolveScrollRadioItemHeight(3)).toBe(4);
		expect(resolveScrollRadioPaddedData(data, 'label', 5).map((item) => item.label)).toEqual(['', '', 'A', 'B', '', '']);
		expect(resolveScrollRadioScrollTop({ autoScrollToLast: false, initIndex: 2, itemHeight: 3 })).toBe(96);
		expect(resolveScrollRadioIndexFromScrollTop(96, 3)).toBe(2);
		expect(resolveScrollRadioScrollAction({ scrollTop: 96, itemHeight: 3, isTouch: true })).toEqual({
			scrollEndIndex: 2,
			scrollingIndex: 2,
			wasTouch: true
		});
		expect(resolveScrollRadioWrapperHeight(3, 5)).toBe('15rem');
		expect(resolveScrollRadioMaskHeight(3, 5)).toBe('6rem');
		expect(resolveScrollRadioWrapperHeightStyleValue(3, 5)).toEqual({ height: '15rem' });
		expect(resolveScrollRadioWrapperHeightStyleString(3, 5)).toBe('height:15rem;');
		expect(resolveScrollRadioItemHeightStyleValue(3)).toEqual({ height: '3rem' });
		expect(resolveScrollRadioItemHeightStyleString(3)).toBe('height:3rem;');
		expect(resolveScrollRadioMaskHeightStyleValue(3, 5)).toEqual({ height: '6rem' });
		expect(resolveScrollRadioMaskHeightStyleString(3, 5)).toBe('height:6rem;');
		expect(resolveScrollRadioAlignClass('right')).toBe('text-right');
		expect(resolveScrollRadioScrollClass({ useAnimation: false, injClass: 'custom-scroll' })).toBe(
			'picker-contents snap-y overflow-auto scroll-auto custom-scroll'
		);
		expect(resolveScrollRadioItemClass('left')).toBe('text-left flex snap-center flex-col justify-center px-2');
		expect(resolveScrollRadioRootClass()).toBe('picker-contents relative overflow-auto');
		expect(resolveScrollRadioLabelClass()).toBe('truncate');
		expect(resolveScrollRadioMaskLayerClass()).toBe(
			'pointer-events-none absolute inset-0 w-full border-b border-t border-bg-surface dark:border-bg-surface-dark'
		);
		expect(resolveScrollRadioTopMaskClass()).toBe(
			'border-b border-black/10 bg-linear-to-b from-bg-surface to-bg-surface/60 dark:border-white/20 dark:from-bg-surface-dark dark:to-bg-surface-dark/60'
		);
		expect(resolveScrollRadioHighlightClass()).toBe('bg-primary/10 dark:bg-dark/10');
		expect(resolveScrollRadioBottomMaskClass()).toBe(
			'border-t border-black/10 bg-linear-to-t from-bg-surface to-bg-surface/60 dark:border-white/20 dark:from-bg-surface-dark dark:to-bg-surface-dark/60'
		);
	});

	test('resolves render-ready scroll radio state', () => {
		const options = resolveScrollRadioStateOptions({
			props: {
				data: [{ label: 'A' }, { label: 'B' }],
				showRow: 7,
				labelKey: 'label',
				autoScrollToLast: false,
				initIndex: 2,
				useAnimation: false,
				align: 'right',
				injClass: 'custom-scroll'
			},
			lastSelectedIndex: 1
		});
		expect(options).toMatchObject({ showRow: 7, initIndex: 2, lastSelectedIndex: 1, align: 'right' });
		const state = resolveScrollRadioDerived(options);

		expect(state.showRows).toBe(7);
		expect(state.itemHeight).toBe(2);
		expect(state.paddedData.map((item) => item.label)).toEqual(['', '', '', 'A', 'B', '', '', '']);
		expect(state.scrollTop).toBe(64);
		expect(state.wrapperStyle).toEqual({ height: '14rem' });
		expect(state.wrapperStyleString).toBe('height:14rem;');
		expect(state.itemStyle).toEqual({ height: '2rem' });
		expect(state.itemStyleString).toBe('height:2rem;');
		expect(state.maskStyle).toEqual({ height: '6rem' });
		expect(state.maskStyleString).toBe('height:6rem;');
		expect(state.rootClass).toBe('picker-contents relative overflow-auto');
		expect(state.scrollClass).toBe('picker-contents snap-y overflow-auto scroll-auto custom-scroll');
		expect(state.itemClass).toBe('text-right flex snap-center flex-col justify-center px-2');
		expect(state.labelClass).toBe('truncate');
		expect(state.highlightClass).toBe('bg-primary/10 dark:bg-dark/10');
	});
});

describe('image list derived', () => {
	test('resolves classes, preview data and aspect ratio values', () => {
		const items = [{ id: 'a', url: 'a.png', message: 'A' }, { id: 'b' }, { id: 'c', url: 'c.png' }];
		const initialItems = resolveImageListInitialItems(items);

		expect(initialItems).toEqual(items);
		expect(initialItems).not.toBe(items);
		expect(resolveImageListInitialItems()).toEqual([]);
		expect(resolveImageListUploadText()).toBe('');
		expect(resolveImageListUploadText('上传')).toBe('上传');
		expect(resolveImageListRootClass({ columns: 3, gap: '4', injClass: 'custom-list' })).toBe('grid grid-cols-3 gap-4 custom-list');
		expect(resolveImageListRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveImageListItemClass({ radius: 'full', itemInjClass: 'custom-item' })).toBe(
			'relative overflow-hidden rounded-full custom-item'
		);
		expect(resolveImageListUploadClass({ radius: 'md', disabled: true })).toContain('rounded-md cursor-not-allowed opacity-50');
		expect(resolveImageListImageClass()).toBe('h-full w-full object-cover');
		expect(resolveImageListPreviewButtonClass()).toBe('h-full w-full');
		expect(resolveImageListPreviewContainerClass()).toBe('relative h-full w-full');
		expect(resolveImageListStatusOverlayClass()).toBe(
			'absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-xs text-white'
		);
		expect(resolveImageListDeleteButtonClass()).toBe(
			'absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white'
		);
		expect(resolveImageListRetryButtonClass()).toBe('flex flex-col items-center text-white');
		expect(resolveImageListRetryIconClass()).toBe('');
		expect(resolveImageListRetryMessageClass()).toBe('mt-1 text-xs');
		expect(resolveImageListPendingMessageClass()).toBe('text-xs text-white');
		expect(resolveImageListUploadTextClass()).toBe('mt-1 text-xs text-black/50 dark:text-white/50');
		expect(resolveImageListAspectRatioValue([4, 3])).toBe('4 / 3');
		expect(resolveImageListAspectRatioStyleValue([4, 3])).toEqual({ aspectRatio: '4 / 3' });
		expect(resolveImageListAspectRatioStyleString([4, 3])).toBe('aspect-ratio: 4 / 3;');
		expect(resolveImageListShowUploadButton({ readonly: false, valueLength: 2, max: 3 })).toBe(true);
		expect(resolveImageListShowUploadButton({ readonly: true, valueLength: 2, max: 3 })).toBe(false);
		expect(resolveImageListPreviewImages(items)).toEqual([
			{ url: 'a.png', alt: 'A' },
			{ url: 'c.png', alt: '' }
		]);
		expect(resolveImageListImageState({ id: 'a', url: 'a.png', thumbnail: 'thumb-a.png', message: 'A' }, 'fallback')).toEqual({
			showImage: true,
			src: 'thumb-a.png',
			alt: 'A'
		});
		expect(resolveImageListImageState({ id: 'b' }, 'fallback')).toEqual({
			showImage: false,
			src: '',
			alt: 'fallback'
		});
		expect(resolveImageListPreviewIndex(items, 'c')).toBe(1);
		expect(resolveImageListPreviewIndex(items, 'missing')).toBe(0);
		expect(resolveImageListPreviewCurrent(-1)).toBe(0);
		expect(resolveImageListPreviewCurrent(2)).toBe(2);
		expect(resolveImageListPreviewOpenAction({ items, itemId: 'c', shouldPreview: true })).toEqual({
			nextPreviewIndex: 1,
			nextPreviewVisible: true,
			shouldOpen: true
		});
		expect(resolveImageListPreviewOpenAction({ items, itemId: 'c', shouldPreview: false })).toEqual({
			nextPreviewIndex: 0,
			nextPreviewVisible: false,
			shouldOpen: false
		});
		expect(resolveImageListPreviewFlow({ items, itemId: 'c', previewable: true, url: 'c.png', disabled: false })).toEqual({
			shouldPreview: true,
			nextPreviewIndex: 1,
			nextPreviewVisible: true,
			shouldOpen: true,
			shouldEmitPreview: true
		});
		expect(resolveImageListPreviewFlow({ items, itemId: 'c', previewable: true, url: 'c.png', disabled: true })).toEqual({
			shouldPreview: false,
			nextPreviewIndex: 0,
			nextPreviewVisible: false,
			shouldOpen: false,
			shouldEmitPreview: false
		});
		expect(resolveImageListPreviewCloseAction()).toEqual({ nextPreviewVisible: false, shouldClose: true });
		expect(resolveImageListItemId({ timestamp: 1000, random: 0.5 })).toBe('1000-i');
		expect(resolveImageListDefaultIconProps({ opacity: 0.5 })).toEqual({ name: 'ri-add-line', size: 28, opacity: 0.5 });
		expect(resolveImageListDefaultDeleteIconProps({ size: 18 })).toEqual({ name: 'ri-close-line', size: 18 });
		expect(resolveImageListDefaultLoadingProps({ speed: 2 })).toEqual({ height: '8', width: '8', inverse: true, speed: 2 });
		expect(resolveImageListItemFromFile({ id: 'id-1', file: { name: 'a.png' } as File, url: 'blob:a' })).toEqual({
			id: 'id-1',
			file: { name: 'a.png' },
			url: 'blob:a',
			status: 'pending'
		});
		expect(resolveImageListStatusState('uploading')).toEqual({
			status: 'uploading',
			isError: false,
			isPending: false,
			isSuccess: false,
			isUploading: true,
			showOverlay: true
		});
		expect(resolveImageListStatusState('success').showOverlay).toBe(false);
		expect(resolveImageListStatusMessage({ status: 'error', uploadFailedText: '上传失败', pendingText: '等待上传' })).toBe('上传失败');
		expect(resolveImageListStatusMessage({ status: 'pending', uploadFailedText: '上传失败', pendingText: '等待上传' })).toBe('等待上传');
		expect(
			resolveImageListStatusMessage({ message: '自定义', status: 'error', uploadFailedText: '上传失败', pendingText: '等待上传' })
		).toBe('自定义');
		expect(
			resolveImageListItemViewStateList({
				items: [
					{ id: 'a', url: 'a.png', thumbnail: 'thumb-a.png', status: 'uploading' },
					{ id: 'b', status: 'error', message: '失败原因' }
				],
				previewable: true,
				disabled: false,
				useItemIdAsFallbackAlt: true,
				uploadFailedText: '上传失败',
				pendingText: '等待上传'
			})
		).toEqual([
			{
				imageState: { showImage: true, src: 'thumb-a.png', alt: 'a' },
				index: 0,
				item: { id: 'a', url: 'a.png', thumbnail: 'thumb-a.png', status: 'uploading' },
				previewAction: { shouldPreview: true },
				statusMessage: '',
				statusState: {
					status: 'uploading',
					isError: false,
					isPending: false,
					isSuccess: false,
					isUploading: true,
					showOverlay: true
				}
			},
			{
				imageState: { showImage: false, src: '', alt: '失败原因' },
				index: 1,
				item: { id: 'b', status: 'error', message: '失败原因' },
				previewAction: { shouldPreview: false },
				statusMessage: '失败原因',
				statusState: {
					status: 'error',
					isError: true,
					isPending: false,
					isSuccess: false,
					isUploading: false,
					showOverlay: true
				}
			}
		]);
		expect(resolveImageListMutationAction({ disabled: false, readonly: false })).toEqual({ shouldMutate: true });
		expect(resolveImageListMutationAction({ disabled: true, readonly: false })).toEqual({ shouldMutate: false });
		expect(resolveImageListAddFilesAction({ disabled: false, readonly: false, filesLength: 2 })).toEqual({ shouldAddFiles: true });
		expect(resolveImageListAddFilesAction({ disabled: false, readonly: false, filesLength: 0 })).toEqual({ shouldAddFiles: false });
		expect(resolveImageListPreviewAction({ previewable: true, url: 'a.png', disabled: false })).toEqual({ shouldPreview: true });
		expect(resolveImageListPreviewAction({ previewable: true, url: 'a.png', disabled: true })).toEqual({ shouldPreview: false });
		expect(resolveImageListPreviewKeyboardAction({ key: 'Enter', previewable: true, url: 'a.png' })).toEqual({
			shouldPreview: true,
			shouldPreventDefault: true
		});
		expect(resolveImageListPreviewKeyboardAction({ key: 'Escape', previewable: true, url: 'a.png' })).toEqual({
			shouldPreview: false,
			shouldPreventDefault: false
		});
		expect(resolveImageListPreviewKeyboardFlow({ key: 'Enter', items, itemId: 'c', previewable: true, url: 'c.png' })).toEqual({
			shouldPreview: true,
			shouldPreventDefault: true,
			nextPreviewIndex: 1,
			nextPreviewVisible: true,
			shouldOpen: true,
			shouldEmitPreview: true
		});
		expect(resolveImageListPreviewKeyboardFlow({ key: 'Escape', items, itemId: 'c', previewable: true, url: 'c.png' })).toEqual({
			shouldPreview: false,
			shouldPreventDefault: false,
			nextPreviewIndex: 0,
			nextPreviewVisible: false,
			shouldOpen: false,
			shouldEmitPreview: false
		});
		expect(resolveImageListRevokeUrlAction({ url: 'blob:a', file: {} })).toEqual({ shouldRevokeUrl: true });
		expect(resolveImageListRevokeUrlAction({ url: 'blob:a' })).toEqual({ shouldRevokeUrl: false });
		expect(appendImageListItems([{ id: 'a' }], [{ id: 'b' }])).toEqual([{ id: 'a' }, { id: 'b' }]);
		expect(removeImageListItemAt([{ id: 'a' }, { id: 'b' }], 0)).toEqual([{ id: 'b' }]);
		expect(
			resolveImageListDeleteFlow({
				items: [
					{ id: 'a', url: 'blob:a', file: {} },
					{ id: 'b', url: 'b.png' }
				],
				item: { id: 'a', url: 'blob:a', file: {} },
				index: 0
			})
		).toEqual({
			nextItems: [{ id: 'b', url: 'b.png' }],
			shouldDelete: true,
			shouldEmitDelete: true,
			shouldMutate: true,
			shouldRevokeUrl: true
		});
		expect(
			resolveImageListDeleteFlow({
				disabled: true,
				items: [{ id: 'a', url: 'blob:a', file: {} }],
				item: { id: 'a', url: 'blob:a', file: {} },
				index: 0
			})
		).toEqual({
			nextItems: [{ id: 'a', url: 'blob:a', file: {} }],
			shouldDelete: false,
			shouldEmitDelete: false,
			shouldMutate: false,
			shouldRevokeUrl: false
		});
	});

	test('resolves render-ready image list state', () => {
		const state = resolveImageListDerived({
			items: [
				{ id: 'a', url: 'a.png', message: 'A', status: 'success' },
				{ id: 'b', status: 'pending' }
			],
			columns: 3,
			gap: '4',
			radius: 'lg',
			aspectRatio: [4, 3],
			icon: { opacity: 0.5 },
			deleteIcon: { size: 18 },
			loading: { speed: 2 },
			injClass: 'custom-list',
			itemInjClass: 'custom-item',
			max: 3,
			pendingText: '等待上传',
			uploadFailedText: '上传失败',
			useItemIdAsFallbackAlt: true
		});

		expect(state.rootClass).toBe('grid grid-cols-3 gap-4 custom-list');
		expect(state.itemClass).toBe('relative overflow-hidden rounded-lg custom-item');
		expect(state.imageClass).toBe('h-full w-full object-cover');
		expect(state.previewButtonClass).toBe('h-full w-full');
		expect(state.previewContainerClass).toBe('relative h-full w-full');
		expect(state.statusOverlayClass).toBe('absolute inset-0 flex flex-col items-center justify-center bg-black/50 text-xs text-white');
		expect(state.deleteButtonClass).toContain('absolute right-1 top-1');
		expect(state.retryButtonClass).toBe('flex flex-col items-center text-white');
		expect(state.retryIconClass).toBe('');
		expect(state.retryMessageClass).toBe('mt-1 text-xs');
		expect(state.pendingMessageClass).toBe('text-xs text-white');
		expect(state.uploadTextClass).toBe('mt-1 text-xs text-black/50 dark:text-white/50');
		expect(state.aspectRatioStyleValue).toEqual({ aspectRatio: '4 / 3' });
		expect(state.aspectRatioStyleString).toBe('aspect-ratio: 4 / 3;');
		expect(state.showUploadButton).toBe(true);
		expect(state.mergedIcon).toEqual({ name: 'ri-add-line', size: 28, opacity: 0.5 });
		expect(state.mergedDeleteIcon).toEqual({ name: 'ri-close-line', size: 18 });
		expect(state.mergedLoading).toEqual({ height: '8', width: '8', inverse: true, speed: 2 });
		expect(state.previewImages).toEqual([{ url: 'a.png', alt: 'A' }]);
		expect(state.itemViewStates[1].statusMessage).toBe('等待上传');
	});

	test('selects upload files by count and size without touching URL APIs', () => {
		const files = [{ size: 1024 }, { size: 20 * 1024 * 1024 }, { size: 2048 }];
		const result = resolveImageListFileSelection({ files, currentLength: 1, max: 3, maxSize: 10 });

		expect(result.remainingSlots).toBe(2);
		expect(result.exceeded).toBe(true);
		expect(result.filesToAdd).toEqual(files.slice(0, 2));
		expect(result.validFiles).toEqual([files[0]]);
		expect(result.oversizedFiles).toEqual([files[1]]);
		expect(resolveImageListAddFilesFlow({ files, currentLength: 1, max: 3, maxSize: 10, disabled: false, readonly: false })).toEqual({
			...result,
			shouldAddFiles: true
		});
		expect(resolveImageListAddFilesFlow({ files: [], currentLength: 1, max: 3, maxSize: 10, disabled: false, readonly: false })).toEqual({
			remainingSlots: 2,
			exceeded: false,
			filesToAdd: [],
			validFiles: [],
			oversizedFiles: [],
			shouldAddFiles: false
		});
	});
});

describe('image preview derived', () => {
	test('normalizes images and current image state', () => {
		expect(resolveImagePreviewInitialVisible(undefined)).toBe(false);
		expect(resolveImagePreviewInitialVisible(true)).toBe(true);
		expect(resolveImagePreviewInitialRendered(undefined)).toBe(false);
		expect(resolveImagePreviewInitialRendered(true)).toBe(true);
		expect(resolveImagePreviewRenderedState({ visible: true, outDuration: 200, currentRendered: false })).toBe(true);
		expect(resolveImagePreviewRenderedState({ visible: false, outDuration: 0, currentRendered: true })).toBe(false);
		expect(resolveImagePreviewBodyOverflowStyle({ visible: true })).toBe('hidden');
		expect(resolveImagePreviewBodyOverflowStyle({ visible: false })).toBe('');
		expect(resolveImagePreviewOverlayStyleValue(1000)).toEqual({ zIndex: 1001 });
		expect(resolveImagePreviewOverlayStyleString(1000)).toBe('z-index: 1001');
		expect(resolveImagePreviewInParams(320)).toEqual({ duration: 320 });
		expect(resolveImagePreviewOutParams(180)).toEqual({ duration: 180 });
		expect(resolveImagePreviewControlScaleParams()).toEqual({ duration: 200, delay: 100 });
		const images = normalizeImagePreviewImages(['a.png', { url: 'b.png', alt: 'B' }]);
		expect(images).toEqual([{ url: 'a.png' }, { url: 'b.png', alt: 'B' }]);
		expect(resolveImagePreviewCurrentImage(images, 1)).toEqual({ url: 'b.png', alt: 'B' });
		expect(resolveImagePreviewCurrentImage(images, 3)).toEqual({ url: '' });
		expect(resolveImagePreviewAlt('预览图')).toBe('预览图');
		expect(resolveImagePreviewAlt()).toBe('');
		expect(resolveImagePreviewClosePositionClass('bl')).toBe('bottom-4 left-4');
		expect(resolveImagePreviewClosePositionClass('unknown')).toBe('top-4 right-4');
		expect(resolveImagePreviewControlPanelClass('bl')).toBe('absolute bottom-4 left-4 flex gap-2');
		expect(resolveImagePreviewControlButtonClass()).toBe('rounded-full bg-black/30 p-2 text-white active:bg-black/50');
		expect(resolveImagePreviewCenterPrevButtonClass()).toBe(
			'absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white active:bg-black/50'
		);
		expect(resolveImagePreviewCenterNextButtonClass()).toBe(
			'absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 p-2 text-white active:bg-black/50'
		);
		expect(resolveImagePreviewBottomBarClass()).toBe('absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 px-4');
		expect(resolveImagePreviewIndexNumberClass()).toBe('rounded-full bg-black/30 px-3 py-1 text-sm text-white');
		expect(resolveImagePreviewOverlayClass()).toBe('fixed inset-0 flex items-center justify-center');
		expect(resolveImagePreviewContainerClass()).toBe('relative h-full w-full overflow-hidden touch-none');
		expect(resolveImagePreviewSlideClass()).toBe('flex h-full transition-transform');
		expect(resolveImagePreviewItemClass()).toBe('flex h-full w-full shrink-0 items-center justify-center');
		expect(resolveImagePreviewLoadingClass()).toBe('absolute inset-0 flex items-center justify-center');
		expect(resolveImagePreviewErrorClass()).toBe('flex flex-col items-center justify-center text-white/60');
		expect(resolveImagePreviewErrorIconClass()).toBe('');
		expect(resolveImagePreviewErrorTextClass()).toBe('mt-2 text-sm');
		expect(resolveImagePreviewImageClass()).toBe('max-h-full max-w-full select-none object-contain');
		expect(resolveImagePreviewCustomContentClass()).toBe('absolute bottom-20 left-0 right-0 px-4');
		expect(resolveImagePreviewDotListClass()).toBe('flex gap-2');
		expect(resolveImagePreviewMergedIcon({ size: 32 }, { name: 'ri-close-line', size: 24 })).toEqual({ name: 'ri-close-line', size: 32 });
		expect(resolveImagePreviewPointerList(new Map([[1, { clientX: 10, clientY: 20 }]]).values())).toEqual([{ clientX: 10, clientY: 20 }]);
		expect(resolveImagePreviewRotation()).toBe(0);
		expect(resolveImagePreviewRotation(180)).toBe(180);
		expect(resolveImagePreviewRotation(Number.NaN)).toBe(0);
		expect(resolveImagePreviewDotClass({ index: 1, currentIndex: 1 })).toBe('h-2 rounded-full transition-all w-4 bg-white');
		expect(resolveImagePreviewDotClass({ index: 0, currentIndex: 1 })).toBe('h-2 rounded-full transition-all w-2 bg-white/50');
		expect(resolveImagePreviewLoadingVisible(undefined)).toBe(true);
		expect(resolveImagePreviewLoadingVisible('loaded')).toBe(false);
		expect(resolveImagePreviewErrorVisible('error')).toBe(true);
		expect(resolveImagePreviewErrorVisible('loaded')).toBe(false);
		expect(resolveImagePreviewItemDisplayState({ status: undefined, hasLoadingContent: true })).toEqual({
			showCustomError: false,
			showCustomLoading: true,
			showDefaultError: false,
			showDefaultLoading: false,
			showError: false,
			showImage: true,
			showLoading: true
		});
		expect(resolveImagePreviewItemDisplayState({ status: 'error', hasErrorContent: false })).toEqual({
			showCustomError: false,
			showCustomLoading: false,
			showDefaultError: true,
			showDefaultLoading: false,
			showError: true,
			showImage: false,
			showLoading: false
		});
		expect(
			resolveImagePreviewItemDisplayStateList({
				items: images,
				loadStatus: { 0: 'loaded', 1: 'error' },
				hasLoadingContent: true,
				hasErrorContent: true
			})
		).toEqual([
			{
				displayState: {
					showCustomError: false,
					showCustomLoading: false,
					showDefaultError: false,
					showDefaultLoading: false,
					showError: false,
					showImage: true,
					showLoading: false
				},
				index: 0,
				item: { url: 'a.png' }
			},
			{
				displayState: {
					showCustomError: true,
					showCustomLoading: false,
					showDefaultError: false,
					showDefaultLoading: false,
					showError: true,
					showImage: false,
					showLoading: false
				},
				index: 1,
				item: { url: 'b.png', alt: 'B' }
			}
		]);
		expect(
			resolveImagePreviewControlState({
				currentIndex: 0,
				total: 3,
				loop: false,
				showNavigation: true,
				navigationPosition: 'center',
				showIndex: true
			})
		).toEqual({
			showBottomBar: true,
			showBottomNext: false,
			showBottomPrev: false,
			showCenterNavigation: true,
			showCenterNext: true,
			showCenterPrev: false,
			showIndex: true
		});
		expect(
			resolveImagePreviewControlState({
				currentIndex: 2,
				total: 3,
				loop: false,
				showNavigation: true,
				navigationPosition: 'bottom',
				showIndex: false
			})
		).toEqual({
			showBottomBar: true,
			showBottomNext: false,
			showBottomPrev: true,
			showCenterNavigation: false,
			showCenterNext: false,
			showCenterPrev: false,
			showIndex: false
		});
	});

	test('resolves navigation, pointer math and rotations', () => {
		expect(resolveImagePreviewNextIndex({ currentIndex: 0, requestedIndex: -1, total: 3, loop: true })).toBe(2);
		expect(resolveImagePreviewNextIndex({ currentIndex: 1, requestedIndex: 3, total: 3, loop: false })).toBe(2);
		expect(resolveImagePreviewNextIndex({ currentIndex: 1, requestedIndex: 0, total: 0, loop: true })).toBe(1);
		expect(resolveImagePreviewTransformResetAction()).toEqual({ currentScale: 1, translateX: 0, translateY: 0 });
		expect(resolveImagePreviewVisibleResetAction()).toEqual({
			currentScale: 1,
			translateX: 0,
			translateY: 0,
			pointerFlags: { isMoving: false, isPinching: false, isSwiping: false },
			swipeOffset: 0
		});
		expect(resolveImagePreviewRotationAnimationAction({ phase: 'start' })).toEqual({ nextIsResettingRotation: true });
		expect(resolveImagePreviewRotationAnimationAction({ phase: 'end' })).toEqual({ nextIsResettingRotation: false });
		expect(resolveImagePreviewOutroEndAction()).toEqual({ nextRendered: false });
		expect(resolveImagePreviewCloseAction({ visible: true })).toEqual({
			currentScale: 1,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true,
			translateX: 0,
			translateY: 0
		});
		expect(resolveImagePreviewCloseAction({ visible: false })).toEqual({
			currentScale: 1,
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false,
			translateX: 0,
			translateY: 0
		});
		expect(resolveImagePreviewSwitchAction({ currentIndex: 0, requestedIndex: 1, total: 3, loop: true })).toEqual({
			currentScale: 1,
			nextIndex: 1,
			shouldChange: true,
			translateX: 0,
			translateY: 0
		});
		expect(resolveImagePreviewSwitchAction({ currentIndex: 1, requestedIndex: 1, total: 3, loop: true }).shouldChange).toBe(false);
		expect(resolveImagePreviewLoadStatusAction({ index: 2, loadStatus: { 1: 'loaded' }, status: 'error' })).toEqual({
			nextLoadStatus: { 1: 'loaded', 2: 'error' }
		});
		expect(resolveImagePreviewRotateAction({ currentIndex: 0, rotationStatus: { 0: 270 } })).toEqual({
			nextRotation: 360,
			nextRotationStatus: { 0: 360 },
			normalizedRotation: 0,
			resetIndex: 0,
			resetRotation: 0,
			shouldResetRotation: true
		});
		expect(resolveImagePreviewRotationResetAction({ index: 0, rotationStatus: { 0: 360, 1: 90 } })).toEqual({
			nextRotationStatus: { 0: 0, 1: 90 }
		});
		expect(resolveImagePreviewDistance({ clientX: 0, clientY: 0 }, { clientX: 3, clientY: 4 })).toBe(5);
		expect(resolveImagePreviewClampedScale({ currentDistance: 30, pinchStartDistance: 10, pinchStartScale: 2, maxScale: 3 })).toBe(3);
		expect(resolveImagePreviewHasMoved({ deltaX: 4, deltaY: 5 })).toBe(false);
		expect(resolveImagePreviewHasMoved({ deltaX: 6, deltaY: 0 })).toBe(true);
		expect(resolveImagePreviewNormalizedRotation(450)).toBe(90);
		expect(resolveImagePreviewShouldResetRotation(360)).toBe(true);
		expect(resolveImagePreviewShouldResetRotation(270)).toBe(false);
		expect(resolveImagePreviewShouldResetScale(0.8)).toBe(true);
		expect(resolveImagePreviewShouldResetScale(1)).toBe(false);
		expect(resolveImagePreviewSwipeDirection({ swipeOffset: 90, viewportWidth: 300 })).toBe('prev');
		expect(resolveImagePreviewSwipeDirection({ swipeOffset: -90, viewportWidth: 300 })).toBe('next');
		expect(resolveImagePreviewSwipeDirection({ swipeOffset: 40, viewportWidth: 300 })).toBe('none');
	});

	test('resolves pointer gesture state without DOM events', () => {
		expect(resolveImagePreviewPointerDownState({ currentScale: 1, pointers: [{ clientX: 10, clientY: 20 }] })).toEqual({
			hasMoved: false,
			isPinching: false,
			isSwiping: true,
			isMoving: false,
			startX: 10,
			startY: 20,
			swipeStartX: 10,
			swipeOffset: 0
		});
		expect(resolveImagePreviewPointerDownState({ currentScale: 2, pointers: [{ clientX: 10, clientY: 20 }] })).toMatchObject({
			isSwiping: false,
			isMoving: true
		});
		expect(
			resolveImagePreviewPointerDownState({
				currentScale: 1.5,
				pointers: [
					{ clientX: 0, clientY: 0 },
					{ clientX: 3, clientY: 4 }
				]
			})
		).toMatchObject({
			isPinching: true,
			pinchStartDistance: 5,
			pinchStartScale: 1.5
		});
		expect(
			resolveImagePreviewPointerMoveState({
				currentScale: 1,
				isSwiping: true,
				pinchStartDistance: 10,
				pinchStartScale: 1,
				pointers: [{ clientX: 42, clientY: 12 }],
				point: { clientX: 42, clientY: 12 },
				startX: 10,
				startY: 10,
				swipeStartX: 10
			})
		).toMatchObject({ hasMoved: true, preventDefault: true, swipeOffset: 32 });
		expect(
			resolveImagePreviewPointerUpState({
				currentScale: 1,
				hasMoved: false,
				isSwiping: true,
				maskClosable: true,
				pointers: [],
				swipeOffset: 0,
				viewportWidth: 300
			})
		).toMatchObject({ shouldClose: true, swipeDirection: 'none', resetSwipeOffset: true });
		expect(
			resolveImagePreviewPointerUpAction({
				pointerCount: 1,
				pointerState: { isPinching: false, isSwiping: true, isMoving: false, startX: 10, startY: 20, swipeStartX: 10 }
			})
		).toEqual({
			kind: 'continueTracking',
			pointerFlags: { isMoving: false, isPinching: false, isSwiping: true },
			shouldClose: false,
			shouldResetScale: false,
			shouldResetSwipeOffset: false,
			shouldSwitchNext: false,
			shouldSwitchPrev: false,
			startX: 10,
			startY: 20,
			swipeStartX: 10
		});
		expect(
			resolveImagePreviewPointerUpAction({
				pointerCount: 0,
				pointerState: {
					isPinching: false,
					isMoving: false,
					isSwiping: false,
					resetSwipeOffset: true,
					shouldClose: false,
					shouldResetScale: true,
					swipeDirection: 'next'
				}
			})
		).toMatchObject({
			kind: 'settled',
			pointerFlags: { isMoving: false, isPinching: false, isSwiping: false },
			shouldResetScale: true,
			shouldResetSwipeOffset: true,
			shouldSwitchNext: true,
			shouldSwitchPrev: false
		});
		expect(resolveImagePreviewPointerUpAction({ pointerCount: 2, pointerState: {} })).toMatchObject({
			kind: 'ignored',
			shouldSwitchNext: false,
			shouldSwitchPrev: false
		});
		expect(resolveImagePreviewPointerFlags({ isPinching: true })).toEqual({ isMoving: false, isPinching: true, isSwiping: false });
	});

	test('resolves slide and image transform styles', () => {
		expect(resolveImagePreviewSlideStyleValue({ currentIndex: 2, swipeOffset: 12, isSwiping: true, swipeDuration: 500 })).toEqual({
			transform: 'translateX(calc(-200% + 12px))',
			transitionDuration: '0ms'
		});
		expect(resolveImagePreviewSlideStyleString({ currentIndex: 1, swipeOffset: -4, isSwiping: false, swipeDuration: 300 })).toBe(
			'transform: translateX(calc(-100% + -4px)); transition-duration: 300ms'
		);
		expect(
			resolveImagePreviewImageStyleValue({
				index: 1,
				currentIndex: 1,
				currentScale: 2,
				translateX: 20,
				translateY: -10,
				rotation: 90
			})
		).toEqual({
			transform: 'scale(2) translate(10px, -5px) rotate(-90deg)',
			transition: 'transform 0.2s'
		});
		expect(resolveImagePreviewImageStyleString({ index: 0, currentIndex: 1, rotation: 180, isResettingRotation: true })).toBe(
			'transform: rotate(-180deg); transition: none'
		);
	});

	test('resolves render-ready image preview state', () => {
		const options = resolveImagePreviewStateOptions({
			props: {
				images: ['a.png', { url: 'b.png', alt: 'B' }],
				closePosition: 'bl',
				zIndex: 1200,
				duration: 320,
				outDuration: 180,
				icon: { size: 32 },
				rotationIcon: { className: 'rotate-icon' },
				loop: false,
				navigationPosition: 'bottom',
				showIndex: true,
				showNavigation: true,
				swipeDuration: 400
			},
			currentIndex: 1,
			currentScale: 2,
			translateX: 20,
			translateY: -10,
			rotationStatus: { 1: 90 },
			loadStatus: { 0: 'loaded', 1: 'error' },
			loadingContentVisible: true,
			errorContentVisible: true,
			isMoving: false,
			isPinching: false,
			isResettingRotation: false,
			isSwiping: false,
			swipeOffset: -8
		});
		expect(options).toMatchObject({
			images: ['a.png', { url: 'b.png', alt: 'B' }],
			closePosition: 'bl',
			currentIndex: 1,
			currentScale: 2,
			duration: 320,
			errorContentVisible: true,
			icon: { size: 32 },
			isMoving: false,
			isPinching: false,
			isResettingRotation: false,
			isSwiping: false,
			loadStatus: { 0: 'loaded', 1: 'error' },
			loadingContentVisible: true,
			loop: false,
			navigationPosition: 'bottom',
			outDuration: 180,
			rotationIcon: { className: 'rotate-icon' },
			rotationStatus: { 1: 90 },
			showIndex: true,
			showNavigation: true,
			swipeDuration: 400,
			swipeOffset: -8,
			translateX: 20,
			translateY: -10,
			zIndex: 1200
		});
		const state = resolveImagePreviewDerived(options);

		expect(state.total).toBe(2);
		expect(state.currentImage).toEqual({ url: 'b.png', alt: 'B' });
		expect(state.controlPanelClass).toBe('absolute bottom-4 left-4 flex gap-2');
		expect(state.overlayClass).toBe(resolveImagePreviewOverlayClass());
		expect(state.containerClass).toBe(resolveImagePreviewContainerClass());
		expect(state.slideClass).toBe(resolveImagePreviewSlideClass());
		expect(state.itemClass).toBe(resolveImagePreviewItemClass());
		expect(state.loadingClass).toBe(resolveImagePreviewLoadingClass());
		expect(state.errorClass).toBe(resolveImagePreviewErrorClass());
		expect(state.errorIconClass).toBe(resolveImagePreviewErrorIconClass());
		expect(state.errorTextClass).toBe(resolveImagePreviewErrorTextClass());
		expect(state.imageClass).toBe(resolveImagePreviewImageClass());
		expect(state.customContentClass).toBe(resolveImagePreviewCustomContentClass());
		expect(state.dotListClass).toBe(resolveImagePreviewDotListClass());
		expect(state.overlayStyleValue).toEqual({ zIndex: 1201 });
		expect(state.overlayStyleString).toBe('z-index: 1201');
		expect(state.inParams).toEqual({ duration: 320 });
		expect(state.outParams).toEqual({ duration: 180 });
		expect(state.mergedIcon).toEqual({ name: 'ri-close-line', size: 32 });
		expect(state.mergedRotationIcon).toEqual({ size: 24, className: 'rotate-icon' });
		expect(state.slideStyleValue).toEqual({ transform: 'translateX(calc(-100% + -8px))', transitionDuration: '400ms' });
		expect(state.controlState).toMatchObject({ showBottomBar: true, showBottomPrev: true, showBottomNext: false });
		expect(state.imageDisplayItems[1]).toMatchObject({
			alt: 'B',
			rotation: 90,
			displayState: {
				showCustomError: true,
				showError: true,
				showImage: false
			},
			imageStyleValue: {
				transform: 'scale(2) translate(10px, -5px) rotate(-90deg)',
				transition: 'transform 0.2s'
			}
		});
		expect(state.dotItems[1]).toEqual({ index: 1, className: 'h-2 rounded-full transition-all w-4 bg-white' });
	});
});

describe('icon derived', () => {
	test('resolves state classes and normalized sizes', () => {
		expect(resolveIconStateClass({ state: 'success' })).toBe('text-success');
		expect(resolveIconStateClass({ theme: true })).toBe('text-primary dark:text-dark');
		expect(resolveIconStateClass()).toBe('');
		expect(resolveIconInteractive(() => undefined)).toBe(true);
		expect(resolveIconInteractive(undefined)).toBe(false);
		expect(resolveIconAccessibility({ interactive: true, name: 'ri-add-line' })).toEqual({
			ariaHidden: undefined,
			ariaLabel: 'ri-add-line',
			role: 'button',
			tabIndex: 0
		});
		expect(resolveIconAccessibility({ interactive: false, name: 'ri-add-line' })).toEqual({
			ariaHidden: true,
			ariaLabel: undefined,
			role: undefined,
			tabIndex: undefined
		});
		expect(resolveIconKeyboardAction({ interactive: true, key: 'Enter' })).toEqual({ shouldClick: true, shouldPreventDefault: true });
		expect(resolveIconKeyboardAction({ interactive: false, key: 'Enter' })).toEqual({ shouldClick: false, shouldPreventDefault: false });
		expect(resolveIconKeyboardAction({ interactive: true, key: 'Escape' })).toEqual({ shouldClick: false, shouldPreventDefault: false });
		expect(resolveIconCssSizeValue(16, 24)).toBe('16px');
		expect(resolveIconCssSizeValue(0, 'full')).toBe('100%');
		expect(resolveIconSvgSizeValue(18, 24)).toBe(18);
		expect(resolveIconSvgSizeValue(0, 'full')).toBe('100%');
	});

	test('resolves icon classes and styles without framework state', () => {
		expect(resolveIconifyClass({ type: 'iconify', name: 'ri-add-line', stateClass: 'text-success', injClass: 'extra' })).toBe(
			'iconify ri-add-line relative text-success extra'
		);
		expect(resolveIconSymbolClass({ stateClass: 'text-error', injClass: 'extra' })).toBe('relative inline fill-current text-error extra');
		expect(resolveIconifyStyleValue({ opacity: 0.5, width: 12, height: 0, size: 'full', y: 2 })).toEqual({
			opacity: 0.5,
			width: '12px',
			height: '100%',
			top: '2px'
		});
		expect(resolveIconifyStyleString({ opacity: 0.5, width: 12, height: 0, size: 24, y: 2 })).toBe(
			'opacity:0.5; width:12px; height:24px; top:2px;'
		);
		expect(resolveIconSymbolStyleValue({ opacity: 0.75, y: -1 })).toEqual({ fillOpacity: 0.75, top: '-1px' });
		expect(resolveIconSymbolStyleString({ opacity: 0.75, y: -1 })).toBe('fill-opacity:0.75; top:-1px;');
		expect(resolveIconSymbolHref({ path: 'custom/symbol.svg', name: 'ri-add-line' })).toBe('/custom/symbol.svg#ri-add-line');
		expect(resolveIconSymbolHref({ name: 'ri-add-line' })).toBe('/fonts/symbol.svg#ri-add-line');
	});

	test('resolves render-ready icon state', () => {
		const options = resolveIconStateOptions({
			props: {
				type: 'symbol',
				name: 'ri-add-line',
				size: 24,
				width: 16,
				height: 0,
				state: 'success',
				opacity: 0.75,
				y: 2,
				injClass: 'extra'
			},
			configPath: 'custom/symbol.svg',
			interactive: true
		});
		expect(options).toMatchObject({ name: 'ri-add-line', configPath: 'custom/symbol.svg', interactive: true });
		const iconState = resolveIconDerived(options);

		expect(iconState.symbolClass).toBe('relative inline fill-current text-success extra');
		expect(iconState.symbolWidth).toBe(16);
		expect(iconState.symbolHeight).toBe(24);
		expect(iconState.symbolStyleString).toBe('fill-opacity:0.75; top:2px;');
		expect(iconState.iconifyStyleValue).toEqual({
			opacity: 0.75,
			width: '16px',
			height: '24px',
			top: '2px'
		});
		expect(iconState.accessibility).toEqual({
			ariaHidden: undefined,
			ariaLabel: 'ri-add-line',
			role: 'button',
			tabIndex: 0
		});
		expect(iconState.finalPath).toBe('custom/symbol.svg');
		expect(iconState.symbolHref).toBe('/custom/symbol.svg#ri-add-line');
	});
});

describe('index bar derived', () => {
	test('resolves heights, sums and indexes', () => {
		expect(resolveIndexBarMeasuredClientHeight()).toBe(0);
		expect(resolveIndexBarMeasuredClientHeight({ clientHeight: 42 })).toBe(42);
		expect(resolveIndexBarMeasuredClientHeights([undefined, { clientHeight: 20 }, { clientHeight: 0 }])).toEqual([0, 20, 0]);
		expect(resolveIndexBarGroupHeights([{ height: 20 }, {}, { height: 40 }])).toEqual([20, 0, 40]);
		const sums = resolveIndexBarLongSumList([20, 30, 40]);
		expect(sums).toEqual([0, 20, 50, 90]);
		expect(resolveIndexBarItemHeight(90, 3)).toBe(30);
		expect(resolveIndexBarTop({ top: 10, height: 100, barHeight: 40 })).toBe(40);
		expect(resolveIndexBarInitialTouchState()).toEqual({ currentTouch: -1, isDown: false });
		expect(resolveIndexBarTouchIndex({ clientY: 5, barToTop: 10, itemHeight: 20, dataLength: 3 })).toBe(0);
		expect(resolveIndexBarTouchIndex({ clientY: 80, barToTop: 10, itemHeight: 20, dataLength: 3 })).toBe(2);
		expect(resolveIndexBarTouchSelectAction({ clientY: 80, barToTop: 10, itemHeight: 20, dataLength: 3 })).toEqual({
			currentIndex: 2,
			currentTouch: 2,
			isDown: true,
			scrollIndex: 2
		});
		expect(resolveIndexBarTouchEndAction()).toEqual({ currentTouch: -1, isDown: false });
		expect(resolveIndexBarScrollTop({ index: 2, longSumList: sums })).toBe(50);
		expect(resolveIndexBarCurrentFromScroll({ scrollTop: 25, longSumList: sums })).toBe(1);
		expect(resolveIndexBarScrollAction({ scrollTop: 25, longSumList: sums })).toEqual({ currentIndex: 1, shouldUpdate: true });
		expect(resolveIndexBarScrollAction({ scrollTop: 100, longSumList: sums })).toEqual({ currentIndex: -1, shouldUpdate: false });
		expect(resolveIndexBarMeasuredHeightsState({ currentHeights: [20, 30], measuredHeights: [20, 30] })).toEqual({
			groupHeights: [20, 30],
			longSumList: [0, 20, 50],
			shouldUpdate: false
		});
		expect(resolveIndexBarMeasuredHeightsState({ currentHeights: [20], measuredHeights: [20, 40] })).toEqual({
			groupHeights: [20, 40],
			longSumList: [0, 20, 60],
			shouldUpdate: true
		});
		expect(resolveIndexBarMeasuredBarHeightState({ currentBarHeight: 80, measuredBarHeight: 80 })).toEqual({
			barHeight: 80,
			shouldUpdate: false
		});
		expect(resolveIndexBarMeasuredBarHeightState({ currentBarHeight: 80, measuredBarHeight: 96 })).toEqual({
			barHeight: 96,
			shouldUpdate: true
		});
	});

	test('resolves classes', () => {
		expect(resolveIndexBarBodyClass(false)).toBe('overflow-y-auto');
		expect(resolveIndexBarTitleClass('custom-title')).toBe('text-primary dark:text-dark text-sm custom-title');
		expect(resolveIndexBarChildClass('custom-child')).toBe('w-full py-2 text-left custom-child');
		expect(resolveIndexBarGroupClass()).toBe('snap-start px-4 pt-8');
		expect(resolveIndexBarDividerClass()).toBe('h-px bg-black/5 dark:bg-white/5');
		expect(resolveIndexBarItemWrapperClass()).toBe('relative flex flex-1 flex-col justify-center');
		expect(resolveIndexBarBarClass('rounded-md')).toContain(
			'fixed right-5 flex w-7 cursor-move touch-none select-none flex-col justify-around'
		);
		expect(resolveIndexBarItemClass({ active: true, radiusClass: 'rounded-md' })).toContain(
			'bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark rounded-md'
		);
		expect(resolveIndexBarBubbleClass('rounded-md')).toContain('absolute -left-24 top-1/2 h-14 w-14');
		expect(resolveIndexBarBubbleTransitionParams()).toEqual({ x: 38, duration: 300 });
	});

	test('resolves style values and strings', () => {
		expect(resolveIndexBarBodyStyleValue({ height: 120 })).toEqual({ height: '120px' });
		expect(resolveIndexBarBodyStyleString({ height: 120 })).toBe('height:120px;');
		expect(resolveIndexBarBarStyleValue({ top: 10, height: 100, barHeight: 40 })).toEqual({
			top: '40px',
			minHeight: '25px'
		});
		expect(resolveIndexBarBarStyleString({ top: 10, height: 100, barHeight: 40 })).toBe('top:40px;min-height:25px;');
	});

	test('resolves render-ready index bar state', () => {
		const state = resolveIndexBarDerived({
			data: [
				{ index: 'A', title: 'A', child: ['Apple'] },
				{ index: 'B', title: 'B', child: ['Banana'] }
			],
			current: 1,
			currentTouch: 0,
			radius: 'md',
			scrollAlign: false,
			titleInjClass: 'title-extra',
			textInjClass: 'child-extra',
			top: 10,
			height: 120,
			barHeight: 60
		});

		expect(state.radiusClass).toBe('rounded-md');
		expect(state.itemHeight).toBe(30);
		expect(state.barToTop).toBe(40);
		expect(state.bodyClass).toBe('overflow-y-auto');
		expect(state.bodyStyleString).toBe('height:120px;');
		expect(state.barStyle).toEqual({ top: '40px', minHeight: '30px' });
		expect(state.bubbleTransitionParams).toEqual({ x: 38, duration: 300 });
		expect(state.groups[0].groupClass).toBe(resolveIndexBarGroupClass());
		expect(state.groups[0].titleClass).toContain('title-extra');
		expect(state.groups[0].childClass).toContain('child-extra');
		expect(state.groups[0].dividerClass).toBe(resolveIndexBarDividerClass());
		expect(state.barItems[0].wrapperClass).toBe(resolveIndexBarItemWrapperClass());
		expect(state.barItems[0].bubbleVisible).toBe(true);
		expect(state.barItems[1].itemClass).toContain('bg-primary dark:bg-dark');
		expect(state.barItems[0].bubbleClass).toContain('rounded-md');
	});
});

describe('swiper derived', () => {
	test('resolves transform fragments and z-index', () => {
		expect(resolveSwiperTranslateX({ index: 0, current: 1, value: 20 })).toBe('20px');
		expect(resolveSwiperTranslateZ({ index: 1, current: 1, value: 100, percent: 0.5, isMove: true })).toBe('-50px');
		expect(resolveSwiperRotate({ index: 2, current: 1, value: 30, percent: 0.5, isMove: true })).toBe('-45deg');
		expect(resolveSwiperZIndex(1, 1, 5)).toBe(3);
		expect(
			resolveSwiperTransformString({
				index: 1,
				current: 1,
				translateX: 20,
				translateZ: 100,
				rotateX: 10,
				rotateY: 20,
				rotateZ: 30
			})
		).toBe('translateX(0px) translateZ(0px) rotateX(0deg) rotateY(0deg) rotateZ(0deg)');
	});

	test('resolves loop data and basic metrics', () => {
		expect(resolveSwiperLoopItems(['a', 'b', 'c'])).toEqual(['c', 'a', 'b', 'c', 'a', 'b']);
		expect(resolveSwiperLoopItems(['a'])).toEqual(['a', 'a', 'a']);
		expect(resolveSwiperLoopRenderItems(['a', 'b']).map((item) => item.sourceIndex)).toEqual([1, 0, 1, 0, 1]);
		expect(resolveSwiperItemContentState({ type: 'img', url: 'slide.png' })).toEqual({
			kind: 'image',
			item: { type: 'img', url: 'slide.png' },
			src: 'slide.png'
		});
		expect(resolveSwiperItemContentState({ type: 'component', component: 'Component' })).toEqual({
			kind: 'component',
			item: { type: 'component', component: 'Component' },
			component: 'Component'
		});
		expect(resolveSwiperItemContentState({ type: 'ReactNode', ReactNode: 'Node' })).toEqual({
			kind: 'reactNode',
			item: { type: 'ReactNode', ReactNode: 'Node' },
			reactNode: 'Node'
		});
		expect(resolveSwiperItemContentState({ type: 'unknown' })).toEqual({ kind: 'none', item: { type: 'unknown' } });
		expect(
			resolveSwiperItemViewStateList([
				{ type: 'img', url: 'a.png' },
				{ type: 'component', component: 'Card' }
			])
		).toEqual([
			{
				item: { type: 'component', component: 'Card' },
				sourceIndex: 1,
				contentState: { kind: 'component', item: { type: 'component', component: 'Card' }, component: 'Card' }
			},
			{
				item: { type: 'img', url: 'a.png' },
				sourceIndex: 0,
				contentState: { kind: 'image', item: { type: 'img', url: 'a.png' }, src: 'a.png' }
			},
			{
				item: { type: 'component', component: 'Card' },
				sourceIndex: 1,
				contentState: { kind: 'component', item: { type: 'component', component: 'Card' }, component: 'Card' }
			},
			{
				item: { type: 'img', url: 'a.png' },
				sourceIndex: 0,
				contentState: { kind: 'image', item: { type: 'img', url: 'a.png' }, src: 'a.png' }
			},
			{
				item: { type: 'component', component: 'Card' },
				sourceIndex: 1,
				contentState: { kind: 'component', item: { type: 'component', component: 'Card' }, component: 'Card' }
			}
		]);
		expect(resolveSwiperInitialActive({ dataLength: 3, initActive: 2 })).toBe(3);
		expect(resolveSwiperInitialActive({ dataLength: 1, initActive: 2 })).toBe(1);
		expect(resolveSwiperInitialIndicator({ dataLength: 3, initActive: 2 })).toBe(2);
		expect(resolveSwiperInitialIndicator({ dataLength: 1, initActive: 2 })).toBe(0);
		expect(resolveSwiperInitialStateAction({ dataLength: 3, initActive: 1 })).toEqual({
			active: 2,
			currentIndicate: 1,
			initialState: true,
			moveX: 0,
			once: true,
			translateXTransition: true
		});
		expect(resolveSwiperWidth({ containerWidth: 0, fallbackWidth: 320 })).toBe(320);
		expect(resolveSwiperWidth({ containerWidth: 280, fallbackWidth: 320 })).toBe(280);
		expect(resolveSwiperHeight(160, [16, 9])).toBe(90);
		expect(resolveSwiperDragPercent(20, 100)).toBe(0.2);
		expect(resolveSwiperDragPercent(20, 0)).toBe(0);
		expect(resolveSwiperPointerMoveDistance({ clientX: 80, startX: 120 })).toBe(-40);
		expect(resolveSwiperPointerMoveAction({ isMove: true, clientX: 80, startX: 120 })).toEqual({
			moveX: -40,
			shouldCapturePointer: true,
			shouldMove: true,
			shouldStopAutoplay: true
		});
		expect(resolveSwiperPointerMoveAction({ isMove: false, clientX: 80, startX: 120 })).toEqual({
			moveX: 0,
			shouldCapturePointer: false,
			shouldMove: false,
			shouldStopAutoplay: false
		});
		expect(resolveSwiperShouldAutoplay({ dataLength: 2, autoplay: true, duration: 999, interval: 1 })).toBe(true);
		expect(resolveSwiperShouldAutoplay({ dataLength: 2, autoplay: true, duration: 1000, interval: 1 })).toBe(false);
		expect(resolveSwiperAutoplayGuardAction({ dataLength: 2, autoplay: true, duration: 999, interval: 1 })).toEqual({
			shouldAutoplay: true,
			shouldWarnInvalidTiming: false
		});
		expect(resolveSwiperAutoplayGuardAction({ dataLength: 2, autoplay: false, duration: 1000, interval: 1 })).toEqual({
			shouldAutoplay: false,
			shouldWarnInvalidTiming: true
		});
		expect(resolveSwiperRadiusClass('xl')).toBe('rounded-xl');
		expect(resolveSwiperIndicatorRadiusClass('full')).toBe('rounded-full');
	});

	test('resolves pointer end direction and loop slide state', () => {
		expect(resolveSwiperPointerEndDirection({ moveX: -40, width: 100, startTime: 0, endTime: 200 })).toBe('next');
		expect(resolveSwiperPointerEndDirection({ moveX: 40, width: 100, startTime: 0, endTime: 200 })).toBe('previous');
		expect(resolveSwiperPointerEndDirection({ moveX: -20, width: 100, startTime: 0, endTime: 20, triggerSpeed: 0.5 })).toBe('next');
		expect(resolveSwiperPointerEndDirection({ moveX: -12, width: 100, startTime: 0, endTime: 200, triggerSpeed: 0.5 })).toBe('none');
		expect(resolveSwiperSlideState({ direction: 'next', active: 2, currentIndicate: 1, dataLength: 5 })).toEqual({
			direction: 'next',
			active: 3,
			currentIndicate: 0,
			loopResetActive: 1,
			loopResetTranslateXTransition: false,
			moveX: 0
		});
		expect(resolveSwiperSlideState({ direction: 'previous', active: 1, currentIndicate: 0, dataLength: 5 })).toEqual({
			direction: 'previous',
			active: 0,
			currentIndicate: 1,
			loopResetActive: 2,
			loopResetTranslateXTransition: false,
			moveX: 0
		});
		expect(resolveSwiperLoopResetTransition(true)).toBe(true);
		expect(resolveSwiperLoopResetTransition(false)).toBe(false);
		expect(resolveSwiperLoopResetTransition(undefined)).toBe(false);
		expect(resolveSwiperLongLineResetAction({ autoplay: false, duration: 250 })).toEqual({
			long: false,
			longTransition: false,
			resetDelay: 250,
			resetLong: false,
			resetLongTransition: true
		});
		expect(resolveSwiperAutoplayTickAction({ active: 2, currentIndicate: 1, dataLength: 5, autoplay: true, duration: 300 })).toMatchObject({
			active: 3,
			currentIndicate: 0,
			initialState: false,
			once: false,
			translateXTransition: false,
			longLine: {
				long: false,
				longTransition: false,
				resetDelay: 300,
				resetLong: true,
				resetLongTransition: true
			}
		});
		expect(resolveSwiperPointerDownAction({ clientX: 120, time: 1000 })).toEqual({
			isMove: true,
			startTime: 1000,
			startX: 120,
			translateXTransition: false
		});
		expect(
			resolveSwiperPointerUpAction({
				active: 2,
				currentIndicate: 1,
				dataLength: 5,
				moveX: -40,
				width: 100,
				startTime: 0,
				endTime: 200,
				autoplay: false,
				duration: 300
			})
		).toMatchObject({
			direction: 'next',
			active: 3,
			currentIndicate: 0,
			isMove: false,
			shouldEmitChange: true,
			shouldRestartAutoplay: false,
			translateXTransition: true
		});
	});

	test('resolves item and indicator classes', () => {
		expect(resolveSwiperRootClass()).toBe('cursor-move touch-none');
		expect(resolveSwiperContainerClass()).toBe('relative overflow-hidden');
		expect(resolveSwiperItemButtonClass()).toBe('h-full w-full');
		expect(resolveSwiperItemClass({ px: '2', py: '4', translateXTransition: false, active: true, activeInjClass: 'active' })).toBe(
			'absolute px-2 py-4 transition-none active'
		);
		expect(resolveSwiperImageClass({ radiusClass: 'rounded-lg', innerInjClass: 'inner' })).toBe(
			'h-full w-full object-cover rounded-lg inner'
		);
		expect(resolveSwiperContentClass({ radiusClass: 'rounded-lg', innerInjClass: 'inner' })).toBe('h-full w-full rounded-lg inner');
		expect(resolveSwiperContainerStyleValue({ width: 320, height: 180 })).toEqual({
			width: '320px',
			height: '180px',
			perspective: '320px'
		});
		expect(resolveSwiperContainerStyleString({ width: 320, height: 180 })).toBe('width:320px;height:180px;perspective:320px;');
		expect(
			resolveSwiperItemStyleValue({
				index: 2,
				current: 1,
				width: 100,
				height: 50,
				moveX: 12,
				duration: 250,
				dataLength: 4,
				translateX: 20,
				translateZ: 100,
				rotateX: 10,
				rotateY: 20,
				rotateZ: 30
			})
		).toEqual({
			width: '100px',
			height: '50px',
			left: '112px',
			transitionDuration: '250ms',
			zIndex: 2,
			transform: 'translateX(-20px) translateZ(-100px) rotateX(-10deg) rotateY(-20deg) rotateZ(-30deg)'
		});
		expect(
			resolveSwiperItemStyleString({
				index: 2,
				current: 1,
				width: 100,
				height: 50,
				moveX: 12,
				duration: 250,
				dataLength: 4,
				translateX: 20,
				translateZ: 100,
				rotateX: 10,
				rotateY: 20,
				rotateZ: 30
			})
		).toBe(
			'width:100px;height:50px;left:112px;transition-duration:250ms;z-index:2;transform:translateX(-20px) translateZ(-100px) rotateX(-10deg) rotateY(-20deg) rotateZ(-30deg);'
		);
		expect(resolveSwiperIndicatorContainerClass({ placement: 'inner', dataLength: 1 })).toContain('hidden');
		expect(
			resolveSwiperIndicatorContainerClass({
				placement: 'out',
				dataLength: 3,
				indicatePosition: 'out',
				indicateAlign: 'right',
				indicateInjClass: 'custom'
			})
		).toBe('flex w-full space-x-2 px-4 py-3 custom justify-end');
		expect(
			resolveSwiperIndicatorItemClass({
				placement: 'inner',
				style: 'pointLine',
				isActive: false,
				radiusClass: 'rounded-lg'
			})
		).toBe('w-1 h-1 bg-white rounded-lg transition-all');
		expect(resolveSwiperLongLineClass({ placement: 'out', long: true, isActive: true, radiusClass: 'rounded-md' })).toBe(
			'absolute h-1 transition-all ease-linear rounded-md w-16 bg-primary dark:bg-dark'
		);
		expect(resolveSwiperLongLineDuration({ longTransition: true, currentIndicate: 0, once: true, interval: 4, duration: 1000 })).toBe(4000);
		expect(resolveSwiperLongLineDuration({ longTransition: true, currentIndicate: 1, once: false, interval: 4, duration: 1000 })).toBe(
			3000
		);
		expect(resolveSwiperLongLineDuration({ longTransition: false, interval: 4, duration: 1000 })).toBe(1000);
		expect(resolveSwiperTransitionDurationStyleValue(300)).toEqual({ transitionDuration: '300ms' });
		expect(resolveSwiperTransitionDurationStyleString(300)).toBe('transition-duration: 300ms;');
	});

	test('resolves render-ready swiper state', () => {
		const state = resolveSwiperDerived({
			data: [
				{ type: 'img', url: 'a.png' },
				{ type: 'component', component: 'Card' }
			],
			width: 320,
			height: 180,
			active: 1,
			currentIndicate: 0,
			moveX: 32,
			duration: 300,
			translateX: 20,
			translateZ: 100,
			rotateX: 10,
			rotateY: 20,
			rotateZ: 30,
			px: '2',
			py: '4',
			radius: 'lg',
			innerInjClass: 'inner',
			indicateRadius: 'full',
			indicateStyle: 'longLine',
			indicatePosition: 'out',
			indicateAlign: 'right',
			indicateInjClass: 'indicator-extra',
			long: true,
			longTransition: true,
			once: true,
			interval: 4
		});

		expect(state.containerStyle).toEqual({ width: '320px', height: '180px', perspective: '320px' });
		expect(state.rootClass).toBe(resolveSwiperRootClass());
		expect(state.containerClass).toBe(resolveSwiperContainerClass());
		expect(state.itemButtonClass).toBe(resolveSwiperItemButtonClass());
		expect(state.imageClass).toBe('h-full w-full object-cover rounded-lg inner');
		expect(state.contentClass).toBe('h-full w-full rounded-lg inner');
		expect(state.items).toHaveLength(5);
		expect(state.items[1].active).toBe(true);
		expect(state.items[1].className).toContain('absolute px-2 py-4 transition-all');
		expect(state.items[1].style).toMatchObject({ width: '320px', height: '180px', left: '32px', transitionDuration: '300ms', zIndex: 3 });
		expect(state.items[1].contentState.kind).toBe('image');
		expect(state.indicators.inner.className).toContain('hidden');
		expect(state.indicators.out.className).toContain('indicator-extra justify-end');
		expect(state.indicators.out.items[0]).toMatchObject({
			isActive: true,
			showLongLine: true,
			style: { transitionDuration: '300ms' },
			longLineStyle: { transitionDuration: '4000ms' }
		});
		expect(state.indicators.out.items[0].longLineClass).toContain('absolute h-1 transition-all ease-linear rounded-full w-16');
	});
});

describe('calendar derived', () => {
	test('formats dates and resolves weekend and range boundaries', () => {
		expect(resolveCalendarInitialVisible(undefined)).toBe(false);
		expect(resolveCalendarInitialVisible(true)).toBe(true);
		expect(resolveCalendarUsePopup(null)).toBe(false);
		expect(resolveCalendarUsePopup({})).toBe(true);
		expect(resolveCalendarIsWeekend(true, 0)).toBe(true);
		expect(resolveCalendarIsWeekend(false, 4)).toBe(false);
		expect(resolveCalendarTodayString(new Date(2024, 0, 2))).toBe('20240102');
		expect(resolveCalendarTodayState({ now: new Date(2024, 0, 2) })).toEqual({ todayStr: '20240102' });
		expect(resolveCalendarDayDateString({ year: '2024', month: '01', dayText: '02' })).toBe('20240102');
		expect(resolveCalendarDayInfoText()).toBe('');
		expect(resolveCalendarDayInfoText(null)).toBe('');
		expect(resolveCalendarDayInfoText('休')).toBe('休');
		expect(formatCalendarDate('YYYY/MM/DD', '20240102')).toBe('2024/01/02');
		expect(formatCalendarDates('YYYY-MM-DD', ['20240102', '20240103'])).toEqual(['2024-01-02', '2024-01-03']);
		expect(resolveCalendarFormattedDates('YYYY-MM-DD', ['20240102'])).toEqual(['2024-01-02']);
		expect(sortCalendarDates(['20240103', '20240101', '20240102'])).toEqual(['20240101', '20240102', '20240103']);
		expect(resolveCalendarInitialSelectedDatesAction({ initSelectedDates: ['20240103', '20240101'] })).toEqual({
			selectedDates: ['20240101', '20240103'],
			selectedDateStr: '20240101,20240103',
			shouldSync: true
		});
		expect(resolveCalendarInitialSelectedDatesAction({ initSelectedDates: [] })).toEqual({
			selectedDates: [],
			selectedDateStr: '',
			shouldSync: false
		});
		expect(resolveCalendarSelectedDateString(['20240101', '20240102'])).toBe('20240101,20240102');
		expect(resolveCalendarDatesWithoutDisabled(['20240101', '20240102'], ['20240101'])).toEqual(['20240102']);
		expect(resolveCalendarInitMonthIndex({ monthList: ['202401', '202402'], initMonth: '202403' })).toBe(0);
		expect(resolveCalendarQuickSelectScrollIndex({ selectedDates: ['20240203'], monthList: ['202401', '202402'] })).toBe(1);
		expect(resolveCalendarMonthScrollAction({ index: 1, monthCount: 4, scrollHeight: 800 })).toEqual({
			shouldScroll: true,
			scrollTop: 200
		});
		expect(resolveCalendarMonthScrollAction({ index: -1, monthCount: 4, scrollHeight: 800 })).toEqual({
			shouldScroll: false,
			scrollTop: 0
		});
		expect(resolveCalendarMonthScrollAction({ index: 1, monthCount: 0, scrollHeight: 800 })).toEqual({ shouldScroll: false, scrollTop: 0 });
		expect(resolveCalendarWeekTexts(false, ['一', '二'], ['日', '一'])).toEqual(['一', '二']);
		expect(resolveCalendarWeekTexts(true, ['一', '二'], ['日', '一'])).toEqual(['日', '一']);
		expect(
			resolveCalendarQuickSelectLabel({
				item: -3,
				currentWeekText: '本周',
				currentMonthText: '本月',
				currentQuarterText: '本季度',
				beforeText: '前',
				afterText: '后',
				dayText: '天'
			})
		).toBe('前 3 天');
		expect(
			resolveCalendarQuickSelectLabel({
				item: 'month',
				currentWeekText: '本周',
				currentMonthText: '本月',
				currentQuarterText: '本季度',
				beforeText: '前',
				afterText: '后',
				dayText: '天'
			})
		).toBe('本月');
		expect(resolveCalendarTransitionDistance({ calendarHeight: 300, hasQuickSelect: true, mode: 'range' })).toBe(440);
		expect(resolveCalendarHeight({ viewportHeight: 800, height: 25 })).toBe(200);
		expect(resolveCalendarScrollStyleValue(320)).toEqual({ height: '320px' });
		expect(resolveCalendarScrollStyleString(320)).toBe('height:320px');
		expect(resolveCalendarMonthCardProps({ mx: '4', shadow: true }, 'card')).toEqual({
			mx: '4',
			my: '0',
			px: '0',
			py: '2',
			shadow: true,
			overflow: false
		});
		expect(resolveCalendarMonthCardProps({ mx: '4', shadow: true }, 'calendar')).toEqual({
			mx: '0',
			my: '0',
			px: '0',
			py: '2',
			shadow: true,
			overflow: false
		});
		expect(
			resolveCalendarStateOptions({
				defaults: {
					confirmText: 'Confirm',
					selectedText: 'Selected',
					dayText: 'Days',
					afterText: 'after',
					beforeText: 'before',
					currentMonthText: 'month',
					currentQuarterText: 'quarter',
					currentWeekText: 'week',
					weekSundayStartTextList: ['Sun', 'Mon'],
					weekTextList: ['Mon', 'Tue']
				},
				props: {
					startMonth: '202401',
					endMonth: '202402',
					mode: 'range',
					popup: null,
					card: { shadow: true },
					quickSelects: [7],
					weekendRed: true
				},
				cardSpacingPriority: 'card',
				isQuickSelect: true,
				quickSelectItem: 7,
				selectedDateCount: 2,
				selectedDateStr: '20240101,20240102',
				textTone: 'token',
				todayStr: '20240101',
				viewportHeight: 800
			})
		).toMatchObject({
			card: { shadow: true },
			cardSpacingPriority: 'card',
			isQuickSelect: true,
			mode: 'range',
			popup: null,
			quickSelectItem: 7,
			selectedDateCount: 2,
			selectedDateStr: '20240101,20240102',
			startMonth: '202401',
			textTone: 'token',
			todayStr: '20240101',
			viewportHeight: 800,
			weekendRed: true
		});
		expect(resolveCalendarSurfaceClass(true)).toBe('bg-gray-50 dark:bg-gray-800');
		expect(
			resolveCalendarTexts({ confirmText: 'OK', defaults: { confirmText: 'Confirm', selectedText: 'Selected', dayText: 'Days' } })
		).toEqual({
			confirmText: 'OK',
			selectedText: 'Selected',
			dayText: 'Days'
		});
		expect(resolveCalendarHeaderClass(false)).toBe('sticky left-0 top-0 z-10 w-full');
		expect(resolveCalendarScrollClass({ usePopup: true, useAnimation: false })).toBe(
			'calendar-container flex flex-col gap-4 overflow-y-auto px-4 py-2 bg-gray-50 dark:bg-gray-800 scroll-auto'
		);
		expect(resolveCalendarQuickSelectButtonClass(true)).toContain('!bg-primary !text-text-on-primary');
		expect(resolveCalendarQuickSelectListClass()).toBe('calendar-container flex flex-nowrap gap-4 overflow-x-auto px-4 pb-1 pt-2');
		expect(resolveCalendarWeekRowClass()).toBe('flex h-10 items-center justify-around gap-1 px-6 text-center leading-10');
		expect(resolveCalendarWeekTextClass({ weekendRed: true, isWeekend: true })).toBe('flex-1 font-bold text-error');
		expect(resolveCalendarMonthContainerClass()).toBe('relative');
		expect(resolveCalendarMonthTitleClass()).toBe('px-4 pt-4 text-xl text-text-primary/30 dark:text-text-dark/30');
		expect(resolveCalendarMonthTitleTextClass()).toBe('mr-2 font-bold text-text-primary dark:text-text-dark');
		expect(resolveCalendarMonthGridClass()).toBe('grid grid-cols-7 gap-y-1 p-2 text-center');
		expect(resolveCalendarDayNumberClass()).toBe('font-bold');
		expect(resolveCalendarDayInfoClass()).toBe('text-xs opacity-50');
		expect(resolveCalendarDisabledMarkClass()).toBe(
			'absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 text-text-primary/60 opacity-40 dark:text-text-dark'
		);
		expect(resolveCalendarFooterClass()).toBe('sticky bottom-0 left-0 z-10 w-full bg-bg-surface dark:bg-bg-surface-dark');
		expect(resolveCalendarMonthLabel(['Jan', 'Feb'], '02')).toBe('Feb');
		expect(resolveCalendarDayNumberText('09')).toBe(9);
		expect(resolveCalendarDayNumberText('')).toBe('');
		expect(resolveCalendarModeFlags('range')).toEqual({ isRange: true, isMultiple: false, isSingle: false });
		expect(resolveCalendarModeFlags('multiple')).toEqual({ isRange: false, isMultiple: true, isSingle: false });
		expect(resolveCalendarModeFlags('single')).toEqual({ isRange: false, isMultiple: false, isSingle: true });
		expect(resolveCalendarMultipleDates({ selectedDates: ['20240101'], dateStr: '20240102' })).toEqual(['20240101', '20240102']);
		expect(resolveCalendarMultipleDates({ selectedDates: ['20240101', '20240102'], dateStr: '20240101' })).toEqual(['20240102']);
		const quickSelectState = resolveCalendarQuickSelectState({ item: 2, includeToday: true });
		expect(quickSelectState).toMatchObject({
			isQuickSelect: true,
			quickSelectItem: 2,
			selectedDateStr: quickSelectState.selectedDates.join(',')
		});
		expect(quickSelectState.selectedDates).toHaveLength(2);
		expect(
			resolveCalendarQuickSelectState({ item: 2, includeToday: true, disabledDates: [quickSelectState.selectedDates[0]] }).selectedDates
		).toEqual([quickSelectState.selectedDates[1]]);
		expect(
			resolveCalendarSelectedSummary({
				showSelectedDay: true,
				mode: 'range',
				selectedDateStr: '',
				selectedDateCount: 0,
				selectedText: '已选',
				dayText: '天'
			})
		).toBe('(已选 0 天)');
		expect(resolveCalendarRangeBoundary({ mode: 'range', selectedDateStr: '20240101,20240102', dateStr: '20240101', isStart: true })).toBe(
			true
		);
		expect(resolveCalendarRangeBoundary({ mode: 'range', selectedDateStr: '20240101,20240102', dateStr: '20240102', isStart: false })).toBe(
			true
		);
		expect(
			resolveCalendarDayClickState({ dateStr: '', selectedDates: ['20240101'], rangeDates: ['20240101'], isQuickSelect: true })
		).toEqual({
			shouldUpdate: false,
			selectedDates: ['20240101'],
			rangeDates: ['20240101'],
			selectedDateStr: '20240101',
			isQuickSelect: true
		});
		expect(
			resolveCalendarDayClickState({
				dateStr: '20240103',
				mode: 'range',
				selectedDates: ['20240101'],
				rangeDates: ['20240101'],
				disabledDates: ['20240102'],
				usePopup: false,
				outFormat: 'YYYY-MM-DD'
			})
		).toEqual({
			shouldUpdate: true,
			selectedDates: ['20240101', '20240103'],
			rangeDates: [],
			selectedDateStr: '20240101,20240103',
			isQuickSelect: false,
			confirmDates: ['2024-01-01', '2024-01-03']
		});
		expect(
			resolveCalendarDayClickState({ dateStr: '20240102', mode: 'multiple', selectedDates: ['20240101'], usePopup: false })
		).toMatchObject({
			selectedDates: ['20240101', '20240102'],
			confirmDates: ['20240101', '20240102']
		});
		expect(
			resolveCalendarDayClickFlow({
				year: '2024',
				month: '01',
				dayText: '02',
				mode: 'single',
				usePopup: false,
				outFormat: 'YYYY-MM-DD'
			})
		).toMatchObject({
			dateStr: '20240102',
			selectedDates: ['20240102'],
			confirmDates: ['2024-01-02']
		});
		expect(
			resolveCalendarDayClickFlow({ year: '2024', month: '01', dayText: '', selectedDates: ['20240101'], isQuickSelect: true })
		).toMatchObject({
			dateStr: '',
			shouldUpdate: false,
			selectedDates: ['20240101'],
			isQuickSelect: true
		});
		expect(
			resolveCalendarQuickSelectScrollFlow({ selectedDates: ['20240203'], monthList: ['202401', '202402'], scrollHeight: 600 })
		).toEqual({
			scrollAction: { shouldScroll: true, scrollTop: 300 },
			scrollIndex: 1
		});
		expect(
			resolveCalendarQuickSelectFlow({
				item: 2,
				includeToday: true,
				monthList: quickSelectState.selectedDates.map((item) => item.slice(0, 6)),
				scrollHeight: 200
			}).scrollAction.shouldScroll
		).toBe(true);
		expect(resolveCalendarConfirmAction({ outFormat: 'YYYY-MM-DD', selectedDates: ['20240101', '20240102'] })).toEqual({
			confirmDates: ['2024-01-01', '2024-01-02'],
			selectedDates: ['2024-01-01', '2024-01-02'],
			selectedDateStr: '2024-01-01,2024-01-02',
			visible: false
		});
		expect(resolveCalendarCloseAction({ clear: true, selectedDates: ['20240101'] })).toEqual({
			selectedDates: [],
			selectedDateStr: '',
			shouldClear: true,
			visible: false
		});
		expect(resolveCalendarCloseAction({ clear: false, selectedDates: ['20240101'] })).toEqual({
			selectedDates: ['20240101'],
			selectedDateStr: '20240101',
			shouldClear: false,
			visible: false
		});
	});

	test('resolves top-level render state', () => {
		const calendarState = resolveCalendarDerived({
			startMonth: '202401',
			endMonth: '202402',
			initMonth: '202402',
			startSunday: true,
			weekendRed: true,
			mode: 'range',
			monthCard: true,
			monthMarkSize: '8xl',
			height: 50,
			viewportHeight: 800,
			infoDates: [{ text: '20240202', info: 'event' }],
			disabledDates: ['20240203'],
			radius: 'lg',
			showSelectedDay: true,
			selectedDateStr: '20240202,20240203',
			selectedDateCount: 2,
			quickSelects: ['week', -3],
			isQuickSelect: true,
			quickSelectItem: 'week',
			useAnimation: false,
			popup: { position: 'bottom' },
			card: { shadow: true },
			cardSpacingPriority: 'card',
			defaults: {
				confirmText: '确认',
				selectedText: '已选',
				dayText: '天',
				weekTextList: ['一', '二', '三', '四', '五', '六', '日'],
				weekSundayStartTextList: ['日', '一', '二', '三', '四', '五', '六'],
				currentWeekText: '本周',
				currentMonthText: '本月',
				currentQuarterText: '本季度',
				beforeText: '前',
				afterText: '后'
			}
		});

		expect(calendarState.usePopup).toBe(true);
		expect(calendarState.texts.confirmText).toBe('确认');
		expect(calendarState.monthList).toEqual(['202401', '202402']);
		expect(calendarState.initMonthIndex).toBe(1);
		expect(calendarState.allMonthData).toHaveLength(2);
		expect(calendarState.monthViewItems).toHaveLength(2);
		expect(calendarState.monthViewItems[1].dayItems.find((item) => item.day.text === '02')?.dayCell.innerClass).toContain(
			'text-white dark:text-black'
		);
		expect(calendarState.cellRadiusClass).toBe('rounded-lg');
		expect(calendarState.calendarHeight).toBe(400);
		expect(calendarState.transitionDistance).toBe(540);
		expect(calendarState.headerClass).toContain('bg-gray-50');
		expect(calendarState.quickSelectListClass).toBe('calendar-container flex flex-nowrap gap-4 overflow-x-auto px-4 pb-1 pt-2');
		expect(calendarState.weekRowClass).toBe('flex h-10 items-center justify-around gap-1 px-6 text-center leading-10');
		expect(calendarState.monthContainerClass).toBe('relative');
		expect(calendarState.monthTitleClass).toBe('px-4 pt-4 text-xl text-text-primary/30 dark:text-text-dark/30');
		expect(calendarState.monthTitleTextClass).toBe('mr-2 font-bold text-text-primary dark:text-text-dark');
		expect(calendarState.monthGridClass).toBe('grid grid-cols-7 gap-y-1 p-2 text-center');
		expect(calendarState.dayNumberClass).toBe('font-bold');
		expect(calendarState.dayInfoClass).toBe('text-xs opacity-50');
		expect(calendarState.disabledMarkClass).toBe(
			'absolute left-1/2 top-1/2 h-4/5 w-4/5 -translate-x-1/2 -translate-y-1/2 text-text-primary/60 opacity-40 dark:text-text-dark'
		);
		expect(calendarState.footerClass).toBe('sticky bottom-0 left-0 z-10 w-full bg-bg-surface dark:bg-bg-surface-dark');
		expect(calendarState.scrollClass).toContain('scroll-auto');
		expect(calendarState.scrollStyleValue).toEqual({ height: '400px' });
		expect(calendarState.scrollStyleString).toBe('height:400px');
		expect(calendarState.selectedSummary).toBe('(已选 2 天)');
		expect(calendarState.monthCardProps).toEqual({ mx: '0', my: '0', px: '0', py: '2', shadow: true, overflow: false });
		expect(calendarState.monthMarkClass).toContain('text-8xl');
		expect(calendarState.weekItems[0]).toMatchObject({ text: '日', index: 0, isWeekend: true, className: 'flex-1 font-bold text-error' });
		expect(calendarState.showQuickSelect).toBe(true);
		expect(calendarState.quickSelectItems[0]).toMatchObject({ item: 'week', active: true, label: '本周' });
		expect(calendarState.quickSelectItems[1]).toMatchObject({ item: -3, active: false, label: '前 3 天' });
	});

	test('creates month data with info and disabled markers', () => {
		const monthData = createCalendarMonthData({
			monthList: ['202402'],
			infoDates: [{ text: '20240202', info: 'event' }],
			disabledDates: ['20240203']
		});
		const day02 = monthData[0].days.find((day) => day.text === '02');
		const day03 = monthData[0].days.find((day) => day.text === '03');
		const blankDay = monthData[0].days.find((day) => day.text === '');

		expect(monthData[0].year).toBe('2024');
		expect(monthData[0].month).toBe('02');
		expect(day02?.info).toBe('event');
		expect(day02?.disabled).toBe(false);
		expect(day03?.disabled).toBe(true);
		expect(blankDay?.disabled).toBe(false);
		const monthViewItems = resolveCalendarMonthViewItems({
			monthData,
			selectedDateStr: '20240202',
			radiusClass: 'rounded-lg',
			todayStr: '20240202',
			textTone: 'token'
		});
		const day02ViewItem = monthViewItems[0].dayItems.find((item) => item.day.text === '02');
		expect(monthViewItems[0].index).toBe(0);
		expect(day02ViewItem?.dayCell.dateStr).toBe('20240202');
		expect(day02ViewItem?.dayCell.innerClass).toContain('text-text-on-primary dark:text-text-on-dark');
	});

	test('resolves day cell radius, classes and styles', () => {
		const edge = resolveCalendarRangeEdge({ mode: 'range', selectedDateStr: '20240101,20240102', dateStr: '20240101', dayEnd: false });
		expect(edge).toEqual({ isStart: true, isEnd: false, rangeStart: true, rangeEnd: false });
		expect(resolveCalendarDateSelected('202401', '20240101')).toBe(false);
		expect(resolveCalendarCellRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveCalendarRangeRadiusClass({ radius: 'lg', edge: 'left' })).toBe('!rounded-l-lg');
		expect(resolveCalendarOuterDayClass({ dayText: '01', isSelected: true, radius: 'lg', mode: 'range', rangeStart: true })).toContain(
			'bg-primary/10 dark:bg-dark/20 !rounded-l-lg'
		);
		expect(resolveCalendarOuterDayStyleValue({ mode: 'range', isSelected: true, rangeStart: true })).toEqual({
			borderTopLeftRadius: 'var(--radius-form)',
			borderBottomLeftRadius: 'var(--radius-form)',
			borderTopRightRadius: undefined,
			borderBottomRightRadius: undefined
		});
		expect(resolveCalendarOuterDayStyleString({ mode: 'single' })).toBe('border-radius:var(--radius-form);');
		expect(
			resolveCalendarInnerDayClass({
				radiusClass: 'rounded-lg',
				dayText: '01',
				mode: 'range',
				isSelected: true,
				isStart: true,
				dateStr: '20240101',
				todayStr: '20240101',
				textTone: 'token'
			})
		).toContain(
			'rounded-lg relative flex h-full w-full flex-col justify-center py-2 bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark border border-primary dark:border-dark'
		);
		const dayCell = resolveCalendarDayCellDerived({
			dayText: '01',
			dateStr: '20240101',
			selectedDateStr: '20240101,20240102',
			radiusClass: 'rounded-lg',
			mode: 'range',
			todayStr: '20240101',
			textTone: 'token'
		});
		expect(dayCell).toMatchObject({ isSelected: true, isStart: true, isEnd: false, rangeStart: true, rangeEnd: false });
		expect(dayCell.infoText).toBe('');
		expect(dayCell.outerClass).toContain('bg-primary/10 dark:bg-dark/20');
		expect(dayCell.outerStyleString).toContain('border-top-left-radius:var(--radius-form);');
		expect(dayCell.innerClass).toContain('text-text-on-primary dark:text-text-on-dark');
		const dayCellFromDay = resolveCalendarDayCellFromDay({
			day: { text: '02', info: 'event', start: false, end: true },
			year: '2024',
			month: '01',
			selectedDateStr: '20240101,20240102',
			mode: 'range',
			todayStr: '20240102'
		});
		expect(dayCellFromDay.dateStr).toBe('20240102');
		expect(dayCellFromDay.infoText).toBe('event');
		expect(dayCellFromDay.rangeEnd).toBe(true);
		expect(dayCellFromDay.innerClass).toContain('py-1');
		expect(resolveCalendarMonthMarkClass({ monthMarkSize: '8xl', monthCard: false, textTone: 'token' })).toContain(
			'text-8xl text-text-primary/5 dark:text-text-dark/5'
		);
	});
});

describe('color picker derived', () => {
	test('resolves modes, parsing, display values and classes', () => {
		expect(resolveColorPickerMeasuredClientWidth()).toBe(0);
		expect(resolveColorPickerMeasuredClientWidth({ clientWidth: 280 })).toBe(280);
		expect(resolveColorPickerEffectiveModes([])).toEqual(['oklch']);
		expect(resolveColorPickerInitialVisible(undefined)).toBe(false);
		expect(resolveColorPickerInitialVisible(true)).toBe(true);
		expect(resolveColorPickerActiveModeIndex(2, ['hex'])).toBe(0);
		expect(resolveColorPickerActiveModeIndex(1, ['hex', 'rgb'])).toBe(1);
		expect(resolveColorPickerThemeColorVariable('dark')).toBe('--color-dark');
		expect(resolveColorPickerThemeColorVariable('light')).toBe('--color-primary');
		expect(resolveColorPickerThemeColorFromCssValue('oklch(70% 0.15 250)')).toEqual({ l: 0.7, c: 0.15, h: 250 });
		expect(parseColorPickerValue({ l: 0.5, c: 0.1, h: 120 })).toEqual({ l: 0.5, c: 0.1, h: 120 });
		expect(resolveColorPickerInputColor({ value: undefined, themeColor: { l: 0.4, c: 0.2, h: 80 } })).toEqual({ l: 0.4, c: 0.2, h: 80 });
		expect(resolveColorPickerInputColor({ value: [51, 102, 153], themeColor: { l: 0.4, c: 0.2, h: 80 } }).h).toBeGreaterThan(0);

		const color = parseColorPickerValue('#336699');
		const display = resolveColorPickerDisplayValues(color, ['hex', 'rgb', 'oklch']);
		expect(display.hex).toBe('#336699');
		expect(display.colorStrings[0]).toBe('#336699');
		expect(display.colorStrings[1]).toBe('rgb(51, 102, 153)');
		expect(resolveColorPickerDisplayValues(resolveColorPickerColorFromRgb([51, 102, 153], 250), ['hex']).hex).toBe('#336699');
		expect(resolveColorPickerShouldSyncColor(color, color)).toBe(false);
		expect(resolveColorPickerShouldSyncColor(color, { ...color, h: 200 })).toBe(true);
		expect(resolveColorPickerColorStrings(color, ['hex', 'rgb'])).toEqual(['#336699', 'rgb(51, 102, 153)']);
		expect(resolveColorPickerOutputValueFromModes(color, ['hex'])).toBe('#336699');
		expect(resolveColorPickerUpdateAction({ color, modes: ['hex', 'rgb'], isDirectMode: true })).toEqual({
			changeColors: ['#336699', 'rgb(51, 102, 153)'],
			nextValue: '#336699',
			shouldEmitChange: true
		});
		expect(resolveColorPickerUpdateAction({ color, modes: ['rgb'], isDirectMode: false })).toEqual({
			changeColors: ['rgb(51, 102, 153)'],
			nextValue: [51, 102, 153],
			shouldEmitChange: false
		});
		expect(resolveColorPickerIsDirectMode(null)).toBe(true);
		expect(resolveColorPickerIsDirectMode({})).toBe(false);
		expect(resolveColorPickerPopupProps({ visible: true, size: 50, radius: 'lg' })).toEqual({
			size: 50,
			transitionDistance: 400,
			position: 'bottom',
			radius: 'lg'
		});
		expect(resolveColorPickerInputValues('hex', color, display.rgb)).toEqual(['33', '66', '99']);
		expect(resolveColorPickerInputKeyboardAction({ key: 'Enter' })).toEqual({ shouldCommit: true });
		expect(resolveColorPickerInputKeyboardAction({ key: 'Escape' })).toEqual({ shouldCommit: false });
		expect(resolveColorPickerCloseAction({ colorStrings: display.colorStrings })).toEqual({
			closeValue: display.colorStrings,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true,
			shouldEmitVisible: true
		});
		expect(resolveColorPickerCloseAction({ colorStrings: display.colorStrings, emitClose: false })).toMatchObject({
			shouldEmitClose: false
		});
		expect(resolveColorPickerDragAction({ target: 'panel', phase: 'start' })).toEqual({
			target: 'panel',
			nextDragging: true,
			shouldHandleInteraction: true
		});
		expect(resolveColorPickerDragAction({ target: 2, phase: 'end' })).toEqual({
			target: 2,
			nextDragging: false,
			shouldHandleInteraction: false
		});
		expect(
			resolveColorPickerSliderDraggingState({
				sliderIndex: 2,
				nextDragging: true,
				isDragging1: false,
				isDragging2: false,
				isDragging3: true
			})
		).toEqual({
			isDragging1: false,
			isDragging2: true,
			isDragging3: true
		});
		expect(resolveColorPickerSliderMoveAction({ sliderIndex: 2, isDragging1: true, isDragging2: false, isDragging3: true })).toEqual({
			shouldHandleInteraction: false
		});
		expect(resolveColorPickerSliderMoveAction({ sliderIndex: 3, isDragging1: false, isDragging2: false, isDragging3: true })).toEqual({
			shouldHandleInteraction: true
		});
		expect(resolveColorPickerCopySuccessAction({ text: '#336699' })).toEqual({
			copyText: '#336699',
			hideDelay: 1500,
			nextShowCopyTip: true,
			shouldEmitCopy: true
		});
		expect(resolveColorPickerCopyTipHideAction()).toEqual({ nextShowCopyTip: false });
		expect(resolveColorPickerLabels('oklch')).toEqual(['L', 'C', 'H']);
		expect(resolveColorPickerRadiusClass('md')).toBe('rounded-md');
		expect(
			resolveColorPickerStateOptions({
				activeModeIndex: 1,
				color,
				containerWidth: 320,
				props: {
					injClass: 'custom',
					modes: ['oklch', 'hex'],
					panelHeight: 180,
					popup: null,
					popupProps: { size: 60 },
					radius: 'lg',
					sliderHeight: 12
				},
				sliderWidth: 240
			})
		).toMatchObject({
			activeModeIndex: 1,
			color,
			containerWidth: 320,
			injClass: 'custom',
			modes: ['oklch', 'hex'],
			panelHeight: 180,
			popup: null,
			popupProps: { size: 60 },
			radius: 'lg',
			sliderHeight: 12,
			sliderWidth: 240
		});
	});

	test('resolves layout positions and interaction colors', () => {
		const color = { l: 0.7, c: 0.15, h: 250 };
		const rgb: [number, number, number] = [80, 100, 120];
		expect(resolveColorPickerPanelWidth(0)).toBe(280);
		expect(resolveColorPickerWheelSize(280, 160)).toBe(160);
		expect(resolveColorPickerPanelSize('rgb', 280, 160, 160)).toEqual({ width: 160, height: 160 });
		expect(resolveColorPickerPanelCanvasMetrics({ mode: 'oklch', panelWidth: 280, panelHeight: 160, wheelSize: 160, dpr: 2 })).toEqual({
			pixelHeight: 320,
			pixelWidth: 560,
			shouldDraw: true
		});
		expect(resolveColorPickerPanelCanvasMetrics({ mode: 'rgb', panelWidth: 280, panelHeight: 160, wheelSize: 160, dpr: 2 })).toEqual({
			pixelHeight: 320,
			pixelWidth: 320,
			shouldDraw: true
		});
		expect(resolveColorPickerPanelCanvasMetrics({ mode: 'oklch', panelWidth: 0, panelHeight: 160, wheelSize: 160 })).toMatchObject({
			shouldDraw: false
		});
		expect(resolveColorPickerSliderCanvasMetrics({ sliderWidth: 240, sliderHeight: 24, dpr: 2 })).toEqual({
			pixelHeight: 48,
			pixelWidth: 480,
			shouldDraw: true
		});
		expect(resolveColorPickerSliderCanvasMetrics({ sliderWidth: 0, sliderHeight: 24 })).toMatchObject({ shouldDraw: false });
		expect(resolveColorPickerPointerPoint({ clientX: 120, clientY: 80, rectLeft: 20, rectTop: 10 })).toEqual({ x: 100, y: 70 });
		expect(resolveColorPickerPanelMarkerLeft('rgb', 280, 160, 20)).toBe(80);

		const panelPosition = resolveColorPickerPanelPosition({ mode: 'oklch', color, rgb, panelWidth: 280, panelHeight: 160, wheelSize: 160 });
		expect(panelPosition.y).toBeCloseTo(48);
		expect(resolveColorPickerSliderPosition({ mode: 'rgb', sliderIndex: 2, color, rgb, sliderWidth: 255 })).toBe(100);
		const controlDerived = resolveColorPickerControlDerived({
			mode: 'rgb',
			color,
			rgb,
			panelWidth: 280,
			panelHeight: 160,
			wheelSize: 160,
			sliderWidth: 255
		});
		expect(controlDerived.labels).toEqual(['R', 'G', 'B']);
		expect(controlDerived.panelSize).toEqual({ width: 160, height: 160 });
		expect(controlDerived.panelMarkerLeft).toBe(resolveColorPickerPanelMarkerLeft('rgb', 280, 160, controlDerived.panelPosition.x));
		expect(controlDerived.slider2Position).toBe(100);
		expect(resolveColorPickerPreviewStyleValue('#336699')).toEqual({ backgroundColor: '#336699' });
		expect(resolveColorPickerPreviewStyleString('#336699')).toBe('background-color:#336699');
		expect(resolveColorPickerPanelSizeStyleValue(controlDerived.panelSize)).toEqual({ width: '160px', height: '160px' });
		expect(resolveColorPickerPanelSizeStyleString(controlDerived.panelSize)).toBe('width:160px;height:160px');
		expect(resolveColorPickerPanelMarkerStyleValue({ left: 80, top: 48, color: '#336699' })).toEqual({
			left: '80px',
			top: '48px',
			backgroundColor: '#336699'
		});
		expect(resolveColorPickerPanelMarkerStyleString({ left: 80, top: 48, color: '#336699' })).toBe(
			'left:80px;top:48px;background-color:#336699'
		);
		expect(resolveColorPickerSliderCanvasStyleValue(24)).toEqual({ height: '24px' });
		expect(resolveColorPickerSliderCanvasStyleString(24)).toBe('height:24px');
		expect(resolveColorPickerSliderHandleStyleValue(100)).toEqual({ left: '100px', border: '1px solid rgba(0,0,0,0.3)' });
		expect(resolveColorPickerSliderHandleStyleString(100)).toBe('left:100px;border:1px solid rgba(0,0,0,0.3)');
		expect(resolveColorPickerContainerMeasureClass()).toBe('w-full');
		expect(resolveColorPickerPreviewRowClass()).toBe('mb-3 flex items-center gap-3');
		expect(resolveColorPickerPreviewTextClass()).toBe('relative flex-1 text-xs');
		expect(resolveColorPickerCopyButtonClass()).toContain('mb-0.5 w-full cursor-pointer');
		expect(resolveColorPickerCopyButtonClass(true)).not.toContain('mb-0.5');
		expect(resolveColorPickerDisplayValueClass()).toBe('mb-0.5 px-1 py-0.5 font-mono');
		expect(resolveColorPickerDisplayValueClass(true)).toBe('px-1 py-0.5 font-mono');
		expect(resolveColorPickerCopyTipClass()).toContain('absolute -top-1 right-0');
		expect(resolveColorPickerInputClass()).toContain('w-14 flex-none rounded');
		expect(resolveColorPickerPanelMarkerClass()).toContain('absolute h-4 w-4');
		expect(resolveColorPickerSliderRowClass()).toBe('mb-2 flex items-center gap-2');
		expect(resolveColorPickerSliderRowClass(true)).toBe('mb-3 flex items-center gap-2');
		expect(resolveColorPickerSliderLabelClass()).toContain('w-3 flex-none');
		expect(resolveColorPickerSliderTrackClass()).toBe('relative flex-1');
		expect(resolveColorPickerSliderHandleClass()).toContain('absolute top-0 h-full');

		const panelNext = resolveColorPickerPanelNextColor({
			mode: 'oklch',
			color,
			rgb,
			panelWidth: 280,
			panelHeight: 160,
			wheelSize: 160,
			x: 140,
			y: 80
		});
		expect(panelNext.l).toBeCloseTo(0.5);
		expect(panelNext.h).toBe(250);
		const panelInteractionNext = resolveColorPickerPanelInteractionColor({
			mode: 'oklch',
			color,
			rgb,
			panelWidth: 280,
			panelHeight: 160,
			wheelSize: 160,
			clientX: 160,
			clientY: 90,
			rectLeft: 20,
			rectTop: 10
		});
		expect(panelInteractionNext).toEqual(panelNext);

		const sliderNext = resolveColorPickerSliderNextColor({ mode: 'rgb', sliderIndex: 1, color, rgb, sliderWidth: 255, x: 255 });
		expect(resolveColorPickerDisplayValues(sliderNext, ['rgb']).rgb[0]).toBe(255);
		const sliderInteractionNext = resolveColorPickerSliderInteractionColor({
			mode: 'rgb',
			sliderIndex: 1,
			color,
			rgb,
			rectWidth: 255,
			clientX: 275,
			rectLeft: 20
		});
		expect(resolveColorPickerDisplayValues(sliderInteractionNext, ['rgb']).rgb[0]).toBe(255);

		const inputNext = resolveColorPickerInputNextColor({ mode: 'oklch', inputIndex: 3, input: '-30', color, rgb });
		expect(inputNext?.h).toBe(330);
	});

	test('resolves render-ready color picker state', () => {
		const color = parseColorPickerValue('#336699');
		const state = resolveColorPickerDerived({
			activeModeIndex: 2,
			color,
			containerWidth: 320,
			injClass: 'custom-picker',
			modes: ['oklch', 'rgb'],
			panelHeight: 160,
			popup: null,
			radius: 'lg',
			sliderHeight: 20,
			sliderWidth: 255
		});

		expect(state.safeActiveModeIndex).toBe(0);
		expect(state.colorMode).toBe('oklch');
		expect(state.effectiveModes).toEqual(['oklch', 'rgb']);
		expect(state.isDirectMode).toBe(true);
		expect(state.currentHex).toBe('#336699');
		expect(state.currentRgbStr).toBe('rgb(51, 102, 153)');
		expect(state.contentClass).toContain('custom-picker');
		expect(state.containerMeasureClass).toBe(resolveColorPickerContainerMeasureClass());
		expect(state.copyButtonClass).toContain('transition-colors');
		expect(state.copyLastButtonClass).not.toContain('mb-0.5');
		expect(state.copyTipClass).toContain('text-xs');
		expect(state.displayValueClass).toContain('mb-0.5');
		expect(state.displayLastValueClass).toBe('px-1 py-0.5 font-mono');
		expect(state.inputClass).toContain('focus:border-primary');
		expect(state.radiusClass).toBe('rounded-lg');
		expect(state.previewClass).toContain('rounded-lg');
		expect(state.previewRowClass).toBe(resolveColorPickerPreviewRowClass());
		expect(state.previewTextClass).toBe(resolveColorPickerPreviewTextClass());
		expect(state.previewStyleValue).toEqual({ backgroundColor: '#336699' });
		expect(state.previewStyleString).toBe('background-color:#336699');
		expect(state.panelWidth).toBe(320);
		expect(state.wheelSize).toBe(160);
		expect(state.panelCanvasClass).toContain('rounded-lg');
		expect(state.panelMarkerClass).toBe(resolveColorPickerPanelMarkerClass());
		expect(state.panelSizeStyleValue).toEqual({ width: '320px', height: '160px' });
		expect(state.panelSizeStyleString).toBe('width:320px;height:160px');
		expect(state.sliderCanvasClass).toContain('rounded-lg');
		expect(state.sliderCanvasStyleValue).toEqual({ height: '20px' });
		expect(state.sliderCanvasStyleString).toBe('height:20px');
		expect(state.sliderHandleClass).toBe(resolveColorPickerSliderHandleClass());
		expect(state.sliderLabelClass).toBe(resolveColorPickerSliderLabelClass());
		expect(state.sliderLastRowClass).toBe(resolveColorPickerSliderRowClass(true));
		expect(state.sliderRowClass).toBe(resolveColorPickerSliderRowClass());
		expect(state.sliderTrackClass).toBe(resolveColorPickerSliderTrackClass());
		expect(state.slider1.handleStyleValue.left).toMatch(/px$/);
		expect(state.slider2.handleStyleString).toContain('border:1px solid rgba(0,0,0,0.3)');
		expect(state.tabLabels).toEqual([{ text: 'OKLCH' }, { text: 'RGB' }]);
		expect(state.popupProps).toEqual({});
		expect(state.inputValues).toHaveLength(3);
	});

	test('resolves panel and slider pixel colors without Canvas', () => {
		const color = { l: 0.7, c: 0.15, h: 250 };
		const rgb = resolveColorPickerDisplayValues(color, ['rgb']).rgb;
		expect(resolveColorPickerPanelPixel({ mode: 'oklch', color, rgb, x: 0, y: 0, width: 100, height: 100 })).toEqual([255, 255, 255, 255]);
		expect(resolveColorPickerPanelPixel({ mode: 'rgb', color, rgb, x: 200, y: 200, width: 100, height: 100, dpr: 1 })[3]).toBe(0);
		expect(resolveColorPickerSliderPixel({ mode: 'rgb', sliderIndex: 2, color, x: 50, width: 100 })).toEqual([0, 128, 0, 255]);
		expect(resolveColorPickerSliderPixel({ mode: 'oklch', sliderIndex: 2, color, x: 100, width: 100 })).toEqual([180, 180, 180, 255]);

		const panelData = resolveColorPickerPanelBitmapData({ mode: 'oklch', color, rgb, width: 2, height: 2 });
		expect(panelData).toBeInstanceOf(Uint8ClampedArray);
		expect(panelData.length).toBe(16);
		expect(Array.from(panelData.slice(0, 4))).toEqual(
			resolveColorPickerPanelPixel({ mode: 'oklch', color, rgb, x: 0, y: 0, width: 2, height: 2 })
		);

		const sliderData = resolveColorPickerSliderBitmapData({ mode: 'rgb', sliderIndex: 2, color, width: 2, height: 2 });
		expect(sliderData).toBeInstanceOf(Uint8ClampedArray);
		expect(sliderData.length).toBe(16);
		expect(Array.from(sliderData.slice(0, 4))).toEqual(
			resolveColorPickerSliderPixel({ mode: 'rgb', sliderIndex: 2, color, x: 0, width: 2 })
		);
		expect(Array.from(sliderData.slice(4, 8))).toEqual(
			resolveColorPickerSliderPixel({ mode: 'rgb', sliderIndex: 2, color, x: 1, width: 2 })
		);
	});
});

describe('picker derived', () => {
	test('resolves current items, labels and default linkage levels', () => {
		const datas = [{ data: [{ label: 'A', value: 1 }], labelKey: 'label' }];
		expect(resolvePickerInitialVisible(undefined)).toBe(false);
		expect(resolvePickerInitialVisible(true)).toBe(true);
		expect(resolvePickerUsePopup(null)).toBe(false);
		expect(resolvePickerUsePopup({})).toBe(true);
		expect(resolvePickerPopupConfig(null)).toEqual({ popupProps: {} });
		expect(resolvePickerPopupConfig({ size: 40 })).toEqual({ popupProps: { size: 40 } });
		expect(resolvePickerInlineHeight({ viewportHeight: 800, height: 25 })).toBe(200);
		expect(resolvePickerInlineHeightStyleValue({ viewportHeight: 800, height: 25 })).toEqual({ height: '200px' });
		expect(resolvePickerInlineHeightStyleString({ viewportHeight: 800, height: 25 })).toBe('height:200px');
		expect(resolvePickerContentStyleValue({ usePopup: true, viewportHeight: 800, height: 25 })).toBeUndefined();
		expect(resolvePickerContentStyleString({ usePopup: true, viewportHeight: 800, height: 25 })).toBe('');
		expect(resolvePickerContentStyleValue({ usePopup: false, viewportHeight: 800, height: 25 })).toEqual({ height: '200px' });
		expect(resolvePickerContentStyleString({ usePopup: false, viewportHeight: 800, height: 25 })).toBe('height:200px');
		expect(resolvePickerColumnStyleValue(2)).toEqual({ flex: 2 });
		expect(resolvePickerColumnStyleValue()).toEqual({ flex: 1 });
		expect(resolvePickerColumnStyleString(3)).toBe('flex:3');
		expect(resolvePickerHeaderClass()).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(resolvePickerCancelButtonClass()).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(resolvePickerConfirmButtonClass()).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(resolvePickerMultipleTagsClass()).toBe(
			'picker-selected-tags flex gap-2 overflow-x-auto bg-bg-surface px-3 py-2 dark:bg-bg-surface-dark'
		);
		expect(resolvePickerContentClass()).toBe('flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark');
		expect(resolvePickerColumnRootClass()).toBe('truncate');
		expect(resolvePickerMultipleButtonClass()).toBe('flex h-full w-12 shrink-0 cursor-pointer items-center justify-center');
		expect(resolvePickerMultipleInactiveIconClass()).toBe('text-gray-400 dark:text-gray-500');
		expect(
			resolvePickerStateOptions({
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title'
				},
				props: {
					datas,
					isLinkage: true,
					childrenKey: 'children',
					labelKeys: ['label'],
					linkageInitIndexs: [0],
					linkageShowRows: [3],
					linkageFlexs: [2],
					linkageAligns: ['center'],
					title: 'Pick',
					height: 25,
					popup: null
				},
				currentScrollingIndexs: [0],
				displayDatas: datas,
				innerMultipleSelected: [{ indexs: [0], items: [], label: 'A' }],
				lastSelectedIndexs: [0],
				multiple: true,
				multipleSelected: [],
				viewportHeight: 800
			})
		).toMatchObject({
			childrenKey: 'children',
			currentScrollingIndexs: [0],
			datas,
			displayDatas: datas,
			height: 25,
			innerMultipleSelected: [{ indexs: [0], items: [], label: 'A' }],
			isLinkage: true,
			lastSelectedIndexs: [0],
			multiple: true,
			popup: null,
			title: 'Pick',
			viewportHeight: 800
		});
		expect(
			resolvePickerTexts({
				title: 'Pick',
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title'
				}
			})
		).toEqual({ cancelText: 'Cancel', confirmText: 'Confirm', title: 'Pick' });
		expect(resolvePickerCurrentItems({ datas, currentIndexs: [0] })).toEqual([{ label: 'A', value: 1 }]);
		expect(resolvePickerCurrentLabel({ datas, currentIndexs: [0] })).toBe('A');
		expect(resolvePickerCurrentSelection({ datas, currentIndexs: [0] })).toEqual({ items: [{ label: 'A', value: 1 }], label: 'A' });
		expect(resolvePickerSelectionForEmit<{ label: string; value: number }>({ datas, currentIndexs: [0] })).toEqual({
			items: [{ label: 'A', value: 1 }],
			label: 'A'
		});
		expect(resolvePickerCancelAction()).toEqual({ nextVisible: false, shouldCancel: true, shouldClose: true });
		expect(resolvePickerCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolvePickerCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolvePickerCloseAction({ shouldClose: false })).toEqual({ nextVisible: false, shouldClose: false, shouldEmitClose: false });
		expect(resolvePickerConfirmAction<{ label: string; value: number }>({ datas, currentIndexs: [0] })).toEqual({
			indexs: [0],
			items: [{ label: 'A', value: 1 }],
			nextVisible: false,
			shouldClose: true,
			shouldConfirm: true
		});
		const linkageData = [{ label: '省', children: [{ label: '市' }] }];
		expect(resolvePickerAllLevelData({ datas: linkageData })).toEqual([linkageData, linkageData[0]?.children]);
		expect(
			resolvePickerCurrentLabel({
				datas: linkageData,
				currentIndexs: [0, 0],
				isLinkage: true,
				allLevelData: [linkageData, linkageData[0]?.children || []]
			})
		).toBe('省 / 市');
	});

	test('resolves linkage display datas, initial state and multiple selection', () => {
		const linkageData = [{ name: '省', children: [{ name: '市', children: [{ name: '区' }] }] }];
		expect(resolvePickerLinkageDatas({ datas: linkageData, labelKeys: ['name', 'name', 'name'] })).toEqual([
			{ data: [{ label: '省' }], showRow: 5, labelKey: 'label' },
			{ data: [{ label: '市' }], showRow: 5, labelKey: 'label' },
			{ data: [{ label: '区' }], showRow: 5, labelKey: 'label' }
		]);

		const state = resolvePickerInitialState({
			datas: linkageData,
			isLinkage: true,
			labelKeys: ['name', 'name'],
			linkageShowRows: [3, 5],
			linkageFlexs: [2],
			linkageAligns: ['left']
		});
		expect(state.datas[0]).toMatchObject({ showRow: 3, flex: 2, align: 'left', initIndex: 0, lastSelectedIndex: 0 });
		expect(state.scrollEndIndexs).toEqual([0, 0, 0]);
		expect(state.maxShowRows).toBe(5);
		expect(resolvePickerShowRows(state.datas)).toEqual([3, 5, 5]);
		expect(resolvePickerMaxShowRows([undefined, 3, 7, 'bad'])).toBe(7);
		expect(resolvePickerMaxShowRows([])).toBe(5);
		expect(resolvePickerDatasColumnData([{ data: ['a'] }, { data: ['b'] }], 1, ['c'])).toEqual([{ data: ['a'] }, { data: ['c'] }]);
		expect(state.transitionDistance).toBe(resolvePickerTransitionDistance(5));
		expect(
			resolvePickerMultipleSelectionState({ multipleSelected: [{ indexs: [1], items: [], label: 'A' }], innerMultipleSelected: [] })
		).toEqual({
			isControlled: true,
			selected: [{ indexs: [1], items: [], label: 'A' }]
		});
		expect(resolvePickerMultipleSelectionState({ innerMultipleSelected: [{ indexs: [2], items: [], label: 'B' }] })).toEqual({
			isControlled: false,
			selected: [{ indexs: [2], items: [], label: 'B' }]
		});
		expect(
			resolvePickerMultipleSelected({
				multiple: true,
				currentIndexs: [0, 1],
				multipleSelected: [{ indexs: [0, 1], items: [], label: 'A' }]
			})
		).toBe(true);
		expect(
			resolvePickerMultipleSelected({
				multiple: false,
				currentIndexs: [0, 1],
				multipleSelected: [{ indexs: [0, 1], items: [], label: 'A' }]
			})
		).toBe(false);
		expect(
			removePickerMultipleSelectedAt(
				[
					{ indexs: [0], items: [{ label: 'A' }], label: 'A' },
					{ indexs: [1], items: [{ label: 'B' }], label: 'B' }
				],
				0
			)
		).toEqual([{ indexs: [1], items: [{ label: 'B' }], label: 'B' }]);

		const scrollData = [
			{ name: '省 A', children: [{ name: '市 A', children: [{ name: '区 A' }] }] },
			{ name: '省 B', children: [{ name: '市 B', children: [{ name: '区 B' }] }] }
		];
		const scrollInitial = resolvePickerInitialState({ datas: scrollData, isLinkage: true, labelKeys: ['name', 'name', 'name'] });
		const scrollState = resolvePickerLinkageScrollState({
			datas: scrollData,
			displayDatas: scrollInitial.datas,
			allLevelData: resolvePickerAllLevelData({ datas: scrollData }),
			currentIndexs: [0, 0, 0],
			column: 0,
			index: 1,
			labelKeys: ['name', 'name', 'name']
		});
		expect(scrollState.currentIndexs).toEqual([1, 0, 0]);
		expect(scrollState.columnUpdates).toEqual([
			{ column: 1, data: [{ label: '市 B' }] },
			{ column: 2, data: [{ label: '区 B' }] }
		]);
		expect(scrollState.allLevelData[1]).toEqual(scrollData[1]?.children);

		const nextSelected = resolvePickerMultipleNextSelected({
			currentIndexs: [1, 0],
			items: [{ label: '市 B' }],
			label: '省 B / 市 B',
			multipleSelected: []
		});
		expect(nextSelected).toEqual([{ indexs: [1, 0], items: [{ label: '市 B' }], label: '省 B / 市 B' }]);
		expect(
			resolvePickerMultipleNextSelected({
				currentIndexs: [1, 0],
				items: [{ label: '市 B' }],
				label: '省 B / 市 B',
				multipleSelected: nextSelected
			})
		).toEqual([]);
		expect(resolvePickerMultipleRemoveAction({ multipleSelected: nextSelected, index: 0 })).toEqual({ nextSelected: [], shouldEmit: true });
		expect(
			resolvePickerMultipleToggleAction({
				datas: scrollData,
				currentIndexs: [1, 0],
				isLinkage: true,
				allLevelData: scrollState.allLevelData,
				linkageLabelKeys: ['name', 'name'],
				multipleSelected: []
			})
		).toEqual({
			nextSelected: [{ indexs: [1, 0], items: [{ label: '省 B' }, { label: '市 B' }], label: '省 B / 市 B' }],
			shouldEmit: true
		});
	});

	test('resolves render-ready picker state', () => {
		const datas = [
			{ data: [{ label: 'A' }, { label: 'B' }], flex: 2, showRow: 3, initIndex: 1 },
			{ data: [{ label: 'C' }], showRow: 5 }
		];
		const state = resolvePickerDerived({
			datas,
			defaults: {
				defaultCancel: 'Cancel',
				defaultConfirm: 'Confirm',
				defaultTitle: 'Title'
			},
			title: 'Pick',
			displayDatas: datas,
			lastSelectedIndexs: [1, 0],
			currentScrollingIndexs: [1, 0],
			multiple: true,
			multipleSelected: [{ indexs: [1, 0], items: [{ label: 'B' }, { label: 'C' }], label: 'B / C' }],
			popup: null,
			viewportHeight: 800,
			height: 25
		});

		expect(state.texts).toEqual({ cancelText: 'Cancel', confirmText: 'Confirm', title: 'Pick' });
		expect(state.usePopup).toBe(false);
		expect(state.popupConfig).toEqual({ popupProps: {} });
		expect(state.inlineHeightStyleValue).toEqual({ height: '200px' });
		expect(state.inlineHeightStyleString).toBe('height:200px');
		expect(state.contentStyleValue).toEqual({ height: '200px' });
		expect(state.contentStyleString).toBe('height:200px');
		expect(state.headerClass).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(state.cancelButtonClass).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(state.confirmButtonClass).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(state.multipleTagsClass).toBe('picker-selected-tags flex gap-2 overflow-x-auto bg-bg-surface px-3 py-2 dark:bg-bg-surface-dark');
		expect(state.contentClass).toBe('flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark');
		expect(state.multipleButtonClass).toBe('flex h-full w-12 shrink-0 cursor-pointer items-center justify-center');
		expect(state.showRows).toEqual([3, 5]);
		expect(state.maxShowRows).toBe(5);
		expect(state.transitionDistance).toBe(resolvePickerTransitionDistance(5));
		expect(state.showMultipleTags).toBe(true);
		expect(state.isCurrentSelected).toBe(true);
		expect(state.multipleSelectionState.isControlled).toBe(true);
		expect(state.columnItems[0]).toMatchObject({
			index: 0,
			hasData: true,
			lastSelectedIndex: 1,
			rootClass: 'truncate',
			styleValue: { flex: 2 },
			styleString: 'flex:2'
		});
		expect(state.columnItems[1]).toMatchObject({
			index: 1,
			hasData: true,
			lastSelectedIndex: 0,
			styleValue: { flex: 1 },
			styleString: 'flex:1'
		});
	});
});

describe('form derived', () => {
	test('resolves initial values and runtime slider props', () => {
		const sliderItem = {
			type: 'slider' as const,
			name: 'range',
			label: '范围',
			slider: { isRange: true },
			initValue: [10, 20] as [number, number]
		};
		expect(resolveFormItemInitialValue(sliderItem)).toEqual({ valueRange: [10, 20] });
		expect(resolveFormItemWithSliderRuntime(sliderItem, { valueRange: [10, 20] }).slider).toMatchObject({
			startValue: 10,
			endValue: 20,
			valueRange: [10, 20]
		});
		expect(resolveFormRuntimeItem({ type: 'switch', name: 'enabled', label: '启用' })).toMatchObject({
			showPopup: false,
			data: null,
			value: false
		});
		expect(resolveFormRuntimeItems([{ type: 'input', name: 'title', initValue: 'A' }])[0]).toMatchObject({ name: 'title', value: 'A' });
		expect(resolveFormItemRenderType()).toBe('input');
		expect(resolveFormItemRenderType('calendar')).toBe('calendar');
		expect(resolveFormItemRenderType('custom')).toBe('unknown');
		expect(resolveFormItemRenderState()).toMatchObject({ type: 'input', showInput: true, showCalendar: false });
		expect(resolveFormItemRenderState('slider')).toMatchObject({ type: 'slider', showSlider: true, showInput: false });
		expect(resolveFormItemRenderState('custom')).toMatchObject({ type: 'unknown', showInput: false, showSlider: false });
		expect(resolveFormItemsRenderState([{ type: 'input' }, { type: 'calendar' }, { type: 'custom' }]).map((item) => item.type)).toEqual([
			'input',
			'calendar',
			'unknown'
		]);
		expect(
			resolveFormRuntimeItemResetPatch(
				{ type: 'slider', showPopup: true, data: ['dirty'], value: { value: 10 }, slider: { value: 10 } },
				{ type: 'slider', showPopup: false, data: null, value: { value: 40 }, slider: { value: 40 } }
			)
		).toEqual({ value: { value: 40 }, showPopup: false, data: null, slider: { value: 40 } });
		expect(
			resolveFormResetState([
				{ type: 'input', name: 'title', initValue: 'A' },
				{ type: 'switch', name: 'enabled' }
			]).model
		).toEqual({ title: 'A', enabled: false });
		expect(resolveFormModelValue({ title: 'A' }, 'title', 'B')).toEqual({ title: 'B' });
		expect(
			resolveFormRuntimeItemsValue(
				[
					{ name: 'title', value: 'A' },
					{ name: 'enabled', value: false }
				],
				'title',
				'B'
			)
		).toEqual([
			{ name: 'title', value: 'B' },
			{ name: 'enabled', value: false }
		]);
		expect(
			resolveFormRuntimeItemsPopup(
				[
					{ name: 'title', showPopup: false },
					{ name: 'date', showPopup: false }
				],
				'date',
				true
			)
		).toEqual([
			{ name: 'title', showPopup: false },
			{ name: 'date', showPopup: true }
		]);
		expect(resolveFormItemPopupAction({ showPopup: false })).toEqual({ showPopup: false });
		expect(resolveFormItemPopupAction({ showPopup: true })).toEqual({ showPopup: true });
		expect(
			resolveFormChangeAction({
				items: [
					{ name: 'title', value: 'A' },
					{ name: 'enabled', value: false }
				],
				model: { title: 'A' },
				name: 'title',
				value: 'B'
			})
		).toEqual({
			nextItems: [
				{ name: 'title', value: 'B' },
				{ name: 'enabled', value: false }
			],
			nextModel: { title: 'B' }
		});
		expect(
			resolveFormItemsChangeAction({
				items: [
					{ name: 'title', value: 'A' },
					{ name: 'enabled', value: false }
				],
				name: 'title',
				value: 'B'
			})
		).toEqual({
			nextItems: [
				{ name: 'title', value: 'B' },
				{ name: 'enabled', value: false }
			]
		});
		expect(
			resolveFormPopupAction({
				items: [
					{ name: 'title', showPopup: false },
					{ name: 'date', showPopup: false }
				],
				name: 'date',
				showPopup: true
			})
		).toEqual({
			nextItems: [
				{ name: 'title', showPopup: false },
				{ name: 'date', showPopup: true }
			],
			showPopup: true
		});
		expect(resolveFormOpenPopupKeyboardAction({ key: 'Enter' })).toEqual({
			isActivationKey: true,
			shouldOpen: true
		});
		expect(resolveFormOpenPopupKeyboardAction({ key: ' ' })).toEqual({
			isActivationKey: true,
			shouldOpen: true
		});
		expect(resolveFormOpenPopupKeyboardAction({ key: 'Escape' })).toEqual({
			isActivationKey: false,
			shouldOpen: false
		});
	});

	test('resolves form state options and item view options', () => {
		const options = resolveFormStateOptions({
			defaultSubmit: 'Submit',
			props: {
				card: true,
				form: [{ type: 'input', name: 'title', label: '标题', initValue: 'A' }],
				legacy: { radius: 'lg', mx: '2', px: '4', shadow: 'md' },
				space: '2',
				submitText: undefined
			}
		});
		const state = resolveFormDerived(options);
		const itemOptions = resolveFormItemViewStateOptions({
			item: {
				label: '日期',
				input: { placeholder: '选择日期' },
				calendar: { mode: 'range' },
				value: { dates: ['2024-01-01', '2024-01-02'] }
			},
			pleaseSelect: '请选择'
		});

		expect(options).toMatchObject({ defaultSubmit: 'Submit', card: true, space: '2' });
		expect(state.submitText).toBe('Submit');
		expect(state.cardWrapper.kind).toBe('legacy');
		expect(resolveFormItemViewDerived(itemOptions)).toMatchObject({
			calendarDisplayValue: '2024-01-01 - 2024-01-02',
			inputProps: { placeholder: '选择日期' },
			placeholder: '选择日期'
		});
	});

	test('formats display values and placeholders', () => {
		expect(formatFormColorPickerValue([1, 2, 3])).toBe('rgb(1, 2, 3)');
		expect(formatFormColorPickerValue({ l: 0.5, c: 0.1, h: 120 })).toBe('oklch(0.5 0.1 120)');
		expect(resolveFormTimePickerInputValue({ timeStr: '09:30' })).toBe('09:30');
		expect(resolveFormTimePickerInputValue()).toBe('');
		expect(resolveFormActionSheetInputValue({ action: { content: '删除' }, index: 0 })).toBe('删除');
		expect(resolveFormActionSheetInputValue()).toBe('');
		expect(resolveFormTimePickerChangeValue('09:30', { YYYY: '2024', MM: '01', DD: '02', hh: '09', mm: '30', ss: '00' })).toEqual({
			timeStr: '09:30',
			timeObj: { YYYY: '2024', MM: '01', DD: '02', hh: '09', mm: '30', ss: '00' }
		});
		expect(resolveFormActionSheetChangeValue(1, { content: '确认' })).toEqual({ action: { content: '确认' }, index: 1 });
		expect(resolveFormCalendarChangeValue(['2024-01-01'])).toEqual({ dates: ['2024-01-01'] });
		expect(resolveFormPickerMultipleChangeValue({ items: [], indexs: [] }, [{ label: 'A', indexs: [0], items: [] }])).toEqual({
			items: [],
			indexs: [],
			multipleSelected: [{ label: 'A', indexs: [0], items: [] }]
		});
		expect(resolveFormPickerConfirmValue({ multipleSelected: [] }, [{ label: 'A' }], [0])).toEqual({
			multipleSelected: [],
			items: [{ label: 'A' }],
			indexs: [0]
		});
		expect(resolveFormColorPickerChangeValue(['oklch(0.5 0.1 120)'])).toBe('oklch(0.5 0.1 120)');
		expect(resolveFormSliderChangeValue({ isRange: true, value: 10, valueRange: [20, 60] })).toEqual({ valueRange: [20, 60] });
		expect(resolveFormSliderChangeValue({ isRange: true, value: 10 })).toEqual({ value: 10 });
		expect(resolveFormCalendarDisplayValue({ dates: ['2024-01-01', '2024-01-02'] }, 'range')).toBe('2024-01-01 - 2024-01-02');
		expect(resolveFormCalendarDates({ dates: ['2024-01-01'] })).toEqual(['2024-01-01']);
		expect(resolveFormCalendarDates()).toEqual([]);
		expect(resolveFormCalendarKey({ isMultiple: true, value: { dates: ['A', 'B'] }, fallback: 'date' })).toBe('A|B');
		expect(resolveFormCalendarKey({ isMultiple: false, value: { dates: ['A'] }, fallback: 'date' })).toBe('date');
		expect(resolveFormCalendarTagItems({ dates: ['A', 'B'] })).toEqual([
			{ label: 'A', key: 'A' },
			{ label: 'B', key: 'B' }
		]);
		expect(resolveFormPickerDisplayValue({ items: [{ label: 'A' }, { label: 'B' }] }, ' > ')).toBe('A > B');
		expect(resolveFormPickerSelected({ items: [], indexs: [], multipleSelected: [{ label: 'A', indexs: [0], items: [] }] })).toEqual([
			{ label: 'A', indexs: [0], items: [] }
		]);
		expect(resolveFormPickerSelected()).toEqual([]);
		expect(resolveFormPickerTagItems({ items: [], indexs: [], multipleSelected: [{ label: 'A', indexs: [0], items: [] }] })).toEqual([
			{ label: 'A', key: 'A-0' }
		]);
		expect(resolveFormHasTags([{ label: 'A', key: 'A' }])).toBe(true);
		expect(resolveFormHasTags([])).toBe(false);
		expect(resolveFormPlaceholder({ label: '城市', pleaseSelect: '请选择' })).toBe('请选择 城市');
		const viewDerived = resolveFormItemViewDerived({
			item: {
				label: '日期',
				input: { placeholder: '选择日期' },
				calendar: { mode: 'range' },
				value: { dates: ['2024-01-01', '2024-01-02'] }
			},
			pleaseSelect: '请选择'
		});
		expect(viewDerived.inputProps).toEqual({ placeholder: '选择日期' });
		expect(viewDerived.placeholder).toBe('选择日期');
		expect(viewDerived.calendarDisplayValue).toBe('2024-01-01 - 2024-01-02');
		expect(viewDerived.calendarIsMultiple).toBe(false);
		expect(
			resolveFormItemViewDerived({
				item: {
					label: '选项',
					picker: { datas: [{ label: 'A' }], multiple: true } as any,
					checkbox: { data: [{ label: 'B', value: 'b' }] },
					radio: { data: [{ label: 'C', value: 'c' }] },
					actionSheet: { actions: [{ content: '删除', style: 'error' }] },
					slider: { isRange: true }
				},
				pleaseSelect: '请选择'
			})
		).toMatchObject({
			actionSheetProps: { actions: [{ content: '删除', style: 'error' }] },
			checkboxProps: { data: [{ label: 'B', value: 'b' }] },
			radioProps: { data: [{ label: 'C', value: 'c' }] },
			pickerDatas: [{ label: 'A' }],
			pickerIsMultiple: true,
			sliderIsRange: true
		});
	});

	test('resolves component props and field value helpers', () => {
		const item = { input: { placeholder: '姓名' }, actionSheet: { title: '操作' }, checkbox: undefined, radio: { data: [{ label: 'A' }] } };
		expect(resolveFormComponentProps(item, 'input')).toEqual({ placeholder: '姓名' });
		expect(resolveFormActionSheetProps(item)).toEqual({ actions: [], title: '操作' });
		expect(resolveFormCheckboxProps(item)).toEqual({ data: [] });
		expect(resolveFormRadioProps(item)).toEqual({ data: [{ label: 'A' }] });
		expect(resolveFormPickerDatas({ datas: [{ label: '城市' }] })).toEqual([{ label: '城市' }]);
		expect(resolveFormPickerDatas({ datas: null })).toEqual([]);
		expect(resolveFormCalendarMultiple('multiple')).toBe(true);
		expect(resolveFormCalendarMultiple('range')).toBe(false);
		expect(resolveFormPickerMultiple(1)).toBe(true);
		expect(resolveFormPickerMultiple(false)).toBe(false);
		expect(resolveFormCalendarValueAfterRemove({ dates: ['A', 'B', 'C'] }, 1)).toEqual({ dates: ['A', 'C'] });
		expect(
			resolveFormPickerValueAfterRemove(
				{
					items: [],
					indexs: [],
					multipleSelected: [
						{ label: 'A', indexs: [0], items: [] },
						{ label: 'B', indexs: [1], items: [] }
					]
				},
				0
			)
		).toEqual({
			items: [],
			indexs: [],
			multipleSelected: [{ label: 'B', indexs: [1], items: [] }]
		});
		expect(resolveFormClearedPickerValue(true)).toEqual({ items: [], indexs: [], multipleSelected: [] });
		expect(resolveFormClearedPickerValue(false)).toEqual({ items: [], indexs: [], multipleSelected: undefined });
		expect(resolveFormFieldClearValue({ type: 'input' })).toBe('');
		expect(resolveFormFieldClearValue({ type: 'timePicker' })).toEqual({ timeStr: '', timeObj: undefined });
		expect(resolveFormFieldClearValue({ type: 'actionSheet' })).toEqual({ action: undefined, index: undefined });
		expect(resolveFormFieldClearValue({ type: 'calendar' })).toEqual({ dates: [] });
		expect(resolveFormFieldClearValue({ type: 'picker', pickerMultiple: true })).toEqual({ items: [], indexs: [], multipleSelected: [] });
		expect(resolveFormFieldClearValue({ type: 'colorPicker' })).toBeUndefined();
		expect(resolveFormFieldClearValue({ type: 'switch' })).toBe(false);
		expect(resolveFormKeyboardClose('done')).toBe(true);
		expect(resolveFormKeyboardNextValue('12', 'delete')).toBe('1');
		expect(resolveFormKeyboardNextValue('12', '3')).toBe('123');
		expect(resolveFormKeyboardNextValue('12', 'close')).toBe('12');
		expect(resolveFormKeyboardClickAction({ value: '12', key: '3' })).toEqual({
			nextValue: '123',
			shouldClose: false,
			shouldUpdateValue: true
		});
		expect(resolveFormKeyboardClickAction({ value: '12', key: 'delete' })).toEqual({
			nextValue: '1',
			shouldClose: false,
			shouldUpdateValue: true
		});
		expect(resolveFormKeyboardClickAction({ value: '12', key: 'close' })).toEqual({
			nextValue: '12',
			shouldClose: true,
			shouldUpdateValue: false
		});
		expect(resolveFormKeyboardClickAction({ value: '12', key: 'close', closeKeys: ['done'] })).toEqual({
			nextValue: '12close',
			shouldClose: false,
			shouldUpdateValue: true
		});
	});

	test('resolves wrapper spacing and legacy card classes', () => {
		expect(resolveFormGroupClass()).toBe('p-2');
		expect(resolveFormFieldHeaderClass()).toBe('mb-2 flex justify-between px-2');
		expect(resolveFormFieldHeaderClass('custom')).toBe('mb-2 flex justify-between px-2 custom');
		expect(resolveFormMultiRootClass()).toBe('px-2 py-2');
		expect(resolveFormFieldTitleClass()).toBe('relative mb-1 text-sm font-semibold');
		expect(resolveFormRequiredClass()).toBe('text-error absolute -left-2.5 text-base');
		expect(resolveFormFieldMetaClass()).toBe('flex space-x-2 text-xs');
		expect(resolveFormMultiControlClass()).toContain('rounded-(--radius-form) relative my-0.5 flex min-h-12');
		expect(resolveFormMultiTagsClass()).toBe('flex flex-1 flex-wrap items-center gap-2');
		expect(resolveFormPlaceholderClass()).toBe('font-semibold opacity-50');
		expect(resolveFormClearButtonClass()).toBe('shrink-0');
		expect(resolveFormClearIconClass()).toBe('opacity-30');
		expect(resolveFormSelectIconClass()).toBe('shrink-0 opacity-50');
		expect(resolveFormSliderWrapperClass()).toBe('mx-4');
		expect(resolveFormSpaceClass('4')).toBe('space-y-4');
		expect(resolveFormSpaceClass('unknown')).toBe('space-y-0');
		expect(resolveFormSubmitText(undefined, 'Submit')).toBe('Submit');
		expect(resolveFormSubmitText('Send', 'Submit')).toBe('Send');
		expect(resolveFormLegacyCardClass()).toBe(
			'rounded-(--radius-box) mx-4 px-2 shadow-sm dark:shadow-white/5 mb-2 bg-white py-2 dark:bg-black'
		);
		expect(resolveFormLegacyCardClass({ radius: 'lg', mx: '2', px: '6', shadow: 'md' })).toBe(
			'rounded-lg mx-2 px-6 shadow-md dark:shadow-white/10 mb-2 bg-white py-2 dark:bg-black'
		);
		expect(resolveFormCardWrapper()).toEqual({ kind: 'plain', cardProps: {}, className: '' });
		expect(resolveFormCardWrapper({ card: true, legacyClass: 'legacy-card' })).toEqual({
			kind: 'legacy',
			cardProps: {},
			className: 'legacy-card'
		});
		expect(resolveFormCardWrapper({ card: { radius: 'lg' } })).toEqual({ kind: 'card', cardProps: { radius: 'lg' }, className: '' });
		expect(resolveFormCardWrapperClass({ kind: 'legacy', cardProps: {}, className: 'legacy-card' })).toBe('legacy-card');
		expect(resolveFormCardWrapperClass({ kind: 'card', cardProps: { radius: 'lg' }, className: '' })).toBe('');
		expect(resolveFormDerived({ defaultSubmit: 'Submit' })).toMatchObject({
			clearButtonClass: 'shrink-0',
			clearIconClass: 'opacity-30',
			fieldHeaderClass: 'mb-2 flex justify-between px-2',
			fieldMetaClass: 'flex space-x-2 text-xs',
			fieldTitleClass: 'relative mb-1 text-sm font-semibold',
			groupClass: 'p-2',
			multiRootClass: 'px-2 py-2',
			multiTagsClass: 'flex flex-1 flex-wrap items-center gap-2',
			placeholderClass: 'font-semibold opacity-50',
			requiredClass: 'text-error absolute -left-2.5 text-base',
			selectIconClass: 'shrink-0 opacity-50',
			sliderWrapperClass: 'mx-4'
		});
		expect(
			resolveFormDerived({
				card: true,
				defaultSubmit: 'Submit',
				form: [{ type: 'input', name: 'title', initValue: 'A' }],
				legacy: { radius: 'lg', mx: '2', px: '6', shadow: 'md' },
				space: '4'
			})
		).toMatchObject({
			cardWrapper: { kind: 'legacy', className: 'rounded-lg mx-2 px-6 shadow-md dark:shadow-white/10 mb-2 bg-white py-2 dark:bg-black' },
			cardWrapperClass: 'rounded-lg mx-2 px-6 shadow-md dark:shadow-white/10 mb-2 bg-white py-2 dark:bg-black',
			legacyCardClass: 'rounded-lg mx-2 px-6 shadow-md dark:shadow-white/10 mb-2 bg-white py-2 dark:bg-black',
			runtimeItems: [{ name: 'title', value: 'A', showPopup: false, data: null }],
			spaceClass: 'space-y-4',
			submitText: 'Submit'
		});
	});
});

describe('feedback derived', () => {
	test('resolves queue stack offsets and styles', () => {
		expect(resolveFeedbackId({ counter: 3, timestamp: 1700000000000 })).toBe('feedback_3_1700000000000');
		expect(resolveFeedbackStackOffset({ index: 2, baseGap: 60, gap: 8 })).toBe(136);
		expect(resolveFeedbackToastStyleValue({ index: 1, position: 'top' })).toEqual({ marginTop: 68 });
		expect(resolveFeedbackToastStyleString({ index: 1, position: 'bottom' })).toBe('margin-bottom: 68px');
		expect(resolveFeedbackToastStyleString({ index: 1, position: 'center' })).toBe('');
		expect(resolveFeedbackToastItemStyleValue({ index: 1, item: { position: 'top' } })).toEqual({ marginTop: 68 });
		expect(resolveFeedbackToastItemStyleString({ index: 1, item: {} })).toBe('');
		expect(resolveFeedbackAlertStyleValue({ index: 1, position: 'top' })).toEqual({ marginTop: 78 });
		expect(resolveFeedbackAlertStyleString({ index: 1, position: 'bottom' })).toBe('margin-bottom: 78px');
		expect(resolveFeedbackAlertItemStyleValue({ index: 1, item: {} })).toEqual({ marginTop: 78 });
		expect(resolveFeedbackAlertItemStyleString({ index: 1, item: { position: 'bottom' } })).toBe('margin-bottom: 78px');
		expect(resolveFeedbackToastQueueViewItems([{ id: 'toast-a', position: 'top' }])[0]).toMatchObject({
			index: 0,
			key: 'toast-a',
			styleValue: { marginTop: 0 },
			styleString: 'margin-top: 0px',
			zIndex: 1000
		});
		expect(resolveFeedbackAlertQueueViewItems([{ id: 'alert-a', position: 'bottom' }], 1200)[0]).toMatchObject({
			index: 0,
			key: 'alert-a',
			styleValue: { marginBottom: 0 },
			styleString: 'margin-bottom: 0px',
			zIndex: 1200
		});
	});

	test('resolves feedback queue changes without owning state', () => {
		const queue = [{ id: 'a' }, { id: 'b' }];
		expect(resolveFeedbackInitialVisible()).toBe(false);
		expect(resolveFeedbackResetVisibilityState()).toEqual({
			dialogVisible: false,
			loadingVisible: false,
			modalVisible: false
		});
		expect(appendFeedbackQueueItem(queue, { id: 'c' })).toEqual([{ id: 'a' }, { id: 'b' }, { id: 'c' }]);
		expect(removeFeedbackQueueItemById(queue, 'a')).toEqual([{ id: 'b' }]);
		expect(popFeedbackQueueItem(queue)).toEqual([{ id: 'a' }]);
		expect(resolveFeedbackQueueAfterHide(queue, 'b')).toEqual([{ id: 'a' }]);
		expect(resolveFeedbackQueueAfterHide(queue)).toEqual([{ id: 'a' }]);
		expect(
			resolveFeedbackQueueShowAction<{ message?: string }, { id: string; message?: string; visible?: boolean }>({
				queue,
				id: 'c',
				options: '保存成功'
			})
		).toEqual({
			item: { id: 'c', message: '保存成功', visible: true },
			nextQueue: [{ id: 'a' }, { id: 'b' }, { id: 'c', message: '保存成功', visible: true }]
		});
		expect(resolveFeedbackQueueHideAction({ queue, id: 'a' })).toEqual({
			nextQueue: [{ id: 'b' }],
			shouldUpdate: true
		});
		expect(resolveFeedbackQueueHideAction({ queue: [], id: undefined })).toEqual({
			nextQueue: [],
			shouldUpdate: false
		});
	});

	test('resolves feedback shortcut options without mutating service state', () => {
		const dialogDefaults = { title: '提示', primaryText: '确认', secondaryText: '取消' };
		const modalDefaults = { title: '消息', btnText: '知道了' };

		expect(resolveFeedbackMessageOptions<{ message: string }>('保存成功')).toEqual({ message: '保存成功' });
		expect(resolveFeedbackMessageOptions({ message: '保存成功', duration: 1000 })).toEqual({ message: '保存成功', duration: 1000 });
		expect(resolveFeedbackTypedShortcutOptions({ message: '保存成功', type: 'success', options: { duration: 1000 } })).toEqual({
			message: '保存成功',
			type: 'success',
			duration: 1000
		});
		expect(resolveFeedbackTypedShortcutOptions({ message: '加载中', type: 'loading', duration: 0, options: { duration: 300 } })).toEqual({
			message: '加载中',
			type: 'loading',
			duration: 300
		});
		expect(resolveFeedbackDialogConfirmOptions({ content: '内容', defaults: dialogDefaults })).toEqual({
			title: '提示',
			content: '内容',
			primaryText: '确认',
			secondaryText: '取消'
		});
		expect(
			resolveFeedbackDialogConfirmOptions({ content: '内容', title: '', defaults: dialogDefaults, emptyTitleFallback: true }).title
		).toBe('提示');
		expect(resolveFeedbackDialogConfirmOptions({ content: '内容', title: '', defaults: dialogDefaults }).title).toBe('');
		expect(resolveFeedbackModalInfoOptions({ content: '内容', defaults: modalDefaults })).toEqual({
			title: '消息',
			content: '内容',
			btnText: '知道了'
		});
		expect(resolveFeedbackDialogResultAction('primary')).toEqual({
			nextVisible: false,
			result: 'primary',
			shouldResolve: true
		});
		expect(resolveFeedbackModalResultAction('confirm')).toEqual({
			nextVisible: false,
			result: 'confirm',
			shouldResolve: true
		});
		expect(resolveFeedbackLoadingState<{ inverse?: boolean }>({ inverse: true, message: '加载中' })).toEqual({
			props: { inverse: true },
			message: '加载中'
		});
		expect(resolveFeedbackLoadingShowAction<{ inverse?: boolean }>({ inverse: true, message: '加载中' })).toEqual({
			props: { inverse: true },
			message: '加载中',
			nextVisible: true
		});
		expect(resolveFeedbackLoadingHideAction<{ inverse?: boolean }>()).toEqual({
			props: {},
			message: '',
			nextVisible: false
		});
		expect(resolveFeedbackLoadingState<{ inverse?: boolean }>('加载中')).toEqual({ props: {}, message: '加载中' });
		expect(resolveFeedbackLoadingState<{ inverse?: boolean }>()).toEqual({ props: {}, message: '' });
		expect(resolveFeedbackLoadingRenderProps({ type: 'ring', height: '20' })).toEqual({ type: 'ring', height: '20', width: '16' });
		expect(resolveFeedbackLoadingRenderProps({ width: '24' }, '12')).toEqual({ width: '24', height: '12' });
		expect(resolveFeedbackLoadingContainerClass()).toBe('flex h-full flex-col items-center justify-center');
		expect(resolveFeedbackLoadingMessageClass()).toBe('mt-3 text-sm text-white dark:text-black');
	});

	test('splits callback props owned by the component layer', () => {
		const onPrimary = () => 'primary';
		const onSecondary = () => 'secondary';
		const onClose = () => 'close';

		expect(splitFeedbackDialogCallbacks({ title: '标题', onPrimary, onSecondary, onClose })).toEqual({
			dialogProps: { title: '标题' },
			dialogOnPrimary: onPrimary,
			dialogOnSecondary: onSecondary,
			dialogOnClose: onClose
		});
		expect(splitFeedbackDialogCallbacks(null)).toEqual({
			dialogProps: {},
			dialogOnPrimary: undefined,
			dialogOnSecondary: undefined,
			dialogOnClose: undefined
		});
		expect(splitFeedbackModalCallbacks({ title: '标题', onClose })).toEqual({
			modalProps: { title: '标题' },
			modalOnClose: onClose
		});
		expect(splitFeedbackModalCallbacks(null)).toEqual({
			modalProps: {},
			modalOnClose: undefined
		});
	});
});

describe('notice bar derived', () => {
	test('resolves class names and icon state', () => {
		expect(resolveNoticeBarMeasuredRect()).toEqual({ height: 0, width: 0 });
		expect(resolveNoticeBarMeasuredRect({ width: 120 })).toEqual({ height: 0, width: 120 });
		expect(resolveNoticeBarMeasuredRect({ height: 24, width: 120 })).toEqual({ height: 24, width: 120 });
		expect(resolveNoticeBarMeasuredRectVisible({ height: 0, width: 0 })).toBe(false);
		expect(resolveNoticeBarMeasuredRectVisible({ height: 24, width: 0 })).toBe(true);
		expect(resolveNoticeBarDurationClass(700)).toBe(' duration-700');
		expect(resolveNoticeBarDurationClass(250)).toBe(' duration-500');
		expect(resolveNoticeBarRadiusClass()).toBe('rounded-(--radius-box)');
		expect(resolveNoticeBarRightButtonClass('close')).toBe('pl-2 pr-4');
		expect(resolveNoticeBarRightAction('close')).toEqual({ shouldClose: true, closeDelayMs: 200 });
		expect(resolveNoticeBarRightAction('arrow')).toEqual({ shouldClose: false, closeDelayMs: 200 });
		expect(resolveNoticeBarCloseRequestAction('close')).toEqual({
			isShow: false,
			isShowClose: true,
			shouldScheduleClose: true,
			closeDelayMs: 200
		});
		expect(resolveNoticeBarCloseRequestAction('arrow')).toEqual({
			isShow: true,
			isShowClose: true,
			shouldScheduleClose: false,
			closeDelayMs: 200
		});
		expect(resolveNoticeBarCloseDelayState()).toEqual({ isShow: false, isShowClose: false });
		expect(resolveNoticeBarRightIconState({ hasCustomChild: true, rightIcon: 'close' })).toEqual({ kind: 'custom' });
		expect(resolveNoticeBarRightIconState({ rightIcon: undefined })).toEqual({ kind: 'none' });
		expect(resolveNoticeBarRightIconState({ rightIcon: 'close' })).toEqual({ kind: 'close' });
		expect(resolveNoticeBarRightIconState({ rightIcon: 'arrow' })).toEqual({ kind: 'arrow' });
		expect(resolveNoticeBarRightIconState({ rightIcon: 'other' })).toEqual({ kind: 'none' });
		expect(resolveNoticeBarLeftIconState({ hasCustomChild: true, leftIcon: 'volume' })).toEqual({ kind: 'child' });
		expect(resolveNoticeBarLeftIconState({ leftIcon: 'volume' })).toEqual({ kind: 'volume' });
		expect(resolveNoticeBarLeftIconState({ leftIcon: { name: 'ri-volume-up-line' } })).toEqual({
			iconProps: { name: 'ri-volume-up-line' },
			kind: 'icon'
		});
		expect(resolveNoticeBarLeftIconState({ leftIcon: null })).toEqual({ kind: 'none' });
		expect(resolveNoticeBarTextListValidation('A')).toEqual({ isInvalidType: true, isEmpty: false, shouldAnimate: false });
		expect(resolveNoticeBarTextListValidation([])).toEqual({ isInvalidType: false, isEmpty: true, shouldAnimate: false });
		expect(resolveNoticeBarTextListValidation(['A'])).toEqual({ isInvalidType: false, isEmpty: false, shouldAnimate: true });
		expect(resolveNoticeBarRootClass({ rightIcon: '', isShow: false, injClass: 'custom', radius: 'lg' })).toContain(
			'pr-2 scale-0 custom rounded-lg'
		);
		expect(resolveNoticeBarVerticalViewportClass()).toBe('grow h-5');
		expect(resolveNoticeBarVerticalInnerClass()).toBe('relative overflow-hidden');
		expect(resolveNoticeBarHorizontalViewportClass()).toBe('relative grow overflow-hidden h-5');
		expect(resolveNoticeBarHorizontalTrackClass()).toBe('absolute whitespace-nowrap');
		expect(resolveNoticeBarHorizontalItemClass()).toBe('inline-block');
		expect(resolveNoticeBarIconClass()).toBe('mx-auto block');
		expect(resolveNoticeBarArrowIconClass()).toBe('');
		expect(resolveNoticeBarVerticalItemClass({ isTransition: true, duration: 700 })).toBe('absolute truncate transition-all duration-700');
		expect(resolveNoticeBarVerticalItemClass({ isTransition: false, duration: 250 })).toBe(
			'absolute truncate transition-none duration-500'
		);
	});

	test('resolves text lists and scroll values', () => {
		expect(resolveNoticeBarVerticalTextList(['A', 'B'])).toEqual(['A', 'B', 'A']);
		expect(resolveNoticeBarVerticalTextList()).toEqual([]);
		expect(resolveNoticeBarLoopTextList(['A', 'B'])).toEqual(['A', 'B', 'A', 'B']);
		expect(resolveNoticeBarLoopTextList(['A'], ['A'])).toEqual(['A']);
		expect(shouldUseNoticeBarStaticTextList({ boxWidth: 180, outBoxWidth: 120, space: 20 })).toBe(true);
		expect(resolveNoticeBarAnimationSetupAction({ shouldAnimate: false, speed: 30, textList: [] })).toMatchObject({
			left: 30,
			newTextListState: null,
			shouldRun: false,
			shouldStartHorizontal: false,
			shouldStartVertical: false,
			shouldUseStaticText: false
		});
		expect(
			resolveNoticeBarAnimationSetupAction({ boxWidth: 180, outBoxWidth: 120, shouldAnimate: true, space: 20, speed: 30, textList: ['A'] })
		).toMatchObject({
			left: 0,
			newTextListState: ['A'],
			shouldRun: false,
			shouldUseStaticText: true
		});
		expect(
			resolveNoticeBarAnimationSetupAction({
				boxWidth: 400,
				outBoxHeight: 20,
				outBoxWidth: 120,
				shouldAnimate: true,
				space: 20,
				speed: 30,
				textList: ['A', 'B']
			})
		).toMatchObject({
			left: 30,
			outBoxHeight: 20,
			outBoxWidth: 120,
			shouldRun: true,
			shouldStartHorizontal: true,
			shouldStartVertical: false
		});
		expect(resolveNoticeBarAnimationSetupAction({ shouldAnimate: true, textList: ['A', 'B'], vertical: true })).toMatchObject({
			currentIndex: 0,
			isTransition: true,
			shouldRun: true,
			shouldStartHorizontal: false,
			shouldStartVertical: true
		});
		expect(resolveNoticeBarNextLeft({ left: 30, speed: 30, frameMs: 500, boxWidth: 200 })).toBe(15);
		expect(resolveNoticeBarNextLeft({ left: -95, speed: 30, frameMs: 500, boxWidth: 200 })).toBe(0);
		expect(resolveNoticeBarHorizontalStepAction({ left: 30, speed: 30, time: 1_500, startTime: 1_000, boxWidth: 200 })).toEqual({
			frameMs: 500,
			nextStartTime: 1_500,
			nextLeft: 15
		});
		expect(
			resolveNoticeBarHorizontalStepAction({ left: 30, speed: 30, time: 1_500, startTime: 0, boxWidth: 200, firstFrameZero: true })
		).toEqual({
			frameMs: 0,
			nextStartTime: 1_500,
			nextLeft: 30
		});
		expect(resolveNoticeBarNextVerticalIndex({ currentIndex: 1, textLength: 3 })).toEqual({ nextIndex: 2, shouldReset: true });
		expect(resolveNoticeBarVerticalStepAction({ currentIndex: 1, textLength: 3 })).toEqual({
			nextIndex: 2,
			nextTransition: true,
			shouldScheduleReset: true,
			resetIndex: 0,
			resetTransition: false
		});
		expect(resolveNoticeBarVerticalItemStyle({ currentIndex: 2, itemIndex: 0, outBoxHeight: 20, outBoxWidth: 100 })).toEqual({
			top: -40,
			width: 100
		});
		expect(resolveNoticeBarHeightStyleValue(24)).toEqual({ height: '24px' });
		expect(resolveNoticeBarHeightStyleString(24)).toBe('height:24px;');
		expect(resolveNoticeBarVerticalItemStyleValue({ currentIndex: 2, itemIndex: 0, outBoxHeight: 20, outBoxWidth: 100 })).toEqual({
			top: '-40px',
			width: '100px'
		});
		expect(resolveNoticeBarVerticalItemStyleString({ currentIndex: 2, itemIndex: 0, outBoxHeight: 20, outBoxWidth: 100 })).toBe(
			'top:-40px;width:100px'
		);
		expect(resolveNoticeBarHorizontalTrackStyleValue(30)).toEqual({ left: '30px' });
		expect(resolveNoticeBarHorizontalTrackStyleString(30)).toBe('left:30px');
		expect(resolveNoticeBarHorizontalItemStyleValue(100)).toEqual({ marginRight: '100px' });
		expect(resolveNoticeBarHorizontalItemStyleString(100)).toBe('margin-right:100px');
	});

	test('resolves render-ready notice bar state', () => {
		const options = resolveNoticeBarStateOptions({
			props: {
				textList: ['A', 'B'],
				duration: 700,
				space: 24,
				rightIcon: 'arrow',
				leftIcon: { name: 'ri-volume-up-line' },
				radius: 'lg',
				injClass: 'notice-extra'
			},
			newTextListState: ['A'],
			currentIndex: 1,
			isTransition: false,
			outBoxHeight: 20,
			outBoxWidth: 160,
			left: 12,
			hasCustomChild: false,
			hasLeftChild: false,
			isShow: true
		});
		expect(options).toMatchObject({ currentIndex: 1, duration: 700, left: 12, hasCustomChild: false, hasLeftChild: false });
		const state = resolveNoticeBarDerived(options);

		expect(state.rootClass).toContain('notice-extra rounded-lg');
		expect(state.leftIconState).toEqual({ iconProps: { name: 'ri-volume-up-line' }, kind: 'icon' });
		expect(state.rightIconState).toEqual({ kind: 'arrow' });
		expect(state.textListValidation).toEqual({ isInvalidType: false, isEmpty: false, shouldAnimate: true });
		expect(state.textListVertical).toEqual(['A', 'B', 'A']);
		expect(state.newTextList).toEqual(['A']);
		expect(state.heightStyleString).toBe('height:20px;');
		expect(state.verticalViewportClass).toBe('grow h-5');
		expect(state.verticalInnerClass).toBe('relative overflow-hidden');
		expect(state.horizontalViewportClass).toBe('relative grow overflow-hidden h-5');
		expect(state.horizontalTrackClass).toBe('absolute whitespace-nowrap');
		expect(state.horizontalItemClass).toBe('inline-block');
		expect(state.iconClass).toBe('mx-auto block');
		expect(state.arrowIconClass).toBe('');
		expect(state.horizontalTrackStyle).toEqual({ left: '12px' });
		expect(state.verticalItems[0]).toMatchObject({
			text: 'A',
			className: 'absolute truncate transition-none duration-700',
			style: { top: '-20px', width: '160px' },
			styleString: 'top:-20px;width:160px'
		});
		expect(state.horizontalItems[0]).toEqual({
			index: 0,
			text: 'A',
			className: 'inline-block',
			style: { marginRight: '24px' },
			styleString: 'margin-right:24px'
		});
	});
});

describe('nav bar derived', () => {
	test('resolves icon size, align and container classes', () => {
		expect(resolveNavBarIconSize(true)).toBe(30);
		expect(resolveNavBarIconSize(false)).toBe(24);
		expect(resolveNavBarTitle(undefined, { title: 'Nav' })).toBe('Nav');
		expect(resolveNavBarTitle('Custom', { title: 'Nav' })).toBe('Custom');
		expect(resolveNavBarTitleAlignClass('right')).toBe('text-right');
		expect(resolveNavBarTitleWrapClass(null)).toBe('flex-1 truncate pl-2');
		expect(resolveNavBarContainerClass({ line: true, love: true, injClass: 'custom-nav' })).toContain('border-b text-xl custom-nav');
		expect(resolveNavBarLeftButtonClass()).toBe('min-w-12 text-center lining-nums active:opacity-80');
		expect(resolveNavBarBackSvgClass()).toBe('mx-auto block');
		expect(resolveNavBarSpacerClass()).toBe('h-full w-4');
		expect(resolveNavBarRightWrapClass()).toBe('flex');
		expect(resolveNavBarRightButtonClass()).toBe('w-12 text-center active:opacity-80');
		expect(resolveNavBarLeftState({ hasCustomChild: true, left: 'back' })).toEqual({ kind: 'child' });
		expect(resolveNavBarLeftState({ left: 'back' })).toEqual({ ariaLabel: 'back', kind: 'back' });
		expect(resolveNavBarLeftState({ left: null })).toEqual({ kind: 'spacer' });
		expect(resolveNavBarLeftState({ left: { name: 'ri-home-line' } })).toEqual({
			iconProps: { name: 'ri-home-line' },
			kind: 'icon'
		});
		const navBarOptions = resolveNavBarStateOptions({
			props: {
				title: undefined,
				titleAlign: 'right',
				left: { name: 'ri-home-line' },
				line: true,
				love: true,
				injClass: 'custom-nav'
			},
			defaults: { title: 'Nav' },
			hasCustomChild: false
		});
		expect(navBarOptions).toMatchObject({
			titleAlign: 'right',
			left: { name: 'ri-home-line' },
			line: true,
			love: true,
			hasCustomChild: false
		});
		const navBarState = resolveNavBarDerived(navBarOptions);
		expect(navBarState.iconSize).toBe(30);
		expect(navBarState.leftButtonClass).toBe('min-w-12 text-center lining-nums active:opacity-80');
		expect(navBarState.backSvgClass).toBe('mx-auto block');
		expect(navBarState.spacerClass).toBe('h-full w-4');
		expect(navBarState.rightWrapClass).toBe('flex');
		expect(navBarState.rightButtonClass).toBe('w-12 text-center active:opacity-80');
		expect(navBarState.containerClass).toContain('border-b text-xl custom-nav');
		expect(navBarState.leftState).toEqual({ iconProps: { name: 'ri-home-line' }, kind: 'icon' });
		expect(navBarState.titleText).toBe('Nav');
		expect(navBarState.titleWrapClass).toBe('flex-1 truncate');
		expect(navBarState.titleAlignClass).toBe('text-right');
	});
});

describe('dialog derived', () => {
	test('resolves title, panel and button row classes', () => {
		expect(resolveDialogInitialVisible(undefined)).toBe(false);
		expect(resolveDialogInitialVisible(true)).toBe(true);
		expect(
			resolveDialogTexts({
				title: 'Custom',
				defaults: {
					title: 'Title',
					content: 'Content',
					primaryText: 'OK',
					secondaryText: 'Cancel'
				}
			})
		).toEqual({
			title: 'Custom',
			content: 'Content',
			primaryText: 'OK',
			secondaryText: 'Cancel'
		});
		expect(resolveDialogPopupDefaults()).toEqual({
			size: 0,
			maskClosable: false,
			duration: 300,
			outDuration: 150,
			position: 'center',
			radiusPosition: 'all',
			radius: 'lg',
			px: '4'
		});
		expect(resolveDialogPopupProps({ popup: { maskClosable: true, custom: 'value' } })).toEqual({
			size: 0,
			maskClosable: true,
			duration: 300,
			outDuration: 150,
			position: 'center',
			radiusPosition: 'all',
			radius: 'lg',
			px: '4',
			custom: 'value'
		});
		expect(resolveDialogSecondaryShouldClose(false)).toBe(false);
		expect(resolveDialogCloseAction()).toEqual({ nextVisible: false, shouldClose: true });
		expect(resolveDialogSecondaryAction({ secondaryClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldSecondary: true
		});
		expect(resolveDialogSecondaryAction({ secondaryClose: true })).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldSecondary: true
		});
		expect(resolveDialogSecondaryFlow({ secondaryClose: false })).toEqual({
			closeAction: null,
			nextVisible: false,
			shouldClose: false,
			shouldSecondary: true
		});
		expect(resolveDialogSecondaryFlow({ secondaryClose: true })).toEqual({
			closeAction: { nextVisible: false, shouldClose: true },
			nextVisible: false,
			shouldClose: true,
			shouldSecondary: true
		});
		expect(resolveDialogPrimaryAction()).toEqual({ shouldClose: false, shouldPrimary: true });
		expect(resolveDialogTitleAlignClass('left')).toBe('text-left');
		expect(resolveDialogTitleAlignSpaceClass('right')).toBe(' text-right');
		expect(resolveDialogTitleClass('right')).toBe('font-bold text-right');
		expect(resolveDialogButtonGapClass('4')).toBe(' gap-4');
		expect(resolveDialogPanelClass('button')).toBe('px-4 pt-4 space-y-4 text-center pb-2');
		expect(resolveDialogButtonRowClass({ btnGap: '8', btnReverse: true, btnStyle: 'textLine' })).toBe(
			'flex w-full  gap-8 flex-row-reverse border-t border-black/10 dark:border-white/10'
		);
		expect(resolveDialogButtonSideClass({ btnStyle: 'textLine', btnReverse: false, side: 'secondary' })).toBe(
			'border-r border-black/10 dark:border-white/10'
		);
		expect(resolveDialogButtonSideClass({ btnStyle: 'button', btnReverse: false, side: 'secondary' })).toBe('');
		expect(resolveDialogButtonFlexStyleValue(2)).toEqual({ flex: 2 });
		expect(resolveDialogButtonFlexStyleString(2)).toBe('flex:2');
		expect(resolveDialogButtonFill({ btnStyle: 'button', type: 'primary' })).toBe('base');
		expect(resolveDialogButtonFill({ btnStyle: 'textLine', type: 'secondary' })).toBe('text');
		expect(resolveDialogButtonHeightIn('text')).toBe('2');
		expect(resolveDialogButtonInjClass('textLine')).toBe('font-bold');
		expect(resolveDialogButtonDerived({ btnStyle: 'button', type: 'secondary' })).toEqual({
			fill: 'colorLight',
			heightIn: '3',
			injClass: ''
		});
		expect(resolveDialogContentState({ content: 'Content', showIcon: true })).toEqual({
			showContentText: true,
			showCustomContent: false,
			showIcon: true,
			showPrimaryCustomContent: false
		});
		expect(resolveDialogContentState({ content: 'Content', hasCustomContent: true, hasPrimaryCustomContent: true })).toEqual({
			showContentText: false,
			showCustomContent: true,
			showIcon: false,
			showPrimaryCustomContent: true
		});
		const dialogOptions = resolveDialogStateOptions({
			defaults: {
				title: 'Title',
				content: 'Default content',
				primaryText: 'Confirm',
				secondaryText: 'Close'
			},
			hasCustomContent: false,
			hasPrimaryCustomContent: true,
			props: {
				btnGap: '4',
				btnRatio: [2, 1],
				btnReverse: true,
				btnStyle: 'textLine',
				content: 'Content',
				popup: { maskClosable: true },
				primaryText: 'OK',
				secondaryText: 'Cancel',
				showIcon: true,
				title: 'Custom'
			}
		});
		const dialogState = resolveDialogDerived(dialogOptions);

		expect(dialogOptions).toMatchObject({ btnGap: '4', btnReverse: true, btnStyle: 'textLine', title: 'Custom' });
		expect(dialogState.texts).toEqual({ title: 'Custom', content: 'Content', primaryText: 'OK', secondaryText: 'Cancel' });
		expect(dialogState.popupProps.maskClosable).toBe(true);
		expect(dialogState.panelClass).toBe('px-4 pt-4 space-y-4 text-center');
		expect(dialogState.titleClass).toBe('font-bold text-center');
		expect(dialogState.buttonRowClass).toContain('gap-4 flex-row-reverse');
		expect(dialogState.primarySideStyleValue).toEqual({ flex: 2 });
		expect(dialogState.secondarySideStyleString).toBe('flex:1');
		expect(dialogState.primaryButtonState).toEqual({ fill: 'textState', heightIn: '2', injClass: 'font-bold' });
		expect(dialogState.contentState.showIcon).toBe(true);
		expect(dialogState.contentState.showPrimaryCustomContent).toBe(true);
	});
});

describe('modal derived', () => {
	test('resolves popup defaults and classes', () => {
		expect(resolveModalInitialVisible(undefined)).toBe(false);
		expect(resolveModalInitialVisible(true)).toBe(true);
		expect(
			resolveModalTexts({
				content: 'Custom content',
				defaults: {
					title: 'Title',
					content: 'Content',
					btnText: 'OK'
				}
			})
		).toEqual({
			title: 'Title',
			content: 'Custom content',
			btnText: 'OK'
		});
		expect(resolveModalPopupDefaults({ showBtn: false })).toEqual({
			size: 0,
			duration: 300,
			outDuration: 150,
			maskClosable: true,
			position: 'center',
			radiusPosition: 'all',
			radius: 'lg',
			px: '8'
		});
		expect(resolveModalPopupProps({ showBtn: false, popup: { maskClosable: false, custom: 'value' } })).toEqual({
			size: 0,
			duration: 300,
			outDuration: 150,
			maskClosable: false,
			position: 'center',
			radiusPosition: 'all',
			radius: 'lg',
			px: '8',
			custom: 'value'
		});
		expect(resolveModalCloseAction()).toEqual({ nextVisible: false, shouldClose: true });
		expect(resolveModalConfirmAction()).toEqual({ nextVisible: false, shouldClose: true, shouldConfirm: true });
		expect(resolveModalContentClass({ showBtn: true })).toBe('px-4 pt-4 space-y-4 text-center pb-2');
		expect(resolveModalTitleClass({ titleAlign: 'right' })).toBe('font-bold text-right');
		expect(resolveModalContentState({ content: 'Content', showBtn: true, showIcon: true })).toEqual({
			showButton: true,
			showContentText: true,
			showCustomContent: false,
			showIcon: true
		});
		expect(resolveModalContentState({ content: 'Content', hasCustomContent: true, showBtn: false })).toEqual({
			showButton: false,
			showContentText: false,
			showCustomContent: true,
			showIcon: false
		});
		const modalOptions = resolveModalStateOptions({
			props: {
				title: 'Custom',
				content: 'Content',
				btnText: 'Done',
				titleAlign: 'right',
				showBtn: false,
				popup: { maskClosable: false },
				showIcon: true
			},
			defaults: {
				title: 'Title',
				content: 'Default content',
				btnText: 'OK'
			},
			hasCustomContent: true
		});
		expect(modalOptions).toMatchObject({
			title: 'Custom',
			content: 'Content',
			titleAlign: 'right',
			showBtn: false,
			hasCustomContent: true
		});
		const modalState = resolveModalDerived(modalOptions);
		expect(modalState.texts).toEqual({ title: 'Custom', content: 'Content', btnText: 'Done' });
		expect(modalState.popupProps.maskClosable).toBe(false);
		expect(modalState.contentClass).toBe('px-4 pt-4 space-y-4 text-center pb-4');
		expect(modalState.titleClass).toBe('font-bold text-right');
		expect(modalState.contentState).toEqual({
			showButton: false,
			showContentText: false,
			showCustomContent: true,
			showIcon: true
		});
	});
});

describe('mask derived', () => {
	test('resolves mask classes, transition params and z-index styles', () => {
		expect(resolveMaskRootClass({ opacity: '0.8', inverse: true, clickable: true, backdropBlur: 'md' })).toBe(
			'fixed h-screen w-screen inset-0 bg-white/80 dark:bg-black/80 pointer-events-none backdrop-blur-md'
		);
		expect(resolveMaskTransitionParams(220)).toEqual({ duration: 220 });
		expect(resolveMaskZIndexStyleValue(700)).toEqual({ zIndex: 700 });
		expect(resolveMaskZIndexStyleString(700)).toBe('z-index:700');
		const options = resolveMaskStateOptions({
			props: { opacity: '0.8', inverse: true, clickable: true, backdropBlur: 'md', duration: 220, outDuration: 80, zIndex: 700 }
		});
		expect(options).toMatchObject({ opacity: '0.8', inverse: true, zIndex: 700 });
		expect(resolveMaskDerived(options)).toEqual({
			rootClass: 'fixed h-screen w-screen inset-0 bg-white/80 dark:bg-black/80 pointer-events-none backdrop-blur-md',
			inParams: { duration: 220 },
			outParams: { duration: 80 },
			zIndexStyleValue: { zIndex: 700 },
			zIndexStyleString: 'z-index:700'
		});
	});
});

describe('toast and alert derived', () => {
	test('resolves content and radius classes', () => {
		expect(resolveToastRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveToastContentClass({ radius: 'xl', injClass: 'custom-toast' })).toContain(
			'rounded-xl text-text-dark dark:text-text-primary custom-toast'
		);
		expect(resolveToastContainerClass({ position: 'top', py: '20', clickable: false })).toContain(
			'justify-start  py-20 pointer-events-none'
		);
		expect(resolveToastContainerStyleValue({ zIndex: 700, dynamicFixed: true, innerHeight: 812 })).toEqual({
			zIndex: 700,
			height: '812px'
		});
		expect(resolveToastContainerStyleValue({ zIndex: 701, dynamicFixed: false, innerHeight: 812 })).toEqual({
			zIndex: 701,
			height: '100vh'
		});
		expect(resolveToastContainerStyleString({ zIndex: 702, dynamicFixed: true, innerHeight: 600 })).toBe('z-index:702;height:600px;');
		expect(resolveToastInitialRendered(undefined)).toBe(false);
		expect(resolveToastInitialRendered(true)).toBe(true);
		expect(resolveToastRenderedState({ visible: true, currentRendered: false })).toBe(true);
		expect(resolveToastRenderedState({ visible: false, currentRendered: true, transitionType: null, outDuration: 300 })).toBe(false);
		expect(resolveToastShouldAutoClose({ visible: true, duration: 2000 })).toBe(true);
		expect(resolveToastShouldAutoClose({ visible: true, duration: 0 })).toBe(false);
		expect(resolveToastAutoCloseAction({ visible: true, duration: 1200 })).toEqual({
			delayMs: 1200,
			nextVisible: false,
			shouldEmitClose: true,
			shouldScheduleClose: true
		});
		expect(resolveToastAutoCloseAction({ visible: false, duration: 1200 })).toEqual({
			delayMs: 1200,
			nextVisible: false,
			shouldEmitClose: false,
			shouldScheduleClose: false
		});
		expect(resolveToastRenderAction({ visible: true, currentRendered: false })).toEqual({
			nextRendered: true,
			shouldUpdateRendered: true
		});
		expect(resolveToastRenderAction({ visible: false, currentRendered: true, transitionType: null, outDuration: 300 })).toEqual({
			nextRendered: false,
			shouldUpdateRendered: true
		});
		expect(resolveToastRenderAction({ visible: false, currentRendered: true, transitionType: 'scale', outDuration: 300 })).toEqual({
			nextRendered: true,
			shouldUpdateRendered: false
		});
		expect(resolveToastVisibilityFlow({ visible: true, currentRendered: false, duration: 1200 })).toEqual({
			nextRendered: true,
			shouldUpdateRendered: true,
			delayMs: 1200,
			nextVisible: false,
			shouldEmitClose: true,
			shouldScheduleClose: true
		});
		expect(
			resolveToastVisibilityFlow({ visible: false, currentRendered: true, transitionType: null, outDuration: 300, duration: 1200 })
		).toEqual({
			nextRendered: false,
			shouldUpdateRendered: true,
			delayMs: 1200,
			nextVisible: false,
			shouldEmitClose: false,
			shouldScheduleClose: false
		});
		expect(resolveToastOutroEndAction({ currentRendered: true })).toEqual({
			nextRendered: false,
			shouldUpdateRendered: true
		});
		expect(resolveToastShouldUnmountImmediately({ transitionType: 'scale', outDuration: 300 })).toBe(false);
		expect(resolveToastShouldUnmountImmediately({ transitionType: null, outDuration: 300 })).toBe(true);
		expect(resolveToastTypeIcon('success')).toMatchObject({ type: 'success', className: 'text-success mx-auto block' });
		expect(resolveToastTypeIcon('loading')).toBeNull();
		expect(resolveToastTypeIcon('info', { info: 'custom-info' })?.className).toBe('custom-info');
		expect(resolveToastIconState('success')).toMatchObject({ kind: 'svg', type: 'success', className: 'text-success mx-auto block' });
		expect(resolveToastIconState('loading')).toEqual({ kind: 'loading' });
		expect(resolveToastIconState('icon')).toEqual({ kind: 'icon' });
		expect(resolveToastIconState('custom')).toEqual({ kind: 'none' });
		expect(resolveToastIconFrameState(null)).toEqual({ icon: { kind: 'none' }, shouldRender: false });
		expect(resolveToastIconFrameState('custom')).toEqual({ icon: { kind: 'none' }, shouldRender: true });
		expect(resolveToastIconFrameState('success')).toMatchObject({ icon: { kind: 'svg', type: 'success' }, shouldRender: true });
		expect(resolveToastTransitionClass()).toBe('flex justify-center px-10');
		const toastState = resolveToastDerived({
			clickable: false,
			dynamicFixed: true,
			easeIn: 'ease-in',
			easeOut: 'ease-out',
			iconClassMap: { success: 'custom-success' },
			innerHeight: 812,
			outDuration: 160,
			position: 'top',
			py: '20',
			radius: 'lg',
			transitionParams: {},
			transitionType: 'fly',
			type: 'success',
			zIndex: 900
		});
		expect(toastState.containerClass).toContain('justify-start  py-20 pointer-events-none');
		expect(toastState.containerStyleValue).toEqual({ zIndex: 900, height: '812px' });
		expect(toastState.containerStyleString).toBe('z-index:900;height:812px;');
		expect(toastState.contentClass).toContain('rounded-lg');
		expect(toastState.transitionClass).toBe('flex justify-center px-10');
		expect(toastState.iconFrameState).toMatchObject({ icon: { kind: 'svg', className: 'custom-success' }, shouldRender: true });
		expect(toastState.inParams).toEqual({ duration: 300, easing: 'ease-in', y: -100 });
		expect(toastState.outParams).toEqual({ duration: 160, easing: 'ease-out', y: -100 });
		expect(resolveAlertRadiusClass('full')).toBe('rounded-full');
		expect(resolveAlertRadiusClass()).toBe('rounded-(--radius-box)');
		expect(resolveAlertInitialVisible(undefined)).toBe(false);
		expect(resolveAlertInitialVisible(true)).toBe(true);
		expect(resolveAlertInitialRendered(undefined)).toBe(false);
		expect(resolveAlertInitialRendered(true)).toBe(true);
		expect(resolveAlertInitialClosingBySelf()).toBe(false);
		expect(resolveAlertShouldUnmountImmediately({ transitionType: null, outDuration: 300 })).toBe(true);
		expect(resolveAlertRenderedState({ visible: true, currentRendered: false })).toBe(true);
		expect(resolveAlertRenderedState({ visible: false, currentRendered: true, transitionType: null, outDuration: 300 })).toBe(false);
		expect(resolveAlertCloseAction({ visible: true, currentRendered: true, transitionType: 'fly', outDuration: 300 })).toEqual({
			nextClosingBySelf: true,
			nextRendered: true,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: false
		});
		expect(resolveAlertCloseAction({ visible: true, currentRendered: true, transitionType: null, outDuration: 300 })).toEqual({
			nextClosingBySelf: true,
			nextRendered: false,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true
		});
		expect(resolveAlertCloseAction({ visible: true, closingBySelf: true, currentRendered: true })).toEqual({
			nextClosingBySelf: true,
			nextRendered: true,
			nextVisible: true,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveAlertCloseFlow({ visible: true, currentRendered: true, transitionType: 'fly', outDuration: 300 })).toEqual({
			nextClosingBySelf: true,
			nextRendered: true,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: false,
			shouldCompleteImmediately: false
		});
		expect(resolveAlertCloseFlow({ visible: true, currentRendered: true, transitionType: null, outDuration: 300 })).toEqual({
			nextClosingBySelf: false,
			nextRendered: false,
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true,
			shouldCompleteImmediately: true
		});
		expect(resolveAlertOutroEndAction({ visible: false, emitClose: true })).toEqual({
			nextClosingBySelf: false,
			nextRendered: false,
			shouldComplete: true,
			shouldEmitClose: true
		});
		expect(resolveAlertOutroEndAction({ visible: true, emitClose: true })).toEqual({
			nextClosingBySelf: false,
			nextRendered: false,
			shouldComplete: false,
			shouldEmitClose: false
		});
		expect(resolveAlertShouldAutoClose({ visible: true, duration: 3000 })).toBe(true);
		expect(resolveAlertShouldAutoClose({ visible: false, duration: 3000 })).toBe(false);
		expect(resolveAlertShouldAutoClose({ visible: true, duration: 0 })).toBe(false);
		expect(resolveAlertContainerClass({ position: 'bottom', py: '40', clickable: true, injClass: 'custom-alert' })).toBe(
			'fixed bottom-0 left-0 right-0 py-10 px-2 pointer-events-none custom-alert'
		);
		expect(resolveAlertContainerStyleValue(1200)).toEqual({ zIndex: 1200 });
		expect(resolveAlertContainerStyleString(1200)).toBe('z-index: 1200;');
		expect(resolveAlertInverseBgClass(true)).toBe('bg-bg-surface-dark dark:bg-bg-surface');
		expect(resolveAlertInverseTextClass(false)).toBe('');
		expect(resolveAlertTextClass(false)).toBe('text-text-primary dark:text-text-dark');
		expect(resolveAlertTitleClass()).toBe('font-medium');
		expect(resolveAlertBodyClass()).toBe('flex items-start gap-3');
		expect(resolveAlertBodyClass(false)).toBe('flex items-start gap-3');
		expect(resolveAlertCustomIconClass()).toBe('shrink-0');
		expect(resolveAlertTextContentClass()).toBe('min-w-0 flex-1');
		expect(resolveAlertMessageClass({ inverse: false, title: 'Title' })).toBe('text-sm text-text-primary/70 dark:text-text-dark/70 mt-1');
		expect(resolveAlertCloseClass(false)).toContain('text-text-primary/50');
		expect(resolveAlertCloseButtonClass(false)).toContain('-m-1 shrink-0 rounded-full p-1 transition-colors text-text-primary/50');
		expect(resolveAlertContentClass({ inverse: true, radiusClass: 'rounded-lg' })).toContain(
			'pointer-events-auto bg-bg-surface-dark dark:bg-bg-surface text-text-dark dark:text-text-primary rounded-lg'
		);
		expect(resolveAlertContentClass({ inverse: false, radiusClass: 'rounded-lg' })).toContain(
			'pointer-events-auto text-text-primary dark:text-text-dark rounded-lg'
		);
		expect(resolveAlertCardBg(true)).toBe('none');
		expect(resolveAlertShowTypeIcon({ showIcon: true, type: 'success' })).toBe(true);
		expect(resolveAlertShowCustomIcon({ showIcon: true, type: null, icon: { name: 'ri-info-line' } })).toBe(true);
		expect(resolveAlertTypeIconWrapperClass('text-warning')).toBe('shrink-0 text-warning');
		expect(resolveAlertTypeIcon({ showIcon: true, type: 'warning' })).toMatchObject({
			type: 'warning',
			className: 'text-warning',
			wrapperClass: 'shrink-0 text-warning'
		});
		expect(resolveAlertTypeIcon({ showIcon: false, type: 'warning' })).toBeNull();
		expect(resolveAlertContentState({ showIcon: true, type: 'warning', title: 'Title', message: 'Message', closable: true })).toMatchObject(
			{
				showClose: true,
				showCustomContent: false,
				showCustomIcon: false,
				showMessage: true,
				showTitle: true,
				showTypeIcon: true,
				typeIcon: { type: 'warning', className: 'text-warning' }
			}
		);
		expect(
			resolveAlertContentState({
				type: null,
				icon: { name: 'ri-info-line' },
				hasCustomContent: true,
				title: 'Title',
				message: 'Message',
				closable: false
			})
		).toMatchObject({
			showClose: false,
			showCustomContent: true,
			showCustomIcon: true,
			showMessage: false,
			showTitle: false,
			showTypeIcon: false
		});
		const alertState = resolveAlertDerived({
			cardRadius: 'lg',
			clickable: true,
			closable: true,
			easeIn: 'ease-in',
			easeOut: 'ease-out',
			hasCustomContent: false,
			injClass: 'custom-alert',
			inverse: false,
			message: 'Message',
			outDuration: 180,
			position: 'bottom',
			py: '40',
			showIcon: true,
			title: 'Title',
			transitionParams: {},
			transitionType: 'fly',
			type: 'info',
			zIndex: 1300
		});
		expect(alertState.bodyClass).toBe('flex items-start gap-3');
		expect(alertState.containerClass).toBe('fixed bottom-0 left-0 right-0 py-10 px-2 pointer-events-none custom-alert');
		expect(alertState.containerStyleValue).toEqual({ zIndex: 1300 });
		expect(alertState.containerStyleString).toBe('z-index: 1300;');
		expect(alertState.contentClass).toContain('pointer-events-auto text-text-primary dark:text-text-dark rounded-lg');
		expect(alertState.customIconClass).toBe('shrink-0');
		expect(alertState.textContentClass).toBe('min-w-0 flex-1');
		expect(alertState.titleClass).toBe('font-medium');
		expect(alertState.messageClass).toBe('text-sm text-text-primary/70 dark:text-text-dark/70 mt-1');
		expect(alertState.closeButtonClass).toContain('text-text-primary/50');
		expect(alertState.cardBg).toBe('surface');
		expect(alertState.contentState).toMatchObject({ showClose: true, showMessage: true, showTitle: true, showTypeIcon: true });
		expect(alertState.inParams).toEqual({ duration: 300, easing: 'ease-in', y: 100 });
		expect(alertState.outParams).toEqual({ duration: 180, easing: 'ease-out', y: 100 });
	});

	test('resolves toast and alert state options', () => {
		const toastOptions = resolveToastStateOptions({
			easeIn: 'ease-in',
			easeOut: 'ease-out',
			innerHeight: 812,
			props: {
				clickable: false,
				dynamicFixed: true,
				outDuration: 160,
				position: 'top',
				py: '20',
				radius: 'lg',
				transitionParams: {},
				transitionType: 'fly',
				type: 'success',
				zIndex: 900
			}
		});
		const alertOptions = resolveAlertStateOptions({
			easeIn: 'ease-in',
			easeOut: 'ease-out',
			hasCustomContent: true,
			props: {
				cardRadius: 'lg',
				clickable: true,
				closable: false,
				injClass: 'custom-alert',
				inverse: false,
				message: 'Message',
				outDuration: 180,
				position: 'bottom',
				py: '40',
				showIcon: true,
				title: 'Title',
				transitionParams: {},
				transitionType: 'fly',
				type: 'info',
				zIndex: 1300
			}
		});

		expect(resolveToastDerived(toastOptions).iconFrameState).toMatchObject({ icon: { kind: 'svg', type: 'success' } });
		expect(resolveAlertDerived(alertOptions).contentState).toMatchObject({ showCustomContent: true, showClose: false });
	});

	test('resolves transition params without framework dependencies', () => {
		expect(resolveToastTransitionParams({ transitionType: 'fly', duration: 250, easing: 'ease' })).toEqual({
			duration: 250,
			easing: 'ease',
			y: -100
		});
		expect(resolveToastTransitionParams({ transitionType: 'fly', transitionParams: { x: 10 }, duration: 250 })).toEqual({
			duration: 250,
			easing: undefined,
			x: 10
		});
		expect(resolveAlertTransitionParams({ transitionType: 'fly', position: 'bottom', duration: 200, easing: 'ease' })).toEqual({
			duration: 200,
			easing: 'ease',
			y: 100
		});
		expect(resolveAlertTransitionParams({ transitionType: 'fly', position: 'top', transitionParams: { y: -20 }, duration: 200 })).toEqual({
			duration: 200,
			easing: undefined,
			y: -20
		});
	});
});

describe('action popover derived', () => {
	const triggerRect = { top: 10, left: 20, right: 60, bottom: 50, width: 40, height: 40 };

	test('resolves ring layout and item position', () => {
		const layout = resolveActionPopoverRingLayout({ triggerRect, viewportWidth: 200, viewportHeight: 200, itemCount: 4 });
		expect(layout).toEqual({ ringPosition: { x: 40, y: 30 }, computedRingShape: 'half', ringStartAngle: 0 });
		expect(resolveActionPopoverRingPositionState({ triggerRect, viewportWidth: 200, viewportHeight: 200, itemCount: 4 })).toEqual({
			type: 'ring',
			ringPosition: { x: 40, y: 30 },
			computedRingShape: 'half',
			ringStartAngle: 0
		});
		const position = resolveActionPopoverRingItemPosition({
			index: 1,
			itemCount: 4,
			ringShape: 'half',
			startAngle: 0,
			ringRadius: 60,
			ringItemSize: 44
		});
		expect(Math.round(position.x)).toBe(30);
		expect(Math.round(position.y)).toBe(52);
		expect(resolveActionPopoverRingPanelStyleValue({ x: 40, y: 30 })).toEqual({ top: 30, left: 40, transform: 'translate(-50%, -50%)' });
		expect(resolveActionPopoverRingPanelStyleString({ x: 40, y: 30 })).toBe('top: 30px; left: 40px; transform: translate(-50%, -50%);');
		expect(
			resolveActionPopoverRingItemStyleValue({
				position: { x: 10, y: -20 },
				ringItemSize: 48,
				animate: false,
				transitionDurationMs: 150,
				transitionTimingFunction: 'ease'
			})
		).toEqual({
			width: 48,
			height: 48,
			left: 10,
			opacity: 0,
			top: -20,
			transform: 'translate(-50%, -50%) translate(-10px, 20px)',
			transitionDuration: '150ms',
			transitionTimingFunction: 'ease'
		});
		expect(resolveActionPopoverRingItemStyleString({ position: { x: 10, y: -20 }, ringItemSize: 48, animate: true })).toBe(
			'width: 48px; height: 48px; left: 10px; opacity: 1; top: -20px; transform: translate(-50%, -50%)'
		);
		const ringItemDerived = resolveActionPopoverRingItemDerived({
			item: { disabled: true, icon: {}, style: 'warning' },
			index: 0,
			itemCount: 2,
			ringShape: 'half',
			startAngle: 0,
			ringRadius: 60,
			ringItemSize: 48,
			inverse: false,
			inlineShadow: 'xs',
			animate: true
		});
		expect(ringItemDerived.buttonClass).toContain('cursor-not-allowed opacity-40');
		expect(ringItemDerived).toMatchObject({
			disabled: true,
			iconInjClass: '',
			iconState: 'warning',
			position: { x: 60, y: 0 },
			style: { width: 48, height: 48, left: 60, opacity: 0.4, top: 0, transform: 'translate(-50%, -50%)' }
		});
		const ringList = resolveActionPopoverRingItemDerivedList({
			items: [
				{ icon: { injClass: 'ring-icon' }, disabled: false },
				{ icon: {}, disabled: true }
			],
			ringShape: 'half',
			startAngle: 0,
			ringRadius: 60,
			ringItemSize: 48,
			animate: false,
			transitionDurationMs: resolveActionPopoverRingTransitionDuration(false),
			transitionTimingFunction: 'ease'
		});
		expect(ringList).toHaveLength(2);
		expect(ringList[0].item).toEqual({ icon: { injClass: 'ring-icon' }, disabled: false });
		expect(ringList[0].iconInjClass).toBe('ring-icon');
		expect(ringList[0].style.transitionDuration).toBe('150ms');
		expect(resolveActionPopoverRingTransitionDuration(true)).toBe(250);
		expect(resolveActionPopoverRingTransitionDuration(false)).toBe(150);
		expect(resolveActionPopoverRingFlyParams({ position: { x: 10, y: -20 }, phase: 'out' })).toEqual({
			duration: 150,
			x: -10,
			y: 20,
			opacity: 0
		});
	});

	test('resolves inline position, origin, icon state and ring transform', () => {
		const inlinePosition = {
			top: 58,
			left: 8,
			actualDirection: 'down'
		} as const;
		expect(
			resolveActionPopoverInlinePosition({ triggerRect, panelWidth: 80, panelHeight: 40, viewportWidth: 200, viewportHeight: 200 })
		).toEqual(inlinePosition);
		expect(
			resolveActionPopoverInlinePositionState({ triggerRect, panelWidth: 80, panelHeight: 40, viewportWidth: 200, viewportHeight: 200 })
		).toEqual({
			type: 'inline',
			inlinePosition: { top: 58, left: 8 },
			actualDirection: 'down'
		});
		expect(resolveActionPopoverInlinePanelStyleValue({ top: 58, left: 8, transformOrigin: 'top center', positionReady: true })).toEqual({
			top: 58,
			left: 8,
			transformOrigin: 'top center',
			visibility: 'visible'
		});
		expect(resolveActionPopoverInlinePanelStyleString({ top: 58, left: 8, transformOrigin: 'top center', positionReady: false })).toBe(
			'top: 58px; left: 8px; transform-origin: top center; visibility: hidden;'
		);
		expect(resolveActionPopoverInlineInParams()).toEqual({ duration: 200, start: 0.5, opacity: 0 });
		expect(resolveActionPopoverInlineOutParams()).toEqual({ duration: 150, start: 0.5, opacity: 0 });
		expect(resolveActionPopoverTransformOrigin('up', 'right')).toBe('bottom right');
		expect(resolveActionPopoverIconState({ style: 'warning', icon: {} })).toBe('warning');
		expect(resolveActionPopoverIconProps()).toEqual({});
		expect(resolveActionPopoverIconProps({ name: 'ri-more-line' })).toEqual({ name: 'ri-more-line' });
		expect(resolveActionPopoverInitialVisible(undefined)).toBe(false);
		expect(resolveActionPopoverMeasuredDimension()).toBe(0);
		expect(resolveActionPopoverMeasuredDimension({ measured: 80, fallback: 70 })).toBe(80);
		expect(resolveActionPopoverMeasuredDimension({ measured: 0, fallback: 70 })).toBe(70);
		const triggerElement = { id: 'trigger' };
		expect(resolveActionPopoverTriggerElement(triggerElement)).toBe(triggerElement);
		expect(resolveActionPopoverTriggerElement({ current: triggerElement })).toBe(triggerElement);
		expect(resolveActionPopoverTriggerElement({ current: null })).toBeNull();
		expect(resolveActionPopoverVisible({ visible: undefined, innerVisible: true })).toBe(true);
		expect(resolveActionPopoverVisible({ visible: false, innerVisible: true })).toBe(false);
		expect(resolveActionPopoverVisible({ visible: true, innerVisible: false, hiddenByViewport: true })).toBe(false);
		expect(resolveActionPopoverRingTransform(10, -20, false)).toBe('translate(-50%, -50%) translate(-10px, 20px)');
	});

	test('resolves framework-agnostic action classes', () => {
		const themeClasses = resolveActionPopoverThemeClasses(true);
		expect(themeClasses.panel).toContain('bg-bg-surface-dark');
		expect(themeClasses.active).toContain('active:bg-text-dark/10');
		expect(resolveActionPopoverPanelClass({ inverse: true, inlineRadius: 'full', inlineShadow: 'lg' })).toContain('rounded-full shadow-lg');
		expect(resolveActionPopoverRingPanelClass()).toBe('fixed z-50');
		expect(resolveActionPopoverTitleClass({ inverse: true, titleAlign: 'right' })).toContain('text-right');
		expect(resolveActionPopoverActionContainerClass({ layout: 'grid', gridColumns: 4, inverse: true })).toBe(
			'grid grid-cols-4 gap-px bg-white/10 dark:bg-black/10'
		);
		expect(resolveActionPopoverActionDisabled({ disabled: true })).toBe(true);
		expect(resolveActionPopoverActionDisabled({})).toBe(false);
		expect(resolveActionPopoverActionButtonClass({ disabled: true, align: 'left', layout: 'h', inverse: true })).toBe(
			'flex items-center gap-2 whitespace-nowrap px-4 transition-all cursor-not-allowed opacity-40 justify-start pl-4 flex-1'
		);
		expect(resolveActionPopoverActionContentClass({ style: 'error', desc: 'description' })).toBe(
			' text-error  flex flex-col justify-center h-10'
		);
		expect(resolveActionPopoverDescClass(true)).toBe('text-xs text-text-dark/60 dark:text-text-primary/60');
		expect(resolveActionPopoverIconInjClass()).toBe('');
		expect(resolveActionPopoverIconInjClass({ injClass: 'custom-icon' })).toBe('custom-icon');
		expect(resolveActionPopoverVerticalDividerClass(true)).toBe('mx-2 h-px bg-white/10 dark:bg-black/10');
		expect(resolveActionPopoverImageClass({ imgRadius: 'lg' })).toBe('h-6 w-6 overflow-hidden rounded-lg');
		expect(resolveActionPopoverImageInnerClass()).toBe('h-full w-full object-cover');
		expect(
			resolveActionPopoverActionViewState({
				item: { icon: { injClass: 'custom-icon' }, style: 'warning', desc: 'desc' },
				align: 'left',
				layout: 'v',
				inverse: true,
				index: 0,
				total: 2
			})
		).toMatchObject({
			disabled: false,
			descClass: 'text-xs text-text-dark/60 dark:text-text-primary/60',
			dividerClass: 'mx-2 h-px bg-white/10 dark:bg-black/10',
			iconInjClass: 'custom-icon',
			iconState: 'warning',
			showDesc: true,
			showDivider: true,
			showIcon: true,
			showImage: false
		});
		expect(
			resolveActionPopoverActionViewState({ item: { showImg: true, disabled: true, imgRadius: 'lg' }, layout: 'h', index: 0, total: 2 })
		).toMatchObject({
			disabled: true,
			imageClass: 'h-6 w-6 overflow-hidden rounded-lg',
			imageInnerClass: 'h-full w-full object-cover',
			showDesc: false,
			showDivider: false,
			showIcon: false,
			showImage: true
		});
		const actionList = resolveActionPopoverActionViewStateList({
			items: [
				{ content: '复制', icon: { injClass: 'copy-icon' } },
				{ content: '删除', disabled: true }
			],
			align: 'left',
			layout: 'v',
			inverse: true
		});
		expect(actionList).toHaveLength(2);
		expect(actionList[0].item.content).toBe('复制');
		expect(actionList[0].iconInjClass).toBe('copy-icon');
		expect(actionList[1].disabled).toBe(true);
		expect(actionList[1].showDivider).toBe(false);
		expect(resolveActionPopoverCancelButtonClass({ inverse: true, align: 'center' })).toContain('active:bg-text-dark/10');
		expect(resolveActionPopoverRingButtonClass({ inverse: false, inlineShadow: 'xs', disabled: false })).toContain('shadow-xs');
	});

	test('resolves aggregate render derivations', () => {
		const options = resolveActionPopoverStateOptions({
			props: {
				actions: [
					{ content: '复制', icon: { injClass: 'copy-icon' } },
					{ content: '删除', disabled: true }
				],
				align: 'left',
				gridColumns: 4,
				inlineAlign: 'right',
				inlineRadius: 'full',
				inlineShadow: 'xs',
				inverse: true,
				layout: 'ring',
				ringActions: [
					{ icon: {}, disabled: false },
					{ icon: {}, disabled: true }
				],
				ringItemSize: 48,
				ringRadius: 60,
				showCancel: true,
				title: '操作',
				titleAlign: 'right',
				visible: undefined
			},
			actualDirection: 'up',
			computedRingShape: 'half',
			inlinePosition: { top: 58, left: 8 },
			innerVisible: true,
			positionReady: true,
			ringAnimate: false,
			ringPosition: { x: 40, y: 30 },
			ringStartAngle: 0
		});
		expect(options).toMatchObject({
			actions: [
				{ content: '复制', icon: { injClass: 'copy-icon' } },
				{ content: '删除', disabled: true }
			],
			actualDirection: 'up',
			align: 'left',
			computedRingShape: 'half',
			gridColumns: 4,
			inlineAlign: 'right',
			inlinePosition: { top: 58, left: 8 },
			inlineRadius: 'full',
			inlineShadow: 'xs',
			innerVisible: true,
			inverse: true,
			layout: 'ring',
			positionReady: true,
			ringActions: [
				{ icon: {}, disabled: false },
				{ icon: {}, disabled: true }
			],
			ringAnimate: false,
			ringItemSize: 48,
			ringPosition: { x: 40, y: 30 },
			ringRadius: 60,
			ringStartAngle: 0,
			showCancel: true,
			title: '操作',
			titleAlign: 'right',
			visible: undefined
		});
		const derived = resolveActionPopoverDerived({
			visible: undefined,
			innerVisible: true,
			title: '操作',
			titleAlign: 'right',
			showCancel: true,
			actions: [
				{ content: '复制', icon: { injClass: 'copy-icon' } },
				{ content: '删除', disabled: true }
			],
			ringActions: [
				{ icon: {}, disabled: false },
				{ icon: {}, disabled: true }
			],
			align: 'left',
			layout: 'ring',
			gridColumns: 4,
			inverse: true,
			inlineAlign: 'right',
			inlinePosition: { top: 58, left: 8 },
			actualDirection: 'up',
			positionReady: true,
			inlineRadius: 'full',
			inlineShadow: 'xs',
			ringPosition: { x: 40, y: 30 },
			computedRingShape: 'half',
			ringStartAngle: 0,
			ringRadius: 60,
			ringItemSize: 48,
			ringAnimate: false
		});
		expect(derived.visible).toBe(true);
		expect(derived.inlineVisible).toBe(false);
		expect(derived.ringVisible).toBe(true);
		expect(derived.showTitle).toBe(true);
		expect(derived.showCancel).toBe(true);
		expect(derived.titleClass).toContain('text-right');
		expect(derived.cancelButtonClass).toContain('justify-start');
		expect(derived.inlinePanelClass).toContain('rounded-full shadow-xs');
		expect(derived.inlinePanelStyleValue).toEqual({
			top: 58,
			left: 8,
			transformOrigin: 'bottom right',
			visibility: 'visible'
		});
		expect(derived.inlinePanelStyleString).toBe('top: 58px; left: 8px; transform-origin: bottom right; visibility: visible;');
		expect(derived.ringPanelClass).toBe('fixed z-50');
		expect(derived.ringPanelStyleString).toBe('top: 30px; left: 40px; transform: translate(-50%, -50%);');
		expect(derived.ringTransitionDuration).toBe(150);
		expect(derived.actionViewStates).toHaveLength(2);
		expect(derived.actionViewStates[0].iconInjClass).toBe('copy-icon');
		expect(derived.actionViewStates[1].disabled).toBe(true);
		expect(derived.ringItemDerivedList).toHaveLength(2);
		expect(derived.ringItemDerivedList[0].inParams).toEqual({ duration: 250, x: -60, y: -0, opacity: 0 });
		expect(derived.ringItemDerivedList[0].outParams).toEqual({ duration: 150, x: -60, y: -0, opacity: 0 });
		expect(derived.ringItemDerivedList[0].style.transitionDuration).toBe('150ms');
	});

	test('resolves click action decisions', () => {
		expect(resolveActionPopoverCancelAction()).toEqual({ nextVisible: false, shouldCancel: true, shouldClose: true });
		expect(resolveActionPopoverCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveActionPopoverCloseAction({ emitClose: false })).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: false
		});
		expect(resolveActionPopoverCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveActionPopoverActionClickAction({ action: { disabled: true, content: '禁用' }, index: 1, actionClosable: true })).toEqual({
			action: { disabled: true, content: '禁用' },
			index: 1,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: false
		});
		expect(resolveActionPopoverActionClickAction({ action: { content: '确认' }, index: 2, actionClosable: false })).toEqual({
			action: { content: '确认' },
			index: 2,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: true
		});
		expect(resolveActionPopoverActionClickAction({ action: { content: '确认' }, index: 2, actionClosable: true }).shouldClose).toBe(true);
		expect(resolveActionPopoverActionClickFlow({ action: { disabled: true, content: '禁用' }, index: 1, actionClosable: true })).toEqual({
			action: { disabled: true, content: '禁用' },
			closeAction: { nextVisible: false, shouldClose: false, shouldEmitClose: false },
			index: 1,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: false
		});
		expect(
			resolveActionPopoverActionClickFlow({ action: { content: '确认' }, index: 2, actionClosable: false }).closeAction.shouldClose
		).toBe(false);
		expect(resolveActionPopoverActionClickFlow({ action: { content: '确认' }, index: 2, actionClosable: true }).closeAction).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true
		});
	});

	test('resolves render lifecycle actions', () => {
		expect(resolveActionPopoverRenderAction({ visible: true, layout: 'ring', shouldRender: false, positionReady: true })).toEqual({
			kind: 'open',
			nextPositionReady: false,
			nextRingAnimate: false,
			nextShouldRender: true,
			ringCloseDelayMs: 150,
			shouldSchedulePosition: true,
			shouldScheduleRingClose: false
		});
		expect(resolveActionPopoverRenderAction({ visible: false, layout: 'ring', shouldRender: true, positionReady: true })).toEqual({
			kind: 'ringCloseDelay',
			nextPositionReady: true,
			nextRingAnimate: false,
			nextShouldRender: true,
			ringCloseDelayMs: 150,
			shouldSchedulePosition: false,
			shouldScheduleRingClose: true
		});
		expect(resolveActionPopoverRenderAction({ visible: false, layout: 'v', shouldRender: true, positionReady: true })).toMatchObject({
			kind: 'keepInlineOutro',
			nextPositionReady: true,
			nextShouldRender: true,
			shouldSchedulePosition: false,
			shouldScheduleRingClose: false
		});
		expect(resolveActionPopoverRenderAction({ visible: false, layout: 'grid', shouldRender: false, positionReady: true })).toMatchObject({
			kind: 'closed',
			nextPositionReady: false,
			nextShouldRender: false
		});
		expect(resolveActionPopoverRingCloseCompleteAction()).toEqual({ nextPositionReady: false, nextShouldRender: false });
		expect(resolveActionPopoverInlineCloseCompleteAction()).toEqual({ nextPositionReady: false, nextShouldRender: false });
	});

	test('resolves viewport visibility actions', () => {
		const visibleRect = { top: 10, left: 10, right: 30, bottom: 30, width: 20, height: 20 };
		const hiddenRect = { top: -30, left: 10, right: 30, bottom: -1, width: 20, height: 20 };

		expect(resolveActionPopoverShouldBindGlobalListeners({ visible: false, hiddenByViewport: false })).toBe(false);
		expect(resolveActionPopoverShouldBindGlobalListeners({ visible: true, hiddenByViewport: false })).toBe(true);
		expect(resolveActionPopoverShouldBindGlobalListeners({ visible: false, hiddenByViewport: true })).toBe(true);
		expect(resolveActionPopoverShouldHideForViewport({ visible: true, hiddenByViewport: false })).toBe(true);
		expect(resolveActionPopoverShouldRestoreFromViewport({ hiddenByViewport: true, triggerInViewport: true })).toBe(true);
		expect(resolveActionPopoverTriggerInViewport({ triggerRect: visibleRect, viewportWidth: 100, viewportHeight: 100 })).toBe(true);
		expect(resolveActionPopoverTriggerInViewport({ triggerRect: hiddenRect, viewportWidth: 100, viewportHeight: 100 })).toBe(false);
		expect(resolveActionPopoverHideForViewportAction({ visible: true, hiddenByViewport: false })).toEqual({
			nextHiddenByViewport: true,
			shouldChange: true
		});
		expect(resolveActionPopoverHideForViewportAction({ visible: false, hiddenByViewport: true })).toEqual({
			nextHiddenByViewport: true,
			shouldChange: false
		});
		expect(resolveActionPopoverRestoreFromViewportAction({ hiddenByViewport: true, triggerInViewport: true })).toEqual({
			nextHiddenByViewport: false,
			shouldChange: true
		});
		expect(resolveActionPopoverRestoreFromViewportAction({ hiddenByViewport: true, triggerInViewport: false })).toEqual({
			nextHiddenByViewport: true,
			shouldChange: false
		});
		expect(resolveActionPopoverViewportAction({ triggerInViewport: false, hiddenByViewport: false })).toBe('hideForViewport');
		expect(resolveActionPopoverViewportAction({ triggerInViewport: true, hiddenByViewport: true })).toBe('restoreFromViewport');
		expect(resolveActionPopoverViewportAction({ triggerInViewport: true, hiddenByViewport: false })).toBe('updatePosition');
	});
});

describe('accordion derived', () => {
	test('resolves expansion and next active state', () => {
		expect(resolveAccordionExpanded({ activeIndex: 1, index: 1 })).toBe(true);
		expect(resolveAccordionExpanded({ activeIndex: [0, 2], index: 1, multiple: true })).toBe(false);
		expect(resolveAccordionNextActive({ activeIndex: 1, index: 1 })).toBeUndefined();
		expect(resolveAccordionNextActive({ activeIndex: [0], index: 2, multiple: true })).toEqual([0, 2]);
		expect(resolveAccordionNextActive({ activeIndex: [0, 2], index: 2, multiple: true })).toEqual([0]);
		expect(resolveAccordionToggleAction({ activeIndex: 1, index: 2 })).toEqual({ nextActive: 2, shouldToggle: true });
		expect(resolveAccordionToggleAction({ activeIndex: 1, index: 2, disabled: true })).toEqual({ nextActive: 1, shouldToggle: false });
	});

	test('resolves classes without component state', () => {
		expect(resolveAccordionRootClass({ radius: 'lg', border: 'dashed', injClass: 'custom' })).toContain(
			'overflow-hidden rounded-lg border border-dashed'
		);
		expect(resolveAccordionDividerClass({ index: 0, divider: true, border: 'solid' })).toBe('');
		expect(resolveAccordionDividerClass({ index: 1, divider: true, border: 'dotted' })).toContain('border-dotted');
		expect(resolveAccordionButtonClass({ disabled: true, iconPosition: 'left', titleClass: 'title' })).toContain(
			'cursor-not-allowed opacity-50 flex-row-reverse title'
		);
		expect(resolveAccordionTitleClass('left')).toBe('flex flex-1 items-center gap-2 flex-row-reverse justify-end');
		expect(resolveAccordionContentClass('content')).toBe('px-4 pb-4 text-sm text-black/70 dark:text-white/70 content');
		expect(resolveAccordionIconRotationClass({ expanded: true, expandIcon: 'arrow' })).toBe('rotate-90');
		expect(resolveAccordionIconRotationClass({ expanded: true, expandIcon: 'plus' })).toBe('rotate-45');
		expect(resolveAccordionIconWrapClass({ expanded: true, expandIcon: 'plus' })).toBe(
			'shrink-0 transition-transform duration-300 rotate-45'
		);
		expect(resolveAccordionIconClass()).toBe('h-4 w-4');
		expect(resolveAccordionPanelClass()).toBe('overflow-hidden');
		expect(resolveAccordionTitleTextClass()).toBe('font-medium');
		expect(resolveAccordionSlideParams()).toEqual({ duration: 300 });
		expect(resolveAccordionSlideParams({ duration: 180, easing: 'ease' })).toEqual({ duration: 180, easing: 'ease' });
		expect(resolveAccordionExpandIconState({ expanded: true, expandIcon: 'arrow' })).toEqual({
			iconClass: 'h-4 w-4',
			kind: 'arrow',
			shouldRender: true,
			wrapClass: 'shrink-0 transition-transform duration-300 rotate-90'
		});
		expect(resolveAccordionExpandIconState({ expanded: true, expandIcon: 'plus' })).toEqual({
			iconClass: 'h-4 w-4',
			kind: 'plus',
			shouldRender: true,
			wrapClass: 'shrink-0 transition-transform duration-300 rotate-45'
		});
		expect(resolveAccordionExpandIconState({ expandIcon: null })).toEqual({
			iconClass: '',
			kind: 'none',
			shouldRender: false,
			wrapClass: ''
		});
		expect(resolveAccordionExpandIconState({ expandIcon: 'custom' })).toEqual({
			iconClass: 'h-4 w-4',
			kind: 'custom',
			shouldRender: true,
			wrapClass: 'shrink-0 transition-transform duration-300'
		});
		expect(
			resolveAccordionItemViewStateList({
				items: [{ title: 'A' }, { title: 'B', disabled: true }],
				activeIndex: 0,
				expandIcon: 'arrow',
				divider: true,
				border: 'dotted',
				iconPosition: 'left',
				titleClass: 'title'
			})
		).toEqual([
			{
				buttonClass:
					'flex w-full items-center justify-between px-4 py-3 text-left transition-colors cursor-pointer active:bg-black/5 dark:active:bg-white/5 flex-row-reverse title',
				dividerClass: '',
				expanded: true,
				iconState: {
					iconClass: 'h-4 w-4',
					kind: 'arrow',
					shouldRender: true,
					wrapClass: 'shrink-0 transition-transform duration-300 rotate-90'
				},
				index: 0,
				item: { title: 'A' },
				titleClass: 'flex flex-1 items-center gap-2 flex-row-reverse justify-end'
			},
			{
				buttonClass:
					'flex w-full items-center justify-between px-4 py-3 text-left transition-colors cursor-not-allowed opacity-50 flex-row-reverse title',
				dividerClass: 'border-t border-dotted border-black/10 dark:border-white/10',
				expanded: false,
				iconState: {
					iconClass: 'h-4 w-4',
					kind: 'arrow',
					shouldRender: true,
					wrapClass: 'shrink-0 transition-transform duration-300'
				},
				index: 1,
				item: { title: 'B', disabled: true },
				titleClass: 'flex flex-1 items-center gap-2 flex-row-reverse justify-end'
			}
		]);
	});

	test('resolves render-ready accordion state', () => {
		const options = resolveAccordionStateOptions({
			activeIndex: 0,
			easing: 'ease',
			props: {
				border: 'dotted',
				contentClass: 'content',
				divider: true,
				expandIcon: 'plus',
				iconPosition: 'left',
				injClass: 'custom',
				items: [{ title: 'A' }, { title: 'B', disabled: true }],
				multiple: false,
				radius: 'lg',
				titleClass: 'title',
				transitionDuration: 180
			}
		});
		const state = resolveAccordionDerived(options);

		expect(options).toMatchObject({ activeIndex: 0, border: 'dotted', expandIcon: 'plus', easing: 'ease' });
		expect(state.rootClass).toContain('overflow-hidden rounded-lg border border-dotted');
		expect(state.rootClass).toContain('custom');
		expect(state.contentClass).toBe('px-4 pb-4 text-sm text-black/70 dark:text-white/70 content');
		expect(state.panelClass).toBe('overflow-hidden');
		expect(state.titleTextClass).toBe('font-medium');
		expect(state.slideParams).toEqual({ duration: 180, easing: 'ease' });
		expect(state.itemViewStates).toHaveLength(2);
		expect(state.itemViewStates[0].expanded).toBe(true);
		expect(state.itemViewStates[0].iconState.kind).toBe('plus');
		expect(state.itemViewStates[1].buttonClass).toContain('cursor-not-allowed opacity-50');
	});
});

describe('action sheet derived', () => {
	test('resolves transition distance and classes', () => {
		expect(resolveActionSheetInitialVisible(undefined)).toBe(false);
		expect(resolveActionSheetInitialVisible(true)).toBe(true);
		expect(resolveActionSheetCancelText(undefined, { cancelText: 'Cancel' })).toBe('Cancel');
		expect(resolveActionSheetCancelText('Close', { cancelText: 'Cancel' })).toBe('Close');
		expect(resolveActionSheetTransitionDistance({ title: 'Title', showCancel: true, actions: [{}, { desc: 'desc' }] })).toBe(213);
		expect(resolveActionSheetTitleClass('right')).toContain('justify-center truncate border-b');
		expect(resolveActionSheetTitleClass('right')).toContain('text-right');
		expect(resolveActionSheetActionDisabled({ disabled: true })).toBe(true);
		expect(resolveActionSheetActionDisabled({})).toBe(false);
		expect(resolveActionSheetActionButtonClass({ disabled: true, align: 'left' })).toBe(
			'flex w-full items-center gap-2 transition-all cursor-not-allowed opacity-40 justify-start pl-4'
		);
		expect(resolveActionSheetActionContentClass({ style: 'warning', desc: 'desc' })).toBe(
			'flex flex-col justify-center truncate text-center font-bold  text-warning  h-10'
		);
		expect(resolveActionSheetImgRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveActionSheetImageClass('lg')).toBe('h-6 w-6 overflow-hidden rounded-lg');
		expect(resolveActionSheetImageInnerClass()).toBe('h-full w-full object-cover');
		expect(resolveActionSheetDescClass()).toBe('truncate pb-1 text-center text-xs text-black/50 dark:text-white/40');
		expect(resolveActionSheetDividerClass()).toBe('h-px w-full bg-black/5 dark:bg-white/5');
		expect(resolveActionSheetCancelGapClass()).toBe('h-2 bg-black/5 dark:bg-white/5');
		expect(resolveActionSheetIconState({ style: 'success' })).toBe('success');
		expect(resolveActionSheetIconState({ icon: { state: 'info' }, style: 'success' })).toBe('info');
		expect(resolveActionSheetIconProps()).toEqual({});
		expect(resolveActionSheetIconProps({ name: 'ri-close-line' })).toEqual({ name: 'ri-close-line' });
		expect(
			resolveActionSheetActionViewState({
				action: { icon: { injClass: 'custom-icon' }, style: 'success' },
				align: 'left',
				index: 0,
				total: 2
			})
		).toMatchObject({
			disabled: false,
			iconInjClass: 'custom-icon',
			iconState: 'success',
			showDesc: false,
			showDivider: true,
			showIcon: true,
			showImage: false
		});
		expect(
			resolveActionSheetActionViewState({ action: { showImg: true, desc: 'desc', disabled: true, imgRadius: 'lg' }, index: 1, total: 2 })
		).toMatchObject({
			disabled: true,
			imgRadiusClass: 'rounded-lg',
			imageClass: 'h-6 w-6 overflow-hidden rounded-lg',
			imageInnerClass: 'h-full w-full object-cover',
			descClass: 'truncate pb-1 text-center text-xs text-black/50 dark:text-white/40',
			dividerClass: 'h-px w-full bg-black/5 dark:bg-white/5',
			showDesc: true,
			showDivider: false,
			showIcon: false,
			showImage: true
		});
		const actionList = resolveActionSheetActionViewStateList({
			actions: [
				{ content: '复制', icon: { injClass: 'copy-icon' }, style: 'success' },
				{ content: '删除', disabled: true }
			],
			align: 'left'
		});
		expect(actionList).toHaveLength(2);
		expect(actionList[0].action.content).toBe('复制');
		expect(actionList[0].iconInjClass).toBe('copy-icon');
		expect(actionList[0].showDivider).toBe(true);
		expect(actionList[1].disabled).toBe(true);
		expect(actionList[1].showDivider).toBe(false);
		expect(resolveActionSheetCancelAction()).toEqual({ nextVisible: false, shouldCancel: true, shouldClose: true });
		expect(resolveActionSheetCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveActionSheetCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolveActionSheetCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolveActionSheetActionClickAction({ action: { disabled: true, content: '禁用' }, index: 0, actionClosable: true })).toEqual({
			action: { disabled: true, content: '禁用' },
			index: 0,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: false
		});
		expect(resolveActionSheetActionClickAction({ action: { content: '保留面板' }, index: 1, actionClosable: false })).toEqual({
			action: { content: '保留面板' },
			index: 1,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: true
		});
		expect(resolveActionSheetActionClickAction({ action: { content: '关闭面板' }, index: 1, actionClosable: true }).shouldClose).toBe(true);
		expect(resolveActionSheetActionClickFlow({ action: { disabled: true, content: '禁用' }, index: 0, actionClosable: true })).toEqual({
			action: { disabled: true, content: '禁用' },
			closeAction: { nextVisible: false, shouldClose: false, shouldEmitClose: false },
			index: 0,
			nextVisible: false,
			shouldClose: false,
			shouldSelect: false
		});
		expect(
			resolveActionSheetActionClickFlow({ action: { content: '保留面板' }, index: 1, actionClosable: false }).closeAction.shouldClose
		).toBe(false);
		expect(resolveActionSheetActionClickFlow({ action: { content: '关闭面板' }, index: 1, actionClosable: true }).closeAction).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: true
		});
	});

	test('resolves render-ready action sheet state', () => {
		const options = resolveActionSheetStateOptions({
			defaults: { cancelText: 'Cancel' },
			props: {
				actions: [
					{ content: '复制', icon: { injClass: 'copy-icon' }, style: 'success' },
					{ content: '删除', disabled: true, desc: '不可恢复' }
				],
				align: 'left',
				cancelText: undefined,
				showCancel: true,
				title: 'Actions',
				titleAlign: 'right'
			}
		});
		const state = resolveActionSheetDerived(options);

		expect(options).toMatchObject({ align: 'left', showCancel: true, title: 'Actions', titleAlign: 'right' });
		expect(state.showTitle).toBe(true);
		expect(state.showCancel).toBe(true);
		expect(state.cancelText).toBe('Cancel');
		expect(state.titleClass).toContain('text-right');
		expect(state.cancelButtonClass).toBe('flex h-12 w-full items-center transition-all active:scale-90 justify-start pl-4');
		expect(state.cancelGapClass).toBe('h-2 bg-black/5 dark:bg-white/5');
		expect(state.transitionDistance).toBe(213);
		expect(state.actionViewStates).toHaveLength(2);
		expect(state.actionViewStates[0]?.iconInjClass).toBe('copy-icon');
		expect(state.actionViewStates[1]?.disabled).toBe(true);
		expect(state.actionViewStates[1]?.showDesc).toBe(true);
	});
});

describe('char roll derived', () => {
	test('resolves charset, formatting and animation math', () => {
		const charSetArray = getCharRollCharSetArray(resolveCharRollCharSet('number'));
		expect(formatCharRollValue({ value: 1234.5, decimal: 2, separator: true })).toBe('1,234.50');
		expect(getCharRollCharIndex(charSetArray, '5')).toBe(5);
		expect(getCharRollAutoStartIndex(3, 2, 10)).toBe(6);
		expect(getCharRollCurrentDisplayIndex({ char: '2', charSetArray, startIndex: 0, targetIndex: 3, progress: 0.5 })).toBe(2);
		expect(getCharRollScrollOffset({ char: '2', charSetArray, startIndex: 0, targetIndex: 2, progress: 0.5, height: 10 })).toBe(-110);
		expect(getCharRollCurrentChar({ char: '2', charSetArray, startIndex: 0, targetIndex: 3, progress: 0.5 })).toBe('1');
		expect(getCharRollRenderCount(10, 2)).toBe(51);
		expect(resolveCharRollRenderIndexes(3)).toEqual([0, 1, 2]);
		expect(resolveCharRollRenderIndexes(-1)).toEqual([]);
		expect(resolveCharRollInitialInitialized()).toBe(false);
	});

	test('resolves display state, meta, classes and styles', () => {
		const charSetArray = getCharRollCharSetArray(resolveCharRollCharSet('number'));
		const state = resolveCharRollDisplayState({ value: 12, prefix: '$', charSetArray, autoStart: true });

		expect(state.displayChars).toEqual(['$', '1', '2']);
		expect(state.targetIndexes).toEqual([0, 1, 2]);
		expect(state.startIndexes[0]).toBe(0);
		expect(state.animationProgress).toEqual([0, 0, 0]);
		expect(state.charStarted).toEqual([false, false, false]);

		const frame = resolveCharRollFrameState({ charCount: 3, elapsed: 75, stagger: 50, duration: 100, easing: (progress) => progress });
		expect(frame).toEqual({
			allComplete: false,
			animationProgress: [0.75, 0.25, 0],
			charStarted: [true, true, false]
		});

		const meta = resolveCharRollDisplayMeta({
			char: '2',
			index: 0,
			charSetArray,
			animationProgress: [0.5],
			startIndexes: [0],
			targetIndexes: [2],
			charStarted: [true],
			isAnimating: true,
			height: 10
		});
		expect(meta.displayChar).toBe('1');
		expect(meta.minWidth).toBe(6);
		expect(meta.scrollOffset).toBe(-110);

		expect(resolveCharRollRootClass({ gap: '2', fontSize: 'lg', fontWeight: 'medium', injClass: 'custom' })).toBe(
			'inline-flex items-center gap-2 text-lg font-medium custom'
		);
		expect(resolveCharRollScrollListClass()).toBe('flex flex-col items-center justify-center transition-none');
		expect(resolveCharRollRollItemClass()).toBe('flex items-center justify-center');
		expect(resolveCharRollDirectClass()).toBe('flex items-center justify-center');
		expect(resolveCharRollCharClass({ radius: 'lg', bg: 'theme', charClass: 'char' })).toBe(
			'relative overflow-hidden rounded-lg bg-primary/10 dark:bg-dark/10 char'
		);
		expect(resolveCharRollResetState(['1', '2'])).toEqual({ animationProgress: [0, 0], charStarted: [false, false] });
		expect(resolveCharRollCompleteState({ displayChars: ['1'], targetIndexes: [1] })).toEqual({ charStarted: [true], startIndexes: [1] });
		expect(
			resolveCharRollPauseStartIndexes({
				displayChars: ['2'],
				animationProgress: [0.5],
				startIndexes: [0],
				targetIndexes: [2],
				charSetArray
			})
		).toEqual([1]);
		expect(resolveCharRollEasingFunction({ cubicOut: (value) => value * 2 }, 'missing')(0.5)).toBe(1);
		expect(resolveCharRollEasingFunction({}, 'missing')(0.5)).toBe(0.5);
		expect(resolveCharRollRollItemStyleValue(20)).toEqual({ height: 20, minWidth: 12 });
		expect(resolveCharRollHeightStyleString(20)).toBe('height: 20px;');
		expect(resolveCharRollDirectStyleString({ height: 20, minWidth: 8 })).toBe('height: 20px; min-width: 8px;');
		expect(resolveCharRollScrollStyleString(-30)).toBe('transform: translateY(-30px);');
	});

	test('resolves render-ready display items', () => {
		const charSetArray = getCharRollCharSetArray(resolveCharRollCharSet('number'));
		const items = resolveCharRollDisplayItems({
			displayChars: ['2', ','],
			charSetArray,
			animationProgress: [0.5, 0],
			startIndexes: [0, 0],
			targetIndexes: [2, 0],
			charStarted: [true, true],
			isAnimating: true,
			height: 10
		});

		expect(items[0].meta.displayChar).toBe('1');
		expect(items[0].renderIndexes.length).toBe(31);
		expect(items[0].charHeightStyle).toEqual({ height: 10 });
		expect(items[0].rollItemStyle).toEqual({ height: 10, minWidth: 6 });
		expect(items[0].scrollStyleString).toBe('transform: translateY(-110px);');
		expect(items[1].meta.inCharSet).toBe(false);
		expect(items[1].directStyleString).toBe('height: 10px; min-width: 3px;');
	});

	test('resolves aggregate render derivations', () => {
		const options = resolveCharRollStateOptions({
			animationProgress: [1, 1],
			charStarted: [true, true],
			displayChars: ['1', '2'],
			props: {
				bg: 'theme',
				charClass: 'char',
				fontSize: 'lg',
				fontWeight: 'medium',
				gap: '2',
				height: 20,
				injClass: 'custom',
				radius: 'lg'
			},
			startIndexes: [1, 2],
			targetIndexes: [1, 2]
		});
		const state = resolveCharRollDerived(options);

		expect(options).toMatchObject({ animationProgress: [1, 1], displayChars: ['1', '2'], height: 20 });
		expect(state.charSetValue).toBe('0123456789');
		expect(state.charSetArray).toHaveLength(10);
		expect(state.rootClass).toBe('inline-flex items-center gap-2 text-lg font-medium custom');
		expect(state.charClassName).toBe('relative overflow-hidden rounded-lg bg-primary/10 dark:bg-dark/10 char');
		expect(state.scrollListClass).toBe('flex flex-col items-center justify-center transition-none');
		expect(state.rollItemClass).toBe('flex items-center justify-center');
		expect(state.directClass).toBe('flex items-center justify-center');
		expect(state.charHeightStyleString).toBe('height: 20px;');
		expect(state.charHeightStyleValue).toEqual({ height: 20 });
		expect(state.displayItems).toHaveLength(2);
		expect(state.displayItems[1].meta.displayChar).toBe('2');
	});

	test('resolves animation actions without owning timers', () => {
		const charSetArray = getCharRollCharSetArray(resolveCharRollCharSet('number'));
		expect(resolveCharRollStartAction({ isAnimating: false, now: 1_000 })).toEqual({
			shouldStart: true,
			nextAnimating: true,
			startTime: 1_000
		});
		expect(resolveCharRollStartAction({ isAnimating: true, now: 1_000 })).toEqual({
			shouldStart: false,
			nextAnimating: false,
			startTime: 1_000
		});
		expect(
			resolveCharRollFrameAction({
				charCount: 1,
				delay: 0,
				displayChars: ['2'],
				duration: 100,
				easing: (progress) => progress,
				loop: true,
				loopInterval: 300,
				now: 1_100,
				stagger: 0,
				startTime: 1_000,
				targetIndexes: [2],
				value: 2
			})
		).toEqual({
			allComplete: true,
			animationProgress: [1],
			charStarted: [true],
			changeValue: '2',
			completeCharStarted: [true],
			completeStartIndexes: [2],
			elapsed: 100,
			loopDelayMs: 300,
			nextAnimating: false,
			shouldComplete: true,
			shouldContinue: false,
			shouldScheduleLoop: true
		});
		expect(resolveCharRollResetAction({ displayChars: ['1', '2'], rafActive: true })).toEqual({
			animationProgress: [0, 0],
			charStarted: [false, false],
			nextAnimating: false,
			shouldCancelFrame: true
		});
		expect(
			resolveCharRollPauseAction({
				displayChars: ['2'],
				animationProgress: [0.5],
				startIndexes: [0],
				targetIndexes: [2],
				charSetArray,
				rafActive: true
			})
		).toEqual({
			animationProgress: [0],
			nextAnimating: false,
			shouldCancelFrame: true,
			startIndexes: [1]
		});
		expect(resolveCharRollValueChangeAction({ value: 12, previousValue: '10', initialized: true, autoStart: true })).toEqual({
			formattedValue: '12',
			nextPreviousValue: '12',
			shouldRestart: true,
			shouldUpdateDisplay: true
		});
		expect(resolveCharRollValueChangeAction({ value: 10, previousValue: '10', initialized: true, autoStart: true })).toEqual({
			formattedValue: '10',
			nextPreviousValue: '10',
			shouldRestart: false,
			shouldUpdateDisplay: false
		});
	});
});

describe('time picker derived', () => {
	test('resolves days, padding, ranges and formatted output', () => {
		expect(resolveTimePickerInitialVisible(undefined)).toBe(false);
		expect(resolveTimePickerInitialVisible(true)).toBe(true);
		expect(resolveTimePickerUsePopup(null)).toBe(false);
		expect(resolveTimePickerUsePopup({})).toBe(true);
		expect(resolveTimePickerPopupConfig(null)).toEqual({ popupProps: {} });
		expect(resolveTimePickerPopupConfig({ size: 60 })).toEqual({ popupProps: { size: 60 } });
		expect(getTimePickerDayCount('2024', '02')).toBe(29);
		expect(padTimePickerValue(7)).toBe('07');
		expect(createTimePickerRangeData(1, 5, 2)).toEqual([{ label: '01' }, { label: '03' }, { label: '05' }]);
		expect(resolveTimePickerNowSnapshot(new Date(2024, 1, 3, 4, 5, 6))).toEqual({
			YYYY: '2024',
			MM: '02',
			DD: '03',
			hh: '04',
			mm: '05',
			ss: '06',
			yearNumber: 2024
		});
		expect(resolveTimePickerType('bad')).toBe('YYYYMMDDhhmmss');
		expect(resolveTimePickerColumnVisibility('YYYYMMDDhh')).toEqual({
			year: true,
			month: true,
			day: true,
			hour: true,
			minute: false,
			second: false
		});
		expect(resolveTimePickerYearData({ yearRange: [2020, 2022], currentYear: 2024 })).toEqual([
			{ label: '2020' },
			{ label: '2021' },
			{ label: '2022' }
		]);
		expect(resolveTimePickerMonthData([3, 5])).toEqual([{ label: '03' }, { label: '04' }, { label: '05' }]);
		expect(resolveTimePickerHourData([22, 23])).toEqual([{ label: '22' }, { label: '23' }]);
		expect(resolveTimePickerMinuteData({ minuteRange: [0, 10], minuteStep: 5 })).toEqual([
			{ label: '00' },
			{ label: '05' },
			{ label: '10' }
		]);
		expect(resolveTimePickerSecondData({ secondRange: [50, 55], secondStep: 5 })).toEqual([{ label: '50' }, { label: '55' }]);
		expect(resolveTimePickerDayData({ year: '2024', month: '02' })).toHaveLength(29);
		expect(
			resolveTimePickerSelectedDayData({
				currentTime: resolveTimePickerNowSnapshot(new Date(2024, 0, 1, 0, 0, 0)),
				yearData: [{ label: '2023' }, { label: '2024' }],
				monthData: [{ label: '01' }, { label: '02' }],
				yearIndex: 1,
				monthIndex: 1
			})
		).toHaveLength(29);
		expect(
			resolveTimePickerSelectedDayData({
				currentTime: resolveTimePickerNowSnapshot(new Date(2024, 3, 1, 0, 0, 0)),
				yearData: [],
				monthData: [],
				yearIndex: -1,
				monthIndex: -1
			})
		).toHaveLength(30);
		expect(resolveTimePickerDayColumnRefresh({ reason: 'year', isTouch: true, yearLabel: '2024', monthLabel: '02' })).toEqual({
			shouldRefresh: true,
			dayData: resolveTimePickerDayData({ year: '2024', month: '02' }),
			dayIndex: 0
		});
		expect(resolveTimePickerDayColumnRefresh({ reason: 'year', isTouch: true, yearLabel: '2024', monthLabel: '03' })).toEqual({
			shouldRefresh: false,
			dayData: [],
			dayIndex: 0
		});
		expect(resolveTimePickerDayColumnRefresh({ reason: 'month', isTouch: true, yearLabel: '2024', monthLabel: '04' }).dayData).toHaveLength(
			30
		);
		const scrollCurrentTime = resolveTimePickerNowSnapshot(new Date(2024, 0, 1, 0, 0, 0));
		const yearScrollAction = resolveTimePickerYearScrollAction({
			currentTime: scrollCurrentTime,
			index: 1,
			isTouch: true,
			yearData: [{ label: '2023' }, { label: '2024' }],
			monthData: [{ label: '02' }, { label: '03' }],
			monthIndex: 0
		});
		expect(yearScrollAction.nextYearIndex).toBe(1);
		expect(yearScrollAction.refresh.dayData).toHaveLength(29);
		const monthScrollAction = resolveTimePickerMonthScrollAction({
			currentTime: scrollCurrentTime,
			index: 1,
			isTouch: true,
			yearData: [{ label: '2024' }],
			monthData: [{ label: '02' }, { label: '04' }],
			yearIndex: 0
		});
		expect(monthScrollAction.nextMonthIndex).toBe(1);
		expect(monthScrollAction.refresh.dayData).toHaveLength(30);
		expect(
			resolveTimePickerYearScrollAction({ currentTime: scrollCurrentTime, index: 0, yearData: [], monthData: [], monthIndex: 0 }).refresh
				.shouldRefresh
		).toBe(false);
		expect(resolveTimePickerMaxShowRows(undefined, 3, 7)).toBe(7);
		expect(resolveTimePickerTransitionDistance({ maxShowRows: 5, showTips: true })).toBe(313);
		expect(resolveTimePickerInlineHeight({ viewportHeight: 800, height: 25 })).toBe(200);
		expect(resolveTimePickerInlineHeightStyleValue({ viewportHeight: 800, height: 25 })).toEqual({ height: '200px' });
		expect(resolveTimePickerInlineHeightStyleString({ viewportHeight: 800, height: 25 })).toBe('height:200px');
		expect(resolveTimePickerContentStyleValue({ usePopup: true, viewportHeight: 800, height: 25 })).toBeUndefined();
		expect(resolveTimePickerContentStyleString({ usePopup: true, viewportHeight: 800, height: 25 })).toBe('');
		expect(resolveTimePickerContentStyleValue({ usePopup: false, viewportHeight: 800, height: 25 })).toEqual({ height: '200px' });
		expect(resolveTimePickerContentStyleString({ usePopup: false, viewportHeight: 800, height: 25 })).toBe('height:200px');
		expect(resolveTimePickerColumnStyleValue({ flex: 2 })).toEqual({ flex: 2 });
		expect(resolveTimePickerColumnStyleString({ flex: 3 })).toBe('flex:3');
		expect(resolveTimePickerHeaderClass()).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(resolveTimePickerCancelButtonClass()).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(resolveTimePickerConfirmButtonClass()).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(resolveTimePickerTipsClass()).toBe(
			'flex h-8 items-center justify-around gap-1 bg-bg-surface text-center text-sm leading-8 text-black/60 dark:bg-bg-surface-dark dark:text-white/60'
		);
		expect(resolveTimePickerTipItemClass()).toBe('px-2');
		expect(resolveTimePickerContentClass()).toBe('flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark');
		expect(resolveTimePickerColumnRootClass()).toBe('truncate');
		expect(resolveTimePickerTipColumnStyleValue({ flex: 2, align: 'right' })).toEqual({ flex: 2, textAlign: 'right' });
		expect(resolveTimePickerTipColumnStyleValue({})).toEqual({ flex: 1 });
		expect(resolveTimePickerTipColumnStyleString({ flex: 2, align: 'center' })).toBe('flex:2;text-align:center');
		expect(resolveTimePickerInitialIndex({ data: [{ label: '01' }, { label: '02' }], initValue: '', currentValue: '02' })).toBe(1);
		expect(resolveTimePickerSafeIndex(-1)).toBe(0);
		expect(
			resolveTimePickerStateOptions({
				currentTime: resolveTimePickerNowSnapshot(new Date(2024, 1, 3, 4, 5, 6)),
				currentDayData: [{ label: '03' }],
				dayInitIndex: 2,
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title',
					defaultYear: 'Year',
					defaultMonth: 'Month',
					defaultDay: 'Day',
					defaultHour: 'Hour',
					defaultMinute: 'Minute',
					defaultSecond: 'Second'
				},
				props: {
					title: 'Choose time',
					type: 'YYYYMMDD',
					yearRange: [2020, 2024],
					monthRange: [1, 3],
					dayProps: { showRow: 7 },
					popup: null
				},
				viewportHeight: 900
			})
		).toMatchObject({
			currentDayData: [{ label: '03' }],
			dayInitIndex: 2,
			height: undefined,
			popup: null,
			title: 'Choose time',
			type: 'YYYYMMDD',
			viewportHeight: 900,
			yearRange: [2020, 2024]
		});
		expect(
			resolveTimePickerTexts({
				title: 'Choose time',
				defaults: {
					defaultCancel: 'Cancel',
					defaultConfirm: 'Confirm',
					defaultTitle: 'Title',
					defaultYear: 'Year',
					defaultMonth: 'Month',
					defaultDay: 'Day',
					defaultHour: 'Hour',
					defaultMinute: 'Minute',
					defaultSecond: 'Second'
				}
			})
		).toEqual({
			cancelText: 'Cancel',
			confirmText: 'Confirm',
			title: 'Choose time',
			yearText: 'Year',
			monthText: 'Month',
			dayText: 'Day',
			hourText: 'Hour',
			minuteText: 'Minute',
			secondText: 'Second'
		});
		expect(resolveTimePickerDefaultOutFormat('YYYYMMDDhhmmss')).toBe('YYYY-MM-DD hh:mm:ss');
		expect(formatTimePickerValue('YYYY-MM-DD hh:mm:ss', { YYYY: '2024', MM: '02', DD: '03', hh: '04', mm: '05', ss: '06' })).toBe(
			'2024-02-03 04:05:06'
		);
		expect(resolveTimePickerCancelAction()).toEqual({ nextVisible: false, shouldCancel: true, shouldClose: true });
		expect(resolveTimePickerCloseAction()).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolveTimePickerCloseAction({ emitClose: false })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: false });
		expect(resolveTimePickerCloseAction({ shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(
			resolveTimePickerConfirmValue({
				type: 'YYYYMMDDhhmmss',
				yearData: [{ label: '2024' }],
				monthData: [{ label: '02' }],
				dayData: [{ label: '03' }],
				hourData: [{ label: '04' }],
				minuteData: [{ label: '05' }],
				secondData: [{ label: '06' }],
				yearIndex: 0,
				monthIndex: 0,
				dayIndex: 0,
				hourIndex: 0,
				minuteIndex: 0,
				secondIndex: 0
			})
		).toEqual({
			timeStr: '2024-02-03 04:05:06',
			outData: { YYYY: '2024', MM: '02', DD: '03', hh: '04', mm: '05', ss: '06' }
		});
		expect(
			resolveTimePickerConfirmAction({
				type: 'YYYYMMDDhhmmss',
				yearData: [{ label: '2024' }],
				monthData: [{ label: '02' }],
				dayData: [{ label: '03' }],
				hourData: [{ label: '04' }],
				minuteData: [{ label: '05' }],
				secondData: [{ label: '06' }],
				yearIndex: 0,
				monthIndex: 0,
				dayIndex: 0,
				hourIndex: 0,
				minuteIndex: 0,
				secondIndex: 0
			})
		).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldConfirm: true,
			timeStr: '2024-02-03 04:05:06',
			outData: { YYYY: '2024', MM: '02', DD: '03', hh: '04', mm: '05', ss: '06' }
		});
	});

	test('resolves render-ready time picker state', () => {
		const currentTime = resolveTimePickerNowSnapshot(new Date(2024, 1, 3, 4, 5, 6));
		const state = resolveTimePickerDerived({
			currentTime,
			defaults: {
				defaultCancel: 'Cancel',
				defaultConfirm: 'Confirm',
				defaultTitle: 'Title',
				defaultYear: 'Year',
				defaultMonth: 'Month',
				defaultDay: 'Day',
				defaultHour: 'Hour',
				defaultMinute: 'Minute',
				defaultSecond: 'Second'
			},
			title: 'Choose time',
			type: 'YYYYMMDDhhmm',
			yearRange: [2023, 2025],
			monthRange: [2, 3],
			hourRange: [4, 6],
			minuteRange: [0, 10],
			minuteStep: 5,
			secondRange: [50, 55],
			secondStep: 5,
			initYear: '2024',
			initMonth: '03',
			initDay: '10',
			initHour: '05',
			initMinute: '05',
			initSecond: '55',
			yearProps: { flex: 2, align: 'right', showRow: 3 },
			dayProps: { showRow: 7 },
			viewportHeight: 800,
			height: 25,
			popup: null
		});

		expect(state.typeInner).toBe('YYYYMMDDhhmm');
		expect(state.usePopup).toBe(false);
		expect(state.popupConfig).toEqual({ popupProps: {} });
		expect(state.texts.title).toBe('Choose time');
		expect(state.inlineHeightStyleValue).toEqual({ height: '200px' });
		expect(state.inlineHeightStyleString).toBe('height:200px');
		expect(state.contentStyleValue).toEqual({ height: '200px' });
		expect(state.contentStyleString).toBe('height:200px');
		expect(state.headerClass).toBe(
			'flex items-center justify-between border-b border-black/10 bg-bg-surface dark:border-white/20 dark:bg-bg-surface-dark'
		);
		expect(state.cancelButtonClass).toBe('h-10 cursor-pointer px-4 leading-10 text-black/60 dark:text-white/60');
		expect(state.confirmButtonClass).toBe('text-primary dark:text-dark h-10 cursor-pointer px-4 leading-10');
		expect(state.tipsClass).toBe(
			'flex h-8 items-center justify-around gap-1 bg-bg-surface text-center text-sm leading-8 text-black/60 dark:bg-bg-surface-dark dark:text-white/60'
		);
		expect(state.tipItemClass).toBe('px-2');
		expect(state.contentClass).toBe('flex items-center justify-around gap-1 bg-bg-surface dark:bg-bg-surface-dark');
		expect(state.transitionDistance).toBe(297);
		expect(state.columnItems.map((item) => item.key)).toEqual(['year', 'month', 'day', 'hour', 'minute']);
		expect(state.tipItems).toHaveLength(5);
		expect(state.columns.year).toMatchObject({
			data: [{ label: '2023' }, { label: '2024' }, { label: '2025' }],
			initIndex: 1,
			rootClass: 'truncate',
			safeInitIndex: 1,
			styleValue: { flex: 2 },
			styleString: 'flex:2',
			tipStyleValue: { flex: 2, textAlign: 'right' },
			tipStyleString: 'flex:2;text-align:right',
			tipText: 'Year',
			visible: true
		});
		expect(state.columns.month.data).toEqual([{ label: '02' }, { label: '03' }]);
		expect(state.columns.day.initIndex).toBe(9);
		expect(state.columns.hour.data).toEqual([{ label: '04' }, { label: '05' }, { label: '06' }]);
		expect(state.columns.minute.data).toEqual([{ label: '00' }, { label: '05' }, { label: '10' }]);
		expect(state.columns.second.visible).toBe(false);
		expect(state.safeInitSecondIndex).toBe(1);
	});
});

describe('stepper derived', () => {
	test('resolves radius classes for horizontal and vertical layouts', () => {
		expect(resolveStepperInitialValue()).toBe(10);
		expect(resolveStepperInitialValue(null, 2)).toBe(2);
		expect(resolveStepperInitialValue(12)).toBe(12);
		expect(resolveStepperRadiusClass()).toBe('rounded-(--radius-small)');
		expect(resolveStepperRadiusClass({ vertical: true })).toBe('rounded-2xl');
		expect(resolveStepperRadiusClass({ radius: 'full' })).toBe('rounded-full');
		expect(resolveStepperRadiusClass({ radius: 'full', vertical: true })).toBe('rounded-2xl');
	});

	test('resolves tone classes from theme and number highlight state', () => {
		expect(resolveStepperButtonToneClass()).toBe('bg-primary/5 dark:bg-dark/10');
		expect(resolveStepperButtonToneClass({ theme: false })).toBe('bg-bg-highlight dark:bg-bg-highlight-dark');
		expect(resolveStepperButtonToneClass({ numberHighlight: true })).toBe('');
		expect(resolveStepperNumberToneClass({ numberHighlight: true })).toBe('bg-primary/5 text-primary dark:bg-dark/10 dark:text-dark');
		expect(resolveStepperNumberToneClass({ numberHighlight: true, theme: false })).toBe('bg-bg-highlight dark:bg-bg-highlight-dark');
		expect(resolveStepperIconClass()).toBe('text-primary dark:text-dark');
		expect(resolveStepperIconClass({ numberHighlight: true })).toBe('text-black dark:text-white');
	});

	test('resolves classes, disabled states and display values', () => {
		expect(resolveStepperRootClass({ radiusClass: 'rounded-md', padding: false, vertical: true, injClassOut: 'outer' })).toBe(
			'inline-flex items-center bg-black/5 dark:bg-white/5 rounded-md p-0 overflow-hidden outer flex-col-reverse'
		);
		expect(resolveStepperButtonClass({ radiusClass: 'rounded-md', vertical: false, injClassBtn: 'btn', buttonToneClass: 'tone' })).toBe(
			'w-8 h-8 rounded-md flex flex-col items-center btn justify-center tone'
		);
		expect(resolveStepperNumberClass({ radiusClass: 'rounded-md', injClassNum: 'num', numberToneClass: 'tone' })).toBe(
			'h-8 px-4 rounded-md flex flex-col items-center num justify-center tone'
		);
		expect(resolveStepperLoadingClass('rounded-md')).toBe('h-8 px-2 rounded-md flex flex-col items-center justify-center');
		expect(resolveStepperDecreaseDisabled({ value: 0, min: 0 })).toBe(true);
		expect(resolveStepperIncreaseDisabled({ value: 10, max: 10 })).toBe(true);
		expect(resolveStepperCanDecrease({ value: 2, min: 0, async: false })).toBe(true);
		expect(resolveStepperCanIncrease({ value: 10, max: 10, async: false })).toBe(false);
		expect(resolveStepperDisabledIconClass(true)).toBe('opacity-20');
		expect(resolveStepperWidthStyleValue(24)).toEqual({ width: '24px' });
		expect(resolveStepperWidthStyleString(24)).toBe('width: 24px;');
		expect(resolveStepperDisplayValue(1.234, 2)).toBe('1.23');
		const options = resolveStepperStateOptions({
			value: 1.234,
			props: { min: 0, max: 10, decimal: 2, radius: 'md', width: 24, injClassOut: 'outer', injClassBtn: 'btn', injClassNum: 'num' }
		});
		expect(options).toMatchObject({ value: 1.234, radius: 'md', width: 24 });
		expect(resolveStepperDerived(options)).toMatchObject({
			radiusClass: 'rounded-md',
			rootClass: 'inline-flex items-center bg-black/5 dark:bg-white/5 rounded-md p-1 overflow-hidden outer flex-row',
			buttonClass: 'w-8 h-8 rounded-md flex flex-col items-center btn justify-center bg-primary/5 dark:bg-dark/10',
			numberClass: 'h-8 px-4 rounded-md flex flex-col items-center num justify-center',
			loadingClass: 'h-8 px-2 rounded-md flex flex-col items-center justify-center',
			iconClass: 'text-primary dark:text-dark',
			decreaseDisabled: false,
			increaseDisabled: false,
			decreaseIconClass: '',
			increaseIconClass: '',
			numberStyleValue: { width: '24px' },
			numberStyleString: 'width: 24px;',
			displayValue: '1.23'
		});
	});

	test('calculates bounded increase and decrease values', () => {
		expect(getStepperDecreaseValue({ value: 3, min: 0, step: 2 })).toBe(1);
		expect(getStepperDecreaseValue({ value: 1, min: 0, step: 2 })).toBe(0);
		expect(getStepperIncreaseValue({ value: 8, max: 10, step: 2 })).toBe(10);
		expect(getStepperIncreaseValue({ value: 9, max: 10, step: 2 })).toBe(10);
		expect(resolveStepperStepAction({ type: 'decrease', value: 3, min: 0, step: 2 })).toEqual({
			nextValue: 1,
			shouldChange: true
		});
		expect(resolveStepperStepAction({ type: 'decrease', value: 0, min: 0, step: 2 })).toEqual({
			nextValue: 0,
			shouldChange: false
		});
		expect(resolveStepperStepAction({ type: 'increase', value: 8, max: 10, step: 2 })).toEqual({
			nextValue: 10,
			shouldChange: true
		});
		expect(resolveStepperStepAction({ type: 'increase', value: 8, max: 10, step: 2, async: true })).toEqual({
			nextValue: 8,
			shouldChange: false
		});
	});
});

describe('steps derived', () => {
	test('resolves radius, bar and text classes', () => {
		expect(resolveStepsMeasuredClientWidth()).toBe(0);
		expect(resolveStepsMeasuredClientWidth({ clientWidth: 320 })).toBe(320);
		expect(resolveStepsMeasuredClientHeights([undefined, { clientHeight: 24 }, { clientHeight: 0 }])).toEqual([0, 24, 0]);
		const radiusClass = resolveStepsRadiusClass('lg');
		expect(radiusClass).toBe('rounded-lg');
		expect(resolveStepsLineClass(true)).toBe('absolute transition-all bg-primary dark:bg-dark');
		expect(resolveStepsBarToneClass({ index: 1, current: 2, hasText: true })).toBe(
			'border-primary dark:border-dark bg-primary dark:bg-dark text-text-on-primary dark:text-text-on-dark'
		);
		expect(resolveStepsBarClass({ index: 2, current: 1, radiusClass, barBorder: false, hasText: true, large: true })).toContain(
			'box-border h-7.5 w-7.5 border-black/30 text-black/30'
		);
		expect(resolveStepsBarClass({ index: 0, current: 1, radiusClass, barBorder: false, large: true })).toContain('!border-transparent');
		expect(resolveStepsTitleClass({ index: 2, current: 1, horizontal: true })).toContain(
			'text-center text-sm font-medium transition-all duration-300 opacity-30'
		);
		expect(resolveStepsDescClass({ index: 2, current: 1 })).toBe('text-xs transition-all duration-300 opacity-30');
		expect(resolveStepsLineAxisClass(true)).toBe('w-0.5');
		expect(resolveStepsLineAxisClass(false)).toBe('h-0.5');
		expect(resolveStepsItemLineClass({ finished: true, vertical: false })).toBe('h-0.5 relative transition-all bg-primary dark:bg-dark');
		expect(resolveStepsItemLineClass({ finished: false, vertical: true })).toBe(
			'w-0.5 absolute transition-all bg-black/30 dark:bg-white/30'
		);
		expect(resolveStepsItemLineClass({ finished: false, hasBar: false, index: 2, total: 3, vertical: false })).toBe(
			'h-0.5 relative transition-all bg-black/30 dark:bg-white/30 w-px'
		);
		expect(resolveStepsContentClass(true)).toBe('pr-4');
		expect(resolveStepsContentClass(false)).toBe('text-center');
		expect(resolveStepsVerticalRootClass()).toBe('flex flex-col justify-between');
		expect(resolveStepsHorizontalRootClass()).toBe('relative mt-4 flex justify-between');
		expect(resolveStepsVerticalItemClass()).toBe('relative flex items-center py-3');
		expect(resolveStepsHorizontalItemClass()).toBe('flex flex-1 flex-col items-center space-y-2');
		expect(resolveStepsBarIconClass()).toBe('m-auto h-4 w-4');
		expect(resolveStepsBarImageClass()).toBe('object-cover');
		expect(resolveStepsBarTextClass()).toBe('m-auto mt-1 h-5 w-5 text-center text-sm leading-5');
	});

	test('resolves content selection and layout values', () => {
		const inject = () => 'content';
		const item = {
			step: {
				title: 'Step',
				desc: 'Default desc',
				bar: { type: 'string' as const, content: '1' }
			},
			finishStep: {
				title: 'Done',
				desc: 'Done desc',
				bar: { type: 'icon' as const, content: { name: 'ri-check-line' } },
				injComponent: inject
			}
		};

		expect(resolveStepsCompleted(0, 2)).toBe(true);
		expect(resolveStepsHasBar(item)).toBe(true);
		expect(resolveStepsBar(item, true)).toEqual({ type: 'icon', content: { name: 'ri-check-line' } });
		expect(resolveStepsTypedBar(item, 'string', true)).toEqual({ type: 'string', content: '1' });
		expect(
			resolveStepsTypedBar({ step: {}, finishStep: { bar: { type: 'icon', content: { name: 'ri-check-line' } } } }, 'icon', {
				allowFinishFallback: false
			})
		).toBeUndefined();
		expect(resolveStepsIconContent(resolveStepsTypedBar(item, 'icon', true))).toEqual({ name: 'ri-check-line' });
		expect(resolveStepsIconRenderProps({ type: 'icon', content: { name: 'ri-check-line', children: 'hidden' } })).toEqual({
			name: 'ri-check-line'
		});
		expect(resolveStepsBarContentState()).toEqual({ kind: 'none' });
		expect(resolveStepsBarContentState({ type: 'icon', content: { name: 'ri-check-line', children: 'hidden' } })).toEqual({
			kind: 'icon',
			iconProps: { name: 'ri-check-line' }
		});
		expect(resolveStepsBarContentState({ type: 'image', content: 'step.png' })).toEqual({ kind: 'image', src: 'step.png' });
		expect(resolveStepsBarContentState({ type: 'string', content: '2' })).toEqual({ kind: 'text', text: '2' });
		expect(resolveStepsTitle(item, true)).toBe('Done');
		expect(resolveStepsDesc(item, true)).toBe('Done desc');
		expect(resolveStepsInject(item, true)).toBe(inject);
		expect(resolveStepsItemDerived({ item, index: 0, current: 2 })).toEqual({
			completed: true,
			current: false,
			hasBar: true,
			bar: { type: 'icon', content: { name: 'ri-check-line' } },
			title: 'Done',
			desc: 'Done desc',
			inject
		});
		expect(resolveStepsItemsDerived({ steps: [item], current: 2 })).toHaveLength(1);
		expect(resolveStepsItemsDerived({ steps: [item], current: 2 })[0]?.completed).toBe(true);
		expect(resolveStepsItemViewStateList({ steps: [item], current: 2 })).toEqual([
			{
				barContentState: { kind: 'icon', iconProps: { name: 'ri-check-line' } },
				index: 0,
				item,
				itemState: {
					completed: true,
					current: false,
					hasBar: true,
					bar: { type: 'icon', content: { name: 'ri-check-line' } },
					title: 'Done',
					desc: 'Done desc',
					inject
				}
			}
		]);
		expect(resolveStepsBarWrapperClass({ hasBar: true, vertical: true })).toBe('my-4 mr-10 pl-4');
		expect(resolveStepsLinePositionedClass({ finished: true, vertical: false })).toBe('relative transition-all bg-primary dark:bg-dark');
		expect(resolveStepsLineStyleValue({ hasBar: true, height: 80, index: 0, total: 2, vertical: true })).toEqual({
			height: '50px',
			top: '42px',
			left: '30px'
		});
		expect(resolveStepsLineStyleValue({ hasBar: false, width: 200, index: 0, total: 2 })).toEqual({
			width: '91px',
			top: '0px',
			left: 'calc(50% + 5px)'
		});
		expect(resolveStepsItemLineStyleValue({ item, index: 0, current: 2, height: 80, total: 2, vertical: true })).toEqual({
			height: '50px',
			top: '42px',
			left: '30px'
		});
		expect(resolveStepsItemLineStyleString({ item: { step: { title: 'Plain' } }, index: 0, current: 1, width: 200, total: 2 })).toBe(
			'width:91px;top:0px;left:calc(50% + 5px)'
		);
		expect(resolveStepsIconBoxStyleValue(false)).toEqual({ left: 'calc(50% - 15px)', height: '30px', width: '30px' });
		expect(resolveStepsDotStyleValue(true)).toEqual({ top: '16px' });
		expect(resolveStepsStyleString({ top: '1px', left: '2px' })).toBe('top:1px;left:2px');
		expect(resolveStepsLineStyleString({ hasBar: true, height: 80, index: 0, total: 2, vertical: true })).toBe(
			'height:50px;top:42px;left:30px'
		);
		expect(resolveStepsIconBoxStyleString(false)).toBe('left:calc(50% - 15px);height:30px;width:30px');
	});

	test('resolves render-ready steps state from measured values', () => {
		const steps = [
			{
				step: {
					title: 'Start',
					desc: 'Start desc',
					bar: { type: 'string' as const, content: '1' }
				},
				finishStep: {
					title: 'Done',
					desc: 'Done desc',
					bar: { type: 'icon' as const, content: { name: 'ri-check-line' } }
				}
			},
			{
				step: {
					title: 'Next',
					desc: 'Next desc'
				}
			}
		];
		const verticalOptions = resolveStepsStateOptions({
			props: { steps, current: 2, radius: 'lg', barBorder: false, vertical: true },
			heightList: [80, 64]
		});
		expect(verticalOptions).toMatchObject({ current: 2, radius: 'lg', vertical: true, heightList: [80, 64] });
		const verticalState = resolveStepsDerived(verticalOptions);

		expect(verticalState.verticalRootClass).toBe('flex flex-col justify-between');
		expect(verticalState.horizontalRootClass).toBe('relative mt-4 flex justify-between');
		expect(verticalState.radiusClass).toBe('rounded-lg');
		expect(verticalState.items[0]?.barContentState).toEqual({ kind: 'icon', iconProps: { name: 'ri-check-line' } });
		expect(verticalState.items[0]?.barWrapperClass).toBe('my-4 mr-10 pl-4');
		expect(verticalState.items[0]?.lineClass).toBe('w-0.5 absolute transition-all bg-primary dark:bg-dark');
		expect(verticalState.items[0]?.lineStyle).toEqual({ height: '50px', top: '42px', left: '30px' });
		expect(verticalState.items[0]?.lineStyleString).toBe('height:50px;top:42px;left:30px');
		expect(verticalState.items[0]?.barClass).toContain(
			'box-border h-7.5 w-7.5 border-primary dark:border-dark text-primary dark:text-dark'
		);
		expect(verticalState.items[0]?.barStyle).toEqual({ top: '12px', height: '30px', width: '30px' });
		expect(verticalState.items[0]?.barIconClass).toBe('m-auto h-4 w-4');
		expect(verticalState.items[0]?.barImageClass).toBe('object-cover');
		expect(verticalState.items[0]?.barTextClass).toBe('m-auto mt-1 h-5 w-5 text-center text-sm leading-5');
		expect(verticalState.items[0]?.verticalItemClass).toBe('relative flex items-center py-3');
		expect(verticalState.items[0]?.horizontalItemClass).toBe('flex flex-1 flex-col items-center space-y-2');
		expect(verticalState.items[0]?.contentClass).toBe('pr-4');
		expect(verticalState.items[0]?.titleClass).toBe('font-medium transition-all duration-300');
		expect(verticalState.items[1]?.barClass).toContain('h-2.5 w-2.5 border-primary dark:border-dark bg-primary dark:bg-dark');

		const horizontalOptions = resolveStepsStateOptions({ props: { steps, current: 1 }, width: 200 });
		expect(horizontalOptions).toMatchObject({ current: 1, width: 200 });
		const horizontalState = resolveStepsDerived(horizontalOptions);
		expect(horizontalState.items[0]?.lineStyle).toEqual({ width: '70px', top: '16px', left: 'calc(50% + 15px)' });
		expect(horizontalState.items[0]?.barStyle).toEqual({ left: 'calc(50% - 15px)', height: '30px', width: '30px' });
		expect(horizontalState.items[0]?.contentClass).toBe('text-center');
		expect(horizontalState.items[0]?.titleClass).toContain('text-center text-sm');
		expect(horizontalState.items[1]?.lineStyle).toEqual({ width: '0', top: '0px', left: 'calc(50% + 5px)' });
		expect(horizontalState.items[1]?.barStyleString).toBe('left:calc(50% - 5px);top:4px');
	});

	test('resolves measured height update state without DOM reads', () => {
		const currentHeights = [40, 52];
		expect(resolveStepsMeasuredHeightsState({ currentHeights, nextHeights: [40, 52] })).toEqual({
			shouldUpdate: false,
			heights: currentHeights
		});
		expect(resolveStepsMeasuredHeightsState({ currentHeights, nextHeights: [40, 52, 64] })).toEqual({
			shouldUpdate: true,
			heights: [40, 52, 64]
		});
		expect(resolveStepsMeasuredHeightsState({ currentHeights, nextHeights: [40, 56] })).toEqual({
			shouldUpdate: true,
			heights: [40, 56]
		});
		expect(resolveStepsMeasuredHeightItemState({ currentHeights, index: 1, height: 52 })).toEqual({
			shouldUpdate: false,
			heights: currentHeights
		});
		expect(resolveStepsMeasuredHeightItemState({ currentHeights, index: 1, height: 56 })).toEqual({
			shouldUpdate: true,
			heights: [40, 56]
		});
	});

	test('resolves measured width update state without DOM reads', () => {
		expect(resolveStepsMeasuredWidthState({ currentWidth: 240, measuredWidth: 240 })).toEqual({
			shouldUpdate: false,
			width: 240
		});
		expect(resolveStepsMeasuredWidthState({ currentWidth: 240, measuredWidth: 320 })).toEqual({
			shouldUpdate: true,
			width: 320
		});
	});
});

describe('skeleton derived', () => {
	test('resolves classes and pure random width selection', () => {
		const classes = resolveSkeletonClasses({
			type: 'p',
			width: 'full',
			height: '8',
			radius: 'lg',
			space: '2',
			effect: 'wave',
			bg: 'theme'
		});
		expect(classes.wrapperClass).toBe('skeleton-wave block  p-2');
		expect(classes.lineClass).toBe('skeleton-item w-full bg-primary/20 dark:bg-dark/20  h-8 rounded-lg');
		expect(classes.blockClass).toBe('skeleton-item flex flex-col justify-center bg-primary/20 dark:bg-dark/20  w-full  h-8 rounded-lg');
		expect(resolveSkeletonDisplayState('p')).toEqual({ showParagraph: true, showBlock: false, showIcon: false });
		expect(resolveSkeletonDisplayState('img')).toEqual({ showParagraph: false, showBlock: true, showIcon: true });
		expect(resolveSkeletonDisplayState('div')).toEqual({ showParagraph: false, showBlock: true, showIcon: false });
		expect(resolveSkeletonRandomValue({ random: 0.5 })).toBe(0.5);
		expect(resolveSkeletonRandomValue({ random: 2 })).toBe(1);
		expect(resolveSkeletonRandomValue({ random: -1 })).toBe(0);
		expect(resolveSkeletonRandomWidthClass(0)).toBe('w-1/2');
		expect(resolveSkeletonRandomWidthClass(0.999)).toBe('w-5/6');
		expect(resolveSkeletonRandomLineClass(0.999, classes.randomLineBaseClass)).toBe(
			'skeleton-item bg-primary/20 dark:bg-dark/20  h-8 rounded-lg w-5/6'
		);
		expect(resolveSkeletonParagraphClass()).toBe('flex flex-col space-y-2');
		expect(resolveSkeletonIconWrapClass()).toBe('m-auto');
		expect(resolveSkeletonIconSvgClass()).toBe('opacity-20');
		expect(resolveSkeletonParagraphLineCount(3)).toBe(2);
		expect(resolveSkeletonParagraphLineCount(0)).toBe(0);
		expect(resolveSkeletonParagraphLineIndexes(4)).toEqual([0, 1, 2]);
		expect(resolveSkeletonParagraphLineIndexes(0)).toEqual([]);
		expect(resolveSkeletonIconRatioStyle(0.6)).toBe('60%');
		expect(resolveSkeletonIconRatioStyleValue(0.6)).toEqual({ width: '60%' });
		expect(resolveSkeletonIconRatioStyleString(0.6)).toBe('width:60%');
		expect(resolveSkeletonAnimationCss()).toContain('@keyframes skeleton-wave');
		expect(resolveSkeletonAnimationCss()).toContain('.skeleton-breathe .skeleton-item');
	});

	test('resolves render-ready skeleton state', () => {
		const options = resolveSkeletonStateOptions({
			props: {
				type: 'img',
				width: '12',
				height: '8',
				radius: 'md',
				space: '2',
				lines: 4,
				iconRatio: 0.5,
				effect: 'breathe',
				bg: 'theme'
			},
			randomValue: 0.999
		});
		expect(options).toMatchObject({ type: 'img', width: '12', height: '8', randomValue: 0.999 });
		const state = resolveSkeletonDerived(options);

		expect(state.classes.wrapperClass).toBe('skeleton-breathe inline-block  p-2');
		expect(state.displayState).toEqual({ showParagraph: false, showBlock: true, showIcon: true });
		expect(state.paragraphClass).toBe('flex flex-col space-y-2');
		expect(state.iconWrapClass).toBe('m-auto');
		expect(state.iconSvgClass).toBe('opacity-20');
		expect(state.randomLineClass).toBe('skeleton-item bg-primary/20 dark:bg-dark/20  h-8 rounded-md w-5/6');
		expect(state.paragraphLineIndexes).toEqual([0, 1, 2]);
		expect(state.iconRatioStyleValue).toEqual({ width: '50%' });
		expect(state.iconRatioStyleString).toBe('width:50%');
		expect(state.iconSvg?.viewBox).toBe('0 0 24 24');
		expect(state.css).toContain('@keyframes skeleton-wave');
	});
});

describe('placeholder derived', () => {
	test('resolves placeholder classes with fallback values', () => {
		expect(resolvePlaceholderPyClass('2')).toBe(' py-2');
		expect(resolvePlaceholderHeightClass('24')).toBe(' h-24');
		expect(resolvePlaceholderRadiusClass('lg')).toBe('rounded-lg');
		expect(resolvePlaceholderRadiusClass()).toBe('rounded-(--radius-box)');
		expect(resolvePlaceholderShadowClass('md')).toBe(' shadow-md dark:shadow-white/10');

		const rootClass = resolvePlaceholderRootClass({ py: '8', height: '32', radius: 'xl', shadow: 'sm', injClass: 'custom-placeholder' });
		expect(rootClass).toContain('flex flex-col justify-center bg-black/5 dark:bg-white/5 text-center');
		expect(rootClass).toContain('h-32');
		expect(rootClass).toContain('py-8 rounded-xl shadow-sm dark:shadow-white/10 custom-placeholder');
		const options = resolvePlaceholderStateOptions({
			props: { py: '8', height: '32', radius: 'xl', shadow: 'sm', injClass: 'custom-placeholder' }
		});
		expect(options).toMatchObject({ py: '8', height: '32', radius: 'xl' });
		expect(resolvePlaceholderDerived(options)).toEqual({ rootClass });
	});
});

describe('signature derived', () => {
	test('resolves signature classes, styles and pure geometry', () => {
		expect(resolveSignatureRootClass('custom-signature')).toBe('flex flex-col gap-3 custom-signature');
		expect(resolveSignatureCanvasContainerClass({ radius: 'lg', canvasClass: 'custom-canvas' })).toBe(
			'relative w-full overflow-hidden border border-black/10 dark:border-white/10 rounded-lg custom-canvas'
		);
		expect(resolveSignatureCanvasClass('full')).toBe('absolute inset-0 cursor-crosshair touch-none rounded-full');
		expect(resolveSignatureButtonRowClass()).toBe('flex justify-end gap-3');
		expect(resolveSignatureContainerStyleValue({ aspectRatio: [4, 3], bgColor: '#ffffff' })).toEqual({
			aspectRatio: '4 / 3',
			backgroundColor: '#ffffff'
		});
		expect(resolveSignatureContainerStyleString({ aspectRatio: [4, 3], bgColor: '#ffffff' })).toBe(
			'aspect-ratio: 4 / 3; background-color: #ffffff;'
		);
		expect(resolveSignaturePointerPosition({ clientX: 30, clientY: 45, rectLeft: 10, rectTop: 15 })).toEqual({ x: 20, y: 30 });
		expect(resolveSignatureMeasuredSize()).toEqual({ width: 0, height: 0 });
		expect(resolveSignatureMeasuredSize({ width: 120, height: 40 })).toEqual({ width: 120, height: 40 });
		expect(resolveSignatureCanvasDrawOptions({ lineColor: '#123456', lineWidth: 5 })).toEqual({
			lineCap: 'round',
			lineJoin: 'round',
			lineWidth: 5,
			strokeStyle: '#123456'
		});
		expect(resolveSignatureCanvasSize({ width: 120, height: 40, dpr: 2 })).toEqual({
			pixelWidth: 240,
			pixelHeight: 80,
			cssWidth: '120px',
			cssHeight: '40px'
		});
		expect(resolveSignatureCanvasSetupState({ rect: { width: 120, height: 40 }, dpr: 2 })).toEqual({
			width: 120,
			height: 40,
			canvasSize: { pixelWidth: 240, pixelHeight: 80, cssWidth: '120px', cssHeight: '40px' },
			shouldSetup: true
		});
		expect(resolveSignatureClearPlan({ rect: { width: 120, height: 40 }, bgColor: '#eeeeee', emitClear: false })).toEqual({
			width: 120,
			height: 40,
			fillStyle: '#eeeeee',
			action: { nextHasDrawn: false, shouldClear: true, shouldEmitClear: false }
		});
		expect(resolveSignatureCanvasSetupState({ rect: { width: 0, height: 40 }, dpr: 2 }).shouldSetup).toBe(false);
		expect(resolveSignatureRotatedCanvasSize({ sourceWidth: 300, sourceHeight: 120, rotation: 90 })).toEqual({ width: 120, height: 300 });
		expect(resolveSignatureRotationRadians(180)).toBe(Math.PI);
		expect(resolveSignatureImageParams({ imageType: 'png', imageQuality: 0.5 })).toEqual({ mimeType: 'image/png', quality: undefined });
		expect(resolveSignatureImageParams({ imageType: 'jpeg', imageQuality: 0.5 })).toEqual({ mimeType: 'image/jpeg', quality: 0.5 });
		expect(resolveSignatureExportPlan({ sourceWidth: 300, sourceHeight: 120, rotation: 0, imageType: 'png', imageQuality: 0.5 })).toEqual({
			drawX: -150,
			drawY: -60,
			height: 120,
			mimeType: 'image/png',
			quality: undefined,
			radians: 0,
			shouldRotate: false,
			translateX: 150,
			translateY: 60,
			width: 300
		});
		expect(resolveSignatureExportPlan({ sourceWidth: 300, sourceHeight: 120, rotation: 90, imageType: 'jpeg', imageQuality: 0.5 })).toEqual(
			{
				drawX: -150,
				drawY: -60,
				height: 300,
				mimeType: 'image/jpeg',
				quality: 0.5,
				radians: Math.PI / 2,
				shouldRotate: true,
				translateX: 60,
				translateY: 150,
				width: 120
			}
		);
		expect(resolveSignatureTexts({ clearText: '', defaults: { clearText: 'Clear', confirmText: 'Confirm' } })).toEqual({
			clearText: 'Clear',
			confirmText: 'Confirm'
		});
		expect(resolveSignatureTexts({ confirmText: 'OK', defaults: { clearText: 'Clear', confirmText: 'Confirm' } })).toEqual({
			clearText: 'Clear',
			confirmText: 'OK'
		});
		const signatureOptions = resolveSignatureStateOptions({
			defaults: { clearText: 'Clear', confirmText: 'Confirm' },
			props: {
				aspectRatio: [4, 3],
				bgColor: '#ffffff',
				canvasClass: 'custom-canvas',
				clearText: 'Reset',
				injClass: 'custom-signature',
				radius: 'lg'
			}
		});
		expect(resolveSignatureDerived(signatureOptions)).toMatchObject({
			texts: { clearText: 'Reset', confirmText: 'Confirm' },
			rootClass: 'flex flex-col gap-3 custom-signature',
			canvasContainerClass: 'relative w-full overflow-hidden border border-black/10 dark:border-white/10 rounded-lg custom-canvas',
			canvasClass: 'absolute inset-0 cursor-crosshair touch-none rounded-lg',
			buttonRowClass: 'flex justify-end gap-3',
			containerStyleValue: { aspectRatio: '4 / 3', backgroundColor: '#ffffff' },
			containerStyleString: 'aspect-ratio: 4 / 3; background-color: #ffffff;'
		});
		expect(resolveSignatureEmpty(false)).toBe(true);
		expect(resolveSignatureEmpty(true)).toBe(false);
		expect(resolveSignatureResult({ dataUrl: 'data:image/png;base64,a', hasDrawn: true })).toEqual({
			dataUrl: 'data:image/png;base64,a',
			isEmpty: false
		});
	});

	test('resolves pointer drawing actions without canvas APIs', () => {
		expect(resolveSignaturePointerDownAction({ pointerCount: 1 })).toEqual({
			nextDrawing: true,
			shouldEmitDrawStart: true,
			shouldStartDrawing: true
		});
		expect(resolveSignaturePointerDownAction({ pointerCount: 2 })).toEqual({
			nextDrawing: false,
			shouldEmitDrawStart: false,
			shouldStartDrawing: false
		});
		expect(resolveSignaturePointerMoveAction({ isDrawing: true, hasLastPointer: true, pointerCount: 1 })).toEqual({
			shouldDraw: true,
			shouldMarkDrawn: true
		});
		expect(resolveSignaturePointerMoveAction({ isDrawing: true, hasLastPointer: true, pointerCount: 2 })).toEqual({
			shouldDraw: false,
			shouldMarkDrawn: false
		});
		expect(resolveSignaturePointerUpAction({ remainingPointerCount: 0, isDrawing: true })).toEqual({
			nextDrawing: false,
			shouldEmitDrawEnd: true,
			shouldEndDrawing: true
		});
		expect(resolveSignaturePointerUpAction({ remainingPointerCount: 1, isDrawing: true })).toEqual({
			nextDrawing: true,
			shouldEmitDrawEnd: false,
			shouldEndDrawing: false
		});
		expect(resolveSignatureClearAction()).toEqual({ nextHasDrawn: false, shouldClear: true, shouldEmitClear: true });
		expect(resolveSignatureClearAction({ emitClear: false })).toEqual({ nextHasDrawn: false, shouldClear: true, shouldEmitClear: false });
	});
});

describe('popup derived', () => {
	test('resolves radius, wrapper and transition classes', () => {
		expect(resolvePopupActualRadiusPosition({ position: 'left', radiusPosition: 'auto' })).toBe('right');
		expect(resolvePopupRadiusClass({ position: 'bottom' })).toBe('rounded-t-(--radius-box)');
		expect(resolvePopupRadiusClass({ radiusPosition: 'all', radius: 'lg' })).toBe('rounded-lg');
		expect(resolvePopupRadiusClass({ radiusPosition: 'left', radius: 'xl' })).toBe('rounded-l-xl');
		expect(resolvePopupWrapperClass('center')).toBe(
			'fixed inset-0 h-screen w-screen flex flex-col justify-center pointer-events-none px-0'
		);
		expect(resolvePopupWrapperStyleValue({ zIndex: 700, innerHeight: 812 })).toEqual({ zIndex: 700, height: '812px' });
		expect(resolvePopupWrapperStyleString({ zIndex: 700, innerHeight: 812 })).toBe('z-index:700;height:812px');
		expect(resolvePopupViewportSize({ height: 812, width: 390 })).toEqual({ height: 812, width: 390 });
		expect(resolvePopupViewportSize()).toEqual({ height: 0, width: 0 });
		expect(resolvePopupTransitionClass({ position: 'left', px: '4', py: '6' })).toBe('h-full px-4 py-6 pointer-events-auto');
		expect(resolvePopupPanelClass({ transparent: true, radiusClass: 'rounded-lg', hideScrollbar: true })).toBe(
			'w-full h-full overflow-y-auto bg-transparent rounded-lg popup-container'
		);
		const popupOptions = resolvePopupStateOptions({
			props: { position: 'left', radiusPosition: 'auto', radius: 'lg', zIndex: 800, transparent: true, hideScrollbar: true },
			innerHeight: 640
		});
		expect(popupOptions).toMatchObject({ position: 'left', radius: 'lg', innerHeight: 640 });
		const popupState = resolvePopupDerived(popupOptions);
		expect(popupState.radiusClass).toBe('rounded-r-lg');
		expect(popupState.wrapperClass).toBe('fixed inset-0 h-screen w-screen flex justify-start pointer-events-none px-0');
		expect(popupState.wrapperStyleValue).toEqual({ zIndex: 800, height: '640px' });
		expect(popupState.wrapperStyleString).toBe('z-index:800;height:640px');
		expect(popupState.panelClass).toBe('w-full h-full overflow-y-auto bg-transparent rounded-r-lg popup-container');
		expect(popupState.css).toContain('.popup-container::-webkit-scrollbar');
	});

	test('resolves pure size and motion values without reading the DOM', () => {
		expect(resolvePopupTransitionName('center')).toBe('scale');
		expect(resolvePopupTransitionName('bottom')).toBe('fly');
		expect(resolvePopupRenderState({ visible: true, outDuration: 240, currentRender: false })).toBe(true);
		expect(resolvePopupRenderState({ visible: false, outDuration: 0, currentRender: true })).toBe(false);
		expect(resolvePopupRenderState({ visible: false, outDuration: 240, currentRender: true })).toBe(true);
		expect(resolvePopupCloseAction({ visible: true })).toEqual({ nextVisible: false, shouldClose: true, shouldEmitClose: true });
		expect(resolvePopupCloseAction({ visible: false })).toEqual({ nextVisible: false, shouldClose: false, shouldEmitClose: false });
		expect(resolvePopupCloseAction({ visible: true, shouldClose: false })).toEqual({
			nextVisible: false,
			shouldClose: false,
			shouldEmitClose: false
		});
		expect(resolvePopupCloseAction({ emitClose: false, visible: true })).toEqual({
			nextVisible: false,
			shouldClose: true,
			shouldEmitClose: false
		});
		expect(resolvePopupRenderEndAction()).toEqual({ nextShouldRender: false });
		expect(resolvePopupMaskClickAction({ maskClosable: true })).toEqual({ shouldClose: true });
		expect(resolvePopupMaskClickAction({ maskClosable: false })).toEqual({ shouldClose: false });
		expect(resolvePopupMaskClickFlow({ maskClosable: true, visible: true })).toEqual({
			closeAction: { nextVisible: false, shouldClose: true, shouldEmitClose: true },
			shouldClose: true
		});
		expect(resolvePopupMaskClickFlow({ maskClosable: false, visible: true })).toEqual({
			closeAction: { nextVisible: false, shouldClose: false, shouldEmitClose: false },
			shouldClose: false
		});
		expect(resolvePopupScrollbarCss()).toContain('.popup-container::-webkit-scrollbar');
		expect(resolvePopupTransitionDistance({ position: 'right', size: 50, viewportWidth: 320 })).toBe(160);
		expect(resolvePopupTransitionDistance({ position: 'bottom', size: 25, viewportHeight: 800 })).toBe(200);
		expect(resolvePopupMotionParams({ position: 'top', size: 25, viewportHeight: 800, duration: 300 })).toEqual({
			duration: 300,
			easing: undefined,
			opacity: 1,
			x: 0,
			y: -200
		});
		expect(resolvePopupTransitionParams({ position: 'center', duration: 180 })).toEqual({
			duration: 180,
			easing: undefined,
			opacity: 1
		});
		expect(resolvePopupTransitionParams({ position: 'right', size: 50, viewportWidth: 320, duration: 180 })).toEqual({
			duration: 180,
			easing: undefined,
			opacity: 1,
			x: 160,
			y: 0
		});
		expect(resolvePopupSizeStyleValue({ position: 'left', size: 0 })).toEqual({ width: 'auto' });
		expect(resolvePopupSizeStyleString({ position: 'bottom', size: 40 })).toBe('height:40%');
		const transitionOptions = resolvePopupTransitionStateOptions({
			props: {
				position: 'right',
				size: 50,
				px: '4',
				py: '6',
				duration: 180,
				outDuration: 120
			},
			viewportWidth: 320
		});
		expect(transitionOptions).toMatchObject({ position: 'right', size: 50, viewportWidth: 320 });
		const transitionState = resolvePopupTransitionDerived(transitionOptions);
		expect(transitionState.sizeStyleValue).toEqual({ width: '50%' });
		expect(transitionState.sizeStyleString).toBe('width:50%');
		expect(transitionState.transitionClass).toBe('h-full px-4 py-6 pointer-events-auto');
		expect(transitionState.transitionName).toBe('fly');
		expect(transitionState.inParams).toEqual({ duration: 180, easing: undefined, opacity: 1, x: 160, y: 0 });
		expect(transitionState.outParams).toEqual({ duration: 120, easing: undefined, opacity: 1, x: 160, y: 0 });
	});
});

describe('rate derived', () => {
	test('resolves root, item and animation classes', () => {
		expect(rateQuadrantIndexes).toEqual([0, 1, 2, 3]);
		expect(resolveRateInitialValue()).toBe(4);
		expect(resolveRateInitialValue(null, 2)).toBe(2);
		expect(resolveRateInitialValue(3)).toBe(3);
		expect(resolveRateItems(3.8)).toEqual([0, 1, 2]);
		expect(resolveRateRootClass({ space: '2', disabled: true })).toBe('inset-0 inline-flex flex-wrap gap-2 opacity-50');
		expect(resolveRateScaleClass({ animation: 'active', clickIndex: 2, index: 1, isScale: true })).toBe(' scale-75');
		expect(resolveRateScaleClass({ animation: 'current', clickIndex: 2, index: 1, isScale: true })).toBe('');
		expect(resolveRateButtonClass({ disabled: true, animation: 'current', clickIndex: 1, index: 1, isScale: true })).toBe(
			'flex flex-wrap transition-all cursor-not-allowed scale-75'
		);
		expect(resolveRateButtonStyleValue({ height: 24, width: 28 })).toEqual({ height: '24px', width: '28px' });
		expect(resolveRateButtonStyleString({ height: 24, width: 28 })).toBe('height:24px;width:28px;');
		expect(resolveRateQuadrantStyleValue({ height: 24, width: 28 })).toEqual({ height: '12px', width: '14px' });
		expect(resolveRateQuadrantStyleString({ height: 24, width: 28 })).toBe('height:12px;width:14px;');
		expect(resolveRateStarSvgClass()).toBe('text-primary dark:text-dark');
		expect(resolveRateStarTransformStyleValue({ quadrant: 3, width: 24, height: 20 })).toEqual({
			transform: 'translateX(-12px) translateY(-10px)'
		});
		expect(resolveRateStarTransformStyleString({ quadrant: 3, width: 24, height: 20 })).toBe(
			'transform:translateX(-12px) translateY(-10px)'
		);
		expect(resolveRateCanInteract({ disabled: false, readonly: false })).toBe(true);
		expect(resolveRateCanInteract({ disabled: true, readonly: false })).toBe(false);
		expect(resolveRateValidationErrors({ value: 6, total: 5.5, half: false, width: 18, height: 24 })).toEqual([
			'error1',
			'error2',
			'error5'
		]);
		expect(resolveRateValidationErrors({ value: 1.5, total: 5, half: false, width: 24, height: 24 })).toEqual(['error3']);
		expect(resolveRateValidationErrors({ value: 1.25, total: 5, half: true, width: 24, height: 18 })).toEqual(['error4', 'error5']);
	});

	test('resolves active quadrants for half and full rate states', () => {
		expect(resolveRateActive({ index: 1, value: 2 })).toBe(true);
		expect(resolveRateActive({ index: 2, value: 2 })).toBe(false);
		expect(resolveRateActive({ index: 0, value: 0.5, half: true, quadrant: 0 })).toBe(true);
		expect(resolveRateActive({ index: 0, value: 0.5, half: true, quadrant: 1 })).toBe(false);
		expect(resolveRateActive({ index: 0, value: 0.5, half: true, vertical: true, quadrant: 0 })).toBe(false);
		expect(resolveRateActive({ index: 0, value: 0.5, half: true, vertical: true, quadrant: 2 })).toBe(true);
		expect(resolveRateQuadrantClass({ index: 2, value: 2, opacity: '0.5' })).toBe('overflow-hidden grayscale opacity-50');
		expect(resolveRateStarTransform({ quadrant: 3, width: 24, height: 20 })).toBe('translateX(-12px) translateY(-10px)');
	});

	test('resolves render-ready rate state', () => {
		const options = resolveRateStateOptions({
			value: 1.5,
			clickIndex: 1,
			isScale: true,
			props: {
				total: 3,
				half: true,
				width: 24,
				height: 20,
				space: '2',
				animation: 'current',
				opacity: '0.5'
			}
		});
		expect(options).toMatchObject({ value: 1.5, total: 3, half: true, clickIndex: 1, isScale: true });
		const state = resolveRateDerived(options);

		expect(state.rootClass).toBe('inset-0 inline-flex flex-wrap gap-2');
		expect(state.itemIndexes).toEqual([0, 1, 2]);
		expect(state.validationErrors).toEqual([]);
		expect(state.starSvgClass).toBe('text-primary dark:text-dark');
		expect(state.items[1]?.buttonClass).toBe('flex flex-wrap transition-all cursor-pointer scale-75');
		expect(state.items[1]?.buttonStyleString).toBe('height:20px;width:24px;');
		expect(state.items[1]?.quadrants[0]).toEqual({
			quadrant: 0,
			className: 'overflow-hidden',
			styleValue: { height: '10px', width: '12px' },
			styleString: 'height:10px;width:12px;',
			starStyleValue: { transform: 'translateX(0px) translateY(0px)' },
			starStyleString: 'transform:translateX(0px) translateY(0px)'
		});
	});

	test('calculates next rate values for zero and half modes', () => {
		expect(getRateNextValue({ index: 2, value: 1 })).toBe(3);
		expect(getRateNextValue({ index: 0, value: 1, zero: true })).toBe(0);
		expect(getRateNextValue({ index: 0, value: 0, half: true })).toBe(0.5);
		expect(getRateNextValue({ index: 0, value: 0.5, half: true, zero: true })).toBe(1);
		expect(getRateNextValue({ index: 0, value: 1, half: true, zero: true })).toBe(0);
		expect(getRateNextValue({ index: 2, value: 2.5, half: true })).toBe(3);
		expect(resolveRateClickAction({ index: 2, value: 1, half: false, zero: false })).toEqual({
			clickIndex: 2,
			isScale: true,
			nextValue: 3,
			resetIsScale: false,
			resetScaleDelay: 80,
			shouldChange: true
		});
		expect(resolveRateClickAction({ index: 2, value: 1, disabled: true })).toEqual({
			clickIndex: 2,
			isScale: false,
			nextValue: 1,
			resetIsScale: false,
			resetScaleDelay: 80,
			shouldChange: false
		});
	});
});

describe('selection derived', () => {
	test('resolves checkbox and radio state transitions', () => {
		const originalCheckeds = ['a'];
		expect(resolveCheckboxInitialCheckeds()).toEqual([]);
		expect(resolveCheckboxInitialCheckeds(originalCheckeds)).toEqual(['a']);
		expect(resolveCheckboxInitialCheckeds(originalCheckeds)).not.toBe(originalCheckeds);
		expect(resolveCheckboxNextCheckeds(['a', 'b'], 'a')).toEqual(['b']);
		expect(resolveCheckboxNextCheckeds(['a'], 'b')).toEqual(['b', 'a']);
		expect(resolveCheckboxClickAction({ checkeds: ['a'], name: 'b' })).toEqual({ nextCheckeds: ['b', 'a'], shouldEmit: true });
		expect(resolveCheckboxItemChecked(['a'], 'a')).toBe(true);
		expect(resolveCheckboxItemChecked(['a'], 'b')).toBe(false);
		expect(
			resolveCheckboxItemStates({
				data: [
					{ name: 'a', label: 'A' },
					{ name: 'b', label: 'B' }
				],
				checkeds: ['b']
			})
		).toEqual([
			{ item: { name: 'a', label: 'A' }, checked: false },
			{ item: { name: 'b', label: 'B' }, checked: true }
		]);
		const checkboxOptions = resolveCheckboxStateOptions({
			props: { data: [{ name: 'a', label: 'A' }], layout: 'inline' },
			checkeds: ['a']
		});
		expect(checkboxOptions).toMatchObject({ checkeds: ['a'], layout: 'inline' });
		expect(resolveCheckboxDerived(checkboxOptions)).toEqual({
			groupClass: 'flex flex-wrap',
			itemStates: [{ item: { name: 'a', label: 'A' }, checked: true }]
		});
		expect(resolveRadioInitialValue()).toBe('');
		expect(resolveRadioInitialValue(null)).toBe('');
		expect(resolveRadioInitialValue('a')).toBe('a');
		expect(resolveRadioNextValue('b')).toBe('b');
		expect(resolveRadioClickAction({ name: 'b' })).toEqual({ nextValue: 'b', shouldEmit: true });
		expect(resolveRadioItemChecked('b', 'b')).toBe(true);
		expect(resolveRadioItemChecked('a', 'b')).toBe(false);
		expect(
			resolveRadioItemStates({
				data: [
					{ name: 'a', label: 'A' },
					{ name: 'b', label: 'B' }
				],
				value: 'a'
			})
		).toEqual([
			{ item: { name: 'a', label: 'A' }, checked: true },
			{ item: { name: 'b', label: 'B' }, checked: false }
		]);
		const radioOptions = resolveRadioStateOptions({
			props: { data: [{ name: 'a', label: 'A' }], layout: 'h' },
			value: 'a'
		});
		expect(radioOptions).toMatchObject({ value: 'a', layout: 'h' });
		expect(resolveRadioDerived(radioOptions)).toEqual({
			groupClass: 'flex justify-between',
			itemStates: [{ item: { name: 'a', label: 'A' }, checked: true }]
		});
	});

	test('resolves shared selection layout classes', () => {
		expect(resolveSelectionGroupClass('inline')).toBe('flex flex-wrap');
		expect(resolveSelectionGroupClass('h')).toBe('flex justify-between');
		expect(resolveSelectionItemClass({ layout: 'v', textPosition: 'l' })).toBe('flex grow active:opacity-80 justify-between items-center');
		expect(resolveSelectionItemClass({ layout: 'inline', textPosition: 'b' })).toBe(
			'inline-block grow active:opacity-80 flex-col items-center'
		);
		expect(resolveSelectionLeadingLabelClass({ layout: 'v', textPosition: 'l' })).toBe('mr-0.5 text-left grow');
		expect(resolveSelectionTrailingLabelClass({ textPosition: 'r' })).toBe('ml-0.5 text-left');
		expect(resolveSelectionLeadingLabelVisible('t')).toBe(true);
		expect(resolveSelectionTrailingLabelVisible('b')).toBe(true);
		expect(resolveSelectionDividerVisible('v')).toBe(true);
		expect(resolveSelectionCheckedIconClass(false)).toBe('hidden');
		expect(resolveSelectionUncheckedIconClass(true)).toBe('hidden');
		expect(resolveSelectionDividerClass()).toBe('mt-1 h-px bg-black/10 dark:bg-white/10');
		expect(resolveSelectionCheckedSvgClass()).toBe('text-primary dark:text-dark');
		expect(resolveSelectionUncheckedSvgClass()).toBe('opacity-20');
		expect(resolveSelectionItemDerived({ layout: 'v', textPosition: 'l', checked: true })).toEqual({
			itemClass: 'flex grow active:opacity-80 justify-between items-center',
			leadingLabelClass: 'mr-0.5 text-left grow',
			trailingLabelClass: '',
			dividerClass: 'mt-1 h-px bg-black/10 dark:bg-white/10',
			checkedIconClass: '',
			uncheckedIconClass: 'hidden',
			checkedSvgClass: 'text-primary dark:text-dark',
			uncheckedSvgClass: 'opacity-20',
			showLeadingLabel: true,
			showTrailingLabel: false,
			showDivider: true
		});
		expect(resolveSelectionIconState(null)).toEqual({ kind: 'none', icon: null });
		expect(resolveSelectionIconState('default')).toEqual({ kind: 'default', icon: null });
		expect(resolveSelectionIconState({ name: 'ri-checkbox-line' })).toEqual({ kind: 'custom', icon: { name: 'ri-checkbox-line' } });
		expect(resolveSelectionCustomIconProps(resolveSelectionIconState({ name: 'ri-checkbox-line' }))).toEqual({ name: 'ri-checkbox-line' });
		expect(resolveSelectionCustomIconProps(resolveSelectionIconState('default'))).toBeNull();
		expect(
			resolveSelectionItemRenderState({
				layout: 'v',
				textPosition: 'l',
				checked: true,
				icon: { name: 'ri-square-line' },
				iconChecked: { name: 'ri-checkbox-line' }
			})
		).toMatchObject({
			itemClass: 'flex grow active:opacity-80 justify-between items-center',
			checkedIconClass: '',
			uncheckedIconClass: 'hidden',
			dividerClass: 'mt-1 h-px bg-black/10 dark:bg-white/10',
			checkedSvgClass: 'text-primary dark:text-dark',
			uncheckedSvgClass: 'opacity-20',
			checkedIconState: { kind: 'custom', icon: { name: 'ri-checkbox-line' } },
			uncheckedIconState: { kind: 'custom', icon: { name: 'ri-square-line' } },
			checkedIconProps: { name: 'ri-checkbox-line' },
			uncheckedIconProps: { name: 'ri-square-line' }
		});
	});
});

describe('tooltip derived', () => {
	test('resolves classes and trigger visibility', () => {
		expect(resolveTooltipRadiusClass('lg')).toBe('rounded-lg');
		expect(resolveTooltipWrapperClass()).toBe('inline-block');
		expect(resolveTooltipTriggerClass(true)).toBe('cursor-not-allowed opacity-50');
		expect(resolveTooltipPanelClass({ radiusClass: 'rounded-md', state: 'warning', injClass: 'custom-tooltip' })).toBe(
			'fixed rounded-md px-2 py-1.5 text-xs bg-warning text-white custom-tooltip'
		);
		expect(resolveTooltipArrowClass({ position: 'bottom', state: 'warning' })).toContain('bottom-full left-1/2');
		expect(resolveTooltipInParams('left')).toEqual({ x: 4, duration: 200 });
		expect(resolveTooltipOutParams()).toEqual({ duration: 150 });
		expect(resolveTooltipPanelStyleValue({ top: 12, left: 24, maxWidth: 180, zIndex: 900 })).toEqual({
			top: '12px',
			left: '24px',
			maxWidth: '180px',
			zIndex: 900
		});
		expect(resolveTooltipPanelStyleString({ top: 12, left: 24, maxWidth: 180, zIndex: 900 })).toBe(
			'top: 12px; left: 24px; max-width: 180px; z-index: 900;'
		);
		const tooltipOptions = resolveTooltipStateOptions({
			props: {
				disabled: true,
				injClass: 'custom-tooltip',
				maxWidth: 180,
				position: 'bottom',
				radius: 'lg',
				state: 'warning',
				zIndex: 900
			},
			left: 24,
			top: 12
		});
		expect(tooltipOptions).toMatchObject({ disabled: true, left: 24, top: 12, position: 'bottom' });
		const tooltipState = resolveTooltipDerived(tooltipOptions);
		expect(tooltipState.wrapperClass).toBe('inline-block');
		expect(tooltipState.triggerClass).toBe('cursor-not-allowed opacity-50');
		expect(tooltipState.panelClass).toBe('fixed rounded-lg px-2 py-1.5 text-xs bg-warning text-white custom-tooltip');
		expect(tooltipState.arrowClass).toContain('bottom-full left-1/2');
		expect(tooltipState.inParams).toEqual({ y: -4, duration: 200 });
		expect(tooltipState.outParams).toEqual({ duration: 150 });
		expect(tooltipState.panelStyleValue).toEqual({ top: '12px', left: '24px', maxWidth: '180px', zIndex: 900 });
		expect(tooltipState.panelStyleString).toBe('top: 12px; left: 24px; max-width: 180px; z-index: 900;');
		expect(
			resolveTooltipTriggerInViewport({
				triggerRect: { top: 1, left: 1, right: 11, bottom: 11, width: 10, height: 10 },
				viewportWidth: 100,
				viewportHeight: 100
			})
		).toBe(true);
	});

	test('resolves visibility state without owning timers or events', () => {
		expect(resolveTooltipInitialVisible(undefined)).toBe(false);
		expect(resolveTooltipInitialVisible(true)).toBe(true);
		expect(resolveTooltipVisibleSyncAction({ visible: true })).toEqual({ nextVisible: true, nextHiddenByViewport: false });
		expect(resolveTooltipVisibleSyncAction({ visible: undefined })).toEqual({ nextVisible: false, nextHiddenByViewport: false });
		expect(resolveTooltipToggleAction(true)).toBe('hide');
		expect(resolveTooltipToggleAction(false)).toBe('show');
		expect(resolveTooltipShowAction({ disabled: false, hiddenByViewport: true })).toEqual({
			nextHiddenByViewport: false,
			shouldShow: true
		});
		expect(resolveTooltipShowAction({ disabled: true, hiddenByViewport: true })).toEqual({ nextHiddenByViewport: true, shouldShow: false });
		expect(resolveTooltipShowCommitAction()).toEqual({
			nextHiddenByViewport: false,
			nextVisible: true,
			shouldChange: true,
			shouldEmitHide: false,
			shouldEmitShow: true
		});
		expect(resolveTooltipHideCommitAction()).toEqual({
			nextHiddenByViewport: false,
			nextVisible: false,
			shouldChange: true,
			shouldEmitHide: true,
			shouldEmitShow: false
		});
		expect(resolveTooltipDelayAction({ delay: 0 })).toEqual({ shouldDelay: false, delayMs: 0 });
		expect(resolveTooltipDelayAction({ delay: 120 })).toEqual({ shouldDelay: true, delayMs: 120 });
		expect(resolveTooltipDelayAction({ delay: -1 })).toEqual({ shouldDelay: false, delayMs: -1 });
		expect(resolveTooltipShowFlow({ disabled: false, hiddenByViewport: true, delay: 120 })).toMatchObject({
			nextHiddenByViewport: false,
			shouldShow: true,
			shouldDelay: true,
			delayMs: 120,
			commitAction: { nextVisible: true, shouldEmitShow: true }
		});
		expect(resolveTooltipShowFlow({ disabled: true, hiddenByViewport: true, delay: 120 })).toMatchObject({
			nextHiddenByViewport: true,
			shouldShow: false,
			shouldDelay: true,
			delayMs: 120
		});
		expect(resolveTooltipHideFlow({ delay: 80 })).toMatchObject({
			nextHiddenByViewport: false,
			shouldDelay: true,
			delayMs: 80,
			commitAction: { nextVisible: false, shouldEmitHide: true }
		});
		expect(resolveTooltipShouldBindGlobalListeners({ visible: false, hiddenByViewport: false })).toBe(false);
		expect(resolveTooltipShouldBindGlobalListeners({ visible: false, hiddenByViewport: true })).toBe(true);
		expect(resolveTooltipShouldHideForViewport({ visible: true, hiddenByViewport: false })).toBe(true);
		expect(resolveTooltipShouldHideForViewport({ visible: true, hiddenByViewport: true })).toBe(false);
		expect(resolveTooltipHideForViewportAction({ visible: true, hiddenByViewport: false })).toEqual({
			nextHiddenByViewport: true,
			nextVisible: false,
			shouldChange: true,
			shouldEmitHide: true,
			shouldEmitShow: false
		});
		expect(resolveTooltipHideForViewportAction({ visible: false, hiddenByViewport: true })).toEqual({
			nextHiddenByViewport: true,
			nextVisible: false,
			shouldChange: false,
			shouldEmitHide: false,
			shouldEmitShow: false
		});
		expect(resolveTooltipShouldRestoreFromViewport({ hiddenByViewport: true, disabled: false, triggerInViewport: true })).toBe(true);
		expect(resolveTooltipShouldRestoreFromViewport({ hiddenByViewport: true, disabled: true, triggerInViewport: true })).toBe(false);
		expect(
			resolveTooltipRestoreFromViewportAction({ hiddenByViewport: true, disabled: false, triggerInViewport: true, visible: false })
		).toEqual({
			nextHiddenByViewport: false,
			nextVisible: true,
			shouldChange: true,
			shouldEmitHide: false,
			shouldEmitShow: true
		});
		expect(
			resolveTooltipRestoreFromViewportAction({ hiddenByViewport: true, disabled: true, triggerInViewport: true, visible: false })
		).toEqual({
			nextHiddenByViewport: true,
			nextVisible: false,
			shouldChange: false,
			shouldEmitHide: false,
			shouldEmitShow: false
		});
		expect(resolveTooltipViewportAction({ triggerInViewport: false, hiddenByViewport: false })).toBe('hideForViewport');
		expect(resolveTooltipViewportAction({ triggerInViewport: true, hiddenByViewport: true })).toBe('restoreFromViewport');
		expect(resolveTooltipViewportAction({ triggerInViewport: true, hiddenByViewport: false })).toBe('updatePosition');
	});

	test('resolves clamped tooltip positions from plain rect data', () => {
		expect(
			resolveTooltipPosition({
				position: 'top',
				triggerRect: { top: 20, left: 50, right: 70, bottom: 40, width: 20, height: 20 },
				tooltipRect: { width: 40, height: 12 },
				viewportWidth: 120,
				viewportHeight: 120
			})
		).toEqual({ top: 4, left: 40 });

		expect(
			resolveTooltipPosition({
				position: 'right',
				triggerRect: { top: 90, left: 100, right: 118, bottom: 110, width: 18, height: 20 },
				tooltipRect: { width: 50, height: 40 },
				viewportWidth: 120,
				viewportHeight: 120
			})
		).toEqual({ top: 76, left: 66 });
	});
});

describe('transition derived', () => {
	test('resolves animation progress and timing', () => {
		expect(resolveTransitionProgress({ elapsed: 50, duration: 100 })).toBe(0.5);
		expect(resolveTransitionProgress({ elapsed: 150, duration: 100 })).toBe(1);
		expect(resolveTransitionProgress({ elapsed: -10, duration: 100 })).toBe(0);
		expect(resolveTransitionProgress({ elapsed: 20, duration: 0 })).toBe(1);
		expect(resolveTransitionDurationWithDelay({ duration: 300, delay: 120 })).toBe(420);
		expect(resolveTransitionDurationWithDelay()).toBe(400);
	});

	test('resolves fly animation frames without DOM access', () => {
		expect(normalizeTransitionBaseTransform('none')).toBe('');
		expect(normalizeTransitionBaseTransform('scale(1)')).toBe('scale(1)');
		expect(
			resolveFlyTransitionFrame({
				baseTransform: 'scale(1)',
				progress: 0.5,
				targetOpacity: 1,
				opacity: 0,
				x: 10,
				y: 20,
				easing: (progress) => progress
			})
		).toEqual({
			easedProgress: 0.5,
			opacity: '0.5',
			transform: 'scale(1) translate(5px, 10px)'
		});
		expect(resolveFlyOutFrame({ progress: 0.5, y: 20, easing: (progress) => progress })).toEqual({
			easedProgress: 0.5,
			opacity: '0.5',
			transform: 'translateY(10px)'
		});
		expect(resolveTransitionTickProgress({ mode: 'in', progress: 0.25 })).toBe(0.25);
		expect(resolveTransitionTickProgress({ mode: 'out', progress: 0.25 })).toBe(0.75);
	});
});

describe('slider derived', () => {
	test('resolves step positions, labels and visual classes', () => {
		expect(resolveSliderInitialValue()).toBe(40);
		expect(resolveSliderInitialValue(null, 12)).toBe(12);
		expect(resolveSliderInitialStartValue()).toBe(20);
		expect(resolveSliderInitialStartValue(25)).toBe(25);
		expect(resolveSliderInitialEndValue()).toBe(60);
		expect(resolveSliderInitialEndValue(75)).toBe(75);
		expect(resolveSliderStepPositions({ minRange: 0, maxRange: 100, step: 25 })).toEqual([0, 25, 50, 75, 100]);
		expect(resolveSliderStepLabel({ value: 50, minRange: 0, step: 25, stepLabels: ['A', 'B', 'C'] })).toBe('C');
		expect(resolveSliderChangePayload({ value: 50, minRange: 0, step: 25, stepLabels: ['A', 'B', 'C'] })).toEqual({
			value: 50,
			label: 'C'
		});
		expect(resolveSliderChangePayload({ value: 0, valueRange: [25, 75], minRange: 0, step: 25, stepLabels: ['A', 'B', 'C', 'D'] })).toEqual(
			{
				value: 0,
				valueRange: [25, 75],
				labelRange: ['B', 'D']
			}
		);
		expect(resolveSliderValuePercent({ value: 40, minRange: 20, maxRange: 60 })).toBe(50);
		expect(resolveSliderSize(true)).toBe(24);
		expect(resolveSliderProgressClass()).toBe('rounded-(--radius-small)');
		expect(resolveSliderRootClass(true)).toBe('flex h-7 px-2.5 opacity-50');
		expect(resolveSliderLineClass()).toBe('relative flex flex-1 cursor-move touch-none flex-col justify-center');
		expect(resolveSliderBreakRootClass()).toBe('relative flex h-1 w-full items-center justify-between');
		expect(resolveSliderBreakProgressOverlayClass()).toBe('pointer-events-none absolute inset-0 flex items-center justify-between');
		expect(resolveSliderBreakMarkerClass('rounded-sm')).toBe('z-10 bg-text-primary/20 dark:bg-text-dark/30 rounded-sm');
		expect(resolveSliderBreakSegmentClass('rounded-sm')).toBe(
			'relative mx-0.5 h-1 flex-1 bg-text-primary/10 dark:bg-text-dark/20 rounded-sm'
		);
		expect(resolveSliderBreakProgressMarkerClass({ position: 50, progressPercent: 60, progressClass: 'rounded-sm' })).toBe(
			'z-20 rounded-sm bg-primary dark:bg-dark'
		);
		expect(resolveSliderBreakProgressSegmentClass('rounded-sm')).toBe('relative mx-0.5 h-1 flex-1 overflow-hidden rounded-sm');
		expect(resolveSliderSegmentRangeClass('rounded-sm')).toBe('absolute h-full bg-primary dark:bg-dark rounded-sm');
		expect(resolveSliderSegmentProgressClass('rounded-sm')).toBe('h-full bg-primary dark:bg-dark rounded-sm');
		expect(resolveSliderContinuousTrackClass('rounded-sm')).toBe('relative h-1 w-full bg-text-primary/10 dark:bg-text-dark/20 rounded-sm');
		expect(resolveSliderStepMarkerClass('rounded-sm')).toBe(
			'absolute top-1/2 -translate-y-1/2 bg-text-primary/20 dark:bg-text-dark/30 rounded-sm'
		);
		expect(resolveSliderActiveStepMarkerClass('rounded-sm')).toBe('absolute top-1/2 -translate-y-1/2 bg-primary dark:bg-dark rounded-sm');
		expect(resolveSliderTrackClass('rounded-sm')).toBe('h-1 bg-primary dark:bg-dark rounded-sm');
		expect(resolveSliderPointerStartAction({ disabled: false, readonly: false })).toEqual({ shouldStart: true });
		expect(resolveSliderPointerStartAction({ disabled: true, readonly: false })).toEqual({ shouldStart: false });
		expect(resolveSliderPointerMoveAction({ disabled: false, readonly: false, isDown: true })).toEqual({ shouldMove: true });
		expect(resolveSliderPointerMoveAction({ disabled: false, readonly: false, isDown: false })).toEqual({ shouldMove: false });
		expect(resolveSliderPointerMoveAction({ disabled: false, readonly: true, isDown: true })).toEqual({ shouldMove: false });
		expect(resolveSliderBlockLayerClass()).toBe('pointer-events-none absolute inset-0 flex h-7 flex-col justify-center');
		expect(resolveSliderBlockClass({ lineBlock: true, radius: 'none', isDown: false })).toContain(
			'transition-transform duration-300 ease-out'
		);
		expect(resolveSliderBreakStepMarkerStyleValue(8)).toEqual({ flexShrink: 0, height: 8, width: 8 });
		expect(resolveSliderBreakStepMarkerStyleString(8)).toBe('width: 8px; height: 8px; flex-shrink: 0;');
		expect(resolveSliderAbsoluteStepMarkerStyleValue({ position: 25, size: 8 })).toEqual({ height: 8, left: 'calc(25% - 4px)', width: 8 });
		expect(resolveSliderAbsoluteStepMarkerStyleString({ position: 25, size: 8 })).toBe('left: calc(25% - 4px); width: 8px; height: 8px;');
		expect(resolveSliderTipClass('none')).toContain('rounded-none');
		expect(resolveSliderTipAnchorClass()).toBe('absolute -top-9 left-1/2');
		expect(resolveSliderTipBubbleClass('none')).toContain('-translate-x-1/2');
		expect(resolveSliderPositionedTipClass('sm')).toContain('absolute -top-9 left-1/2');
		expect(resolveSliderTipArrowClass()).toContain('left-1/2 top-full');
		expect(resolveSliderTipVisible({ showTip: 'touch', currentMove: 'start', target: 'start' })).toBe(true);
		expect(resolveSliderTipVisible({ showTip: 'never', currentMove: 'start', target: 'start' })).toBe(false);
		expect(resolveSliderTipInParams()).toEqual({ y: 8, duration: 500 });
		expect(resolveSliderTipOutParams()).toEqual({ y: 8, duration: 300 });
	});

	test('resolves single pointer state and track styles', () => {
		expect(resolveSliderSingleStartState({ clientX: 40, lineStartX: 10, lineWidth: 100, minRange: 10, maxRange: 110, step: 5 })).toEqual({
			currentMove: 'one',
			currentX: 30,
			value: 30
		});
		expect(
			resolveSliderSingleMoveState({ clientX: 140, lineStartX: 10, lineEndX: 110, lineWidth: 100, minRange: 10, maxRange: 110, step: 5 })
		).toEqual({
			currentX: 100,
			value: 110
		});
		expect(
			resolveSliderSingleStartState({
				clientX: 40,
				lineStartX: 10,
				lineWidth: 100,
				minRange: 10,
				maxRange: 110,
				step: 5,
				includeMinRange: true
			}).value
		).toBe(40);
		expect(resolveSliderSingleTrackWidth({ currentX: 40, sliderSize: 20 })).toBe(28);
		expect(resolveSliderSingleTrackStyleValue({ currentX: 40, sliderSize: 20 })).toEqual({ width: '28px' });
		expect(resolveSliderSingleTrackStyleString({ currentX: 40, sliderSize: 20 })).toBe('width:28px');
		expect(resolveSliderMeasuredBlockWidth({ isRange: false, measuredWidth: 24, fallbackWidth: 16 })).toBe(0);
		expect(resolveSliderMeasuredBlockWidth({ isRange: true, measuredWidth: 24, fallbackWidth: 16 })).toBe(24);
		expect(resolveSliderMeasuredBlockWidth({ isRange: true, measuredWidth: null, fallbackWidth: 16 })).toBe(16);
		expect(
			resolveSliderMeasuredLayoutState({
				lineRect: { left: 10, right: 210, width: 200 },
				blockWidth: 24,
				isRange: true,
				value: 40,
				startValue: 25,
				endValue: 75
			})
		).toEqual({
			blockWidth: 24,
			currentEndX: 150,
			currentStartX: 50,
			currentX: 80,
			lineEndX: 210,
			lineStartX: 10,
			lineWidth: 200
		});
		expect(resolveSliderPositionSyncAction({ isDown: false, lineWidth: 200, value: 40, startValue: 25, endValue: 75 })).toEqual({
			currentEndX: 150,
			currentStartX: 50,
			currentX: 80,
			shouldSync: true
		});
		expect(resolveSliderPositionSyncAction({ isDown: true, lineWidth: 200, value: 40, startValue: 25, endValue: 75 }).shouldSync).toBe(
			false
		);
	});

	test('resolves range pointer state and final snap positions', () => {
		const startState = resolveSliderRangeStartState({
			clientX: 25,
			lineStartX: 10,
			lineWidth: 100,
			currentStartX: 20,
			currentEndX: 80,
			startValue: 20,
			endValue: 80,
			step: 10
		});
		expect(startState).toEqual({ currentMove: 'start', currentStartX: 15, currentEndX: 80, startValue: 20, endValue: 80 });

		const moveState = resolveSliderRangeMoveState({
			clientX: 120,
			lineStartX: 10,
			lineEndX: 110,
			lineWidth: 100,
			blockWidth: 20,
			currentMove: 'end',
			currentStartX: 20,
			currentEndX: 80,
			step: 10
		});
		expect(moveState).toEqual({ currentStartX: 20, currentEndX: 100, startValue: 20, endValue: 100 });

		expect(resolveSliderEndPositions({ isRange: true, lineWidth: 200, value: 30, startValue: 25, endValue: 75 })).toMatchObject({
			currentStartX: 50,
			currentEndX: 150,
			currentMove: 'none',
			isDown: false
		});
		expect(resolveSliderRangeTrackStyle({ currentX: 0, currentStartX: 20, currentEndX: 80, sliderSize: 20 })).toEqual({
			start: 32,
			width: 36
		});
		expect(resolveSliderRangeTrackStyleValue({ currentX: 0, currentStartX: 20, currentEndX: 80, sliderSize: 20 })).toEqual({
			width: '36px',
			transform: 'translateX(32px)'
		});
		expect(resolveSliderRangeTrackStyleString({ currentX: 0, currentStartX: 20, currentEndX: 80, sliderSize: 20 })).toBe(
			'width:36px;transform: translateX(32px);'
		);
		expect(resolveSliderBlockTransformStyleValue({ position: 20 })).toEqual({ transform: 'translateX(calc(20px - 50%))' });
		expect(resolveSliderBlockTransformStyleString({ position: 20 })).toBe('transform: translateX(calc(20px - 50%));');
	});

	test('resolves step segment progress', () => {
		expect(
			resolveSliderSegmentRangeStyle({ segmentStart: 25, segmentEnd: 50, progressPercent: 0, rangeStartPercent: 30, rangeEndPercent: 45 })
		).toEqual({
			visible: true,
			left: 20,
			width: 60
		});
		expect(
			resolveSliderSegmentRangeStyleValue({
				segmentStart: 25,
				segmentEnd: 50,
				progressPercent: 0,
				rangeStartPercent: 30,
				rangeEndPercent: 45
			})
		).toEqual({
			visible: true,
			style: {
				left: '20%',
				width: '60%'
			}
		});
		expect(
			resolveSliderSegmentRangeStyleString({
				segmentStart: 25,
				segmentEnd: 50,
				progressPercent: 0,
				rangeStartPercent: 30,
				rangeEndPercent: 45
			})
		).toEqual({
			visible: true,
			style: 'left: 20%; width: 60%;'
		});
		expect(resolveSliderSegmentProgressWidth({ segmentStart: 25, segmentEnd: 50, progressPercent: 40 })).toBe(60);
		expect(resolveSliderSegmentProgressStyleValue({ segmentStart: 25, segmentEnd: 50, progressPercent: 40 })).toEqual({ width: '60%' });
		expect(resolveSliderSegmentProgressStyleString({ segmentStart: 25, segmentEnd: 50, progressPercent: 40 })).toBe('width: 60%;');
		expect(resolveSliderStepActive({ position: 50, progressPercent: 40 })).toBe(false);
		expect(resolveSliderStepActive({ position: 50, progressPercent: 0, rangeStartPercent: 25, rangeEndPercent: 75, isRange: true })).toBe(
			true
		);
		expect(resolveSliderStepActiveBgClass({ position: 50, progressPercent: 40 })).toBe('bg-transparent');
		expect(resolveSliderStepActiveBgClass({ position: 50, progressPercent: 60 })).toBe('bg-primary dark:bg-dark');
		expect(
			resolveSliderStateOptions({
				value: 40,
				startValue: 20,
				endValue: 80,
				props: {
					minRange: 0,
					maxRange: 100,
					step: 10,
					stepLabels: ['A'],
					isRange: true,
					showTip: 'always',
					showSteps: true,
					stepsStyle: 'break',
					radius: 'sm',
					lineBlock: true,
					disabled: true
				},
				isDown: true,
				currentMove: 'end',
				currentX: 40,
				currentStartX: 20,
				currentEndX: 80
			})
		).toMatchObject({
			value: 40,
			startValue: 20,
			endValue: 80,
			minRange: 0,
			maxRange: 100,
			step: 10,
			isRange: true,
			showTip: 'always',
			showSteps: true,
			stepsStyle: 'break',
			radius: 'sm',
			lineBlock: true,
			disabled: true,
			isDown: true,
			currentMove: 'end',
			currentX: 40,
			currentStartX: 20,
			currentEndX: 80
		});
	});

	test('resolves render-ready slider state', () => {
		const state = resolveSliderDerived({
			value: 40,
			startValue: 25,
			endValue: 75,
			minRange: 0,
			maxRange: 100,
			step: 25,
			stepLabels: ['A', 'B', 'C', 'D', 'E'],
			isRange: true,
			showSteps: true,
			stepsStyle: 'break',
			showTip: 'always',
			currentMove: 'start',
			currentStartX: 20,
			currentEndX: 80,
			currentX: 40,
			radius: 'sm',
			lineBlock: true,
			disabled: true
		});

		expect(state.rootClass).toBe('flex h-7 px-2.5 opacity-50');
		expect(state.lineClass).toBe(resolveSliderLineClass());
		expect(state.blockLayerClass).toBe(resolveSliderBlockLayerClass());
		expect(state.breakProgressOverlayClass).toBe(resolveSliderBreakProgressOverlayClass());
		expect(state.sliderSize).toBe(24);
		expect(state.progressClass).toBe('rounded-sm');
		expect(state.stepPositions).toEqual([0, 25, 50, 75, 100]);
		expect(state.showBreakSteps).toBe(true);
		expect(state.showContinuousSteps).toBe(false);
		expect(state.breakStepItems[1]).toMatchObject({
			active: true,
			index: 1,
			position: 25,
			showSegment: true,
			markerClass: 'z-10 bg-text-primary/20 dark:bg-text-dark/30 rounded-sm',
			progressMarkerClass: 'z-20 rounded-sm bg-primary dark:bg-dark',
			rangeSegmentVisible: true
		});
		expect(state.breakStepItems[1]?.rangeSegmentStyle).toEqual({ left: '0%', width: '100%' });
		expect(state.breakStepItems[1]?.progressSegmentStyle).toEqual({ width: '60%' });
		expect(state.breakStepItems[4]?.showSegment).toBe(false);
		expect(state.breakStepItems[4]?.progressSegmentStyle).toEqual({ width: '0%' });
		expect(state.continuousStepItems[2]).toMatchObject({
			active: true,
			activeClass: 'absolute top-1/2 -translate-y-1/2 bg-primary dark:bg-dark rounded-sm',
			markerStyle: { height: 8, left: 'calc(50% - 4px)', width: 8 }
		});
		expect(state.rangeTrackStyle).toEqual({ width: '32px', transform: 'translateX(34px)' });
		expect(state.singleTrackStyle).toEqual({ width: '26px' });
		expect(state.startBlockStyleString).toBe('transform: translateX(calc(20px - 50%));');
		expect(state.tips.start).toMatchObject({
			visible: true,
			label: 'B',
			arrowClass:
				'absolute left-1/2 top-full h-0 w-0 -translate-x-1/2 border-4 border-t-4 border-transparent border-t-text-primary/90 dark:border-t-text-dark'
		});
		expect(state.tips.single.label).toBe('C');
	});
});

describe('tabs derived', () => {
	test('resolves base and overflow metrics', () => {
		expect(resolveTabsMeasuredClientWidth()).toBe(0);
		expect(resolveTabsMeasuredClientWidth({ clientWidth: 360 })).toBe(360);
		expect(resolveTabMeasuredSize()).toBeUndefined();
		expect(resolveTabMeasuredSize({ width: 240, height: 40 })).toEqual({ width: 240, height: 40 });
		expect(
			resolveTabMeasuredSizeState({
				current: { tabWidth: 200, tabHeight: 36, overflowWidth: 300, overflowHeight: 44 },
				tabRect: { width: 220, height: 38 }
			})
		).toEqual({
			tabWidth: 220,
			tabHeight: 38,
			overflowWidth: 300,
			overflowHeight: 44
		});
		expect(resolveTabMetrics({ width: 304, height: 44, active: 1, labelCount: 3, layout: 'h', lineType: false })).toEqual({
			paddedWidth: 300,
			paddedHeight: 40,
			activeW: 100,
			activeH: 40,
			activeLeft: 102,
			activeTop: 2,
			lineWidth: 300
		});
		expect(resolveTabMetrics({ width: 104, height: 124, active: 2, labelCount: 3, layout: 'v' }).activeTop).toBe(82);
		expect(resolveTabOverflowMetrics({ width: 354, height: 44, active: 2, labelCount: 5, showNum: 3 })).toEqual({
			itemW: 100,
			activeW: 100,
			activeH: 40,
			activeLeft: 202,
			lineWidth: 500,
			listWidth: 502
		});
	});

	test('resolves classes, indexes and transition metrics', () => {
		expect(resolveTabsPositionState('b')).toEqual({
			isBottom: true,
			isHorizontal: true,
			isLeft: false,
			isRight: false,
			isTop: false,
			isVertical: false,
			layout: 'h'
		});
		expect(resolveTabsHorizontal('l')).toBe(false);
		expect(resolveTabsViewportClass()).toBe('overflow-hidden');
		expect(resolveTabsVerticalRootClass()).toBe('flex');
		expect(resolveTabsVerticalContentClass()).toBe('grow');
		expect(resolveTabsShowTransitionViewport({ transition: true, position: 't' })).toBe(true);
		expect(resolveTabsShowTransitionViewport({ transition: false, position: 't' })).toBe(false);
		expect(resolveTabsShowTransitionViewport({ transition: true, position: 'l' })).toBe(false);
		expect(resolveTabsTransitionClass('fast')).toBe('relative flex transition-all duration-150');
		expect(resolveTabIconClass('fast')).toBe('mr-0.5 duration-150');
		expect(resolveTabTextClass('fast')).toBe('transition-all duration-150');
		expect(resolveTabLineActive({ lineType: true, layout: 'v' })).toBe(false);
		expect(resolveTabLineClass()).toBe('absolute bottom-0 h-0.5 w-full bg-black/5 dark:bg-white/5');
		expect(resolveTabOverflowListClass()).toBe('relative flex whitespace-nowrap');
		expect(resolveTabShowIndexes(3, 2)).toEqual([2, 3, 4, 5]);
		expect(resolveTabAutoScroll({ active: 5, showIndexes: [1, 2, 3], itemW: 80, currentOffset: 1 })).toEqual({
			shouldScroll: true,
			scrollLeft: 320,
			offset: 4,
			offsetChanged: true
		});
		expect(
			resolveTabAutoScrollAction({
				autoScroll: true,
				hasScrollElement: true,
				showOverflow: true,
				scrollState: { shouldScroll: true, scrollLeft: 320, offset: 4, offsetChanged: true }
			})
		).toEqual({ shouldScroll: true, scrollLeft: 320, nextOffset: 4, shouldUpdateOffset: true });
		expect(
			resolveTabAutoScrollAction({
				autoScroll: true,
				hasScrollElement: false,
				showOverflow: true,
				scrollState: { shouldScroll: true, scrollLeft: 320, offset: 4, offsetChanged: true }
			})
		).toEqual({ shouldScroll: false, scrollLeft: 320, nextOffset: 4, shouldUpdateOffset: false });
		expect(resolveTabClickAction({ index: 2 })).toEqual({ nextActive: 2, shouldEmit: true });
		expect(resolveTabsClickAction({ index: 3 })).toEqual({ nextActive: 3, shouldEmit: true });
		expect(resolveTabsLabelCount({ labels: ['A', 'B', 'C'] })).toBe(3);
		expect(resolveTabsLabelCount({ labels: null })).toBe(0);
		expect(resolveTabsLabelCount()).toBe(0);
		expect(resolveTabRootClass({ radiusClass: 'rounded-md', mxClass: 'mx-2', injClass: 'custom' })).toBe(
			'bg-black/5 dark:bg-white/10 relative p-0.5 rounded-md mx-2 custom'
		);
		expect(
			resolveTabIndicatorClass({ lineType: true, durationClass: 'duration-300', radiusClass: 'rounded-md', activeInjClass: 'active' })
		).toBe('absolute transition-all duration-300 rounded-md bg-primary dark:bg-dark bottom-0 active');
		expect(
			resolveTabButtonClass({ layout: 'v', love: true, radiusClass: 'rounded-md', active: true, activeTabInjClass: 'active' })
		).toContain('flex-1 py-2 justify-center overflow-hidden font-medium text-lg leading-6 rounded-md active');
		const tabButtonItem = {
			buttonClass: 'normal-button',
			overflowButtonClass: 'overflow-button',
			overflowButtonStyleString: 'width: 100px;',
			overflowButtonStyleValue: { width: '100px' }
		};
		expect(resolveTabButtonRenderState({ item: tabButtonItem })).toEqual({
			buttonClass: 'normal-button',
			styleString: '',
			styleValue: undefined
		});
		expect(resolveTabButtonRenderState({ item: tabButtonItem, overflow: true })).toEqual({
			buttonClass: 'overflow-button',
			styleString: 'width: 100px;',
			styleValue: { width: '100px' }
		});
		expect(resolveTabsTransitionMetrics({ labelCount: 3, width: 120, active: 2 })).toEqual({ width: 360, left: -240 });
		expect(resolveTabsTransitionStyleValue({ width: 360, left: -240 })).toEqual({ width: '360px', left: '-240px' });
		expect(resolveTabsTransitionStyleString({ width: 360, left: -240 })).toBe('width: 360px;left: -240px;');
		const options = resolveTabsStateOptions({
			labelCount: 3,
			width: 120,
			active: 2,
			props: { duration: 'fast', position: 'b', transition: true }
		});
		expect(options).toMatchObject({ labelCount: 3, width: 120, active: 2, duration: 'fast', position: 'b', transition: true });
		expect(resolveTabsDerived(options)).toMatchObject({
			positionState: {
				isBottom: true,
				isHorizontal: true,
				layout: 'h'
			},
			showTransitionViewport: true,
			transitionClass: 'relative flex transition-all duration-150',
			transitionMetrics: { width: 360, left: -240 },
			transitionStyleString: 'width: 360px;left: -240px;',
			transitionStyleValue: { width: '360px', left: '-240px' },
			verticalContentClass: 'grow',
			verticalRootClass: 'flex',
			viewportClass: 'overflow-hidden'
		});
		const tabOptions = resolveTabStateOptions({
			props: {
				active: 1,
				activeInjClass: 'active-line',
				activeTabInjClass: 'active-tab',
				duration: 'fast',
				height: 44,
				injClass: 'custom-tab',
				labels: ['A', 'B', 'C'],
				layout: 'h',
				lineType: false,
				love: true,
				mx: '2',
				overflow: false,
				radius: 'md',
				showIndexesOffset: 0,
				showNum: 3,
				tabInjClass: 'tab',
				width: 304
			}
		});
		expect(tabOptions).toMatchObject({ active: 1, width: 304, height: 44, labels: ['A', 'B', 'C'] });
		expect(resolveTabDerived(tabOptions)).toMatchObject({
			activeIndex: 1,
			normal: {
				rootClass: 'bg-black/5 dark:bg-white/10 relative p-0.5 rounded-md mx-2 custom-tab'
			},
			showOverflow: false
		});
	});

	test('resolves tab style values and strings', () => {
		expect(resolveTabWidthStyleValue({ width: 300 })).toEqual({ width: '300px' });
		expect(resolveTabWidthStyleString({ width: 300 })).toBe('width: 300px;');
		expect(resolveTabOverflowIndicatorStyleValue({ activeW: 100, activeH: 40, activeLeft: 202, lineType: true })).toEqual({
			width: '100px',
			height: '2px',
			left: '202px'
		});
		expect(resolveTabOverflowIndicatorStyleString({ activeW: 100, activeH: 40, activeLeft: 202, lineType: false })).toBe(
			'width: 100px;height: 40px;left: 202px;'
		);
		expect(
			resolveTabIndicatorStyleValue({ activeW: 100, activeH: 40, activeLeft: 102, activeTop: 42, lineType: true, layout: 'v' })
		).toEqual({
			width: '100px',
			height: '40px',
			left: '102px',
			top: '42px'
		});
		expect(resolveTabIndicatorStyleString({ activeW: 100, activeH: 40, activeLeft: 102, activeTop: 42, lineType: true, layout: 'h' })).toBe(
			'width: 100px;height: 2px;left: 102px;top: 42px;'
		);
	});

	test('resolves aggregate tab render state', () => {
		const state = resolveTabDerived({
			labels: [{ text: 'A' }, { text: 'B' }, { text: 'C' }, { text: 'D' }],
			active: 2,
			lineType: true,
			radius: 'lg',
			duration: 'fast',
			layout: 'h',
			love: true,
			injClass: 'root',
			tabInjClass: 'tab',
			activeTabInjClass: 'active-tab',
			activeInjClass: 'active-line',
			mx: '4',
			overflow: true,
			showNum: 3,
			width: 404,
			height: 44,
			overflowWidth: 354,
			overflowHeight: 44,
			showIndexesOffset: 1
		});

		expect(state.showOverflow).toBe(true);
		expect(state.normal.lineVisible).toBe(true);
		expect(state.overflow.lineVisible).toBe(true);
		expect(state.normal.indicatorStyleValue).toEqual({ width: '100px', height: '2px', left: '202px', top: '42px' });
		expect(state.overflow.indicatorStyleValue).toEqual({ width: '100px', height: '2px', left: '202px' });
		expect(state.overflow.listStyleString).toBe('width: 402px;');
		expect(state.items[2]).toMatchObject({
			active: true,
			index: 2,
			overflowButtonStyleValue: { width: '100px' }
		});
		expect(state.items[2].buttonClass).toContain('text-lg');
		expect(state.items[2].buttonClass).toContain('active-tab');
		expect(state.overflow.autoScrollState).toEqual({
			shouldScroll: false,
			scrollLeft: 0,
			offset: 1,
			offsetChanged: false
		});
	});
});

describe('tab bar derived', () => {
	test('resolves indicator, button and icon params', () => {
		expect(resolveTabBarMeasuredClientWidth()).toBe(0);
		expect(resolveTabBarMeasuredClientWidth({ clientWidth: 240 })).toBe(240);
		expect(resolveTabBarClickAction({ index: 2 })).toEqual({ nextActive: 2, shouldEmit: true });
		expect(resolveTabBarListClass()).toBe('flex justify-between');
		expect(resolveTabBarIndicatorMetrics({ tabWidth: 300, labelCount: 3, active: 1, lineW: 4 })).toEqual({
			itemWidth: 100,
			activeWidth: 25,
			width: 25,
			left: 137.5
		});
		expect(resolveTabBarIndicatorStyleString({ tabWidth: 300, labelCount: 3, active: 2, lineW: 0.5 })).toBe('width: 100px;left: 200px;');
		expect(resolveTabBarButtonClass({ active: true, love: true, tabInjClass: 'tab', activeTabInjClass: 'active' })).toContain(
			'text-primary dark:text-dark text-lg tab active'
		);
		expect(resolveTabBarTextClass({ hasIcon: false, active: true })).toBe('py-1 text-lg font-bold');
		expect(
			resolveTabBarIconProps({
				label: { icon: { name: 'home', size: 20 }, activeIcon: { name: 'home-fill', size: 24 } },
				active: true,
				love: true
			})
		).toEqual({
			name: 'home-fill',
			size: 28.799999999999997
		});
		expect(resolveTabBarIconPair({ label: { icon: { name: 'home', size: 20 } }, active: false, love: false })).toEqual({
			activeIcon: {
				name: 'home',
				size: 20
			},
			inactiveIcon: {
				name: 'home',
				size: 20
			},
			activeHidden: true,
			activeClass: 'hidden',
			inactiveClass: '',
			inactiveHidden: false
		});
		const itemDerived = resolveTabBarItemDerived({
			label: { text: 'Home', icon: { name: 'home', size: 20 }, activeIcon: { name: 'home-fill' } },
			index: 1,
			active: 1,
			tabInjClass: 'tab',
			activeTabInjClass: 'active'
		});
		expect(itemDerived.active).toBe(true);
		expect(itemDerived.hasIcon).toBe(true);
		expect(itemDerived.hasText).toBe(true);
		expect(itemDerived.buttonClass).toContain('text-primary dark:text-dark text-sm tab active');
		expect(itemDerived.iconWrapClass).toBe('');
		expect(itemDerived.textClass).toBe('mt-0.5');
		expect(itemDerived.iconProps).toEqual({ name: 'home-fill', size: 20 });
		expect(itemDerived.index).toBe(1);
		expect(itemDerived.label.text).toBe('Home');
		expect(resolveTabBarRootStyleValue()).toEqual({ paddingBottom: 'env(safe-area-inset-bottom)' });
		expect(resolveTabBarRootStyleString()).toBe('padding-bottom: env(safe-area-inset-bottom);');
		expect(
			resolveTabBarItemDerivedList({
				labels: [{ text: 'Home', icon: { name: 'home' } }, { text: 'Mine' }],
				active: 1,
				tabInjClass: 'tab',
				activeTabInjClass: 'active'
			})
		).toHaveLength(2);
		const options = resolveTabBarStateOptions({
			props: {
				labels: [{ text: 'Home', icon: { name: 'home' } }, { text: 'Mine' }],
				line: true,
				lineW: 2,
				injClass: 'root',
				tabInjClass: 'tab',
				activeTabInjClass: 'active',
				activeInjClass: 'indicator'
			},
			active: 1,
			tabWidth: 200
		});
		expect(options).toMatchObject({
			active: 1,
			tabWidth: 200,
			line: true,
			lineW: 2,
			injClass: 'root'
		});
		const tabBarState = resolveTabBarDerived(options);
		expect(tabBarState.rootClass).toContain('root');
		expect(tabBarState.listClass).toBe('flex justify-between');
		expect(tabBarState.rootStyleString).toBe('padding-bottom: env(safe-area-inset-bottom);');
		expect(tabBarState.showIndicator).toBe(true);
		expect(tabBarState.indicatorClass).toContain('indicator');
		expect(tabBarState.indicatorStyleValue).toEqual({ width: '50px', left: '125px' });
		expect(tabBarState.items[1].buttonClass).toContain('active');
	});
});

describe('tab content derived', () => {
	test('resolves visibility class', () => {
		expect(resolveTabContentClass(true)).toBe('flex-1');
		expect(resolveTabContentClass(false)).toBe('hidden flex-1');
	});
});

describe('loading derived', () => {
	test('resolves tone classes and animation duration styles', () => {
		expect(getLoadingToneColorClass('bg', { theme: true, leading: false })).toBe('bg-primary dark:bg-dark');
		expect(getLoadingSplitRingColorClass()).toBe(' text-black dark:text-white');
		expect(getLoadingSplitRingColorClass({ theme: true, leading: false })).toBe('text-primary dark:text-dark');
		expect(getLoadingSplitRingColorClass({ inverse: true })).toBe(' border-white dark:border-black');
		expect(getLoadingSplitRingColorClass({ theme: true, inverse: true, leading: false })).toBe('border-dark dark:border-primary');
		expect(resolveLoadingDurationSecond(1.5, 3)).toBe('0.5s');
		expect(resolveLoadingDurationSecond(0.6, 0.5, { clampAtBase: true })).toBe('0.6s');
		expect(resolveLoadingAnimationDurationStyle(1, 2)).toBe('animation-duration: 0.5s;-webkit-animation-duration: 0.5s;');
		expect(resolveLoadingAnimationDurationStyle(1, 2, { webkit: false })).toBe('animation-duration: 0.5s;');
		expect(resolveLoadingSizeClass({ height: '8', width: '12' })).toBe('h-8 w-12');
		expect(resolveLoadingSizeClass({ height: 'unknown', width: 'unknown' })).toBe('undefined undefined');
		expect(resolveLoadingComponentName('2_3')).toBe('Loading2_3');
		const loadingOptions = resolveLoadingStateOptions({ props: { height: '8', width: '12', type: '2_3' } });
		expect(loadingOptions).toEqual({ height: '8', width: '12', type: '2_3' });
		expect(resolveLoadingDerived(loadingOptions)).toEqual({ componentName: 'Loading2_3', sizeClass: 'h-8 w-12', type: '2_3' });
		expect(resolveLoadingOneColorClassState({ theme: true })).toMatchObject({
			bgClass: ' bg-primary dark:bg-dark',
			borderClass: ' border-primary dark:border-dark',
			spinBorderClass: ' border-primary/5 border-l-primary/100 dark:border-dark/5 dark:border-l-dark/100',
			strokeClass: ' stroke-primary dark:stroke-dark',
			textClass: ' text-primary dark:text-dark'
		});
		expect(resolveLoadingOneColorClassState({ inverse: true })).toMatchObject({
			bgClass: ' bg-white dark:bg-black',
			doubleSpinBorderClass:
				' border-white/5 border-l-white/100 dark:border-black/5 dark:border-l-black/100 border-r-white/100 dark:border-r-black/100',
			splitRingClass: ' border-white dark:border-black'
		});
		expect(resolveLoadingTwoColorClassState()).toEqual({
			bgClass: 'bg-primary dark:bg-dark',
			innerBorderClass: ' border-transparent dark:border-transparent border-l-primary dark:border-l-dark',
			outerBorderClass: ' border-black/10 dark:border-white/10',
			secondaryBgClass: 'bg-black/50 dark:bg-white/50',
			spinBorderClass:
				'border-black/5 dark:border-white/5 border-l-black/100 dark:border-l-white/100 border-r-black/100 dark:border-r-white/100'
		});
		expect(resolveLoadingTwoColorClassState({ inverse: true })).toEqual({
			bgClass: 'bg-dark dark:bg-primary',
			innerBorderClass: ' border-transparent dark:border-transparent border-l-dark dark:border-l-primary',
			outerBorderClass: ' border-white/10 dark:border-black/10',
			secondaryBgClass: 'bg-white/50 dark:bg-black/50',
			spinBorderClass:
				'border-white/5 border-l-white/100 dark:border-black/5 dark:border-l-black/100 border-r-white/100 dark:border-r-black/100'
		});
		expect(resolveLoadingBallScaleCss()).toContain('@keyframes ball-scale');
		expect(resolveLoadingBallScaleCss({ scope: 'rtdf_loading_1_5' })).toContain('.rtdf_loading_1_5 div');
		expect(resolveLoadingBallScaleCss({ scope: 'rtdf_loading_1_5' })).toContain('@keyframes rtdf_loading_1_5_ball-scale');
		expect(resolveLoadingHorizontalZoomCss({ scope: 'rtdf_loading_1_34' })).toContain('@keyframes rtdf_loading_1_34_zoom');
		expect(resolveLoadingHorizontalZoomCss({ scope: 'rtdf_loading_1_34' })).toContain('translateX(100%)');
		expect(resolveLoadingPulseScaleCss({ scope: 'rtdf_loading_1_51' })).toContain('.rtdf_loading_1_51 .dot');
		expect(resolveLoadingPulseScaleCss({ scope: 'rtdf_loading_1_51' })).toContain('@keyframes rtdf_loading_1_51_pulse');
		expect(resolveLoadingLinePulseCss({ scope: 'rtdf_loading_1_23' })).toContain('transform-origin: center bottom;');
		expect(resolveLoadingRadialDotPulseCss({ scope: 'rtdf_loading_1_28' })).toContain('opacity: 0.5;');
		expect(resolveLoadingThreeDotPulseCss({ scope: 'rtdf_loading_1_47' })).toContain(
			'animation: rtdf_loading_1_47_pulse ease-in-out infinite both;'
		);
		expect(resolveLoadingMidpointPulseCss({ scope: 'rtdf_loading_1_50' })).toContain('opacity: 0.25;');
		expect(resolveLoadingBarGrowCss({ scope: 'rtdf_loading_1_31' })).toContain('transform: scaleY(0.3);');
		expect(resolveLoadingHorizontalShuttleCss({ scope: 'rtdf_loading_1_35' })).toContain('translateX(-95%)');
		expect(resolveLoadingVerticalJumpCss({ scope: 'rtdf_loading_1_40', distance: '120%' })).toContain('translateY(-120%)');
		expect(resolveLoadingVerticalJumpCss({ scope: 'rtdf_loading_1_43' })).toContain('translateY(-100%)');
		expect(resolveLoadingLineRotateCss({ scope: 'rtdf_loading_1_52', alternate: true })).toContain('infinite alternate');
		expect(resolveLoadingLineRotateCss({ scope: 'rtdf_loading_1_53' })).toContain('rotate(180deg)');
		expect(resolveLoadingOrbitalScaleCss({ scope: 'rtdf_loading_1_39' })).toContain(
			'transform: translateX(calc(32px * 0.25)) scale(0.73684);'
		);
		expect(resolveLoadingOrbitalScaleCss({ scope: 'rtdf_loading_1_41', targetClass: 'container' })).toContain(
			'.rtdf_loading_1_41 .container'
		);
		expect(resolveLoadingPairedPendulumCss({ scope: 'rtdf_loading_1_45' })).toContain('@keyframes rtdf_loading_1_45_swing2');
		expect(resolveLoadingPairedPendulumDotClass(0)).toBe('dot relative flex h-full w-1/4 items-center dot1');
		expect(resolveLoadingPairedPendulumDotClass(2)).toBe('dot relative flex h-full w-1/4 items-center');
		expect(resolveLoadingPairedPendulumDotClass(3)).toBe('dot relative flex h-full w-1/4 items-center dot2');
		expect(resolveLoadingPairedPendulumBarClass(' bg-primary')).toBe('h-1/4 w-full rounded-full bg-primary');
		expect(resolveLoadingHalfTurnSwingCss({ scope: 'rtdf_loading_1_48' })).toContain('transform: rotate(180deg);');
		expect(resolveLoadingLeapFrogCss({ scope: 'rtdf_loading_1_44' })).toContain('33.333%');
		expect(resolveLoadingStreamCss({ scope: 'rtdf_loading_1_46' })).toContain('.rtdf_loading_1_46 .stream-track');
		expect(resolveLoadingStreamTrackClass()).toBe('stream-track relative flex h-1/5 w-full items-center justify-between');
		expect(resolveLoadingStrokeTravelCss({ scope: 'rtdf_loading_1_24', includeTransition: true })).toContain(
			'transition: stroke 0.5s ease;'
		);
		expect(resolveLoadingStrokeTravelCss({ scope: 'rtdf_loading_1_25', dasharray: '25, 75', includeLineCap: false })).toContain(
			'stroke-dasharray: 25, 75;'
		);
		expect(resolveLoadingStrokeTravelCss({ scope: 'rtdf_loading_1_26', endOffset: 100, includeFillNone: true })).toContain('fill: none;');
		expect(resolveLoadingStrokeTravelFadeCss({ scope: 'rtdf_loading_1_38' })).toContain('@keyframes rtdf_loading_1_38_fade');
		expect(resolveLoadingCornerTravelCss({ scope: 'rtdf_loading_1_9' })).toContain('translate(200%, 200%)');
		expect(resolveLoadingDotFadeScaleCss({ scope: 'rtdf_loading_1_10' })).toContain('transform: scale(0.75);');
		expect(resolveLoadingClippedRingRotateCss({ scope: 'rtdf_loading_1_13' })).toContain('rotate(360deg)');
		expect(resolveLoadingFallingDotCss({ scope: 'rtdf_loading_1_16' })).toContain('translateY(145%)');
		expect(resolveLoadingDotPulseCss({ scope: 'rtdf_loading_1_17' })).toContain('opacity: 0.1;');
		expect(resolveLoadingSquareSwapCss({ scope: 'rtdf_loading_1_6' })).toContain('@keyframes rtdf_loading_1_6_loading2');
		expect(resolveLoadingTwoDotElasticCss({ scope: 'rtdf_loading_1_7' })).toContain('cubic-bezier(0.2, 0.68, 0.18, 1.08)');
		expect(resolveLoadingClimbingDotCss({ scope: 'rtdf_loading_1_12' })).toContain('animation-delay: -1200ms;');
		expect(resolveLoadingClimbingDotStepClass(2)).toBe('step3');
		expect(resolveLoadingClimbingDotStepRootClass({ stepIndex: 2, bgClass: ' bg-primary' })).toBe(
			'absolute top-0 right-0 bg-primary steps step3'
		);
		expect(resolveLoadingElasticDotsCss({ scope: 'rtdf_loading_1_15' })).toContain('left: 150%;');
		expect(resolveLoadingElasticDotStyle({ color: '#111', index: 4, speed: 2 })).toBe(
			'left:100%;background: #111;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOrbitSpinCss({ scope: 'rtdf_loading_1_27' })).toContain('@keyframes rtdf_loading_1_27_smoothRotate');
		expect(resolveLoadingOrbitSpinContainerStyle(2)).toBe('animation-duration: 1s;');
		expect(resolveLoadingOrbitSpinDotStyle({ delayMultiplier: -0.5, speed: 2 })).toBe('animation-duration: 1s;animation-delay: -0.25s;');
		expect(resolveLoadingOrbitSpinInnerStyle({ color: '#222', delayMultiplier: -0.5, speed: 2 })).toBe(
			'background-color: #222;animation-delay: -0.25s;'
		);
		expect(resolveLoadingRadialOscillateCss({ scope: 'rtdf_loading_1_29' })).toContain('@keyframes rtdf_loading_1_29_oscillate');
		expect(resolveLoadingCubeMorphCss({ scope: 'rtdf_loading_1_30' })).toContain('scaleY(1.15) scaleX(0.9)');
		expect(resolveLoadingCubeStyle({ delayMultiplier: -0.2, speed: 2 })).toBe(
			'animation-duration: 0.875s;animation-delay: -0.17500000000000002s;'
		);
		expect(resolveLoadingCubeRootClass()).toBe('cube h-2 w-2');
		expect(resolveLoadingCubeInnerClass(' bg-primary')).toBe('cube__inner h-2 w-2 rounded-xs bg-primary');
		expect(resolveLoadingCubeInnerStyle({ color: '#333', delayMultiplier: -0.2, speed: 2 })).toBe(
			'background-color: #333;animation-duration: 0.875s;animation-delay: -0.17500000000000002s;'
		);
		expect(resolveLoadingExploreLineCss({ scope: 'rtdf_loading_1_32' })).toContain('12.50001%');
		expect(resolveLoadingExploreCenterLineStyle({ color: '#444', speed: 2 })).toContain('top: calc(50% - 2px);');
		expect(resolveLoadingExploreLineStyle({ color: '#555', delayMultiplier: -0.5 })).toBe(
			'background-color: #555;animation-duration: 4s;animation-delay: -2s;'
		);
		expect(resolveLoadingHalfFlowCss({ scope: 'rtdf_loading_1_33' })).toContain('30.001%');
		expect(resolveLoadingHalfFlowCss({ scope: 'rtdf_loading_1_33' })).toContain('border-radius: 9999px;');
		expect(resolveLoadingHalfFlowContainerStyle(2)).toBe('animation-duration: 1.75s;');
		expect(resolveLoadingHalfFlowWrapClass()).toBe('loading-half-wrap isolation absolute flex items-center justify-center overflow-hidden');
		expect(resolveLoadingHalfFlowWrapStyle('trailing')).toContain('transform: rotate(180deg);');
		expect(resolveLoadingHalfFlowPieceClass('leading')).toBe('half1');
		expect(resolveLoadingHalfFlowPieceRootClass({ section: 'leading', bgClass: ' bg-primary' })).toBe(
			'half1 relative h-full w-full origin-bottom-right bg-primary'
		);
		expect(resolveLoadingHalfFlowPieceRootClass({ section: 'trailing', bgClass: ' bg-primary' })).toBe(
			'half2 relative h-full w-full origin-bottom-right z-10 bg-primary'
		);
		expect(resolveLoadingHalfFlowOverlayClass(' bg-primary')).toBe(
			'absolute left-0 top-0 h-full w-full rounded-full opacity-10 bg-primary'
		);
		expect(resolveLoadingHalfFlowPieceStyle({ color: '#666', section: 'trailing', speed: 2 })).toBe(
			'background-color: #666;animation-duration: 1.75s;animation-delay: -0.875s;'
		);
		expect(resolveLoadingWobbleCss({ scope: 'rtdf_loading_1_42' })).toContain('translateY(65%)');
		expect(resolveLoadingWobbleContainerStyle(2)).toBe('animation-duration: 0.75s;');
		expect(resolveLoadingWobbleRotationClass()).toBe('absolute h-full');
		expect(resolveLoadingRotateScaleCss({ scope: 'rtdf_loading_1_8' })).toContain('scale(0.6)');
		expect(resolveLoadingDotChaseScaleCss({ scope: 'rtdf_loading_1_11' })).toContain('left: 100%;');
		expect(resolveLoadingDotChaseScaleStyle({ color: '#111', index: 2, speed: 2 })).toBe(
			'animation-delay: -1s, -1.5s;top:calc(5);background: #111;animation-duration: 1.25s;-webkit-animation-duration: 1.25s;'
		);
		expect(resolveLoadingClippedInnerRingStyle({ color: '#222', speed: 3 })).toBe(
			'animation-direction: reverse;border-color: #222;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingClipRotatePulseCss({ scope: 'rtdf_loading_1_14' })).toContain('opacity: 0.3;');
		expect(resolveLoadingCircularStretchCss({ scope: 'rtdf_loading_1_22' })).toContain('stroke-dasharray: 75, 150;');
		expect(resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_4_0' })).toContain('@keyframes rtdf_loading_4_0_loading-animation');
		expect(resolveLoadingDoubleRotateCss({ scope: 'rtdf_loading_4_0' })).toContain('rotate(720deg)');
		expect(resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_4_1' })).toContain('@keyframes rtdf_loading_4_1_animationShape4');
		expect(resolveLoadingFourShapeTranslateCss({ scope: 'rtdf_loading_4_1' })).toContain('translate(16px, -16px)');
		expect(resolveLoadingFourShapePositionCss({ scope: 'rtdf_loading_4_2' })).toContain('top: 66.6666666667%;');
		expect(
			resolveLoadingFourShapePositionCss({
				scope: 'rtdf_loading_4_3',
				containerDurationBase: 1.2,
				mode: 'quarters',
				shapeDurationBase: 0.6
			})
		).toContain('left: -10%;');
		const tree = {
			id: 'root',
			children: [
				{ id: 'a', children: [{ id: 'a1', children: [] }] },
				{ id: 'b', children: [] }
			]
		};
		expect(resolveLoadingDescendants(tree).map((item) => item.id)).toEqual(['a', 'a1', 'b']);
		expect(resolveLoadingAnimationTargets(tree).map((item) => item.id)).toEqual(['root', 'a', 'a1', 'b']);
		expect(resolveLoadingAnimationPlayState(true)).toBe('running');
		expect(resolveLoadingAnimationPlayState(false)).toBe('paused');
		expect(
			resolveLoadingIntersectionState({
				rect: { bottom: 10, height: 10, left: 0, right: 10, top: 0, width: 10 },
				viewportHeight: 100,
				viewportWidth: 100
			})
		).toBe(true);
		expect(
			resolveLoadingIntersectionState({
				rect: { bottom: 0, height: 10, left: 0, right: 10, top: -10, width: 10 },
				viewportHeight: 100,
				viewportWidth: 100
			})
		).toBe(false);
	});

	test('resolves color and indexed dot style strings', () => {
		expect(resolveLoadingIndexDelayMs(2, 100, -300)).toBe(-100);
		expect(resolveLoadingColorStyle('background', '#101010')).toBe('background: #101010;');
		expect(resolveLoadingColorDurationStyle({ color: '#111111', durationBase: 0.5, speed: 2 })).toBe(
			'background: #111111;animation-duration: 0.25s;-webkit-animation-duration: 0.25s;'
		);
		expect(
			resolveLoadingIndexedDotStyle({ index: 1, delayStepMs: 100, delayOffsetMs: -300, color: '#222222', durationBase: 1, speed: 4 })
		).toBe('animation-delay: -200ms;background: #222222;animation-duration: 0.25s;-webkit-animation-duration: 0.25s;');
		expect(resolveLoadingThreeDotIndexedStyle({ index: 2, customColor: ['#abcdef'], speed: 2 })).toBe(
			'animation-delay: -100ms;background: #abcdef;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingFourShapeTranslateStyle({ customColor: ['#123456'], speed: 2 })).toBe(
			'background: #123456;animation-duration: 0.25s;-webkit-animation-duration: 0.25s;'
		);
	});

	test('resolves Loading preset style strings', () => {
		expect(resolveLoadingShapeContainerStyle({ variant: '1_19', speed: 2 })).toBe(
			'animation-duration: 0.8s;-webkit-animation-duration: 0.8s;'
		);
		expect(resolveLoadingShapeContainerClass({ kind: 'rotatedCorner', size: 'w-8 h-8' })).toBe('w-8 h-8 relative m-auto rotate-45');
		expect(resolveLoadingShapeContainerClass({ kind: 'loadingRelative', size: 'w-8 h-8' })).toBe('w-8 h-8 loading relative m-auto');
		expect(resolveLoadingLayoutClass({ kind: 'center', size: 'w-8 h-8' })).toBe('w-8 h-8 m-auto');
		expect(resolveLoadingLayoutClass({ className: 'scope', kind: 'flexColumn', size: 'w-8 h-8' })).toBe(
			'scope w-8 h-8 flex flex-col justify-center'
		);
		expect(resolveLoadingLayoutClass({ kind: 'flexColumn', size: 'w-8 h-8' })).toBe('w-8 h-8 flex flex-col justify-center');
		expect(resolveLoadingLayoutClass({ kind: 'relativeCenter', size: 'w-8 h-8' })).toBe('w-8 h-8 relative m-auto');
		expect(resolveLoadingLayoutClass({ kind: 'relativeCenterBox', size: 'w-8 h-8' })).toBe('w-8 h-8 relative m-auto box-border');
		expect(resolveLoadingLayoutClass({ kind: 'flexBetween', size: 'w-8 h-8' })).toBe('w-8 h-8 m-auto flex items-center justify-between');
		expect(resolveLoadingLayoutClass({ kind: 'loadingFlexBetween', size: 'w-8 h-8' })).toBe(
			'w-8 h-8 loading m-auto flex items-center justify-between'
		);
		expect(resolveLoadingLayoutClass({ kind: 'containerRelativeFlexCenter', size: 'w-8 h-8' })).toBe(
			'w-8 h-8 container relative m-auto flex items-center'
		);
		expect(resolveLoadingLayoutClass({ kind: 'trackShell', size: 'w-8 h-8' })).toBe('w-8 h-8 relative m-auto overflow-hidden rounded-full');
		expect(resolveLoadingLayoutClass({ kind: 'svgFullSized', size: 'w-8 h-8' })).toBe(
			'w-8 h-8 m-auto h-full w-full origin-center overflow-visible'
		);
		expect(resolveLoadingTrackShellStyle()).toBe('height:4px');
		expect(resolveLoadingShapePieceClass({ variant: 'cornerThird', index: 2, bgClass: ' bg-primary' })).toBe(
			'shape3 absolute bottom-0 right-0 h-1/3 w-1/3 bg-primary'
		);
		expect(resolveLoadingShapePieceClass({ variant: 'roundThird', index: 0, bgClass: ' bg-primary' })).toBe(
			'shape1 absolute h-1/3 w-1/3 rounded-full bg-primary'
		);
		expect(resolveLoadingShapePieceClass({ variant: 'roundHalf', index: 3, bgClass: ' bg-primary' })).toBe(
			'shape4 absolute h-1/2 w-1/2 rounded-bl-full bg-primary'
		);
		expect(resolveLoadingRoundDotClass({ bgClass: ' bg-primary', className: 'dot', size: 'sm' })).toBe(
			'dot h-1.5 w-1.5 rounded-full bg-primary'
		);
		expect(resolveLoadingRoundDotClass({ bgClass: ' bg-primary', className: 'loading' })).toBe('loading h-2 w-2 rounded-full bg-primary');
		expect(resolveLoadingBallScaleDotClass({ bgClass: ' bg-primary', size: 'w-8 h-8' })).toBe('w-8 h-8 m-auto rounded-full bg-primary');
		expect(resolveLoadingSquareSwapDotClass({ bgClass: ' bg-primary', index: 1 })).toBe(
			'absolute loading2 h-1/3 w-1/3 rounded-full bg-primary'
		);
		expect(resolveLoadingTwoDotElasticDotClass({ bgClass: ' bg-primary', index: 1 })).toBe(
			'flex-1 loading2 h-1/2 w-1/2 rounded-full bg-primary'
		);
		expect(resolveLoadingElasticDotClass({ bgClass: ' bg-primary', index: 2 })).toBe(
			'absolute loading3 top-1/2 h-1/4 w-1/4 rounded-full bg-primary'
		);
		expect(resolveLoadingDotChaseScaleDotClass(' bg-primary')).toBe(
			'absolute -left-1/2 top-1/4 loading opacity-60 h-4 w-4 rounded-full bg-primary'
		);
		expect(resolveLoadingRoundedElementClass({ bgClass: ' bg-primary', className: 'dot absolute', size: 'stream' })).toBe(
			'dot absolute h-full w-1/5 rounded-full bg-primary'
		);
		expect(
			resolveLoadingRoundedElementClass({ bgClass: ' bg-primary', className: 'dot absolute left-0 top-0', size: 'zeroFullWidth' })
		).toBe('dot absolute left-0 top-0 h-0 w-full rounded-full bg-primary');
		expect(resolveLoadingRoundedElementClass({ bgClass: ' bg-primary', className: 'absolute loading1', size: 'third' })).toBe(
			'absolute loading1 h-1/3 w-1/3 rounded-full bg-primary'
		);
		expect(resolveLoadingRoundedElementClass({ bgClass: ' bg-primary', className: 'absolute ball', size: 'none' })).toBe(
			'absolute ball rounded-full bg-primary'
		);
		expect(resolveLoadingBorderElementClass({ kind: 'topSpinnerRing', size: 'w-8 h-8', colorClass: ' border-primary' })).toBe(
			'w-8 h-8 m-auto border-2 border-primary animate-spin rounded-full border-t-transparent dark:border-t-transparent'
		);
		expect(resolveLoadingBorderElementClass({ kind: 'borderCapEnd', colorClass: ' border-primary' })).toBe(
			'absolute bottom-0 right-0 border-primary border-l-1.25 border-r-1.25 border-t-1.25 border-l-transparent border-r-transparent dark:border-l-transparent dark:border-r-transparent'
		);
		expect(
			resolveLoadingBorderElementClass({ kind: 'splitSpinnerRing', className: 'relative', size: 'h-8 w-8', colorClass: ' border-primary' })
		).toBe(
			'relative h-8 w-8 m-auto border-2 rounded-full border-primary animate-spin border-b-transparent border-t-transparent dark:border-b-transparent dark:border-t-transparent'
		);
		expect(resolveLoadingBorderElementClass({ kind: 'clippedOuterRing', size: 'w-8 h-8', colorClass: ' border-primary' })).toBe(
			'absolute left-1/2 top-1/2 w-8 h-8 m-auto border-2 !border-l-transparent !border-r-transparent rounded-full border-primary loading'
		);
		expect(resolveLoadingBorderElementClass({ kind: 'nestedSpinnerInner', colorClass: ' border-primary' })).toBe(
			'h-full w-full border-2 rounded-full border-primary'
		);
		expect(resolveLoadingSvgStrokeClass({ className: 'track opacity-10', strokeClass: ' stroke-primary' })).toBe(
			'track opacity-10 stroke-primary'
		);
		expect(resolveLoadingSvgStrokeClass({ className: 'car', strokeClass: ' stroke-primary' })).toBe('car stroke-primary');
		expect(resolveLoadingSpinnerSvgClass(' text-primary')).toBe('animate-spin text-primary');
		expect(resolveLoadingStretchSvgClass(' text-primary')).toBe(
			'container overflow-visible will-change-transform origin-center text-primary'
		);
		expect(resolveLoadingTrackOverlayClass(' bg-primary')).toBe('absolute h-full w-full opacity-10 bg-primary');
		expect(resolveLoadingTrackBarClass(' bg-primary')).toBe('container h-full w-full rounded-full bg-primary');
		expect(resolveLoadingBarItemClass(' bg-primary')).toBe('bar h-full w-0.75 bg-primary');
		expect(resolveLoadingRotatingLineClass(' bg-primary')).toBe('line absolute left-0 h-1 w-full rounded-full bg-primary');
		expect(resolveLoadingPulseLineClass(' bg-primary')).toBe('h-1/5 rounded-full line bg-primary');
		expect(resolveLoadingPulseLineRowClass()).toBe('absolute left-1/2 flex h-8 w-0.75 flex-col gap-5 rounded-full bg-transparent');
		expect(resolveLoadingRadialDotRowClass()).toBe('absolute left-0 right-0 flex');
		expect(resolveLoadingVerticalJumpRowClass()).toBe('flex items-center justify-between');
		expect(resolveLoadingThreeDotPulseRowClass()).toBe('relative flex items-center justify-between');
		expect(resolveLoadingLeapFrogTrackClass()).toBe('dot absolute left-0 top-0 flex h-full w-full items-center');
		expect(resolveLoadingSwingLineClass()).toBe('dot absolute left-0 flex h-full w-full flex-col items-center');
		expect(resolveLoadingExploreLineClass({ bgClass: ' bg-primary', kind: 'center' })).toBe('line1 absolute w-1 h-1 bg-primary');
		expect(resolveLoadingExploreLineClass({ bgClass: ' bg-primary', kind: 'trail' })).toBe('line2 absolute w-1 h-1 bg-primary');
		expect(resolveLoadingOneColorShapeStyle({ variant: '1_19', customColor: ['#111111'], speed: 2 })).toBe(
			'background: #111111;animation-duration: 0.4s;-webkit-animation-duration: 0.4s;'
		);
		expect(resolveLoadingTwoColorShapeStyle({ variant: '2_4', index: 1, customColor: ['#111111', '#222222'], speed: 2 })).toBe(
			'background: #222222;animation-duration: 0.4s;-webkit-animation-duration: 0.4s;'
		);
		expect(resolveLoadingFourColorShapeStyle({ variant: '4_3', index: 2, customColor: [], speed: 2 })).toBe(
			'background: #7356BF;animation-duration: 0.3s;-webkit-animation-duration: 0.3s;'
		);
		expect(resolveLoadingOneColorBackgroundStyle({ customColor: ['#111111'] })).toBe('background: #111111;');
		expect(resolveLoadingOneColorBackgroundColorStyle({ customColor: ['#222222'] })).toBe('background-color: #222222;');
		expect(resolveLoadingOneColorColorStyle({ customColor: ['#333333'] })).toBe('color: #333333;');
		expect(resolveLoadingOneColorStrokeStyle({ customColor: ['#444444'] })).toBe('stroke: #444444;');
		expect(resolveLoadingOneColorSvgSpinStyle({ customColor: ['#555555'], speed: 2 })).toBe(
			'color: #555555;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorBaseStyle({ customColor: ['#666666'], speed: 2 })).toBe(
			'background: #666666;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorSlowStyle({ customColor: ['#777777'], speed: 3 })).toBe(
			'background: #777777;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorBorderBaseStyle({ customColor: ['#888888'], speed: 2 })).toBe(
			'border-color: #888888;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorBorderSlowStyle({ customColor: ['#999999'], speed: 3 })).toBe(
			'border-color: #999999;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorStrokeBaseStyle({ customColor: ['#aaaaaa'], speed: 2 })).toBe(
			'stroke: #aaaaaa;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOneColorStrokeTravelStyle({ customColor: ['#bbbbbb'], speed: 2 })).toBe(
			'stroke: #bbbbbb;animation-duration: 0.6s;-webkit-animation-duration: 0.6s;'
		);
		expect(resolveLoadingOneColorStrokeSlowStyle({ customColor: ['#cccccc'], speed: 3 })).toBe(
			'stroke: #cccccc;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingOrbitContainerStyle({ speed: 2 })).toBe('animation-duration: 1s;-webkit-animation-duration: 1s;');
		expect(resolveLoadingOrbitCarStyle({ speed: 3 })).toBe('animation-duration: 0.5s;-webkit-animation-duration: 0.5s;');
		expect(resolveLoadingOrbitSpinDotClass()).toBe('dot absolute left-0 right-0 flex');
		expect(resolveLoadingBaseAnimationStyle({ speed: 4 })).toBe('animation-duration: 0.25s;-webkit-animation-duration: 0.25s;');
	});

	test('resolves color duration delay style strings', () => {
		expect(resolveLoadingDurationSecond(2, 4, { multiplier: -0.5 })).toBe('-0.25s');
		expect(resolveLoadingDurationSecond(2, 4, { divisor: -2 })).toBe('-0.25s');
		expect(resolveLoadingColorDurationDelayStyle({ color: '#333333', durationBase: 2, speed: 4, delayMultiplier: -0.5 })).toBe(
			'background-color: #333333;animation-duration: 0.5s;animation-delay: -0.25s;'
		);
		expect(resolveLoadingColorDurationDelayStyle({ color: '#444444', durationBase: 2, speed: 4, delayDivisor: -2 })).toBe(
			'background-color: #444444;animation-duration: 0.5s;animation-delay: -0.25s;'
		);
	});

	test('resolves multi-color loading styles', () => {
		expect(resolveLoadingFourColor([], 0)).toBe('#DA1414');
		expect(resolveLoadingFourColor(['#000000'], 0)).toBe('#000000');
		expect(resolveLoadingFourColorDurationStyle({ customColor: [], index: 2, durationBase: 0.8, speed: 2 })).toBe(
			'background: #7356BF;animation-duration: 0.4s;-webkit-animation-duration: 0.4s;'
		);
		expect(resolveLoadingFourColorBorderDurationStyle({ customColor: ['#1', '#2', '#3', '#4'], durationBase: 2, speed: 4 })).toBe(
			'border-color: #1 #2 #3 #4;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingTwoColorBorderDurationStyle({ customColor: ['#1'], durationBase: 2, speed: 4 })).toBe(
			'border-color: #1  #1 ;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
	});

	test('resolves border loading styles', () => {
		expect(
			resolveLoadingBorderTransparentDurationStyle({ color: '#111111', durationBase: 1, speed: 2, transparentSides: ['border-top-color'] })
		).toBe('border-color: #111111;border-top-color:transparent;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;');
		expect(
			resolveLoadingBorderTransparentDurationStyle({
				color: '#111111',
				durationBase: 1,
				speed: 2,
				prefixStyle: 'animation-direction: reverse;'
			})
		).toBe('animation-direction: reverse;border-color: #111111;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;');
		expect(resolveLoadingAlphaBorderDurationStyle({ color: '#222222', durationBase: 2, speed: 4 })).toBe(
			'border-color:#2222220D;border-left-color:#222222FF;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingAlphaBorderDurationStyle({ color: undefined, durationBase: 2, speed: 4, fullBorder: true })).toBe(
			'border-color: undefined0D undefinedFF undefined0D undefinedFF;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
	});

	test('resolves timed loading styles', () => {
		expect(resolveLoadingTimedStyle({ durationBase: 2, speed: 4, includeDelay: false })).toBe('animation-duration: 0.5s;');
		expect(
			resolveLoadingTimedStyle({ color: '#555555', colorProperty: 'background-color', durationBase: 2, speed: 4, delayMultiplier: -0.5 })
		).toBe('background-color: #555555;animation-duration: 0.5s;animation-delay: -0.25s;');
		expect(resolveLoadingTimedStyle({ durationBase: 1, speed: 2, delayMultiplier: 3, delayDivisor: -12, includeDuration: false })).toBe(
			'animation-delay: -0.125s;'
		);
		expect(resolveLoadingTimedStyle({ durationBase: 1, speed: 2, includeDelay: false, webkit: true })).toBe(
			'animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingTimedStyle({ durationBase: 1.5, speed: 3, delayBase: 0.75 })).toBe(
			'animation-duration: 0.5s;animation-delay: 0.25s;'
		);
		expect(resolveLoadingTimedStyle({ durationBase: 1, speed: 2, delayBase: 1, delaySpeed: 1, delayMultiplier: -0.3 })).toBe(
			'animation-duration: 0.5s;animation-delay: -0.3s;'
		);
		expect(
			resolveLoadingTimedStyle({ durationBase: 4, speed: 2, includeDelay: false, prefixStyle: 'top: 50%;', suffixStyle: 'opacity: 0.5;' })
		).toBe('top: 50%;animation-duration: 2s;opacity: 0.5;');
		expect(resolveLoadingPairedPendulumDotStyle(3)).toBe('transform-origin: center top;animation-duration: 0.5s;');
	});

	test('exports loading layout sequences as pure data', () => {
		expect(loadingRadialDotDelayMultipliers).toEqual([0, -0.125, -0.25, -0.375, -0.5, -0.625, -0.75, -0.875]);
		expect(loadingPulseLineIndexes).toHaveLength(12);
		expect(loadingPulseLineIndexes[11]).toBe(11);
		expect(loadingCornerDotIndexes).toEqual([0, 1, 2]);
		expect(loadingOrbitSliceIndexes).toEqual([0, 1, 2, 3, 4, 5]);
		expect(loadingThreeDotIndexes).toEqual([0, 1, 2]);
		expect(loadingTwoDotIndexes).toEqual([0, 1]);
		expect(loadingFourDotIndexes).toEqual([0, 1, 2, 3]);
		expect(loadingFiveDotIndexes).toEqual([0, 1, 2, 3, 4]);
		expect(loadingClimbingDotStepIndexes).toEqual([0, 1, 2]);
		expect(loadingElasticDotLeftPercents).toEqual(['0', '25%', '50%', '75%', '100%']);
		expect(loadingExploreLineDelayMultipliers).toEqual([0, -0.5]);
		expect(loadingHalfFlowSections).toEqual(['leading', 'trailing']);
		expect(loadingSixDotDelayMultipliers).toEqual([0, -0.835, -0.668, -0.501, -0.334, -0.167]);
		expect(loadingEightRadialDelayMultipliers).toEqual([0, -0.875, -0.75, -0.625, -0.5, -0.375, -0.25, -0.125]);
		expect(loadingCubeDelayMultipliers).toEqual([0, -0.36, -0.2]);
		expect(loadingBarDelayMultipliers).toEqual([-0.45, -0.3, -0.15, 0]);
		expect(loadingWobbleRotations).toEqual([120, -120, 0]);
		expect(loadingSlideDotDelayMultipliers).toEqual([0, -0.2, -0.4, -0.6, -0.8]);
		expect(loadingThreeDotDelayMultipliers).toEqual([-0.375, -0.25, -0.125]);
		expect(loadingDualRingDelayDivisors).toEqual([0, -2]);
		expect(loadingQuarterDelayMultipliers).toEqual([0, -0.25, -0.5, -0.75]);
		expect(loadingDiagonalDotPositions[0]).toEqual([24, -35]);
		expect(loadingDiagonalDotDelayMultipliers.at(-1)).toBe(-0);
		expect(loadingLeapFrogOffsets).toEqual([0, 0.4, 0.8]);
		expect(loadingSwingDotOpacities).toEqual([1, 0.9, 0.6, 0.4]);
		expect(loadingRotatingLineFrames[2]).toEqual([-0.3, 0.6]);
	});

	test('resolves loading variant dot styles', () => {
		expect(resolveLoadingPulseLineTransformStyle(3)).toBe('transform: rotate(calc(360deg / -12*3));');
		expect(resolveLoadingRadialEightTransformStyle(2)).toBe('transform: rotate(calc(360deg / 8 * 2)); ');
		expect(resolveLoadingWobbleRotationStyle(120)).toBe('transform: rotate(120deg);left: 37.5%;width:25%;');
		expect(resolveLoadingRadialLineStyle(2, 2)).toBe('transform: rotate(90deg); animation-duration: 0.15s;');
		expect(resolveLoadingRadialDotStyle({ color: '#111111', delayMultiplier: -0.25, speed: 2 })).toBe(
			'transform: translateX(12px); background-color: #111111;animation-duration: 0.45s;animation-delay: -0.1125s;'
		);
		expect(resolveLoadingHalfFlowStyle({ color: '#222222', delayMultiplier: -0.5, speed: 2 })).toBe(
			'background-color: #222222;animation-duration: 1.75s;animation-delay: -0.875s;'
		);
		expect(resolveLoadingOrbitSliceStyle({ color: '#333333', index: 3, phase: 'trailing', speed: 5 })).toBe(
			'left: calc(50% - 32px / 12);width: calc(100% / 6);background-color: #333333;animation-duration: 0.5s;animation-delay: -0.5s;'
		);
		expect(resolveLoadingOrbitSliceRowClass()).toBe('relative w-full');
		expect(resolveLoadingOrbitSliceRowStyle()).toBe('height: calc(32px / 6);');
		expect(resolveLoadingOrbitSliceClass(' bg-primary')).toBe('slice absolute top-0 h-full shrink-0 rounded-full bg-primary');
		expect(resolveLoadingDiagonalDotStyle({ color: '#444444', index: 0, delayMultiplier: -0.48, speed: 3 })).toBe(
			'bottom: calc(24% + 1.6px);right: calc(-35% + 1.6px);background-color: #444444;animation-duration: 0.5s;animation-delay: -0.24s;'
		);
		expect(resolveLoadingWobbleDotStyle({ color: '#555555', speed: 3 })).toBe(
			'padding-bottom: 100%;background-color: #555555;animation-duration: 0.5s;'
		);
		expect(resolveLoadingLeapFrogStyle({ offset: 0.4, index: 2, speed: 5 })).toBe(
			'transform: translateX(12.8px);animation-duration: 0.5s;animation-delay: -0.16666666666666666s;'
		);
		expect(resolveLoadingSwingLineStyle(2, 4)).toBe('animation-duration: 0.4s;animation-delay: -0.08800000000000002s;');
		expect(resolveLoadingSwingDotStyle({ color: '#666666', index: 2, opacity: 0.6 })).toBe(
			'background-color: #666666;opacity: 0.6;transform: scale(0.8);'
		);
		expect(resolveLoadingBorderCapStyle({ color: '#777777', rotate: 225 })).toBe(
			'transform: rotate(225deg);border-color: #777777;border-right-color:transparent;border-left-color:transparent;'
		);
		expect(resolveLoadingCornerDotStyle({ color: '#888888', index: 1, speed: 3 })).toBe(
			'animation-delay: -1s;background: #888888;animation-duration: 0.5s;-webkit-animation-duration: 0.5s;'
		);
		expect(resolveLoadingClimbingDotBallStyle({ color: '#999999', speed: 0.5 })).toBe(
			'background: #999999;animation-duration: 0.6s;-webkit-animation-duration: 0.6s;'
		);
		expect(resolveLoadingClimbingDotStepStyle({ color: '#aaaaaa', speed: 2 })).toBe(
			'background: #aaaaaa;animation-duration: 0.9s;-webkit-animation-duration: 0.9s;'
		);
		expect(resolveLoadingTwoColorSolidBorderStyle('#bbbbbb')).toBe('border-color:#bbbbbb;');
		expect(resolveLoadingTwoColorTransparentBorderStyle('#cccccc')).toBe('border-color:transparent;border-left-color:#cccccc');
		expect(resolveLoadingTwoColorSolidBorderDurationStyle({ color: '#dddddd', speed: 4 })).toBe(
			'border-color:#dddddd;animation-duration: 0.25s;-webkit-animation-duration: 0.25s;'
		);
		expect(resolveLoadingTwoColorTransparentBorderDurationStyle({ color: '#eeeeee', speed: 4 })).toBe(
			'border-color:transparent;border-left-color:#eeeeee;animation-duration: 0.25s;-webkit-animation-duration: 0.25s;'
		);
		expect(resolveLoadingRotatingLineStyle({ color: '#ffffff', frame: loadingRotatingLineFrames[2], speed: 3, top: '50%' })).toBe(
			'background-color: #ffffff;animation-duration: 0.3s;animation-delay: -0.09s;top: 50%;opacity: 0.6;'
		);
	});
});

describe('svg data', () => {
	test('exports tag close icon data', () => {
		expect(tagCloseSvg).toEqual({
			viewBox: '0 0 24 24',
			paths: [
				{
					d: 'M12 10.5858L16.9497 5.63604L18.364 7.05025L13.4142 12L18.364 16.9497L16.9497 18.364L12 13.4142L7.05025 18.364L5.63604 16.9497L10.5858 12L5.63604 7.05025L7.05025 5.63604L12 10.5858Z'
				}
			],
			defaultFill: 'currentColor'
		});
		expect(
			resolveSvgRootAttrs({
				svg: { viewBox: '0 0 1 1', paths: [], defaultFill: 'currentColor', defaultStroke: 'none', defaultStrokeWidth: 2 }
			})
		).toEqual({
			viewBox: '0 0 1 1',
			fill: 'currentColor',
			stroke: 'none',
			strokeWidth: 2
		});
		expect(
			resolveSvgRootAttrs({ svg: { viewBox: '0 0 1 1', paths: [], defaultFill: 'currentColor' }, fill: '', stroke: 'red', strokeWidth: 1 })
		).toEqual({
			viewBox: '0 0 1 1',
			fill: 'currentColor',
			stroke: 'red',
			strokeWidth: 1
		});
		expect(resolveSvgNodeType({ d: 'M0 0H1' })).toBe('path');
		expect(resolveSvgNodeKey({ type: 'circle', cx: 0, cy: 0, r: 1 }, 2)).toBe('circle-2');
		expect(getSvgRenderableNodes({ viewBox: '0 0 1 1', paths: [{ d: 'M0 0H1' }] })).toEqual([{ type: 'path', d: 'M0 0H1' }]);
	});

	test('exports num keyboard icon data', () => {
		expect(numKeyboardDeleteSvg.viewBox).toBe('0 0 24 24');
		expect(numKeyboardDeleteSvg.paths[0]?.d).toContain('M6.53451 3H20.9993');
		expect(numKeyboardCloseSvg.viewBox).toBe('0 0 24 24');
		expect(numKeyboardCloseSvg.paths[0]?.d).toContain('M12.0001 10.0859');
	});

	test('calculates num keyboard svg size from height', () => {
		expect(getNumKeyboardSvgSize('12')).toBe(24);
		expect(getNumKeyboardSvgSize(10)).toBe(20);
	});

	test('exports shared state and form icon data', () => {
		expect(statusSvgByType.success).toBeDefined();
		expect(statusSvgByType.error.paths[0]?.d).toContain('L13.4142 12');
		expect(toastSvgByType.warning.paths[0]?.d).toContain('M11 15H13V17H11V15');
		expect(closePlainSvg.viewBox).toBe('0 0 24 24');
	});

	test('resolves built-in svg icon libraries', () => {
		expect(builtInIconLibraryList).toEqual(['remix', 'lucide', 'phosphor', 'tabler', 'iconoir', 'reicon']);
		expect(builtInIconLibraryLabelMap.phosphor).toBe('Phosphor');
		expect(builtInIconLibraryLabelMap.reicon).toBe('Reicon');
		expect(defaultBuiltInIconLibrary).toBe('remix');
		expect(reiconBuiltInIconSet.statusSuccess).toBe(resolveBuiltInSvg('statusSuccess', 'reicon'));
		expect(builtInIconGalleryList.some((item) => item.key === 'arrowRight')).toBe(true);
		expect(builtInIconGalleryList.some((item) => item.key === 'skeletonVideo')).toBe(true);
		expect(builtInIconGalleryList.some((item) => item.key === 'skeletonPalette')).toBe(false);
		expect(resolveBuiltInIconSet('remix').arrowRight).toBe(arrowRightSvg);
		expect(resolveBuiltInSvg('arrowRight')).toBe(arrowRightSvg);
		builtInIconLibraryList.forEach((library) => {
			expect(resolveBuiltInIconSet(library).arrowRight).toBeDefined();
			expect(resolveBuiltInSvg('statusSuccess', library)).toBeDefined();
		});
		builtInIconGalleryList.forEach(({ key }) => {
			builtInIconLibraryList.forEach((library) => {
				expect(resolveBuiltInIconSet(library)[key]).toBeDefined();
				expect(resolveBuiltInSvg(key, library)).toBe(resolveBuiltInIconSet(library)[key]);
			});
		});
		expect(resolveBuiltInSvg('arrowRight', 'lucide').defaultStroke).toBe('currentColor');
		expect(getSvgRenderableNodes(resolveBuiltInSvg('arrowRight', 'lucide'))[0]).toEqual(
			expect.objectContaining({ type: 'path', d: 'm9 18 6-6-6-6' })
		);
		[
			'statusSuccess',
			'statusError',
			'statusWarning',
			'statusInfo',
			'circleClose',
			'formClear',
			'checkboxChecked',
			'star',
			'rateStar',
			'listBackTop',
			'listCheck',
			'skeletonImage',
			'skeletonVideo',
			'skeletonCode',
			'skeletonQr',
			'skeletonBarcode'
		].forEach((key) => {
			const svg = resolveBuiltInSvg(key, 'lucide');
			expect(svg.defaultFill).toBe('currentColor');
			expect(svg.defaultStroke).toBeUndefined();
		});
		['toastSuccess', 'toastError', 'toastWarning', 'toastInfo', 'checkboxUnchecked', 'radioUnchecked'].forEach((key) => {
			const svg = resolveBuiltInSvg(key, 'lucide');
			expect(svg.defaultFill).toBe('none');
			expect(svg.defaultStroke).toBe('currentColor');
		});
		expect(resolveBuiltInSvg('statusSuccess', 'lucide').paths[0]?.fillRule).toBe('evenodd');
		expect(resolveBuiltInSvg('statusSuccess', 'phosphor').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('accordionPlus', 'phosphor').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('volume', 'phosphor').paths[0]?.d).toContain('M155.51 24.81');
		expect(resolveBuiltInSvg('listBackTop', 'lucide').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('listBackTop', 'phosphor').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('checkboxChecked', 'tabler').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('accordionArrowRight', 'tabler').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('statusInfo', 'iconoir').paths[0]?.fillRule).toBe('evenodd');
		expect(resolveBuiltInSvg('toastSuccess', 'phosphor')).not.toBe(resolveBuiltInSvg('statusSuccess', 'phosphor'));
		expect(resolveBuiltInSvg('toastSuccess', 'tabler').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('toastSuccess', 'iconoir').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('checkboxUnchecked', 'lucide')).not.toBe(resolveBuiltInSvg('checkboxChecked', 'lucide'));
		expect(getSvgRenderableNodes(resolveBuiltInSvg('checkboxUnchecked', 'lucide'))).toEqual([
			expect.objectContaining({ type: 'rect', width: 18, height: 18 })
		]);
		expect(resolveBuiltInSvg('checkboxUnchecked', 'phosphor')).not.toBe(resolveBuiltInSvg('checkboxChecked', 'phosphor'));
		expect(resolveBuiltInSvg('checkboxUnchecked', 'tabler').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('checkboxUnchecked', 'iconoir').defaultStroke).toBe('currentColor');
		expect(getSvgRenderableNodes(resolveBuiltInSvg('radioChecked', 'lucide'))).toEqual([
			expect.objectContaining({ type: 'circle', cx: 12, cy: 12, r: 10 }),
			expect.objectContaining({ type: 'circle', cx: 12, cy: 12, r: 2, fill: 'currentColor', stroke: 'none' })
		]);
		expect(resolveBuiltInSvg('radioChecked', 'tabler').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('radioChecked', 'tabler').paths[0]?.d).toContain('l4-4');
		expect(resolveBuiltInSvg('radioChecked', 'iconoir')).toBe(resolveBuiltInSvg('toastSuccess', 'iconoir'));
		expect(resolveBuiltInSvg('skeletonImage', 'phosphor').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('skeletonVideo', 'phosphor').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('skeletonBarcode', 'phosphor').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('skeletonVideo', 'lucide').defaultFill).toBe('currentColor');
		expect(getSvgRenderableNodes(resolveBuiltInSvg('calendarDisabled', 'lucide'))[0]).toEqual(
			expect.objectContaining({ type: 'path', d: 'M4.2 4.2A2 2 0 0 0 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 1.82-1.18' })
		);
		expect(resolveBuiltInSvg('skeletonImage', 'tabler').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('skeletonVideo', 'tabler').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('skeletonVideo', 'iconoir').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('statusSuccess', 'reicon').defaultFill).toBe('currentColor');
		expect(resolveBuiltInSvg('toastSuccess', 'reicon')).not.toBe(resolveBuiltInSvg('statusSuccess', 'reicon'));
		expect(resolveBuiltInSvg('volume', 'reicon').defaultStroke).toBe('currentColor');
		expect(resolveBuiltInSvg('radioChecked', 'reicon').paths[0]?.d).toContain('L11.0303 15.0303');
		expect(resolveBuiltInSvg('skeletonVideo', 'reicon').paths[0]?.fillRule).toBe('evenodd');
		expect(resolveBuiltInSvgFromData(arrowRightSvg, 'lucide')).toBe(resolveBuiltInSvg('arrowRight', 'lucide'));
		expect(resolveBuiltInSvgFromData(resolveBuiltInSvg('arrowRight', 'phosphor'), 'tabler')).toBe(
			resolveBuiltInSvg('arrowRight', 'tabler')
		);
		expect(resolveBuiltInSvgFromData(resolveBuiltInSvg('volume'), 'phosphor')).toBe(resolveBuiltInSvg('volume', 'phosphor'));
		expect(resolveBuiltInSvgFromData(resolveBuiltInSvg('checkboxChecked'), 'iconoir')).toBe(
			resolveBuiltInSvg('checkboxChecked', 'iconoir')
		);
		expect(resolveBuiltInSvgFromData(resolveBuiltInSvg('skeletonVideo'), 'tabler')).toBe(resolveBuiltInSvg('skeletonVideo', 'tabler'));
		expect(resolveBuiltInSvgFromData(resolveBuiltInSvg('skeletonVideo'), 'reicon')).toBe(resolveBuiltInSvg('skeletonVideo', 'reicon'));
		expect(resolveStatusSvgByType('lucide').success.paths.length).toBeGreaterThan(0);
		expect(resolveToastSvgByType('lucide').warning.nodes?.length).toBeGreaterThan(0);
		expect(resolveStatusSvgByType('iconoir').success.paths[0]?.fillRule).toBe('evenodd');
		expect(resolveToastSvgByType('phosphor').warning.defaultFill).toBe('currentColor');
		expect(resolveSkeletonSvgByType('lucide').img).toBe(resolveBuiltInSvg('skeletonImage', 'lucide'));
		expect(resolveSkeletonSvg('img', 'lucide')).toBe(resolveBuiltInSvg('skeletonImage', 'lucide'));
		expect(resolveSkeletonSvg('barcode', 'iconoir')).toBe(resolveBuiltInSvg('skeletonBarcode', 'iconoir'));
	});

	test('exports shared selector icon data', () => {
		expect(accordionArrowRightSvg.defaultStroke).toBe('currentColor');
		expect(arrowRightSvg.paths[0]?.d).toContain('M13.1714 12.0007');
		expect(checkboxCheckedSvg.paths[0]?.d).toContain('M4 3H20');
		expect(checkboxUncheckedSvg.paths[0]?.d).toContain('M5 5V19H19V5H5');
		expect(radioCheckedSvg.paths[0]?.d).toContain('M12 17');
		expect(radioUncheckedSvg.paths[0]?.d).toContain('M12 20C16.4183');
		expect(rateStarSvg.viewBox).toBe('0 0 24 24');
		expect(avatarUserSvg.paths[0]?.d).toContain('M20 22H18');
		expect(avatarGroupUserSvg.paths[0]?.d).toContain('M18 17V14H20');
		expect(skeletonSvgByType.img.paths[0]?.d).toContain('M5 11.1005');
		expect(skeletonSvgByType.barcode.paths[0]?.d).toContain('M2 4H4V20H2V4');
		expect(imageLineSvg.paths[0]?.d).toContain('M3 3H21');
		expect(refreshSvg.paths[0]?.d).toContain('M2 12C2 17.5228');
		expect(resolveSkeletonSvg('img')).toBe(skeletonSvgByType.img);
		expect(resolveSkeletonSvg('div')).toBeUndefined();
		expect(fullKeyboardShiftSvg.viewBox).toBe('0 0 14 12');
	});

	test('exports loading animation svg path data', () => {
		expect(loadingOneColor0Svg.viewBox).toBe('0 0 24 24');
		expect(loadingOneColor0Svg.nodes?.[1]?.strokeDasharray).toBe('69.11503837897544');
		expect(loadingOneColor22Svg.nodes?.[0]?.type).toBe('circle');
		expect(loadingOneColor22Svg.nodes?.[1]?.className).toBe('car stroke-1.25');
		expect(loadingOneColor25Svg.nodes?.[0]?.type).toBe('rect');
		expect(loadingOneColor25Svg.nodes?.[1]?.pathLength).toBe('100');
		expect(loadingOneColor24Svg.viewBox).toBe('0 0 37 37');
		expect(loadingOneColor24Svg.path.strokeWidth).toBe('5');
		expect(loadingOneColor26Svg.width).toBe('37');
		expect(loadingOneColor36Svg.path.d).toContain('M26.7,12.2');
		expect(loadingOneColor37Svg.height).toBe('40');
		expect(loadingOneColor38Svg.path.d).toContain('M0.625 21.5');
	});

	test('exports progress loop svg data', () => {
		expect(progressLoopSvg).toEqual({
			viewBox: '0 0 24 24',
			center: 12
		});
	});
});
