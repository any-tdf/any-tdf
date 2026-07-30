## Tabs

The Tabs component internally uses the Tab component, and the tab in Tabs Props is fully passed through to Tab to configure different styles of Tab.

### Snippet

The transition in Tabs Props defaults to true, at which point the Tabs main content switches with transition effects. When transition is false, or position is 'l' or 'r', the Tabs main content will not have transition effects. It can be passed in through Svelte's [{#snippet ...}](https://svelte.dev/docs/svelte/snippet). Note that children needs to pass in the currently active Tab index value `{ active }` to expose it to the Snippet interior, and then combine with TabContent's show to control the display and hiding of the main content. Through the exposed active, you can also freely use other ways to control the transition effects of the main area content. The example shows one way, please try other switching effects in combination with specific business needs.

### Tab Position

Tabs determines the tab position through position (t: top, b: bottom, l: left, r: right), and this parameter also determines the layout mode of Tab within it (h: horizontal, v: vertical).

---

## Tab

The Tab component can be used independently, passing out the index value of the currently active tab through the bound onclickTab event.

### labels

This parameter determines the tab content inside Tab, supporting free combination of icons and text. The data type is an array of objects, with internal objects consisting of text and icon, while icon is rendered using the Icon component. For specific parameters, please refer to [Icon Props](https://stdf.dev/components?nav=icon&tab=1).

### Line Style

When lineType in Tab props is true, Tab will use line style, but if the layout mode is v (vertical), the line style will not take effect.

### Overflow Mode

Due to limited horizontal space on mobile devices, when using horizontal layout and the number of Tabs is large or dynamically uncertain, overflow mode can be enabled. At this time, Tabs will automatically hide overflowing Tabs, which can be viewed by sliding. After enabling overflow mode, you can control the number of displayed Tabs through `showNum`, and control whether to enable auto-scrolling through `autoScroll`.

In overflow mode, the actual number of Tabs displayed in the visible area is `showNum+0.5`. This design will initially hide half of the last Tab, so that users can naturally realize that Tabs are hidden without deliberate prompting, thus producing sliding operations.

> Tip: If the Tab content width is too large, please appropriately reduce `showNum` to prevent Tab content from being hidden due to overflow.

### CSS Injection

The Tab structure is relatively complex. To support more flexible custom styles, four places are supported for CSS injection internally: injClass acts on the outermost element of Tab; tabInjClass acts on the internal single tab; activeTabInjClass acts on the currently active tab; activeInjClass acts on the Tab indicator.

If the injected class doesn't take effect, please add "!" before the injected class name. You can refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
