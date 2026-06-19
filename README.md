# Jay Bhanushali — resume

A sleek, dark, editorial single-page resume site. Static (HTML / CSS / vanilla JS),
no build step. Lives at **https://jayatwork.vercel.app**.

> Always at the crossroads — building something, or around builders.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Stack

- Plain HTML + CSS (custom properties) + vanilla JS — no framework, no bundler.
- Type: [Fraunces](https://fonts.google.com/specimen/Fraunces) (display) + Inter (body), via Google Fonts.
- Motion: IntersectionObserver reveals, stat count-up, magnetic pills. Respects `prefers-reduced-motion`.

## Deploy

Hosted on Vercel as a static site. Push to `main` → auto-deploys.

## Structure

```
index.html     all markup + share meta (title, description, OG/Twitter)
styles.css     design tokens, components, sections, responsive, reduced-motion
main.js        hero stagger, scroll reveals, count-up, magnetic hover
assets/        favicon + OG share image
docs/          spec + implementation plan
```
