// Jay Bhanushali — resume
// Motion: hero stagger-in, reveal-on-scroll, stat count-up, magnetic pills.
// Every effect degrades gracefully under prefers-reduced-motion.

document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.classList.add("js");

  // --- Smooth scroll (Lenis) ----------------------------------------------
  if (window.Lenis && !reduce) {
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    const lraf = (t) => { lenis.raf(t); requestAnimationFrame(lraf); };
    requestAnimationFrame(lraf);
  }

  // --- Hero load-in -------------------------------------------------------
  const hero = document.getElementById("hero");
  if (hero) {
    // next frame so the initial (hidden) state paints first
    requestAnimationFrame(() => hero.classList.add("is-loaded"));
  }

  // --- Reveal-on-scroll ---------------------------------------------------
  const reveals = document.querySelectorAll(".reveal");
  if (reduce) {
    reveals.forEach((el) => el.classList.add("is-visible"));
  } else {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    reveals.forEach((el) => io.observe(el));
  }

  // --- Stat count-up ------------------------------------------------------
  const nums = document.querySelectorAll(".stat__num");
  const countUp = (el) => {
    const target = parseFloat(el.dataset.target);
    const suffix = el.dataset.suffix || "";
    if (reduce) {
      el.textContent = target + suffix;
      return;
    }
    const duration = 1300;
    const start = performance.now();
    const tick = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      const val = Math.round(target * eased);
      el.textContent = val + suffix;
      if (p < 1) {
        requestAnimationFrame(tick);
      } else {
        el.classList.add("is-popped");
      }
    };
    requestAnimationFrame(tick);
  };

  if (nums.length) {
    const statIO = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            countUp(e.target);
            statIO.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    nums.forEach((el) => statIO.observe(el));
  }

  // --- Magnetic pills (pointer only, motion allowed) ----------------------
  const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  if (!reduce && finePointer) {
    document.querySelectorAll(".pill--mag").forEach((pill) => {
      pill.addEventListener("mousemove", (ev) => {
        const r = pill.getBoundingClientRect();
        const x = ev.clientX - r.left - r.width / 2;
        const y = ev.clientY - r.top - r.height / 2;
        pill.style.transform = `translate(${x * 0.22}px, ${y * 0.28}px)`;
      });
      pill.addEventListener("mouseleave", () => {
        pill.style.transform = "";
      });
    });
  }

  // --- Cursor spotlight ("your cursor is the light") ----------------------
  const spotlight = document.querySelector(".spotlight");
  if (spotlight && !reduce && finePointer) {
    let tx = 50, ty = 12, cx = 50, cy = 12, raf = null;
    const render = () => {
      cx += (tx - cx) * 0.12;
      cy += (ty - cy) * 0.12;
      spotlight.style.setProperty("--mx", cx + "%");
      spotlight.style.setProperty("--my", cy + "%");
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(render);
      } else {
        raf = null;
      }
    };
    window.addEventListener("mousemove", (ev) => {
      tx = (ev.clientX / window.innerWidth) * 100;
      ty = (ev.clientY / window.innerHeight) * 100;
      spotlight.classList.add("is-active");
      if (!raf) raf = requestAnimationFrame(render);
    }, { passive: true });
  }

  // --- Scroll progress comet ----------------------------------------------
  const comet = document.getElementById("comet");
  if (comet && !reduce) {
    const tail = 220; // keep in sync with .comet width
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? Math.min(window.scrollY / h, 1) : 0;
      // head sits at p across the viewport; tail trails behind it
      const headX = p * window.innerWidth;
      comet.style.setProperty("--x", headX - tail + "px");
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
    window.addEventListener("resize", update, { passive: true });
    update();
  }

  // --- Eyebrow letter-wave (hover surprise) -------------------------------
  document.querySelectorAll(".eyebrow").forEach((el) => {
    const text = el.textContent;
    el.textContent = "";
    [...text].forEach((c, i) => {
      const span = document.createElement("span");
      span.className = "ch";
      span.textContent = c === " " ? " " : c;
      span.style.animationDelay = i * 0.03 + "s";
      el.appendChild(span);
    });
  });

  // --- Founders constellation (orbiting ring) -----------------------------
  const constel = document.getElementById("constellation");
  if (constel && !reduce) {
    const founders = [
      { n: "Rishabh Mariwala", c: "Sharrp Ventures" },
      { n: "Tamma Carel", c: "Imvelo & iCOR" },
      { n: "Chaitanya Muppala", c: "Manam Chocolate" },
      { n: "Ankur Shah", c: "Environmental Educator" },
      { n: "Jaytirth Ahya", c: "Beachhouse Project" },
      { n: "Abhijeet Satani", c: "Neuroscientist, Author" },
      { n: "Abhijeet Agarwal", c: "Whole9Yards | KartIt" },
      { n: "Sanskar Sawant", c: "Homework Studio" },
      { n: "Prateek Mittal", c: "Cremeitalia" },
      { n: "Priyal Thacker", c: "Gusto Foods" },
      { n: "Sid Pai", c: "UK&Co" },
      { n: "Bernat Fortet", c: "Restoration Scope" },
    ];

    const core = document.createElement("div");
    core.className = "constel__core";
    core.innerHTML = "<b>12</b><small>founders</small>";
    constel.appendChild(core);

    const stars = founders.map((f) => {
      const el = document.createElement("div");
      el.className = "star";
      el.innerHTML =
        '<span class="star__dot"></span>' +
        '<span class="star__label"><span class="star__name">' + f.n +
        '</span><span class="star__co">' + f.c + "</span></span>";
      constel.appendChild(el);
      return el;
    });

    let rot = 0, last = performance.now(), paused = false;
    const speed = 0.05; // radians / second
    constel.addEventListener("mouseenter", () => (paused = true));
    constel.addEventListener("mouseleave", () => (paused = false));

    const frame = (now) => {
      const dt = (now - last) / 1000; last = now;
      if (!paused) rot += dt * speed;
      const w = constel.clientWidth;
      if (w > 0) {
        const cx = w / 2, r = w * 0.42;
        stars.forEach((el, i) => {
          const a = (i / stars.length) * Math.PI * 2 - Math.PI / 2 + rot;
          el.style.left = (cx + Math.cos(a) * r) + "px";
          el.style.top = (cx + Math.sin(a) * r) + "px";
          el.classList.toggle("star--left", Math.cos(a) < -0.01);
        });
      }
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }
});
