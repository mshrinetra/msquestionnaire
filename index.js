const https = require("https");
const fs = require("fs");
const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cookieSession = require("cookie-session");
const passport = require("passport");
const keys = require("./config/keys");

require("./models/user");
require("./models/profile");
require("./models/questionnaire");
require("./models/response");
require("./services/passport");

var options = {
    key: fs.readFileSync("./config/server.key"),
    cert: fs.readFileSync("./config/server.crt"),
    ca: fs.readFileSync("./config/msRootCA.crt"),
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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

require("./routes/authRoutes")(app);
require("./routes/userRoutes")(app);
require("./routes/qsnrRoutes")(app);

if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));

    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
    });
}

const PORT = (process.env.PORT ? process.env.PORT : (process.env.NODE_ENV === "production" ? 443 : 5000));

var server = https.createServer(options, app).listen(PORT, function () {
    console.log("Server started at port " + PORT + " !")
});
