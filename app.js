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

    // Passport Elements
    const passEst = document.getElementById('pass-established');
    const passArea = document.getElementById('pass-area');
    const passPop = document.getElementById('pass-population');
    const passUnemp = document.getElementById('pass-unemployment');
    const passPov = document.getElementById('pass-poverty');
    const passInd = document.getElementById('pass-industrial');

    // Projects List
    const projectsList = document.getElementById('projects-list');
    const totalSummary = document.getElementById('total-summary-value');

    function initCharts() {
        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { position: 'bottom', labels: { boxWidth: 12, font: { size: 10 } } }
            }
        };

        // Pie Chart
        charts.pie = new Chart(document.getElementById('pieChart'), {
            type: 'pie',
            data: {
                labels: ['Sanoat', 'Infratuzilma', 'Ijtimoiy', 'Boshqa'],
                datasets: [{
                    data: [0, 0, 0, 0],
                    backgroundColor: ['#1a5d1a', '#f4d03f', '#2d8a2d', '#d4ac0d']
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
                    backgroundColor: '#1a5d1a'
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
                    backgroundColor: ['#2d8a2d', '#f4d03f']
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
                    backgroundColor: ['rgba(26, 93, 26, 0.7)', 'rgba(244, 208, 63, 0.7)', 'rgba(45, 138, 45, 0.7)', 'rgba(212, 172, 13, 0.7)']
                }]
            },
            options: chartOptions
        });
    }

    function updateDashboard(region) {
        // Update KPIs
        kpiFunds.innerText = region.kpi.totalFunds;
        kpiProjects.innerText = region.kpi.projectsCount;
        kpiNeighborhoods.innerText = region.kpi.neighborhoodsCount || '-';
        kpiJobs.innerText = region.kpi.newJobs;

        // Update Passport
        passEst.innerText = region.passport.established;
        passArea.innerText = region.passport.area;
        passPop.innerText = region.passport.population;
        passUnemp.innerText = region.passport.unemployment;
        passPov.innerText = region.passport.poverty;
        passInd.innerText = region.passport.industrial;

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
        projectsList.innerHTML = '';
        region.projects.forEach(p => {
            const card = document.createElement('div');
            card.className = 'project-card';
            card.innerHTML = `
                <h4>${p.name}</h4>
                <div class="funds">${p.funds} mlrd so'm</div>
                <p class="desc">${p.desc}</p>
            `;
            projectsList.appendChild(card);
        });
        totalSummary.innerText = `${region.kpi.totalFunds} mlrd so'm`;
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
                
                // Remove existing sublists
                document.querySelectorAll('.neighborhood-list').forEach(ul => ul.remove());
                
                // Add neighborhood list
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

            if (d.type === 'severe') {
                severeList.appendChild(li);
            } else {
                newList.appendChild(li);
            }
        });

        // Select first district by default
        const first = document.querySelector('.region-item');
        if (first) first.click();
    }

    initCharts();
    renderList();
});
