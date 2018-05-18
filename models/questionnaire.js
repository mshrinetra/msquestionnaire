const mongoose = require("mongoose");
const { Schema } = mongoose;

const qsnrSchema = new Schema(
    {
        about: {
            qsnrTitle: String,
            qsnrDescription: String,
            qsnrType: String,
            qsnrStatus: String,
            creatorId: String,
            creatorName: String,
            noOfQuestions: Number
        },
        questionnaire: [
            {
                qId: Number,
                options: {
                    qText: String,
                    opA: String,
                    opB: String,
                    opC: String,
                    opD: String
                }
            }
        ],
        stats: {
            totalParticipants: Number,
            totalMarks: Number,
            correctOps: [
                {
                    qId: Number,
                    correctOp: String
                }
            ],
            selectChart: [
                {
                    qId: Number,
                    aCount: Number,
                    bCount: Number,
                    cCount: Number,
                    dCount: Number,
                }
            ],
            markChart: [
                {
                    participantId: String,
                    participantName: String,
                    marks: Number
                }
            ]
        }
    }
);

mongoose.model("questionnaires", qsnrSchema);