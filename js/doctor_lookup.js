var apiKey = require('./../.env').apiKey;

function Exports() {}

Exports.prototype.getDoctors = function(medicalIssue, location) {
  $.get('https://api.betterdoctor.com/2016-03-01/doctors?query='+ medicalIssue+'&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=' + apiKey)
   .then(function(result) {
      console.log(result);
      console.log(JSON.stringify(result.data[0].profile.first_name));
      console.log(JSON.stringify(result.data[0].profile.last_name));













    })
   .fail(function(error){
      console.log("fail");
    });
};

exports.doctorModule = Exports;
