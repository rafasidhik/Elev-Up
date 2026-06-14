//API Configurations
const API_KEY = window.env?.API_KEY || 'YOUR_LOCAL_TEST_KEY_HERE'; // Replace with a valid OpenWeatherMap API key
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const errorMsg = document.getElementById('error-msg');
const locationEl = document.getElementById('location');
const tempEl = document.getElementById('temperature');
const descEl = document.getElementById('description');
const iconEl = document.getElementById('weather-icon');
const humidityEl = document.getElementById('humidity');
const windEl = document.getElementById('wind-speed');

searchBtn.addEventListener('click', processSearchInput);
cityInput.addEventListener('keypress', (event) => {
    if (event.key === 'Enter') {
        processSearchInput();
    }
});
function processSearchInput() {
    const cityName = cityInput.value.trim();
    if (cityName !== '') {
        fetchWeatherData(cityName);
    }
}
async function fetchWeatherData(city) {
    const endpoint = `${BASE_URL}?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('API Data Fetch Error');
        }
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        renderErrorState();
    }
}
function updateWeatherUI(data) {
    errorMsg.style.display = 'none';
    const cityName = data.name;
    const countryName = data.sys.country;
    const temperature = Math.round(data.main.temp);
    const weatherDesc = data.weather[0].description;
    const weatherIconCode = data.weather[0].icon;
    const humidityValue = data.main.humidity;
    const windSpeedValue = data.wind.speed;

    locationEl.textContent = `${cityName}, ${countryName}`;
    tempEl.textContent = temperature;
    descEl.textContent = weatherDesc;
    humidityEl.textContent = `${humidityValue}%`;
    windEl.textContent = `${windSpeedValue} m/s`;
    iconEl.src = `https://openweathermap.org/img/wn/${weatherIconCode}@2x.png`;
    iconEl.style.display = 'block';
    weatherInfo.style.display = 'block';
}
function renderErrorState() {
    weatherInfo.style.display = 'none';
    errorMsg.style.display = 'block';
}