# ByteLinks

ByteLinks is a modern, self-hosted personal link page powered by one JSON
file. This image runs the production Next.js application with Bun.

## Supported Tags

- `latest` - newest published release
- `0.1.0` - pinned release

Current images support `linux/amd64`.

## Quick Start

Create a profile directory and download the example profile:

```bash
mkdir -p /opt/bytelinks/data
curl -fsSL \
  https://raw.githubusercontent.com/BytesAndCoffee/ByteLinks/main/src/data/profile.json \
  -o /opt/bytelinks/data/profile.json
```

Edit `/opt/bytelinks/data/profile.json`, then start ByteLinks:

```bash
docker run -d \
  --name bytelinks \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v /opt/bytelinks/data:/app/data:ro \
  bytesandcoffee/bytelinks:latest
```

Profile edits appear on the next request without rebuilding or restarting the
container.

## Docker Compose

```yaml
services:
  bytelinks:
    image: bytesandcoffee/bytelinks:latest
    container_name: bytelinks
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    volumes:
      - ./data:/app/data:ro
    healthcheck:
      test:
        - CMD
        - bun
        - -e
        - "fetch('http://localhost:3000/api/health').then(r => { if (!r.ok) process.exit(1) })"
      interval: 30s
      timeout: 5s
      retries: 3
```

Place `profile.json` inside `./data`, then run:

```bash
docker compose up -d
```

## Verify

```bash
curl --fail http://127.0.0.1:3000/api/health
curl http://127.0.0.1:3000/md
```

- `/` serves the responsive link page.
- `/md` serves the profile as Markdown.
- `/api/health` returns container health status.

## Update

```bash
docker pull bytesandcoffee/bytelinks:latest
docker rm -f bytelinks
# Run the same docker run command again.
```

With Compose:

```bash
docker compose pull
docker compose up -d
```

Use a versioned tag such as `bytesandcoffee/bytelinks:0.1.0` when you require
repeatable deployments.

## Nginx Reverse Proxy

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name links.example.com;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

After enabling the Nginx site, use Certbot to configure HTTPS:

```bash
sudo certbot --nginx -d links.example.com --redirect
```

## Source and Documentation

Source code, the profile schema, and complete deployment guides are available
at [github.com/BytesAndCoffee/ByteLinks](https://github.com/BytesAndCoffee/ByteLinks).
