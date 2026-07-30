## Mobile Adaptation

Since mobile devices don't have hover events, the Tooltip component uses click/tap as the trigger method. Click the trigger element to show the tooltip, and click again or click elsewhere to hide it.

## Different States

The `state` property allows you to set the color scheme of the Tooltip, supporting the following states:

- `black`: Black background, suitable for general tips (default)
- `theme`: Theme color background, suitable for emphasized tips
- `success`: Success state
- `warning`: Warning state
- `error`: Error state
- `info`: Info state

## Custom Content

In addition to passing text content via the `content` property, you can use the `contentSnippet` Snippet to customize more complex content, such as tips with icons or multi-line content.

```svelte
<Tooltip>
  {#snippet contentSnippet()}
    <div class="flex items-center gap-2">
      <Icon name="ri-information-line" />
      <span>Custom content</span>
    </div>
  {/snippet}
  <Button>Trigger Element</Button>
</Tooltip>
```

## Manual Control

By using the `visible` property with `$bindable`, you can manually control the show/hide state of the Tooltip, which is useful for scenarios that require programmatic control.

## Show Delay

The `delay` property sets the show delay, and the `hideDelay` property sets the hide delay, both in milliseconds. This can provide a better user experience in certain scenarios.

## CSS Injection

The `injClass` parameter allows injecting CSS class names into the Tooltip component, and the `contentClass` parameter allows injecting CSS class names into the content area, providing more customization possibilities for component styles.

If the injected class doesn't take effect, add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
