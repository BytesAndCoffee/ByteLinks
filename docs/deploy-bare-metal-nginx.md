# Deploy Bare Metal with Nginx

This setup runs Bun and Next.js directly under systemd, with Nginx handling
public HTTP and TLS.

## Requirements

- A Linux server with Nginx, Certbot, Git, and curl
- A DNS record such as `links.example.com` pointing to the server
- Root or sudo access

## Install Bun and Build

Create a dedicated unprivileged service account:

```bash
sudo useradd --system --create-home --shell /usr/sbin/nologin bytelinks
sudo mkdir -p /opt/bytelinks
sudo chown bytelinks:bytelinks /opt/bytelinks
sudo -u bytelinks git clone https://github.com/YOUR_USER/ByteLinks.git /opt/bytelinks
sudo -u bytelinks sh -c 'curl -fsSL https://bun.sh/install | bash'
sudo -u bytelinks sh -c 'cd /opt/bytelinks && ~/.bun/bin/bun install --frozen-lockfile && ~/.bun/bin/bun run build'
```

## Configure systemd

```bash
sudo cp /opt/bytelinks/deploy/systemd/bytelinks.service.example /etc/systemd/system/bytelinks.service
sudo systemctl daemon-reload
sudo systemctl enable --now bytelinks
curl --fail http://127.0.0.1:3000/api/health
```

Inspect failures with `journalctl -u bytelinks -n 100 --no-pager`.

The service reads `/opt/bytelinks/src/data/profile.json` on every request, so
profile-only edits do not require a rebuild or restart.

## Configure Nginx and TLS

```bash
sudo cp /opt/bytelinks/deploy/nginx/bare-metal.conf.example /etc/nginx/sites-available/bytelinks
sudo sed -i 's/links.example.com/YOUR_DOMAIN/g' /etc/nginx/sites-available/bytelinks
sudo ln -s /etc/nginx/sites-available/bytelinks /etc/nginx/sites-enabled/bytelinks
sudo nginx -t
sudo systemctl reload nginx
sudo certbot --nginx -d YOUR_DOMAIN --redirect
```

## Update

```bash
sudo -u bytelinks sh -c 'cd /opt/bytelinks && git pull --ff-only && ~/.bun/bin/bun install --frozen-lockfile && ~/.bun/bin/bun run build'
sudo systemctl restart bytelinks
```

Verify `https://YOUR_DOMAIN/api/health` after every deployment.

## Roll Back

Check out a known-good commit as the `bytelinks` user, rebuild, and restart the
service.
