<!-- Skeleton Demo -->
<script lang="ts">
	import { Skeleton } from 'stdf';
</script>

<div class="p-2">
	<div class="m-4 text-lg font-bold">Pulse Effect</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" effect="pulse" />
		<div class="grow">
			<Skeleton width="32" height="8" effect="pulse" />
			<Skeleton type="p" effect="pulse" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Wave Effect</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" effect="wave" />
		<div class="grow">
			<Skeleton width="32" height="8" effect="wave" />
			<Skeleton type="p" effect="wave" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">No Animation</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" effect="none" />
		<div class="grow">
			<Skeleton width="32" height="8" effect="none" />
			<Skeleton type="p" effect="none" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Breathe Effect</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" effect="breathe" />
		<div class="grow">
			<Skeleton width="32" height="8" effect="breathe" />
			<Skeleton type="p" effect="breathe" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Gray Background</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" bg="gray" />
		<div class="grow">
			<Skeleton width="32" height="8" bg="gray" />
			<Skeleton type="p" bg="gray" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Theme Background</div>
	<div class="flex">
		<Skeleton width="16" height="16" radius="4xl" bg="theme" />
		<div class="grow">
			<Skeleton width="32" height="8" bg="theme" />
			<Skeleton type="p" bg="theme" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Example 1</div>
	<div class="flex justify-between">
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
		<Skeleton width="16" height="16" />
	</div>
	<Skeleton width="32" height="8" />
	<Skeleton type="p" lines={5} />

	<div class="m-4 text-lg font-bold">Example 3</div>
	<div class="flex">
		<Skeleton type="img" width="24" height="24" />
		<div class="grow">
			<Skeleton type="p" />
		</div>
	</div>

	<div class="m-4 text-lg font-bold">Example 4</div>
	<div class="flex">
		<div class="grow">
			<Skeleton width="32" height="8" />
			<Skeleton type="p" />
		</div>
		<Skeleton type="video" width="32" height="32" />
	</div>

	<div class="m-4 text-lg font-bold">Example 5</div>
	<div class="flex flex-col items-center">
		<Skeleton width="24" height="24" radius="4xl" />
		<Skeleton width="16" height="6" />
		<Skeleton width="32" height="4" />
		<Skeleton type="qrcode" width="64" height="64" />
	</div>

	<div class="m-4 text-lg font-bold">Example 6</div>
	<!-- eslint-disable-next-line @typescript-eslint/no-unused-vars -->
	{#each [1, 1, 1] as _}
		<div class="flex items-center justify-between">
			<div class="flex">
				<div class="flex">
					<Skeleton width="12" height="12" radius="4xl" />
					<div class="flex flex-col justify-between">
						<Skeleton width="16" height="6" />
						<Skeleton width="32" height="4" />
					</div>
				</div>
			</div>
			<Skeleton width="16" height="8" radius="4xl" />
		</div>
		<Skeleton width="full" height="1" />
	{/each}
</div>
