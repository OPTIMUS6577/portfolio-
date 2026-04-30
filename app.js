// Simple micro-animations using Intersection Observer
document.addEventListener('DOMContentLoaded', () => {
    const workDatabase = [
        {
            role: 'Work Hub Innovation',
            meta: 'CREATIVE HUB / 2024 - PRESENT',
            description: "Biznesingiz uchun professional saytlar, botlar va ilovalar yaratish platformasi.",
            link: 'workhub/index.html'
        },
        {
            role: 'IT Company Backend Developer',
            meta: 'NEON VOID STUDIO / 2022 - 2023',
            description: "G'ayritabiiy brendlar uchun immersiv tajribalar yaratishga rahbarlik."
        }
    ];

    const timelineContainer = document.getElementById('career-timeline');
    if (timelineContainer) {
        timelineContainer.innerHTML = workDatabase
            .map((item) => `
                <div class="timeline-item" ${item.link ? `onclick="window.location.href='${item.link}'" style="cursor: pointer;"` : ''}>
                    <div class="timeline-dot"></div>
                    <div class="timeline-content">
                        <h3>${item.role} ${item.link ? '<span style="font-size: 0.7rem; color: var(--accent-color); margin-left: 10px;">VIEW PROJECT ↗</span>' : ''}</h3>
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
        const contactBtn = contactForm.querySelector('.transmit-btn');
        if (contactBtn) {
            // Force visible button text in case cached CSS overrides styles.
            contactBtn.innerHTML = '<span class="btn-label">REGISTER</span>';
        }
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Get form data
            const name = document.getElementById('contact-name').value;
            const email = document.getElementById('contact-email').value;
            const phone = document.getElementById('contact-phone').value;
            const message = document.getElementById('contact-message').value;
            
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<span class="btn-label">TRANSMITTING...</span>';
            btn.disabled = true;

            const BOT_TOKEN = '8469015792:AAHer6z93IlMyN_hF-1LPJdmMTcD3Zw77p4'; 
            const CHAT_ID = '1198878759';
            const text = `🔥 Yangi Xabar (Portfolio)\n\n👤 Ism: ${name}\n📧 Email: ${email}\n📝 Xabar: ${message}\n📞 Telefon: ${phone}`;
            
            // Prepare Data for Netlify
            const formData = new FormData(contactForm);
            formData.append('form-name', 'portfolio-contact');

            try {
                // 1. Send to Telegram & Netlify simultaneously
                const [tgRes, netlifyRes] = await Promise.all([
                    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ chat_id: CHAT_ID, text: text })
                    }),
                    fetch('/', {
                        method: 'POST',
                        body: new URLSearchParams(formData).toString(),
                        headers: { "Content-Type": "application/x-www-form-urlencoded" }
                    })
                ]);
                
                if (tgRes.ok || netlifyRes.ok) {
                    // Create beautiful notification
                    const notification = document.createElement('div');
                    notification.style.cssText = `position: fixed; bottom: 30px; right: 30px; background: rgba(20, 20, 22, 0.95); border: 1px solid var(--accent-color); color: var(--text-primary); padding: 20px 25px; border-radius: 12px; box-shadow: 0 0 20px rgba(255, 255, 255, 0.15); z-index: 1000; font-family: var(--font-main); transform: translateY(100px); opacity: 0; transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55); display: flex; align-items: center; gap: 15px;`;
                    notification.innerHTML = `<div style="background: var(--accent-color); color: #000; width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold;">✓</div><div><h4 style="margin: 0; font-family: var(--font-heading); letter-spacing: 1px;">Muvaffaqiyatli!</h4><p style="margin: 5px 0 0; font-size: 0.85rem; color: var(--text-secondary);">Xabar Telegramingizga va bazaga tushdi.</p></div>`;
                    document.body.appendChild(notification);
                    requestAnimationFrame(() => { notification.style.transform = 'translateY(0)'; notification.style.opacity = '1'; });
                    setTimeout(() => {
                        notification.style.transform = 'translateY(100px)'; notification.style.opacity = '0';
                        setTimeout(() => notification.remove(), 400);
                    }, 4000);
                    contactForm.reset();
                }
            } catch (error) {
                console.error("Xatolik yuz berdi: ", error);
                alert("Internetda yoki botda xatolik yuz berdi!");
            } finally {
                btn.innerHTML = originalText;
                btn.disabled = false;
                contactForm.reset();
            }
        });
    }
});
