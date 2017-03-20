// Functions
module.exports ={
  newRound: function(save_id) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    // Function
    var response = Promise.defer();
    connection.query('CALL newRound(?)', save_id, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    return response.promise;
  },
  simDay: function(save_id, tou, day) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    // Function
    var response = Promise.defer();
    connection.query('CALL simDay(?, ?, ?)', [save_id, tou, day], function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    return response.promise;
  }
};
