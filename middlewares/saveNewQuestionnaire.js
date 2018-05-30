const mongoose = require("mongoose");
const Qsnr = mongoose.model("questionnaires");
const Profile = mongoose.model("profile");
const Response = mongoose.model("responses");

module.exports = (req, res, next) => {
    if (req.body) {
        Profile.findOne({ userId: req.user._id })
            .then(userProfile => {
                // Get the response document from databse

                let newQsnr = {
                    about: {
                        qsnrTitle: req.body.title,
                        qsnrDescription: req.body.description,
                        qsnrType: req.body.type,
                        qsnrStatus: "Active",
                        creatorId: userProfile.userId,
                        creatorName: userProfile.userName,
                        noOfQuestions: req.body.noOfQuestion
                    },
                    questionnaire: [],
                    stats: {
                        totalMarks: (req.body.type === "Test" ? req.body.noOfQuestion : null),
                        correctOps: []
                    },
                };

                Object.keys(req.body.questions).forEach(key => {
                    let newQuestion = {};
                    newQuestion = {
                        qId: parseInt(key),
                        qText: req.body.questions[key].qText,
                        options: {
                            opA: req.body.questions[key].A,
                            opB: req.body.questions[key].B,
                            opC: req.body.questions[key].C,
                            opD: req.body.questions[key].D
                        }
                    };
                    newQsnr.questionnaire.push(newQuestion);
                });

                if (req.body.type === "Test") {
                    Object.keys(req.body.questions).forEach(key => {
                        let newCorectOp = {};
                        newCorrectOp = {
                            qId: parseInt(key),
                            correctOp: ("op" + req.body.questions[key].correct)
                        };
                        newQsnr.stats.correctOps.push(newCorrectOp);
                    });
                }

                let newQsnrDoc = new Qsnr(newQsnr);

                newQsnrDoc.save().then(result => {
                    let newResponse = {
                        qsnrId: result._id,
                        qsnrType: req.body.type,
                        totalMarks: (req.body.type === "Test" ? req.body.noOfQuestion : null),
                        noOfParticipations: 0,
                        selectChart: [],
                        markChart: []
                    }

                    let createdQsnr = {
                        qsnrId: result._id,
                        qsnrTitle: req.body.title,
                        qsnrDescription: req.body.description,
                        qsnrType: req.body.type,
                        qsnrStatus: 'Active',
                        noOfQuestions: req.body.noOfQuestion,
                        totalMarks: (req.body.type === "Test" ? req.body.noOfQuestion : null),
                        noOfParticipations: 0
                    }

                    userProfile.questionnaireList.push(createdQsnr);
                    userProfile.save().then(doc => {
                        let newResponseDoc = new Response(newResponse);
                        newResponseDoc.save().then(result => {
                            res.send({ success: true });
                        }).catch(err => {
                            res.send({ success: false });
                        });
                    }).catch(err => {
                        res.send({ success: false });
                    });
                }).catch(err => {
                    res.send({ success: false });
                });
            }).catch(err => {
                res.send({ success: false });
                console.log(err);
            });
    }
    next();
};