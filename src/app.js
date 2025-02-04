function displayWeather(response) {
  let cityElement = document.querySelector("#city");
  let currentTemperature = Math.round(response.data.temperature.current);
  let currentHumidity = response.data.temperature.humidity;
  let currentWind = response.data.wind.speed;
  let conditionsDescription = response.data.condition.description;
  let temperatureElement = document.querySelector("#temperature-value");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let descriptionElement = document.querySelector("#conditions-description");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#weather-icon");
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = currentTemperature;
  humidityElement.innerHTML = `${currentHumidity} %`;
  windElement.innerHTML = `${currentWind} km/h`;
  descriptionElement.innerHTML =
    conditionsDescription.charAt(0).toUpperCase() +
    conditionsDescription.slice(1);
  dateElement.innerHTML = formatDate(date);
  iconElement.innerHTML = `<img src=${response.data.condition.icon_url} class="weather-icon">`;

  getForecast(response.data.city);
}

function searchCity(city) {
  let apiKey = "2affcb912c0bbco36ateff4a191143bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSearchSubmit(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-input");
  searchCity(searchInput.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearchSubmit);

function formatDate(date) {
  let now = new Date();

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekday = days[now.getDay()];
  let day = now.getDate();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let hour = now.getHours();
  let minutes = now.getMinutes().toString().padStart(2, "0");
  return `${weekday}, ${day} ${month} ${year} ${hour}:${minutes}`;
}

function formatForecastDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  let apiKey = "2affcb912c0bbco36ateff4a191143bb";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  let forecastHtml = "";

  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHtml =
        forecastHtml +
        `
      <div class="forecast">
<div class="forecast-day">${formatForecastDay(day.time)}</div>
<div><img src="${day.condition.icon_url}" class="forecast-icon"/>
</div>
<div class="forecast-temperatures">
  <span class="forecast-temperature-max">
    <strong>${Math.round(day.temperature.maximum)}ºC</strong></span
  >
  <span class="forecast-temperature-min">${Math.round(
    day.temperature.minimum
  )}ºC</span>
</div>
</div>
`;
    }
  });
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = forecastHtml;
}

searchCity("Lisbon");
