/// <reference types="vite/client" />

declare module 'beautify-qrcode' {
	type QrcodeData = unknown;

	export const encodeData: (options: { text: string; isSpace?: boolean }) => QrcodeData;
	export const rendererLine: (
		data: QrcodeData,
		options?: {
			posType?: number;
			otherColor?: string;
			posColor?: string;
		}
	) => string;
}
