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

    const modal = document.getElementById('service-modal');
    const modalTitle = document.getElementById('modal-title');
    const subServicesList = document.getElementById('sub-services-list');
    const closeModalBtn = document.querySelector('.close-modal');
    const serviceInput = document.getElementById('service');
    const serviceDisplay = document.getElementById('service-display');

    // Sub-service data map
    const subServicesData = {
        'dev': [
            { name: 'Landing Page', desc: 'Bir sahifali zamonaviy sayt' },
            { name: 'Vizitka Sayt', desc: 'Siz va biznesingiz uchun vizitka' },
            { name: 'Internet Magazin', desc: 'To\'liq savdo tizimi' },
            { name: 'Korporativ Sayt', desc: 'Katta kompaniyalar uchun yechim' }
        ],
        'bot': [
            { name: 'Savdo Boti', desc: 'Telegram orqali savdo qilish' },
            { name: 'Kurs/Ta\'lim Boti', desc: 'O\'quv markazlari uchun' },
            { name: 'Admin/Moderator Bot', desc: 'Guruhlarni boshqarish uchun' },
            { name: 'AI/ChatGPT Bot', desc: 'Sun\'iy intelekt integratsiyasi' }
        ],
        'creative': [
            { name: 'Motion Video', desc: 'Har xil turdagi animatsion videolar' },
            { name: 'Logotip Dizayn', desc: 'Unikal brend logotipi' },
            { name: 'Banner Xizmati', desc: 'Reklama va SMM uchun bannerlar' },
            { name: 'Prezentatsiya', desc: 'Investitsion va biznes taqdimotlar' }
        ],
        'intel': [
            { name: 'Sun\'iy Intelekt', desc: 'AI algoritmlar va modellar' },
            { name: 'Data Analytics', desc: 'Ma\'lumotlar tahlili' },
            { name: 'Kiberxavfsizlik', desc: 'Tizim xavfsizligi auditi' }
        ],
        'network': [
            { name: 'IT Ish Topish', desc: 'Vakansiyalar va rezyume yuborish' },
            { name: 'Mentor Topish', desc: 'Individual darslar va maslahat' }
        ]
    };

    // Open Modal on Card Click
    document.querySelectorAll('.s-card').forEach(card => {
        card.addEventListener('click', () => {
            const category = card.getAttribute('data-category');
            const mainService = card.querySelector('h4').innerText;
            
            if (subServicesData[category]) {
                showModal(mainService, subServicesData[category]);
            } else {
                // Fallback for cards without specific sub-services
                selectService(mainService);
            }
        });
    });

    function showModal(title, subServices) {
        document.querySelector('.modal-tag').innerText = "SELECTION";
        modalTitle.innerText = title;
        subServicesList.innerHTML = '';
        
        subServices.forEach(sub => {
            const div = document.createElement('div');
            div.className = 'sub-card';
            div.innerHTML = `
                <h5>${sub.name}</h5>
                <p>${sub.desc}</p>
            `;
            div.onclick = () => selectService(`${title}: ${sub.name}`, sub.desc);
            subServicesList.appendChild(div);
        });

        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function selectService(fullServiceName, desc = '') {
        // Change modal to a confirmation step
        document.querySelector('.modal-tag').innerText = "TAYYOR!";
        modalTitle.innerText = "Ajoyib tanlov";
        
        subServicesList.innerHTML = `
            <div style="text-align: center; width: 100%; grid-column: 1 / -1;">
                <div style="font-size: 3rem; margin-bottom: 1rem;">✅</div>
                <h3 style="color: var(--text); font-size: 1.5rem; margin-bottom: 0.5rem;">${fullServiceName}</h3>
                <p style="color: var(--text-dim); margin-bottom: 2rem;">${desc ? desc : 'Biznesingiz uchun professional yechim.'}</p>
                <button id="final-confirm-btn" style="margin: 0 auto; width: 100%; max-width: 300px;">FORMAGA O'TISH</button>
            </div>
        `;

        document.getElementById('final-confirm-btn').onclick = () => {
            serviceInput.value = fullServiceName;
            serviceDisplay.value = fullServiceName;
            
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';

            // Scroll to form
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        };
    }

    // Close Modal
    closeModalBtn.onclick = () => {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    window.onclick = (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    // Form Submission
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector('button');
        const originalBtnText = submitBtn.innerHTML;

        const name = document.getElementById('name').value;
        const phone = document.getElementById('phone').value;
        const service = serviceInput.value;
        const otherMsg = document.getElementById('other-message').value;

        submitBtn.innerHTML = 'REGISTERING...';
        submitBtn.disabled = true;

        const telegramMessage = `💼 *WORK HUB: NEW INQUIRY*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n🛠️ *Xizmat:* ${service}\n💬 *Xabar:* ${otherMsg || 'Yo\'q'}\n\n_Sent via Work Hub_`;

        const formData = new FormData(contactForm);
        formData.append('form-name', 'workhub-inquiry');

        try {
            await Promise.all([
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

            // Success notification
            alert('Muvaffaqiyatli! So\'rovingiz qabul qilindi.');
            contactForm.reset();
            serviceDisplay.value = '';
        } catch (error) {
            console.error('Submission error:', error);
            alert('Xatolik yuz berdi. Qayta urinib ko\'ring.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    // Reveal animation
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.s-card, .service-category').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
});
