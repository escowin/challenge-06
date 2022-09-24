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
  var current = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;
  var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&cnt=8&units=imperial`;

  fetch(current).then(function(response){
    response.json().then(function(data) {
      displayCurrentWeather(data);
    });
  });
  fetch(forecast).then(function(response){
    response.json().then(function(data) {
      displayForecast(data);
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

var displayForecast = function(forecast) {
  var hours = forecast.list;
  console.log(hours);

  // dom elements
  // time, temp, humidity, wind speed, conditions
  // var hoursEl = document.querySelector(".time");
  var hourEl = document.createElement("article");
  
  for (let i = 0; i < hours.length; i++) {
    var hour = hours[i].dt_txt.split(" ")[1];
    // ** pause | each hour displays in console.log, but only one of the hours displays in hourEl repeatedly
    hourEl.textContent = hour;
    console.log(hourEl)

    // console.log(hours[i].dt_txt.split(" ")[1]);
    // console.log(`${hours[i].main.temp}\u00B0`);
    // console.log(`${hours[i].main.humidity}%`);
    // console.log(`${hours[i].wind.speed} mph`);
    // console.log(hours[i].weather[0].description);
  }
};

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();
  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
};

copyrightYear();
getWeather("Austin");