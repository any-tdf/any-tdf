## 移动端适配

由于移动端没有悬停（hover）事件，Tooltip 组件使用点击（click/tap）作为触发方式。点击触发元素显示提示，再次点击或点击其他区域隐藏提示。

## 不同状态

通过 `state` 属性可以设置 Tooltip 的配色方案，支持以下状态：

- `black`：黑色背景，适合通用提示（默认）
- `theme`：主题色背景，适合强调性提示
- `success`：成功状态
- `warning`：警告状态
- `error`：错误状态
- `info`：信息状态

## 自定义内容

除了通过 `content` 属性传入文本内容，还可以使用 `contentSnippet` Snippet 自定义更复杂的内容，如带图标的提示、多行内容等。

```svelte
<Tooltip>
  {#snippet contentSnippet()}
    <div class="flex items-center gap-2">
      <Icon name="ri-information-line" />
      <span>自定义内容</span>
    </div>
  {/snippet}
  <Button>触发元素</Button>
</Tooltip>
```

## 手动控制

通过 `visible` 属性配合 `$bindable` 可以手动控制 Tooltip 的显示和隐藏状态，适用于需要程序化控制的场景。

## 延迟显示

通过 `delay` 属性可以设置显示延迟，`hideDelay` 属性可以设置隐藏延迟，单位均为毫秒。这在某些场景下可以提供更好的用户体验。

## CSS 注入

通过 `injClass` 参数可以向 Tooltip 组件注入 CSS 名称，`contentClass` 参数可以向内容区域注入 CSS 名称，这将使组件样式有更多自定义可能性。

若注入的 class 没生效，请在注入的 class 名称前添加"!" ，可参考 [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier)。
