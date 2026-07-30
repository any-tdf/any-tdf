## Description

Steps defaults to horizontal layout. Due to limited horizontal display content on mobile devices, horizontal layout is recommended only for simple use. When there are multiple steps, long titles, or more content to display, vertical layout is recommended.

> Horizontal layout only displays the title and step bar area, even if other parameters like desc are passed in, they will not be displayed.

## current

The actual step number starting from 1, which corresponds to the steps array index + 1 internally in the component.

## finishStep

Each step's Props supports passing in finishStep, which has the same format as step, used to more accurately and precisely express completed steps in some scenarios. Please refer to the examples.

## Step Bar Area

The step bar area can accept three types of content: when type is `'string'`, it will directly display characters (single character recommended); when type is `'image'`, it will display an image, accepting relative or absolute image paths which will be converted to img tag src attribute internally; when type is `'icon'`, it will display an icon rendered according to the passed [Icon Props](/components?nav=icon&tab=1).

## injReactNode

step and finishStep support injecting ReactNode via injReactNode, which Steps will render at the bottom of the step area. `injComponent` is kept for legacy naming compatibility. Please refer to the examples.

## Additional Note

Tip: The Steps component can also be used for timeline business scenarios.
