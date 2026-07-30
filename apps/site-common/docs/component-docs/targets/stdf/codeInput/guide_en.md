## Introduction

CodeInput is used for entering passwords, verification codes, etc. Use NumKeyboard for numeric input, FullKeyboard for alphanumeric input.

## Use Cases

- SMS/Email verification codes
- Payment passwords, Bank PINs
- Two-factor authentication codes (TOTP)
- Credit card CVV/CVC
- Delivery pickup codes
- Gift card codes, Invitation codes
- Software activation codes, Serial numbers
- Door locks, Smart lock passwords

## Cell Style

Set cell style via `cellStyle`:

- `box` (default): Box mode with background and border
- `line`: Line mode with only bottom line

## Cell Background

Set cell background via `cellBg` (only effective in box mode):

- `surface`: Uses surface background color
- `gray` (default): Uses gray semi-transparent background
- `theme`: Uses theme color semi-transparent background

## Cell Border

Set cell border style via `cellBorder` (only effective in box mode):

- `none`: No border
- `solid` (default): Solid border
- `dashed`: Dashed border
- `dotted`: Dotted border

## Auto Close

When `autoClose` is `true`, the keyboard will automatically close and trigger the `onclose` event after input is complete (reaching the specified length). This is suitable for scenarios like verification code input where users don't need to manually click the done button.

## Auto Scroll

When CodeInput is at the bottom of the viewport, the keyboard may cover the input area. `autoScroll` is enabled by default, automatically scrolling the page to keep the input area visible.

- `true` (default): Uses 40% of viewport height as keyboard height for calculation
- `number`: Uses specified value as keyboard height (in px)
- `false`: Disable auto scroll

Note: Auto scroll requires the page to have enough scrollable space. Make sure there is sufficient content or padding below the CodeInput to allow the page to scroll to the target position.
