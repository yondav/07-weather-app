const deg = '\xB0';

const currentDate = moment().format('ddd MMMM DD' + ', ' + 'YYYY');
const currentTime = moment().format('LT');

const searchForm = document.querySelector('form');
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
const sectionHourly = document.querySelector('.hourly-card');
const sectionDaily = document.querySelector('.daily');

let lat;
let long;
let unit = degMeasurement.dataset.unit;

const date = document.querySelector('#date');
const time = document.querySelector('#time');

// fetch call
function getWeather(lat, long) {
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=${unit}&exclude=minutely&appid=93fbb945657a5e5ca75650241870b021`;

  fetch(currentWeatherURL).then(function (response) {
    return response.json().then(function (data) {
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

      // hourly get specs and append
      let hourlyCard = data.hourly.slice(0, -24).map(function (item) {
        const hourlyTemp = Math.floor(item.temp) + deg;
        const hourlyIconCode = item.weather[0].icon;
        const hourlyIconSource = `http://openweathermap.org/img/wn/${hourlyIconCode}@2x.png`;
        const hourlyDesc = item.weather[0].description;

        // get hour for hourly display
        const hourUnix = item.dt;
        const hour = moment(hourUnix * 1000).format('ha');

        return `<div class="hourly-wrap">
            <div class="hourlyTime-card">
              <h6 class="hourly">${hour}</h6>
              <img src="${hourlyIconSource}" alt="${hourlyDesc}" class="hourlyIcon">
              <h4 class="hourlytemp">${hourlyTemp}</h4>
            </div>
          </div>`;
      });
      hourlyCard = hourlyCard.join('');
      sectionHourly.innerHTML = hourlyCard;

      let dailyCard = data.daily.map(function (item) {
        const dailyTemp = Math.floor(item.temp.day) + deg;
        const dailyHigh = Math.floor(item.temp.max) + deg;
        const dailyLow = Math.floor(item.temp.min) + deg;
        const dailyIconCode = item.weather[0].icon;
        const dailyIconSource = `http://openweathermap.org/img/wn/${dailyIconCode}@2x.png`;
        const dailyDesc = item.weather[0].description;
        const dailyHumidity = item.humidity;
        const dailyWind = item.wind_speed + '%';

        // get date for day display
        const dateUnix = item.dt;
        const date = moment(dateUnix * 1000).format('ddd, MMM DD');

        return `<div class="daily-card">
        <div class="card-center">
          <h5 class="dailyDate">${date}</h5>
          <img src="${dailyIconSource}" alt="${dailyDesc}" class="daily-icon">
          <h3 class="dailyTemp">${dailyTemp}</h3>
          <p class="dailyDesc">${dailyDesc}</p>
        </div>

        <div class="daily-inner-cont">
          <div class="card-side-left">
            <p>Humidity: <span class="dailyHumidity">${dailyHumidity}</span></p>
            <p>Wind: <span class="dailyWind">${dailyWind}</span></p>
          </div>

          <div class="card-side-right">
            <p>
              <i class="fas fa-angle-up"></i>
              <span class="high">${dailyHigh}</span>
            </p>
            <p>
              <i class="fas fa-angle-down"></i>
              <span class="low">${dailyLow}</span>
            </p>
          </div>
        </div>
      </div>`;
      });
      dailyCard = dailyCard.join('');
      sectionDaily.innerHTML = dailyCard;
    });
  });
}

// get weather from search bar
searchForm.addEventListener('submit', function (e) {
  e.preventDefault();
  let zipCode = locationInput.value;
  const currentWeatherURL = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode},us&appid=93fbb945657a5e5ca75650241870b021`;

  fetch(currentWeatherURL).then(function (response) {
    return response.json().then(function (data) {
      getWeather(data.coord.lat, data.coord.lon);
      searchForm.reset();
    });
  });
});

// toggle search bar
searchIcon.addEventListener('click', function () {
  locationInput.classList.toggle('show-input');
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
  getWeather(lat, long);
});

// when page loads, we are calling for the current weather data.
window.addEventListener('DOMContentLoaded', function () {
  // date and time
  date.textContent = currentDate;
  time.textContent = currentTime;
  // get coordinates
  navigator.geolocation.getCurrentPosition(function (position) {
    lat = position.coords.latitude.toString();
    long = position.coords.longitude.toString();
    getWeather(lat, long);
  });
});
