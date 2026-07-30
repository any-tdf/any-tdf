## List Props

| Name            | Type                                                      | Default        | Required | Description                                        |
| --------------- | --------------------------------------------------------- | -------------- | -------- | -------------------------------------------------- |
| data            | `T[]`                                                     | `[]`           | Y        | List data array.                                   |
| keyField        | `string`                                                  | `'id'`         | N        | Field name for unique item identifier.             |
| gap             | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N        | Gap between list items.                            |
| mx              | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N        | Horizontal margin of the list.                     |
| my              | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N        | Vertical margin of the list.                       |
| transition      | `'slideRight'\|'slideUp'\|'fadeScale'\|'stagger'\|null`   | `'slideRight'` | N        | List item transition type, set `null` to disable.  |
| transitionDelay | `number`                                                  | `50`           | N        | Animation delay per item (milliseconds).           |
| batchMode       | `boolean`                                                 | `false`        | N        | Whether in batch selection mode (two-way binding). |
| batchSelected   | `(string\|number)[]`                                      | `[]`           | N        | Selected item key array (two-way binding).         |
| batchSelectable | `boolean`                                                 | `false`        | N        | Whether to show batch selection entry.             |
| batchActions    | `BatchActionProps[]`                                      | `[]`           | N        | Batch action button configuration.                 |
| injClass        | `string`                                                  | `''`           | N        | CSS class injected into container.                 |
| itemInjClass    | `string`                                                  | `''`           | N        | CSS class injected into list item.                 |
| arrow           | `boolean`                                                 | `false`        | N        | Whether to show right arrow indicator.             |
| divider         | `boolean`                                                 | `false`        | N        | Whether to show dividers.                          |
| itemRadius      | `'none'\|'sm'\|'md'\|'lg'\|'xl'\|'2xl'\|'3xl'\|'4xl'\|''` | `''`           | N        | List item border radius.                           |
| itemPx          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N        | Horizontal padding of list items.                  |
| itemPy          | `'0'\|'1'\|'2'\|'3'\|'4'\|'6'\|'8'`                       | `'0'`          | N        | Vertical padding of list items.                    |
| swipeActions    | `SwipeActionProps[]`                                      | `[]`           | N        | Swipe action buttons (shown on swipe left).        |
| swipeHint       | `'none'\|'first'\|'all'`                                  | `'first'`      | N        | Swipe hint display mode.                           |
| swipeThreshold  | `number`                                                  | `30`           | N        | Swipe trigger threshold (pixels).                  |

## List Events

| Name          | Type                                                                                  | Parameters                                                                                                     | Description                               |
| ------------- | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| onbatchChange | `(selected: (string\|number)[]) => void`                                              | `selected` - current selected key array                                                                        | Triggered when selection changes.         |
| onclickItem   | `(item: T, index: number) => void`                                                    | `item` - current item<br />`index` - index                                                                     | Triggered when item is clicked.           |
| onswipeAction | `(actionIndex: number, action: SwipeActionProps, item: T, itemIndex: number) => void` | `actionIndex` - action index<br />`action` - action config<br />`item` - current item<br />`itemIndex` - index | Triggered when a swipe action is clicked. |

## List Snippets

| Name        | Type                                                                | Parameters         | Description                   |
| ----------- | ------------------------------------------------------------------- | ------------------ | ----------------------------- |
| itemChild   | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | `(item: T, index)` | List item content (required). |
| headerChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -                  | Custom list header content.   |
| footerChild | [`Snippet`](https://svelte.dev/docs/svelte/snippet#Typing-snippets) | -                  | Custom list footer content.   |

## SwipeActionProps

Swipe action button configuration:

| Name    | Type                 | Default   | Description                      |
| ------- | -------------------- | --------- | -------------------------------- |
| icon    | `string`             | -         | Icon name.                       |
| text    | `string`             | -         | Button text.                     |
| bgColor | `SwipeActionBgColor` | `'theme'` | Button background color.         |
| onclick | `() => void`         | -         | Callback when button is clicked. |

bgColor supports `theme`, `success`, `warning`, `error`, `info`, and `primary` is an alias of `theme`.

## BatchActionProps

Batch action button configuration:

| Name    | Type                                             | Default   | Description                      |
| ------- | ------------------------------------------------ | --------- | -------------------------------- |
| text    | `string`                                         | -         | Button text.                     |
| status  | `'theme'\|'success'\|'warning'\|'error'\|'info'` | `'theme'` | Button text color.               |
| onclick | `(selected: (string\|number)[]) => void`         | -         | Callback when button is clicked. |

## Animation Types

Transitions apply to both enter and leave states.

| Type       | Description                            |
| ---------- | -------------------------------------- |
| slideRight | Slide in or out from the right.        |
| slideUp    | Slide in or out from below.            |
| fadeScale  | Fade and scale in and out.             |
| stagger    | Alternating slide in and out by index. |
