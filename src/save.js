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
    var query = connection.query('UPDATE sumo.saves SET ? WHERE id = ?', [inserts, save_id], function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    return response.promise;
  },
  delete: function(save_id) {
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
    connection.query('DELETE FROM `sumo`.`matches` WHERE `save_id`= ?', [save_id], function(err, result) {
      if (err) throw err;
      connection.query('DELETE FROM `sumo`.`winners` WHERE `save_id`= ?', [save_id], function(err, result) {
        if (err) throw err;
        connection.query('DELETE FROM `sumo`.`rikishi` WHERE `save_id`= ?', [save_id], function(err, result) {
          if (err) throw err;
          connection.query('DELETE FROM `sumo`.`saves` WHERE `id`= ?', [save_id], function(err, result) {
            if (err) throw err;
            response.resolve(result);
          });
        });
      });
    });
    return response.promise;
  },
  read: function(save_id) {
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
    var query = connection.query('SELECT * FROM `sumo`.`saves` WHERE `id`= ?', [save_id], function(err, rows, fields) {
      if (err) throw err;
      response.resolve(rows);
    });
    console.log(query.sql)
    return response.promise;
  }
};
