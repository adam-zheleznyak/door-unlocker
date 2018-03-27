'use strict'

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.get('/', function (request, response) {
  client.query('SELECT * FROM account;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.send(JSON.stringify(row));
    }
  });
  client.end((err) => {
    console.log('client has disconnected')
      if (err) {
        console.log('error during disconnection', err.stack)
      }
    });
});

app.listen(PORT, function(){
  console.log("Listening on port 3000!")
});
