// Dependencies
var yoko = require('../dist/yokozuna')
var express = require('express');
var router = express.Router();

// Routes
router.get('/version', function(req, res){
  response = {};
  response = yoko.versionJSON();
  res.send(response);
  console.log('/api/version: ' + response);
})

router.get('/package', function(req, res){
  response = {};
  response = yoko.packageJSON();
  res.send(response);
  console.log('/api/package: ' + response);
})

// Return router
module.exports = router;
