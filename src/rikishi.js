// Functions
module.exports ={
  create: function(save_id, name_id, wt, str, spd, teq, birth, color_id, cc) {
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
      save_id: save_id,
      name_id: name_id,
      weight: wt,
      strength: str,
      speed: spd,
      technique: teq,
      birth: birth,
      color_id: color_id,
      cc: cc
    };
    // Function
    var response = Promise.defer();
    connection.query('INSERT INTO sumo.rikishi SET ?', inserts, function(err, result) {
      if (err) throw err;
      console.log(JSON.stringify(result));
      response.resolve(result);
    });
    return response.promise;
  },
  createUserRikishi: function(save_id, name_id, color_id, cc) {
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
      save_id: save_id,
      name_id: name_id,
      weight: 150,
      strength: 50,
      speed: 50,
      technique: 50,
      birth: 1987,
      color_id: color_id,
      cc: cc
    };
    // Function
    var response = Promise.defer();
    var query = connection.query('INSERT INTO sumo.rikishi SET ?', inserts, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    // console.log(query.sql);
    return response.promise;
  },
  initializeRikishi: function(save_id) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    var response = Promise.defer();
    var query = connection.query('CALL initialRikishi(?)', save_id, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    // console.log(query.sql);
    return response.promise;
  },
  initializeRankings: function(save_id) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });
    // Variables
    var response = Promise.defer();
    var query = connection.query('CALL initialRankings(?)', save_id, function(err, result) {
      if (err) throw err;
      response.resolve(result);
    });
    // console.log(query.sql);
    return response.promise;
  }
};
