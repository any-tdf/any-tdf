<script lang="ts">
	import { Button, Icon, Avatar } from 'stdf';
</script>

<div class="text-sm text-primary dark:text-dark">Here you inject something in the form of a component</div>
<div class="flex items-center space-x-4">
	<Button size="full" heightIn="2" injClass="px-4">button</Button>
	<Avatar image="/assets/images/avatar_1.jpg" size="sm" />
	<Icon name="ri-money-cny-circle-line" state="theme" />
	<Icon name="ri-fingerprint-line" state="theme" />
</div>
