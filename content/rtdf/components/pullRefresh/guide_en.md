## Basic Usage

PullRefresh is used when a page needs an explicit data refresh from the top. The component is controlled by `refreshing`, and `onRefresh` is called when the user releases after pulling far enough.

Default text uses component text props first, then `ConfigProvider` `locale.pullRefresh`, then built-in fallback text. The refreshing icon is configured by `loadingIcon`, using the same props as the Loading component.

## Interaction Rules

- Pull gestures are handled only when the scroll container is at the top.
- The gesture direction locks once it starts: horizontal swipes never trigger a refresh, only vertical pull-downs enter the refresh flow, and dragging back past the start point cancels the pull.
- Pull distance equals gesture distance multiplied by `pullFactor`. Beyond `threshold` the distance is damped (the further you pull, the heavier it feels), and `maxDistance` can cap it.
- While tracking the finger there is no transition animation, so the content stays glued to the finger; release rebound, entering refresh, and success exit animate over `animationDuration`.
- Releasing after the distance reaches `threshold` calls `onRefresh`.
- When `refreshing` changes from `true` to `false`, `successText` is shown for `successDuration`.
- On desktop, holding the left mouse button and dragging down works the same as touch.
- The head status area uses `aria-live`, so status text changes are announced by assistive technologies.

## Custom Content

The default header shows pulling, release, refreshing, and success text. Use `normalChild`, `pullingChild`, `canReleaseChild`, `refreshingChild`, and `successChild` render props to customize every state. The render prop `detail` parameter provides `status`, `distance`, and `progress`, which can drive progress rings, rotating arrows, and similar animations.

## Scroll Container

The component finds the nearest scroll container by default. Pass `scrollTarget` for overlays, tabs, or nested scrolling areas.

For nested scrolling, add `overscroll-behavior: contain` (Tailwind class `overscroll-contain`) to the scroll container to avoid the browser's native pull-to-refresh or scroll chaining. PullRefresh and InfiniteScroll can be combined inside the same scroll container, handling top refresh and bottom loading respectively.
