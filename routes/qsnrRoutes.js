const mongoose = require("mongoose");
const Qsnr = mongoose.model("questionnaires");

module.exports = app => {
    app.get(
        "/api/available_qsnr",
        (req, res) => {
            Qsnr.find({}).then(docs => {
                res.send(docs);
            });
        }
    );
}