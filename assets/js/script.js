var APIKey = "0962492a18dc2e6ff1c567a057f043f2";
var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

// DOM ELEMENTS
var searchBtnEl = document.querySelector("#search-btn");
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");

// var city = document.querySelector('.city')
// var temp = document.querySelector('.temp')
// var wind = document.querySelector('.wind')
// var uvIndex = document.querySelector('.uvIndex')

var getCity = function() {
    fetch(queryURL)
};

fetch(queryURL)fetch(queryURL).then(function(response) {
  console.log(response);
  response.json().then(function(data) {
    console.log(data);
  });
});

// // #1 see the weather outlook for multiple cities

// // #2 a weather dashboard with form inputs
// var cityInput = function() {
//     // type city in search bar, hit search submit button, city data is retrieved
// };

// // #3 search for a city, presented with current and future conditions for that city and that city is added to the search history
// var saveCity = function() {
//     // current conditions
//     // future conditions
//     // save city to search history (localStorage)
// };

// // #4 view current weather conditions for that city
// var cityWeather = function() {
//     // city name & date
//     // weather condition icon
//     // temperature
//     // humidity
//     // wind speed
//     // UV index
//         // #5 view the UV index, presented with a color that indicates whether the conditions are:
//         // if favorable
//         // else if moderate
//         // else if severe

// };

// // #6 for that city, presented with a 5-day forecast
// var fiveDayForecast = function() {
//     // date
//     // weather condition icon
//     // temperature
//     // wind speed
//     // humidity
// };

// // #7 click on a city in the search history, presented with current and future conditions for that city
// var cityHistory = function() {
//     // save searched cities into localStorage
//     // previous searched cities are displayed in the aside.
//     // these cities are clickable 
// };