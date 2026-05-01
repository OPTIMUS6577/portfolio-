document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Work Hub Service Worker Registered'))
            .catch(err => console.log('SW Registration Failed:', err));
    }

    const contactForm = document.getElementById('lab-contact-form');

    const BOT_TOKEN = '8469015792:AAHer6z93IlMyN_hF-1LPJdmMTcD3Zw77p4';
    const CHAT_ID = '1198878759';

    // Supabase Config (Buni keyinroq o'zingizning URL/Key bilan almashtirasiz)
    const SUPABASE_URL = 'https://your-project.supabase.co';
    const SUPABASE_KEY = 'your-anon-key';
    const supabase = window.supabase ? window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY) : null;

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

        // 1. Send to Telegram
        const telegramMessage = `💼 *WORK HUB: NEW INQUIRY*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n🛠️ *Xizmat:* ${finalService}\n\n_Sent via Work Hub_`;
        
        // 2. Prepare Data for Netlify
        const formData = new FormData(contactForm);
        formData.append('form-name', 'workhub-inquiry');

        try {
            // Parallel send: Telegram and Netlify
            const [tgRes, netlifyRes] = await Promise.all([
                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
                }),
                fetch('/', {
                    method: 'POST',
                    body: new URLSearchParams(formData).toString(),
                    headers: { "Content-Type": "application/x-www-form-urlencoded" }
                })
            ]);

            if (tgRes.ok || netlifyRes.ok) {
                // Success notification
                const note = document.createElement('div');
                note.style.cssText = 'position:fixed;bottom:30px;right:30px;background:rgba(6,6,18,0.95);border:1px solid #bc13fe;color:#fff;padding:20px 25px;border-radius:16px;box-shadow:0 0 30px rgba(188,19,254,0.3);z-index:1000;font-family:Outfit,sans-serif;transform:translateY(100px);opacity:0;transition:all 0.4s cubic-bezier(0.68,-0.55,0.265,1.55)';
                note.innerHTML = '<div style="display:flex;align-items:center;gap:12px"><div style="background:#bc13fe;color:#fff;width:32px;height:32px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-weight:bold">✓</div><div><b style="font-size:1rem">Muvaffaqiyatli!</b><p style="font-size:0.8rem;color:#888;margin-top:4px">So\'rovingiz qabul qilindi.</p></div></div>';
                document.body.appendChild(note);
                requestAnimationFrame(() => { note.style.transform='translateY(0)'; note.style.opacity='1'; });
                setTimeout(() => { note.style.transform='translateY(100px)'; note.style.opacity='0'; setTimeout(()=>note.remove(),400); }, 4000);
                contactForm.reset();

                // Save to localStorage for Admin Panel
                try {
                    const existingOrders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
                    const newOrder = {
                        id: Date.now(),
                        name: name,
                        phone: phone,
                        service: service === 'other' ? 'other' : service,
                        message: otherMsg,
                        date: new Date().toISOString()
                    };
                    existingOrders.push(newOrder);
                    localStorage.setItem('workhub_orders', JSON.stringify(existingOrders));
                } catch (storageErr) {
                    console.error('LocalStorage error:', storageErr);
                }
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
