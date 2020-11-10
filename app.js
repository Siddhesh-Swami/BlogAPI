// dotenv to hide private apikeys & passwords
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const app = express();
var mysql = require('mysql2');

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/route_index'));

// creating a connection
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

//connect to MYSQL DB
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to the Database Successfully!");
});

// select query

// con.query('SELECT * FROM usermodel', function (error, results, fields) {
//   if (error)
//       throw error;

//   results.forEach(result => {
//       console.log(result);
//   });
// });

// insert query
/*
con.query('INSERT INTO `blog`.`usermodel` (`username`, `email`, `password`, `bio`) VALUES ("sid2", "sid2@gmail.com", "qwerty", "coder")', function (error, results, fields) {
    if (error)
        throw error;
    else
        console.log("record inserted successfully");    
  
    results.forEach(result => {
        console.log(result);
    });
  });
*/



//GET ALL USERS DATA
app.get("/api/userss", function(req,res){
    let sql = 'SELECT * FROM usermodel';
    let query = con.query(sql, function(err, results){
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
});

//GET USER BY USERNAME

app.get('/api/users/:username',(req, res) => {
    let sql = "SELECT * FROM usermodel WHERE username="+" '"+req.params.username + "' ";
    console.log(sql);
    let query = con.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

// CREATE USER & ADD TO DATABASE
// REGISTRATION

app.post("/api/users", function(req,res){
    let data = {username : req.body.username,
    email : req.body.email,
    password: req.body.password,
    bio : req.body.bio
    };
    let sql = "INSERT INTO usermodel SET ?";
    let query = con.query(sql, data,(err, results) => {
        if(err) throw err;
        res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
      });
})

//UPDATE USER

app.put('/api/users/:username',(req, res) => {
    let sql = "UPDATE usermodel SET password='"+req.body.password+"', email='"+req.body.email+"' WHERE username="+ " '"+ req.params.username + "' ";
    console.log(sql);
    let query = con.query(sql, (err, results) => {
      if(err) throw err;
      res.send(JSON.stringify({"status": 200, "error": null, "response": results}));
    });
  });

const server = app.listen(process.env.PORT || 3000, function(){
	console.log("Server is running on port " + server.address().port);
});