var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static("static"));

io.on('connection', function(socket){
  console.log('a user connected');
});

app.post("/registration", function(req, res) {
  res.send('Lets register somebody');
});

app.listen(3000, "localhost");