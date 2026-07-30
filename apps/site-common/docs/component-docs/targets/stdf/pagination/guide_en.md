## Design Concept

In my opinion, pagination should not be based on scrolling up to load the next page. This interaction can cause user uncomfortable as there is no psychological expectation. Therefore, the STDF pagination component meet the following conditions by default:

- The page change event must be triggered by the user.
- The previous page, next page, first page, last page, and current page must always be displayed, and the user can directly click to jump to these key page numbers.
- On mobile devices, the horizontal display area is limited. Nevertheless, users can still click on the ellipsis to jump to any page number.

Of course, you can also configure it to **continuous mode**, that is, you are only allowed to click on the previous page and the next page. For example, some backend APIs must query the next page of data based on the previous page. But this will undoubtedly reduce the user experience.

> To be in charge, the user must be informed. When, for example, the user initiates an operation, immediate feedback confirms that the operation is being carried out, and (eventually) then it’s finished… This communication should be brief, direct, and expressed in the user’s vocabulary rather than the programmer’s. (Apple Human Interface Guidelines)

## Event Listening

The Pagination component exposes three events to the outside: onchange, onnext, and onpre, corresponding to page number changes, next page, and previous page, respectively. The onnext and onpre events will also trigger the onchange event, so listen as needed.

## total

The total data will not be displayed inside the Pagination component, so decide whether to display it on the page based on specific business requirements.

## current

Current represents the current page number, which is counted from 1 internally by default. An initial page number can also be passed in from the outside.

## maxShowPage

MaxShowPage represents the maximum number of displayed page numbers, including the first page, last page, displayed page, ellipsis, and so on. The optional values are 5, 7, 9, and 11. The larger the value, the more page numbers will be displayed at the same time, but the width of each item will be smaller, affecting user operations. Decide based on specific business requirements.

## Ellipsis Page Number

When the total number of pages is greater than maxShowPage, there will be ellipsis page numbers, which are divided into front ellipsis page numbers and back ellipsis page numbers. When the total number of pages is not very large, only one of the front and back ellipsis page numbers will be omitted at the same time. When the total number of pages is very large, both the front and back ellipsis page numbers will be omitted at the same time.

All omitted page numbers can be expanded by clicking on the ellipsis, and the expandable area supports scrolling up and down. The number of page numbers displayed per row can be controlled by the pageCol property. **And clicking on any page number in the expanded area will jump to that page number.**

If you are concerned that users may not understand this interaction when they use it for the first time, and the total number of pages is greater than maxShowPage, you can pass in showNextOmitPage by default to expand the back ellipsis page numbers and guide them.

## Type

Type represents the type of highlighted page numbers, with optional values of border, block, and bold. Border represents that the highlighted page number is the border, block represents that the highlighted page number is the block, and bold represents that the highlighted page number is bold and the other page numbers are weakened.

## CSS Injection

The injClass parameter can be used to inject a CSS class name (not limited to Tailwind CSS) into the outer layer of the component, which will provide more possibilities for customizing the component style. In the example, custom rounded corners, spacing on both sides, shadows, and other styles are achieved through injClass.

If the injected CSS does not take effect, add "!" in front of the injected CSS class name, as shown in the [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
