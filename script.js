/**
 * Harmonic Trader - Enhanced JavaScript
 * Provides smooth scrolling, animations, and improved user experience
 */

// ═══════════════════════════════════════
// SMOOTH SCROLL BEHAVIOR
// ═══════════════════════════════════════

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// ═══════════════════════════════════════
// INTERSECTION OBSERVER FOR ANIMATIONS
// ═══════════════════════════════════════

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('.step-card, .pattern-card, .stat-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
  observer.observe(el);
});

// ═══════════════════════════════════════
// NAVBAR SCROLL EFFECT
// ═══════════════════════════════════════

let lastScrollTop = 0;
const navbar = document.querySelector('nav');

window.addEventListener('scroll', () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  
  // Add subtle shadow on scroll
  if (scrollTop > 50) {
    navbar.style.boxShadow = '0 4px 12px rgba(0, 191, 255, 0.1)';
  } else {
    navbar.style.boxShadow = 'none';
  }
  
  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ═══════════════════════════════════════
// IFRAME PERFORMANCE OPTIMIZATION
// ═══════════════════════════════════════

const iframe = document.querySelector('.tool-frame');

if (iframe) {
  // Add loading state
  iframe.style.backgroundColor = '#0D1117';
  
  // Monitor iframe loading
  iframe.addEventListener('load', () => {
    console.log('Streamlit application loaded successfully');
  });
  
  iframe.addEventListener('error', () => {
    console.error('Failed to load Streamlit application');
    // Fallback message
    const container = iframe.parentElement;
    const errorMsg = document.createElement('div');
    errorMsg.style.cssText = `
      padding: 2rem;
      text-align: center;
      color: #FF5F57;
      font-family: 'Share Tech Mono', monospace;
    `;
    errorMsg.textContent = 'Failed to load the detector. Please refresh the page.';
    container.appendChild(errorMsg);
  });
}

// ═══════════════════════════════════════
// BUTTON RIPPLE EFFECT
// ═══════════════════════════════════════

document.querySelectorAll('.btn-primary, .btn-outline').forEach(button => {
  button.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      background: rgba(255, 255, 255, 0.5);
      border-radius: 50%;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
      animation: ripple-animation 0.6s ease-out;
    `;
    
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    
    setTimeout(() => ripple.remove(), 600);
  });
});

// Add ripple animation
const style = document.createElement('style');
style.textContent = `
  @keyframes ripple-animation {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ═══════════════════════════════════════
// PERFORMANCE MONITORING
// ═══════════════════════════════════════

// Log page load performance
window.addEventListener('load', () => {
  if (window.performance && window.performance.timing) {
    const perfData = window.performance.timing;
    const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
    console.log(`Page loaded in ${pageLoadTime}ms`);
  }
});

// ═══════════════════════════════════════
// ACCESSIBILITY ENHANCEMENTS
// ═══════════════════════════════════════

// Keyboard navigation for buttons
document.querySelectorAll('.btn-primary, .btn-outline, .nav-links a').forEach(element => {
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      element.click();
    }
  });
});

// ═══════════════════════════════════════
// LAZY LOADING FOR IMAGES (Future Use)
// ═══════════════════════════════════════

if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img.lazy').forEach(img => {
    imageObserver.observe(img);
  });
}

// ═══════════════════════════════════════
// INITIALIZATION
// ═══════════════════════════════════════

console.log('Harmonic Trader - Enhanced JavaScript loaded successfully');
