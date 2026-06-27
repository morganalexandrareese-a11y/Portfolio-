const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const weatherInfo = document.getElementById('weather-info');
const loadingDiv = document.getElementById('loading');
const errorDiv = document.getElementById('error');

const API_KEY = 'b6fd43532a86a3fb374a16e5355491c9';
const API_URL = 'https://api.openweathermap.org/data/2.5/weather';

function displayWeather(data) {
    const { name, main, weather, wind, clouds, sys } = data;
    
    document.getElementById('city-name').textContent = `${name}, ${sys.country}`;
    document.getElementById('temperature').textContent = Math.round(main.temp);
    document.getElementById('description').textContent = weather[0].description;
    document.getElementById('feels-like').textContent = Math.round(main.feels_like) + '°C';
    document.getElementById('humidity').textContent = main.humidity + '%';
    document.getElementById('wind-speed').textContent = (wind.speed * 3.6).toFixed(1) + ' km/h';
    document.getElementById('pressure').textContent = main.pressure + ' mb';
    
    const iconCode = weather[0].icon;
    document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
    
    weatherInfo.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    errorDiv.classList.add('hidden');
}

function showError(message) {
    errorDiv.textContent = '❌ ' + message;
    errorDiv.classList.remove('hidden');
    loadingDiv.classList.add('hidden');
    weatherInfo.classList.add('hidden');
}

async function fetchWeather(city) {
    try {
        loadingDiv.classList.remove('hidden');
        weatherInfo.classList.add('hidden');
        errorDiv.classList.add('hidden');
        
        const response = await fetch(`${API_URL}?q=${city}&units=metric&appid=${API_KEY}`);
        
        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('City not found');
            }
            throw new Error('Failed to fetch weather data');
        }
        
        const data = await response.json();
        displayWeather(data);
    } catch (error) {
        showError(error.message);
    }
}

searchBtn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        fetchWeather(city);
    } else {
        showError('Please enter a city name');
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchBtn.click();
    }
});

// Load default city on page load
window.addEventListener('load', () => {
    fetchWeather('London');
});