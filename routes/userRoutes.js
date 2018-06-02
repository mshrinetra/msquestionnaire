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
        }
    );

    app.get(
        "/api/atended_qsnr",
        (req, res) => {
            let startIndex = (parseInt(req.query.page) - 1) * 5;
            let endIndex = ((parseInt(req.query.page) - 1) * 5) + 5;
            let isMore = false;
            Profile.findOne({
                userId: req.user._id,
                userName: req.user.userName
            }).then(profile => {
                let docs = profile.participationList;

                if (docs.length > endIndex) {
                    isMore = true;
                } else {
                    endIndex = docs.length;
                }
                res.send({
                    docs: docs.slice(startIndex, endIndex),
                    isMore: isMore,
                    currentPage: parseInt(req.query.page)
                });
            });
        }
    );

    app.get(
        "/api/created_qsnr",
        (req, res) => {
            let startIndex = (parseInt(req.query.page) - 1) * 5;
            let endIndex = ((parseInt(req.query.page) - 1) * 5) + 5;
            let isMore = false;
            Profile.findOne({
                userId: req.user._id,
                userName: req.user.userName
            }).then(profile => {
                let docs = profile.questionnaireList;

                if (docs.length > endIndex) {
                    isMore = true;
                } else {
                    endIndex = docs.length;
                }
                res.send({
                    docs: docs.slice(startIndex, endIndex),
                    isMore: isMore,
                    currentPage: parseInt(req.query.page)
                });
            });
        }
    );
}