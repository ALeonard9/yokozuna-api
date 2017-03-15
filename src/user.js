// Functions
module.exports ={
  create: function(email, password) {
    // Dependencies
    var apikey = require('../dist/apikey');
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    var key = apikey.create();
    var inserts = {
      email: email,
      password: password,
      apikey: key
    };
    // Function
    var response = Promise.defer();
    connection.connect();
    connection.query('INSERT INTO sumo.users SET ?', inserts, function(err, result) {
      if (err) throw err;
      result.apikey = key;
      response.resolve(result);
    });
    return response.promise;
  }
};
