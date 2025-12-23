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

    // Localization Logic
    const translations = {
        ko: {
            "hero.subtitle": "과거의 즐거움을 현대의 기술로 재해석합니다.",
            "games.solitaire.desc": "클래식 솔리테어의 완벽한 이식. 프리미엄 애니메이션과 편안한 디자인.",
            "games.flash_dodge.desc": "극한의 반응속도를 시험하는 닷지 게임. 레트로 감성의 극한.",
            "about.desc1": "RETRO GAMES STUDIO는 80-90년대 아케이드 게임의 순수한 즐거움을 현대적인 감각으로 재현합니다.",
            "about.desc2": "우리는 단순한 복원을 넘어, 최적화된 사용자 경험과 고품질 그래픽을 통해 레트로 게임의 새로운 기준을 제시합니다."
        },
        en: {
            "hero.subtitle": "Reinterpreting the joy of the past with modern technology.",
            "games.solitaire.desc": "A perfect port of Classic Solitaire. Premium animations and comfortable design.",
            "games.flash_dodge.desc": "A dodge game testing extreme reaction speeds. The peak of retro vibes.",
            "about.desc1": "RETRO GAMES STUDIO recreates the pure joy of 80s-90s arcade games with a modern touch.",
            "about.desc2": "Beyond simple restoration, we set a new standard for retro games through optimized UX and high-quality graphics."
        }
    };

    function updateLanguage(lang) {
        // Fallback to English if language is not supported
        if (!translations[lang]) {
            lang = 'en';
        }

        const content = translations[lang];
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            if (content[key]) {
                element.textContent = content[key];
            }
        });

        // Update html lang attribute
        document.documentElement.lang = lang;

        // Update button states
        document.querySelectorAll('.lang-btn').forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });

        console.log(`Language updated to: ${lang}`);
    }

    // Detect browser language
    const userLang = navigator.language || navigator.userLanguage;
    const langCode = userLang.startsWith('ko') ? 'ko' : 'en';

    // Apply language
    updateLanguage(langCode);

    // Language Switcher Events
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.getAttribute('data-lang');
            updateLanguage(lang);
        });
    });

    console.log('RETRO GAMES STUDIO Website Initialized');
});
