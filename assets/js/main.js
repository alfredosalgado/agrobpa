// ===== MAIN JAVASCRIPT =====

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all modules
    Navigation.init();
    ScrollEffects.init();
    Animations.init();
    FloatingElements.init();
    ContactForm.init();
    Utils.init();
});

// ===== NAVIGATION MODULE =====
const Navigation = {
    elements: {
        header: null,
        nav: null,
        navToggle: null,
        navMenu: null,
        navClose: null,
        navLinks: null,
        navOverlay: null
    },

    init() {
        this.cacheElements();
        this.bindEvents();
        this.setActiveLink();
    },

    cacheElements() {
        this.elements.header = document.querySelector('.header');
        this.elements.nav = document.querySelector('.nav');
        this.elements.navToggle = document.querySelector('.nav__toggle');
        this.elements.navMenu = document.querySelector('.nav__menu');
        this.elements.navClose = document.querySelector('.nav__close');
        this.elements.navLinks = document.querySelectorAll('.nav__link');
        this.elements.navOverlay = document.querySelector('.nav__overlay');
    },

    bindEvents() {
        // Mobile menu toggle
        if (this.elements.navToggle) {
            this.elements.navToggle.addEventListener('click', () => this.toggleMobileMenu());
        }

        if (this.elements.navClose) {
            this.elements.navClose.addEventListener('click', () => this.closeMobileMenu());
        }

        if (this.elements.navOverlay) {
            this.elements.navOverlay.addEventListener('click', () => this.closeMobileMenu());
        }

        // Navigation links
        this.elements.navLinks.forEach(link => {
            link.addEventListener('click', (e) => this.handleNavClick(e));
        });

        // Scroll events
        window.addEventListener('scroll', () => this.handleScroll());
        window.addEventListener('resize', () => this.handleResize());

        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeydown(e));
    },

    toggleMobileMenu() {
        const isOpen = this.elements.navMenu.classList.contains('show-menu');
        
        if (isOpen) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    },

    openMobileMenu() {
        this.elements.navMenu.classList.add('show-menu');
        if (this.elements.navOverlay) {
            this.elements.navOverlay.classList.add('show-overlay');
        }
        document.body.style.overflow = 'hidden';
        
        // Focus management
        if (this.elements.navClose) {
            this.elements.navClose.focus();
        }
    },

    closeMobileMenu() {
        this.elements.navMenu.classList.remove('show-menu');
        if (this.elements.navOverlay) {
            this.elements.navOverlay.classList.remove('show-overlay');
        }
        document.body.style.overflow = '';
    },

    handleNavClick(e) {
        const href = e.target.getAttribute('href');
        
        if (href && href.startsWith('#')) {
            e.preventDefault();
            const targetId = href.substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                this.closeMobileMenu();
                ScrollEffects.scrollToElement(targetElement);
                this.setActiveLink(href);
            }
        }
    },

    handleScroll() {
        const scrollY = window.scrollY;
        
        // Header background on scroll
        if (scrollY > 50) {
            this.elements.header.classList.add('scrolled');
        } else {
            this.elements.header.classList.remove('scrolled');
        }

        // Update active navigation link
        this.updateActiveLink();
    },

    handleResize() {
        if (window.innerWidth >= 1024) {
            this.closeMobileMenu();
        }
    },

    handleKeydown(e) {
        if (e.key === 'Escape') {
            this.closeMobileMenu();
        }
    },

    setActiveLink(activeHref = null) {
        this.elements.navLinks.forEach(link => {
            link.classList.remove('active-link');
            if (activeHref && link.getAttribute('href') === activeHref) {
                link.classList.add('active-link');
            }
        });
    },

    updateActiveLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollY = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                this.setActiveLink(`#${sectionId}`);
            }
        });
    }
};

// ===== SCROLL EFFECTS MODULE =====
const ScrollEffects = {
    init() {
        this.bindEvents();
    },

    bindEvents() {
        // Hero scroll arrow
        const heroScroll = document.querySelector('.hero__scroll');
        if (heroScroll) {
            heroScroll.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    this.scrollToElement(aboutSection);
                }
            });
        }

        // Smooth scroll for all anchor links
        document.querySelectorAll('a[href^="#"]').forEach(link => {
            link.addEventListener('click', (e) => {
                const href = link.getAttribute('href');
                if (href !== '#') {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        this.scrollToElement(target);
                    }
                }
            });
        });
    },

    scrollToElement(element, offset = 80) {
        const elementPosition = element.offsetTop - offset;
        
        window.scrollTo({
            top: elementPosition,
            behavior: 'smooth'
        });
    },

    scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }
};

// ===== ANIMATIONS MODULE =====
const Animations = {
    observer: null,
    
    init() {
        this.createObserver();
        this.observeElements();
    },

    createObserver() {
        const options = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        this.observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    
                    // Animate counters if present
                    if (entry.target.classList.contains('stats__number')) {
                        this.animateCounter(entry.target);
                    }
                }
            });
        }, options);
    },

    observeElements() {
        // Elements to animate on scroll
        const animatedElements = document.querySelectorAll(
            '.fade-in, .fade-in-up, .fade-in-left, .fade-in-right, .slide-in-left, .slide-in-right'
        );
        
        animatedElements.forEach(element => {
            this.observer.observe(element);
        });

        // Counter elements
        const counters = document.querySelectorAll('.stats__number');
        counters.forEach(counter => {
            this.observer.observe(counter);
        });
    },

    animateCounter(element) {
        const target = parseInt(element.textContent.replace(/[^0-9]/g, ''));
        const duration = 2000;
        const step = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += step;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
};

// ===== FLOATING ELEMENTS MODULE =====
const FloatingElements = {
    scrollTopBtn: null,
    whatsappBtn: null,

    init() {
        this.createScrollTopButton();
        this.createWhatsAppButton();
        this.bindEvents();
    },

    createScrollTopButton() {
        this.scrollTopBtn = document.createElement('button');
        this.scrollTopBtn.className = 'scroll-top';
        this.scrollTopBtn.innerHTML = '<i class="fas fa-chevron-up"></i>';
        this.scrollTopBtn.setAttribute('aria-label', 'Volver arriba');
        this.scrollTopBtn.setAttribute('title', 'Volver arriba');
        
        document.body.appendChild(this.scrollTopBtn);
    },

    createWhatsAppButton() {
        this.whatsappBtn = document.createElement('a');
        this.whatsappBtn.className = 'whatsapp-float';
        this.whatsappBtn.href = 'https://wa.me/1234567890?text=Hola,%20me%20interesa%20conocer%20más%20sobre%20sus%20servicios%20de%20BPA';
        this.whatsappBtn.target = '_blank';
        this.whatsappBtn.rel = 'noopener noreferrer';
        this.whatsappBtn.innerHTML = '<i class="fab fa-whatsapp"></i>';
        this.whatsappBtn.setAttribute('aria-label', 'Contactar por WhatsApp');
        this.whatsappBtn.setAttribute('title', 'Contactar por WhatsApp');
        
        document.body.appendChild(this.whatsappBtn);
    },

    bindEvents() {
        // Scroll to top button
        if (this.scrollTopBtn) {
            this.scrollTopBtn.addEventListener('click', () => {
                ScrollEffects.scrollToTop();
            });
        }

        // Show/hide floating buttons on scroll
        window.addEventListener('scroll', () => {
            this.toggleFloatingButtons();
        });
    },

    toggleFloatingButtons() {
        const scrollY = window.scrollY;
        const showThreshold = 300;

        if (scrollY > showThreshold) {
            if (this.scrollTopBtn) {
                this.scrollTopBtn.classList.add('show');
            }
            if (this.whatsappBtn) {
                this.whatsappBtn.classList.add('show');
            }
        } else {
            if (this.scrollTopBtn) {
                this.scrollTopBtn.classList.remove('show');
            }
            if (this.whatsappBtn) {
                this.whatsappBtn.classList.remove('show');
            }
        }
    }
};

// ===== CONTACT FORM MODULE =====
const ContactForm = {
    form: null,
    submitBtn: null,
    successMessage: null,

    init() {
        this.form = document.querySelector('.contact__form form');
        if (this.form) {
            this.submitBtn = this.form.querySelector('.form-button');
            this.successMessage = this.form.querySelector('.form-success-message');
            this.bindEvents();
        }
    },

    bindEvents() {
        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleSubmit(e));
            
            // Real-time validation
            const inputs = this.form.querySelectorAll('.form-input, .form-textarea');
            inputs.forEach(input => {
                input.addEventListener('blur', () => this.validateField(input));
                input.addEventListener('input', () => this.clearFieldError(input));
            });
        }
    },

    async handleSubmit(e) {
        e.preventDefault();
        
        if (!this.validateForm()) {
            return;
        }

        this.setLoadingState(true);

        try {
            // Simulate form submission
            await this.simulateFormSubmission();
            this.showSuccessMessage();
            this.form.reset();
        } catch (error) {
            this.showErrorMessage('Hubo un error al enviar el formulario. Por favor, inténtelo de nuevo.');
        } finally {
            this.setLoadingState(false);
        }
    },

    validateForm() {
        const requiredFields = this.form.querySelectorAll('[required]');
        let isValid = true;

        requiredFields.forEach(field => {
            if (!this.validateField(field)) {
                isValid = false;
            }
        });

        return isValid;
    },

    validateField(field) {
        const value = field.value.trim();
        const fieldContainer = field.closest('.form-field');
        let isValid = true;
        let errorMessage = '';

        // Required validation
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Este campo es obligatorio';
        }

        // Email validation
        if (field.type === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                isValid = false;
                errorMessage = 'Por favor, ingrese un email válido';
            }
        }

        // Phone validation
        if (field.type === 'tel' && value) {
            const phoneRegex = /^[\d\s\-\+\(\)]+$/;
            if (!phoneRegex.test(value) || value.length < 10) {
                isValid = false;
                errorMessage = 'Por favor, ingrese un teléfono válido';
            }
        }

        this.showFieldValidation(fieldContainer, isValid, errorMessage);
        return isValid;
    },

    showFieldValidation(container, isValid, errorMessage) {
        container.classList.remove('form-field--error', 'form-field--success');
        
        const existingError = container.querySelector('.form-error');
        if (existingError) {
            existingError.remove();
        }

        if (!isValid) {
            container.classList.add('form-field--error');
            const errorElement = document.createElement('span');
            errorElement.className = 'form-error';
            errorElement.textContent = errorMessage;
            container.appendChild(errorElement);
        } else {
            container.classList.add('form-field--success');
        }
    },

    clearFieldError(field) {
        const fieldContainer = field.closest('.form-field');
        fieldContainer.classList.remove('form-field--error');
        
        const errorElement = fieldContainer.querySelector('.form-error');
        if (errorElement) {
            errorElement.remove();
        }
    },

    setLoadingState(isLoading) {
        if (this.submitBtn) {
            if (isLoading) {
                this.submitBtn.classList.add('form-button--loading');
                this.submitBtn.disabled = true;
                this.submitBtn.innerHTML = '<span class="form-button__spinner"></span> Enviando...';
            } else {
                this.submitBtn.classList.remove('form-button--loading');
                this.submitBtn.disabled = false;
                this.submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
            }
        }
    },

    showSuccessMessage() {
        if (this.successMessage) {
            this.successMessage.classList.add('show');
            setTimeout(() => {
                this.successMessage.classList.remove('show');
            }, 5000);
        }
    },

    showErrorMessage(message) {
        // Create or update error message
        let errorDiv = this.form.querySelector('.form-error-message');
        if (!errorDiv) {
            errorDiv = document.createElement('div');
            errorDiv.className = 'form-error-message';
            this.form.appendChild(errorDiv);
        }
        
        errorDiv.textContent = message;
        errorDiv.style.display = 'block';
        
        setTimeout(() => {
            errorDiv.style.display = 'none';
        }, 5000);
    },

    async simulateFormSubmission() {
        // Simulate API call delay
        return new Promise((resolve) => {
            setTimeout(resolve, 2000);
        });
    }
};

// ===== UTILITIES MODULE =====
const Utils = {
    init() {
        this.handleExternalLinks();
        this.addLoadingStates();
        this.handleImageLoading();
    },

    handleExternalLinks() {
        const externalLinks = document.querySelectorAll('a[href^="http"]');
        externalLinks.forEach(link => {
            if (!link.hostname.includes(window.location.hostname)) {
                link.setAttribute('target', '_blank');
                link.setAttribute('rel', 'noopener noreferrer');
            }
        });
    },

    addLoadingStates() {
        // Add loading class to hero background
        const heroBg = document.querySelector('.hero__bg');
        if (heroBg) {
            const heroSection = document.querySelector('.hero');
            
            // Si la imagen ya está cargada, marcarla como loaded
            if (heroBg.complete && heroBg.naturalHeight !== 0) {
                heroSection.classList.add('loaded');
            } else {
                // Solo añadir loading si la imagen no está cargada
                heroSection.classList.add('loading');
                
                heroBg.addEventListener('load', () => {
                    heroSection.classList.remove('loading');
                    heroSection.classList.add('loaded');
                });
                
                heroBg.addEventListener('error', () => {
                    heroSection.classList.remove('loading');
                    heroSection.classList.add('error');
                });
            }
        }
    },

    handleImageLoading() {
        const images = document.querySelectorAll('img[data-src]');
        
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy');
                        imageObserver.unobserve(img);
                    }
                });
            });

            images.forEach(img => {
                img.classList.add('lazy');
                imageObserver.observe(img);
            });
        } else {
            // Fallback for browsers without IntersectionObserver
            images.forEach(img => {
                img.src = img.dataset.src;
            });
        }
    },

    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    }
};

// ===== PERFORMANCE OPTIMIZATIONS =====

// Optimize scroll events
window.addEventListener('scroll', Utils.throttle(() => {
    Navigation.handleScroll();
    FloatingElements.toggleFloatingButtons();
}, 16));

// Optimize resize events
window.addEventListener('resize', Utils.debounce(() => {
    Navigation.handleResize();
}, 250));

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('JavaScript Error:', e.error);
});

window.addEventListener('unhandledrejection', (e) => {
    console.error('Unhandled Promise Rejection:', e.reason);
});

// ===== EXPORT FOR TESTING =====
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        Navigation,
        ScrollEffects,
        Animations,
        FloatingElements,
        ContactForm,
        Utils
    };
}