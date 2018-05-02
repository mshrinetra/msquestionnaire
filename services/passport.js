const passport = require("passport");
const FacebookStrategy = require('passport-facebook').Strategy;
const mongoose = require("mongoose");
const keys = require("../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(
    new FacebookStrategy(
        {
            clientID: keys.facebook.clientID,
            clientSecret: keys.facebook.secret,
            callbackURL: "/auth/facebook/callback"
        },
        (accessToken, refreshToken, profile, done) => {
            // console.log("ACCESS TOKEN ====>>>" + accessToken);
            // console.log("REFRESH TOKEN ====>>>" + refreshToken);
            // console.log("PROFILE ====>>>" + JSON.stringify(profile));
            // User.findOrCreate({ facebookId: profile.id }, function (err, user) {
            //     return cb(err, user);
            // });

            User.findOne({ fbID: profile.id })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({
                            fbID: profile.id,
                            Name: profile.displayName
                        })
                            .save()
                            .then(newUser => {
                                done(null, newUser);
                            });
                    }
                });
        })
);