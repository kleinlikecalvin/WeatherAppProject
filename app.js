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

function search(response) {
  console.log(response);
  let city = document.querySelector("#search-box");
  city.innerHTML = city.value;
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=" +
    apiKey +
    "&units=metric";
  axios.get(`${apiUrl}`).then(getCity);
}
function getCity(response) {
  let cityName = (document.querySelector("#current-city").innerHTML =
    response.data.name);
  let highTempCelsDefault = (document.querySelector("#high-temp").innerHTML =
    Math.round(response.data.main.temp_max) + "°C");
  let currentTempCelsDefault = (document.querySelector(
    "#current-temp"
  ).innerHTML = Math.round(response.data.main.temp) + "°C");
  let lowTempCelsDefault = (document.querySelector("#low-temp").innerHTML =
    Math.round(response.data.main.temp_min) + "°C");
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
  axios.get(`${apiUrl}`).then(getCity);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#current-geolocation");
button.addEventListener("click", getCurrentPosition);
