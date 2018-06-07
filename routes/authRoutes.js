const passport = require("passport");

module.exports = app => {
    app.get(
        "/auth/facebook",
        passport.authenticate("facebook")
    );

    app.get(
        "/auth/facebook/callback",
        passport.authenticate(
            "facebook"
        ),
        (req, res) => {
            res.redirect("/dashboard");
        }
    );

    app.get(
        "/api/logout",
        (req, res) => {
            req.logout();
            res.redirect("/");
        }
    );

    app.get(
        "/api/current_user",
        (req, res) => {
            if (req.user) {
                res.send(req.user);
            } else {
                return res.status(401).send({ error: "You must login" });
            }
        }
    );
}