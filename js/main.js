/**
 * Ravindi Ranthilini - Official E-Portfolio
 * Institute of Technology, University of Moratuwa (ITUM)
 */

document.addEventListener('DOMContentLoaded', () => {

  // 1. Scroll Progress Bar
  const scrollProgress = document.getElementById('scroll-progress');
  window.addEventListener('scroll', () => {
    if (scrollProgress) {
      const winScroll = document.documentElement.scrollTop || document.body.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      scrollProgress.style.width = scrolled + '%';
    }
  });

  // 2. Sticky Navbar and Active Link Spy
  const header = document.querySelector('.site-header');
  const navItems = document.querySelectorAll('.nav-item');
  const sections = document.querySelectorAll('section');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }

    let current = '';
    const scrollPos = window.pageYOffset + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navItems.forEach(item => {
      item.classList.remove('active');
      if (current && item.getAttribute('href') === `#${current}`) {
        item.classList.add('active');
      }
    });
  });

  // 3. Theme Toggle (Dark & Light Mode)
  const themeSwitch = document.getElementById('theme-switch');
  const body = document.body;
  const themeIcon = themeSwitch?.querySelector('i');

  const savedTheme = localStorage.getItem('theme') || 'dark';
  body.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeSwitch?.addEventListener('click', () => {
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
      themeSwitch.setAttribute('title', 'Switch to light theme');
    } else {
      themeIcon.className = 'fas fa-sun';
      themeSwitch.setAttribute('title', 'Switch to dark theme');
    }
  }

  // 4. Mobile Navigation Menu Toggle
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('open');
  });

  navItems.forEach(link => {
    link.addEventListener('click', () => {
      navMenu?.classList.remove('open');
    });
  });

  document.addEventListener('click', (e) => {
    if (!header?.contains(e.target)) {
      navMenu?.classList.remove('open');
    }
  });

  // 5. Resume Options Modal
  const resumeModal = document.getElementById('resume-modal');
  const cvModalOpenBtn = document.getElementById('cv-modal-open-btn');
  const openCvTriggers = document.querySelectorAll('.open-cv-trigger');
  const resumeModalClose = document.getElementById('resume-modal-close');

  function openModal() {
    resumeModal?.classList.add('active');
    resumeModal?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    resumeModal?.classList.remove('active');
    resumeModal?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  cvModalOpenBtn?.addEventListener('click', openModal);
  openCvTriggers.forEach(btn => btn.addEventListener('click', openModal));
  resumeModalClose?.addEventListener('click', closeModal);

  resumeModal?.addEventListener('click', (e) => {
    if (e.target === resumeModal) {
      closeModal();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && resumeModal?.classList.contains('active')) {
      closeModal();
    }
  });

  // 6. Contact Form Validation and Submission
  const contactForm = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const sendBtn = document.getElementById('send-btn');

  contactForm?.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = contactForm.querySelector('#name')?.value.trim();
    const email = contactForm.querySelector('#email')?.value.trim();
    const subject = contactForm.querySelector('#subject')?.value.trim();
    const message = contactForm.querySelector('#message')?.value.trim();

    if (!name || !email || !subject || !message) {
      showFeedback('Please fill out all required fields.', 'error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      showFeedback('Please provide a valid email address.', 'error');
      return;
    }

    const originalBtnContent = sendBtn.innerHTML;
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

    setTimeout(() => {
      sendBtn.disabled = false;
      sendBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
      sendBtn.style.backgroundColor = 'var(--accent-green)';

      showFeedback(`Thank you, ${name}! Your message was sent successfully. I will get back to you soon.`, 'success');
      contactForm.reset();

      setTimeout(() => {
        sendBtn.innerHTML = originalBtnContent;
        sendBtn.style.backgroundColor = '';
      }, 4000);
    }, 1200);
  });

  function showFeedback(msg, type) {
    if (!feedback) return;
    feedback.textContent = msg;
    feedback.className = `form-feedback ${type}`;
    feedback.style.display = 'block';

    setTimeout(() => {
      feedback.style.display = 'none';
    }, 6000);
  }

});
