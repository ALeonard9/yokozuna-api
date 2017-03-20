// Dependencies
var meta = require('../dist/meta');
var save = require('../dist/save');
var user = require('../dist/user');
var rikishi = require('../dist/rikishi');
var apikey = require('../dist/apikey');
var game = require('../dist/game');
const async = require('async');
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

router.get('/save/:id', function(req, res){
  response = save.read(req.params.id)
    .then((data) => {
      console.log('/api/user get: ' + JSON.stringify(data));
      res.send(data);
    });
})

router.delete('/save', function(req, res){
  var userid = req.body.userid;
  var key = req.body.apikey;
  var saveid = req.body.save_id
  response = apikey.validate(userid, key, saveid)
    .then((data) => {
      if (data.result == 'fail') {
        console.log('Validation failed. userid: ' + userid + ' apikey: ' + apikey);
        res.send('Validation failed.');
        return;
      }
    })
    .then((data) => {
      response = save.delete(saveid)
        .then((data) => {
          console.log('/api/user delete: ' + JSON.stringify(data));
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
router.get('/user/:id', function(req, res){
  response = user.readSaves(req.params.id)
    .then((data) => {
      console.log('/api/user get: ' + JSON.stringify(data));
      res.send(data);
    });
})
// router.delete('/user/:id', function(req, res){
//   var prom = Promise.defer();
//   response = apikey.validate(req.body.userid, req.body.apikey)
//     .then((data) => {
//       if (data.result == 'fail') {
//         console.log('Validation failed. userid: ' + userid + ' apikey: ' + apikey);
//         res.send('Validation failed.');
//         return;
//       }
//     })
//     .then((data) => {
//       response = user.readSaves(req.body.userid)
//         .then((data2) => {
//           console.log(data2);
//           for (var i in data2) {
//             id = data2[i]['id'];
//             console.log("Length" + data2.length);
//             console.log("Iterator " + i);
//             save.delete(id)
//               .then((data) => {
//
//                 if (i == data2.length -1) {
//
//                 }
//               })
//             console.log("Deleted Save id: " + id);
//           }
//           prom.resolve("Finished");
//         });
//     })
//     res.send(prom.promise);
// })
router.delete('/user/:id', function(req, res){
  response = apikey.validate(req.body.userid, req.body.apikey)
    .then((data) => {
      if (data.result == 'fail') {
        console.log('Validation failed. userid: ' + userid + ' apikey: ' + apikey);
        res.send('Validation failed.');
        return;
      }
    })
    .then((data) => {
      response = user.readSaves(req.body.userid)
        .then((data2) => {
          async.forEachOf(data2, function (value, key, callback) {
                try {
                  save.delete(data2[key]['id'])
                    .then((data3) => {
                      console.log("Deleted Save id: " + data2[key]['id']);
                      if (key == data2.length -1) {
                        user.delete(req.body.userid)
                      }
                    })
                } catch (e) {
                    return callback(e);
                }
                callback()
            });
        })
        });
    res.send("User " + req.body.userid +" removed");
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
                        game.newRound(req.body.save_id)
                          .then((data6) => {
                            res.send(data2);
                          });
                      });
                  });
            });
        });
    });
})


router.post('/test', function(req, res){
  response = game.newRound(req.body.save_id)
    .then((data) => {
      res.send(data);
      console.log('/api/test: ' + JSON.stringify(data));
    });
})

// Return router
module.exports = router;
