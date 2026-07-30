## Use Cases

ImagePreview component is used for full-screen image preview, supporting gesture zoom, swipe switching and more.

## Gesture Operations

- **Single finger swipe**: Switch images
- **Two finger pinch**: Zoom image

## Navigation Icons

Navigation icons are shown by default for switching images. Use `showNavigation` prop to hide them, and `navigationPosition` prop to set position:

- `center` (default): Vertically centered
- `bottom`: Bottom position

## Image List

The `images` prop supports two formats:

1. String array (image URLs)

```javascript
const images = ['/image1.jpg', '/image2.jpg'];
```

2. Object array (with more info)

```javascript
const images = [
	{ url: '/image1.jpg', alt: 'Image description 1' },
	{ url: '/image2.jpg', alt: 'Image description 2', thumbnail: '/thumb1.jpg' }
];
```

## Indicator Types

- `number`: Number indicator, shows current index and total
- `dot`: Dot indicator
- `null`: Hide indicator

## Custom Content

Use `children` Snippet to customize the content area below the image, commonly used for image descriptions, action buttons, etc.

## Close Methods

- **Click close button**: shown when `closable={true}`
- **Click mask**: works when `maskClosable={true}` (disabled by default)

## Notes

- Component prevents default page scroll behavior
- Clicking mask won't close preview when zoomed
- Recommended to use with `ImageList` component
