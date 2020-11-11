var router = require('express').Router();
var mysql = require('mysql2');

var con = require('../../app');

router.get("/test", function(req,res){
  res.send("test successful");
})


module.exports = router;