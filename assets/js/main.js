document.addEventListener("DOMContentLoaded", () => {
  /* PRELOADER */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    document.body.classList.add("loaded");
    setTimeout(()=> { if(preloader) preloader.style.display = 'none'; }, 600);
  });

  /* NAVBAR SCROLL EFFECT */
  const navbar = document.getElementById("mainNavbar");
  function adjustNavbar() {
    if(window.scrollY > 50) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
  }
  adjustNavbar();
  window.addEventListener('scroll', adjustNavbar);

  /* ACTIVE NAV LINK */
  const navLinks = document.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    const linkPage = link.getAttribute('href');
    if(linkPage && (linkPage === window.location.pathname.split('/').pop() || (linkPage.startsWith('#') && location.hash === linkPage))) {
      link.classList.add('active');
    }
  });

  /* INTERSECTION OBSERVER: animate on scroll */
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {threshold:0.12});
  document.querySelectorAll('.animate-on-scroll, .animate-hero').forEach(el => observer.observe(el));

  /* PARALLAX for images */
  const parallaxImages = document.querySelectorAll('.parallax-image');
  function applyParallax(){
    const top = window.scrollY, h = window.innerHeight;
    parallaxImages.forEach(img => {
      const rect = img.getBoundingClientRect();
      const elementMid = rect.top + rect.height/2;
      const progress = (h/2 - elementMid) / (h/2);
      img.style.transform = `translateY(${progress * 12}px)`;
    });
  }
  window.addEventListener('scroll', applyParallax);
  applyParallax();

  /* DYNAMIC YEAR */
  const yearSpan = document.getElementById('current-year');
  if(yearSpan) yearSpan.textContent = new Date().getFullYear();

  /* BOOTSTRAP CAROUSELS */
  const productCarouselEl = document.querySelector("#productCarousel");
  if(productCarouselEl) new bootstrap.Carousel(productCarouselEl, {interval:5000});
  const testimonialCarouselEl = document.querySelector("#testimonialCarousel");
  if(testimonialCarouselEl) new bootstrap.Carousel(testimonialCarouselEl, {interval:6000});

  /* PRODUCT MODAL WIRING */
  const modalEl = document.getElementById('productModal');
  const productModal = new bootstrap.Modal(modalEl);
  document.querySelectorAll('.product-card-glass .view-product').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.product-card-glass');
      if(!card) return;
      const data = card.dataset.product ? JSON.parse(card.dataset.product) : {};
      document.getElementById('productModalTitle').textContent = data.title || 'Product';
      document.getElementById('productModalDesc').textContent = data.desc || '';
      const img = card.querySelector('.card-img-top');
      document.getElementById('productModalImage').src = img ? img.src : 'https://images.unsplash.com/photo-1516253593875-bd7c038363a0?q=80&w=1600';
      productModal.show();
    });
  });

  /* HERO PARTICLES (lightweight) */
  const canvas = document.getElementById('hero-particles');
  if(canvas){
    const ctx = canvas.getContext('2d');
    let w, h, particles=[];
    function resize(){ w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight; }
    function initParticles(){
      particles = [];
      for(let i=0;i<40;i++){
        particles.push({
          x: Math.random()*w,
          y: Math.random()*h,
          r: 0.6 + Math.random()*2.2,
          vx: (Math.random()-0.5)*0.15,
          vy: -0.15 - Math.random()*0.25,
          alpha: 0.06 + Math.random()*0.2
        });
      }
    }
    function step(){
      ctx.clearRect(0,0,w,h);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if(p.y < -10) { p.y = h + 10; p.x = Math.random()*w; }
        ctx.beginPath();
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`;
        ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
        ctx.fill();
      });
      requestAnimationFrame(step);
    }
    function start(){ resize(); initParticles(); step(); }
    window.addEventListener('resize', ()=>{ resize(); });
    start();
  }

  /* SMOOTH SCROLL for anchor links */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth',block:'start'}); }
    });
  });

});
