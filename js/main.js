/**
 * Ravindi Ranthilini - Official E-Portfolio Scripts
 * University of Moratuwa (ITUM) Undergraduate
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     1. Typing Effect in Hero Section
     ========================================================================== */
  const typingText = document.getElementById('typing-text');
  const words = [
    'Intern Software Engineer',
    'Lead UI/UX Designer',
    'Full-Stack Web Developer',
    'IT Undergraduate @ ITUM Moratuwa'
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typeSpeed = 120;

  function type() {
    if (!typingText) return;
    const currentWord = words[wordIndex];

    if (isDeleting) {
      typingText.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typeSpeed = 60;
    } else {
      typingText.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typeSpeed = 110;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typeSpeed = 2200; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % words.length;
      typeSpeed = 400; // Pause before new word
    }

    setTimeout(type, typeSpeed);
  }
  type();

  /* ==========================================================================
     2. Scroll Progress Bar
     ========================================================================== */
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  });

  /* ==========================================================================
     3. Sticky Navbar & Active Section Highlights
     ========================================================================== */
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-links .nav-link');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }

    let currentSection = '';
    const scrollPos = window.pageYOffset + 180;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (currentSection && link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  /* ==========================================================================
     4. Theme Toggle (Dark & Light Mode)
     ========================================================================== */
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const themeIcon = themeToggle?.querySelector('i');

  // Load saved theme or default to dark
  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeToggle?.addEventListener('click', () => {
    const currentTheme = body.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

    body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });

  function updateThemeIcon(theme) {
    if (!themeIcon) return;
    if (theme === 'dark') {
      themeIcon.className = 'fas fa-moon';
      themeToggle.setAttribute('title', 'Switch to light mode');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeToggle.setAttribute('title', 'Switch to dark mode');
    }
  }

  /* ==========================================================================
     5. Mobile Menu Hamburger Toggle
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-toggle');
  const navLinksContainer = document.getElementById('nav-links');

  mobileToggle?.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinksContainer?.classList.toggle('mobile-open');
  });

  // Close mobile menu on link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle?.classList.remove('active');
      navLinksContainer?.classList.remove('mobile-open');
    });
  });

  // Close mobile menu on click outside
  document.addEventListener('click', (e) => {
    if (!navbar?.contains(e.target)) {
      mobileToggle?.classList.remove('active');
      navLinksContainer?.classList.remove('mobile-open');
    }
  });

  /* ==========================================================================
     6. Skills Category Filtering
     ========================================================================== */
  const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
  const skillItems = document.querySelectorAll('.skill-item');

  skillTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillTabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      skillItems.forEach(item => {
        const itemCategories = item.getAttribute('data-category') || '';
        if (filterValue === 'all' || itemCategories.split(' ').includes(filterValue)) {
          item.style.display = 'flex';
          item.style.opacity = '0';
          item.style.transform = 'translateY(15px)';
          setTimeout(() => {
            item.style.transition = 'all 0.35s ease';
            item.style.opacity = '1';
            item.style.transform = 'translateY(0)';
          }, 30);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });

  /* ==========================================================================
     7. Resume Options Modal Handling
     ========================================================================== */
  const cvModal = document.getElementById('cv-modal');
  const openCvBtnNav = document.getElementById('open-cv-modal-btn');
  const openCvTriggers = document.querySelectorAll('.open-cv-trigger');
  const closeCvBtn = document.getElementById('close-cv-modal');

  function openModal() {
    cvModal?.classList.add('open');
    cvModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    cvModal?.classList.remove('open');
    cvModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  openCvBtnNav?.addEventListener('click', openModal);
  openCvTriggers.forEach(btn => btn.addEventListener('click', openModal));
  closeCvBtn?.addEventListener('click', closeModal);

  cvModal?.addEventListener('click', (e) => {
    if (e.target === cvModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && cvModal?.classList.contains('open')) {
      closeModal();
    }
  });

  /* ==========================================================================
     8. Scroll Reveal Animations with IntersectionObserver
     ========================================================================== */
  const reveals = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          obs.unobserve(entry.target);
        }
      });
    }, {
      root: null,
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    reveals.forEach(el => observer.observe(el));
  } else {
    // Fallback for older browsers
    const revealFallback = () => {
      const windowHeight = window.innerHeight;
      reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        if (top < windowHeight - 60) {
          el.classList.add('active');
        }
      });
    };
    window.addEventListener('scroll', revealFallback);
    revealFallback();
  }

  /* ==========================================================================
     9. Interactive Contact Form with Validation & Feedback
     ========================================================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('form-toast');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name')?.value.trim();
    const email = contactForm.querySelector('#email')?.value.trim();
    const subject = contactForm.querySelector('#subject')?.value.trim();
    const message = contactForm.querySelector('#message')?.value.trim();
    const submitBtn = document.getElementById('form-submit-btn');

    if (!name || !email || !subject || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showToast('Please enter a valid email address.', 'error');
      return;
    }

    // Button loading state
    const originalBtnHtml = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> <span>Sending message...</span>';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="fas fa-check"></i> <span>Message Sent!</span>';
      submitBtn.style.background = 'var(--accent-emerald)';

      showToast(`Thank you, ${name}! Your message has been sent successfully. I will get back to you soon at ${email}.`, 'success');
      contactForm.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalBtnHtml;
        submitBtn.style.background = '';
      }, 4000);
    }, 1200);
  });

  function showToast(msg, type) {
    if (!toast) return;
    toast.textContent = msg;
    toast.className = `form-toast ${type}`;
    toast.style.display = 'block';

    setTimeout(() => {
      toast.style.display = 'none';
    }, 6000);
  }

});
