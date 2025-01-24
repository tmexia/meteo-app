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
  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = currentTemperature;
  humidityElement.innerHTML = `${currentHumidity} %`;
  windElement.innerHTML = `${currentWind} km/h`;
  descriptionElement.innerHTML =
    conditionsDescription.charAt(0).toUpperCase() +
    conditionsDescription.slice(1);
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

searchCity("Lisbon");

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
let date = now.getDate();
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
console.log(weekday, date, month, year, hour, minutes);

let formattedDate = `${weekday}, ${date} ${month} ${year} ${hour}:${minutes}`;
console.log(formattedDate);

function formatDate() {
  let formattedDate = `${weekday}, ${date} ${month} ${year} ${hour}:${minutes}`;
  let dateElement = document.querySelector("#date");
  dateElement.innerHTML = formattedDate;
}

formatDate(new Date());

//Falta mudar o icon e ver a explicação
