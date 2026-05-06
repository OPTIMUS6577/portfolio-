const regionsData = {
    districts: [
        {
            id: "kasbi",
            name: "Kasbi tumani",
            type: "severe",
            icon: "fa-triangle-exclamation",
            passport: {
                established: "1970-yil",
                area: "0.65",
                population: "196.2",
                neighborhoodsCount: "58",
                unemployment: "9.2",
                poverty: "12.5",
                budget: "145.2",
                industrial: "450.8"
            },
            kpi: {
                totalFunds: "125.5",
                projectsCount: "42",
                neighborhoodsCount: "12",
                newJobs: "850"
            },
            charts: {
                pie: [30, 40, 20, 10], // Industry, Infra, Social, Other
                bar: [15, 25, 35, 20, 30], // Sectors
                donut: [60, 40], // Infra, Social
                polar: [80, 70, 90, 60] // Dev levels
            },
            projects: [
                { name: "Ichimlik suvi tarmog'ini tortish", funds: "12.4", desc: "5 km masofaga suv quvurlari yotqizish" },
                { name: "Maktab binosini mukammal ta'mirlash", funds: "8.2", desc: "450 o'rinli maktabni modernizatsiya qilish" },
                { name: "Yangi transformator o'rnatish", funds: "3.5", desc: "Elektr ta'minotini yaxshilash" }
            ]
        },
        {
            id: "nishon",
            name: "Nishon tumani",
            type: "severe",
            icon: "fa-triangle-exclamation",
            passport: {
                established: "1975-yil",
                area: "2.1",
                population: "155.4",
                neighborhoodsCount: "42",
                unemployment: "10.1",
                poverty: "14.2",
                budget: "112.5",
                industrial: "320.4"
            },
            kpi: {
                totalFunds: "98.2",
                projectsCount: "35",
                neighborhoodsCount: "8",
                newJobs: "620"
            },
            charts: {
                pie: [25, 35, 30, 10],
                bar: [10, 20, 40, 15, 25],
                donut: [55, 45],
                polar: [70, 60, 85, 55]
            },
            projects: [
                { name: "Yo'l infratuzilmasini yaxshilash", funds: "15.6", desc: "Ichki yo'llarni asfaltlash" },
                { name: "Tibbiyot punktini qurish", funds: "5.4", desc: "Yangi zamonaviy poliklinika" }
            ]
        },
        {
            id: "dehqonobod",
            name: "Dehqonobod tumani",
            type: "severe",
            icon: "fa-triangle-exclamation",
            passport: {
                established: "1926-yil",
                area: "4.0",
                population: "148.2",
                neighborhoodsCount: "52",
                unemployment: "11.5",
                poverty: "15.8",
                budget: "95.4",
                industrial: "210.6"
            },
            kpi: {
                totalFunds: "110.4",
                projectsCount: "48",
                neighborhoodsCount: "15",
                newJobs: "740"
            },
            charts: {
                pie: [20, 50, 20, 10],
                bar: [25, 15, 30, 20, 10],
                donut: [70, 30],
                polar: [60, 80, 65, 70]
            },
            projects: [
                { name: "Bog'cha qurish", funds: "7.8", desc: "120 o'rinli maktabgacha ta'lim muassasasi" }
            ]
        },
        {
            id: "qamashi",
            name: "Qamashi tumani",
            type: "new",
            icon: "fa-leaf",
            passport: {
                established: "1937-yil",
                area: "2.8",
                population: "274.5",
                neighborhoodsCount: "65",
                unemployment: "8.1",
                poverty: "10.5",
                budget: "210.4",
                industrial: "680.2"
            },
            kpi: {
                totalFunds: "156.8",
                projectsCount: "55",
                neighborhoodsCount: "10",
                newJobs: "1100"
            },
            charts: {
                pie: [40, 30, 20, 10],
                bar: [30, 25, 20, 15, 10],
                donut: [50, 50],
                polar: [90, 85, 80, 75]
            },
            projects: [
                { name: "IT Park filiali", funds: "18.2", desc: "Yoshlar uchun raqamli texnologiyalar markazi" }
            ]
        },
        {
            id: "yakkabog",
            name: "Yakkabog' tumani",
            type: "new",
            icon: "fa-leaf",
            passport: {
                established: "1926-yil",
                area: "1.3",
                population: "262.1",
                neighborhoodsCount: "62",
                unemployment: "7.8",
                poverty: "9.8",
                budget: "195.2",
                industrial: "720.5"
            },
            kpi: {
                totalFunds: "142.5",
                projectsCount: "50",
                neighborhoodsCount: "9",
                newJobs: "980"
            },
            charts: {
                pie: [35, 35, 20, 10],
                bar: [20, 30, 25, 15, 10],
                donut: [45, 55],
                polar: [85, 90, 75, 80]
            },
            projects: [
                { name: "Sanoat zonasi infratuzilmasi", funds: "25.4", desc: "Elektr va gaz tarmoqlarini tortish" }
            ]
        }
    ],
    neighborhoods: [
        {
            id: "n1",
            parentId: "kasbi",
            name: "Paxtakor MFY",
            type: "neighborhood",
            icon: "fa-house-user",
            passport: {
                established: "-",
                area: "0.05",
                population: "3.2",
                neighborhoodsCount: "-",
                unemployment: "8.5",
                poverty: "10.2",
                budget: "1.2",
                industrial: "5.4"
            },
            kpi: {
                totalFunds: "2.4",
                projectsCount: "3",
                neighborhoodsCount: "-",
                newJobs: "25"
            },
            charts: {
                pie: [10, 60, 20, 10],
                bar: [5, 15, 10, 5, 5],
                donut: [80, 20],
                polar: [50, 60, 55, 40]
            },
            projects: [
                { name: "Ichki yo'llarni shag'allashtirish", funds: "0.8", desc: "1.5 km masofa" }
            ]
        },
        {
            id: "n2",
            parentId: "kasbi",
            name: "Yangi hayot MFY",
            type: "neighborhood",
            icon: "fa-house-user",
            passport: {
                established: "-",
                area: "0.04",
                population: "2.8",
                neighborhoodsCount: "-",
                unemployment: "9.1",
                poverty: "11.5",
                budget: "0.9",
                industrial: "4.2"
            },
            kpi: {
                totalFunds: "1.8",
                projectsCount: "2",
                neighborhoodsCount: "-",
                newJobs: "18"
            },
            charts: {
                pie: [15, 50, 25, 10],
                bar: [8, 10, 12, 6, 4],
                donut: [70, 30],
                polar: [45, 55, 60, 35]
            },
            projects: [
                { name: "Tungi yoritish chiroqlari", funds: "0.5", desc: "30 ta quyosh panelli chiroqlar" }
            ]
        }
    ]
};

window.regionsData = regionsData;
