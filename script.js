/* ============ THEME TOGGLE ============ */
const toggle = document.getElementById('themeToggle');
const root = document.documentElement;
if (localStorage.getItem('theme') === 'dark') {
  root.setAttribute('data-theme','dark');
  if (toggle) toggle.textContent = '🌙';
}
if (toggle) {
  toggle.addEventListener('click', () => {
    if (root.getAttribute('data-theme') === 'dark') {
      root.removeAttribute('data-theme');
      toggle.textContent = '☀️';
      localStorage.setItem('theme','light');
    } else {
      root.setAttribute('data-theme','dark');
      toggle.textContent = '🌙';
      localStorage.setItem('theme','dark');
    }
  });
}

/* ============ TYPING EFFECT ============ */
const typedEl = document.getElementById('typed');
if (typedEl) {
  const titles = ['Frontend Developer', 'Full Stack Developer', 'Software Engineering Student'];
  let ti = 0, ci = 0, deleting = false;
  function type() {
    const current = titles[ti];
    typedEl.textContent = current.substring(0, ci);
    if (!deleting) {
      ci++;
      if (ci > current.length) { deleting = true; setTimeout(type, 1500); return; }
    } else {
      ci--;
      if (ci === 0) { deleting = false; ti = (ti + 1) % titles.length; }
    }
    setTimeout(type, deleting ? 50 : 100);
  }
  type();
}

/* ============ COUNTER ============ */
const nums = document.querySelectorAll('.num');
const numObs = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const target = +e.target.dataset.target;
      let count = 0;
      const step = Math.max(1, Math.ceil(target / 30));
      const update = () => {
        count += step;
        if (count >= target) { e.target.textContent = target + '+'; return; }
        e.target.textContent = count + '+';
        requestAnimationFrame(update);
      };
      update();
      numObs.unobserve(e.target);
    }
  });
}, { threshold: 0.5 });
nums.forEach(n => numObs.observe(n));

/* ============ REVEAL ============ */
const reveals = document.querySelectorAll('.reveal');
const revealObs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('active'); });
}, { threshold: 0.12 });
reveals.forEach(r => revealObs.observe(r));

/* ============ SCROLL TOP ============ */
const scrollBtn = document.querySelector('.scroll-top');
if (scrollBtn) {
  window.addEventListener('scroll', () => {
    scrollBtn.classList.toggle('show', window.scrollY > 400);
  });
  scrollBtn.addEventListener('click', () => window.scrollTo({ top:0, behavior:'smooth' }));
}

/* ============ MOBILE NAV TOGGLE (NAYA ADD HUA) ============ */
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');
const navOverlay = document.getElementById('navOverlay');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('open');
    navLinks.classList.toggle('open');
    if (navOverlay) navOverlay.classList.toggle('open');
    document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
  });

  if (navOverlay) {
    navOverlay.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Menu close on link click (mobile pe)
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('open');
      navLinks.classList.remove('open');
      if (navOverlay) navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}