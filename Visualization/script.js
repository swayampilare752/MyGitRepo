// Sample data for smartphone sales (in millions)
const years = ["2020", "2021", "2022", "2023", "2024"];
const brands = ["Apple", "Samsung", "Xiaomi", "OnePlus", "Google"];

// Sales data
const salesData = [
    [200, 250, 270, 300, 320], // Apple
    [300, 280, 290, 310, 330], // Samsung
    [150, 180, 210, 220, 250], // Xiaomi
    [100, 120, 140, 160, 190], // OnePlus
    [50, 80, 100, 130, 160] // Google
];

// Colors for charts
const colors = ['#FF6384', '#36A2EB', '#FFCE56', '#4CAF50', '#9C27B0'];

// Bar Chart - Sales Comparison
const barCtx = document.getElementById("barChart").getContext("2d");
const barChart = new Chart(barCtx, {
    type: "bar",
    data: {
        labels: years,
        datasets: brands.map((brand, index) => ({
            label: brand,
            data: salesData[index],
            backgroundColor: colors[index] + "80",
            borderColor: colors[index],
            borderWidth: 1
        }))
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { position: 'top' }
        },
        scales: { y: { beginAtZero: true } }
    }
});

// Line Chart - Growth Trend
const lineCtx = document.getElementById("lineChart").getContext("2d");
const lineChart = new Chart(lineCtx, {
    type: "line",
    data: {
        labels: years,
        datasets: brands.map((brand, index) => ({
            label: brand,
            data: salesData[index],
            borderColor: colors[index],
            backgroundColor: colors[index] + "30",
            fill: true,
            tension: 0.4
        }))
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { position: 'bottom' }
        },
        scales: { y: { beginAtZero: true } }
    }
});

// Pie Chart - Market Share in 2024
const pieCtx = document.getElementById("pieChart").getContext("2d");
const pieChart = new Chart(pieCtx, {
    type: "pie",
    data: {
        labels: brands,
        datasets: [{
            data: salesData.map(data => data[4]), // Data from 2024
            backgroundColor: colors
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: { enabled: true },
            legend: { position: 'right' }
        }
    }
});

// Animation using Anime.js
anime({
    targets: "canvas",
    scale: [0.5, 1],
    opacity: [0, 1],
    duration: 1000,
    delay: anime.stagger(200),
    easing: "easeOutExpo"
});

// Click Event - Display Alert
document.querySelectorAll("canvas").forEach((canvas, index) => {
    canvas.addEventListener("click", () => {
        alert(`You clicked on chart ${index + 1}`);
    });
});
