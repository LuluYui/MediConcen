const express = require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");
const { config } = require("yargs");
let configfile = require('./config.js');
const app = express();
const port = 4545;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

var server = app.listen(4545, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('start server');
});


app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello World!"));
app.get("/appointment", (req, res) => res.send("This is my appointment page"));


var connection = mysql.createConnection(configfile);

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server");
});

// test if can alter mysql database
let sql = `SELECT * FROM users`;
let createtestac = `INSERT INTO users(id, email, clinicname, phonenum, address, password)
                    VALUES(1, 'test@gmail.com', 'mediconcen', 12345678, 'Hong Kong', 1234)`;

let createtestac2 = `INSERT INTO users(email, clinicname, phonenum, address, password)
                    VALUES('test2@gmail.com', 'mediconcen', 12345678, 'Hong Kong', 2345)`;

app.get('/users', function(req, res){

  connection.query(sql, (error, results, fields) => {
    if (error) {
      return console.error(error.message);
    }
    console.log(results);
  });
  
});

connection.end();
