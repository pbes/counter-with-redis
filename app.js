var express = require('express');
var morgan = require('morgan');
var redis = require('redis');

var port = process.env.PORT || 3000;
var dbhost = process.env.DBHOST || "redis";

var client = redis.createClient(6379, dbhost);

client.on('connect', function(){
  console.log('DB: connected to: ' + dbhost);
});

var app = express();
app.use(morgan('dev'));

app.get('/', function(req, res){
  client.get("counter", function(err, reply){
    if (reply === null) {
      client.set("counter", 0, function() {
        res.json({ counter: 0 });
      });
    } else {
      res.json({ counter: reply });
    }
  });
});

app.put('/inc', function(req, res){
  client.incr("counter", function(err, reply) {
    res.status(204).end();
  });
});

app.put('/dec', function(req, res){
  client.decr("counter", function(err, reply) {
    res.status(204).end();
  });
});

app.listen(port);
console.log('counter is listening on port: ' + port + '...');
