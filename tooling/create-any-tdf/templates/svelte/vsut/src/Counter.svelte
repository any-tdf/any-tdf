<script lang="ts">
	import { Progress } from 'stdf';

	let { percent = $bindable(20) } = $props();
</script>

<div class="p-4">
	<Progress {percent} />
</div>
