module.exports ={
  create: function() {
    // Dependencies
    // Variables
    var tmpSess = null;
    // Function
    tmpSess = Math.random().toString(36).substr(2, 10);
    return tmpSess;
  },
  validate: function(userid, key, save) {
    // Dependencies
    var mysql = require('mysql');
    var connection = mysql.createConnection({
      host      : process.env.mysql_host,
      user      : process.env.mysql_user,
      password  : process.env.mysql_password,
      database  : 'sumo'
    });

    // Variables
    var inserts = [userid, key];
    var sql = "SELECT id FROM sumo.users where id = ? AND apikey = ?"

    if (arguments.legth > 2) {
      var inserts = [userid, key, save];
      var sql = "SELECT * FROM sumo.users u, sumo.saves s where s.user_id = u.id AND u.id = ? AND apikey = ? AND s.id = ?"
    }

    // Function
    var response = Promise.defer();

    var query = connection.query(sql, inserts, function(err, rows, fields) {
      if (err) throw err;
      validation = {};
      validation.result = "fail";
      if (rows.length > 0) {
        validation.result = "pass";
      }
      response.resolve(validation);
    });
    // console.log(query.sql);
    return response.promise;
  },
  }
