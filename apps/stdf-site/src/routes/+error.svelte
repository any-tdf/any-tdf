<script lang="ts">
	const isZh = localStorage.getItem('lang') === 'zh_CN';
</script>

<div class="flex h-screen flex-col items-center justify-center">
	<div class="flex flex-col items-center">
		<div class="flex items-center gap-1">
			<div class="text-primary dark:text-dark mb-4 text-9xl font-bold">4</div>
			<div>
				<svg viewBox="0 0 100 100" class="svg-spin size-20">
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M50 0V100C22.3858 100 0 77.6142 0 50C0 22.3858 22.3858 0 50 0Z"
						class="fill-dark"
					/>
					<path
						fill-rule="evenodd"
						clip-rule="evenodd"
						d="M50 100V0C77.6142 0 100 22.3858 100 50C100 77.6142 77.6142 100 50 100Z"
						class="fill-primary"
					/>
					<circle cx="50" cy="25" r="25" class="fill-primary" />
					<circle cx="50" cy="75" r="25" class="fill-dark" />
					<circle cx="50.25" cy="25.25" r="6.25" class="fill-dark" />
					<circle cx="50.25" cy="75.25" r="6.25" class="fill-primary" />
				</svg>
			</div>
			<div class="text-primary dark:text-dark mb-4 text-9xl font-bold">4</div>
		</div>
		<p class="mb-8 text-black/60 dark:text-white/60">{isZh ? '抱歉，页面未找到' : 'Sorry, page not found'}</p>
		<a href="/" class="bg-primary dark:bg-dark rounded px-6 py-2 text-white hover:opacity-90 dark:text-black">
			{isZh ? '返回首页' : 'Back to home'}
		</a>
	</div>
</div>
