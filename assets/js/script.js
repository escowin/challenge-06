var apiRootUrl = "https://api.openweathermap.org";
var apiKey = "0962492a18dc2e6ff1c567a057f043f2";
var searchHistory = [];

// DOM ELEMENTS
var searchBtnEl = document.querySelector("#search-btn");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");

// DYNAMICALLY CREATING HTML
// element creation
var cardEl = document.createAttribute('article');
var cityHeader = document.createAttribute('h3');
var weatherIcon = document.createAttribute('img');
var cardText = document.createAttribute('div');
var tempEl = document.createAttribute('p');
var humidityEl = document.createAttribute('p');
var windEl = document.createAttribute('p');
var uvIndex = document.createAttribute('p');
var uvBadge = document.createAttribute('button');

// class attributes
cardEl.setAttribute('class', 'card');
cityHeader.setAttribute('class', 'city-header');
weatherIcon.setAttribute('class', 'img');
cardText.setAttribute('class', 'card-text');
tempEl.setAttribute('class', 'temp');
humidityEl.setAttribute('class', 'humidity');
windEl.setAttribute('class', 'windspeed');
uvIndex.setAttribute('class', 'uv-index');
uvBadge.setAttribute('class', 'uv-badge');

// text content
cityHeader.textContent = `${city} (${date})`;
tempEl.textContent = `temp ${tempF}°f`;
humidityEl.textContent = `humidity ${humidity}%`;
windEl.textContent = `wind speed ${windMph}mph`;
uvIndex.textContent = 'uv index';

// appending elements
card.append(cityHeader, cardText);
cityHeader.append(weatherIcon);
cardText.append(tempEl, humidityEl, windEl, uvIndex);
uvIndex.append(uvBadge);

// UV Index Indicator
if (uvi <3){
  uvIndex.classList.add('btn-low'); 
}else if (uvi <7){
  uvIndex.classList.add('btn-moderate');
}else{
  uvIndex.classList.add('btn-high');
}

// DATE


// SEARCH FOR CITY


// SEARCH HISTORY


// FUNCTIONS | WEATHER API
var getWeather = function(city, weather) {
  let temp = weather.temp;
  let humidity = weather.humidity;
  let uvi = weather.uvi;
  let icon = weather.weather[0].icon;
  let description =weather.weather[0].description
  console.log(temp, humidity, uvi, icon, description);
};


function displayForecast() {};
