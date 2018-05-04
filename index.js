var https = require('https');
var fs = require('fs');
const express = require('express');
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/user");
require("./services/passport");

var options = {
    key: fs.readFileSync('./config/server.key'),
    cert: fs.readFileSync('./config/server.crt'),
    ca: fs.readFileSync('./config/msRootCA.crt'),
    requestCert: false,
    rejectUnauthorized: false
};

mongoose.connect(keys.mongoDB.mongoURI);

const app = express();

app.use(
    cookieSession({
        maxAge: 7 * 24 * 60 * 60 * 1000,
        keys: [keys.cookie.key]
    })
);

app.use(passport.initialize());
app.use(passport.session());

app.get("/", (req, res) => {
    res.send("Welcome");
});

app.get("/home", (req, res) => {
    res.send("Logged In");
});

require("./routes/authRoutes")(app);

const PORT = process.env.PORT || 5000;

var server = https.createServer(options, app).listen(PORT, function () {
    console.log("Server started at port " + PORT + " !");
});
