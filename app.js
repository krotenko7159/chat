var express = require("express");
var app = express();

app.use(express.static("static"));

app.post("/registration", function(req, res) {
  res.send('Lets register somebody');
});

app.listen(3000, "localhost");