'use strict'

// import postgres node.js module so we can use a database
const {
  Client
} = require('pg');

// create a client object so we can communicate with the database
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

// set port for the server to be the port given to us by Heroku
const PORT = process.env.PORT || 5000;

// import Express node.js module as our web framework to handle connections
// and create our app object from it
const express = require('express');
const app = express();

// for making requests to our ESP8266
// const http = require('http');
// const request_mod = require('request');
// const shell = require('shelljs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

// connect to our database and print any errors or if the connection was successful
client.connect(function(err) {
  if (err) throw err;
  console.log("SQL Database Connected!");
});

// Anytime someone tries to connect to the root path ('/') of our site
// the server will request all the information from every account in the database
// and then output each row of the JSON data we are given onto the webpage.
// This is a temporary debugging tool to make sure the database is working properly
// and we're planning to hide the database contents from users.
app.get('/', function(request, response) {
  response.sendFile('main.html', {root: __dirname});
  // client.query('SELECT * FROM account;', (err, res) => {
  //   if (err) throw err;
  //   var out = "";
  //   for (let row of res.rows) {
  //     out += JSON.stringify(row) + "\n";
  //   }
  //   response.send(out);
  // });
});

app.post('/signup', function(request, response) {
  response.sendFile('signupconfirm.html', {root: __dirname});
  console.log('New user: ' + request.body.user + " [password: " + request.body.password + " ]");
});

app.post('/login', function(request, response) {
  response.sendFile('unlock.html', {root: __dirname});
  console.log(request.body.user + " logged in.");
});


// app.get('/open', function(request, response) {
//   console.log('Got request to open door.');
//   //request_mod.get('http://20.18.1.85/stepper/start');
//   shell.exec('curl http://20.18.1.85/stepper/start')
//   response.send('Sent request to open door!');
// });
//
// app.get('/stop', function(request, response) {
//   console.log('Got request to stop opening.');
//   //request_mod.get('http://20.18.1.85/stepper/stop');
//   shell.exec('curl http://20.18.1.85/stepper/stop')
//   response.send('Sent request to stop opening!');
// });

// run the server on the given port and let us know that it's working!
app.listen(PORT, function() {
  console.log("Listening on port " + PORT + "!")
});
