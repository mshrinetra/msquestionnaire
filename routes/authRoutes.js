const passport = require("passport");

module.exports = app => {
    // app.get(
    //     "/auth/facebook",
    //     passport.authenticate(
    //         "facebook",
    //         {
    //             scope: ["profile", "email"]
    //         }
    //     )
    // );

    app.get(
        "/auth/facebook",
        passport.authenticate("facebook")
    );

    app.get(
        '/auth/facebook/callback',
        passport.authenticate(
            'facebook',
            { failureRedirect: '/login' }
        ),
        (req, res) => {
            // Successful authentication, redirect home.
            // console.log("REQ===>>>>");
            // console.log(req);
            // console.log("RES===>>>>");
            // console.log(res);
            // res.send('Success!!');
            res.redirect("/home");
        }
    );

    app.get(
        "/api/logout",
        (req, res) => {
            req.logout();
            res.send("Looged out :-(");
        }
    );

    app.get(
        "/api/current_user",
        (req, res) => {
            res.send(req.user);
        }
    );
}