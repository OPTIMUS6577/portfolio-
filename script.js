// Simple micro-animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const workDatabase = [
        {
            role: 'IT Company Backend Developer',
            meta: 'NEON VOID STUDIO / 2022 - PRESENT',
            description: "G'ayritabiiy brendlar uchun immersiv tajribalar yaratishga rahbarlik."
        },
        {
            role: 'INTERACTION ARCHITECT',
            meta: 'ETHER LABS / 2020 - 2022',
            description: 'Foydalanuvchi interfeyslari uchun murakkab animatsiya tizimlarini ishlab chiqish.'
        },
        {
            role: 'JUNIOR ALCHEMIST',
            meta: 'ORIGIN PIXELS / 2018 - 2020',
            description: "Veb-dizayn asoslari va vizual hikoyachilikda ilk qadamlar."
        }
    ];

    const timelineContainer = document.getElementById('career-timeline');
    if (timelineContainer) {
        timelineContainer.innerHTML = workDatabase
            .map((item) => `
                <div class="timeline-item">
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>${item.role}</h3>
                        <p class="timeline-meta">${item.meta}</p>
                        <p class="timeline-desc">${item.description}</p>
                    </div>
                </div>
            `)
            .join('');
    }

    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Elements to animate
    const animateElements = [
        '.hero-content',
        '.tag',
        '.timeline-item',
        '.career-left',
        '.contact-header',
        '.contact-form-container',
        '.location-card',
        '.info-card'
    ];

    animateElements.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            el.classList.add('animate-on-scroll');
            observer.observe(el);
        });
    });

    // Add CSS for animations dynamically
    const style = document.createElement('style');
    style.textContent = `
        .animate-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.2, 0.8, 0.2, 1);
        }
        .animate-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        .tag.animate-on-scroll {
            transition-delay: calc(var(--delay, 0) * 0.1s);
        }
        .info-card.animate-on-scroll {
            transition-delay: calc(var(--info-delay, 0) * 0.15s);
        }
    `;
    document.head.appendChild(style);

    // Add staggered delay to tags
    document.querySelectorAll('.tag').forEach((tag, index) => {
        tag.style.setProperty('--delay', index);
    });

    // Add staggered delay to info cards
    document.querySelectorAll('.info-card').forEach((card, index) => {
        card.style.setProperty('--info-delay', index);
    });

    // Inquiry button effect
    const inquiryBtn = document.getElementById('inquiry-trigger');
    if (inquiryBtn) {
        inquiryBtn.addEventListener('click', () => {
            const contactSection = document.getElementById('contact');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth' });
            } else {
                window.location.href = 'contact.html';
            }
        });
    }

    // Contact form handling
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.textContent;
            
            btn.textContent = 'TRANSMITTING...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Ma\'lumotlar muvaffaqiyatli uzatildi! (Data Transmitted)');
                btn.textContent = originalText;
                btn.disabled = false;
                contactForm.reset();
            }, 1500);
        });
    }
});
