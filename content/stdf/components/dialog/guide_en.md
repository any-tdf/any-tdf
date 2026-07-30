## Usage

Dialog is generally used to display content or steps that users need to be clearly aware of, while also enabling simple interactions. To prevent accidental touches, clicking the mask will not close the dialog by default. It is more powerful than the Modal component which is mainly used for display.

## Design Philosophy and Use Case Differences

In STDF, Toast, Alert, Modal, and Dialog all provide user feedback, but they emphasize different interaction levels.

- **Toast**: Lightweight, non-blocking, focused on short status feedback for quick actions.
- **Alert**: Card-style notification emphasizing content readability, suitable for richer notices with title, icon, or actions.
- **Modal**: Strong awareness with minimal interaction, often a single confirm or acknowledgment.
- **Dialog**: Strong awareness with decision-making, usually primary/secondary actions for confirmations or risky flows.

## Description

The Dialog component is built on top of Popup by pre-defining some Popup Props. Therefore, different effects can be achieved by passing in Popup properties. For example, in the demo, a different easing effect is achieved by setting the easeType of popup.

Dialog internally uses Icon and Button components, and different effects can be achieved by passing in Icon and Button Props. For example, in the demo, the button's rounded corner style is customized by setting the Button's radius.

## contentChild

The content of Dialog can be rendered through the contentChild Snippet. When complex content needs to be displayed, it can be achieved through this method.

## btnRatio

Dialog's buttons have primary and secondary distinctions. The size ratio of primary and secondary buttons can be set through btnRatio. For example, when btnRatio is `[2,1]`, the width of the primary button is twice that of the secondary button.

## Close

Dialog will not automatically close by default. By default, clicking the internal secondary button can close it, or it can be closed by changing the external visible prop. Of course, these parameters can be controlled through the passed Props.
