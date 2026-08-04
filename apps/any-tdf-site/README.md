# Any TDF Portal

This private Workspace contains the framework-neutral landing page for the Any TDF product family. It is implemented with HTML, CSS, and a small amount of native JavaScript.

The portal introduces the shared architecture and links visitors to:

- [STDF](https://stdf.dev) for Svelte.
- [RTDF](https://rtdf.dev) for React.
- [VTDF](https://vtdf.dev) for Vue.

## Development

From the Monorepo root:

```sh
bun run dev:any-tdf
```

The local portal is available at [http://localhost:5556](http://localhost:5556). The port is fixed, so startup fails instead of selecting another port when `5556` is already occupied.

The production build is included automatically in the root `bun run build` task.
