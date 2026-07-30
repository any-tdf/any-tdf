## Description

Generally used for quickly searching information on a page, where you can quickly find the desired content based on the index value in the directory.

## data

This Props is an array composed of indexing items, the basic structure is `{ index: 'x', title: 'xx', child: ['xx', 'xx'] }`, where index is used to display the text in the right-side bar (it is recommended to use a single character), title is the title of each index group in the content area, and child is the content of a single indexing group. For specific usage, please refer to the example.

## height && top

Since the content area of the index scrolls on the Y-axis, the height of the content area is required, and the distance between the content area and the top of the document needs to be combined to listen for and set the scroll position in the content area and other operations.

When the length of data is large, it is recommended to pass in a larger value for height. After all, the display area of the entire index content cannot be lower than the height of the right-side scroll bar area. Of course, it cannot be too large either, which may cause the scroll area to be incomplete or multiple scrollbars to appear.

## CSS injection

IndexBar supports injecting classes in two places, where injecting titleInjClass will have an effect on the title of the indexing group, and injecting textInjClass will have an effect on the text of the indexing item. You can refer to the example to change the style of the index content area.

If the injected class is not effective, please prefix the injected class name with "!". You can refer to the Tailwind Important modifier.

## scrollAlign

When the index content area scrolls to an end, based on the CSS scroll-snap-align module, the top of each group of index content will automatically snap to the top of the content area. Of course, this feature can also be turned off if it affects the scrolling experience or is not needed.

Refer to [MDN](https://developer.mozilla.org/en-US/docs/Web/CSS/scroll-snap-align) for more information on scroll-snap-align.
