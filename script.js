// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle && navMenu) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        mobileMenuToggle.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            mobileMenuToggle.classList.remove('active');
        }
    });
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    lastScroll = currentScroll;
});

// Smooth Scroll for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#') return;
        
        e.preventDefault();
        const target = document.querySelector(href);
        
        if (target) {
            const offsetTop = target.offsetTop - 100; // Account for fixed navbar and sticky CTA
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Packages Slider with Swipe Functionality
const packagesSlider = document.getElementById('packagesSlider');
const progressDots = document.querySelectorAll('.progress-dot');
let currentSlide = 0;
const totalSlides = 5;

if (packagesSlider && progressDots.length > 0) {
    // Touch/swipe handling
    let startX = 0;
    let scrollLeft = 0;
    let isDown = false;

    packagesSlider.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - packagesSlider.offsetLeft;
        scrollLeft = packagesSlider.scrollLeft;
    });

    packagesSlider.addEventListener('mouseleave', () => {
        isDown = false;
    });

    packagesSlider.addEventListener('mouseup', () => {
        isDown = false;
    });

    packagesSlider.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - packagesSlider.offsetLeft;
        const walk = (x - startX) * 2;
        packagesSlider.scrollLeft = scrollLeft - walk;
    });

    // Touch events for mobile
    let touchStartX = 0;
    let touchScrollLeft = 0;

    packagesSlider.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].pageX - packagesSlider.offsetLeft;
        touchScrollLeft = packagesSlider.scrollLeft;
    });

    packagesSlider.addEventListener('touchmove', (e) => {
        if (!touchStartX) return;
        const x = e.touches[0].pageX - packagesSlider.offsetLeft;
        const walk = (x - touchStartX) * 1.5;
        packagesSlider.scrollLeft = touchScrollLeft - walk;
    });

    // Update progress dots based on scroll position
    packagesSlider.addEventListener('scroll', () => {
        const slideWidth = packagesSlider.offsetWidth;
        const scrollPosition = packagesSlider.scrollLeft;
        currentSlide = Math.round(scrollPosition / slideWidth);
        
        updateProgressDots();
    });

    // Progress dots click navigation
    progressDots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            const slideWidth = packagesSlider.offsetWidth;
            packagesSlider.scrollTo({
                left: slideWidth * index,
                behavior: 'smooth'
            });
            currentSlide = index;
            updateProgressDots();
        });
    });

    function updateProgressDots() {
        progressDots.forEach((dot, index) => {
            if (index === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // Auto-scroll on mobile (optional)
    if (window.innerWidth <= 768) {
        let autoScrollInterval;
        
        function startAutoScroll() {
            autoScrollInterval = setInterval(() => {
                if (currentSlide < totalSlides - 1) {
                    currentSlide++;
                } else {
                    currentSlide = 0;
                }
                const slideWidth = packagesSlider.offsetWidth;
                packagesSlider.scrollTo({
                    left: slideWidth * currentSlide,
                    behavior: 'smooth'
                });
                updateProgressDots();
            }, 5000);
        }

        packagesSlider.addEventListener('mouseenter', () => {
            clearInterval(autoScrollInterval);
        });

        packagesSlider.addEventListener('mouseleave', () => {
            startAutoScroll();
        });

        // Start auto-scroll initially
        startAutoScroll();
    }
}

// FAQ Accordion
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all other items
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Toggle current item
        item.classList.toggle('active', !isActive);
    });
});

// Form Submissions
const leadForm = document.getElementById('leadForm');

if (leadForm) {
    leadForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(leadForm);
        const data = Object.fromEntries(formData);
        
        console.log('Lead form submitted:', data);
        
        // Show success message
        alert('Thank you! Our health advisor will contact you shortly.');
        
        // Reset form
        leadForm.reset();
    });
}

// Sticky CTA Bar Visibility
const stickyCtaBar = document.getElementById('stickyCtaBar');
let lastScrollPosition = 0;

window.addEventListener('scroll', () => {
    const currentScrollPosition = window.pageYOffset;
    const footer = document.querySelector('.footer');
    
    if (footer && stickyCtaBar) {
        const footerTop = footer.offsetTop;
        const windowBottom = currentScrollPosition + window.innerHeight;
        
        // Hide CTA bar when footer is visible
        if (windowBottom >= footerTop - 100) {
            stickyCtaBar.style.transform = 'translateY(100%)';
        } else {
            stickyCtaBar.style.transform = 'translateY(0)';
        }
    }
    
    lastScrollPosition = currentScrollPosition;
});

// Intersection Observer for Fade-in Animations
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

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll(
        '.package-card, .why-choose-item, .category-card, .process-card, .faq-item'
    );
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Button Click Animations
document.querySelectorAll('.btn-primary, .cta-btn').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn-primary, .cta-btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Package card buttons
document.querySelectorAll('.package-card .btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        // Scroll to lead form
        const heroForm = document.querySelector('.hero-form-wrapper');
        if (heroForm) {
            heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
            // Focus on form after scroll
            setTimeout(() => {
                const nameInput = document.getElementById('leadName');
                if (nameInput) nameInput.focus();
            }, 1000);
        }
    });
});

// Category card clicks
document.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', function() {
        // Scroll to lead form
        const heroForm = document.querySelector('.hero-form-wrapper');
        if (heroForm) {
            heroForm.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    });
});

// Console welcome message
console.log('%c🏥 Diagnostic Lab Surat', 'color: #2563EB; font-size: 20px; font-weight: bold;');
console.log('%cWelcome! This page is built with modern web technologies.', 'color: #6B7280; font-size: 14px;');

// Handle window resize for packages slider
let resizeTimer;
window.addEventListener('resize', () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        if (packagesSlider) {
            const slideWidth = packagesSlider.offsetWidth;
            packagesSlider.scrollTo({
                left: slideWidth * currentSlide,
                behavior: 'smooth'
            });
        }
    }, 250);
});