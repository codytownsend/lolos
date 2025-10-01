// ================================================
// ROLLED CREAM - INTERACTIVE FUNCTIONALITY
// ================================================

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // ================================================
    // MOBILE MENU TOGGLE
    // ================================================
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
            
            // Toggle icon between bars and X
            const icon = this.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
        
        // Close mobile menu when clicking on a link
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function() {
                mobileMenu.classList.add('hidden');
                const icon = mobileMenuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
    
    // ================================================
    // SMOOTH SCROLL FOR NAVIGATION LINKS
    // ================================================
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                e.preventDefault();
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.offsetTop - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ================================================
    // SCROLL TO TOP BUTTON
    // ================================================
    const scrollTopBtn = document.getElementById('scroll-top');
    
    if (scrollTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 500) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        scrollTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // ================================================
    // NAVBAR BACKGROUND ON SCROLL
    // ================================================
    const navbar = document.querySelector('nav');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ================================================
    // SCROLL ANIMATIONS
    // ================================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
            }
        });
    }, observerOptions);
    
    // Observe all elements with animate-on-scroll class
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach(el => observer.observe(el));
    
    // ================================================
    // CONTACT FORM HANDLING
    // ================================================
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = {
                name: this.querySelector('[name="name"]').value,
                email: this.querySelector('[name="email"]').value,
                phone: this.querySelector('[name="phone"]').value,
                message: this.querySelector('[name="message"]').value,
                scheduling: this.querySelector('[name="scheduling"]').checked
            };
            
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'SENDING...';
            submitBtn.disabled = true;
            submitBtn.classList.add('loading');
            
            // Simulate form submission (replace with actual API call)
            setTimeout(function() {
                // Success
                formMessage.classList.remove('hidden', 'form-error');
                formMessage.classList.add('form-success');
                formMessage.textContent = '🎉 Thank you! We\'ll get back to you soon to make your event amazing!';
                
                // Reset form
                contactForm.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
                
                // Hide message after 5 seconds
                setTimeout(function() {
                    formMessage.classList.add('hidden');
                }, 5000);
                
                // Log form data (for testing - remove in production)
                console.log('Form submitted:', formData);
                
            }, 1500);
            
            // For actual implementation, use fetch or XMLHttpRequest:
            /*
            fetch('your-api-endpoint', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                // Handle success
                formMessage.classList.remove('hidden', 'form-error');
                formMessage.classList.add('form-success');
                formMessage.textContent = 'Thank you! We\'ll get back to you soon!';
                contactForm.reset();
            })
            .catch(error => {
                // Handle error
                formMessage.classList.remove('hidden', 'form-success');
                formMessage.classList.add('form-error');
                formMessage.textContent = 'Oops! Something went wrong. Please try again.';
            })
            .finally(() => {
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                submitBtn.classList.remove('loading');
            });
            */
        });
    }
    
    // ================================================
    // ACTIVE NAVIGATION HIGHLIGHTING
    // ================================================
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        const scrollPosition = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelectorAll('nav a[href*=' + sectionId + ']').forEach(link => {
                    link.classList.add('text-pink-600');
                    link.classList.add('font-bold');
                });
            } else {
                document.querySelectorAll('nav a[href*=' + sectionId + ']').forEach(link => {
                    link.classList.remove('text-pink-600');
                    link.classList.remove('font-bold');
                });
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavigation);
    
    // ================================================
    // ICE CREAM CARD HOVER EFFECTS
    // ================================================
    const iceCreamCards = document.querySelectorAll('.ice-cream-card');
    
    iceCreamCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    
    // ================================================
    // LAZY LOADING FOR IMAGES
    // ================================================
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        observer.unobserve(img);
                    }
                }
            });
        });
        
        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
    
    // ================================================
    // PARALLAX EFFECT FOR HERO SECTION
    // ================================================
    const hero = document.querySelector('#home');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            hero.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
        });
    }
    
    // ================================================
    // ENTRANCE ANIMATIONS DELAY
    // ================================================
    const iceCreamFlavors = document.querySelectorAll('.ice-cream-card');
    iceCreamFlavors.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // ================================================
    // CONSOLE EASTER EGG
    // ================================================
    console.log('%c🍦 Welcome to Rolled Cream! 🍦', 'color: #FF69B4; font-size: 24px; font-weight: bold;');
    console.log('%cLooking at our code? We love curious minds! 💖', 'color: #FF1493; font-size: 16px;');
    console.log('%cWant to work with us? Email: contact@rolledcream.com', 'color: #666; font-size: 14px;');
    
    // ================================================
    // PERFORMANCE MONITORING (Development Only)
    // ================================================
    if (window.performance) {
        window.addEventListener('load', function() {
            setTimeout(function() {
                const perfData = window.performance.timing;
                const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
                console.log(`⚡ Page loaded in ${pageLoadTime}ms`);
            }, 0);
        });
    }
    
});

// ================================================
// UTILITY FUNCTIONS
// ================================================

// Debounce function for performance optimization
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

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// ================================================
// GLOBAL ERROR HANDLER
// ================================================
window.addEventListener('error', function(e) {
    console.error('An error occurred:', e.error);
    // You can send this to an error tracking service
});