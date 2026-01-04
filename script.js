// ========================================
// Smooth Scroll Navigation
// ========================================
document.addEventListener('DOMContentLoaded', function() {
    const toggleList = document.querySelectorAll(".state");

    toggleList.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            
            // Get the section class from the element
            let data = element.classList.item(1);
            
            // Find and scroll to the section
            const section = document.querySelector(`.${data}-data`);
            if (section) {
                section.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
            
            // Close mobile menu if open
            if (mobileMenu.classList.contains('active')) {
                toggleMobileMenu();
            }
        });
    });

    // ========================================
    // Mobile Menu Toggle
    // ========================================
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const mobileMenu = document.getElementById('mainMenu');
    const header = document.querySelector('.header');

    function toggleMobileMenu() {
        mobileMenuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }

    // ========================================
    // Header Scroll Effect
    // ========================================
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        // Add/remove scrolled class
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });

    // ========================================
    // Intersection Observer for Animations
    // ========================================
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all sections
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        observer.observe(section);
    });

    // Observe service cards
    const serviceCards = document.querySelectorAll('.service-card');
    serviceCards.forEach(card => {
        observer.observe(card);
    });

    // Observe about items
    const aboutItems = document.querySelectorAll('.about-item');
    aboutItems.forEach(item => {
        observer.observe(item);
    });

    // ========================================
    // Form Submission Handler
    // ========================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                subject: document.getElementById('subject').value,
                message: document.getElementById('message').value
            };
            
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Envoi en cours...';
            
            // Simulate form submission (replace with actual API call)
            setTimeout(() => {
                // Success notification
                showNotification('Message envoyé avec succès!', 'success');
                
                // Reset form
                contactForm.reset();
                
                // Restore button
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            }, 1500);
        });
    }

    // ========================================
    // Notification System
    // ========================================
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 3000);
    }

    // ========================================
    // Floating Cards Animation
    // ========================================
    const floatingCards = document.querySelectorAll('.floating-card');
    
    floatingCards.forEach((card, index) => {
        // Add random animation delay
        card.style.animationDelay = `${index * 0.5}s`;
        
        // Add hover effect
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });

    // ========================================
    // Active Menu Item Highlighting
    // ========================================
    const menuLinks = document.querySelectorAll('.menu a');
    const sections2 = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections2.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.pageYOffset >= sectionTop - 150) {
                current = section.getAttribute('id');
            }
        });

        menuLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ========================================
    // Counter Animation for Stats
    // ========================================
    function animateCounter(element, target, duration = 2000) {
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target.toLocaleString();
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    }

    // Observe stats and animate when visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                const statNumbers = entry.target.querySelectorAll('.stat-item strong');
                
                statNumbers.forEach(stat => {
                    const text = stat.textContent;
                    const number = parseInt(text.replace(/[^0-9]/g, ''));
                    if (number) {
                        stat.textContent = '0';
                        animateCounter(stat, number);
                    }
                });
                
                entry.target.classList.add('counted');
            }
        });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-inline');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }

    // ========================================
    // Add Loading Animation to Buttons
    // ========================================
    const allButtons = document.querySelectorAll('.btn:not([type="submit"])');
    
    allButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.href && !this.href.includes('#')) {
                e.preventDefault();
                
                // Add ripple effect
                const ripple = document.createElement('span');
                ripple.classList.add('ripple');
                this.appendChild(ripple);
                
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                
                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';
                
                setTimeout(() => {
                    window.location.href = this.href;
                }, 300);
            }
        });
    });

    // ========================================
    // Scroll Progress Indicator
    // ========================================
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.pageYOffset / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    // ========================================
    // Lazy Loading Images
    // ========================================
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));

    // ========================================
    // Add Parallax Effect to Home Section
    // ========================================
    const homeSection = document.querySelector('.home');
    
    if (homeSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallaxSpeed = 0.5;
            
            if (scrolled < homeSection.offsetHeight) {
                homeSection.style.transform = `translateY(${scrolled * parallaxSpeed}px)`;
            }
        });
    }

    // ========================================
    // Console Welcome Message
    // ========================================
    console.log('%c🚀 RSG Investia', 'font-size: 24px; color: #1E3A8A; font-weight: bold;');
    console.log('%cBienvenue sur notre plateforme!', 'font-size: 14px; color: #6b7280;');
    console.log('%cDéveloppé par RSG Investia', 'font-size: 12px; color: #9ca3af;');
});

// ========================================
// Additional CSS for Animations (Add to your CSS file)
// ========================================
const style = document.createElement('style');
style.textContent = `
    /* Mobile Menu Styles */
    @media (max-width: 768px) {
        .menu {
            position: fixed;
            top: 77px;
            left: -100%;
            width: 100%;
            height: calc(100vh - 77px);
            background: rgba(255, 255, 255, 0.98);
            backdrop-filter: blur(10px);
            flex-direction: column;
            padding: 40px;
            gap: 20px;
            transition: left 0.3s ease;
            box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }
        
        .menu.active {
            left: 0;
            display: flex;
        }
        
        .mobile-menu-toggle.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-toggle.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-toggle.active span:nth-child(3) {
            transform: rotate(-45deg) translate(7px, -6px);
        }
        
        body.menu-open {
            overflow: hidden;
        }
        
        .header-actions {
            display: none;
        }
        
        .menu.active ~ .header-actions {
            display: flex;
            position: fixed;
            bottom: 40px;
            left: 50%;
            transform: translateX(-50%);
            flex-direction: column;
            width: calc(100% - 80px);
            gap: 12px;
        }
        
        .menu.active ~ .header-actions .btn {
            width: 100%;
            justify-content: center;
        }
    }
    
    /* Notification Styles */
    .notification {
        position: fixed;
        top: 100px;
        right: -400px;
        background: white;
        padding: 16px 24px;
        border-radius: 12px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 12px;
        transition: right 0.3s ease;
        z-index: 10000;
        min-width: 300px;
    }
    
    .notification.show {
        right: 20px;
    }
    
    .notification-success {
        border-left: 4px solid #10b981;
    }
    
    .notification-error {
        border-left: 4px solid #ef4444;
    }
    
    .notification i {
        font-size: 24px;
    }
    
    .notification-success i {
        color: #10b981;
    }
    
    .notification-error i {
        color: #ef4444;
    }
    
    /* Scroll Progress Bar */
    .scroll-progress {
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #1E3A8A, #3b82f6);
        z-index: 10001;
        transition: width 0.1s ease;
    }
    
    /* Ripple Effect */
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
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
    
    /* Active Menu Link */
    .menu a.active {
        color: #1E3A8A;
    }
    
    .menu a.active::after {
        width: 100%;
    }
    
    /* Animate In Class */
    .animate-in {
        animation: fadeInUp 0.8s ease-out;
    }
    
    /* Image Loaded Effect */
    img.loaded {
        animation: fadeIn 0.5s ease-out;
    }
    
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;
document.head.appendChild(style);


// ========================================
// WhatsApp Popup Functions
// ========================================
function showWhatsAppPopup() {
    const popup = document.getElementById('whatsappPopup');
    popup.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeWhatsAppPopup() {
    const popup = document.getElementById('whatsappPopup');
    popup.classList.remove('active');
    document.body.style.overflow = '';
}

// Close popup when clicking outside
document.addEventListener('click', function(e) {
    const popup = document.getElementById('whatsappPopup');
    if (e.target === popup) {
        closeWhatsAppPopup();
    }
});

// Close popup with Escape key
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeWhatsAppPopup();
    }
});