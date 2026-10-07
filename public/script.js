const form = document.getElementById('weather-form');
const cityInput = document.getElementById('city-input');
const geoBtn = document.getElementById('geo-btn');

const resultEl = document.getElementById('result');
const errorEl = document.getElementById('error-msg');

function showError(msg) {
    errorEl.textContent = msg;
    errorEl.classList.remove('hidden');
    resultEl.classList.add('hidden');
}

function showResult(data) {
    errorEl.classList.add('hidden');

    document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('description').textContent = data.weather[0].description;
    document.getElementById('temp').textContent = Math.round(data.main.temp);
    document.getElementById('feels-like').textContent = Math.round(data.main.feels_like);
    document.getElementById('humidity').textContent = data.main.humidity;
    document.getElementById('wind').textContent = data.wind.speed;

    resultEl.classList.remove('hidden');
}

async function fetchWeather(params) {
    try {
        const query = new URLSearchParams(params).toString();
        const response = await fetch(`/api/weather?${query}`);
        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.error || 'Não foi possível obter o clima.');
        }

        showResult(data);
    } catch (err) {
        showError(err.message);
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const city = cityInput.value.trim();
    if (city) fetchWeather({ city });
});

geoBtn.addEventListener('click', () => {
    if (!navigator.geolocation) {
        showError('Geolocalização não é suportada pelo seu navegador.');
        return;
    }

    navigator.geolocation.getCurrentPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            fetchWeather({ lat: latitude, lon: longitude });
        },
        () => showError('Não foi possível obter sua localização.')
    );
});