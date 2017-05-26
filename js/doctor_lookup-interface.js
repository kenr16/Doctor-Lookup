var Exports = require('./../js/doctor_lookup.js').doctorModule;


$(document).ready(function() {
var listOfDoctors = new Exports();
  $('#user_input').submit(function(e) {
    console.log("Form Submitted!")
    e.preventDefault();
    var symptom = $('#symptom').val();
    $('#symptom').val("");
    var location = "";
    listOfDoctors.getDoctors(symptom, location);
  });
});
