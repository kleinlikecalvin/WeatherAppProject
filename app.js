function displayTimeDate(timestamp) {
  let now = new Date();
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
//displayTimeDate();

var apiKey = "653f09d54f4697e3cc7833c0f0cc1a51";

function getCity(response) {
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
  celTempHigh = response.data.main.temp_max;
  celTempCurrent = response.data.main.temp;
  celTempLow = response.data.main.temp_min;
  let humidity = document.querySelector("#humidity-container");
  humidity.innerHTML = `Humidity: ${response.data.main.humidity}`;
  let wind = document.querySelector("#wind-speed-container");
  wind.innerHTML = `Wind Speed: ${Math.round(response.data.wind.speed)}`;
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast-row");
  let forecast = null;
  for (let index = 0; index < 6; index++) {
    let forecast = response.data.list[index];
    console.log(forecast);
    forecastElement.innerHTML += `
    <div class="col-2" id="forecast-container">
      ${displayTimeDate(forecast.dt * 1000)}
      <br/>
      <img src="http://openweathermap.org/img/wn/${
        forecast.weather[0].icon
      }@2x.png" alt="" id="forecast-icons"/>
      <br/>
      ${Math.round(forecast.main.temp)}°C
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
  axios.get(`${apiUrl}`).then(displayTimeDate).then(displayForecast);
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
  axios
    .get(`${apiUrl}`)
    .then(getCity)
    .then(displayTimeDate)
    .then(displayForecast);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-geolocation");
button.addEventListener("click", getCurrentPosition);

let celTempHigh = null;
let celTempCurrent = null;
let celTempLow = null;

function displayFahrTemp(event) {
  event.preventDefault();
  let fahrTempHigh = (celTempHigh * 9) / 5 + 32;
  let fahrTempCurrent = (celTempCurrent * 9) / 5 + 32;
  let fahrTempLow = (celTempLow * 9) / 5 + 32;
  let highTempCelsDefault = document.querySelector("#high-temp");
  let currentTempCelsDefault = document.querySelector("#current-temp");
  let lowTempCelsDefault = document.querySelector("#low-temp");
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  highTempCelsDefault.innerHTML = Math.round(fahrTempHigh) + "°F";
  currentTempCelsDefault.innerHTML = Math.round(fahrTempCurrent) + "°F";
  lowTempCelsDefault.innerHTML = Math.round(fahrTempLow) + "°F";
}
let fahrenheitLink = document.querySelector("#fahrenheit-a");
fahrenheitLink.addEventListener("click", displayFahrTemp);

function displayCelTemp(event) {
  event.preventDefault();
  let highTempCelsDefault = document.querySelector("#high-temp");
  let currentTempCelsDefault = document.querySelector("#current-temp");
  let lowTempCelsDefault = document.querySelector("#low-temp");
  fahrenheitLink.classList.remove("active");
  celsiusLink.classList.add("active");
  highTempCelsDefault.innerHTML = Math.round(celTempHigh) + "°C";
  currentTempCelsDefault.innerHTML = Math.round(celTempCurrent) + "°C";
  lowTempCelsDefault.innerHTML = Math.round(celTempLow) + "°C";
}
let celsiusLink = document.querySelector("#celsius-a");
celsiusLink.addEventListener("click", displayCelTemp);
