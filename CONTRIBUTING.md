# Contributing

## Development

```bash
bun install --frozen-lockfile
bun dev
```

Keep profile-only changes in `src/data/profile.json`. Changes to the profile
shape must also update `schema/me.schema.json`, the Markdown formatter, and any
affected UI.

Before opening a pull request, run:

```bash
bun run profile:validate
bun run profile:markdown
bun run lint
bun run build
```

Include screenshots for visible design changes and explain any deployment
configuration changes.
