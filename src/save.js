// Functions
module.exports ={
  create: function(userid) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    var inserts = {
      user_id: userid,
      curr_tourney: 1,
      exp: 0,
      money: 0
    };
    // Function
    var response = Promise.defer();
    connection.connect();
    connection.query('INSERT INTO sumo.saves SET ?', inserts, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    return response.promise;
  },
  update: function(save_id, inserts) {
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
    connection.connect();
    var query = connection.query('UPDATE sumo.saves SET ? WHERE id = ?', [inserts, save_id], function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    return response.promise;
  }
};
