// GOTHAM BAPTIST CHURCH - SHARED SITE JAVASCRIPT

// Mobile navigation works on every page
const toggle = document.getElementById('menuToggle');
const nav = document.getElementById('navigation');

if (toggle && nav) {
  toggle.setAttribute('aria-expanded', 'false');

  toggle.addEventListener('click', () => {
    const opened = nav.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(opened));
    toggle.textContent = opened ? '×' : '☰';
  });

  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    });
  });
}

// Automatic copyright year on every page
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Homepage carousel - only runs where carousel exists
const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.hero-dot')];
const counter = document.getElementById('heroCurrent');
const hero = document.querySelector('.hero-slider');

if (hero && slides.length && counter) {
  let current = 0;
  let timer;
  let touchStartX = 0;

  function showSlide(index) {
    current = (index + slides.length) % slides.length;

    slides.forEach((slide, i) =>
      slide.classList.toggle('active', i === current)
    );

    dots.forEach((dot, i) =>
      dot.classList.toggle('active', i === current)
    );

    counter.textContent = String(current + 1).padStart(2, '0');
  }

  function startSlider() {
    clearInterval(timer);
    timer = setInterval(() => showSlide(current + 1), 6500);
  }

  const next = document.getElementById('heroNext');
  const prev = document.getElementById('heroPrev');

  if (next) next.addEventListener('click', () => {
    showSlide(current + 1);
    startSlider();
  });

  if (prev) prev.addEventListener('click', () => {
    showSlide(current - 1);
    startSlider();
  });

  dots.forEach((dot, i) => dot.addEventListener('click', () => {
    showSlide(i);
    startSlider();
  }));

  hero.addEventListener('mouseenter', () => clearInterval(timer));
  hero.addEventListener('mouseleave', startSlider);

  hero.addEventListener('touchstart', e => {
    touchStartX = e.changedTouches[0].screenX;
  }, {passive:true});

  hero.addEventListener('touchend', e => {
    const difference = e.changedTouches[0].screenX - touchStartX;
    if (Math.abs(difference) > 55) {
      showSlide(current + (difference < 0 ? 1 : -1));
      startSlider();
    }
  }, {passive:true});

  showSlide(0);
  startSlider();
}
