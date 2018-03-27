'use strict'

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect(function(err) {
  if (err) throw err;
  console.log("SQL Database Connected!");
});

const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.get('/', function (request, response) {
  client.query('SELECT * FROM account;', (err, res) => {
    if (err) throw err;
    out = "";
    for (let row of res.rows) {
      out += JSON.stringify(row) + "\n";
    }
    response.send(out);
  });
});

app.listen(PORT, function(){
  console.log("Listening on port " + PORT + "!")
});
