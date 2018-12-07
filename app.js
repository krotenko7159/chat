var express = require("express");
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var passport = require("passport");
var bodyParser = require("body-parser");
var user = require("./models/user");
var localStrategy = require("passport-local");
var passportLocalMongoose = require("passport-local-mongoose");

var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/mint_chat", { useNewUrlParser: true });

app.use(express.static("static"));
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));

app.use(require("express-session")({
  secret: "Mist chat is just start",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

passport.use(new localStrategy(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());

io.on('connection', function(socket){
  console.log('a user connected');
});

app.get("/", isLoggedIn, function(req, res){
  res.render("index");
});

app.get("/welcome", function(req, res) {
  res.render("welcome");
});

app.get("/register", function(req, res){
  res.render("register");
});

app.post("/register", function(req, res) {
  user.register(new user({
    email: req.body.email,
    username: req.body.username,
    phone: req.body.phone_number
  }), req.body.password, function(err, user){
    if (err) {
      console.log(err);
      return res.render("register");
    }
    passport.authenticate("local")(req, res, function(){
      res.redirect("/");
    });
  });
});

app.get("/login", function(req, res){
  res.render("login");
});

app.post("/login", passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
}), function(req, res){
});

app.get("/logout", function(req, res){
  req.logout();
  res.redirect("/");
});

function isLoggedIn(req, res, next){
  if (req.isAuthenticated()){
    return next();
  }
  res.redirect("/welcome");
}

app.listen(3000, "localhost", function(){
  console.log("Server has been started!");
});