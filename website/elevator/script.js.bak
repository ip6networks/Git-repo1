// Minimal restoration script for the Cyberpunk Elevator site
'use strict';

class ElevatorPortfolio {
  constructor() {
    this.floors = Array.from(document.querySelectorAll('.floor'));
    this.buttons = Array.from(document.querySelectorAll('.floor-btn'));
    this.currentFloor = 1;
    this.observer = null;
    this.tutorialModal = document.getElementById('tutorialModal');
    this.tutorialClose = document.getElementById('tutorialClose');
    this.tutorialStart = document.getElementById('tutorialStart');
    this.tutorialSkip = document.getElementById('tutorialSkip');
    this.tutorialProgressBar = document.getElementById('tutorialProgressBar');
    this.currentFloorEl = document.getElementById('currentFloor');
    this.tutorialTimer = null;
    this.tutorialDuration = 10000; // 10 seconds
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    this.setupParallax();
    // show tutorial if present
    if (this.tutorialModal) this.openTutorial();
    // set aria labels for floor buttons
    this.buttons.forEach(b => {
      const label = b.querySelector('.floor-label') ? b.querySelector('.floor-label').textContent : `Floor ${b.dataset.floor}`;
      b.setAttribute('aria-label', `Go to ${label}`);
    });
  }

  setupParallax() {
    document.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 20; // -10 to 10
      const y = (e.clientY / window.innerHeight - 0.5) * 20; // -10 to 10

      // Apply to active background layer
      const activeBg = document.querySelector('.bg-layer.active');
      if (activeBg) {
        activeBg.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
      }

      // Apply parallax to particles (if any)
      const particles = activeBg ? activeBg.querySelectorAll('.particle') : [];
      particles.forEach((p, index) => {
        const factor = (index + 1) * 2;
        p.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
      });
    });
  }

  triggerTransition(floorNumber) {
    const overlay = document.getElementById('transitionOverlay');
    if (!overlay) return;

    const effects = {
      1: 'effect-gate',
      2: 'effect-kaleidoscope',
      3: 'effect-vhs',
      4: 'effect-window',
      5: 'effect-blur'
    };

    const effectClass = effects[floorNumber];
    const effectEl = overlay.querySelector(`.${effectClass}`);

    if (effectEl) {
      // Reset all effects
      overlay.querySelectorAll('.transition-effect').forEach(el => el.classList.remove('active'));

      // Trigger new effect
      effectEl.classList.add('active');

      // Remove after animation
      setTimeout(() => {
        effectEl.classList.remove('active');
      }, 1500);
    }
  }

  setupEventListeners() {
    // Floor buttons: smooth scroll
    this.buttons.forEach(btn => btn.addEventListener('click', (e) => this.onFloorButtonClick(e)));

    // sound toggle
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', (e) => {
        const pressed = soundToggle.getAttribute('aria-pressed') === 'true';
        soundToggle.setAttribute('aria-pressed', String(!pressed));
        soundToggle.classList.toggle('muted', !pressed);
      });
    }

    // Keyboard navigation
    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') this.goToFloor(Math.min(this.currentFloor + 1, this.floors.length));
      if (e.key === 'ArrowUp' || e.key === 'PageUp') this.goToFloor(Math.max(this.currentFloor - 1, 1));
    });

    // Tutorial modal
    if (this.tutorialClose) this.tutorialClose.addEventListener('click', () => this.closeTutorial());
    if (this.tutorialStart) this.tutorialStart.addEventListener('click', () => this.closeTutorial());
    if (this.tutorialSkip) this.tutorialSkip.addEventListener('click', () => this.closeTutorial());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.tutorialModal && !this.tutorialModal.classList.contains('hidden')) {
        this.closeTutorial();
      }
    });
  }

  onFloorButtonClick(e) {
    const btn = e.currentTarget;
    const f = Number(btn.dataset.floor) || 1;
    this.goToFloor(f);
  }

  goToFloor(floorNumber) {
    const target = this.floors.find(f => Number(f.dataset.floor) === floorNumber);
    if (!target) return;

    // Get the shaft container (the actual scroll container)
    const shaft = document.getElementById('shaft');
    if (shaft) {
      // Calculate offset relative to the shaft's scrolling context
      let targetTop = 0;
      let currentElement = target;
      while (currentElement && currentElement !== shaft) {
        targetTop += currentElement.offsetTop;
        currentElement = currentElement.offsetParent;
      }

      // Use custom smooth scroll with easing for better control
      this.smoothScrollTo(shaft, targetTop, 1200);
    }

    // focus first heading for accessibility after transition completes
    setTimeout(() => {
      const h = target.querySelector('h1, h2');
      if (h) h.setAttribute('tabindex', '-1'), h.focus({ preventScroll: true });
    }, 1200);
  }

  // Custom smooth scroll with easeInOutCubic for buttery smooth transitions
  smoothScrollTo(element, targetPosition, duration) {
    const startPosition = element.scrollTop;
    const distance = targetPosition - startPosition;
    let startTime = null;

    // easeInOutCubic easing function
    const easeInOutCubic = (t) => {
      return t < 0.5
        ? 4 * t * t * t
        : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);

      const easedProgress = easeInOutCubic(progress);
      element.scrollTop = startPosition + (distance * easedProgress);

      if (progress < 1) {
        requestAnimationFrame(animation);
      }
    };

    requestAnimationFrame(animation);
  }

  setupIntersectionObserver() {
    const rootEl = document.getElementById('shaft') || null;
    const options = { root: rootEl, rootMargin: '0px', threshold: [0.35, 0.6, 0.9] };
    this.observer = new IntersectionObserver((entries) => {
      // pick the entry with largest intersectionRatio that is >= 0.35
      let best = null;
      for (const entry of entries) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
      if (best && best.isIntersecting) {
        const floor = Number(best.target.dataset.floor) || 1;
        this.setActiveFloor(floor);
      }
    }, options);

    this.floors.forEach(f => this.observer.observe(f));
    // ensure initial active floor is set (force DOM updates)
    this.setActiveFloor(this.currentFloor, true);
  }

  setActiveFloor(floorNumber, force = false) {
    if (!force && this.currentFloor === floorNumber) return;
    this.currentFloor = floorNumber;

    // Map floors to years
    const years = {
      1: '1920',
      2: '1960',
      3: '1980',
      4: '2000',
      5: '2100'
    };

    // update UI
    this.currentFloorEl && (this.currentFloorEl.textContent = years[floorNumber] || '????');
    this.buttons.forEach(b => b.classList.toggle('active', Number(b.dataset.floor) === floorNumber));

    // mark floor DOM elements
    this.floors.forEach(f => f.classList.toggle('active', Number(f.dataset.floor) === floorNumber));

    // Update Backgrounds
    const bgId = `bg-${floorNumber}`;
    document.querySelectorAll('.bg-layer').forEach(bg => {
      bg.classList.toggle('active', bg.id === bgId);
    });

    // Trigger Transition Effect (skip on initial load/force)
    if (!force) {
      this.triggerTransition(floorNumber);
    }

    // Update UI Theme Colors (Optional dynamic overrides)
    const colors = {
      1: '#D4AF37', // 1920s Gold
      2: '#FF00CC', // 1960s Pink
      3: '#00FFFF', // 1980s Cyan
      4: '#87CEEB', // 2000s Blue
      5: '#E0F7FA'  // 2100s Glow
    };
    const color = colors[floorNumber] || '#ffffff';
    document.documentElement.style.setProperty('--neon-cyan', color);

    // Update Panel Theme Class
    const panel = document.querySelector('.elevator-panel');
    if (panel) {
      panel.classList.remove('panel-1920s', 'panel-1960s', 'panel-1980s', 'panel-2000s', 'panel-2100s');
      const eraYear = years[floorNumber];
      if (eraYear) {
        panel.classList.add(`panel-${eraYear}s`);
      }
    }
  }

  openTutorial() {
    if (!this.tutorialModal) return;
    this.tutorialModal.classList.remove('hidden');
    this.tutorialModal.style.display = 'flex';

    // trap focus to the modal start button for now
    const start = this.tutorialStart || this.tutorialClose;
    this.setActiveFloor(1, true);

    // Scroll shaft to top
    const shaft = document.getElementById('shaft');
    if (shaft) {
      shaft.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Start progress bar animation and auto-dismiss timer
    this.startTutorialTimer();
  }

  startTutorialTimer() {
    // Clear any existing timer
    if (this.tutorialTimer) {
      clearInterval(this.tutorialTimer);
    }

    const startTime = Date.now();
    const duration = this.tutorialDuration;

    // Update progress bar every 50ms
    this.tutorialTimer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min((elapsed / duration) * 100, 100);

      if (this.tutorialProgressBar) {
        this.tutorialProgressBar.style.width = `${progress}%`;
      }

      // Auto-dismiss after duration
      if (elapsed >= duration) {
        this.closeTutorial();
      }
    }, 50);
  }

  closeTutorial() {
    if (!this.tutorialModal) return;

    // Clear the auto-dismiss timer
    if (this.tutorialTimer) {
      clearInterval(this.tutorialTimer);
      this.tutorialTimer = null;
    }

    // Reset progress bar
    if (this.tutorialProgressBar) {
      this.tutorialProgressBar.style.width = '0%';
    }

    this.tutorialModal.classList.add('hidden');
    this.tutorialModal.style.display = 'none';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new ElevatorPortfolio();
  window.app.init();
});

