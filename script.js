// ============================================================
// UWLAW ART — site behavior
// ============================================================

document.addEventListener("DOMContentLoaded", () => {
  // --- Footer year ---
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Mobile nav toggle ---
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  if (navToggle && header) {
    navToggle.addEventListener("click", () => {
      const isOpen = header.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    // Close mobile menu after clicking a nav link
    document.querySelectorAll(".site-nav a").forEach((link) => {
      link.addEventListener("click", () => {
        header.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // --- Scroll reveal for sections ---
  const revealTargets = document.querySelectorAll(
    ".section-head, .ig-frame, .process-step, .faq-list, .contact-inner"
  );
  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealTargets.forEach((el) => observer.observe(el));
  } else {
    // Fallback: no IntersectionObserver support, just show everything
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }

  // --- Work carousel ---
  const carousel = document.getElementById("work-carousel");
  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = Array.from(carousel.querySelectorAll(".carousel-slide"));
    const prevBtn = carousel.querySelector(".carousel-prev");
    const nextBtn = carousel.querySelector(".carousel-next");
    const dots = Array.from(carousel.querySelectorAll(".carousel-dot"));
    let index = 0;

    const goTo = (i) => {
      index = (i + slides.length) % slides.length;
      track.style.transform = `translateX(-${index * 100}%)`;
      dots.forEach((dot, d) => dot.classList.toggle("is-active", d === index));
    };

    if (prevBtn) prevBtn.addEventListener("click", () => goTo(index - 1));
    if (nextBtn) nextBtn.addEventListener("click", () => goTo(index + 1));
    dots.forEach((dot, d) => dot.addEventListener("click", () => goTo(d)));

    // Keyboard arrows when the carousel (or a child) has focus/is in view
    carousel.setAttribute("tabindex", "0");
    carousel.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") goTo(index - 1);
      if (e.key === "ArrowRight") goTo(index + 1);
    });

    // Touch swipe
    let touchStartX = null;
    track.addEventListener("touchstart", (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener("touchend", (e) => {
      if (touchStartX === null) return;
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) goTo(dx < 0 ? index + 1 : index - 1);
      touchStartX = null;
    });

    goTo(0);
  }

  // --- Contact form ---
  // The form submits directly to FormSubmit (see the action= attribute on
  // the <form> in index.html) — no JS interception needed. It's a real
  // browser form submission, so the built-in "required" field validation
  // and normal submit behavior just work. After a successful submission,
  // FormSubmit redirects back here with ?sent=1, and this just shows a
  // thank-you line and cleans the URL back up.
  const sentNote = document.getElementById("form-sent");
  if (sentNote && new URLSearchParams(window.location.search).get("sent") === "1") {
    sentNote.textContent = "Thanks — that's in. We'll get back to you within 2 business days.";
    const cleanUrl = window.location.pathname + window.location.hash;
    window.history.replaceState({}, document.title, cleanUrl);
  }
});
