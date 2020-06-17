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

var apiKey = "653f09d54f4697e3cc7833c0f0cc1a51";

function getCity(response) {
  console.log(response);
  let cityName = (document.querySelector("#current-city").innerHTML =
    response.data.name);
  let highTempCelsDefault = (document.querySelector("#high-temp").innerHTML =
    Math.round(response.data.main.temp_max) + "°C");
  let currentTempCelsDefault = (document.querySelector(
    "#current-temp"
  ).innerHTML = Math.round(response.data.main.temp) + "°C");
  let lowTempCelsDefault = (document.querySelector("#low-temp").innerHTML =
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
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-geolocation");
button.addEventListener("click", getCurrentPosition);

function displayFahrTemp(event) {
  event.preventDefault();
  let fahrTemp = Math.round((14 * 9) / 5 + 32);
  let highTempCelsDefault = document.querySelector("#high-temp");
  let currentTempCelsDefault = document.querySelector("#current-temp");
  let lowTempCelsDefault = document.querySelector("#low-temp");
  highTempCelsDefault.innerHTML = fahrTemp + "°F";
  currentTempCelsDefault = fahrTemp + "°F";
  lowTempCelsDefault = fahrTemp + "°F";
  alert(fahrTemp);
}
let fahrenheitLink = document.querySelector("#fahrenheit-a");
fahrenheitLink.addEventListener("click", displayFahrTemp);
