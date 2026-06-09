# ByteLinks

A modern, self-hosted personal link page powered by one JSON file. Built with
Next.js, React, and Bun, with first-class Docker and bare-metal deployment
guides.

## Features

- Responsive profile, primary links, skills, and project cards
- Content and metadata sourced from `src/data/profile.json`
- Runtime profile loading; JSON edits appear without rebuilding
- JSON Schema validation on every production build
- Generated `PROFILE.md` and live Markdown at `/md`
- Health endpoint at `/api/health`
- Standalone production container and Nginx examples

## Use This Template

1. Click **Use this template** on GitHub and clone your new repository.
2. Replace the example content in `src/data/profile.json`.
3. Run the validation and Markdown generator:

   ```bash
   bun install
   bun run profile:validate
   bun run profile:markdown
   ```

4. Start development with `bun dev` and open `http://localhost:3000`.

The profile shape is documented by `schema/me.schema.json`. In production,
profile changes are read on the next request without rebuilding or restarting.

## Commands

| Command | Purpose |
| --- | --- |
| `bun dev` | Start the development server |
| `bun run build` | Validate profile data and build for production |
| `bun start` | Run a completed production build |
| `bun run lint` | Type-check the project |
| `bun run profile:validate` | Validate profile JSON against the schema |
| `bun run profile:markdown` | Regenerate `PROFILE.md` |

## Deployment

- [Docker + Nginx](docs/deploy-docker-nginx.md)
- [Bare metal + systemd + Nginx](docs/deploy-bare-metal-nginx.md)

Both guides assume DNS already points your chosen hostname to the Nginx
server. Cloudflare proxying is optional; use SSL mode **Full (strict)** when
enabled.

### Docker Hub Quick Start

The published image is available for `linux/amd64`:

```bash
docker pull bytesandcoffee/bytelinks:latest
docker run -d \
  --name bytelinks \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v "$PWD/src/data:/app/data:ro" \
  bytesandcoffee/bytelinks:latest
```

Mount a directory containing your customized `profile.json` at `/app/data`.
Versioned releases are also published, for example
`bytesandcoffee/bytelinks:0.1.0`.

## Updating

Edit `src/data/profile.json`, regenerate `PROFILE.md`, and redeploy using the
update steps in your chosen deployment guide.

## License

MIT
