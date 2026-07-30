## Usage

ActionPopover is an inline panel that appears near the trigger element and provides operation actions for the current context, suitable for compact interaction scenarios.

## Description

ActionPopover binds to the trigger element through triggerRef. The position is adjusted based on inlineDirection or the viewport.

## Inverse colors

ActionPopover supports inverse to swap light and dark styles, default is off.

## Layout

Use layout to control action arrangement: v for vertical, h for horizontal, grid for grid, ring for ring. Use gridColumns to set grid columns.

## Ring Layout

When layout is set to ring, action items are arranged in a circular pattern around the trigger element. Ring layout only supports icon actions, which should be passed via ringActions.

Ring shape is controlled by ringShape, supporting the following values:

- auto: Automatically determined based on action count, ≤3 items for quarter circle, ≤5 items for half circle, >5 items for full circle
- quarter: Quarter circle
- half: Half circle
- full: Full circle

Ring layout automatically determines the expansion direction based on the trigger element's position in the viewport. For example, when the trigger is in the top-left corner, the ring expands toward the bottom-right.

Use ringRadius to customize the ring radius, and ringItemSize to set the action item size.

## Actions

The actions property of ActionPopover is an array, and each item in the array is an object. The properties of the object refer to Action Props.
