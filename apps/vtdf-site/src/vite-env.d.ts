/// <reference types="vite/client" />

declare module '*.vue' {
	import type { DefineComponent } from 'vue';

	const component: DefineComponent<object, object, unknown>;
	export default component;
}

declare module '*.md' {
	const content: string;
	export default content;
}

declare module '*/package.json' {
	const content: {
		version: string;
		[key: string]: unknown;
	};
	export default content;
}
