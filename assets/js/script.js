// data.global dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");

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

// logic.display current weather data
var displayCurrentWeather = function(city) {
  // dom elements
  var currentCityEl = document.getElementById("current-city");
  var tempEl = document.getElementById("temp");
  var humidityEl = document.getElementById("humidity");
  var windSpeedEl = document.getElementById("wind-speed");
  var currentConditionsEl = document.getElementById("current-conditions");

  // display data onto page
  currentCityEl.textContent = city.name;
  tempEl.textContent = `temp ${city.main.temp}\u00B0`;
  humidityEl.textContent = `humidity ${city.main.humidity}%`;
  windSpeedEl.textContent = `wind speed ${city.wind.speed} mph`;
  currentConditionsEl.textContent = `conditions ${city.weather[0].description}`;
};

// logic.display forecast data
var displayForecast = function(forecast) {
  var hours = forecast.list;

  // dom element that will hold child hourly forecast elements
  var forecastContainerEl = document.getElementById("forecast-container");

  // iterate through hours
  for (let i = 0; i < hours.length; i++) {
    // create article to hold successive elements
    var forecastHourEl = document.createElement("article");

    // create elements for each data point
    var hourEl = document.createElement("h3");
    hourEl.className = "hour";
    hourEl.textContent = hours[i].dt_txt.split(" ")[1];

    var tempEl = document.createElement("p");
    tempEl.className = "temp";
    tempEl.textContent = `temp ${hours[i].main.temp}\u00B0`;

    var humidityEl = document.createElement("p");
    humidityEl.className = "humidity";
    humidityEl.textContent = `humidity ${hours[i].main.humidity}%`

    var windSpeedEl = document.createElement("p");
    windSpeedEl.className = "wind-speed";
    windSpeedEl.textContent = `wind speed ${hours[i].wind.speed} mph`;

    var conditionsEl = document.createElement("p");
    conditionsEl.className = "conditions";
    conditionsEl.textContent = `conditions ${hours[i].weather[0].description}`;

    // append child element(s) to parent container
    forecastHourEl.append(hourEl, tempEl, humidityEl, windSpeedEl, conditionsEl);
    forecastContainerEl.appendChild(forecastHourEl);
  };
};

// logic.capture user input
var searchBar = function(event) {
  event.preventDefault();
  searchInputEl = document.querySelector("#search-input");

  // removes possible leading and/or trailing white spaces from user input
  var city = searchInputEl.value.trim();

  if (city) {
    getWeather(city);
    searchHistory(city);
    searchInputEl.value = "";
  } else {
    console.log("nothing to see here")
  }
};

// logic.retaining recent search history
var searchHistory = function(city) {
  var recent = [];
  var recentCity = city;
  recent.push(recentCity);

  for (var i = 0; i < recent.length; i++) {
    var recentCityEl = document.createElement("a");
    recentCityEl.setAttribute("href", "#");
    recentCityEl.textContent = recent[i];

    searchHistoryEl.appendChild(recentCityEl);
    console.log(searchHistoryEl);
  }
  console.log(recent);
};

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();
  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
};

copyrightYear();
searchFormEl.addEventListener("submit", searchBar);