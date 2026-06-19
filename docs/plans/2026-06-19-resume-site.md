# Resume Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a sleek dark single-page resume site for Jay Bhanushali and deploy it to Vercel with a unique shareable link.

**Architecture:** Static site — one `index.html`, one `styles.css`, one `main.js`, plus a small `assets/` folder. No framework, no build step. Motion via vanilla JS + IntersectionObserver. Hosted on Vercel from a new isolated GitHub repo.

**Tech Stack:** HTML5, CSS (custom properties, fl/grid), vanilla JS, Google Fonts (Fraunces + Inter), Playwright (verification only), Git + GitHub + Vercel.

**Verification note:** No unit tests (static visual site). Each build task is verified by rendering `index.html` and taking a Playwright screenshot at desktop (1280px) and mobile (390px), then confirming the section looks right before committing.

---

## File Structure

```
Jay's resume/
  index.html        all section markup + <head> meta (title, description, OG/Twitter)
  styles.css        design tokens, typography, components, sections, responsive, reduced-motion
  main.js           reveal-on-scroll, stat count-up, magnetic hover; guarded by prefers-reduced-motion
  assets/
    favicon.svg     mint "J" mark
    og-image.png    1200x630 share preview (generated last)
  README.md         what this is + local preview + deploy notes
  docs/specs/...    spec (already committed)
  docs/plans/...    this plan
```

---

### Task 1: Scaffold + design tokens + head meta

**Files:**
- Create: `index.html`
- Create: `styles.css`
- Create: `main.js`

- [ ] **Step 1: Create `index.html` skeleton**

Full document with semantic section placeholders and complete share meta. The `<title>` MUST read "Jay Bhanushali's resume".

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Jay Bhanushali's resume</title>
  <meta name="description" content="Jay Bhanushali — always at the crossroads, building something or around builders. Building Logout Club; helping founders get found on LinkedIn (3M+ reach, 5+ founders)." />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="Jay Bhanushali's resume" />
  <meta property="og:description" content="Building Logout Club. Helping founders get found on LinkedIn — 3M+ reach, 5+ founders." />
  <meta property="og:image" content="assets/og-image.png" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="icon" href="assets/favicon.svg" type="image/svg+xml" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,900&family=Inter:wght@400;500;600&display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <main>
    <section id="hero" class="section"></section>
    <section id="thread" class="section reveal"></section>
    <section id="logout" class="section reveal"></section>
    <section id="work" class="section reveal"></section>
    <section id="timeline" class="section reveal"></section>
  </main>
  <footer id="contact" class="reveal"></footer>
  <script src="main.js" defer></script>
</body>
</html>
```

- [ ] **Step 2: Create `styles.css` with design tokens + base**

```css
:root {
  --canvas: #0E0E0F;
  --surface: #19191C;
  --text: #F4F2EC;
  --muted: #8A8A90;
  --mint: #A8E6DC;
  --maxw: 760px;
  --pad: clamp(20px, 5vw, 40px);
  --serif: "Fraunces", Georgia, serif;
  --sans: "Inter", system-ui, sans-serif;
}
* { box-sizing: border-box; margin: 0; }
html { scroll-behavior: smooth; }
body {
  background: var(--canvas);
  color: var(--text);
  font-family: var(--sans);
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
  /* faint film grain via layered radial noise substitute */
  background-image: radial-gradient(circle at 50% -10%, rgba(168,230,220,0.06), transparent 60%);
  background-attachment: fixed;
}
main { max-width: var(--maxw); margin: 0 auto; padding: 0 var(--pad); }
.section { padding: clamp(64px, 12vh, 120px) 0; }
h1, h2, h3 { font-family: var(--serif); font-weight: 900; line-height: 1.05; }
a { color: inherit; }
.mint { color: var(--mint); }
.pill {
  display: inline-flex; align-items: center; gap: 8px;
  background: var(--surface); color: var(--text);
  border-radius: 999px; padding: 8px 16px; font-size: 14px; font-weight: 500;
}
.reveal { opacity: 0; transform: translateY(24px); transition: opacity .7s ease, transform .7s ease; }
.reveal.is-visible { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) {
  html { scroll-behavior: auto; }
  .reveal { opacity: 1; transform: none; transition: none; }
}
```

- [ ] **Step 3: Create `main.js` stub**

```js
// Motion: reveal-on-scroll, stat count-up, magnetic hover.
// All effects no-op under prefers-reduced-motion.
document.addEventListener("DOMContentLoaded", () => {
  // populated in Task 6
});
```

- [ ] **Step 4: Verify it renders**

Run a local server and screenshot:
```bash
python3 -m http.server 8000 --directory "/Users/jay/Desktop/Claude Code Agents/Jay's resume"
```
Open `http://localhost:8000`, Playwright screenshot at 1280px and 390px.
Expected: blank dark canvas, no console errors, tab title "Jay Bhanushali's resume".

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: scaffold resume site shell with design tokens and share meta

Co-Authored-By: Claude Opus 4.8 <noreply@anthropic.com>"
```

---

### Task 2: Hero section

**Files:**
- Modify: `index.html` (`#hero`)
- Modify: `styles.css`

- [ ] **Step 1: Fill `#hero` markup**

```html
<section id="hero" class="section hero">
  <p class="hero__eyebrow">Jay Bhanushali</p>
  <h1 class="hero__line">Always at the crossroads — <span class="mint">building something</span>, or around builders.</h1>
  <p class="hero__now">Right now: building <strong>Logout Club</strong>. Alongside: helping founders get found on LinkedIn — <span class="mint">3M+ reach</span>, <span class="mint">5+ founders</span>.</p>
  <div class="hero__contact">
    <a class="pill" href="mailto:jay0.0bhanushali@gmail.com">Email</a>
    <a class="pill" href="https://www.linkedin.com/in/jaybhanushaliatwork" target="_blank" rel="noopener">LinkedIn</a>
    <a class="pill" href="https://wa.me/917977523280" target="_blank" rel="noopener">WhatsApp</a>
  </div>
  <span class="hero__scroll" aria-hidden="true">scroll ↓</span>
</section>
```

- [ ] **Step 2: Add hero styles**

```css
.hero { min-height: 92vh; display: flex; flex-direction: column; justify-content: center; gap: 24px; }
.hero__eyebrow { font-size: 15px; letter-spacing: .14em; text-transform: uppercase; color: var(--muted); }
.hero__line { font-size: clamp(40px, 8vw, 76px); }
.hero__now { color: var(--muted); font-size: clamp(16px, 2.4vw, 20px); max-width: 60ch; }
.hero__now strong { color: var(--text); font-weight: 600; }
.hero__contact { display: flex; gap: 12px; flex-wrap: wrap; margin-top: 8px; }
.hero__contact .pill { transition: transform .2s ease, box-shadow .2s ease, color .2s ease; }
.hero__contact .pill:hover { color: var(--mint); box-shadow: 0 0 0 1px var(--mint), 0 0 24px rgba(168,230,220,.25); }
.hero__scroll { margin-top: 40px; font-size: 13px; color: var(--muted); letter-spacing: .1em; }
```

- [ ] **Step 3: Verify** — screenshot desktop + mobile. Hero fills viewport, line wraps cleanly, mint only on accented words, pills hover-glow.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: hero section with crossroads positioning"
```

---

### Task 3: The thread + Logout Club sections

**Files:**
- Modify: `index.html` (`#thread`, `#logout`)
- Modify: `styles.css`

- [ ] **Step 1: Fill `#thread`**

```html
<section id="thread" class="section reveal">
  <p class="lead">I'm a marketer and start-up obsessive who keeps ending up where things are being built. Community, content, growth — the connective tissue that turns a good idea into something people actually find and gather around.</p>
  <p class="lead">Mechanical engineer by degree, builder by instinct. I like problems with no preset box to put a boundary on.</p>
</section>
```

- [ ] **Step 2: Fill `#logout`**

```html
<section id="logout" class="section reveal">
  <h2 class="section__title">Building now — <span class="mint">Logout Club</span></h2>
  <p class="lead">It started as a run club. It became a community built around one idea: <em>logging out</em> — and the experiences that happen when you do. 50+ runs and a string of experiences later, it's still pointed at that same north star.</p>
  <div class="badges">
    <span class="pill">50+ runs</span>
    <span class="pill">Community-first</span>
    <span class="pill">Hyderabad</span>
  </div>
  <a class="link-arrow" href="https://www.instagram.com/logoutclub.hyd/" target="_blank" rel="noopener">See it on Instagram →</a>
</section>
```

- [ ] **Step 3: Add shared section styles**

```css
.section__title { font-size: clamp(28px, 5vw, 44px); margin-bottom: 24px; }
.lead { font-size: clamp(17px, 2.4vw, 21px); color: var(--text); max-width: 62ch; margin-bottom: 18px; }
.badges { display: flex; gap: 10px; flex-wrap: wrap; margin: 24px 0; }
.link-arrow { color: var(--mint); font-weight: 500; text-decoration: none; border-bottom: 1px solid transparent; transition: border-color .2s ease; }
.link-arrow:hover { border-color: var(--mint); }
```

- [ ] **Step 4: Verify** — screenshot. Reveal classes present (sections start hidden until Task 6 wires JS; for this screenshot temporarily confirm content by scrolling — acceptable to see faded state).

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css
git commit -m "feat: intro thread and Logout Club sections"
```

---

### Task 4: Founder growth work — stats, roster, case study

**Files:**
- Modify: `index.html` (`#work`)
- Modify: `styles.css`

- [ ] **Step 1: Fill `#work` markup**

```html
<section id="work" class="section reveal">
  <h2 class="section__title">Around builders — <span class="mint">founder growth on LinkedIn</span></h2>
  <p class="lead">I help founders create real work, build a presence, and get discovered. Content × Connections × Community.</p>

  <div class="stats">
    <div class="stat"><span class="stat__num" data-target="3" data-suffix="M+">0</span><span class="stat__label">total reach</span></div>
    <div class="stat"><span class="stat__num" data-target="5" data-suffix="+">0</span><span class="stat__label">founders</span></div>
    <div class="stat"><span class="stat__num" data-target="500" data-suffix="+">0</span><span class="stat__label">posts created</span></div>
    <div class="stat"><span class="stat__num" data-target="21" data-suffix="k">0</span><span class="stat__label">followers grown (from 2k)</span></div>
  </div>

  <article class="case">
    <p class="case__tag">Case study</p>
    <h3 class="case__name">Tamma Carel — environmental consultant & founder</h3>
    <ul class="case__list">
      <li><span class="mint">2k → 21k+</span> followers</li>
      <li><span class="mint">1.5M+</span> impressions in 365 days (~100k/month)</li>
      <li>Connections with chief sustainability officers, ESG heads, founders</li>
      <li>Podcast invites, collaborations, and a <span class="mint">TEDx</span> talk invite</li>
    </ul>
  </article>

  <p class="roster__title">Founders I've worked with</p>
  <div class="roster">
    <span class="pill">Rishabh Mariwala · Sharrp Ventures (Marico & Kaya)</span>
    <span class="pill">Tamma Carel · Imvelo & iCOR</span>
    <span class="pill">Chaitanya Muppala · Manam Chocolate / Almond House</span>
    <span class="pill">Ankur Shah · Environmental Educator</span>
    <span class="pill">Jaytirth Ahya · Beachhouse Project</span>
    <span class="pill">Abhijeet Satani · Neuroscientist, Author</span>
    <span class="pill">Abhijeet Agarwal · Whole9Yards | KartIt</span>
    <span class="pill">Sanskar Sawant · Homework Studio</span>
  </div>
</section>
```

- [ ] **Step 2: Add styles**

```css
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin: 32px 0; }
.stat { background: var(--surface); border-radius: 16px; padding: 24px 16px; text-align: center; }
.stat__num { display: block; font-family: var(--serif); font-weight: 900; font-size: clamp(28px, 5vw, 44px); color: var(--mint); }
.stat__label { font-size: 13px; color: var(--muted); }
.case { background: var(--surface); border-radius: 20px; padding: 32px; margin: 32px 0; border: 1px solid rgba(168,230,220,.18); }
.case__tag { font-size: 12px; letter-spacing: .14em; text-transform: uppercase; color: var(--mint); margin-bottom: 8px; }
.case__name { font-size: clamp(20px, 3vw, 26px); margin-bottom: 16px; }
.case__list { list-style: none; display: grid; gap: 10px; }
.case__list li { padding-left: 22px; position: relative; }
.case__list li::before { content: "→"; position: absolute; left: 0; color: var(--mint); }
.roster__title { color: var(--muted); margin: 24px 0 14px; font-size: 14px; }
.roster { display: flex; gap: 10px; flex-wrap: wrap; }
@media (max-width: 560px) { .stats { grid-template-columns: repeat(2, 1fr); } }
```

- [ ] **Step 3: Verify** — screenshot desktop + mobile. Stats grid is 4-up desktop / 2-up mobile, case card has mint border, roster wraps.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: founder growth section with stats, case study, roster"
```

---

### Task 5: Career timeline

**Files:**
- Modify: `index.html` (`#timeline`)
- Modify: `styles.css`

- [ ] **Step 1: Fill `#timeline`**

```html
<section id="timeline" class="section reveal">
  <h2 class="section__title">The arc</h2>
  <ol class="tl">
    <li class="tl__item"><span class="tl__when">Now</span><div><strong>Logout Club</strong> — building & community</div></li>
    <li class="tl__item"><span class="tl__when">2024–25</span><div><strong>Manam Chocolate</strong> — Brand Manager</div></li>
    <li class="tl__item"><span class="tl__when">2023–24</span><div><strong>Homework Studio</strong> — Growth</div></li>
    <li class="tl__item"><span class="tl__when">2021–22</span><div><strong>Beachhouse Project / The Experience Co.</strong> — Growth Marketing</div></li>
    <li class="tl__item"><span class="tl__when">2019–21</span><div><strong>TreeWear</strong> — Growth Marketing & Operations</div></li>
    <li class="tl__item"><span class="tl__when">2020–now</span><div><strong>Imvelo (UK)</strong> — Growth (ongoing)</div></li>
  </ol>
  <p class="edu">B.E. Mechanical Engineering · Dwarkadas J. Sanghvi College of Engineering (2015–2019)</p>
</section>
```

- [ ] **Step 2: Add styles**

```css
.tl { list-style: none; border-left: 1px solid rgba(255,255,255,.12); padding-left: 24px; display: grid; gap: 22px; }
.tl__item { position: relative; }
.tl__item::before { content: ""; position: absolute; left: -29px; top: 8px; width: 8px; height: 8px; border-radius: 50%; background: var(--mint); }
.tl__when { display: block; font-size: 13px; color: var(--muted); margin-bottom: 2px; }
.edu { margin-top: 32px; color: var(--muted); font-size: 14px; }
```

- [ ] **Step 3: Verify** — screenshot. Timeline has mint dots on a vertical rule, entries readable on mobile.

- [ ] **Step 4: Commit**

```bash
git add index.html styles.css
git commit -m "feat: career timeline and education"
```

---

### Task 6: Footer + motion JS

**Files:**
- Modify: `index.html` (`#contact`)
- Modify: `styles.css`
- Modify: `main.js`

- [ ] **Step 1: Fill `#contact`**

```html
<footer id="contact" class="reveal">
  <div class="footer__inner">
    <h2 class="section__title">Let's talk</h2>
    <div class="hero__contact">
      <a class="pill" href="mailto:jay0.0bhanushali@gmail.com">jay0.0bhanushali@gmail.com</a>
      <a class="pill" href="https://www.linkedin.com/in/jaybhanushaliatwork" target="_blank" rel="noopener">LinkedIn</a>
      <a class="pill" href="https://wa.me/917977523280" target="_blank" rel="noopener">WhatsApp</a>
    </div>
    <p class="footer__sig">This is Jay Bhanushali's resume.</p>
  </div>
</footer>
```

- [ ] **Step 2: Add footer styles**

```css
footer { max-width: var(--maxw); margin: 0 auto; padding: clamp(64px,12vh,120px) var(--pad) 80px; }
.footer__sig { margin-top: 40px; font-family: var(--serif); font-size: 14px; color: var(--muted); }
```

- [ ] **Step 3: Implement `main.js`**

```js
document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Reveal-on-scroll
  const reveals = document.querySelectorAll(".reveal");
  if (reduce) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("is-visible"); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    reveals.forEach((el) => io.observe(el));
  }

  // Stat count-up
  const nums = document.querySelectorAll(".stat__num");
  const animate = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    if (reduce) { el.textContent = target + suffix; return; }
    const dur = 1200; const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      const val = target < 10 ? (target * eased).toFixed(0) : Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  const statIO = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { animate(e.target); statIO.unobserve(e.target); } });
  }, { threshold: 0.6 });
  nums.forEach((el) => statIO.observe(el));

  // Magnetic hover on pills
  if (!reduce) {
    document.querySelectorAll(".hero__contact .pill").forEach((pill) => {
      pill.addEventListener("mousemove", (ev) => {
        const r = pill.getBoundingClientRect();
        const x = ev.clientX - r.left - r.width / 2;
        const y = ev.clientY - r.top - r.height / 2;
        pill.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
      });
      pill.addEventListener("mouseleave", () => { pill.style.transform = ""; });
    });
  }
});
```

- [ ] **Step 4: Verify** — reload site. Scroll: sections fade+rise, stats tick up (3M+, 5+, 500+, 21k), pills follow cursor. Toggle reduce-motion in Playwright emulation → everything visible, no animation. Footer shows the literal "This is Jay Bhanushali's resume."

- [ ] **Step 5: Commit**

```bash
git add index.html styles.css main.js
git commit -m "feat: footer and scroll/count-up/magnetic motion"
```

---

### Task 7: Favicon, OG image, README, polish pass

**Files:**
- Create: `assets/favicon.svg`
- Create: `assets/og-image.png`
- Create: `README.md`

- [ ] **Step 1: Create `assets/favicon.svg`**

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#0E0E0F"/><text x="50%" y="54%" dominant-baseline="middle" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="900" fill="#A8E6DC">J</text></svg>
```

- [ ] **Step 2: Generate `assets/og-image.png`** (1200×630)

Use Playwright to screenshot a tiny inline HTML card (dark bg, mint "Jay Bhanushali", subtitle "always at the crossroads", serif), save to `assets/og-image.png`. Verify dimensions are 1200×630.

- [ ] **Step 3: Create `README.md`**

```markdown
# Jay Bhanushali — resume

A single-page personal resume site. Dark, editorial, static (HTML/CSS/JS, no build).

## Local preview
```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Deploy
Hosted on Vercel (static). Push to `main` → auto-deploys.
```

- [ ] **Step 4: Full-page verify** — screenshot the entire page top-to-bottom at 1280px and 390px. Check spacing rhythm, no overflow, mint used sparingly, all links correct.

- [ ] **Step 5: Commit**

```bash
git add assets README.md
git commit -m "feat: favicon, OG share image, README"
```

---

### Task 8: GitHub repo + Vercel deploy

**Files:** none (infra)

- [ ] **Step 1: Create the GitHub repo and push**

```bash
gh repo create jay-resume --public --source="/Users/jay/Desktop/Claude Code Agents/Jay's resume" --remote=origin --push
```
Expected: repo created under jaysaiexperiments-ux, `main` pushed. (Confirm repo name with user first.)

- [ ] **Step 2: Deploy to Vercel**

Use the Vercel skill/CLI (`vercel` then `vercel --prod`) or connect the GitHub repo in the Vercel dashboard. Framework preset: "Other" (static). Output dir: project root.
Expected: a unique URL like `https://jay-resume.vercel.app`.

- [ ] **Step 3: Verify live** — open the Vercel URL in Playwright, screenshot, confirm tab title "Jay Bhanushali's resume", links work, OG preview resolves.

- [ ] **Step 4: Hand the link to the user.**

---

## Self-Review

- **Spec coverage:** hero/positioning ✓ (T2), thread ✓ (T3), Logout Club + IG ✓ (T3), stats+case+roster ✓ (T4), timeline ✓ (T5), footer + literal resume line ✓ (T6), design tokens/fonts/motion ✓ (T1,T6), reduced-motion ✓ (T1,T6), share meta/OG/favicon ✓ (T1,T7), isolated repo ✓ (done), new GitHub repo + Vercel ✓ (T8), text-only/no photo ✓ (no img anywhere). No gaps.
- **Placeholders:** none — all code and copy is concrete. (OG image is generated via a described Playwright step, not a TODO.)
- **Consistency:** class names (`reveal`/`is-visible`, `stat__num` + `data-target`/`data-suffix`, `hero__contact .pill`) match between HTML, CSS, and JS across tasks.
