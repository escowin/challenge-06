// data.dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");
var searchHistoryEl = document.querySelector("#search-history");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");


// logic.fetching api data
var getWeather = function(city) {
  var location = city;
  var key = "0962492a18dc2e6ff1c567a057f043f2";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;

  fetch(url).then(function(response){
    response.json().then(function(data) {
      displayCurrentWeather(data);
    });
  });
};

// logic.display weather data
var displayCurrentWeather = function(city) {
    console.log(city);

  // dom elements
  var currentCityEl = document.getElementById("current-city");
  var tempEl = document.getElementById("temp");
  var humidityEl = document.getElementById("humidity");
  var windSpeedEl = document.getElementById("windspeed");
  var currentConditionsEl = document.getElementById("current-conditions");

  // display data onto page
  currentCityEl.textContent = city.name;
  tempEl.textContent = `${city.main.temp}\u00B0`;
  humidityEl.textContent = `${city.main.humidity}%`;
  windSpeedEl.textContent = `${city.wind.speed} mph`;
  currentConditionsEl.textContent = city.weather[0].description;
};

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();

  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
};

copyrightYear();
getWeather("Austin");