# @any-tdf/site-common

Framework-agnostic documentation-site utilities, data, styles, and assets shared by STDF, RTDF, and VTDF.

## Scope

This is a private Bun Workspace used only by the sites, demos, documentation generators, and related tooling in this monorepo. It is not published to npm.

Internal consumers declare it through the Workspace protocol:

```json
{
	"dependencies": {
		"@any-tdf/site-common": "workspace:*"
	}
}
```

## Exports

The package provides Markdown helpers, theme utilities, URL helpers, shared navigation data, site state helpers, outline utilities, and the shared Site stylesheet.

```ts
import { getSiteNavigationState } from '@any-tdf/site-common/site';
import { buildSiteOutline } from '@any-tdf/site-common/outline';
import '@any-tdf/site-common/styles';
```

## Development

Run these commands from the repository root:

```sh
bun install --frozen-lockfile
bun run check
bun run --filter @any-tdf/site-common test
```
