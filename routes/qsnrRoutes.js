const mongoose = require("mongoose");
const Qsnr = mongoose.model("questionnaires");
const requireLogin = require("../middlewares/requireLogin");
const saveNewQuestionnaire = require("../middlewares/saveNewQuestionnaire");
const saveQuestionnaireResponse = require("../middlewares/saveQuestionnaireResponse");

module.exports = app => {
    app.get(
        "/api/available_qsnr",
        (req, res) => {
            Qsnr.find({}).then(docs => {
                res.send(docs);
            });
        }
    );

    app.get(
        "/api/qsnr",
        requireLogin,
        (req, res) => {
            Qsnr.findOne({
                "about.qsnrId": req.query.qsnrId
            }).then(docs => {
                docs ? res.send({ about: docs.about, qsnr: docs.questionnaire }) : res.send("");
            });
        }
    );

    app.post(
        "/api/qsnr_submit",
        requireLogin,
        saveQuestionnaireResponse,
        (req, res) => {
            // Do nothing
        }
    );

    app.post(
        "/api/save_new_qsnr",
        requireLogin,
        saveNewQuestionnaire,
        (req, res) => {
            // Do nothing
        }
    );
}