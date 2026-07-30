## FAQ

### What if the avatar group border color doesn't match the background?

You can inject custom ring color classes through `injClass`:

```svelte
<AvatarGroup {data} injClass="!ring-white dark:!ring-gray-900" />
```

### How to customize the top layer content?

Use Snippet to pass custom content:

```svelte
<AvatarGroup {data}>
	{#snippet top()}
		<div class="custom-top">Custom content</div>
	{/snippet}
</AvatarGroup>
```

### How to adjust if avatars overlap too much or too little?

Adjust the `compact` parameter. Higher values mean more overlap. Default is 5, you can set values between 0-10 as needed.
