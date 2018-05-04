'use strict'

// import postgres node.js module so we can use a database
const { Client } = require('pg');

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
app.get('/', function (request, response) {
  client.query('SELECT * FROM account;', (err, res) => {
    if (err) throw err;
    var out = "";
    for (let row of res.rows) {
      out += JSON.stringify(row) + "\n";
    }
    response.send(out);
  });
});

// run the server on the given port and let us know that it's working!
app.listen(PORT, function(){
  console.log("Listening on port " + PORT + "!")
});
