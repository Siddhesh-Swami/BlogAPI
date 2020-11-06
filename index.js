require('dotenv').config()

const express = require("express");
const app = express();
var mysql = require('mysql2');
// To connect to mysql DB
var con = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

con.query('SELECT * FROM usermodel', function (error, results, fields) {
  if (error)
      throw error;

  results.forEach(result => {
      console.log(result);
  });
});

app.get("/", function(req,res){
	res.send("Hello World");
});

app.listen(3000, function(){
	console.log("Server is running on port 3000.");
});