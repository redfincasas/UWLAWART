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
  // NOTE: This is a static site with no backend. Submitting the form below
  // only shows a confirmation message locally — it does NOT send an email.
  // To actually receive submissions, wire this up to one of:
  //   - Cloudflare Pages Functions (a small serverless function you deploy
  //     alongside this site, e.g. /functions/contact.js) that forwards to
  //     an email service (Resend, SendGrid, Postmark, etc.)
  //   - A form backend like Formspree or Getform: change the <form> "action"
  //     attribute to their endpoint and let it submit normally.
  const form = document.getElementById("contact-form");
  const note = document.getElementById("form-note");

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (note) {
        note.textContent = "Got it — hook this form up to a backend (see script.js comments) to actually receive these.";
      }
      form.reset();
    });
  }
});
