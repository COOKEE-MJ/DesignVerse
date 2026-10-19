/**
 * DESIGNVERSE — Student Design & Innovation Fest
 * Interactive Client-Side Engine
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initRegistrationForms();
  initModal();
  initFAQ();
  initBackToTop();
  initIdeasPanels();
  initLiveMascot();
});

/* ==========================================================================
   1. NAVBAR & NAVIGATION
   ========================================================================== */
function initNavbar() {
  const header = document.querySelector('.site-header');
  const mobileToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Sticky header blur effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileMenu) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      mobileToggle.classList.toggle('active');
      mobileToggle.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close mobile menu when a nav link is clicked
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        mobileToggle.classList.remove('active');
        mobileToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });
  }

  // Smooth scroll for all anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

/* ==========================================================================
   2. REGISTRATION FORMS & VALIDATION
   ========================================================================== */
function initRegistrationForms() {
  // Support both in-page form and modal form
  const forms = [
    document.getElementById('inpage-reg-form'),
    document.getElementById('modal-reg-form')
  ].filter(Boolean);

  forms.forEach(form => {
    setupFormBehavior(form);
  });
}

function setupFormBehavior(form) {
  // Multi-select Interest Pills
  const pillsContainer = form.querySelector('.interest-pills');
  if (pillsContainer) {
    const pills = pillsContainer.querySelectorAll('.interest-pill');
    pills.forEach(pill => {
      pill.addEventListener('click', () => {
        pill.classList.toggle('active');
        pill.setAttribute('aria-pressed', pill.classList.contains('active'));
        clearFieldError(form.querySelector('#interest-error'));
      });
      // Keyboard support
      pill.addEventListener('keydown', (e) => {
        if (e.key === ' ' || e.key === 'Enter') {
          e.preventDefault();
          pill.click();
        }
      });
    });
  }

  // Form submission
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (validateForm(form)) {
      handleFormSuccess(form);
    }
  });

  // Real-time input clearing
  form.querySelectorAll('.form-input, .form-select').forEach(input => {
    input.addEventListener('input', () => {
      input.classList.remove('error');
      const errEl = form.querySelector(`#${input.id}-error`);
      if (errEl) errEl.classList.remove('visible');
    });
  });
}

function validateForm(form) {
  let isValid = true;

  // Name validation
  const nameInput = form.querySelector('[name="fullname"]');
  const nameError = form.querySelector('#name-error') || form.querySelector(`[data-error-for="${nameInput.id}"]`);
  if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
    showError(nameInput, nameError, 'Please enter your full name (at least 2 letters).');
    isValid = false;
  } else {
    clearError(nameInput, nameError);
  }

  // Email validation
  const emailInput = form.querySelector('[name="email"]');
  const emailError = form.querySelector('#email-error') || form.querySelector(`[data-error-for="${emailInput.id}"]`);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailInput.value.trim()) {
    showError(emailInput, emailError, 'Email address is required.');
    isValid = false;
  } else if (!emailRegex.test(emailInput.value.trim())) {
    showError(emailInput, emailError, 'Please enter a valid email address (e.g. name@college.edu).');
    isValid = false;
  } else {
    clearError(emailInput, emailError);
  }

  // College validation
  const collegeInput = form.querySelector('[name="college"]');
  const collegeError = form.querySelector('#college-error') || form.querySelector(`[data-error-for="${collegeInput.id}"]`);
  if (!collegeInput.value.trim()) {
    showError(collegeInput, collegeError, 'Please enter your college or institution name.');
    isValid = false;
  } else {
    clearError(collegeInput, collegeError);
  }

  // Year validation
  const yearSelect = form.querySelector('[name="year"]');
  const yearError = form.querySelector('#year-error') || form.querySelector(`[data-error-for="${yearSelect.id}"]`);
  if (!yearSelect.value) {
    showError(yearSelect, yearError, 'Please select your current year of study.');
    isValid = false;
  } else {
    clearError(yearSelect, yearError);
  }

  // Interest Pills validation
  const activePills = form.querySelectorAll('.interest-pill.active');
  const interestError = form.querySelector('.interest-error');
  if (activePills.length === 0) {
    if (interestError) {
      interestError.textContent = 'Please select at least one area of interest.';
      interestError.classList.add('visible');
    }
    isValid = false;
  } else {
    if (interestError) interestError.classList.remove('visible');
  }

  return isValid;
}

function showError(input, errorEl, msg) {
  input.classList.add('error');
  if (errorEl) {
    errorEl.textContent = msg;
    errorEl.classList.add('visible');
  }
}

function clearError(input, errorEl) {
  input.classList.remove('error');
  if (errorEl) {
    errorEl.classList.remove('visible');
  }
}

function clearFieldError(errorEl) {
  if (errorEl) errorEl.classList.remove('visible');
}

function handleFormSuccess(form) {
  const container = form.closest('.reg-card') || form.closest('.modal-dialog');
  const nameVal = form.querySelector('[name="fullname"]').value.trim();
  const emailVal = form.querySelector('[name="email"]').value.trim();
  const collegeVal = form.querySelector('[name="college"]').value.trim();

  // Generate speculative pass code
  const randomId = Math.floor(1000 + Math.random() * 9000);
  const ticketCode = `DV26-${randomId}`;

  // Hide form, show success state
  form.style.display = 'none';

  const successView = container.querySelector('.reg-success-view');
  if (successView) {
    // Populate dynamic pass info
    const passCodeEl = successView.querySelector('.pass-code');
    const passNameEl = successView.querySelector('.pass-name');
    const passCollegeEl = successView.querySelector('.pass-college');
    if (passCodeEl) passCodeEl.textContent = ticketCode;
    if (passNameEl) passNameEl.textContent = nameVal;
    if (passCollegeEl) passCollegeEl.textContent = collegeVal;

    successView.classList.add('show');

    // Notify mascot to celebrate confirmed pass
    if (typeof window.celebratePassRegistration === 'function') {
      window.celebratePassRegistration();
    }

    // Reset button
    const resetBtn = successView.querySelector('.btn-reset-form');
    if (resetBtn) {
      resetBtn.onclick = () => {
        form.reset();
        form.querySelectorAll('.interest-pill.active').forEach(p => p.classList.remove('active'));
        successView.classList.remove('show');
        form.style.display = 'block';
      };
    }
  }
}

/* ==========================================================================
   3. REGISTRATION MODAL
   ========================================================================== */
function initModal() {
  const modalOverlay = document.getElementById('registration-modal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close-btn');
  const openButtons = document.querySelectorAll('[data-open-modal="registration"]');

  const openModal = () => {
    modalOverlay.classList.add('open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.body.classList.add('modal-open');
    if (typeof window.onModalStateChange === 'function') {
      window.onModalStateChange(true);
    }
    const firstInput = modalOverlay.querySelector('input');
    if (firstInput) setTimeout(() => firstInput.focus(), 100);
  };

  const closeModal = () => {
    modalOverlay.classList.remove('open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    document.body.classList.remove('modal-open');
    if (typeof window.onModalStateChange === 'function') {
      window.onModalStateChange(false);
    }
  };

  openButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal();
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Click outside to close
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) {
      closeModal();
    }
  });

  // ESC key to close
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('open')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const button = item.querySelector('.faq-button');
    if (!button) return;

    button.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close all other items for clean editorial accordion
      faqItems.forEach(otherItem => {
        if (otherItem !== item) {
          otherItem.classList.remove('active');
          const otherBtn = otherItem.querySelector('.faq-button');
          if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
        }
      });

      // Toggle current
      item.classList.toggle('active', !isActive);
      button.setAttribute('aria-expanded', !isActive);
    });
  });
}

/* ==========================================================================
   5. BACK TO TOP
   ========================================================================== */
function initBackToTop() {
  const backToTopBtn = document.querySelector('.back-to-top-btn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', (e) => {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
}

/* ==========================================================================
   6. IDEAS TAKE SHAPE — SUBTLE PANEL INTERACTIONS
   ========================================================================== */
function initIdeasPanels() {
  const ideaPanels = document.querySelectorAll('.idea-panel');
  if (!ideaPanels.length) return;

  ideaPanels.forEach(panel => {
    panel.addEventListener('mouseenter', () => {
      // Subtle focus indicator without heavy animations
      panel.setAttribute('aria-expanded', 'true');
    });
    panel.addEventListener('mouseleave', () => {
      panel.removeAttribute('aria-expanded');
    });
  });
}

/* ==========================================================================
   7. LIVE MASCOT BUDDY (NOVA) — CONTINUOUS KINEMATIC MOTION ENGINE
   ========================================================================== */
function initLiveMascot() {
  const mascot = document.getElementById('live-mascot');
  const mascotStage = document.getElementById('mascot-stage');
  const avatarWrap = document.getElementById('mascot-avatar-wrap');
  const speechBubble = document.getElementById('mascot-bubble');
  const bubbleText = document.getElementById('mascot-text');
  const bubbleClose = document.getElementById('mascot-bubble-close');
  const toggleBtn = document.getElementById('mascot-toggle-btn');
  const sparkleContainer = document.getElementById('sparkle-container');
  const emoteBubble = document.getElementById('mascot-emote');
  const emoteSymbol = emoteBubble ? emoteBubble.querySelector('.emote-symbol') : null;
  const footstepsContainer = document.getElementById('mascot-footsteps');

  // Pose Layer Elements
  const poses = {
    standing: document.getElementById('pose-standing'),
    thinking: document.getElementById('pose-thinking'),
    cheering: document.getElementById('pose-cheering'),
    sitting: document.getElementById('pose-sitting')
  };

  if (!mascot || !mascotStage || !avatarWrap) return;

  // Curated Concise Jokes & Interactions (Short and punchy)
  const novaJokes = [
    "Espresso your ideas today! ☕🎨",
    "404: Boredom not found! 🎉",
    "Make it pop with sparkles! ✨💃",
    "What if we prototype in 4D? 💡",
    "You've got incredible style! 😎💫",
    "Curiosity changes everything! 🚀",
    "Pure keyframe energy right here! ⚡✨",
    "Spacebar: an astronaut's fave key! 🚀"
  ];

  // --- Dynamic Screen Placement (Prevents blocking content or buttons) ---
  function updateMascotPlacement(preferredSide) {
    if (mascot.classList.contains('minimized')) return;

    if (preferredSide === 'left') {
      mascot.classList.remove('dock-right');
      mascot.classList.add('dock-left');
    } else if (preferredSide === 'right') {
      mascot.classList.remove('dock-left');
      mascot.classList.add('dock-right');
    } else {
      // Automatic collision avoidance based on active viewport elements
      const regModal = document.querySelector('.modal-overlay.open');
      if (regModal) {
        mascot.classList.remove('dock-right');
        mascot.classList.add('dock-left');
        return;
      }

      // Check if user is scrolled to footer / registration where right edge might have prominent buttons
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? scrollY / docHeight : 0;

      // In registration section (around 65% - 85%), move to left to leave registration pass unobstructed
      if (scrollPercent > 0.62 && scrollPercent < 0.88) {
        mascot.classList.remove('dock-right');
        mascot.classList.add('dock-left');
      } else {
        mascot.classList.remove('dock-left');
        mascot.classList.add('dock-right');
      }
    }
  }

  // --- Core Motion State Engine ---
  let currentMotion = 'standing';
  let currentRestingPose = 'standing'; // Natural resting pose is strictly 'standing' or 'sitting'
  let emoteTimeout = null;
  let bubbleTimeout = null;
  let autoRevertTimeout = null;

  const motionConfigs = {
    standing: {
      pose: 'standing',
      defaultMsg: "Exploring with you! ✨",
      emote: '✨'
    },
    waving: {
      pose: 'standing',
      defaultMsg: "Welcome to DesignVerse! 👋",
      emote: '👋'
    },
    thinking: {
      pose: 'thinking',
      defaultMsg: "Great question! Let's examine! 💡",
      emote: '💡'
    },
    sitting: {
      pose: 'sitting',
      defaultMsg: "Cozy break on my holo-ring! 🧘",
      emote: '✨'
    },
    twirling: {
      pose: 'cheering',
      defaultMsg: "Ta-da! Starlight spin! ✨",
      emote: '💖'
    },
    cheering: {
      pose: 'cheering',
      defaultMsg: "Awesome choice! Let's go! 🎉",
      emote: '🎉'
    }
  };

  function setMascotMotion(motionKey, customMsg, customEmote, autoRevertMs) {
    const config = motionConfigs[motionKey] || motionConfigs.standing;
    currentMotion = motionKey;

    // If setting a baseline resting pose, update currentRestingPose
    if (motionKey === 'standing' || motionKey === 'sitting') {
      currentRestingPose = motionKey;
    }

    // Reset all motion classes
    mascotStage.classList.remove(
      'motion-standing',
      'motion-waving',
      'motion-thinking',
      'motion-sitting',
      'motion-twirling',
      'motion-cheering'
    );
    mascotStage.classList.add(`motion-${motionKey}`);

    // Update Multi-Pose Character Layers
    Object.keys(poses).forEach(k => {
      if (poses[k]) {
        poses[k].classList.toggle('active', k === config.pose);
      }
    });

    // Emote Icon Balloon
    const emoteIcon = customEmote || config.emote;
    if (emoteSymbol && emoteBubble && (customEmote || customMsg)) {
      emoteSymbol.textContent = emoteIcon;
      emoteBubble.classList.add('show');
      clearTimeout(emoteTimeout);
      emoteTimeout = setTimeout(() => {
        emoteBubble.classList.remove('show');
      }, 2000);
    }

    // Speech Cloud: ONLY speak if a custom message is intentionally provided
    // (Prevents spamming repetitive dialogue bubbles on automatic state resets)
    if (customMsg) {
      showMessage(customMsg);
    }

    // Auto-Revert smoothly to the current baseline resting pose (standing or sitting)
    clearTimeout(autoRevertTimeout);
    if (autoRevertMs && autoRevertMs > 0) {
      autoRevertTimeout = setTimeout(() => {
        if (currentMotion === motionKey) {
          setMascotMotion(currentRestingPose);
        }
      }, autoRevertMs);
    }
  }

  function showMessage(msg) {
    if (!speechBubble || !bubbleText) return;
    bubbleText.style.opacity = '0';
    setTimeout(() => {
      bubbleText.textContent = msg;
      bubbleText.style.opacity = '1';
    }, 80);

    speechBubble.classList.remove('hidden');

    clearTimeout(bubbleTimeout);
    bubbleTimeout = setTimeout(() => {
      if (!speechBubble.matches(':hover')) {
        speechBubble.classList.add('hidden');
      }
    }, 4200);
  }

  // Initial Welcome Greeting (friendly greeting then gracefully rests in standing pose)
  setTimeout(() => {
    setMascotMotion('waving', "Hi! I'm Nova, your festival buddy! 👋✨", '👋', 3200);
  }, 1000);

  // --- Dynamic Mouse Tracking 3D Tilt ---
  let targetRotX = 0;
  let targetRotY = 0;
  let currentRotX = 0;
  let currentRotY = 0;

  window.addEventListener('mousemove', (e) => {
    if (mascot.classList.contains('minimized')) return;
    const rect = avatarWrap.getBoundingClientRect();
    const mascotCenterX = rect.left + rect.width / 2;
    const mascotCenterY = rect.top + rect.height / 2;

    const deltaX = e.clientX - mascotCenterX;
    const deltaY = e.clientY - mascotCenterY;

    targetRotY = Math.max(-12, Math.min(12, (deltaX / window.innerWidth) * 24));
    targetRotX = Math.max(-8, Math.min(8, -(deltaY / window.innerHeight) * 16));
  });

  function animateTilt() {
    currentRotX += (targetRotX - currentRotX) * 0.1;
    currentRotY += (targetRotY - currentRotY) * 0.1;
    if (!mascot.classList.contains('minimized') && currentMotion !== 'twirling') {
      avatarWrap.style.transform = `perspective(700px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg)`;
    }
    requestAnimationFrame(animateTilt);
  }
  requestAnimationFrame(animateTilt);

  // --- Silent Screen Click Sparkles ---
  document.addEventListener('click', (e) => {
    if (e.target.closest('#live-mascot') || e.target.closest('.modal-overlay')) {
      return;
    }
    createSparkleBurst(e.clientX, e.clientY);
  });

  function createSparkleBurst(x, y) {
    if (!sparkleContainer) return;
    const count = 6;
    const symbols = ['✦', '✨', '★', '✧', '💫'];
    const colors = ['#4353F5', '#FF6855', '#202127', '#DADBD9', '#FFFFFF'];

    for (let i = 0; i < count; i++) {
      const star = document.createElement('span');
      star.className = 'screen-sparkle-star';
      star.textContent = symbols[Math.floor(Math.random() * symbols.length)];
      star.style.color = colors[Math.floor(Math.random() * colors.length)];
      star.style.left = `${x}px`;
      star.style.top = `${y}px`;

      const angle = (i / count) * 2 * Math.PI + (Math.random() * 0.5 - 0.25);
      const distance = 30 + Math.random() * 40;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      star.style.setProperty('--tx', `${tx}px`);
      star.style.setProperty('--ty', `${ty}px`);

      sparkleContainer.appendChild(star);
      setTimeout(() => {
        if (star.parentNode) star.parentNode.removeChild(star);
      }, 850);
    }
  }

  // --- Direct Mascot Click: Interactive Dialogue & Pose Cycle ---
  // Cycles through rich expressions and poses, including sitting gracefully!
  const mascotClickInteractions = [
    { motion: 'sitting', msg: "Taking a cozy seat on my holo-ring! Take your time exploring 🧘✨", emote: '✨', isRest: true },
    { motion: 'cheering', msg: "Pure design energy! You've got this! 🎉🙌", emote: '🎉', duration: 2600 },
    { motion: 'thinking', msg: "What if we prototype tomorrow's ideas today? 💡", emote: '💡', duration: 2500 },
    { motion: 'waving', msg: "Hey there! Having fun exploring DesignVerse? 👋✨", emote: '👋', duration: 2200 },
    { motion: 'twirling', msg: "Starlight spin! Pure keyframe magic! ✨💃", emote: '✨', duration: 1800 }
  ];
  let clickIndex = 0;

  mascotStage.addEventListener('click', (e) => {
    if (e.target.closest('.mascot-toggle-btn')) return;
    e.stopPropagation();

    const rect = avatarWrap.getBoundingClientRect();
    createSparkleBurst(rect.left + rect.width * 0.5, rect.top + rect.height * 0.4);

    const action = mascotClickInteractions[clickIndex % mascotClickInteractions.length];
    clickIndex++;

    if (action.isRest) {
      currentRestingPose = action.motion;
      setMascotMotion(action.motion, action.msg, action.emote);
    } else {
      setMascotMotion(action.motion, action.msg, action.emote, action.duration);
    }
  });

  // --- Intentional Contextual Reactivity (No random glitching) ---

  // 1. Button Clicks: Cheering or thinking in response to intentional user actions
  document.querySelectorAll('button, .btn, .nav-link, .dim-btn').forEach(btn => {
    if (btn.closest('#live-mascot')) return;
    btn.addEventListener('click', () => {
      if (btn.matches('[data-open-modal="registration"]') || btn.classList.contains('footer-reg-btn') || btn.type === 'submit') {
        // High-energy natural cheer for registration actions
        updateMascotPlacement('left');
        setMascotMotion('cheering', "Awesome choice! Let's get your pass! 🎟️🎉", '🎉', 2800);
      } else {
        // Gentle thoughtful reaction
        setMascotMotion('thinking', "Exploring more details! 💡", '💡', 2000);
      }
    });
  });

  // 2. Specific Section Triggers with Debouncing and Cooldown
  // Section IDs match index.html exactly: hero, about, experiences, schedule, register, faq
  const sections = [
    { 
      id: 'hero', 
      motion: 'standing', 
      restingPose: 'standing',
      msg: "Welcome to DesignVerse! Ready to dive in? ✨", 
      emote: '✨', 
      side: 'right' 
    },
    { 
      id: 'about', 
      motion: 'sitting', 
      restingPose: 'sitting',
      msg: "Curiosity and design come together here! 💡", 
      emote: '💡', 
      side: 'right' 
    },
    { 
      id: 'experiences', 
      motion: 'waving', 
      restingPose: 'standing',
      msg: "Hands-on creative labs and sensory pavilions! 🔮", 
      emote: '🔮', 
      side: 'right' 
    },
    { 
      id: 'schedule', 
      motion: 'sitting', 
      restingPose: 'sitting',
      msg: "Doors open 14 Nov at 10:00 AM! Plan ahead ⏰", 
      emote: '⏰', 
      side: 'right' 
    },
    { 
      id: 'register', 
      motion: 'cheering', 
      restingPose: 'standing',
      msg: "Don't miss out! Secure your student pass right here! 🎟️⚡", 
      emote: '🎟️', 
      side: 'left' 
    },
    { 
      id: 'faq', 
      motion: 'sitting', 
      restingPose: 'sitting',
      msg: "Got questions? Everything you need to know is here! ❓", 
      emote: '❓', 
      side: 'right' 
    }
  ];

  let sectionSettleTimeout = null;
  let lastSpokenSectionId = null;
  let lastSpokenTime = 0;
  const SECTION_SPEECH_COOLDOWN = 8000; // 8 seconds cooldown between automatic section dialogues

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.28) {
        const match = sections.find(s => s.id === entry.target.id);
        if (!match) return;

        // Debounce: Only react when user settles on the section for at least 650ms
        // This prevents rapid dialogue swapping during quick scrolling up and down
        clearTimeout(sectionSettleTimeout);
        sectionSettleTimeout = setTimeout(() => {
          updateMascotPlacement(match.side);

          if (match.restingPose) {
            currentRestingPose = match.restingPose;
          }

          const now = Date.now();
          const canSpeak = (match.id !== lastSpokenSectionId) || (now - lastSpokenTime > SECTION_SPEECH_COOLDOWN);

          if (canSpeak) {
            lastSpokenSectionId = match.id;
            lastSpokenTime = now;
            setMascotMotion(match.motion, match.msg, match.emote, 3400);
          } else {
            // Silently transition into the section's resting pose without popping up a dialogue
            if (currentMotion !== currentRestingPose) {
              setMascotMotion(currentRestingPose);
            }
          }
        }, 650);
      }
    });
  }, { threshold: [0.3, 0.6] });

  sections.forEach(s => {
    const el = document.getElementById(s.id);
    if (el) observer.observe(el);
  });

  // 3. Scroll Placement Updates (NO random twitching or dialogue changes on scroll)
  window.addEventListener('scroll', () => {
    updateMascotPlacement();
  }, { passive: true });

  // 4. Registration Screen Visibility & Interactive Field Encouragement
  // Nova stays cleanly docked on the left so she NEVER covers the registration form
  const regInputs = document.querySelectorAll(
    '#inpage-reg-form input, #inpage-reg-form select, #inpage-reg-form .interest-pill, ' +
    '#modal-reg-form input, #modal-reg-form select, #modal-reg-form .interest-pill'
  );
  let lastFieldCheerTime = 0;

  regInputs.forEach(input => {
    const handleFieldInteraction = () => {
      const now = Date.now();
      if (now - lastFieldCheerTime < 9000) return; // 9s cooldown for gentle supportive presence
      lastFieldCheerTime = now;
      updateMascotPlacement('left');
      setMascotMotion('cheering', "Almost there! Don't miss securing your pass! 🎟️✨", '🎟️', 3200);
    };

    input.addEventListener('focus', handleFieldInteraction);
    if (input.classList.contains('interest-pill')) {
      input.addEventListener('click', handleFieldInteraction);
    }
  });

  // 5. Modal State Hooks: Elevate above backdrop and dock safely on the left
  window.onModalStateChange = (isOpen) => {
    if (isOpen) {
      mascot.classList.add('dock-left');
      mascot.classList.remove('dock-right');
      mascot.classList.add('modal-active');
      setMascotMotion('cheering', "Ready to join? Grab your student pass! 🎟️✨", '🎟️', 3200);
    } else {
      mascot.classList.remove('modal-active');
      updateMascotPlacement();
      setMascotMotion(currentRestingPose);
    }
  };

  // 6. Confirmed Pass Celebration
  window.celebratePassRegistration = () => {
    updateMascotPlacement('left');
    setMascotMotion('cheering', "Spot confirmed! See you at DesignVerse! 🎉🥳", '🎉', 4500);
  };

  // Fallback Modal MutationObserver
  const modalEl = document.getElementById('registration-modal');
  if (modalEl) {
    const modalObserver = new MutationObserver(() => {
      const isModalOpen = modalEl.classList.contains('open');
      if (isModalOpen) {
        mascot.classList.add('dock-left');
        mascot.classList.remove('dock-right');
        mascot.classList.add('modal-active');
      } else {
        mascot.classList.remove('modal-active');
        updateMascotPlacement();
      }
    });
    modalObserver.observe(modalEl, { attributes: true, attributeFilter: ['class'] });
  }

  // 7. Close bubble button
  if (bubbleClose) {
    bubbleClose.addEventListener('click', (e) => {
      e.stopPropagation();
      speechBubble.classList.add('hidden');
    });
  }

  // 8. Minimize / Expand toggle
  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      mascot.classList.toggle('minimized');
      const isMini = mascot.classList.contains('minimized');
      toggleBtn.setAttribute('title', isMini ? 'Expand Nova' : 'Minimize Nova');
      if (!isMini) {
        setMascotMotion('waving', "I'm right here! ✨", '👋', 2200);
      }
    });
  }
}

