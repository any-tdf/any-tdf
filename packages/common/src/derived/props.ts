export type SplitCallbackValue<T extends object, TKey extends PropertyKey> = TKey extends keyof T ? T[TKey] | undefined : unknown;

export type ResolveConditionalPropsOptions<TProps extends object> = {
	enabled?: boolean;
	props?: TProps | null;
};

export type SplitPopupCallbacksResult<T extends object> = {
	popupProps: Omit<T, 'onClose'>;
	popupOnClose: SplitCallbackValue<T, 'onClose'>;
};

export type SplitButtonCallbacksResult<T extends object> = {
	buttonProps: Omit<T, 'onClick'>;
	buttonOnClick: SplitCallbackValue<T, 'onClick'>;
};

export type SplitTabCallbacksResult<T extends object> = {
	tabProps: Omit<T, 'onClickTab'>;
	tabOnClickTab: SplitCallbackValue<T, 'onClickTab'>;
};

// 输入绑定条件和 props，返回组件层可直接展开的 props 对象。
// Receive a binding condition and props, then return a props object the component layer can spread directly.
export const resolveConditionalProps = <TProps extends object>({
	enabled = false,
	props
}: ResolveConditionalPropsOptions<TProps>): TProps | Record<string, never> => {
	if (!enabled || !props) return {};
	return props;
};

// 输入组件配置对象，拆出 onClose 回调和可透传 props。
// Split component config into the onClose callback and pass-through props.
export const splitPopupCallbacks = <T extends object>(popup?: T | null): SplitPopupCallbacksResult<T> => {
	if (!popup) {
		return {
			popupProps: {} as Omit<T, 'onClose'>,
			popupOnClose: undefined as SplitPopupCallbacksResult<T>['popupOnClose']
		};
	}

	const { onClose: popupOnClose, ...popupProps } = popup as T & { onClose?: SplitPopupCallbacksResult<T>['popupOnClose'] };
	return {
		popupProps: popupProps as Omit<T, 'onClose'>,
		popupOnClose: popupOnClose as SplitPopupCallbacksResult<T>['popupOnClose']
	};
};

// 输入按钮配置对象，拆出 onClick 回调和可透传 props。
// Split button config into the onClick callback and pass-through props.
export const splitButtonCallbacks = <T extends object>(button?: T | null): SplitButtonCallbacksResult<T> => {
	if (!button) {
		return {
			buttonProps: {} as Omit<T, 'onClick'>,
			buttonOnClick: undefined as SplitButtonCallbacksResult<T>['buttonOnClick']
		};
	}

	const { onClick: buttonOnClick, ...buttonProps } = button as T & { onClick?: SplitButtonCallbacksResult<T>['buttonOnClick'] };
	return {
		buttonProps: buttonProps as Omit<T, 'onClick'>,
		buttonOnClick: buttonOnClick as SplitButtonCallbacksResult<T>['buttonOnClick']
	};
};

// 输入标签配置对象，拆出 onClickTab 回调和可透传 props。
// Split tab config into the onClickTab callback and pass-through props.
export const splitTabCallbacks = <T extends object>(tab?: T | null): SplitTabCallbacksResult<T> => {
	if (!tab) {
		return {
			tabProps: {} as Omit<T, 'onClickTab'>,
			tabOnClickTab: undefined as SplitTabCallbacksResult<T>['tabOnClickTab']
		};
	}

	const { onClickTab: tabOnClickTab, ...tabProps } = tab as T & { onClickTab?: SplitTabCallbacksResult<T>['tabOnClickTab'] };
	return {
		tabProps: tabProps as Omit<T, 'onClickTab'>,
		tabOnClickTab: tabOnClickTab as SplitTabCallbacksResult<T>['tabOnClickTab']
	};
};
