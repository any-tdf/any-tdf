<script lang="ts">
	import { page } from '$app/state';

	// 与首页一致，通过 sessionStorage 判断当前语言，存储被禁用（如 sandbox 的 iframe）时默认中文
	// Consistent with the home page, judge the current language by sessionStorage, default to Chinese when storage is disabled (e.g. sandboxed iframe)
	const isZh = (() => {
		try {
			return sessionStorage.getItem('lang') === 'zh_CN';
		} catch {
			return true;
		}
	})();
</script>

<div class="flex flex-col items-center justify-center px-4 py-24">
	<div class="text-primary dark:text-dark text-6xl font-bold">{page.status}</div>
	<div class="mt-4 text-sm text-gray-500">{isZh ? '页面不存在或加载出错' : 'Page not found or failed to load'}</div>
	<a href="/" class="text-primary dark:text-dark mt-8 text-sm underline">{isZh ? '返回首页' : 'Back to Home'}</a>
</div>
