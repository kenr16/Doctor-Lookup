var apiKey = require('./../.env').apiKey;

function Exports() {}

Exports.prototype.getDoctors = function(medicalIssue, location, displayDoctors) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      displayDoctors(result);
   });
};

Exports.prototype.getDoctorsByName = function(doc_name, location, displayDoctors) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?name=' + doc_name + '&location=37.773%2C-122.413%2C100&user_location=37.773%2C-122.413&skip=0&limit=10&user_key=' + apiKey)
   .then(function(result) {
     displayDoctors(result);
   });
};

exports.doctorModule = Exports;
