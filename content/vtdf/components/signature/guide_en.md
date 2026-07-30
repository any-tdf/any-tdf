## Use Cases

Signature component is used for online signatures, contract signing, handwriting input, etc. Built on Canvas, it supports finger or mouse drawing.

## Canvas Ratio

Use the `aspectRatio` prop to set the canvas width-to-height ratio. Default is `[3, 1]` (3:1). Adjust according to your needs, such as `[2, 1]`, `[4, 3]`, etc.

## Direction Mark

The signature component supports marking orientation, which is useful in landscape signing scenarios. Set the direction mark via the `direction` prop:

- `top` (default): Top side faces up
- `bottom`: Bottom side faces up
- `left`: Left side faces up
- `right`: Right side faces up

When exporting signatures, `SignatureResult` includes direction information, which can be used to rotate the image accordingly.

Use `showDirectionMark` prop to control the visibility of the direction mark.

## Pen & Background

### Default Colors

The current version no longer auto-adapts to light or dark mode. Defaults are:

- Pen color: `#000000`
- Background color: `#ffffff`

Set `lineColor` and `bgColor` explicitly when you need dark mode styling.

### Custom Colors

Use `lineColor` and `bgColor` props to customize pen and background colors.

### Line Width

Use `lineWidth` prop to set pen thickness in pixels. Default is 3.

## Border Radius

Canvas border radius defaults to the theme's large area radius config. Customize via `radius` prop.

## Action Buttons

By default, "Clear" and "Confirm" buttons are shown. Customize them as follows:

### Custom Text

Use `clearText` and `confirmText` to set button labels.

### Custom Style

Use `clearButton` and `confirmButton` to set button styles.

### Hide Buttons

Set `showButtons={false}` to hide built-in buttons, then use component methods like `clear` and `getSignature`.

## Export Format

Supports PNG, JPEG, and WebP formats. Use `imageType` to configure the format. The exported image is a Base64 Data URL, which can be used directly in `<img>` tag's `src` attribute or uploaded to a server.

### Format Comparison

| Format | Features                                                      | Use Cases                                     |
| ------ | ------------------------------------------------------------- | --------------------------------------------- |
| PNG    | Lossless compression, supports transparency, larger file size | High quality or transparent background needed |
| JPEG   | Lossy compression, no transparency, smaller file size         | File size sensitive, no transparency needed   |
| WebP   | Smaller file at same quality, supports transparency           | Modern browsers, best compression ratio       |

### Image Quality

`imageQuality` only works for JPEG and WebP formats, range 0 to 1, default 0.92. Higher values mean better quality but larger files.

## Component Methods

| Method         | Description                 |
| -------------- | --------------------------- |
| clear()        | Clear canvas                |
| getSignature() | Get signature data          |
| isEmpty()      | Check if signature is empty |

## Notes

- Component auto-adapts to high-DPI screens (Retina) to ensure exported images are sharp
- Touch scrolling is prevented during signing
- Recommend checking `isEmpty` property before submission to avoid submitting empty signatures
