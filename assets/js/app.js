window.addEventListener('load', function () {
  let long;
  let lat;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function (position) {
      long = position.coords.longitude;
      lat = position.coords.latitude;
    });
  } //else for if user doesn't allow geolocation
});
