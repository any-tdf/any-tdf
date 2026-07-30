## Explanation

1. The Skeleton component is not a mandatory component, but it can optimize the visual effect during the page loading process, thereby effectively improving the user experience.

2. Compared with the Loading component, the Skeleton component is less likely to attract users' attention, because its style is close to the actual page, and its transition effect is more gentle and natural, which can give users an expected effect of the page.

3. In order to meet such complex page layouts and make the Skeleton more close to the actual page outline, the component internally only implements basic transition effects and self-style configuration. The entire Skeleton area of ​​the page needs to be layout according to the actual business scenario by developers. Using Tailwind CSS's Flexbox or Grid is fast, and this process is like a rehearsal before building the actual page, which can be reused.

## Type

The Skeleton component currently provides seven types of skeletons, which are: `'div'|'p'|'img'|'video'|'code'|'qrcode'|'barcode'`, where code is a code block, qrcode is a QR code, and barcode is a barcode.

## Special

When the type is `'p'`, you can control the number of lines in the paragraph through the lines attribute, and the length of the last line will randomly change within a reasonable range.
