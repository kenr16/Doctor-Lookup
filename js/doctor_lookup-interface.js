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
