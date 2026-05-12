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

        let orders = [];
        try {
            orders = JSON.parse(localStorage.getItem('workhub_orders') || '[]');
            if (!Array.isArray(orders)) orders = [];
        } catch(e) {
            orders = [];
        }

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

        const icons = { 
            'Veb-sayt': '🌐', 
            'Telegram Bot': '🤖', 
            'Dizayn': '🎨', 
            'Video Montaj': '🎬',
            'Logotip dizayn': '✒️',
            'Banner xizmati': '🖼️',
            'Prezentatsiya': '📊',
            'Sun\'iy Intelekt': '🧠',
            'Boshqa': '📝' 
        };

        list.innerHTML = [...orders].reverse().slice(0, 5).map(o => `
            <div class="item-row">
                <div class="item-icon">${icons[o.service] || '📂'}</div>
                <div class="item-details">
                    <h4>${o.name || 'Noma\'lum'}</h4>
                    <p>${(o.service || 'BOSHQA').toUpperCase()} - ${new Date(o.date).toLocaleDateString()}</p>
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
    setTimeout(() => {
        bars.forEach(bar => {
            const h = bar.getAttribute('style').match(/height:\s*([\d%]+)/)?.[1] || '50%';
            bar.style.height = '0';
            setTimeout(() => bar.style.height = h, 100);
        });
    }, 500);
    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    
    if (localStorage.getItem('theme') === 'light') {
        body.classList.add('light-mode');
        if(themeToggle) themeToggle.innerText = '☀️';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light-mode');
            if (body.classList.contains('light-mode')) {
                localStorage.setItem('theme', 'light');
                themeToggle.innerText = '☀️';
            } else {
                localStorage.setItem('theme', 'dark');
                themeToggle.innerText = '🌙';
            }
        });
    }

    // Language Toggle
    const langToggle = document.getElementById('lang-toggle');
    if (langToggle) {
        let isUz = true;
        langToggle.addEventListener('click', () => {
            isUz = !isUz;
            if (isUz) {
                langToggle.innerText = '🇺🇿';
                alert("Til O'zbek tiliga o'zgardi");
            } else {
                langToggle.innerText = '🇬🇧';
                alert("Language switched to English");
            }
        });
    }
});

// Chat Widget Logic
function toggleChat() {
    const chatWidget = document.getElementById('chat-widget');
    if (chatWidget.style.display === 'flex') {
        chatWidget.style.display = 'none';
    } else {
        chatWidget.style.display = 'flex';
    }
}

function sendChatMsg() {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if (!msg) return;

    const chatBody = document.getElementById('chat-body');
    
    const userDiv = document.createElement('div');
    userDiv.className = 'chat-msg user';
    userDiv.innerText = msg;
    chatBody.appendChild(userDiv);
    
    input.value = '';
    chatBody.scrollTop = chatBody.scrollHeight;

    // Send to Telegram
    const BOT_TOKEN = '8469015792:AAHer6z93IlMyN_hF-1LPJdmMTcD3Zw77p4';
    const CHAT_ID = '1198878759';
    const telegramMessage = `💬 *WORK HUB: NEW CHAT MESSAGE*\n\n💬 *Xabar:* ${msg}\n\n_Sent via Live Chat_`;

    fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ chat_id: CHAT_ID, text: telegramMessage, parse_mode: 'Markdown' }),
    }).catch(err => console.error('Telegram Chat Error:', err));

    setTimeout(() => {
        const botDiv = document.createElement('div');
        botDiv.className = 'chat-msg bot';
        botDiv.innerText = "Xabaringiz qabul qilindi. Tez orada operator javob beradi.";
        chatBody.appendChild(botDiv);
        chatBody.scrollTop = chatBody.scrollHeight;
    }, 1000);
}

// ============================================================
// ===== KANBAN BOARD =====
// ============================================================
let kanbanTasks = JSON.parse(localStorage.getItem('kanban_tasks') || 'null') || [
    { id: 1, title: 'TechBaza landing page', desc: 'Dizayn va dasturlash', status: 'inprogress', tags: ['web'] },
    { id: 2, title: 'Logo dizayn - GullarOlami', desc: 'Logotip va brandbook', status: 'todo', tags: ['design'] },
    { id: 3, title: 'Telegram bot - savdo', desc: 'CRM integratsiya bilan', status: 'todo', tags: ['bot'] },
    { id: 4, title: 'Edu-Platforma backend', desc: 'API va database yakunlash', status: 'done', tags: ['web'] },
    { id: 5, title: 'SEO audit - Texnologiya.uz', desc: 'Onpage SEO tahlil', status: 'inprogress', tags: ['web'] },
];
let draggedTaskId = null;

function saveKanban() {
    localStorage.setItem('kanban_tasks', JSON.stringify(kanbanTasks));
}

function renderKanban() {
    const cols = { todo: [], inprogress: [], done: [] };
    kanbanTasks.forEach(t => cols[t.status] && cols[t.status].push(t));

    ['todo', 'inprogress', 'done'].forEach(col => {
        const container = document.getElementById(`cards-${col}`);
        const countEl = document.getElementById(`count-${col}`);
        if (!container) return;

        countEl.textContent = cols[col].length;
        container.innerHTML = cols[col].map(task => `
            <div class="kanban-card" draggable="true" id="task-${task.id}"
                ondragstart="dragStart(${task.id})" ondragend="dragEnd()">
                <h4>${task.title}</h4>
                <p>${task.desc}</p>
                <div class="card-tags">
                    ${task.tags.map(t => `<span class="kanban-tag tag-${t}">${t.toUpperCase()}</span>`).join('')}
                    <button onclick="deleteTask(${task.id})" style="margin-left:auto;background:rgba(255,77,77,0.15);border:none;color:#ff4d4d;border-radius:6px;padding:2px 8px;cursor:pointer;font-size:0.7rem;">✕</button>
                </div>
            </div>
        `).join('') || `<div style="color:var(--text-dim);font-size:0.85rem;text-align:center;padding:2rem 0;">Bu yerga tashlang</div>`;
    });
}

function dragStart(id) {
    draggedTaskId = id;
    document.getElementById(`task-${id}`).style.opacity = '0.5';
}

function dragEnd() {
    if (draggedTaskId) {
        const el = document.getElementById(`task-${draggedTaskId}`);
        if (el) el.style.opacity = '1';
    }
}

function dropTask(event, newStatus) {
    event.preventDefault();
    if (!draggedTaskId) return;
    const task = kanbanTasks.find(t => t.id === draggedTaskId);
    if (task) {
        task.status = newStatus;
        saveKanban();
        renderKanban();
        // Add notification for done tasks
        if (newStatus === 'done') {
            addNotification({ type: 'system', icon: '✅', title: 'Vazifa yakunlandi!', text: `"${task.title}" muvaffaqiyatli yakunlandi.` });
        }
    }
    draggedTaskId = null;
}

function deleteTask(id) {
    kanbanTasks = kanbanTasks.filter(t => t.id !== id);
    saveKanban();
    renderKanban();
}

// Drag-over highlight
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.kanban-col').forEach(col => {
        col.addEventListener('dragover', () => col.classList.add('drag-over'));
        col.addEventListener('dragleave', () => col.classList.remove('drag-over'));
        col.addEventListener('drop', () => col.classList.remove('drag-over'));
    });
    renderKanban();
    renderCalendar();
    renderNotifications();
});

// Task Modal
function openTaskModal() {
    let overlay = document.getElementById('task-modal-overlay');
    if (!overlay) {
        overlay = document.createElement('div');
        overlay.className = 'task-modal-overlay';
        overlay.id = 'task-modal-overlay';
        overlay.innerHTML = `
            <div class="task-modal">
                <h3>➕ Yangi Vazifa Qo'shish</h3>
                <div style="margin-bottom:1.2rem;">
                    <label style="font-size:0.75rem;font-weight:800;color:var(--text-dim);display:block;margin-bottom:0.5rem;">VAZIFA NOMI</label>
                    <input type="text" id="task-title-input" class="form-input" placeholder="Vazifa nomini kiriting..." required>
                </div>
                <div style="margin-bottom:1.2rem;">
                    <label style="font-size:0.75rem;font-weight:800;color:var(--text-dim);display:block;margin-bottom:0.5rem;">TAVSIF</label>
                    <input type="text" id="task-desc-input" class="form-input" placeholder="Qisqacha tavsif...">
                </div>
                <div style="margin-bottom:1.2rem;">
                    <label style="font-size:0.75rem;font-weight:800;color:var(--text-dim);display:block;margin-bottom:0.5rem;">HOLAT</label>
                    <select id="task-status-input" class="form-input">
                        <option value="todo">⏳ Kutilmoqda</option>
                        <option value="inprogress">🔄 Jarayonda</option>
                        <option value="done">✅ Yakunlandi</option>
                    </select>
                </div>
                <div style="margin-bottom:1.2rem;">
                    <label style="font-size:0.75rem;font-weight:800;color:var(--text-dim);display:block;margin-bottom:0.5rem;">TAG</label>
                    <select id="task-tag-input" class="form-input">
                        <option value="web">WEB</option>
                        <option value="design">DESIGN</option>
                        <option value="bot">BOT</option>
                        <option value="urgent">URGENT</option>
                    </select>
                </div>
                <div class="task-modal-btns">
                    <button class="modal-cancel-btn" onclick="closeTaskModal()">Bekor qilish</button>
                    <button class="new-action-btn" style="flex:1" onclick="addTask()">Saqlash</button>
                </div>
            </div>
        `;
        document.body.appendChild(overlay);
    }
    requestAnimationFrame(() => overlay.classList.add('open'));
}

function closeTaskModal() {
    const overlay = document.getElementById('task-modal-overlay');
    if (overlay) {
        overlay.classList.remove('open');
    }
}

function addTask() {
    const title = document.getElementById('task-title-input').value.trim();
    const desc = document.getElementById('task-desc-input').value.trim();
    const status = document.getElementById('task-status-input').value;
    const tag = document.getElementById('task-tag-input').value;
    if (!title) { alert("Vazifa nomini kiriting!"); return; }

    const newTask = {
        id: Date.now(),
        title, desc: desc || 'Tavsif yo\'q',
        status, tags: [tag]
    };
    kanbanTasks.push(newTask);
    saveKanban();
    renderKanban();
    closeTaskModal();
    addNotification({ type: 'system', icon: '📋', title: 'Yangi vazifa qo\'shildi!', text: `"${title}" vazifasi yaratildi.` });
}

// ============================================================
// ===== CALENDAR =====
// ============================================================
let currentCalDate = new Date();
const eventDays = [8, 10, 12, 15, 20]; // days with events in current month

function renderCalendar() {
    const grid = document.getElementById('cal-grid');
    const titleEl = document.getElementById('cal-month-title');
    if (!grid || !titleEl) return;

    const months = ['Yanvar','Fevral','Mart','Aprel','May','Iyun','Iyul','Avgust','Sentabr','Oktabr','Noyabr','Dekabr'];
    titleEl.textContent = `${months[currentCalDate.getMonth()]} ${currentCalDate.getFullYear()}`;

    // Remove old day cells (keep 7 header cells)
    const allChildren = Array.from(grid.children);
    allChildren.slice(7).forEach(c => c.remove());

    const year = currentCalDate.getFullYear();
    const month = currentCalDate.getMonth();
    const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
    const totalDays = new Date(year, month + 1, 0).getDate();
    const today = new Date();

    // Convert Sunday-first to Monday-first
    const startOffset = (firstDay === 0) ? 6 : firstDay - 1;

    for (let i = 0; i < startOffset; i++) {
        const empty = document.createElement('div');
        empty.className = 'cal-day empty';
        grid.appendChild(empty);
    }

    for (let d = 1; d <= totalDays; d++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'cal-day';
        dayEl.textContent = d;

        const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
        if (isToday) dayEl.classList.add('today');
        if (eventDays.includes(d) && !isToday) dayEl.classList.add('has-event');

        dayEl.onclick = () => {
            document.querySelectorAll('.cal-day').forEach(el => el.style.outline = '');
            dayEl.style.outline = '2px solid var(--accent)';
        };
        grid.appendChild(dayEl);
    }
}

function changeMonth(dir) {
    currentCalDate.setMonth(currentCalDate.getMonth() + dir);
    renderCalendar();
}

// ============================================================
// ===== NOTIFICATIONS =====
// ============================================================
let notifications = JSON.parse(localStorage.getItem('workhub_notifs') || 'null') || [
    { id: 1, type: 'order', icon: '📦', title: 'Yangi buyurtma keldi!', text: 'Alisher "Veb-sayt" xizmati uchun so\'rov yubordi.', time: '5 daqiqa oldin', unread: true },
    { id: 2, type: 'payment', icon: '💰', title: 'To\'lov amalga oshirildi', text: 'Malika 2,500,000 UZS to\'lov qildi. Hisobingiz yangilandi.', time: '1 soat oldin', unread: true },
    { id: 3, type: 'system', icon: '🔔', title: 'Loyiha muddati yaqinlashmoqda', text: 'Edu-Platforma loyihasi 3 kundan keyin topshirilishi kerak.', time: '2 soat oldin', unread: true },
    { id: 4, type: 'order', icon: '📋', title: 'Yangi xizmat so\'rovi', text: 'Jasur Telegram Bot yaratish bo\'yicha ariza yubordi.', time: 'Kecha', unread: false },
    { id: 5, type: 'system', icon: '✅', title: 'TechBaza loyihasi yakunlandi', text: 'Muvaffaqiyatli topshirildi va mijoz tasdiqladi.', time: '2 kun oldin', unread: false },
    { id: 6, type: 'payment', icon: '⚠️', title: 'To\'lov eslatmasi', text: 'Nexus Bot loyihasi uchun 2-qism to\'lov kutilmoqda.', time: '3 kun oldin', unread: false },
];

let currentFilter = 'all';

function saveNotifications() {
    localStorage.setItem('workhub_notifs', JSON.stringify(notifications));
    updateBadge();
}

function updateBadge() {
    const badge = document.getElementById('notif-badge');
    const unreadCount = notifications.filter(n => n.unread).length;
    if (badge) {
        badge.textContent = unreadCount;
        badge.style.display = unreadCount > 0 ? 'inline-block' : 'none';
    }
}

function renderNotifications(filter = currentFilter) {
    const list = document.getElementById('notif-list');
    if (!list) return;

    const filtered = filter === 'all' ? notifications : notifications.filter(n => n.type === filter);

    if (filtered.length === 0) {
        list.innerHTML = `<div style="text-align:center;color:var(--text-dim);padding:3rem;">🎉 Bildirishnomalar yo'q</div>`;
        return;
    }

    list.innerHTML = filtered.map(n => `
        <div class="notif-item ${n.unread ? 'unread' : ''}" id="notif-${n.id}">
            <div class="notif-icon ${n.type}">${n.icon}</div>
            <div class="notif-content">
                <h4>${n.title}</h4>
                <p>${n.text}</p>
                <div class="notif-time">${n.time}</div>
            </div>
            <button class="notif-dismiss" onclick="dismissNotif(${n.id})">✕</button>
        </div>
    `).join('');

    // Mark all visible as read
    notifications.forEach(n => { if (filter === 'all' || n.type === filter) n.unread = false; });
    saveNotifications();
}

function dismissNotif(id) {
    notifications = notifications.filter(n => n.id !== id);
    saveNotifications();
    renderNotifications(currentFilter);
}

function clearAllNotifs() {
    if (!confirm('Barcha bildirishnomalarni o\'chirmoqchimisiz?')) return;
    notifications = [];
    saveNotifications();
    renderNotifications(currentFilter);
}

function filterNotifs(btn, filter) {
    currentFilter = filter;
    document.querySelectorAll('.notif-filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    renderNotifications(filter);
}

function addNotification(notif) {
    const newNotif = {
        id: Date.now(),
        type: notif.type || 'system',
        icon: notif.icon || '🔔',
        title: notif.title,
        text: notif.text,
        time: 'Hozir',
        unread: true
    };
    notifications.unshift(newNotif);
    saveNotifications();
}

// ============================================================
// ===== BLOG LOGIC =====
// ============================================================
const blogArticles = {
    'ai-trends': {
        title: "2026-yilda Sun'iy Intellekt Trendlari",
        content: `
            <p>2026-yilda Sun'iy Intellekt (AI) nafaqat texnologik sohada, balki kundalik biznes jarayonlarining ajralmas qismiga aylanadi. Bu yerda asosiy trendlar:</p>
            <ul>
                <li><strong>Avtonom Agentlar:</strong> Endi AI nafaqat savollarga javob beradi, balki mustaqil vazifalarni bajaradi (elektron pochta yozish, uchrashuvlar belgilash).</li>
                <li><strong>Shaxsiylashtirilgan Mijoz Tajribasi:</strong> Har bir mijoz uchun individual yondashuv real vaqt rejimida shakllanadi.</li>
                <li><strong>AI va Kibernavfsizlik:</strong> Xavfsizlik tizimlari hujumlarni sodir bo'lishidan oldin prognoz qiladi.</li>
            </ul>
            <p>Biznesingizni ushbu trendlarga moslashtirish uchun hozirdan harakat qilish lozim.</p>
        `
    },
    'bot-vs-app': {
        title: "Telegram Bot vs Ilova",
        content: `
            <p>Ko'pchilik tadbirkorlar "Biznes uchun nima afzal: Mobil ilovami yoki Telegram bot?" degan savolga duch kelishadi.</p>
            <h3>Telegram Botning afzalliklari:</h3>
            <ul>
                <li>Arzonroq ishlab chiqish narxi.</li>
                <li>Mijozlar telefoniga yangi narsa yuklab olishi shart emas.</li>
                <li>Muloqot juda tez va qulay.</li>
            </ul>
            <h3>Mobil Ilovaning afzalliklari:</h3>
            <ul>
                <li>Ko'proq funksionallik va dizayn erkinligi.</li>
                <li>Brendning telefon ekranida doimiy ko'rinishi.</li>
                <li>Offline ishlash imkoniyati.</li>
            </ul>
            <p>Agar siz endigina boshlayotgan bo'lsangiz, Telegram botdan boshlash eng to'g'ri strategiya hisoblanadi.</p>
        `
    },
    'security-tips': {
        title: "Kiberxavfsizlik sirlari",
        content: `
            <p>Raqamli dunyoda ma'lumotlar xavfsizligi eng muhim masala. Biznesingizni himoya qilish uchun:</p>
            <ol>
                <li>Ikki bosqichli autentifikatsiyani (2FA) yoqing.</li>
                <li>Parollarni doimiy yangilab turing.</li>
                <li>Xodimlaringizni phishing hujumlaridan ehtiyot bo'lishga o'rgating.</li>
            </ol>
        `
    }
};

function openBlogModal(id) {
    const article = blogArticles[id];
    if (!article) return;

    const overlay = document.getElementById('blog-modal-overlay');
    const content = document.getElementById('blog-content');
    
    content.innerHTML = `
        <h2 style="font-size: 2rem; margin-bottom: 1.5rem; color: var(--accent);">${article.title}</h2>
        <div style="line-height: 1.8; color: var(--text); font-size: 1.1rem;">
            ${article.content}
        </div>
    `;
    
    overlay.classList.add('open');
}

function closeBlogModal() {
    document.getElementById('blog-modal-overlay').classList.remove('open');
}

// Attach events to blog buttons
document.addEventListener('DOMContentLoaded', () => {
    const blogBtns = document.querySelectorAll('.view-section#view-blog .blog-card .new-action-btn');
    const ids = ['ai-trends', 'bot-vs-app', 'security-tips'];
    
    blogBtns.forEach((btn, index) => {
        if (ids[index]) {
            btn.onclick = () => openBlogModal(ids[index]);
        }
    });
});

// Initialize badge on load
document.addEventListener('DOMContentLoaded', updateBadge);
