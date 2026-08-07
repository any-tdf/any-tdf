// Web Storage 的安全读写封装，存储被禁用（如隐私模式）时静默兜底，避免渲染期抛错白屏
export const safeGetStorage = (storage: Storage, key: string): string | null => {
	try {
		return storage.getItem(key);
	} catch {
		return null;
	}
};

export const safeSetStorage = (storage: Storage, key: string, value: string) => {
	try {
		storage.setItem(key, value);
	} catch {
		// 存储不可用时忽略写入失败
	}
};
