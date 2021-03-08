const deg = '\xB0';
const searchIcon = document.querySelector('#searchIcon');
const locationInput = document.querySelector('input');
const degContainer = document.querySelector('.deg-cont');
const degMeasurement = document.querySelector('#degMeasurement');
const currentTemp = document.querySelector('.currentTemp');
const currentFeels = document.querySelector('.currentFeels');
const currentHumidity = document.querySelector('.currentHumidity');
const currentUV = document.querySelector('.currentUV');
const currentDesc = document.querySelector('.currentDesc');
const currentWind = document.querySelector('.currentWind');
const currentIcon = document.querySelector('.currentIcon');
const mainHourly = document.querySelector('.hourly-card');

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

    const currentWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${unit}&exclude=daily,minutely&appid=93fbb945657a5e5ca75650241870b021`;

    fetch(currentWeatherURL).then(function (response) {
      return response.json().then(function (data) {
        console.log(data);
        // add something for error code
        const iconCode = data.current.weather[0].icon;
        const iconSource = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

        currentIcon.src = iconSource;
        currentIcon.alt = data.current.weather[0].description;
        currentTemp.textContent = Math.floor(data.current.temp) + deg;
        currentDesc.textContent = data.current.weather[0].description;
        currentWind.textContent = Math.floor(data.current.wind_speed) + 'mph';
        currentHumidity.textContent = data.current.humidity + '%';
        currentFeels.textContent = Math.floor(data.current.feels_like) + deg;
        currentUV.textContent = data.current.uvi.toString();

        // console log for 24 hours of the 48 given
        console.log(data.hourly.slice(0, -24));
        let hourlyCard = data.hourly.slice(0, -24).map(function (item) {
          const hourlyTemp = Math.floor(item.temp) + deg;
          const hourlyIconCode = item.weather[0].icon;
          const hourlyIconSource = `http://openweathermap.org/img/wn/${hourlyIconCode}@2x.png`;
          const hourlyDesc = item.weather[0].description;

          return `<div class="hourly-wrap">
              <div class="hourlyTime-card">
                <h6 class="hourly">10AM</h6>
                <img src="${hourlyIconSource}" alt="${hourlyDesc}" class="hourlyIcon">
                <h4 class="hourlytemp">${hourlyTemp}</h4>
              </div>
            </div>`;
        });
        hourlyCard = hourlyCard.join('');
        mainHourly.innerHTML = hourlyCard;
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
  const currentDate = moment().format('ddd MMMM DD' + ', ' + 'YYYY');
  const currentTime = moment().format('LT');
  date.textContent = currentDate;
  time.textContent = currentTime;
});

// toggle search bar
searchIcon.addEventListener('click', function () {
  locationInput.classList.toggle('show-input');
});
