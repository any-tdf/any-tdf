## Usage

The Modal dialog component is generally used to display important information or steps that users need to be aware of. To avoid accidental clicks, clicking on the mask does not close the dialog by default. Compared to Toast, users will have a stronger sense of awareness, and compared to Dialog, it is simpler to implement specific interactive operations.

## Design Philosophy and Use Case Differences

In STDF, Toast, Alert, Modal, and Dialog all provide user feedback, but they emphasize different interaction levels.

- **Toast**: Lightweight, non-blocking, focused on short status feedback for quick actions.
- **Alert**: Card-style notification emphasizing content readability, suitable for richer notices with title, icon, or actions.
- **Modal**: Strong awareness with minimal interaction, often a single confirm or acknowledgment.
- **Dialog**: Strong awareness with decision-making, usually primary/secondary actions for confirmations or risky flows.

## Description

The Modal dialog component is based on Popup and is implemented by defining some of Popup's Props in advance. Therefore, different effects can be achieved by passing in Popup's attributes. For example, in the example, a different easing effect is achieved by setting the easeType of popup.

Modal also uses the Icon and Button components internally, and different effects can be achieved by passing in the Props of Icon and Button. For example, in the example, the radius of the Button is customized to achieve a custom button style.

## ContentChild

The content of the Modal can be passed in through the contentChild property. When complex content needs to be displayed, it can be rendered through contentChild, at this time content will be invalid.

## Close

The Modal by default will not automatically close and needs to be closed by clicking the internal button. When the button is not displayed, clicking the mask will close the Modal by default, or you can close it by changing the visible property externally. Of course, these parameters can be controlled through the Props passed in.
