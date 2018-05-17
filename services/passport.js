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
            callbackURL: "/auth/facebook/callback",
            proxy: true
        },
        (accessToken, refreshToken, profile, done) => {
            User.findOne({
                socialProvider: "Facebook",
                providerId: profile.id
            })
                .then(existingUser => {
                    if (existingUser) {
                        done(null, existingUser);
                    } else {
                        new User({
                            socialProvider: "Facebook",
                            providerId: profile.id,
                            userName: profile.displayName
                        })
                            .save()
                            .then(newUser => {
                                done(null, newUser);
                            });
                    }
                });
        })
);