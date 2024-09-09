// Select Elements
const cityName = document.getElementById('city-name');
const tempar = document.getElementById('temp');
const feel = document.getElementById('feel');
const haze = document.getElementById('haze');
const hazeImg = document.getElementById('haze-img');
const background = document.getElementById('background');
const maxTemp = document.getElementById('max-temp');
const minTemp = document.getElementById('min-temp');
const humi = document.getElementById('humidity');
const windSpeed = document.getElementById('wind');
const formData = document.getElementById('form-data');
const form = document.getElementById('form');



const API_KEY = '92dc89e6fc7e5352e0b9d2239365e04e';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const getWeather = async (lat, long)=>{
    const res = await fetch(
        `${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    );
    const data = await res.json();

    const {name, main:{temp, feels_like, temp_max, temp_min, humidity}, wind:{speed}} = data;
    const {main} = data.weather[0]

    // console.log(data)
    cityName.innerText = `${name}` === 'Sāmāir' ? 'Badda' : `${name}`; // এখানে ${data?.name} এটার মধ্যে ? হলো optional chin এর মানে হলো যদি data.name এর কোনো ভ্যালু না পাই তাহলে এটা ক্র্যাস করবে না। 
    tempar.innerText = `${Math.round(temp)}°C`;
    feel.innerText = `Feels_Like: ${Math.round(feels_like)}°C`;
    haze.innerText = main;
    maxTemp.innerHTML = `${Math.round(temp_max)}°C <i class="fa-solid fa-temperature-high"></i>`;
    minTemp.innerHTML = `${Math.round(temp_min)}°C <i class="fa-solid fa-temperature-high"></i>`;
    humi.innerHTML = `${humidity}% <i class="fa-solid fa-droplet"></i>`;
    windSpeed.innerHTML = `${speed}km/h <i class="fa-solid fa-wind"></i>`;

    switch (main) {
        case 'Haze':
            hazeImg.src = './assets/icone/haze.svg'
            background.style.backgroundImage = 'url(./assets/background/mist.jpeg)'
            break;
        case 'Rain':
            hazeImg.src = './assets/icone/rainy.svg'
            background.style.backgroundImage = 'url(./assets/background/rainy-day.jpg)'
            break;
        case 'Snow':
            hazeImg.src = './assets/icone/snow.svg' 
            background.style.backgroundImage = 'url(./assets/background/snow.jpg)'
            break;
        case 'Thunderstorm':
            hazeImg.src = './assets/icone/thunder.svg'
            background.style.backgroundImage = 'url(./assets/background/thunderstorm.jpg)'
            break;
        case 'Clouds':
            hazeImg.src = './assets/icone/cloud.svg'
            background.style.backgroundImage = 'url(./assets/background/clouds.png)'
            break;
        default:
            hazeImg.src = './assets/icone/sun.svg'
            background.style.backgroundImage = 'url(./assets/background/mist.jpeg)'
            break;
    }
};

const getWeatherByCityName = async (city) => {
    const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
    const data = await res.json();
    console.log(data);
}

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = e.target['search-input'].value.trim();
    if (city) {
        getWeatherByCityName(city);
        e.target['search-input'].value = '';
    }
});


navigator.geolocation.getCurrentPosition((position)=>{
    const {latitude, longitude} = position.coords;
    getWeather(latitude, longitude);
});