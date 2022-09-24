// data.dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchBtnEl = document.querySelector("#search-btn");
var searchHistoryEl = document.querySelector("#search-history");
var currentCityEl = document.querySelector("#current-city");
var currentWeatherEl = document.querySelector("#current-weather");
var forecastEl = document.querySelector("#forecast");


// logic.fetching api data
var getWeather = function(city) {
  var location = city;
  var key = "0962492a18dc2e6ff1c567a057f043f2";
  var url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;
  console.log(url);

  fetch(url).then(function(response){
    response.json().then(function(data) {
      displayCurrentWeather(data);
    });
  });
};

// logic.display weather data
var displayCurrentWeather = function(data) {
  console.log(data.name);

}
// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();

  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
};

copyrightYear();
getWeather("London");