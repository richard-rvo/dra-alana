// ── Smooth scroll for anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── Animate chart bars on scroll ────────────────────────────
const chartBars = document.querySelectorAll('.chart-bar');
chartBars.forEach(bar => {
  const targetH = bar.style.height;
  bar.style.height = '0%';

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        setTimeout(() => { bar.style.height = targetH; }, 100);
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });
  observer.observe(bar);
});

// ── Scroll-in animations ─────────────────────────────────────
const fadeEls = document.querySelectorAll(
  '.feature-card, .timeline-item, .step, .req-list li, .dash-card'
);

const fadeObserver = new IntersectionObserver(entries => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = `${i * 40}ms`;
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(18px)';
  el.style.transition = 'opacity .4s ease, transform .4s ease';
  fadeObserver.observe(el);
});

document.head.insertAdjacentHTML('beforeend', `
  <style>.visible { opacity: 1 !important; transform: translateY(0) !important; }</style>
`);

// ── Scale dots interactive demo ──────────────────────────────
document.querySelectorAll('.form-scale').forEach(scale => {
  const dots = scale.querySelectorAll('.scale-dot');
  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      dots.forEach((d, j) => d.classList.toggle('active', j <= i));
    });
  });
});
