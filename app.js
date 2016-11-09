var express = require('express');
var morgan = require('morgan');
var redis = require('redis');

var port = process.env.PORT || 3000;
var dbhost = process.env.DBHOST || "redis";

var client = redis.createClient(6379, dbhost);
var connected = false;

client.on('connect', function(){
  connected = true;
  console.log('DB: connected to: ' + dbhost);
});

client.on('error', function(err) {
  console.error('Can\'t connect to Redis DB', err);
});

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res) {
  if (connected) {
    client.incr("counter", function(err, counter){
      if (err) {
        res.json({ status: "ERROR", reason: err });
      } else {
        res.json({ status: "OK", counter: counter });
      }
    });
  } else {
    res.json({ status: "ERROR", reason: "Not connected to DB" });
  }
});

app.listen(port);
console.log('counter is listening on port: ' + port + '...');
