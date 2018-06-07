const mongoose = require("mongoose");
const Qsnr = mongoose.model("questionnaires");
const requireLogin = require("../middlewares/requireLogin");
const saveNewQuestionnaire = require("../middlewares/saveNewQuestionnaire");
const saveQuestionnaireResponse = require("../middlewares/saveQuestionnaireResponse");

module.exports = app => {
    app.get(
        "/api/available_qsnr",
        (req, res) => {
            let skip = (parseInt(req.query.page) - 1) * 5;
            let limit = 5 + 1;
            let isMore = false;
            let sliceLength = 5;
            Qsnr.find({}, {}, { skip: skip, limit: limit }).then(docs => {
                if (docs.length > 5) {
                    isMore = true;
                } else {
                    sliceLength = docs.length + 1;
                }
                res.send({
                    docs: docs.slice(0, sliceLength),
                    isMore: isMore,
                    currentPage: parseInt(req.query.page)
                });
            });
        }
    );

    app.get(
        "/api/qsnr",
        requireLogin,
        (req, res) => {
            Qsnr.findById(req.query.qsnrId).then(docs => {
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