## Notes on value and total

1. The passed-in value cannot be greater than the total;
2. The value of total must be divisible by 1;
3. When not allowing half selection, the value must be divisible by 1;
4. When allowing half selection, the value must be divisible by 0.5.

## Click optimization

Considering the interaction mode on mobile devices, when allowing half selection, clicking will switch between half selection and full selection, and when allowing zero scores, clicking the first item will switch between 0, 0.5, and 1.

Note: When considering the click area, please make sure that **the values of width and height are not less than 20**.

## Click Animation

Control click animation through animation, `'current'` means only the clicked item has animation, `'active'` means the clicked item and all previous items have animation, and `null` means no animation.

## Special attention

When custom content is needed, it can be achieved by passing in Snippet. At this time, **be sure to pass in the width and height of the custom content**.
