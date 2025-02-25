const ctx = document.getElementById('cryptoChart').getContext('2d');

let chartData = {
    labels: [],
    datasets: [{
        label: 'Bitcoin Price (USD)',
        borderColor: 'blue',
        borderWidth: 2,
        fill: false,
        data: []
    }]
};

let cryptoChart = new Chart(ctx, {
    type: 'line',
    data: chartData,
    options: {
        animation: false,
        responsive: true,
        scales: {
            x: { title: { display: true, text: 'Time' } },
            y: { title: { display: true, text: 'Price (USD)' } }
        }
    }
});

async function fetchCryptoData() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd');
        const data = await response.json();
        const price = data.bitcoin.usd;
        const time = new Date().toLocaleTimeString();

        updateChart(time, price);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function updateChart(time, price) {
    chartData.labels.push(time);
    chartData.datasets[0].data.push(price);

    if (chartData.labels.length > 10) {
        chartData.labels.shift();
        chartData.datasets[0].data.shift();
    }

    cryptoChart.update();

    animateChart();
}

function animateChart() {
    anime({
        targets: cryptoChart.data.datasets[0].data,
        easing: 'easeOutElastic(1, .8)',
        duration: 800
    });
}

setInterval(fetchCryptoData, 5000);
