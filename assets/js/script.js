// data.dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");
var searchHistoryEl = document.querySelector("#search-history");
var currentCityEl = document.querySelector("#current-city");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");

// data.api set up
var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=";
var apiKey = "&appid=0962492a18dc2e6ff1c567a057f043f2&units=imperial";

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();
  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
  console.log(copyrightEl);
};

copyrightYear();