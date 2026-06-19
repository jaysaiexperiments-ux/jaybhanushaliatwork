// Jay Bhanushali — resume
// Motion: hero stagger-in, reveal-on-scroll, stat count-up, magnetic pills.
// Every effect degrades gracefully under prefers-reduced-motion.

document.addEventListener("DOMContentLoaded", () => {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  // --- Scroll progress bar ------------------------------------------------
  const progress = document.getElementById("progress");
  if (progress) {
    let ticking = false;
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      const p = h > 0 ? window.scrollY / h : 0;
      progress.style.transform = `scaleX(${Math.min(p, 1)})`;
      ticking = false;
    };
    window.addEventListener("scroll", () => {
      if (!ticking) { requestAnimationFrame(update); ticking = true; }
    }, { passive: true });
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
});
