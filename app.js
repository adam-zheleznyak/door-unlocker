'use strict'

const { Client } = require('pg');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: true,
});

client.connect();

client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
});

const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.get('/', function (request, response) {
  response.send('Hello World!')
  client.query('SELECT * FROM account;', (err, res) => {
    if (err) throw err;
    for (let row of res.rows) {
      response.send(JSON.stringify(row));
    }d
  });
});

app.listen(PORT, function(){
  console.log("Listening on port 3000!")
});
