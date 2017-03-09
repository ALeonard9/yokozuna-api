
// Functions
module.exports.versionJSON = function () {
  // Dependencies
  var fs = require('fs');
  // Variables
  pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  var version = pkg.version;
  // Function
  var response = {};
  response.version = version;
  console.log(response);
  return response;
};

module.exports.packageJSON = function () {
  // Dependencies
  var fs = require('fs');
  // Variables
  pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  // Function
  var response = {};
  response = pkg;
  return response;
};
