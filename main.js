/* =============================================
   KASHISH FATIMA · PORTFOLIO 2026
   main.js — FIXED VERSION
   ============================================= */

'use strict';

/* ── Loader ───────────────────────────────── */
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  if (loader) {
    setTimeout(() => loader.classList.add('hidden'), 800);
  }
});

/* ── Theme Toggle ─────────────────────────── */
const html = document.documentElement;
const themeBtn = document.getElementById('themeToggle');

if (themeBtn) {
  const themeIcon = themeBtn.querySelector('.theme-toggle__icon');

  const savedTheme = localStorage.getItem('kf-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  if (themeIcon) themeIcon.textContent = savedTheme === 'dark' ? '☀' : '☾';

  themeBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';

    html.setAttribute('data-theme', next);
    localStorage.setItem('kf-theme', next);
    if (themeIcon) themeIcon.textContent = next === 'dark' ? '☀' : '☾';
  });
}

/* ── Mobile Nav ───────────────────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  navLinks.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/* ── Sticky Nav ───────────────────────────── */
const nav = document.getElementById('nav');
const hero = document.getElementById('hero');

if (nav && hero) {
  const navObserver = new IntersectionObserver(([e]) => {
    nav.classList.toggle('scrolled', !e.isIntersecting);
  }, { threshold: 0.15 });

  navObserver.observe(hero);
}

/* ── Active Nav Link ──────────────────────── */
const sections = document.querySelectorAll('section[id]');
const navLinksAll = document.querySelectorAll('.nav__link');

const activeObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinksAll.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(sec => activeObserver.observe(sec));

/* ── Custom Cursor ────────────────────────── */
const cursor = document.getElementById('cursor');
const cursorTrail = document.getElementById('cursorTrail');

let curX = 0, curY = 0, trailX = 0, trailY = 0;

document.addEventListener('mousemove', (e) => {
  curX = e.clientX;
  curY = e.clientY;

  if (cursor) {
    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';
  }
});

document.querySelectorAll('a, button, .port-item').forEach(el => {
  el.addEventListener('mouseenter', () => {
    if (cursorTrail) cursorTrail.style.transform = 'translate(-50%,-50%) scale(1.8)';
  });
  el.addEventListener('mouseleave', () => {
    if (cursorTrail) cursorTrail.style.transform = 'translate(-50%,-50%) scale(1)';
  });
});

function animateTrail() {
  trailX += (curX - trailX) * 0.12;
  trailY += (curY - trailY) * 0.12;

  if (cursorTrail) {
    cursorTrail.style.left = trailX + 'px';
    cursorTrail.style.top = trailY + 'px';
  }

  requestAnimationFrame(animateTrail);
}
animateTrail();

/* ── Particles ────────────────────────────── */
(function () {
  const canvas = document.getElementById('particles');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let W, H;

  const particles = [];
  const GOLD = getComputedStyle(document.documentElement)
    .getPropertyValue('--gold').trim() || '#c9a84c';

  const COUNT = Math.min(50, Math.floor(window.innerWidth / 22));

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  window.addEventListener('resize', resize);
  resize();

  class Particle {
    constructor() { this.reset(true); }
    reset(randomY) {
      this.x = Math.random() * W;
      this.y = randomY ? Math.random() * H : H + 5;
      this.vx = (Math.random() - 0.5) * 0.2;
      this.vy = -(Math.random() * 0.4 + 0.15);
      this.r = Math.random() * 1.2 + 0.3;
      this.a = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.y < -5) this.reset();
    }
    draw() {
      ctx.globalAlpha = this.a;
      ctx.fillStyle = GOLD;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < COUNT; i++) particles.push(new Particle());

  function loop() {
    ctx.clearRect(0, 0, W, H);
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(loop);
  }

  loop();
})();

/* ── Scroll Reveal ────────────────────────── */
const reveals = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

reveals.forEach(el => revealObserver.observe(el));

/* ── Skill Bars ───────────────────────────── */
document.querySelectorAll('.skill-bar__fill').forEach(el => {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        el.style.width = el.dataset.w + '%';
      }
    });
  }, { threshold: 0.5 });

  obs.observe(el);
});

/* ── Portfolio Filter ─────────────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const portItems = document.querySelectorAll('.port-item');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    portItems.forEach(item => {
      item.style.display =
        (filter === 'all' || item.dataset.cat === filter)
          ? 'block'
          : 'none';
    });
  });
});

/* ── Portfolio Modal ──────────────────────── */
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalImg = document.getElementById('modalImg');
const modalTag = document.getElementById('modalTag');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDesc');

document.querySelectorAll('.port-item__view').forEach(btn => {
  btn.addEventListener('click', () => {
    const id = btn.dataset.modal;
    const data = window.MODAL_DATA?.[id];
    if (!data) return;

    modalImg.src = data.src;
    modalTag.textContent = data.tag;
    modalTitle.textContent = data.title;
    modalDesc.textContent = data.desc;

    modalOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  });
});

function closeModal() {
  modalOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalClose) modalClose.addEventListener('click', closeModal);

if (modalOverlay) {
  modalOverlay.addEventListener('click', e => {
    if (e.target === modalOverlay) closeModal();
  });
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

/* ── Testimonials ─────────────────────────── */
const testimonials = document.querySelectorAll('.testimonial');
const dots = document.querySelectorAll('.dot');
let current = 0;

function showTestimonial(idx) {
  if (!testimonials.length) return;

  testimonials[current].classList.remove('active');
  dots[current].classList.remove('active');

  current = idx;

  testimonials[current].classList.add('active');
  dots[current].classList.add('active');
}

dots.forEach(dot => {
  dot.addEventListener('click', () => showTestimonial(+dot.dataset.idx));
});

setInterval(() => {
  if (testimonials.length) {
    showTestimonial((current + 1) % testimonials.length);
  }
}, 5000);

/* ── Contact Form (FIXED EMAILJS) ───────────────────────── */

const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = document.getElementById('cf-name').value.trim();
    const email = document.getElementById('cf-email').value.trim();
    const subject = document.getElementById('cf-subject').value.trim();
    const message = document.getElementById('cf-message').value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "⚠ Please fill all required fields";
      formStatus.style.color = "#e07070";
      return;
    }

    const btn = contactForm.querySelector('button');
    btn.textContent = "Sending...";
    btn.disabled = true;

    emailjs.send("service_w2b1ey7", "template_ggqnjk4", {
      user_name: name,
      user_email: email,
      subject,
      message
    })
    .then(() => {
      formStatus.textContent = "✔ Message sent!";
      formStatus.style.color = "var(--gold)";
      contactForm.reset();
    })
    .catch(() => {
      formStatus.textContent = "❌ Failed to send message";
      formStatus.style.color = "red";
    })
    .finally(() => {
      btn.textContent = "Send Message";
      btn.disabled = false;
    });
  });
}

/* ── Smooth scroll ────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    e.preventDefault();

    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;

    const offset = nav ? nav.offsetHeight + 16 : 0;

    window.scrollTo({
      top: target.getBoundingClientRect().top + window.scrollY - offset,
      behavior: 'smooth'
    });
  });
});