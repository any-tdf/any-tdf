## Content Description

image accepts relative or absolute image paths, which will be converted to the src attribute of an img tag internally; alt displays the input text directly; icon accepts Icon Props to render avatar content using the Icon component, please refer to Icon API; if image, alt, and icon are not provided, the Avatar component will display a default user icon using the Icon component.

With the configurability of content combined with other style adjustment parameters, the Avatar component is not limited to just avatar scenarios - please use it flexibly.

## Content Priority

image > alt > icon.

## imgSize

This parameter determines the ratio of the internal image to the entire avatar frame. The three levels s, m, l correspond to 1/3, 2/3, and full coverage respectively. Most business scenarios use full coverage, but some interface designs require PNG format images, in which case this parameter may need to be adjusted to give the page a sense of breathing space.

## injClass

The injClass parameter allows injecting CSS class names (not limited to Tailwind CSS) into the component's internal button element, enabling more customization possibilities for component styles. The example demonstrates custom background color and border color through injClass.

If the injected class doesn't take effect, please add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
