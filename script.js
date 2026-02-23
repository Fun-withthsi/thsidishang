// ===================================
// SMOOTH SCROLL BEHAVIOR & ANIMATIONS
// ===================================

/**
 * Intersection Observer for fade-in animations
 * Triggers when elements come into view
 */
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add visible class to trigger CSS animation
            entry.target.classList.add('visible');
            
            // Optional: Stop observing after animation
            // observer.unobserve(entry.target);
        } else {
            // Remove visible class when out of view (optional, for re-animation)
            // entry.target.classList.remove('visible');
        }
    });
}, observerOptions);

// Observe all fade-in elements
document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Observe skill progress bars
document.querySelectorAll('.skill-category').forEach(element => {
    observer.observe(element);
});

// ===================================
// NAVIGATION & HAMBURGER MENU
// ===================================

const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ===================================
// SCROLL TO TOP BUTTON
// ===================================

const scrollTopBtn = document.getElementById('scrollTopBtn');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('show');
    } else {
        scrollTopBtn.classList.remove('show');
    }
});

scrollTopBtn?.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// ===================================
// FORM HANDLING
// ===================================

const contactForm = document.querySelector('.contact-form');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const message = contactForm.querySelector('textarea').value;
        
        // Basic validation
        if (!name.trim() || !email.trim() || !message.trim()) {
            showNotification('Please fill in all fields', 'error');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Please enter a valid email address', 'error');
            return;
        }
        
        // Show success message
        showNotification('Message sent successfully! I will get back to you soon.', 'success');
        
        // Reset form
        contactForm.reset();
    });
}

/**
 * Show notification messages
 */
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'rgba(0, 217, 255, 0.2)' : 'rgba(255, 0, 110, 0.2)'};
        border: 1px solid ${type === 'success' ? 'rgba(0, 217, 255, 0.5)' : 'rgba(255, 0, 110, 0.5)'};
        color: ${type === 'success' ? '#00d9ff' : '#ff006e'};
        border-radius: 8px;
        font-family: 'Inter', sans-serif;
        font-size: 14px;
        font-weight: 500;
        z-index: 2000;
        animation: slideInRight 0.3s ease-out;
        max-width: 300px;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Remove notification after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Add slide animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            opacity: 0;
            transform: translateX(400px);
        }
        to {
            opacity: 1;
            transform: translateX(0);
        }
    }
    
    @keyframes slideOutRight {
        from {
            opacity: 1;
            transform: translateX(0);
        }
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ===================================
// ACTIVE NAV LINK HIGHLIGHTING
// ===================================

function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.pageYOffset >= sectionTop - 200) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === currentSection) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add styling for active nav link
const navStyle = document.createElement('style');
navStyle.textContent = `
    .nav-link.active {
        color: #00d9ff;
        border-bottom: 2px solid #00d9ff;
        padding-bottom: 2px;
    }
`;
document.head.appendChild(navStyle);

// ===================================
// PAGE LOAD ANIMATION
// ===================================

window.addEventListener('load', () => {
    // Trigger fade-in for immediately visible elements
    document.querySelectorAll('.fade-in').forEach((element, index) => {
        const isVisible = element.getBoundingClientRect().top < window.innerHeight;
        if (isVisible) {
            setTimeout(() => {
                element.classList.add('visible');
            }, index * 100);
        }
    });
});

// ===================================
// PARALLAX EFFECT (Optional Enhancement)
// ===================================

const heroGradient = document.querySelector('.hero-gradient');

if (heroGradient) {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroGradient.style.transform = `translateY(${scrolled * 0.5}px)`;
    });
}

// ===================================
// KEYBOARD NAVIGATION
// ===================================

document.addEventListener('keydown', (e) => {
    // Escape key closes mobile menu
    if (e.key === 'Escape') {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
});

// ===================================
// THEME DETECTION & PREFERS-REDUCED-MOTION
// ===================================

// Respect user's preference for reduced motion
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.style.setProperty('--transition-fast', '0s');
    document.documentElement.style.setProperty('--transition-base', '0s');
    document.documentElement.style.setProperty('--transition-slow', '0s');
}

// ===================================
// PERFORMANCE OPTIMIZATION
// ===================================

/**
 * Lazy load images (for future implementation)
 */
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ===================================
// CONSOLE WELCOME MESSAGE
// ===================================

console.log('%c👋 Welcome to Thsidishang Sangtam\'s Portfolio!', 'color: #00d9ff; font-size: 16px; font-weight: bold;');
console.log('%cElectrical & Electronics Engineer | IT Infrastructure & Systems Technician | CompTIA A+', 'color: #b0b3d1; font-size: 12px;');
console.log('%cLet\'s build something amazing together! 🚀', 'color: #8338ec; font-size: 12px;');

// ===================================
// UTILITY FUNCTION: DEBOUNCE
// ===================================

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ===================================
// RESPONSIVE BEHAVIOR
// ===================================

const handleResize = debounce(() => {
    // Close mobile menu on resize
    if (window.innerWidth > 768) {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    }
}, 250);

window.addEventListener('resize', handleResize);

// ===================================
// CONTACT LINK FUNCTIONALITY
// ===================================

// Update these links with your actual contact information
document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
    link.addEventListener('click', (e) => {
        // Allow default mailto behavior
    });
});

// ===================================
// SKILL BAR ANIMATION ON SCROLL
// ===================================

const skillProgressObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                bar.style.animation = 'none';
                setTimeout(() => {
                    bar.style.animation = '';
                }, 10);
            });
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.skill-category').forEach(category => {
    skillProgressObserver.observe(category);
});

// ===================================
// INITIALIZATION COMPLETE
// ===================================

console.log('%cPortfolio initialized successfully ✓', 'color: #00d9ff; font-size: 12px;');
