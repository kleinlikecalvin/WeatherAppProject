var apiKey = "653f09d54f4697e3cc7833c0f0cc1a51";
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
let submitButton = document.querySelector("#submit-button");
submitButton.addEventListener("click", handleSubmit);

let currentCityButton = document.querySelector("#current-location-button");
currentCityButton.addEventListener("click", getCurrentPosition);

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", displayCelsTemp);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", displayFahrTemp);

let highTemp = document.querySelector("#high-temp");
let currentTemp = document.querySelector("#current-temp");
let lowTemp = document.querySelector("#low-temp");
let forecastElement = document.querySelector("#forecast-row");

let celsTempHigh = null;
let celsTempCurrent = null;
let celsTempLow = null;

function handleSubmit(e) {
  e.preventDefault();
  let city = document.querySelector("#search-bar");
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(updateUI);
  apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    city.value +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then(setForecast);
}

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
  axios.get(apiUrl).then((res) => updateUI(res));
  apiUrl =
    "https://api.openweathermap.org/data/2.5/forecast?lat=" +
    lat +
    "&lon=" +
    lon +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(apiUrl).then((res) => setForecast(res));
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

function displayFahrTemp(e) {
  if (celsTempCurrent != null) {
    e.preventDefault();

    celsiusLink.classList.remove("active");
    fahrenheitLink.classList.add("active");

    let fahrTempHigh = (celsTempHigh * 9) / 5 + 32;
    let fahrTempCurrent = (celsTempCurrent * 9) / 5 + 32;
    let fahrTempLow = (celsTempLow * 9) / 5 + 32;

    highTemp.textContent = Math.round(fahrTempHigh) + "°F";
    currentTemp.textContent = Math.round(fahrTempCurrent) + "°F";
    lowTemp.textContent = Math.round(fahrTempLow) + "°F";

    const forecast = document.querySelectorAll(".forecast-temp");
    forecast.forEach((containerTemp) => {
      console.log(containerTemp);
    });
  }
}

function displayCelsTemp(e) {
  if (celsTempCurrent != null) {
    fahrenheitLink.classList.remove("active");
    celsiusLink.classList.add("active");

    e.preventDefault();

    highTemp.textContent = Math.round(celsTempHigh) + "°C";
    currentTemp.textContent = Math.round(celsTempCurrent) + "°C";
    lowTemp.textContent = Math.round(celsTempLow) + "°C";
  }
}

function setTimeDate(timestamp) {
  let now = new Date(timestamp);
  let currentDate = document.querySelector("#current-date");
  let currentTime = document.querySelector("#current-time");
  let currentDateHigh = document.querySelector("#current-date-high");
  let currentDateLow = document.querySelector("#current-date-low");
  let month = months[now.getMonth()];
  let date = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  currentDate.innerText = `${month} ${date}`;
  currentTime.innerText = `${hours}:${minutes}`;
  currentDateHigh.innerText = `${month} ${date}`;
  currentDateLow.innerText = `${month} ${date}`;
}

function formatForecastDateTime(timestamp) {
  let now = new Date(timestamp);
  let month = months[now.getMonth()];
  let day = now.getDate();
  let hours = now.getHours();
  let minutes = now.getMinutes();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return { hours, minutes, month, day };
}

function updateUI(response) {
  setTimeDate(response.data.dt * 1000);

  document.querySelector("#current-city").textContent = response.data.name;

  celsTempHigh = response.data.main.temp_max;
  celsTempCurrent = response.data.main.temp;
  celsTempLow = response.data.main.temp_min;

  highTemp.textContent = Math.round(celsTempHigh) + "°C";
  currentTemp.textContent = Math.round(celsTempCurrent) + "°C";
  lowTemp.textContent = Math.round(celsTempLow) + "°C";

  let humidity = document.querySelector("#humidity");
  humidity.textContent = ` ${response.data.main.humidity}`;

  let wind = document.querySelector("#windspeed");
  wind.textContent = Math.round(response.data.wind.speed);
}

function setForecast(response) {
  for (let i = 0; i < 6; i++) {
    let forecast = response.data.list[i];

    const container = document.createElement("div");
    container.setAttribute("class", "col forecast-container");

    const forecastDateTime = formatForecastDateTime(forecast.dt * 1000);
    const forecastHour = document.createElement("p");
    const forecastDate = document.createElement("small");
    forecastHour.innerText = `${forecastDateTime.hours}:${forecastDateTime.minutes}`;
    forecastDate.innerText = `${forecastDateTime.month} ${forecastDateTime.day}`;
    container.append(forecastHour);
    container.append(forecastDate);

    const icon = document.createElement("img");
    icon.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
    );
    icon.setAttribute("alt", "");
    container.append(icon);

    const degrees = document.createElement("p");
    degrees.setAttribute("class", "forecast-temp");
    degrees.innerText = `${Math.round(forecast.main.temp)}°C`;
    container.append(degrees);

    forecastElement.append(container);
  }
}
