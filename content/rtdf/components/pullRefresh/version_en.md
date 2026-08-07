## 3.0.0

- [!tag|A|0|] Added PullRefresh with controlled refreshing state, success feedback, custom state content, and custom scroll container support.
- [!tag|A|0|] Added the `maxDistance` prop, with a damping curve applied to pull distance beyond `threshold`.
- [!tag|O|0|] Disabled transition animation while tracking the finger for better follow-through; added gesture direction lock, and dragging back past the start point cancels the pull.
- [!tag|O|0|] Supported mouse drag refresh on desktop, and added `aria-live` announcements to the head status area.
