/**
 * NOISED FESTIVAL — ULTRA HIGH-PERFORMANCE 60 FPS CONTROLLER
 * Full Page Floating Neon Fagulhas (Sparks) Canvas Generator
 */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------------------------------
     1. Full Page Floating Thin Sparks (Fagulhas Finas & Compridas) Canvas
     -------------------------------------------------------------------------- */
  const canvas = document.getElementById('sparks-canvas');
  if (canvas) {
    const ctx = canvas.getContext('2d', { alpha: true });
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { passive: true });

    // Strict Festival Palette (NO Yellow!)
    const colors = ['#FF2E9A', '#19D3FF', '#7A2EFF', '#FF2EC8'];
    const sparkCount = Math.min(48, Math.floor(width / 22));

    class Spark {
      constructor() {
        this.reset(true);
      }

      reset(initial = false) {
        this.x = Math.random() * width;
        this.y = initial ? Math.random() * height : height + Math.random() * 40;
        this.length = Math.random() * 14 + 8; // Thin elongated length (8px to 22px)
        this.thickness = Math.random() * 1.0 + 1.0; // Thin width (1.0px to 2.0px)
        this.color = colors[Math.floor(Math.random() * colors.length)];
        this.speedY = Math.random() * 1.2 + 0.5; // Upward drift
        this.speedX = (Math.random() - 0.5) * 0.4;
        this.angle = (Math.random() - 0.5) * 0.3; // Slight tilt
        this.opacity = Math.random() * 0.65 + 0.25;
        this.fadeSpeed = Math.random() * 0.003 + 0.0012;
      }

      update() {
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= this.fadeSpeed;

        if (this.y < -30 || this.opacity <= 0) {
          this.reset(false);
        }
      }

      draw() {
        ctx.save();
        ctx.globalAlpha = Math.max(0, this.opacity);
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);

        ctx.strokeStyle = this.color;
        ctx.lineWidth = this.thickness;
        ctx.lineCap = 'round';

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, -this.length);
        ctx.stroke();

        ctx.restore();
      }
    }

    const sparks = Array.from({ length: sparkCount }, () => new Spark());

    const animateSparks = () => {
      ctx.clearRect(0, 0, width, height);
      sparks.forEach(spark => {
        spark.update();
        spark.draw();
      });
      requestAnimationFrame(animateSparks);
    };

    requestAnimationFrame(animateSparks);
  }


  /* --------------------------------------------------------------------------
     2. Staggered Hero Entrance Sequence
     -------------------------------------------------------------------------- */
  const initHeroSequence = () => {
    const staggeredItems = document.querySelectorAll('.staggered-item');
    const heroBgImg = document.querySelector('.hero-bg-image');
    if (heroBgImg) {
      heroBgImg.style.transform = 'scale(1)';
    }

    staggeredItems.forEach(item => {
      const delay = item.getAttribute('data-delay') || 100;
      setTimeout(() => {
        item.classList.add('loaded');
      }, parseInt(delay, 10));
    });
  };

  requestAnimationFrame(() => {
    setTimeout(initHeroSequence, 100);
  });


  /* --------------------------------------------------------------------------
     3. RAF Throttled Scroll Progress Bar & Header Scroll Effect
     -------------------------------------------------------------------------- */
  const scrollProgressBar = document.getElementById('scroll-progress');
  const siteHeader = document.getElementById('header');

  let ticking = false;

  const updateScrollState = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    if (scrollProgressBar && docHeight > 0) {
      const progress = scrollTop / docHeight;
      scrollProgressBar.style.transform = `scaleX(${Math.min(1, Math.max(0, progress))})`;
    }

    if (siteHeader) {
      if (scrollTop > 40) {
        siteHeader.classList.add('scrolled');
      } else {
        siteHeader.classList.remove('scrolled');
      }
    }
    ticking = false;
  };

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateScrollState);
      ticking = true;
    }
  }, { passive: true });

  updateScrollState();


  /* --------------------------------------------------------------------------
     4. Mobile Navigation Drawer (Hamburger Toggle)
     -------------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const siteNav = document.getElementById('site-nav');
  const navLinks = document.querySelectorAll('.nav-link');

  const toggleMobileNav = () => {
    const isOpen = siteNav.classList.contains('open');
    if (isOpen) {
      siteNav.classList.remove('open');
      hamburgerBtn.classList.remove('active');
      hamburgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    } else {
      siteNav.classList.add('open');
      hamburgerBtn.classList.add('active');
      hamburgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
  };

  if (hamburgerBtn && siteNav) {
    hamburgerBtn.addEventListener('click', toggleMobileNav);

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (siteNav.classList.contains('open')) {
          toggleMobileNav();
        }
      });
    });
  }


  /* --------------------------------------------------------------------------
     5. IntersectionObserver for Scroll Reveals (60 FPS)
     -------------------------------------------------------------------------- */
  const revealElements = document.querySelectorAll('.reveal-on-scroll');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    root: null,
    threshold: 0.08,
    rootMargin: '0px 0px -20px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  /* --------------------------------------------------------------------------
     6. Real-Time Countdown Timer (05/09/2026 19:00)
     -------------------------------------------------------------------------- */
  const targetDate = new Date('2026-09-05T19:00:00-03:00').getTime();

  const daysEl = document.getElementById('count-days');
  const hoursEl = document.getElementById('count-hours');
  const minutesEl = document.getElementById('count-minutes');
  const secondsEl = document.getElementById('count-seconds');

  const formatTwoDigits = (num) => String(num).padStart(2, '0');

  const updateCountdown = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      if (daysEl) daysEl.textContent = '00';
      if (hoursEl) hoursEl.textContent = '00';
      if (minutesEl) minutesEl.textContent = '00';
      if (secondsEl) secondsEl.textContent = '00';
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = formatTwoDigits(days);
    if (hoursEl) hoursEl.textContent = formatTwoDigits(hours);
    if (minutesEl) minutesEl.textContent = formatTwoDigits(minutes);
    if (secondsEl) secondsEl.textContent = formatTwoDigits(seconds);
  };

  setInterval(updateCountdown, 1000);
  updateCountdown();


  /* --------------------------------------------------------------------------
     7. Desktop Custom Neon Cursor (Disabled on Touch Devices)
     -------------------------------------------------------------------------- */
  const cursorDot = document.getElementById('cursor-dot');
  const cursorCircle = document.getElementById('cursor-circle');

  if (cursorDot && cursorCircle && matchMedia('(pointer: fine) and (min-width: 1024px)').matches) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let circleX = mouseX;
    let circleY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }, { passive: true });

    const animateCursor = () => {
      circleX += (mouseX - circleX) * 0.15;
      circleY += (mouseY - circleY) * 0.15;
      cursorCircle.style.transform = `translate3d(${circleX}px, ${circleY}px, 0)`;
      requestAnimationFrame(animateCursor);
    };
    requestAnimationFrame(animateCursor);

    const interactiveEls = document.querySelectorAll('button, a, .artist-card, .ticket-tier-item');
    interactiveEls.forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'), { passive: true });
      el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'), { passive: true });
    });
  }


  /* --------------------------------------------------------------------------
     8. Interactive Ticket Purchasing Modal Manager
     -------------------------------------------------------------------------- */
  const ticketsModal = document.getElementById('tickets-modal');
  const openTicketTriggers = document.querySelectorAll('.open-tickets-trigger');
  const modalCloseBtns = document.querySelectorAll('.modal-close');
  
  const tierItems = document.querySelectorAll('.ticket-tier-item');
  const qtyMinusBtn = document.getElementById('qty-minus');
  const qtyPlusBtn = document.getElementById('qty-plus');
  const qtyValEl = document.getElementById('qty-value');
  const totalPriceEl = document.getElementById('modal-total-price');

  let selectedPrice = 60;
  let currentQty = 1;

  const openTicketsModal = () => {
    if (ticketsModal) {
      ticketsModal.classList.add('active');
      ticketsModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeTicketsModal = () => {
    if (ticketsModal) {
      ticketsModal.classList.remove('active');
      ticketsModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openTicketTriggers.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.tagName === 'A' && btn.hasAttribute('target')) return;
      e.preventDefault();
      openTicketsModal();
    });
  });

  modalCloseBtns.forEach(btn => btn.addEventListener('click', closeTicketsModal));

  if (ticketsModal) {
    ticketsModal.addEventListener('click', (e) => {
      if (e.target === ticketsModal) closeTicketsModal();
    });
  }

  const updateModalTotal = () => {
    const total = selectedPrice * currentQty;
    if (totalPriceEl) {
      totalPriceEl.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
    }
    if (qtyValEl) {
      qtyValEl.textContent = currentQty;
    }
  };

  tierItems.forEach(item => {
    item.addEventListener('click', () => {
      tierItems.forEach(t => t.classList.remove('selected'));
      item.classList.add('selected');
      selectedPrice = parseFloat(item.getAttribute('data-price')) || 60;
      updateModalTotal();
    });
  });

  if (qtyMinusBtn) {
    qtyMinusBtn.addEventListener('click', () => {
      if (currentQty > 1) {
        currentQty--;
        updateModalTotal();
      }
    });
  }

  if (qtyPlusBtn) {
    qtyPlusBtn.addEventListener('click', () => {
      if (currentQty < 10) {
        currentQty++;
        updateModalTotal();
      }
    });
  }


  /* --------------------------------------------------------------------------
     9. Interactive FAQ Modal Manager & Accordion
     -------------------------------------------------------------------------- */
  const faqModal = document.getElementById('faq-modal');
  const openFaqBtns = [document.getElementById('open-faq-btn'), document.getElementById('footer-faq-btn')];

  const openFaqModal = () => {
    if (faqModal) {
      faqModal.classList.add('active');
      faqModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  const closeFaqModal = () => {
    if (faqModal) {
      faqModal.classList.remove('active');
      faqModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  };

  openFaqBtns.forEach(btn => {
    if (btn) btn.addEventListener('click', openFaqModal);
  });

  if (faqModal) {
    const faqCloseBtn = faqModal.querySelector('.modal-close');
    if (faqCloseBtn) faqCloseBtn.addEventListener('click', closeFaqModal);
    
    faqModal.addEventListener('click', (e) => {
      if (e.target === faqModal) closeFaqModal();
    });
  }

  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
          item.classList.add('active');
        }
      });
    }
  });

});
