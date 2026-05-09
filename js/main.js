// Navbar scroll effect
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// Hero parallax (homepage only)
const heroBg = document.getElementById('heroBg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    heroBg.style.transform = `scale(1.08) translateY(${window.scrollY * 0.3}px)`;
  }, { passive: true });
}

// Reveal on scroll (up, left, right)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => observer.observe(el));

// Scroll progress bar
const progressBar = document.querySelector('.scroll-progress');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total = document.body.scrollHeight - window.innerHeight;
    progressBar.style.width = (total > 0 ? (scrolled / total) * 100 : 0) + '%';
  }, { passive: true });
}

// Stat counter animation
function animateCounter(el) {
  const original = el.textContent.trim();
  const isK = /k/i.test(original);
  const rawNum = parseFloat(original.replace(/[^\d.]/g, ''));
  const suffix = original.replace(/[\d.]/g, '').replace(/k/gi, '');
  if (isNaN(rawNum) || rawNum === 0) return;
  const duration = 2000;
  const start = performance.now();
  function tick(now) {
    const t = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - t, 3);
    const val = Math.round(eased * rawNum);
    el.textContent = val + (isK ? 'k' : '') + suffix;
    if (t < 1) requestAnimationFrame(tick);
    else { el.textContent = original; el.classList.add('shimmer'); }
  }
  requestAnimationFrame(tick);
}
const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { animateCounter(e.target); statsObserver.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stat-num').forEach(el => statsObserver.observe(el));

// Hamburger menu toggle
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('nav-open');
    document.body.classList.toggle('nav-open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => {
      nav.classList.remove('nav-open');
      document.body.classList.remove('nav-open');
    });
  });
}
