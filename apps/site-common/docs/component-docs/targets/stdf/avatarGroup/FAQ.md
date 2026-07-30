## 常见问题

### 头像组的边框颜色与背景色不一致怎么办？

可以通过 `injClass` 注入自定义的 ring 颜色类，例如：

```svelte
<AvatarGroup {data} injClass="!ring-white dark:!ring-gray-900" />
```

### 如何自定义顶层内容？

使用 Snippet 传入自定义内容：

```svelte
<AvatarGroup {data}>
	{#snippet top()}
		<div class="custom-top">自定义内容</div>
	{/snippet}
</AvatarGroup>
```

### 头像重叠太多或太少怎么调整？

调整 `compact` 参数，数值越大重叠越多。默认值为 5，可以根据需要设置 0-10 之间的值。
