var Exports = require('./../js/doctor_lookup.js').doctorModule;

var displayDoctors = function(result) {
  console.log(result);
  var doctors = result.data;
  doctors.forEach(function(doctor, i) {
    var first = JSON.stringify(doctor.profile.first_name);
    var last = JSON.stringify(doctor.profile.last_name);
    var name = first.concat(" ").concat(last).split('"').join("");
    var bio = JSON.stringify(doctor.profile.bio);
    $('#list_of_doctors').append("<li>" + name + "</li><br>");
    $('#list_of_doctors').append("<li>" + bio + "</li><hr>");
  });
};

$(document).ready(function() {

  function getLocation() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(showPosition);
      } else {
          $('#list_of_doctors').append("Geolocation is not supported by this browser.");
      }
  }
  function showPosition(position) {
      $('#list_of_doctors').append("Latitude: " + position.coords.latitude +
      "<br>Longitude: " + position.coords.longitude);
      
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
    listOfDoctors.getDoctors(symptom, location, displayDoctors);
  });

  $('#search_by_name').submit(function(e) {
    e.preventDefault();
    var doc_name = $('#name_input').val();
    $('#name_input').val("");
    var location = "";
    $('#list_of_doctors').text("");
    listOfDoctors.getDoctorsByName(doc_name, location, displayDoctors);
  });
});
