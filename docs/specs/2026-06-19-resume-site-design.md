# Jay Bhanushali — Shareable Resume Site (Design Spec)

**Date:** 2026-06-19
**Status:** Approved (design), pending implementation plan

## Purpose

A sleek, crisp, fun, single-page resume website for Jay Bhanushali, deployed to
Vercel with a unique shareable link. It reframes a LinkedIn-export resume into a
forward-looking personal site that leads with who Jay is *now* (building Logout
Club; helping founders grow on LinkedIn) and backs it with concrete proof.

## Constraints

- All files live inside the `Jay's resume` project folder.
- A **fresh, isolated git repo** is initialized here (must NOT touch the parent
  `/Users/jay` repo).
- A **new GitHub repo** is created under the user's account (`jaysaiexperiments-ux`).
- Deployed to **Vercel** for the shareable link. The Vercel project / page title
  must clearly read **"Jay Bhanushali's resume"**.
- Source PDFs are git-ignored (contain personal info; not published).

## Positioning

**Hero line:** "Always at the crossroads — building something, or around builders."

- Now: building **Logout Club**.
- Alongside: helping founders get found on **LinkedIn** (3M+ reach, 10+ founders).

The hero answers "what are you doing?" and "why trust you?" in one screen.

## Content / Sections (single-page vertical scroll)

1. **Hero** — name, the crossroads line, a one-line "now" summary, contact icons,
   subtle scroll cue.
2. **The thread** — 2–3 sentences in Jay's real voice (builder / community /
   growth), not corporate-speak.
3. **Logout Club** — started as a run club, evolved into a community built around
   the idea of *logging out* and experiences around it. 50+ runs + multiple
   experiences. Links to instagram.com/logoutclub.hyd.
4. **Founder growth work (the proof)** — animated stat counters
   (3M+ reach · 10+ founders · 500+ posts · 2k→21k followers), the roster of
   founders worked with, and the **Tamma Carel case study** as a highlight card
   (2k→21k followers, 1.5M impressions/365d ≈ 100k/mo, connections with CSOs/ESG
   heads, podcast + TEDx invites).
5. **Career arc** — compact vertical timeline:
   TreeWear → Beachhouse Project / The Experience Co. → Homework Studio →
   Manam Chocolate → Imvelo (ongoing) → Logout Club (now).
6. **Footer / let's talk** — contact links + the literal line
   "This is Jay Bhanushali's resume."

### Founders roster (from work deck)
- Rishabh Mariwala — Sharrp Ventures | Director, Marico & Kaya
- Tamma Carel — Founder, Imvelo & iCOR
- Chaitanya Muppala — Founder, Almond House / Distinct Origins / Manam Chocolate
- Ankur Shah — Geospatial Data Scientist | Environmental Educator
- Jaytirth Ahya — Founder, Beachhouse Project | The Experience Co.
- Abhijeet Satani — Neuroscientist | Patents, IPs, Published Author
- Abhijeet Agarwal — Founder, Whole9Yards | KartIt
- Sanskar Sawant — Founder, Homework Studio
- Prateek Mittal — Founder & CEO, Cremeitalia (artisanal Italian cheese)
- Priyal Thacker — Founder & CEO, Gusto Foods (FMCG / food gifting)
- Sid Pai — Co-Founder & Managing Partner, UK&Co (family-business consulting)
- Bernat Fortet — Founder, Restoration Scope (reforestation tech, YC '19)

## Contact (public)

- Email: jay0.0bhanushali@gmail.com
- LinkedIn: linkedin.com/in/jaybhanushaliatwork
- WhatsApp click-to-chat: +91 7977523280
- (Logout Club Instagram linked within its section, not as a contact.)

## Decisions

- **Text only** — no portrait photo.
- Logout Club Instagram is linked in its section.

## Design Language

**Palette — "lights off, mint on" (dark theme)**
- Canvas: `#0E0E0F`
- Raised surfaces (cards, pills): `#19191C`
- Primary text: `#F4F2EC`
- Muted text: `#8A8A90`
- Accent (mint/teal): `#A8E6DC` — used sparingly (key words, stat numbers, hovers).

**Typography**
- Display: **Fraunces** (high-contrast serif, characterful) for headlines and
  stat numbers.
- Body & UI: **Inter** (clean grotesque).

**Motifs**
- Pill badges for metrics/tags.
- Mint quote-curl shapes as section accents (echoing the deck).
- Soft rounded corners, generous spacing, faint film grain over the black.

**Motion (tasteful)**
- Stat numbers count up on scroll-into-view.
- Sections fade + rise on scroll.
- Magnetic / mint-glow hover on buttons and links.
- One subtle hero ambient touch (slow gradient drift or grain shimmer).
- Respects `prefers-reduced-motion`.

**Layout**
- Single centered column, comfortable max-width, mobile-first, big type, lots of
  negative space.

## Technical Approach

- **Static site**: plain HTML + CSS + vanilla JS. No framework.
  - Rationale: instant load, trivial hosting, no build step, easy to maintain.
- Fonts via Google Fonts (Fraunces, Inter).
- Motion via the IntersectionObserver API + small vanilla JS (count-up, reveals,
  magnetic hover). No JS libraries.
- Accessibility: semantic HTML, sufficient contrast, reduced-motion support,
  keyboard-focusable links.
- SEO/share: `<title>Jay Bhanushali's resume</title>`, meta description, Open
  Graph + Twitter card tags so the link previews nicely when shared.

### File structure (planned)
```
Jay's resume/
  index.html
  styles.css
  main.js
  assets/            (favicon, og-image if generated)
  docs/specs/        (this spec)
  .gitignore
  README.md
```

### Deployment
1. Build the static site in the project folder.
2. Commit to the local isolated repo.
3. Create a new public GitHub repo under jaysaiexperiments-ux and push.
4. Deploy to Vercel (linked to the repo) → unique shareable link.

## Out of Scope (YAGNI)

- No CMS / backend / contact form (links only).
- No multi-page routing.
- No analytics (can be added later).
- No light theme (single dark theme).
