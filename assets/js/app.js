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
  navigator.geolocation.getCurrentPosition(function (position) {
    let lat = position.coords.latitude.toString();
    let long = position.coords.longitude.toString();
    console.log(long, lat);
    let unit;

    // toggle farenheight/celcius
    degCont.addEventListener('click', function () {
      if (degMeasurement.textContent == `F${deg}`) {
        degMeasurement.textContent = `C${deg}`;
        degMeasurement.setAttribute('data-unit', 'metric');
      } else {
        degMeasurement.textContent = `F${deg}`;
        degMeasurement.setAttribute('data-unit', 'imperial');
      }
    });

    if (degMeasurement.dataset.unit == 'imperial') {
      unit = degMeasurement.dataset.unit;
    } else if (degMeasurement.dataset.unit == 'metric') {
      unit = degMeasurement.dataset.unit;
    }
    console.log(unit);

    let currentWeather = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=${unit}&appid=93fbb945657a5e5ca75650241870b021
    `;

    console.log(currentWeather);

    fetch(currentWeather).then(function (response) {
      return response.json().then(function (data) {
        console.log(data);
        let currentTempF = Math.floor(data.main.temp);
        let weatherDesc = data.weather[0].description;
        let feelsLike = Math.floor(data.main.feels_like);
        let humidity = data.main.humidity + '%';
        let wind = Math.floor(data.wind.speed) + ' mph';
        let high = Math.floor(data.main.temp_max);
        let low = Math.floor(data.main.temp_min);
        console.log(currentTempF + deg);
        console.log(weatherDesc);
        console.log('feels like: ' + feelsLike + deg);
        console.log('humidity: ' + humidity);
        console.log(wind);
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
