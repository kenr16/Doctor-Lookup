var Exports = require('./../js/doctor_lookup.js').doctorModule;

var displayDoctors = function(result) {
  console.log(result);
  var doctors = result.data;
  doctors.forEach(function(doctor, i) {
    var first = JSON.stringify(doctor.profile.first_name);
    var last = JSON.stringify(doctor.profile.last_name);
    var name = first.concat(" ").concat(last).split('"').join("");
    var bio = JSON.stringify(doctor.profile.bio);
    var image = JSON.stringify(doctor.profile.image_url);
    var title = JSON.stringify(doctor.profile.title).split('"').join("");
    var distance = JSON.stringify(doctor.practices[0].distance.toFixed(1)).split('"').join("");
    var practice = JSON.stringify(doctor.practices[0].name);
    $('#list_of_doctors').append("<li class='doctordiv'>" + name + ", " + title + ".<br>" + practice + "<br>Distance: " + distance + " miles" + "<img src=" + image + "/><br>");
    $('#list_of_doctors').append(bio + "</li><hr class='bar'>");
  });
};


function initMap() {
  var uluru = {lat: -25.363, lng: 131.044};
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 4,
    center: uluru
  });
  var marker = new google.maps.Marker({
    position: uluru,
    map: map
  });
}


$(document).ready(function() {

  initMap();

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          $('#list_of_doctors').append("Geolocation is not supported by this browser.");
      }
  }
  function showPosition(position) {
      $('#list_of_doctors').append("Latitude: " + position.coords.latitude.toFixed(3) +
      "<br>Longitude: " + position.coords.longitude.toFixed(3));
      lat = position.coords.latitude.toFixed(3);
      long = position.coords.longitude.toFixed(3);

  }

  getLocation();

  //Function to make an API call to pull the user's IP address.  Currently unused.
  $.getJSON('http://freegeoip.net/json/?callback=')
    .then(function(data) {
    console.log(JSON.stringify(data.ip));
  });

var listOfDoctors = new Exports();
  $('#search_by_symptom').submit(function(e) {
    e.preventDefault();
    var symptom = $('#symptom').val();
    $('#symptom').val("");
    var location = "";
    $('#list_of_doctors').text("");
    listOfDoctors.getDoctors(symptom, displayDoctors, lat, long);
  });

  $('#search_by_name').submit(function(e) {
    e.preventDefault();
    var doc_name = $('#name_input').val();
    $('#name_input').val("");
    var location = "";
    $('#list_of_doctors').text("");
    listOfDoctors.getDoctorsByName(doc_name, displayDoctors, lat, long);
  });
});
