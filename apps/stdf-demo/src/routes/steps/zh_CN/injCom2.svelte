<script lang="ts">
	import { Button, Icon, Avatar } from 'stdf';
</script>

<div class="text-sm text-primary dark:text-dark">此处以组件形式注入一些内容</div>
<div class="flex items-center space-x-4">
	<Button size="full" heightIn="2" injClass="px-4">按钮</Button>
	<Avatar image="/assets/images/avatar_1.jpg" size="sm" />
	<Icon name="ri-money-cny-circle-line" state="theme" />
	<Icon name="ri-fingerprint-line" state="theme" />
</div>
