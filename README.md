# KoveForge

KoveForge is a static website for a Bulgarian digital agency focused on custom business websites, booking systems, e-commerce platforms, AI agents and internal business tools for small and medium businesses.

## Live Website

https://www.koveforge.tech

## Tech Stack

- HTML
- CSS
- JavaScript
- Cloudflare Workers / Pages
- Wrangler

## Structure

- `website/` - production website files
- `website/assets/` - CSS, JavaScript, images and project screenshots
- `website/projects/` - individual project case pages
- `docs/` - project documentation and planning notes

## Deployment

The project is configured for Cloudflare deployment with Wrangler from the repository root:

```bash
npx wrangler deploy
```

The root `wrangler.jsonc` serves static assets from `./website`.
