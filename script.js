// ==================== Custom Cursor ====================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');
let cursorX = 0;
let cursorY = 0;
let followerX = 0;
let followerY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
    
    cursor.style.left = cursorX - 10 + 'px';
    cursor.style.top = cursorY - 10 + 'px';
});

function animateFollower() {
    followerX += (cursorX - followerX) * 0.15;
    followerY += (cursorY - followerY) * 0.15;
    
    cursorFollower.style.left = followerX - 3 + 'px';
    cursorFollower.style.top = followerY - 3 + 'px';
    
    requestAnimationFrame(animateFollower);
}

animateFollower();

// Show cursor on desktop
if (window.innerWidth > 768) {
    cursor.style.display = 'block';
    cursorFollower.style.display = 'block';
}

// Hover effects on buttons
document.querySelectorAll('.btn, a').forEach(el => {
    el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'scale(1.5)';
        cursor.style.borderColor = '#4FFFF6';
    });
    el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'scale(1)';
        cursor.style.borderColor = '#00E3CC';
    });
});

// ==================== Mobile Menu ====================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ==================== Particles ====================
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    const particleCount = window.innerWidth > 768 ? 30 : 10;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        
        const x = Math.random() * 100;
        const y = Math.random() * 100;
        const duration = Math.random() * 3 + 2;
        const tx = (Math.random() - 0.5) * 100;
        
        particle.style.left = x + '%';
        particle.style.top = y + '%';
        particle.style.setProperty('--tx', tx + 'px');
        particle.style.animation = `floatParticle ${duration}s linear infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// ==================== Scroll Animations ====================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.expertise-card, .testimonial-card, .award-badge').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// ==================== Navbar Scroll Effect ====================
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 500) {
        navbar.style.background = 'rgba(4, 27, 29, 0.95)';
        navbar.style.backdropFilter = 'blur(15px)';
    } else {
        navbar.style.background = 'rgba(4, 27, 29, 0.9)';
    }
    
    lastScroll = currentScroll;
});

// ==================== Loading Screen ====================
window.addEventListener('load', () => {
    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            loadingScreen.style.pointerEvents = 'none';
        }, 1500);
    }
});

// ==================== Form Validation ====================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formInputs = contactForm.querySelectorAll('.form-input');
        let isValid = true;
        
        formInputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff4444';
            } else {
                input.style.borderColor = 'rgba(0, 227, 204, 0.2)';
            }
        });
        
        if (isValid) {
            // Show success message
            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent! ✓';
            button.style.background = 'linear-gradient(135deg, #00E3CC, #4FFFF6)';
            
            setTimeout(() => {
                contactForm.reset();
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        }
    });
}

// ==================== Smooth Scroll Spy ====================
const navLinks2 = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks2.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = '#00E3CC';
            link.style.borderBottomColor = '#00E3CC';
        } else {
            link.style.color = '#F4F7F8';
        }
    });
});

// ==================== Parallax Effect ====================
const portfolioCards = document.querySelectorAll('.portfolio-card');

window.addEventListener('scroll', () => {
    portfolioCards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const scrollSpeed = 0.5;
        
        if (rect.top < window.innerHeight) {
            card.style.transform = `translateY(${window.pageYOffset * scrollSpeed * 0.1}px)`;
        }
    });
});

// ==================== Count Animation ====================
function animateCounters(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;
            observer.unobserve(counter);
        }
    });
}

const counterObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5
});

// ==================== Glow Effect on Click ====================
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn') || e.target.classList.contains('social-link')) {
        const ripple = document.createElement('span');
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.5)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s ease-out';
        ripple.style.pointerEvents = 'none';
        
        const rect = e.target.getBoundingClientRect();
        ripple.style.width = '20px';
        ripple.style.height = '20px';
        ripple.style.left = (e.clientX - rect.left - 10) + 'px';
        ripple.style.top = (e.clientY - rect.top - 10) + 'px';
    }
});

// ==================== Window Resize Handler ====================
window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== Prevent right click context menu (optional) ====================
// Uncomment if you want to disable right-click
// document.addEventListener('contextmenu', (e) => {
//     e.preventDefault();
// });

// ==================== Page Load Optimization ====================
document.addEventListener('DOMContentLoaded', () => {
    // Lazy load images
    const images = document.querySelectorAll('img');
    if ('IntersectionObserver' in window) {
        images.forEach(img => {
            if (img.dataset.src) {
                const observer = new IntersectionObserver((entries, observer) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const img = entry.target;
                            img.src = img.dataset.src;
                            img.removeAttribute('data-src');
                            observer.unobserve(img);
                        }
                    });
                });
                observer.observe(img);
            }
        });
    }
});

// ==================== Keyboard Navigation ====================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ==================== Add Active State to Current Nav Link ====================
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 60) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav);
updateActiveNav();

// ==================== Text Reveal Animation on Scroll ====================
const textElements = document.querySelectorAll('.section-title');
const textObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease-out forwards';
        }
    });
}, { threshold: 0.5 });

textElements.forEach(el => {
    textObserver.observe(el);
});

// ==================== Add CSS for Ripple Animation ====================
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
