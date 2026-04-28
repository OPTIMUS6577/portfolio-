document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('lab-contact-form');

    // Telegram Bot Config (Using your existing bot)
    const BOT_TOKEN = '8469015792:AAHer6z93IlMyN_hF-1LPJdmMTcD3Zw77p4';
    const CHAT_ID = '1198878759';

    const serviceSelect = document.getElementById('service');
    const otherMsgGroup = document.getElementById('other-msg-group');

    // Show/Hide other message field
    serviceSelect.addEventListener('change', (e) => {
        if (e.target.value === 'other') {
            otherMsgGroup.style.display = 'block';
        } else {
            otherMsgGroup.style.display = 'none';
        }
    });

    // Make service cards clickable
    document.querySelectorAll('.s-card').forEach(card => {
        card.addEventListener('click', () => {
            const serviceTitle = card.querySelector('h4').innerText.toLowerCase();
            const contactSection = document.getElementById('contact');
            
            // Scroll to contact
            contactSection.scrollIntoView({ behavior: 'smooth' });

            // Auto-select service in dropdown
            let optionValue = 'other';
            if (serviceTitle.includes('sayt')) optionValue = 'site';
            else if (serviceTitle.includes('bot')) optionValue = 'bot';
            else if (serviceTitle.includes('ilova')) optionValue = 'app';
            else if (serviceTitle.includes('o\'yin')) optionValue = 'game';
            else if (serviceTitle.includes('intelekt') || serviceTitle.includes('ai')) optionValue = 'ai';

            serviceSelect.value = optionValue;
            
            // Trigger change event to show/hide "other" field
            serviceSelect.dispatchEvent(new Event('change'));
            
            // If other was selected, put the service name in the message box
            if (optionValue === 'other') {
                document.getElementById('other-message').value = card.querySelector('h4').innerText;
            }
        });
    });

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;

        // Get form data
        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = serviceSelect.value;
        const otherMsg = document.getElementById('other-message').value;

        // Visual Feedback
        submitBtn.innerHTML = 'REGISTERING...';
        submitBtn.disabled = true;

        let finalService = service;
        if (service === 'other') {
            finalService = `Boshqa: ${otherMsg}`;
        }

        const message = `💼 *WORK HUB: NEW INQUIRY*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n🛠️ *Xizmat:* ${finalService}\n\n_Sent via Work Hub_`;

        try {
            const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    chat_id: CHAT_ID,
                    text: message,
                    parse_mode: 'Markdown'
                }),
            });

            if (response.ok) {
                alert('Muvaffaqiyatli! Xabar laboratoriyaga yuborildi. 🧪');
                contactForm.reset();
            } else {
                throw new Error('Telegram API Error');
            }
        } catch (error) {
            console.error('Submission error:', error);
            alert('Xatolik yuz berdi. Iltimos, qaytadan urinib ko\'ring.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Simple reveal animation on scroll
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.s-card, .service-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
