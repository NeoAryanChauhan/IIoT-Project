const MACHINE_ID = "M01";
const POLL_INTERVAL_MS = 4000;
const MAX_POINTS = 20;

const healthScoreEl = document.getElementById("health-score");
const healthStatusEl = document.getElementById("health-status");
const healthReasonEl = document.getElementById("health-reason");

function createLineChart(canvasId, label, color) {
  const ctx = document.getElementById(canvasId).getContext("2d");
  return new Chart(ctx, {
    type: "line",
    data: {
      labels: [],
      datasets: [
        {
          label,
          data: [],
          borderColor: color,
          backgroundColor: "rgba(0, 0, 0, 0)",
          tension: 0.2,
        },
      ],
    },
    options: {
      animation: false,
      responsive: true,
      scales: {
        x: {
          title: { display: true, text: "Time" },
        },
        y: {
          title: { display: true, text: label },
          beginAtZero: true,
        },
      },
    },
  });
}

const vibrationChart = createLineChart("vibration-chart", "Vibration (g)", "#1f77b4");
const currentChart = createLineChart("current-chart", "Current (A)", "#ff7f0e");
const temperatureChart = createLineChart("temperature-chart", "Temperature (°C)", "#d62728");

function appendData(chart, label, value) {
  const data = chart.data;
  data.labels.push(label);
  data.datasets[0].data.push(value);

  if (data.labels.length > MAX_POINTS) {
    data.labels.shift();
    data.datasets[0].data.shift();
  }

  chart.update();
}

async function fetchHealth() {
  const response = await fetch(`/health?machine_id=${MACHINE_ID}`);
  if (!response.ok) {
    throw new Error("Health data not available");
  }
  return response.json();
}

function updateStatusDisplay(healthData) {
  healthScoreEl.textContent = healthData.health_score;
  healthStatusEl.textContent = healthData.status;
  healthReasonEl.textContent = healthData.reason;
}

async function refreshDashboard() {
  try {
    const healthData = await fetchHealth();
    const timestamp = new Date().toLocaleTimeString();

    updateStatusDisplay(healthData);
    appendData(vibrationChart, timestamp, healthData.vibration_g ?? 0);
    appendData(currentChart, timestamp, healthData.current_A ?? 0);
    appendData(temperatureChart, timestamp, healthData.temperature_C ?? 0);
  } catch (error) {
    healthStatusEl.textContent = "No data";
    healthReasonEl.textContent = "Waiting for sensor input";
  }
}

setInterval(refreshDashboard, POLL_INTERVAL_MS);
refreshDashboard();
