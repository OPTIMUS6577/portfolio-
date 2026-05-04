document.addEventListener('DOMContentLoaded', () => {
    // Register Service Worker for PWA
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('./sw.js')
            .then(() => console.log('Work Hub Service Worker Registered'))
            .catch(err => console.log('SW Registration Failed:', err));
    }

    const contactForm = document.getElementById('lab-contact-form');
    
    // --- 3D Rotating Planet (Three.js) ---
    function initPlanet() {
        const container = document.getElementById('planet-container');
        if (!container) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        container.appendChild(renderer.domElement);

        // Planet Geometry
        const geometry = new THREE.IcosahedronGeometry(2.5, 3);
        const material = new THREE.MeshPhongMaterial({
            color: 0xbc13fe,
            wireframe: true,
            transparent: true,
            opacity: 0.8,
            emissive: 0xbc13fe,
            emissiveIntensity: 0.5
        });
        const planet = new THREE.Mesh(geometry, material);
        scene.add(planet);

        // Core glow
        const coreGeo = new THREE.SphereGeometry(1.8, 32, 32);
        const coreMat = new THREE.MeshBasicMaterial({ 
            color: 0xbc13fe, 
            transparent: true, 
            opacity: 0.2 
        });
        const core = new THREE.Mesh(coreGeo, coreMat);
        scene.add(core);

        // Lighting
        const mainLight = new THREE.PointLight(0xffffff, 2, 100);
        mainLight.position.set(10, 10, 10);
        scene.add(mainLight);
        
        const blueLight = new THREE.PointLight(0x4e9ddd, 2, 100);
        blueLight.position.set(-10, -10, 10);
        scene.add(blueLight);

        scene.add(new THREE.AmbientLight(0x404040));

        camera.position.z = 6;

        function animate() {
            requestAnimationFrame(animate);
            planet.rotation.y += 0.003;
            planet.rotation.x += 0.001;
            core.rotation.y -= 0.002;
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    }
    initPlanet();
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
const bannerImages = ['images/banner1.png'];
const motionImages = ['images/motion1.png'];
const logoImages = ['images/logo1.png'];

        // Open Modal on Card Click
        document.querySelectorAll('.s-card').forEach(card => {
            card.addEventListener('click', () => {
                const category = card.getAttribute('data-category');
                const mainService = card.querySelector('h4').innerText.trim();
                
                // Show specific images for specific creative services
                if (mainService === 'Banner Xizmati') {
                    showImagesModal("BANNER", mainService, bannerImages);
                } else if (mainService === 'Video yaratish' || mainService === 'Motion Video') {
                    showImagesModal("VIDEO", "Motion Video", motionImages);
                } else if (mainService === 'Logotip dizayn' || mainService === 'Logotip Dizayn') {
                    showImagesModal("LOGOTIP", "Logotip Dizayn", logoImages);
                } else if (subServicesData[category]) {
                    showModal(mainService, subServicesData[category]);
                } else {
                    // Fallback for cards without specific sub-services
                    selectService(mainService);
                }
            });
        });

        // Show specific images in modal
        function showImagesModal(tagText, title, imagesArray) {
            document.querySelector('.modal-tag').innerText = tagText;
            modalTitle.innerText = title;
            subServicesList.innerHTML = '';
            imagesArray.forEach(src => {
                const imgDiv = document.createElement('div');
                imgDiv.className = 'banner-image';
                imgDiv.innerHTML = `<img src="${src}" alt="${title}" style="max-width:100%;border-radius:8px;margin-bottom:1rem; box-shadow: 0 5px 15px rgba(0,0,0,0.3);">`;
                subServicesList.appendChild(imgDiv);
            });
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        }

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

    // --- User Session & Dashboard Logic ---
    function checkUserSession() {
        const user = JSON.parse(localStorage.getItem('workhub_user'));
        if (user) {
            updateUserUI(user);
        }
    }

    function updateUserUI(user) {
        const userDash = document.getElementById('user-dashboard');
        const contactSec = document.getElementById('contact');
        const hero = document.querySelector('.hero');
        const dashLink = document.querySelector('a[href="admin.html"]');

        if (userDash) {
            userDash.style.display = 'block';
            document.getElementById('user-welcome').innerHTML = `XUSH KELIBSIZ, <span>${user.name.toUpperCase()}</span>`;
            renderUserOrders(user.phone);
        }

        if (contactSec) contactSec.style.display = 'none';
        
        // Update menu link
        if (dashLink && dashLink.innerText === 'DASHBOARD') {
            dashLink.href = '#user-dashboard';
            dashLink.onclick = (e) => {
                e.preventDefault();
                document.getElementById('user-dashboard').scrollIntoView({ behavior: 'smooth' });
            };
        }
    }

    function renderUserOrders(phone) {
        const orders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
        const userOrders = orders.filter(o => o.phone === phone);
        const list = document.getElementById('user-orders-list');
        
        if (!list) return;

        if (userOrders.length === 0) {
            list.innerHTML = '<div class="empty-state">Hozircha so\'rovlar yo\'q.</div>';
            return;
        }

        const smap = {site:'Sayt', bot:'Bot', app:'Ilova', game:'O\'yin', ai:'AI', creative:'Kreativ', dev:'Development', intel:'Smart AI', network:'Nexus'};

        list.innerHTML = userOrders.reverse().map(o => `
            <div class="u-order-item">
                <div class="u-order-info">
                    <h5>${smap[o.service] || o.service}</h5>
                    <p>${new Date(o.date).toLocaleDateString()}</p>
                </div>
                <div class="u-order-status">QABUL QILINDI</div>
            </div>
        `).join('');
        
        // Update stats
        const statsVals = document.querySelectorAll('.u-stat-val');
        if (statsVals.length > 0) statsVals[0].innerText = userOrders.length;
    }

    const logoutBtn = document.getElementById('user-logout');
    if (logoutBtn) {
        logoutBtn.onclick = () => {
            localStorage.removeItem('workhub_user');
            location.reload();
        };
    }

    checkUserSession();

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

            // Save to localStorage for Admin Panel
            const newOrder = {
                id: Date.now(),
                name: name,
                phone: phone,
                service: service || 'other',
                message: otherMsg,
                date: new Date().toISOString()
            };

            try {
                const existingOrders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
                existingOrders.push(newOrder);
                localStorage.setItem('workhub_orders', JSON.stringify(existingOrders));
            } catch (storageErr) { console.error(storageErr); }

            // Save User Session
            localStorage.setItem('workhub_user', JSON.stringify({ name: name, phone: phone }));

            // Success notification & Switch to Dashboard
            alert('Muvaffaqiyatli! Xush kelibsiz.');
            updateUserUI({ name: name, phone: phone });
            document.getElementById('user-dashboard').scrollIntoView({ behavior: 'smooth' });
            
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

    document.querySelectorAll('.s-card, .service-category, .process-item, .team-card, .blog-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });

    // --- Portfolio Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const portfolioCards = document.querySelectorAll('.p-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Active state
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            portfolioCards.forEach(card => {
                if (filter === 'all' || card.getAttribute('data-category') === filter) {
                    card.style.display = 'block';
                    setTimeout(() => card.style.opacity = '1', 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => card.style.display = 'none', 300);
                }
            });
        });
    });

    // --- FAQ Accordion ---
    document.querySelectorAll('.faq-question').forEach(item => {
        item.addEventListener('click', () => {
            const parent = item.parentElement;
            const isActive = parent.classList.contains('active');
            
            // Close all
            document.querySelectorAll('.faq-item').forEach(faq => {
                faq.classList.remove('active');
            });
            
            // Toggle current
            if (!isActive) {
                parent.classList.add('active');
            }
        });
    });

    // --- Particle Canvas Background ---
    const canvas = document.getElementById('particles-bg');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let width, height;
        let particles = [];

        function resize() {
            width = canvas.width = window.innerWidth;
            height = canvas.height = window.innerHeight;
        }

        window.addEventListener('resize', resize);
        resize();

        class Particle {
            constructor() {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
                this.size = Math.random() * 2;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.opacity = Math.random() * 0.5;
            }
            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > width) this.x = 0;
                if (this.x < 0) this.x = width;
                if (this.y > height) this.y = 0;
                if (this.y < 0) this.y = height;
            }
            draw() {
                ctx.fillStyle = `rgba(188, 19, 254, ${this.opacity})`;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < 50; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                p.update();
                p.draw();
            });
            requestAnimationFrame(animate);
        }
        animate();
    }

    // --- Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-mode');
            themeBtn.innerText = document.body.classList.contains('light-mode') ? '🌙' : '☀️';
        });
    }

    // --- Language Switcher (Simple) ---
    const translations = {
        uz: { cases_title: "LOYIHALAR TAHLILI", calc_title: "NARX KALKULYATORI", book_title: "ONLAYN UCHRASHUV" },
        ru: { cases_title: "КЕЙСЫ", calc_title: "КАЛЬКУЛЯТОР ЦЕН", book_title: "ОНЛАЙН ВСТРЕЧА" },
        en: { cases_title: "CASE STUDIES", calc_title: "PRICING CALCULATOR", book_title: "ONLINE BOOKING" }
    };
    const langSwitch = document.getElementById('lang-switch');
    if (langSwitch) {
        langSwitch.addEventListener('change', (e) => {
            const lang = e.target.value;
            document.querySelectorAll('[data-i18n]').forEach(el => {
                const key = el.getAttribute('data-i18n');
                if (translations[lang] && translations[lang][key]) {
                    el.innerText = translations[lang][key];
                }
            });
        });
    }

    // --- Pricing Calculator ---
    const serviceChecks = document.querySelectorAll('.service-check');
    const totalPriceEl = document.getElementById('total-price');
    const calcOrderBtn = document.getElementById('calc-order-btn');
    
    if (serviceChecks.length > 0) {
        serviceChecks.forEach(check => {
            check.addEventListener('change', () => {
                let total = 0;
                serviceChecks.forEach(c => {
                    if (c.checked) total += parseInt(c.value);
                });
                totalPriceEl.innerText = total;
            });
        });

        calcOrderBtn.addEventListener('click', () => {
            const selectedServices = Array.from(serviceChecks)
                .filter(c => c.checked)
                .map(c => c.getAttribute('data-name'))
                .join(', ');
            
            if (!selectedServices) {
                alert('Iltimos, kamida bitta xizmatni tanlang!');
                return;
            }

            serviceInput.value = selectedServices;
            serviceDisplay.value = "Kalkulyatordan tanlandi";
            document.getElementById('other-message').value = `Tanlangan xizmatlar: ${selectedServices}\nTaxminiy narx: $${totalPriceEl.innerText}`;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }

    // --- Floating Chat ---
    const floatingChat = document.getElementById('floating-chat');
    const chatWindow = document.getElementById('chat-window');
    const closeChat = document.getElementById('close-chat');
    const sendChatBtn = document.getElementById('send-chat');
    const chatMsgInput = document.getElementById('chat-msg');
    const chatBody = document.getElementById('chat-body');

    if (floatingChat) {
        floatingChat.addEventListener('click', () => {
            chatWindow.classList.add('active');
            floatingChat.style.display = 'none';
        });

        closeChat.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            floatingChat.style.display = 'flex';
        });

        sendChatBtn.addEventListener('click', async () => {
            const msg = chatMsgInput.value.trim();
            const userInfo = document.getElementById('chat-user-info').value.trim();
            if (!msg) return;
            
            // Add user message
            const userP = document.createElement('p');
            userP.className = 'user-msg';
            userP.innerText = msg;
            chatBody.appendChild(userP);
            
            chatMsgInput.value = '';
            chatBody.scrollTop = chatBody.scrollHeight;

            // Send to Telegram
            const chatTelegramMsg = `💬 *WORK HUB: NEW CHAT MESSAGE*\n\n👤 *Kimdan:* ${userInfo || 'Noma\'lum'}\n📩 *Xabar:* ${msg}\n\n_Sent via Live Chat_`;
            try {
                fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: CHAT_ID, text: chatTelegramMsg, parse_mode: 'Markdown' }),
                });
            } catch (err) {
                console.error('Chat telegram error:', err);
            }

            // Simple bot reply
            setTimeout(() => {
                const botP = document.createElement('p');
                botP.className = 'bot-msg';
                botP.innerText = "Xabaringiz qabul qilindi. Tez orada operator javob beradi yoki Telegram orqali bog'lanishingiz mumkin.";
                chatBody.appendChild(botP);
                chatBody.scrollTop = chatBody.scrollHeight;
            }, 1000);
        });
    }

    // --- Booking System ---
    const bookBtn = document.getElementById('book-btn');
    if (bookBtn) {
        bookBtn.addEventListener('click', async () => {
            const date = document.getElementById('book-date').value;
            const time = document.getElementById('book-time').value;
            if(!date) {
                alert("Iltimos, sanani tanlang!");
                return;
            }

            const bookingMsg = `📅 *WORK HUB: NEW BOOKING*\n\n🗓️ *Sana:* ${date}\n🕒 *Vaqt:* ${time}\n\n_Sent via Booking System_`;
            
            try {
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: CHAT_ID, text: bookingMsg, parse_mode: 'Markdown' }),
                });
            } catch (err) { console.error(err); }

            alert(`Uchrashuv muvaffaqiyatli belgilandi!\nSana: ${date}\nVaqt: ${time}\nTez orada aloqaga chiqamiz.`);
            document.getElementById('other-message').value = `Uchrashuv band qilindi: ${date} soat ${time}`;
            document.getElementById('contact').scrollIntoView({ behavior: 'smooth' });
        });
    }
});
