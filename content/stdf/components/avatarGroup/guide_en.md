## Basic Usage

AvatarGroup is used to display multiple avatars with overlapping effect, commonly used for group chat avatars, commenter lists, etc. Simply pass in an array of Avatar Props.

## Compactness

Use the `compact` parameter to control the overlap between avatars. Higher values mean more compact. Default is 5.

## Top Layer Content

By default, the top layer displays the total count. Use the `top` parameter to control the content:

- `'totle'`: Display total count (default)
- `'add'`: Display add icon
- `null`: Hide top layer
- `Snippet`: Custom top layer content

## Reverse Order

Set `reverse` to `true` to reverse the arrangement and stacking order of avatars.

## Maximum Display Count

Use the `max` parameter to limit the maximum number of avatars displayed. Excess count will be shown in the top layer.

## injClass

The `injClass` parameter allows injecting CSS class names for the avatar group, typically used to unify the ring color when the default border color doesn't match the background color.

If the injected class doesn't take effect, please add "!" before the class name. Refer to [Tailwind Important modifier](https://tailwindcss.com/docs/configuration#important-modifier).
