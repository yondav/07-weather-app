const deg = '\xB0';

const wrap = document.querySelector('.wrapper');
const searchIcon = document.querySelector('#searchIcon');
const locationInput = document.querySelector('input');
const degCont = document.querySelector('.deg-cont');
const degMeasurement = document.querySelector('#degMeasurement');

const mainCard = document.querySelector('main');

let lat;
let long;
let currentWeatherURL;

window.addEventListener('DOMContentLoaded', function () {
  console.log('loaded');
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude.toString();
    let long = position.coords.longitude.toString();
    console.log(long, lat);
    let currentWeatherF = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=imperial&appid=93fbb945657a5e5ca75650241870b021
    `;
    let currentWeatherC = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=93fbb945657a5e5ca75650241870b021
    `;
    console.log(currentWeatherF);
    console.log(currentWeatherC);

    fetch(currentWeatherF).then(function (response) {
      return response.json().then(function (data) {
        console.log(data);
        let currentTempF = data.main.temp;
        let weatherDesc = data.weather[0].description;
        let feelsLike = data.main.feels_like;
        let humidity = data.main.humidity;
        let high = data.main.temp_max;
        let low = data.main.temp_min;
        console.log(currentTempF + deg);
        console.log(weatherDesc);
        console.log('feels like: ' + feelsLike + deg);
        console.log('humidity: ' + humidity);
        console.log('high: ' + high + deg);
        console.log('low: ' + low + deg);
        // let tempEl = document.createElement('span');
        // tempEl.textContent = currentTempF;

        // mainCard.appendChild(tempEl);
      });
    });
  });
});

// toggle search bar
searchIcon.addEventListener('click', function () {
  // console.log('search');
  locationInput.classList.toggle('show-input');
});

// toggle farenheight/celcius
