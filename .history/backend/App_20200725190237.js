const express = require("express");
var router = express.Router();
var mysql = require("mysql");
var bodyParser = require("body-parser");
const { config } = require("yargs");
let configfile = require('./config.js');
const app = express();
const port = 5000; // Free to change as the free port in the network
const cors = require('cors');
const { response } = require("express");

app.use(bodyParser.json('application/json'));
app.use(cors());
app.use(express.json());

var connection = mysql.createConnection(configfile);

let createDatabase = `CREATE DATABASE IF NOT EXISTS Mediconcen;
USE Mediconcen;
CREATE TABLE users (id INT NOT NULL PRIMARY KEY AUTO_INCREMENT, 
    password INT NOT NULL,
    name VARCHAR(50),
    email VARCHAR(50) NOT NULL UNIQUE,
    clinicname VARCHAR(50),
    phonenum INT,
    address VARCHAR(255),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

USE Mediconcen;
CREATE TABLE IF NOT EXISTS  consultation_record(
    id INT PRIMARY KEY AUTO_INCREMENT,
    doctorname VARCHAR(50),
    patientname VARCHAR(50),
    diagnosis VARCHAR(50),
    medication VARCHAR(50),
    consultation_fee FLOAT,
    date DATETIME,
    followup varchar(50),
    remarks VARCHAR(500),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);`


connection.connect(function (err) {
  if (err) {
    
    return console.error("error: " + err.message);
  }

  connection.query(createDatabase, (error, results, fields) => {
    console.log("Initialize database Mediconcen")
    if (error) {
      return console.error(error.message);
    }
  });

  console.log("Connected to the MySQL server");
});



app.get('/test', function(req, res) {res.send('Hello World')});
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

      if (results.length > 0 ){
        
        res.send({success: false, message: 'User Exists'});
        
      } else {
        
        connection.query(
          "INSERT INTO users(email, clinicname, phonenum, address, password, name) "+ 
          "VALUES (?,?, ?, ?, ?, ?);",
          [email, clinicName, phoneNum, address, password, name], 
          function(err, insertResults, field) {
            
            if (err) {
              console.log(err);
              res.send({ 'success': false, 'message': 'Could not connect database'});
            }
            
            if (insertResults.length > 0 ){
              res.send({success: false, message: 'Registration Failed'});
            } else {
              res.send({success: true, message:  'User ' + name + ' registered successfully'});
              
            }
          }
        );
        
      }
    }
  );
});

//Consultation Record for updating info in Agenda API
app.get('/consultation_record', function(req, res){


  connection.query(
    "SELECT * FROM consultation_record", function(err, results, field) {

      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'Could not connect database'});
      }

      if (results.length > 0 ){

        res.send(results);

      } else {
        console.log(err);
      }

    }
  );
});


// Add consultation_record API
app.post('/addAppointment', function(req, res){
  var id = req.body.id;
  var doctorName = req.body.doctorName;
  var patientName = req.body.patientName;
  var diagnosis = req.body.diagnosis;
  var medication = req.body.medication;
  var consultation_fee = req.body.consultation;
  var date = req.body.date;
  var followup = req.body.followup;
  var remarks = req.body.remarks;


  connection.query(

    "SELECT * FROM consultation_record WHERE id = ? AND patientName = ?",
    [id, patientName], function(err, results, field) {
      if (err) {
        console.log(err);
        res.send({ 'success': false, 'message': 'Could not connect database'});
      }

      if (results.length > 0 ){
        res.send({success: false, message: 'Record Exists'});
        
      } else {
        connection.query(
          "INSERT INTO consultation_record(id, doctorName, patientName," +
           "diagnosis, medication, consultation_fee, date, followup, remarks) "+ 
          "VALUES (?,?, ?, ?, ?, ?, ?, ?, ?);",
          [id, doctorName, patientName, diagnosis, medication, 
            consultation_fee, date, followup, remarks], 
          function(err, insertResults, field) {
            
            if (err) {
              console.log(err);
              res.send({ 'success': false, 'message': 'Could not connect database'});
            }
            
            if (insertResults.length > 0 ){
              res.send({success: false, message: 'Add Record Failed'});

            } else {
              res.send({success: true, message:  'record added successfully'});
              
            }
          }
        );
        
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

