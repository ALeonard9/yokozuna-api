// Dependencies
var meta = require('../dist/meta');
var save = require('../dist/save');
var user = require('../dist/user');
var rikishi = require('../dist/rikishi');
var apikey = require('../dist/apikey');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({extended: true }));


// Routes
router.get('/version', function(req, res){
  response = {};
  response = meta.versionJSON();
  res.send(response);
  console.log('/api/version: ' + response);
})

router.get('/package', function(req, res){
  response = {};
  response = meta.packageJSON();
  res.send(response);
  console.log('/api/package: ' + response);
})

router.post('/save', function(req, res){
  var userid = req.body.userid;
  var key = req.body.apikey;
  response = apikey.validate(userid, key)
    .then((data) => {
      if (data.result == 'fail') {
        console.log('Validation failed. userid: ' + userid + ' apikey: ' + apikey);
        res.send('Validation failed.');
        return;
      }
    })
    .then((data) => {
      response = save.create(userid)
        .then((data) => {
          console.log('/api/user put: ' + JSON.stringify(data));
          res.send(data);
        });
    });
})

router.post('/user', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  response = user.create(email, password)
    .then((data) => {
      console.log('/api/user put: ' + JSON.stringify(data));
      res.send(data);
    });
})

router.post('/game', function(req, res){
  response = apikey.validate(req.body.userid, req.body.key)
    .then((data) => {
      if (data.result == 'fail') {
        console.log('Validation failed. userid: ' + req.body.userid + ' apikey: ' + req.body.key);
        res.send('Validation failed.');
        return;
      }
    })
    .then((data) => {
      response2 = rikishi.createUserRikishi(req.body.save_id, req.body.name_id, req.body.color_id, req.body.cc)
        .then((data2) => {
          console.log('/api/rikishi put: ' + JSON.stringify(data2));
          save.update(req.body.save_id, {rikishi_id: data2['insertId']})
            .then((data3) => {
                rikishi.initializeRikishi(req.body.save_id)
                  .then((data4) => {
                    rikishi.initializeRankings(req.body.save_id)
                      .then((data5) => {
                        res.send(data2);
                      });
                  });
            });
        });
    });
})


router.post('/test', function(req, res){
  response = apikey.validate(1, 123445)
    .then((data) => {
      res.send(data);
      console.log('/api/test: ' + JSON.stringify(data));
    });
})

// Return router
module.exports = router;
