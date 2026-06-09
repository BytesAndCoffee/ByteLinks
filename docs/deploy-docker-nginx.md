# Deploy with Docker and Nginx

This setup runs the application in Docker and exposes it only to Nginx on
`127.0.0.1:3000`.

## Requirements

- A Linux server with Docker Engine and Docker Compose
- Nginx and Certbot
- A DNS record such as `links.example.com` pointing to the server

## Deploy

Build from source:

```bash
git clone https://github.com/YOUR_USER/ByteLinks.git /opt/bytelinks
cd /opt/bytelinks
docker compose up -d --build
curl --fail http://127.0.0.1:3000/api/health
```

Or run the published `linux/amd64` image with your profile directory mounted:

```bash
docker run -d \
  --name bytelinks \
  --restart unless-stopped \
  -p 127.0.0.1:3000:3000 \
  -v /opt/bytelinks/src/data:/app/data:ro \
  bytesandcoffee/bytelinks:latest
```

The Compose service restarts automatically and includes a container health
check. It mounts `src/data/` read-only, so profile edits appear on the next
request without rebuilding the image. Mounting the directory also supports
editors that save files by atomically replacing them.

## Configure Nginx and TLS

```bash
sudo cp deploy/nginx/docker.conf.example /etc/nginx/sites-available/bytelinks
sudo sed -i 's/links.example.com/YOUR_DOMAIN/g' /etc/nginx/sites-available/bytelinks
sudo ln -s /etc/nginx/sites-available/bytelinks /etc/nginx/sites-enabled/bytelinks
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d YOUR_DOMAIN --redirect
```

If Nginx runs on a different host, change `proxy_pass` to the Docker host's
private IP and publish the Compose port on that interface instead of
`127.0.0.1`.

## Update

```bash
cd /opt/bytelinks
git pull --ff-only
docker compose up -d --build
docker image prune -f
```

Verify `https://YOUR_DOMAIN/api/health` after every deployment.

## Roll Back

Check out the previous known-good commit and rebuild:

```bash
git checkout PREVIOUS_COMMIT
docker compose up -d --build
```
