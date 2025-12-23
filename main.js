document.addEventListener('DOMContentLoaded', () => {
    // Reveal animations on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Add reveal class to sections
    const sections = document.querySelectorAll('section, .game-card, .stat-item');
    sections.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s cubic-bezier(0.25, 0.8, 0.25, 1)';
        observer.observe(el);
    });

    // Custom reveal style via JS injection or adding a CSS class
    document.head.insertAdjacentHTML('beforeend', `
        <style>
            .revealed {
                opacity: 1 !important;
                transform: translateY(0) !important;
            }
        </style>
    `);

    // Glitch effect enhancement
    const glitchElement = document.querySelector('.glitch');
    if (glitchElement) {
        setInterval(() => {
            glitchElement.classList.add('active');
            setTimeout(() => {
                glitchElement.classList.remove('active');
            }, 200);
        }, 3000);
    }

    console.log('RETRO GAMES STUDIO Website Initialized');
});
