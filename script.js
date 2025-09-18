// Immediate theme detection to prevent flash
(function() {
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Apply theme immediately to prevent flash
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const initialTheme = savedTheme || systemTheme;
    
    // Debug logging
    console.log('System theme:', systemTheme);
    console.log('Saved theme:', savedTheme);
    console.log('Initial theme:', initialTheme);
    
    document.documentElement.setAttribute('data-theme', initialTheme);
})();

// DOM Content Loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeWebsite();
});

// Initialize all website functionality
function initializeWebsite() {
    showLoadingAnimation();
    setupMobileMenu();
    setupThemeToggle();
    setupEmergencyExit();
    setupScrollAnimations();
    setupParallaxScrolling();
    setupFAQToggle();
    setupSmoothScrolling();
    setupResultsAnimations();
    setupPremiumAnimations();
    showCookieNotice();
    showWelcomeMessage();
    updateNavbarOnScroll();
}

// Setup premium animations
function setupPremiumAnimations() {
    // Add micro-hover animations to buttons and cards
    const hoverElements = document.querySelectorAll('.cta-btn, .about-card, .faq-item, .social-btn');
    hoverElements.forEach(element => {
        element.classList.add('micro-hover');
    });

    // Add glass morphism to cards
    const cards = document.querySelectorAll('.about-card, .cookie-popup, .results-placeholder');
    cards.forEach(card => {
        card.classList.add('glass-card');
    });

    // Add pulse animation to important CTAs
    const primaryButtons = document.querySelectorAll('.primary-btn, .survey-btn');
    primaryButtons.forEach(button => {
        button.classList.add('pulse-glow');
    });

    // Add animated gradient to hero background
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.background = 'linear-gradient(-45deg, var(--bg-primary), var(--bg-secondary))';
        hero.style.backgroundSize = '400% 400%';
        hero.classList.add('animated-gradient');
    }
}

// Mobile Menu Toggle
function setupMobileMenu() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking on nav links
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(event) {
            if (!hamburger.contains(event.target) && !navMenu.contains(event.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Theme Toggle (Dark Mode)
function setupThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    
    // Function to get system theme preference
    function getSystemTheme() {
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    }
    
    // Check for saved theme preference, otherwise use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = getSystemTheme();
    const currentTheme = savedTheme || systemTheme;
    
    // Apply the theme immediately
    document.documentElement.setAttribute('data-theme', currentTheme);
    
    // Update icon based on current theme
    updateThemeIcon(currentTheme, themeIcon);
    
    // Listen for system theme changes
    if (window.matchMedia) {
        const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
        mediaQuery.addEventListener('change', function(e) {
            // Only change if user hasn't manually set a preference
            if (!localStorage.getItem('theme')) {
                const newTheme = e.matches ? 'dark' : 'light';
                document.documentElement.setAttribute('data-theme', newTheme);
                updateThemeIcon(newTheme, themeIcon);
            }
        });
    }
    
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme, themeIcon);
        
        console.log('Theme manually switched to:', newTheme);
        
        // Add a little animation feedback
        themeToggle.style.transform = 'scale(0.95)';
        setTimeout(() => {
            themeToggle.style.transform = 'scale(1)';
        }, 150);
    });
    
    // Add a way to reset to system preference (for testing)
    // You can call resetThemeToSystem() in browser console to test
    window.resetThemeToSystem = function() {
        localStorage.removeItem('theme');
        const systemTheme = getSystemTheme();
        document.documentElement.setAttribute('data-theme', systemTheme);
        updateThemeIcon(systemTheme, themeIcon);
        console.log('Theme reset to system preference:', systemTheme);
    };
}

function updateThemeIcon(theme, iconElement) {
    if (theme === 'dark') {
        iconElement.className = 'fas fa-sun';
        iconElement.setAttribute('data-fallback', '☀️');
        document.getElementById('theme-toggle').setAttribute('title', 'Switch to Light Mode');
    } else {
        iconElement.className = 'fas fa-moon';
        iconElement.setAttribute('data-fallback', '🌙');
        document.getElementById('theme-toggle').setAttribute('title', 'Switch to Dark Mode');
    }
    
    // Check if Font Awesome loaded, if not show emoji fallback
    setTimeout(() => {
        const computedStyle = window.getComputedStyle(iconElement, ':before');
        if (!computedStyle.content || computedStyle.content === 'none' || computedStyle.content === '""') {
            iconElement.textContent = iconElement.getAttribute('data-fallback');
            iconElement.className = '';
        }
    }, 100);
}

// Emergency Exit Button
function setupEmergencyExit() {
    const emergencyBtn = document.getElementById('emergency-exit');
    let escKeyCount = 0;
    let escKeyTimer = null;
    
    // Fast emergency exit function
    function emergencyExit() {
        // Clear any existing content immediately
        document.body.style.display = 'none';
        
        // Multiple redirect methods for maximum speed and reliability
        window.location.href = 'https://www.google.com';
        window.location.replace('https://www.google.com');
        window.location.assign('https://www.google.com');
        
        // Immediate page replacement
        document.open();
        document.write('<!DOCTYPE html><html><head><title>Google</title></head><body style="margin:0;padding:0;font-family:Arial,sans-serif;display:flex;justify-content:center;align-items:center;height:100vh;background:#fff;"><div>Redirecting...</div><script>window.location.href="https://www.google.com";</script></body></html>');
        document.close();
        
        // Clear history
        if (window.history.replaceState) {
            window.history.replaceState(null, null, 'https://www.google.com');
        }
    }
    
    // Button click handler
    emergencyBtn.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        emergencyExit();
    });
    
    // Keyboard accessibility for button
    emergencyBtn.addEventListener('keydown', function(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            event.stopPropagation();
            emergencyExit();
        }
    });
    
    // Global ESC key listener (press ESC 3 times quickly)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            escKeyCount++;
            
            // Clear any existing timer
            if (escKeyTimer) {
                clearTimeout(escKeyTimer);
            }
            
            // If pressed 3 times, trigger emergency exit
            if (escKeyCount >= 3) {
                emergencyExit();
                return;
            }
            
            // Reset counter after 2 seconds if not pressed 3 times
            escKeyTimer = setTimeout(() => {
                escKeyCount = 0;
            }, 2000);
        }
    });
}

// Premium Scroll Animations
function setupScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Text reveal animation
                if (entry.target.classList.contains('text-reveal')) {
                    revealText(entry.target);
                }
                
                // Stagger animation for lists
                if (entry.target.classList.contains('stagger-container')) {
                    staggerAnimation(entry.target);
                }
            }
        });
    }, observerOptions);

    // Observe all elements with animation classes
    const elementsToAnimate = document.querySelectorAll('.fade-in, .text-reveal, .stagger-container');
    elementsToAnimate.forEach(element => {
        observer.observe(element);
    });
}

// Text reveal animation
function revealText(element) {
    const text = element.textContent;
    const words = text.split(' ');
    element.innerHTML = words.map((word, index) => 
        `<span class="word" style="animation-delay: ${index * 0.1}s">${word}</span>`
    ).join(' ');
    
    // Add animate class to trigger the animation
    element.classList.add('animate');
}

// Stagger animation for lists
function staggerAnimation(container) {
    const items = container.querySelectorAll('.stagger-item');
    items.forEach((item, index) => {
        setTimeout(() => {
            item.classList.add('visible');
        }, index * 100);
    });
}

// Parallax scrolling effect
function setupParallaxScrolling() {
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.parallax-element');
        
        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// Loading animation
function showLoadingAnimation() {
    const loadingOverlay = document.createElement('div');
    loadingOverlay.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; 
                    background: var(--bg-primary); z-index: 9999; 
                    display: flex; align-items: center; justify-content: center;
                    transition: opacity 0.5s ease;">
            <div style="width: 50px; height: 50px; border: 3px solid var(--border-color);
                        border-top: 3px solid var(--primary-color); border-radius: 50%;
                        animation: spin 1s linear infinite;"></div>
        </div>
    `;
    
    document.body.appendChild(loadingOverlay);
    
    setTimeout(() => {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingOverlay);
        }, 500);
    }, 1000);
}

// Add CSS for loading spinner
const loadingStyles = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Enhanced FAQ Toggle Functionality
function setupFAQToggle() {
    const faqItems = document.querySelectorAll('.faq-item');
    const expandAllBtn = document.getElementById('expand-all-faq');
    let allExpanded = false;
    
    // Individual FAQ item toggles
    faqItems.forEach((item, index) => {
        const question = item.querySelector('.faq-question');
        const expandIcon = item.querySelector('.expand-indicator i');
        
        question.addEventListener('click', function() {
            const isActive = item.classList.contains('active');
            
            // Add animation delay for smooth transition
            item.style.transitionDelay = `${index * 0.1}s`;
            
            // Close all other FAQ items (accordion behavior)
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherIcon = otherItem.querySelector('.expand-indicator i');
                    if (otherIcon) {
                        otherIcon.className = 'fas fa-plus';
                    }
                }
            });
            
            // Toggle current item
            if (isActive) {
                item.classList.remove('active');
                expandIcon.className = 'fas fa-plus';
            } else {
                item.classList.add('active');
                expandIcon.className = 'fas fa-minus';
                
                // Add a subtle shake animation
                item.style.animation = 'subtle-bounce 0.6s ease-out';
                setTimeout(() => {
                    item.style.animation = '';
                }, 600);
            }
            
            // Update expand all button state
            updateExpandAllButton();
        });
        
        // Keyboard accessibility
        question.addEventListener('keydown', function(event) {
            if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault();
                question.click();
            }
        });
        
        // Make it focusable
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');
        question.setAttribute('aria-expanded', 'false');
        
        // Update aria-expanded when toggled
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    const isActive = item.classList.contains('active');
                    question.setAttribute('aria-expanded', isActive.toString());
                }
            });
        });
        
        observer.observe(item, { attributes: true, attributeFilter: ['class'] });
    });
    
    // Expand/Collapse All functionality
    if (expandAllBtn) {
        expandAllBtn.addEventListener('click', function() {
            const btnIcon = expandAllBtn.querySelector('i');
            const btnText = expandAllBtn.childNodes[expandAllBtn.childNodes.length - 1];
            
            if (allExpanded) {
                // Collapse all
                faqItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.remove('active');
                        const expandIcon = item.querySelector('.expand-indicator i');
                        if (expandIcon) {
                            expandIcon.className = 'fas fa-plus';
                        }
                    }, index * 100);
                });
                
                allExpanded = false;
                btnIcon.className = 'fas fa-expand-arrows-alt';
                btnText.textContent = ' Expand All';
                
            } else {
                // Expand all
                faqItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('active');
                        const expandIcon = item.querySelector('.expand-indicator i');
                        if (expandIcon) {
                            expandIcon.className = 'fas fa-minus';
                        }
                    }, index * 100);
                });
                
                allExpanded = true;
                btnIcon.className = 'fas fa-compress-arrows-alt';
                btnText.textContent = ' Collapse All';
            }
        });
    }
    
    function updateExpandAllButton() {
        if (!expandAllBtn) return;
        
        const activeItems = document.querySelectorAll('.faq-item.active');
        const btnIcon = expandAllBtn.querySelector('i');
        const btnText = expandAllBtn.childNodes[expandAllBtn.childNodes.length - 1];
        
        if (activeItems.length === faqItems.length) {
            allExpanded = true;
            btnIcon.className = 'fas fa-compress-arrows-alt';
            btnText.textContent = ' Collapse All';
        } else {
            allExpanded = false;
            btnIcon.className = 'fas fa-expand-arrows-alt';
            btnText.textContent = ' Expand All';
        }
    }
    
    // Add FAQ item animations on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const faqObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.style.animation = 'fade-in-up 0.6s ease-out forwards';
                entry.target.style.animationDelay = `${Array.from(faqItems).indexOf(entry.target) * 0.1}s`;
            }
        });
    }, observerOptions);
    
    faqItems.forEach(item => {
        faqObserver.observe(item);
    });
}

// Add subtle bounce animation CSS
const faqAnimationStyles = `
@keyframes subtle-bounce {
    0% { transform: scale(1); }
    50% { transform: scale(1.02); }
    100% { transform: scale(1); }
}
`;

const faqStyleSheet = document.createElement('style');
faqStyleSheet.textContent = faqAnimationStyles;
document.head.appendChild(faqStyleSheet);

// Smooth Scrolling for Navigation Links
function setupSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navbarHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Enhanced Results Section Animations
function setupResultsAnimations() {
    const counter = document.getElementById('response-counter');
    const progressBars = document.querySelectorAll('.progress-bar');
    const statCards = document.querySelectorAll('.stat-card');
    
    // Animate response counter
    if (counter) {
        // Keep the "Open" text
        counter.textContent = 'Open';
    }
    
    // Animate progress bars
    progressBars.forEach(bar => {
        const progress = bar.getAttribute('data-progress');
        if (progress) {
            bar.style.setProperty('--progress', progress + '%');
        }
    });
    
    // Add staggered animation to stat cards
    statCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.2}s`;
        card.classList.add('fade-in-up');
    });
    
    // Animate security dots
    const securityDots = document.querySelectorAll('.security-dots .dot');
    securityDots.forEach((dot, index) => {
        setTimeout(() => {
            dot.classList.add('active');
        }, (index + 1) * 500);
    });
}

function animateCounter(element, target, duration) {
    const increment = target / (duration / 16); // 60fps
    let currentCount = 0;
    
    const timer = setInterval(() => {
        currentCount += increment;
        if (currentCount >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(currentCount);
        }
    }, 16);
}

// Cookie Notice
function showCookieNotice() {
    const cookieNotice = document.getElementById('cookie-notice');
    const cookieAccepted = localStorage.getItem('cookieAccepted');
    
    if (!cookieAccepted && cookieNotice) {
        // Show cookie notice after a short delay
        setTimeout(() => {
            cookieNotice.style.display = 'block';
        }, 1000);
    } else if (cookieNotice) {
        cookieNotice.style.display = 'none';
    }
}

function closeCookieNotice() {
    const cookieNotice = document.getElementById('cookie-notice');
    if (cookieNotice) {
        // Check if mobile or desktop for different exit animations
        const isMobile = window.innerWidth <= 768;
        if (isMobile) {
            cookieNotice.style.transform = 'translateY(450px)';
        } else {
            cookieNotice.style.transform = 'translateX(420px)';
        }
        cookieNotice.style.opacity = '0';
        setTimeout(() => {
            cookieNotice.style.display = 'none';
        }, 400);
        localStorage.setItem('cookieAccepted', 'true');
    }
}

function learnMoreCookies() {
    // Create a more detailed modal or redirect to privacy policy
    showNotification('For more details about our data collection practices, please see our research methodology in the About section.');
    
    // Optionally scroll to the about section
    setTimeout(() => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    }, 1000);
}

// Welcome Safety Message
function showWelcomeMessage() {
    const welcomeModal = document.getElementById('welcome-message');
    const welcomeShown = localStorage.getItem('welcomeMessageShown');
    
    if (!welcomeShown && welcomeModal) {
        // Show welcome message immediately with zero delay
        welcomeModal.classList.add('show');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    } else if (welcomeModal) {
        welcomeModal.style.display = 'none';
    }
}

function closeWelcomeMessage() {
    const welcomeModal = document.getElementById('welcome-message');
    if (welcomeModal) {
        welcomeModal.classList.remove('show');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
        
        // Hide after animation completes
        setTimeout(() => {
            welcomeModal.style.display = 'none';
        }, 300);
        
        // Remember that user has seen the message
        localStorage.setItem('welcomeMessageShown', 'true');
    }
}

// Close welcome message when clicking overlay
document.addEventListener('click', function(event) {
    const welcomeModal = document.getElementById('welcome-message');
    const welcomeContent = document.querySelector('.welcome-content');
    
    if (welcomeModal && welcomeModal.classList.contains('show') && 
        event.target === welcomeModal && !welcomeContent.contains(event.target)) {
        closeWelcomeMessage();
    }
});

// Navbar Scroll Effect
function updateNavbarOnScroll() {
    const navbar = document.getElementById('navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
        } else {
            navbar.style.boxShadow = 'none';
        }
        
        // Hide navbar on scroll down, show on scroll up
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Social Sharing Functions
function shareOnTwitter() {
    const text = encodeURIComponent("Take part in Inqueerium, this important anonymous research study about LGBTQ+ experiences in India. Your voice matters! 🏳️‍🌈");
    const url = encodeURIComponent(window.location.href);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=LGBTQ,India,Research,Community,Inqueerium`;
    
    window.open(twitterUrl, '_blank', 'width=600,height=400');
}

function shareOnInstagram() {
    // Instagram doesn't support direct URL sharing, so we'll copy to clipboard
    const text = `Take part in Inqueerium, this important anonymous research study about LGBTQ+ experiences in India. Your voice matters! 🏳️‍🌈\n\n${window.location.href}`;
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link copied to clipboard! Share it on Instagram.');
        });
    } else {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        showNotification('Link copied to clipboard! Share it on Instagram.');
    }
}

function shareOnReddit() {
    const title = encodeURIComponent("Inqueerium: Anonymous Research Study - LGBTQ+ Experiences in India");
    const url = encodeURIComponent(window.location.href);
    const redditUrl = `https://www.reddit.com/submit?title=${title}&url=${url}`;
    
    window.open(redditUrl, '_blank', 'width=800,height=600');
}

function shareOnWhatsApp() {
    const text = encodeURIComponent("Take part in Inqueerium, this important anonymous research study about LGBTQ+ experiences in India. Your voice matters! 🏳️‍🌈");
    const url = encodeURIComponent(window.location.href);
    const whatsappUrl = `https://wa.me/?text=${text}%20${url}`;
    
    window.open(whatsappUrl, '_blank');
}

// Notification System
function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: var(--success-color);
        color: white;
        padding: 16px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 1001;
        font-weight: 500;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Survey Button Functionality - Removed to allow normal navigation to survey.html

// Error Handling
window.addEventListener('error', function(event) {
    console.error('Website Error:', event.error);
    // You can add error reporting here if needed
});

// Performance Optimization
window.addEventListener('load', function() {
    // Preload critical images
    const criticalImages = [
        // Add any critical images here
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
});

// Accessibility Enhancements
document.addEventListener('keydown', function(event) {
    // ESC key closes mobile menu
    if (event.key === 'Escape') {
        const hamburger = document.getElementById('hamburger');
        const navMenu = document.getElementById('nav-menu');
        
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Focus management for accessibility
function trapFocus(element) {
    const focusableElements = element.querySelectorAll(
        'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];
    
    element.addEventListener('keydown', function(event) {
        if (event.key === 'Tab') {
            if (event.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    lastFocusable.focus();
                    event.preventDefault();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    firstFocusable.focus();
                    event.preventDefault();
                }
            }
        }
    });
}

// Initialize focus trapping for mobile menu
document.addEventListener('DOMContentLoaded', function() {
    const navMenu = document.getElementById('nav-menu');
    if (navMenu) {
        trapFocus(navMenu);
    }
});

// Reduced Motion Support
function respectsReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

// Only add animations if user hasn't requested reduced motion
if (!respectsReducedMotion()) {
    // Add extra animations here if needed
    document.addEventListener('DOMContentLoaded', function() {
        // Parallax effect for hero section (subtle)
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const parallaxElements = document.querySelectorAll('.floating-cards');
            
            parallaxElements.forEach(element => {
                const speed = 0.5;
                element.style.transform = `translateY(${scrolled * speed}px)`;
            });
        });
    });
}

// Google Sheets Integration
class GoogleSheetsIntegration {
    constructor() {
        this.sheetsUrl = localStorage.getItem('sheets-url') || '';
        this.refreshInterval = parseInt(localStorage.getItem('refresh-interval') || '5');
        this.showLiveData = localStorage.getItem('show-live-data') !== 'false';
        this.maxResponses = parseInt(localStorage.getItem('max-responses') || '10');
        this.refreshTimer = null;
        
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.loadSettings();
        if (this.sheetsUrl && this.showLiveData) {
            this.loadData();
            this.startAutoRefresh();
        }
        this.checkAdminAccess();
    }
    
    setupEventListeners() {
        // Admin panel controls
        document.getElementById('open-admin')?.addEventListener('click', () => this.openAdminPanel());
        document.getElementById('close-admin')?.addEventListener('click', () => this.closeAdminPanel());
        document.getElementById('save-settings')?.addEventListener('click', () => this.saveSettings());
        document.getElementById('reset-settings')?.addEventListener('click', () => this.resetSettings());
        document.getElementById('test-connection')?.addEventListener('click', () => this.testConnection());
        
        // Data controls
        document.getElementById('refresh-data')?.addEventListener('click', () => this.loadData());
        document.getElementById('view-sheets')?.addEventListener('click', () => this.openSheetsLink());
        
        // Konami code for admin access
        this.setupKonamiCode();
    }
    
    checkAdminAccess() {
        // Check URL parameters for admin access
        const urlParams = new URLSearchParams(window.location.search);
        if (urlParams.get('admin') === 'true') {
            document.getElementById('admin-trigger').style.display = 'block';
        }
        
        // Check for admin flag in localStorage
        if (localStorage.getItem('admin-access') === 'true') {
            document.getElementById('admin-trigger').style.display = 'block';
        }
    }
    
    setupKonamiCode() {
        const konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65]; // ↑↑↓↓←→←→BA
        let userInput = [];
        
        document.addEventListener('keydown', (e) => {
            userInput.push(e.keyCode);
            if (userInput.length > konamiCode.length) {
                userInput.shift();
            }
            
            if (userInput.length === konamiCode.length && 
                userInput.every((val, i) => val === konamiCode[i])) {
                document.getElementById('admin-trigger').style.display = 'block';
                localStorage.setItem('admin-access', 'true');
                this.showNotification('Admin access enabled!', 'success');
            }
        });
    }
    
    openAdminPanel() {
        document.getElementById('admin-panel').classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    closeAdminPanel() {
        document.getElementById('admin-panel').classList.remove('active');
        document.body.style.overflow = 'auto';
    }
    
    loadSettings() {
        const sheetsUrlInput = document.getElementById('sheets-url');
        const refreshIntervalSelect = document.getElementById('refresh-interval');
        const showLiveDataCheck = document.getElementById('show-live-data');
        const maxResponsesInput = document.getElementById('max-responses');
        
        if (sheetsUrlInput) sheetsUrlInput.value = this.sheetsUrl;
        if (refreshIntervalSelect) refreshIntervalSelect.value = this.refreshInterval;
        if (showLiveDataCheck) showLiveDataCheck.checked = this.showLiveData;
        if (maxResponsesInput) maxResponsesInput.value = this.maxResponses;
    }
    
    saveSettings() {
        const sheetsUrl = document.getElementById('sheets-url').value;
        const refreshInterval = document.getElementById('refresh-interval').value;
        const showLiveData = document.getElementById('show-live-data').checked;
        const maxResponses = document.getElementById('max-responses').value;
        
        // Validate Google Sheets URL
        if (sheetsUrl && !this.isValidSheetsUrl(sheetsUrl)) {
            this.showNotification('Please enter a valid Google Sheets URL', 'error');
            return;
        }
        
        // Save to localStorage
        localStorage.setItem('sheets-url', sheetsUrl);
        localStorage.setItem('refresh-interval', refreshInterval);
        localStorage.setItem('show-live-data', showLiveData);
        localStorage.setItem('max-responses', maxResponses);
        
        // Update instance variables
        this.sheetsUrl = sheetsUrl;
        this.refreshInterval = parseInt(refreshInterval);
        this.showLiveData = showLiveData;
        this.maxResponses = parseInt(maxResponses);
        
        // Restart auto-refresh if needed
        this.startAutoRefresh();
        
        // Load data if URL is provided
        if (sheetsUrl && showLiveData) {
            this.loadData();
        }
        
        this.showNotification('Settings saved successfully!', 'success');
        this.closeAdminPanel();
    }
    
    resetSettings() {
        if (confirm('Are you sure you want to reset all settings to default?')) {
            localStorage.removeItem('sheets-url');
            localStorage.removeItem('refresh-interval');
            localStorage.removeItem('show-live-data');
            localStorage.removeItem('max-responses');
            
            this.sheetsUrl = '';
            this.refreshInterval = 5;
            this.showLiveData = true;
            this.maxResponses = 10;
            
            this.loadSettings();
            this.showNotification('Settings reset to default', 'success');
        }
    }
    
    isValidSheetsUrl(url) {
        return url.includes('docs.google.com/spreadsheets/') || 
               url.includes('sheets.googleapis.com/');
    }
    
    async testConnection() {
        const sheetsUrl = document.getElementById('sheets-url').value;
        if (!sheetsUrl) {
            this.showNotification('Please enter a Google Sheets URL first', 'error');
            return;
        }
        
        if (!this.isValidSheetsUrl(sheetsUrl)) {
            this.showNotification('Invalid Google Sheets URL format', 'error');
            return;
        }
        
        const testBtn = document.getElementById('test-connection');
        const originalText = testBtn.innerHTML;
        testBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Testing...';
        testBtn.disabled = true;
        
        try {
            const csvUrl = this.convertToCsvUrl(sheetsUrl);
            const response = await fetch(csvUrl);
            
            if (response.ok) {
                this.showNotification('Connection successful!', 'success');
            } else {
                this.showNotification('Connection failed. Check if the sheet is published.', 'error');
            }
        } catch (error) {
            this.showNotification('Connection error: ' + error.message, 'error');
        } finally {
            testBtn.innerHTML = originalText;
            testBtn.disabled = false;
        }
    }
    
    convertToCsvUrl(sheetsUrl) {
        // Convert Google Sheets URL to CSV export URL
        const spreadsheetId = sheetsUrl.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/)?.[1];
        if (spreadsheetId) {
            return `https://docs.google.com/spreadsheets/d/${spreadsheetId}/export?format=csv`;
        }
        return sheetsUrl;
    }
    
    async loadData() {
        if (!this.sheetsUrl || !this.showLiveData) return;
        
        const dataPreview = document.getElementById('data-preview');
        const statusIndicator = document.getElementById('sheets-status');
        
        // Show loading state
        dataPreview.innerHTML = `
            <div class="loading-state">
                <div class="loading-spinner"></div>
                <p>Loading latest responses...</p>
            </div>
        `;
        
        try {
            const csvUrl = this.convertToCsvUrl(this.sheetsUrl);
            const response = await fetch(csvUrl);
            
            if (!response.ok) {
                throw new Error('Failed to fetch data');
            }
            
            const csvText = await response.text();
            const data = this.parseCsv(csvText);
            
            this.displayData(data);
            this.updateStatus('connected');
            
            // Update response counter
            const counter = document.getElementById('response-counter');
            if (counter) {
                counter.textContent = 'Open';
            }
            
            // Update footer participants count
            const footerParticipants = document.getElementById('footer-participants');
            if (footerParticipants) {
                footerParticipants.textContent = 'All';
            }
            
        } catch (error) {
            console.error('Error loading data:', error);
            this.displayError(error.message);
            this.updateStatus('disconnected');
        }
    }
    
    parseCsv(csvText) {
        const lines = csvText.split('\n').filter(line => line.trim());
        return lines.map(line => {
            // Simple CSV parsing (doesn't handle quotes with commas)
            return line.split(',').map(cell => cell.trim());
        });
    }
    
    displayData(data) {
        const dataPreview = document.getElementById('data-preview');
        
        if (data.length === 0) {
            dataPreview.innerHTML = `
                <div class="no-data">
                    <i class="fas fa-inbox"></i>
                    <p>No responses yet</p>
                </div>
            `;
            return;
        }
        
        const headers = data[0];
        const rows = data.slice(1, this.maxResponses + 1);
        
        let tableHtml = `
            <div class="data-summary">
                <p><strong>${data.length - 1}</strong> total responses</p>
                <p>Showing latest <strong>${Math.min(rows.length, this.maxResponses)}</strong> entries</p>
            </div>
            <table class="data-table">
                <thead>
                    <tr>
                        ${headers.map(header => `<th>${header}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    ${rows.map(row => `
                        <tr>
                            ${row.map(cell => `<td>${cell || '-'}</td>`).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;
        
        dataPreview.innerHTML = tableHtml;
    }
    
    displayError(message) {
        const dataPreview = document.getElementById('data-preview');
        dataPreview.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Error loading data: ${message}</p>
                <button onclick="sheetsIntegration.loadData()" class="retry-btn">
                    <i class="fas fa-redo"></i> Retry
                </button>
            </div>
        `;
    }
    
    updateStatus(status) {
        const statusIndicator = document.getElementById('sheets-status');
        if (statusIndicator) {
            statusIndicator.className = `status-indicator ${status}`;
            statusIndicator.innerHTML = `
                <i class="fas fa-circle"></i>
                <span>${status === 'connected' ? 'Connected' : 'Disconnected'}</span>
            `;
        }
    }
    
    openSheetsLink() {
        if (this.sheetsUrl) {
            window.open(this.sheetsUrl, '_blank');
        } else {
            this.showNotification('No Google Sheets URL configured', 'error');
        }
    }
    
    startAutoRefresh() {
        // Clear existing timer
        if (this.refreshTimer) {
            clearInterval(this.refreshTimer);
        }
        
        // Start new timer if interval > 0
        if (this.refreshInterval > 0) {
            this.refreshTimer = setInterval(() => {
                this.loadData();
            }, this.refreshInterval * 60 * 1000); // Convert minutes to milliseconds
        }
    }
    
    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Add to page
        document.body.appendChild(notification);
        
        // Show notification
        setTimeout(() => notification.classList.add('show'), 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

// Initialize footer stats
function initializeFooterStats() {
    const footerParticipants = document.getElementById('footer-participants');
    if (footerParticipants) {
        // Keep the "All" text instead of animating numbers
        footerParticipants.textContent = 'All';
    }
}

// Initialize Google Sheets integration
let sheetsIntegration;

// Service Worker Registration (for PWA capabilities)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', function() {
        // Initialize footer stats
        initializeFooterStats();
        
        // Initialize Google Sheets integration
        sheetsIntegration = new GoogleSheetsIntegration();
        
        // Uncomment if you want to add PWA capabilities later
        // navigator.serviceWorker.register('/sw.js')
        //     .then(registration => console.log('SW registered'))
        //     .catch(error => console.log('SW registration failed'));
    });
}

// Initialize Tally Form
function initializeTallyForm() {
    // Get current theme
    function getCurrentTheme() {
        return document.documentElement.getAttribute('data-theme') || 'light';
    }
    
    // Update Tally form theme
    function updateTallyTheme() {
        const iframe = document.getElementById('tally-form');
        if (!iframe) return;
        
        const currentTheme = getCurrentTheme();
        const isDark = currentTheme === 'dark';
        
        // Get the current src and update theme parameter
        const currentSrc = iframe.getAttribute('data-tally-src') || iframe.src;
        let newSrc = currentSrc;
        
        // Remove existing theme parameter if present
        newSrc = newSrc.replace(/[?&]theme=(light|dark)/g, '');
        
        // Add the theme parameter
        const separator = newSrc.includes('?') ? '&' : '?';
        newSrc = newSrc + separator + 'theme=' + (isDark ? 'dark' : 'light');
        
        // Update the iframe src
        iframe.setAttribute('data-tally-src', newSrc);
        iframe.src = newSrc;
    }
    
    // Load Tally's embed script
    if (!document.querySelector('script[src*="tally.so"]')) {
        const script = document.createElement('script');
        script.src = 'https://tally.so/widgets/embed.js';
        script.async = true;
        script.onload = function() {
            // Set initial theme before loading
            updateTallyTheme();
            
            // Initialize all Tally forms on the page
            if (window.Tally && window.Tally.loadEmbeds) {
                window.Tally.loadEmbeds();
            }
        };
        document.head.appendChild(script);
    } else {
        // Script already loaded, just update theme
        updateTallyTheme();
        if (window.Tally && window.Tally.loadEmbeds) {
            window.Tally.loadEmbeds();
        }
    }
    
    // Watch for theme changes
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                setTimeout(updateTallyTheme, 100); // Small delay to ensure theme is applied
            }
        });
    });
    
    observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ['data-theme']
    });
    
    // Handle form completion and loading
    window.addEventListener('message', function(event) {
        if (event.origin !== 'https://tally.so') return;
        
        if (event.data.type === 'tally_form_loaded') {
            console.log('Tally form loaded successfully');
            
            // Add smooth fade-in animation to form
            const formContainer = document.querySelector('.form-container');
            if (formContainer) {
                formContainer.style.opacity = '0';
                formContainer.style.transform = 'translateY(20px)';
                
                setTimeout(() => {
                    formContainer.style.transition = 'all 0.6s ease';
                    formContainer.style.opacity = '1';
                    formContainer.style.transform = 'translateY(0)';
                }, 100);
            }
        }
        
        if (event.data.type === 'tally_form_completed') {
            console.log('Form completed');
            
            // Optional: Show thank you message or redirect
            // window.location.href = 'thank-you.html';
            
            // Add completion analytics if needed
            if (typeof gtag !== 'undefined') {
                gtag('event', 'form_complete', {
                    'event_category': 'engagement',
                    'event_label': 'survey_completion'
                });
            }
        }
    });
}

// Cookie Settings Management
function showCookieSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function hideCookieSettings() {
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
}

function saveCookiePreferences() {
    // Get toggle states
    const toggles = document.querySelectorAll('#cookie-settings-modal input[type="checkbox"]');
    const preferences = {};
    
    toggles.forEach(toggle => {
        const category = toggle.parentElement.textContent.trim();
        preferences[category] = toggle.checked;
    });
    
    // Save preferences to localStorage
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    
    // Apply preferences
    applyCookiePreferences(preferences);
    
    // Hide modal
    hideCookieSettings();
    
    // Show confirmation
    showNotification('Cookie preferences saved successfully!', 'success');
}

function applyCookiePreferences(preferences) {
    // This function would implement the actual cookie management
    // For now, we'll just log the preferences
    console.log('Applying cookie preferences:', preferences);
    
    // Example: Disable analytics if user opted out
    if (preferences && preferences['Analytics Cookies'] === false) {
        // Disable Google Analytics or other analytics
        if (typeof gtag !== 'undefined') {
            gtag('consent', 'update', {
                'analytics_storage': 'denied'
            });
        }
    }
}

function loadCookiePreferences() {
    const saved = localStorage.getItem('cookiePreferences');
    if (saved) {
        try {
            const preferences = JSON.parse(saved);
            applyCookiePreferences(preferences);
            
            // Update toggle states in settings modal
            const toggles = document.querySelectorAll('#cookie-settings-modal input[type="checkbox"]');
            toggles.forEach(toggle => {
                const category = toggle.parentElement.textContent.trim();
                if (preferences.hasOwnProperty(category)) {
                    toggle.checked = preferences[category];
                }
            });
        } catch (e) {
            console.error('Error loading cookie preferences:', e);
        }
    }
}

// Enhanced notification system for policy pages
function showNotification(message, type = 'info', duration = 4000) {
    // Remove existing notifications
    const existing = document.querySelector('.policy-notification');
    if (existing) {
        existing.remove();
    }
    
    // Create notification
    const notification = document.createElement('div');
    notification.className = `policy-notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // Add to page
    document.body.appendChild(notification);
    
    // Auto remove after duration
    setTimeout(() => {
        if (notification.parentElement) {
            notification.remove();
        }
    }, duration);
}

// Jurisdiction Detection for Privacy Policy
async function detectJurisdiction() {
    const statusElement = document.getElementById('jurisdiction-status');
    const statusIcon = statusElement?.querySelector('.status-icon i');
    const statusTitle = statusElement?.querySelector('h3');
    const statusText = statusElement?.querySelector('p');
    
    if (!statusElement) return;
    
    try {
        // Try to get location from multiple sources
        let jurisdiction = await getJurisdictionFromIP();
        
        if (!jurisdiction) {
            // Fallback to browser language/timezone detection
            jurisdiction = getJurisdictionFromBrowser();
        }
        
        // Update status with comprehensive information
        statusElement.classList.add('detected');
        if (statusIcon) statusIcon.className = 'fas fa-map-marker-alt';
        if (statusTitle) statusTitle.textContent = `Your Location: ${jurisdiction.name}`;
        if (statusText) statusText.textContent = `Based on your location, ${jurisdiction.description} Your highlighted section below shows the specific privacy rights and protections that apply to you.`;
        
        // Highlight relevant legal card
        highlightLegalCard(jurisdiction.code);
        
        // Show location override option
        showLocationOverride(jurisdiction.code);
        
        // Don't show additional banner since we have all info in the status element
        
    } catch (error) {
        console.error('Jurisdiction detection failed:', error);
        
        // Fallback - show general message
        if (statusIcon) statusIcon.className = 'fas fa-globe';
        if (statusTitle) statusTitle.textContent = 'Your Location: International';
        if (statusText) statusText.textContent = 'We respect international privacy standards and provide comprehensive protections regardless of your location. Your highlighted section below shows the privacy rights and protections that apply to you.';
        
        statusElement.classList.add('detected');
        highlightLegalCard('other');
        showLocationOverride('other');
    }
}

async function getJurisdictionFromIP() {
    // First try browser-based detection as it's more reliable for Indian users
    const browserDetection = getJurisdictionFromBrowser();
    if (browserDetection && browserDetection.code !== 'other') {
        console.log('Using browser-based detection:', browserDetection);
        return browserDetection;
    }
    
    try {
        // Use ipapi.co first
        console.log('Trying ipapi.co for location detection...');
        const response = await fetch('https://ipapi.co/json/', {
            method: 'GET',
            headers: {
                'Accept': 'application/json'
            }
        });
        const data = await response.json();
        
        console.log('ipapi.co response:', data);
        
        if (data.country_code && !data.error) {
            const result = mapCountryToJurisdiction(data.country_code, data);
            console.log('Mapped jurisdiction from ipapi.co:', result);
            return result;
        }
    } catch (error) {
        console.log('ipapi.co failed:', error);
        
        try {
            // Backup service
            console.log('Trying backup service api.country.is...');
            const response = await fetch('https://api.country.is/');
            const data = await response.json();
            
            console.log('api.country.is response:', data);
            
            if (data.country) {
                const result = mapCountryToJurisdiction(data.country, data);
                console.log('Mapped jurisdiction from backup service:', result);
                return result;
            }
        } catch (backupError) {
            console.log('Backup IP detection also failed:', backupError);
        }
    }
    
    // If IP detection fails, fall back to browser detection even if it's 'other'
    console.log('IP detection failed, using browser fallback:', browserDetection);
    return browserDetection;
}

function getJurisdictionFromBrowser() {
    // Enhanced fallback based on browser language and timezone
    const language = navigator.language || navigator.userLanguage;
    const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const languages = navigator.languages || [language];
    
    console.log('Browser detection - Language:', language, 'Languages:', languages, 'Timezone:', timezone);
    
    // Check for India first (most comprehensive detection)
    if (timezone.includes('Asia/Kolkata') || 
        timezone.includes('Asia/Calcutta') ||
        language.startsWith('hi') || 
        language.startsWith('en-IN') ||
        languages.some(lang => lang.startsWith('hi') || lang.startsWith('en-IN')) ||
        language.includes('IN')) {
        return {
            code: 'in',
            name: 'India',
            description: 'the Digital Personal Data Protection Act 2023 applies to you.',
            region: 'IN'
        };
    }
    
    // EU countries detection
    if (timezone.includes('Europe/') && !timezone.includes('Europe/London')) {
        return {
            code: 'eu',
            name: 'European Union',
            description: 'the General Data Protection Regulation (GDPR) applies to you.',
            region: 'EU'
        };
    }
    
    // UK detection
    if (language.startsWith('en-GB') || timezone.includes('Europe/London')) {
        return {
            code: 'uk',
            name: 'United Kingdom',
            description: 'UK GDPR and Data Protection Act 2018 apply to you.',
            region: 'UK'
        };
    }
    
    // Canada detection
    if (language.startsWith('en-CA') || 
        language.startsWith('fr-CA') ||
        timezone.includes('America/Toronto') || 
        timezone.includes('America/Vancouver') ||
        timezone.includes('America/Montreal')) {
        return {
            code: 'ca',
            name: 'Canada',
            description: 'PIPEDA and provincial privacy laws apply to you.',
            region: 'CA'
        };
    }
    
    // Australia detection
    if (timezone.includes('Australia/') || 
        language.startsWith('en-AU') ||
        timezone.includes('Pacific/Auckland')) { // Include NZ for now
        return {
            code: 'au',
            name: 'Australia',
            description: 'the Privacy Act 1988 and Australian Privacy Principles apply to you.',
            region: 'AU'
        };
    }
    
    // US detection (put this after other English-speaking countries)
    if (language.startsWith('en-US') || 
        timezone.includes('America/Los_Angeles') || 
        timezone.includes('America/New_York') ||
        timezone.includes('America/Chicago') ||
        timezone.includes('America/Denver')) {
        return {
            code: 'us-ca',
            name: 'United States',
            description: 'US privacy laws including CCPA apply to you.',
            region: 'US'
        };
    }
    
    return {
        code: 'other',
        name: 'International',
        description: 'international privacy standards and human rights principles apply to you.',
        region: 'INTL'
    };
}

function mapCountryToJurisdiction(countryCode, locationData) {
    const countryCode2 = countryCode.toUpperCase();
    
    // EU countries
    const euCountries = ['AT', 'BE', 'BG', 'HR', 'CY', 'CZ', 'DK', 'EE', 'FI', 'FR', 'DE', 'GR', 'HU', 'IE', 'IT', 'LV', 'LT', 'LU', 'MT', 'NL', 'PL', 'PT', 'RO', 'SK', 'SI', 'ES', 'SE'];
    
    if (euCountries.includes(countryCode2)) {
        return {
            code: 'eu',
            name: 'European Union',
            description: 'the General Data Protection Regulation (GDPR) applies to you.',
            region: 'EU',
            country: locationData.country_name || locationData.country
        };
    }
    
    switch (countryCode2) {
        case 'US':
            // Check if California specifically
            const region = locationData.region || locationData.region_code || '';
            if (region === 'CA' || region === 'California') {
                return {
                    code: 'us-ca',
                    name: 'California, United States',
                    description: 'the California Consumer Privacy Act (CCPA/CPRA) applies to you.',
                    region: 'US-CA'
                };
            }
            return {
                code: 'us-ca', // Default to CCPA for all US users as it's most protective
                name: 'United States',
                description: 'US privacy laws including CCPA apply to you.',
                region: 'US'
            };
            
        case 'CA':
            return {
                code: 'ca',
                name: 'Canada',
                description: 'PIPEDA and provincial privacy laws apply to you.',
                region: 'CA'
            };
            
        case 'GB':
        case 'UK':
            return {
                code: 'uk',
                name: 'United Kingdom',
                description: 'UK GDPR and Data Protection Act 2018 apply to you.',
                region: 'UK'
            };
            
        case 'IN':
            return {
                code: 'in',
                name: 'India',
                description: 'the Digital Personal Data Protection Act 2023 applies to you.',
                region: 'IN'
            };
            
        case 'AU':
            return {
                code: 'au',
                name: 'Australia',
                description: 'the Privacy Act 1988 and Australian Privacy Principles apply to you.',
                region: 'AU'
            };
            
        default:
            return {
                code: 'other',
                name: 'International',
                description: 'international privacy standards and human rights principles apply to you.',
                region: 'INTL',
                country: locationData.country_name || locationData.country
            };
    }
}

function highlightLegalCard(jurisdictionCode) {
    // Remove existing highlights
    const allCards = document.querySelectorAll('.legal-card');
    allCards.forEach(card => {
        card.classList.remove('highlight');
        card.style.order = '';
    });
    
    // Highlight the relevant card
    const targetCard = document.getElementById(`legal-${jurisdictionCode}`);
    if (targetCard) {
        targetCard.classList.add('highlight');
        targetCard.style.order = '-1'; // Move to top
        
        // Scroll to the highlighted card
        setTimeout(() => {
            targetCard.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
        }, 1000);
    }
}

function showLocationOverride(currentJurisdiction) {
    const overrideElement = document.getElementById('location-override');
    if (overrideElement) {
        overrideElement.style.display = 'block';
        
        // Set up click handlers for location buttons
        const locationButtons = overrideElement.querySelectorAll('.location-btn');
        locationButtons.forEach(button => {
            // Mark current selection
            if (button.dataset.jurisdiction === currentJurisdiction) {
                button.classList.add('selected');
            }
            
            button.addEventListener('click', function() {
                const selectedJurisdiction = this.dataset.jurisdiction;
                
                // Remove selected class from all buttons
                locationButtons.forEach(btn => btn.classList.remove('selected'));
                
                // Add selected class to clicked button
                this.classList.add('selected');
                
                // Update jurisdiction display
                updateJurisdictionDisplay(selectedJurisdiction);
                
                // Highlight appropriate legal card
                highlightLegalCard(selectedJurisdiction);
            });
        });
    }
}

function updateJurisdictionDisplay(jurisdictionCode) {
    const jurisdictionMap = {
        'in': {
            name: 'India',
            description: 'the Digital Personal Data Protection Act 2023 applies to you.'
        },
        'eu': {
            name: 'European Union',
            description: 'the General Data Protection Regulation (GDPR) applies to you.'
        },
        'us-ca': {
            name: 'United States',
            description: 'US privacy laws including CCPA apply to you.'
        },
        'uk': {
            name: 'United Kingdom',
            description: 'UK GDPR and Data Protection Act 2018 apply to you.'
        },
        'ca': {
            name: 'Canada',
            description: 'PIPEDA and provincial privacy laws apply to you.'
        },
        'au': {
            name: 'Australia',
            description: 'the Privacy Act 1988 and Australian Privacy Principles apply to you.'
        },
        'other': {
            name: 'International',
            description: 'international privacy standards and human rights principles apply to you.'
        }
    };
    
    const jurisdiction = jurisdictionMap[jurisdictionCode];
    const statusElement = document.getElementById('jurisdiction-status');
    const statusTitle = statusElement?.querySelector('h3');
    const statusText = statusElement?.querySelector('p');
    
    if (statusTitle) statusTitle.textContent = `Your Location: ${jurisdiction.name}`;
    if (statusText) statusText.textContent = `Based on your selection, ${jurisdiction.description} Your highlighted section below shows the specific privacy rights and protections that apply to you.`;
}

// Function removed - jurisdiction context now shown in the main status element

// Initialize Tally form when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the survey page
    if (window.location.pathname.includes('survey.html') || document.querySelector('.survey-container')) {
        initializeTallyForm();
    }
    
    // Load cookie preferences on policy pages
    if (window.location.pathname.includes('cookie-policy.html') || window.location.pathname.includes('privacy-policy.html')) {
        loadCookiePreferences();
    }
    
    // Detect jurisdiction on privacy policy and cookie policy pages
    if (window.location.pathname.includes('privacy-policy.html') || window.location.pathname.includes('cookie-policy.html')) {
        // Add a small delay to let the page load
        setTimeout(detectJurisdiction, 1000);
    }
    
    // Close modal when clicking outside
    const modal = document.getElementById('cookie-settings-modal');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                hideCookieSettings();
            }
        });
    }
});