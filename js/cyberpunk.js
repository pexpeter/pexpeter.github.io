/* =========================================
   CYBERPUNK PREMIUM PORTFOLIO JAVASCRIPT
   Particles, Cursor, Animations, Effects
   ========================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Initialize all premium features
    initCustomCursor();
    initParticles();
    initScrollAnimations();
    initTypingEffect();
    initStatsCounter();
    initTiltEffect();
    addCyberpunkClasses();
});

/* Custom Animated Cursor */
function initCustomCursor() {
    // Only on desktop
    if (window.innerWidth < 992) return;

    // Create cursor elements
    const cursorDot = document.createElement('div');
    cursorDot.className = 'cursor-dot';
    document.body.appendChild(cursorDot);

    const cursorOutline = document.createElement('div');
    cursorOutline.className = 'cursor-outline';
    document.body.appendChild(cursorOutline);

    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        // Dot follows immediately
        cursorDot.style.left = mouseX - 4 + 'px';
        cursorDot.style.top = mouseY - 4 + 'px';
    });

    // Smooth outline follow
    function animateOutline() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;

        cursorOutline.style.left = outlineX - 20 + 'px';
        cursorOutline.style.top = outlineY - 20 + 'px';

        requestAnimationFrame(animateOutline);
    }
    animateOutline();

    // Hover effect on interactive elements
    const hoverElements = document.querySelectorAll('a, button, .card, .badge, input, textarea');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => cursorOutline.classList.add('hover'));
        el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hover'));
    });
}

/* Floating Particles */
function initParticles() {
    const masthead = document.querySelector('.masthead');
    if (!masthead) return;

    // Create particles container
    const container = document.createElement('div');
    container.id = 'particles-container';
    masthead.appendChild(container);

    // Create particles
    const particleCount = 40; // Increased count
    for (let i = 0; i < particleCount; i++) {
        createDataParticle(container, i);
    }
}

function createDataParticle(container, index) {
    const particle = document.createElement('div');
    particle.className = 'particle';

    // Data symbols
    const symbols = ['0', '1', '$', '%', '∑', 'π', '{ }', '</>'];
    particle.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Random positioning and timing
    const size = Math.random() * 10 + 10; // 10px to 20px
    const left = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15; // Slow float

    particle.style.cssText = `
        left: ${left}%;
        font-size: ${size}px;
        animation-delay: -${delay}s; /* Start immediately at different offsets */
        animation-duration: ${duration}s;
    `;

    container.appendChild(particle);
}

/* Scroll-Triggered Animations */
function initScrollAnimations() {
    // Add reveal class to elements
    const sections = document.querySelectorAll('.card, .col-lg-4, .col-lg-8, .col-md-6');
    sections.forEach((section, index) => {
        section.classList.add('reveal');
        section.style.transitionDelay = `${index * 0.1}s`;
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                // Trigger skill bar animations
                const skillBars = entry.target.querySelectorAll('.skill-bar-fill');
                skillBars.forEach(bar => {
                    const width = bar.getAttribute('data-width');
                    if (width) {
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 300);
                    }
                });
            }
        });
    }, observerOptions);

    document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .skill-bar-container').forEach(el => {
        observer.observe(el);
    });
}

/* Typing Effect */
function initTypingEffect() {
    const typingElement = document.querySelector('.typing-container');
    if (!typingElement) return;

    const texts = [
        'Data Scientist',
        'ML Engineer',
        'Analytics Expert',
        'Python Developer'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const current = texts[textIndex];

        if (isDeleting) {
            typingElement.textContent = current.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = current.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === current.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

/* Stats Counter Animation */
function initStatsCounter() {
    const counters = document.querySelectorAll('.stat-number');

    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                entry.target.classList.add('counted');
                animateCounter(entry.target);
            }
        });
    }, observerOptions);

    counters.forEach(counter => observer.observe(counter));
}

function animateCounter(element) {
    const target = parseInt(element.getAttribute('data-target'));
    const suffix = element.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.round(current) + suffix;
    }, 16);
}

/* 3D Tilt Effect */
function initTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card, .cyber-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

/* Add Cyberpunk Classes to Existing Elements */
function addCyberpunkClasses() {
    // Navigation
    const nav = document.getElementById('mainNav');
    if (nav) nav.classList.add('cyber-nav');

    // Masthead
    const masthead = document.querySelector('.masthead');
    if (masthead) masthead.classList.add('cyber-masthead');

    // Sections
    document.querySelectorAll('.about-section').forEach(el => el.classList.add('cyber-section'));
    document.querySelectorAll('.projects-section').forEach(el => el.classList.add('cyber-section'));
    document.querySelectorAll('.signup-section').forEach(el => el.classList.add('cyber-section'));

    // Footer
    const footer = document.querySelector('.footer');
    if (footer) footer.classList.add('cyber-footer');

    // Cards
    document.querySelectorAll('.card').forEach(el => {
        el.classList.add('cyber-card');
        el.classList.add('tilt-card');
    });

    // Form inputs
    document.querySelectorAll('.form-control').forEach(el => el.classList.add('cyber-input'));

    // Buttons
    document.querySelectorAll('.btn-primary').forEach(el => el.classList.add('cyber-btn'));

    // Add gradient text to main heading
    const mainHeading = document.querySelector('.masthead h1');
    if (mainHeading) mainHeading.classList.add('gradient-text');

    // Add scanlines effect
    document.body.classList.add('scanlines');
}

/* Theme toggle is handled in default.html - removed duplicate to avoid conflicts */
