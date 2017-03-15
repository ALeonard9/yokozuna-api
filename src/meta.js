// Functions
module.exports ={
  versionJSON: function() {
    // Dependencies
    var fs = require('fs');
    // Variables
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    var version = pkg.version;
    // Function
    var response = {};
    response.version = version;
    return response;
  },
  packageJSON: function() {
    // Dependencies
    var fs = require('fs');
    // Variables
    pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
    // Function
    var response = {};
    response = pkg;
    return response;
  }
};
