const deg = '\xB0';
const searchIcon = document.querySelector('#searchIcon');
const locationInput = document.querySelector('input');
const degContainer = document.querySelector('.deg-cont');
const degMeasurement = document.querySelector('#degMeasurement');

let lat;
let long;
let unit = degMeasurement.dataset.unit;

const date = document.querySelector('#date');
const time = document.querySelector('#time');

// when page loads, we are calling for the current weather data.
window.addEventListener('DOMContentLoaded', function () {
  // get coordinates
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude.toString();
    long = position.coords.longitude.toString();
    console.log(lat, long);

    let currentWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${unit}&appid=93fbb945657a5e5ca75650241870b021`;

    fetch(currentWeatherURL).then(function (response) {
      return response.json().then(function (data) {
        console.log(data);
        // add something for error code
        let currentTemp = Math.floor(data.current.temp) + deg;
        let currentFeelsLike = Math.floor(data.current.feels_like) + deg;
        let currentHumidity = data.current.humidity + '%';
        let currentUV = data.current.uvi.toString();
        let currentDesc = data.current.weather;
        let hourly = data.hourly; // 48 objects (arrays) hourly for 2 days. [7] in each hour's array is temp, [10] is weather

        console.log(currentTemp);
        console.log(currentFeelsLike);
        console.log(currentHumidity);
        console.log(currentUV);
        console.log(currentDesc);
        console.log(hourly);
      });
    });
  });

  // toggle farenheight/celcius and set data-unit attribute
  degContainer.addEventListener('click', function () {
    if (degMeasurement.textContent == `F${deg}`) {
      degMeasurement.textContent = `C${deg}`;
      degMeasurement.setAttribute('data-unit', 'metric');
    } else {
      degMeasurement.textContent = `F${deg}`;
      degMeasurement.setAttribute('data-unit', 'imperial');
    }
    unit = degMeasurement.getAttribute('data-unit');
    console.log(unit);
  });

  // date and time
  let currentDate = moment().format('ddd MMMM DD' + ', ' + 'YYYY');
  let currentTime = moment().format('LT');
  date.textContent = currentDate;
  time.textContent = currentTime;
});

// toggle search bar
searchIcon.addEventListener('click', function () {
  locationInput.classList.toggle('show-input');
});
