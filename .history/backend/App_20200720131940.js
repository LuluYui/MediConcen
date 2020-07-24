const express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
const { config } = require("yargs");
let configfile = require('./config.js');
const app = express();
const port = 5000;
const cors = require('cors');
const { response } = require("express");

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());

var connection = mysql.createConnection(configfile);

connection.connect(function (err) {
  if (err) {
    return console.error("error: " + err.message);
  }

  console.log("Connected to the MySQL server");
});


// test if can alter mysql database
let sql = `SELECT * FROM users`;

app.get('/users', function(req, res){

  connection.query(sql, (error, results, fields) => {

    if (error) {
      return console.error(error.message);
    }
  });
  res.send({message: "hellow world"});
});

// Login API
app.post('/users', function(req, res){
  var email = req.body.email;
  var password = req.body.password;

  connection.query(
    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password], function(err, results, field) {
      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'Could not connect database'});
      }
      if (results.length > 0 ){
        res.send({success: true, user: results[0].name});
      } else {
        res.send({success: false, message: 'user not found'});
      }
    }
  );
});

// Registration API
app.post('/registration', function(req, res){
  var email = req.body.email;
  var password = req.body.password;
  var name = req.body.name;
  var clinicName = req.body.clinicName;
  var address = req.body.address;
  var phoneNum = req.body.phoneNum;

  connection.query(

    "SELECT * FROM users WHERE email = ? AND password = ?",
    [email, password], function(err, results, field) {
      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'Could not connect database'});
      }
      console.log(typeof results);

      if (results.length > 0 ){

        connection.query(
          "INSERT INTO users(email, clinicname, phonenum, address, password, name) "+ 
          "VALUES (?,?, ?, ?, ?, ?);",
          [email, clinicName, phoneNum, address, password, name], 
          function(err, results, field) {
            
            console.log(results);
            if (err) {
              console.log(err);
              res.send({ 'success': false, 'message': 'Could not connect database'});
            }
            
            if (results.length > 0 ){
              res.send({success: true, user: results[0].name + ' is added'});
            } else {
              res.send({success: false, message: 'Registration Failed'});
            }
          }
        );
        
      } else {
        res.send({success: false, message: 'User Exists'});
      }
    }
  );
});


var server = app.listen(5000, function(){
  var host = server.address().address
  var port = server.address().port
  console.log('start server');
  console.log(`Example app listening at http://localhost:${port}`)
});

let createtestac = `INSERT INTO users(id, email, clinicname, phonenum, address, password)
                    VALUES(1, 'test@gmail.com', 'mediconcen', 12345678, 'Hong Kong', 1234)`;

let createtestac2 = `INSERT INTO users(email, clinicname, phonenum, address, password)
                    VALUES('test2@gmail.com', 'mediconcen', 12345678, 'Hong Kong', 2345)`;

// Main Interaction with the database
/*
app.get('/users', function(req, res){

  connection.query(sql, (error, results, fields) => {

    if (error) {
      return console.error(error.message);
    }
    console.log(req.body);
  });
  
});

router.post('/user', function(req, res, next) {
 
});
 


module.exports = router;
*/ 