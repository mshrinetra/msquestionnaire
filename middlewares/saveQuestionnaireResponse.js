const mongoose = require("mongoose");
const Qsnr = mongoose.model("questionnaires");
const Profile = mongoose.model("profile");
const Response = mongoose.model("responses");

module.exports = (req, res, next) => {
    if (req.body) {
        let scoredMarks = 0;
        let selectedOps = null;
        let creatorProfileIndex = -1;

        // Get the questionnaire from the database
        Qsnr.findById(req.body.qId).then(
            qsnr => {
                // Get the profile of questionnaire creator
                Profile.findOne({ userId: qsnr.about.creatorId }).then(
                    creatorProfile => {
                        // Get the profile of current user
                        Profile.findOne({ userId: req.user._id }).then(
                            userProfile => {
                                // Get the response document from databse
                                Response.findOne({ qsnrId: req.body.qId }).then(
                                    response => {
                                        // Check if current user and questionnaire creator are same;
                                        // IF YES make both object point to same value
                                        if (creatorProfile.userId === userProfile.userId) {
                                            userProfile = creatorProfile
                                        }

                                        // #QSNR_TYPE: Test# Check if questionnaire is a test or survey;
                                        if (qsnr.about.qsnrType === "Test") {
                                            // if QUESTIONNAIRE IS A TEST

                                            // Calculate scored marks by compairing correct ans stored in database and responded option
                                            Object.keys(req.body.response).forEach((key) => {
                                                if (qsnr.stats.correctOps[(parseInt(key) - 1)].correctOp === req.body.response[key]) {
                                                    scoredMarks++
                                                }
                                            });

                                            // Add new entry to marks chart
                                            response.markChart.push({
                                                participantId: req.user._id,
                                                participantName: req.user.userName,
                                                marks: scoredMarks
                                            });

                                            // Get the index of questionnaire in List of creator profile;
                                            // If found, increment atendee count
                                            creatorProfile.questionnaireList.forEach((item, index) => {
                                                if (item.qsnrId === req.body.qId) {
                                                    creatorProfileIndex = index;
                                                }
                                            });

                                            if (creatorProfileIndex != -1) {
                                                creatorProfile.questionnaireList[creatorProfileIndex].noOfParticipations = creatorProfile.questionnaireList[creatorProfileIndex].noOfParticipations + 1;
                                            }

                                            // Apend participation details to current user's profile
                                            userProfile.participationList.push({
                                                qsnrId: req.body.qId,
                                                qsnrTitle: qsnr.about.qsnrTitle,
                                                qsnrDescription: qsnr.about.qsnrDescription,
                                                qsnrType: 'Test',
                                                qsnrStatus: qsnr.about.qsnrStatus,
                                                creatorId: qsnr.about.creatorId,
                                                creatorName: qsnr.about.creatorName,
                                                totalMarks: qsnr.stats.totalMarks,
                                                scoredMarks: scoredMarks
                                            });

                                            // #QSNR_TYPE: Survey#
                                        } else {
                                            // Update the response document as per user's response
                                            Object.keys(req.body.response).forEach((key) => {
                                                let qId = -1;
                                                response.selectChart.forEach((item, index) => {
                                                    if (item.qId === parseInt(key)) {
                                                        qId = index;
                                                    }
                                                });
                                                if (qId != -1) {
                                                    switch (req.body.response[key]) {
                                                        case "opA":
                                                            response.selectChart[qId].aCount++;
                                                            break;
                                                        case "opB":
                                                            response.selectChart[qId].bCount++;
                                                            break;
                                                        case "opC":
                                                            response.selectChart[qId].cCount++;
                                                            break;
                                                        case "opD":
                                                            response.selectChart[qId].dCount++;
                                                            break;
                                                        default:
                                                            break;
                                                    }
                                                }
                                            });

                                            // Update creator profile
                                            creatorProfile.questionnaireList.forEach((item, index) => {
                                                if (item.qsnrId === req.body.qId) {
                                                    creatorProfileIndex = index;
                                                }

                                            });

                                            if (creatorProfileIndex != -1) {
                                                creatorProfile.questionnaireList[creatorProfileIndex].noOfParticipations = creatorProfile.questionnaireList[creatorProfileIndex].noOfParticipations + 1;
                                            }

                                            // Update current user's profile
                                            userProfile.participationList.push({
                                                qsnrId: req.body.qId,
                                                qsnrTitle: qsnr.about.qsnrTitle,
                                                qsnrDescription: qsnr.about.qsnrDescription,
                                                qsnrType: 'Survey',
                                                qsnrStatus: qsnr.about.qsnrStatus,
                                                creatorId: qsnr.about.creatorId,
                                                creatorName: qsnr.about.creatorName,
                                                totalMarks: null,
                                                scoredMarks: null
                                            });
                                        }
                                        // #QSNR_TYPE#

                                        // Save the modified document onces or separately based on if current user and questionnaire creator are same or different users
                                        if (creatorProfile.userId === userProfile.userId) {
                                            response.save().then(res1 => {
                                                userProfile.save().then(res2 => {
                                                    res.send({
                                                        success: true,
                                                        scoredMarks: scoredMarks
                                                    });
                                                }).catch(err2 => {
                                                    res.send({ success: false });
                                                });
                                            }).catch(err1 => {
                                                res.send({ success: false });
                                            });
                                        } else {
                                            response.save().then(res1 => {
                                                userProfile.save().then(res2 => {
                                                    creatorProfile.save().then(res3 => {
                                                        res.send({
                                                            success: true,
                                                            scoredMarks: scoredMarks
                                                        });
                                                    }).catch(err3 => {
                                                        res.send({ success: false });
                                                    });
                                                }).catch(err2 => {
                                                    res.send({ success: false });
                                                });
                                            }).catch(err1 => {
                                                res.send({ success: false });
                                            });
                                        }
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
            });
    }
    next();
};