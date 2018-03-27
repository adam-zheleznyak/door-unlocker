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
  client.end();
});

const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hellow World!')
});

app.listen(PORT, function(){
  console.log("Listening on port 3000!")
});
