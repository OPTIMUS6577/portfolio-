document.addEventListener('DOMContentLoaded', () => {
    // Navigation Logic
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.view-section');

    function switchView(target) {
        // Update active link
        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === target) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show target section
        sections.forEach(sec => {
            if (sec.id === `view-${target}`) {
                sec.style.display = 'block';
            } else {
                sec.style.display = 'none';
            }
        });

        // Scroll to top of content
        document.getElementById('main-content').scrollTop = 0;
    }

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchView(link.getAttribute('data-target'));
        });
    });

    // Handle "New Project" buttons
    const newProjectBtns = document.querySelectorAll('#btn-new-project-sidebar, #btn-new-project-main');
    newProjectBtns.forEach(btn => {
        btn.onclick = () => switchView('contact');
    });

    // Handle Service Card clicks
    document.querySelectorAll('.s-item').forEach(card => {
        card.onclick = () => {
            const serviceName = card.getAttribute('data-service');
            const select = document.getElementById('service-select');
            if (select) select.value = serviceName;
            switchView('contact');
        };
    });

    // Form Handling
    const contactForm = document.getElementById('lab-contact-form');
    const BOT_TOKEN = '8469015792:AAHer6z93IlMyN_hF-1LPJdmMTcD3Zw77p4';
    const CHAT_ID = '1198878759';

    if (contactForm) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button');
            const originalBtnText = submitBtn.innerHTML;

            const name = document.getElementById('name').value;
            const phone = document.getElementById('phone').value;
            const service = document.getElementById('service-select').value;
            const msg = document.getElementById('message').value;

            submitBtn.innerHTML = 'YUBORILMOQDA...';
            submitBtn.disabled = true;

            const telegramMessage = `💼 *WORK HUB: NEW INQUIRY*\n\n👤 *Ism:* ${name}\n📞 *Tel:* ${phone}\n🛠️ *Xizmat:* ${service}\n💬 *Xabar:* ${msg || 'Yo\'q'}\n\n_Sent via Enterprise Console_`;

            try {
                // Send to Telegram
                await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
                });

                // Save to LocalStorage
                const orders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
                orders.push({ id: Date.now(), name, phone, service, message: msg, date: new Date().toISOString() });
                localStorage.setItem('workhub_orders', JSON.stringify(orders));

                alert('Muvaffaqiyatli! Tez orada bog\'lanamiz.');
                contactForm.reset();
                renderActivities();
                switchView('overview');
            } catch (err) {
                console.error(err);
                alert('Xatolik yuz berdi.');
            } finally {
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        });
    }

    // Render Activities in Dashboard
    function renderActivities() {
        const list = document.getElementById('recent-activities');
        if (!list) return;

        const orders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
        if (orders.length === 0) {
            list.innerHTML = `
                <div class="item-row">
                    <div class="item-icon">📦</div>
                    <div class="item-details">
                        <h4>Apple Store Online</h4>
                        <p>Hozircha amallar yo'q. Bu namuna.</p>
                    </div>
                    <div class="item-meta">
                        <span class="item-val">-24.5M</span>
                        <span class="item-status st-success">NAMUNA</span>
                    </div>
                </div>
            `;
            return;
        }

        const icons = { 'Veb-sayt': '🌐', 'Telegram Bot': '🤖', 'Dizayn': '🎨', 'Boshqa': '📝' };

        list.innerHTML = orders.reverse().slice(0, 5).map(o => `
            <div class="item-row">
                <div class="item-icon">${icons[o.service] || '📂'}</div>
                <div class="item-details">
                    <h4>${o.name}</h4>
                    <p>${o.service.toUpperCase()} - ${new Date(o.date).toLocaleDateString()}</p>
                </div>
                <div class="item-meta">
                    <span class="item-val plus">+BUYURTMA</span>
                    <span class="item-status st-pending">JARAYONDA</span>
                </div>
            </div>
        `).join('');
    }

    renderActivities();

    // Stats Animation (Mock)
    const bars = document.querySelectorAll('.bar-box');
    bars.forEach(bar => {
        const h = bar.style.height;
        bar.style.height = '0';
        setTimeout(() => bar.style.height = h, 500);
    });
});
