const mongoose = require("mongoose");
const Profile = mongoose.model("profile");
const requireLogin = require("../middlewares/requireLogin");


module.exports = app => {
    app.get(
        "/api/profile",
        requireLogin,
        (req, res) => {
            Profile.findOne({
                userId: req.user._id,
                userName: req.user.userName
            }).then(
                profile => { res.send(profile) }
            );
        })
}