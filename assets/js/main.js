// Nav: solid background after scrolling, mobile menu toggle
const nav = document.querySelector('.nav');
const menu = document.getElementById('menu');
const links = document.getElementById('links');

const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 20);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

menu.addEventListener('click', () => {
  const open = links.classList.toggle('open');
  menu.setAttribute('aria-expanded', open);
});
links.addEventListener('click', (e) => {
  if (e.target.closest('a')) {
    links.classList.remove('open');
    menu.setAttribute('aria-expanded', 'false');
  }
});

// Fade sections in as they scroll into view
const io = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      io.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 4) * 70}ms`;
  io.observe(el);
});

// Glow that follows the cursor on service cards
document.querySelectorAll('.card').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    card.style.setProperty('--mx', `${e.clientX - r.left}px`);
    card.style.setProperty('--my', `${e.clientY - r.top}px`);
  });
});

// Gallery: open a photo bigger
const lightbox = document.getElementById('lightbox');
const lbImg = lightbox.querySelector('img');
const lbCap = lightbox.querySelector('.lb-cap');
document.querySelectorAll('.shot button').forEach((btn) => {
  btn.addEventListener('click', () => {
    const img = btn.querySelector('img');
    lbImg.src = img.src;
    lbImg.alt = img.alt;
    lbCap.textContent = btn.closest('.shot').querySelector('strong').textContent;
    lightbox.showModal();
  });
});
lightbox.querySelector('.lb-close').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) lightbox.close(); });

// Quote form: open WhatsApp with the message filled in
const form = document.getElementById('quote-form');
const error = document.getElementById('form-error');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(form));
  if (!data.name.trim()) {
    error.textContent = 'Please enter your name.';
    form.elements.name.focus();
    return;
  }
  error.textContent = '';
  const fields = [
    ['Name', data.name],
    ['Phone', data.phone],
    ['Service', data.service],
    ['Area', data.area],
    ['Details', data.details],
  ].filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`);
  const message = ['Hello Kalix Aluminium, I would like a quote.', '', ...fields].join('\n');
  const text = encodeURIComponent(message);
  window.open(`https://wa.me/263772544246?text=${text}`, '_blank', 'noopener');
});

document.getElementById('year').textContent = new Date().getFullYear();
