// DEPENDENCIES
var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

// CONSTANTS
const NODE_PORT = process.env.NODE_PORT || 3000;
// Defines Paths
const CLIENT_FOLDER = path.join(__dirname , '/../client');
const MSG_FOLDER = path.join(CLIENT_FOLDER, '/assets/messages');

// OTHER VARS
var app = express();

// STATIC CONTENT
app.use(express.static(CLIENT_FOLDER));

// Builds req.body as JSON object with submitted data from client
app.use(bodyParser.json());

app.get('/crash', function(req, res) {
  throw new Exception("User Error");
});

app.get('/ask', function(req, res) {
  console.log('Question is: %s', req.query.qn);

  var possinleRemoteAnswers = [
    "I don't remotely know.",
    "Ask some other remote!",
    "I remotely know it's world peace ;-)",
  ];
  var idx = Math.floor(Math.random()*possinleRemoteAnswers.length);
  res.status(200).send(possinleRemoteAnswers[idx]);
});

// ERROR HANDLERS
// Handles resource not found
app.use(function(req, res) {
  res
    .status(404)
    .sendFile(path.join(MSG_FOLDER, '/404.html'));
});

// Handles server error
app.use(function(err, req, res, next) {
  console.log(err);
  res
    .status(500)
    .sendFile(path.join(MSG_FOLDER, "/500.html"));
});

// START SERVER
app.listen(NODE_PORT, function() {
  console.log("Server running at http://localhost:" + NODE_PORT);
});
