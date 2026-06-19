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
      if (p < 1) requestAnimationFrame(tick);
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
});
