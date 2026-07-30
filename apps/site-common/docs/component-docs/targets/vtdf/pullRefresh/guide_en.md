## Basic Usage

PullRefresh is used when a page needs an explicit data refresh from the top. The component is controlled by `refreshing`, and the `refresh` event is emitted when the user releases after pulling far enough.

Default text uses component text props first, then `ConfigProvider` `locale.pullRefresh`, then built-in fallback text. The refreshing icon is configured by `loadingIcon`, using the same props as the Loading component.

## Interaction Rules

- Pull gestures are handled only when the scroll container is at the top.
- Horizontal swipes, disabled state, and active refreshing state do not trigger another refresh.
- Releasing after the distance reaches `threshold` emits `refresh`.
- When `refreshing` changes from `true` to `false`, `successText` is shown for `successDuration`.

## Custom Content

The default header shows pulling, release, refreshing, and success text. Use the `normalChild`, `pullingChild`, `canReleaseChild`, `refreshingChild`, and `successChild` named slots to customize every state.

## Scroll Container

The component finds the nearest scroll container by default. Pass `scrollTarget` for overlays, tabs, or nested scrolling areas.
