// dotenv to hide private apikeys & passwords
require('dotenv').config()

const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//used mysql2
var mysql = require('mysql2');
const {db} = require("./models/index");

var server;
// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json());

// parse application/json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(require('./routes/route_index'));

// creating a connection

// var con = mysql.createConnection({
//   host: process.env.DB_HOST,
//   user: process.env.DB_USER,
//   password: process.env.DB_PASS,
//   database: process.env.DB_NAME
// });

//connect to MYSQL DB
// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Connected to the Database Successfully!");
// });

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

try {
  db.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

db.sync()
  .then(() => {
      console.log("Tables created");
      server = app.listen(process.env.PORT || 3000, function(){
      console.log("Server is running on port " + server.address().port);
      });
  })
  .catch( function (err) {
    console.error(err)
  })  

// module.exports = con;