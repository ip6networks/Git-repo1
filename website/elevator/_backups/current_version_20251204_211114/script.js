// Minimal restoration script for the Cyberpunk Elevator site
'use strict';

class ElevatorPortfolio {
  constructor() {
    this.floors = Array.from(document.querySelectorAll('.floor'));
    this.buttons = Array.from(document.querySelectorAll('.floor-btn'));
    this.currentFloor = 1;
    this.observer = null;
    this.tutorialModal = document.getElementById('tutorialModal');
    this.tutorialSkip = document.getElementById('tutorialSkip');
    this.loadingBar = document.getElementById('loadingBar');
    this.currentFloorEl = document.getElementById('currentFloor');
    this.loadingDuration = 5000; // 5 seconds
    this.loadingInterval = null;
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
      const x = (e.clientX / window.innerWidth - 0.5) * 20;
      const y = (e.clientY / window.innerHeight - 0.5) * 20;

      const activeBg = document.querySelector('.bg-layer.active');
      if (activeBg) {
        activeBg.style.transform = `translate(${-x}px, ${-y}px) scale(1.05)`;
      }

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
      overlay.querySelectorAll('.transition-effect').forEach(el => el.classList.remove('active'));
      effectEl.classList.add('active');
      setTimeout(() => {
        effectEl.classList.remove('active');
      }, 1500);
    }
  }

  setupEventListeners() {
    // Floor buttons
    this.buttons.forEach(btn => btn.addEventListener('click', (e) => this.onFloorButtonClick(e)));

    // Sound toggle
    const soundToggle = document.getElementById('soundToggle');
    if (soundToggle) {
      soundToggle.addEventListener('click', () => {
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

    // Tutorial skip button
    if (this.tutorialSkip) {
      this.tutorialSkip.addEventListener('click', () => this.closeTutorial());
    }

    // Escape key to close tutorial
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

    // Trigger transition first
    this.triggerTransition(floorNumber);

    // Delay scroll to let transition overlay appear
    setTimeout(() => {
      const shaft = document.getElementById('shaft');
      if (shaft) {
        let targetTop = 0;
        let currentElement = target;
        while (currentElement && currentElement !== shaft) {
          targetTop += currentElement.offsetTop;
          currentElement = currentElement.offsetParent;
        }
        shaft.scrollTo({ top: targetTop, behavior: 'smooth' });
      }
    }, 300);

    // Focus heading for accessibility
    setTimeout(() => {
      const h = target.querySelector('h1, h2');
      if (h) {
        h.setAttribute('tabindex', '-1');
        h.focus({ preventScroll: true });
      }
    }, 800);
  }

  setupIntersectionObserver() {
    const rootEl = document.getElementById('shaft') || null;
    const options = { root: rootEl, rootMargin: '0px', threshold: [0.35, 0.6, 0.9] };
    this.observer = new IntersectionObserver((entries) => {
      let best = null;
      for (const entry of entries) {
        if (!best || entry.intersectionRatio > best.intersectionRatio) best = entry;
      }
      if (best && best.isIntersecting) {
        const floor = Number(best.target.dataset.floor) || 1;
        if (this.currentFloor !== floor) {
          this.setActiveFloor(floor);
        }
      }
    }, options);

    this.floors.forEach(f => this.observer.observe(f));
    this.setActiveFloor(this.currentFloor, true);
  }

  setActiveFloor(floorNumber, force = false) {
    if (!force && this.currentFloor === floorNumber) return;
    this.currentFloor = floorNumber;

    const years = { 1: '1920', 2: '1960', 3: '1980', 4: '2000', 5: '2100' };

    // Update UI
    if (this.currentFloorEl) this.currentFloorEl.textContent = years[floorNumber] || '????';
    this.buttons.forEach(b => b.classList.toggle('active', Number(b.dataset.floor) === floorNumber));
    this.floors.forEach(f => f.classList.toggle('active', Number(f.dataset.floor) === floorNumber));

    // Update Backgrounds
    const bgId = `bg-${floorNumber}`;
    document.querySelectorAll('.bg-layer').forEach(bg => {
      if (bg.id === bgId) {
        bg.classList.add('active');
        bg.style.transform = 'scale(1.05)';
      } else {
        bg.classList.remove('active');
      }
    });

    // Update theme colors
    const colors = { 1: '#D4AF37', 2: '#FF00CC', 3: '#00FFFF', 4: '#87CEEB', 5: '#E0F7FA' };
    document.documentElement.style.setProperty('--neon-cyan', colors[floorNumber] || '#ffffff');

    // Update panel theme
    const panel = document.querySelector('.elevator-panel');
    if (panel) {
      panel.classList.remove('panel-1920s', 'panel-1960s', 'panel-1980s', 'panel-2000s', 'panel-2100s');
      if (years[floorNumber]) panel.classList.add(`panel-${years[floorNumber]}s`);
    }
  }

  openTutorial() {
    if (!this.tutorialModal) return;
    this.tutorialModal.classList.remove('hidden');
    this.setActiveFloor(1, true);

    const shaft = document.getElementById('shaft');
    if (shaft) shaft.scrollTo({ top: 0, behavior: 'smooth' });

    // Animate loading bar and auto-dismiss
    if (this.loadingBar) {
      let progress = 0;
      const interval = 50;
      const increment = (interval / this.loadingDuration) * 100;

      this.loadingInterval = setInterval(() => {
        progress += increment;
        this.loadingBar.style.width = `${Math.min(progress, 100)}%`;

        if (progress >= 100) {
          clearInterval(this.loadingInterval);
          setTimeout(() => this.closeTutorial(), 200);
        }
      }, interval);
    }
  }

  closeTutorial() {
    if (!this.tutorialModal) return;
    if (this.loadingInterval) clearInterval(this.loadingInterval);
    this.tutorialModal.classList.add('hidden');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  window.app = new ElevatorPortfolio();
  window.app.init();
});
