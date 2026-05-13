document.addEventListener('DOMContentLoaded', () => {
    const data = window.regionsData;
    let charts = {};

    // DOM Elements
    const severeList = document.getElementById('severe-districts');
    const newList = document.getElementById('new-districts');
    
    // KPI Elements
    const kpiFunds = document.querySelector('#kpi-funds .kpi-value');
    const kpiProjects = document.querySelector('#kpi-projects .kpi-value');
    const kpiNeighborhoods = document.querySelector('#kpi-neighborhoods .kpi-value');
    const kpiJobs = document.querySelector('#kpi-jobs .kpi-value');

    function animateValue(obj, start, end, duration) {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            const val = Math.floor(progress * (end - start) + start);
            obj.innerHTML = val.toLocaleString();
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }

    function initCharts() {
        Chart.defaults.color = '#a0a8a0';
        Chart.defaults.font.family = "'Inter', sans-serif";

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { 
                    position: 'bottom', 
                    labels: { 
                        boxWidth: 10, 
                        padding: 20,
                        font: { size: 11, weight: '600' },
                        color: '#fff'
                    } 
                },
                tooltip: {
                    backgroundColor: 'rgba(10, 17, 10, 0.9)',
                    titleFont: { size: 14, weight: '800' },
                    bodyFont: { size: 12 },
                    padding: 12,
                    borderColor: 'rgba(255,255,255,0.1)',
                    borderWidth: 1
                }
            },
            scales: {
                r: { grid: { color: 'rgba(255,255,255,0.05)' }, angleLines: { color: 'rgba(255,255,255,0.05)' }, pointLabels: { color: '#a0a8a0' } },
                x: { grid: { display: false }, ticks: { color: '#a0a8a0' } },
                y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#a0a8a0' } }
            }
        };

        const colors = ['#00b36e', '#f1c40f', '#00d2ff', '#ff4d4d', '#bc13fe'];

        // Pie Chart
        charts.pie = new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: ['Sanoat', 'Infratuzilma', 'Ijtimoiy', 'Boshqa'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: colors,
                    borderWidth: 0,
                    hoverOffset: 20
                }]
            },
            options: chartOptions
        });

        // Bar Chart
        charts.bar = new Chart(document.getElementById('barChart'), {
            type: 'bar',
            data: {
                labels: ['Sektor 1', 'Sektor 2', 'Sektor 3', 'Sektor 4', 'Sektor 5'],
                datasets: [{
                    label: 'Miqdor (mlrd)',
                    data: [0, 0, 0, 0, 0],
                    backgroundColor: 'rgba(0, 179, 110, 0.7)',
                    borderRadius: 8,
                    hoverBackgroundColor: '#00b36e'
                }]
            },
            options: chartOptions
        });

        // Donut Chart
        charts.donut = new Chart(document.getElementById('donutChart'), {
            type: 'doughnut',
            data: {
                labels: ['Infratuzilma', 'Ijtimoiy'],
                datasets: [{
                    data: [0, 0],
                    backgroundColor: ['#00b36e', '#f1c40f'],
                    borderWidth: 0,
                    cutout: '70%'
                }]
            },
            options: chartOptions
        });

        // Polar Chart
        charts.polar = new Chart(document.getElementById('polarChart'), {
            type: 'polarArea',
            data: {
                labels: ['Sanoat', 'Infratuzilma', 'Ijtimoiy', 'Boshqa'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: colors.map(c => c + 'aa'),
                    borderColor: 'transparent'
                }]
            },
            options: chartOptions
        });
    }

    function updateDashboard(region) {
        // Update KPIs with animation
        const currentFunds = parseFloat(kpiFunds.innerText.replace(/,/g, '')) || 0;
        const currentJobs = parseFloat(kpiJobs.innerText.replace(/,/g, '')) || 0;
        
        animateValue(kpiFunds, currentFunds, parseFloat(region.kpi.totalFunds), 800);
        animateValue(kpiProjects, 0, region.kpi.projectsCount, 800);
        animateValue(kpiNeighborhoods, 0, region.kpi.neighborhoodsCount || 0, 800);
        animateValue(kpiJobs, currentJobs, region.kpi.newJobs, 800);

        // Update Passport
        document.getElementById('pass-established').innerText = region.passport.established;
        document.getElementById('pass-area').innerText = region.passport.area;
        document.getElementById('pass-population').innerText = region.passport.population;
        document.getElementById('pass-unemployment').innerText = region.passport.unemployment + '%';
        document.getElementById('pass-poverty').innerText = region.passport.poverty + '%';
        document.getElementById('pass-industrial').innerText = region.passport.industrial;

        // Update Charts
        charts.pie.data.datasets[0].data = region.charts.pie;
        charts.pie.update();

        charts.bar.data.datasets[0].data = region.charts.bar;
        charts.bar.update();

        charts.donut.data.datasets[0].data = region.charts.donut;
        charts.donut.update();

        charts.polar.data.datasets[0].data = region.charts.polar;
        charts.polar.update();

        // Update Projects
        const projectsList = document.getElementById('projects-list');
        projectsList.innerHTML = '';
        region.projects.forEach((p, i) => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.style.animationDelay = `${0.1 * i}s`;
            card.innerHTML = `
                <h4>${p.name}</h4>
                <span class="funds">${p.funds} mlrd so'm</span>
                <p class="desc">${p.desc}</p>
            `;
            projectsList.appendChild(card);
        });
        document.getElementById('total-summary-value').innerText = `${region.kpi.totalFunds} mlrd so'm`;
    }

    function renderList() {
        data.districts.forEach(d => {
            const li = document.createElement('li');
            li.className = 'region-item';
            li.innerHTML = `<i class="fas ${d.icon}"></i> <span>${d.name}</span>`;
            li.dataset.id = d.id;
            
            li.addEventListener('click', (e) => {
                document.querySelectorAll('.region-item, .neighborhood-item').forEach(el => el.classList.remove('active'));
                li.classList.add('active');
                
                document.querySelectorAll('.neighborhood-list').forEach(ul => ul.remove());
                
                const subUl = document.createElement('ul');
                subUl.className = 'neighborhood-list';
                
                const neighborhoodItems = data.neighborhoods.filter(n => n.parentId === d.id);
                neighborhoodItems.forEach(n => {
                    const subLi = document.createElement('li');
                    subLi.className = 'neighborhood-item';
                    subLi.innerText = n.name;
                    subLi.addEventListener('click', (ev) => {
                        ev.stopPropagation();
                        document.querySelectorAll('.neighborhood-item').forEach(el => el.classList.remove('active'));
                        subLi.classList.add('active');
                        updateDashboard(n);
                    });
                    subUl.appendChild(subLi);
                });
                
                li.after(subUl);
                updateDashboard(d);
            });

            if (d.type === 'severe') severeList.appendChild(li);
            else newList.appendChild(li);
        });

        const first = document.querySelector('.region-item');
        if (first) first.click();
    }

    initCharts();
    renderList();
});
