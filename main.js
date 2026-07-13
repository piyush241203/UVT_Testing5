document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initDynamicClock();
  initCountdown();
  initCounter();
  initTestimonial();
  initRequestMetadata();
  initCanvasAnimation();
  initMockFetch();
  initToast();
  initSkeletonLoader();
});

// Mobile menu toggle
function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const menu = document.querySelector('.nav-menu');
  if (toggle && menu) {
    toggle.addEventListener('click', () => {
      menu.classList.toggle('open');
    });
  }
}

// Live clock & Date
function initDynamicClock() {
  const clockEl = document.getElementById('live-clock');
  const dateEl = document.getElementById('live-date');
  
  const update = () => {
    const now = new Date();
    if (clockEl) clockEl.textContent = now.toLocaleTimeString();
    if (dateEl) dateEl.textContent = now.toLocaleDateString(undefined, {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
    });
  };
  update();
  setInterval(update, 1000);
}

// Countdown timer
function initCountdown() {
  const countdownEl = document.getElementById('countdown-timer');
  if (!countdownEl) return;
  
  let target = new Date();
  target.setHours(target.getHours() + 2); // 2 hours countdown
  
  const update = () => {
    const now = new Date();
    const diff = target.getTime() - now.getTime();
    if (diff <= 0) {
      countdownEl.textContent = 'Event Started!';
      return;
    }
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);
    countdownEl.textContent = `${hours}h ${minutes}m ${seconds}s`;
  };
  update();
  setInterval(update, 1000);
}

// Animated Counter
function initCounter() {
  const counterEl = document.getElementById('animated-counter');
  if (!counterEl) return;
  
  let count = 0;
  setInterval(() => {
    count += Math.floor(Math.random() * 5) + 1;
    counterEl.textContent = count.toLocaleString();
  }, 1500);
}

// Testimonials & Avatars (Generates a dynamic name/avatar seed)
function initTestimonial() {
  const nameEl = document.getElementById('testimonial-name');
  const textEl = document.getElementById('testimonial-text');
  const avatarEl = document.getElementById('testimonial-avatar');
  
  if (!nameEl || !textEl || !avatarEl) return;
  
  const testimonials = [
    { name: 'Sarah Jenkins', role: 'CTO, CloudTech', text: 'This visual regression tool completely changed our release cycles!' },
    { name: 'David Miller', role: 'Lead Architect', text: 'Stunning stabilization. We no longer fight flaky clocks!' },
    { name: 'Elena Rostova', role: 'Frontend Engineer', text: 'Zero configuration meant we were up and running in under five minutes.' }
  ];
  
  // Pick one randomly on load to test flakiness
  const selected = testimonials[Math.floor(Math.random() * testimonials.length)];
  nameEl.textContent = `${selected.name} (${selected.role})`;
  textEl.textContent = `"${selected.text}"`;
  
  // Seed-based random avatar to test masking selector matching
  const avatarSeed = selected.name.toLowerCase().replace(/\s+/g, '-');
  avatarEl.setAttribute('src', `https://i.pravatar.cc/150?u=${avatarSeed}`);
}

// Unique Request ID & UUID
function initRequestMetadata() {
  const requestIdEl = document.getElementById('request-id');
  const uuidEl = document.getElementById('request-uuid');
  
  if (requestIdEl) {
    requestIdEl.textContent = 'REQ-' + Math.floor(Math.random() * 10000000);
  }
  if (uuidEl) {
    uuidEl.textContent = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = Math.random() * 16 | 0;
      const v = c === 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
}

// Canvas animation widget
function initCanvasAnimation() {
  const canvas = document.getElementById('animated-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  let x = 0;
  let y = canvas.height / 2;
  let dx = 2;
  
  const draw = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw moving ball
    ctx.beginPath();
    ctx.arc(x, y, 15, 0, Math.PI * 2);
    ctx.fillStyle = '#6366f1';
    ctx.fill();
    ctx.closePath();
    
    x += dx;
    if (x > canvas.width || x < 0) dx = -dx;
    
    requestAnimationFrame(draw);
  };
  draw();
}

// Mock API Fetch JSON
function initMockFetch() {
  const apiEl = document.getElementById('api-json-data');
  if (!apiEl) return;
  
  // Simulate fetch
  setTimeout(() => {
    const mockJson = {
      status: 'success',
      timestamp: Date.now(),
      metrics: {
        activeUsers: Math.floor(Math.random() * 500) + 1200,
        requestsProcessed: Math.floor(Math.random() * 10000) + 50000,
        latencyMs: (Math.random() * 15 + 5).toFixed(2)
      }
    };
    apiEl.textContent = JSON.stringify(mockJson, null, 2);
  }, 800);
}

// Toast Alert
function initToast() {
  const toastContainer = document.getElementById('toast-container');
  if (!toastContainer) return;
  
  setTimeout(() => {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
        <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"/>
      </svg>
      <span>Dynamic visual snapshot stabilized successfully!</span>
    `;
    toastContainer.appendChild(toast);
    
    // Hide toast after 4s
    setTimeout(() => {
      toast.style.opacity = '0';
      setTimeout(() => toast.remove(), 500);
    }, 4000);
  }, 1000);
}

// Skeleton Loader Simulator
function initSkeletonLoader() {
  const skeletons = document.querySelectorAll('.skeleton-wrapper');
  const contents = document.querySelectorAll('.skeleton-content');
  
  if (skeletons.length === 0) return;
  
  setTimeout(() => {
    skeletons.forEach(s => s.style.display = 'none');
    contents.forEach(c => c.style.display = 'block');
  }, 1200);
}
