declare module 'beautify-qrcode' {
	export const encodeData: (options: { text: string; isSpace?: boolean }) => unknown;
	export const rendererLine: (data: unknown, options?: Record<string, unknown>) => string;
}
