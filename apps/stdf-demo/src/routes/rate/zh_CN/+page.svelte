<!-- Rate Demo -->
<script lang="ts">
	import { Rate, Icon } from 'stdf';

	let value = $state(2.5);
</script>

<div class="mx-4 mt-8 text-lg font-bold">基础用法</div>
<div class="p-4">
	<Rate />
</div>
<div class="mx-4 mt-8 text-lg font-bold">设置初始分数</div>
<div class="p-4">
	<Rate value={1} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">允许零分</div>
<div class="p-4">
	<Rate zero />
</div>
<div class="mx-4 mt-8 text-lg font-bold">自定义总分</div>
<div class="p-4">
	<Rate total={12} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">设置未选中透明度</div>
<div class="p-4">
	<Rate opacity="0.8" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">允许半选</div>
<div class="p-4">
	<Rate half />
</div>
<div class="mx-4 mt-8 text-lg font-bold">竖向半选</div>
<div class="p-4">
	<Rate half vertical />
</div>
<div class="mx-4 mt-8 text-lg font-bold">半选允许零分</div>
<div class="p-4">
	<Rate half zero />
</div>
<div class="mx-4 mt-8 text-lg font-bold">加大间距</div>
<div class="p-4">
	<Rate space="8" />
</div>
<div class="mx-4 mt-8 text-lg font-bold">禁用</div>
<div class="p-4">
	<Rate disabled />
</div>
<div class="mx-4 mt-8 text-lg font-bold">只读</div>
<div class="p-4">
	<Rate readonly />
</div>
<div class="mx-4 mt-8 text-lg font-bold">不同大小</div>
<div class="p-4">
	<Rate width={20} height={20} />
</div>
<div class="p-4">
	<Rate width={28} height={28} />
</div>
<div class="p-4">
	<Rate width={36} height={36} />
</div>
<div class="mx-4 mt-8 text-lg font-bold">自定义</div>
<div class="p-4">
	<Rate opacity="0.6">
		<Icon name="ri-star-fill" injClass="stdf-demo-text-star" />
	</Rate>
</div>
<div class="p-4">
	<Rate>
		<Icon name="ri-heart-3-fill" injClass="stdf-demo-text-red" />
	</Rate>
</div>
<div class="p-4">
	<Rate half>
		<Icon name="ri-heart-3-fill" injClass="stdf-demo-text-red" />
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity="0.5" width={30} height={36}>
		<div class="text-3xl">👍</div>
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity="0.5" width={30} height={36} vertical>
		<div class="text-3xl">🍺</div>
	</Rate>
</div>
<div class="p-4">
	<Rate half opacity="0.5" width={30} height={36}>
		<div class="text-3xl text-primary dark:text-dark">富</div>
	</Rate>
</div>
<div class="mx-4 mt-8 text-lg font-bold">监听事件</div>
<div class="p-4">
	<Rate half {value} onclick={(v) => (value = v)} />
	<p class="mt-2">评分：{value} 星</p>
</div>

<div class="mx-4 mt-8 text-lg font-bold">所有激活图标都有点击动画</div>
<div class="p-4">
	<Rate animation="active" />
</div>

<div class="mx-4 mt-8 text-lg font-bold">关闭点击动画</div>
<div class="p-4">
	<Rate animation={null} />
</div>
