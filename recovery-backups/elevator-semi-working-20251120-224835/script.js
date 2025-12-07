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
    this.currentFloorEl = document.getElementById('currentFloor');
  }

  init() {
    this.setupEventListeners();
    this.setupIntersectionObserver();
    // show tutorial if present
    if (this.tutorialModal) this.openTutorial();
    // set aria labels for floor buttons
    this.buttons.forEach(b => {
      const label = b.querySelector('.floor-label') ? b.querySelector('.floor-label').textContent : `Floor ${b.dataset.floor}`;
      b.setAttribute('aria-label', `Go to ${label}`);
    });
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
    const target = document.querySelector(`[data-floor="${floorNumber}"]`);
    if (!target) return;
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // focus first heading for accessibility after short delay
    setTimeout(() => {
      const h = target.querySelector('h1, h2');
      if (h) h.setAttribute('tabindex', '-1'), h.focus({ preventScroll: true });
    }, 400);
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

    // update UI
    this.currentFloorEl && (this.currentFloorEl.textContent = String(floorNumber));
    this.buttons.forEach(b => b.classList.toggle('active', Number(b.dataset.floor) === floorNumber));

    // mark floor DOM elements
    this.floors.forEach(f => f.classList.toggle('active', Number(f.dataset.floor) === floorNumber));

    // Update Backgrounds
    const bgId = `bg-${floorNumber}`;
    document.querySelectorAll('.bg-layer').forEach(bg => {
      if (bg.id === bgId) {
        bg.classList.add('active');
      } else {
        bg.classList.remove('active');
      }
    });
  }

  openTutorial() {
    if (!this.tutorialModal) return;
    this.tutorialModal.classList.remove('hidden');
    // trap focus to the modal start button for now
    const start = this.tutorialStart || this.tutorialClose;
    start && start.focus();
  }

  closeTutorial() {
    if (!this.tutorialModal) return;
    this.tutorialModal.classList.add('hidden');

    // Immediate activation to prevent flicker/hidden state
    this.currentFloor = 1;
    this.setActiveFloor(1, true);

    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Ensure focus after transition
    setTimeout(() => {
      const first = document.querySelector('[data-floor="1"] h1, [data-floor="1"] h2');
      if (first) {
        first.setAttribute('tabindex', '-1');
        first.focus({ preventScroll: true });
      }
    }, 500);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const app = new ElevatorPortfolio();
  app.init();
});
