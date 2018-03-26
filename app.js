'use strict'

const PORT = process.env.PORT || 5000;

const express = require('express');
const app = express();

app.get('/', function (req, res) {
  res.send('Hellow World!')
});

app.listen(PORT, function(){
  console.log("Listening on port 3000!")
});
