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
    connection.query('INSERT INTO sumo.users SET ?', inserts, function(err, result) {
      if (err) throw err;
      result.apikey = key;
      response.resolve(result);
    });
    return response.promise;
  },
  delete: function(userid) {
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
    var query = connection.query('DELETE FROM `sumo`.`users` WHERE id = ?', userid, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    console.log(query.sql)
    return response.promise;
  },
  readSaves: function(userid) {
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
    var query = connection.query('SELECT * FROM `sumo`.`saves` WHERE `user_id`= ?', [userid], function(err, rows, fields) {
      if (err) throw err;
      response.resolve(rows);
    });
    console.log(query.sql)
    return response.promise;
  }
};
