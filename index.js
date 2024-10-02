// Select Elements
// const cityName = document.getElementById('city-name');
// const tempar = document.getElementById('temp');
// const feel = document.getElementById('feel');
// const haze = document.getElementById('haze');
// const hazeImg = document.getElementById('haze-img');
// const background = document.getElementById('background');
// const maxTemp = document.getElementById('max-temp');
// const minTemp = document.getElementById('min-temp');
// const humi = document.getElementById('humidity');
// const windSpeed = document.getElementById('wind');
// const formData = document.getElementById('form-data');
// const form = document.getElementById('form');
// const climate = document.getElementById('climate');

const elements = {
    icon: document.getElementById('weather-icon'),
    background: document.getElementById('background'),
    form: document.getElementById('form'),
    loadingElement: document.getElementById('loading')
};


const API_KEY = '92dc89e6fc7e5352e0b9d2239365e04e';
const URL = 'https://api.openweathermap.org/data/2.5/weather';

const updateElement = (id, content, isHtml = false) => {
    const element = document.getElementById(id);
    if(!element) {
        return;
    } else if (isHtml) {
        element.innerHTML = content;
    } else{
        element.innerText = content;
    };
};

// Icon mapping
const weatherIcon = {
    Haze: './assets/icone/haze.svg',
    Rain: './assets/icone/rainy.svg',
    Snow: './assets/icone/snow.svg',
    Thunderstorm: './assets/icone/thunder.svg',
    Clouds: './assets/icone/cloud.svg'
};

// Background Mapping
const weatherBackground = {
    Haze: './assets/background/mist.jpeg',
    Rain: './assets/background/rainy-day.jpg',
    Snow: './assets/background/clear-sky.jpg',
    Thunderstorm: './assets/background/thunderstorm.jpg',
    Clouds: './assets/background/clouds.png',
}

const getWeather = async (info)=>{
    const {latitude, longitude, city} = info || {};
    try {
        const fetchUrl = city ? `${URL}?q=${city}&appid=${API_KEY}&units=metric` : `${URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;

        const data = await fetchData(fetchUrl);
        updateWeatherUI(data);
        
        // const {name, main:{temp, feels_like, temp_max, temp_min, humidity}, wind:{speed}} = data;
        // const {main} = data.weather[0];

        // console.log(data)
        // cityName.innerText = `${name}` === 'Sāmāir' ? 'Badda' : `${name}`; // এখানে ${data?.name} এটার মধ্যে ? হলো optional chin এর মানে হলো যদি data.name এর কোনো ভ্যালু না পাই তাহলে এটা ক্র্যাস করবে না। 
        // tempar.innerText = `${Math.round(temp)}°C`;
        // feel.innerText = `Feels_Like: ${Math.round(feels_like)}°C`;
        // haze.innerText = main;
        // maxTemp.innerHTML = `${Math.round(temp_max)}°C <i class="fa-solid fa-temperature-high"></i>`;
        // minTemp.innerHTML = `${Math.round(temp_min)}°C <i class="fa-solid fa-temperature-high"></i>`;
        // humi.innerHTML = `${humidity}% <i class="fa-solid fa-droplet"></i>`;
        // windSpeed.innerHTML = `${speed}km/h <i class="fa-solid fa-wind"></i>`;
        // climate.innerHTML = `<p>THE CLIMATE IS <u class="text-yellow-950 font-bold">${main}</u></p>`;

        // switch (main) {
        //     case 'Haze':
        //         hazeImg.src = './assets/icone/haze.svg'
        //         background.style.backgroundImage = 'url(./assets/background/mist.jpeg)'
        //         break;
        //     case 'Rain':
        //         hazeImg.src = './assets/icone/rainy.svg'
        //         background.style.backgroundImage = 'url(./assets/background/rainy-day.jpg)'
        //         break;
        //     case 'Snow':
        //         hazeImg.src = './assets/icone/snow.svg' 
        //         background.style.backgroundImage = 'url(./assets/background/snow.jpg)'
        //         break;
        //     case 'Thunderstorm':
        //         hazeImg.src = './assets/icone/thunder.svg'
        //         background.style.backgroundImage = 'url(./assets/background/thunderstorm.jpg)'
        //         break;
        //     case 'Clouds':
        //         hazeImg.src = './assets/icone/cloud.svg'
        //         background.style.backgroundImage = 'url(./assets/background/clouds.png)'
        //         break;
        //     default:
        //         hazeImg.src = './assets/icone/sun.svg'
        //         background.style.backgroundImage = 'url(./assets/background/mist.jpeg)'
        //         break;
        // }

    } catch (error) {
        console.log('error'+ error.message);
    }

    // const res = await fetch(
    //     `${URL}?lat=${lat}&lon=${long}&appid=${API_KEY}&units=metric`
    // );
    // const data = await fetchData(fetchUrl);
    // console.log(data)

    
};

const fetchData = async (url)=>{
    const res = await fetch(url);
    if (!res.ok) throw new Error(' fetching faild');
    const data = res.json();
    return await data;
}

const updateWeatherUI = (data)=>{
    const {name, main:{temp, feels_like, temp_max, temp_min, humidity}, wind:{speed}} = data;
    const {main} = data.weather[0];

    updateElement('city-name', `${name}` === 'Sāmāir' ? 'Badda' : `${name}`);
    updateElement('temp', `${Math.round(temp)}°C`);
    updateElement('feel', `Feels_Like: ${Math.round(feels_like)}°C`);
    updateElement('haze', main);
    updateElement('max-temp', `${Math.round(temp_max)}°C <i class="fa-solid fa-temperature-high"></i>`, true);
    updateElement('min-temp',`${Math.round(temp_min)}°C <i class="fa-solid fa-temperature-high"></i>`, true);
    updateElement('humidity', `${humidity}% <i class="fa-solid fa-droplet"></i>`, true);
    
    // Set the src attribute of the weather icon element
    elements.icon.src = weatherIcon[main] || './assets/icone/sun.svg';
    
    // Set the background image based on the weather condition
    elements.background.style.backgroundImage = `url(${weatherBackground[main]})` || 'url(./assets/background/sunny.jpg)';
};

// const getWeatherByCityName = async (city) => {
//     const res = await fetch(`${URL}?q=${city}&appid=${API_KEY}&units=metric`);
//     const data = await res.json();

//     cityName.innerText = `${data?.name}`;
//     tempar.innerText = `${Math.round(data?.main?.temp)}°C`;
//     console.log(data);
// }

form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const city = e.target['search-input'].value.trim();
    if (city) {
        getWeather({city});
        e.target['search-input'].value = '';
    }
});


navigator.geolocation.getCurrentPosition((position)=>{
    const {latitude, longitude} = position.coords;
    getWeather({latitude, longitude}); // এখানে arguments হিসেবে একটা অব্জেক্ট কে পাঠানো হয়েছে 
});