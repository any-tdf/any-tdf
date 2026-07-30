## Description

TabBar passes the index value of the currently active tab through the bound onChange event.

## labels

This parameter determines the content of tabs inside the TabBar, supporting free combination of icons and text. The data type is an array of objects, where each object consists of text, icon and activeIcon. The icon and activeIcon are rendered using the Icon component, where activeIcon represents the Icon when TabBar is active. For specific parameters, please refer to [Icon Props](/components?nav=icon&tab=1).

## Bottom Line

When line is true, a line will be displayed at the bottom of the active TabBar. lineW and activeInjClass only take effect when line is true. The line width can be controlled by lineW, whose value represents the ratio of line width to current Tab width. The default value is 4, **the larger the lineW value, the narrower the line**.

## CSS Injection

TabBar has a relatively complex structure. To support more flexible custom styles, it supports CSS injection in four places: injClass applies to the outermost element of TabBar; tabInjClass applies to individual tabs inside; activeTabInjClass applies to the currently active tab; activeInjClass applies to the bottom line of TabBar.

If the injected class doesn't take effect, please add "!" before the injected class name. You can refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).

## Simplicity

Compared to other components, the TabBar component is used less frequently in applications, usually just one per application, and generally has brand-specific UI/UX design with low reusability. Therefore, the TabBar component's API design is relatively simple.
