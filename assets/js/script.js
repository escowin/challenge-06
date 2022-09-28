// data.global dom
var searchFormEl = document.querySelector("#search-form")
var searchInputEl = document.querySelector("#search-input");
var searchHistoryEl = document.querySelector("#search-history");
var currentDetailsEl = document.getElementById("current-details");

// logic.fetching api data
var getWeather = function(city) {
  var location = city;
  var key = "0962492a18dc2e6ff1c567a057f043f2";
  var current = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}&units=imperial`;
  var forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${key}&units=imperial`;

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

var temperatureStyles = function(temp) {
    if (temp >= 100) {
      currentDetailsEl.className = "high";
    } else if (temp >= 90 && temp < 100) {
      currentDetailsEl.className = "mid-high"
    } else if (temp <= 50) {
      currentDetailsEl.className = "low";
    } else {
      currentDetailsEl.className = ""
    }
};

// logic.display current weather data
var displayCurrentWeather = function(city) {
  // dom elements
  var currentCityEl = document.getElementById("current-city");
  var tempEl = document.getElementById("temp");
  var humidityEl = document.getElementById("humidity");
  var windSpeedEl = document.getElementById("wind-speed");
  var conditionsIconEl = document.getElementById("conditions-icon")
  var currentConditionsEl = document.getElementById("current-conditions");

  // display data onto page
  if (city.sys.country != "US") {
    currentCityEl.textContent = `${city.name}, ${city.sys.country}`;
  } else {
    currentCityEl.textContent = `${city.name}`;
  }
  tempEl.textContent = `${city.main.temp}\u00B0`;
  humidityEl.textContent = `${city.main.humidity}%`;
  windSpeedEl.textContent = `${city.wind.speed} mph`;
  currentConditionsEl.textContent = `${city.weather[0].description}`;
  if (city.weather[0].main === "Clear") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-sun"></i>`;
  } else if (city.weather[0].main === "Rain") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
  } else if (city.weather[0].main === "Thunderstorm") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-cloud-bolt"></i>`
  } else if (city.weather[0].main === "Snow") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-snowflake"></i>`
  } else if (city.weather[0].main === "Tornado") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-tornado"></i>`
  } else if (city.weather[0].main === "Clouds") {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-cloud"></i>`
  } else if (city.weather[0].id <= 701 || city.weather[0].id <= 771) {
    conditionsIconEl.innerHTML = `<i class="fa-solid fa-smog"></i>`;
  } else {
    conditionsIconEl.innerText = "";
  };

  temperatureStyles(city.main.temp);
};

// logic.display forecast data
var displayForecast = function(forecast) {
  var hours = forecast.list;
  // console.log(forecast.city.timezone)

  // dom element that will hold child hourly forecast elements
  var forecastContainerEl = document.getElementById("forecast-container");
  // clear previous content
  forecastContainerEl.innerHTML = "";

  var forecastHeaderEl = document.createElement("h2");
  forecastHeaderEl.className = "subheader";
  forecastHeaderEl.textContent = "5-Day Forecast";
  forecastContainerEl.appendChild(forecastHeaderEl);

  // iterate through hours
  for (let i = 0; i < hours.length; i+= 8) {
    // create article to hold successive elements
    var forecastDayEl = document.createElement("article");
    forecastDayEl.className = "forecast-details";

    // create elements for each data point
    var dayEl = document.createElement("h3");
    dayEl.className = "day";
    dayEl.textContent = moment(hours[i].dt_txt).format("MMMM DD");

    var tempEl = document.createElement("p");
    tempEl.className = "temp";
    tempEl.innerHTML = `<i class="fa-solid fa-temperature-half"></i> ${hours[i].main.temp}\u00B0`;

    var humidityEl = document.createElement("p");
    humidityEl.className = "humidity";
    humidityEl.innerHTML = `<i class="fa-solid fa-droplet"></i> ${hours[i].main.humidity}%`

    var windSpeedEl = document.createElement("p");
    windSpeedEl.className = "wind-speed";
    windSpeedEl.innerHTML = `<i class="fa-solid fa-wind"></i>  ${hours[i].wind.speed} mph`;

    var conditionsEl = document.createElement("p");
    conditionsEl.className = "conditions";
    if (hours[i].weather[0].main === "Clear") {
      conditionsEl.innerHTML = `<i class="fa-solid fa-sun"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].main === "Rain") {
      conditionsEl.innerHTML = `<i class="fa-solid fa-cloud-rain"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].main === "Thunderstorm") {
      conditionsEl.innerHTML = `<i class="fa-solid cloud-bolt"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].main === "Snow") {
      conditionsEl.innerHTML = `<i class="fa-solid fa-snowflake"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].main === "Tornado") {
      conditionsEl.innerHTML = `<i class="fa-solid fa-tornado"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].main === "Clouds") {
      conditionsEl.innerHTML = `<i class="fa-solid fa-cloud"></i> ${hours[i].weather[0].description}`;
    } else if (hours[i].weather[0].id <= 701 || hours[i].weather[0].id <= 771) {
      conditionsEl.innerHTML = `<i class="fa-solid fa-smog"></i> ${hours[i].weather[0].description}`;
    } else {
      conditionsEl.innerHTML = `${hours[i].weather[0].description}`
    }

    // temperatureStyles(hours[i].main.temp);

    // append child element(s) to parent container
    forecastDayEl.append(dayEl, tempEl, humidityEl, windSpeedEl, conditionsEl);
    forecastContainerEl.appendChild(forecastDayEl);
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
    var recentCityEl = document.createElement("button");
    recentCityEl.setAttribute("type", "button");
    recentCityEl.setAttribute("data-city", `${city}`);
    recentCityEl.className = "btn";
    recentCityEl.textContent = recent[i];

    searchHistoryEl.appendChild(recentCityEl);
  }
};

var searchHistoryCities = function(event) {
  var searchedCity = event.target.getAttribute("data-city");
  if (searchedCity) {
    getWeather(searchedCity);
  }
};

// logic.display current date
var currentDate = function() {
  var todayEl = document.getElementById("today");
  var today = moment().format('dddd, MMMM Do h:mm:ss a');
  todayEl.textContent = today;
};

// logic.display current year
var copyrightYear = function() {
  var year = new Date().getFullYear();
  var copyrightEl = document.getElementById("copyright");
  copyrightEl.textContent = `\u00A9 ${year} `;
  console.log(`
  \u00A9 ${year} Edwin M. Escobar
  https://github.com/escowin/weather-dashboard
  `);
};

setInterval(currentDate, 1000);
copyrightYear();
searchFormEl.addEventListener("submit", searchBar);
searchHistoryEl.addEventListener("click", searchHistoryCities);