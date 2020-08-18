function displayTimeDate(timestamp) {
  let now = new Date(timestamp);
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let currentDateHigh = document.querySelector("#current-date-high");
  let currentDateLow = document.querySelector("#current-date-low");
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
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  currentDate.innerHTML = month + " " + date;
  currentTime.innerHTML = hours + ":" + minutes;
  currentDateHigh.innerHTML = month + " " + date;
  currentDateLow.innerHTML = month + " " + date;
}

function formatForecastDateTime(timestamp) {
  let now = new Date(timestamp);
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
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }

  return `${hours}:${minutes}<br /><small>${month} ${date}</small>`;
}

var apiKey = "653f09d54f4697e3cc7833c0f0cc1a51";

function getCity(response) {
  displayTimeDate(response.data.dt * 1000);
  let cityName = (document.querySelector("#current-city").innerHTML =
    response.data.name);
  let highTemp = (document.querySelector("#high-temp").innerHTML =
    Math.round(response.data.main.temp_max) + "°C");
  let currentTemp = (document.querySelector("#current-temp").innerHTML =
    Math.round(response.data.main.temp) + "°C");
  let lowTemp = (document.querySelector("#low-temp").innerHTML =
    Math.round(response.data.main.temp_min) + "°C");
  let iconCurrent = document.querySelector("#current-icon");
  iconCurrent.setAttribute(
    "src",
    "http://openweathermap.org/img/wn/" +
      response.data.weather[0].icon +
      "@2x.png"
  );
  let iconCurrentDescription = document.querySelector("#current-icon");
  iconCurrentDescription.innerHTML = response.data.weather[0].description;
  iconCurrent.setAttribute("alt", response.data.weather[0].description);
  celsTempHigh = response.data.main.temp_max;
  celsTempCurrent = response.data.main.temp;
  celsTempLow = response.data.main.temp_min;
  let humidity = document.querySelector("#humidity-container");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let wind = document.querySelector("#wind-speed-container");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}`;
}
let forecast = null;
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-row");
  forecastElement.innerHTML = "";
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    forecastElement.innerHTML += `
    <div class="col-4" id="forecast-container">
      <span id="forecast-t-d">${formatForecastDateTime(
        forecast.dt * 1000
      )}</span>
      <br/>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="" id="forecast-icons"/>
      <br/>
      <span id="forecast-temp">${Math.round(forecast.main.temp)}°C</span>
      <hr />
      `;
  }
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-box");
  city.innerHTML = city.value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(`${apiUrl}`).then(getCity);
  apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(`${apiUrl}`).then(displayForecast);
}

let form = document.querySelector("#search-city-container-row");
form.addEventListener("submit", handleSubmit);

function showPosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=metric&appid=" +
    apiKey;
  axios.get(`${apiUrl}`).then(getCity);
  apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(`${apiUrl}`).then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-geolocation");
button.addEventListener("submit", getCurrentPosition);

let celsTempHigh = null;
let celsTempCurrent = null;
let celsTempLow = null;
let highTempCelsDefault = document.querySelector("#high-temp");
let currentTempCelsDefault = document.querySelector("#current-temp");
let lowTempCelsDefault = document.querySelector("#low-temp");

function displayFahrTemp(event) {
  event.preventDefault();
  let fahrTempHigh = (celsTempHigh * 9) / 5 + 32;
  let fahrTempCurrent = (celsTempCurrent * 9) / 5 + 32;
  let fahrTempLow = (celsTempLow * 9) / 5 + 32;
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  highTempCelsDefault.innerHTML = Math.round(fahrTempHigh) + "°F";
  currentTempCelsDefault.innerHTML = Math.round(fahrTempCurrent) + "°F";
  lowTempCelsDefault.innerHTML = Math.round(fahrTempLow) + "°F";
}
let fahrenheitLink = document.querySelector("#fahrenheit-a");
fahrenheitLink.addEventListener("click", displayFahrTemp);

function displayCelsTemp(event) {
  event.preventDefault();
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  highTempCelsDefault.innerHTML = Math.round(celsTempHigh) + "°C";
  currentTempCelsDefault.innerHTML = Math.round(celsTempCurrent) + "°C";
  lowTempCelsDefault.innerHTML = Math.round(celsTempLow) + "°C";
}
let celsiusLink = document.querySelector("#celsius-a");
celsiusLink.addEventListener("click", displayCelsTemp);
